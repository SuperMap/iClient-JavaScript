/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { Util } from '../../../core/Util';

const LayerType = {
  POINT: 'POINT',
  LINE: 'LINE',
  FILL: 'FILL',
  FILLEXTRUSION: 'FILLEXTRUSION'
};

const LEGEND_CSS_STATE_KEY = {
  fontSize: 'size',
  backgroundColor: 'color'
};

const LEGEND_CSS_DEFAULT = {
  [LayerType.POINT]: {
    fontSize: '8px',
    color: '#FFFFFF',
    opacity: 1
  },
  [LayerType.LINE]: {
    width: 20,
    height: 8,
    backgroundColor: '#FFFFFF',
    opacity: 1
  },
  [LayerType.FILL]: {
    width: '20px',
    height: '20px',
    opacity: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: '1px',
    outline: '1px solid transparent',
    outlineColor: '#FFFFFF'
  },
  [LayerType.FILLEXTRUSION]: {
    width: '20px',
    height: '20px',
    opacity: 1,
    backgroundColor: '#FFFFFF'
  }
};

const LAEYR_TYPE_LEGEND_TYPE = {
  circle: LayerType.POINT,
  symbol: LayerType.POINT,
  line: LayerType.LINE,
  fill: LayerType.FILL,
  ['fill-extrusion']: LayerType.FILLEXTRUSION
};

const LEGEND_STYLE_KEYS = {
  [LayerType.POINT]: ['symbolsContent', 'size', 'color', 'opacity'],
  [LayerType.LINE]: ['width', 'color', 'opacity', 'lineDasharray', 'symbolsContent'],
  [LayerType.FILL]: ['color', 'opacity', 'antialias', 'outlineColor', 'symbolsContent'],
  [LayerType.FILLEXTRUSION]: ['color', 'opacity', 'symbolsContent']
};

