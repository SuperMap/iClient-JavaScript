import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {OverlayAnalystParameters} from './OverlayAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.GeometryOverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc
 * 几何对象叠加分析参数类。对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 * @param options - {Object} 可选参数。如:</br>
 *        operateGeometry - {Object} 叠加分析的操作几何对象。必设字段。</br>
 *                      点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
 *                      线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|GeoJSON。</br>
 *                      面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|GeoJSON。</br>
 *        sourceGeometry - {Object} 叠加分析的源几何对象。必设字段。</br>
 *                      点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|GeoJSON。</br>
 *                      线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|GeoJSON。</br>
 *                      面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|GeoJSON。</br>
 *
 *        operateGeometries -{Array} 批量叠加分析的操作几何对象数组。批量叠加分析时必设字段。</br>
 *                         点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|GeoJSON。</br>
 *                         线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|GeoJSON。</br>
 *                         面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|GeoJSON
 *        sourceGeometries -{Array} 批量叠加分析的源几何对象数组。批量叠加分析时必设字段。</br>
 *                         点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|GeoJSON。</br>
 *                         线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|GeoJSON。</br>
 *                         面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|GeoJSON。
 *        operation - {{@link SuperMap.OverlayOperationType}} 叠加操作枚举值。</br>
 * @extends SuperMap.OverlayAnalystParameters
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
     * @function SuperMap.GeometryOverlayAnalystParameters.prototype.destroy
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
     * @function SuperMap.GeometryOverlayAnalystParameters.toObject
     * @param geometryOverlayAnalystParameters - {SuperMap.GeometryOverlayAnalystParameters} 几何对象叠加分析参数类。
     * @param tempObj - {SuperMap.GeometryOverlayAnalystParameters} 几何对象叠加分析参数对象
     * @description 将几何对象叠加分析参数对象转换为JSON对象。
     * @return {Object} JSON对象。
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

SuperMap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;