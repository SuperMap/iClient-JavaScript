import SuperMap from '../SuperMap';
import FilterParameter from './FilterParameter';
import SurfaceAnalystParameters from './SurfaceAnalystParameters';
import DataReturnOption from './DataReturnOption';
import ServerGeometry from './ServerGeometry';

/**
 * @class SuperMap.DatasetSurfaceAnalystParameters
 * @classdesc 数据集表面分析参数类。该类对数据集表面分析所用到的参数进行设置。
 * @param options - {Object} 可选参数。如:</br>
 *        dataset - {string} 要用来做数据集表面分析的数据源中数据集的名称。</br>
 *        filterQueryParameter - {{@link SuperMap.FilterParameter}} 获取或设置查询过滤条件参数。</br>
 *        zValueFieldName - {string} 获取或设置用于提取操作的字段名称。</br>
 *        extractParameter - {{@link SuperMap.SurfaceAnalystParametersSetting}} 表面分析参数设置类。获取或设置表面分析参数。</br>
 *        resolution - {integer} 获取或设置指定中间结果（栅格数据集）的分辨率。</br>
 *        resultSetting - {{@link SuperMap.DataReturnOption}} 结果返回设置类。</br>
 *        surfaceAnalystMethod - {{@link SuperMap.SurfaceAnalystMethod}} 获取或设置表面分析的提取方法，提取等值线和提取等值面。</br>
 * @extends SuperMap.SurfaceAnalystParameters
 */
export default class DatasetSurfaceAnalystParameters extends SurfaceAnalystParameters {
    /**
     * @member SuperMap.DatasetSurfaceAnalystParameters.prototype.dataset -{string}
     * @description 要用来做数据集表面分析的数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：Country@World。必设字段。
     */
    dataset = null;

    /**
     *  @member SuperMap.DatasetSurfaceAnalystParameters.prototype.filterQueryParameter -{SuperMap.FilterParameter}
     *  @description 获取或设置查询过滤条件参数。
     */
    filterQueryParameter = null;

    /**
     * @member SuperMap.DatasetSurfaceAnalystParameters.prototype.zValueFieldName -{string}
     * @description 获取或设置用于提取操作的字段名称。
     * 提取等值线时，将使用该字段中的值，对点记录集中的点数据进行插值分析，得到栅格数据集（中间结果），接着从栅格数据集提取等值线。
     */
    zValueFieldName = null;


    constructor(options) {
        super(options);
        var me = this;
        me.filterQueryParameter = new FilterParameter();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.DatasetSurfaceAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.dataset = null;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
        me.zValueFieldName = null;
    }

    /**
     * @function SuperMap.DatasetSurfaceAnalystParameters.toObject
     * @param datasetSurfaceAnalystParameters -{SuperMap.DatasetSurfaceAnalystParameters} 数据集表面分析参数类。
     * @param tempObj - {SuperMap.DatasetSurfaceAnalystParameters} 数据集表面分析参数对象。
     * @description 将数据集表面分析参数对象转换为JSON对象。
     * @return JSON对象。
     */
    static toObject(datasetSurfaceAnalystParameters, tempObj) {
        for (var name in datasetSurfaceAnalystParameters) {
            if (name === "filterQueryParameter") {
                tempObj.filterQueryParameter = datasetSurfaceAnalystParameters.filterQueryParameter;
            }
            if (name === "extractParameter") {
                if (datasetSurfaceAnalystParameters.extractParameter.clipRegion instanceof SuperMap.Geometry && datasetSurfaceAnalystParameters.extractParameter.clipRegion.components) {
                    datasetSurfaceAnalystParameters.extractParameter.clipRegion = ServerGeometry.fromGeometry(datasetSurfaceAnalystParameters.extractParameter.clipRegion);
                }
                tempObj.extractParameter = datasetSurfaceAnalystParameters.extractParameter;
            }
            else if (name === "dataset") {
            }
            else if (name === "surfaceAnalystMethod") {
            }
            else {
                tempObj[name] = datasetSurfaceAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.DatasetSurfaceAnalystParameters"
}

SuperMap.DatasetSurfaceAnalystParameters = DatasetSurfaceAnalystParameters;