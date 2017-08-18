import SuperMap from '../SuperMap';
/**
 * @class SuperMap.FieldStatisticsParameters
 * @classdesc 字段统计信息查询参数类。
 * @param options - {Object} 参数。如：<br>
 *        fieldName - {string} 字段名。<br>
 *        statisticMode -{String<SuperMap.StatisticMode>}|{Array<String<SuperMap.StatisticMode>>} 字段统计方法类型。
 */
export default  class FieldStatisticsParameters {
    /**
     * @member SuperMap.FieldStatisticsParameters.prototype.fieldName -{string}
     * @description 字段名
     */
    fieldName = null;

    /**
     * @member SuperMap.FieldStatisticsParameters.prototype.statisticMode -{string<SuperMap.StatisticMode>}|{Array<string{SuperMap.StatisticMode}>}
     * @description 字段统计方法类型
     */
    statisticMode = null;

    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.FieldStatisticsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.fieldName = null;
        me.statisticMode = null;
    }


    CLASS_NAME = "SuperMap.FieldStatisticsParameters"
}

SuperMap.FieldStatisticsParameters = FieldStatisticsParameters;
