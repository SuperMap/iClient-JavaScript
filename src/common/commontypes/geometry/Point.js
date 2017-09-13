import SuperMap from '../../SuperMap';
import Geometry from '../Geometry';
import Bounds from '../Bounds';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.Point
 * @classdesc 点几何对象类。
 * @extends {SuperMap.Geometry}
 * @param  x - {float} x-坐标
 * @param y - {float} y-坐标
 * @param type - {string} 用来存储点的类型
 * @param tag -  {float} 用来存储额外的属性，比如差值分析中的Z值。
 * @example
 * var point = new SuperMap.Geometry.Point(-111.04, 45.68);
 */
export default class Point extends Geometry {

    /**
     * @member SuperMap.Geometry.Point.prototype.x - {float}
     * @description 横坐标。
     */
    x = null;

    /**
     * @member SuperMap.Geometry.Point.prototype.y - {float}
     * @description 纵坐标。
     */
    y = null;

    /**
     * @member SuperMap.Geometry.Point.prototype.tag - {string}
     * @description  用来存储额外的属性，比如差值分析中的Z值。
     */
    tag = null;

    /**
     * @member SuperMap.Geometry.Point.prototype.tag - {string}
     * @description  用来存储点的类型
     */
    type = null;

    constructor(x, y, type, tag) {
        super(x, y, type, tag);

        this.x = parseFloat(x);
        this.y = parseFloat(y);
        if (tag || tag == 0) {
            this.tag = parseFloat(tag);
        }
        this.type = type || "NONE";
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
     * @function SuperMap.Geometry.Point.prototype.distanceTo
     * @description 计算两个点对象间的最小距离（x-y平面坐标系下）。
     * @param geometry - {SuperMap.Geometry} 目标点对象。
     * @param options - {Object} 计算距离时需要设置的可选属性。有效的选项取决于特定的几何类型。<br>
     *         details - {boolean} 返回距离计算的细节。默认为false。<br>
     *         edge - {boolean} 计算一个几何对象到目标几何对象边缘的最近距离。默认为true。 如果设为true，
     *                          一个几何对象完全包含在目标几何对象中时，调用distanceTo返回非零结果，如果
     *                          false，两个几何对象相交情况下调用distanceTo结果返回0，而且如果false，将不返距离。
     * @returns {number | Object} 返回一个几何对象到目标几何对象的距离。
     */
    distanceTo(geometry, options) {
        var edge = !(options && options.edge === false);
        var details = edge && options && options.details;
        var distance, x0, y0, x1, y1, result;
        if (geometry instanceof Point) {
            x0 = this.x;
            y0 = this.y;
            x1 = geometry.x;
            y1 = geometry.y;
            distance = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
            result = !details ?
                distance : {x0: x0, y0: y0, x1: x1, y1: y1, distance: distance};
        } else {
            result = geometry.distanceTo(this, options);
            if (details) {
                // switch coord order since this geom is target
                result = {
                    x0: result.x1, y0: result.y1,
                    x1: result.x0, y1: result.y0,
                    distance: result.distance
                };
            }
        }
        return result;
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.equals
     * @description 判断两个点对象是否相等。如果两个点对象具有相同的坐标，则认为是相等的。
     * @example
     * var point= new SuperMap.Geometry.Point(0,0);
     * var point1={x:0,y:0};
     * var result= point.equals(point1);
     * @param geom - {SuperMap.Geometry.Point} 需要判断的点对象。
     * @returns {boolean} 两个点对象是否相等（true为相等，false为不等）。
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
     * @function SuperMap.Geometry.Point.prototype.toShortString
     * @returns {string} 字符串代表点对象。(ex. <i>"5, 42"</i>)
     */
    toShortString() {
        return (this.x + ", " + this.y);
    }


    /**
     * @function SuperMap.Geometry.Point.prototype.move
     * @description 沿着x、y轴的正方向上按照给定的位移移动点对象，move 不仅改变了几何对象的位置并且清理了边界缓存。
     * @param x - {float} x轴正方向上的偏移量。
     * @param  y - {float} y轴正方向上偏移量。
     * @example
     * var point = new SuperMap.Geometry.Point(10,20);
     * var dx = 10*Math.random();
     * var dy = 10*Math.random();
     * point.move(dx,dy);
     */
    move(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.clearBounds();
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.rotate
     * @description 围绕中心点旋转点对象。
     * @param angle - {float} 旋转角的度数（沿着x轴正方向的逆时针方向）。
     * @param origin - {SuperMap.Geometry.Point} 旋转的中心点 。
     * @example
     * var point = new SuperMap.Geometry.Point(10,20);
     * var rotateOrigin = new SuperMap.Geometry.Point(5,10);
     * point.rotate(360,rotateOrigin);
     */
    rotate(angle, origin) {
        angle *= Math.PI / 180;
        var radius = this.distanceTo(origin);
        var theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
        this.x = origin.x + (radius * Math.cos(theta));
        this.y = origin.y + (radius * Math.sin(theta));
        this.clearBounds();
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.getCentroid
     * @description 获取点对象的质心。
     * @returns {SuperMap.Geometry.Point} 点对象的质心。
     */
    getCentroid() {
        return new Point(this.x, this.y);
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.resize
     * @description 调整几何对象相对于原点的大小。
     * @param scale - {float} resize之后到原点的距离与resize之前到原点的距离比。
     * @param origin - {SuperMap.Geometry.Point} 调整的起始点。
     * @param ratio - {float} 点对象自身x与y的比值：ratio=x/y，默认的比例为1，不推荐设置。
     * @returns {SuperMap.Geometry} - 当前几何对象。
     * @example
     * var point = new SuperMap.Geometry.Point(10,10);
     * var origin = new SuperMap.Geometry.Point(0,0);
     * point.resize(2,origin,4);
     */
    resize(scale, origin, ratio) {
        ratio = (ratio == undefined) ? 1 : ratio;
        //所有的线和面最终都是控制点
        this.x = origin.x + (scale * ratio * (this.x - origin.x));

        this.y = origin.y + (scale * (this.y - origin.y));
        this.clearBounds();
        return this;
    }

    /**
     * @function SuperMap.Geometry.Point.prototype.intersects
     * @description 判断两个几何对象是否相交。
     * @param geometry - {SuperMap.Geometry} 任意类型的几何对象。
     * @returns {boolean} 传入的几何对象与当前几何对象相交。
     */
    intersects(geometry) {
        var intersect = false;
        if (geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
            intersect = this.equals(geometry);
        } else {
            intersect = geometry.intersects(this);
        }
        return intersect;
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
     * @param nodes - {boolean} 对于点对象此参数不起作用，直接返回点。
     * @returns {Array} 几何图形的顶点列表。
     */
    getVertices(nodes) {
        return [this];
    }

    CLASS_NAME = "SuperMap.Geometry.Point"
}
SuperMap.Geometry.Point = Point;
