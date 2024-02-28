/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Vector} from './Vector';

/**
 * @class  LevelRenderer.Tool.Curve
 * @category Visualization Theme
 * @classdesc LevelRenderer 工具-曲线
 * @private
 */
export class Curve {
    constructor() {
        /**
         * @member {LevelRenderer.Tool.Vector} LevelRenderer.Tool.Curve.prototype.vector
         * @description 矢量工具。
         */
        this.vector = new Vector();

        /**
         * @member {number} LevelRenderer.Tool.Curve.prototype.EPSILON
         * @description e。
         */
        this.EPSILON = 1e-4;

        /**
         * @member {number} LevelRenderer.Tool.Curve.prototype.THREE_SQRT
         * @description 3 的平方根。
         */
        this.THREE_SQRT = Math.sqrt(3);

        /**
         * @member {number} LevelRenderer.Tool.Curve.prototype.ONE_THIRD
         * @description 1/3。
         */
        this.ONE_THIRD = 1 / 3;

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Curve";
    }


    /*
     * Method: evalCubicCoeff
     *
     * Parameters:
     * a - {number} 值。
     * b - {number} 值。
     * c - {number} 值。
     * d - {number} 值。
     * t - {number} 值。
     *
     * Returns:
     * {number}
     */

    /*
     evalCubicCoeff: function(a, b, c, d, t){
     return ((a * t + b) * t + c) * t + d;
     },
     */

