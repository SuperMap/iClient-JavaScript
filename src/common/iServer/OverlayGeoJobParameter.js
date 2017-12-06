import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.OverlayGeoJobParameter
 * @classdesc 叠加分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetOverlay -{string} 叠加对象所在的数据集名称。 <br>
 *         mode -{string} 叠加分析模式 。 <br>
 */
export class OverlayGeoJobParameter {

    /**
     * @member SuperMap.OverlayGeoJobParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.OverlayGeoJobParameter.prototype.datasetOverlay -{string}
     * @description 叠加对象所在的数据集名称。
     */
    datasetOverlay = "";

    /**
     * @member SuperMap.OverlayGeoJobParameter.prototype.mode -{string}
     * @description 叠加分析模式
     */
    mode = "";

    /**
     * @member SuperMap.OverlayGeoJobParameter.prototype.srcFields -{string}
     * @description 输入数据需要保留的字段
     */
    srcFields = "";

    /**
     * @member SuperMap.OverlayGeoJobParameter.prototype.overlayFields -{string}
     * @description 叠加数据需要保留的字段，对分析模式为clip、update、erase时，此参数无效。
     */
    overlayFields = "";

    constructor(options) {
        if (!options) {
            return;
        }
        Util.extend(this, options);
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
    }

    /**
     * @function SuperMap.OverlayGeoJobParameter.toObject
     * @param OverlayGeoJobParameter - {Object} 点聚合分析任务参数。
     * @param tempObj - {Object} 目标对象。
     * @description 生成点聚合分析任务对象
     */
    static toObject(OverlayGeoJobParameter, tempObj) {
        for (var name in OverlayGeoJobParameter) {
            if (name == "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = OverlayGeoJobParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = OverlayGeoJobParameter[name];
        }
    }

}

SuperMap.OverlayGeoJobParameter = OverlayGeoJobParameter;