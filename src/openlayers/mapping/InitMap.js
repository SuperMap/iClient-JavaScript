import { MapService } from '../services/MapService';
import { InitMapServiceBase, isPlaneProjection, getTileFormat, getTileset } from '@supermap/iclient-common/iServer/InitMapServiceBase';
import olMap from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import { TileSuperMapRest } from './TileSuperMapRest';
import { Util } from '../core/Util';
import proj4 from 'proj4';
import * as olProj4 from 'ol/proj/proj4';
import { get } from 'ol/proj';

window.proj4 = proj4;

/**
 * @function initMap
 * @description 根据 SuperMap iServer 服务参数，创建地图与图层。目前仅支持 SuperMap iServer 地图服务，创建的图层为 ol.Tile。
 * @category BaseTypes Util
 * @version 11.0.1
 * @param {number} url - 服务地址，例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
 * @param {Object} options - 参数。
 * @param {Object} [options.mapOptions] - 地图配置，参数设置参考 {@link https://openlayers.org/en/v6.15.1/apidoc/module-ol_Map-Map.html}。
 * @param {Object} [options.viewOptions] - 视图配置，参数设置参考 {@link https://openlayers.org/en/v6.15.1/apidoc/module-ol_View-View.html} ，未设置的情况下，默认使用 SuperMap iServer 服务参数进行设置。
 * @param {Object} [options.layerOptions] - 图层配置，参数设置参考 {@link https://openlayers.org/en/v6.15.1/apidoc/module-ol_layer_Tile-TileLayer.html} ，未设置的情况下，默认使用 SuperMap iServer 服务参数进行设置。
 * @param {Object} [options.sourceOptions] - 数据源配置，参数设置参考 {@link TileSuperMapRest} ，未设置的情况下，默认使用 SuperMap iServer 服务参数进行设置。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @returns {Object} 实例对象，对象包括地图实例，图层实例，数据源实例。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const initMap = {namespace}.initMap(url, { mapOptions, viewOptions, layerOptions, sourceOptions });
 *
 * </script>
 * // ES6 Import
 * import { initMap } from '{npm}';
 *
 * initMap(url, { mapOptions, viewOptions, layerOptions, sourceOptions })
 * ```
 * */
export async function initMap(url, options = {}) {
  const { mapOptions, viewOptions, layerOptions, sourceOptions } = options;
  const initMapService = new InitMapServiceBase(MapService, url, options);
  const tilesets = await initMapService.getTilesets();
  const result = await initMapService.getMapInfo();
  if (!result || !result.result) {
    return 'service is not work!';
  }
  const mapObject = result.result;
  const { prjCoordSys, bounds, center, visibleScales, coordUnit, scale, dpi } = mapObject;
  // tileset和地图不同投影，优先使用地图
  const tileset = getTileset(tilesets.result, { prjCoordSys, tileType: 'Image' });

  const config = {
    center,
    bounds,
    dpi,
    visibleScales,
    scale,
    prjCoordSys,
    coordUnit,
    tileFormat: 'webp',
    tileSize: 256
  };
  if (tileset) {
    config.tileFormat = getTileFormat(tileset);
    config.tileSize = tileset.tileWidth || 256;
    config.transparent = tileset.transparent || true;
    config.origin = [tileset.originalPoint.x, tileset.originalPoint.y];
    config.resolutions = tileset.resolutions;
    config.scaleDenominators = tileset.scaleDenominators;
    config.dpi = Util.getDpi(1.0 / tileset.scaleDenominators[0], tileset.resolutions[0], coordUnit);
  }

  if (!get(`EPSG:${prjCoordSys.epsgCode}`) && !isPlaneProjection(prjCoordSys.type)) {
    const wkt = await initMapService.getWKT();
    registerProj(prjCoordSys.epsgCode, wkt, bounds);
  }

  let map = createMap(config, mapOptions, viewOptions);
  let { layer, source } = createLayer(url, config, sourceOptions, layerOptions);
  map.addLayer(layer);
  return {
    map,
    source,
    layer
  };
}

/**
 * @function viewOptionsFromMapJSON
 * @category BaseTypes Util
 * @version 11.0.1
 * @description 通过 iServer REST 地图参数构造 ol 视图对象。
 * @param {Object} mapJSONObj - 地图 JSON 对象。
 * @param {number} [level=22] - 地图最大级别。
 * @returns {Object} ol视图参数，包括中心点、投影、级别、分辨率数组。
 */

export function viewOptionsFromMapJSON(mapJSONObj, level = 22) {
  let { bounds, dpi, center, visibleScales, scale, coordUnit, prjCoordSys, scaleDenominators, resolutions } = mapJSONObj;
  const mapCenter =
    center.x && center.y ? [center.x, center.y] : [(bounds.left + bounds.right) / 2, (bounds.bottom + bounds.top) / 2];
  const extent = [bounds.left, bounds.bottom, bounds.right, bounds.top];
  let projection = Util.getProjection(prjCoordSys, extent);
  resolutions = resolutions || Util.scalesToResolutions(visibleScales, bounds, dpi, coordUnit, level);
  const resolution = scaleDenominators ? (1.0 / scale) : Util.scaleToResolution(scale, dpi, coordUnit);
  const zoom = Util.getZoomByResolution(resolution, resolutions);
  return {
    center: mapCenter,
    projection,
    zoom,
    resolutions
  };
}

function createMap(result, mapOptions, viewOptions) {
  let view = viewOptionsFromMapJSON(result);
  var map = new olMap({
    target: 'map',
    view: new View({ ...view, ...viewOptions }),
    ...mapOptions
  });
  return map;
}

function registerProj(epsgCode, wkt, bounds) {
  const extent = [bounds.left, bounds.bottom, bounds.right, bounds.top];
  let epsgCodeStr = `EPSG:${epsgCode}`;
  !get(epsgCodeStr) && proj4.defs(epsgCodeStr, wkt);
  if (olProj4 && olProj4.register) {
    olProj4.register(proj4);
    var prj = get(epsgCodeStr);
    prj.setExtent(extent);
  }
}

function createLayer(url, result, sourceOptions, layerOptions) {
  let options = TileSuperMapRest.optionsFromMapJSON(url, result, true);
  options = { ...options, ...sourceOptions };
  var source = new TileSuperMapRest(options);
  var layer = new Tile({
    source,
    ...layerOptions
  });
  return { layer, source };
}
