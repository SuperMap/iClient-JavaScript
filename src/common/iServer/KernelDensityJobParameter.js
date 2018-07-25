import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {AnalystSizeUnit, AnalystAreaUnit} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.KernelDensityJobParameter
 * @category iServer ProcessingService DensityAnalyst
 * @classdesc 密度分析任务参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasetName - 数据集名。 
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} options.query - 分析范围。 
 * @param {number} [options.resolution=80] - 分辨率。 
 * @param {number} [options.method=0] - 分析方法。 
 * @param {number} [options.meshType=0] - 分析类型。 
 * @param {string} options.fields - 权重索引。 
 * @param {number} [options.radius=300] - 分析的影响半径。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 */
export class KernelDensityJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.KernelDensityJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {SuperMap.Bounds|L.Bounds|ol.extent} SuperMap.KernelDensityJobParameter.prototype.query
         * @description 分析范围。 
         */
        this.query = "";

        /**
         * @member {number} SuperMap.KernelDensityJobParameter.prototype.resolution
         * @description 网格大小。
         */
        this.resolution = 80;

        /**
         * @member {number} SuperMap.KernelDensityJobParameter.prototype.method
         * @description 分析方法。
         */
        this.method = 0;

        /**
         * @member {number} SuperMap.KernelDensityJobParameter.prototype.meshType
         * @description 分析类型。
         */
        this.meshType = 0;

        /**
         * @member {string} SuperMap.KernelDensityJobParameter.prototype.fields
         * @description 权重索引。
         */
        this.fields = "";

        /**
         * @member {number} SuperMap.KernelDensityJobParameter.prototype.radius
         * @description 分析的影响半径。
         */
        this.radius = 300;

        /**
         * @member {SuperMap.AnalystSizeUnit} SuperMap.KernelDensityJobParameter.prototype.meshSizeUnit
         * @description 网格大小单位。
         */
        this.meshSizeUnit = AnalystSizeUnit.METER;

        /**
         * @member {SuperMap.AnalystSizeUnit} SuperMap.KernelDensityJobParameter.prototype.radiusUnit
         * @description 搜索半径单位。
         */
        this.radiusUnit = AnalystSizeUnit.METER;

        /**
         * @member {SuperMap.AnalystAreaUnit} SuperMap.KernelDensityJobParameter.prototype.areaUnit
         * @description 面积单位。
         */
        this.areaUnit = AnalystAreaUnit.SQUAREMILE;

        /**
         * @member {SuperMap.OutputSetting} SuperMap.KernelDensityJobParameter.prototype.output
         * @description 输出参数设置类
         */
        this.output = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.KernelDensityJobParameter";
    }

    /**
     * @function SuperMap.KernelDensityJobParameter.prototype.destroy
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
    }

    /**
     * @function SuperMap.KernelDensityJobParameter.toObject
     * @param {SuperMap.KernelDensityJobParameter} kernelDensityJobParameter - 密度分析任务参数类。
     * @param {SuperMap.KernelDensityJobParameter} tempObj - 密度分析任务参数对象。
     * @description 将密度分析任务参数对象转换为JSON对象。
     * @returns JSON对象。
     */
    static toObject(kernelDensityJobParameter, tempObj) {
        for (var name in kernelDensityJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = kernelDensityJobParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = kernelDensityJobParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            if (name === 'query') {
                tempObj['analyst'][name] = kernelDensityJobParameter[name].toBBOX();
            } else {
                tempObj['analyst'][name] = kernelDensityJobParameter[name];
            }
        }
    }
}
SuperMap.KernelDensityJobParameter = KernelDensityJobParameter;
