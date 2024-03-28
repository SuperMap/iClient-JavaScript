/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { Util } from '../../../core/Util';

export class WebMap extends mapboxgl.Evented {
  constructor(mapId, options) {
    super();
    this.mapId = mapId;
    this.server = options.server;
    this.withCredentials = options.withCredentials;
    this.target = options.target;
    this.mapResourceUrl = Util.transformUrl(Object.assign({ url: `${this.server}web/maps/${mapId}` }, this.options));
    this._layersOfV3 = [];
    this._layerIdMapList = {};
    this._mapResourceInfo = {};
  }

  /**
   * @function mapboxgl.supermap.WebMap.prototype.createWebMap
   * @description 登陆窗口后添加地图图层。
   * @param {Object} mapInfo - map 信息。
   * @param {Object} map - map 实例。
   */
  createWebMap(mapInfo, map) {
    this._mapInfo = mapInfo;
    if (map) {
      this.map = map;
      this._initLayers();
      return;
    }
    this._createMap();
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._createMap
   * @description 创建地图。
   */
  _createMap() {
    let { name, crs, center = new mapboxgl.LngLat(0, 0), zoom = 0, bearing = 0, pitch = 0, minzoom, maxzoom } = this._mapInfo;
    if (this._mapInfo.center && crs === 'EPSG:3857') {
      center = Util.unproject(center);
    }
    // 初始化 map
    const mapOptions = {
      container: this.target,
      crs,
      center,
      zoom,
      style: {
        name,
        version: 8,
        sources: {},
        layers: []
      },
      minzoom,
      maxzoom,
      bearing,
      pitch
    };
    this.map = new mapboxgl.Map(mapOptions);
    this.fire('mapinitialized', { map: this.map });
    this.map.on('load', () => {
      this._initLayers();
    });
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._initLayers
   * @description emit 图层加载成功事件。
   */
  _initLayers() {
    if (this.map && this.map.getCRS && this.map.getCRS().epsgCode !== this._mapInfo.crs) {
      this.fire('projectionisnotmatch');
      return;
    }
    this._getMapRelatedInfo().then(relatedInfo => {
      this.mapParams = {
        title: this._mapInfo.name,
        description: relatedInfo.description
      };
      this._mapResourceInfo = JSON.parse(relatedInfo.projectInfo);
      this._createMapRelatedInfo().then(res => {
        if (res) {
          this._addLayersToMap();
        }
      });
    });
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._createMapRelatedInfo
   * @description 创建地图相关资源。
   */
  _createMapRelatedInfo() {
    const { glyphs, sprite } = this._mapInfo;
    for (let key in glyphs) {
      this.map.style.addGlyphs(key, glyphs[key]);
    }
    for (let key in sprite) {
      this.map.style.addSprite(key, sprite[key]);
    }
    // 添加地图图片资源
    const { images } = this._mapResourceInfo;
    const loadImagePromises = images.map(({ url, id }) => {
      return new Promise((resolve, reject) => {
        this.map.loadImage(url, (error, image) => {
          if (error) {
            reject(error);
            return;
          }
          !this.map.hasImage(id) && this.map.addImage(id, image, { sdf: true });
          resolve(url);
        });
      });
    });
    return Promise.all(loadImagePromises)
      .then((imagesAddToMap) => {
        this.fire('getlayerresourcesucceeded', { images: imagesAddToMap });
        return imagesAddToMap;
      })
      .catch((error) => {
        this.fire('getlayerresourcefailed', { error });
      });
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._getMapRelatedInfo
   * @description 获取地图关联信息的 JSON 信息。
   */
   _getMapRelatedInfo() {
    return FetchRequest.get(this.mapResourceUrl, null, { withCredentials: this.withCredentials })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        /**
         * @event mapboxgl.supermap.WebMap#getmapfailed
         * @description 获取地图信息失败。
         * @property {Object} error - 失败原因。
         */
        this.fire('getmapinfofailed', { error: error });
      });
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._addLayersToMap
   * @description emit 图层加载成功事件。
   */
  _addLayersToMap() {
    const { sources, layers, layerIdMapList } = this._setUniqueId(this._mapInfo);
    this._layersOfV3 = layers;
    this._layerIdMapList = layerIdMapList;
    layers.forEach(layer => {
      layer.source && !this.map.getSource(layer.source) && this.map.addSource(layer.source, sources[layer.source]);
      this.map.addLayer(layer);
    });
    // this._sortLayers(layers);
    this._sendMapToUser();
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._setUniqueId
   * @description 返回唯一 id 的 sources 和 layers。
   * @param {Object} mapInfo - map 信息。
   */
  _setUniqueId(mapInfo) {
    let layersToMap = JSON.parse(JSON.stringify(mapInfo.layers));
    const nextSources = {};
    const layerIdToChange = {};
    for (let sourceId in mapInfo.sources) {
      let timestamp = this.map.getSource(sourceId) ? `_${+new Date()}` : '';
      const nextSourceId = sourceId + timestamp;
      nextSources[nextSourceId] = mapInfo.sources[sourceId];
      layersToMap = layersToMap.map(layer => {
        let nextLayer = layer;
        if (layer.source === sourceId) {
          let layerId = layer.id;
          if (this.map.getLayer(layerId)) {
            layerId = timestamp ? layer.id + timestamp : `${layer.id}_${+new Date()}`;
          }
          nextLayer = Object.assign({}, layer, { id: layerId, source: nextSourceId });
        }
        layerIdToChange[layer.id] = nextLayer.id;
        return nextLayer;
      });
    }
    return {
      sources: nextSources,
      layers: layersToMap,
      layerIdMapList: layerIdToChange
    };
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._sortLayers
   * @description 调整图层位置。
   * @param {Array<Object>} layers - 图层信息。
   */
  _sortLayers(layers) {
    const layersAddToMap = layers.filter((layer) => !!this.map.getLayer(layer.id)).reverse();
    layersAddToMap.forEach((layer, index) => {
      const targetLayerId = layer.id;
      const prevIndex = index - 1;
      let beforeLayerId = (layersAddToMap[prevIndex] || {}).id;
      if (targetLayerId.startsWith('tianditu_label_')) {
        let matchIndex = prevIndex;
        while (layersAddToMap[matchIndex] && layersAddToMap[matchIndex].id.toLowerCase().startsWith('tianditu')) {
          matchIndex -= 1;
        }
        beforeLayerId = (layersAddToMap[matchIndex] || {}).id;
      }
      this.map.moveLayer(targetLayerId, beforeLayerId);
    });
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._sendMapToUser
   * @description emit 图层加载成功事件。
   */
  _sendMapToUser() {
    const overlayLayers = this._generateV2LayersStructure();
    this.fire('addlayerssucceeded', { map: this.map, mapparams: this.mapParams, layers: overlayLayers });
  }

  /**
   * @private
   * @function mapboxgl.supermap.WebMap.prototype._generateV2LayersStructure
   * @description emit 图层加载成功事件。
   * @param {Array<Object>} layers - 图层信息。
   */
   _generateV2LayersStructure() {
    const originLayers = this._mapResourceInfo.layers.filter(item => item.visible);
    const layers = originLayers.map(layer => {
      const { themeSetting = {}, title } = layer;
      const realLayerId = this._layerIdMapList[layer.id];
      let layerType = themeSetting.type;
      if (!layerType) {
        const matchLayer = this._mapInfo.layers.find(item => item.id === layer.id);
        layerType = this._mapInfo.sources[matchLayer.source].type;
        if (layerType === 'raster') {
          layerType = 'TIle';
        }
      }
      const overlayLayers = {
        layerID: realLayerId,
        name: title,
        layerType: layerType,
        themeSetting
      }
      return overlayLayers;
    })
    return layers;
  }
}
