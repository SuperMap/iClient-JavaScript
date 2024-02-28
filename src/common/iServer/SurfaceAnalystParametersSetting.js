/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SmoothMethod} from '../REST';
import {Util} from '../commontypes/Util';
import {ServerGeometry} from './ServerGeometry';
import {Geometry} from '../commontypes/Geometry';

/**
 * @class SurfaceAnalystParametersSetting
 * @deprecatedclass SuperMap.SurfaceAnalystParametersSetting
 * @category  iServer SpatialAnalyst SurfaceAnalyst
 * @classdesc 表面分析参数设置类。
 * 通过该类可以设置表面分析提取等值线、提取等值面的一些参数，包括基准值、等值距、光滑度、光滑方法等。
 * @param {Object} options - 参数。
 * @param {GeometryPolygon|L.Polygon|ol.geom.Polygon|GeoJSONObject} [options.clipRegion] - 裁剪面对象，如果不需要对操作结果进行裁剪，可以使用 null 值取代该参数。
 * @param {number} [options.datumValue=0] - 提取等值线、提取等值面的基准值。
 * @param {Array.<number>} options.expectedZValues - 期望分析结果的 Z 值集合。
 * @param {number} [options.interval=0] - 等值距。等值距是两条等值线之间的间隔值。
 * @param {number} [options.resampleTolerance=0] - 重采样容限。
 * @param {SmoothMethod} [options.smoothMethod=SmoothMethod.BSPLINE] - 光滑处理所使用的方法。
 * @param {number} [options.smoothness=0] - 等值线或等值面的边界线的光滑度。
 * @usage
 */
export class SurfaceAnalystParametersSetting {

    constructor(options) {
        /**
         * @member {GeometryPolygon|L.Polygon|ol.geom.Polygon|GeoJSONObject} [SurfaceAnalystParametersSetting.prototype.clipRegion]
         * @description 获取或设置裁剪面对象，如果不需要对操作结果进行裁剪，可以使用 null 值取代该参数。
         */
        this.clipRegion = null;

        /**
         * @member {number} [SurfaceAnalystParametersSetting.prototype.datumValue=0]
         * @description 获取或设置表面分析中提取等值线、提取等值面的基准值。
         * 基准值是作为一个生成等值线的初始起算值，并不一定是最小等值线的值。例如，高程范围为 220 -1550 的 DEM 栅格数据，
         * 如果设基准值为 0，等值距为 50，则提取等值线时，以基准值 0 为起点，等值距 50 为间隔提取等值线，
         * 因为给定高程的最小值是 220，所以，在给定范围内提取等值线的最小高程是 250。
         * 提取等值线的结果是：最小等值线值为 250，最大等值线值为 1550。
         */
        this.datumValue = 0;
        /**
         * @member {Array.<number>} SurfaceAnalystParametersSetting.prototype.expectedZValues
         * @description 获取或设置期望分析结果的 Z 值集合。
         *              Z 值集合存储一系列数值，该数值为待提取等值线的值。即仅高程值在 Z 值集合中的等值线会被提取。
         */
        this.expectedZValues = null;

        /**
         *  @member {number} [SurfaceAnalystParametersSetting.prototype.interval=0]
         *  @description 获取或设置等值距。等值距是两条等值线之间的间隔值。
         */
        this.interval = 0;

        /**
         * @member {number} [SurfaceAnalystParametersSetting.prototype.resampleTolerance=0]
         * @description 获取或设置重采样容限。
         *              容限值越大，采样结果数据越简化。当分析结果出现交叉时，可通过调整重采样容限为较小的值来处理。
         */
        this.resampleTolerance = 0;

        /**
         * @member {SmoothMethod} [SurfaceAnalystParametersSetting.prototype.smoothMethod=SmoothMethod.BSPLINE]
         * @description 获取或设置光滑处理所使用的方法。
         */
        this.smoothMethod = SmoothMethod.BSPLINE;

        /**
         * @member {number} [SurfaceAnalystParametersSetting.prototype.smoothness=0]
         * @description 获取或设置表面分析中等值线或等值面的边界线的光滑度。
         * 以为 0-5 为例，光滑度为 0 表示不进行光滑操作，值越大表示光滑度越高。
         * 随着光滑度的增加，提取的等值线越光滑，当然光滑度越大，
         * 计算所需的时间和占用的内存也就越大。而且，当等值距较小时，
         * 光滑度太高会出现等值线相交的问题。
         */
        this.smoothness = 0;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.SurfaceAnalystParametersSetting";
    }


    /**
     * @function SurfaceAnalystParametersSetting.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.clipRegion) {
            me.clipRegion.destroy();
            me.clipRegion = null;
        }

        me.datumValue = null;
        me.expectedZValues = null;
        me.interval = null;
        me.resampleTolerance = null;
        me.smoothMethod = null;
        me.smoothness = null;
    }
    /**
     * @function SurfaceAnalystParametersSetting.prototype.toJSON
     * @description 将对象转化为 JSON 字符串。
     * @returns {string} 对象 JSON 字符串。
     */
    toJSON() {
        let json = "'datumValue':" + Util.toJSON(this.datumValue);
        json += ",'interval':" + Util.toJSON(this.interval);
        json += ",'resampleTolerance':" + Util.toJSON(this.resampleTolerance);
        json += ",'smoothMethod':" + Util.toJSON(this.smoothMethod);
        json += ",'smoothness':" + Util.toJSON(this.smoothness);
        if (this.expectedZValues != null) {
            json += "," + "'expectedZValues':" + Util.toJSON(this.expectedZValues);
        }
        if (this.clipRegion != null) {
            var serverGeometry = this.clipRegion;
            if (this.clipRegion instanceof Geometry && this.clipRegion.components) {
                serverGeometry = ServerGeometry.fromGeometry(this.clipRegion)
            }
            json += ",'clipRegion':" + Util.toJSON(serverGeometry);
        }
        return "{" + json + "}";
    }

}
