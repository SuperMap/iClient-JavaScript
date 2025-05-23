/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
import { LevelRenderer } from '@supermapgis/iclient-common/overlay/levelRenderer/LevelRenderer';
import { ServerFeature } from '@supermapgis/iclient-common/iServer/ServerFeature';
import { GeoText } from '@supermapgis/iclient-common/commontypes/geometry/GeoText';
import { GeoJSON as GeoJSONFormat } from '@supermapgis/iclient-common/format/GeoJSON';
import { Point  } from '@supermapgis/iclient-common/commontypes/geometry/Point';
import { Vector as FeatureVector } from '@supermapgis/iclient-common/commontypes/Vector';
import {
    ThemeFeature
} from './ThemeFeature';
import Attributions from '../../core/Attributions'

/**
 * @class ThemeLayer
 * @classdesc 专题图层基类。地图学中将突出而深入地表示一种或几种要素或现象，即集中表示一个主题内容的地图称为专题地图。
 * 在 SuperMap 中，专题图是地图图层的符号化显示，即用各种图形渲染风格（大小，颜色，线型，填充等）来图形化地表现专题要素的某方面特征。
 * 调用建议：使用其子类实现该类。
 * @category Visualization Theme
 * @extends {L.Layer}
 * @param {string} name - 专题图图层名称。
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @param {boolean} [options.alwaysMapCRS=false] - 要素坐标是否和地图坐标系一致，要素默认是经纬度坐标。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 * @param {Array} [options.TFEvents] - 专题要素事件临时存储。
 * @fires ThemeLayer#featuresremoved
 * @usage
 */
