import {SuperMap} from '../../SuperMap';
import {Collection} from './Collection';

/**
 * @class SuperMap.Geometry.MultiPoint
 * @classdesc 几何对象多点类。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry.Collection}
 * @param components - {Array<SuperMap.Geometry.Point>} 点对象数组。
 * @example
 * var point1 = new SuperMap.Geometry.Point(5,6);
 * var poine2 = new SuperMap.Geometry.Point(7,8);
 * var multiPoint = new SuperMap.Geometry.MultiPoint([point1,point2]);
 */
export class MultiPoint extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member SuperMap.Geometry.MultiPoint.prototype.componentTypes -{Array<string>}
         * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
         * @readonly
         * @default ["{@link SuperMap.Geometry.Point}"]
         */
        this.componentTypes = ["SuperMap.Geometry.Point"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiPoint";
    }

    /**
     * @function SuperMap.Geometry.MultiPoint.prototype.addPoint
     * @description 添加点，封装了 {@link SuperMap.Geometry.Collection|SuperMap.Geometry.Collection.addComponent}方法。
     * @param point - {SuperMap.Geometry.Point} 添加的点。
     * @param index - {integer} 可选的下标。
     */
    addPoint(point, index) {
        this.addComponent(point, index);
    }


    /**
     * @function SuperMap.Geometry.MultiPoint.prototype.removePoint
     * @description 移除点,封装了 {@link SuperMap.Geometry.Collection|SuperMap.Geometry.Collection.removeComponent} 方法。
     * @param point - {SuperMap.Geometry.Point} 移除的点对象。
     */
    removePoint(point) {
        this.removeComponent(point);
    }


}

SuperMap.Geometry.MultiPoint = MultiPoint;