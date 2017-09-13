import '../../../common/style/ThemeStyle';
import '../../../common/overlay/ThemeVector';
import SuperMap from '../../../common/SuperMap';
import {ThemeLayer} from './ThemeLayer';
import {ThemeFeature} from './ThemeFeature';
import ServerFeature from '../../../common/iServer/ServerFeature';
import CommontypesConversion from '../../core/CommontypesConversion';
import L from "leaflet";

/**
 * @function L.supermap.GeoFeatureThemeLayer
 * @classdesc  地理几何专题要素型专题图层基类。此类型专题图的专题要素形状就是由 feature.geometry 决定。此类不建议直接实例化调用。
 * @private
 * @extends L.supermap.ThemeLayer
 * @param name - {string} 专题图名
 * @param options - {Object} 需要设置得参数对象。如：<br>
 *        nodesClipPixel - {number}节点抽稀像素距离，默认值 2。<br>
 *        isHoverAble - {boolean} 图形是否在 hover 时高亮 ，默认值：false。<br>
 *        isMultiHover - {boolean} 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。<br>
 *        isClickAble - {boolean} 图形是否可点击，默认 true。<br>
 *        isAllowFeatureStyle - {boolean} 是否允许 feature 样式（style） 中的有效属性应用到专题图层。
 *                                        默认值为： false，禁止对专题要素使用数据（feature）的 style。
 *                                        此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
 *                                        的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 */
export var GeoFeatureThemeLayer = ThemeLayer.extend({

    options: {

        // {Number} 节点抽稀像素距离，默认值 2。
        nodesClipPixel: 2,

        //{Boolean} 图形是否在 hover 时高亮 ，默认值：false。
        isHoverAble: false,

        //{Boolean} 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。
        isMultiHover: false,

        // {Boolean} 图形是否可点击，默认 true
        isClickAble: true,
        //是否允许 feature 样式（style） 中的有效属性应用到专题图层。
        //默认值为： false，禁止对专题要素使用数据（feature）的 style。
        //此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
        //的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
        isAllowFeatureStyle: false
    },

    initialize: function (name, options) {
        ThemeLayer.prototype.initialize.call(this, name, options);
        L.Util.setOptions(this, options);
        var me = this;
        me.cache = {};
        me.cacheFields = [];
        me.style = {};
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据, 支持的feature类型为:iServer返回的feature json对象 或L.supermap.themeFeature类型
     * @param features - {JSONObject|L.supermap.themeFeature} 待填加的要素
     */
    addFeatures: function (features) {
        //数组
        if (!(L.Util.isArray(features))) {
            features = [features];
        }
        var me = this, event = {features: features};
        me.fire("beforefeaturesadded", event);
        features = event.features;
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            feature = me._createFeature(feature);
            me.features.push(feature);
        }
        var succeed = me.features.length === 0;
        me.fire("featuresadded", {features: me.features, succeed: succeed});

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
     * @function L.supermap.GeoFeatureThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     * @param features - {L.features} 要删除得要素
     */
    removeFeatures: function (features) {
        this.clearCache();
        ThemeLayer.prototype.removeFeatures.call(this, arguments);
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        this.clearCache();
        ThemeLayer.prototype.removeAllFeatures.call(this, arguments);
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param bounds - {L.bounds} 重绘得范围
     */
    redrawThematicFeatures: function (bounds) {
        var me = this;
        //获取高亮专题要素对应的用户 id
        var hoverone = me.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
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
     * @function L.supermap.GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素
     * @param feature - {L.feature} 要创建得要素
     */
    createThematicFeature: function (feature) {
        var me = this;
        var style = me.getStyleByData(feature);
        if (feature.style && me.isAllowFeatureStyle) {
            style = SuperMap.Util.copyAttributesWithClip(feature.style);
        }

        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = me.options.nodesClipPixel;
        options.isHoverAble = me.options.isHoverAble;
        options.isMultiHover = me.options.isMultiHover;
        options.isClickAble = me.options.isClickAble;
        options.highlightStyle = SuperMap.Feature.ShapeFactory.transformStyle(me.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new SuperMap.Feature.Theme.Vector(feature, me, SuperMap.Feature.ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            me.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.redraw
     * @description 重绘该图层
     */
    redraw: function () {
        this.clearCache();
        return ThemeLayer.prototype.redraw.apply(this, arguments);
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.clearCache
     * @description 清除缓存数据。
     */
    clearCache: function () {
        this.cache = {};
        this.cacheFields = [];
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.clear
     * @description 清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear: function () {
        var me = this;
        me.renderer.clearAll();
        me.renderer.refresh();
        me.removeAllFeatures();
        me.clearCache();
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @return {Number} 返回当前缓存数量。
     */
    getCacheCount: function () {
        return this.cacheFields.length;
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @description 设置最大缓存数量。
     * @param cacheCount - {number}最大缓存量。
     */
    setMaxCacheCount: function (cacheCount) {
        if (isNaN(cacheCount)) {
            return;
        }
        this.maxCacheCount = cacheCount;
        this.isCustomSetMaxCacheCount = true;
    },

    /**
     * @function L.supermap.GeoFeatureThemeLayer.prototype.getShapesByFeatureID
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param featureID - {number}要素ID。
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
    },

    _createFeature: function (feature) {
        if (feature instanceof ThemeFeature) {
            feature = feature.toFeature();
        } else if (!(feature instanceof SuperMap.Feature.Vector)) {
            feature = new ServerFeature.fromJson(feature).toFeature();
        }
        if (!feature.hasOwnProperty("attributes") && feature.fieldNames && feature.filedValues) {
            var attrs = {},
                fieldNames = feature.fieldNames,
                filedValues = feature.filedValues;
            for (var i = 0; i < fieldNames.length; i++) {
                attrs[fieldNames[i]] = filedValues[i];
            }
            feature.attributes = attrs;
        }
        return feature;
    }

});