export var ThemeLayer = L.Layer.extend({

    options: {
        //要素坐标是否和地图坐标系一致，默认为false，要素默认是经纬度坐标。
        alwaysMapCRS: false,
        id: CommonUtil.createUniqueID("themeLayer_"),
        opacity: 1,
        // {Array} 专题要素事件临时存储，临时保存图层未添加到 map 前用户添加的事件监听，待图层添加到 map 后把这些事件监听添加到图层上，清空此图层。
        //这是一个二维数组，组成二维数组的每个一维数组长度为 2，分别是 event, callback。
        TFEvents: [],
        attribution: Attributions.Common.attribution
    },

    initialize: function (name, options) {
        L.Util.setOptions(this, options);
        this.name = name;
        this.features = [];
        this.TFEvents = this.options.TFEvents;
        this.levelRenderer = new LevelRenderer();
        this.movingOffset = [0, 0];
    },

    /**
     * @function ThemeLayer.prototype.getEvents
     * @description 获取图层事件。
     * @returns {Object} 返回图层事件。
     */
    getEvents: function () {
        var me = this;
        var events = {
            zoomend: me._reset,
            moveend: me._reset,
            resize: me._resize
        };
        if (this._map._zoomAnimated) {
            events.zoomanim = me._zoomAnim;
        }
        return events;
    },

    /**
     * @function ThemeLayer.prototype.onRemove
     * @description 删除某个地图。
     * @param {L.Map} map - Leaflet Map 对象。
     */
    onRemove: function (map) {
        var me = this;
        L.DomUtil.remove(me.container);
        map.off("mousemove", me.mouseMoveHandler);
    },

    /**
     * @function ThemeLayer.prototype.onAdd
     * @description 添加专题图。
     * @param {L.Map} map - Leaflet Map 对象。
     * @private
     */
    onAdd: function (map) {
        var me = this;


        me.map = me._map = map;
        me._initContainer();
        if (!me.levelRenderer) {
            map.removeLayer(me);
            return;
        }
        //初始化渲染器
        var size = map.getSize();
        me.container.style.width = size.x + "px";
        me.container.style.height = size.y + "px";
        me._updateOpacity();

        me.renderer = me.levelRenderer.init(me.container);
        me.renderer.clear();
        if (me.features && me.features.length > 0) {
            me._reset();
        }

        //处理用户预先（在图层添加到 map 前）监听的事件
        me.addTFEvents();
        me.mouseMoveHandler = function (e) {
            var xy = e.layerPoint;
            me.currentMousePosition = L.point(xy.x + me.movingOffset[0], xy.y + me.movingOffset[1]);
        };
        map.on("mousemove", me.mouseMoveHandler);

        me.update(map.getBounds());
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据。
     * @param {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 待添加要素。
     */
    addFeatures: function (features) { // eslint-disable-line no-unused-vars
        //子类实现此方法
    },

    /**
     * @function ThemeLayer.prototype.redrawThematicFeatures
     * @description 抽象方法，实例化子类前先执行此方法。
     * @param {L.Bounds} bounds - 重绘专题要素范围。
     */
    redrawThematicFeatures: function (bounds) { // eslint-disable-line no-unused-vars
        //子类必须实现此方法
    },

    /**
     * @function ThemeLayer.prototype.destroyFeatures
     * @description 销毁要素。
     * @param {Array.<FeatureVector>|FeatureVector} features - 将被销毁的要素。
     */
    destroyFeatures: function (features) {
        if (features === undefined) {
            features = this.features;
        }
        if (!features) {
            return;
        }
        this.removeFeatures(features);
        if (!Array.isArray(features)) {
          features = [features];
        }
        for (var i = features.length - 1; i >= 0; i--) {
            features[i].destroy();
        }
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除要素。这个函数删除所有传递进来的矢量要素。
     * @param {(Array.<FeatureVector>|FeatureVector|Function)} features - 将被删除的要素或用来过滤的回调函数。
     */
    removeFeatures: function (features) {
        var me = this;
        if (!features) {
            return;
        }
        if (features === me.features) {
            return me.removeAllFeatures();
        }
        if (!L.Util.isArray(features) && !(typeof features === 'function')) {
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
              var findex = L.Util.indexOf(features, feature);
              if (findex === -1) {
                  featuresFailRemoved.push(feature);
              } else {
                me.features.splice(i--, 1);
              }
            }
        }

        var drawFeatures = [];
        for (var hex = 0, len = me.features.length; hex < len; hex++) {
            feature = me.features[hex];
            drawFeatures.push(feature);
        }
        me.features = [];
        me.addFeatures(drawFeatures);
        //绘制专题要素
        if (me.renderer) {
            if (me._map) {
                me.redrawThematicFeatures(me._map.getBounds());
            } else {
                me.redrawThematicFeatures();
            }
        }

        var succeed = featuresFailRemoved.length == 0;
        /**
         * @event ThemeLayer#featuresremoved
         * @description 删除的要素成功之后触发。
         * @property {Array.<FeatureVector>} features - 删除失败的要素数组。
         * @property {boolean} succeed - 要素是否删除成功，true 为删除成功，false 为删除失败。
         */
        me.fire("featuresremoved", {
            features: featuresFailRemoved,
            succeed: succeed
        });
    },

    /**
     * @function ThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        var me = this;
        if (me.renderer) {
            me.renderer.clear();
        }
        me.features = [];
        me.fire("featuresremoved", {
            features: [],
            succeed: true
        });
    },

    /**
     * @function ThemeLayer.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @param {Function} [filter] - 根据条件过滤要素的回调函数。
     * @returns {Array.<FeatureVector>} 返回图层中的要素。
     */
    getFeatures: function (filter) {
        var len = this.features.length;
        var clonedFeatures = [];
        for (var i = 0; i < len; ++i) {
          if (!filter || (filter && typeof filter === 'function' && filter(this.features[i]))) {
            clonedFeatures.push(this.features[i]);
          }
        }
        return clonedFeatures;
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，返回此 feature（并且只返回第一个）。
     * @param {string} property - 要素的某个属性名称。
     * @param {string} value - 对应属性名称的值。
     * @returns {Array.<FeatureVector>} 返回图层中的要素。
     */
    getFeatureBy: function (property, value) {
        var me = this;
        var feature = null;
        for (var id in me.features) {
            if (me.features[id][property] !== value) {
                continue;
            }
            feature = me.features[id];
            break;
        }
        return feature;
    },

    /**
     * @function ThemeLayer.prototype.getFeatureById
     * @description 返回指定 ID 的矢量要素，不存在则返回 null。
     * @param {number} featureId - 要素 ID。
     * @returns {Array.<FeatureVector>} 返回图层中的要素。
     */
    getFeatureById: function (featureId) {
        return this.getFeatureBy('id', featureId);
    },

    /**
     * @function L.supermap.ThemeLayer.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param {string} attrName - 属性的 key 值。
     * @param {string} attrValue - 属性的 value 值。
     * @returns {Array.<FeatureVector>} 返回所有匹配的要素数组。
     */
    getFeaturesByAttribute: function (attrName, attrValue) {
        var me = this,
            feature,
            foundFeatures = [];
        for (var id in me.features) {
            feature = me.features[id];
            if (feature && feature.attributes && (feature.attributes[attrName] === attrValue)) {
                foundFeatures.push(feature);
            }
        }
        return foundFeatures;
    },

    /**
     * @function ThemeLayer.prototype.update
     * @description 更新图层。
     * @param {L.Bounds} bounds - 图层范围。
     */
    update: function (bounds) {
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.container, mapOffset);

        var me = this;
        //  var bounds = me._map.getBounds();
        //  var topLeft = me._map.latLngToLayerPoint(bounds.getNorthWest());
        //  var mapOffset = [parseInt(topLeft.x, 10) || 0, parseInt(topLeft.y, 10) || 0]
        // // var offsetLeft = parseInt(me._map.getContainer().style.left, 10);
        // // offsetLeft = -Math.round(offsetLeft);
        //  //var offsetTop = parseInt(me._map.getContainer().style.top, 10);
        //  //offsetTop = -Math.round(offsetTop);
        //  me.container.style.left = mapOffset[0] + 'px';
        //  me.container.style.top = mapOffset[1] + 'px';

        //绘制专题要素
        if (me.renderer) {
            me.redrawThematicFeatures(bounds);
        }

        if (me.currentMousePosition) {
            me.currentMousePosition = L.point(
                me.currentMousePosition.x - me.movingOffset[0],
                me.currentMousePosition.y - me.movingOffset[1]);
        }
        me.movingOffset = [0, 0];
        me._zoom = me._map.getZoom();
        me._center = me._map.getCenter();
    },

    /**
     * @function ThemeLayer.prototype.setOpacity
     * @description 设置图层的不透明度，取值范围：[0-1]。
     * @param {number} opacity - 不透明度。
     */
    setOpacity: function (opacity) {
        var me = this;
        if (opacity === me.options.opacity) {
            return;
        }
        if (!isNaN(opacity)) {
            me.options.opacity = opacity;
            me._updateOpacity();
        }

    },

    /**
     * @function ThemeLayer.prototype.redraw
     * @description 重绘该图层。
     * @returns {boolean} 返回是否重绘成功。
     */
    redraw: function () {
        var me = this;
        if (!me.renderer) {
            return false;
        }
        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }
        return true;
    },

    /**
     * @function ThemeLayer.prototype.on
     * @description 监听事件。监听专题要素事件。
     * @param {Event} event - 监听事件。
     * @param {function} callback - 回调函数。
     * @param {string} context - 信息。
     */
    on: function (event, callback, context) { // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            L.Layer.prototype.on.call(this, event, callback);
        }
        return this;
    },

    /**
     * @function ThemeLayer.prototype.off
     * @description 移除事件监听。
     * @param {Event} event - 监听事件。
     * @param {function} callback - 回调函数。
     * @param {string} context -  信息。
     */
    off: function (event, callback, context) { // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.un(event, callback);
        } else {
            L.Layer.prototype.off.call(this, event, callback);
        }
        return this;
    },
    fire: function (type, data, propagate) { // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.trigger(type, data);
        }
        L.Layer.prototype.fire.call(this, type, data, propagate);
        return this;
    },

    /**
     * @function ThemeLayer.prototype.addTFEvents
     * @description 先把事件监听添加到图层，再把图层添加到地图。
     * @private
     */
    addTFEvents: function () {
        var me = this;
        var tfEs = me.TFEvents;
        var len = tfEs.length;

        for (var i = 0; i < len; i++) {
            me.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    },

    /**
     * @function ThemeLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {Array} coordinate
     */
    getLocalXY: function (coordinate) {
        if (!this._map) {
            return coordinate;
        }
        var coor = coordinate;
        if (L.Util.isArray(coordinate)) {
            coor = L.point(coordinate[0], coordinate[1]);
        }
        if (!(coordinate instanceof L.Point)) {
            if (coordinate instanceof Point || coordinate instanceof GeoText) {
                coor = L.point(coordinate.x, coordinate.y);
            } else {
                coor = L.point(coordinate.lon, coordinate.lat);
            }

        }
        var point = this._map.latLngToAccurateContainerPoint(!this.options.alwaysMapCRS ? L.latLng(coor.y, coor.x) : this._map.options.crs.unproject(coor));
        return [point.x, point.y];
    },

    /**
     * @function ThemeLayer.prototype.toiClientFeature
     * @description 转为 iClient 要素。
     * @param {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 待转换要素。
     * @returns {Array.<FeatureVector>} 转换后的 iClient 要素。
     */
    toiClientFeature: function (features) {
        //若 features 非数组形式 feature 则先做以下处理：
        if (!CommonUtil.isArray(features)) {
            features = [features];
        }

        let featuresTemp = [];
        for (let i = 0; i < features.length; i++) {
            //themeFeature 数据类型
            if (features[i] instanceof ThemeFeature) {
                featuresTemp.push(features[i].toFeature());
            } else if (features[i] instanceof FeatureVector) {
                // 若是 FeatureVector 类型直接返回
                featuresTemp.push(features[i]);
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                //GeoJSON 规范数据类型
                const format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else if (features[i].geometry && features[i].geometry.parts) {
                //iServer服务器返回数据格式 todo 暂未找到更好的参数判断，暂用 geometry.parts 试用
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else {
                throw new Error(`features[${i}]'s type is not be supported.`);
            }

        }
        return featuresTemp;
    },

    /**
     * @function ThemeLayer.prototype.toFeature
     * @deprecated
     * @description 转为 iClient 要素，该方法将被弃用，由 {@link ThemeLayer#toiClientFeature} 代替。
     * @param {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 待转换要素。
     * @returns {FeatureVector} 转换后的 iClient 要素。
     */
    toFeature: function (features) {
        return this.toiClientFeature(features);
    },

    _initContainer: function () {
        var parentContainer = this.getPane();
        var animated = this._map.options.zoomAnimation && L.Browser.any3d;
        var className = 'themeLayer leaflet-layer leaflet-zoom-' + (animated ? 'animated' : 'hide');
        this.container = L.DomUtil.create("div", className, parentContainer);

        var originProp = L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        this.container.id = this.options.id;
        this.container.style[originProp] = '50% 50%';

        this.container.style.position = "absolute";
        this.container.style.zIndex = 200;
    },


    _zoomAnim: function (e) {
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this.container, offset, scale);

        } else {
            this.container.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    },

    _updateOpacity: function () {
        var me = this;
        CommonUtil.modifyDOMElement(me.container, null, null, null, null, null, null, me.options.opacity);
        if (me._map !== null) {
            /**
             * @event ThemeLayer#changelayer
             * @description 图层属性改变之后触发。
             * @property {Object} layer - 图层。
             * @property {string} property - 图层属性。
             */
            me._map.fire("changelayer", {
                layer: me,
                property: "opacity"
            });
        }
    },

    //缩放移动重绘
    _reset: function () {
        var me = this;
        var latLngBounds = me._map.getBounds();
        me.update(latLngBounds);
        var size = me._map.getSize();
        // var bounds = me._map.getBounds();
        // var topLeft = me._map.latLngToLayerPoint(bounds.getNorthWest());
        // var mapOffset = [parseInt(topLeft.x, 10) || 0, parseInt(topLeft.y, 10) || 0]
        // var offsetLeft = parseInt(me._map.getContainer().style.left, 10);
        // offsetLeft = -Math.round(offsetLeft);
        //var offsetTop = parseInt(me._map.getContainer().style.top, 10);
        //offsetTop = -Math.round(offsetTop);
        //me.container.style.left = mapOffset[0] + 'px';
        //me.container.style.top = mapOffset[1] + 'px';
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.container, mapOffset);


        if (parseFloat(me.container.width) !== parseFloat(size.x)) {
            me.container.width = size.x + 'px';
        }
        if (parseFloat(me.container.height) !== parseFloat(size.y)) {
            me.container.height = size.y + 'px';
        }
        me.redraw();
    },

    //通知渲染器的尺寸变化
    _resize: function () {
        var me = this;
        var newSize = me._map.getSize();
        me.container.style.width = newSize.x + "px";
        me.container.style.height = newSize.y + "px";
        me.renderer.resize();
    }
});
