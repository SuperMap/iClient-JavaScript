/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { WebMapService } from './WebMapService';
import { transformServerUrl } from './utils/util';
import cloneDeep from 'lodash.clonedeep';

const WORLD_WIDTH = 360;

/**
 * @class WebMapBase
 * @version 9.1.2
 * @category  iPortal/Online Resources Map
 * @classdesc 对接 iPortal/Online 地图类。
 * @modulecategory Mapping
 * @param {number} id - iPortal|Online 地图 ID。
 * @param {Object} options - 基础参数。
 * @param {string} [options.target='map'] - 地图容器 ID。
 * @param {string} [options.server="https://www.supermapol.com"] - 地图的地址。
 * @param {string} [options.credentialKey] - 凭证密钥。
 * @param {string} [options.credentialValue] - 凭证值。
 * @param {string} [options.tiandituKey] - 用于访问天地图的服务。当设置 `id` 时有效。
 * @param {string} [options.googleMapsAPIKey] - 用于访问谷歌地图。当设置 `id` 时有效。
 * @param {string} [options.googleMapsLanguage] - 用于定义在谷歌地图图块上显示标签的语言。当设置 `id` 且底图为谷歌地图时有效。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。当设置 `id` 时有效。
 * @param {boolean} [options.excludePortalProxyUrl] - server 传递过来的 URL 是否带有代理。当设置 `id` 时有效。
 * @param {boolean} [options.ignoreBaseProjection = false] - 是否忽略底图坐标系和叠加图层坐标系不一致。
 * @param {boolean} [options.isSuperMapOnline] - 是否是 SuperMap Online 地图。
 * @param {string} [options.iportalServiceProxyUrlPrefix] - iportal的代理服务地址前缀。
 * @param {string|boolean} [options.proxy] - HTTP 请求代理地址 。布尔值表示使用 iPortal 默认代理地址。
 * @param {boolean} [options.preferServer=false] - iServer rest/data服务, 使用服务器直接返回geojson。
 * @param {Object} mapOptions - 地图参数。
 * @param {Array} [mapOptions.center] - 中心点。
 * @param {number} [mapOptions.zoom] - 缩放级别。
 * @param {number} [mapOptions.bearing] - 旋转角度。
 * @param {number} [mapOptions.pitch] - 倾角。
 * @param {string|Object} [mapOptions.crs] - 投影。
 * @param {boolean} [mapOptions.renderWorldCopies] - 连续渲染。
 * @param {number} [mapOptions.rasterTileSize] - 栅格瓦片大小。
 * @param {Object} [mapOptions.style] - style 样式。
 * @fires WebMapBase#mapinitialized
 * @fires WebMapBase#mapcreatesucceeded
 * @fires WebMapBase#mapcreatefailed
 * @fires WebMapBase#addlayerssucceeded
 * @fires WebMapBase#layercreatefailed
 * @fires WebMapBase#baidumapnotsupport
 * @fires WebMapBase#layerorsourcenameduplicated
 * @fires WebMapBase#dataflowfeatureupdated
 * @fires WebMapBase#projectionnotmatch
 * @fires WebMapBase#mapbeforeremove
 * @fires WebMapBase#getmapfailed
 * @fires WebMapBase#getlayersfailed
 * @fires WebMapBase#xyztilelayernotsupport
 * @usage
 */
