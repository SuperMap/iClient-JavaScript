/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SurfaceAnalystParameters} from './SurfaceAnalystParameters';

/**
 * @class GeometrySurfaceAnalystParameters
 * @deprecatedclass SuperMap.GeometrySurfaceAnalystParameters
 * @category  iServer SpatialAnalyst SurfaceAnalyst
 * @classdesc 几何对象表面分析参数类。可用于设置进行表面分析的坐标点数组、提取方法、返回结果、中间结果分辨率等参数。
 * @param {Object} options - 参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>>} options.points - 表面分析的坐标点数组。
 * @param {Array.<number>} options.zValues - 表面分析的坐标点的 Z 值数组。
 * @param {number} [options.resolution] - 获取或设置指定中间结果（栅格数据集）的分辨率。
 * @param {DataReturnOption} [options.resultSetting] - 结果返回设置类。
 * @param {SurfaceAnalystParametersSetting} options.extractParameter - 获取或设置表面分析参数。
 * @param {SurfaceAnalystMethod} [options.surfaceAnalystMethod = SurfaceAnalystMethod.ISOLINE] - 获取或设置表面分析的提取方法，提取等值线和提取等值面。
 * @extends {SurfaceAnalystParameters}
 * @usage
 */
export class GeometrySurfaceAnalystParameters extends SurfaceAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>>} GeometrySurfaceAnalystParameters.prototype.points
         * @description 获取或设置用于表面分析的坐标点数组。
         */
        this.points = null;

        /**
         * @member {Array.<number>} GeometrySurfaceAnalystParameters.prototype.zValues
         * @description 获取或设置用于提取操作的值。提取等值线时，将使用该数组中的值，
         * 对几何对象中的坐标点数组进行插值分析，得到栅格数据集（中间结果），接着从栅格数据集提取等值线。
         */
        this.zValues = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GeometrySurfaceAnalystParameters";
    }

    /**
     * @function GeometrySurfaceAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.points) {
            for (var i = 0, points = me.points, len = points.length; i < len; i++) {
                points[i].destroy();
            }
            me.points = null;
        }
        me.zValues = null;
    }

}

