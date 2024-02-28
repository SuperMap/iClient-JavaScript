/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class InterpolationRBFAnalystParameters
 * @deprecatedclass SuperMap.InterpolationRBFAnalystParameters
 * @category iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 样条插值（径向基函数插值法）分析参数类。此类除了能够设置插值分析的一系列通用参数，还可以设置样条插值分析中的查找参与运算点的方式、光滑系数、张力系数等参数。<br>
 * 当插值分析类型为 dataset 时，插值分析的数据集名称为必设参数。当插值分析类型为 geometry 时，插值分析的离散点集合为必设参数。
 * @extends {InterpolationAnalystParameters}
 * @param {Object} options - 参数。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} options.bounds - 插值分析的范围，用于确定结果栅格数据集的范围。
 * @param {string} options.searchMode - 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。
 * @param {string} options.outputDatasetName - 插值分析结果数据集的名称。
 * @param {string} options.outputDatasourceName - 插值分析结果数据源的名称。
 * @param {string} [options.zValueFieldName] - 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(SuperMap.InterpolationAnalystType)为 dataset 时，此为必设参数。
 * @param {number} [options.smooth=0.1] - 光滑系数，该值表示插值函数曲线与点的逼近程度，值域为 0 到 1。
 * @param {number} [options.tension=40] - 张力系数，用于调整结果栅格数据表面的特性。
 * @param {number} [options.expectedCount=12] - 【固定点数查找】方式下，设置参与插值运算的点数。
 * @param {number} [options.searchRadius=0] - 【定长查找】方式下，设置参与运算点的查找范围。
 * @param {number} [options.maxPointCountForInterpolation=200] - 【块查找】方式下，设置最多参与插值的点数。
 * @param {number} [options.maxPointCountInNode=50] - 【块查找】方式下，设置单个块内最多参与运算点数。
 * @param {number} [options.zValueScale=1] - 用于进行插值分析值的缩放比率。
 * @param {number} [options.resolution] - 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
 * @param {FilterParameter} [options.filterQueryParameter] - 属性过滤条件。
 * @param {PixelFormat} [options.pixelFormat] - 指定结果栅格数据集存储的像素格式。
 * @param {string} [options.dataset] - 用于做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。当插值分析类型(InterpolationAnalystType)为 dataset 时。此为必设参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>>} [options.inputPoints] - 用于做插值分析的离散点集合。当插值分析类型（InterpolationAnalystType）为 geometry 时。此为必设参数。
 * @example
 * var myInterpolationRBFAnalystParameters = new InterpolationRBFAnalystParameters({
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
 * @usage
 */
export class InterpolationRBFAnalystParameters extends InterpolationAnalystParameters {

    constructor(options) {
        super(options);
        /**
         * @member {number} [InterpolationRBFAnalystParameters.prototype.smooth=0.1]
         * @description 光滑系数，值域为 0 到 1，常用取值如 0、0.001、0.01、0.1、和 0.5。
         * 该值表示插值函数曲线与点的逼近程度，此数值越大，函数曲线与点的偏差越大，反之越小。
         */
        this.smooth = 0.1;

        /**
         * @member {number} [InterpolationRBFAnalystParameters.prototype.tension=40]
         * @description 张力系数，常用取值如 0、1、5 和 10。
         * 用于调整结果栅格数据表面的特性，张力越大，插值时每个点对计算结果影响越小，反之越大。
         */
        this.tension = 40;

        /**
         * @member {SearchMode} InterpolationRBFAnalystParameters.prototype.searchMode
         * @description 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数。
         * 具体如下：
         * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
         * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
         * {QUADTREE} 使用 QUADTREE 方式查找参与内插分析的点（块查找）。
         */
        this.searchMode = null;

        /**
         * @member {number} [InterpolationRBFAnalystParameters.prototype.expectedCount=12]
         * @description 【固定点数查找】方式下，设置待查找的点数，即参与插值运算的点数。
         */
        this.expectedCount = 12;

        /**
         * @member {number} [InterpolationRBFAnalystParameters.prototype.maxPointCountForInterpolation=200]
         * @description 【块查找】方式下，最多参与插值的点数。
         */
        this.maxPointCountForInterpolation = 200;

        /**
         * @member {number} [InterpolationRBFAnalystParameters.prototype.maxPointCountInNode=50]
         * @description 【块查找】方式下，单个块内最多参与运算点数。
         */
        this.maxPointCountInNode = 50;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.InterpolationRBFAnalystParameters";

    }


    /**
     * @function InterpolationRBFAnalystParameters.prototype.destroy
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
     * @function InterpolationRBFAnalystParameters.toObject
     * @param {InterpolationRBFAnalystParameters} datasetInterpolationRBFAnalystParameters - 样条插值（径向基函数插值法）分析参数类。
     * @param {InterpolationRBFAnalystParameters} tempObj - 样条插值（径向基函数插值法）分析参数对象。
     * @description 将样条插值（径向基函数插值法）分析参数对象转换为 JSON 对象。
     * @returns JSON 对象。
     */
    static toObject(datasetInterpolationRBFAnalystParameters, tempObj) {
        for (var name in datasetInterpolationRBFAnalystParameters) {
            tempObj[name] = datasetInterpolationRBFAnalystParameters[name];

        }
    }
}

