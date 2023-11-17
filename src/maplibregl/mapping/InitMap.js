import maplibregl from 'maplibre-gl';
import { MapService } from '../services/MapService';
import { InitMapServiceBase, isPlaneProjection, getZoom } from '@supermap/iclient-common/iServer/InitMapServiceBase';
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
        if (epsgCode !== 3857 && !dynamicProjection) {
          reject(new Error(`The EPSG code ${epsgCode} is not yet supported`));
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
  const { center, bounds, scale, dpi, coordUnit } = resetServiceInfo;
  const mapCenter = center ? proj4('EPSG:3857', 'EPSG:4326', [center.x, center.y]) : [0, 0];
  let tileUrl =
    sourceType === 'vector-tile'
      ? url + '/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY'
      : url;
  let rasterExtraInfo = {};
  if (sourceType === 'raster') {
    const tileSize = 256;
    rasterExtraInfo.tileSize = tileSize;
    const transparent = mapOptions.transparent !== false;
    tileUrl += `/zxyTileImage.png?z={z}&x={x}&y={y}&width=${tileSize}&height=${tileSize}&transparent=${transparent}`;
  }
  const zoom = getZoom({ scale, dpi, coordUnit }, bounds);
  return {
    container: 'map',
    center: mapCenter,
    zoom,
    style:
      sourceType === 'raster'
        ? {
            version: 8,
            sources: {
              'smaples-source': {
                type: 'raster',
                tiles: [tileUrl],
                ...rasterExtraInfo
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