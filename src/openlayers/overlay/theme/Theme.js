/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../../core/Util';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { LevelRenderer } from '@supermap/iclient-common/overlay/levelRenderer/LevelRenderer';
import { ServerFeature } from '@supermap/iclient-common/iServer/ServerFeature';
import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
import { GeoJSON as GeoJSONFormat } from '@supermap/iclient-common/format/GeoJSON';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { Vector as FeatureVector } from '@supermap/iclient-common/commontypes/Vector';
import { LonLat } from '@supermap/iclient-common/commontypes/LonLat';
import {ThemeFeature} from './ThemeFeature';
import ImageCanvasSource from 'ol/source/ImageCanvas';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';

/**
 * @class Theme
 * @browsernamespace ol.source
 * @category Visualization Theme
 * @classdesc 专题图基类。地图学中将突出而深入地表示一种或几种要素或现象，即集中表示一个主题内容的地图称为专题地图。
 * 在 SuperMap 中，专题图是地图图层的符号化显示，即用各种图形渲染风格（大小，颜色，线型，填充等）来图形化地表现专题要素的某方面特征。
 * 调用建议：使用其子类实现该类。
 * @modulecategory Overlay
 * @param {string} name - 专题图图层名称。
 * @param {Object} opt_option - 参数。
 * @param {ol.Map} opt_option.map - 当前 OpenLayers 的地图对象。
 * @param {string} [opt_option.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [opt_option.opacity=1] - 图层不透明度。
 * @param {string} [opt_option.logo] - Logo（OpenLayers 5.0.0 及更高版本不再支持此参数）。
 * @param {ol.proj.Projection} [opt_option.projection] - 投影信息。
 * @param {number} [opt_option.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。必须是 1 或更高。
 * @param {Array} [opt_option.resolutions] - 分辨率数组。
 * @param {ol.source.State} [opt_option.state] - 资源状态。
 * @param {(string|Object)} [opt_option.attributions='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' target='_blank'>SuperMap iServer</a></span> with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>'] - 版权描述信息。
 * @extends {ol.source.ImageCanvas}
 * @usage
 */
export class Theme extends ImageCanvasSource {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || "Map Data <span>© SuperMap iServer</span> with <span>© SuperMap iClient</span>",
            canvasFunction: canvasFunctionInternal_,
            logo: Util.getOlVersion() === '4' ? options.logo : null,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        /**
        * @function Theme.prototype.on
        * @description 添加专题要素事件监听。支持的事件包括: click、mousedown、mousemove、mouseout、mouseover、mouseup。
        * @param {string} event - 事件名称。
        * @param {RequestCallback} callback - 事件回调函数。
        */
        this.on = this.onInternal;
        this.id = options.id ? options.id : CommonUtil.createUniqueID("themeLayer_");

        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            var mapWidth = size[0] * pixelRatio;
            var mapHeight = size[1] * pixelRatio;
            if (!this.context) {
                this.context = Util.createCanvasContext2D(mapWidth, mapHeight);
            }
            if (!this.features) {
                return this.context.canvas;
            }
            this.pixelRatio = pixelRatio;

