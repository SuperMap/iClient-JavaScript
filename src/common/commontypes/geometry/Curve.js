/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {MultiPoint} from './MultiPoint';

/**
 * @class GeometryCurve
 * @aliasclass Geometry.Curve
 * @deprecatedclass SuperMap.Geometry.Curve
 * @classdesc 几何对象曲线类。
 * @category BaseTypes Geometry
 * @extends GeometryMultiPoint
 * @param {Array.<GeometryPoint>} components - 几何对象数组。
 * @example
 * var point1 = new GeometryPoint(10,20);
 * var point2 = new GeometryPoint(30,40);
 * var curve = new Curve([point1,point2]);
 * @usage
 */
export class Curve extends MultiPoint {

    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [GeometryCurve.prototype.componentTypes=["SuperMap.Geometry.Point", "SuperMap.PointWithMeasure"]]
         * @description components 存储的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.Point", "SuperMap.PointWithMeasure"];
        this.CLASS_NAME = "SuperMap.Geometry.Curve";
        this.geometryType = "Curve";

    }


}
