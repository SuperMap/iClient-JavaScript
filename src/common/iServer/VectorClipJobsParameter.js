import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ClipAnalystMode} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.VectorClipJobsParameter
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetOverlay -{string} 裁剪对象数据集。 <br>
 *         mode -{{@link SuperMap.ClipAnalystMode}} 裁剪分析模式 。 <br>
 *         output -{SuperMap.OutputSetting} 输出参数设置  <br>
 */
export class VectorClipJobsParameter {

    constructor(options) {
        options = options || {};

        /**
         * @member SuperMap.VectorClipJobsParameter.prototype.datasetName -{string}
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member SuperMap.VectorClipJobsParameter.prototype.datasetOverlay -{string}
         * @description 裁剪对象数据集。
         */
        this.datasetVectorClip = "";

        /**
         * @member SuperMap.VectorClipJobsParameter.prototype.geometryClip -{string}
         * @description 裁剪几何对象。
         */
        this.geometryClip = "";

        /**
         * @member SuperMap.VectorClipJobsParameter.prototype.mode -{SuperMap.ClipAnalystMode}
         * @description 裁剪分析模式 。
         */
        this.mode = ClipAnalystMode.CLIP;

        /**
         * @member SuperMap.VectorClipJobsParameter.prototype.output -{SuperMap.OutputSetting}
         * @description 输出参数设置类
         */
        this.output = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.VectorClipJobsParameter";
    }

    /**
     * @function SuperMap.VectorClipJobsParameter.prototype.destroy
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
    }

    /**
     * @function SuperMap.VectorClipJobsParameter.toObject
     * @param vectorClipJobsParameter -{Object} 区域汇总分析服务参数
     * @param tempObj - {Object} 目标对象。
     * @description 矢量裁剪分析任务对象
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
        }
    }

}

SuperMap.VectorClipJobsParameter = VectorClipJobsParameter;
