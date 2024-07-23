/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import { ShapeFactory } from '@supermapgis/iclient-common/overlay/feature/ShapeFactory';
 import { ThemeVector } from '@supermapgis/iclient-common/overlay/ThemeVector';
 import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
 import { ThemeLayer } from './ThemeLayer';
 import { CommontypesConversion } from '../../core/CommontypesConversion';
/**
 * @class GeoFeatureThemeLayer
 * @classdesc  地理几何专题要素型专题图层基类。此类型专题图的专题要素形状就是由 feature.geometry 决定。此类不建议直接实例化调用。
 * @category Visualization Theme
 * @extends ThemeLayer
 * @category Visualization Graphic
 * @param {string} name - 专题图名称。
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @param {boolean} [options.alwaysMapCRS=false] - 要素坐标是否和地图坐标系一致，要素默认是经纬度坐标。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 * @param {Array} [options.TFEvents] - 专题要素事件临时存储。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] -  图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {boolean} [options.isAllowFeatureStyle=false] -  是否允许 feature 样式（style）中的有效属性应用到专题图层。
 *                                        禁止对专题要素使用数据（feature）的 style。
 *                                        此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature）对应专题要素赋予独立 style。
 * @fires GeoFeatureThemeLayer#beforefeaturesadded
 * @usage
 */
export var GeoFeatureThemeLayer = ThemeLayer.extend({

    options: {

        // {number} 节点抽稀像素距离，默认值 2。
        nodesClipPixel: 2,

        //{boolean} 图形是否在 hover 时高亮 ，默认值：false。
        isHoverAble: false,

        //{boolean} 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。
        isMultiHover: false,

        // {boolean} 图形是否可点击，默认 true
        isClickAble: true,
        //是否允许 feature 样式（style）中的有效属性应用到专题图层。
        //默认值为： false，禁止对专题要素使用数据（feature）的 style。
        //此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
        //的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature）对应专题要素赋予独立 style。
        isAllowFeatureStyle: false
    },

    initialize: function (name, options) {
        ThemeLayer.prototype.initialize.call(this, name, options);
        L.Util.setOptions(this, options);
        var me = this;
        me.cache = {};
        me.cacheFields = [];
        me.style = {};
        me.highlightStyle = {};
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.addFeatures
     * @description 添加数据。
     * @param {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 待添加的要素。
     */
    addFeatures: function (features) {
        var me = this;

        /**
         * @event GeoFeatureThemeLayer#beforefeaturesadded
         * @description 添加数据之前触发。
         * @property {(Array.<ServerFeature>|Array.<ThemeFeature>|Array.<GeoJSONObject>|ServerFeature|ThemeFeature|GeoJSONObject)} features - 要素。
         */
        me.fire("beforefeaturesadded", {features: features});

        //转换 features 形式
        this.features = this.toiClientFeature(features);

        if (!me.isCustomSetMaxCacheCount) {
            me.maxCacheCount = me.features.length * 5;
        }

        if (!me.renderer) {
            return;
        }
        //绘制专题要素
        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.removeFeatures
     * @description 删除专题图中要素。参数中的要素数组中的每一项，必须是已经添加到当前图层中的要素。
     * @param {(Array.<FeatureVector>|FeatureVector|Function)} features - 要删除的要素或用于条件删除的回调函数。
     */
    removeFeatures: function (features) { // eslint-disable-line no-unused-vars
        this.clearCache();
        ThemeLayer.prototype.removeFeatures.call(this, features);
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        this.clearCache();
        ThemeLayer.prototype.removeAllFeatures.call(this, arguments);
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param {L.Bounds} bounds - 重绘的范围。
     */
    redrawThematicFeatures: function (bounds) {
        var me = this;
        //获取高亮专题要素对应的用户 id
        var hoverone = me.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
        }
        if (this.options.alwaysMapCRS && bounds && bounds instanceof L.LatLngBounds) {
            var crs = this._map.options.crs;
            bounds = L.bounds(crs.project(bounds.getSouthWest()), crs.project(bounds.getNorthEast()));
        }
        bounds = CommontypesConversion.toSuperMapBounds(bounds);
        //清除当前所有可视元素
        me.renderer.clearAll();

        var features = me.features;
        var cache = me.cache;
        var cacheFields = me.cacheFields;
        var cmZoom = me._map.getZoom();

        var maxCC = me.maxCacheCount;

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            var feaBounds = feature.geometry.getBounds();

            //剔除当前视图（地理）范围以外的数据
            if (bounds && !bounds.intersectsBounds(feaBounds)) {
                continue;
            }

            //缓存字段
            var fields = feature.id + "_zoom_" + cmZoom.toString();
            if (cache[fields]) {
                cache[fields].updateAndAddShapes();
                continue;
            }

            var thematicFeature = me.createThematicFeature(features[i]);
            //检查 thematicFeature 是否有可视化图形
            if (thematicFeature.getShapesCount() < 1) {
                continue;
            }
            //加入缓存
            cache[fields] = thematicFeature;
            cacheFields.push(fields);
            //缓存数量限制
            if (cacheFields.length > maxCC) {
                var fieldsTemp = cacheFields[0];
                cacheFields.splice(0, 1);
                delete cache[fieldsTemp];
            }
        }

        me.renderer.render();

        //地图漫游后，重新高亮图形
        if (hoverFid && me.options.isHoverAble && me.options.isMultiHover) {
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param {FeatureVector} feature - 要创建的要素。
     * @returns {Array.<FeatureVector>} 返回矢量要素。
     */
    createThematicFeature: function (feature) {
        var me = this;
        var style = me.getStyleByData(feature);
        if (feature.style && me.isAllowFeatureStyle) {
            style = CommonUtil.copyAttributesWithClip(feature.style);
        }

        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = me.options.nodesClipPixel;
        options.isHoverAble = me.options.isHoverAble;
        options.isMultiHover = me.options.isMultiHover;
        options.isClickAble = me.options.isClickAble;
        options.highlightStyle = ShapeFactory.transformStyle(me.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new ThemeVector(feature, me, ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            me.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.redraw
     * @description 重绘该图层。
     */
    redraw: function () {
        this.clearCache();
        return ThemeLayer.prototype.redraw.apply(this, arguments);
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.clearCache
     * @description 清除缓存数据。
     */
    clearCache: function () {
        this.cache = {};
        this.cacheFields = [];
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.clear
     * @description 清除的内容包括数据（features）、专题要素、缓存。
     */
    clear: function () {
        var me = this;
        me.renderer.clearAll();
        me.renderer.refresh();
        me.removeAllFeatures();
        me.clearCache();
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @returns {number} 返回当前缓存数量。
     */
    getCacheCount: function () {
        return this.cacheFields.length;
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @description 设置最大缓存数量。
     * @param {number} cacheCount - 最大缓存量。
     */
    setMaxCacheCount: function (cacheCount) {
        if (isNaN(cacheCount)) {
            return;
        }
        this.maxCacheCount = cacheCount;
        this.isCustomSetMaxCacheCount = true;
    },

    /**
     * @function GeoFeatureThemeLayer.prototype.getShapesByFeatureID
     * @description 通过要素 ID 获取要素关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param {number} featureID - 要素 ID。
     * @returns {Array} 返回图形数组。
     */
    getShapesByFeatureID: function (featureID) {
        var me = this,
            list = [],
            shapeList = me.renderer.getAllShapes();

        if (!featureID) {
            return shapeList
        }

        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    }

});
