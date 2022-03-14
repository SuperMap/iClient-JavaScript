/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {OverlayAnalystParameters} from './OverlayAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class GeometryOverlayAnalystParameters
 * @deprecatedclass SuperMap.GeometryOverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc
 * 几何对象叠加分析参数类。对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 * @param {Object} options - 参数。
 * @param {GeoJSONObject} options.operateGeometry - 叠加分析的操作几何对象。<br>
 * 点类型可以是：{@link GeometryPoint}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。<br>
 * 线类型可以是：{@link GeometryLineString}|{@link GeometryLinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link GeoJSONObject}。<br>
 * 面类型可以是：{@link GeometryPolygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link GeoJSONObject}。<br>
 * @param {GeoJSONObject} options.sourceGeometry - 叠加分析的源几何对象。
 * @param {Array.<GeoJSONFeature>} [options.operateGeometries] - 批量叠加分析的操作几何对象数组。
 * @param {Array.<GeoJSONFeature>} [options.sourceGeometries] -批量叠加分析的源几何对象数组。
 * @param {OverlayOperationType} [options.operation] - 叠加操作枚举值。
 * @extends {OverlayAnalystParameters}
 * @usage
 */
export class GeometryOverlayAnalystParameters extends OverlayAnalystParameters {

    constructor(options) {
        super(options);
        if (options && options.operateGeometry) {
            this.operateGeometry = options.operateGeometry;
        }
        if (options && options.sourceGeometry) {
            this.sourceGeometry = options.sourceGeometry;
        }
        if (options && options.operateGeometries) {
            this.operateGeometries = options.operateGeometries;
        }
        if (options && options.sourceGeometries) {
            this.sourceGeometries = options.sourceGeometries;
        }

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GeometryOverlayAnalystParameters";
    }

    /**
     * @function GeometryOverlayAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }

        if (me.sourceGeometries) {
            me.sourceGeometries.destroy();
            me.sourceGeometries = null;
        }
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }

        if (me.operateGeometries) {
            me.operateGeometries.destroy();
            me.operateGeometries = null;
        }
    }

    /**
     * @function GeometryOverlayAnalystParameters.toObject
     * @param {GeometryOverlayAnalystParameters} geometryOverlayAnalystParameters - 几何对象叠加分析参数类。
     * @param {GeometryOverlayAnalystParameters} tempObj - 几何对象叠加分析参数对象。
     * @description 将几何对象叠加分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    static toObject(geometryOverlayAnalystParameters, tempObj) {
        for (var name in geometryOverlayAnalystParameters) {
            if (name === "sourceGeometry") {
                tempObj.sourceGeometry = ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.sourceGeometry);

            } else if (name === "sourceGeometries") {
                var sourceGeometries = [];
                for (var i = 0; i < geometryOverlayAnalystParameters.sourceGeometries.length; i++) {
                    sourceGeometries.push(ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.sourceGeometries[i]));
                }
                tempObj.sourceGeometries = sourceGeometries;

            } else if (name === "operateGeometry") {
                tempObj.operateGeometry = ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometry);

            } else if (name === "operateGeometries") {
                var operateGeometries = [];
                for (var j = 0; j < geometryOverlayAnalystParameters.operateGeometries.length; j++) {
                    operateGeometries.push(ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometries[j]));
                }
                tempObj.operateGeometries = operateGeometries;

            } else {
                tempObj[name] = geometryOverlayAnalystParameters[name];
            }
        }
    }
}
