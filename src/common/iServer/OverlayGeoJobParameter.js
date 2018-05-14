import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.OverlayGeoJobParameter
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务参数类
 * @param {Object} options - 参数。<br>
 * @param {string} options.datasetName - 数据集名。<br>
 * @param {string} options.datasetOverlay - 叠加对象所在的数据集名称。<br>
 * @param {string} options.mode - 叠加分析模式。<br>
 * @param {SuperMap.OutputSetting} options.output - 输出参数设置。<br>
 */
export class OverlayGeoJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.OverlayGeoJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {string} SuperMap.OverlayGeoJobParameter.prototype.datasetOverlay
         * @description 叠加对象所在的数据集名称。
         */
        this.datasetOverlay = "";

        /**
         * @member {string} SuperMap.OverlayGeoJobParameter.prototype.mode
         * @description 叠加分析模式
         */
        this.mode = "";

        /**
         * @member {string} SuperMap.OverlayGeoJobParameter.prototype.srcFields
         * @description 输入数据需要保留的字段
         */
        this.srcFields = "";

        /**
         * @member {string} SuperMap.OverlayGeoJobParameter.prototype.overlayFields
         * @description 叠加数据需要保留的字段，对分析模式为clip、update、erase时，此参数无效。
         */
        this.overlayFields = "";

        /**
         * @member {SuperMap.OutputSetting} SuperMap.OverlayGeoJobParameter.prototype.output
         * @description 输出参数设置类
         */
        this.output = null;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.OverlayGeoJobParameter";
    }

    /**
     * @function SuperMap.OverlayGeoJobParameter.destroy
     * @override
     */
    destroy() {
        this.datasetName = null;
        this.datasetOverlay = null;
        this.mode = null;
        this.srcFields = null;
        this.overlayFields = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
    }

    /**
     * @function SuperMap.OverlayGeoJobParameter.toObject
     * @param {Object} OverlayGeoJobParameter - 点聚合分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成点聚合分析任务对象
     */
    static toObject(OverlayGeoJobParameter, tempObj) {
        for (var name in OverlayGeoJobParameter) {
            if (name == "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = OverlayGeoJobParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = OverlayGeoJobParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = OverlayGeoJobParameter[name];
        }
    }

}

SuperMap.OverlayGeoJobParameter = OverlayGeoJobParameter;