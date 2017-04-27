/**
 * Class: SuperMap.Image
 * UGC 影像图层类。
 *
 * Inherits from:
 *  - <SuperMap.UGCSubLayer>
 */
require('../REST');
require('./UGCSubLayer');
var SuperMap = require('../SuperMap');
var ServerColor = require('./ServerColor');
SuperMap.Image = SuperMap.Class(SuperMap.UGCSubLayer, {

    /**
     * APIProperty: brightness
     * {Integer} 影像图层的亮度。
     */
    brightness: null,

    /**
     * APIProperty: colorSpaceType
     * {<SuperMap.ColorSpaceType>} 返回影像图层的色彩显示模式。
     */
    colorSpaceType: null,

    /**
     * APIProperty: contrast
     * {Integer} 影像图层的对比度。
     */
    contrast: null,

    /**
     * APIProperty: displayBandIndexes
     * {Array(Integer)} 返回当前影像图层显示的波段索引。
     */
    displayBandIndexes: null,

    /**
     * APIProperty: transparent
     * {Boolean} 是否背景透明。
     */
    transparent: null,

    /**
     * APIProperty: transparentColor
     * {<SuperMap.ServerColor>} 返回背景透明色。
     */
    transparentColor: null,

    /**
     * APIProperty: transparentColorTolerance
     * {Integer} 背景透明色容限。
     */
    transparentColorTolerance: null,

    /**
     * Constructor: SuperMap.Image
     * UGC 影像图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * colorSpaceType - {<SuperMap.ColorSpaceType>} 返回影像图层的色彩显示模式。
     * brightness - {Integer} 影像图层的亮度。
     * displayBandIndexes - {Array(Integer)} 返回当前影像图层显示的波段索引。
     * contrast - {Integer} 影像图层的对比度。
     * transparent - {Boolean} 是否背景透明。
     * transparentColor - {<SuperMap.ServerColor>} 返回背景透明色。
     * transparentColorTolerance - {Integer} 背景透明色容限。
     */

    initialize: function (options) {
        options = options || {};
        SuperMap.UGCSubLayer.prototype.initialize.apply(this, [options]);
    },

    destroy: function () {
        SuperMap.UGCSubLayer.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson: function (jsonObject) {
        SuperMap.UGCSubLayer.prototype.fromJson.apply(this, [jsonObject]);
        if (this.transparentColor) {
            this.transparentColor = new ServerColor(this.transparentColor.red,
                this.transparentColor.green,
                this.transparentColor.blue);
        }
    },

    /**
     * APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        return SuperMap.UGCSubLayer.prototype.toServerJSONObject.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.Image"
});
module.exports = SuperMap.Image;
