import SuperMap from '../SuperMap';
import OverlayAnalystParameters from './OverlayAnalystParameters';

/**
 * @class SuperMap.GeometryOverlayAnalystParameters
 * @classdesc
 * 几何对象叠加分析参数类
 * 对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 * @param options - {Object} 可选参数。如:</br>
 *        operateGeometry - {SuperMap.Geometry} 叠加分析的操作几何对象。必设字段。</br>
 *        sourceGeometry - {SuperMap.Geometry} 叠加分析的源几何对象。必设字段。</br>
 *        operation - {SuperMap.OverlayOperationType} 叠加操作枚举值。</br>
 * @extends SuperMap.OverlayAnalystParameters
 */
export default  class GeometryOverlayAnalystParameters extends OverlayAnalystParameters {

    /**
     * @member SuperMap.GeometryOverlayAnalystParameters.prototype.operateGeometry -{SuperMap.Geometry}
     * @description 叠加分析的操作几何对象。必设字段。
     */
    operateGeometry = null;

    /**
     * @member SuperMap.GeometryOverlayAnalystParameters.prototype.sourceGeometry -{SuperMap.Geometry}
     * @description 叠加分析的源几何对象。必设字段。
     */
    sourceGeometry = null;


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

        if (me.operateGeometry) {
            me.operateGeometry.destroy();
            me.operateGeometry = null;
        }
    }
    /**
     * @function SuperMap.GeometryOverlayAnalystParameters.toObject
     * @param geometryOverlayAnalystParameters -{Object} 几何对象叠加分析参数。
     * @param tempObj - {Object} 目标对象
     * @description 生成几何对象叠加分析对象
     */
    static toObject(geometryOverlayAnalystParameters, tempObj) {
        for (var name in geometryOverlayAnalystParameters) {
            if (name === "sourceGeometry") {
                tempObj.sourceGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.sourceGeometry);
            }
            else if (name === "operateGeometry") {
                tempObj.operateGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometry);
            }
            else {
                tempObj[name] = geometryOverlayAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.GeometryOverlayAnalystParameters"
}

SuperMap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;