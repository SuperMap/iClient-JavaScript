/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { Lang } from '@supermap/iclient-common/lang/Lang';
import { Util } from '../core/Util';
import { WebMap as WebMapV2 } from './webmap/v2/WebMap';
import { WebMap as WebMapV3 } from './webmap/v3/WebMap';

/**
 * @class WebMap
 * @version 9.1.2
 * @category  iPortal/Online Resources Map
 * @classdesc 对接 iPortal/Online 地图类。目前支持地图坐标系包括：'EPSG:3857'，'EPSG:4326'，'EPSG:4490'，'EPSG:4214'，'EPSG:4610'。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">该功能依赖 <a href='https://iclient.supermap.io/web/libs/geostats/geostats.js'>geostats</a> 和 <a href='https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js'>JsonSql</a> 插件，请确认引入该插件。</p>
 *      <p style="font-size: 13px">&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/geostats/geostats.js"&gt;&lt;/script&gt;</p>
 *      <p style="font-size: 13px">&lt;script type="text/javascript" src="https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js"&gt;&lt;/script&gt;</p>
 * </div>
 * @modulecategory Mapping
 * @param {number} id - iPortal|Online 地图 ID。
 * @param {Object} options - 基础参数。
 * @param {string} [options.target='map'] - 地图容器 ID。
 * @param {string} [options.server="https://www.supermapol.com"] - 地图的地址。
 * @param {string} [options.credentialKey] - 凭证密钥。
 * @param {string} [options.credentialValue] - 凭证值。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.excludePortalProxyUrl] - 服务端传递过来的 URL 是否带有代理。
 * @param {Object} mapOptions - 地图参数。
 * @param {string} [mapOptions.center] - 中心点。
 * @param {string} [mapOptions.zoom] - 缩放级别。
 * @param {string} [mapOptions.bearing] - 旋转角度。
 * @param {string} [mapOptions.pitch] - 倾角。
 * @fires WebMap#getmapfailed
 * @fires WebMap#getwmtsfailed
 * @fires WebMap#getlayersfailed
 * @fires WebMap#getfeaturesfailed
 * @fires WebMap#addlayerssucceeded
 * @extends {mapboxgl.Evented}
 * @usage
 */
export class WebMap extends mapboxgl.Evented {
  constructor(id, options = {}, mapOptions) {
    super();
    this.mapId = id;
    this.options = Object.assign({}, options);
    this.options.server = this._formatServerUrl(options.server);
    this.options.target = options.target || 'map';
    this.options.withCredentials = options.withCredentials || false;
    this.mapOptions = mapOptions;
    this._createWebMap();
  }
  /**
   * @function WebMap.prototype.resize
   * @description 地图 resize。
   */
  resize() {
    this.map.resize();
  }

  /**
   * @function WebMap.prototype.setMapId
   * @param {string} mapId - webMap 地图 ID。
   * @description 设置 WebMap ID。
   */
  setMapId(mapId) {
    this.mapId = mapId;
    this._createWebMap();
  }

  /**
   * @function WebMap.prototype.setWebMapOptions
   * @param {Object} webMapOptions - webMap 参数。
   * @description 设置 webMap 参数。
   */
  setWebMapOptions(webMapOptions) {
    const server = this._formatServerUrl(webMapOptions.server);
    this.options.server = server;
    this._createWebMap();
  }

  /**
   * @function WebMap.prototype.setMapOptions
   * @param {Object} mapOptions - map 参数。
   * @description 设置 map 参数。
   */
  setMapOptions(mapOptions) {
    let { center, zoom, maxBounds, minZoom, maxZoom, isWorldCopy, bearing, pitch } = mapOptions;
    center && center.length && this.map.setCenter(center);
    zoom && this.map.setZoom(zoom);
    maxBounds && this.map.setMaxBounds(maxBounds);
    minZoom && this.map.setMinZoom(minZoom);
    maxZoom && this.map.setMaxZoom(maxZoom);
    isWorldCopy && this.map.setRenderWorldCopies(isWorldCopy);
    bearing && this.map.setBearing(bearing);
    pitch && this.map.setPitch(pitch);
  }

  /**
   * @private
   * @function WebMap.prototype._createWebMap
   * @description 登陆窗口后添加地图图层。
   */
  _createWebMap() {
    const mapUrl = Util.transformUrl(
      Object.assign({ url: `${this.options.server}web/maps/${this.mapId}/map` }, this.options)
    );
    this._getMapInfo(mapUrl);
  }

  /**
   * @private
   * @function WebMap.prototype._formatServerUrl
   * @description 格式化服务地址
   */
  _formatServerUrl(server) {
    let urlArr = server.split('');
    if (urlArr[urlArr.length - 1] !== '/') {
      server += '/';
    }
    return server;
  }

  /**
   * @private
   * @function WebMap.prototype._getMapInfo
   * @description 获取地图的 JSON 信息。
   * @param {string} mapUrl - 请求地图的 url。
   */
  _getMapInfo(mapUrl) {
    FetchRequest.get(mapUrl, null, { withCredentials: this.options.withCredentials })
      .then((response) => {
        return response.json();
      })
      .then((mapInfo) => {
        const projectionMap = ['EPSG:4490', 'EPSG:4214', 'EPSG:4610', 'EPSG:3857', 'EPSG:4326'];
        const baseProjection = this._getMapProjection(mapInfo);
        // 坐标系异常处理
        if (!projectionMap.find(item => item === baseProjection)) {
          throw Error(Lang.i18n('msg_crsunsupport'));
        }
        this.webMapInstance = this._initMap(mapInfo);
        this._registerWebMapEvents();
        this.webMapInstance.initializeMap(mapInfo);
      })
      .catch((error) => {
        /**
         * @event WebMap#getmapfailed
         * @description 获取地图信息失败。
         * @property {Object} error - 失败原因。
         */
        this.fire('getmapfailed', { error: error });
      });
  }

  /**
   * @private
   * @function WebMap.prototype._getMapProjection
   * @param {object} mapInfo - 地图信息。
   * @description 获取地图投影。
   */
  _getMapProjection(mapInfo) {
    if (this._isWebMapV3(mapInfo.version)) {
      return mapInfo.crs;
    }
    return mapInfo.projection;
  }

  /**
   * @private
   * @function WebMap.prototype._initMap
   * @param {object} mapInfo - 地图信息。
   * @description 初始化 WebMap 实例
   */
  _initMap(mapInfo) {
    const WebMap = this._getMapFactory(mapInfo.version);
    const webMapInstance = new WebMap(this.mapId, this.options, this.mapOptions);
    webMapInstance.setEventedParent(this);
    return webMapInstance;
  }

  _getMapFactory(version) {
    if (this._isWebMapV3(version)) {
      return WebMapV3;
    }
    return WebMapV2;
  }

  /**
   * @private
   * @function WebMap.prototype._registerWebMapEvents
   * @description 注册 WebMap 事件
   */
  _registerWebMapEvents() {
    if (!this.webMapInstance) {
      return;
    }
    this.webMapInstance.on('mapinitialized', () => {
      this.map = this.webMapInstance.map;
    });
    this.webMapInstance.on('addlayerssucceeded', ({ mapparams }) => {
      this.mapParams = mapparams;
    });
  }

  _getWebMapInstance() {
    return this.webMapInstance;
  }

  _isWebMapV3(version) {
    return version.startsWith('3.');
  }
}
