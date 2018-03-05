import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ThiessenAnalystParameters} from './ThiessenAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.GeometryThiessenAnalystParameters
 * @constructs SuperMap.GeometryThiessenAnalystParameters
 * @category  iServer SpatialAnalyst ThiessenPolygonAnalyst
 * @classdesc 几何对象泰森多边形分析参数类。对指定的某个几何对象做泰森多边形分析。通过该类可以指定要做泰森多边形分析的几何对象、返回数据集名称等。
 * @param options - {Object} 可选参数。如:</br>
 *         points - {Array<Object>} 使用点数组进行分析时使用的几何对象。点类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。</br>
 * @extends SuperMap.ThiessenAnalystParameters
 */

export class GeometryThiessenAnalystParameters extends ThiessenAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member SuperMap.GeometryThiessenAnalystParameters.prototype.points -{Array<Object>}|{Array}
         * @description 使用点数组进行分析时使用的几何对象。点类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
         */
        this.points = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GeometryThiessenAnalystParameters";
    }

    /**
     * @function SuperMap.GeometryThiessenAnalystParameters.prototype.destroy
     * @override
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

    /**
     * @function SuperMap.GeometryThiessenAnalystParameters.toObject
     * @param geometryThiessenAnalystParameters - {SuperMap.GeometryThiessenAnalystParameters} 几何对象泰森多边形分析参数类。
     * @param tempObj - {SuperMap.GeometryThiessenAnalystParameters} 几何对象泰森多边形分析参数对象。
     * @description 将几何对象泰森多边形分析参数对象转换为JSON对象。
     * @return {Object} JSON对象。
     */
    static toObject(geometryThiessenAnalystParameters, tempObj) {
        for (var name in geometryThiessenAnalystParameters) {
            if (name === "clipRegion") {
                tempObj.clipRegion = ServerGeometry.fromGeometry(geometryThiessenAnalystParameters.clipRegion);
            } else {
                tempObj[name] = geometryThiessenAnalystParameters[name];
            }
        }
    }


}

SuperMap.GeometryThiessenAnalystParameters = GeometryThiessenAnalystParameters;