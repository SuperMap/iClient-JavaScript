import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialQueryMode} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.SingleObjectQueryJobsParameter
 * @category  iServer ProcessingService Query
 * @classdesc 单对象空间查询分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetQuery -{string} 查询对象所在的数据集名称。 <br>
 *         mode -{{@link SuperMap.SpatialQueryMode}} 空间查询模式 。 <br>
 *         output -{SuperMap.OutputSetting} 输出参数设置  <br>
 */
export class SingleObjectQueryJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetName -{string}
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetQuery -{string}
         * @description 查询对象所在的数据集名称。
         */
        this.datasetQuery = "";

        /**
         * @member SuperMap.SingleObjectQueryJobsParameter.prototype.geometryQuery -{string}
         * @description 查询对象所在的几何对象。
         */
        this.geometryQuery = "";

        /**
         * @member SuperMap.SingleObjectQueryJobsParameter.prototype.mode -{SuperMap.SpatialQueryMode}
         * @description 空间查询模式 。
         */
        this.mode = SpatialQueryMode.CONTAIN;

        /**
         * @member SuperMap.SingleObjectQueryJobsParameter.prototype.output -{SuperMap.OutputSetting}
         * @description 输出参数设置类
         */
        this.output = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SingleObjectQueryJobsParameter";
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetQuery = null;
        this.geometryQuery = null;
        this.mode = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
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
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = singleObjectQueryJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
        }
    }

}

SuperMap.SingleObjectQueryJobsParameter = SingleObjectQueryJobsParameter;
