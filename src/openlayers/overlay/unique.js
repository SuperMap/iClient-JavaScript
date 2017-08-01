var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
var GeoFeature = require('./theme/geoFeature');
var Vector = require('../../common/iServer/ThemeVector');

ol.source.Unique = function (name, opt_options) {
    GeoFeature.call(this, name, opt_options);
    this.themeField = null;
    this.style = new Object();
    this.styleGroups = new Array();
};
ol.inherits(ol.source.Unique, GeoFeature);

ol.source.Unique.prototype.destroy = function () {
    this.style = null;
    this.themeField = null;
    this.styleGroups = null;
    GeoFeature.prototype.destroy.apply(this, arguments);
};

ol.source.Unique.prototype.addFeatures = function (features) {
    //数组
    if (!(SuperMap.Util.isArray(features))) {
        features = [features];
    }
    var event = {features: features};
    this.dispatchEvent({type: 'beforefeaturesadded', value: event});
    features = event.features;
    var featuresFailAdded = [];
    for (var i = 0, len = features.length; i < len; i++) {
        this.features.push(this.toiClientFeature(features[i]));
    }
    var succeed = featuresFailAdded.length == 0 ? true : false;
    this.dispatchEvent({type: 'featuresadded', value: {features: featuresFailAdded, succeed: succeed}});
    if (!this.isCustomSetMaxCacheCount) {
        this.maxCacheCount = this.features.length * 5;
    }
    //绘制专题要素
    if (this.renderer) {
        this.redrawThematicFeatures(this.map.getView().calculateExtent());
    }
};

ol.source.Unique.prototype.createThematicFeature = function (feature) {
    var style = this.getStyleByData(feature);
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

ol.source.Unique.prototype.getStyleByData = function (fea) {
    var style = {};
    var feature = fea;
    style = SuperMap.Util.copyAttributesWithClip(style, this.style);
    if (this.themeField && this.styleGroups && this.styleGroups.length > 0 && feature.attributes) {
        var tf = this.themeField;
        var Attrs = feature.attributes;
        var Gro = this.styleGroups;
        var isSfInAttrs = false; //指定的 themeField 是否是 feature 的属性字段之一
        var attr = null; //属性值
        for (var property in Attrs) {
            if (tf === property) {
                isSfInAttrs = true;
                attr = Attrs[property];
                break;
            }
        }
        //判断属性值是否属于styleGroups的某一个范围，以便对获取分组 style
        if (isSfInAttrs) {
            for (var i = 0, len = Gro.length; i < len; i++) {
                if ((attr).toString() === ( Gro[i].value).toString()) {
                    //feature.style = SuperMap.Util.copyAttributes(feature.style, this.defaultStyle);
                    var sty1 = Gro[i].style;
                    style = SuperMap.Util.copyAttributesWithClip(style, sty1);
                }
            }
        }
    }
    if (feature.style && this.isAllowFeatureStyle === true) {
        style = SuperMap.Util.copyAttributesWithClip(feature.style);
    }
    return style;
};

ol.source.Unique.prototype.canvasFunctionInternal_ = function (extent, resolution, pixelRatio, size, projection) {
    return GeoFeature.prototype.canvasFunctionInternal_.apply(this, arguments);
};

module.exports = ol.source.Unique;