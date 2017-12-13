import {Area} from './Area';
import {Color} from './Color';
import {ComputeBoundingBox} from './ComputeBoundingBox';
import {Curve} from './Curve';
import {Env} from './Env';
import {Event} from './Event';
import {Http} from './Http';
import {Log} from './Log';
import {Math as SMath} from './Math';
import {Matrix} from './Matrix';
import {Util} from './Util';
import {Vector} from './Vector';

export class SUtil {
    /**
     * APIFunction: SuperMap.LevelRenderer.SUtil_smoothBezier
     * 贝塞尔平滑曲线。
     *
     * Parameters:
     * points - {Array} 线段顶点数组。
     * smooth - {Number} 平滑等级, 0-1。
     * isLoop - {Boolean} isLoop。
     * constraint - {Array} 将计算出来的控制点约束在一个包围盒内，比如 [[0, 0], [100, 100]], 这个包围盒会与整个折线的包围盒做一个并集用来约束控制点。
     * originalPosition - {Array} 参考原点。默认值：[0, 0]。
     *
     * Returns:
     * {Array} 生成的平滑节点数组。
     */
    static SUtil_smoothBezier(points, smooth, isLoop, constraint, originalPosition) {
        if (!originalPosition || originalPosition !== 2) {
            originalPosition = [0, 0];
        }
        var __OP = originalPosition;

        var cps = [];

        var v = [];
        var v1 = [];
        var v2 = [];

        var hasConstraint = !!constraint;
        var min, max;
        if (hasConstraint) {
            min = [Infinity, Infinity];
            max = [-Infinity, -Infinity];
            let len = points.length;
            for (let i = 0; i < len; i++) {
                SUtil.Util_vector.min(min, min, [points[i][0] + __OP[0], points[i][1] + __OP[1]]);
                SUtil.Util_vector.max(max, max, [points[i][0] + __OP[0], points[i][1] + __OP[1]]);
            }
            // 与指定的包围盒做并集
            SUtil.Util_vector.min(min, min, constraint[0]);
            SUtil.Util_vector.max(max, max, constraint[1]);
        }

        let len = points.length;
        for (let i = 0; i < len; i++) {
            let point = [points[i][0] + __OP[0], points[i][1] + __OP[1]];
            let prevPoint;
            let nextPoint;

            if (isLoop) {
                prevPoint = [points[i ? i - 1 : len - 1][0] + __OP[0], points[i ? i - 1 : len - 1][1] + __OP[1]];
                nextPoint = [points[(i + 1) % len][0] + __OP[0], points[(i + 1) % len][1] + __OP[1]];
            } else {
                if (i === 0 || i === len - 1) {
                    cps.push([points[i][0] + __OP[0], points[i][1] + __OP[1]]);
                    continue;
                } else {
                    prevPoint = [points[i - 1][0] + __OP[0], points[i - 1][1] + __OP[1]];
                    nextPoint = [points[i + 1][0] + __OP[0], points[i + 1][1] + __OP[1]];
                }
            }

            SUtil.Util_vector.sub(v, nextPoint, prevPoint);

            // use degree to scale the handle length
            SUtil.Util_vector.scale(v, v, smooth);

            let d0 = SUtil.Util_vector.distance(point, prevPoint);
            let d1 = SUtil.Util_vector.distance(point, nextPoint);
            let sum = d0 + d1;
            if (sum !== 0) {
                d0 /= sum;
                d1 /= sum;
            }

            SUtil.Util_vector.scale(v1, v, -d0);
            SUtil.Util_vector.scale(v2, v, d1);
            let cp0 = SUtil.Util_vector.add([], point, v1);
            let cp1 = SUtil.Util_vector.add([], point, v2);
            if (hasConstraint) {
                SUtil.Util_vector.max(cp0, cp0, min);
                SUtil.Util_vector.min(cp0, cp0, max);
                SUtil.Util_vector.max(cp1, cp1, min);
                SUtil.Util_vector.min(cp1, cp1, max);
            }
            cps.push(cp0);
            cps.push(cp1);
        }

        if (isLoop) {
            cps.push(cps.shift());
        }

        return cps;
    }

