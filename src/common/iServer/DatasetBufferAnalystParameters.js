/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {BufferAnalystParameters} from './BufferAnalystParameters';
import {DataReturnOption} from './DataReturnOption';
import {FilterParameter} from './FilterParameter';

/**
 * @class DatasetBufferAnalystParameters
 * @deprecatedclass SuperMap.DatasetBufferAnalystParameters
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 数据集缓冲区分析参数类。通过该类可以指定要做缓冲区分析的数据集、数据集中几何对象的过滤条件、缓冲区通用设置等参数。
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 用于做缓冲区分析的数据源中数据集的名称。该名称用形如“数据集名称@数据源别名”形式来表示。
 * @param {FilterParameter} [options.filterQueryParameter] - 设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析。
 * @param {DataReturnOption} [options.resultSetting] - 结果返回设置类。
 * @param {boolean} [options.isAttributeRetained=true] - 是否保留进行缓冲区分析的对象的字段属性。当 isUnion 字段为 false 时该字段有效。
 * @param {boolean} [options.isUnion=false] - 是否将缓冲区与源记录集中的对象合并后返回。对于面对象而言，要求源数据集中的面对象不相交。
 * @param {BufferSetting} [options.bufferSetting] - 设置缓冲区通用参数。
 *
 * @extends {BufferAnalystParameters}
 * @usage
 */
export class DatasetBufferAnalystParameters extends BufferAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {string} DatasetBufferAnalystParameters.prototype.dataset
         * @description 用于做缓冲区分析的数据源中数据集的名称。该名称用形如“数据集名称@数据源别名”形式来表示。
         */
        this.dataset = null;

        /**
         *  @member {FilterParameter} [DatasetBufferAnalystParameters.prototype.filterQueryParameter]
         *  @description 设置数据集中几何对象的过滤条件。只有满足此条件的几何对象才参与缓冲区分析。
         */
        this.filterQueryParameter = new FilterParameter();

        /**
         * @member {DataReturnOption} [DatasetBufferAnalystParameters.prototype.resultSetting]
         * @description 结果返回设置类。
         */
        this.resultSetting = new DataReturnOption();

        /**
         * @member {boolean} [DatasetBufferAnalystParameters.prototype.isAttributeRetained=true]
         * @description 是否保留进行缓冲区分析的对象的字段属性。当 isUnion 字段为 false 时该字段有效。
         */
        this.isAttributeRetained = true;

        /**
         * @member {boolean} [DatasetBufferAnalystParameters.prototype.isUnion=false]
         * @description 是否将缓冲区与源记录集中的对象合并后返回。对于面对象而言，要求源数据集中的面对象不相交。
         */
        this.isUnion = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.DatasetBufferAnalystParameters";
    }


    /**
     * @function DatasetBufferAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.dataset = null;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
        me.isAttributeRetained = null;
        me.isUnion = null;
    }

    /**
     * @function DatasetBufferAnalystParameters.toObject
     * @param {DatasetBufferAnalystParameters} datasetBufferAnalystParameters - 数据集缓冲区分析参数类。
     * @param {DatasetBufferAnalystParameters} tempObj - 数据集缓冲区分析参数对象。
     * @description 将数据集缓冲区分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    static toObject(datasetBufferAnalystParameters, tempObj) {
        for (var name in datasetBufferAnalystParameters) {
            if (name === "bufferSetting") {
                datasetBufferAnalystParameters.bufferSetting.radiusUnit = datasetBufferAnalystParameters.bufferSetting.radiusUnit.toUpperCase();
                tempObj.bufferAnalystParameter = datasetBufferAnalystParameters.bufferSetting;
            } else if (name === "resultSetting") {
                tempObj.dataReturnOption = datasetBufferAnalystParameters.resultSetting;
            } else if (name === "dataset") {
                continue;
            } else {
                tempObj[name] = datasetBufferAnalystParameters[name];
            }
        }
    }

}