export function createWebMapBaseExtending(SuperClass, { mapRepo }) {
  return class WebMapBase extends SuperClass {
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
        /**
         * @event WebMapBase#mapinitialized
         * @description 地图初始化成功。
         * @property {Object} map - MapBoxGL Map 实例。
         */
        'mapinitialized',
        /**
         * @event WebMapBase#mapcreatesucceeded
         * @description 地图创建成功。
         * @property {Object} map - MapBoxGL Map 实例。
         * @property {Object} mapparams - 地图信息。
         * @property {string} mapParams.title - 地图标题。
         * @property {string} mapParams.description - 地图描述。
         * @property {Aarry} layers - 图层列表。
         */
        'mapcreatesucceeded',
        /**
         * @deprecated
         * @event WebMapBase#addlayerssucceeded
         * @description 地图创建成功。自v11.2.1废弃，请使用{@link WebMapBase#event:mapcreatesucceeded}替代。
         * @property {Object} map - MapBoxGL Map 实例。
         * @property {Object} mapparams - 地图信息。
         * @property {string} mapParams.title - 地图标题。
         * @property {string} mapParams.description - 地图描述。
         * @property {Aarry} layers - 图层列表。
         */
        'addlayerssucceeded',
        /**
         * @event WebMapBase#mapcreatefailed
         * @description 地图创建失败。
         * @property {Object} error - 失败原因。
         */
        'mapcreatefailed',
        /**
         * @deprecated
         * @event WebMapBase#getmapfailed
         * @description 地图创建失败。自v11.2.1废弃，请使用{@link WebMapBase#event:mapcreatefailed}替代。
         * @property {Object} error - 失败原因。
         */
        'getmapfailed',
        /**
         * @event WebMapBase#layercreatefailed
         * @description 图层创建失败。
         * @property {Object} error - 失败原因。
         * @property {Object} map - MapBoxGL Map 实例。
         * @property {Object} layer - 图层信息。
         */
        'layercreatefailed',
        /**
         * @deprecated
         * @event WebMapBase#getlayersfailed
         * @description 图层创建失败。自v11.2.1废弃，请使用{@link WebMapBase#event:layercreatefailed}替代。
         * @property {Object} error - 失败原因。
         * @property {Object} map - MapBoxGL Map 实例。
         * @property {Object} layer - 图层信息。
         */
        'getlayersfailed',
        /**
         * @event WebMapBase#baidumapnotsupport
         * @description 不支持百度地图。
         */
        'baidumapnotsupport',
        /**
         * @event WebMapBase#layerorsourcenameduplicated
         * @description 图层名或数据源名重复。
         */
        'layerorsourcenameduplicated',
        /**
         * @event WebMapBase#dataflowfeatureupdated
         * @description 数据流图层要素更新。
         */
        'dataflowfeatureupdated',
        /**
         * @event WebMapBase#projectionnotmatch
         * @description 底图投影与底图投影不匹配。
         */
        'projectionnotmatch',
        /**
         * @event WebMapBase#xyztilelayernotsupport
         * @description XYZ TILE图层与底图的分辨率或原点不匹配。
         */
        'xyztilelayernotsupport',
        'layeraddchanged',
        'layerupdatechanged',
        /**
         * @event WebMapBase#mapbeforeremove
         * @description 地图销毁前。
         */
        'mapbeforeremove'
      ];
      this._cacheCleanLayers = [];
      this._mapInitializedHandler = this._mapInitializedHandler.bind(this);
      this._mapCreateSucceededHandler = this._mapCreateSucceededHandler.bind(this);
      this._addLayerChangedHandler = this._addLayerChangedHandler.bind(this);
    }

    /**
     * @function WebMapBase.prototype.resize
     * @description 调整地图大小。
     * @param {boolean} [keepBounds=false] - 是否保持当前地图范围。
     */
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

    /**
     * @function WebMapBase.prototype.setCenter
     * @description 更新地图中心点。
     * @param {Array} center - 地图中心点。
     */
    setCenter(center) {
      if (this.map && this._centerValid(center)) {
        this.mapOptions.center = center;
        const { lng, lat } = this.map.getCenter();
        if (center[0] !== +lng.toFixed(4) || center[1] !== +lat.toFixed(4)) {
          this.map.setCenter(center, { from: 'setCenter' });
        }
      }
    }

    /**
     * @function WebMapBase.prototype.setRenderWorldCopies
     * @description 更新地图连续渲染。
     * @param {boolean} isWorldCopy - 地图是否连续渲染。
     */
    setRenderWorldCopies(isWorldCopy) {
      if (this.map) {
        this.mapOptions.renderWorldCopies = isWorldCopy;
        this.map.setRenderWorldCopies(isWorldCopy);
      }
    }

    /**
     * @function WebMapBase.prototype.setBearing
     * @description 更新地图旋转角度。
     * @param {number} pitch - 地图旋转角度。
     */
    setBearing(bearing) {
      if (this.map) {
        this.mapOptions.bearing = bearing;
        if (bearing !== +this.map.getBearing().toFixed(2)) {
          (bearing || bearing === 0) && this.map.setBearing(bearing);
        }
      }
    }

    /**
     * @function WebMapBase.prototype.setPitch
     * @description 更新地图倾角。
     * @param {number} pitch - 地图倾角。
     */
    setPitch(pitch) {
      if (this.map) {
        this.mapOptions.pitch = pitch;
        if (pitch !== +this.map.getPitch().toFixed(2)) {
          (pitch || pitch === 0) && this.map.setPitch(pitch);
        }
      }
    }

    /**
     * @function WebMapBase.prototype.setStyle
     * @description 更新地图样式。
     * @param {Object} style - 地图 style 样式
     * @param {boolean} preserveMap - 保留地图实例，覆盖图层样式。
     */
    setStyle(style, preserveMap = false) {
      if (this.map) {
        this.mapOptions.style = style;
        if (preserveMap) {
          this.cleanLayers();
        }
        if (this._isWebMapV3(style)) {
          this.setMapId(style, preserveMap)
          return;
        }
        this._initWebMap(!preserveMap);
      }
    }

    /**
     * @function WebMapBase.prototype.setRasterTileSize
     * @description 更新地图栅格图层瓦片大小。
     * @param {number} tileSize - 栅格瓦片大小。
     */
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

    /**
     * @function WebMapBase.prototype.setMaxBounds
     * @description 更新地图 maxbounds。
     * @param {number} maxBounds - 地图最大缩放范围。
     */
    setMaxBounds(maxBounds) {
      if (this.map) {
        this.mapOptions.maxBounds = maxBounds;
        maxBounds && this.map.setMaxBounds(maxBounds);
      }
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.setMinZoom
     * @description 更新地图 minzoom。
     * @param {number} minZoom - 地图最小缩放级别。
     */
    setMinZoom(minZoom) {
      if (this.map) {
        this.mapOptions.minZoom = minZoom;
        (minZoom || minZoom === 0) && this.map.setMinZoom(minZoom);
      }
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.setMaxZoom
     * @description 更新地图 maxzoom。
     * @param {number} maxZoom - 地图最大缩放级别。
     */
    setMaxZoom(maxZoom) {
      if (this.map) {
        this.mapOptions.maxZoom = maxZoom;
        (maxZoom || maxZoom === 0) && this.map.setMaxZoom(maxZoom);
      }
    }

    /**
     * @deprecated
     * @function WebMapBase.prototype.setWebMapOptions
     * @param {Object} webMapOptions - webMap 参数。
     * @description 设置 webMap 参数。
     */
    setWebMapOptions(webMapOptions) {
      this.setServerUrl(webMapOptions.server);
      this._initWebMap();
    }

    /**
     * @deprecated
     * @function WebMapBase.prototype.setMapOptions
     * @param {Object} mapOptions - map 参数。
     * @description 设置 map 参数。
     */
    setMapOptions(mapOptions) {
      let { center, zoom, maxBounds, minZoom, maxZoom, isWorldCopy, bearing, pitch } = mapOptions;
      center && center.length && this.setCenter(center);
      zoom && this.setZoom(zoom);
      maxBounds && this.setMaxBounds(maxBounds);
      minZoom && this.setMinZoom(minZoom);
      maxZoom && this.setMaxZoom(maxZoom);
      isWorldCopy && this.setRenderWorldCopies(isWorldCopy);
      bearing && this.setBearing(bearing);
      pitch && this.setPitch(pitch);
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.getLayers
     * @description 获取图层。
     * @returns {Array} 图层。
     */
    getLayers() {
      return (this._handler && this._handler.getLayers()) || [];
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.getLegends
     * @description 获取图例。
     * @returns {Array} 图例。
     */
    getLegends() {
      return (this._handler && this._handler.getLegends()) || [];
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.getLayerCatalog
     * @description 获取图层组。
     * @returns {Array} 图层组。
     */
    getLayerCatalog() {
      return (this._handler && this._handler.getLayerCatalog()) || [];
    }

    setLayersVisible() {
      this._handler && this._handler.setLayersVisible(...arguments);
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.toggleLayerVisible
     * @param {string} layer - 图层信息。
     * @param {boolean} visible - 图层是否可见。true 表示显示，false 表示隐藏。
     * @description 设置图层显隐。
     */
    toggleLayerVisible() {
      this._handler && this._handler.toggleLayerVisible(...arguments);
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.getWebMapType
     * @description 获取地图类型。
     * @returns {String} 地图类型。
     */
    getWebMapType() {
      return this.type;
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.rectifyLayersOrder
     * @param {Array} layers - 图层列表。
     * @param {string} topLayerBeforeId - 图层列表中置顶图层指定的 beforeId。
     * @description 根据已知顺序的可感知图层，对地图上图顺序进行排序。
     */
    rectifyLayersOrder() {
      this._handler && this._handler.rectifyLayersOrder(...arguments);
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.updateOverlayLayer
     * @description 更新 geojson 图层要素信息。
     * @param {Object} layerInfo - 图层信息。
     * @param {string} [layerInfo.id] - 图层信息 id。
     * @param {string} [layerInfo.renderSource] - 图层渲染 source 信息。
     * @param {Array} features - 要素信息。
     * @param {string} mergeByField - 属性关联字段。
     */
    updateOverlayLayer() {
      this._handler && this._handler.updateOverlayLayer(...arguments);
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.copyLayer
     * @description 复制指定图层。
     * @param {string} id - 指定图层 id。
     * @param {Object} [layerInfo] - 复制图层信息。如 id、source、layout
     * @returns {Array} 复制成功的信图层信息。
     */
    copyLayer() {
      return this._handler && this._handler.copyLayer(...arguments);
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.clean
     * @description 删除地图或者清空地图上的图层和事件。
     * @param {boolean} [removeMap=true] - 是否删除地图。false 表示只清空地图上的图层和事件。
     */
    clean(removeMap = true) {
      if (this.map) {
        removeMap && this._fire('mapbeforeremove', { map: this.map });
        if (this._handler) {
          this._handler.clean(removeMap);
          this._handler = null;
        }
        removeMap && (this.map = null);
        if (this.mapOptions && (this.mapId || this.webMapInfo)) {
          this.mapOptions.center = null;
          this.mapOptions.zoom = null;
        }
      }
    }

    /**
     * @version 11.2.1
     * @function WebMapBase.prototype.cleanLayers
     * @description 删除追加的图层和事件。当设置 `map` 时有效
     */
    cleanLayers() {
      // 清空追加的地图图层以及对应的事件
      if (!this.map) {
        return;
      }
      const layersToClean = this._cacheCleanLayers.filter((item) => !item.reused);
      this._handler && this._handler.cleanLayers(layersToClean);
      this._cacheCleanLayers = [];
      this.clean(false);
    }

    /**
     * @version 12.0.1
     * @function WebMapBase.prototype.changeBaseLayer
     * @description 切换底图
     * @param {BaseLayerConfig} layer - 图层配置对象
     * @typedef {Object} BaseLayerConfig
     * @property {string} id - 唯一标识
     * @property {string} title - 显示名称
     * @property {Array<Object>} layers - 上图的图层
     * @property {Object} sources - 图层对应的source
     * @returns {Object} 当前底图信息
     */
    changeBaseLayer() {
      return this._handler && this._handler.changeBaseLayer(...arguments);
    }

    _readyForInitializingWebMap() {
      this._initWebMap(!this.map);
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
            this._fire('mapcreatefailed', { error });
          });
        return;
      } else if (!this.mapId || !this.options.serverUrl) {
        Promise.resolve()
          .then(() => {
            this._createMap('MapStyle');
          })
          .catch((error) => {
            this._fire('mapcreatefailed', { error });
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

    setMapId(mapId, preserveMap = false) {
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
        this._initWebMap(!preserveMap);
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
          this._fire('mapcreatefailed', { error });
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
      this._fire('mapinitialized', { map: this.map });
    }

    _mapCreateSucceededHandler(params) {
      this.mapParams = params.mapparams;
      this._cacheCleanLayers = params.layers;
      this._fire('mapcreatesucceeded', params);
    }

    _addLayerChangedHandler(params) {
      this._cacheCleanLayers = params.layers;
      this.fire('layeraddchanged', params);
    }

    _isWebMapV3(styleInfo) {
      if (!styleInfo.version) {
        return false;
      }
      const subVersions = `${styleInfo.version}`.split('.')
      if (subVersions.length <= 1) {
        return false;
      }
      return +subVersions[0] >= 3;
    }

    _getMapInfo(mapInfo) {
      const type = this._isWebMapV3(mapInfo) ? 'WebMap3' : 'WebMap2';
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
            this._fire(name, params);
          };
          return events;
        }, {}),
        mapinitialized: this._mapInitializedHandler,
        mapcreatesucceeded: this._mapCreateSucceededHandler,
        layeraddchanged: this._addLayerChangedHandler
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
      this.type = type;
      // initializeMap 完成3个步骤：1. 注册投影 2. 判断投影与存在的map是否一致 3. 创建地图
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
      const latArcLength = Math.abs(
        this._getBoundsRadian(bounds.getSouth()) - this._getBoundsRadian(bounds.getNorth())
      );
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

    _fire(type, params) {
      const compatibleTypesList = [
        ['mapcreatesucceeded', 'addlayerssucceeded'],
        ['mapcreatefailed', 'getmapfailed'],
        ['layercreatefailed', 'getlayersfailed']
      ];
      const matchTypes = compatibleTypesList.find((list) => list.includes(type));
      const emitTypes = matchTypes || [type];
      emitTypes.forEach((item) => {
        this.fire(item, params);
      });
    }
  };
}
