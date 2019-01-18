/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {Point} from './Point';
import {Curve} from './Curve';

/**
 * @class SuperMap.Geometry.LineString
 * @classdesc 几何对象线串类。
 * @category BaseTypes Geometry
 * @param {Array.<SuperMap.Geometry.Point>} points - 用来生成线串的点数组。
 * @extends {SuperMap.Geometry.Curve}
 * @example
 * var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
 *     new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
 *     new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
 *     new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
 *     new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)],
 * var roadLine = new SuperMap.Geometry.LineString(points)；
 */
export class LineString extends Curve {

    constructor(points) {
        super(points);
        this.CLASS_NAME = "SuperMap.Geometry.LineString";
        this.geometryType = "LineString";
    }

    /**
     * @function SuperMap.Geometry.LineString.prototype.removeComponent
     * @description 只有在线串上有三个或更多的点的时候，才会允许移除点（否则结果将会是单一的点）。
     * @param {SuperMap.Geometry.Point} point - 将被删除的点。
     * @returns {boolean} 删除的点。
     */
    removeComponent(point) { // eslint-disable-line no-unused-vars
        var removed = this.components && (this.components.length > 2);
        if (removed) {
            super.removeComponent.apply(this, arguments);
        }
        return removed;
    }

    /**
     * @function SuperMap.Geometry.LineString.prototype.getSortedSegments
     * @returns {Array} An array of segment objects.  Segment objects have properties
     *     x1, y1, x2, and y2.  The start point is represented by x1 and y1.
     *     The end point is represented by x2 and y2.  Start and end are
     *     ordered so that x1 < x2.
     */
    getSortedSegments() {
        var numSeg = this.components.length - 1;
        var segments = new Array(numSeg), point1, point2;
        for (var i = 0; i < numSeg; ++i) {
            point1 = this.components[i];
            point2 = this.components[i + 1];
            if (point1.x < point2.x) {
                segments[i] = {
                    x1: point1.x,
                    y1: point1.y,
                    x2: point2.x,
                    y2: point2.y
                };
            } else {
                segments[i] = {
                    x1: point2.x,
                    y1: point2.y,
                    x2: point1.x,
                    y2: point1.y
                };
            }
        }

        // more efficient to define this somewhere static
        function byX1(seg1, seg2) {
            return seg1.x1 - seg2.x1;
        }

        return segments.sort(byX1);
    }

    /**
     * @function SuperMap.Geometry.LineString.prototype.getVertices
     * @description 返回几何图形的所有顶点的列表。
     * @param {boolean} [nodes] - 对于线来说，仅仅返回作为端点的顶点，如果设为 false，则返回非端点的顶点。如果没有设置此参数，则返回所有顶点。
     * @returns {Array} 几何图形的顶点列表。
     */
    getVertices(nodes) {
        var vertices;
        if (nodes === true) {
            vertices = [
                this.components[0],
                this.components[this.components.length - 1]
            ];
        } else if (nodes === false) {
            vertices = this.components.slice(1, this.components.length - 1);
        } else {
            vertices = this.components.slice();
        }
        return vertices;
    }

