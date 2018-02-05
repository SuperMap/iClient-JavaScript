import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class SuperMap.InterpolationRBFAnalystParameters
 * @category  iServer SpatialAnalyst
 * @classdesc 样条插值（径向基函数插值法）分析参数类。
 * @extends SuperMap.InterpolationAnalystParameters
 * @param options - {Object} 可选参数。如：</br>
 *        smooth - {number} 光滑系数，该值表示插值函数曲线与点的逼近程度，值域为 0到1，默认值为0.1。</br>
 *        tension - {number} 张力系数，用于调整结果栅格数据表面的特性，默认为40。</br>
 *        bounds - {Object} 插值分析的范围，用于确定结果栅格数据集的范围。Bounds类型可以是SuperMap.Bounds|L.Bounds|ol.extent。</br>
 *        searchMode - {string} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数。</br>
 *        expectedCount - {number} 【固定点数查找】方式下，设置参与差值运算的点数，默认值为12。</br>
 *        searchRadius - {number} 【定长查找】方式下，设置参与运算点的查找范围，默认值为0。</br>
 *        maxPointCountForInterpolation - {number} 【块查找】方式下，设置最多参与插值的点数。默认为200。</br>
 *        maxPointCountInNode - {number} 【块查找】方式下，设置单个块内最多参与运算点数。默认为50。</br>
 *        zValueFieldName - {string} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        zValueScale - {number} 用于进行插值分析值的缩放比率，默认值为1。</br>
 *        resolution - {number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。</br>
 *        filterQueryParameter - {{@link SuperMap.FilterParameter}} 属性过滤条件。</br>
 *        outputDatasetName - {string} 插值分析结果数据集的名称。必设参数。</br>
 *        outputDatasourceName - {string} 插值分析结果数据源的名称。必设参数。</br>
 *        pixelFormat - {string} 指定结果栅格数据集存储的像素格式。</br>
 *        dataset - {string} 要用来做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        inputPoints - {Array <Object>} 用于做插值分析的离散点集合。当插值分析类型（InterpolationAnalystType）为 geometry 时，必设参数。点类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
 * @example
 * var myInterpolationRBFAnalystParameters = new SuperMap.InterpolationRBFAnalystParameters({
 *     dataset:"SamplesP@Interpolation",
 *     smooth: 0.1,
 *     tension: 40,
 *     searchMode: "QUADTREE",
 *     maxPointCountForInterpolation: 20,
 *     maxPointCountInNode: 5,
 *     pixelFormat: "BIT16",
 *     zValueFieldName: "AVG_TMP",
 *     resolution: 3000,
 *     filterQueryParameter: {
 *         attributeFilter: ""
 *     },
 *     outputDatasetName: "myRBF"
 * });
 */
export class InterpolationRBFAnalystParameters extends InterpolationAnalystParameters {

    constructor(options) {
        super(options);
        /**
         * @member SuperMap.InterpolationRBFAnalystParameters.prototype.smooth - {number}
         * @description 光滑系数，值域为 0到1，默认值为0.1，常用取值如0、0.001、0.01、0.1、和0.5。
         * 该值表示插值函数曲线与点的逼近程度，此数值越大，函数曲线与点的偏差越大，反之越小。
         */
        this.smooth = 0.1;

        /**
         * @member SuperMap.InterpolationRBFAnalystParameters.prototype.tension - {number}
         * @description 张力系数，默认为40，常用取值如0、1、5和10。
         * 用于调整结果栅格数据表面的特性，张力越大，插值时每个点对计算结果影响越小，反之越大。
         */
        this.tension = 40;

        /**
         * @member SuperMap.InterpolationRBFAnalystParameters.prototype.searchMode - {SuperMap.SearchMode}
         * @description 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数。
         * 具体如下：
         * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
         * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
         * {QUADTREE} 使用 QUADTREE 方式查找参与内插分析的点（块查找）。
         */
        this.searchMode = null;

        /**
         * @member SuperMap.InterpolationRBFAnalystParameters.prototype.expectedCount - {number}
         * @description 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数。默认值为12。
         */
        this.expectedCount = 12;

        /**
         * @member SuperMap.InterpolationRBFAnalystParameters.prototype.maxPointCountForInterpolation - {number}
         * @description 【块查找】方式下，最多参与插值的点数。默认值为200。
         */
        this.maxPointCountForInterpolation = 200;

        /**
         * @member SuperMap.InterpolationRBFAnalystParameters.prototype.maxPointCountInNode - {number}
         * @description 【块查找】方式下，单个块内最多参与运算点数。默认值为50。
         */
        this.maxPointCountInNode = 50;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.InterpolationRBFAnalystParameters";

    }


    /**
     * @function SuperMap.InterpolationRBFAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.smooth = null;
        me.tension = null;
        me.searchMode = null;
        me.expectedCount = null;
        me.maxPointCountForInterpolation = null;
        me.maxPointCountInNode = null;
    }

    /**
     * @function SuperMap.InterpolationRBFAnalystParameters.toObject
     * @param datasetInterpolationRBFAnalystParameters - {SuperMap.InterpolationRBFAnalystParameters} 样条插值（径向基函数插值法）分析参数类
     * @param tempObj - {SuperMap.InterpolationRBFAnalystParameters} 样条插值（径向基函数插值法）分析参数对象
     * @description 将样条插值（径向基函数插值法）分析参数对象转换为JSON对象。
     * @return JSON对象。
     */
    static toObject(datasetInterpolationRBFAnalystParameters, tempObj) {
        for (var name in datasetInterpolationRBFAnalystParameters) {
            tempObj[name] = datasetInterpolationRBFAnalystParameters[name];

        }
    }
}

SuperMap.InterpolationRBFAnalystParameters = InterpolationRBFAnalystParameters;
