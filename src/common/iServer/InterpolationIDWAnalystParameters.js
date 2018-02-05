import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class SuperMap.InterpolationIDWAnalystParameters
 * @category  iServer SpatialAnalyst
 * @classdesc 反距离加权插值（IDW）分析参数类。
 * @param options - {Object}可选参数。如:</br>
 *        power - {number}距离权重计算的幂次。</br>
 *        bounds - {Object} 插值分析的范围，用于确定结果栅格数据集的范围。Bounds类型可以是SuperMap.Bounds|L.Bounds|ol.extent。</br>
 *        searchMode - {string} 插值运算时，查找参与运算点的方式，支持固定点数查找、定长查找。必设参数。</br>
 *        expectedCount - {number}【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数，默认值为12。</br>
 *        searchRadius - {number}【定长查找】方式下，设置查找半径，即参与运算点的查找范围，与点数据集单位相同，默认值为0。</br>
 *        zValueFieldName - {string} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(SuperMap.InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        zValueScale - {number} 用于进行插值分析值的缩放比率，默认为1。</br>
 *        resolution - {number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。</br>
 *        filterQueryParameter - {{@link SuperMap.FilterParameter}} 属性过滤条件。</br>
 *        outputDatasetName - {string} 插值分析结果数据集的名称。必设参数。</br>
 *        outputDatasourceName - {string} 插值分析结果数据源的名称。必设参数。</br>
 *        pixelFormat - {string} 指定结果栅格数据集存储的像素格式。</br>
 *        dataset - {string} 要用来做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。当插值分析类型(SuperMap.InterpolationAnalystType)为 dataset 时，必设参数。</br>
 *        inputPoints - {Array <Object>} 用于做插值分析的离散点集合。当插值分析类型（SuperMap.InterpolationAnalystType）为 geometry 时，必设参数。点类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。</br>
 * @extends SuperMap.InterpolationAnalystParameters
 * @example 例如：
 * var myInterpolationIDWAnalystParameters = new SuperMap.InterpolationIDWAnalystParameters({
 *      dataset:"SamplesP@Interpolation",
 *      power: 2,
 *      searchMode: "KDTREE_FIXED_COUNT",
 *      expectedCount: 12,
 *      pixelFormat: "BIT16",
 *      zValueFieldName: "AVG_TMP",
 *      resolution: 3000,
 *      filterQueryParameter: {
 *          attributeFilter: ""
 *      },
 *      outputDatasetName: "myIDW"
 * });
 *
 */
export class InterpolationIDWAnalystParameters extends InterpolationAnalystParameters {



    constructor(options) {
        super(options);
        /**
         * @member SuperMap.InterpolationIDWAnalystParameters.prototype.power - {number}
         * @description 距离权重计算的幂次，默认值为2。
         * 该值决定了权值下降的速度，幂次越大，随距离的增大权值下降越快，距离预测点越远的点的权值也越小。
         * 理论上，参数值必须大于0，但是0.5到3之间时运算结果更合理，因此推荐值为0.5~3。
         */
        this.power = 2;

        /**
         * @member SuperMap.InterpolationIDWAnalystParameters.prototype.searchMode - {SuperMap.SearchMode}
         * @description 插值运算时，查找参与运算点的方式，支持固定点数查找、定长查找。必设参数。
         * 具体如下：
         * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
         * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
         */
        this.searchMode = null;

        /**
         * @member SuperMap.InterpolationIDWAnalystParameters.prototype.expectedCount - {number}
         * @description 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数，默认值为12。
         */
        this.expectedCount = 12;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.InterpolationIDWAnalystParameters";
    }

    /**
     * @function SuperMap.InterpolationIDWAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.power = null;
        me.searchMode = null;
        me.expectedCount = null;
    }
}

SuperMap.InterpolationIDWAnalystParameters = InterpolationIDWAnalystParameters;
