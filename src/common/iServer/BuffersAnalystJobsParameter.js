import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {AnalystSizeUnit} from '../REST';

/**
 * @class SuperMap.BuffersAnalystJobsParameter
 * @classdesc 缓冲区分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         bounds - {Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
 *         distance -{string} 缓冲距离，或缓冲区半径。 <br>
 *         distanceField -{string} 缓冲区分析距离字段。 <br>
 *         distanceUnit -{{@link SuperMap.AnalystSizeUnit}} 缓冲距离单位单位。 <br>
 *         distance -{string} 缓冲区半径。 <br>
 */
export class BuffersAnalystJobsParameter {


    constructor(options) {
        /**
         * @member SuperMap.BuffersAnalystJobsParameter.prototype.datasetName -{string}
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member SuperMap.BuffersAnalystJobsParameter.prototype.bounds - {Object}
         * @description 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
         */
        this.bounds = "";

        /**
         * @member SuperMap.BuffersAnalystJobsParameter.prototype.distance -{string}
         * @description 缓冲距离，或称为缓冲区半径。当缓冲距离字段位空时，此参数有效。
         */
        this.distance = "";

        /**
         * @member SuperMap.BuffersAnalystJobsParameter.prototype.distanceField -{string}
         * @description 缓冲距离字段，
         */
        this.distanceField = "";

        /**
         * @member SuperMap.BuffersAnalystJobsParameter.prototype.distanceField -{SuperMap.AnalystSizeUnit}
         * @description 缓冲距离单位。
         */
        this.distanceUnit = AnalystSizeUnit.METER;

        /**
         * @member SuperMap.BuffersAnalystJobsParameter.prototype.dissolveField -{string}
         * @description 融合字段，根据字段值对缓冲区结果面对象进行融合。
         */
        this.dissolveField = "";
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
    }

    /**
     * @function SuperMap.BuffersAnalystJobsParameter.toObject
     * @param BuffersAnalystJobsParameter -{Object} 缓冲区分析任务参数
     * @param tempObj - {Object} 目标对象
     * @description 生成缓冲区分析任务对象
     */
    static toObject(BuffersAnalystJobsParameter, tempObj) {
        for (var name in BuffersAnalystJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = BuffersAnalystJobsParameter[name];
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