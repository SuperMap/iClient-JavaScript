/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */
import cloneDeep from 'lodash.clonedeep';
import proj4 from 'proj4';
import { epsgDefine, toEpsgCode } from './utils/epsg-define';
import { ColorsPickerUtil } from '../util/ColorsPickerUtil';
import { Util } from '../commontypes/Util';
import { ArrayStatistic } from '../util/ArrayStatistic';
import { FetchRequest } from '../util/FetchRequest';
import { SourceListModel } from './utils/SourceListModelV2';
import { mergeFeatures } from './utils/util';

export function createWebMapV2Extending(SuperClass, { MapManager, mapRepo }) {
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
      super(id, options, mapOptions);
      if (typeof id === 'string' || typeof id === 'number') {
        this.mapId = id;
      }
      if (this._centerValid(mapOptions.center)) {
        this.center = mapOptions.center;
      }
      this.zoom = mapOptions.zoom;
      this.renderWorldCopies = mapOptions.renderWorldCopies;
      this.bounds = mapOptions.bounds;
      this.bearing = mapOptions.bearing;
      this.pitch = mapOptions.pitch;
      this.rasterTileSize = mapOptions.rasterTileSize || 256;
      this.layerFilter = options.layerFilter;
      this.checkSameLayer = options.checkSameLayer;
      this._taskID = new Date();
      this._cacheLayerId = new Map();
      this._layerTimerList = [];
      this._appendLayers = false;
    }
  
    /**
     * @function WebMap.prototype.initializeMap
     * @description 登陆窗口后添加地图图层。
     * @param {Object} mapInfo - map 信息。
     */
    initializeMap(mapInfo, map) {
      if (map) {
        this._appendLayers = true;
        this.map = map;
      }
      this._getMapInfo(mapInfo, this._taskID);
    }
  
    clean(removeMap = true) {
      if (this.map) {
        this.stopCanvg();
        removeMap && this.map.remove();
        this.map = null;
        this._legendList = [];
        this._sourceListModel = null;
        this.center = null;
        this.zoom = null;
        if (this._dataflowService) {
          this._dataflowService.off('messageSucceeded', this._handleDataflowFeaturesCallback);
          this._dataflowService.off('subscribesucceeded', this._initDataflowLayerCallback);
        }
        this._unprojectProjection = null;
        this._cacheLayerId = new Map();
      }
      if (this._layerTimerList.length) {
        this._layerTimerList.forEach((timer) => {
          clearInterval(timer);
        });
        this._layerTimerList = [];
      }
    }
  
    _initWebMap() {}
  
    _loadLayers(mapInfo, _taskID) {
      if (this.map) {
        if (this.map.getCRS().epsgCode !== this.baseProjection && !this.ignoreBaseProjection) {
          this.fire('projectionisnotmatch', {});
          return;
        }
        this._handleLayerInfo(mapInfo, _taskID);
      } else {
        setTimeout(() => {
          this._createMap(mapInfo);
          this.map.on('load', () => {
            this._handleLayerInfo(mapInfo, _taskID);
          });
        }, 0);
      }
    }
  
    _setCRS(baseProjection, wkt, bounds) {
      const crs = new mapRepo.CRS(baseProjection, wkt, bounds, bounds[2] > 180 ? 'meter' : 'degree');
      mapRepo.CRS.set(crs);
    }
  
    _getMapInfo(mapInfo, _taskID) {
      this._mapInfo = mapInfo;
      const { projection } = mapInfo;
      let bounds, wkt;
      this.baseProjection = toEpsgCode(projection);
      let defaultWktValue = epsgDefine.getProjection(this.baseProjection);
  
      if (defaultWktValue) {
        wkt = defaultWktValue;
      }
      if (!mapRepo.CRS.get(this.baseProjection)) {
        if (mapInfo.baseLayer && mapInfo.baseLayer.layerType === 'MAPBOXSTYLE') {
          let url = mapInfo.baseLayer.dataSource.url;
          if (url.indexOf('/restjsr/') > -1 && !/\/style\.json$/.test(url)) {
            url += '/style.json';
          }
          this.webMapService.getMapBoxStyle(url).then((res) => {
            if (res && res.metadata && res.metadata.indexbounds) {
              bounds = res.metadata.indexbounds;
            } else {
              bounds = [
                mapInfo.extent.leftBottom.x,
                mapInfo.extent.leftBottom.y,
                mapInfo.extent.rightTop.x,
                mapInfo.extent.rightTop.y
              ];
            }
            this._defineProj4(projection);
            this._setCRS(this.baseProjection, wkt, bounds);
            this._loadLayers(mapInfo, _taskID);
          });
        } else if (mapInfo.baseLayer && mapInfo.baseLayer.layerType === 'TILE') {
          // 获取地图的wkt
          this.getEpsgCodeWKT(`${mapInfo.baseLayer.url}/prjCoordSys.wkt`, {
            withoutFormatSuffix: true,
            withCredentials: this.webMapService.handleWithCredentials('', mapInfo.baseLayer.url, false)
          }).then((res) => {
            if (!wkt) {
              wkt = res;
            }
            this.getBounds(`${mapInfo.baseLayer.url}.json`, {
              withoutFormatSuffix: true,
              withCredentials: this.webMapService.handleWithCredentials('', mapInfo.baseLayer.url, false)
            }).then((res) => {
              if (res && res.bounds) {
                bounds = [res.bounds.leftBottom.x, res.bounds.leftBottom.y, res.bounds.rightTop.x, res.bounds.rightTop.y];
              } else {
                bounds = [
                  mapInfo.extent.leftBottom.x,
                  mapInfo.extent.leftBottom.y,
                  mapInfo.extent.rightTop.x,
                  mapInfo.extent.rightTop.y
                ];
              }
              this._defineProj4(wkt, projection);
              this._setCRS(this.baseProjection, wkt, bounds);
              this._loadLayers(mapInfo, _taskID);
            });
          });
        } else {
          // this._defineProj4(projection);
          // this._loadLayers(mapInfo, _taskID);
          this.fire('crsnotsupport');
          throw Error('Unsupported coordinate system!');
        }
      } else {
        this._defineProj4(projection);
        bounds = [
          mapInfo.extent.leftBottom.x,
          mapInfo.extent.leftBottom.y,
          mapInfo.extent.rightTop.x,
          mapInfo.extent.rightTop.y
        ];
        this._setCRS(this.baseProjection, wkt, bounds);
        this._loadLayers(mapInfo, _taskID);
      }
    }
  
    _handleLayerInfo(mapInfo, _taskID) {
      mapInfo = this._setLayerID(mapInfo);
      this._mapInfo = mapInfo;
      this.layerAdded = 0;
      this.expectLayerLen = 0;
      const { layers, grid } = mapInfo;
      this._setExpectLayerLen(mapInfo);
      if (this.expectLayerLen === 0) {
        this._sendMapToUser(0, 0);
      }
      if (this._shouldLoadBaseLayer(mapInfo, this.layerFilter)) {
        this._initBaseLayer(mapInfo, () => {
          this._addLayerSucceeded();
        });
      }
      if (layers && layers.length !== 0) {
        let filterLayers = layers;
        if (typeof this.layerFilter === 'function') {
          filterLayers = layers.filter(this.layerFilter);
        }
        this._initOverlayLayers(filterLayers, _taskID);
      }
      if (grid && grid.graticule) {
        this._initGraticuleLayer(grid.graticule);
      }
    }
  
    _setExpectLayerLen(mapInfo) {
      if (this._shouldLoadBaseLayer(mapInfo, this.layerFilter)) {
        this.expectLayerLen++;
      }
      let overLayers = mapInfo.layers;
      if (overLayers && overLayers.length > 0) {
        if (typeof this.layerFilter === 'function') {
          overLayers = overLayers.filter(this.layerFilter);
        }
        this.expectLayerLen += overLayers.length;
      }
    }
  
    _shouldLoadBaseLayer(mapInfo, layerFilter) {
      const baseLayer = mapInfo.baseLayer;
      if (!baseLayer) {
        return false;
      }
      if (typeof layerFilter === 'function') {
        return layerFilter(baseLayer);
      }
      return true;
    }
  
    _createMap(mapInfo) {
      // 获取字体样式
      const fontFamilys = this._getLabelFontFamily(mapInfo);
      const center = this._getMapCenter(mapInfo);
      // zoom
      let zoom = mapInfo.level || 0;
      let zoomBase = 0;
      let { bounds, minZoom, maxZoom } = this.mapOptions;
      const interactive = this.mapOptions.interactive;
      if (isNaN(minZoom)) {
        minZoom = mapInfo.minScale
          ? this._transformScaleToZoom(mapInfo.minScale, mapRepo.CRS.get(this.baseProjection))
          : 0;
      }
      if (isNaN(maxZoom)) {
        maxZoom = mapInfo.maxScale
          ? this._transformScaleToZoom(mapInfo.maxScale, mapRepo.CRS.get(this.baseProjection))
          : 22;
      }
      if (mapInfo.visibleExtent && mapInfo.visibleExtent.length === 4 && !bounds) {
        bounds = [
          this._unproject([mapInfo.visibleExtent[0], mapInfo.visibleExtent[1]]),
          this._unproject([mapInfo.visibleExtent[2], mapInfo.visibleExtent[3]])
        ];
      }
      if (minZoom > maxZoom) {
        [minZoom, maxZoom] = [maxZoom, minZoom];
      }
      if (!bounds) {
        if (mapInfo.minScale && mapInfo.maxScale) {
          zoomBase = Math.min(
            this._transformScaleToZoom(mapInfo.minScale, mapRepo.CRS.get(this.baseProjection)),
            this._transformScaleToZoom(mapInfo.maxScale, mapRepo.CRS.get(this.baseProjection))
          );
        } else {
          zoomBase = +Math.log2(
            this._getResolution(mapRepo.CRS.get(this.baseProjection).getExtent()) / this._getResolution(mapInfo.extent)
          ).toFixed(2);
        }
        zoom += zoomBase;
      }
  
      // 初始化 map
      this.map = new MapManager({
        ...this.mapOptions,
        container: this.target,
        center: this.center || center,
        zoom: this.zoom || zoom,
        minZoom,
        maxZoom,
        bearing: this.bearing || 0,
        pitch: this.pitch || 0,
        bounds,
        interactive: interactive === void 0 ? true : interactive,
        style: {
          version: 8,
          sources: {},
          layers: []
        },
        crs: this.baseProjection,
        localIdeographFontFamily: fontFamilys || '',
        renderWorldCopies: this.renderWorldCopies || false,
        transformRequest: (url, resourceType) => {
          if (resourceType === 'Tile') {
            if (this.isSuperMapOnline && url.indexOf('http://') === 0) {
              url = `https://www.supermapol.com/apps/viewer/getUrlResource.png?url=${encodeURIComponent(url)}`;
            }
            if (this.webMapService.isIportalResourceUrl(url)) {
              url = this.webMapService.handleParentRes(url);
            }
            const proxy = this.webMapService.handleProxy('image');
            return {
              url: url,
              credentials: this.webMapService.handleWithCredentials(proxy, url, false) ? 'include' : undefined
            };
          }
          return { url };
        },
        fadeDuration: 0
      });
      /**
       * @description Map 初始化成功。
       */
      this.fire('mapinitialized', { map: this.map });
    }
  
    _createMVTBaseLayer(layerInfo, addedCallback) {
      let url = layerInfo.dataSource.url;
      if (url.indexOf('/restjsr/') > -1 && !/\/style\.json$/.test(url)) {
        url += '/style.json';
      }
      this.webMapService
        .getMapBoxStyle(url)
        .then(
          (style) => {
            const sourceIds = Object.keys(style.sources);
            if (sourceIds.some((id) => this.map.getSource(id))) {
              addedCallback && addedCallback();
              return;
            }
            this.map.addStyle(style);
            const layerIds = [];
            style.layers.forEach((item) => {
              if (item.type !== 'background') {
                layerIds.push(item.id);
              }
            });
            this._setCacheLayer({
              parentLayerId: layerInfo.layerID || layerInfo.name,
              subRenderLayers: layerIds.map((layerId) => ({ layerId }))
            });
            addedCallback && addedCallback();
          },
          (error) => {
            addedCallback && addedCallback();
            throw new Error(error);
          }
        )
        .catch((error) => {
          /**
           * @event WebMapViewModel#getmapinfofailed
           * @description 获取地图信息失败。
           * @property {Object} error - 失败原因。
           */
          this.fire('getmapinfofailed', { error });
        });
    }
  
    _initBaseLayer(mapInfo, addedCallback) {
      const layerInfo = mapInfo.baseLayer || mapInfo;
      const layerType = this.getBaseLayerType(layerInfo);
      const mapUrls = this.getMapurls();
      let url;
      this.baseLayerProxy = this.webMapService.handleProxy('image');
      switch (layerType) {
        case 'TIANDITU':
          this.baseLayerProxy = null;
          this._createTiandituLayer(mapInfo, addedCallback);
          break;
        case 'BING':
          this.baseLayerProxy = null;
          this._createBingLayer(layerInfo.layerID || layerInfo.name, layerInfo, addedCallback);
          break;
        case 'WMS':
          this._createWMSLayer(layerInfo, addedCallback);
          break;
        case 'WMTS':
          this._createWMTSLayer(layerInfo, addedCallback);
          break;
        case 'TILE':
          this._createDynamicTiledLayer(layerInfo, addedCallback);
          break;
        case 'CLOUD':
        case 'XYZ':
          url = mapUrls[layerInfo.layerType]
            .replace('{googleMapsLanguage}', this.googleMapsLanguage)
            .replace('{googleMapsAPIKey}', this.googleMapsAPIKey);
          this._createXYZLayer(layerInfo, url, addedCallback);
          break;
        case 'BAIDU':
          this.fire('notsupportbaidumap', {});
          addedCallback && addedCallback();
          break;
        case 'MAPBOXSTYLE':
          this._createMVTBaseLayer(layerInfo, addedCallback); // 添加矢量瓦片服务作为底图
          break;
      }
    }
  
    _initOverlayLayers(layers, _taskID) {
      // 存储地图上所有的图层对象
      if (this.expectLayerLen > 0) {
        layers.forEach((layer) => {
          const type = this.webMapService.getDatasourceType(layer);
          // TODO  ---  暂不支持 SAMPLE_DATA
          if (type === 'SAMPLE_DATA') {
            this._addLayerSucceeded();
            this.fire('getlayerdatasourcefailed', {
              error: 'SAMPLE DATA is not supported',
              layer,
              map: this.map
            });
            return;
          }
  
          if (layer.visibleScale) {
            const { minScale, maxScale } = layer.visibleScale;
            layer.minzoom = Math.max(this._transformScaleToZoom(minScale), 0);
            layer.maxzoom = Math.min(24, this._transformScaleToZoom(maxScale) + 0.0000001);
          }
  
          if (type === 'tile') {
            this._initBaseLayer(layer, () => {
              this._addLayerSucceeded();
            });
            if (layer.autoUpdateTime) {
              this._layerTimerList.push(
                setInterval(() => {
                  this._initBaseLayer(layer);
                }, layer.autoUpdateTime)
              );
            }
          } else {
            this.getLayerFeatures(layer, _taskID, type);
            if (layer.autoUpdateTime) {
              this._layerTimerList.push(
                setInterval(() => {
                  this.getLayerFeatures(layer, _taskID, type);
                }, layer.autoUpdateTime)
              );
            }
          }
        }, this);
      }
    }
  
    _initOverlayLayer(layerInfo, features = [], mergeByField) {
      const { layerID, layerType, visible, style, featureType, projection } = layerInfo;
      layerInfo.visible = visible ? 'visible' : 'none';
      features = mergeFeatures({ sourceId: layerID, features, mergeByField, map: this.map });
      if (layerType === 'restMap') {
        this._createRestMapLayer(features, layerInfo);
        return;
      }
      if (layerType === 'mvt') {
        this._createMvtLayer(features.info, layerInfo, features.featureType);
        return;
      }
  
      // mbgl 目前不能处理 geojson 复杂面情况
      // mbgl isssue https://github.com/mapbox/mapbox-gl-js/issues/7023
      if (features && features[0] && features[0].geometry && features[0].geometry.type === 'Polygon') {
        features = this._handleMultyPolygon(features);
      }
  
      if (
        features &&
        projection &&
        (projection !== this.baseProjection || projection === 'EPSG:3857' || projection === 'EPSG:-1000') &&
        layerInfo.dataSource &&
        layerInfo.dataSource.type !== 'REST_DATA'
      ) {
        this._unprojectProjection = this._defineProj4(projection);
        features = this.transformFeatures(features);
      }
  
      features = this.handleLayerFeatures(features, layerInfo);
  
      if (layerType === 'VECTOR') {
        if (featureType === 'POINT') {
          if (style.type === 'SYMBOL_POINT') {
            this._createSymbolLayer(layerInfo, features);
          } else {
            this._createGraphicLayer(layerInfo, features);
          }
        } else {
          // 线和面
          this._createVectorLayer(layerInfo, features);
          // 不在 _createVectorLayer 里面处理 layerAdded++ 的原因：_createDataflowLayer 也调用了_createVectorLayer ，会导致layerAdded > expectLayerLen
          this._addLayerSucceeded({ layerInfo, features });
        }
      } else if (layerType === 'UNIQUE') {
        this._createUniqueLayer(layerInfo, features);
      } else if (layerType === 'RANGE') {
        this._createRangeLayer(layerInfo, features);
      } else if (layerType === 'HEAT') {
        this._createHeatLayer(layerInfo, features);
      } else if (layerType === 'MARKER') {
        this._createMarkerLayer(layerInfo, features);
      } else if (layerType === 'MIGRATION') {
        this._createMigrationLayer(layerInfo, features);
      } else if (layerType === 'RANK_SYMBOL') {
        this._createRankSymbolLayer(layerInfo, features);
      } else if (this._isDataflowLayer(layerType)) {
        this._createDataflowLayer(layerInfo);
      }
    }
  
    _initGraticuleLayer(graticuleInfo) {
      const options = this._createGraticuleOptions(graticuleInfo);
      const graticuleLayer = new mapRepo.supermap.GraticuleLayer(options);
      this._setGraticuleDash(graticuleInfo.lineDash, graticuleLayer);
      this._graticuleLayer = graticuleLayer;
      this.map.addLayer(graticuleLayer);
      this._setCacheLayer({
        parentLayerId: graticuleLayer.id,
        subRenderLayers: [{ layerId: graticuleLayer.id }, { layerId: graticuleLayer.sourceId }]
      });
    }
  
    _createGraticuleOptions(graticuleInfo) {
      let { extent, lonLabelStyle, latLabelStyle } = graticuleInfo;
      const { strokeColor, lineDash, strokeWidth, interval } = graticuleInfo;
      const strokeStyle = {
        lineColor: strokeColor,
        lindDasharray: lineDash,
        lineWidth: strokeWidth
      };
      lonLabelStyle = {
        textFont: lonLabelStyle.fontFamily.split(','),
        textSize: lonLabelStyle.fontSize,
        textAnchor: latLabelStyle.textBaseline,
        textColor: lonLabelStyle.fill,
        textHaloColor: lonLabelStyle.outlineColor,
        textHaloWidth: lonLabelStyle.outlineWidth
      };
      latLabelStyle = {
        textFont: latLabelStyle.fontFamily.split(','),
        textSize: latLabelStyle.fontSize,
        textAnchor: latLabelStyle.textBaseline,
        textColor: latLabelStyle.fill,
        textHaloColor: latLabelStyle.outlineColor,
        textHaloWidth: latLabelStyle.outlineWidth
      };
      extent = extent || this.map.getCRS().extent;
      extent = [this._unproject([extent[0], extent[1]]), this._unproject([extent[2], extent[3]])];
      return {
        minZoom: 1,
        strokeStyle,
        extent,
        interval: interval && interval[0],
        lngLabelStyle: lonLabelStyle,
        latLabelStyle,
        layerID: `graticuleLayer_${+new Date()}`
      };
    }
  
    _setGraticuleDash(lindDasharray, graticuleLayers) {
      this.map.on('zoomend', () => {
        if (this.map.getZoom() < 3) {
          graticuleLayers.setStrokeStyle({ lindDasharray: [0.1, 3] });
        } else {
          graticuleLayers.setStrokeStyle({ lindDasharray });
        }
      });
    }
  
    _createTiandituLayer(mapInfo, addedCallback) {
      const tiandituUrls = this._getTiandituUrl(mapInfo);
      const { labelLayerVisible, name, visible } = mapInfo.baseLayer;
      const isLabel = Boolean(labelLayerVisible);
      const labelUrl = tiandituUrls.labelUrl;
      const tiandituUrl = tiandituUrls.tiandituUrl;
      this._addBaselayer({ url: tiandituUrl, layerID: name, visibility: visible });
      isLabel &&
        this._addBaselayer({
          url: labelUrl,
          layerID: this._getTdtLabelLayerName(name),
          parentLayerId: name,
          visibility: visible
        });
      addedCallback && addedCallback();
    }
  
    _createWMTSLayer(layerInfo, addedCallback) {
      this.webMapService
        .getWmtsInfo(layerInfo, this.map.getCRS().epsgCode)
        .then(
          (result) => {
            const layerId = layerInfo.layerID || layerInfo.name;
            if (result.isMatched) {
              const wmtsUrl = this._getWMTSUrl(Object.assign({}, layerInfo, result));
              this._addBaselayer({
                url: [wmtsUrl],
                layerID: layerId,
                visibility: layerInfo.visible,
                minzoom: result.matchMinZoom,
                maxzoom: result.matchMaxZoom,
                isIserver: false,
                bounds: result.bounds
              });
              addedCallback && addedCallback();
            }
          },
          (error) => {
            addedCallback && addedCallback();
            throw new Error(error);
          }
        )
        .catch((error) => {
          /**
           * @event WebMapViewModel#getmapinfofailed
           * @description 获取地图信息失败。
           * @property {Object} error - 失败原因。
           */
          this.fire('getmapinfofailed', { error });
        });
    }
  
    async _createBingLayer(layerName, layerInfo, addedCallback) {
      let metaInfoUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Metadata/RoadOnDemand?uriScheme=https&include=ImageryProviders&key=${this.bingMapsKey}&c=zh-cn`;
      const metaInfo = await this._fetchRequest(metaInfoUrl, 'json', {
        withoutFormatSuffix: true
      });
      if (
        metaInfo.statusCode !== 200 ||
        metaInfo.resourceSets.length !== 1 ||
        metaInfo.resourceSets[0].resources.length !== 1
      ) {
        return;
      }
      const resource = metaInfo.resourceSets[0].resources[0];
      const urls = resource.imageUrlSubdomains.map((subdomain) => {
        const imageUrl = resource.imageUrl.replace('{subdomain}', subdomain);
        return imageUrl;
      });
  
      this._addBaselayer({ url: urls, layerID: layerName, visibility: layerInfo.visible });
      addedCallback && addedCallback();
    }
  
    _createXYZLayer(layerInfo, url, addedCallback) {
      let urlArr = [];
  
      if (layerInfo.layerType === 'OSM') {
        const res = url.match(/\w\-\w/g)[0];
        const start = res[0];
        const end = res[2];
        let alphabet = '';
        for (let i = 97; i < 123; i++) {
          alphabet += String.fromCharCode(i);
        }
        const alphabetArr = alphabet.split('');
  
        const startIndex = alphabetArr.indexOf(start);
        const endIndex = alphabetArr.indexOf(end);
  
        const res3 = alphabetArr.slice(startIndex, endIndex + 1);
  
        for (let i = 0; i < res3.length; i++) {
          const replaceRes = url.replace(/{\w\-\w}/g, res3[i]);
          urlArr.push(replaceRes);
        }
      } else if (layerInfo.layerType === 'GOOGLE_CN') {
        const res = url.match(/\d\-\d/g)[0];
        const start = parseInt(res[0]);
        const end = parseInt(res[2]);
  
        for (let i = start; i <= end; i++) {
          const replaceRes = url.replace(/{\d\-\d}/g, i.toString());
          urlArr.push(replaceRes);
        }
      } else {
        urlArr = [url];
      }
      const layerId = layerInfo.layerID || layerInfo.name;
      this._addBaselayer({ url: urlArr, layerID: layerId, visibility: layerInfo.visible });
      addedCallback && addedCallback();
    }
  
    _createDynamicTiledLayer(layerInfo, addedCallback) {
      const url = layerInfo.url;
      const layerId = layerInfo.layerID || layerInfo.name;
      const { minzoom, maxzoom } = layerInfo;
      this._addBaselayer({
        url: [url],
        layerID: layerId,
        visibility: layerInfo.visible,
        minzoom,
        maxzoom,
        isIserver: true
      });
      addedCallback && addedCallback();
    }
  
    _createWMSLayer(layerInfo, addedCallback) {
      this.webMapService
        .getWmsInfo(layerInfo)
        .then(
          (result) => {
            const layerId = layerInfo.layerID || layerInfo.name;
            if (result) {
              const wmsUrl = this._getWMSUrl(layerInfo, result.version);
              this._addBaselayer({ url: [wmsUrl], layerID: layerId, visibility: layerInfo.visible });
              addedCallback && addedCallback();
            }
          },
          (error) => {
            addedCallback && addedCallback();
            throw new Error(error);
          }
        )
        .catch((error) => {
          /**
           * @event WebMapViewModel#getmapinfofailed
           * @description 获取地图信息失败。
           * @property {Object} error - 失败原因。
           */
          this.fire('getmapinfofailed', { error });
        });
    }
  
    _createVectorLayer(layerInfo, features) {
      const type = layerInfo.featureType;
      const { layerID, minzoom, maxzoom, style, visible, parentLayerId = layerID } = layerInfo;
      const layerSource = this.map.getSource(layerID);
      const sourceData = {
        type: 'FeatureCollection',
        features: features
      };
      if (!layerSource) {
        const source = {
          type: 'geojson',
          data: sourceData
        };
        this.map.addSource(layerID, source);
      } else {
        layerSource.setData(sourceData);
      }
      const styleArr = Array.isArray(style) ? style : [style];
      if (styleArr.length === 2) {
        // 道路
        if (styleArr[0].lineDash === 'solid' && styleArr[1].lineDash === 'solid') {
          styleArr[0].strokeWidth = styleArr[1].strokeWidth;
          styleArr[1].strokeWidth = styleArr[1].strokeWidth - 2;
        }
        // 铁路
        if (styleArr[0].lineDash === 'solid' && styleArr[1].lineDash === 'dash') {
          styleArr[0].strokeWidth = styleArr[1].strokeWidth;
          styleArr[1].strokeWidth = styleArr[1].strokeWidth * 0.5;
          styleArr[1].lineDash = 'dashrailway';
        }
      }
      styleArr.forEach((element, index) => {
        const layerStyle = {
          style: this._transformStyleToMapBoxGl(element, type),
          layout: {
            visibility: visible
          }
        };
        const newLayerID = index === 0 ? layerID : `${layerID}-additional-${index}`;
        this._addOverlayToMap({
          type,
          source: layerID,
          layerID: newLayerID,
          parentLayerId,
          layerStyle,
          minzoom,
          maxzoom
        });
      });
      // 如果面有边框
      type === 'POLYGON' &&
        style.strokeColor &&
        this._addStrokeLineForPoly({
          style,
          source: layerID,
          layerID: layerID + '-strokeLine',
          parentLayerId: layerID,
          visible,
          minzoom,
          maxzoom
        });
    }
  
    _getWMSUrl(mapInfo, version = '1.1.1') {
      let url = mapInfo.url;
      const options = {
        service: 'WMS',
        request: 'GetMap',
        layers:
          mapInfo.layers !== null && typeof mapInfo.layers === 'object'
            ? mapInfo.layers.join(',')
            : mapInfo.layers || '0', // 如果是多个图层，用逗号分隔
        styles: '',
        format: 'image/png',
        transparent: 'true',
        version,
        width: 256,
        height: 256
      };
      if (version === '1.3.0') {
        options.bbox = this.baseProjection === 'EPSG:4326' ? '{bbox-wms-1.3.0}' : '{bbox-epsg-3857}';
        options.crs = this.baseProjection;
      } else {
        options.bbox = '{bbox-epsg-3857}';
        options.srs = this.baseProjection;
      }
      return Util.urlAppend(url, this._getParamString(options, url));
    }
  
    _setLayerID(mapInfo) {
      const sumInfo = {};
      const { baseLayer, layers = [] } = mapInfo;
      if (!this.checkSameLayer) {
        const baseInfo = this._generateUniqueLayerId({ layerId: baseLayer.name, repeatIndex: 0 });
        baseLayer.title = baseLayer.name;
        baseLayer.name = baseInfo.newId;
      }
      const layerNames = layers.map((layer) => layer.name);
      const _layers = layers.map((layer, index) => {
        if (!(layer.name in sumInfo)) {
          sumInfo[layer.name] = baseLayer.name === layer.name ? 1 : 0;
        }
        const matchFirstIndex = layerNames.indexOf(layer.name);
        const matchLastIndex = layerNames.lastIndexOf(layer.name);
        if (index > matchFirstIndex && index <= matchLastIndex) {
          sumInfo[layer.name] = sumInfo[layer.name] + 1;
        }
        let layerID = sumInfo[layer.name] ? `${layer.name}-${sumInfo[layer.name]}` : layer.name;
        if (!this.checkSameLayer || layer.layerType !== 'raster') {
          const { newId, newIndex } = this._generateUniqueLayerId({
            layerId: layerID,
            repeatIndex: sumInfo[layer.name],
            layerType: layer.layerType
          });
          sumInfo[layer.name] = newIndex;
          layerID = newId;
        }
        return Object.assign(layer, { layerID });
      });
      mapInfo.layers = _layers;
      mapInfo.baseLayer = baseLayer;
      return mapInfo;
    }
  
    _generateUniqueLayerId(options) {
      let { layerId, repeatIndex, layerType } = options;
      if (this.map.getLayer(layerId)) {
        repeatIndex++;
        // 判断是否带有-index后缀
        if (layerId.match(/-\d+&/gi)) {
          layerId = layerId.replace(/\d+$/gi, repeatIndex);
        } else {
          layerId = `${layerId}-${repeatIndex}`;
        }
        return this._generateUniqueLayerId({ ...options, layerId, repeatIndex });
      } else {
        if (this._isDataflowLayer(layerType)) {
          return { newId: `${layerId}_${+new Date()}`, newIndex: repeatIndex + 1 };
        }
        return { newId: layerId, newIndex: repeatIndex };
      }
    }
  
    _createRestMapLayer(restMaps, layer) {
      restMaps.forEach((restMapInfo) => {
        layer = this.getRestMapLayerInfo(restMapInfo, layer);
        this._initBaseLayer(layer);
      });
      this._addLayerSucceeded();
    }
  
    _addLayerSucceeded(options) {
      if (
        (((options || {}).layerInfo || {}).labelStyle || {}).labelField &&
        options.layerInfo.layerType !== 'DATAFLOW_POINT_TRACK'
      ) {
        // 存在标签专题图
        this._addLabelLayer(options.layerInfo, options.features, false);
      }
      this.layerAdded++;
      this._sendMapToUser(this.layerAdded, this.expectLayerLen);
    }
  
    _createDataflowLayer(layerInfo) {
      const dataflowService = new mapRepo.supermap.DataFlowService(layerInfo.wsUrl).initSubscribe();
      this._handleDataflowFeaturesCallback = this._handleDataflowFeatures.bind(this, layerInfo);
      this._initDataflowLayerCallback = this._initDataflowLayer.bind(this, layerInfo);
      dataflowService.on('subscribesucceeded', this._initDataflowLayerCallback);
      dataflowService.on('messageSucceeded', this._handleDataflowFeaturesCallback);
      this._dataflowService = dataflowService;
    }
  
    _initDataflowLayer() {
      this._addLayerSucceeded();
    }
  
    _handleDataflowFeatures(layerInfo, e) {
      let features = [JSON.parse(e.data)];
      // this.transformFeatures([features]); // TODO 坐标系
      this.fire('dataflowfeatureupdated', {
        features,
        identifyField: layerInfo.identifyField,
        layerID: layerInfo.layerID
      });
  
      if (layerInfo.projection === 'EPSG:3857') {
        features = this.transformFeatures(features);
      }
      if (layerInfo.filterCondition) {
        // 过滤条件
        let condition = this.replaceFilterCharacter(layerInfo.filterCondition);
        const properties = features[0].properties || {};
        condition = this.parseCondition(condition, Object.keys(properties));
        const filterFeature = this.parseConditionFeature(properties);
        const sql = 'select * from json where (' + condition + ')';
        const filterResult = window.jsonsql.query(sql, {
          attributes: filterFeature
        });
        if (filterResult && filterResult.length > 0) {
          this._addDataflowLayer(layerInfo, features[0]);
        }
      } else {
        this._addDataflowLayer(layerInfo, features[0]);
      }
    }
  
    _getDataFlowRotateStyle(features, directionField, identifyField) {
      const iconRotateExpression = ['match', ['get', identifyField]];
      features.forEach((feature) => {
        let value;
        if (directionField !== undefined && directionField !== '未设置' && directionField !== 'None') {
          value = feature.properties[directionField];
        } else {
          value = 0;
        }
        if (value > 360 || value < 0) {
          return null;
        }
        iconRotateExpression.push(feature.properties[identifyField], parseInt(value));
      });
      iconRotateExpression.push(0);
      return iconRotateExpression;
    }
  
    async _addDataflowLayer(layerInfo, feature) {
      const layerID = layerInfo.layerID;
      if (layerInfo.layerType === 'DATAFLOW_HEAT') {
        if (!this.map.getSource(layerID)) {
          this._createHeatLayer(layerInfo, [feature], false);
        } else {
          this._updateDataFlowFeature(layerID, feature, layerInfo);
        }
      } else {
        const layerStyle = layerInfo.pointStyle;
        layerInfo.style = layerStyle;
        if (!this.map.getSource(layerID)) {
          const iconRotateExpression = this._getDataFlowRotateStyle(
            [feature],
            layerInfo.directionField,
            layerInfo.identifyField
          );
          if (['BASIC_POINT', 'SVG_POINT', 'IMAGE_POINT'].includes(layerStyle.type)) {
            await this._createGraphicLayer(layerInfo, [feature], null, iconRotateExpression, false);
          } else {
            this._createSymbolLayer(layerInfo, [feature], null, iconRotateExpression, false);
          }
        } else {
          this._updateDataFlowFeature(layerID, feature, layerInfo, 'point');
        }
        if (layerInfo.labelStyle && layerInfo.visible) {
          const labelSymbolLayerId = this._getSymbolLabelLayerName(layerID);
          if (!this.map.getSource(labelSymbolLayerId)) {
            this._addLabelLayer(layerInfo, [feature], true);
          } else {
            this._updateDataFlowFeature(labelSymbolLayerId, feature, layerInfo);
          }
        }
        if (layerInfo.lineStyle && layerInfo.visible) {
          if (!this.map.getSource(layerID + '-line')) {
            const geometry = feature.geometry.coordinates;
            const lineFeature = {
              type: 'Feature',
              properties: feature.properties,
              geometry: {
                type: 'LineString',
                coordinates: [geometry]
              }
            };
            this._createVectorLayer(
              {
                style: layerInfo.lineStyle,
                featureType: 'LINE',
                visible: 'visible',
                layerID: layerID + '-line',
                parentLayerId: layerID
              },
              [lineFeature]
            );
          } else {
            this._updateDataFlowFeature(layerID + '-line', feature, layerInfo, 'line');
          }
        }
      }
    }
  
    _updateDataFlowFeature(sourceID, newFeature, layerInfo, type) {
      const { identifyField, maxPointCount, directionField } = layerInfo;
      const features = cloneDeep(this.map.getSource(sourceID)._data.features);
      let has = false;
      features.forEach((item, index) => {
        if (item.properties[identifyField] === newFeature.properties[identifyField]) {
          has = true;
          if (type === 'line') {
            const coordinates = item.geometry.coordinates;
            coordinates.push(newFeature.geometry.coordinates);
            if (maxPointCount && coordinates.length > maxPointCount) {
              coordinates.splice(0, coordinates.length - maxPointCount);
            }
            features[index].geometry.coordinates = coordinates;
          } else {
            features[index] = newFeature;
          }
        }
      });
      if (!has) {
        if (type === 'line') {
          features.push({
            type: 'Feature',
            properties: newFeature.properties,
            geometry: {
              type: 'LineString',
              coordinates: [newFeature.geometry.coordinates]
            }
          });
        } else {
          features.push(newFeature);
        }
      }
      this.map.getSource(sourceID).setData({ type: 'FeatureCollection', features });
      if (type === 'point') {
        const type = layerInfo.pointStyle.type;
        const iconRotateExpression = this._getDataFlowRotateStyle(features, directionField, identifyField);
        if (['SVG_POINT', 'IMAGE_POINT'].includes(type)) {
          this.map.setLayoutProperty(sourceID, 'icon-rotate', iconRotateExpression);
        } else if (type === 'SYMBOL_POINT') {
          this.map.setLayoutProperty(sourceID, 'text-rotate', iconRotateExpression);
        }
      }
    }
  
    _createMigrationLayer(layerInfo, features) {
      const { layerID, layerType } = layerInfo;
      const options = this.getEchartsLayerOptions(layerInfo, features, 'GLMap');
      options.GLMap = { roam: true };
      const echartslayer = new window.EchartsLayer(this.map);
      echartslayer.chart.setOption(options);
      this.echartslayer.push(echartslayer);
      this._addLayer({
        id: layerID,
        type: layerType,
        setLayoutProperty(name, value) {
          if (name === 'visibility') {
            if (value === 'visible') {
              echartslayer.chart._dom.style.display = 'block';
            } else {
              echartslayer.chart._dom.style.display = 'none';
            }
          }
        }
      });
      this._addLayerSucceeded({ layerInfo, features });
    }
  
    _createRankSymbolLayer(layerInfo, features) {
      const { minzoom, maxzoom } = layerInfo;
      const fieldName = layerInfo.themeSetting.themeField;
      const colors = layerInfo.themeSetting.colors;
      const style = layerInfo.style;
      const featureType = layerInfo.featureType;
      const styleSource = this.createRankStyleSource(layerInfo, features);
      const styleGroups = styleSource.styleGroups;
      features = this.getFilterFeatures(layerInfo.filterCondition, features);
      // 获取 expression
      const expression = ['match', ['get', 'index']];
      const colorExpression = ['match', ['get', 'index']];
      for (let index = 0; index < features.length; index++) {
        const row = features[index];
        const tartget = parseFloat(row.properties[fieldName]);
        if (styleGroups) {
          for (let i = 0; i < styleGroups.length; i++) {
            if (styleGroups[i].start <= tartget && tartget < styleGroups[i].end) {
              const radius =
                style.type === 'SYMBOL_POINT' || style.type === 'IMAGE_POINT'
                  ? style.type === 'SYMBOL_POINT'
                    ? styleGroups[i].radius * 2
                    : Number.parseFloat((styleGroups[i].radius / style.imageInfo.size.h).toFixed(2)) * 2
                  : styleGroups[i].radius;
              expression.push(row.properties.index, radius);
              colorExpression.push(row.properties.index, styleGroups[i].color);
              break;
            }
          }
        }
      }
      expression.push(1);
      colorExpression.push('rgba(0, 0, 0, 0)');
      // 图例处理
      this._initLegendConfigInfo(layerInfo, styleGroups);
      if (colors && colors.length > 0) {
        style.fillColor = colorExpression;
      }
      if (style.type === 'SYMBOL_POINT') {
        this._createSymbolLayer(layerInfo, features, expression);
      } else if (['SVG_POINT', 'IMAGE_POINT'].includes(style.type)) {
        this._createGraphicLayer(layerInfo, features, expression);
      } else {
        const source = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        };
        // 获取样式
        const layerStyle = {
          layout: {
            visibility: layerInfo.visible
          },
          style: this._transformStyleToMapBoxGl(layerInfo.style, featureType, expression, 'circle-radius')
        };
        const layerID = layerInfo.layerID;
        this._addOverlayToMap({ type: featureType, source, layerID, layerStyle, minzoom, maxzoom });
        this._addLayerSucceeded({ layerInfo, features });
      }
    }
  
    _addTextBackgroundImage(rgba) {
      if (!rgba[3]) {
        return '';
      }
      const width = 20; // The image will be 64 pixels square.
      const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
      const data = new Uint8Array(width * width * bytesPerPixel);
  
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
          const offset = (y * width + x) * bytesPerPixel;
          data[offset + 0] = rgba[0]; // red
          data[offset + 1] = rgba[1]; // green
          data[offset + 2] = rgba[2]; // blue
          data[offset + 3] = rgba[3] * 255; // alpha
        }
      }
      const imageId = `text-background-${rgba.join('-')}`;
      if (!this.map.hasImage(imageId)) {
        this.map.addImage(
          imageId,
          { width: width, height: width, data: data },
          {
            stretchX: [[0, 20]],
            stretchY: [[0, 20]],
            content: [0, 0, 20, 20]
          }
        );
      }
      return imageId;
    }
  
    _addLabelLayer(layerInfo, features, addSource = false) {
      const labelLayerId = this._getSymbolLabelLayerName(layerInfo.layerID);
      if (this.map.getLayer(labelLayerId)) {
        return;
      }
      const labelStyle = layerInfo.labelStyle;
      const properties = features[0] && features[0].properties;
      const textField = labelStyle.labelField.replace(/{(.+)}/g, '$1');
      if (!properties || !properties[textField]) {
        return;
      }
      let { backgroundFill = [255, 255, 255, 0] } = labelStyle;
      const fontFamily = labelStyle.fontFamily;
      const { minzoom, maxzoom } = layerInfo;
      const textSize = parseFloat(labelStyle.fontSize || 14);
      let textBackgroundImageId = '';
      if (labelStyle.placement !== 'line') {
        textBackgroundImageId = this._addTextBackgroundImage(backgroundFill);
      }
      backgroundFill = `rgba(${backgroundFill.join(',')})`;
      let textHaloColor = 'rgba(255,255,255,0)';
      if (labelStyle.outlineColor && labelStyle.outlineWidth > 0) {
        textHaloColor = labelStyle.outlineColor;
      }
  
      let textHaloWidth = (labelStyle.outlineWidth || 0) / 2;
      let textAnchor = labelStyle.textAlign || 'center';
      if (labelStyle.textBaseline && labelStyle.textBaseline !== 'middle') {
        textAnchor = `${labelStyle.textBaseline}${textAnchor === 'center' ? '' : `-${textAnchor}`}`;
      }
  
      const textOffset =
        layerInfo.featureType === 'POINT'
          ? [labelStyle.offsetX / textSize || 0, labelStyle.offsetY / textSize || 0]
          : [0, 0];
      const layout = {
        'text-field': `{${labelStyle.labelField}}`,
        'text-size': textSize,
        'text-offset': textOffset,
        'text-font': fontFamily ? [fontFamily] : ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
        'symbol-placement':
          labelStyle.placement === 'line' ? (layerInfo.featureType === 'POLYGON' ? 'line' : 'line-center') : 'point',
        'text-max-angle': layerInfo.featureType === 'POLYGON' ? 40 : 30,
        'symbol-spacing': layerInfo.featureType === 'POLYGON' ? 200 : 50,
        'text-anchor': textAnchor,
        'text-line-height': 1.2,
        visibility: layerInfo.visible
      };
      if (textBackgroundImageId) {
        Object.assign(layout, {
          'icon-image': textBackgroundImageId,
          'icon-allow-overlap': true,
          'icon-text-fit': 'both',
          'icon-text-fit-padding': [2, 4, 2, 4]
        });
      }
      this._addLayer(
        {
          id: labelLayerId,
          type: 'symbol',
          source:
            this.map.getSource(layerInfo.layerID) && !addSource
              ? layerInfo.layerID
              : {
                  type: 'geojson',
                  data: { type: 'FeatureCollection', features: features }
                },
          paint: {
            'text-color': labelStyle.fill,
            'text-halo-color': textHaloColor,
            'text-halo-width': textHaloWidth
          },
          layout,
          minzoom: minzoom || 0,
          maxzoom: maxzoom || 22
        },
        layerInfo.layerID
      );
    }
  
    _createSymbolLayer(layerInfo, features, textSizeExpresion, textRotateExpresion, addToMap = true, filter) {
      // 用来请求symbol_point字体文件
      const target = document.getElementById(`${this.target}`);
      target.classList.add('supermapol-icons-map');
      const { layerID, minzoom, maxzoom, style } = layerInfo;
      const unicode = style.unicode;
      const text = String.fromCharCode(parseInt(unicode.replace(/^&#x/, ''), 16));
      const textSize =
        textSizeExpresion ||
        (Array.isArray(style.fontSize) ? style.fontSize : (style.fontSize && parseFloat(style.fontSize)) || 12);
      const rotate = Array.isArray(style.rotation) ? style.rotation : ((style.rotation || 0) * 180) / Math.PI;
      if (!this.map.getSource(layerID)) {
        this.map.addSource(layerID, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });
      }
      const layerOptions = {
        id: layerID,
        type: 'symbol',
        source: layerID,
        paint: {
          'text-color': Array.isArray(style.fillColor)
            ? style.fillColor
            : ColorsPickerUtil.getColorWithOpacity(style.fillColor, style.fillOpacity),
          // 'text-opacity': style.fillOpacity === 0 ? 0.1 : style.fillOpacity,
          'text-halo-color': Array.isArray(style.strokeColor)
            ? style.strokeColor
            : ColorsPickerUtil.getColorWithOpacity(style.strokeColor || 'rgba(0,0,0,0)', style.strokeOpacity),
          'text-halo-width': style.strokeWidth || 0
        },
        layout: {
          'text-field': text,
          'text-size': textSize,
          'text-font': ['supermapol-icons'],
          'text-rotate': textRotateExpresion || rotate || 0,
          'text-offset': Array.isArray(style.offsetX) ? style.offsetX : [style.offsetX / 2 || 0, style.offsetY / 2 || 0],
          'text-allow-overlap': true,
          visibility: layerInfo.visible
        },
        minzoom: minzoom || 0,
        maxzoom: maxzoom || 22
      };
      if (filter) {
        layerOptions.filter = filter;
      }
      this._addLayer(layerOptions);
      this.map.getSource(layerID).setData({
        type: 'FeatureCollection',
        features: features
      });
      if (addToMap) {
        this._addLayerSucceeded({ layerInfo, features });
      }
    }
  
    async _createGraphicLayer(layerInfo, features, iconSizeExpression, iconRotateExpression, addToMap = true, filter) {
      return new Promise((resolve) => {
        const { layerID, minzoom, maxzoom, style } = layerInfo;
  
        const source = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        };
        if (!this.map.getSource(layerID)) {
          this.map.addSource(layerID, source);
        } else {
          this.map.getSource(layerID).setData(source.data);
        }
        const iconID = `imageIcon-${layerID}`;
        if (style.type === 'IMAGE_POINT') {
          const imageInfo = style.imageInfo;
          this.map.loadImage(imageInfo.url, (error, image) => {
            if (error) {
              console.error(error);
              return;
            }
            const iconSize = Number.parseFloat((style.radius / image.width).toFixed(2)) * 2;
            !this.map.hasImage(iconID) && this.map.addImage(iconID, image);
            const layerOptions = {
              id: layerID,
              type: 'symbol',
              source: layerID,
              layout: {
                'icon-image': iconID,
                'icon-anchor': 'bottom-right',
                'icon-size': iconSizeExpression || iconSize,
                'icon-allow-overlap': true,
                visibility: layerInfo.visible,
                'icon-offset': [style.offsetX * image.width || 0, style.offsetY * image.height || 0],
                'icon-rotate': iconRotateExpression || ((layerInfo.style.rotation || 0) * 180) / Math.PI
              },
              minzoom: minzoom || 0,
              maxzoom: maxzoom || 22
            };
            if (filter) {
              layerOptions.filter = filter;
            }
            this._addLayer(layerOptions);
            if (addToMap) {
              this._addLayerSucceeded({ layerInfo, features });
            }
            resolve();
          });
        } else if (style.type === 'SVG_POINT') {
          const svgUrl = style.url;
          if (!this._svgDiv) {
            this._svgDiv = document.createElement('div');
            document.body.appendChild(this._svgDiv);
          }
          this.getCanvasFromSVG(svgUrl, this._svgDiv, (canvas) => {
            // this.handleSvgColor(style, canvas);
            const imgUrl = canvas.toDataURL('img/png');
            imgUrl &&
              this.map.loadImage(imgUrl, (error, image) => {
                if (error) {
                  console.log(error);
                }
                const iconSize = Number.parseFloat((style.radius / canvas.width).toFixed(2)) * 2;
                if (iconSizeExpression && Array.isArray(iconSizeExpression)) {
                  iconSizeExpression = iconSizeExpression.map((item, index) => {
                    if (typeof item === 'number' && index % 2 === 1) {
                      return (item / canvas.width) * 2;
                    }
                    return item;
                  });
                }
                !this.map.hasImage(svgUrl) && this.map.addImage(svgUrl, image, { sdf: true });
                const layerOptions = {
                  id: layerID,
                  type: 'symbol',
                  source: layerID,
                  layout: {
                    'icon-image': svgUrl,
                    'icon-size': iconSizeExpression || iconSize,
                    'icon-anchor': 'bottom-right',
                    visibility: layerInfo.visible,
                    'icon-offset': [style.offsetX * canvas.width || 0, style.offsetY * canvas.height || 0],
                    'icon-allow-overlap': true,
                    'icon-rotate': iconRotateExpression || ((layerInfo.style.rotation || 0) * 180) / Math.PI
                  },
                  paint: {
                    'icon-color': style.fillColor
                  },
                  minzoom: minzoom || 0,
                  maxzoom: maxzoom || 22
                };
                if (filter) {
                  layerOptions.filter = filter;
                }
                this._addLayer(layerOptions);
                if (addToMap) {
                  this._addLayerSucceeded({ layerInfo, features });
                }
                resolve();
              });
          });
        } else {
          const layerStyle = {
            style: this._transformStyleToMapBoxGl(style, layerInfo.featureType),
            layout: {
              visibility: layerInfo.visible
            }
          };
          this._addOverlayToMap({ type: 'POINT', source: layerID, layerID, layerStyle, minzoom, maxzoom });
          if (addToMap) {
            this._addLayerSucceeded({ layerInfo, features });
          }
          resolve();
        }
      });
    }
  
    async _createUniqueLayer(layerInfo, features) {
      const symbolConvertFunctionFactory = {
        unicode: ({ unicode }) => {
          return String.fromCharCode(parseInt(unicode.replace(/^&#x/, ''), 16));
        },
        fontSize: ({ fontSize }) => {
          if (fontSize) {
            return parseFloat(fontSize);
          }
          return 12;
        },
        rotation: ({ rotation }) => {
          return ((rotation || 0) * 180) / Math.PI;
        },
        fillColor: ({ fillColor, fillOpacity }) => {
          return ColorsPickerUtil.getColorWithOpacity(fillColor, fillOpacity);
        },
        strokeColor: ({ strokeColor, strokeOpacity }) => {
          return ColorsPickerUtil.getColorWithOpacity(strokeColor || 'rgba(0,0,0,0)', strokeOpacity);
        },
        strokeWidth: ({ strokeWidth }) => {
          return strokeWidth || 0;
        },
        offsetX: ({ offsetX, offsetY }) => {
          return [offsetX / 2 || 0, offsetY / 2 || 0];
        }
      };
      const defaultValueFactory = {
        unicode: '',
        fontSize: 12,
        rotation: 0,
        strokeColor: 'rgba(0,0,0,0)',
        fillColor: 'rgba(0,0,0,0)',
        strokeWidth: 0,
        offsetX: [0, 0]
      };
      const styleGroup = this.getUniqueStyleGroup(layerInfo, features);
      features = this.getFilterFeatures(layerInfo.filterCondition, features);
      const { layerID, minzoom, maxzoom, style } = layerInfo;
      const themeField = styleGroup[0].themeField;
      const type = layerInfo.featureType;
  
      const defultLayerStyle = layerInfo.style;
      // 样式expression池 样式key值为webmap的样式key值
      const expressionMap = {};
      // 自定义单值值对应的样式
      const customStyleMap = {};
      styleGroup.forEach((style) => {
        customStyleMap[style.value] = style;
      });
      // 遍历要素，判断该要素是不是在自定义单值中，若是在对应样式match expression中增加改要素的索引
      features.forEach(({ properties }) => {
        const customStyle = customStyleMap[properties[themeField]];
        if (customStyle) {
          const itemStyle = customStyle.style;
          for (const key in itemStyle) {
            if (Object.prototype.hasOwnProperty.call(itemStyle, key)) {
              const itemStyleElement = itemStyle[key];
              if (itemStyleElement !== defultLayerStyle[key]) {
                if (!expressionMap[key]) {
                  expressionMap[key] = ['match', ['get', 'index']];
                }
                expressionMap[key].push(
                  properties.index,
                  symbolConvertFunctionFactory[key] ? symbolConvertFunctionFactory[key](itemStyle) : itemStyleElement
                );
              }
            }
          }
        }
      });
      // 给每个expression增加最后一个默认值
      for (const key in expressionMap) {
        if (Object.prototype.hasOwnProperty.call(expressionMap, key)) {
          const expression = expressionMap[key];
          if (!Array.isArray(expression)) {
            continue;
          }
          const defaultStyleItem = defultLayerStyle[key] || defaultValueFactory[key];
          const styleItem = { [key]: defaultStyleItem };
          // 从customsetting里取了透明度和color一起处理了，layerinfo.style里的透明度就不需要了
          if (key === 'fillColor') {
            expressionMap['fillOpacity'] = 1;
            styleItem['fillOpacity'] = isNaN(defultLayerStyle['fillOpacity']) ? 1 : defultLayerStyle['fillOpacity'];
          }
          if (key === 'strokeColor') {
            expressionMap['strokeOpacity'] = 1;
            styleItem['strokeOpacity'] = isNaN(defultLayerStyle['strokeOpacity']) ? 1 : defultLayerStyle['strokeOpacity'];
          }
          const fn = symbolConvertFunctionFactory[key];
          expression.push(defaultStyleItem === undefined ? null : (fn && fn(styleItem)) || defaultStyleItem);
        }
      }
      // Todo 图例相关
      this._initLegendConfigInfo(layerInfo, styleGroup);
  
      const source = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      };
      const sourceID = layerID;
      if (!this.map.getSource(sourceID)) {
        this.map.addSource(sourceID, source);
      } else {
        this.map.getSource(sourceID).setData(source.data);
      }
  
      const visible = layerInfo.visible;
      const layerCreateFcuntion = ({
        type,
        sourceID,
        layerID,
        parentLayerId,
        beforeId,
        style,
        minzoom,
        maxzoom,
        filter
      }) => {
        const layerStyle = {
          style: this._transformStyleToMapBoxGl({ ...style }, type),
          layout: {
            visibility: visible
          }
        };
        this._addOverlayToMap({
          type,
          source: sourceID,
          layerID,
          parentLayerId,
          beforeId,
          layerStyle,
          minzoom,
          maxzoom,
          filter
        });
      };
      if (['POLYGON', 'LINE'].includes(type)) {
        // linedash不能用表达式处理，需用多个图层
        const lineDashExpression = expressionMap.lineDash;
        // 非自定义要素过滤表达式
        const defaultFilterExpression = ['all'];
        let handlerLine = false;
        let fristName = '';
        if (lineDashExpression && lineDashExpression.length > 1) {
          delete expressionMap.lineDash;
          const filterField = lineDashExpression[1];
          const tempLayerID = type === 'POLYGON' ? layerID + '-strokeLine' : layerID;
          for (let index = 2; index < lineDashExpression.length - 1; index += 2) {
            const filterExpression = ['==', filterField, lineDashExpression[index]];
            defaultFilterExpression.push(['!=', filterField, lineDashExpression[index]]);
            const additionalLayerName = `${tempLayerID}-additional-linedasharray-${index / 2}`;
            if (!fristName) {
              fristName = additionalLayerName;
            }
            layerCreateFcuntion({
              type: 'LINE',
              sourceID,
              layerID: additionalLayerName,
              parentLayerId: layerID,
              style: {
                ...style,
                ...expressionMap,
                lineDash: lineDashExpression[index + 1]
              },
              minzoom,
              maxzoom,
              filter: filterExpression
            });
          }
          if (defaultFilterExpression.length > 1) {
            layerCreateFcuntion({
              type: 'LINE',
              sourceID,
              layerID: tempLayerID,
              parentLayerId: layerID,
              style: {
                ...style,
                ...expressionMap,
                lineDash: lineDashExpression[lineDashExpression.length]
              },
              minzoom,
              maxzoom,
              filter: defaultFilterExpression
            });
          }
          handlerLine = true;
        }
        // 没有自定义虚线的情况
        if (type === 'LINE' && !handlerLine) {
          layerCreateFcuntion({
            type: 'LINE',
            sourceID,
            layerID,
            style: { ...style, ...expressionMap },
            minzoom,
            maxzoom,
            filter: defaultFilterExpression
          });
        }
        // 面
        if (type === 'POLYGON') {
          layerCreateFcuntion({
            type: 'POLYGON',
            sourceID,
            layerID,
            beforeId: fristName,
            style: { ...style, ...expressionMap },
            minzoom,
            maxzoom
          });
          if (fristName) {
            this.map.moveLayer(layerID, fristName);
          }
          // 面且没有虚线
          if (!handlerLine) {
            layerCreateFcuntion({
              type: 'LINE',
              sourceID,
              layerID: layerID + '-strokeLine',
              parentLayerId: layerID,
              style: { ...style, ...expressionMap },
              minzoom,
              maxzoom,
              filter: defaultFilterExpression
            });
          }
        }
      } else {
        const defaultFilterExpression = ['all'];
        const unicodeExpression = expressionMap.unicode;
        // SYMBOL_POINT
        if (unicodeExpression) {
          const classNameExpression = expressionMap.className || [];
          delete expressionMap.unicode;
          delete expressionMap.classname;
          const additionalLayerName = `${layerID}-additional-symbol`;
          const filterExpression = ['any'];
          // defaultExpression.push(['!=', filterField, lineDashExpression[index]]);
          for (let index = 2; index < classNameExpression.length - 1; index += 2) {
            defaultFilterExpression.push(['!=', classNameExpression[1], classNameExpression[index]]);
            filterExpression.push(['==', classNameExpression[1], classNameExpression[index]]);
          }
          // this._createSymbolLayer()
          // 用来请求symbol_point字体文件
          const target = document.getElementById(`${this.target}`);
          target.classList.add('supermapol-icons-map');
          const symbolStyle = { ...style, ...expressionMap };
          const layerOptions = {
            id: additionalLayerName,
            type: 'symbol',
            source: sourceID,
            paint: {
              'text-color': symbolStyle.fillColor,
              // 'text-opacity': style.fillOpacity === 0 ? 0.1 : style.fillOpacity,
              'text-halo-color': symbolStyle.strokeColor,
              'text-halo-width': symbolStyle.strokeWidth
            },
            layout: {
              'text-field': unicodeExpression,
              'text-size':
                typeof symbolStyle.fontSize === 'string' ? parseInt(symbolStyle.fontSize) : symbolStyle.fontSize || 12,
              'text-font': ['supermapol-icons'],
              'text-rotate': symbolStyle.rotation || 0,
              'text-offset': Array.isArray(symbolStyle.offsetX)
                ? symbolStyle.offsetX
                : [symbolStyle.offsetX / 2 || 0, symbolStyle.offsetY / 2 || 0],
              'text-allow-overlap': true,
              visibility: visible
            },
            minzoom: minzoom || 0,
            maxzoom: maxzoom || 22
          };
          if (filterExpression.length > 1) {
            layerOptions.filter = filterExpression;
          }
          this._addLayer(layerOptions, layerID);
        }
        // IMAGE_POINT 或者 SVG_POINT
        const imageInfoExpression = expressionMap.imageInfo || [];
        const urlExpression = expressionMap.url || [];
        if (imageInfoExpression.length > 0 || urlExpression.length > 0) {
          delete expressionMap.imageInfo;
          delete expressionMap.url;
          const imageList = [];
          // image表达式 和 过滤表达式
          const imageExpresssion = imageInfoExpression.length > 0 ? [imageInfoExpression[0], imageInfoExpression[1]] : [];
          const svgExpresssion = urlExpression.length > 0 ? [urlExpression[0], urlExpression[1]] : [];
          const imagefilterExpression = ['any'];
          const svgfilterExpression = ['any'];
          for (let index = 2; index < imageInfoExpression.length - 1; index += 2) {
            const element = imageInfoExpression[index + 1];
            imageList.push(element.url);
            imageExpresssion.push(imageInfoExpression[index]);
            imageExpresssion.push(element.url);
            defaultFilterExpression.push(['!=', imageInfoExpression[1], imageInfoExpression[index]]);
            imagefilterExpression.push(['==', imageInfoExpression[1], imageInfoExpression[index]]);
          }
          for (let index = 2; index < urlExpression.length - 1; index += 2) {
            const element = urlExpression[index + 1];
            imageList.push(element);
            svgExpresssion.push(urlExpression[index]);
            svgExpresssion.push(element);
            defaultFilterExpression.push(['!=', urlExpression[1], urlExpression[index]]);
            svgfilterExpression.push(['==', urlExpression[1], urlExpression[index]]);
          }
          imageExpresssion.push('');
          svgExpresssion.push('');
  
          const loadImagePromise = (src) => {
            return new Promise((resolve) => {
              if (src.indexOf('svg') < 0) {
                this.map.loadImage(src, (error, image) => {
                  if (error) {
                    console.log(error);
                    resolve(error);
                    return;
                  }
                  !this.map.hasImage(src) && this.map.addImage(src, image);
                  resolve({ src, image });
                });
              } else {
                if (!this._svgDiv) {
                  this._svgDiv = document.createElement('div');
                  document.body.appendChild(this._svgDiv);
                }
                this.getCanvasFromSVG(src, this._svgDiv, (canvas) => {
                  this.handleSvgColor(defultLayerStyle, canvas);
                  this.map.loadImage(canvas.toDataURL('img/png'), (error, image) => {
                    if (error) {
                      console.log(error);
                      resolve(error);
                      return;
                    }
                    // sdf: true 可以设置icon-color
                    !this.map.hasImage(src) && this.map.addImage(src, image, { sdf: true });
                    resolve({ src, image });
                  });
                });
              }
            });
          };
          const promiseList = [];
          imageList.forEach((src) => {
            promiseList.push(loadImagePromise(src));
          });
          const symbolStyle = { ...style, ...expressionMap };
          await Promise.all(promiseList).then((images) => {
            const imageSize = {};
            const radiusMap = {};
            const radiusExpress = expressionMap.radius || [];
            for (let index = 2; index < radiusExpress.length - 1; index += 2) {
              radiusMap[radiusExpress[index]] = radiusExpress[index + 1];
            }
            images.forEach((image) => {
              if (image && image.src) {
                imageSize[image.src] = image.image.width;
              }
            });
            // icon-color在一个图层中能全起作用或者全不起作用   所以image和svg分两个图层
            // icon-size和图片大小有关系
            if (imageExpresssion.length > 1) {
              const iconSizeExpression = ['match', ['get', 'index']];
              for (let index = 2; index < imageExpresssion.length - 1; index += 2) {
                const featureIndex = imageExpresssion[index];
                const featureSrc = imageExpresssion[index + 1];
                const iconSize =
                  Number.parseFloat(((radiusMap[featureIndex] || 8) / imageSize[featureSrc]).toFixed(2)) * 2;
                iconSizeExpression.push(featureIndex);
                iconSizeExpression.push(iconSize);
              }
              iconSizeExpression.push(1);
  
              this._addLayer(
                {
                  id: `${layerID}-additional-image`,
                  type: 'symbol',
                  source: sourceID,
                  layout: {
                    'icon-image': imageExpresssion,
                    'icon-anchor': 'bottom-right',
                    'icon-size': iconSizeExpression,
                    'icon-allow-overlap': true,
                    visibility: layerInfo.visible,
                    'icon-offset': symbolStyle.offsetX || [0, 0],
                    'icon-rotate': symbolStyle.rotation || 0
                  },
                  minzoom: minzoom || 0,
                  maxzoom: maxzoom || 22,
                  filter: imagefilterExpression
                },
                layerID
              );
            }
            if (svgExpresssion.length > 1) {
              const iconSizeExpression = ['match', ['get', 'index']];
              for (let index = 2; index < svgExpresssion.length - 1; index += 2) {
                const featureIndex = svgExpresssion[index];
                const featureSrc = svgExpresssion[index + 1];
                const iconSize =
                  Number.parseFloat(((radiusMap[featureIndex] || 8) / imageSize[featureSrc]).toFixed(2)) * 2;
                iconSizeExpression.push(featureIndex);
                iconSizeExpression.push(iconSize);
              }
              iconSizeExpression.push(1);
              this._addLayer(
                {
                  id: `${layerID}-additional-svg`,
                  type: 'symbol',
                  source: sourceID,
                  layout: {
                    'icon-image': svgExpresssion,
                    'icon-anchor': 'bottom-right',
                    'icon-size': 1,
                    'icon-allow-overlap': true,
                    visibility: layerInfo.visible,
                    'icon-offset': symbolStyle.offsetX || [0, 0],
                    'icon-rotate': symbolStyle.rotation || 0
                  },
                  paint: {
                    'icon-color': symbolStyle.fillColor
                  },
                  minzoom: minzoom || 0,
                  maxzoom: maxzoom || 22,
                  filter: svgfilterExpression
                },
                layerID
              );
            }
          });
        }
        if (style.type === 'SYMBOL_POINT') {
          const tmpLayerInfo = { ...layerInfo };
          tmpLayerInfo.style = { ...style, ...expressionMap, type: style.type };
          this._createSymbolLayer(
            tmpLayerInfo,
            features,
            '',
            '',
            false,
            defaultFilterExpression.length > 1 ? defaultFilterExpression : undefined
          );
        } else if (style.type === 'IMAGE_POINT' || style.type === 'SVG_POINT') {
          const tmpLayerInfo = { ...layerInfo };
          tmpLayerInfo.style = { ...style, ...expressionMap, type: style.type };
          await this._createGraphicLayer(
            tmpLayerInfo,
            features,
            '',
            '',
            false,
            defaultFilterExpression.length > 1 ? defaultFilterExpression : undefined
          );
        } else {
          layerCreateFcuntion({
            type: 'POINT',
            sourceID,
            layerID,
            style: { ...style, ...expressionMap },
            minzoom,
            maxzoom,
            filter: defaultFilterExpression.length > 1 ? defaultFilterExpression : undefined
          });
        }
      }
      this._addLayerSucceeded({ layerInfo, features });
    }
  
    _getWMTSUrl(options) {
      if (options.requestEncoding === 'REST' && options.restResourceURL) {
        return options.restResourceURL
          .replace('{Style}', options.style || '')
          .replace('{TileMatrixSet}', options.tileMatrixSet)
          .replace('{TileRow}', '{y}')
          .replace('{TileCol}', '{x}')
          .replace('{TileMatrix}', '{z}');
      }
      const obj = {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        style: options.style || '',
        layer: options.layer,
        tilematrixSet: options.tileMatrixSet,
        format: 'image/png',
        tilematrix: '{z}',
        tilerow: '{y}',
        tilecol: '{x}'
      };
      return Util.urlAppend(options.kvpResourceUrl, this._getParamString(obj, options.kvpResourceUrl));
    }
  
    _createMarkerLayer(layerInfo, features) {
      const { minzoom, maxzoom } = layerInfo;
      const markerLayerID = layerInfo.layerID;
      const markerSrc = {};
      features = features || [];
      features.forEach((feature, index) => {
        const defaultStyle = feature.dv_v5_markerStyle;
        let geomType = feature.geometry.type.toUpperCase();
        if (geomType === 'POINT' && defaultStyle.text) {
          // 说明是文字的feature类型
          geomType = 'TEXT';
        }
        const layerID = index === 0 ? markerLayerID : markerLayerID + '-' + geomType + '-' + index;
        if (
          geomType === 'POINT' &&
          defaultStyle.src &&
          defaultStyle.src.indexOf('http://') === -1 &&
          defaultStyle.src.indexOf('https://') === -1
        ) {
          // 说明地址不完整
          defaultStyle.src = this.serverUrl + defaultStyle.src;
        }
        if (!markerSrc[layerID]) {
          markerSrc[layerID] = {
            src: defaultStyle.src,
            defaultStyle,
            geomType
          };
        }
      });
      const loadImagePromise = (layerID, { src, defaultStyle, geomType }) => {
        return new Promise((resolve) => {
          if (!src && geomType !== 'TEXT') {
            resolve({ [layerID]: undefined });
            return;
          }
          if (src && src.indexOf('svg') < 0 && (src.startsWith('http://') || src.startsWith('https://'))) {
            this.map.loadImage(src, (error, image) => {
              if (error) {
                console.log(error);
                resolve(error);
                return;
              }
              !this.map.hasImage(src) && this.map.addImage(src, image);
              resolve({ [layerID]: src });
            });
          } else {
            if (!this._svgDiv) {
              this._svgDiv = document.createElement('div');
              document.body.appendChild(this._svgDiv);
            }
            this.getCanvasFromSVG(src, this._svgDiv, (canvas) => {
              this.handleSvgColor(defaultStyle, canvas);
              const base64Url = canvas.toDataURL('img/png');
              this.map.loadImage(base64Url, (error, image) => {
                if (error) {
                  console.log(error);
                  resolve(error);
                  return;
                }
                const srcUrl = src || base64Url;
                !this.map.hasImage(srcUrl) && this.map.addImage(srcUrl, image);
                resolve({ [layerID]: srcUrl });
              });
            });
          }
        });
      };
      const promiseList = [];
      for (const layerID in markerSrc) {
        promiseList.push(loadImagePromise(layerID, markerSrc[layerID]));
      }
      Promise.all(promiseList).then((images) => {
        for (let i = 0; i < features.length; i++) {
          const feature = features[i];
          const defaultStyle = feature.dv_v5_markerStyle;
          let geomType = feature.geometry.type.toUpperCase();
          if (geomType === 'POINT' && defaultStyle.text) {
            // 说明是文字的feature类型
            geomType = 'TEXT';
          }
          const featureInfo = this.setFeatureInfo(feature);
          feature.properties.useStyle = defaultStyle;
          feature.properties.featureInfo = featureInfo;
  
          const source = {
            type: 'geojson',
            data: feature
          };
          const layerID = i === 0 ? markerLayerID : markerLayerID + '-' + geomType + '-' + i;
          const iconImageUrl = images[i][layerID];
          // image-marker  svg-marker
          if (geomType === 'POINT' || geomType === 'TEXT') {
            if (!iconImageUrl) {
              this._addLayer(
                {
                  id: layerID,
                  type: 'circle',
                  source: source,
                  paint: this._transformStyleToMapBoxGl(defaultStyle, geomType),
                  layout: {},
                  minzoom: minzoom || 0,
                  maxzoom: maxzoom || 22
                },
                markerLayerID
              );
              continue;
            }
            this._addLayer(
              {
                id: layerID,
                type: 'symbol',
                source: source,
                layout: {
                  'icon-image': iconImageUrl,
                  'icon-allow-overlap': true,
                  'icon-size': defaultStyle.scale || 1,
                  visibility: layerInfo.visible
                },
                minzoom: minzoom || 0,
                maxzoom: maxzoom || 22
              },
              markerLayerID
            );
          } else {
            // line-polygon-marker
            const layerStyle = {
              layout: {},
              // get style
              style: this._transformStyleToMapBoxGl(defaultStyle, geomType)
            };
            if (geomType === 'LINESTRING' && defaultStyle.lineCap) {
              geomType = 'LINE';
              layerStyle.layout = {
                'line-cap': defaultStyle.lineCap
              };
            }
            const visible = layerInfo.visible;
            layerStyle.layout.visibility = visible;
            this._addOverlayToMap({
              type: geomType,
              source,
              layerID,
              parentLayerId: markerLayerID,
              layerStyle,
              minzoom,
              maxzoom
            });
            // 若面有边框
            geomType === 'POLYGON' &&
              defaultStyle.strokeColor &&
              this._addStrokeLineForPoly({
                style: defaultStyle,
                source: layerID,
                layerID: layerID + '-strokeLine',
                parentLayerId: markerLayerID,
                visible,
                minzoom,
                maxzoom
              });
          }
        }
        this._addLayerSucceeded({ layerInfo, features });
      });
    }
  
    _createHeatLayer(layerInfo, features, addToMap = true) {
      const { minzoom, maxzoom } = layerInfo;
      const style = layerInfo.themeSetting;
      const layerOption = {
        gradient: style.colors.slice(),
        radius: parseInt(style.radius)
      };
  
      // 自定义颜色
      const customSettings = style.customSettings;
      for (const i in customSettings) {
        layerOption.gradient[i] = customSettings[i];
      }
  
      const color = ['interpolate', ['linear'], ['heatmap-density']];
  
      const step = [0.1, 0.3, 0.5, 0.7, 1];
      layerOption.gradient.forEach((item, index) => {
        color.push(step[index]);
        if (index === 0) {
          item = mapRepo.supermap.Util.hexToRgba(item, 0);
        }
        if (index === 1) {
          item = mapRepo.supermap.Util.hexToRgba(item, 0.5);
        }
        color.push(item);
      });
      // 图例相关
      this._initLegendConfigInfo(layerInfo, color);
  
      const paint = {
        'heatmap-color': color,
        'heatmap-radius': style.radius * 3,
        'heatmap-intensity': 2.8
      };
  
      if (style.weight && features.length >= 4) {
        const weight = [];
        features.forEach((item) => {
          item.properties[style.weight] = +item.properties[style.weight];
          weight.push(item.properties[style.weight]);
        });
        const max = ArrayStatistic.getMax(weight);
        const min = ArrayStatistic.getMin(weight);
        paint['heatmap-weight'] = ['interpolate', ['linear'], ['get', style.weight], min, 0, max, 1];
      }
      this._addLayer({
        id: layerInfo.layerID,
        type: 'heatmap',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        },
        paint: paint,
        layout: {
          visibility: layerInfo.visible
        },
        minzoom: minzoom || 0,
        maxzoom: maxzoom || 22
      });
      if (addToMap) {
        this._addLayerSucceeded({ layerInfo, features });
      }
    }
  
    _createRangeLayer(layerInfo, features) {
      const fieldName = layerInfo.themeSetting.themeField;
      const featureType = layerInfo.featureType;
      const { minzoom, maxzoom, style } = layerInfo;
      const styleGroups = this.getRangeStyleGroup(layerInfo, features);
  
      features = this.getFilterFeatures(layerInfo.filterCondition, features);
  
      // 获取 expression
      const expression = ['match', ['get', 'index']];
      const datas = features.filter((row) => {
        const tartget = parseFloat(row.properties[fieldName]);
        if (!tartget && tartget !== 0) {
          // expression.push(row.properties['index'], 'rgba(0, 0, 0, 0)');
          return false;
        }
        if (styleGroups) {
          for (let i = 0; i < styleGroups.length; i++) {
            const startFlag = styleGroups[i].start <= tartget;
            const endFlag = tartget < styleGroups[i].end;
            const lastEndFlag = i === styleGroups.length - 1 && tartget === styleGroups[i].end;
            if (startFlag && (endFlag || lastEndFlag)) {
              expression.push(row.properties.index, styleGroups[i].color);
              break;
            }
          }
        }
        return true;
      }, this);
      expression.push('rgba(0, 0, 0, 0)');
      const source = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: datas
        }
      };
      // 图例处理
      this._initLegendConfigInfo(layerInfo, styleGroups || []);
  
      // 获取样式
      const layerStyle = {
        layout: {}
      };
      if (featureType === 'LINE' && style.lineCap) {
        layerStyle.layout = {
          'line-cap': style.lineCap
        };
      }
      const visible = layerInfo.visible;
      layerStyle.layout.visibility = visible;
      layerStyle.style = this._transformStyleToMapBoxGl(style, featureType, expression);
      // 添加图层
      const layerID = layerInfo.layerID;
      this._addOverlayToMap({ type: featureType, source, layerID, layerStyle, minzoom, maxzoom });
      // 如果面有边框
      featureType === 'POLYGON' &&
        style.strokeColor &&
        this._addStrokeLineForPoly({
          style,
          source: layerID,
          layerID: layerID + '-strokeLine',
          parentLayerId: layerID,
          visible,
          minzoom,
          maxzoom
        });
      this._addLayerSucceeded({ layerInfo, features });
    }
  
    _sendMapToUser(count, layersLen) {
      if (count === layersLen) {
        /**
         * @event WebMapViewModel#addlayerssucceeded
         * @description 添加图层成功。
         * @property {mapboxglTypes.Map} map - MapBoxGL Map 对象。
         * @property {Object} mapparams - 地图信息。
         * @property {string} mapParams.title - 地图标题。
         * @property {string} mapParams.description - 地图描述。
         */
        this.addLayersSucceededLen = this._cacheLayerId.size;
        const appreciableLayers = this.getAppreciableLayers();
        const layerOptions = this._getSelfAppreciableLayers(appreciableLayers);
        this._rectifyLayersOrder(layerOptions.layers);
        this.fire('addlayerssucceeded', {
          ...layerOptions,
          map: this.map,
          mapparams: this._mapInfo.mapParams
        });
      }
    }
  
    _rectifyLayersOrder(appreciableLayers, topLayerBeforeId) {
      const renderLayers = appreciableLayers.reduce((layers, layer) => {
        return layers.concat(layer.renderLayers);
      }, []);
      const labelLayerIds = [];
      const exsitLayers = renderLayers.filter((layerId) => !!this.map.getLayer(layerId));
      for (let index = exsitLayers.length - 1; index > -1; index--) {
        const targetlayerId = exsitLayers[index];
        const afterLayers = exsitLayers.slice(index + 1);
        let beforLayerId = afterLayers.find((id) => this.map.style._layers[id]);
        if (!afterLayers.length) {
          beforLayerId = topLayerBeforeId;
        }
        this.map.moveLayer(targetlayerId, beforLayerId);
        const labelLayerId = this._getSymbolLabelLayerName(targetlayerId);
        if (this.map.getLayer(labelLayerId)) {
          labelLayerIds.push(labelLayerId);
        }
      }
      labelLayerIds.reverse().forEach((layerId) => {
        this.map.moveLayer(layerId);
      });
    }
  
    _getParamString(obj, existingUrl, uppercase = false) {
      const params = [];
      for (const i in obj) {
        params.push((uppercase ? i.toUpperCase() : i) + '=' + obj[i]);
      }
      return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
    }
  
    /**
     * @private
     * @function WebMapViewModel.prototype._transformStyleToMapBoxGl
     * @description 根据图层类型将 layerInfo 中的 style 属性格式转换为 mapboxglTypes 中的 style 格式。
     * @param {Object} style - layerInfo中的style属性
     * @param {String} type - 图层类型
     * @param {Array} [expression] - 存储颜色值得表达式
     */
    _transformStyleToMapBoxGl(style, type, expression, expressionType) {
      let transTable = {};
      if ((style.type === 'POINT' || style.type === 'BASIC_POINT' || type === 'POINT') && type !== 'LINE') {
        transTable = {
          fillColor: 'circle-color',
          strokeWidth: 'circle-stroke-width',
          fillOpacity: 'circle-opacity',
          radius: 'circle-radius',
          strokeColor: 'circle-stroke-color',
          strokeOpacity: 'circle-stroke-opacity'
        };
      } else if (['LINE', 'LINESTRING', 'MULTILINESTRING'].includes(type)) {
        transTable = {
          strokeWidth: 'line-width',
          strokeColor: 'line-color',
          strokeOpacity: 'line-opacity'
        };
      } else if (['REGION', 'POLYGON', 'MULTIPOLYGON'].includes(type)) {
        transTable = {
          fillColor: 'fill-color',
          fillOpacity: 'fill-opacity'
          // strokeColor: 'fill-outline-color'
        };
      }
  
      const newObj = {};
      for (const item in style) {
        if (transTable[item]) {
          newObj[transTable[item]] = style[item];
        }
      }
      if (expression) {
        if (expressionType) {
          newObj[expressionType] = expression;
        } else if (newObj['circle-color']) {
          newObj['circle-color'] = expression;
        } else if (newObj['line-color']) {
          newObj['line-color'] = expression;
        } else {
          newObj['fill-color'] = expression;
        }
      }
      if (style.lineDash && !newObj['line-dasharray']) {
        if (Array.isArray(style.lineDash)) {
          newObj['line-dasharray'] = style.lineDash;
        } else if (style.lineDash !== 'solid' && type === 'LINE') {
          newObj['line-dasharray'] = this.getDashStyle(style.lineDash);
        }
      }
      if (style.lineDash && !newObj['circle-translate']) {
        if (Array.isArray(style.circleTranslate)) {
          newObj['circle-translate'] = style.circleTranslate;
        } else if (style.type === 'POINT' || style.type === 'BASIC_POINT' || type === 'POINT') {
          const offsetX = style.offsetX || 0;
          const offsetY = style.offsetY || 0;
          newObj['circle-translate'] = [offsetX * style.radius, offsetY * style.radius];
        }
      }
  
      return newObj;
    }
  
    /**
     * @private
     * @function WebMapViewModel.prototype._addOverlayToMap
     * @description 添加基础矢量图层到 MAP
     * @param {Object} style - mabgl style
     * @param {String} type - 图层类型
     */
    _addOverlayToMap({ type, source, layerID, parentLayerId, beforeId, layerStyle, minzoom, maxzoom, filter }) {
      const mbglTypeMap = {
        POINT: 'circle',
        LINE: 'line',
        POLYGON: 'fill'
      };
      const mbglType = mbglTypeMap[type];
      if (mbglType === 'circle' || mbglType === 'line' || mbglType === 'fill') {
        const style = {
          id: layerID,
          type: mbglType,
          source: source,
          paint: layerStyle.style,
          layout: layerStyle.layout || {},
          minzoom: minzoom || 0,
          maxzoom: maxzoom || 22
        };
        if (filter) {
          style.filter = filter;
        }
        this._addLayer(style, parentLayerId, beforeId);
      }
    }
  
    _addBaselayer({
      url,
      layerID,
      parentLayerId,
      visibility = true,
      minzoom = 0,
      maxzoom = 22,
      isIserver = false,
      bounds
    }) {
      const source = {
        type: 'raster',
        tiles: url,
        minzoom: minzoom || 0,
        maxzoom: maxzoom || 22,
        tileSize: isIserver ? this.rasterTileSize : 256,
        rasterSource: isIserver ? 'iserver' : '',
        prjCoordSys:
          isIserver && !this.isOnlineBaseLayer(url[0], this.baseProjection) && +this.baseProjection.split(':')[1] > 0
            ? { epsgCode: this.baseProjection.split(':')[1] }
            : '',
        proxy: this.baseLayerProxy
      };
      if (bounds) {
        source.bounds = bounds;
      }
      this._addLayer(
        {
          id: layerID,
          type: 'raster',
          source: source,
          minzoom: minzoom || 0,
          maxzoom: maxzoom || 22,
          layout: {
            visibility: visibility ? 'visible' : 'none'
          }
        },
        parentLayerId
      );
      this.baseLayerProxy = null;
    }
  
    /**
     * @private
     * @function WebMapViewModel.prototype._addStrokeLineForPoly
     * @description 添加面的边框。
     * @param {Object} style - mabgl style
     */
    _addStrokeLineForPoly({ style, source, layerID, parentLayerId, visible, minzoom, maxzoom }) {
      const lineStyle = {
        style: this._transformStyleToMapBoxGl(style, 'LINE'),
        layout: {
          visibility: visible
        }
      };
      this._addOverlayToMap({ type: 'LINE', source, layerID, parentLayerId, layerStyle: lineStyle, minzoom, maxzoom });
    }
  
    _initLegendConfigInfo(layerInfo, style) {
      const legendItem = {
        layerId: layerInfo.layerID,
        layerTitle: layerInfo.layerID,
        themeField: layerInfo.layerType === 'HEAT' ? layerInfo.themeSetting.weight : layerInfo.themeSetting.themeField,
        styleGroup: style
      };
  
      const commonStyleGroupMapping = (styleGroup, layerInfo) => {
        let newStyleGroup = {
          style: {
            shape: this._getShape(layerInfo.featureType),
            type: this._getType(styleGroup.style.type)
          }
        };
        this._addProps(newStyleGroup, styleGroup);
        return newStyleGroup;
      };
  
      switch (layerInfo.layerType) {
        case 'UNIQUE':
          legendItem.styleGroup = legendItem.styleGroup.map((styleGroup) => {
            return {
              fieldValue: styleGroup.value,
              ...commonStyleGroupMapping(styleGroup, layerInfo)
            };
          });
          break;
        case 'RANGE':
        case 'RANK_SYMBOL':
          legendItem.styleGroup = legendItem.styleGroup.map((styleGroup) => {
            const newStyleGroup = {
              start: styleGroup.start,
              end: styleGroup.end,
              ...commonStyleGroupMapping(styleGroup, layerInfo)
            };
            return newStyleGroup;
          });
          break;
        case 'HEAT':
          legendItem.styleGroup = [
            {
              style: {
                shape: 'POINT',
                type: 'style',
                colors: this._heatColorToGradient(legendItem.styleGroup)
              }
            }
          ];
          break;
        default:
          break;
      }
      this._legendList.push(legendItem);
    }
  
    _heatColorToGradient(colors = []) {
      const colorList = [];
      colors.forEach((color, index) => {
        if (index > 5 && index % 2 === 0) {
          colorList.push({
            value: color,
            key: index === 6 ? 0 : colors[index - 1]
          });
        }
      });
      return colorList;
    }
  
    _getType(type) {
      return ['IMAGE_POINT', 'SVG_POINT'].includes(type) ? 'image' : 'style';
    }
  
    _getShape(shape) {
      return shape === 'POLYGON' ? 'FILL' : shape;
    }
  
    _addProps(newStyleGroup, styleGroup) {
      if (newStyleGroup.style.shape === 'POINT') {
        Object.assign(newStyleGroup.style, {
          color: styleGroup.style.fillColor || styleGroup.color,
          opacity: styleGroup.style.fillOpacity,
          fontSize: styleGroup.radius * 2 || styleGroup.style.fontSize || '14px'
        });
        if (newStyleGroup.style.type === 'image') {
          Object.assign(newStyleGroup.style, {
            url: (styleGroup.style.imageInfo || {}).url || styleGroup.style.url
          });
          return;
        }
        if (styleGroup.style.className) {
          Object.assign(newStyleGroup.style, {
            icon: styleGroup.style.className
          });
          return;
        }
      }
      if (newStyleGroup.style.shape === 'LINE') {
        Object.assign(newStyleGroup.style, {
          width: 20,
          lineStyles: [
            {
              color: styleGroup.color,
              lineDash: [],
              lineOffset: 0,
              lineWidth: 2,
              opacity: styleGroup.style.strokeOpacity || 1
            }
          ]
        });
        return;
      }
      if (newStyleGroup.style.shape === 'FILL') {
        Object.assign(newStyleGroup.style, {
          backgroundColor: styleGroup.style.fillColor || styleGroup.color,
          opacity: styleGroup.style.fillOpacity,
          outlineColor: styleGroup.style.strokeColor,
          width: 20,
          height: 20
        });
      }
    }
  
    _createMvtLayer(info, layerInfo, featureType) {
      const style = this._getDataVectorTileStyle(featureType);
      const paint = this._transformStyleToMapBoxGl(style, featureType);
      let url = info.url + '/tileFeature.mvt';
      const origin = mapRepo.CRS.get(this.baseProjection).getOrigin();
      const { minzoom, maxzoom } = layerInfo;
      url += `?&returnAttributes=true&width=512&height=512&x={x}&y={y}&scale={scale}&origin={x:${origin[0]},y:${origin[1]}}`;
      this._addLayer({
        id: layerInfo.layerID,
        type: style.mbglType,
        source: {
          type: 'vector',
          tiles: [url],
          proxy: this.webMapService.handleProxy('image')
        },
        'source-layer': `${info.datasetName}@${info.datasourceName}`,
        paint,
        layout: {
          visibility: layerInfo.visible ? 'visible' : 'none'
        },
        minzoom: minzoom || 0,
        maxzoom: maxzoom || 22
      });
      this._addLayerSucceeded();
    }
  
    _getDataVectorTileStyle(featureType) {
      const styleParameters = {
        radius: 8, // 圆点半径
        fillColor: '#EE4D5A', // 填充色
        fillOpacity: 0.9,
        strokeColor: '#ffffff', // 边框颜色
        strokeWidth: 1,
        strokeOpacity: 1,
        lineDash: 'solid',
        type: 'BASIC_POINT',
        mbglType: 'circle'
      };
      if (['LINE', 'LINESTRING', 'MULTILINESTRING'].includes(featureType)) {
        styleParameters.strokeColor = '#4CC8A3';
        styleParameters.strokeWidth = 2;
        styleParameters.mbglType = 'line';
      } else if (['REGION', 'POLYGON', 'MULTIPOLYGON'].includes(featureType)) {
        styleParameters.fillColor = '#826DBA';
        styleParameters.mbglType = 'fill';
      }
      return styleParameters;
    }
  
    _unproject(point, isReverse = true) {
      const sourceProjection = this._unprojectProjection || this.baseProjection;
      if (sourceProjection === 'EPSG:4326') {
        return point;
      }
      const coor = proj4(sourceProjection, 'EPSG:4326', point);
      const proj = proj4.defs(sourceProjection);
      if (isReverse && proj.axis && proj.axis.indexOf('ne') === 0) {
        coor.reverse();
      }
      return coor;
    }
  
    _getMapCenter(mapInfo) {
      // center
      let center = mapInfo.center && [mapInfo.center.x, mapInfo.center.y];
  
      if (!center) {
        center = [0, 0];
      }
      center = this._unproject(center, false);
      center = new mapRepo.LngLat(center[0], center[1]);
  
      return center;
    }
  
    _getLabelFontFamily(mapInfo) {
      const fonts = ['sans-serif'];
      const layers = mapInfo.layers;
      // 获取 label 图层字体类型
      if (layers && layers.length > 0) {
        layers.forEach((layer) => {
          layer.labelStyle && fonts.push(layer.labelStyle.fontFamily);
        }, this);
      }
      fonts.push('supermapol-icons');
      const fontFamilys = fonts.join(',');
  
      return fontFamilys;
    }
  
    _getTiandituUrl(mapInfo) {
      const re = /t0/gi;
      const tiandituUrls = { tiandituUrl: [], labelUrl: [] };
  
      const layerType = mapInfo.baseLayer.layerType.split('_')[1].toLowerCase();
      const isLabel = Boolean(mapInfo.baseLayer.labelLayerVisible);
      const token = this.tiandituKey || mapInfo.baseLayer.tk;
      let url = `https://t0.tianditu.gov.cn/{layer}_{proj}/wmts?tk=${token}`;
      let labelUrl = url;
  
      const layerLabelMap = {
        vec: 'cva',
        ter: 'cta',
        img: 'cia'
      };
  
      const tilematrixSet = this.baseProjection === 'EPSG:4326' ? 'c' : 'w';
      const options = {
        service: 'WMTS',
        request: 'GetTile',
        style: 'default',
        version: '1.0.0',
        layer: layerType,
        tilematrixSet: tilematrixSet,
        format: 'tiles',
        width: 256,
        height: 256
      };
  
      url += this._getParamString(options, url) + '&tilematrix={z}&tilerow={y}&tilecol={x}';
  
      const tiandituUrl = url.replace('{layer}', layerType).replace('{proj}', tilematrixSet);
      const tiandituUrlArr = [];
  
      for (let i = 0; i < 8; i++) {
        tiandituUrlArr.push(tiandituUrl.replace(re, `t${i}`));
      }
      tiandituUrls.tiandituUrl = tiandituUrlArr;
  
      // 如果有 label 图层
      if (isLabel) {
        const labelLayer = layerLabelMap[layerType];
        options.layer = labelLayer;
        labelUrl += this._getParamString(options, labelUrl) + '&tilematrix={z}&tilerow={y}&tilecol={x}';
        labelUrl = labelUrl.replace('{layer}', labelLayer).replace('{proj}', tilematrixSet);
        const labelUrlArr = [];
        for (let i = 0; i < 8; i++) {
          labelUrlArr.push(labelUrl.replace(re, `t${i}`));
        }
        tiandituUrls.labelUrl = labelUrlArr;
      }
  
      return tiandituUrls;
    }
  
    _defineProj4(projection, defaultEpsgCode) {
      let epsgCode = projection;
      let epsgValue;
      if (!projection.split(':')[1]) {
        if (defaultEpsgCode && defaultEpsgCode.split(':')[1]) {
          epsgCode = defaultEpsgCode;
        } else {
          epsgCode = toEpsgCode(projection);
        }
        epsgValue = projection;
      }
      const defaultValue = epsgDefine.getProjection(epsgCode);
      const defValue = epsgValue || defaultValue;
  
      if (!defValue) {
        console.error(`${epsgCode} not define`);
      } else {
        !proj4.defs(epsgCode) && proj4.defs(epsgCode, defValue);
        !defaultValue && epsgDefine.registerProjection(epsgCode, defValue);
      }
      return epsgCode;
    }
  
    _fetchRequest(url, type, options) {
      return FetchRequest.get(url, null, options)
        .then((response) => {
          return response[type]();
        })
        .then((results) => {
          return results;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    getEpsgCodeWKT(projectionUrl, options) {
      if (!projectionUrl) {
        return;
      }
      return this._fetchRequest(projectionUrl, 'text', options);
    }
  
    getBounds(baseUrl, options) {
      if (!baseUrl) {
        return;
      }
      return this._fetchRequest(baseUrl, 'json', options);
    }
  
    _addLayer(layerInfo, parentLayerId = layerInfo.id, beforeId) {
      const { id } = layerInfo;
      if (this.map.getLayer(id)) {
        if (this.checkSameLayer && this._isSameRasterLayer(id, layerInfo)) {
          this._setCacheLayer({ layerInfo, parentLayerId, id, ignore: true, beforeId });
          return;
        }
        this._updateLayer(layerInfo);
        return;
      }
      const nextLayerInfo = Object.assign(layerInfo, { metadata: { parentLayerId }});
      this.map.addLayer(nextLayerInfo);
      this._setCacheLayer({ layerInfo, parentLayerId, id, beforeId });
    }
  
    _setCacheLayer({ parentLayerId, layerInfo, ignore = false, beforeId, subRenderLayers }) {
      const renderLayers = subRenderLayers || [{ layerId: layerInfo.id, ignore }];
      if (!this._cacheLayerId.has(parentLayerId)) {
        this._cacheLayerId.set(parentLayerId, renderLayers);
      } else {
        const renderLayerList = this._cacheLayerId.get(parentLayerId);
        let matchIndex = -1;
        if (beforeId) {
          matchIndex = renderLayerList.findIndex((item) => item.layerId === beforeId);
        }
        const matchInsertIndex = matchIndex < 0 ? renderLayerList.length : matchIndex;
        renderLayerList.splice(matchInsertIndex, 0, ...renderLayers);
      }
      const layersFromMapInfo = [];
      const layerList = [this._mapInfo.baseLayer].concat(this._mapInfo.layers);
      if (this._graticuleLayer) {
        const { id: layerID, visible } = this._graticuleLayer;
        layerList.push({ layerID, visible, name: 'GraticuleLayer' });
      }
      // this._mapInfo.layers 是有序的
      layerList.forEach((layerInfo) => {
        const targetLayerId = layerInfo.layerID || layerInfo.name;
        const targetLayerVisible =
          layerInfo.visible === void 0 || layerInfo.visible === 'visible' || layerInfo.visible === true;
        const matchLayers = this._cacheLayerId.get(targetLayerId);
        if (matchLayers) {
          const renderLayers = matchLayers.filter((item) => !item.ignore).map((item) => item.layerId);
          if (!renderLayers.length) {
            return;
          }
          layersFromMapInfo.push({
            ...layerInfo,
            id: targetLayerId,
            visible: targetLayerVisible,
            renderLayers
          });
        }
      });
      this._changeSourceListModel(layersFromMapInfo);
      const appreciableLayers = this.getAppreciableLayers();
      if (this.addLayersSucceededLen && this._cacheLayerId.size !== this.addLayersSucceededLen) {
        const selfAppreciableLayers = this.getSelfAppreciableLayers(appreciableLayers)
        const topLayerBeforeId = this._findTopLayerBeforeId(selfAppreciableLayers);
        this._rectifyLayersOrder(selfAppreciableLayers, topLayerBeforeId);
        this.addLayersSucceededLen = this._cacheLayerId.size;
      }
      this.fire('addlayerchanged', this._getSelfAppreciableLayers(appreciableLayers));
    }

    _findTopLayerBeforeId(selfAppreciableLayers) {
      // fix 追加图层，异步的图层回来排序错乱
      const selfLayerIds = selfAppreciableLayers.reduce((ids, item) => ids.concat(item.renderLayers), []);
      const firstSelfLayerIdOnMap = selfLayerIds.find((id) => this.map.style._layers[id]);
      if (!firstSelfLayerIdOnMap) {
        return;
      }
      const layersOnMap = this.map.getStyle().layers;
      const firstSelfLayerIndex = layersOnMap.findIndex((item) => item.id === firstSelfLayerIdOnMap);
      const extraLayerIdsOnMap = layersOnMap.filter(item => !selfLayerIds.some(id => id === item.id)).map(item => item.id);
      for (const layerId of extraLayerIdsOnMap) {
        const matchIndex = layersOnMap.findIndex((item) => item.id === layerId);
        if (matchIndex > firstSelfLayerIndex) {
          return layerId;
        }
      }
    }
  
    _changeSourceListModel(layersFromMapInfo) {
      if (!this._sourceListModel) {
        this._sourceListModel = new SourceListModel({
          map: this.map,
          layers: layersFromMapInfo,
          appendLayers: this._appendLayers
        });
      } else {
        this._sourceListModel.setSelfLayers(layersFromMapInfo);
      }
    }
  
    _getSelfAppreciableLayers(appreciableLayers) {
      return {
        layers: this.getSelfAppreciableLayers(appreciableLayers),
        allLoaded: this._cacheLayerId.size === this.addLayersSucceededLen
      };
    }
  
    _isSameRasterLayer(id, layerInfo) {
      const {
        source: { type, tiles }
      } = layerInfo;
      if (type === 'raster') {
        const source = this.map.getSource(id);
        if (type === source.type && tiles && source.tiles && tiles[0] === source.tiles[0]) {
          return true;
        }
      }
      return false;
    }
  
    _centerValid(center) {
      if (center && (center.length > 0 || typeof center === mapRepo.LngLat || center.lng)) {
        return true;
      }
      return false;
    }
  
    _getResolution(bounds, tileSize = 512.0) {
      if (bounds.leftBottom && bounds.rightTop) {
        return Math.max(bounds.rightTop.x - bounds.leftBottom.x, bounds.rightTop.y - bounds.leftBottom.y) / tileSize;
      }
      return Math.max(bounds[2] - bounds[0], bounds[3] - bounds[1]) / tileSize;
    }
  
    _transformScaleToZoom(scale, crs) {
      const extent = (crs || this.map.getCRS()).getExtent();
      const unit = (crs || this.map.getCRS()).unit;
      const scaleBase = 1.0 / Util.getScaleFromResolutionDpi((extent[2] - extent[0]) / 512, 96, unit);
      const scaleDenominator = scale.split(':')[1];
      return Math.min(24, +Math.log2(scaleBase / +scaleDenominator).toFixed(2));
    }
  
    _updateLayer(layerInfo) {
      const {
        id,
        paint,
        source: { type, tiles, data, proxy }
      } = layerInfo;
      const source = this.map.getSource(id);
      if (source) {
        if (type === 'geojson' || source.type === 'geojson') {
          Object.keys(paint).forEach((name) => {
            this.map.setPaintProperty(id, name, paint[name]);
          });
          data && source.setData(data);
        } else if (type === 'raster') {
          this._updateRasterSource(id, { proxy, tiles });
        }
      }
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
  
    updateOverlayLayer(layerInfo, features, mergeByField) {
      const originLayerInfo = this._mapInfo.layers.find((layer) => {
        return layer.layerID === layerInfo.id;
      });
      if (features) {
        this._initOverlayLayer(originLayerInfo, features, mergeByField);
      } else {
        const type = this.webMapService.getDatasourceType(originLayerInfo);
        this.getLayerFeatures(originLayerInfo, this._taskID, type);
      }
    }
  
    isOnlineBaseLayer(url, projection) {
      return (
        url.startsWith('https://maptiles.supermapol.com/iserver/services/map_China/rest/maps/China_Dark') &&
        projection === 'EPSG:3857'
      );
    }
  
    /**
     * @private
     * @function WebMap.prototype._handleMultyPolygon
     * @description 处理复杂面情况
     */
    _handleMultyPolygon(features) {
      features.forEach((feature) => {
        if (feature.geometry.type !== 'Polygon') {
          return;
        }
        let coords = feature.geometry.coordinates;
        if (coords.length > 1) {
          let coordinates = [[coords[0]]];
          for (let index = 1; index < coords.length; index++) {
            const element = coords[index];
            const area = this.signedArea(element);
            if (area === 0) {
              continue;
            }
            if (area > 0) {
              coordinates[coordinates.length - 1].push(coords[index]);
            } else {
              coordinates.push([coords[index]]);
            }
          }
  
          feature.geometry.coordinates = coordinates;
          feature.geometry.type = 'MultiPolygon';
        }
      });
      return features;
    }
  
    signedArea(ring) {
      let sum = 0;
      for (let i = 0, len = ring.length, j = len - 1, p1, p2; i < len; j = i++) {
        p1 = ring[i];
        p2 = ring[j];
        sum += (p2[0] - p1[0]) * (p1[1] + p2[1]);
      }
      return sum;
    }
  
    _getTdtLabelLayerName(layerId) {
      return `${layerId}-tdt-label`;
    }
  
    _getSymbolLabelLayerName(layerId) {
      return `${layerId}-label`;
    }
  
    _isDataflowLayer(layerType) {
      return layerType === 'DATAFLOW_POINT_TRACK' || layerType === 'DATAFLOW_HEAT';
    }
  }
}