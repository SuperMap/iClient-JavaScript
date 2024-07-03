import maplibregl from 'maplibre-gl';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { MapService } from '../services/MapService';
import { InitMapServiceBase, isPlaneProjection, getZoom, getTileset, getTileFormat } from '@supermap/iclient-common/iServer/InitMapServiceBase';
import proj4 from 'proj4';
/**
 * @function initMap
 * @description 根据 SuperMap iServer 服务参数，创建地图与图层。目前仅支持 SuperMap iServer 地图服务。
 * @category BaseTypes Util
 * @version 11.1.1
 * @param {number} url - rest 地图服务地址。例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
 * @param {Object} options - 参数。
 * @param {Object} [options.type] - 地图类型。可选值 'raster' | 'vector-tile'。默认 'raster'。
 * @param {Object} [options.mapOptions] - 地图配置，参数设置参考 {@link https://docs.mapbox.com/mapbox-gl-js/api/map/}。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @returns {Object} 实例对象。对象包括地图实例。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const initMap = {namespace}.initMap(url, { mapOptions });
 *
 * </script>
 * // ES6 Import
 * import { initMap } from '{npm}';
 *
 * initMap(url, { mapOptions })
 * ```
 * */
export function initMap(url, options = {}) {
  const initMapService = new InitMapServiceBase(MapService, url, options);
  return initMapService.getMapInfo(async (res, resolve, reject) => {
    try {
      if (res.type === 'processCompleted') {
        const {
          dynamicProjection,
          prjCoordSys: { epsgCode, type }
        } = res.result;
        if (isPlaneProjection(type)) {
          reject(new Error('maplibre-gl cannot support plane coordinate system.'));
          return;
        }
        if (epsgCode !== 3857 && !dynamicProjection && !maplibregl.CRS) {
          reject(
            new Error(
              `The EPSG code ${epsgCode} needs to include maplibre-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/maplibregl/editor.html#mvtVectorTile_2362`
            )
          );
          return;
        }
        const mapOptions = await createMapOptions(url, res.result, { ...options, initMapService });
        const map = new maplibregl.Map(mapOptions);
        resolve({ map });
        return;
      }
      reject(new Error('Fetch mapService is failed.'));
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @private
 * @function getCrsExtent
 * @description 获取当前坐标系范围，[左，下，右，上]。
 * @param {Object|Array} extent -坐标系范围。
 * @returns {Array}
 */
function getCRSExtent(extent) {
  if (extent instanceof Array) {
    return extent;
  }
  if (extent.leftBottom && extent.rightTop) {
    return [extent.leftBottom.x, extent.leftBottom.y, extent.rightTop.x, extent.rightTop.y];
  }
  return [extent.left, extent.bottom, extent.right, extent.top];
}

/**
 * @private
 * @function defineCRSByWKT
 * @description 定义crs。
 * @param {string} crsName - 投影名称。
 * @param {string} wkt - wkt。
 * @param {Object} extent - 坐标系范围。
 * @returns {string}
 */
function defineCRSByWKT(crsName, wkt, extent) {
  const crsExtent = getCRSExtent(extent);
  const defineCRS = new maplibregl.CRS(crsName, wkt, crsExtent);
  return defineCRS;
}

/**
 * @private
 * @function transformMapCenter
 * @description 转换center。
 * @param {Object} mapInfoCenter - 中心点。
 * @param {string} baseProjection - 坐标投影。
 * @returns {Array}
 */
function transformMapCenter(mapInfoCenter, sourceProjection) {
  let center = mapInfoCenter;
  if (sourceProjection === 'EPSG:3857') {
    return proj4(sourceProjection, 'EPSG:4326', mapInfoCenter);
  }
  if (sourceProjection !== 'EPSG:4326') {
    return maplibregl.proj4(sourceProjection, 'EPSG:4326', mapInfoCenter);
  }
  return center;
}

/**
 * @private
 * @function getVectorTileCRSExtent
 * @description 获取矢量瓦片坐标系范围。
 * @param {string} vectorStyleUrl - 矢量瓦片 style json 服务地址。
 * @param {string} restMapUrl - 矢量瓦片 rest 地图服务地址。
 * @returns {Object}
 */
async function getVectorTileCRSExtent(vectorStyleUrl, restMapUrl) {
  try {
    const vectorStyleDataRes = await FetchRequest.get(vectorStyleUrl);
    const vectorStyleData = await vectorStyleDataRes.json();
    if (vectorStyleData.metadata && vectorStyleData.metadata.indexbounds) {
      return { extent: vectorStyleData.metadata.indexbounds };
    }
    const vectorExtentDataRes = await FetchRequest.get(`${restMapUrl}/prjCoordSys/projection/extent.json`);
    const vectorExtentData = await vectorExtentDataRes.json();
    return { extent: vectorExtentData, center: vectorStyleData.center };
  } catch (error) {
    return { extent: [] };
  }
}

/**
 * @private
 * @function createMapOptions
 * @description 获取地图参数。
 * @param {string} url - rest 地图服务地址。
 * @param {Object} resetServiceInfo - rest 地图服务信息。
 * @param {Object} [options] - 参数。
 * @param {string} [options.type] - 服务代理地址。
 * @param {Object} [options.mapOptions] - 地图配置。
 * @param {Object} [options.initMapService] - InitMapServiceBase 实例。
 * @returns {Object} mapParams。
 */
async function createMapOptions(url, resetServiceInfo, options) {
  if (options.type && !['raster', 'vector-tile'].includes(options.type)) {
    return Promise.reject(new Error('type must be "raster" or "vector-tile".'));
  }
  const sourceType = options.type || 'raster';
  const mapOptions = options.mapOptions || {};
  const {
    prjCoordSys: { epsgCode },
    bounds,
    center,
    dpi,
    coordUnit,
    scale
  } = resetServiceInfo;
  let mapCenter = center ? [center.x, center.y] : [0, 0];
  let crs = `EPSG:${epsgCode}`;
  let extent = bounds;
  let tileUrl =
    sourceType === 'vector-tile'
      ? url + '/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY'
      : url;
  let nonEnhanceExtraInfo = {};
  let enhanceExtraInfo = {};
  let zoom;
  let tileSize = 512;
  let tileFormat = 'png';
  if (maplibregl.CRS) {
    const baseProjection = crs;
    const wkt = await options.initMapService.getWKT();
    let vectorTileInfo;
    if (sourceType === 'vector-tile') {
      vectorTileInfo = await getVectorTileCRSExtent(tileUrl, url);
      extent = vectorTileInfo.extent;
    }
    crs = defineCRSByWKT(baseProjection, wkt, extent);
    if (sourceType === 'raster') {
      enhanceExtraInfo.rasterSource = 'iserver';
    }
    if (vectorTileInfo && vectorTileInfo.center) {
      mapCenter = vectorTileInfo.center;
    } else {
      mapCenter = transformMapCenter(mapCenter, baseProjection);
    }
    
    const tilesets = await options.initMapService.getTilesets();
    const tileset = getTileset(tilesets.result, { prjCoordSys: resetServiceInfo.prjCoordSys, tileType: 'Image' });
  
    if (tileset) {
      tileFormat = getTileFormat(tileset);
      const maxWidth = Math.max(tileset.bounds.right - tileset.originalPoint.x, tileset.originalPoint.y - tileset.bounds.bottom);
      const tileCount = maxWidth / (tileset.resolutions[0] * 256);
      zoom = Math.ceil(Math.log2(tileCount));
      const closestTileCount = Math.pow(2, zoom);
      const width =  closestTileCount * 256 * tileset.resolutions[0];
      const crsBounds = [
        tileset.originalPoint.x,
        tileset.originalPoint.y - width,
        tileset.originalPoint.x + width,
        tileset.originalPoint.y
      ];
      crs = new maplibregl.CRS(baseProjection, crsBounds);
      zoom = zoom - 1;
      tileSize = tileset.tileWidth;
    }
  } else {
    crs = 'EPSG:3857';
    mapCenter = transformMapCenter(mapCenter, crs);
    if (sourceType === 'raster') {
      const tileSize = 256;
      nonEnhanceExtraInfo.tileSize = tileSize;
      const transparent = mapOptions.transparent !== false;
      tileUrl += `/zxyTileImage.png?z={z}&x={x}&y={y}&width=${tileSize}&height=${tileSize}&transparent=${transparent}`;
    }
  }
  if (zoom === undefined) {
    zoom = getZoom({ scale, dpi, coordUnit }, extent);
  }
  return {
    container: 'map',
    crs,
    center: mapCenter,
    zoom,
    style:
      sourceType === 'raster'
        ? {
            version: 8,
            sources: {
              'smaples-source': {
                format: tileFormat,
                tileSize,
                type: 'raster',
                tiles: [tileUrl],
                ...nonEnhanceExtraInfo,
                ...enhanceExtraInfo
              }
            },
            layers: [
              {
                id: 'sample-layer',
                type: 'raster',
                source: 'smaples-source',
                minzoom: 0,
                maxzoom: 22
              }
            ]
          }
        : tileUrl,
    ...mapOptions
  };
}