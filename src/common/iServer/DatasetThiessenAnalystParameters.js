import SuperMap from '../SuperMap';
import ThiessenAnalystParameters from './ThiessenAnalystParameters';
/**
 * @class SuperMap.DatasetThiessenAnalystParameters
 * @description 数据集泰森多边形分析参数类
 * @param options - {Object} 可选参数。如:</br>
 *        filterQueryParameter - {SuperMap.FilterParameter} 对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
 * @extends SuperMap.ThiessenAnalystParameters
 */
export default  class DatasetThiessenAnalystParameters extends ThiessenAnalystParameters {

    /**
     * @member SuperMap.DatasetThiessenAnalystParameters.prototype.filterQueryParameter -{SuperMap.FilterParameter}
     * @description 过滤条件，对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
     * @example
     * (start code)
     * filterQueryParameter的使用方法如：
     *  filterQueryParameter = new SuperMap.FilterParameter({
     *   name: "Countries@World",
     *   attributeFilter: "SmID>100"
     *  });
     * (end)
     */
    filterQueryParameter = null;

    /**
     * @member SuperMap.DatasetThiessenAnalystParameters.prototype.dataset -{String}
     * @description 数据集名称待分析的数据集名称，请使用‘datasetName@datasourceName’格式来表示。
     */
    dataset = null;

    /*
     * @function SuperMap.DatasetThiessenAnalystParameters.prototype.constructor
     * @description 数据集泰森多边形分析参数类构造函数。
     * @param options - {Object} 可选参数。如:</br>
     *        filterQueryParameter - {SuperMap.FilterParameter} 对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
     */
    constructor(options) {
        super(options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     *@inheritDoc
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
    }

    static  toObject(datasetThiessenAnalystParameters, tempObj) {
        for (var name in datasetThiessenAnalystParameters) {
            if (name === "clipRegion") {
                tempObj.clipRegion = SuperMap.REST.ServerGeometry.fromGeometry(datasetThiessenAnalystParameters.clipRegion);
            } else {
                tempObj[name] = datasetThiessenAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.DatasetThiessenAnalystParameters"
}

SuperMap.DatasetThiessenAnalystParameters = DatasetThiessenAnalystParameters;
