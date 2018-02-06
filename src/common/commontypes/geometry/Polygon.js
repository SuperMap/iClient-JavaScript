import {SuperMap} from '../../SuperMap';
import {Collection} from './Collection';
import './Point';
import './LineString';
import './LinearRing';

/**
 * @class SuperMap.Geometry.Polygon
 * @classdesc  多边形几何对象类。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry.Collection}
 * @param components - {Array<SuperMap.Geometry.LinearRing>} 用来生成多边形的线环数组。
 * @example
 * var points =[new SuperMap.Geometry.Point(0,4010338),
 *      new SuperMap.Geometry.Point(1063524,4010338),
 *      new SuperMap.Geometry.Point(1063524,3150322),
 *      new SuperMap.Geometry.Point(0,3150322)
 *  ],
 *  var linearRings = new SuperMap.Geometry.LinearRing(points),
 *  var  region = new SuperMap.Geometry.Polygon([linearRings]);
 */
export class Polygon extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member SuperMap.Geometry.Polygon.prototype.componentTypes -{Array<string>}
         * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
         * @readonly
         * @default ["{@link SuperMap.Geometry.LinearRing}"]
         */
        this.componentTypes = ["SuperMap.Geometry.LinearRing"];
        this.CLASS_NAME = "SuperMap.Geometry.Polygon";
    }

    /**
     * @function SuperMap.Geometry.Polygon.prototype.getArea
     * @description 获得区域面积，从区域的外部口径减去计此区域内部口径算所得的面积。
     * @returns {float} 几何对象的面积。
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

SuperMap.Geometry.Polygon = Polygon;