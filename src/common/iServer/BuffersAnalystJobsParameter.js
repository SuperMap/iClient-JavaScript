import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {AnalystSizeUnit} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.BuffersAnalystJobsParameter
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析任务参数类。
 * @param {Object} options - 参数。   
 * @param {string} options.datasetName - 数据集名。   
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} options.bounds - 分析范围。   
 * @param {string} [options.distance='15'] - 缓冲距离，或缓冲区半径。   
 * @param {string} [options.distanceField='pickup_latitude'] - 缓冲区分析距离字段。   
 * @param {SuperMap.AnalystSizeUnit} [options.distanceUnit=SuperMap.AnalystSizeUnit.METER] - 缓冲距离单位单位。   
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。   
 */
export class BuffersAnalystJobsParameter {


    constructor(options) {
        /**
         * @member {string} SuperMap.BuffersAnalystJobsParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.BuffersAnalystJobsParameter.prototype.bounds
         * @description 分析范围。 
         */
        this.bounds = "";

        /**
         * @member {string} [SuperMap.BuffersAnalystJobsParameter.prototype.distance='15']
         * @description 缓冲距离，或称为缓冲区半径。当缓冲距离字段位空时，此参数有效。
         */
        this.distance = "";

        /**
         * @member {string} [SuperMap.BuffersAnalystJobsParameter.prototype.distanceField='pickup_latitude']
         * @description 缓冲距离字段。
         */
        this.distanceField = "";

        /**
         * @member {SuperMap.AnalystSizeUnit} [SuperMap.BuffersAnalystJobsParameter.prototype.distanceUnit=SuperMap.AnalystSizeUnit.METER]
         * @description 缓冲距离单位。
         */
        this.distanceUnit = AnalystSizeUnit.METER;

        /**
         * @member {string} SuperMap.BuffersAnalystJobsParameter.prototype.dissolveField
         * @description 融合字段，根据字段值对缓冲区结果面对象进行融合。
         */
        this.dissolveField = "";

        /**
         * @member {SuperMap.OutputSetting} [SuperMap.BuffersAnalystJobsParameter.prototype.output]
         * @description 输出参数设置类。
         */
        this.output = null;

        if (!options) {
            return this;
        }
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.BuffersAnalystJobsParameter";
    }

    /**
     * @function SuperMap.BuffersAnalystJobsParameter.prototype.destroy
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
    }

    /**
     * @function SuperMap.BuffersAnalystJobsParameter.toObject
     * @param {SuperMap.BuffersAnalystJobsParameter} BuffersAnalystJobsParameter - 缓冲区分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成缓冲区分析任务对象。
     */
    static toObject(BuffersAnalystJobsParameter, tempObj) {
        for (var name in BuffersAnalystJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = BuffersAnalystJobsParameter[name];
                continue;
            }
            if (name === "output") {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = BuffersAnalystJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            if (name === 'bounds') {
                tempObj['analyst'][name] = BuffersAnalystJobsParameter[name].toBBOX();
            } else {
                tempObj['analyst'][name] = BuffersAnalystJobsParameter[name];
            }
        }
    }

}

SuperMap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;