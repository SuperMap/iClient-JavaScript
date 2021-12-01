/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Collection} from './Collection';

/**
 * @class MultiPoint
 * @aliasclass Geometry.MultiPoint
 * @deprecatedclass SuperMap.Geometry.MultiPoint
 * @classdesc 几何对象多点类。
 * @category BaseTypes Geometry
 * @extends {Collection}
 * @param {Array.<GeometryPoint>} components - 点对象数组。
 * @example
 * var point1 = new GeometryPoint(5,6);
 * var poine2 = new GeometryPoint(7,8);
 * var multiPoint = new MultiPoint([point1,point2]);
 * @usage
 */
export class MultiPoint extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [MultiPoint.prototype.componentTypes=["SuperMap.Geometry.Point"]]
         * @description components 存储的的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["SuperMap.Geometry.Point"];
        this.CLASS_NAME = "SuperMap.Geometry.MultiPoint";
        this.geometryType = "MultiPoint";
    }

    /**
     * @function MultiPoint.prototype.addPoint
     * @description 添加点，封装了 {@link Collection|Collection.addComponent} 方法。
     * @param {GeometryPoint} point - 添加的点。
     * @param {integer} [index] - 下标。
     */
    addPoint(point, index) {
        this.addComponent(point, index);
    }


    /**
     * @function MultiPoint.prototype.removePoint
     * @description 移除点，封装了 {@link Collection|Collection.removeComponent} 方法。
     * @param {GeometryPoint} point - 移除的点对象。
     */
    removePoint(point) {
        this.removeComponent(point);
    }


}
