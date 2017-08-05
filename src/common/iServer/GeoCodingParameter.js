import SuperMap from '../SuperMap';
/*
 * Class: SuperMap.GeoCodingParameter
 * 地理正向匹配参数类。
 */

/**
 * @class SuperMap.GeoCodingParameter
 * @constructs SuperMap.GeoCodingParameter
 * @classdesc
 * 地理正向匹配参数类。
 * @api
 */

export default  class GeoCodingParameter {

    /**
     * APIProperty: address
     * {String} 地点关键词。
     */
    address = null;

    /**
     * APIProperty: fromIndex
     * {number} 设置返回对象的起始索引值。
     */
    fromIndex = null;

    /**
     * APIProperty: toIndex
     * {number} 设置返回对象的结束索引值。
     */
    toIndex = null;

    /**
     * APIProperty: filters
     * {Array} 过滤字段，限定查询区域。
     */
    filters = null;

    /**
     * APIProperty: filters
     * String 查询结果的坐标系。
     */
    prjCoordSys = null;

    /**
     * APIProperty: maxReturn
     * String 最大返回结果数。
     */
    maxReturn = null;

    /**
     * @method SuperMap.GeoCodingParameter.initialize
     * @param options - {Object} 参数。
     */
    constructor(options) {
        if (!options) {
            return;
        }
        if (options.filters) {
            let strs = [];
            let fields = options.filters.split(',');
            fields.map(function (field) {
                strs.push("\"" + field + "\"");
            });
            options.filters = strs;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.address = null;
        this.fromIndex = null;
        this.toIndex = null;
        this.filters = null;
        this.prjCoordSys = null;
        this.maxReturn = null;
    }

}
SuperMap.GeoCodingParameter = GeoCodingParameter;