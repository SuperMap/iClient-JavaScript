/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class RouteCalculateMeasureParameters
 * @deprecatedclass SuperMap.RouteCalculateMeasureParameters
 * @category  iServer SpatialAnalyst RouteCalculateMeasure
 * @classdesc 基于路由对象计算指定点 M 值操作的参数类。该类可设置路由对象、二维地理坐标点对象、容限、是否忽略子对象之间的距离等参数信息。
 * @param {Object} options - 参数。
 * @param {(Route|L.Polyline|ol.geom.LineString|GeoJSONObject)} options.sourceRoute - 路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象。
 * @param {GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>} options.point - 二维地理坐标点对象，包含 x,y 坐标值属性的对象。
 * @param {number} [options.tolerance] - 容限值。
 * @param {boolean} [options.isIgnoreGap=false] - 是否忽略子对象之间的距离。
 * @usage
 */
export class RouteCalculateMeasureParameters {

    constructor(options) {
        if (!options) {
            return this;
        }
        /**
         * @member {(Route|L.Polyline|ol.geom.LineString|GeoJSONObject)} RouteCalculateMeasureParameters.prototype.sourceRoute
         * @description 路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象。
         */
        this.sourceRoute = null;

        /**
         * @member {GeometryPoint|L.LatLng|L.Point|ol.geom.Point|mapboxgl.LngLat|Array.<number>} RouteCalculateMeasureParameters.prototype.point
         * @description 二维地理坐标点对象，包含 x,y 坐标值属性的对象。
         */
        this.point = null;

        /**
         * @member {number} [RouteCalculateMeasureParameters.prototype.tolerance]
         * @description 容限值。
         */
        this.tolerance = null;

        /**
         * @member {boolean} [RouteCalculateMeasureParameters.prototype.isIgnoreGap=false]
         * @description 是否忽略子对象之间的距离。
         */
        this.isIgnoreGap = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.RouteCalculateMeasureParameters";
    }

    /**
     * @function RouteCalculateMeasureParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.sourceRoute = null;
        me.point = null;
        if (me.tolerance) {
            me.tolerance = null;
        }
        if (me.isIgnoreGap) {
            me.isIgnoreGap = false;
        }
    }
}
