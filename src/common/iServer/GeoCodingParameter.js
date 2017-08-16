import SuperMap from '../SuperMap';
/**
 * @class SuperMap.GeoCodingParameter
 * @classdesc 地理正向匹配参数类。
 * @param options - {Object} 参数。
 */
export default  class GeoCodingParameter {

    /**
     * @member SuperMap.GeoCodingParameter.prototype.address -{string}
     * @description 地点关键词。
     */
    address = null;

    /**
     * @member SuperMap.GeoCodingParameter.prototype.fromIndex -{number}
     * @description 设置返回对象的起始索引值。
     */
    fromIndex = null;

    /**
     * @member SuperMap.GeoCodingParameter.prototype.toIndex -{number}
     * @description 设置返回对象的结束索引值。
     */
    toIndex = null;

    /**
     * @member SuperMap.GeoCodingParameter.prototype.filters -{Array}
     * @description 过滤字段，限定查询区域。
     */
    filters = null;

    /**
     * @member SuperMap.GeoCodingParameter.prototype.prjCoordSys -{string}
     * @description  查询结果的坐标系。
     */
    prjCoordSys = null;

    /**
     * @member SuperMap.GeoCodingParameter.prototype.maxReturn -{string}
     * @description 最大返回结果数。
     */
    maxReturn = null;


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
     * @function SuperMap.GeoCodingParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
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