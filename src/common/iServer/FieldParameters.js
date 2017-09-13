import SuperMap from '../SuperMap';

/**
 * @class SuperMap.FieldParameters
 * @classdesc 字段信息查询参数类。
 * @param options - {Object} 可选参数。如:<br>
 *         datasource - {string} 数据源名称。<br>
 *         dataset - {string} 数据集名称。
 */
export default class FieldParameters {
    /**
     * @member SuperMap.FieldParameters.prototype.datasource - {string}
     * @description 要查询的数据集所在的数据源名称。
     */
    datasource = null;

    /**
     *  @member SuperMap.FieldParameters.prototype.dataset - {string}
     *  @description 要查询的数据集名称。
     */
    dataset = null;


    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.FieldParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }


    CLASS_NAME = "SuperMap.FieldParameters"
}

SuperMap.FieldParameters = FieldParameters;
