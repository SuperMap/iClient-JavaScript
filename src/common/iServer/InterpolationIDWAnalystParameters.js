/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class InterpolationIDWAnalystParameters
 * @deprecatedclass SuperMap.InterpolationIDWAnalystParameters
 * @category  iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 反距离加权插值（IDW）分析参数类。
 * @param {Object} options - 参数。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} options.bounds - 插值分析的范围，用于确定结果栅格数据集的范围。
 * @param {string} options.searchMode - 插值运算时，查找参与运算点的方式，支持固定点数查找、定长查找。
 * @param {string} options.outputDatasetName - 插值分析结果数据集的名称。
 * @param {string} options.outputDatasourceName - 插值分析结果数据源的名称。
 * @param {string} [options.zValueFieldName] - 进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(SuperMap.InterpolationAnalystType)为 dataset 时，此为必选参数。
 * @param {number} [options.expectedCount=12] - 【固定点数查找】方式下，设置待查找的点数，即参与插值运算的点数。
 * @param {number} [options.searchRadius=0] - 【定长查找】方式下，设置查找半径，即参与运算点的查找范围，与点数据集单位相同。
 * @param {number} [options.power=2] - 距离权重计算的幂次。
 * @param {number} [options.zValueScale=1] - 用于进行插值分析值的缩放比率。
 * @param {number} [options.resolution] - 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
 * @param {FilterParameter} [options.filterQueryParameter] - 属性过滤条件。
 * @param {PixelFormat} [options.pixelFormat] - 指定结果栅格数据集存储的像素格式。
 * @param {string} [options.dataset] - 要用来做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。当插值分析类型(SuperMap.InterpolationAnalystType)为 dataset 时，此为必选参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>>} [options.inputPoints] - 用于做插值分析的离散点集合。当插值分析类型（SuperMap.InterpolationAnalystType）为 geometry 时，此为必选参数。
 * @extends {InterpolationAnalystParameters}
 * @example 例如：
 * var myInterpolationIDWAnalystParameters = new InterpolationIDWAnalystParameters({
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
 * @usage
 */
export class InterpolationIDWAnalystParameters extends InterpolationAnalystParameters {



    constructor(options) {
        super(options);
        /**
         * @member {number} [InterpolationIDWAnalystParameters.prototype.power=2]
         * @description 距离权重计算的幂次。
         * 该值决定了权值下降的速度，幂次越大，随距离的增大权值下降越快，距离预测点越远的点的权值也越小。
         * 理论上，参数值必须大于0，但是0.5到3之间时运算结果更合理，因此推荐值为0.5~3。
         */
        this.power = 2;

        /**
         * @member {SearchMode} InterpolationIDWAnalystParameters.prototype.searchMode
         * @description 插值运算时，查找参与运算点的方式，支持固定点数查找、定长查找。
         * 具体如下：
         * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
         * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
         */
        this.searchMode = null;

        /**
         * @member {number} [InterpolationIDWAnalystParameters.prototype.expectedCount=12]
         * @description 【固定点数查找】方式下，设置待查找的点数，即参与插值运算的点数。
         */
        this.expectedCount = 12;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.InterpolationIDWAnalystParameters";
    }

    /**
     * @function InterpolationIDWAnalystParameters.prototype.destroy
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

