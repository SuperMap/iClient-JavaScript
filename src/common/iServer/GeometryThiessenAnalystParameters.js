import SuperMap from '../SuperMap';
import ThiessenAnalystParameters from './ThiessenAnalystParameters';
/**
 * @class SuperMap.GeometryThiessenAnalystParameters
 * @constructs SuperMap.GeometryThiessenAnalystParameters
 * @classdesc
 * 几何对象泰森多边形分析参数类
 * 对指定的某个几何对象做泰森多边形分析。通过该类可以指定要做泰森多边形分析的几何对象、返回数据集名称等。
 * @extends SuperMap.ThiessenAnalystParameters
 */

export default  class GeometryThiessenAnalystParameters extends ThiessenAnalystParameters {
    /**
     * @member SuperMap.GeometryThiessenAnalystParameters.prototype.points -{Array(Point)}|{Array(Array)}
     * @description 使用点数组进行分析时使用的几何对象。
     */
    points = null;

    /*
     * @function SuperMap.GetFeaturesByBufferService.prototype.constructor
     * @param options - {Object} 可选参数。如:</br>
     *        points - {Array(Point||Array)} 使用点数组进行分析时使用的几何对象。
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
        if (me.points) {
            for (var i = me.points.length - 1; i >= 0; i--) {
                me.points[i].destroy();
            }
            me.points = null;
        }
    }

    static toObject(geometryThiessenAnalystParameters, tempObj) {
        for (var name in geometryThiessenAnalystParameters) {
            if (name === "clipRegion") {
                tempObj.clipRegion = SuperMap.REST.ServerGeometry.fromGeometry(geometryThiessenAnalystParameters.clipRegion);
            } else {
                tempObj[name] = geometryThiessenAnalystParameters[name];
            }
        }
    }

    CLASS_NAME = "SuperMap.GeometryThiessenAnalystParameters"
}

SuperMap.GeometryThiessenAnalystParameters = GeometryThiessenAnalystParameters;