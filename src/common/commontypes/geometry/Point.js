import {SuperMap} from '../../SuperMap';
import {Geometry} from '../Geometry';
import {Bounds} from '../Bounds';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.Point
 * @classdesc 点几何对象类。
 * @category BaseTypes Geometry
 * @extends {SuperMap.Geometry}
 * @param  x - {float} x-坐标
 * @param y - {float} y-坐标
 * @param type - {string} 用来存储点的类型
 * @param tag -  {float} 用来存储额外的属性，比如差值分析中的Z值。
 * @example
 * var point = new SuperMap.Geometry.Point(-111.04, 45.68);
 */
export class Point extends Geometry {


    constructor(x, y, type, tag) {
        super(x, y, type, tag);
        /**
         * @member SuperMap.Geometry.Point.prototype.x -{float}
         * @description 横坐标。
         */
        this.x = parseFloat(x);

        /**
         * @member SuperMap.Geometry.Point.prototype.y -{float}
         * @description 纵坐标。
         */
        this.y = parseFloat(y);

        /**
         * @member SuperMap.Geometry.Point.prototype.tag -{string}
         * @description  用来存储额外的属性，比如差值分析中的Z值。
         */
        this.tag = (tag || tag == 0) ? parseFloat(tag) : null;

        /**
         * @member SuperMap.Geometry.Point.prototype.tag -{string}
         * @description  用来存储点的类型
         */
        this.type = type || "Point";
        this.CLASS_NAME = "SuperMap.Geometry.Point";
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.clone
     * @description 克隆点对象。
     * @returns {SuperMap.Geometry.Point} 克隆后的点对象。
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
     * @function SuperMap.Geometry.Point.prototype.calculateBounds
     * @description 计算点对象的范围。
     */
    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x, this.y);
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.equals
     * @description 判断两个点对象是否相等。如果两个点对象具有相同的坐标，则认为是相等的。
     * @example
     * var point= new SuperMap.Geometry.Point(0,0);
     * var point1={x:0,y:0};
     * var result= point.equals(point1);
     * @param geom - {SuperMap.Geometry.Point} 需要判断的点对象。
     *
     * @returns {Boolean} 两个点对象是否相等（true为相等，false为不等）。
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
     * @function SuperMap.Geometry.Point.prototype.move
     * @description 沿着x、y轴的正方向上按照给定的位移移动点对象，move 不仅改变了几何对象的位置并且清理了边界缓存。
     * @param x - {float} x轴正方向上的偏移量。
     * @param y - {float} y轴正方向上偏移量。
     */
    move(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.clearBounds();
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.toShortString
     * @returns {string} 字符串代表点对象。(ex. <i>"5, 42"</i>)
     */
    toShortString() {
        return (this.x + ", " + this.y);
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.destroy
     * @description 释放点对象的资源
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.tag = null;
        super.destroy();
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.getVertices
     * @description 返回点对象的所有顶点的列表。
     * @param nodes - {Boolean} 对于点对象此参数不起作用，直接返回点。
     *
     * @returns {Array} 几何图形的顶点列表。
     */
    getVertices(nodes) { // eslint-disable-line no-unused-vars
        return [this];
    }


}

SuperMap.Geometry.Point = Point;