    /**
     * @function SuperMap.Geometry.LineString.calculateCircle
     * @description 三点画圆弧。
     * @param {Array.<SuperMap.Geometry.Point>} points - 传入的待计算的初始点串。
     * @returns {Array.<SuperMap.Geometry.Point>} 计算出相应的圆弧控制点。
     * @example
     * var points = [];
     * points.push(new SuperMap.Geometry.Point(-50,30));
     * points.push(new SuperMap.Geometry.Point(-30,50));
     * points.push(new SuperMap.Geometry.Point(2,60));
     * var circle = SuperMap.Geometry.LineString.calculateCircle(points);
     */
    static calculateCircle(points) {
        if (points.length < 3) {
            return points
        }
        var centerPoint = {},
            p1 = points[0],
            p2 = points[1],
            p3 = points[2];
        var R = 0,
            dStep = 0,
            direc = true,
            dRotation = 0,
            dRotationBegin = 0,
            dRotationAngle = 0,
            nSegmentCount = 72,
            circlePoints = [];

        var KTan13 = (p3.y - p1.y) / (p3.x - p1.x);
        var B13 = p3.y - KTan13 * p3.x;
        if ((((p3.x != p1.x) && (p3.y != p1.y)) && (p2.y == KTan13 * p2.x + B13)) ||
            ((p3.x == p1.x) && (p2.x == p1.x)) || ((p3.y == p1.y) && (p2.y == p1.y)) ||
            ((p3.x == p1.x) && (p3.y == p1.y)) || ((p3.x == p2.x) && (p3.y == p2.y)) || ((p1.x == p2.x) && (p1.y == p2.y))) {
            circlePoints.push(p1);
            circlePoints.push(p2);
            circlePoints.push(p3);
        } else {
            var D = ((p2.x * p2.x + p2.y * p2.y) - (p1.x * p1.x + p1.y * p1.y)) * (2 * (p3.y - p1.y)) - ((p3.x * p3.x + p3.y * p3.y) -
                (p1.x * p1.x + p1.y * p1.y)) * (2 * (p2.y - p1.y));
            var E = (2 * (p2.x - p1.x)) * ((p3.x * p3.x + p3.y * p3.y) - (p1.x * p1.x + p1.y * p1.y)) -
                (2 * (p3.x - p1.x)) * ((p2.x * p2.x + p2.y * p2.y) - (p1.x * p1.x + p1.y * p1.y));
            var F = 4 * ((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y));
            centerPoint.x = D / F;
            centerPoint.y = E / F;
            R = Math.sqrt((p1.x - centerPoint.x) * (p1.x - centerPoint.x) + (p1.y - centerPoint.y) * (p1.y - centerPoint.y));

            var dis = (p1.x - p3.x) * (p1.x - p3.x) + (p1.y - p3.y) * (p1.y - p3.y);
            var cons = (2 * R * R - dis) / (2 * R * R);
            cons = cons >= 1 ? 1 : cons;
            cons = cons <= -1 ? -1 : cons;
            dRotationAngle = Math.acos(cons) * 180 / Math.PI;

            if (p3.x == p1.x) {
                dRotationAngle = ((centerPoint.x > p1.x && p2.x > p1.x) || (centerPoint.x < p1.x && p2.x < p1.x)) ? (360 - dRotationAngle) : dRotationAngle;
            } else {
                dRotationAngle = ((centerPoint.y > (KTan13 * centerPoint.x + B13) && p2.y > (KTan13 * p2.x + B13)) ||
                    (centerPoint.y < (KTan13 * centerPoint.x + B13) && p2.y < (KTan13 * p2.x + B13))) ? (360 - dRotationAngle) : dRotationAngle;
            }
            dStep = dRotationAngle / 72;

            if (p3.y != p1.y) {
                if (p3.x == p1.x) {
                    if (p3.y > p1.y) {
                        if (p2.x < p1.x) {
                            direc = false;
                        }
                    } else {
                        if (p2.x > p1.x) {
                            direc = false;
                        }
                    }
                } else if (p3.x < p1.x) {
                    if (p2.y < KTan13 * p2.x + B13) {
                        direc = false;
                    }
                } else {
                    if (p2.y > KTan13 * p2.x + B13) {
                        direc = false;
                    }
                }
            } else {
                if (p3.x > p1.x) {
                    if (p2.y > p1.y) {
                        direc = false;
                    }
                } else {
                    if (p2.y < p1.y) {
                        direc = false;
                    }
                }
            }

            var K10 = (p1.y - centerPoint.y) / (p1.x - centerPoint.x);
            var atan10 = K10 >= 0 ? Math.atan(K10) * 180 / Math.PI : Math.abs(Math.atan(K10) * 180 / Math.PI) + 90;

            var CY = Math.abs(centerPoint.y);
            if ((p1.y == CY) && (CY == p3.y)) {
                if (p1.x < p3.x) {
                    atan10 = atan10 + 180;
                }
            }

            var newPY = p1.y - centerPoint.y;
            circlePoints.push(p1);
            for (var i = 1; i < nSegmentCount; i++) {
                dRotation = dStep * i;
                dRotationBegin = atan10;

                if (direc) {
                    if (newPY >= 0) {
                        if (K10 >= 0) {
                            dRotationBegin = dRotationBegin + dRotation;
                        } else {
                            dRotationBegin = (180 - (dRotationBegin - 90)) + dRotation;
                        }
                    } else {
                        if (K10 > 0) {
                            dRotationBegin = (dRotationBegin - 180) + dRotation;
                        } else {
                            dRotationBegin = (90 - dRotationBegin) + dRotation;
                        }
                    }
                } else {
                    if (newPY >= 0) {
                        if (K10 >= 0) {
                            dRotationBegin = dRotationBegin - dRotation;
                        } else {
                            dRotationBegin = (180 - (dRotationBegin - 90)) - dRotation;
                        }
                    } else {
                        if (K10 >= 0) {
                            dRotationBegin = (dRotationBegin - 180) - dRotation;
                        } else {
                            dRotationBegin = (90 - dRotationBegin) - dRotation;
                        }
                    }
                }

                dRotationBegin = dRotationBegin * Math.PI / 180;
                var x = centerPoint.x + R * Math.cos(dRotationBegin);
                var y = centerPoint.y + R * Math.sin(dRotationBegin);
                circlePoints.push(new Point(x, y));
            }
            circlePoints.push(p3);
        }
        return circlePoints;
    }

