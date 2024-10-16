/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Collection} from './Collection';
import './Point';
import './LineString';
import './LinearRing';

/**
 * @class GeometryPolygon
 * @aliasclass Geometry.Polygon
 * @deprecatedclass SuperMap.Geometry.Polygon
 * @classdesc  多边形几何对象类。
 * @category BaseTypes Geometry
 * @extends GeometryCollection
 * @param {Array.<GeometryLinearRing>} components - 多边形的线环数组。
 * @example
 * var points =[new GeometryPoint(0,4010338),
 *      new GeometryPoint(1063524,4010338),
 *      new GeometryPoint(1063524,3150322),
 *      new GeometryPoint(0,3150322)
 *  ],
 *  var linearRings = new GeometryLinearRing(points),
 *  var  region = new GeometryPolygon([linearRings]);
 * @usage
 */
export class Polygon extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [GeometryPolygon.prototype.componentTypes=["SuperMap.Geometry.LinearRing"]]
         * @description components 存储的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.LinearRing"];
        this.CLASS_NAME = "SuperMap.Geometry.Polygon";
        this.geometryType = "Polygon";
    }

    /**
     * @function GeometryPolygon.prototype.getArea
     * @description 获得区域面积，从区域的外部口径减去计此区域内部口径算所得的面积。
     * @returns {number} 几何对象的面积。
     */
    getArea() {
        var area = 0.0;
        if (this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getArea());
            for (var i = 1, len = this.components.length; i < len; i++) {
                area -= Math.abs(this.components[i].getArea());
            }
        }
        return area;
    }


}