    /**
     * @function LevelRenderer.Tool.Curve.prototype.isAroundZero
     * @description 判断一个值是否趋于0，判断参考值：1e-4。
     * @param {number} val - 值。
     * @returns {boolean} 值是否趋于0。
     */
    isAroundZero(val) {
        return val > -this.EPSILON && val < this.EPSILON;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.isNotAroundZero
     * @description 判断一个值是否不趋于0，判断参考值：1e-4。
     * @param {number} val - 值。
     * @returns {boolean} 值是否不趋于0。
     */
    isNotAroundZero(val) {
        return val > this.EPSILON || val < -this.EPSILON;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.cubicAt
     * @description 计算三次贝塞尔值
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} p3 - 点p3。
     * @param {number} t - t值。
     * @returns {number} 三次贝塞尔值。
     */
    cubicAt(p0, p1, p2, p3, t) {
        var onet = 1 - t;
        return onet * onet * (onet * p0 + 3 * t * p1)
            + t * t * (t * p3 + 3 * onet * p2);
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.cubicDerivativeAt
     * @description 计算三次贝塞尔导数值
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} p3 - 点p3。
     * @param {number} t - t值。
     * @returns {number} 三次贝塞尔导数值。
     */
    cubicDerivativeAt(p0, p1, p2, p3, t) {
        var onet = 1 - t;
        return 3 * (
            ((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
            + (p3 - p2) * t * t
        );
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.cubicRootAt
     * @description 计算三次贝塞尔方程根，使用盛金公式
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} p3 - 点p3。
     * @param {number} val - 值。
     * @param {Array.<number>} roots - 有效根数目。
     * @returns {number} 有效根。
     */
    cubicRootAt(p0, p1, p2, p3, val, roots) {
        // Evaluate roots of cubic functions
        var a = p3 + 3 * (p1 - p2) - p0;
        var b = 3 * (p2 - p1 * 2 + p0);
        var c = 3 * (p1 - p0);
        var d = p0 - val;

        var A = b * b - 3 * a * c;
        var B = b * c - 9 * a * d;
        var C = c * c - 3 * b * d;

        var n = 0;

        if (this.isAroundZero(A) && this.isAroundZero(B)) {
            if (this.isAroundZero(b)) {
                roots[0] = 0;
            } else {
                let t1 = -c / b;  //t1, t2, t3, b is not zero
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        } else {
            var disc = B * B - 4 * A * C;

            if (this.isAroundZero(disc)) {
                var K = B / A;
                let t1 = -b / a + K;  // t1, a is not zero
                let t2 = -K / 2;  // t2, t3
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            } else if (disc > 0) {
                let discSqrt = Math.sqrt(disc);
                let Y1 = A * b + 1.5 * a * (-B + discSqrt);
                let Y2 = A * b + 1.5 * a * (-B - discSqrt);
                if (Y1 < 0) {
                    Y1 = -Math.pow(-Y1, this.ONE_THIRD);
                } else {
                    Y1 = Math.pow(Y1, this.ONE_THIRD);
                }
                if (Y2 < 0) {
                    Y2 = -Math.pow(-Y2, this.ONE_THIRD);
                } else {
                    Y2 = Math.pow(Y2, this.ONE_THIRD);
                }
                let t1 = (-b - (Y1 + Y2)) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            } else {
                var T = (2 * A * b - 3 * a * B) / (2 * Math.sqrt(A * A * A));
                var theta = Math.acos(T) / 3;
                var ASqrt = Math.sqrt(A);
                var tmp = Math.cos(theta);

                let t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
                let t2 = (-b + ASqrt * (tmp + this.THREE_SQRT * Math.sin(theta))) / (3 * a);
                let t3 = (-b + ASqrt * (tmp - this.THREE_SQRT * Math.sin(theta))) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
                if (t3 >= 0 && t3 <= 1) {
                    roots[n++] = t3;
                }
            }
        }
        return n;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.cubicRootAt
     * @description 计算三次贝塞尔方程极限值的位置
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} p3 - 点p3。
     * @param {Array.<number>} extrema - 值。
     * @returns {number} 有效数目。
     */
    cubicExtrema(p0, p1, p2, p3, extrema) {
        var b = 6 * p2 - 12 * p1 + 6 * p0;
        var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
        var c = 3 * p1 - 3 * p0;

        var n = 0;
        if (this.isAroundZero(a)) {
            if (this.isNotAroundZero(b)) {
                let t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
            }
        } else {
            var disc = b * b - 4 * a * c;
            if (this.isAroundZero(disc)) {
                extrema[0] = -b / (2 * a);
            } else if (disc > 0) {
                let discSqrt = Math.sqrt(disc);
                let t1 = (-b + discSqrt) / (2 * a);
                let t2 = (-b - discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    extrema[n++] = t2;
                }
            }
        }
        return n;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.cubicSubdivide
     * @description 细分三次贝塞尔曲线
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} p3 - 点p3。
     * @param {number} t - t值。
     * @param {Array.<number>} out - 投射点。
     * @returns {number} 投射点。
     */
    cubicSubdivide(p0, p1, p2, p3, t, out) {
        var p01 = (p1 - p0) * t + p0;
        var p12 = (p2 - p1) * t + p1;
        var p23 = (p3 - p2) * t + p2;

        var p012 = (p12 - p01) * t + p01;
        var p123 = (p23 - p12) * t + p12;

        var p0123 = (p123 - p012) * t + p012;
        // Seg0
        out[0] = p0;
        out[1] = p01;
        out[2] = p012;
        out[3] = p0123;
        // Seg1
        out[4] = p0123;
        out[5] = p123;
        out[6] = p23;
        out[7] = p3;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.cubicProjectPoint
     * @description 投射点到三次贝塞尔曲线上，返回投射距离。投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
     * @param {number} x0 - 点p0横坐标。
     * @param {number} y0 - 点p0纵坐标。
     * @param {number} x1 - 点p1横坐标。
     * @param {number} y1 - 点p1纵坐标。
     * @param {number} x2 - 点p2横坐标。
     * @param {number} y2 - 点p2纵坐标。
     * @param {number} x3 - 点p3横坐标。
     * @param {number} y3 - 点p3纵坐标。
     * @param {number} x - 点p横坐标。
     * @param {number} y - 点p纵坐标。
     * @param {Array.<number>} out - 投射点。
     * @returns {number} 投射点。
     */
    cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
        // 临时变量
        var _v0 = this.vector.create();
        var _v1 = this.vector.create();
        var _v2 = this.vector.create();
        // var _v3 = vector.create();

        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // 先粗略估计一下可能的最小距离的 t 值
        // PENDING
        for (let _t = 0; _t < 1; _t += 0.05) {
            _v1[0] = this.cubicAt(x0, x1, x2, x3, _t);
            _v1[1] = this.cubicAt(y0, y1, y2, y3, _t);
            let d1 = this.vector.distSquare(_v0, _v1);
            if (d1 < d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (let i = 0; i < 32; i++) {
            if (interval < this.EPSILON) {
                break;
            }
            let prev = t - interval;
            let next = t + interval;
            // t - interval
            _v1[0] = this.cubicAt(x0, x1, x2, x3, prev);
            _v1[1] = this.cubicAt(y0, y1, y2, y3, prev);

            let d1 = this.vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 < d) {
                t = prev;
                d = d1;
            } else {
                // t + interval
                _v2[0] = this.cubicAt(x0, x1, x2, x3, next);
                _v2[1] = this.cubicAt(y0, y1, y2, y3, next);
                let d2 = this.vector.distSquare(_v2, _v0);

                if (next <= 1 && d2 < d) {
                    t = next;
                    d = d2;
                } else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = this.cubicAt(x0, x1, x2, x3, t);
            out[1] = this.cubicAt(y0, y1, y2, y3, t);
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.quadraticAt
     * @description 计算二次方贝塞尔值。
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} t - t值。
     * @returns {number} 二次方贝塞尔值。
     */
    quadraticAt(p0, p1, p2, t) {
        var onet = 1 - t;
        return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.quadraticAt
     * @description 计算二次方贝塞尔导数值。
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} t - t值。
     * @returns {number} 二次方贝塞尔导数值。
     */
    quadraticDerivativeAt(p0, p1, p2, t) {
        return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.quadraticRootAt
     * @description 计算二次方贝塞尔方程根
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @param {number} val - 值。
     * @param {Array.<number>} roots - 有效根数目。
     * @returns {number} 有效根数目。
     */
    quadraticRootAt(p0, p1, p2, val, roots) {
        var a = p0 - 2 * p1 + p2;
        var b = 2 * (p1 - p0);
        var c = p0 - val;

        var n = 0;
        if (this.isAroundZero(a)) {
            if (this.isNotAroundZero(b)) {
                var t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        } else {
            var disc = b * b - 4 * a * c;
            if (this.isAroundZero(disc)) {
                let t1 = -b / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            } else if (disc > 0) {
                let discSqrt = Math.sqrt(disc);
                let t1 = (-b + discSqrt) / (2 * a);
                let t2 = (-b - discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            }
        }
        return n;
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.quadraticExtremum
     * @description 计算二次贝塞尔方程极限值
     * @param {number} p0 - 点p0。
     * @param {number} p1 - 点p1。
     * @param {number} p2 - 点p2。
     * @returns {number} 二次贝塞尔方程极限值。
     */
    quadraticExtremum(p0, p1, p2) {
        var divider = p0 + p2 - 2 * p1;
        if (divider === 0) {
            // p1 is center of p0 and p2
            return 0.5;
        } else {
            return (p0 - p1) / divider;
        }
    }


    /**
     * @function LevelRenderer.Tool.Curve.prototype.quadraticProjectPoint
     * @description 投射点到二次贝塞尔曲线上，返回投射距离。投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
     * @param {number} x0 - 点p0横坐标。
     * @param {number} y0 - 点p0纵坐标。
     * @param {number} x1 - 点p1横坐标。
     * @param {number} y1 - 点p1纵坐标。
     * @param {number} x2 - 点p2横坐标。
     * @param {number} y2 - 点p2纵坐标。
     * @param {number} x - 点p横坐标。
     * @param {number} y - 点p纵坐标。
     * @param {Array.<number>} out - 投射点。
     * @returns {number} 投射距离。
     */
    quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
        // 临时变量
        var _v0 = this.vector.create();
        var _v1 = this.vector.create();
        var _v2 = this.vector.create();

        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // 先粗略估计一下可能的最小距离的 t 值
        // PENDING
        for (let _t = 0; _t < 1; _t += 0.05) {
            _v1[0] = this.quadraticAt(x0, x1, x2, _t);
            _v1[1] = this.quadraticAt(y0, y1, y2, _t);
            let d1 = this.vector.distSquare(_v0, _v1);
            if (d1 < d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (let i = 0; i < 32; i++) {
            if (interval < this.EPSILON) {
                break;
            }
            let prev = t - interval;
            let next = t + interval;
            // t - interval
            _v1[0] = this.quadraticAt(x0, x1, x2, prev);
            _v1[1] = this.quadraticAt(y0, y1, y2, prev);

            let d1 = this.vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 < d) {
                t = prev;
                d = d1;
            } else {
                // t + interval
                _v2[0] = this.quadraticAt(x0, x1, x2, next);
                _v2[1] = this.quadraticAt(y0, y1, y2, next);
                let d2 = this.vector.distSquare(_v2, _v0);
                if (next <= 1 && d2 < d) {
                    t = next;
                    d = d2;
                } else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = this.quadraticAt(x0, x1, x2, t);
            out[1] = this.quadraticAt(y0, y1, y2, t);
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }

}
