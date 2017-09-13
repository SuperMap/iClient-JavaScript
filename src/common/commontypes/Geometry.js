import SuperMap from '../SuperMap';
import WKT from '../format/WKT';
import Vector from './Vector';
import {Util} from './Util';

/**
 * @class SuperMap.Geometry
 * @classdesc 几何对象类，描述地理对象的几何图形。
 */
export default class Geometry {

    /**
     * @member SuperMap.Geometry.prototype.id - {string}
     * @description  此几何对象的唯一标示符。
     */
    id = null;

    /**
     * @member SuperMap.Geometry.prototype.parent - {SuperMap.Geometry}
     * @description 当几何对象添加到组件上的时候被设置。
     */
    parent = null;

    /**
     * @member SuperMap.Geometry.prototype.bounds - {SuperMap.Bounds}
     * @description 几何对象的范围。
     */
    bounds = null;

    /**
     * @member SuperMap.Geometry.prototype.SRID - {interger}
     * @description 投影坐标参数。通过该参数，服务器判断Geometry对象的坐标参考系是否与数据集相同，如果不同，则在数据入库前进行投影变换。
     * @example
     *   var geometry= new SuperMap.Geometry();
     *   geometry. SRID=4326;
     */
    SRID = null;

    constructor() {
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");
    }


    /**
     * @function SuperMap.Geometry.prototype.destroy
     * @description 解构Geometry类，释放资源。
     */
    destroy() {
        this.id = null;
        this.bounds = null;
        this.SRID = null;
    }


    /**
     * @function SuperMap.Geometry.prototype.clone
     * @description 创建克隆的几何图形。克隆的几何图形不设置非标准的属性。
     * @returns {SuperMap.Geometry} 克隆的几何图形。
     */
    clone() {
        return new Geometry();
    }


    /**
     * @function SuperMap.Geometry.prototype.setBounds
     * @description 设置此几何对象的bounds。
     * @param bounds - {SuperMap.Bounds}
     */
    setBounds(bounds) {
        if (bounds) {
            this.bounds = bounds.clone();
        }
    }


    /**
     * @function SuperMap.Geometry.prototype.clearBounds
     * @description 清除几何对象的bounds。
     * 如果该对象有父类，也会清除父类几何对象的bounds。
     */
    clearBounds() {
        this.bounds = null;
        if (this.parent) {
            this.parent.clearBounds();
        }
    }


    /**
     * @function SuperMap.Geometry.prototype.extendBounds
     * @description 扩展新的Bounds。
     * @param newBounds - {SuperMap.Bounds}
     */
    extendBounds(newBounds) {
        var bounds = this.getBounds();
        if (!bounds) {
            this.setBounds(newBounds);
        } else {
            this.bounds.extend(newBounds);
        }
    }


    /**
     * @function SuperMap.Geometry.prototype.getBounds
     * @description 获得几何图形的边界。如果没有设置边界，可通过计算获得。
     * @returns {SuperMap.Bounds}返回的几何对象的边界。
     */
    getBounds() {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    }


    /**
     * @function SuperMap.Geometry.prototype.calculateBounds
     * @description 重新计算几何图形的边界。（需要在子类中实现此方法）
     */
    calculateBounds() {
        //
        // This should be overridden by subclasses.
        //
    }


    /**
     * @function SuperMap.Geometry.prototype.distanceTo
     * @description 计算两个几个图形间的最小距离（x-y平面坐标系下）。（需要在子类中实现此方法）
     * @param geometry - {SuperMap.Geometry} 目标几何图形.
     * @param options - {Object} 距离计算需要设计的可选属性。有效的选项取决于特定的几何类型。
     * @returns {number | Object} 两个几个图形间的距离。
     */
    distanceTo(geometry, options) {
    }


    /**
     * @function SuperMap.Geometry.prototype.getVertices
     * @description 返回几何图形的所有顶点的列表。（需要在子类中实现此方法）
     * @param nodes - {boolean} 如果是true，线则只返回线的末端点，如果false，仅仅返回顶点，如果没有设置，则返回顶点。
     * @returns {Array} 几何图形的顶点列表。
     */
    getVertices(nodes) {
    }


