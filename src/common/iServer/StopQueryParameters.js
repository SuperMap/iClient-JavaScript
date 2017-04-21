/**
 * Class: SuperMap.StopQueryParameters
 * 站点查询参数类。
 */

SuperMap.StopQueryParameters = SuperMap.Class({
    /**
     * APIProperty: keyWord
     * {String} 站点名称关键字。
     */
    keyWord: null,

    /**
     * APIProperty: returnPosition
     * {Boolean} 是否返回站点坐标信息。
     */
    returnPosition: false,

    /**
     * Constructor: SuperMap.StopQueryParameters
     * 站点查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * keyWord - {String} 站点名称关键字。
     * returnPosition - {Boolean} 是否返回站点坐标信息。
     */
    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.Util.reset(this);
    },

    CLASS_NAME: "SuperMap.StopQueryParameters"
});

module.exports = function (options) {
    return new SuperMap.StopQueryParameters(options);
};