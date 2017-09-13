import SuperMap from '../../SuperMap';
import Collection from './Collection';
import LineString from './LineString';
import Point from './Point';
import {NumberExt} from '../BaseTypes';

/**
 * @class  SuperMap.Geometry.LinearRing
 * @classdesc 几何对象线环类，是一个特殊的封闭的线串，在每次addPoint/removePoint之后会通过添加一个点（此点是复制的第一个点得到的）
 *             作为最后的一个点来自动关闭线环。
 * @extends {SuperMap.Geometry.LineString}
 * @param points {Array<SuperMap.Geometry.Point>} 组成线性环的点。
 * @example
 * var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
 *      new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
 *      new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
 *      new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
 *      new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)],
 * var linearRing = new SuperMap.Geometry.LinearRing(points);
 */
export default class LinearRing extends LineString {

    /**
     * @member SuperMap.Geometry.LinearRing.prototype.componentTypes - {Array<string>}
     * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
     * @readonly
     * @default ["{@link SuperMap.Geometry.Point}"]
     */
    componentTypes = ["SuperMap.Geometry.Point"];

    constructor(points) {
        super(points);
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.addComponent
     * @description 添加一个点到几何图形数组中，如果这个点将要被添加到组件数组的末端，并且与数组中已经存在的最后一个点相同，
     *                重复的点是不能被添加的。这将影响未关闭环的关闭。这个方法可以通过将非空索引（组件数组的下标）作为第二个参数重写。
     * @param point {SuperMap.Geometry.Point} 点对象。
     * @param index {integer} 插入组件数组的下标。
     * @returns {boolean} 点对象是否添加成功。
     */
    addComponent(point, index) {
        var added = false;

        //remove last point
        var lastPoint = this.components.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if (index != null || !point.equals(lastPoint)) {
            added = Collection.prototype.addComponent.apply(this, arguments);
        }

        //append copy of first point
        var firstPoint = this.components[0];
        Collection.prototype.addComponent.apply(this, [firstPoint]);

        return added;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.removeComponent
     * @description 从几何组件中删除一个点。
     * @param point {SuperMap.Geometry.Point} 点对象。
     * @returns {boolean} 点对象是否删除。
     */
    removeComponent(point) {
        var removed = this.components && (this.components.length > 3);
        if (removed) {
            //remove last point
            this.components.pop();

            //remove our point
            Collection.prototype.removeComponent.apply(this,
                arguments);
            //append copy of first point
            var firstPoint = this.components[0];
            Collection.prototype.addComponent.apply(this,
                [firstPoint]);
        }
        return removed;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.move
     * @description 沿着给定的x、y轴正方向按照给定的位移移动一个几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     * @param x {float} x轴正方向上的偏移量。
     * @param y {float} y轴正方向上的偏移量。
     */
    move(x, y) {
        for (var i = 0, len = this.components.length; i < len - 1; i++) {
            this.components[i].move(x, y);
        }
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.rotate
     * @description 围绕中心点旋转几何图形。
     * @param angle {float} 旋转角的度数（沿着x轴正方向的逆时针方向）。
     * @param origin {SuperMap.Geometry.Point} 旋转中心点。
     */
    rotate(angle, origin) {
        for (var i = 0, len = this.components.length; i < len - 1; ++i) {
            this.components[i].rotate(angle, origin);
        }
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.resize
     * @description 调整几何对象的大小。
     * @param scale - {float} 几何图形缩放的比例系数，是几何图形维数的两倍。（如：对于线来说将以线2倍的长度拉长，对于多边形来说，将以面积的4倍变化）。
     * @param origin {SuperMap.Geometry.Point} 调整大小选定的起始原点。
     * @param ratio {float} 可选的x,y的比例，默认的比例为1。
     * @returns {SuperMap.Geometry} 当前的几何对象。
     */
    resize(scale, origin, ratio) {
        for (var i = 0, len = this.components.length; i < len - 1; ++i) {
            this.components[i].resize(scale, origin, ratio);
        }
        return this;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.getCentroid
     * @description 获取几何对象的质心。
     * @returns {SuperMap.Geometry.Point} 几何图形的质心。
     */
    getCentroid() {
        if (this.components) {
            var len = this.components.length;
            if (len > 0 && len <= 2) {
                return this.components.clone();
            } else if (len > 2) {
                var sumX = 0.0;
                var sumY = 0.0;
                var x0 = this.components[0].x;
                var y0 = this.components[0].y;
                var area = -1 * this.getArea();
                if (area != 0) {
                    for (var i = 0; i < len - 1; i++) {
                        var b = this.components[i];
                        var c = this.components[i + 1];
                        sumX += (b.x + c.x - 2 * x0) * ((b.x - x0) * (c.y - y0) - (c.x - x0) * (b.y - y0));
                        sumY += (b.y + c.y - 2 * y0) * ((b.x - x0) * (c.y - y0) - (c.x - x0) * (b.y - y0));
                    }
                    var x = x0 + sumX / (6 * area);
                    var y = y0 + sumY / (6 * area);
                } else {
                    for (var i = 0; i < len - 1; i++) {
                        sumX += this.components[i].x;
                        sumY += this.components[i].y;
                    }
                    var x = sumX / (len - 1);
                    var y = sumY / (len - 1);
                }
                return new Point(x, y);
            } else {
                return null;
            }
        }
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.getArea
     * @description 获得当前几何对象区域大小，如果是沿顺时针方向的环则是正值，否则为负值。
     * @returns {float} 环的面积。
     */
    getArea() {
        var area = 0.0;
        if (this.components && (this.components.length > 2)) {
            var sum = 0.0;
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var b = this.components[i];
                var c = this.components[i + 1];
                sum += (b.x + c.x) * (c.y - b.y);
            }
            area = -sum / 2.0;
        }
        return area;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.containsPoint
     * @description 判断点是否在线环上，是返回1，不是返回0。
     * @param point {SuperMap.Geometry.Point}
     * @returns {boolean | number} 点是否在线环上。
     */
    containsPoint(point) {
        var approx = NumberExt.limitSigDigs;
        var digs = 14;
        var px = approx(point.x, digs);
        var py = approx(point.y, digs);

        function getX(y, x1, y1, x2, y2) {
            return (y - y2) * ((x2 - x1) / (y2 - y1)) + x2;
        }

        var numSeg = this.components.length - 1;
        var start, end, x1, y1, x2, y2, cx, cy;
        var crosses = 0;
        for (var i = 0; i < numSeg; ++i) {
            start = this.components[i];
            x1 = approx(start.x, digs);
            y1 = approx(start.y, digs);
            end = this.components[i + 1];
            x2 = approx(end.x, digs);
            y2 = approx(end.y, digs);

            /**
             * The following conditions enforce five edge-crossing rules:
             *    1. points coincident with edges are considered contained;
             *    2. an upward edge includes its starting endpoint, and
             *    excludes its final endpoint;
             *    3. a downward edge excludes its starting endpoint, and
             *    includes its final endpoint;
             *    4. horizontal edges are excluded; and
             *    5. the edge-ray intersection point must be strictly right
             *    of the point P.
             */
            if (y1 === y2) {
                // horizontal edge
                if (py === y1) {
                    // point on horizontal line
                    if (x1 <= x2 && (px >= x1 && px <= x2) || // right or vert
                        x1 >= x2 && (px <= x1 && px >= x2)) { // left or vert
                        // point on edge
                        crosses = -1;
                        break;
                    }
                }
                // ignore other horizontal edges
                continue;
            }
            cx = approx(getX(py, x1, y1, x2, y2), digs);
            if (cx === px) {
                // point on line
                if (y1 < y2 && (py >= y1 && py <= y2) || // upward
                    y1 > y2 && (py <= y1 && py >= y2)) { // downward
                    // point on edge
                    crosses = -1;
                    break;
                }
            }
            if (cx <= px) {
                // no crossing to the right
                continue;
            }
            if (x1 !== x2 && (cx < Math.min(x1, x2) || cx > Math.max(x1, x2))) {
                // no crossing
                continue;
            }
            if (y1 < y2 && (py >= y1 && py < y2) || // upward
                y1 > y2 && (py < y1 && py >= y2)) { // downward
                ++crosses;
            }
        }
        var contained = (crosses === -1) ?
            // on edge
            1 :
            // even (out) or odd (in)
            !!(crosses & 1);

        return contained;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.intersects
     * @description 判断输入的几何图形是否与当前几何图形相交。
     * @param geometry {SuperMap.Geometry} 任意的几何对象。
     * @returns {boolean} 输入几何图形与当前的目标几何图形相交。
     */
    intersects(geometry) {
        var intersect = false;
        if (geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
            intersect = this.containsPoint(geometry);
        } else if (geometry.CLASS_NAME === "SuperMap.Geometry.LineString") {
            intersect = geometry.intersects(this);
        } else if (geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") {
            intersect = LineString.prototype.intersects.apply(this, [geometry]);
        } else {
            // check for component intersections
            for (var i = 0, len = geometry.components.length; i < len; ++i) {
                intersect = geometry.components[i].intersects(this);
                if (intersect) {
                    break;
                }
            }
        }
        return intersect;
    }

    /**
     * @function SuperMap.Geometry.LinearRing.prototype.getVertices
     * @description 返回几何图形的所有点的列表。
     * @param nodes {boolean} 对于线来说，仅仅返回作为端点的顶点，如果设为false，则返回非端点的顶点。如果没有设置此参数，则返回所有顶点。
     * @returns {Array} 几何对象所有点的列表。
     */
    getVertices(nodes) {
        return (nodes === true) ? [] : this.components.slice(0, this.components.length - 1);
    }

    CLASS_NAME = "SuperMap.Geometry.LinearRing"
}
SuperMap.Geometry.LinearRing = LinearRing;