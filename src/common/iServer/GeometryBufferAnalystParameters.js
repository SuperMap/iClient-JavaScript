/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {BufferAnalystParameters} from './BufferAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class GeometryBufferAnalystParameters
 * @deprecatedclass SuperMap.GeometryBufferAnalystParameters
 * @category  iServer SpatialAnalyst BufferAnalyst
 * @classdesc 几何对象缓冲区分析参数类。
 * 通过该类可以指定要做缓冲区分析的几何对象、缓冲区通用设置、几何对象投影坐标等参数。
 * @param {Object} options - 参数。
 * @param {GeoJSONObject} options.sourceGeometry - 用于做缓冲区分析的几何对象。
 * @param {number} options.sourceGeometrySRID - 缓冲区几何对象投影坐标参数，如 4326，3857。
 * @param {BufferSetting} [options.bufferSetting] - 设置缓冲区通用参数。
 * @extends {BufferAnalystParameters}
 * @usage
 */
export class GeometryBufferAnalystParameters extends BufferAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {GeoJSONObject} GeometryBufferAnalystParameters.prototype.sourceGeometry
         * @description 用于做缓冲区分析的几何对象。<br>
         * 点类型可以是：{@link GeometryPoint}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}。</br>
         * 线类型可以是：{@link GeometryLineString}|{@link GeometryLinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}。</br>
         * 面类型可以是：{@link GeometryPolygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}。
         */
        this.sourceGeometry = null;

        /**
         * @member {number} GeometryBufferAnalystParameters.prototype.sourceGeometrySRID
         * @description 缓冲区几何对象投影坐标参数，如 4326，3857。
         */
        this.sourceGeometrySRID = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = " SuperMap.GeometryBufferAnalystParameters";
    }

    /**
     * @function GeometryBufferAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }
    }

    /**
     * @function GeometryBufferAnalystParameters.toObject
     * @param {GeometryBufferAnalystParameters} geometryBufferAnalystParameters - 几何对象缓冲区分析参数类。
     * @param {GeometryBufferAnalystParameters} tempObj - 几何对象缓冲区分析参数对象。
     * @description 将几何对象缓冲区分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    static toObject(geometryBufferAnalystParameters, tempObj) {
        for (var name in geometryBufferAnalystParameters) {
            if (name === "bufferSetting") {
                var tempBufferSetting = {};
                for (var key in geometryBufferAnalystParameters.bufferSetting) {
                    tempBufferSetting[key] = geometryBufferAnalystParameters.bufferSetting[key];
                }
                tempObj.analystParameter = tempBufferSetting;
            } else if (name === "sourceGeometry") {
                tempObj.sourceGeometry = ServerGeometry.fromGeometry(geometryBufferAnalystParameters.sourceGeometry);

            } else {
                tempObj[name] = geometryBufferAnalystParameters[name];
            }
        }
    }

}
