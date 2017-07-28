/**
 * Class: SuperMap.ServerTheme
 * UGC 专题图图层类。
 *
 * Inherits from:
 *  - <SuperMap.UGCSubLayer>
 */
require('./ThemeLabel');
require('./ThemeUnique');
require('./ThemeGraph');
require('./ThemeDotDensity');
require('./ThemeGraduatedSymbol');
require('./ThemeRange');
require('./UGCSubLayer');
var SuperMap = require('../SuperMap');
SuperMap.ServerTheme = SuperMap.Class(SuperMap.UGCSubLayer, {

    /**
     * @member APIProperty: theme
     * {SuperMap.Theme} 专题图对象。
     */
    theme: null,

    /**
     * @member APIProperty: themeElementPosition
     * {SuperMap.LonLat} 专题图元素位置。
     */
    themeElementPosition: null,

    /**
     * @class SuperMap.ServerTheme UGC 专题图图层类。
     * @constructs SuperMap.ServerTheme
     * UGC 专题图图层类类构造函数。
     * @augments SuperMap.UGCSubLayer
     * Parameters:
     * @param theme - {SuperMap.Theme} 专题图对象。
     * @param themeElementPosition - {SuperMap.LonLat} 专题图元素位置。
     */
    initialize: function (options) {
        options = options || {};
        SuperMap.UGCSubLayer.prototype.initialize.apply(this, [options]);
    },

    /**
     * @inheritdoc
     */
    destroy: function () {
        SuperMap.UGCSubLayer.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /*
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson: function (jsonObject) {
        SuperMap.UGCSubLayer.prototype.fromJson.apply(this, [jsonObject]);
        var themeObj = this.theme;
        var themeT = themeObj && themeObj.type;
        switch (themeT) {
            case 'LABEL':
                this.theme = SuperMap.ThemeLabel.fromObj(themeObj);
                break;
            case 'UNIQUE':
                this.theme = SuperMap.ThemeUnique.fromObj(themeObj);
                break;
            case 'GRAPH':
                this.theme = SuperMap.ThemeGraph.fromObj(themeObj);
                break;
            case 'DOTDENSITY':
                this.theme = SuperMap.ThemeDotDensity.fromObj(themeObj);
                break;
            case 'GRADUATEDSYMBOL':
                this.theme = SuperMap.ThemeGraduatedSymbol.fromObj(themeObj);
                break;
            case 'RANGE':
                this.theme = SuperMap.ThemeRange.fromObj(themeObj);
                break;
            default:
                break;
        }
        if (this.themeElementPosition) {
            //待测试
            this.themeElementPosition = new SuperMap.LonLat(this.themeElementPosition.x, this.themeElementPosition.y);
        }
    },

    /**
     * @function APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        //普通属性直接赋值
        var jsonObject = SuperMap.UGCSubLayer.prototype.toServerJSONObject.apply(this, arguments);

        if (jsonObject.themeElementPosition) {
            if (jsonObject.themeElementPosition.toServerJSONObject) {
                jsonObject.themeElementPosition = jsonObject.themeElementPosition.toServerJSONObject();
            }
        }
        if (jsonObject.theme) {
            if (jsonObject.theme.toServerJSONObject) {
                jsonObject.theme = jsonObject.theme.toServerJSONObject();
            }
        }
        return jsonObject;
    },

    CLASS_NAME: "SuperMap.ServerTheme"
});
module.exports = SuperMap.ServerTheme;
