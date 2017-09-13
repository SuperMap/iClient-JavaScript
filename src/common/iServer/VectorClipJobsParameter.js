import SuperMap from '../SuperMap';
import {ClipAnalystMode} from '../REST';

/**
 * @class SuperMap.VectorClipJobsParameter
 * @classdesc 矢量裁剪分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetOverlay -{string} 裁剪对象数据集。 <br>
 *         mode -{{@link SuperMap.ClipAnalystMode}} 裁剪分析模式 。 <br>
 */
export default class VectorClipJobsParameter {

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetOverlay -{string}
     * @description 裁剪对象数据集。
     */
    datasetOverlay = "";

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.mode -{SuperMap.ClipAnalystMode}
     * @description 裁剪分析模式 。
     */
    mode = ClipAnalystMode.CLIP;

    constructor(options) {
        options = options || {};
        if (options.mode && typeof options.mode === "string") {
            options.mode = options.mode.toLowerCase();
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.VectorClipJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetOverlay = null;
        this.mode = null;
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
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = vectorClipJobsParameter[name];
        }
    }

    CLASS_NAME = "SuperMap.VectorClipJobsParameter"
}

SuperMap.VectorClipJobsParameter = VectorClipJobsParameter;
