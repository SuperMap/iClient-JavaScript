import SuperMap from '../SuperMap';
import InterpolationAnalystParameters from './InterpolationAnalystParameters';

/**
 * @class SuperMap.InterpolationDensityAnalystParameters
 * @classdesc 点密度差值分析参数类
 * @param options - {Object} 可选参数。如:</br>
 *        bounds - {SuperMap.Bounds} 插值分析的范围，用于确定结果栅格数据集的范围。</br>
 *        searchRadius - {Number} 查找半径，即参与运算点的查找范围，与点数据集单位相同，默认值为0。</br>
 *        zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型( SuperMap.InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        zValueScale - {Number} 用于进行插值分析值的缩放比率，默认值为1。</br>
 *        resolution - {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。</br>
 *        filterQueryParameter - {SuperMap.FilterParameter} 属性过滤条件。</br>
 *        outputDatasetName - {String} 插值分析结果数据集的名称。必设参数</br>
 *        outputDatasourceName - {String} 插值分析结果数据源的名称。必设参数</br>
 *        pixelFormat - {String} 指定结果栅格数据集存储的像素格式。</br>
 *        dataset - {String} 用来做插值分析的数据源中数据集的名称，该名称用形如"数据集名称@数据源别名"形式来表示。当插值分析类型( SuperMap.InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        inputPoints - {Array <SuperMap.Geometry.Point} 用于做插值分析的离散点集合。当插值分析类型（ SuperMap.InterpolationAnalystType）为 geometry 时，必设参数。</br>
 * @extends SuperMap.InterpolationAnalystParameters
 * @example 例如：
 * (start code)
 * var myInterpolationDensityAnalystParameters = new SuperMap.InterpolationDensityAnalystParameters({
     *      dataset: "SamplesP@Interpolation",
     *      searchRadius: "100000",
     *      pixelFormat: "BIT16",
     *      zValueFieldName: "AVG_TMP",
     *      resolution: 3000,
     *      filterQueryParameter: {
     *          attributeFilter: ""
     *      },
     *      outputDatasetName: "myDensity"
     * });
 * (end)
 */
export default  class InterpolationDensityAnalystParameters extends InterpolationAnalystParameters {


    constructor(options) {
        super(options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.InterpolationDensityAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
    }

    CLASS_NAME = "SuperMap.InterpolationDensityAnalystParameters"
}

SuperMap.InterpolationDensityAnalystParameters = InterpolationDensityAnalystParameters;