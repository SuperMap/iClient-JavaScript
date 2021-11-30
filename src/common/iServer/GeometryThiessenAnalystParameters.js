/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ThiessenAnalystParameters} from './ThiessenAnalystParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class GeometryThiessenAnalystParameters
 * @deprecatedclass SuperMap.GeometryThiessenAnalystParameters
 * @constructs GeometryThiessenAnalystParameters
 * @category iServer SpatialAnalyst ThiessenPolygonAnalyst
 * @classdesc 几何对象泰森多边形分析参数类。对指定的某个几何对象做泰森多边形分析。通过该类可以指定要做泰森多边形分析的几何对象、返回数据集名称等。
 * @param {Object} options - 参数。
 * @param {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point>} options.points - 使用点数组进行分析时使用的几何对象。
 * @extends {ThiessenAnalystParameters}
 * @usage
 */

export class GeometryThiessenAnalystParameters extends ThiessenAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {Array.<GeometryPoint|L.LatLng|L.Point|ol.geom.Point>} GeometryThiessenAnalystParameters.prototype.points
         * @description 使用点数组进行分析时使用的几何对象。
         */
        this.points = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GeometryThiessenAnalystParameters";
    }

    /**
     * @function GeometryThiessenAnalystParameters.prototype.destroy
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
     * @function GeometryThiessenAnalystParameters.toObject
     * @param {GeometryThiessenAnalystParameters} geometryThiessenAnalystParameters - 几何对象泰森多边形分析参数类。
     * @param {GeometryThiessenAnalystParameters} tempObj - 几何对象泰森多边形分析参数对象。
     * @description 将几何对象泰森多边形分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
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
