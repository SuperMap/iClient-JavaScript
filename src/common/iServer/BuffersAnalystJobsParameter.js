/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { AnalystSizeUnit } from '../REST';
import { OutputSetting } from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class BuffersAnalystJobsParameter
 * @deprecatedclass SuperMap.BuffersAnalystJobsParameter
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析任务参数类。此类用于设置缓冲区分析的数据集、分析范围、缓冲字段、缓冲距离、距离单位等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} [options.bounds] - 分析范围（默认为全图范围）。
 * @param {string} [options.distance='15'] - 缓冲距离，或缓冲区半径。
 * @param {string} [options.distanceField='pickup_latitude'] - 缓冲区分析距离字段。
 * @param {AnalystSizeUnit} [options.distanceUnit=AnalystSizeUnit.METER] - 缓冲距离单位单位。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class BuffersAnalystJobsParameter {
    constructor(options) {
        /**
         * @member {string} BuffersAnalystJobsParameter.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = '';

        /**
         * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} BuffersAnalystJobsParameter.prototype.bounds
         * @description 分析范围。
         */
        this.bounds = '';

        /**
         * @member {string} [BuffersAnalystJobsParameter.prototype.distance='15']
         * @description 缓冲距离，或称为缓冲区半径。当缓冲距离字段为空时，此参数有效。
         */
        this.distance = '';

        /**
         * @member {string} [BuffersAnalystJobsParameter.prototype.distanceField='pickup_latitude']
         * @description 缓冲距离字段。
         */
        this.distanceField = '';

        /**
         * @member {AnalystSizeUnit} [BuffersAnalystJobsParameter.prototype.distanceUnit=AnalystSizeUnit.METER]
         * @description 缓冲距离单位。
         */
        this.distanceUnit = AnalystSizeUnit.METER;

        /**
         * @member {string} BuffersAnalystJobsParameter.prototype.dissolveField
         * @description 融合字段，根据字段值对缓冲区结果面对象进行融合。
         */
        this.dissolveField = '';

        /**
         * @member {OutputSetting} [BuffersAnalystJobsParameter.prototype.output]
         * @description 输出参数设置类。
         */
        this.output = null;

        /**
         * @member {MappingParameters} [BuffersAnalystJobsParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        if (!options) {
            return this;
        }
        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.BuffersAnalystJobsParameter';
    }

    /**
     * @function BuffersAnalystJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.bounds = null;
        this.distance = null;
        this.distanceField = null;
        this.distanceUnit = null;
        this.dissolveField = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters) {
            this.mappingParameters.destroy();
            this.mappingParameters = null;
        }
    }

    /**
     * @function BuffersAnalystJobsParameter.toObject
     * @param {BuffersAnalystJobsParameter} BuffersAnalystJobsParameter - 缓冲区分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成缓冲区分析任务对象。
     */
    static toObject(BuffersAnalystJobsParameter, tempObj) {
        for (var name in BuffersAnalystJobsParameter) {
            if (name === 'datasetName') {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = BuffersAnalystJobsParameter[name];
                continue;
            }
            if (name === 'output') {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = BuffersAnalystJobsParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            if (name === 'bounds' && BuffersAnalystJobsParameter[name]) {
                tempObj['analyst'][name] = BuffersAnalystJobsParameter[name].toBBOX();
            } else {
                tempObj['analyst'][name] = BuffersAnalystJobsParameter[name];
            }
            if (name === 'mappingParameters') {
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = BuffersAnalystJobsParameter[name];
            }
        }
    }
}