    /**
     * APIFunction: SuperMap.LevelRenderer.SUtil_smoothSpline
     * 插值折线。
     *
     * Parameters:
     * points - {Array} 线段顶点数组。
     * isLoop - {Boolean} isLoop。
     * constraint - {Array} 将计算出来的控制点约束在一个包围盒内，比如 [[0, 0], [100, 100]], 这个包围盒会与整个折线的包围盒做一个并集用来约束控制点。
     * originalPosition - {Array} 参考原点。默认值：[0, 0]。
     *
     * Returns:
     * {Array} 生成的平滑节点数组。
     */
    static SUtil_smoothSpline(points, isLoop, constraint, originalPosition) {
        if (!originalPosition || originalPosition !== 2) {
            originalPosition = [0, 0];
        }
        var __OP = originalPosition;

        var len = points.length;
        var ret = [];

        var distance = 0;
        for (let i = 1; i < len; i++) {
            distance += SUtil.Util_vector.distance([points[i - 1][0] + __OP[0], points[i - 1][1] + __OP[1]], [points[i][0] + __OP[0], points[i][1] + __OP[1]]);
        }

        var segs = distance / 5;
        segs = segs < len ? len : segs;
        for (let i = 0; i < segs; i++) {
            let pos = i / (segs - 1) * (isLoop ? len : len - 1);
            let idx = Math.floor(pos);

            let w = pos - idx;

            let p0;
            let p1 = [points[idx % len][0] + __OP[0], points[idx % len][1] + __OP[1]];
            let p2;
            let p3;
            if (!isLoop) {
                p0 = [points[idx === 0 ? idx : idx - 1][0] + __OP[0], points[idx === 0 ? idx : idx - 1][1] + __OP[1]];
                p2 = [points[idx > len - 2 ? len - 1 : idx + 1][0] + __OP[0], points[idx > len - 2 ? len - 1 : idx + 1][1] + __OP[1]];
                p3 = [points[idx > len - 3 ? len - 1 : idx + 2][0] + __OP[0], points[idx > len - 3 ? len - 1 : idx + 2][1] + __OP[1]];
            } else {

                p0 = [points[(idx - 1 + len) % len][0] + __OP[0], points[(idx - 1 + len) % len][1] + __OP[1]];
                p2 = [points[(idx + 1) % len][0] + __OP[0], points[(idx + 1) % len][1] + __OP[1]];
                p3 = [points[(idx + 2) % len][0] + __OP[0], points[(idx + 2) % len][1] + __OP[1]];
            }

            let w2 = w * w;
            let w3 = w * w2;

            ret.push([
                interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
                interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
            ]);
        }
        return ret;

        // inner Function
        function interpolate(p0, p1, p2, p3, t, t2, t3) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            return (2 * (p1 - p2) + v0 + v1) * t3
                + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
                + v0 * t + p1;
        }
    }

    /**
     * APIFunction: SuperMap.LevelRenderer.SUtil_dashedLineTo
     * 虚线 lineTo。
     */
    static SUtil_dashedLineTo(ctx, x1, y1, x2, y2, dashLength, customDashPattern) {
        // http://msdn.microsoft.com/en-us/library/ie/dn265063(v=vs.85).aspx
        var dashPattern = [5, 5];
        dashLength = typeof dashLength != 'number'
            ? 5
            : dashLength;

        if (ctx.setLineDash) {
            dashPattern[0] = dashLength;
            dashPattern[1] = dashLength;

            if (customDashPattern && (customDashPattern instanceof Array)) {
                ctx.setLineDash(customDashPattern);
            } else {
                ctx.setLineDash(dashPattern);
            }
            // ctx.setLineDash(dashPattern);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            return;
        }

        var dx = x2 - x1;
        var dy = y2 - y1;
        var numDashes = Math.floor(
            Math.sqrt(dx * dx + dy * dy) / dashLength
        );
        dx = dx / numDashes;
        dy = dy / numDashes;
        var flag = true;
        for (var i = 0; i < numDashes; ++i) {
            if (flag) {
                ctx.moveTo(x1, y1);
            } else {
                ctx.lineTo(x1, y1);
            }
            flag = !flag;
            x1 += dx;
            y1 += dy;
        }
        ctx.lineTo(x2, y2);
    }
}
// 把所有工具对象放到全局静态变量上，以便直接调用工具方法，
// 避免使用工具时频繁的创建工具对象带来的性能消耗。
SUtil.Util_area = new Area();
SUtil.Util_color = new Color();
SUtil.Util_computeBoundingBox = new ComputeBoundingBox();
SUtil.Util_curve = new Curve();
SUtil.Util_env = new Env();
SUtil.Util_event = new Event();
SUtil.Util_http = new Http();
SUtil.Util_log = new Log();
SUtil.Util_math = new SMath();
SUtil.Util_matrix = new Matrix();
SUtil.Util = new Util();
SUtil.Util_vector = new Vector();
