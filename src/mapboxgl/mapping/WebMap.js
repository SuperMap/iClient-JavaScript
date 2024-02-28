/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import mapboxgl from 'mapbox-gl';
 import { FetchRequest, Lang } from '@supermap/iclient-common';
 import { Util } from '../core/Util';
 import { WebMap as WebMapV2 } from './webmap/v2/WebMap';
 import { WebMap as WebMapV3 } from './webmap/v3/WebMap';

 /**
  * @class mapboxgl.supermap.WebMap
  * @version 9.1.2
  * @category  iPortal/Online
  * @classdesc 对接 iPortal/Online 地图类。目前支持地图坐标系包括：'EPSG:3857'，'EPSG:4326'，'EPSG:4490'，'EPSG:4214'，'EPSG:4610'。
  * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
  *      <p style="color: #ce4844">Notice</p>
  *      <p style="font-size: 13px">该功能依赖 <a href='https://iclient.supermap.io/web/libs/geostats/geostats.js'>geostats</a> 和 <a href='https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js'>JsonSql</a> 插件，请确认引入该插件。</p>
  *      `<script type="text/javascript" src="https://iclient.supermap.io/web/libs/geostats/geostats.js"></script>`</br>
  *      `<script type="text/javascript" src="https://iclient.supermap.io/web/libs/jsonsql/jsonsql.js"></script>`
  * </div>
  * @param {number} id - iPortal|Online 地图 ID。
  * @param {Object} options - 参数。
  * @param {string} [options.target='map'] - 地图容器 ID。
  * @param {string} [options.server="https://www.supermapol.com"] - 地图的地址。
  * @param {string} [options.credentialKey] - 凭证密钥。
  * @param {string} [options.credentialValue] - 凭证值。
  * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
  * @param {boolean} [options.excludePortalProxyUrl] - server 传递过来的 URL 是否带有代理。
  * @fires mapboxgl.supermap.WebMap#getmapfailed
  * @fires mapboxgl.supermap.WebMap#getwmtsfailed
  * @fires mapboxgl.supermap.WebMap#getlayersfailed
  * @fires mapboxgl.supermap.WebMap#getfeaturesfailed
  * @fires mapboxgl.supermap.WebMap#addlayerssucceeded
  * @extends {mapboxgl.Evented}
  */
 export class WebMap extends mapboxgl.Evented {
   /**
    * @constructs
    * @version 9.1.2
    */
   constructor(id, options) {
     super();
     const { server, credentialKey, credentialValue, withCredentials, target } = options || {};
     this.mapId = id;
     this.server = this._formatServerUrl(server || 'https://www.supermapol.com');
     this.credentialKey = credentialKey;
     this.credentialValue = credentialValue;
     this.withCredentials = withCredentials || false;
     this.target = target || 'map';
     this.options = Object.assign({}, options, {
       server: this.server,
       withCredentials: this.withCredentials,
       target: this.target
     });
     this._createWebMap();
   }

   /**
    * @function mapboxgl.supermap.WebMap.prototype.resize
    * @description map resize。
    * @version 9.1.2
    */
   resize() {
     this.map.resize();
   }

   /**
    * @function mapboxgl.supermap.WebMap.prototype.setMapId
    * @param {string} mapId - webMap 地图 ID。
    * @description 设置 WebMap ID。
    * @version 9.1.2
    */
   setMapId(mapId) {
     this.mapId = mapId;
     this._createWebMap();
   }

   /**
    * @function mapboxgl.supermap.WebMap.prototype.setWebMapOptions
    * @param {Object} webMapOptions - webMap 参数。
    * @description 设置 webMap 参数。
    * @version 9.1.2
    */
   setWebMapOptions(webMapOptions) {
     const server = this._formatServerUrl(webMapOptions.server);
     this.server = server;
     this.options.server = server;
     this._createWebMap();
   }

   /**
    * @function mapboxgl.supermap.WebMap.prototype.setMapOptions
    * @param {Object} mapOptions - map 参数。
    * @description 设置 map 参数。
    * @version 9.1.2
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
    * @function mapboxgl.supermap.WebMap.prototype._createWebMap
    * @description 登陆窗口后添加地图图层。
    */
   _createWebMap() {
     const mapUrl = Util.transformUrl(Object.assign({ url: `${this.server}web/maps/${this.mapId}/map` }, this.options));
     this._getMapInfo(mapUrl);
   }

   /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._formatServerUrl
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
    * @function mapboxgl.supermap.WebMap.prototype._getMapInfo
    * @description 获取地图的 JSON 信息。
    * @param {string} mapUrl - 请求地图的 url。
    */
   _getMapInfo(mapUrl) {
     FetchRequest.get(mapUrl, null, { withCredentials: this.options.withCredentials })
       .then((response) => {
         return response.json();
       })
       .then((mapInfo) => {
         const projectionMap = {
           'EPSG:4490': 'EPSG:4490',
           'EPSG:4214': 'EPSG:4214',
           'EPSG:4610': 'EPSG:4610',
           'EPSG:3857': 'EPSG:3857',
           'EPSG:4326': 'EPSG:4326'
         };
         const baseProjection = this._getMapProjection(mapInfo);
         // 坐标系异常处理
         if (!(baseProjection in projectionMap)) {
           throw Error(Lang.i18n('msg_crsunsupport'));
         }
         this.webMapInstance = this._initMap(mapInfo);
         this._registerWebMapEvents();
         this.webMapInstance.createWebMap(mapInfo);
       })
       .catch((error) => {
         /**
          * @event mapboxgl.supermap.WebMap#getmapfailed
          * @description 获取地图信息失败。
          * @property {Object} error - 失败原因。
          */
         this.fire('getmapfailed', { error: error });
       });
   }

   /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._getMapProjection
    * @param {object} mapInfo - 地图信息。
    * @description 获取地图投影。
    */
   _getMapProjection(mapInfo) {
     if (mapInfo.version === '3.0.0') {
       return mapInfo.crs;
     }
     return mapInfo.projection;
   }

   /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._initMap
    * @param {object} mapInfo - 地图信息。
    * @description 初始化 WebMap 实例
    */
   _initMap(mapInfo) {
     const WebMapFactory = mapInfo.version === '3.0.0' ? WebMapV3 : WebMapV2;
     const webMapInstance =  new WebMapFactory(this.mapId, this.options);
     webMapInstance.setEventedParent(this);
     return webMapInstance;
   }

   /**
    * @private
    * @function mapboxgl.supermap.WebMap.prototype._registerWebMapEvents
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
 }

 mapboxgl.supermap.WebMap = WebMap;
