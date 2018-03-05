import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Unit} from '../REST';

/**
 * @class SuperMap.MeasureParameters
 * @category  iServer Map Measure
 * @classdesc 量算参数类。
 * @param geometry - {Object} 要量算的几何对象。<br>
 *                  点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。<br>
 *                  线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。<br>
 *                  面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。<br>
 * @param options - {Object} 可选参数。如：<br>
 *         unit - {Unit} 量算单位。<br>
 *         prjCoordSys -{string} 用来指定该量算操作所使用的投影,该项默认值为空。<br>
 *         distanceMode -{string} 用来指定量算的方式为按球面长度'Geodesic'或者平面长度'Planar'来计算，默认为'Geodesic'。
 */
export class MeasureParameters {



    constructor(geometry, options) {
        if (!geometry) {
            return;
        }
        /**
         * @member SuperMap.MeasureParameters.prototype.geometry -{Object}
         * @description 要量算的几何对象（{Line} 或 {Polygon}），必设属性。<br>
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。<br>
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。<br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.geometry = geometry;

        /**
         * @member SuperMap.MeasureParameters.prototype.unit -{Unit}
         * @description 量算单位。默认单位：米，即量算结果以米为单位。
         */
        this.unit = Unit.METER;

        /**
         * @member SuperMap.MeasureParameters.prototype.prjCoordSys -{string}
         * @description 用来指定该量算操作所使用的投影,该项默认值为空。
         */
        this.prjCoordSys = null;

        /**
         * @member SuperMap.MeasureParameters.prototype.distanceMode -{string}
         * @description 用来指定量算的方式为按球面长度'Geodesic'或者平面长度'Planar'来计算，默认为'Geodesic'。
         * @example
         * var param = new SuperMap.MeasureParameters(getmetry,{distanceMode:'Planar'});
         */
        this.distanceMode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.MeasureParameters";
    }

    /**
     * @function SuperMap.MeasureParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.geometry = null;
        me.unit = null;
        me.prjCoordSys = null;
    }
}

SuperMap.MeasureParameters = MeasureParameters;