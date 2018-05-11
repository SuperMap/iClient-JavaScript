import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class SuperMap.InterpolationDensityAnalystParameters
 * @category iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 点密度差值分析参数类。
 * @param {Object} options - 参数。</br>
 *        {(SuperMap.Bounds|L.Bounds|ol.extent)} options.bounds - 插值分析的范围，用于确定结果栅格数据集的范围。</br>
 *        {number} [options.searchRadius=0] - 查找半径，即参与运算点的查找范围，与点数据集单位相同。</br>
 *        {string} options.zValueFieldName - 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型( SuperMap.InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        {number} [options.zValueScale=1] - 用于进行插值分析值的缩放比率。</br>
 *        {number} options.resolution - 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。</br>
 *        {SuperMap.FilterParameter} options.filterQueryParameter - 属性过滤条件。</br>
 *        {string} options.outputDatasetName - 插值分析结果数据集的名称。必设参数</br>
 *        {string} options.outputDatasourceName - 插值分析结果数据源的名称。必设参数</br>
 *        {string} options.pixelFormat - 指定结果栅格数据集存储的像素格式。</br>
 *        {string} options.dataset - 用来做插值分析的数据源中数据集的名称，该名称用形如"数据集名称@数据源别名"形式来表示。当插值分析类型( SuperMap.InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        {Array.<SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point>} options.inputPoints - 用于做插值分析的离散点集合。当插值分析类型（ SuperMap.InterpolationAnalystType）为 geometry 时，必设参数。
 * @extends {SuperMap.InterpolationAnalystParameters}
 * @example
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
 */
export class InterpolationDensityAnalystParameters extends InterpolationAnalystParameters {


    constructor(options) {
        super(options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.InterpolationDensityAnalystParameters";
    }

    /**
     * @function SuperMap.InterpolationDensityAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
    }
}

SuperMap.InterpolationDensityAnalystParameters = InterpolationDensityAnalystParameters;