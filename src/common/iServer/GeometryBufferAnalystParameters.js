import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {BufferAnalystParameters} from './BufferAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.GeometryBufferAnalystParameters
 * @category  iServer SpatialAnalyst BufferAnalyst
 * @classdesc 几何对象缓冲区分析参数类
 * 对指定的某个几何对象做缓冲区分析。通过该类可以指定要做缓冲区分析的几何对象、缓冲区参数等。
 * @param options - {Object} 可选参数。如:</br>
 *        sourceGeometry - {Object} 要做缓冲区分析的几何对象。必设字段。</br>
 *              点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
 *              线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
 *              面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。</br>
 *        bufferSetting - {{@link SuperMap.BufferSetting}} 设置缓冲区通用参数。
 * @extends SuperMap.BufferAnalystParameters
 */
export class GeometryBufferAnalystParameters extends BufferAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member SuperMap.GeometryBufferAnalystParameters.prototype.sourceGeometry -{Object}
         * @description 要做缓冲区分析的几何对象。必设字段。</br>
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.sourceGeometry = null;

        /**
         * @member SuperMap.GeometryBufferAnalystParameters.prototype.sourceGeometrySRID -{number}
         * @description 缓冲区几何对象投影坐标参数, 如 4326，3857。
         */
        this.sourceGeometrySRID = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = " SuperMap.GeometryBufferAnalystParameters";
    }

    /**
     * @function SuperMap.GeometryBufferAnalystParameters.prototype.destroy
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
     * @function SuperMap.GeometryBufferAnalystParameters.toObject
     * @param geometryBufferAnalystParameters - {SuperMap.GeometryBufferAnalystParameters} 几何对象缓冲区分析参数类。
     * @param tempObj - {SuperMap.GeometryBufferAnalystParameters} 几何对象缓冲区分析参数对象。
     * @description 将几何对象缓冲区分析参数对象转换为JSON对象。
     * @return {Object} JSON对象。
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

SuperMap.GeometryBufferAnalystParameters = GeometryBufferAnalystParameters;