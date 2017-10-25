import SuperMap from '../SuperMap';
import './DataReturnOption';

/**
 * @class SuperMap.GenerateSpatialDataParameters
 * @classdesc 动态分段操作参数类。通过该类可以为动态分段提供参数信息。
 * @param options - {Object} 可选参数。如:</br>
 *        routeTable - {string} 路由数据集。</br>
 *        routeIDField - {string} 路由数据集的标识字段。</br>
 *        eventTable - {string} 用于生成空间数据的事件表名。</br>
 *        eventRouteIDField - {string} 用于生成空间数据的事件表的路由标识字段。</br>
 *        measureField - {string} 用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义</br>
 *        measureStartField - {string} 用于生成空间数据的事件表的起始刻度字段，只有当事件为线事件的时候该属性才有意义。</br>
 *        measureEndField - {string} 用于生成空间数据的事件表的终止刻度字段，只有当事件为线事件的时候该属性才有意义。</br>
 *        measureOffsetField - {string} 刻度偏移量字段。</br>
 *        errorInfoField - {string} 错误信息字段，直接写入原事件表，用于描述事件未能生成对应的点或线时的错误信息。</br>
 *        retainedFields - {Array<string>} 欲保留到结果空间数据中的字段集合（系统字段除外）。</br>
 *        dataReturnOption - {@link SuperMap.DataReturnOption} 设置数据返回的最大记录。
 */
export default  class GenerateSpatialDataParameters {

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.routeTable - {string}
     * @description 路由数据集。
     */
    routeTable = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.routeIDField - {string}
     * @description 路由数据集的标识字段。
     */
    routeIDField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.eventTable - {string}
     * @description 用于生成空间数据的事件表名。
     */
    eventTable = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.eventRouteIDField - {string}
     * @description 用于生成空间数据的事件表的路由标识字段。
     */
    eventRouteIDField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.measureField -{string}
     * @description 用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义
     */
    measureField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.measureStartField - {string}
     * @description 用于生成空间数据的事件表的起始刻度字段，只有当事件为线事件的时候该属性才有意义。
     */
    measureStartField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.measureEndField - {string}
     * @description 用于生成空间数据的事件表的终止刻度字段，只有当事件为线事件的时候该属性才有意义。
     */
    measureEndField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.measureOffsetField - {string}
     * @description 刻度偏移量字段。
     */
    measureOffsetField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.errorInfoField - {string}
     * @description 错误信息字段，直接写入原事件表，用于描述事件未能生成对应的点或线时的错误信息。
     */
    errorInfoField = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.retainedFields - {Array<string>}
     * @description 欲保留到结果空间数据中的字段集合（系统字段除外）。
     * 生成空间数据时，无论是否指定保留字段，路由 ID 字段、刻度偏移量字段、刻度值字段（点事件为刻度字段，线事件是起始和终止刻度字段）都会保留到结果空间数据中；
     * 如果没有指定 retainedFields 参数或者retainedFields 参数数组长度为0，则返回所有用户字段。
     */
    retainedFields = null;

    /**
     * @member SuperMap.GenerateSpatialDataParameters.prototype.dataReturnOption - {SuperMap.DataReturnOption}
     * @description 设置数据返回的选项。
     */
    dataReturnOption = null;

    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /**
     * @function SuperMap.GenerateSpatialDataParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.routeTable) {
            me.routeTable = null;
        }
        me.routeIDField = null;
        me.eventTable = null;
        me.eventRouteIDField = null;
        me.measureField = null;
        me.measureStartField = null;
        me.measureEndField = null;
        me.measureOffsetField = null;
        me.errorInfoField = null;
        if (me.dataReturnOption) {
            me.dataReturnOption.destroy();
            me.dataReturnOption = null;
        }
    }


    CLASS_NAME = "SuperMap.GenerateSpatialDataParameters"
}

SuperMap.GenerateSpatialDataParameters = GenerateSpatialDataParameters;