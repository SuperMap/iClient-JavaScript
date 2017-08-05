import SuperMap from '../SuperMap';
import OverlayAnalystParameters from './OverlayAnalystParameters';

/**
 * @class SuperMap.GeometryOverlayAnalystParameters
 * @constructs SuperMap.GeometryOverlayAnalystParameters
 * @classdesc
 * 几何对象叠加分析参数类
 * 对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 * @extends {SuperMap.OverlayAnalystParameters}
 * @api
 */
export default  class GeometryOverlayAnalystParameters extends OverlayAnalystParameters {


    /**
     * Property: operateGeometry
     * {SuperMap.Geometry} 叠加分析的操作几何对象。必设字段。
     */
    operateGeometry = null;

    /**
     * Property: sourceGeometry
     * {SuperMap.Geometry} 叠加分析的源几何对象。必设字段。
     */
    sourceGeometry = null;

    /**
     * @method SuperMap.GeometryOverlayAnalystParameters.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * operateGeometry - {SuperMap.Geometry} 叠加分析的操作几何对象。必设字段。</br>
     * sourceGeometry - {SuperMap.Geometry} 叠加分析的源几何对象。必设字段。</br>
     * operation - {SuperMap.OverlayOperationType} 叠加操作枚举值。</br>
     */
    constructor(options) {
        super(options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
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