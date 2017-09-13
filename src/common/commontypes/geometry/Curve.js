import SuperMap from '../../SuperMap';
import MultiPoint from './MultiPoint';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.Curve
 * @classdesc 几何对象曲线类。
 * @extends SuperMap.Geometry.MultiPoint
 * @param components - {Array<SuperMap.Geometry.Point>} 几何对象数组。
 * @example
 * var point1 = new SuperMap.Geometry.Point(10,20);
 * var point2 = new SuperMap.Geometry.Point(30,40);
 * var curve = new SuperMap.Geometry.Curve([point1,point2]);
 */
export default class Curve extends MultiPoint {

    /**
     * @member SuperMap.Geometry.Curve.prototype.componentTypes - {Array<string>}
     * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
     * @readonly
     * @default ["{@link SuperMap.Geometry.Point}", "{@link SuperMap.PointWithMeasure}"]
     */
    componentTypes = ["SuperMap.Geometry.Point", "SuperMap.PointWithMeasure"];

    constructor(points) {
        super(points);
    }

    CLASS_NAME = "SuperMap.Geometry.Curve"
}
SuperMap.Geometry.Curve = Curve;