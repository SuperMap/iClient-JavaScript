import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Unit} from '../REST';

/**
 * @class SuperMap.MeasureParameters
 * @category iServer Map Measure
 * @classdesc 量算参数类。
 * @param {Object} geometry - 要量算的几何对象。
 *                            点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。
 *                            线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。
 *                            面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。
 * @param {Object} options - 参数。
 * @param {SuperMap.Unit} [options.unit=SuperMap.Unit.METER] - 量算单位。
 * @param {string} [options.prjCoordSys] - 用来指定该量算操作所使用的投影。
 * @param {string} [options.distanceMode="Geodesic"] - 用来指定量算的方式为按球面长度 'Geodesic' 或者平面长度 'Planar' 来计算。
 */
export class MeasureParameters {



    constructor(geometry, options) {
        if (!geometry) {
            return;
        }
        /**
         * @member {Object} SuperMap.MeasureParameters.prototype.geometry
         * @description 要量算的几何对象。
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.geometry = geometry;

        /**
         * @member {SuperMap.Unit} [SuperMap.MeasureParameters.prototype.unit=SuperMap.Unit.METER]
         * @description 量算单位。即量算结果以米为单位。
         */
        this.unit = Unit.METER;

        /**
         * @member {string} [SuperMap.MeasureParameters.prototype.prjCoordSys]
         * @description 用来指定该量算操作所使用的投影。
         */
        this.prjCoordSys = null;

        /**
         * @member {string} [SuperMap.MeasureParameters.prototype.distanceMode="Geodesic"]
         * @description 用来指定量算的方式为按球面长度 'Geodesic' 或者平面长度 'Planar' 来计算。
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