    /**
     * @function SuperMap.Geometry.prototype.atPoint
     * @description 确定坐标是否在几何对象的范围内。
     * @param lonlat -{SuperMap.LonLat}
     * @param toleranceLon - {float} 可选参数，经度的偏移。
     * @param toleranceLat - {float}  可选参数，纬度的偏移。
     * @returns {boolean} 判断传入的坐标是否在指定的范围内 。
     *
     */
    atPoint(lonlat, toleranceLon, toleranceLat) {
        var atPoint = false;
        var bounds = this.getBounds();
        if ((bounds != null) && (lonlat != null)) {

            var dX = (toleranceLon != null) ? toleranceLon : 0;
            var dY = (toleranceLat != null) ? toleranceLat : 0;

            var toleranceBounds =
                new SuperMap.Bounds(this.bounds.left - dX,
                    this.bounds.bottom - dY,
                    this.bounds.right + dX,
                    this.bounds.top + dY);

            atPoint = toleranceBounds.containsLonLat(lonlat);
        }
        return atPoint;
    }


    /**
     * @function SuperMap.Geometry.prototype.getLength
     * @description 计算几何对象的长度 ，此方法需要在子类中定义 。
     * @returns {float} 集合长度。
     */
    getLength() {
        //to be overridden by geometries that actually have a length
        //
        return 0.0;
    }


    /**
     * @function SuperMap.Geometry.prototype.getArea
     * @description 计算几何对象的面积 ，此方法需要在子类中定义  。
     * @returns {float} 集合表示的面积。
     */
    getArea() {
        //to be overridden by geometries that actually have an area
        //
        return 0.0;
    }


    /**
     * @function SuperMap.Geometry.prototype.getCentroid
     * @description 计算几何图形的质心。（需要在子类中实现此方法）
     * @returns {SuperMap.Geometry.Point} 采集的质心。
     */
    getCentroid() {
        return null;
    }


    /**
     * @function SuperMap.Geometry.prototype.toString
     * @description 返回geometry对象的字符串表述，需要引入{@link SuperMap.Format.WKT}。此方法只能在子类实现，在父类使用会报错。
     * @returns {string} geometry对象的字符串表述(Well-Known Text)。
     */
    toString() {
        var string;
        if (WKT) {
            var wkt = new WKT();
            string = wkt.write(new Vector(this));
        } else {
            string = Object.prototype.toString.call(this);
        }
        return string;
    }

    /**
     * @function SuperMap.Geometry.fromWKT
     * @description 从一个给定的字符串生成一个geometry对象，需要引入SuperMap.Format.WKT，该方法方可生效。
     * @example
     * var geometry= new SuperMap.Geometry.fromWKT("POINT(0 0)");
     * geometry.x=0;
     * @param wkt - {string} 描述geometry信息的字符串(A string representing the geometry in Well-Known Text.)
     * @returns {SuperMap.Geometry} 适当类型的geometry对象(A geometry of the appropriate class).
     */
    static fromWKT(wkt) {
        var geom;
        if (WKT) {
            var format = Geometry.fromWKT.format;
            if (!format) {
                format = new WKT();
                Geometry.fromWKT.format = format;
            }
            var result = format.read(wkt);
            if (result instanceof Vector) {
                geom = result.geometry;
            } else if (Util.isArray(result)) {
                var len = result.length;
                var components = new Array(len);
                for (var i = 0; i < len; ++i) {
                    components[i] = result[i].geometry;
                }
                geom = new Geometry.Collection(components);
            }
        }
        return geom;
    }

