import {SuperMap} from '../../SuperMap';
import {Collection} from './Collection';

/**
 * @class SuperMap.Geometry.MultiPolygon
 * @classdesc 几何对象多多边形类。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry.Collection}
 * @param  components - {Array<SuperMap.Geometry.Polygon>} 形成 MultiPolygon 的多边形数组。
 * @example
 * var points1 = [new SuperMap.Geometry.Point(10,10),new SuperMap.Geometry.Point(0,0)];
 * var points2 = [new SuperMap.Geometry.Point(10,10),new SuperMap.Geometry.Point(0,0),new SuperMap.Geometry.Point(3,3),new SuperMap.Geometry.Point(10,10)];
 *
 * var linearRing1 = new SuperMap.Geometry.LinearRing(points1);
 * var linearRing2 = new SuperMap.Geometry.LinearRing(points2);
 *
 * var polygon1 = new SuperMap.Geometry.Polygon([linearRing1]);
 * var polygon2 = new SuperMap.Geometry.Polygon([linearRing2]);
 *
 * var multiPolygon1 = new SuperMap.Geometry.MultiPolygon([polygon1,polygon2]);
 */
export class MultiPolygon extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member SuperMap.Geometry.MultiPolygon.prototype.componentTypes -{Array<string>}
         * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
         * @readonly
         * @default ["{@link SuperMap.Geometry.Polygon}"]
         */
        this.componentTypes = ["SuperMap.Geometry.Polygon"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiPolygon";
    }


}

SuperMap.Geometry.MultiPolygon = MultiPolygon;