const LEGEND_SYMBOL_DEFAULT = {
  [LayerType.POINT]: 'circle',
  [LayerType.FILL]: 'polygon-0',
  [LayerType.FILLEXTRUSION]: 'polygon-0'
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

const LEGEND_LINE_WIDTH = 100;
const LINE_WIDTH_KEY = 'line-width';

export const LEGEND_STYLE_TYPES = {
  IMAGE: 'image',
  STYLE: 'style'
};

export class WebMap extends mapboxgl.Evented {
  constructor(mapId, options, mapOptions = {}) {
    super();
    this.mapId = mapId;
    this.options = options;
    this.mapOptions = {
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      bearing: mapOptions.bearing,
      pitch: mapOptions.pitch
    };
    this._legendList = [];
    this._mapResourceInfo = {};
    this._sprite = '';
    this._spriteDatas = {};
    this._appreciableLayers = [];
    this._layerCatalogs = [];
  }

  /**
   * @function WebMap.prototype.initializeMap
   * @description 登陆窗口后添加地图图层。
   * @param {Object} mapInfo - map 信息。
   * @param {Object} map - map 实例。
   */
  initializeMap(mapInfo, map) {
    this._mapInfo = mapInfo;
    if (map) {
      this.map = map;
      this._initLayers();
      return;
    }
    this._createMap();
  }

  /**
   * @function WebMap.prototype.getLayers
   * @description 获取可感知图层列表。
   */
  getLayers() {
    return this._appreciableLayers || [];
  }

  /**
   * @private
   * @function WebMap.prototype._createMap
   * @description 创建地图。
   */
  _createMap() {
    let {
      name = '',
      crs,
      center = new mapboxgl.LngLat(0, 0),
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
      container: this.options.target,
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
    this._sprite = sprite;
    this.fire('mapinitialized', { map: this.map });
    this.map.on('load', () => {
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
    const mapResourceUrl = Util.transformUrl(
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
  _addLayersToMap() {
    const { sources, layers, layerIdMapList, layerCataLog } = this._setUniqueId(this._mapInfo);
    this._layerCatalogs.push(...layerCataLog)
    layers.forEach((layer) => {
      layer.source && !this.map.getSource(layer.source) && this.map.addSource(layer.source, sources[layer.source]);
      this.map.addLayer(layer);
    });
    const appreciableLayers = this._generateLayers(layerIdMapList);
    this._appreciableLayers.push(...appreciableLayers);
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
      layersToMap = layersToMap.map((layer) => {
        let nextLayer = layer;
        if (layer.source === sourceId) {
          let layerId = layer.id;
          if (this.map.getLayer(layerId)) {
            layerId = timestamp ? layer.id + timestamp : `${layer.id}_${+new Date()}`;
          }
          nextLayer = Object.assign({}, layer, { id: layerId, source: nextSourceId });
        }
        layerIdToChange[layer.id] = [nextLayer.id, nextLayer.source];
        return nextLayer;
      });
    }
    const layerCataLog = JSON.parse(JSON.stringify(mapInfo.metadata.layerCatalog));
    this._updateLayerCatalogsId(layerCataLog, layerIdToChange);
    return {
      sources: nextSources,
      layers: layersToMap,
      layerIdMapList: layerIdToChange,
      layerCataLog
    };
  }

  _updateLayerCatalogsId(catalogs, layerIdMapList) {
    catalogs.forEach((catalog) => {
      const { id, children } = catalog;
      if (catalog.type === 'group') {
        this._updateLayerCatalogsId(children, layerIdMapList);
        return;
      }
      catalog.originId = id;
      catalog.id = layerIdMapList[id][0];
    });
  }

  /**
   * @private
   * @function WebMap.prototype._sendMapToUser
   * @description emit 图层加载成功事件。
   */
  _sendMapToUser() {
    this.fire('addlayerssucceeded', { map: this.map, mapparams: this.mapParams, layers: this._appreciableLayers });
  }

  _getLayerInfosFromCatalogs(catalogs) {
    const results = [];
    for (let i = 0; i < catalogs.length; i++) {
      const { catalogType, children, visible } = catalogs[i];
      if (catalogType === 'layer' && visible) {
        results.push(catalogs[i]);
      }
      if (catalogType === 'group' && children && children.length > 0) {
        const result = this._getLayerInfosFromCatalogs(children);
        results.push(...result);
      }
    }
    return results;
  }

  getLegendInfo() {
    return this._legendList;
  }

  clean() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this._legendList = [];
      this._mapResourceInfo = {};
      this._sprite = '';
      this._spriteDatas = {};
      this.mapOptions = {};
      this.options = {};
      this._appreciableLayers = [];
      this._layerCatalogs = [];
    }
  }

  /**
   * @private
   * @function WebMap.prototype._generateV2LayersStructure
   * @description emit 图层加载成功事件。
   * @param {Array<Object>} layerIdRenameMapList - 图层信息。
   */
  _generateLayers(layerIdRenameMapList) {
    const { catalogs = [] } = this._mapResourceInfo;
    const originLayers = this._getLayerInfosFromCatalogs(catalogs);
    const layers = originLayers.map((layer) => {
      const { title, visualization, visible, layersContent } = layer;
      const [realLayerId, realSourceId] = layerIdRenameMapList[layer.id];
      const layerFromMapInfo = this._mapInfo.layers.find((item) => {
        return item.id === layer.id;
      });
      this._createLegendInfo(Object.assign({}, layerFromMapInfo, { title: layer.title, id: realLayerId }), visualization);
      let dataType = '';
      let dataId = '';
      for (const data of this._mapResourceInfo.datas) {
        const matchData = data.datasets.find((dataset) => dataset.msDatasetId === layer.msDatasetId);
        if (matchData) {
          dataType = data.sourceType;
          dataId = matchData.datasetId;
          break;
        }
      }
      const overlayLayers = this._formatLayer({
        dataSource: {
          serverId: dataId,
          type: dataType
        },
        id: realLayerId,
        type: layerFromMapInfo.type,
        title,
        visible,
        renderSource: {
          id: realSourceId,
          type: layerFromMapInfo.type === 'raster' ? 'raster' : 'vector',
          sourceLayer: layerFromMapInfo['source-layer']
        },
        renderLayers: this._getRenderLayers(layersContent, realLayerId)
      });
      const styleSettings = this._parseRendererStyleData(visualization.renderer);
      const defaultStyleSetting = styleSettings[0];
      if (defaultStyleSetting) {
        let themeField = '';
        if (defaultStyleSetting.type === 'heat') {
          themeField = defaultStyleSetting.field;
        } else if (defaultStyleSetting.color) {
          themeField = defaultStyleSetting.color.field;
        }
        if (themeField) {
          overlayLayers.themeSetting = {
            themeField
          };
        }
      }
      return overlayLayers;
    });
    const baseLayer = this._getBaseLayer(layers);
    return baseLayer ? [baseLayer].concat(layers) : layers;
  }

  getLayerCatalog() {
    const formatLayerCatalog = this._createFormatCatalogs(this._layerCatalogs);
    const baseLayer = this._getBaseLayer(formatLayerCatalog);
    return baseLayer ? [baseLayer].concat(formatLayerCatalog) : formatLayerCatalog;
  }

  _createFormatCatalogs(catalogs) {
    const formatCatalogs = catalogs.map((catalog) => {
      let formatItem;
      const { id, title, type, visible, children, parts } = catalog;
      if (catalog.type === 'group') {
        formatItem = {
          children: this._createFormatCatalogs(children),
          id,
          title,
          type,
          visible
        };
      } else {
        const matchLayer = this._appreciableLayers.find((layer) => layer.id === id);
        formatItem = this._formatLayer({
          dataSource: matchLayer.dataSource,
          id,
          type: matchLayer.type,
          title,
          visible,
          renderSource: matchLayer.renderSource,
          renderLayers: this._getRenderLayers(parts, id),
          themeSetting: matchLayer.themeSetting
        });
      }
      return formatItem;
    });
    return formatCatalogs;
  }

  _getRenderLayers(layerIds, layerId) {
    if (layerIds) {
      if (layerIds.includes(layerId)) {
        return layerIds;
      } else {
        return [layerId, ...layerIds];
      }
    } else {
      return [layerId];
    }
  }

  _getBaseLayer(layers) {
    const baseLayer = this._mapInfo.layers[0];
    const { id, type } = baseLayer;
    const baseLayerInfo = this.map.getLayer(id);
    const ids = layers.map((layer) => layer.id);
    if (!ids.includes(id)) {
      const formatBaseLayer = this._formatLayer({
        dataSource: {},
        id,
        title: id,
        type,
        visible: true,
        renderSource: {
          id: baseLayerInfo.source,
          type: baseLayerInfo.type === 'raster' ? 'raster' : 'vector',
          sourceLayer: baseLayerInfo['source-layer']
        },
        renderLayers: [id],
        themeSetting: {}
      });
      return formatBaseLayer;
    }
    return null;
  }

  _formatLayer(option) {
    const {
      dataSource = {},
      id,
      title,
      type,
      visible = true,
      renderSource = {},
      renderLayers = [],
      themeSetting = {}
    } = option;
    return {
      dataSource,
      id,
      title,
      type,
      visible,
      renderSource,
      renderLayers,
      themeSetting
    };
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
    const fonts = [];
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

  _createLegendInfo(layer, visualization) {
    const styleSettings = this._parseRendererStyleData(visualization.renderer);
    const layerLegends = styleSettings.reduce((legends, styleSetting) => {
      const legendItems = this._createLayerLegendList(layer, styleSetting);
      legendItems && legends.push(...legendItems);
      return legends;
    }, []);
    this._legendList.push(...layerLegends);
  }

  _getLegendSimpleStyle(layerType, styleSetting) {
    const simpleStyle = {};
    const legendType = LAEYR_TYPE_LEGEND_TYPE[layerType];
    const keys = LEGEND_STYLE_KEYS[legendType];
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

  _createLayerLegendList(layer, styleSetting) {
    const layerType = layer.type;
    const layerId = layer.id;
    const layerTitle = layer.title;
    const layerType2LegendType = LAEYR_TYPE_LEGEND_TYPE[layerType];
    if (styleSetting.type === 'heat') {
      const colors = this._heatColorToGradient((layer.paint || {})['heatmap-color']);
      if (colors.length > 0) {
        return [
          {
            themeField: styleSetting.field,
            styleGroup: [
              {
                style: {
                  type: LEGEND_STYLE_TYPES.STYLE,
                  shape: layerType2LegendType,
                  colors
                }
              }
            ],
            layerId,
            layerTitle
          }
        ];
      }
      return;
    }
    const keys = LEGEND_STYLE_KEYS[layerType2LegendType];
    if (!keys) {
      return;
    }
    const simpleStyle = this._getLegendSimpleStyle(layerType, styleSetting);
    const simpleResData = this._parseLegendtyle({ layerType2LegendType, customValue: simpleStyle });
    const dataKeys = keys.filter((k) => styleSetting[k] && styleSetting[k].type !== 'simple');
    if (!dataKeys.length) {
      return [
        {
          styleGroup: [
            {
              fieldValue: layerTitle || layerId,
              style: {
                ...simpleResData,
                shape: layerType2LegendType
              }
            }
          ],
          layerId,
          layerTitle
        }
      ];
    }
    return dataKeys.map((styleField) => {
      const subStyleSetting = styleSetting[styleField];
      const defaultSetting = this._getSettingStyle(styleField, subStyleSetting.defaultValue, simpleStyle);
      let styleGroup = [];
      const custom = this._getSettingCustom(subStyleSetting);
      const interpolateInfo = this._getSettingInterpolateInfo(subStyleSetting);
      const params = { layerType2LegendType, styleField, subStyleSetting, simpleStyle, defaultSetting, custom, interpolateInfo };
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
        themeField: (subStyleSetting.field || [])[0],
        styleField: styleField,
        styleGroup,
        layerId,
        layerTitle
      };
      return legendItem;
    });
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
    return this._isLinear(setting) ? { type: 'linear' }  : interpolateInfo;
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

  _parseLinearStyle({ layerType2LegendType, custom }) {
    const styleGroup = [
      {
        styleField: null,
        style: {
          type: LEGEND_STYLE_TYPES.STYLE,
          shape: layerType2LegendType,
          colors: custom
        }
      }
    ];
    return styleGroup;
  }

  _parseUniqueStyle({ layerType2LegendType, styleField, simpleStyle, defaultSetting, custom, interpolateInfo }) {
    const styleGroup = custom.map((c) => {
      const itemStyle = this._getSettingStyle(styleField, c.value, simpleStyle);
      const resData = this._parseLegendtyle({ layerType2LegendType, customValue: itemStyle });
      return {
        fieldValue: c.key,
        style: {
          ...resData,
          shape: layerType2LegendType
        }
      };
    });
    if (!interpolateInfo.type || interpolateInfo.type === 'custom') {
      const resData = this._parseLegendtyle({ layerType2LegendType, customValue: defaultSetting });
      styleGroup.push({
        fieldValue: null,
        style: {
          ...resData,
          shape: layerType2LegendType
        }
      });
    }
    return styleGroup;
  }

  _parseRangeStyle({ layerType2LegendType, styleField, simpleStyle, defaultSetting, custom }) {
    const styleGroup = custom.map((c) => {
      const itemStyle = this._getSettingStyle(styleField, c.value, simpleStyle);
      const resData = this._parseLegendtyle({ layerType2LegendType, customValue: itemStyle });
      return {
        start: c.start,
        end: c.end,
        style: {
          ...resData,
          shape: layerType2LegendType
        }
      };
    });
    const resData = this._parseLegendtyle({ layerType2LegendType, customValue: defaultSetting });
    styleGroup.push({
      start: null,
      end: null,
      style: {
        ...resData,
        shape: layerType2LegendType
      }
    });
    return styleGroup;
  }

  _getSettingStyle(styleField, value, simpleStyle) {
    const itemStyle = Object.assign({}, simpleStyle);
    itemStyle[styleField] = value;
    return itemStyle;
  }

  _parseLegendtyle({ layerType2LegendType, customValue }) {
    const cssStyle = { ...LEGEND_CSS_DEFAULT[layerType2LegendType] };
    if (layerType2LegendType !== LayerType.LINE) {
      Object.keys(cssStyle).forEach((k) => {
        const updateValue = customValue[LEGEND_CSS_STATE_KEY[k] || k];
        // 除了面其他参数都是必要参数
        if (![LayerType.FILL, LayerType.FILLEXTRUSION].includes(layerType2LegendType) && !updateValue) {
          return;
        }
        cssStyle[k] = updateValue;
      });
    }
    let { symbolId = LEGEND_SYMBOL_DEFAULT[layerType2LegendType], style } = customValue.symbolsContent || {};
    switch (layerType2LegendType) {
      case LayerType.POINT: {
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
      case LayerType.LINE: {
        style = style || [];
        const defaultStyle = { ...LEGEND_CSS_DEFAULT['LINE'] };
        const symbolStyles = style instanceof Array ? style : [style];
        const hasImageLine = symbolStyles.some((v) => !!this._getImageIdBySymbol(v, SymbolType.line));
        if (hasImageLine) {
          const imageId = this._getImageIdBySymbol(symbolStyles[0], SymbolType.line);
          return this._getSpriteStyle(imageId, cssStyle);
        }
        const subStyle = !customValue.symbolsContent
          ? {
              height: customValue.width || defaultStyle.height,
              lineWidth: customValue.width || defaultStyle.width,
              color: customValue.color || defaultStyle.backgroundColor
            }
          : {};
        const nextCustomValue = Object.assign({}, customValue);
        delete nextCustomValue.symbolsContent;
        let lineStyles;
        if (customValue.symbolsContent) {
          const oldWidth = this._getLineWidth(symbolStyles);
          lineStyles = symbolStyles.map((l) =>
            this._transformLineStyle({ oldWidth, symbol: l, defaultStyle, customValue })
          );
        }
        return {
          type: LEGEND_STYLE_TYPES.STYLE,
          ...customValue,
          ...subStyle,
          lineStyles,
          width: LEGEND_LINE_WIDTH
        };
      }
      case LayerType.FILL:
      case LayerType.FILLEXTRUSION: {
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
          return this._getSpriteStyle(symbolId, cssStyle);
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

  _getImageIdBySymbol(symbol, symbolType) {
    const paint = symbol.paint || {};
    if (symbolType === SymbolType.line) {
      return paint['line-pattern'];
    }
    if (symbolType === SymbolType.polygon) {
      return paint['fill-pattern'];
    }
    return paint['icon-image'];
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
}