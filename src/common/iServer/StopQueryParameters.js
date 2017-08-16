import SuperMap from '../SuperMap';

/**
 * @class SuperMap.StopQueryParameters
 * @classdesc 站点查询参数类。
 * @param options - {Object} 可选参数。
 */
export default  class StopQueryParameters {
    /**
     *  @member SuperMap.StopQueryParameters.prototype.keyWord -{string}
     *  @description 站点名称关键字。
     */
    keyWord = null;

    /**
     * @member SuperMap.StopQueryParameters.prototype.returnPosition -{boolean}
     * @description 是否返回站点坐标信息。
     */
    returnPosition = false;

    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.StopQueryParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        SuperMap.Util.reset(this);
    }

    CLASS_NAME = "SuperMap.StopQueryParameters"
}

SuperMap.StopQueryParameters = StopQueryParameters;