            var width = this.map.getSize()[0] * pixelRatio;
            var height = this.map.getSize()[1] * pixelRatio;
            this.offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];
            if (!this.notFirst) {
                this.redrawThematicFeatures(extent);
                this.notFirst = true;
            }
            this.div.id = this.id;
            this.div.className = "themeLayer";
            this.div.style.width = mapWidth + "px";
            this.div.style.height = mapHeight + "px";
            this.map.getViewport().appendChild(this.div);
            this.renderer.resize();
            this.map.getViewport().removeChild(this.div);
            this.themeCanvas = this.renderer.painter.root.getElementsByTagName('canvas')[0];
            this.themeCanvas.width = mapWidth;
            this.themeCanvas.height = mapHeight;
            this.themeCanvas.style.width = mapWidth + "px";
            this.themeCanvas.style.height = mapHeight + "px";
            this.themeCanvas.getContext('2d').clearRect(0, 0, mapWidth, mapHeight);

            var highLightContext = this.renderer.painter._layers.hover.ctx;
            var highlightCanvas = highLightContext.canvas;
            var copyHighLightContext = Util.createCanvasContext2D(mapWidth, mapHeight);
            copyHighLightContext.drawImage(highlightCanvas, 0, 0, highlightCanvas.width, highlightCanvas.height, 0, 0, mapWidth, mapHeight);

            this.redrawThematicFeatures(extent);
            var canvas = this.context.canvas;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = mapWidth;
            canvas.height = mapHeight;
            canvas.style.width = mapWidth + "px";
            canvas.style.height = mapHeight + "px";
            this.context.drawImage(this.themeCanvas, 0, 0);
            this.context.drawImage(copyHighLightContext.canvas, 0, 0);
            return this.context.canvas;
        }

        this.canvasFunctionInternal_ = canvasFunctionInternal_;
        this.EVENT_TYPES = ["loadstart", "loadend", "loadcancel",
            "visibilitychanged", "move", "moveend", "added", "removed",
            "tileloaded", "beforefeaturesadded", "featuresadded", "featuresremoved"];
        this.features = [];
        this.TFEvents = options.TFEvents || [];
        this.map = options.map;
        var size = this.map.getSize();
        this.div = document.createElement('div');
        this.map.getViewport().appendChild(this.div);
        this.div.style.width = size[0] + "px";
        this.div.style.height = size[1] + "px";
        this.setOpacity(options.opacity);
        this.levelRenderer = new LevelRenderer();
        this.movingOffset = [0, 0];
        this.renderer = this.levelRenderer.init(this.div);
        this.map.getViewport().removeChild(this.div);
        this.renderer.clear();
        //处理用户预先（在图层添加到 map 前）监听的事件
        this.addTFEvents();
    }

    /**
     * @function Theme.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.EVENT_TYPES = null;
        this.isBaseLayer = null;
        this.TFEvents = null;
        this.destroyFeatures();
        this.features = null;
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.renderer = null;
        this.levelRenderer = null;
        this.movingOffset = null;
        this.currentMousePosition = null;
    }

    /**
     * @function Theme.prototype.destroyFeatures
     * @description 销毁要素。
     * @param {Array.<FeatureVector>|FeatureVector} features - 将被销毁的要素。
     */
    destroyFeatures(features) {
        var all = (features == undefined);
        if (all) {
            features = this.features;
        }
        if (features) {
            this.removeFeatures(features);
            if (!Array.isArray(features)) {
              features = [features];
            }
            for (var i = features.length - 1; i >= 0; i--) {
                features[i].destroy();
            }
        }
    }

    /**
     * @function Theme.prototype.setOpacity
     * @description 设置图层的不透明度，取值范围：[0-1]。
     * @param {number} opacity - 不透明度。
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            CommonUtil.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                this.dispatchEvent({type: 'changelayer', value: {layer: this, property: "opacity"}});
            }
        }
    }

    /**
     * @function Theme.prototype.addFeatures
     * @param {(Array.<ThemeFeature>|Array.<GeoJSONObject>|Array.<ol.Feature>|ThemeFeature|GeoJSONObject|ol.Feature)} features - 待添加要素。
     * @description 抽象方法，可实例化子类必须实现此方法。向专题图图层中添加数据，
     *              专题图仅接收 FeatureVector 类型数据，
     *              feature 将储存于 features 属性中，其存储形式为数组。
     */
    addFeatures(features) { // eslint-disable-line no-unused-vars

    }

    /**
     * @function Theme.prototype.removeFeatures
     * @param {(Array.<FeatureVector>|FeatureVector|Function)} features - 要删除要素的数组或用来过滤的回调函数。
     * @description 从专题图中删除要素。这个函数删除所有传递进来的矢量要素。
     *              参数中的要素数组中的每一项，必须是已经添加到当前图层中的要素，
     *              如果无法确定要素数组，则可以调用 removeAllFeatures 来删除所有要素。
     *              如果要删除的要素数组中的元素特别多，推荐使用 removeAllFeatures，
     *              删除所有要素后再重新添加。这样效率会更高。
     */
    removeFeatures(features) {
      var me = this;
      if (!features) {
          return;
      }
      if (features === me.features) {
          return me.removeAllFeatures();
      }
      if (!CommonUtil.isArray(features) && !(typeof features === 'function')) {
          features = [features];
      }

      var featuresFailRemoved = [];

      for (var i = 0; i < me.features.length; i++) {
          var feature = me.features[i];

          //如果我们传入的feature在features数组中没有的话，则不进行删除，
          //并将其放入未删除的数组中。
          if (features && typeof features === 'function') {
            if (features(feature)) {
              me.features.splice(i--, 1);
            }
          } else {
            var findex = CommonUtil.indexOf(features, feature);
            if (findex === -1) {
                featuresFailRemoved.push(feature);
            } else {
              me.features.splice(i--, 1);
            }
          }
      }
        var drawFeatures = [];
        for (var hex = 0, len = this.features.length; hex < len; hex++) {
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this.addFeatures(drawFeatures);
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getView().calculateExtent());
        }
        var succeed = featuresFailRemoved.length == 0 ? true : false;
        this.dispatchEvent({type: "featuresremoved", value: {features: featuresFailRemoved, succeed: succeed}});
    }

    /**
     * @function Theme.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        if (this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        this.dispatchEvent({type: 'featuresremoved', value: {features: [], succeed: true}});
    }

    /**
     * @function Theme.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @param {Function} [filter] - 根据条件过滤要素的回调函数。
     * @returns {Array.<FeatureVector>} 用户加入图层的有效数据。
     */
    getFeatures(filter) {
        var len = this.features.length;
        var clonedFeatures = [];
        for (var i = 0; i < len; ++i) {
          if (!filter || (filter && typeof filter === 'function' && filter(this.features[i]))) {
            clonedFeatures.push(this.features[i]);
          }
        }
        return clonedFeatures;
    }

    /**
     * @function Theme.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     *              返回此 feature（并且只返回第一个）。
     * @param {string} property - 要素的某个属性名称。
     * @param {string} value - property 所对应的值。
     * @returns {FeatureVector} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy(property, value) {
        var feature = null;
        for (var id in this.features) {
            if (this.features[id][property] === value) {
                feature = this.features[id];
                //feature = this.features[id].clone();
                break;
            }
        }
        return feature;
    }

    /**
     * @function Theme.prototype.getFeatureById
     * @description 通过给定一个 ID，返回对应的矢量要素。
     * @param {string} featureId - 矢量要素的属性 ID。
     * @returns {FeatureVector} 对应 ID 的要素，如果不存在则返回 null。
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('id', featureId);
    }

    /**
     * @function Theme.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param {string} attrName - 属性的 key 值。
     * @param {string} attrValue - 属性的 value 值。
     * @returns {Array.<FeatureVector>} 一个匹配的要素数组。
     */
    getFeaturesByAttribute(attrName, attrValue) {
        var feature,
            foundFeatures = [];
        for (var id in this.features) {
            feature = this.features[id];
            //feature = this.features[id].clone();
            if (feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    }

    /**
     * @function Theme.prototype.redrawThematicFeatures
     * @description 抽象方法，可实例化子类必须实现此方法。重绘专题要素。
     * @param {Array} extent - 当前级别下计算出的地图范围。
     */
    redrawThematicFeatures(extent) { //eslint-disable-line no-unused-vars
    }

    /**
     * @private
     * @function Theme.prototype.onInternal
     * @description 添加专题要素事件监听。支持的事件包括: click、mousedown、mousemove、mouseout、mouseover、mouseup。
     * @param {string} event - 事件名称。
     * @param {RequestCallback} callback - 事件回调函数。
     */
    onInternal(event, callback) {
        var cb = callback;
        if (!this.renderer) {
            var evn = [];
            evn.push(event);
            evn.push(cb);
            this.TFEvents.push(evn);
        } else {
            this.renderer.on(event, cb);
        }
    }

    /**
     * @function Theme.prototype.fire
     * @description 添加专题要素事件监听。
     * @param {string} type - 事件类型。
     * @param {string} event - 事件名称。
     */
    fire(type, event) {
        if (!this.offset) {
            return;
        }
        event = event.originalEvent;
        var x = this.getX(event);
        var y = this.getY(event);
        var rotation = -this.map.getView().getRotation();
        var center = this.map.getPixelFromCoordinate(this.map.getView().getCenter());
        var scaledP = this.scale([x, y], center, this.pixelRatio);
        var rotatedP = this.rotate(scaledP, rotation, center);
        var resultP = [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        var offsetEvent = document.createEvent('Event');
        offsetEvent.initEvent('pointermove', true, true);
        offsetEvent.offsetX = resultP[0];
        offsetEvent.offsetY = resultP[1];
        offsetEvent.layerX = resultP[0];
        offsetEvent.layerY = resultP[1];
        offsetEvent.clientX = resultP[0];
        offsetEvent.clientY = resultP[1];
        offsetEvent.x = x;
        offsetEvent.y = y;
        if (type === 'click') {
            this.renderer.handler._clickHandler(offsetEvent);
        }
        if (type === 'dblclick') {
            this.renderer.handler._dblclickHandler(offsetEvent);
        }
        if (type === 'onmousewheel') {
            this.renderer.handler._mousewheelHandler(offsetEvent);
        }
        if (type === 'mousemove') {
            this.renderer.handler._mousemoveHandler(offsetEvent);
            this.changed();
        }
        if (type === 'onmouseout') {
            this.renderer.handler._mouseoutHandler(offsetEvent);
        }
        if (type === 'onmousedown') {
            this.renderer.handler._mousedownHandler(offsetEvent);
        }
        if (type === 'onmouseup') {
            this.renderer.handler._mouseupHandler(offsetEvent);
        }

    }

    getX(e) {
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    }

    getY(e) {
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
    }

    /**
     * @function Theme.prototype.un
     * @description 移除专题要素事件监听。
     * @param {string} event - 事件名称。
     * @param {RequestCallback} callback - 事件回调函数。
     */
    un(event, callback) {
        var cb = callback;
        if (!this.renderer) {
            var tfEs = this.TFEvents;
            var len = tfEs.length;
            var newtfEs = [];
            for (var i = 0; i < len; i++) {
                var tfEs_i = tfEs[i];

                if (!(tfEs_i[0] === event && tfEs_i[1] === cb)) {
                    newtfEs.push(tfEs_i)
                }
            }
            this.TFEvents = newtfEs;
        } else {
            this.renderer.un(event, cb);
        }
    }

    /**
     * @function Theme.prototype.addTFEvents
     * @description 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     * @private
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    }

    /**
     * @function Theme.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {Object} coordinate - 坐标位置。
     * @returns {Array.<number>} 长度为 2 的像素坐标数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    getLocalXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof GeometryPoint || coordinate instanceof GeoText) {
            pixelP = map.getPixelFromCoordinate([coordinate.x, coordinate.y]);
        }
        if (coordinate instanceof LonLat) {
            pixelP = map.getPixelFromCoordinate([coordinate.lon, coordinate.lat]);
        }
        var rotation = -map.getView().getRotation();
        var center = map.getPixelFromCoordinate(map.getView().getCenter());
        var rotatedP = pixelP;
        if (this.pixelRatio) {
            rotatedP = this.scale(pixelP, center, this.pixelRatio);
        }
        if (pixelP && center) {
            rotatedP = this.rotate(rotatedP, rotation, center);
        }
        if (this.offset && rotatedP) {
            return [rotatedP[0] + this.offset[0], rotatedP[1] + this.offset[1]];
        }
        return rotatedP;
    }

    /**
     * @function Theme.prototype.rotate
     * @description 获取某像素坐标点 pixelP 绕中心 center 逆时针旋转 rotation 弧度后的像素点坐标。
     * @param {number} pixelP - 像素坐标点位置。
     * @param {number} rotation - 旋转角度。
     * @param {number} center - 中心位置。
     * @returns {Array.<number>} 旋转后的像素坐标数组。
     */
    rotate(pixelP, rotation, center) {
        var x = Math.cos(rotation) * (pixelP[0] - center[0]) - Math.sin(rotation) * (pixelP[1] - center[1]) + center[0];
        var y = Math.sin(rotation) * (pixelP[0] - center[0]) + Math.cos(rotation) * (pixelP[1] - center[1]) + center[1];
        return [x, y];
    }

    /**
     * @function Theme.prototype.scale
     * @description 获取某像素坐标点 pixelP 相对于中心 center 进行缩放 scaleRatio 倍后的像素点坐标。
     * @param {Object} pixelP - 像素点。
     * @param {Object} center - 中心点。
     * @param {number} scaleRatio - 缩放倍数。
     * @returns {Array.<number>} 返回数组型比例。
     */
    scale(pixelP, center, scaleRatio) {
        var x = (pixelP[0] - center[0]) * scaleRatio + center[0];
        var y = (pixelP[1] - center[1]) * scaleRatio + center[1];
        return [x, y];
    }

    /**
     * @function Theme.prototype.toiClientFeature
     * @description 转为 iClient 要素。
     * @param {(Array.<ThemeFeature>|Array.<GeoJSONObject>|Array.<ol.Feature>|ThemeFeature|GeoJSONObject|ol.Feature)} features - 待转要素。
     * @returns {Array.<FeatureVector>} 转换后的 iClient 要素。
     */
    toiClientFeature(features) {
        if (!CommonUtil.isArray(features)) {
            features = [features];
        }

        let featuresTemp = [];
        for (let i = 0; i < features.length; i++) {

            if (features[i] instanceof ThemeFeature) {
                // ThemeFeature 类型
                featuresTemp.push(features[i].toFeature());
                continue;
            } else if (features[i] instanceof Feature) {
                //ol.Feature 数据类型
                //_toFeature 统一处理 ol.Feature 所有 geometry 类型
                featuresTemp.push(this._toFeature(features[i]));
                continue;
            } else if (features[i] instanceof FeatureVector) {
                // 若是 FeatureVector 直接返回
                featuresTemp.push(features[i]);
                continue;
            } else if (features[i].geometry && features[i].geometry.parts) {
                //iServer服务器返回数据格式
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                //GeoJSON 规范数据类型
                const format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else {
                throw new Error(`features[${i}]'s type is not be supported.`);
            }

        }
        return featuresTemp;
    }

    /**
     * @function Theme.prototype.toFeature
     * @deprecated
     * @description 转为 iClient 要素，该方法将被弃用，由 {@link Theme#toiClientFeature} 代替。
     * @param {(Array.<ThemeFeature>|Array.<GeoJSONObject>|Array.<ol.Feature>|ThemeFeature|GeoJSONObject|ol.Feature)} features - 待转要素。
     * @returns {Array.<FeatureVector>} 转换后的 iClient 要素。
     */
    toFeature(features) {
        return this.toiClientFeature(features);
    }

    //统一处理 ol.feature所有 geometry 类型
    _toFeature(feature) {
        let geoFeature = (new GeoJSON()).writeFeature(feature);
        return new GeoJSONFormat().read(geoFeature, "Feature");
    }

}
