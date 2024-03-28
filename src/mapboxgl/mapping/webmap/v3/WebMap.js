/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { Util } from '../../../core/Util';

const LAEYR_TYPE_LEGEND_TYPE = {
  circle: 'POINT',
  symbol: 'POINT',
  line: 'LINE',
  fill: 'FILL',
  ['fill-extrusion']: 'FILLEXTRUSION'
};

const LegendPointStyleKey = ['symbolsContent', 'size', 'color', 'opacity'];

const LegendLineStyleKey = ['width', 'color', 'opacity', 'lineDasharray', 'symbolsContent'];

const LegendFillStyleKey = ['color', 'opacity', 'antialias', 'outlineColor', 'symbolsContent'];

const LegendFILLEXTRUSIONStyleKey = ['color', 'opacity', 'symbolsContent'];

export const LEGEND_STYLE_KEYS = {
  POINT: LegendPointStyleKey,
  LINE: LegendLineStyleKey,
  FILL: LegendFillStyleKey,
  FILLEXTRUSION: LegendFILLEXTRUSIONStyleKey
};

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
    this._legendList = [];
    this._mapResourceInfo = {};
    this._sprite = '';
    this._spriteDatas = {};
  }

  /**
   * @function WebMap.prototype.createWebMap
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
   * @function WebMap.prototype._createMap
   * @description 创建地图。
   */
  _createMap() {
    let { name, crs, center = new mapboxgl.LngLat(0, 0), zoom = 0, bearing = 0, pitch = 0, minzoom, maxzoom, sprite } = this._mapInfo;
    if (this._mapInfo.center && crs === 'EPSG:3857') {
      center = Util.unproject(center);
    }
    const fontFamilys = this._getLabelFontFamily();
    // 初始化 map
    const mapOptions = {
      container: this.target,
      crs,
      center,
      zoom,
      style: {
        sprite,
        name,
        version: 8,
        sources: {},
        layers: []
      },
      minzoom,
      maxzoom,
      bearing,
      pitch,
      localIdeographFontFamily: fontFamilys || ''
    };
    this.map = new mapboxgl.Map(mapOptions);
    this.fire('mapinitialized', { map: this.map });
    this.map.on('load', () => {
      sprite && this._getSpriteDatas(sprite);
      this._sprite = sprite;
      this._initLayers();
    });
  }

  /**
   * @private
   * @function WebMap.prototype._initLayers
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
      this._createMapRelatedInfo();
      this._addLayersToMap();
    });
  }

  /**
   * @private
   * @function WebMap.prototype._createMapRelatedInfo
   * @description 创建地图相关资源。
   */
  _createMapRelatedInfo() {
    const { glyphs } = this._mapInfo;
    for (let key in glyphs) {
      this.map.style.addGlyphs(key, glyphs[key]);
    }
  }

  /**
   * @private
   * @function WebMap.prototype._getMapRelatedInfo
   * @description 获取地图关联信息的 JSON 信息。
   */
  _getMapRelatedInfo() {
    return FetchRequest.get(this.mapResourceUrl, null, { withCredentials: this.withCredentials })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        /**
         * @event WebMap#getmapfailed
         * @description 获取地图信息失败。
         * @property {Object} error - 失败原因。
         */
        this.fire('getmapinfofailed', { error: error });
      });
  }

  /**
   * @private
   * @function WebMap.prototype._addLayersToMap
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
   * @function WebMap.prototype._setUniqueId
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
   * @function WebMap.prototype._sortLayers
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
   * @function WebMap.prototype._sendMapToUser
   * @description emit 图层加载成功事件。
   */
  _sendMapToUser() {
    const overlayLayers = this._generateLayers();
    this.fire('addlayerssucceeded', { map: this.map, mapparams: this.mapParams, layers: overlayLayers });
  }

  _getLayerInfosFromCatalogs(catalogs) {
    let results = [];
    for (let i = 0; i < catalogs.length; i++) {
      const { catalogType, children, visible } = catalogs[i];
      if (catalogType === 'layer' && visible) {
        results.push(catalogs[i]);
      }
      if (catalogType === 'group' && children && children.lnegth) {
        const result = this._getLayerInfosFromCatalogs(children);
        results = results.concat(result);
      }
    }
    return results;
  }

  getMapInfo() {
    return this._mapInfo;
  }

  getLegendInfo() {
    return this._legendList;
  }

  /**
   * @private
   * @function WebMap.prototype._generateV2LayersStructure
   * @description emit 图层加载成功事件。
   * @param {Array<Object>} layers - 图层信息。
   */
  _generateLayers() {
    const originLayers = this._getLayerInfosFromCatalogs(this._mapResourceInfo.catalogs);
    let _this = this;
    const layers = originLayers.map(layer => {
      const { visualization, title } = layer;
      const realLayerId = this._layerIdMapList[layer.id];
      let dataId = '';
      let layerType = _this._mapInfo.layers.find(function (item) {
        return item.id === layer.id;
      }).type;
      this._createLegendInfo(layer, layerType);
      let type = layerType;
      layerType = layerType === 'raster' ? 'raster' : 'vector';
      var dataType = '';
      _this._mapResourceInfo.datas.forEach((data) => {
        data.datasets.forEach((dataset) => {
          if (dataset.msDatasetId === layer.msDatasetId) {
            dataType = data.sourceType;
            dataId = dataset.datasetId;
          }
        });
      });
      var overlayLayers = {
        dataSource: {
          serverId: dataId,
          type: dataType
        },
        layerID: realLayerId,
        layerType,
        type,
        name: title
      };
      if (visualization) {
        if (visualization.renderer[0] && visualization.renderer[0].color && visualization.renderer[0].color.field) {
          overlayLayers.themeSetting = {
            themeField: visualization.renderer[0].color.field
          }
        }
      }
      return overlayLayers;
    })
    return layers;
  }

  /**
   * @private
   * @function WebMap.prototype._getLabelFontFamily
   * @description 获取图层字体类型。
   */
  _getLabelFontFamily() {
    const fonts = [];
    const layers = this._mapInfo.layers;
    if (layers && layers.length > 0) {
      layers.forEach(layer => {
        const textFont = layer.layout && layer.layout['text-font'] || [];
        fonts.push(...textFont);
      });
    }
    const fontFamilys = fonts.join(',');
    return fontFamilys;
  }

  /**
   * @private
   * @function WebMap.prototype._getSpriteDatas
   * @description 获取雪碧图信息。
   */
  _getSpriteDatas(spriteUrl) {
    return FetchRequest.get(spriteUrl, null, { withCredentials: this.withCredentials })
      .then((response) => {
        return response.json();
      }).then((res) => {
        this._spriteDatas = res;
      });
  }

  _createLegendInfo(layer, layerType) {
    const legendType = LAEYR_TYPE_LEGEND_TYPE[layerType];
    const keys = LEGEND_STYLE_KEYS[legendType];
    const styleList = layer.visualization.renderer[0];
    const simpleStyle = this._getLegendSimpleStyle(layerType, styleList);

    keys.forEach((keyName) => {
      if (!simpleStyle[keyName]) {
        const legendItemInfo = {
          themeField: styleList[keyName].field[0],
          styleGroup: [],
          layerId: layer.id
        };
        if (keyName === 'color') {
          let symbolId = simpleStyle['symbolsContent'].value.symbol;
          if (symbolId) {
            let symbolInfo = this._spriteDatas[symbolId];
            styleList[keyName].values.forEach((info) => {
              let groupItemInfo = {
                value: info.key,
                style: {
                  backgroundColor: info.value
                }
              }
              if (symbolInfo) {
                const { width, height, x, y, pixelRatio } = symbolInfo;
                groupItemInfo.style.width = `${width}px`;
                groupItemInfo.style.height = `${height}px`;
                groupItemInfo.style.backgroundPosition = `-${x * pixelRatio}px -${y * pixelRatio}px`;
                groupItemInfo.style.backgroundImage = `url(${this._sprite}.png)`;
              }
              if (legendType === 'FILL') {
                groupItemInfo.style.width = '20px';
                groupItemInfo.style.height = '20px';
              }
              legendItemInfo.styleGroup.push(groupItemInfo);
            });
          }
        }
        this._legendList.push(legendItemInfo);
      }
    });
  }

  _getLegendSimpleStyle(layerType, styleSetting) {
    const simpleStyle = {};
    const legendType = LAEYR_TYPE_LEGEND_TYPE[layerType];
    const keys = LEGEND_STYLE_KEYS[legendType];
    const simpleKeys = keys.filter(k => styleSetting[k] && styleSetting[k].type === 'simple');
    simpleKeys.forEach(k => {
      simpleStyle[k] = styleSetting[k] && styleSetting[k].value;
    });
    return simpleStyle;
  }
}
