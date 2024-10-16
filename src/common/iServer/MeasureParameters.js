/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {Unit} from '../REST';

/**
 * @class MeasureParameters
 * @deprecatedclass SuperMap.MeasureParameters
 * @category iServer Map Measure
 * @classdesc 量算参数类。
 * @param {GeoJSONObject} geometry - 要量算的几何对象。
 * @param {Object} options - 可选参数。
 * @param {Unit} [options.unit=Unit.METER] - 量算单位。
 * @param {string} [options.prjCoordSys] - 用来指定该量算操作所使用的投影。
 * @param {string} [options.distanceMode="Geodesic"] - 用来指定量算的方式为按球面长度 'Geodesic' 或者平面长度 'Planar' 来计算。
 * @usage
 */
export class MeasureParameters {



    constructor(geometry, options) {
        if (!geometry) {
            return;
        }
        /**
         * @member {GeoJSONObject} MeasureParameters.prototype.geometry
         * @description 要量算的几何对象。<br>
         * 点类型可以是：{@link GeometryPoint}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。<br>
         * 线类型可以是：{@link GeometryLineString}|{@link GeometryLinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。<br>
         * 面类型可以是：{@link GeometryPolygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。
         */
        this.geometry = geometry;

        /**
         * @member {Unit} [MeasureParameters.prototype.unit=Unit.METER]
         * @description 量算单位。即量算结果以米为单位。
         */
        this.unit = Unit.METER;

        /**
         * @member {string} [MeasureParameters.prototype.prjCoordSys]
         * @description 用来指定该量算操作所使用的投影。
         */
        this.prjCoordSys = null;

        /**
         * @member {string} [MeasureParameters.prototype.distanceMode="Geodesic"]
         * @description 用来指定量算的方式为按球面长度 'Geodesic' 或者平面长度 'Planar' 来计算。
         * @example
         * var param = new MeasureParameters(getmetry,{distanceMode:'Planar'});
         */
        this.distanceMode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.MeasureParameters";
    }

    /**
     * @function MeasureParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.geometry = null;
        me.unit = null;
        me.prjCoordSys = null;
    }
}
