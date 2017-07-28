/**
 * @class SuperMap.GeoDecodingParameter
 * @constructs SuperMap.GeoDecodingParameter
 * @classdesc
 * 地理反向匹配参数类。
 * @api
 */
var SuperMap = require('../SuperMap');
SuperMap.GeoDecodingParameter = SuperMap.Class({

    /**
     * APIProperty : x
     * {number} 查询位置的横坐标。
     */
    x: null,

    /**
     * APIProperty: y
     * {number} 查询位置的纵坐标。
     */
    y: null,

    /**
     * APIProperty: fromIndex
     * {number} 设置返回对象的起始索引值。
     */
    fromIndex: null,

    /**
     * APIProperty: toIndex
     * {number} 设置返回对象的结束索引值。
     */
    toIndex: null,

    /**
     * APIProperty: filters
     * {Array} 过滤字段，限定查询区域。
     */
    filters: null,

    /**
     * APIProperty: prjCoordSys
     * {String} 查询结果的坐标系。
     */
    prjCoordSys: null,

    /**
     * APIProperty: maxReturn
     * {number} 最大返回结果数。
     */
    maxReturn: null,

    /**
     * APIProperty: geoDecodingRadius
     * {number} 查询半径。
     */
    geoDecodingRadius: null,

    /**
     *
     * @method SuperMap.GeoDecodingParameter.initialize
     * @param options - {Object} 参数。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        if (options.filters) {
            var strs = [];
            var fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
            })
            options.filters = strs;
        }
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        this.x = null;
        this.y = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
        this.geoDecodingRadius = null;
    }

});

module.exports = SuperMap.GeoDecodingParameter;