import SuperMap from '../../SuperMap';
import Collection from './Collection';
import Point from './Point';
import LineString from './LineString';
import LinearRing from './LinearRing';

/**
 * @class SuperMap.Geometry.Polygon
 * @classdesc  多边形几何对象类。
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
export default class Polygon extends Collection {

    /**
     * @member SuperMap.Geometry.Polygon.prototype.componentTypes -{Array<string>}
     * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
     * @readonly
     * @default ["{@link SuperMap.Geometry.LinearRing}"]
     */
    componentTypes = ["SuperMap.Geometry.LinearRing"];

    constructor(components) {
        super(components)
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

    /**
     * @function SuperMap.Geometry.Polygon.prototype.getGeodesicArea
     * @description 计算投影到球面上的多边形近似面积。
     * @param projection - {SuperMap.Projection} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     * @returns {float} 多边形近似测地面积。
     */
    getGeodesicArea(projection) {
        var area = 0.0;
        if (this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getGeodesicArea(projection));
            for (var i = 1, len = this.components.length; i < len; i++) {
                area -= Math.abs(this.components[i].getGeodesicArea(projection));
            }
        }
        return area;
    }

    /**
     * @function SuperMap.Geometry.Polygon.prototype.containsPoint
     * @description 判断点是否在多边形里。
     * @param point - {SuperMap.Geometry.Point} 点对象。
     * @returns {boolean | number} 是否在多边形里。
     */
    containsPoint(point) {
        var numRings = this.components.length;
        var contained = false;
        if (numRings > 0) {
            // check exterior ring - 1 means on edge, boolean otherwise
            contained = this.components[0].containsPoint(point);
            if (contained !== 1) {
                if (contained && numRings > 1) {
                    // check interior rings
                    var hole;
                    for (var i = 1; i < numRings; ++i) {
                        hole = this.components[i].containsPoint(point);
                        if (hole) {
                            if (hole === 1) {
                                // on edge
                                contained = 1;
                            } else {
                                // in hole
                                contained = false;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return contained;
    }

    /**
     * @function SuperMap.Geometry.Polygon.prototype.intersects
     * @description 判断两个几何对象是否相交。
     * @param geometry - {SuperMap.Geometry} 任何类型的几何对象。
     * @returns {boolean} 两个几何对象是否相交。
     */
    intersects(geometry) {
        var intersect = false;
        var i, len;
        if (geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
            intersect = this.containsPoint(geometry);
        } else if (geometry.CLASS_NAME === "SuperMap.Geometry.LineString" ||
            geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") {
            // check if rings/linestrings intersect
            for (i = 0, len = this.components.length; i < len; ++i) {
                intersect = geometry.intersects(this.components[i]);
                if (intersect) {
                    break;
                }
            }
            if (!intersect) {
                // check if this poly contains points of the ring/linestring
                for (i = 0, len = geometry.components.length; i < len; ++i) {
                    intersect = this.containsPoint(geometry.components[i]);
                    if (intersect) {
                        break;
                    }
                }
            }
        } else {
            for (i = 0, len = geometry.components.length; i < len; ++i) {
                intersect = this.intersects(geometry.components[i]);
                if (intersect) {
                    break;
                }
            }
        }
        // check case where this poly is wholly contained by another
        if (!intersect && geometry.CLASS_NAME === "SuperMap.Geometry.Polygon") {
            // exterior ring points will be contained in the other geometry
            var ring = this.components[0];
            for (i = 0, len = ring.components.length; i < len; ++i) {
                intersect = geometry.containsPoint(ring.components[i]);
                if (intersect) {
                    break;
                }
            }
        }
        return intersect;
    }

    /**
     * @function SuperMap.Geometry.Polygon.prototype.distanceTo
     * @description 计算两个几何对象间的最小距离（x-y平面坐标系下）。
     * @param geometry - {SuperMap.Geometry} 目标几何对象。
     * @param options - {Object}可选参数。<br>
     *         details - {boolean} 返回距离计算的细节。默认为false。<br>
     *         edge - {boolean} 计算一个几何对象到目标几何对象边缘的最近距离。默认为true。 如果设为true，
     *                          一个几何图形完全包含在目标几何对象中时，调用distanceTo返回非零结果，如果false，
     *                          两个几何对象相交情况下调用distanceTo结果返回0，而且如果false，将不返距离。
     * @returns {number | Object} 返回一个几何对象到目标几何对象的距离。
     */
    distanceTo(geometry, options) {
        var edge = !(options && options.edge === false);
        var result;
        // this is the case where we might not be looking for distance to edge
        if (!edge && this.intersects(geometry)) {
            result = 0;
        } else {
            result = super.distanceTo(geometry, options);
        }
        return result;
    }

    /**
     * @function SuperMap.Geometry.Polygon.createRegularPolygon
     * @description 创建 RegularPolygon 对象。
     * @param origin - {SuperMap.Geometry.Point} 多边形的中心 。
     * @param radius - {float} 半径。
     * @param sides - {integer} 边数，20个近似一个圆。
     * @param rotation - {float} 旋转角度，单位为degrees。
     * @example
     * var sides = 50;
     * var origin = new SuperMap.Geometry.Point(5,0);
     * var polygon = SuperMap.Geometry.Polygon.createRegularPolygon(origin,6,sides,270);
     */
    static createRegularPolygon(origin, radius, sides, rotation) {
        var angle = Math.PI * ((1 / sides) - (1 / 2));
        if (rotation) {
            angle += (rotation / 180) * Math.PI;
        }
        var rotatedAngle, x, y;
        var points = [];
        for (var i = 0; i < sides; ++i) {
            rotatedAngle = angle + (i * 2 * Math.PI / sides);
            x = origin.x + (radius * Math.cos(rotatedAngle));
            y = origin.y + (radius * Math.sin(rotatedAngle));
            points.push(new Point(x, y));
        }
        var ring = new LinearRing(points);
        return new Polygon([ring]);
    };

    /**
     * @function SuperMap.Geometry.Polygon.createRegularPolygonCurve
     * @description 创建扇形对象。
     * @param origin - {SuperMap.Geometry.Point} 多边形的中心 。
     * @param radius - {float} 半径。
     * @param sides - {integer} 边数，50个近似一个扇形。
     * @param r - {integer}
     * @param angel - {float} 旋转角度，单位为degrees。沿着x轴正方向的逆时针方向。
     * @param resolution - {float} 当前地图的分辨率.,固定大小下输入，其他情况不需要此参数
     * 备注：Geometry内部单位均为地理单位，默认用户输入的参数也为地理单位，如果传入resolution，则半径则为
     * 为像素单位，内部会根据像素值和分辨率获取地理大小后在进行构造Geometry，但最终的Geometry均为地理单位。
     * @returns {SuperMap.Geometry.Polygon} 几何面对象。
     * @example
     * var sides = 50;
     * var origin = new SuperMap.Geometry.Point(5,0);
     * var polygon = SuperMap.Geometry.Polygon.createRegularPolygonCurve(origin,6,sides,270);
     */
    static createRegularPolygonCurve(origin, radius, sides, r, angel, resolution) {
        if (resolution == undefined)
            resolution = 1;

        var rR = r * Math.PI / (180 * sides);

        var rotatedAngle, x, y;
        var points = [];
        for (var i = 0; i < sides; ++i) {
            rotatedAngle = rR * i;
            x = origin.x + (radius * resolution * Math.cos(rotatedAngle));
            y = origin.y + (radius * resolution * Math.sin(rotatedAngle));
            points.push(new Point(x, y));
        }
        rotatedAngle = r * Math.PI / 180;
        x = origin.x + (radius * resolution * Math.cos(rotatedAngle));
        y = origin.y + (radius * resolution * Math.sin(rotatedAngle));
        points.push(new Point(x, y));

        points.push(origin);

        var ring = new LinearRing(points);
        ring.rotate(parseFloat(angel), origin);
        var geo = new Polygon([ring]);
        geo.origin = origin;
        geo.radius = radius;
        geo.r = r;
        geo.angel = angel;
        geo.sides = sides;
        geo.polygonType = "Curve";
        return geo;
    };

    /**
     * @function SuperMap.Geometry.Polygon.createRegularPolygonTriangle
     * @description 创建4G三角形,电信行业4G专业符号形容类似为：-▷。
     * @param origin - {SuperMap.Geometry.Point} 三角形的原点 。
     * @param height - {float} 外接矩形的高度。
     * @param width - {float} 外接矩形的宽度。
     * @param lineLength - {float} 线长度。
     * @param angel - {float} 旋转角度，单位为degrees,沿着x轴正方向的逆时针方向.。
     * @param resolution - {float} 当前地图的分辨率.,固定大小下输入，其他情况不需要此参数。备注：Geometry内部单位均为地理单位，
     *                              默认用户输入的参数也为地理单位，如果传入resolution，则height、width、lineLength则为像素单
     *                              位，内部会根据像素值和分辨率获取地理大小后在进行构造Geometry，但最终的Geometry均为地理单位。
     * @returns {SuperMap.Geometry.Collection} 几何对象集合，面对象&线对象。
     */
    static createRegularPolygonTriangle(origin, height, width, lineLength, angel, resolution) {
        if (resolution == undefined)
            resolution = 1;

        var lineList = [];
        lineList.push(origin);
        lineList.push(new Point(origin.x + lineLength * resolution, origin.y));
        var geoline = new LineString(lineList);
        geoline.rotate(parseFloat(angel), origin);

        var triangleList = [];
        triangleList.push(new Point(origin.x + height * resolution, origin.y));
        triangleList.push(new Point(origin.x + lineLength * resolution, origin.y + width * resolution / 2));
        triangleList.push(new Point(origin.x + lineLength * resolution, origin.y - width * resolution / 2));
        var geoTriangle = new LinearRing(triangleList);
        geoTriangle.rotate(parseFloat(angel), origin);
        var geo = new Collection([geoline, geoTriangle]);
        geo.origin = origin;
        geo.height = height;
        geo.width = width;
        geo.lineLength = lineLength;
        geo.angel = angel;
        geo.polygonType = "Triangle";
        return geo;
    };

    /**
     * @function SuperMap.Geometry.Polygon.createBsplinesurface
     * @description 创建3G B样条曲面，电信3G专业符号，由B样条曲线模拟生成。
     * @param origin - {SuperMap.Geometry.Point} 曲面的原点 。
     * @param height - {float} 外接矩形的高度。
     * @param width - {float} 外接矩形的宽度。
     * @param angel - {float} 旋转角度，单位为degrees，沿着x轴正方向的逆时针方向。
     * @param resolution - {float} 当前地图的分辨率，固定大小下输入，其他情况不需要此参数。备注：Geometry内部单位均为地理单位，
     *                              默认用户输入的参数也为地理单位，如果传入resolution，则height、width为像素单位，内部会根据
     *                              像素值和分辨率获取地理大小后在进行构造Geometry，但最终的Geometry均为地理单位。
     * @param k - {number} 递推次数，可以控制曲线的光滑度。
     * @returns {SuperMap.Geometry.Polygon} 几何面对象。
     */
    static createBsplinesurface(origin, height, width, angel, resolution, k) {
        if (resolution == undefined)
            resolution = 1;

        if (k == undefined)
            k = 10;

        var pointList = [];
        pointList.push(origin);
        pointList.push(origin);

        pointList.push(new Point(origin.x + height * resolution * 2 / 3, origin.y + width * resolution / 2));
        pointList.push(new Point(origin.x + height * resolution, origin.y + width * resolution / 2));
        pointList.push(new Point(origin.x + height * resolution, origin.y - width * resolution / 2));
        pointList.push(new Point(origin.x + height * resolution * 2 / 3, origin.y - width * resolution / 2));

        pointList.push(origin);
        pointList.push(origin);

        var pointList2 = [];
        var i, j, a0, a1, a2, dt, t1, t2;
        var t_x, t_y;
        var n = pointList.length;
        dt = 1.0 / k;

        pointList2.push(new Point((pointList[0].x + pointList[1].x) / 2, (pointList[0].y + pointList[1].y) / 2));

        for (i = 1; i < n - 1; i++) {
            for (j = 0; j <= k; j++) {
                t1 = j * dt;
                t2 = t1 * t1;

                a0 = (t2 - 2 * t1 + 1) / 2.0;
                a1 = (2 * t1 - 2 * t2 + 1) / 2.0;
                a2 = t2 / 2.0;

                t_x = a0 * pointList[i - 1].x + a1 * pointList[i].x + a2 * pointList[i + 1].x;
                t_y = a0 * pointList[i - 1].y + a1 * pointList[i].y + a2 * pointList[i + 1].y;
                pointList2.push(new Point(t_x, t_y));
            }
        }

        var ring = new LinearRing(pointList2);
        ring.rotate(parseFloat(angel), origin);
        var geo = new Collection([ring]);
        geo.origin = origin;
        geo.height = height;
        geo.width = width;
        geo.angel = angel;
        geo.polygonType = "Bspline";
        return geo;
    };

    CLASS_NAME = "SuperMap.Geometry.Polygon"
}

SuperMap.Geometry.Polygon = Polygon;