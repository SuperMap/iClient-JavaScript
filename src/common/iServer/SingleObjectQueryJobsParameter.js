import SuperMap from '../SuperMap';
import {SpatialQueryMode} from '../REST'

/**
 * @class SuperMap.SingleObjectQueryJobsParameter
 * @classdesc 单对象空间查询分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetQuery -{string} 查询对象所在的数据集名称。 <br>
 *         mode -{{@link SuperMap.SpatialQueryMode}} 空间查询模式 。 <br>
 */
export default  class SingleObjectQueryJobsParameter {

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetQuery -{string}
     * @description 查询对象所在的数据集名称。
     */
    datasetQuery = "";

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.mode -{SuperMap.SpatialQueryMode}
     * @description 空间查询模式 。
     */
    mode = SpatialQueryMode.CONTAIN;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetQuery = null;
        this.mode = null;
    }
    /**
     * @function SuperMap.SingleObjectQueryJobsParameter.toObject
     * @param singleObjectQueryJobsParameter -{Object} 单对象空间查询分析任务参数
     * @param tempObj - {Object} 目标对象
     * @description 生成单对象空间查询分析任务对象
     */
    static toObject(singleObjectQueryJobsParameter, tempObj) {
        for (var name in singleObjectQueryJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = singleObjectQueryJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
        }
    }

}

SuperMap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
