/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import { CRS } from '../core/Proj4Leaflet';
 import { getZoomByResolution, scalesToResolutions, scaleToResolution } from '../core/Util';
 import { NonEarthCRS } from '../core/NonEarthCRS';
 import { TiledMapLayer } from './TiledMapLayer';
 import { MapService } from '../services/MapService';
 import { InitMapServiceBase, isPlaneProjection, getEpsgCode } from '@supermap/iclient-common/iServer/InitMapServiceBase';
 import proj4 from 'proj4';

 /**
  * @function initMap
  * @description 根据 SuperMap iServer 服务参数，创建地图与图层。目前仅支持SuperMap iServer 地图服务，创建的图层为 TiledMapLayer。
  * @category BaseTypes Util
  * @version 11.0.1
  * @example
  *       initMap(url, {mapOptions, layerOptions});
  * @param {string} url - 服务地址，例如: http://{ip}:{port}/iserver/services/map-world/rest/maps/World。
  * @param {Object} [options] - 参数。
  * @param {L.MapOptions} [options.mapOptions] - 地图参数，未设置的情况下，默认使用 SuperMap iServer 服务参数进行设置。
  * @param {Object} [options.layerOptions] - 图层参数，参考<a href="TiledMapLayer.html">TiledMapLayer</a>的参数。
  * @param {string} [options.proxy] - 服务代理地址。
  * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
  * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
  * @param {Object} [options.headers] - 请求头。
  * @returns {Promise} Promise 对象，返回{ map, layer }。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const initMap = {namespace}.initMap;
  *   initMap(url, {mapOptions, layerOptions});
  *
  * </script>
  * // ES6 Import
  *   import { initMap } from "{npm}";
  *
  *   initMap(url, {mapOptions, layerOptions});
  *
  * ```
  */
 export function initMap(url, options) {
   options = options || {};
   const mapOptions = options.mapOptions || {};
   const layerOptions = options.layerOptions || {};
   const initMapService = new InitMapServiceBase(MapService, url, options);
   return initMapService.getMapInfo(async (res, resolve, reject) => {
     if (res.type === 'processCompleted') {
       const { prjCoordSys } = res.result;
       if (!isPlaneProjection(prjCoordSys.type)) {
         const epsgCode = getEpsgCode(prjCoordSys);
         await setProj(epsgCode, initMapService);
       }
       const mapInfoOptions = getMapOptions(res.result, mapOptions);
       const map = L.map('map', { ...mapInfoOptions, ...mapOptions });
       const layer = new TiledMapLayer(url, { ...{ noWrap: true }, ...layerOptions });
       layer.addTo(map);
       resolve({ map, layer });
       return;
     }
     reject();
   });
 }

 /**
  * @function crsFromMapJSON
  * @description 通过iServer REST地图的配置信息，构建地图的CRS（非平面投影、EPSG:3857、EPSG:4326需要先注册投影）。
  * @category BaseTypes Util
  * @version 11.0.1
  * @param {Object} mapJSONObj - 地图参数。
  * @param {Object} mapJSONObj.prjCoordSys - 投影配置。
  * @param {Object} mapJSONObj.bounds - 范围。
  * @param {number} mapJSONObj.dpi - DPI。
  * @param {Array}  mapJSONObj.visibleScales - 自定义比例尺。
  * @param {Array}  mapJSONObj.coordUnit - 地图单位。
 * @param {Object} [mapOptions] - 地图参数。
 * @param {number} [mapOptions.maxZoom=22] - 地图最大缩放级别。没有设置固定比例尺时生效。
  * @returns {CRS}  返回CRS。
  */
 export function crsFromMapJSON(mapJSONObj, mapOptions) {
   const { maxZoom = 22 } = mapOptions || {};
   const { bounds, prjCoordSys, dpi, visibleScales, coordUnit } = mapJSONObj;
   const resolutions = scalesToResolutions(visibleScales, bounds, dpi, coordUnit, maxZoom);
   if (isPlaneProjection(prjCoordSys.type)) {
     return getNonEarthCRS(bounds);
   }
  const epsgCodeStr = getEpsgCode(prjCoordSys);
  if (!hasRegisterProj(epsgCodeStr)) {
     return;
   }
   return getCRS(epsgCodeStr, { bounds, dpi, resolutions });
 }

 /**
  * @private
  * @function setProj
  * @description 注册4214 4610 4490等投影。
  * @param {string} epsgCodeStr - epsgCode。
  * @param {string} initMapService - InitMapServiceBase 实例。
  */
 async function setProj(epsgCodeStr, initMapService) {
   if (!hasRegisterProj(epsgCodeStr, false)) {
     const def = await initMapService.getWKT();
     def && proj4.defs(epsgCodeStr, def);
   }
 }

 /**
  * @private
  * @function hasRegisterProj
  * @description 判断是否注册了投影。
  * @param {string} epsgCodeStr - epsgCode。
  * @param {boolean} isConsole - 是否在控制台打印。
  * @returns {boolean}
  */
 function hasRegisterProj(epsgCodeStr, isConsole = true) {
   try {
     proj4(epsgCodeStr);
   } catch (e) {
     if (isConsole) {
       console.error(
         `The projection of ${epsgCodeStr} is missing, please register the projection of ${epsgCodeStr} first, refer to the documentation: https://iclient.supermap.io/web/introduction/leafletDevelop.html#multiProjection`
       );
     }
     return false;
   }
   return true;
 }

 /**
  * @private
  * @function getMapOptions
  * @description 获取地图参数。
  * @param {Object} mapJSONObj - 地图 JSON 对象。
  * @param {Object} [mapOptions] - 地图参数。
  * @param {Object} [mapOptions.maxZoom=22] - 地图最大缩放级别（没有设置固定比例尺时生效）。
  * @returns {Object} mapParams。
  */
 function getMapOptions(mapJSONObj, mapOptions) {
   const { bounds, center, scale, visibleScales, prjCoordSys, dpi, coordUnit } = mapJSONObj;
   const { maxZoom = 22 } = mapOptions;
   const resolutions = scalesToResolutions(visibleScales, bounds, dpi, coordUnit, maxZoom);
   const crs = crsFromMapJSON({ prjCoordSys, bounds, dpi, visibleScales, coordUnit }, { maxZoom });
   const visableResolutions = crs.resolutions || resolutions;
   const mapParams = {
     crs,
     center: getCenter(crs, { center, bounds }),
     zoom: getZoomByScale({ scale, dpi, coordUnit }, visableResolutions),
     maxZoom: getMaxZoom(resolutions)
   };
   return mapParams;
 }

 /**
  * @private
  * @function getZoomByScale
  * @description 获取Zoom。
  * @param {Object} options
  * @param {string} options.scale - scale。
  * @param {number} options.dpi - dpi
  * @param {string} options.coordUnit - coordUnit
  * @param {Object} visableResolutions - visableResolutions
  * @returns {number} zoom。
  */
 function getZoomByScale({ scale, dpi, coordUnit }, visableResolutions) {
   const resolution = scaleToResolution(scale, dpi, coordUnit);
   return getZoomByResolution(resolution, visableResolutions);
 }

 /**
  * @private
  * @function getMaxZoom
  * @description 获取maxZoom。
  * @param {Array} visibleResolutions - visibleResolutions
  * @returns {number}  maxZoom。
  */
 function getMaxZoom(visibleResolutions) {
   if (visibleResolutions.length > 0) {
     return visibleResolutions.length - 1;
   }
   return 22;
 }

 /**
  * @private
  * @function getCenter
  * @description 获取center。
  * @param {CRS} crs - crs。
  * @param {Object} mapJSONObj - 地图 JSON 对象。
  * @param {Object} mapJSONObj.center - 地图参数。
  * @param {Object} mapJSONObj.bounds - 地图最大缩放级别。
  * @returns {Object}  center。
  */
 function getCenter(crs, { center, bounds }) {
   const code = typeof crs === 'string' ? crs : crs.code;
   if (typeof center.x !== 'number' && typeof center.y !== 'number') {
     center = { lat: (bounds.bottom + bounds.top) / 2, lng: (bounds.left + bounds.right) / 2 };
   }
   if (code === 'EPSG:4326') {
     return { lat: center.y, lng: center.x };
   }
   return crs.unproject(L.point(center.x, center.y));
 }

 function getNonEarthCRS(bounds) {
   let options = {
     bounds: L.bounds([bounds.left, bounds.bottom], [bounds.right, bounds.top]),
     origin: L.point(bounds.left, bounds.top)
   };
   return new NonEarthCRS(options);
 }

 function getCRS(epsgCodeStr, { bounds, dpi, resolutions }) {
   const wrapLngLeft = proj4(epsgCodeStr, 'EPSG:4326').forward([bounds.left, 0], true);
   const wrapLngRight = proj4(epsgCodeStr, 'EPSG:4326').forward([bounds.right, 0], true);
   const wrapLng = [parseInt(wrapLngLeft[0]), parseInt(wrapLngRight[0])];
   let options = {
     wrapLng,
     bounds: L.bounds([bounds.left, bounds.bottom], [bounds.right, bounds.top]),
     origin: [bounds.left, bounds.top],
     dpi: dpi
   };
   if (resolutions && resolutions.length > 0) {
     options.resolutions = resolutions;
   }
   return new CRS(epsgCodeStr, options);
 }
