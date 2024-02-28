/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Geometry} from '../Geometry';
import {Bounds} from '../Bounds';
import {Util} from '../Util';

/**
 * @class GeometryPoint
 * @aliasclass Geometry.Point
 * @deprecatedclass SuperMap.Geometry.Point
 * @classdesc 点几何对象类。
 * @category BaseTypes Geometry
 * @extends {Geometry}
 * @param {number} x - x 坐标。
 * @param {number} y - y 坐标。
 * @param {string} [type = 'Point'] - 点的类型。
 * @param {number} [tag] - 额外的属性，比如插值分析中的 Z 值。
 * @example
 * var point = new GeometryPoint(-111.04, 45.68);
 * @usage
 */
export class Point extends Geometry {


    constructor(x, y, type, tag) {
        super(x, y, type, tag);
        /**
         * @member {number} GeometryPoint.prototype.x
         * @description 横坐标。
         */
        this.x = parseFloat(x);

        /**
         * @member {number} GeometryPoint.prototype.y
         * @description 纵坐标。
         */
        this.y = parseFloat(y);

        /**
         * @member {string} GeometryPoint.prototype.tag
         * @description  用来存储额外的属性，比如插值分析中的 Z 值。
         */
        this.tag = (tag || tag == 0) ? parseFloat(tag) : null;

        /**
         * @member {string} GeometryPoint.prototype.type
         * @description  用来存储点的类型。
         */
        this.type = type || "Point";
        this.CLASS_NAME = "SuperMap.Geometry.Point";
        this.geometryType = "Point";
    }

    /**
     * @function GeometryPoint.prototype.clone
     * @description 克隆点对象。
     * @returns {GeometryPoint} 克隆后的点对象。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Point(this.x, this.y);
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function GeometryPoint.prototype.calculateBounds
     * @description 计算点对象的范围。
     */
    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x, this.y);
    }

    /**
     * @function GeometryPoint.prototype.equals
     * @description 判断两个点对象是否相等。如果两个点对象具有相同的坐标，则认为是相等的。
     * @example
     * var point= new GeometryPoint(0,0);
     * var point1={x:0,y:0};
     * var result= point.equals(point1);
     * @param {GeometryPoint} geom - 需要判断的点对象。
     * @returns {boolean} 两个点对象是否相等（true 为相等，false 为不等）。
     */
    equals(geom) {
        var equals = false;
        if (geom != null) {
            equals = ((this.x === geom.x && this.y === geom.y) ||
                (isNaN(this.x) && isNaN(this.y) && isNaN(geom.x) && isNaN(geom.y)));
        }
        return equals;
    }


    /**
     * @function GeometryPoint.prototype.move
     * @description 沿着 x、y 轴的正方向上按照给定的位移移动点对象，move 不仅改变了几何对象的位置并且清理了边界缓存。
     * @param {number} x - x 轴正方向上的偏移量。
     * @param {number} y - y 轴正方向上偏移量。
     */
    move(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.clearBounds();
    }

    /**
     * @function GeometryPoint.prototype.toShortString
     * @description 将 x/y 坐标转换成简单字符串。
     * @returns {string} 字符串代表点对象。(ex. <i>"5, 42"</i>)
     */
    toShortString() {
        return (this.x + ", " + this.y);
    }

    /**
     * @function GeometryPoint.prototype.destroy
     * @description 释放点对象的资源。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.tag = null;
        super.destroy();
    }

    /**
     * @function GeometryPoint.prototype.getVertices
     * @description 获取几何图形所有顶点的列表。
     * @returns {Array} 几何图形的顶点列表。
     */
    getVertices() {
        return [this];
    }


}
