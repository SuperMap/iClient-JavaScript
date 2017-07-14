var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
var Graph = require('./theme/graph');
// var Vector = require('../../../common/iServer/ThemeVector');

ol.source.RankSymbol = function (name, symbolType, opt_options) {
    Graph.call(this, name, symbolType, opt_options);
    this.symbolSetting = {};
    this.themeField = null;
    this.symbolType = symbolType;
};
ol.inherits(ol.source.RankSymbol, Graph);

ol.source.RankSymbol.prototype.destroy = function () {
    this.symbolType = null;
    this.symbolSetting = null;
    this.themeField = null;
    SuperMap.Layer.Graph.prototype.destroy.apply(this, arguments);
};

ol.source.RankSymbol.prototype.setSymbolType = function (symbolType) {
    this.symbolType = symbolType;
    this.redraw();
};

ol.source.RankSymbol.prototype.createThematicFeature = function (feature) {
    var thematicFeature;
    // 检查图形创建条件并创建图形
    if (SuperMap.Feature.Theme[this.symbolType] && this.themeField && this.symbolSetting) {
        thematicFeature = new SuperMap.Feature.Theme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
    }
    // thematicFeature 是否创建成功
    if (!thematicFeature) return false;
    // 对专题要素执行图形装载
    thematicFeature.assembleShapes();
    return thematicFeature;
};

ol.source.RankSymbol.prototype.canvasFunctionInternal_ = function (extent, resolution, pixelRatio, size, projection) {
    return Graph.prototype.canvasFunctionInternal_.apply(this, arguments);
};

module.exports = ol.source.RankSymbol;