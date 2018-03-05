import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './Route';

/**
 * @class SuperMap.RouteCalculateMeasureParameters
 * @category  iServer SpatialAnalyst RouteCalculateMeasure
 * @classdesc 基于路由对象计算指定点M值操作的参数类。通过该类提供参数信息。
 * @param options - {Object} 可选参数。如:</br>
 *        sourceRoute - {Object} 【必选参数】路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象。</br>
 *        point - {Object} 【必选参数】二维地理坐标点对象，包含x,y坐标值属性的对象。</br>
 *                点坐标对象可以是:SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。</br>
 *        tolerance - {float} 【可选参数】容限值。</br>
 *        isIgnoreGap - {float}  【可选参数】是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。</br>
 */
export class RouteCalculateMeasureParameters {

    constructor(options) {
        if (!options) {
            return this;
        }
        /**
         * @member SuperMap.RouteCalculateMeasureParameters.prototype.sourceRoute -{Object}
         * @description 【必选参数】路由对象。该对象可以是用户自己生成或在数据源中查询得到的符合标准的路由对象；<br>
         * 路由对象可以是：SuperMap.Route|L.Polyline|ol.geom.LineString
         */
        this.sourceRoute = null;

        /**
         * @member SuperMap.RouteCalculateMeasureParameters.prototype.point -{Object}
         * @description 【必选参数】二维地理坐标点对象，包含x,y坐标值属性的对象。</br>
         * 点坐标对象可以是:SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
         */
        this.point = null;

        /**
         * @member SuperMap.RouteCalculateMeasureParameters.prototype.tolerance -{float}
         * @description 【可选参数】容限值。
         */
        this.tolerance = null;

        /**
         * @member SuperMap.RouteCalculateMeasureParameters.prototype.isIgnoreGap -{boolean}
         * @description 【可选参数】是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。
         * @default false
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