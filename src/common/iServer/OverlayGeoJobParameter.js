/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { OutputSetting } from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class OverlayGeoJobParameter
 * @deprecatedclass SuperMap.OverlayGeoJobParameter
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {string} options.datasetOverlay - 叠加对象所在的数据集名称。
 * @param {string} options.srcFields - 输入数据需要保留的字段。
 * @param {string} [options.overlayFields] - 叠加数据需要保留的字段。对分析模式为 clip、update、erase 时，此参数无效。
 * @param {string} [options.mode] - 叠加分析模式。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class OverlayGeoJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} OverlayGeoJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {string} OverlayGeoJobParameter.prototype.datasetOverlay
         * @description 叠加对象所在的数据集名称。
         */
        this.datasetOverlay = "";

        /**
         * @member {string} [OverlayGeoJobParameter.prototype.mode]
         * @description 叠加分析模式。
         */
        this.mode = "";

        /**
         * @member {string} OverlayGeoJobParameter.prototype.srcFields
         * @description 输入数据需要保留的字段。
         */
        this.srcFields = "";

        /**
         * @member {string} OverlayGeoJobParameter.prototype.overlayFields
         * @description 叠加数据需要保留的字段，对分析模式为 clip、update、erase 时，此参数无效。
         */
        this.overlayFields = "";

        /**
         * @member {OutputSetting} [OverlayGeoJobParameter.prototype.output]
         * @description 输出参数设置类。
         */
        this.output = null;

        /**
        * @member {MappingParameters} [OverlayGeoJobParameter.prototype.mappingParameters]
        * @description 分析后结果可视化的参数类。
        */
        this.mappingParameters = null;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.OverlayGeoJobParameter";
    }

    /**
     * @function OverlayGeoJobParameter.prototype.destroy
     * @description 释放资源，将资源的属性置空。
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
        if (this.mappingParameters instanceof MappingParameters) {
            this.mappingParameters.destroy();
            this.mappingParameters = null;
        }
    }

    /**
     * @function OverlayGeoJobParameter.toObject
     * @param {Object} OverlayGeoJobParameter - 点聚合分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成点聚合分析任务对象。
     */
    static toObject(OverlayGeoJobParameter, tempObj) {
        for (var name in OverlayGeoJobParameter) {
            if (name == "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = OverlayGeoJobParameter[name];
                continue;
            }
            if (name === "output") {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = OverlayGeoJobParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = OverlayGeoJobParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = OverlayGeoJobParameter[name];
            }
        }
    }

}
