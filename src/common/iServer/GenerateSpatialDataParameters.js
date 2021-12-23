/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    SuperMap
} from '../SuperMap';
import {
    Util
} from '../commontypes/Util';
import './DataReturnOption';

/**
 * @class SuperMap.GenerateSpatialDataParameters
 * @category iServer SpatialAnalyst GenerateSpatialData
 * @classdesc 动态分段操作参数类。通过该类可以为动态分段提供参数信息。
 * @param {Object} options - 参数。 
 * @param {string} options.routeTable - 路由数据集。 
 * @param {string} options.routeIDField - 路由数据集的标识字段。 
 * @param {string} options.eventTable - 用于生成空间数据的事件表名。 
 * @param {SuperMap.DataReturnOption} options.dataReturnOption - 设置数据返回选项。
 * @param {string} [options.attributeFilter] - 属性过滤条件。 
 * @param {string} options.eventRouteIDField - 用于生成空间数据的事件表的路由标识字段。 
 * @param {string} [options.measureField] - 用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义。
 * @param {string} [options.measureStartField] - 用于生成空间数据的事件表的起始刻度字段，只有当事件为线事件的时候该属性才有意义。 
 * @param {string} [options.measureEndField] - 用于生成空间数据的事件表的终止刻度字段，只有当事件为线事件的时候该属性才有意义。 
 * @param {string} [options.measureOffsetField] - 刻度偏移量字段。 
 * @param {string} [options.errorInfoField] - 错误信息字段，直接写入原事件表，用于描述事件未能生成对应的点或线时的错误信息。 
 * @param {Array.<string>} [options.retainedFields] - 欲保留到结果空间数据中的字段集合（系统字段除外）。 
 */
export class GenerateSpatialDataParameters {


    constructor(options) {
        /**
         * @member {string} SuperMap.GenerateSpatialDataParameters.prototype.routeTable
         * @description 路由数据集。
         */
        this.routeTable = null;

        /**
         * @member {string} SuperMap.GenerateSpatialDataParameters.prototype.routeIDField
         * @description 路由数据集的标识字段。
         */
        this.routeIDField = null;
        /**
         * @member {string} [SuperMap.GenerateSpatialDataParameters.prototype.attributeFilter]
         * @description 属性过滤条件。
         * 当 {@link SuperMap.GenerateSpatialDataParameters.prototype.dataReturnOption.dataReturnMode}  为 {@link DataReturnMode.DATASET_AND_RECORDSET} 或 {@link DataReturnMode.RECORDSET_ONLY} 时有效。
         */
        this.attributeFilter = null;
        /**
         * @member {string} SuperMap.GenerateSpatialDataParameters.prototype.eventTable
         * @description 用于生成空间数据的事件表名。
         */
        this.eventTable = null;

        /**
         * @member {string} SuperMap.GenerateSpatialDataParameters.prototype.eventRouteIDField
         * @description 用于生成空间数据的事件表的路由标识字段。
         */
        this.eventRouteIDField = null;

        /**
         * @member {string} [SuperMap.GenerateSpatialDataParameters.prototype.measureField]
         * @description 用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义
         */
        this.measureField = null;

        /**
         * @member {string} [SuperMap.GenerateSpatialDataParameters.prototype.measureStartField]
         * @description 用于生成空间数据的事件表的起始刻度字段，只有当事件为线事件的时候该属性才有意义。
         */
        this.measureStartField = null;

        /**
         * @member {string} [SuperMap.GenerateSpatialDataParameters.prototype.measureEndField]
         * @description 用于生成空间数据的事件表的终止刻度字段，只有当事件为线事件的时候该属性才有意义。
         */
        this.measureEndField = null;

        /**
         * @member {string} [SuperMap.GenerateSpatialDataParameters.prototype.measureOffsetField]
         * @description 刻度偏移量字段。
         */
        this.measureOffsetField = null;

        /**
         * @member {string} [SuperMap.GenerateSpatialDataParameters.prototype.errorInfoField]
         * @description 错误信息字段，直接写入原事件表，用于描述事件未能生成对应的点或线时的错误信息。
         */
        this.errorInfoField = null;

        /**
         * @member {Array.<string>} [SuperMap.GenerateSpatialDataParameters.prototype.retainedFields]
         * @description 欲保留到结果空间数据中的字段集合（系统字段除外）。
         * 生成空间数据时，无论是否指定保留字段，路由 ID 字段、刻度偏移量字段、刻度值字段（点事件为刻度字段，线事件是起始和终止刻度字段）都会保留到结果空间数据中；
         * 如果没有指定 retainedFields 参数或者 retainedFields 参数数组长度为 0，则返回所有用户字段。
         */
        this.retainedFields = null;

        /**
         * @member {SuperMap.DataReturnOption} SuperMap.GenerateSpatialDataParameters.prototype.dataReturnOption
         * @description 设置数据返回的选项。
         */
        this.dataReturnOption = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GenerateSpatialDataParameters";
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
        me.attributeFilter = null;
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


}

SuperMap.GenerateSpatialDataParameters = GenerateSpatialDataParameters;