    /**
     * @function SuperMap.Geometry.prototype.SuperMap.Geometry.segmentsIntersect
     * @description 线段相交。该方法是判断两条线段是否相交。计算并返回相交的point。如果seg1.x2 >= seg2.x1 || seg2.x2 >= seg1.x1 ，该方法明显不会被调用。
     * @param seg1 - {Object} 该对象包含的属性是 x1, y1, x2,和y2。起始点是 由x1 and y1构成，终点是有x2 and y2组成，必须满足的是x1 < x2。
     * @param seg2 - {Object} 该对象包含的属性是 x1, y1, x2,和y2。起始点是 由x1 and y1构成，终点是有x2 and y2组成，必须满足的是x1 < x2。
     * @param options - {Object} Optional properties for calculating the intersection.该对象是判断是否计算相交的点。<br>
     *         point - {boolean} 返回相交点。如果设置为false，说明实际的相交点不需要计算出来。如果设置为true,并且这两条线段相交，返回相交的点 。
     *                           如果设置为true，但是两条线段不相交，返回false。如果设置为true，但是两条线段平行，则返回true。<br>
     *         tolerance - {number} 如果设置该值不为空，两条线段在容线的范围内，则会被当作相交。此外，如果point这个属性为true，计算相交的容线距离终点,端点将返回而不是计算相交。
     * @returns {boolean | SuperMap.Geometry.Point} 返回线之间是否相交，如果设置点属性为true的话，会返回相交的点坐标。如果点为true，线重合，将会返回true（相交的等于最短的线）。
     */
    static segmentsIntersect(seg1, seg2, options) {
        var point = options && options.point;
        var tolerance = options && options.tolerance;
        var intersection = false;
        var x11_21 = seg1.x1 - seg2.x1;
        var y11_21 = seg1.y1 - seg2.y1;
        var x12_11 = seg1.x2 - seg1.x1;
        var y12_11 = seg1.y2 - seg1.y1;
        var y22_21 = seg2.y2 - seg2.y1;
        var x22_21 = seg2.x2 - seg2.x1;
        var d = (y22_21 * x12_11) - (x22_21 * y12_11);
        var n1 = (x22_21 * y11_21) - (y22_21 * x11_21);
        var n2 = (x12_11 * y11_21) - (y12_11 * x11_21);
        if (d == 0) {
            // parallel
            if (n1 == 0 && n2 == 0) {
                // coincident
                intersection = true;
            }
        } else {
            var along1 = n1 / d;
            var along2 = n2 / d;
            if (along1 >= 0 && along1 <= 1 && along2 >= 0 && along2 <= 1) {
                // intersect
                if (!point) {
                    intersection = true;
                } else {
                    // calculate the intersection point
                    var x = seg1.x1 + (along1 * x12_11);
                    var y = seg1.y1 + (along1 * y12_11);
                    intersection = new Geometry.Point(x, y);
                }
            }
        }
        if (tolerance) {
            var dist;
            if (intersection) {
                if (point) {
                    var segs = [seg1, seg2];
                    var seg, x, y;
                    // check segment endpoints for proximity to intersection
                    // set intersection to first endpoint within the tolerance
                    outer: for (var i = 0; i < 2; ++i) {
                        seg = segs[i];
                        for (var j = 1; j < 3; ++j) {
                            x = seg["x" + j];
                            y = seg["y" + j];
                            dist = Math.sqrt(
                                Math.pow(x - intersection.x, 2) +
                                Math.pow(y - intersection.y, 2)
                            );
                            if (dist < tolerance) {
                                intersection.x = x;
                                intersection.y = y;
                                break outer;
                            }
                        }
                    }

                }
            } else {
                // no calculated intersection, but segments could be within
                // the tolerance of one another
                var segs = [seg1, seg2];
                var source, target, x, y, p, result;
                // check segment endpoints for proximity to intersection
                // set intersection to first endpoint within the tolerance
                outer: for (var i = 0; i < 2; ++i) {
                    source = segs[i];
                    target = segs[(i + 1) % 2];
                    for (var j = 1; j < 3; ++j) {
                        p = {x: source["x" + j], y: source["y" + j]};
                        result = Geometry.distanceToSegment(p, target);
                        if (result.distance < tolerance) {
                            if (point) {
                                intersection = new Geometry.Point(p.x, p.y);
                            } else {
                                intersection = true;
                            }
                            break outer;
                        }
                    }
                }
            }
        }
        return intersection;
    }

    /**
     * @function SuperMap.Geometry.distanceToSegment
     * @description 计算点到直线的距离。
     * @param point - {Object} 一个点包含x和y坐标。
     * @param segment - {Object} 一个对象包含 x1, y1, x2, and y2坐标。
     * @example
     *        var point={
     *         x:0,
     *          y:13
     *          } ,
     *            seg1={
     *             x1:6,
     *             y1:5,
     *            x2:6,
     *            y2:12
     *       } ;
     *       var geo=SuperMap.Geometry.distanceToSegment(point,seg1);
     * @returns {Object} 返回的是点到直线的最短距离，以及点与直线最短距离相交的点坐标（x,y）。
     */
    static distanceToSegment(point, segment) {
        var x0 = point.x;
        var y0 = point.y;
        var x1 = segment.x1;
        var y1 = segment.y1;
        var x2 = segment.x2;
        var y2 = segment.y2;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var along = ((dx * (x0 - x1)) + (dy * (y0 - y1))) /
            (Math.pow(dx, 2) + Math.pow(dy, 2));
        var x, y;
        if (along <= 0.0) {
            x = x1;
            y = y1;
        } else if (along >= 1.0) {
            x = x2;
            y = y2;
        } else {
            x = x1 + along * dx;
            y = y1 + along * dy;
        }
        return {
            distance: Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)),
            x: x, y: y
        };
    }

    CLASS_NAME = "SuperMap.Geometry"
}
SuperMap.Geometry = Geometry;
