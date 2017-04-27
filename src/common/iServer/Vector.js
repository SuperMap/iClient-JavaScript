/**
 * Class: SuperMap.Vector
 * UGC 矢量图层类。
 *
 * Inherits from:
 *  - <SuperMap.UGCSubLayer>
 */
require('./UGCSubLayer');
var SuperMap = require('../SuperMap');
var ServerStyle = require('./ServerStyle');

SuperMap.Vector = SuperMap.Class(SuperMap.UGCSubLayer, {

    /**
     * APIProperty: style
     * {<SuperMap.ServerStyle>} 矢量图层的风格。
     */
    style: null,

    /**
     * Constructor: SuperMap.Vector
     * UGC 矢量图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * style - {<SuperMap.ServerStyle>} 矢量图层的风格。
     */
    initialize: function (options) {
        options = options || {};
        SuperMap.UGCSubLayer.prototype.initialize.apply(this, [options]);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
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
        var sty = this.style;
        if (sty) {
            this.style = new ServerStyle(sty);
        }
    },

    /**
     * APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        var jsonObject = SuperMap.UGCSubLayer.prototype.toServerJSONObject.apply(this, arguments);
        if (jsonObject.style) {
            if (jsonObject.style.toServerJSONObject) {
                jsonObject.style = jsonObject.style.toServerJSONObject();
            }
        }
        return jsonObject;
    },
    CLASS_NAME: "SuperMap.Vector"
});
module.exports = SuperMap.Vector;