    /**
     * @function SuperMap.Geometry.LineString.createLineEPS
     * @description 根据点的类型画出不同类型的曲线。
     * 点的类型有三种：LTypeArc，LTypeCurve，NONE。
     * @param {Array.<SuperMap.Geometry.Point>} points - 传入的待计算的初始点串。
     * @returns {Array.<SuperMap.Geometry.Point>} 计算出相应的 lineEPS 控制点。
     * @example
     * var points = [];
     * points.push(new SuperMap.Geometry.Point(-50,30));
     * points.push(new SuperMap.Geometry.Point(-30,50,"LTypeArc"));
     * points.push(new SuperMap.Geometry.Point(2,60));
     * points.push(new SuperMap.Geometry.Point(8,20));
     * var lineEPS = SuperMap.Geometry.LineString.createLineEPS(points);
     */
    static createLineEPS(points) {
        var list = [],
            len = points.length;
        if (len < 2) {
            return points;
        }
        for (var i = 0; i < len;) {
            var type = points[i].type;
            if (type == 'LTypeArc') {
                var listObj = LineString.createLineArc(list, i, len, points);
                list = listObj[0];
                i = listObj[1];
            } else {
                list.push(points[i]);
                i++;
            }
        }
        return list;
    }

    static createLineArc(list, i, len, points) {
        if (i == 0) {
            let bezierPtsObj = LineString.addPointEPS(points, i, len, 'LTypeArc');
            Array.prototype.push.apply(list, bezierPtsObj[0]);
            i = bezierPtsObj[1] + 1;
        } else if (i == len - 1) {
            var bezierP = [points[i - 1], points[i]],
                bezierPts = LineString.calculateCircle(bezierP);
            Array.prototype.push.apply(list, bezierPts);
            i++;
        } else {
            let bezierPtsObj = LineString.addPointEPS(points, i, len, 'LTypeArc');
            list.pop();
            Array.prototype.push.apply(list, bezierPtsObj[0]);
            i = bezierPtsObj[1] + 1;
        }
        return [list, i];
    }

    static addPointEPS(points, i, len, type) {
        var bezierP = [], j = i + 1;
        if (i == 0) {
            Array.prototype.push.apply(bezierP, [points[i], points[i + 1]]);
        } else if (i == len - 1) {
            Array.prototype.push.apply(bezierP, [points[i - 1], points[i]]);
        } else {
            Array.prototype.push.apply(bezierP, [points[i - 1], points[i], points[i + 1]]);
        }
        var bezierPts;
        if (type == 'LTypeCurve') {
            bezierPts = LineString.calculatePointsFBZN(bezierP);
        } else if (type == 'LTypeArc') {
            bezierPts = LineString.calculateCircle(bezierP);
        }
        return [bezierPts, j];
    }
}

SuperMap.Geometry.LineString = LineString;

 