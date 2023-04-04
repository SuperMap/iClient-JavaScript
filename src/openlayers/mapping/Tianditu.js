/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

/**
 * @class Tianditu
 * @browsernamespace ol.source
 * @category  ThirdPartyMap
 * @classdesc 天地图图层源。
 * @param {Object} opt_options - 参数。
 * @param {string} [opt_options.url='http://t{0-7}.tianditu.gov.cn/{layer}_{proj}/wmts?'] - 服务地址。
 * @param {string} opt_options.key - 天地图服务密钥。详见{@link http://lbs.tianditu.gov.cn/server/MapService.html}
 * @param {string} [opt_options.layerType='vec'] - 图层类型。(vec:矢量图层，img:影像图层，ter:地形图层)
 * @param {string} [opt_options.attributions] - 版权描述信息。
 * @param {number} [opt_options.cacheSize = 2048] - 缓冲大小。
 * @param {function} [opt_options.tileLoadFunction] - 切片加载完成后执行函数。
 * @param {string} [opt_options.style] - 图层风格。
 * @param {string} [opt_options.format='tiles'] - 格式。
 * @param {boolean} [opt_options.isLabel] - 是否是标注图层。
 * @param {boolean} [opt_options.opaque=true] - 是否透明。
 * @param {string} [opt_options.tileProxy] - 代理地址。
 * @extends {ol.source.WMTS}
 * @usage
 */
export class Tianditu extends WMTS {
  constructor(opt_options) {
    var layerLabelMap = {
      "vec": "cva",
      "ter": "cta",
      "img": "cia"
    }
    var layerZoomMap = {
      "vec": 18,
      "ter": 14,
      "img": 18
    }
    var options = opt_options || {};
    var attributions = options.attributions || "Map Data <a href='http://www.tianditu.gov.cn' target='_blank'><img style='background-color:transparent;bottom:2px;opacity:1;' " +
    "src='http://api.tianditu.gov.cn/img/map/logo.png' width='53px' height='22px' opacity='0'></a> with " +
    "<span>© SuperMap iClient</span>"
    options.layerType = options.layerType || "vec";
    options.layerType = options.isLabel ? layerLabelMap[options.layerType] : options.layerType;
    options.matrixSet = (options.projection === 'EPSG:4326' || options.projection === 'EPSG:4490') ? "c" : "w";
    if (!options.url && !options.urls) {
      options.url = "http://t{0-7}.tianditu.gov.cn/{layer}_{proj}/wmts?"
    }
    if (options.key) {
      options.url = `${options.url}tk=${options.key}`;
    }
    options.url = options.url.replace("{layer}", options.layerType).replace("{proj}", options.matrixSet);
    var tileGrid = options.tileGrid || Tianditu.getTileGrid(options.projection || 'EPSG:3857');

    var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

    var superOptions = {
      version: options.version || '1.0.0',
      format: options.format || 'tiles',
      dimensions: options.dimensions || {},
      layer: options.layerType,
      matrixSet: options.matrixSet,
      tileGrid: tileGrid,
      style: options.style || 'default',
      attributions: attributions,
      cacheSize: options.cacheSize,
      crossOrigin: crossOrigin,
      opaque: options.opaque === undefined ? true : options.opaque,
      maxZoom: layerZoomMap[options.layerType],
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      url: options.url,
      urls: options.urls,
      projection: options.projection || 'EPSG:3857',
      wrapX: options.wrapX
    };
    //需要代理时走自定义 tileLoadFunction，否则走默认的tileLoadFunction
    if (options.tileProxy) {
      superOptions.tileLoadFunction = tileLoadFunction;
    }
    super(superOptions);

    if (options.tileProxy) {
      this.tileProxy = options.tileProxy;
    }
    //需要代理时，走以下代码
    var me = this;

    function tileLoadFunction(imageTile, src) {
      //支持代理
      imageTile.getImage().src = me.tileProxy + encodeURIComponent(src);
    }
  }

  /**
   * @function Tianditu.getTileGrid
   * @description 获取瓦片网格。
   * @param {string} projection - 投影参考对象。
   * @returns {ol.tilegrid.WMTS} 返回瓦片网格对象
   */
  static getTileGrid(projection) {
    if (projection === "EPSG:4326" || projection === "EPSG:4490") {
      return Tianditu.default4326TileGrid();
    }
    return Tianditu.default3857TileGrid();
  }

  /**
   * @function Tianditu.default4326TileGrid
   * @description 获取默认 4326 网格瓦片。
   * @returns {ol.tilegrid.WMTS} 返回默认 4326 网格瓦片对象。
   */
  static default4326TileGrid() {
    var tdt_WGS84_resolutions = [];
    var matrixIds = [];
    for (var i = 1; i < 19; i++) {
      tdt_WGS84_resolutions.push(0.703125 * 2 / (Math.pow(2, i)));
      matrixIds.push(i);
    }
    var tileGird = new WMTSTileGrid({
      extent: [-180, -90, 180, 90],
      resolutions: tdt_WGS84_resolutions,
      origin: [-180, 90],
      matrixIds: matrixIds,
      minZoom: 1
    });
    return tileGird;
  }

  /**
   * @function Tianditu.default3857TileGrid
   * @description 获取默认 3857 网格瓦片。
   * @returns {ol.tilegrid.WMTS} 返回默认 3857 网格瓦片对象。
   */
  static default3857TileGrid() {
    var tdt_Mercator_resolutions = [];
    var matrixIds = [];
    for (var i = 1; i < 19; i++) {
      tdt_Mercator_resolutions.push(78271.5169640203125 * 2 / (Math.pow(2, i)));
      matrixIds.push(i);
    }
    var tileGird = new WMTSTileGrid({
      extent: [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
      resolutions: tdt_Mercator_resolutions,
      matrixIds: matrixIds,
      origin: [-20037508.3427892, 20037508.3427892],
      minZoom: 1
    });
    return tileGird;
  }
}
