import Canvg from 'canvg';
import { coordEach } from '@turf/meta';
import difference from 'lodash.difference';
import { WebMapService } from './WebMapService';
import { getEpsgCodeInfo, getProjection, registerProjection } from './utils/epsg-define';
import { ArrayStatistic } from '../util/ArrayStatistic';
import { ColorsPickerUtil } from '../util/ColorsPickerUtil';
import { Util } from '../commontypes/Util';
import { StringExt } from '../commontypes/BaseTypes';
import { createLinesData } from './utils/util';
import { Events } from '../commontypes';

// 迁徙图最大支持要素数量
const MAX_MIGRATION_ANIMATION_COUNT = 1000;

export function createWebMapBaseExtending(SuperClass = Events, fireField = 'triggerEvent') {
  return class WebMapBase extends SuperClass {
    constructor(id, options, mapOptions) {
      super();
      this.serverUrl = options.serverUrl || 'https://www.supermapol.com';
      this.accessToken = options.accessToken;
      this.accessKey = options.accessKey;
      this.tiandituKey = options.tiandituKey || '';
      this.googleMapsAPIKey = options.googleMapsAPIKey || '';
      this.bingMapsKey = options.bingMapsKey || '';
      this.googleMapsLanguage = options.googleMapsLanguage || 'zh-CN';
      this.withCredentials = options.withCredentials || false;
      this.proxy = options.proxy;
      this.target = options.target || 'map';
      this.excludePortalProxyUrl = options.excludePortalProxyUrl;
      this.isSuperMapOnline = options.isSuperMapOnline;
      this.ignoreBaseProjection = options.ignoreBaseProjection;
      this.specifiedProj4 = options.proj4;
      this.echartslayer = [];
      this.canvgsV = [];
      this.webMapService = new WebMapService(id, options);
      this.mapOptions = mapOptions;
      this.eventTypes = [
        'getmapinfofailed',
        'getlayerdatasourcefailed'
      ];
      this.mapId = id;
    }
  
    _initWebMap() {  
      throw new Error('_initWebMap is not implemented');  
    }
  
    _getMapInfo() {  
      throw new Error('_getMapInfo is not implemented');  
    }
  
    _createMap() {  
      throw new Error('_createMap is not implemented');  
    }
  
    // 重构子类 webmap layer 添加逻辑，只重写具体添加某个layer的方法，基类实现 initxxxx
    _initBaseLayer() {  
      throw new Error('_initBaseLayer is not implemented');  
    }
  
    // 重构子类 webmap layer 添加逻辑，只重写具体添加某个layer的方法，基类实现 initxxxx
    _initOverlayLayer() {
      throw new Error('_initOverlayLayer is not implemented');  
    }
  
    _addLayerSucceeded() {
      throw new Error('_addLayerSucceeded is not implemented');  
    }
  
    _unproject() {
      throw new Error('_unproject is not implemented');  
    }
  
    clean() {
      throw new Error('clean is not implemented');  
    }
  
    echartsLayerResize() {
      this.echartslayer.forEach(echartslayer => {
        echartslayer.chart.resize();
      });
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
  
    setServerUrl(serverUrl) {
      this.serverUrl = serverUrl;
      this.webMapService.setServerUrl(serverUrl);
    }
  
    setWithCredentials(withCredentials) {
      this.withCredentials = withCredentials;
      this.webMapService.setWithCredentials(withCredentials);
    }
  
    setProxy(proxy) {
      this.proxy = proxy;
      this.webMapService.setProxy(proxy);
    }
  
    setZoom(zoom) {
      if (this.map) {
        this.mapOptions.zoom = zoom;
        if (zoom !== +this.map.getZoom().toFixed(2)) {
          (zoom || zoom === 0) && this.map.setZoom(zoom, { from: 'setZoom' });
        }
      }
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
  
    initWebMap() {
      this.clean();
      this.serverUrl = this.serverUrl && this.webMapService.handleServerUrl(this.serverUrl);
      if (this.webMapInfo) {
        // 传入是webmap对象
        const mapInfo = this.webMapInfo;
        mapInfo.mapParams = {
          title: this.webMapInfo.title,
          description: this.webMapInfo.description
        };
        this.mapParams = mapInfo.mapParams;
        this._getMapInfo(mapInfo);
        return;
      } else if (!this.mapId || !this.serverUrl) {
        this._createMap();
        return;
      }
      this._taskID = new Date();
      this.getMapInfo(this._taskID);
    }
  
    getMapInfo(_taskID) {
      this.serverUrl = this.serverUrl && this.webMapService.handleServerUrl(this.serverUrl);
      this.webMapService
        .getMapInfo()
        .then(
          (mapInfo) => {
            if (this._taskID !== _taskID) {
              return;
            }
            // 存储地图的名称以及描述等信息，返回给用户
            this.mapParams = mapInfo.mapParams;
            this._getMapInfo(mapInfo, _taskID);
          },
          error => {
            throw error;
          }
        )
        .catch(error => {
          this._fire('getmapinfofailed', { error });
          console.log(error);
        });
    }

    getBaseLayerType(layerInfo) {
      let layerType = layerInfo.layerType; // 底图和rest地图兼容
  
      if (
        layerType.indexOf('TIANDITU_VEC') > -1 ||
        layerType.indexOf('TIANDITU_IMG') > -1 ||
        layerType.indexOf('TIANDITU_TER') > -1
      ) {
        layerType = 'TIANDITU';
      }
  
      switch (layerType) {
        case 'TILE':
        case 'SUPERMAP_REST':
          return 'TILE';
        case 'CLOUD':
        case 'CLOUD_BLACK':
          return 'CLOUD';
        case 'OSM':
        case 'JAPAN_ORT':
        case 'JAPAN_RELIEF':
        case 'JAPAN_PALE':
        case 'JAPAN_STD':
        case 'GOOGLE_CN':
        case 'GOOGLE':
          return 'XYZ';
        default:
          return layerType;
      }
    }
  
    getMapurls(mapurl = {}) {
      const mapUrls = {
        CLOUD: mapurl.CLOUD || 'http://t2.dituhui.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}',
        CLOUD_BLACK: mapurl.CLOUD_BLACK || 'http://t3.dituhui.com/MapService/getGdp?x={x}&y={y}&z={z}',
        OSM: mapurl.OSM || 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        GOOGLE:
        'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i540264686!3m12!2s{googleMapsLanguage}!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0&key={googleMapsAPIKey}',
        GOOGLE_CN: 'https://mt{0-3}.google.com/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
        JAPAN_STD: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
        JAPAN_PALE: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
        JAPAN_RELIEF: 'https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
        JAPAN_ORT: 'https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'
      };
  
      return mapUrls;
    }
  
    getLayerFeatures(layer, _taskID, type) {
      const getLayerFunc = this.webMapService.getLayerFeatures(type, layer, this.baseProjection);
      getLayerFunc &&
        getLayerFunc
          .then(
            async result => {
              if (this.mapId && this._taskID !== _taskID) {
                return;
              }
              if (result && layer.projection) {
                if (!getProjection(layer.projection, this.specifiedProj4)) {
                  const epsgWKT = await getEpsgCodeInfo(
                    layer.projection.split(':')[1],
                    this.serverUrl
                  );
                  if (epsgWKT) {
                      registerProjection(layer.projection, epsgWKT, this.specifiedProj4);
                  }
                }
              }
  
              this._getLayerFeaturesSucceeded(result, layer);
            },
            error => {
              throw new Error(error);
            }
          )
          .catch(error => {
            this._addLayerSucceeded();
            this._fire('getlayerdatasourcefailed', { error, layer, map: this.map });
            console.log(error);
          });
    }
  
    setFeatureInfo(feature) {
      let featureInfo;
      const info = feature.dv_v5_markerInfo;
      if (info && info.dataViz_title) {
        // 有featureInfo信息就不需要再添加
        featureInfo = info;
      } else {
        // featureInfo = this.getDefaultAttribute();
        return info;
      }
      const properties = feature.properties;
      for (const key in featureInfo) {
        if (properties[key]) {
          featureInfo[key] = properties[key];
          delete properties[key];
        }
      }
      return featureInfo;
    }
  
    getRankStyleGroup(themeField, features, parameters) {
      // 找出所有的单值
      const values = [];
      let segements = [];
      const style = parameters.style;
      const themeSetting = parameters.themeSetting;
      const segmentMethod = themeSetting.segmentMethod;
      const segmentCount = themeSetting.segmentCount;
      const customSettings = themeSetting.customSettings;
      const minR = parameters.themeSetting.minRadius;
      const maxR = parameters.themeSetting.maxRadius;
      const colors = themeSetting.colors;
      const fillColor = style.fillColor;
      features.forEach(feature => {
        const properties = feature.properties;
        const value = properties[themeField];
        // 过滤掉空值和非数值
        if (value == null || value === '' || isNaN(+value)) {
          return;
        }
        values.push(Number(value));
      });
      try {
        segements = ArrayStatistic.getArraySegments(values, segmentMethod, segmentCount);
      } catch (error) {
        console.log(error);
      }
  
      // 处理自定义 分段
      for (let i = 0; i < segmentCount; i++) {
        if (i in customSettings) {
          const startValue = customSettings[i].segment.start;
          const endValue = customSettings[i].segment.end;
          startValue != null && (segements[i] = startValue);
          endValue != null && (segements[i + 1] = endValue);
        }
      }
  
      // 生成styleGroup
      const styleGroup = [];
      if (segements && segements.length) {
        const len = segements.length;
        const incrementR = (maxR - minR) / (len - 1); // 半径增量
        let start;
        let end;
        let radius = Number(((maxR + minR) / 2).toFixed(2));
        let color = '';
        const rangeColors = colors ? ColorsPickerUtil.getGradientColors(colors, len, 'RANGE') : [];
        for (let i = 0; i < len - 1; i++) {
          // 处理radius
          start = Number(segements[i].toFixed(2));
          end = Number(segements[i + 1].toFixed(2));
          // 这里特殊处理以下分段值相同的情况（即所有字段值相同）
          radius = start === end ? radius : minR + Math.round(incrementR * i);
          // 最后一个分段时将end+0.01，避免取不到最大值
          end = i === len - 2 ? end + 0.01 : end;
          // 处理自定义 半径
          radius = customSettings[i] && customSettings[i].radius ? customSettings[i].radius : radius;
          style.radius = radius;
          // 处理颜色
          if (colors && colors.length > 0) {
            color = customSettings[i] && customSettings[i].color ? customSettings[i].color : rangeColors[i] || fillColor;
            style.fillColor = color;
          }
          styleGroup.push({ radius, color, start, end, style });
        }
        return styleGroup;
      } else {
        return false;
      }
    }
  
    createRankStyleSource(parameters, features) {
      const themeSetting = parameters.themeSetting;
      const themeField = themeSetting.themeField;
      const styleGroups = this.getRankStyleGroup(themeField, features, parameters);
      return styleGroups ? { parameters, styleGroups } : false;
    }
  
    getRestMapLayerInfo(restMapInfo, layer) {
      const { bounds, coordUnit, visibleScales, url } = restMapInfo;
      layer.layerType = 'TILE';
      layer.orginEpsgCode = this.baseProjection;
      layer.units = coordUnit && coordUnit.toLowerCase();
      layer.extent = [bounds.left, bounds.bottom, bounds.right, bounds.top];
      layer.visibleScales = visibleScales;
      layer.url = url;
      layer.sourceType = 'TILE';
      return layer;
    }
  
    handleLayerFeatures(features, layerInfo) {
      const { layerType, style, themeSetting, filterCondition } = layerInfo;
      if ((style || themeSetting) && filterCondition) {
        // 将 feature 根据过滤条件进行过滤, 分段专题图和单值专题图因为要计算 styleGroup 所以暂时不过滤
        if (layerType !== 'RANGE' && layerType !== 'UNIQUE' && layerType !== 'RANK_SYMBOL') {
          features = this.getFilterFeatures(filterCondition, features);
        }
      }
  
      return features;
    }
  
    getFilterFeatures(filterCondition, allFeatures) {
      if (!filterCondition) {
        return allFeatures;
      }
      let condition = this.replaceFilterCharacter(filterCondition);
      const filterFeatures = [];
      for (let i = 0; i < allFeatures.length; i++) {
        const feature = allFeatures[i];
        let filterResult;
        const properties = feature.properties;
        try {
          condition = this.parseCondition(condition, Object.keys(properties));
          const filterFeature = this.parseConditionFeature(properties);
          const sql = 'select * from json where (' + condition + ')';
          filterResult = window.jsonsql.query(sql, { attributes: filterFeature });
        } catch (err) {
          // 必须把要过滤得内容封装成一个对象,主要是处理jsonsql(line : 62)中由于with语句遍历对象造成的问题
          continue;
        }
        if (filterResult && filterResult.length > 0) {
          // afterFilterFeatureIdx.push(i);
          filterFeatures.push(feature);
        }
      }
      return filterFeatures;
    }
  
    replaceFilterCharacter(filterString) {
      filterString = filterString
        .replace(/=/g, '==')
        .replace(/AND|and/g, '&&')
        .replace(/or|OR/g, '||')
        .replace(/<==/g, '<=')
        .replace(/>==/g, '>=');
      return filterString;
    }
  
    getParseSpecialCharacter() {
      // 特殊字符字典
      const directory = ['(', ')', '（', '）', ',', '，'];
      const res = {};
      directory.forEach((item, index) => {
        res[item] = `$${index}`;
      });
      return res;
    }
  
    parseSpecialCharacter(str) {
      const directory = this.getParseSpecialCharacter();
      for (let key in directory) {
        const replaceValue = directory[key];
        const pattern = new RegExp(`\\${key}`, 'g');
        // eslint-disable-next-line
        while (pattern.test(str)) {
          str = str.replace(pattern, replaceValue);
        }
      }
      return str;
    }
  
    parseCondition(filterCondition, keys) {
      const str = filterCondition.replace(/&|\||>|<|=|!/g, ' ');
      const arr = str.split(' ').filter((item) => item);
      let result = filterCondition;
      arr.forEach((item) => {
        const key = keys.find((val) => val === item);
        if (this.startsWithNumber(item) && key) {
          result = result.replace(key, '$' + key);
        }
        if (key) {
          const res = this.parseSpecialCharacter(key);
          result = result.replace(key, res);
        }
      });
      return result;
    }
  
    // 处理jsonsqlfeature, 加前缀
    parseConditionFeature(feature) {
      let copyValue = {};
      for (let key in feature) {
        let copyKey = key;
        if (this.startsWithNumber(key)) {
          copyKey = '$' + key;
        }
        copyKey = this.parseSpecialCharacter(copyKey);
        copyValue[copyKey] = feature[key];
      }
      return copyValue;
    }
  
    startsWithNumber(str) {
      return /^\d/.test(str);
    }
  
    getEchartsLayerOptions(layerInfo, features, coordinateSystem) {
      const properties = this.webMapService.getFeatureProperties(features);
      const lineData = createLinesData(layerInfo, properties);
      const pointData = this._createPointsData(lineData, layerInfo, properties);
      const options = this._createOptions(layerInfo, lineData, pointData, coordinateSystem);
      return options;
    }
  
    getDashStyle(str, strokeWidth = 1, type = 'array') {
      if (!str) {
        return type === 'array' ? [] : '';
      }
  
      const w = strokeWidth;
      let dashArr;
      switch (str) {
        case 'solid':
          dashArr = [];
          break;
        case 'dot':
          dashArr = [1, 4 * w];
          break;
        case 'dash':
          dashArr = [4 * w, 4 * w];
          break;
        case 'dashrailway':
          dashArr = [8 * w, 12 * w];
          break;
        case 'dashdot':
          dashArr = [4 * w, 4 * w, 1 * w, 4 * w];
          break;
        case 'longdash':
          dashArr = [8 * w, 4 * w];
          break;
        case 'longdashdot':
          dashArr = [8 * w, 4 * w, 1, 4 * w];
          break;
        default:
          if (Util.isArray(str)) {
            dashArr = str;
          } else {
            str = StringExt.trim(str).replace(/\s+/g, ',');
            dashArr = str.replace(/\[|\]/gi, '').split(',');
          }
          break;
      }
      dashArr = type === 'array' ? dashArr : dashArr.join(',');
      return dashArr;
    }
  
    getCanvasFromSVG(svgUrl, divDom, callBack) {
      const canvas = document.createElement('canvas');
      canvas.id = `dataviz-canvas-${new Date().getTime()}`;
      canvas.style.display = 'none';
      divDom.appendChild(canvas);
      if (svgUrl) {
        const canvgs = (window.canvg || {}).default ? window.canvg.default : Canvg;
        const ctx = canvas.getContext('2d');
        canvgs.from(ctx, svgUrl, {
          ignoreMouse: true,
          ignoreAnimation: true,
          forceRedraw: () => false
        }).then(v => {
          v.start();
          this.canvgsV.push(v);
          if (canvas.width > 300 || canvas.height > 300) {
            return;
          }
          callBack(canvas);
        });
      } else {
        callBack(canvas);
      }
    }
  
    stopCanvg() {
      this.canvgsV.forEach(v => v.stop());
      this.canvgsV = [];
    }
  
    getRangeStyleGroup(layerInfo, features) {
      const { featureType, style, themeSetting } = layerInfo;
      const { customSettings, themeField, segmentCount, segmentMethod, colors } = themeSetting;
  
      // 找出分段值
      const values = [];
      let attributes;
  
      features.forEach(feature => {
        attributes = feature.properties;
        if (attributes) {
          // 过滤掉非数值的数据
          const val = attributes[themeField];
          (val || val === 0) && !isNaN(+val) && values.push(parseFloat(val));
        }
      }, this);
      let segements =
        values && values.length && ArrayStatistic.getArraySegments(values, segmentMethod, segmentCount);
      if (segements) {
        let itemNum = segmentCount;
        if (attributes && segements[0] === segements[attributes.length - 1]) {
          itemNum = 1;
          segements.length = 2;
        }
  
        // 保留两位有效数
        for (let i = 0; i < segements.length; i++) {
          let value = segements[i];
          value = i === 0 ? Math.floor(value * 100) / 100 : Math.ceil(value * 100) / 100 + 0.1; // 加0.1 解决最大值没有样式问题
          segements[i] = Number(value.toFixed(2));
        }
  
        // 获取一定量的颜色
        let curentColors = colors;
        curentColors = ColorsPickerUtil.getGradientColors(curentColors, itemNum, 'RANGE');
        for (let index = 0; index < itemNum; index++) {
          if (index in customSettings) {
            if (customSettings[index].segment.start) {
              segements[index] = customSettings[index].segment.start;
            }
            if (customSettings[index].segment.end) {
              segements[index + 1] = customSettings[index].segment.end;
            }
          }
        }
        // 生成styleGroup
        const styleGroups = [];
        for (let i = 0; i < itemNum; i++) {
          let color = curentColors[i];
          if (i in customSettings) {
            if (customSettings[i].color) {
              color = customSettings[i].color;
            }
          }
          if (featureType === 'LINE') {
            style.strokeColor = color;
          } else {
            style.fillColor = color;
          }
  
          const start = segements[i];
          const end = segements[i + 1];
          const styleObj = JSON.parse(JSON.stringify(style));
          styleGroups.push({
            style: styleObj,
            color: color,
            start: start,
            end: end
          });
        }
        return styleGroups;
      }
    }
  
    getCustomSettingColors(customSettings, featureType) {
      const keys = Object.keys(customSettings);
      const colors = [];
      keys.forEach(key => {
        if (featureType === 'LINE') {
          colors.push(customSettings[key].strokeColor);
        } else {
          colors.push(customSettings[key].fillColor);
        }
      });
      return colors;
    }
  
    getUniqueStyleGroup(parameters, features) {
      const { featureType, style, themeSetting } = parameters;
      const { colors, customSettings } = themeSetting;
      let themeField = themeSetting.themeField;
      // 找出所有的单值
      const featurePropertie = (features && features[0] && features[0].properties) || {};
      Object.keys(featurePropertie).forEach(key => {
        key.toLocaleUpperCase() === themeField.toLocaleUpperCase() && (themeField = key);
      });
      const names = [];
      for (const i in features) {
        const properties = features[i].properties;
        const name = properties[themeField];
        let isSaved = false;
        for (const j in names) {
          if (names[j] === name) {
            isSaved = true;
            break;
          }
        }
        if (!isSaved) {
          names.push(name);
        }
      }
  
      // 获取一定量的颜色
      let curentColors = colors;
      curentColors = ColorsPickerUtil.getGradientColors(curentColors, names.length);
      const usedColors = this.getCustomSettingColors(customSettings, featureType).map(item => item && item.toLowerCase());
      const allColors = ColorsPickerUtil.getGradientColors(colors, names.length + Object.keys(customSettings).length).map(item => item.toLowerCase());
      const newColors = difference(allColors, usedColors);
      const styleGroup = [];
      names.forEach((name, index) => {
        let color = curentColors[index];
        let itemStyle = { ...style };
        const customStyle = customSettings[name];
        if (typeof customStyle === 'object') {
          itemStyle = Object.assign(itemStyle, customStyle);
          color = itemStyle.fillColor || itemStyle.strokeColor;
        } else {
          if (typeof customStyle === 'string') {
            color = customSettings[name];
          }
          if (!customStyle) {
            color = newColors.shift();
          }
          if (featureType === 'LINE') {
            itemStyle.strokeColor = color;
          } else {
            itemStyle.fillColor = color;
          }
        }
  
        styleGroup.push({
          color: color,
          style: itemStyle,
          value: name,
          themeField: themeField
        });
      }, this);
  
      return styleGroup;
    }
  
    transformFeatures(features) {
      features &&
        features.forEach((feature, index) => {
          let coordinates = feature.geometry && feature.geometry.coordinates;
          if (!coordinates || coordinates.length === 0) {
            return;
          }
          coordEach(feature, (coordinates) => {
            let transCoordinates = this._unproject(coordinates);
            coordinates[0] = transCoordinates[0];
            coordinates[1] = transCoordinates[1];
          });
          features[index] = feature;
        });
  
      return features;
    }
  
    _drawTextRectAndGetSize({ context, style, textArray, lineHeight, doublePadding, canvas }) {
      let backgroundFill = style.backgroundFill;
      const maxWidth = style.maxWidth - doublePadding;
      let width = 0;
      let height = 0;
      let lineCount = 0;
      let lineWidths = [];
      // 100的宽度，去掉左右两边3padding
      textArray.forEach((arrText) => {
        let line = '';
        let isOverMax = false;
        lineCount++;
        for (let n = 0; n < arrText.length; n++) {
          let textLine = line + arrText[n];
          let metrics = context.measureText(textLine);
          let textWidth = metrics.width;
          if ((textWidth > maxWidth && n > 0) || arrText[n] === '\n') {
            line = arrText[n];
            lineCount++;
            // 有换行，记录当前换行的width
            isOverMax = true;
          } else {
            line = textLine;
            width = textWidth;
          }
        }
        if(isOverMax) {
          lineWidths.push(maxWidth);
        } else {
          lineWidths.push(width);
        }
      }, this);
      for (let i = 0; i < lineWidths.length; i++) {
        let lineW = lineWidths[i];
        if(lineW >= maxWidth) {
          // 有任何一行超过最大高度，就用最大高度
          width = maxWidth;
          break;
        } else if(lineW > width) {
          // 自己换行，就要比较每行的最大宽度
          width = lineW;
        }
      }
      width += doublePadding;
      // -6 是为了去掉canvas下方多余空白，让文本垂直居中
      height = lineCount * lineHeight + doublePadding - 6;
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = backgroundFill;
      context.fillRect(0, 0, width, height);
      context.lineWidth = style.borderWidth;
      context.strokeStyle = style.borderColor;
      context.strokeRect(0, 0, width, height);
      return {
        width: width,
        height: height
      };
    }
  
    _drawTextWithCanvas({ context, canvas, style }) {
      const padding = 8;
      const doublePadding = padding * 2;
      const lineHeight = Number(style.font.replace(/[^0-9]/ig, '')) + 3;
      const textArray = style.text.split('\r\n');
      context.font = style.font;
      const size = this._drawTextRectAndGetSize({ context, style, textArray, lineHeight, doublePadding, canvas });
      let positionY = padding;
      textArray.forEach((text, i) => {
        if(i !== 0) {
          positionY = positionY + lineHeight;
        }
        context.font = style.font;
        let textAlign = style.textAlign;
        let x;
        const width = size.width - doublePadding; // 减去padding
        switch (textAlign) {
          case 'center':
            x = width / 2;
            break;
          case 'right':
            x = width;
            break;
          default:
            x = 8;
            break;
        }
        // 字符分隔为数组
        const arrText = text.split('');
        let line = '';
        const fillColor = style.fillColor;
        // 每一行限制的高度
        let maxWidth = style.maxWidth - doublePadding;
        for (let n = 0; n < arrText.length; n++) {
          let testLine = line + arrText[n];
          let metrics = context.measureText(testLine);
          let testWidth = metrics.width;
          if ((testWidth > maxWidth && n > 0) || arrText[n] === '\n') {
            context.fillStyle = fillColor;
            context.textAlign = textAlign;
            context.textBaseline = 'top';
            context.fillText(line, x, positionY);
            line = arrText[n];
            positionY += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillStyle = fillColor;
        context.textAlign = textAlign;
        context.textBaseline = 'top';
        context.fillText(line, x, positionY);
      }, this);
    }
  
    handleSvgColor(style, canvas) {
      const { fillColor, fillOpacity, strokeColor, strokeOpacity, strokeWidth } = style;
      const context = canvas.getContext('2d');
      if (style.text) {
        this._drawTextWithCanvas({ context, canvas, style });
        return;
      }
      if (fillColor) {
        context.fillStyle = ColorsPickerUtil.getColorWithOpacity(fillColor, fillOpacity);
        context.fill();
      }
  
      if (strokeColor || strokeWidth) {
        context.strokeStyle = ColorsPickerUtil.getColorWithOpacity(strokeColor, strokeOpacity);
        context.lineWidth = strokeWidth;
        context.stroke();
      }
    }
  
    _createPointsData(lineData, layerInfo, properties) {
      let data = [];
      const labelSetting = layerInfo.labelSetting;
      // 标签隐藏则直接返回
      if (!labelSetting.show || !lineData.length) {
        return data;
      }
      const fromData = [];
      const toData = [];
      lineData.forEach((item, idx) => {
        const coords = item.coords;
        const fromCoord = coords[0];
        const toCoord = coords[1];
        const fromProperty = properties[idx][labelSetting.from];
        const toProperty = properties[idx][labelSetting.to];
        // 起始字段去重
        const f = fromData.find(d => {
          return d.value[0] === fromCoord[0] && d.value[1] === fromCoord[1];
        });
        !f &&
          fromData.push({
            name: fromProperty,
            value: fromCoord
          });
        // 终点字段去重
        const t = toData.find(d => {
          return d.value[0] === toCoord[0] && d.value[1] === toCoord[1];
        });
        !t &&
          toData.push({
            name: toProperty,
            value: toCoord
          });
      });
      data = fromData.concat(toData);
      return data;
    }
  
    _createOptions(layerInfo, lineData, pointData, coordinateSystem) {
      let series;
      const lineSeries = this._createLineSeries(layerInfo, lineData, coordinateSystem);
      if (pointData && pointData.length) {
        const pointSeries = this._createPointSeries(layerInfo, pointData, coordinateSystem);
        series = lineSeries.concat(pointSeries);
      } else {
        series = lineSeries.slice();
      }
      return { series, animation: false };
    }
  
    _createPointSeries(layerInfo, pointData, coordinateSystem) {
      const lineSetting = layerInfo.lineSetting;
      const animationSetting = layerInfo.animationSetting;
      const labelSetting = layerInfo.labelSetting;
      const pointSeries = [
        {
          name: 'point-series',
          coordinateSystem: coordinateSystem,
          zlevel: 2,
          label: {
            normal: {
              show: labelSetting.show,
              position: 'right',
              formatter: '{b}',
              color: labelSetting.color,
              fontFamily: labelSetting.fontFamily
            }
          },
          itemStyle: {
            normal: {
              color: lineSetting.color || labelSetting.color
            }
          },
          data: pointData
        }
      ];
  
      if (animationSetting.show) {
        // 开启动画
        pointSeries[0].type = 'effectScatter';
        pointSeries[0].rippleEffect = {
          brushType: 'stroke'
        };
      } else {
        // 关闭动画
        pointSeries[0].type = 'scatter';
      }
  
      return pointSeries;
    }
  
    _createLineSeries(layerInfo, lineData, coordinateSystem) {
      const lineSetting = layerInfo.lineSetting;
      const animationSetting = layerInfo.animationSetting;
      const linesSeries = [
        // 轨迹线样式
        {
          name: 'line-series',
          coordinateSystem: coordinateSystem,
          type: 'lines',
          zlevel: 1,
          effect: {
            show: animationSetting.show,
            constantSpeed: animationSetting.constantSpeed,
            trailLength: 0,
            symbol: animationSetting.symbol,
            symbolSize: animationSetting.symbolSize
          },
          lineStyle: {
            normal: {
              color: lineSetting.color,
              type: lineSetting.type,
              width: lineSetting.width,
              opacity: lineSetting.opacity,
              curveness: lineSetting.curveness
            }
          },
          data: lineData
        }
      ];
  
      if (lineData.length >= MAX_MIGRATION_ANIMATION_COUNT) {
        linesSeries[0].large = true;
        linesSeries[0].largeThreshold = 100;
        linesSeries[0].blendMode = 'lighter';
      }
  
      return linesSeries;
    }
  
    _getLayerFeaturesSucceeded(result, layer) {
      switch (result.type) {
        case 'feature':
          this._initOverlayLayer(layer, result.features);
          break;
        case 'restMap':
          layer.layerType = 'restMap';
          this._initOverlayLayer(layer, result.restMaps);
          break;
        case 'mvt':
          layer.layerType = 'mvt';
          this._initOverlayLayer(layer, result);
          break;
        case 'dataflow':
        case 'noServerId':
          this._initOverlayLayer(layer);
          break;
      }
    }

    _fire(type, params) {
      if (this[fireField]) {
        this[fireField](type, params);
      }
    }
  }
}
