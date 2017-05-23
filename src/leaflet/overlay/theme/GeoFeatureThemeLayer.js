/**
 * Class: GeoFeatureThemeLayer
 * 地理几何专题要素型专题图层基类。此类型专题图的专题要素形状就是由 feature.geometry 决定。
 *
 * 此类不可实例化。
 *
 * Inherits from:
 *  - <ThemeLayer>
 */

require('../../../common/style/ThemeStyle');
require('../../../common/iServer/ThemeVector');
var SuperMap = require('../../../common/SuperMap');
var ThemeLayer = require('./ThemeLayer');
var L = require("leaflet");

var GeoFeatureThemeLayer = ThemeLayer.extend({
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

    //向专题图图层中添加数据 , 专题图仅接收 SuperMap.Feature.Vector 类型数据，
    //feature 将储存于 features 属性中，其存储形式为数组。
    // 向专题图图层中添加数据 , 专题图仅接收 <iServer返回的feature json对象> 类型数据，
    addFeatures: function (features) {
        //数组
        if (!(L.Util.isArray(features))) {
            features = [features];
        }
        var me = this;
        var event = {features: features};
        me.fire("beforefeaturesadded", event);
        features = event.features;
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            feature = new SuperMap.REST.ServerFeature.fromJson(feature).toFeature();
            me.features.push(feature);
        }
        var succeed = me.features.length == 0;
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

    //从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
    //参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
    removeFeatures: function (features) {
        this.clearCache();
        ThemeLayer.prototype.removeFeatures.call(this, arguments);
    },

    // 清除当前图层所有的矢量要素。
    removeAllFeatures: function () {
        this.clearCache();
        ThemeLayer.prototype.removeAllFeatures.call(this, arguments);
    },

    //重绘所有专题要素。
    //此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
    //地图漫游时调用此方法进行图层刷新。
    redrawThematicFeatures: function (bounds) {
        var me = this;
        //获取高亮专题要素对应的用户 id
        var hoverone = me.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
        }
        if (bounds instanceof L.LatLngBounds) {
            bounds = new SuperMap.Bounds(
                bounds.getWest(),
                bounds.getSouth(),
                bounds.getEast(),
                bounds.getNorth()
            );
        }
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

    //创建专题要素
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


    //重绘该图层
    redraw: function () {
        this.clearCache();
        return ThemeLayer.prototype.redraw.apply(this, arguments);
    },

    //清除缓存数据。
    clearCache: function () {
        this.cache = {};
        this.cacheFields = [];
    },

    //清除的内容包括数据（features） 、专题要素、缓存。
    clear: function () {
        var me = this;
        me.renderer.clearAll();
        me.renderer.refresh();
        me.removeAllFeatures();
        me.clearCache();
    },

    // 获取当前缓存数量。
    getCacheCount: function () {
        return this.cacheFields.length;
    },

    //设置最大缓存数量。
    setMaxCacheCount: function (cacheCount) {
        if (isNaN(cacheCount)) {
            return;
        }
        this.maxCacheCount = cacheCount;
        this.isCustomSetMaxCacheCount = true;
    },

    //通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
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

module.exports = GeoFeatureThemeLayer;