import SuperMap from '../SuperMap';
import BufferAnalystParameters from './BufferAnalystParameters';
/**
 * @class SuperMap.GeometryBufferAnalystParameters
 * @classdesc 几何对象缓冲区分析参数类
 * 对指定的某个几何对象做缓冲区分析。通过该类可以指定要做缓冲区分析的几何对象、缓冲区参数等。
 *  @extends SuperMap.BufferAnalystParameters
 */
export default  class GeometryBufferAnalystParameters extends BufferAnalystParameters {

    /**
     * @member SuperMap.GeometryBufferAnalystParameters.prototype.sourceGeometry -{Object}
     * @description 要做缓冲区分析的几何对象(支持Point、LineString、LinearRing、Polygon)。必设字段。
     */
    sourceGeometry = null;

    /*
     * @function SuperMap.GeometryBufferAnalystParameters.prototype.constructor
     * @description 几何对象缓冲区分析参数类构造函数。
     * @param options - {Object} 可选参数。如:</br>
     *        sourceGeometry - {Object} 要做缓冲区分析的几何对象。必设字段。</br>
     *        bufferSetting - {SuperMap.BufferSetting} 设置缓冲区通用参数。
     */
    constructor(options) {
        super(options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }
    }

    static  toObject(geometryBufferAnalystParameters, tempObj) {
        for (var name in geometryBufferAnalystParameters) {
            if (name === "bufferSetting") {
                var tempBufferSetting = {};
                for (var key in geometryBufferAnalystParameters.bufferSetting) {
                    tempBufferSetting[key] = geometryBufferAnalystParameters.bufferSetting[key];
                }
                delete tempBufferSetting.radiusUnit;
                tempObj.analystParameter = tempBufferSetting;
            }
            else if (name === "sourceGeometry") {
                tempObj.sourceGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometryBufferAnalystParameters.sourceGeometry);
            }
            else {
                tempObj[name] = geometryBufferAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = " SuperMap.GeometryBufferAnalystParameters"
}

SuperMap.GeometryBufferAnalystParameters = GeometryBufferAnalystParameters;