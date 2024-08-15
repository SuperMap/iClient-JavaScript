/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { FetchRequest } from '../util/FetchRequest';
import { getLayerInfosFromCatalogs, mergeFeatures, transformUrl } from './utils/util';
import { SourceListModel } from './utils/SourceListModelV3';

const LEGEND_RENDER_TYPE = {
  TEXT: 'TEXT',
  POINT: 'POINT',
  LINE: 'LINE',
  FILL: 'FILL',
  FILLEXTRUSION: 'FILLEXTRUSION',
  ANIMATEPOINT: 'ANIMATEPOINT',
  ANIMATELINE: 'ANIMATELINE',
  RADARPOINT: 'RADARPOINT',
  BUILTINSYMBOL: 'BUILTINSYMBOL'
};

const LEGEND_SHAPE_TYPE = {
  TEXT: 'TEXT',
  POINT: 'POINT',
  LINE: 'LINE',
  RECTANGLE: 'RECTANGLE',
  ANIMATEPOINT: 'ANIMATEPOINT',
  ANIMATELINE: 'ANIMATELINE',
  RADARPOINT: 'RADARPOINT',
  HEXAGON: 'HEXAGON',
  TRIANGLE: 'TRIANGLE',
  LINEGRADIENT: 'LINEGRADIENT'
};

const LEGEND_CSS_STATE_KEY = {
  fontSize: 'size',
  backgroundColor: 'color'
};

const LEGEND_CSS_DEFAULT = {
  [LEGEND_RENDER_TYPE.TEXT]: {
    textSize: '16px',
    textColor: '#FFFFFF',
    textOpacity: 1,
    textHaloColor: '#242424',
    textHaloBlur: 1,
    textHaloWidth: 1,
    textFont: 'Microsoft YaHei'
  },
  [LEGEND_RENDER_TYPE.POINT]: {
    fontSize: '8px',
    color: '#FFFFFF',
    opacity: 1
  },
  [LEGEND_RENDER_TYPE.BUILTINSYMBOL]: {
    fontSize: '12px',
    color: '#FFFFFF',
    opacity: 1
  },
  [LEGEND_RENDER_TYPE.LINE]: {
    width: 20,
    height: 8,
    backgroundColor: '#FFFFFF',
    opacity: 1
  },
  [LEGEND_RENDER_TYPE.FILL]: {
    width: '20px',
    height: '20px',
    opacity: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: '1px',
    outline: '1px solid transparent',
    outlineColor: '#FFFFFF'
  },
  [LEGEND_RENDER_TYPE.FILLEXTRUSION]: {
    width: '20px',
    height: '20px',
    opacity: 1,
    backgroundColor: '#FFFFFF'
  },
  [LEGEND_RENDER_TYPE.ANIMATEPOINT]: {
    size: 30, // UI 上显示直径
    color: '#EE4D5A',
    opacity: 0.9,
    speed: 1,
    rings: 3
  },
  [LEGEND_RENDER_TYPE.ANIMATELINE]: {
    width: 20,
    height: 8,
    backgroundColor: '#FFFFFF',
    opacity: 1
  },
  [LEGEND_RENDER_TYPE.RADARPOINT]: {
    size: 60, // UI 上显示直径
    color: '#EE4D5A',
    opacity: 0.9,
    speed: 3
  }
};
const LegendTextDataDrivenStyleKey = [
  'textSize',
  'textColor',
  'textOpacity',
  'textHaloColor'
];

const LEGEND_STYLE_KEYS = {
  [LEGEND_RENDER_TYPE.TEXT]: [...LegendTextDataDrivenStyleKey, 'symbolsContent', 'textField', 'textFont', 'textHaloBlur', 'textHaloWidth'],
  [LEGEND_RENDER_TYPE.POINT]: ['symbolsContent', 'size', 'color', 'opacity'],
  [LEGEND_RENDER_TYPE.BUILTINSYMBOL]: ['symbolsContent', 'size', 'color', 'opacity'],
  [LEGEND_RENDER_TYPE.LINE]: ['width', 'color', 'opacity', 'lineDasharray', 'symbolsContent'],
  [LEGEND_RENDER_TYPE.FILL]: ['color', 'opacity', 'antialias', 'outlineColor', 'symbolsContent'],
  [LEGEND_RENDER_TYPE.FILLEXTRUSION]: ['color', 'opacity', 'symbolsContent'],
  [LEGEND_RENDER_TYPE.ANIMATEPOINT]: ['color', 'opacity', 'size', 'speed', 'rings'],
  [LEGEND_RENDER_TYPE.ANIMATELINE]: ['color', 'opacity', 'width', 'textureBlend', 'symbolsContent', 'iconStep'],
  [LEGEND_RENDER_TYPE.RADARPOINT]: ['color', 'opacity', 'size', 'speed']
};

const LEGEND_SYMBOL_DEFAULT = {
  [LEGEND_RENDER_TYPE.POINT]: 'circle',
  [LEGEND_RENDER_TYPE.BUILTINSYMBOL]: 'circle',
  [LEGEND_RENDER_TYPE.FILL]: 'polygon-0',
  [LEGEND_RENDER_TYPE.FILLEXTRUSION]: 'polygon-0'
};

const LegendType = {
  LINEAR: 'LINEAR',
  UNIQUE: 'UNIQUE',
  RANGE: 'RANGE'
};

const SymbolType = {
  line: 'line',
  point: 'point',
  polygon: 'polygon'
};

const MAP_LAYER_TYPE_2_SYMBOL_TYPE = {
  circle: 'point',
  line: 'line',
  symbol: 'point',
  fill: 'polygon',
  'fill-extrusion': 'polygon',
  heatmap: 'point',
  // background: 'background',//无此符号类型
  // L7
  radar: 'point',
  'point-extrusion': 'point',
  'heatmap-extrusion': 'point',
  'line-extrusion': 'line',
  'line-curve': 'line',
  'line-curve-extrusion': 'line'
};

