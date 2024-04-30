/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ClipAnalystMode} from '../REST';
import {OutputSetting} from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class VectorClipJobsParameter
 * @deprecatedclass SuperMap.VectorClipJobsParameter
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析任务参数类。此类用于设置矢量裁剪分析的数据集、裁剪分析模式、裁剪几何对象等参数，
 * 还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetVectorClip - 裁剪对象数据集。
 * @param {ClipAnalystMode} [options.mode=ClipAnalystMode.CLIP] - 裁剪分析模式。
 * @param {string} [options.geometryClip] - 裁剪几何对象。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class VectorClipJobsParameter {

    constructor(options) {
        options = options || {};

        /**
         * @member {string} VectorClipJobsParameter.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = "";

        /**
         * @member {string} VectorClipJobsParameter.prototype.datasetOverlay
         * @description 裁剪对象数据集。
         */
        this.datasetVectorClip = "";

        /**
         * @member {string} VectorClipJobsParameter.prototype.geometryClip
         * @description 裁剪几何对象。
         */
        this.geometryClip = "";

        /**
         * @member {ClipAnalystMode} [VectorClipJobsParameter.prototype.mode=ClipAnalystMode.CLIP]
         * @description 裁剪分析模式。
         */
        this.mode = ClipAnalystMode.CLIP;

        /**
         * @member {OutputSetting} VectorClipJobsParameter.prototype.output
         * @description 输出参数设置类。
         */
        this.output = null;

        /**
         * @member {MappingParameters} [VectorClipJobsParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.VectorClipJobsParameter";
    }

    /**
     * @function VectorClipJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetVectorClip = null;
        this.geometryClip = null;
        this.mode = null;
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
     * @function VectorClipJobsParameter.toObject
     * @param {Object} vectorClipJobsParameter - 矢量裁剪分析服务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 矢量裁剪分析任务对象。
     */
    static toObject(vectorClipJobsParameter, tempObj) {
        for (var name in vectorClipJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = vectorClipJobsParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = vectorClipJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = vectorClipJobsParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = vectorClipJobsParameter[name];
            }
        }
    }

}

