var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../../common/SuperMap');
var Theme = require('./theme');
var Vector = require('../../../common/iServer/ThemeVector');
var ThemeFeature = require('./themeFeature');

ol.source.GeoFeature = function (name, opt_options) {
    Theme.call(this, name, opt_options);
    this.cache = new Object();
    this.cacheFields = [];
    this.style = new Object();
    this.maxCacheCount = 0;
    this.isCustomSetMaxCacheCount = false;
    this.nodesClipPixel = 2;
    this.isHoverAble = false;
    this.isMultiHover = false;
    this.isClickAble = true;
    this.highlightStyle = null;
    this.isAllowFeatureStyle = false;
};
ol.inherits(ol.source.GeoFeature, Theme);

ol.source.GeoFeature.prototype.destroy = function () {
    this.maxCacheCount = null;
    this.isCustomSetMaxCacheCount = null;
    this.nodesClipPixel = null;
    this.isHoverAble = null;
    this.isMultiHover = null;
    this.isClickAble = null;
    this.cache = null;
    this.cacheFields = null;
    this.style = null;
    this.highlightStyle = null;
    this.isAllowFeatureStyle = null;
};

ol.source.GeoFeature.prototype.addFeatures = function (features) {
    //数组
    if (!(SuperMap.Util.isArray(features))) {
        features = [features];
    }
    var event = {features: features};
    this.dispatchEvent(new ol.Collection.Event('beforefeaturesadded', event));

    features = event.features;
    var featuresFailAdded = [];
    for (var i = 0, len = features.length; i < len; i++) {
        this.features.push(this.toiClientFeature(features[i]));
    }
    var succeed = featuresFailAdded.length == 0 ? true : false;
    this.dispatchEvent(new ol.Collection.Event('featuresadded', {features: featuresFailAdded, succeed: succeed}));
    if (!this.isCustomSetMaxCacheCount) {
        this.maxCacheCount = this.features.length * 5;
    }
    //绘制专题要素
    if (this.renderer) {
        this.redrawThematicFeatures(this.map.getView().calculateExtent());
    }
};

ol.source.GeoFeature.prototype.removeFeatures = function (features) {
    this.clearCache();
    Theme.prototype.removeFeatures.apply(this, arguments);
};

ol.source.GeoFeature.prototype.removeAllFeatures = function () {
    this.clearCache();
    Theme.prototype.removeAllFeatures.apply(this, arguments);
};

ol.source.GeoFeature.prototype.redrawThematicFeatures = function (extent) {
    //获取高亮专题要素对应的用户 id
    var hoverone = this.renderer.getHoverOne();
    var hoverFid = null;
    if (hoverone && hoverone.refDataID) {
        hoverFid = hoverone.refDataID;
    }
    //清除当前所有可视元素
    this.renderer.clearAll();

    var features = this.features;
    var cache = this.cache;
    var cacheFields = this.cacheFields;
    var cmZoom = this.map.getView().getZoom();

    var maxCC = this.maxCacheCount;

    for (var i = 0, len = features.length; i < len; i++) {
        var feature = features[i];
        var feaBounds = feature.geometry.getBounds();

        //剔除当前视图（地理）范围以外的数据
        if (extent) {
            var bounds = new SuperMap.Bounds(extent[0], extent[1], extent[2], extent[3]);
            if (!bounds.intersectsBounds(feaBounds)) continue;
        }

        //缓存字段
        var fields = feature.id + "_zoom_" + cmZoom.toString();

        var thematicFeature;

        //判断专题要素缓存是否存在
        if (cache[fields]) {
            cache[fields].updateAndAddShapes();
        }
        else {
            //如果专题要素缓存不存在，创建专题要素
            thematicFeature = this.createThematicFeature(features[i]);

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

    }
    this.renderer.render();

    //地图漫游后，重新高亮图形
    if (hoverFid && this.isHoverAble && this.isMultiHover) {
        var hShapes = this.getShapesByFeatureID(hoverFid);
        this.renderer.updateHoverShapes(hShapes);
    }
};

ol.source.GeoFeature.prototype.createThematicFeature = function (feature) {
    var style = SuperMap.Util.copyAttributesWithClip(this.style);
    if (feature.style && this.isAllowFeatureStyle === true) {
        style = SuperMap.Util.copyAttributesWithClip(feature.style);
    }
    //创建专题要素时的可选参数
    var options = {};
    options.nodesClipPixel = this.nodesClipPixel;
    options.isHoverAble = this.isHoverAble;
    options.isMultiHover = this.isMultiHover;
    options.isClickAble = this.isClickAble;
    options.highlightStyle = SuperMap.Feature.ShapeFactory.transformStyle(this.highlightStyle);
    //将数据转为专题要素（Vector）
    var thematicFeature = new Vector(feature, this, SuperMap.Feature.ShapeFactory.transformStyle(style), options);
    //直接添加图形到渲染器
    for (var m = 0; m < thematicFeature.shapes.length; m++) {
        this.renderer.addShape(thematicFeature.shapes[m]);
    }
    return thematicFeature;
};

ol.source.GeoFeature.prototype.canvasFunctionInternal_ = function (extent, resolution, pixelRatio, size, projection) {
    return Theme.prototype.canvasFunctionInternal_.apply(this, arguments);
};

ol.source.GeoFeature.prototype.clearCache = function () {
    this.cache = {};
    this.cacheFields = [];
};

ol.source.GeoFeature.prototype.clear = function () {
    this.renderer.clearAll();
    this.renderer.refresh();
    this.removeAllFeatures();
    this.clearCache();
};

ol.source.GeoFeature.prototype.getCacheCount = function () {
    return this.cacheFields.length;
};

ol.source.GeoFeature.prototype.setMaxCacheCount = function (cacheCount) {
    if (!isNaN(cacheCount)) {
        this.maxCacheCount = cacheCount;
        this.isCustomSetMaxCacheCount = true;
    }
};

ol.source.GeoFeature.prototype.getShapesByFeatureID = function (featureID) {
    var list = [];
    var shapeList = this.renderer.getAllShapes();
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
};

module.exports = ol.source.GeoFeature;