const LEGEND_LINE_WIDTH = 100;
const LINE_WIDTH_KEY = 'line-width';

export const LEGEND_STYLE_TYPES = {
  IMAGE: 'image',
  STYLE: 'style'
};
export function createWebMapV3Extending(SuperClass, { MapManager, mapRepo, mapRepoName, l7LayerUtil }) {
  return class WebMap extends SuperClass {
    constructor(mapId, options, mapOptions = {}) {
    super();
    this.mapId = mapId;
    this.options = options;
    this.mapOptions = mapOptions;
    this._mapResourceInfo = {};
    this._sprite = '';
    this._spriteDatas = {};
    this._appendLayers = false;
    this._baseProjection = '';
  }

  /**
   * @function WebMap.prototype.initializeMap
   * @description 登陆窗口后添加地图图层。
   * @param {Object} mapInfo - map 信息。
   * @param {Object} map - map 实例。
   */
  initializeMap(mapInfo, map) {
    this._mapInfo = mapInfo;
    const proj = this._setBaseProjection();
    if (!proj) {
      return;
    }
    if (map) {
      this._appendLayers = true;
      this.map = map;
       // 处理图层管理添加 sprite
       const { sources, sprite } = this._mapInfo;
       if (sprite && sources) {
         Object.keys(sources).forEach((sourceName) => {
           if (sources[sourceName].type === 'vector') {
             this.map.style.addSprite(sourceName, sprite);
           }
         });
       }
      this._initLayers();
      return;
    }
    this._createMap();
  }

  clean(removeMap = true) {
    if (this.map) {
      const scene = this.map.$l7scene;
      if (scene) {
        scene.removeAllLayer();
      }
      removeMap && this.map.remove();
      this.map = null;
      this._legendList = [];
      this._mapResourceInfo = {};
      this._sprite = '';
      this._spriteDatas = {};
      this.mapOptions = {};
      this.options = {};
    }
  }

  async copyLayer(id, layerInfo = {}) {
    const matchLayer = this._mapInfo.layers.find(layer => layer.id === id);
    if (!matchLayer || this._getLayerOnMap(layerInfo.id)) {
      return;
    }
    const copyLayerId = layerInfo.id || `${matchLayer.id}_copy`;
    const copyLayer = { ...matchLayer, ...layerInfo, id: copyLayerId };
    if (l7LayerUtil.isL7Layer(copyLayer)) {
      const layers = [copyLayer];
      await l7LayerUtil.addL7Layers({
        map: this.map,
        webMapInfo: { ...this._mapInfo, layers, sources: this._mapInfo.sources },
        l7Layers: layers,
        spriteDatas: this._spriteDatas,
        options: this.options
      });
      return;
    }
    if (typeof copyLayer.source === 'object') {
      this.map.addSource(copyLayer.id, copyLayer.source);
      copyLayer.source = copyLayer.id;
    }
    this.map.addLayer(copyLayer);
  }

  updateOverlayLayer(layerInfo, features, mergeByField) {
    if (layerInfo.renderSource.type === 'geojson') {
      const sourceId = layerInfo.renderSource.id;
      features = mergeFeatures({ sourceId, features, mergeByField, map: this.map });
      const featureCollection = {
        type: 'FeatureCollection',
        features
      };
      this.map.getSource(sourceId).setData(featureCollection);
    }
  }

  /**
   * @private
   * @function WebMap.prototype._createMap
   * @description 创建地图。
   */
  _createMap() {
    let {
      name = '',
      center = new mapRepo.LngLat(0, 0),
      zoom = 0,
      bearing = 0,
      pitch = 0,
      minzoom,
      maxzoom,
      sprite = ''
    } = this._mapInfo;
    center = this.mapOptions.center || center;
    zoom = this.mapOptions.zoom || zoom;
    bearing = this.mapOptions.bearing || bearing;
    pitch = this.mapOptions.pitch || pitch;
    const fontFamilys = this._getLabelFontFamily();
    // 初始化 map
    const mapOptions = {
      transformRequest: (url, resourceType) => {
        const res = { url };
        if (
          resourceType === 'Tile' &&
          this.options.iportalServiceProxyUrl &&
          url.indexOf(this.options.iportalServiceProxyUrl) >= 0
          ) {
          res.credentials = 'include';
        }
        return res;
      },
      ...this.mapOptions,
      container: this.options.target,
      crs: this._baseProjection,
      center,
      zoom,
      style: {
        sprite,
        name,
        version: 8,
        sources: {},
        layers: []
      },
      minZoom: minzoom,
      maxZoom: maxzoom,
      bearing,
      pitch,
      localIdeographFontFamily: fontFamilys || ''
    };
    this.map = new MapManager(mapOptions);
    this._sprite = sprite;
    this.fire('mapinitialized', { map: this.map });
    this.map.on('load', () => {
      this._initLayers();
    });
  }

  _setBaseProjection() {
    let crs = this._mapInfo.crs;
    let baseProjection = crs;
    if (typeof crs === 'object') {
      baseProjection = crs.name;
      if (!mapRepo.CRS) {
        const error = `The EPSG code ${baseProjection} needs to include ${mapRepoName}-enhance.js. Refer to the example: https://iclient.supermap.io/examples/${mapRepoName.replace('-', '')}/editor.html#mvtVectorTile_2362`;
        this.fire('getmapinfofailed', { error: error });
        console.error(error);
        return;
      }
      this._setCRS(crs);
    }
    this._baseProjection = baseProjection;
    return this._baseProjection;
  }

  _setCRS({ name, wkt, extent }) {
    const crs = new mapRepo.CRS(name, wkt, extent, extent[2] > 180 ? 'meter' : 'degree');
    mapRepo.CRS.set(crs);
  }

  /**
   * @private
   * @function WebMap.prototype._initLayers
   * @description emit 图层加载成功事件。
   */
  _initLayers() {
    if (this.map.getCRS && this.map.getCRS().epsgCode !== this._baseProjection) {
      this.fire('projectionisnotmatch');
      return;
    }
    if (Object.prototype.toString.call(this.mapId) === '[object Object]') {
      this.mapParams = {
        title: this._mapInfo.name,
        description: ''
      };
      this._createMapRelatedInfo();
      this._addLayersToMap();
      return;
    }
    Promise.all([this._getMapRelatedInfo(), this._getSpriteDatas()])
      .then(([relatedInfo]) => {
        this.mapParams = {
          title: this._mapInfo.name,
          description: relatedInfo.description
        };
        this._mapResourceInfo = JSON.parse(relatedInfo.projectInfo);
        this._createMapRelatedInfo();
        this._addLayersToMap();
      })
      .catch((error) => {
        /**
         * @event WebMap#getmapfailed
         * @description 获取地图信息失败。
         * @property {Object} error - 失败原因。
         */
        this.fire('getmapinfofailed', { error: error });
        console.error(error);
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
    const mapResourceUrl = transformUrl(
      Object.assign({ url: `${this.options.server}web/maps/${this.mapId}` }, this.options)
    );
    return FetchRequest.get(mapResourceUrl, null, { withCredentials: this.options.withCredentials }).then((response) =>
      response.json()
    );
  }

  /**
   * @private
   * @function WebMap.prototype._addLayersToMap
   * @description emit 图层加载成功事件。
   */
  async _addLayersToMap() {
    try {
      const { sources, layers, layerCatalog, catalogs } = this._setUniqueId(this._mapInfo, this._mapResourceInfo);
      Object.assign(this._mapInfo, {
        sources,
        layers,
        metadata: Object.assign(this._mapInfo.metadata, { layerCatalog })
      });
      Object.assign(this._mapResourceInfo, { catalogs });
      const mapboxglLayers = layers.filter((layer) => !l7LayerUtil.isL7Layer(layer));
      mapboxglLayers.forEach((layer) => {
        layer.source && !this.map.getSource(layer.source) && this.map.addSource(layer.source, sources[layer.source]);
        // L7才会用到此属性
        if (layer.type === 'symbol' && layer.layout['text-z-offset'] === 0) {
          delete layer.layout['text-z-offset'];
        }
        this.map.addLayer(layer);
      });
      const l7Layers = layers.filter((layer) => l7LayerUtil.isL7Layer(layer));
      if (l7Layers.length > 0) {
        await l7LayerUtil.addL7Layers({
          map: this.map,
          webMapInfo: { ...this._mapInfo, layers, sources },
          l7Layers,
          spriteDatas: this._spriteDatas,
          options: {
            ...this.options,
            emitterEvent: this.fire.bind(this)
          }
        });
      }
      this._createLegendInfo();
      this._sendMapToUser();
    } catch (error) {
      this.fire('getlayersfailed', { error, map: this.map });
      console.error(error);
    }
  }

  /**
   * @private
   * @function WebMap.prototype._setUniqueId
   * @description 返回唯一 id 的 sources 和 layers。
   * @param {Object} mapInfo - map 信息。
   */
  _setUniqueId(style, projectInfo) {
    const unspportedLayers = this._handleUnSupportedLayers(style);
    const layersToMap = JSON.parse(JSON.stringify(style.layers)).filter((layer) => {
      return !unspportedLayers.includes(layer.id);
    });
    const nextSources = {};
    const layerIdToChange = [];
    const timestamp = `_${+new Date()}`;
    for (const sourceId in style.sources) {
      let nextSourceId = sourceId;
      if (this.map.getSource(sourceId)) {
        nextSourceId = sourceId + timestamp;
      }
      nextSources[nextSourceId] = style.sources[sourceId];
      for (const layer of layersToMap) {
        if (layer.source === sourceId) {
          layer.source = nextSourceId;
        }
      }
    }
    for (const layer of layersToMap) {
      const originId = layer.id;
      if (this._getLayerOnMap(layer.id)) {
        const layerId = layer.id + timestamp;
        layer.id = layerId;
      }
      layerIdToChange.push({ originId: originId, renderId: layer.id });
    }
    const layerCatalogFromMapJson = JSON.parse(JSON.stringify(style.metadata.layerCatalog), 'parts');
    this._updateLayerCatalogsId({
      loopData: JSON.parse(JSON.stringify(layerCatalogFromMapJson)),
      catalogs: layerCatalogFromMapJson,
      layerIdMapList: layerIdToChange,
      unspportedLayers
    });
    const catalogsFromProjectInfo = JSON.parse(JSON.stringify(projectInfo.catalogs || []));
    this._updateLayerCatalogsId({
      loopData: JSON.parse(JSON.stringify(catalogsFromProjectInfo)),
      catalogs: catalogsFromProjectInfo,
      layerIdMapList: layerIdToChange,
      catalogTypeField: 'catalogType',
      layerIdsField: 'layersContent',
      unspportedLayers
    });
    return {
      sources: nextSources,
      layers: layersToMap,
      layerCatalog: layerCatalogFromMapJson,
      catalogs: catalogsFromProjectInfo
    };
  }

  _getLayerOnMap(layerId) {
    const overlayLayer = this.map.overlayLayersManager[layerId];
    if (overlayLayer) {
      return overlayLayer;
    }
    const l7MarkerLayers = l7LayerUtil.getL7MarkerLayers();
    const l7MarkerLayer = l7MarkerLayers[layerId];
    if (l7MarkerLayer) {
      return l7MarkerLayer;
    }
    return this.map.getLayer(layerId);
  }

  _findLayerCatalog(items, id) {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const found = this._findLayerCatalog(item.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null; 
  }

  _deleteLayerCatalog(catalogs, id) {
    for (let index = 0; index < catalogs.length; index++) {
      const catalog = catalogs[index];
      if (catalog.id === id) {
        catalogs.splice(index, 1);
        break;
      }
      if (catalog.children) {
        this._deleteLayerCatalog(catalog.children, id);
      }
    }
  }

  _updateLayerCatalogsId({
    loopData,
    catalogs,
    layerIdMapList,
    catalogTypeField = 'type',
    layerIdsField = 'parts',
    unspportedLayers
  }) {
    loopData.forEach((loopItem) => {
      const { id, children } = loopItem;
      if (loopItem[catalogTypeField] === 'group') {
        this._updateLayerCatalogsId({
          loopData: children,
          catalogs,
          layerIdMapList,
          catalogTypeField,
          layerIdsField,
          unspportedLayers
        });
        return;
      }
      const matchLayer = layerIdMapList.find((item) => item.originId === id);
      if (matchLayer) {
        const catalog = this._findLayerCatalog(catalogs, id);
        catalog.id = matchLayer.renderId;
        if (catalog[layerIdsField]) {
          catalog[layerIdsField] = this._renameLayerIdsContent(catalog[layerIdsField], layerIdMapList);
        }
        return;
      }
      if (unspportedLayers.includes(id)) {
        this._deleteLayerCatalog(catalogs, id);
      }
    });
  }

  /**
   * @private
   * @function WebMap.prototype._sendMapToUser
   * @description emit 图层加载成功事件。
   */
  _sendMapToUser() {
    this._sourceListModel = new SourceListModel({
      map: this.map,
      appendLayers: this._appendLayers,
      mapInfo: this._mapInfo,
      mapResourceInfo: this._mapResourceInfo,
      legendList: this._legendList,
      l7LayerUtil
    });
    this.fire('addlayerssucceeded', { map: this.map, mapparams: this.mapParams, layers: this.getSelfAppreciableLayers() });
  }

  _renameLayerIdsContent(layerIds, layerIdRenameMapList) {
    if (!layerIds) {
      return layerIds;
    }
    return layerIds.map((id) => {
      const matchItem = layerIdRenameMapList.find((item) => item.originId === id);
      return matchItem.renderId;
    });
  }

  _parseRendererStyleData(renderer) {
    // 根据 map 的工程信息返回结果看，聚合图层的 renderer 是对象 其他图层是数组
    if (renderer instanceof Array) {
      return renderer;
    }
    return [renderer];
  }

  /**
   * @private
   * @function WebMap.prototype._getLabelFontFamily
   * @description 获取图层字体类型。
   */
  _getLabelFontFamily() {
    const fonts = ['sans-serif'];
    const layers = this._mapInfo.layers;
    if (layers && layers.length > 0) {
      layers.forEach((layer) => {
        const textFont = (layer.layout && layer.layout['text-font']) || [];
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
  _getSpriteDatas() {
    const sprite = this._sprite;
    if (!sprite) {
      return;
    }
    if (typeof sprite === 'string') {
      const url = sprite.replace(/.+(web\/maps\/.+)/, `${this.options.server}$1`);
      return FetchRequest.get(url, null, { withCredentials: this.options.withCredentials })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          this._spriteDatas = res;
        });
    }
    this._spriteDatas = sprite;
  }

  _createLegendInfo() {
    const { catalogs = [] } = this._mapResourceInfo;
    const originLayers = getLayerInfosFromCatalogs(catalogs, 'catalogType');
    for (const layer of originLayers) {
      const { renderer, label } = layer.visualization || {};
      if (!renderer) {
        continue;
      }
      const layerFromMapInfo = this._mapInfo.layers.find((item) => {
        return item.id === layer.id;
      });
      let themeField;
      const sourceInfo = this._mapInfo.sources[layerFromMapInfo.source];
      if ('clusterField' in sourceInfo) {
        themeField = sourceInfo.clusterField;
      }
      const nextLayer = Object.assign({}, layerFromMapInfo, { title: layer.title, themeField });
      const styleSettings = this._parseRendererStyleData(renderer);
      // 线面文本标签
      if (label) {
        styleSettings.push({...label, type: 'text'});
        if (label.symbolsContent && label.symbolsContent.value.symbolId) {
          styleSettings.push({...label, type: 'symbol'});
        }
      }
      // 点文本标签
      if (styleSettings[0].textField && styleSettings[0].textField.value) {
        styleSettings.push({
          ...styleSettings[0],
          type: 'text'
        });
      }
      const layerLegends = styleSettings.reduce((legends, styleSetting) => {
        const legendItems = this._createLayerLegendList(nextLayer, styleSetting);
        legendItems && legends.push(...legendItems);
        return legends;
      }, []);
      this._legendList.push(...layerLegends);
    }
  }

  _getAliasKey(renderType, key) {
    if (renderType === 'isoline3D' && key === 'dashArray') {
      return 'lineDasharray';
    }
    return key;
  }

  _transStyleKeys(renderType, keys) {
    return keys.map((key) => this._getAliasKey(renderType, key));
  }

  _transStyleSetting(renderType, styleSetting) {
    for (const key in styleSetting) {
      const aliasKey = this._getAliasKey(renderType, key);
      if (aliasKey !== key) {
        styleSetting[aliasKey] = styleSetting[key];
      }
    }
  }

  _getLegendSimpleStyle(styleSetting, keys) {
    const simpleStyle = {};
    if (keys) {
      const simpleKeys = keys.filter((k) => styleSetting[k] && styleSetting[k].type === 'simple');
      simpleKeys.forEach((k) => {
        if (k === 'outlineColor' && !(styleSetting['antialias'] || {}).value) {
          return;
        }
        simpleStyle[k] = (styleSetting[k] || {}).value;
      });
    }
    return simpleStyle;
  }

  _getLegendRenderType(renderType) {
    switch (renderType) {
      case 'text':
        return LEGEND_RENDER_TYPE.TEXT;
      case 'circle':
      case 'symbol':
      case 'column':
        return LEGEND_RENDER_TYPE.POINT;
      case 'heatGrid':
      case 'heatHexagon':
      case 'heat3DGrid':
      case 'heat3DHexagon':
        return LEGEND_RENDER_TYPE.BUILTINSYMBOL;
      case 'line':
      case 'isoline3D':
        return LEGEND_RENDER_TYPE.LINE;
      case 'fill':
        return LEGEND_RENDER_TYPE.FILL;
      case 'fillExtrusion':
        return LEGEND_RENDER_TYPE.FILLEXTRUSION;
      case 'animatePoint':
        return LEGEND_RENDER_TYPE.ANIMATEPOINT;
      case 'line3D':
      case 'animateLine':
        return LEGEND_RENDER_TYPE.ANIMATELINE;
      case 'radarPoint':
        return LEGEND_RENDER_TYPE.RADARPOINT;
    }
  }

  _getLegendShape(renderType, styleSetting) {
    switch (renderType) {
      case 'text':
        return LEGEND_SHAPE_TYPE.TEXT;
      case 'circle':
      case 'symbol':
        return LEGEND_SHAPE_TYPE.POINT;
      case 'column': {
        const symbolIds = {
          cylinder: LEGEND_SHAPE_TYPE.POINT,
          triangleColumn: LEGEND_SHAPE_TYPE.TRIANGLE,
          squareColumn: LEGEND_SHAPE_TYPE.RECTANGLE,
          hexagonColumn: LEGEND_SHAPE_TYPE.HEXAGON
        };
        return symbolIds[styleSetting.shape.value] || LEGEND_SHAPE_TYPE.POINT;
      }
      case 'heatHexagon':
      case 'heat3DHexagon':
        return LEGEND_SHAPE_TYPE.HEXAGON;
      case 'line':
      case 'isoline3D':
        return LEGEND_SHAPE_TYPE.LINE;
      case 'fill':
      case 'heatGrid':
      case 'heat3DGrid':
      case 'fillExtrusion':
        return LEGEND_SHAPE_TYPE.RECTANGLE;
      case 'animatePoint':
        return LEGEND_SHAPE_TYPE.ANIMATEPOINT;
      case 'animateLine':
      case 'line3D':
        return LEGEND_SHAPE_TYPE.ANIMATELINE;
      case 'radarPoint':
        return LEGEND_SHAPE_TYPE.RADARPOINT;
      case 'heat':
      case 'heat3D':
        return LEGEND_SHAPE_TYPE.LINEGRADIENT;
    }
  }

  /**
   * 1) 无数据驱动时；
   * 2) 只有一个颜色数据驱动，且性线数据驱动时
   * 以上两种情况图例中需要单独的显示符号项
   * @returns {boolean} 是否显示图例单项
   */
  _isShowLegendSingleItem(dataKeys, isLinearColor) {
    return dataKeys.length === 0 || (dataKeys.length === 1 && dataKeys[0] === 'color' && isLinearColor);
  }

  _isWebsymbolById(id){
    const a = ['line-', 'polygon-', 'point-'];
    return a.some((el) => id && id.startsWith(el));
  }

  /**
   * 获取icon-image 的sdf状态
   * 目前webSymbol为false， 基本符号为true， 雪碧图从json中获取sdf的状态
   * @param id
   * @param spriteJson
   * @returns {boolean} sdf状态
   */
  _getSymbolSDFStatus(id, spriteJson) {
    if (this._isWebsymbolById(id)) {
      return false;
    }
    if (this._getIconById(id)) {
      return true;
    }
    return spriteJson[id] && spriteJson[id].sdf || false;
  }

  _isAllPicturePoint(symbolsContent, spriteJson) {
      if (symbolsContent.type === 'simple') {
        return !this._getSymbolSDFStatus(symbolsContent.value.symbolId, spriteJson);
      } else {
          return [...symbolsContent.values, { value: symbolsContent.defaultValue }]
              .filter((v) => v.value.symbolId)
              .every((v) => {
                  return !this._getSymbolSDFStatus(v.value.symbolId, spriteJson);
              });
      }
  }

  _isAllPictureSymbolSaved(symbolType, symbolsContent, spriteJson) {
    if (!symbolsContent) {
      return false;
    }
    if (symbolType === 'point') {
      return this._isAllPicturePoint(symbolsContent, spriteJson);
    }
    const currentType = symbolsContent.type;
    if (currentType === 'simple') {
      return !!this._getImageIdFromValue(symbolsContent.value.style, SymbolType[symbolType]).length;
    }
    const styles = symbolsContent.values.map((v) => v.value).concat(symbolsContent.defaultValue);
    return styles.every((v) => {
      return !!this._getImageIdFromValue(v.style, SymbolType[symbolType]).length;
    });
  }

  _getDataDrivenStyleKeys(legendType, keys, styleSetting) {
    const DataDrivenStyleKeyObj = {
        [LEGEND_RENDER_TYPE.TEXT]: LegendTextDataDrivenStyleKey
    };
    const porpertyKeys = DataDrivenStyleKeyObj[legendType] || keys;
    const dataKeys = porpertyKeys.filter(
        (k) => styleSetting[k] && styleSetting[k].type !== 'simple'
    );
    return dataKeys;
  }

  _createLayerLegendList(layer, styleSetting) {
    const layerId = layer.id;
    const layerTitle = layer.title;
    const commonStyleOptions = {
      themeField: layer.themeField || styleSetting.field,
      layerId,
      layerTitle
    };
    const renderType = styleSetting.type || layer.type;
    const legendRenderType = this._getLegendRenderType(renderType);
    const shape = this._getLegendShape(renderType, styleSetting);
    if (['heat', 'heat3D'].includes(renderType)) {
      const colorKeyMap = {
        heat: 'heatmap-color',
        heat3D: 'heatmap-extrusion-color'
      };
      const colors = this._heatColorToGradient((layer.paint || {})[colorKeyMap[renderType]]);
      return [
        {
          ...commonStyleOptions,
          styleGroup: [
            {
              style: {
                type: LEGEND_STYLE_TYPES.STYLE,
                shape,
                colors
              }
            }
          ]
        }
      ];
    }
    const styleKeys = LEGEND_STYLE_KEYS[legendRenderType];
    if (!styleKeys) {
      return;
    }
    const keys = this._transStyleKeys(renderType, styleKeys);
    this._transStyleSetting(renderType, styleSetting);
    const simpleStyle = this._getLegendSimpleStyle(styleSetting, keys);
    const simpleResData = this._parseLegendtyle({ legendRenderType, customValue: simpleStyle });
    let dataKeys = this._getDataDrivenStyleKeys(legendRenderType, keys, styleSetting);
    // 3D线,动画线
    if (legendRenderType === LEGEND_RENDER_TYPE.ANIMATELINE) {
      // isReplaceLineColor: 3D线,动画线:使用符号替换线颜色，图例中将不再显示线颜色
      const isReplaceLineColor = styleSetting.textureBlend.value === 'replace';
      const hasTexture = !!(styleSetting.symbolsContent.value && styleSetting.symbolsContent.value.symbolId);
      if (isReplaceLineColor && hasTexture) {
        dataKeys = dataKeys.filter((key) => key !== 'color')
      }
    } else {
      // 其他
      // isAllPic: 如果符号为图片，图例中将不再显示颜色
      const symbolTypes = MAP_LAYER_TYPE_2_SYMBOL_TYPE[layer.type];
      const isAllPic = this._isAllPictureSymbolSaved(symbolTypes, styleSetting.symbolsContent, this._spriteDatas);
      if(isAllPic) {
        dataKeys = dataKeys.filter((key) => key !== 'color')
      }
    }
    const isLinearColor = styleSetting.color && styleSetting.color.interpolateInfo && styleSetting.color.interpolateInfo.type === 'linear';
    const isShowSingleItem = this._isShowLegendSingleItem(dataKeys, isLinearColor);
    const resultList = [];
    if (isShowSingleItem) {
      resultList.push({
        ...commonStyleOptions,
        styleGroup: [
          {
            fieldValue: layerTitle || layerId,
            style: {
              ...simpleResData,
              shape
            }
          }
        ]
      });
    }
    return resultList.concat(
      dataKeys.map((styleField) => {
        const subStyleSetting = styleSetting[styleField];
        const defaultSetting = this._getSettingStyle(styleField, subStyleSetting.defaultValue, simpleStyle);
        let styleGroup = [];
        const custom = this._getSettingCustom(subStyleSetting);
        const interpolateInfo = this._getSettingInterpolateInfo(subStyleSetting);
        const params = {
          legendRenderType,
          styleField,
          subStyleSetting,
          simpleStyle,
          defaultSetting,
          custom,
          interpolateInfo,
          shape
        };
        switch (this._getLegendStyleType({ styleField, currentType: subStyleSetting.type, custom, interpolateInfo })) {
          case LegendType.LINEAR:
            styleGroup = this._parseLinearStyle(params);
            break;
          case LegendType.RANGE:
            styleGroup = this._parseRangeStyle(params);
            break;
          case LegendType.UNIQUE:
            styleGroup = this._parseUniqueStyle(params);
            break;
        }
        const legendItem = {
          ...commonStyleOptions,
          themeField: (subStyleSetting.field || [])[0],
          styleField: styleField,
          styleGroup
        };
        return legendItem;
      })
    );
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

  _getSettingCustom(setting) {
    const { value, values } = setting;
    return this._isLinear(setting) ? value : values;
  }

  _getSettingInterpolateInfo(setting) {
    const { interpolateInfo = {} } = setting;
    return this._isLinear(setting) ? { type: 'linear' } : interpolateInfo;
  }

  _isLinear(subStyleSetting) {
    return subStyleSetting.type === 'linear';
  }

  _getLegendStyleType({ styleField, currentType, custom, interpolateInfo }) {
    if (['unique', 'linear'].includes(currentType)) {
      if (this._isColorAttr(styleField) && interpolateInfo.type === 'linear' && custom.length > 1) {
        return LegendType.LINEAR;
      }
      return LegendType.UNIQUE;
    }
    return LegendType.RANGE;
  }

  _isColorAttr(key) {
    return ['color', 'textColor', 'outlineColor', 'textHaloColor'].includes(key);
  }

  _parseLinearStyle({ shape, custom }) {
    const styleGroup = [
      {
        styleField: null,
        style: {
          type: LEGEND_STYLE_TYPES.STYLE,
          shape,
          colors: custom
        }
      }
    ];
    return styleGroup;
  }

  _parseUniqueStyle({ legendRenderType, styleField, simpleStyle, defaultSetting, custom, interpolateInfo, shape }) {
    const styleGroup = custom.map((c) => {
      const itemStyle = this._getSettingStyle(styleField, c.value, simpleStyle);
      const resData = this._parseLegendtyle({ legendRenderType, customValue: itemStyle });
      return {
        fieldValue: c.key,
        style: {
          ...resData,
          shape
        }
      };
    });
    if (!interpolateInfo.type || interpolateInfo.type === 'custom') {
      const resData = this._parseLegendtyle({ legendRenderType, customValue: defaultSetting });
      styleGroup.push({
        fieldValue: null,
        style: {
          ...resData,
          shape
        }
      });
    }
    return styleGroup;
  }

  _parseRangeStyle({ legendRenderType, styleField, simpleStyle, defaultSetting, custom, shape }) {
    const styleGroup = custom.map((c) => {
      const itemStyle = this._getSettingStyle(styleField, c.value, simpleStyle);
      const resData = this._parseLegendtyle({ legendRenderType, customValue: itemStyle });
      return {
        start: c.start,
        end: c.end,
        style: {
          ...resData,
          shape
        }
      };
    });
    const resData = this._parseLegendtyle({ legendRenderType, customValue: defaultSetting });
    styleGroup.push({
      start: null,
      end: null,
      style: {
        ...resData,
        shape
      }
    });
    return styleGroup;
  }

  _getSettingStyle(styleField, value, simpleStyle) {
    const itemStyle = Object.assign({}, simpleStyle);
    itemStyle[styleField] = value;
    return itemStyle;
  }

  _parseLegendtyle({ legendRenderType, customValue }) {
    const cssStyle = { ...LEGEND_CSS_DEFAULT[legendRenderType] };
    // 线不使用cssStyle，所以不需要重新赋值
    Object.keys(cssStyle).forEach((k) => {
      const updateValue = customValue[LEGEND_CSS_STATE_KEY[k] || k];
      // 除了面其他参数都是必要参数
      if (![LEGEND_RENDER_TYPE.FILL, LEGEND_RENDER_TYPE.FILLEXTRUSION].includes(legendRenderType) && !updateValue) {
        return;
      }
      cssStyle[k] = updateValue;
    });
    let { symbolId = LEGEND_SYMBOL_DEFAULT[legendRenderType], style } = customValue.symbolsContent || {};
    switch (legendRenderType) {
      case LEGEND_RENDER_TYPE.TEXT: {
        return {
          type: LEGEND_STYLE_TYPES.STYLE,
          icon: 'supermapol-icons-text-layer',
          ...cssStyle
        }
      }
      case LEGEND_RENDER_TYPE.POINT: {
        const icon = this._getIconById(symbolId);
        const iconType = icon ? 'BASE' : 'SERVICE';
        if (iconType === 'BASE') {
          return {
            type: LEGEND_STYLE_TYPES.STYLE,
            ...cssStyle
          };
        }
        return this._getSpriteStyle(symbolId, cssStyle);
      }
      case LEGEND_RENDER_TYPE.BUILTINSYMBOL: {
        return {
          type: LEGEND_STYLE_TYPES.STYLE,
          ...cssStyle
        };
      }
      case LEGEND_RENDER_TYPE.ANIMATEPOINT:
      case LEGEND_RENDER_TYPE.RADARPOINT: {
        return {
          type: LEGEND_STYLE_TYPES.STYLE,
          ...cssStyle
        };
      }
      case LEGEND_RENDER_TYPE.LINE:
      case LEGEND_RENDER_TYPE.ANIMATELINE: {
        style = style || [];
        const nextCustomValue = Object.assign({}, customValue);
        delete nextCustomValue.symbolsContent;
        const commonInfo = {
          type: LEGEND_STYLE_TYPES.STYLE,
          ...nextCustomValue,
          width: LEGEND_LINE_WIDTH
        };
        const defaultStyle = { ...LEGEND_CSS_DEFAULT['LINE'] };
        const symbolStyles = style instanceof Array ? style : [style];
        const hasImageLine = symbolStyles.some((v) => !!this._getImageIdByLegendType(v, legendRenderType));
        // 图片线符号都是单图层(动画线符号的symbol也只有一个)
        const imageLineSymbol = symbolStyles[0];
        if (hasImageLine) {
          const imageId = this._getImageIdByLegendType(imageLineSymbol, legendRenderType);
          const styleOptions = { ...cssStyle, ...nextCustomValue, height: cssStyle.width, width: LEGEND_LINE_WIDTH };
          if (legendRenderType === LEGEND_RENDER_TYPE.ANIMATELINE && nextCustomValue.textureBlend === 'replace') {
            styleOptions.backgroundColor = 'transparent';
          }
          return this._getSpriteStyle(imageId, styleOptions);
        }
        if (!customValue.symbolsContent || (legendRenderType === LEGEND_RENDER_TYPE.ANIMATELINE && !hasImageLine)) {
          return {
            ...commonInfo,
            height: customValue.width || defaultStyle.height,
            lineWidth: customValue.width || defaultStyle.width,
            color: customValue.color || defaultStyle.backgroundColor
          };
        }
        if (customValue.symbolsContent) {
          const oldWidth = this._getLineWidth(symbolStyles);
          const lineStyles = symbolStyles.map((l) =>
            this._transformLineStyle({ oldWidth, symbol: l, defaultStyle, customValue })
          );
          return {
            ...commonInfo,
            lineStyles
          };
        }
        return;
      }
      case LEGEND_RENDER_TYPE.FILL:
      case LEGEND_RENDER_TYPE.FILLEXTRUSION: {
        const backgroundColor = cssStyle.backgroundColor;
        const paint = (style || {}).paint || {};
        const color = paint['fill-color'];
        const defaultStyle = { ...LEGEND_CSS_DEFAULT['FILL'] };
        if (!backgroundColor) {
          Object.assign(cssStyle, { backgroundColor: color });
        }
        // 缺少的必要参数使用默认值
        Object.keys(cssStyle).forEach((key) => {
          if (['backgroundColor', 'width', 'height', 'opacity'].includes(key) && !cssStyle[key]) {
            cssStyle[key] = defaultStyle[key];
          }
        });
        if (cssStyle.outlineColor) {
          Object.assign(cssStyle, { outline: defaultStyle.outline, marginLeft: '1px' });
        }
        if (this._spriteDatas[symbolId]) {
          return this._getSpriteStyle(symbolId, { ...cssStyle, backgroundColor: 'transparent' });
        }
        return {
          type: LEGEND_STYLE_TYPES.STYLE,
          ...cssStyle
        };
      }
    }
  }

  _getIconById(id, type = 'svg') {
    if (type === 'image') {
      return undefined;
    }
    const BaseIcons = [{ id: 'circle', name: 'circle' }];
    return BaseIcons.find((icon) => icon.id === id);
  }

  _getImageIdFromValue(style, type){
    const imageKeys = {
        symbol: 'icon-image',
        line: 'line-pattern',
        fill: 'fill-pattern',
        'fill-extrusion': 'fill-pattern'
    };
    const styles = Array.isArray(style) ? style : [style];
    const imageKey = imageKeys[type];
    if (type === 'symbol') {
        const imageIds = styles.map((item) => item.layout && item.layout[imageKey]);
        return imageIds.filter((id) => id);
    }
    // 'line' 'fill'  'fill-extrusion'
    const imageIds = styles.map((item) => item.paint && item.paint[imageKey]);
    return imageIds.filter((id) => id);
}

  _getImageIdByLegendType(symbol, legendType) {
    const symbolTypes = {
      ANIMATELINE: SymbolType.point,
      LINE: SymbolType.line
    };
    const symbolType = symbolTypes[legendType];
    const paint = symbol.paint || {};
    if (symbolType === SymbolType.line) {
      return paint['line-pattern'];
    }
    if (symbolType === SymbolType.polygon) {
      return paint['fill-pattern'];
    }
    const layout = symbol.layout || {};
    return layout['icon-image'];
  }

  _getSpriteStyle(symbolId, cssStyle) {
    if (!this._spriteDatas[symbolId]) {
      return;
    }
    const sprite = this._spriteDatas[symbolId];
    if (!sprite.width || !sprite.height) {
      return;
    }
    return {
      type: LEGEND_STYLE_TYPES.IMAGE,
      sprite,
      ...cssStyle,
      url: typeof this._sprite === 'string' ? `${this._sprite}.png` : ''
    };
  }

  _transformLineStyle({ oldWidth, symbol, defaultStyle, customValue }) {
    const { paint = {} } = symbol;
    let newSymbol;
    if (customValue.height !== undefined) {
      newSymbol = this._updateSingleStyleByWidth(oldWidth, customValue.height, symbol);
    }
    return {
      lineWidth: ((newSymbol || {}).paint || {})[LINE_WIDTH_KEY] || paint[LINE_WIDTH_KEY] || defaultStyle.height,
      opacity: customValue.opacity || paint['line-opacity'] || defaultStyle.opacity,
      color: customValue.color || paint['line-color'] || defaultStyle.backgroundColor,
      lineDash: paint['line-dasharray'] || [],
      lineOffset: paint['line-offset'] || 0
    };
  }

  _updateSingleStyleByWidth(oldWidth, newWidth, style) {
    if (oldWidth === newWidth) {
      return style;
    }

    let newPaint = {};
    const paint = (style || {}).paint || {};
    if (oldWidth === 0) {
      // 从0变成数值
      newPaint = Object.assign({}, paint, {
        'line-width': Number(newWidth.toFixed(2))
      });
      return {
        paint: newPaint
      };
    }
    const percent = newWidth / oldWidth;
    const width = paint['line-width'],
      offset = paint['line-offset'] || 0,
      dasharray = paint['line-dasharray'] || [];
    const newDasharray = this._updateDash(dasharray, percent);

    newPaint = Object.assign({}, paint, {
      'line-width': Number((width * percent).toFixed(2)),
      'line-offset': Number((offset * percent).toFixed(2)),
      'line-dasharray': newDasharray && newDasharray.map((v) => Number(v.toFixed(2)))
    });
    return {
      paint: newPaint
    };
  }

  // 根据比例，更新line-dash
  _updateDash(oldDash, percent) {
    if (!oldDash || oldDash.length === 0) {
      return;
    }
    const result = oldDash.map((v) => {
      return v / percent;
    });
    return result;
  }

  /**
   * 获取线宽
   * @param symbolStyle
   * @returns {number} 多线返回整体线宽，单线返回线宽
   */
  _getLineWidth(symbolStyle) {
    if (symbolStyle instanceof Array) {
      return this._getWholeWidth(symbolStyle);
    }
    return (symbolStyle.paint || {})[LINE_WIDTH_KEY] || 0;
  }

  /**
   * 计算多线符号的整体线宽
   * @param styles
   * @returns {number} 整体线宽
   */
  _getWholeWidth(styles) {
    let topBoundary;
    let bottomBoundary;
    styles.forEach((el) => {
      const paint = (el || {}).paint || {};
      const width = paint['line-width'];
      const offset = paint['line-offset'] || 0;
      const top = offset + width / 2;
      const bottom = offset - width / 2;
      (top > topBoundary || topBoundary === undefined) && (topBoundary = top);
      (bottom < bottomBoundary || bottomBoundary === undefined) && (bottomBoundary = bottom);
    });
    return Number((topBoundary - bottomBoundary).toFixed(2));
  }

  _handleUnSupportedLayers(mapInfo) {
    const filterLayerIds = [];
    const unSupportedMsg = 'layer are not supported yet';
    const { interaction } = mapInfo;
    if (interaction && interaction.drill) {
      this.fire('getlayersfailed', { error: `drill ${unSupportedMsg}` });
      interaction.drill.forEach((drillItem) => {
        filterLayerIds.push(...drillItem.layerIds);
      });
    }
    return filterLayerIds;
  }
  } 
}
