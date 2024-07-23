/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialQueryMode} from '../REST';
import {OutputSetting} from './OutputSetting';
import {MappingParameters} from './MappingParameters';

/**
 * @class SingleObjectQueryJobsParameter
 * @deprecatedclass SuperMap.SingleObjectQueryJobsParameter
 * @category  iServer ProcessingService Query
 * @classdesc 单对象空间查询分析任务参数类。此类用于设置叠加分析的数据集、分析模式、保留字段等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetQuery - 查询对象所在的数据集名称。
 * @param {SpatialQueryMode} [options.mode=SpatialQueryMode.CONTAIN] - 空间查询模式。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class SingleObjectQueryJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SingleObjectQueryJobsParameter.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = "";

        /**
         * @member {string} SingleObjectQueryJobsParameter.prototype.datasetQuery
         * @description 查询对象所在的数据集名称。
         */
        this.datasetQuery = "";

        /**
         * @member {string} SingleObjectQueryJobsParameter.prototype.geometryQuery
         * @description 查询对象所在的几何对象。
         */
        this.geometryQuery = "";

        /**
         * @member {SpatialQueryMode} [SingleObjectQueryJobsParameter.prototype.mode=SpatialQueryMode.CONTAIN]
         * @description 空间查询模式。
         */
        this.mode = SpatialQueryMode.CONTAIN;

        /**
         * @member {OutputSetting} [SingleObjectQueryJobsParameter.prototype.output]
         * @description 输出参数设置类。
         */
        this.output = null;

        /**
         * @member {MappingParameters} [SingleObjectQueryJobsParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SingleObjectQueryJobsParameter";
    }

    /**
     * @function SingleObjectQueryJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetQuery = null;
        this.geometryQuery = null;
        this.mode = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters){
            this.mappingParameters.destroy();
            this.mappingParameters = null;
        }
    }

    /**
     * @function SingleObjectQueryJobsParameter.toObject
     * @param {Object} singleObjectQueryJobsParameter - 单对象空间查询分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成单对象空间查询分析任务对象。
     */
    static toObject(singleObjectQueryJobsParameter, tempObj) {
        for (var name in singleObjectQueryJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = singleObjectQueryJobsParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = singleObjectQueryJobsParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = singleObjectQueryJobsParameter[name];
            }
        }
    }

}

