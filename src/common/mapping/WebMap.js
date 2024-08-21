/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { WebMapService } from './WebMapService';
 import { transformServerUrl } from './utils/util';
 import cloneDeep from 'lodash.clonedeep';
 
 const WORLD_WIDTH = 360;
 
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
  * @param {string} [options.server="https://www.supermapol.com"] - SuperMap iPortal/Online 服务器地址。当设置 `id` 时有效。
  * @param {string} [options.accessToken] - 用于访问 SuperMap iPortal 、SuperMap Online 中受保护的服务。当设置 `id` 时有效。
  * @param {string} [options.accessKey] - SuperMap iServer 提供的一种基于 Token（令牌）的用户身份验证机制。当设置 `id` 时有效。
  * @param {String} [options.tiandituKey] - 用于访问天地图的服务。当设置 `id` 时有效。
  * @param {String} [options.googleMapsAPIKey] - 用于访问谷歌地图。当设置 `id` 时有效。
  * @param {String} [options.googleMapsLanguage] - 用于定义在谷歌地图图块上显示标签的语言。当设置 `id` 且底图为谷歌地图时有效。
  * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。当设置 `id` 时有效。
  * @param {boolean} [options.excludePortalProxyUrl] - server 传递过来的 URL 是否带有代理。当设置 `id` 时有效。
  * @param {boolean} [options.ignoreBaseProjection = 'false'] - 是否忽略底图坐标系和叠加图层坐标系不一致。
  * @param {String} [options.iportalServiceProxyUrlPrefix] - iportal的代理服务地址前缀。
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
  * @usage
  */
 export function createWebMapExtending(SuperClass, { mapRepo }) {
  return class WebMap extends SuperClass {
    constructor(
      id,
      options = {
        layerFilter: function () {
          return true;
        }
      },
      mapOptions = { style: { version: 8, sources: {}, layers: [] } }
    ) {
      super();
      if (typeof id === 'string' || typeof id === 'number') {
        this.mapId = id;
      } else if (id !== null && typeof id === 'object') {
        this.webMapInfo = id;
      }
      if (!this.mapId && !mapOptions.center && !mapOptions.zoom) {
        mapOptions.center = [0, 0];
        mapOptions.zoom = 0;
      }
      if (options.map) {
        this.map = options.map;
      }
      this.options = Object.assign({}, options);
      delete this.options.map;
      this._setServer(options.server || 'https://www.supermapol.com');
      this.options.target = options.target || 'map';
      this.options.withCredentials = options.withCredentials || false;
      this.mapOptions = mapOptions;
      this.webMapService = new WebMapService(id, this.options);
      this.eventTypes = [
        'getmapinfofailed',
        'getlayerdatasourcefailed',
        'projectionisnotmatch',
        'mapinitialized',
        'notsupportbaidumap',
        'dataflowfeatureupdated',
        'addlayerssucceeded',
        'addlayerchanged',
        'getlayersfailed',
        'beforeremovemap',
        'crsnotsupport'
      ];
      this._cacheCleanLayers = [];
      this._mapInitializedHandler = this._mapInitializedHandler.bind(this);
      this._addLayersSucceededHandler = this._addLayersSucceededHandler.bind(this);
      this._addLayerChangedHandler = this._addLayerChangedHandler.bind(this);
      this._initWebMap(!this.map);
    }
  
    resize(keepBounds = false) {
      this.map && this.map.resize();
      this._handler && this._handler.echartsLayerResize();
      const mapContainerStyle = window.getComputedStyle(document.getElementById(this.options.target));
      const { bounds } = this.mapOptions;
      if (keepBounds && this.map && bounds && mapContainerStyle) {
        const zoom = this._getResizedZoom(bounds, mapContainerStyle);
        if (zoom !== this.map.getZoom()) {
          this.map && this.map.setZoom(zoom);
        }
      }
    }
  
    setCrs(crs) {
      if (this.map) {
        this.mapOptions.crs = crs;
        if (this.mapOptions.crs) {
          if (crs.epsgCode) {
            this.mapOptions.crs = new mapRepo.CRS(
              this.mapOptions.crs.epsgCode,
              this.mapOptions.crs.WKT,
              this.mapOptions.crs.extent,
              this.mapOptions.crs.unit
            );
            this.map.setCRS(this.mapOptions.crs);
          } else {
            this.map.setCRS(mapRepo.CRS.get(crs));
          }
        }
      }
    }
  
    setCenter(center) {
      if (this.map && this._centerValid(center)) {
        this.mapOptions.center = center;
        const { lng, lat } = this.map.getCenter();
        if (center[0] !== +lng.toFixed(4) || center[1] !== +lat.toFixed(4)) {
          this.map.setCenter(center, { from: 'setCenter' });
        }
      }
    }
  
    setRenderWorldCopies(renderWorldCopies) {
      if (this.map) {
        this.mapOptions.renderWorldCopies = renderWorldCopies;
        this.map.setRenderWorldCopies(renderWorldCopies);
      }
    }
  
    setBearing(bearing) {
      if (this.map) {
        this.mapOptions.bearing = bearing;
        if (bearing !== +this.map.getBearing().toFixed(2)) {
          (bearing || bearing === 0) && this.map.setBearing(bearing);
        }
      }
    }
  
    setPitch(pitch) {
      if (this.map) {
        this.mapOptions.pitch = pitch;
        if (pitch !== +this.map.getPitch().toFixed(2)) {
          (pitch || pitch === 0) && this.map.setPitch(pitch);
        }
      }
    }
  
    setStyle(style) {
      if (this.map) {
        this.mapOptions.style = style;
        this._initWebMap();
      }
    }
  
    setRasterTileSize(tileSize) {
      if (!this.map || tileSize <= 0) {
        return;
      }
      const sources = this.map.getStyle().sources;
      Object.keys(sources).forEach((sourceId) => {
        if (sources[sourceId].type === 'raster' && sources[sourceId].rasterSource === 'iserver') {
          this._updateRasterSource(sourceId, { tileSize });
        }
      });
    }
  
    setMaxBounds(maxBounds) {
      if (this.map) {
        this.mapOptions.maxBounds = maxBounds;
        maxBounds && this.map.setMaxBounds(maxBounds);
      }
    }
  
    setMinZoom(minZoom) {
      if (this.map) {
        this.mapOptions.minZoom = minZoom;
        (minZoom || minZoom === 0) && this.map.setMinZoom(minZoom);
      }
    }
  
    setMaxZoom(maxZoom) {
      if (this.map) {
        this.mapOptions.maxZoom = maxZoom;
        (maxZoom || maxZoom === 0) && this.map.setMaxZoom(maxZoom);
      }
    }
  
    getAppreciableLayers() {
      return (this._handler && this._handler.getAppreciableLayers()) || [];
    }
  
    getLegendInfo() {
      return (this._handler && this._handler.getLegendInfo()) || [];
    }
  
    getLayerCatalog() {
      return (this._handler && this._handler.getLayerCatalog()) || [];
    }
  
    updateOverlayLayer(layerInfo, features, mergeByField) {
      this._handler && this._handler.updateOverlayLayer(layerInfo, features, mergeByField);
    }
  
    copyLayer(id, layerInfo) {
      return this._handler && this._handler.copyLayer(id, layerInfo);
    }
  
    clean(removeMap = true) {
      if (this.map) {
        removeMap && this.fire('beforeremovemap', { map: this.map });
        if (this._handler) {
          this._handler.clean(removeMap);
          this._handler = null;
        }
        this.map = null;
        if (this.mapOptions && (this.mapId || this.webMapInfo)) {
          this.mapOptions.center = null;
          this.mapOptions.zoom = null;
        }
      }
    }
  
    cleanLayers() {
      // 清空追加的地图图层以及对应的事件
      if (!this.map) {
        return;
      }
      const sourceList = [];
      for (const item of this._cacheCleanLayers) {
        item.renderLayers.forEach((layerId) => {
          if (this.map.getLayer(layerId)) {
            this.map.removeLayer(layerId);
          }
        });
        if (this.map.getSource(item.renderSource.id) && !item.l7Layer) {
          sourceList.push(item.renderSource.id);
        }
      }
      Array.from(new Set(sourceList)).forEach((sourceId) => {
        this.map.removeSource(sourceId);
      });
      this._cacheCleanLayers = [];
      this.clean(false);
    }
  
    _initWebMap(clean = true) {
      clean && this.clean();
      if (this.webMapInfo) {
        // 传入是webmap对象
        const mapInfo = this.webMapInfo;
        mapInfo.mapParams = {
          title: this.webMapInfo.title,
          description: this.webMapInfo.description
        };
        this.mapParams = mapInfo.mapParams;
        Promise.resolve()
          .then(() => {
            this._getMapInfo(mapInfo);
          })
          .catch((error) => {
            this.fire('getmapinfofailed', { error });
          });
        return;
      } else if (!this.mapId || !this.options.serverUrl) {
        Promise.resolve()
          .then(() => {
            this._createMap('MapStyle');
          })
          .catch((error) => {
            this.fire('getmapinfofailed', { error });
          });
        return;
      }
      this._taskID = new Date();
      this.getMapInfo(this._taskID);
    }
  
    setZoom(zoom) {
      if (this.map) {
        this.mapOptions.zoom = zoom;
        if (zoom !== +this.map.getZoom().toFixed(2)) {
          (zoom || zoom === 0) && this.map.setZoom(zoom, { from: 'setZoom' });
        }
      }
    }
  
    setServerUrl(serverUrl) {
      this._setServer(serverUrl);
      this.webMapService.setServerUrl(this.options.serverUrl);
    }
  
    setWithCredentials(withCredentials) {
      this.options.withCredentials = withCredentials;
      this.webMapService.setWithCredentials(withCredentials);
    }
  
    setProxy(proxy) {
      this.options.proxy = proxy;
      this.webMapService.setProxy(proxy);
    }
  
    setMapId(mapId) {
      if (typeof mapId === 'string' || typeof mapId === 'number') {
        this.mapId = mapId;
        this.webMapInfo = null;
      } else if (mapId !== null && typeof mapId === 'object') {
        this.webMapInfo = mapId;
        this.mapId = '';
      }
      this.webMapService.setMapId(mapId);
      if (!mapId) {
        return;
      }
      setTimeout(() => {
        this._initWebMap();
      }, 0);
    }
  
    getMapInfo(_taskID) {
      this.webMapService
        .getMapInfo()
        .then(
          (mapInfo) => {
            if (this._taskID !== _taskID) {
              return;
            }
            // 存储地图的名称以及描述等信息，返回给用户
            this.mapParams = mapInfo.mapParams;
            this._getMapInfo(mapInfo);
          },
          (error) => {
            throw error;
          }
        )
        .catch((error) => {
          /**
           * @event WebMap#getmapinfofailed
           * @description 获取地图信息失败。
           * @property {Object} error - 失败原因。
           */
          this.fire('getmapinfofailed', { error });
          console.log(error);
        });
    }

    /**
     * @constructor
     * @private
     */
    _createWebMapFactory() {
      throw new Error('_createWebMapFactory is not implemented');
    }
  
    _mapInitializedHandler({ map }) {
      this.map = map;
      this.fire('mapinitialized', { map: this.map });
    }
  
    _addLayersSucceededHandler(params) {
      this.mapParams = params.mapparams;
      this._cacheCleanLayers = params.layers;
      this.fire('addlayerssucceeded', params);
    }
  
    _addLayerChangedHandler(params) {
      this._cacheCleanLayers = params.layers;
      this.fire('addlayerchanged', params);
    }
  
    _getMapInfo(mapInfo) {
      const type = +mapInfo.version.split('.')[0] >= 3 ? 'WebMap3' : 'WebMap2';
      this._createMap(type, mapInfo);
    }
  
    _createMap(type, mapInfo) {
      const commonOptions = {
        ...this.options,
        iportalServiceProxyUrlPrefix: this.webMapService.iportalServiceProxyUrl
      };
      const commonEvents = {
        ...this.eventTypes.reduce((events, name) => {
          events[name] = (params) => {
            this.fire(name, params);
          };
          return events;
        }, {}),
        mapinitialized: this._mapInitializedHandler,
        addlayerssucceeded: this._addLayersSucceededHandler,
        addlayerchanged: this._addLayerChangedHandler
      };
      const mapOptions = cloneDeep(this.mapOptions);
      /**
       * @constructor
       * @private
       */
      const WebMapFactory = this._createWebMapFactory(type);
      const mapId = this.mapId || this.webMapInfo;
      this._handler = new WebMapFactory(mapId, commonOptions, mapOptions);
      for (const type in commonEvents) {
        this._handler.on(type, commonEvents[type]);
      }
      let _mapInfo = {};
      const layerFilter = this.options.layerFilter;
      if (mapInfo) {
        _mapInfo = {
          ...mapInfo,
          layers: typeof layerFilter === 'function' ? mapInfo.layers.filter(layerFilter) : mapInfo.layers
        };
      }
      this._handler.initializeMap(_mapInfo, this.map);
    }
  
    _updateRasterSource(sourceId, options) {
      if (!sourceId) {
        return;
      }
      const source = this.map.getSource(sourceId);
  
      Object.assign(source, options);
      this.map.style.sourceCaches[sourceId].clearTiles();
      this.map.style.sourceCaches[sourceId].update(this.map.transform);
      this.map.triggerRepaint();
    }
  
    _getResizedZoom(bounds, mapContainerStyle, tileSize = 512, worldWidth = WORLD_WIDTH) {
      const { width, height } = mapContainerStyle;
      const lngArcLength = Math.abs(bounds.getEast() - bounds.getWest());
      const latArcLength = Math.abs(this._getBoundsRadian(bounds.getSouth()) - this._getBoundsRadian(bounds.getNorth()));
      const lngResizeZoom = +Math.log2(worldWidth / ((lngArcLength / parseInt(width)) * tileSize)).toFixed(2);
      const latResizeZoom = +Math.log2(worldWidth / ((latArcLength / parseInt(height)) * tileSize)).toFixed(2);
      if (lngResizeZoom <= latResizeZoom) {
        return lngResizeZoom;
      }
      return latResizeZoom;
    }
  
    _getBoundsRadian(point) {
      return (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (point * Math.PI) / 360));
    }
  
    _centerValid(center) {
      if (center && (center.length > 0 || typeof center === mapRepo.LngLat || center.lng)) {
        return true;
      }
      return false;
    }
  
    _getWebMapInstance() {
      return this._handler;
    }

    _setServer(url) {
      this.options.server = transformServerUrl(url);
      this.options.serverUrl = this.options.server;
    }
  }
}