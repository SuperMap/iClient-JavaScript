/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Bounds } from '@supermapgis/iclient-common/commontypes/Bounds';
 import { GeoJSON as GeoJSONFormat } from '@supermapgis/iclient-common/format/GeoJSON';
 import { getMeterPerMapUnit, scalesToResolutions, getZoomByResolution, getDpi } from '@supermapgis/iclient-common/util/MapCalculateUtil';
 import { isString, isArray } from '@supermapgis/iclient-common/util/BaseUtil';
 import { isMatchAdministrativeName } from '@supermapgis/iclient-common/mapping/utils/util';
 import * as olUtil from 'ol/util';
 import Geometry from 'ol/geom/Geometry';
 import { getVectorContext } from 'ol/render';
 import VectorSource from 'ol/source/Vector';
 import VectorLayer from 'ol/layer/Vector';
 import { Fill, Style } from 'ol/style';
 import Feature from 'ol/Feature';
 import Projection from 'ol/proj/Projection';
 import { get } from 'ol/proj';

 /**
  * @name Util
  * @namespace
  * @category BaseTypes Util
  * @classdesc 工具类。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.Util.getOlVersion();
  *
  * </script>
  *
  * // ES6 Import
  * import { Util } from '{npm}';
  *
  * const result = Util.setMask();
  * ```
  */
 export const Util = {
   getOlVersion() {
     if (olUtil && olUtil.VERSION) {
       return olUtil.VERSION.split('.')[0];
     }
     if (window && window.ol) {
       if (window.ol.util) {
         return '6';
       }
       if (window.ol.WebGLMap) {
         return '5';
       }
     }
     return '4';
   },

   /**
    * @function Util.toGeoJSON
    * @description 将传入对象转为 GeoJSON 格式。
    * @param {Object} smObj - 待转换参数。
    * @private
    */
   toGeoJSON(smObj) {
     if (!smObj) {
       return null;
     }
     return new GeoJSONFormat().toGeoJSON(smObj);
   },

   /**
    * @function Util.toSuperMapGeometry
    * @description 将 GeoJSON 对象转为 SuperMap 几何图形。
    * @param {GeoJSONObject} geoJSON - GeoJSON 对象。
    * @private
    */
   toSuperMapGeometry(geoJSON) {
     if (!geoJSON || !geoJSON.type) {
       return null;
     }
     const result = new GeoJSONFormat().read(geoJSON, 'FeatureCollection');
     return result[0].geometry;
   },

   /**
    * @function Util.resolutionToScale
    * @description 通过分辨率计算比例尺。
    * @param {number} resolution - 分辨率。
    * @param {number} dpi - 屏幕分辨率。
    * @param {string} mapUnit - 地图单位。
    * @returns {number} 比例尺。
    * @private
    */
   resolutionToScale(resolution, dpi, mapUnit) {
     const inchPerMeter = 1 / 0.0254;
     // 地球半径。
     const meterPerMapUnit = getMeterPerMapUnit(mapUnit);
     const scale = 1 / (resolution * dpi * inchPerMeter * meterPerMapUnit);
     return scale;
   },

   /**
    * @function Util.toSuperMapBounds
    * @description 转为 SuperMapBounds 格式。
    * @param {Array.<number>} bounds - bounds 数组。
    * @returns {Bounds} 返回 SuperMap 的 Bounds 对象。
    * @private
    */
   toSuperMapBounds(bounds) {
     if (bounds instanceof Bounds) {
       return bounds;
     }
     return new Bounds(bounds[0], bounds[1], bounds[2], bounds[3]);
   },

   /**
    * @function Util.toProcessingParam
    * @description 将 Region 节点数组转为 Processing 服务需要的分析参数。
    * @param {Array} points - Region 各个节点数组。
    * @returns processing 服务裁剪、查询分析的分析参数。
    * @private
    */
   toProcessingParam(points) {
     if (points.length < 1) {
       return '';
     }
     const geometryParam = {};
     const results = [];
     for (let i = 0; i < points.length; i++) {
       const point = { x: points[i][0], y: points[i][1] };
       results.push(point);
     }
     results.push(results[0]);
     geometryParam.type = 'REGION';
     geometryParam.points = results;

     return geometryParam;
   },

   /**
    * @function Util.scaleToResolution
    * @description 通过比例尺计算分辨率。
    * @param {number} scale - 比例尺。
    * @param {number} dpi - 屏幕分辨率。
    * @param {string} mapUnit - 地图单位。
    * @returns {number} 分辨率。
    * @private
    */
   scaleToResolution(scale, dpi, mapUnit) {
     const inchPerMeter = 1 / 0.0254;
     const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
     const resolution = 1 / (scale * dpi * inchPerMeter * meterPerMapUnitValue);
     return resolution;
   },

   /**
    * @private
    * @function Util.getMeterPerMapUnit
    * @description 获取每地图单位多少米。
    * @param {string} mapUnit - 地图单位。
    * @returns {number} 返回每地图单位多少米。
    * @private
    */
   getMeterPerMapUnit,

   /**
    * @function Util.isArray
    * @description 判断是否为数组格式。
    * @param {Object} obj - 待判断对象。
    * @returns {boolean} 是否是数组。
    * @private
    */
   isArray,

   /**
    * @function Util.Csv2GeoJSON
    * @description 将 csv 格式转为 GeoJSON。
    * @param {Object} csv - csv 对象。
    * @param {Object} options - 转换参数。
    * @private
    */
   Csv2GeoJSON(csv, options) {
     const defaultOptions = {
       titles: ['lon', 'lat'],
       latitudeTitle: 'lat',
       longitudeTitle: 'lon',
       fieldSeparator: ',',
       lineSeparator: '\n',
       deleteDoubleQuotes: true,
       firstLineTitles: false
     };
     options = options || defaultOptions;
     const _propertiesNames = [];
     if (typeof csv === 'string') {
       let titulos = options.titles;
       if (options.firstLineTitles) {
         csv = csv.split(options.lineSeparator);
         if (csv.length < 2) {
           return;
         }
         titulos = csv[0];
         csv.splice(0, 1);
         csv = csv.join(options.lineSeparator);
         titulos = titulos.trim().split(options.fieldSeparator);
         for (let i = 0; i < titulos.length; i++) {
           titulos[i] = _deleteDoubleQuotes(titulos[i]);
         }
         options.titles = titulos;
       }
       for (let i = 0; i < titulos.length; i++) {
         let prop = titulos[i]
           .toLowerCase()
           .replace(/[^\w ]+/g, '')
           .replace(/ +/g, '_');
         if (prop === '' || prop === '_') {
           prop = `prop-${i}`;
         }
         _propertiesNames[i] = prop;
       }
       csv = _csv2json(csv);
     }
     return csv;

     function _deleteDoubleQuotes(cadena) {
       if (options.deleteDoubleQuotes) {
         cadena = cadena.trim().replace(/^"/, '').replace(/"$/, '');
       }
       return cadena;
     }

     function _csv2json(csv) {
       const json = {};
       json['type'] = 'FeatureCollection';
       json['features'] = [];
       const titulos = options.titles;
       csv = csv.split(options.lineSeparator);
       for (let num_linea = 0; num_linea < csv.length; num_linea++) {
         const campos = csv[num_linea].trim().split(options.fieldSeparator),
           lng = parseFloat(campos[titulos.indexOf(options.longitudeTitle)]),
           lat = parseFloat(campos[titulos.indexOf(options.latitudeTitle)]);

         const isInRange = lng < 180 && lng > -180 && lat < 90 && lat > -90;
         if (!(campos.length === titulos.length && isInRange)) {
           continue;
         }

         const feature = {};
         feature['type'] = 'Feature';
         feature['geometry'] = {};
         feature['properties'] = {};
         feature['geometry']['type'] = 'Point';
         feature['geometry']['coordinates'] = [lng, lat];
         for (let i = 0; i < titulos.length; i++) {
           if (titulos[i] !== options.latitudeTitle && titulos[i] !== options.longitudeTitle) {
             feature['properties'][_propertiesNames[i]] = _deleteDoubleQuotes(campos[i]);
           }
         }
         json['features'].push(feature);
       }
       return json;
     }
   },

   /**
    * @function Util.createCanvasContext2D
    * @description 创建 2D 画布。
    * @param {number} opt_width - 画布宽度。
    * @param {number} opt_height - 画布高度。
    * @private
    */
   createCanvasContext2D(opt_width, opt_height) {
     const canvas = document.createElement('CANVAS');
     if (opt_width) {
       canvas.width = opt_width;
     }
     if (opt_height) {
       canvas.height = opt_height;
     }
     return canvas.getContext('2d');
   },
   /**
    * @function Util.supportWebGL2
    * @description 是否支持 webgl2。
    * @private
    */
   supportWebGL2() {
     const canvas = document.createElement('canvas');
     return Boolean(canvas && canvas.getContext('webgl2'));
   },

   /**
    * @function Util.isString
    * @description 是否为字符串
    * @param {string} str - 需要判断的内容
    * @returns {boolean}
    * @private
    */
   isString,
   /**
    * @function Util.isObject
    * @description 是否为对象
    * @param {any} obj - 需要判断的内容
    * @returns {boolean}
    * @private
    */
   isObject(obj) {
     return Object.prototype.toString.call(obj) === '[object Object]';
   },

   /**
    * @function Util.trim
    * @description 字符串裁剪两边的空格
    * @param {string} str - 需要裁剪的字符串
    * @returns {boolean}
    * @private
    */
   trim(str = '') {
     return str.replace(/(^\s*)|(\s*$)/g, '');
   },
   /**
    * @function Util.newGuid
    * @description 随机生成id
    * @param {string} attr - 几位数字的id
    * @returns {string}
    * @private
    */
   newGuid(attr) {
     let len = attr || 32;
     let guid = '';
     for (let i = 1; i < len; i++) {
       let n = Math.floor(Math.random() * 16.0).toString(16);
       guid += n;
     }
     return guid;
   },
   /**
    * @function Util.isNumber
    * @description 检测数据是否为number
    * @param {string} value - 值，未知数据类型
    * @returns {boolean}
    * @private
    */
   isNumber(value) {
     if (value === '') {
       return false;
     }
     let mdata = Number(value);
     if (mdata === 0) {
       return true;
     }
     return !isNaN(mdata);
   },


   /**
    * @function Util.isMatchAdministrativeName
    * @param {string} featureName 原始数据中的地名
    * @param {string} fieldName 需要匹配的地名
    * @returns {boolean} 是否匹配
    * @private
    */
   isMatchAdministrativeName,

   /**
    * @function Util.getHighestMatchAdministration
    * @param {string} featureName 初始匹配的要素数组
    * @param {string} fieldName 要匹配的地名
    * @returns {boolean} 是否匹配
    * @private
    */
   getHighestMatchAdministration(features, fieldName) {
     let filterFeatures = features.filter((item) => {
       return isMatchAdministrativeName(item.properties.Name, fieldName);
     });

     let maxMatchPercent = 0,
       maxMatchFeature = null;
     filterFeatures.forEach((feature) => {
       let count = 0;
       Array.from(new Set(feature.properties.Name.split(''))).forEach((char) => {
         if (fieldName.includes(char)) {
           count++;
         }
       });
       if (count > maxMatchPercent) {
         maxMatchPercent = count;
         maxMatchFeature = feature;
       }
     });
     return maxMatchFeature;
   },

   /**
    * @function Util.setMask
    * @description 为图层设置掩膜。
    * @version 10.1.0
    * @param {ol.layer.Layer|Array.<ol.layer.Layer>} layers 图层
    * @param {ol.geom.Geometry|ol.Feature} polygon 掩膜矢量要素，支持面类型的要素。
    */
   setMask(layers, polygon) {
     if (!polygon) {
       return;
     }
     const geo = polygon instanceof Feature ? polygon.getGeometry() : polygon;
     if (!(geo instanceof Geometry) && ['MultiPolygon', 'Polygon'].indexOf(polygon.getType()) < 0) {
       return;
     }
     const feature = polygon instanceof Feature ? polygon : new Feature(polygon);
     const style = new Style({
       fill: new Fill({
         color: 'black'
       })
     });

     const clipLayer = new VectorLayer({
       source: new VectorSource({
         features: [feature],
         wrapX: false
       })
     });

     const clipRender = function (e) {
       const vectorContext = getVectorContext(e);
       e.context.globalCompositeOperation = 'destination-in';
       clipLayer.getSource().forEachFeature(function (feature) {
         vectorContext.drawFeature(feature, style);
         e.context.globalCompositeOperation = 'source-over';
       });
     };
     const todoLayers = Array.isArray(layers) ? layers : [layers];
     unsetMask(todoLayers);
     todoLayers.forEach((layer) => {
       layer.classNameBak_ = layer.className_;
       layer.className_ = `ol_mask_layer_${layer.ol_uid}`;
       layer.clipRender = clipRender;
       layer.extentBak_ = layer.getExtent();
       layer.setExtent(clipLayer.getSource().getExtent());
       layer.on('postrender', clipRender);
       layer.changed();
     });
   },
   /**
    * @function Util.unsetMask
    * @description 取消图层掩膜。
    * @version 10.1.0
    * @param {ol.layer.Layer|Array.<ol.layer.Layer>} layers 图层
    */
   unsetMask,
   getZoomByResolution(scale, scales) {
    return getZoomByResolution(scale, scales);
   },
   scalesToResolutions(scales, bounds, dpi, unit, mapobj, level) {
    return scalesToResolutions(scales, bounds, dpi, unit, mapobj, level);
   },
   getDpi,
   getProjection(prjCoordSys, extent) {
    let projection = get(`EPSG:${prjCoordSys.epsgCode}`);
    if (prjCoordSys.type == 'PCS_NON_EARTH') {
      projection = new Projection({
        extent,
        units: 'm',
        code: '0'
      });
    }
    if (!projection) {
      console.error(`The projection of EPSG:${prjCoordSys.epsgCode} is missing, please register the projection of EPSG:${prjCoordSys.epsgCode} first, refer to the documentation: https://iclient.supermap.io/web/introduction/leafletDevelop.html#multiProjection`);
    }
    return projection;
  }
 }

 function unsetMask(layers) {
   const todoLayers = Array.isArray(layers) ? layers : [layers];
   for (let index = 0; index < todoLayers.length; index++) {
     const layer = todoLayers[index];
     if (!layer.clipRender) {
       continue;
     }
     layer.un('postrender', layer.clipRender);
     layer.className_ = layer.classNameBak_;
     layer.setExtent(layer.extentBak);
     delete layer.classNameBak_;
     delete layer.clipRender;
     delete layer.extentBak_;
     layer.changed();
   }
 }
