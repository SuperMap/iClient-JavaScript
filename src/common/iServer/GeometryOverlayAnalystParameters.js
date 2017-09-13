import SuperMap from '../SuperMap';
import OverlayAnalystParameters from './OverlayAnalystParameters';
import ServerGeometry from './ServerGeometry';

/**
 * @class SuperMap.GeometryOverlayAnalystParameters
 * @classdesc
 * 几何对象叠加分析参数类。对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 * @param options - {Object} 可选参数。如:</br>
 *        operateGeometry - {Object} 叠加分析的操作几何对象。必设字段。</br>
 *                      点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
 *                      线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
 *                      面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。</br>
 *        sourceGeometry - {Object} 叠加分析的源几何对象。必设字段。</br>
 *                      点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
 *                      线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
 *                      面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。</br>
 *        operation - {{@link SuperMap.OverlayOperationType}} 叠加操作枚举值。</br>
 * @extends SuperMap.OverlayAnalystParameters
 */
export default class GeometryOverlayAnalystParameters extends OverlayAnalystParameters {

    /**
     * @member SuperMap.GeometryOverlayAnalystParameters.prototype.operateGeometry -{Object}
     * @description 叠加分析的操作几何对象。必设字段。</br>
     * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
     * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
     * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
     */
    operateGeometry = null;

    /**
     * @member SuperMap.GeometryOverlayAnalystParameters.prototype.sourceGeometry -{Object}
     * @description 叠加分析的源几何对象。必设字段。</br>
     * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
     * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
     * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。
     */
    sourceGeometry = null;


    constructor(options) {
        super(options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
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

        if (me.operateGeometry) {
            me.operateGeometry.destroy();
            me.operateGeometry = null;
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
            }
            else if (name === "operateGeometry") {
                tempObj.operateGeometry = ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometry);
            }
            else {
                tempObj[name] = geometryOverlayAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.GeometryOverlayAnalystParameters"
}

SuperMap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;