import SuperMap from '../SuperMap';
import ThiessenAnalystParameters from './ThiessenAnalystParameters';
/**
 * Class: SuperMap.DatasetThiessenAnalystParameters
 * 数据集泰森多边形分析参数类
 *
 * Inherits from:
 *  - <SuperMap.ThiessenAnalystParameters>
 */
export default  class DatasetThiessenAnalystParameters extends ThiessenAnalystParameters {

    /**
     * APIProperty: filterQueryParameter
     * {SuperMap.FilterParameter} 过滤条件，
     * 对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
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
     * APIProperty: dataset
     * {String} 数据集名称
     * 待分析的数据集名称，请使用‘datasetName@datasourceName’格式来表示。
     */
    dataset = null;

    /**
     * Constructor: DatasetThiessenAnalystParameters
     * 数据集泰森多边形分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * filterQueryParameter - {SuperMap.FilterParameter} 对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
     */
    constructor(options) {
        super(options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
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
