/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    Util
} from '../commontypes/Util';
import {
    AnalystSizeUnit,
    AnalystAreaUnit
} from '../REST';
import {
    OutputSetting
} from './OutputSetting';
import {
    MappingParameters
} from './MappingParameters';


/**
 * @class KernelDensityJobParameter
 * @deprecatedclass SuperMap.KernelDensityJobParameter
 * @category iServer ProcessingService DensityAnalyst
 * @classdesc 核密度分析服务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {string} options.fields - 权重索引。
 * @param {(Bounds|L.Bounds|ol.extent)} [options.query] - 分析范围（默认为全图范围）。
 * @param {number} [options.resolution=80] - 分辨率。
 * @param {number} [options.method=0] - 分析方法。
 * @param {number} [options.meshType=0] - 分析类型。
 * @param {number} [options.radius=300] - 分析的影响半径。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class KernelDensityJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} KernelDensityJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {Bounds|L.Bounds|ol.extent} [KernelDensityJobParameter.prototype.query]
         * @description 分析范围。
         */
        this.query = "";

        /**
         * @member {number} [KernelDensityJobParameter.prototype.resolution=80]
         * @description 网格大小。
         */
        this.resolution = 80;

        /**
         * @member {number} [KernelDensityJobParameter.prototype.method=0]
         * @description 分析方法。
         */
        this.method = 0;

        /**
         * @member {number} [KernelDensityJobParameter.prototype.meshType=0]
         * @description 分析类型。
         */
        this.meshType = 0;

        /**
         * @member {string} KernelDensityJobParameter.prototype.fields
         * @description 权重索引。
         */
        this.fields = "";

        /**
         * @member {number} [KernelDensityJobParameter.prototype.radius=300]
         * @description 分析的影响半径。
         */
        this.radius = 300;

        /**
         * @member {AnalystSizeUnit} [KernelDensityJobParameter.prototype.meshSizeUnit=AnalystSizeUnit.METER]
         * @description 网格大小单位。
         */
        this.meshSizeUnit = AnalystSizeUnit.METER;

        /**
         * @member {AnalystSizeUnit} [KernelDensityJobParameter.prototype.radiusUnit=AnalystSizeUnit.METER]
         * @description 搜索半径单位。
         */
        this.radiusUnit = AnalystSizeUnit.METER;

        /**
         * @member {AnalystAreaUnit} [KernelDensityJobParameter.prototype.areaUnit=AnalystAreaUnit.SQUAREMILE]
         * @description 面积单位。
         */
        this.areaUnit = AnalystAreaUnit.SQUAREMILE;

        /**
         * @member {OutputSetting} KernelDensityJobParameter.prototype.output
         * @description 输出参数设置类
         */
        this.output = null;

        /**
         * @member {MappingParameters} [KernelDensityJobParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.KernelDensityJobParameter";
    }

    /**
     * @function KernelDensityJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.query = null;
        this.resolution = null;
        this.method = null;
        this.radius = null;
        this.meshType = null;
        this.fields = null;
        this.meshSizeUnit = null;
        this.radiusUnit = null;
        this.areaUnit = null;
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
     * @function KernelDensityJobParameter.toObject
     * @param {KernelDensityJobParameter} kernelDensityJobParameter - 密度分析任务参数类。
     * @param {KernelDensityJobParameter} tempObj - 密度分析任务参数对象。
     * @description 将密度分析任务参数对象转换为 JSON 对象。
     * @returns JSON 对象。
     */
    static toObject(kernelDensityJobParameter, tempObj) {
        for (var name in kernelDensityJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = kernelDensityJobParameter[name];
                continue;
            }
            if (name === "output") {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = kernelDensityJobParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            if (name === 'query' && kernelDensityJobParameter[name]) {
                tempObj['analyst'][name] = kernelDensityJobParameter[name].toBBOX();
            } else {
                tempObj['analyst'][name] = kernelDensityJobParameter[name];
            }
            if (name === 'mappingParameters') {
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = kernelDensityJobParameter[name];
            }
        }
    }
}
