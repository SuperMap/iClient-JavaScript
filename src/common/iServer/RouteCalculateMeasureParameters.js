import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './Route';

/**
 * @class SuperMap.RouteCalculateMeasureParameters
 * @category  iServer SpatialAnalyst RouteCalculateMeasure
 * @classdesc 基于路由对象计算指定点 M 值操作的参数类。通过该类提供参数信息。
 * @param {Object} options - 参数。
 * @param {(SuperMap.Route|L.Polyline|ol.geom.LineString)} options.sourceRoute - 路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象。
 * @param {(SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point)} options.point - 二维地理坐标点对象，包含 x,y 坐标值属性的对象。
 * @param {float} [options.tolerance] - 容限值。
 * @param {boolean} [options.isIgnoreGap=false] - 是否忽略子对象之间的距离。
 */
export class RouteCalculateMeasureParameters {

    constructor(options) {
        if (!options) {
            return this;
        }
        /**
         * @member {(SuperMap.Route|L.Polyline|ol.geom.LineString)} SuperMap.RouteCalculateMeasureParameters.prototype.sourceRoute
         * @description 路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象。
         */
        this.sourceRoute = null;

        /**
         * @member {(SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point)} SuperMap.RouteCalculateMeasureParameters.prototype.point
         * @description 二维地理坐标点对象，包含 x,y 坐标值属性的对象。
         */
        this.point = null;

        /**
         * @member {float} [SuperMap.RouteCalculateMeasureParameters.prototype.tolerance]
         * @description 容限值。
         */
        this.tolerance = null;

        /**
         * @member {boolean} [SuperMap.RouteCalculateMeasureParameters.prototype.isIgnoreGap=false]
         * @description 是否忽略子对象之间的距离。
         */
        this.isIgnoreGap = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.RouteCalculateMeasureParameters";
    }

    /**
     * @function SuperMap.RouteCalculateMeasureParameters.prototype.destroy
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

SuperMap.RouteCalculateMeasureParameters = RouteCalculateMeasureParameters;