/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    Util
} from '../commontypes/Util';

/**
 * @class InterpolationAnalystParameters
 * @deprecatedclass SuperMap.InterpolationAnalystParameters
 * @category iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 插值分析参数类。
 * @param {Object} options - 参数。
 * @param {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} options.bounds - 插值分析的范围，用于确定结果栅格数据集的范围。
 * @param {string} options.outputDatasetName - 插值分析结果数据集的名称。
 * @param {string} options.outputDatasourceName - 插值分析结果数据源的名称。
 * @param {string} [options.zValueFieldName] - 进行插值分析的字段名称，插值分析不支持文本类型的字段。
 * @param {string} [options.dataset] - 待分析的数据集名称。当插值分析类型（InterpolationAnalystType）为 dataset 时，此为必选参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>>} [options.inputPoints] - 用于做插值分析的离散点集合。当插值分析类型（InterpolationAnalystType）为 geometry 时，此参数为必设参数。
 * @param {number} [options.searchRadius=0] - 查找半径，即参与运算点的查找范围，与点数据集单位相同。
 * @param {number} [options.zValueScale=1] - 进行插值分析值的缩放比率。
 * @param {number} [options.resolution] - 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
 * @param {FilterParameter} [options.filterQueryParameter] - 属性过滤条件。
 * @param {PixelFormat} [options.pixelFormat] - 指定结果栅格数据集存储的像素格式。
 * @param {string} [options.InterpolationAnalystType="dataset"] - 插值分析类型（"dataset" 或 "geometry"）。
 * @usage
 */
export class InterpolationAnalystParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {(SuperMap.Bounds|L.Bounds|L.LatLngBounds|ol.extent|mapboxgl.LngLatBounds|GeoJSONObject)} InterpolationAnalystParameters.prototype.bounds
         * @description 插值分析的范围，用于确定结果栅格数据集的范围。
         * 如果缺省，则默认为原数据集的范围。鉴于此插值方法为内插方法，原数据集的范围内的插值结果才相对有参考价值，
         * 因此建议此参数不大于原数据集范围。
         */
        this.bounds = null;

        /**
         * @member {number} [InterpolationAnalystParameters.prototype.searchRadius=0]
         * @description 查找半径，即参与运算点的查找范围，与点数据集单位相同。
         * 计算某个位置的Z 值时，会以该位置为圆心，以查找范围的值为半径，落在这个范围内的采样点都将参与运算。
         * 该值需要根据待插值点数据的分布状况和点数据集范围进行设置。
         */
        this.searchRadius = 0;

        /**
         * @member {string} InterpolationAnalystParameters.prototype.zValueFieldName
         * @description 数据集插值分析中，用于指定进行插值分析的目标字段名，插值分析不支持文本类型的字段。
         * 含义为每个插值点在插值过程中的权重，可以将所有点此字段值设置为 1，即所有点在整体插值中权重相同。
         * 当插值分析类型（InterpolationAnalystType）为 dataset 时，此为必选参数。
         */
        this.zValueFieldName = null;

        /**
         * @member {number} [InterpolationAnalystParameters.prototype.zValueScale=1]
         * @description 用于进行插值分析值的缩放比率。
         * 参加插值分析的值将乘以该参数值后再进行插值，也就是对进行插值分析的值进行统一的扩大或缩小。
         */
        this.zValueScale = 1;

        /**
         * @member {number} InterpolationAnalystParameters.prototype.resolution
         * @description 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
         * 该值不能超过待分析数据集的范围边长。
         * 且该值设置时，应该考虑点数据集范围大小来取值，一般为结果栅格行列值（即结果栅格数据集范围除以分辨率），在 500 以内可以较好地体现密度走势。
         */
        this.resolution = null;

        /**
         * @member {FilterParameter} [InterpolationAnalystParameters.prototype.filterQueryParameter]
         * @description 过滤条件，对分析数据集中的点进行过滤，设置为 null 表示对数据集中的所有点进行分析。
         */
        this.filterQueryParameter = null;

        /**
         * @member {string} InterpolationAnalystParameters.prototype.outputDatasetName
         * @description 插值分析结果数据集的名称。
         */
        this.outputDatasetName = null;

        /**
         * @member {string} InterpolationAnalystParameters.prototype.outputDatasourceName
         * @description 插值分析结果数据源的名称。
         */
        this.outputDatasourceName = null;

        /**
         * @member {PixelFormat} [InterpolationAnalystParameters.prototype.pixelFormat]
         * @description 指定结果栅格数据集存储的像素格式。支持存储的像素格式有 BIT16、BIT32、DOUBLE、SINGLE、UBIT1、UBIT4、UBIT8、UBIT24、UBIT32。
         */
        this.pixelFormat = null;

        /**
         * @member {string} [InterpolationAnalystParameters.prototype.dataset]
         * @description 用来做插值分析的数据源中数据集的名称，该名称用形如 "数据集名称@数据源别名" 形式来表示。
         * 当插值分析类型（InterpolationAnalystType）为 dataset 时，此为必选参数。
         */
        this.dataset = null;

        /**
         * @member {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>>} [InterpolationAnalystParameters.prototype.inputPoints]
         * @description 用于做插值分析的离散点（离散点包括Z值）集合。
         * 当插值分析类型（InterpolationAnalystType）为 geometry 时，此参数为必设参数。
         * 通过离散点直接进行插值分析不需要指定输入数据集inputDatasourceName，inputDatasetName以及zValueFieldName。
         */
        this.inputPoints = null;

        /**
         * @member {string} [InterpolationAnalystParameters.prototype.InterpolationAnalystType="dataset"]
         * @description  插值分析类型。差值分析包括数据集插值分析和几何插值分析两类，
         *               "dataset" 表示对数据集进行插值分析，"geometry" 表示对离散点数组进行插值分析。
         */
        this.InterpolationAnalystType = "dataset";

        /**
         * @member {ClipParameter} InterpolationAnalystParameters.prototype.clipParam
         * @description 对插值分析结果进行裁剪的参数。
         */
        this.clipParam = null;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.InterpolationAnalystParameters";
    }

    /**
     * @function InterpolationAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.bounds = null;
        me.searchRadius = null;
        me.zValueFieldName = null;
        me.zValueScale = null;

        me.resolution = null;
        me.filterQueryParameter = null;
        me.outputDatasetName = null;
        me.pixelFormat = null;
    }

    /**
     * @function InterpolationAnalystParameters.toObject
     * @param {InterpolationAnalystParameters} interpolationAnalystParameters - 插值分析参数类。
     * @param {InterpolationAnalystParameters} tempObj - 插值分析参数对象。
     * @description 将插值分析参数对象转换成 JSON 对象。
     * @returns JSON 对象。
     */
    static toObject(interpolationAnalystParameters, tempObj) {
        for (var name in interpolationAnalystParameters) {
            if (name === "inputPoints" && interpolationAnalystParameters.InterpolationAnalystType === "geometry") {
                var objs = [];
                for (var i = 0; i < interpolationAnalystParameters.inputPoints.length; i++) {
                    var item = interpolationAnalystParameters.inputPoints[i];
                    var obj = {
                        x: item.x,
                        y: item.y,
                        z: item.tag
                    };
                    objs.push(obj);
                }
                tempObj[name] = objs;
            } else {
                tempObj[name] = interpolationAnalystParameters[name];
            }
        }
    }
}
