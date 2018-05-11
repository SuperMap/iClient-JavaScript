import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ThiessenAnalystParameters} from './ThiessenAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.DatasetThiessenAnalystParameters
 * @category iServer SpatialAnalyst ThiessenAnalyst
 * @classdesc 数据集泰森多边形分析参数类。
 * @param {Object} options - 参数。</br>
 * @param {SuperMap.FilterParameter} [options.filterQueryParameter=null] - 对待分析数据集中的点进行过滤，即对数据集中的所有点进行分析。
 * @extends {SuperMap.ThiessenAnalystParameters}
 */
export class DatasetThiessenAnalystParameters extends ThiessenAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {SuperMap.FilterParameter} [SuperMap.DatasetThiessenAnalystParameters.prototype.filterQueryParameter=null]
         * @description 过滤条件，对待分析数据集中的点进行过滤，即对数据集中的所有点进行分析。
         * @example
         *  var filterQueryParameter = new SuperMap.FilterParameter({
         *   name: "Countries@World",
         *   attributeFilter: "SmID>100"
         *  });
         */
        this.filterQueryParameter = null;

        /**
         * @member {string} SuperMap.DatasetThiessenAnalystParameters.prototype.dataset
         * @description 数据集名称待分析的数据集名称，请使用"datasetName@datasourceName"格式来表示。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }


        this.CLASS_NAME = "SuperMap.DatasetThiessenAnalystParameters";
    }

    /**
     * @function SuperMap.DatasetThiessenAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
    }

    /**
     * @function SuperMap.DatasetThiessenAnalystParameters.toObject
     * @param {SuperMap.DatasetThiessenAnalystParameters} datasetThiessenAnalystParameters - 泰森多边形分析服务参数类。
     * @param {SuperMap.DatasetThiessenAnalystParameters} tempObj - 泰森多边形分析服务参数对象。
     * @description 将泰森多边形分析服务参数对象转换为JSON对象。
     * @returns JSON对象。
     */
    static toObject(datasetThiessenAnalystParameters, tempObj) {
        for (var name in datasetThiessenAnalystParameters) {
            if (name === "clipRegion") {
                tempObj.clipRegion = ServerGeometry.fromGeometry(datasetThiessenAnalystParameters.clipRegion);
            } else {
                tempObj[name] = datasetThiessenAnalystParameters[name];
            }
        }
    }

}

SuperMap.DatasetThiessenAnalystParameters = DatasetThiessenAnalystParameters;
