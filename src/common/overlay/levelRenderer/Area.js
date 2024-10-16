/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from './Util';
import {Curve} from './Curve';

/**
 * @class  LevelRenderer.Tool.Area
 * @category Visualization Theme
 * @classdesc LevelRenderer 工具-图形范围判断
 * @private
 */
export class Area {
    constructor() {
        /**
         * @member {LevelRenderer.Tool.Util}  LevelRenderer.Tool.Areal.prototype.util
         * @description 基础工具对象。
         */
        this.util = new Util();

        /**
         * @member {LevelRenderer.Tool.Curve}  LevelRenderer.Tool.Areal.prototype.curve
         * @description 曲线工具对象
         */
        this.curve = new Curve();

        /**
         * @member {Object} LevelRenderer.Tool.Areal.prototype._ctx
         * @description Cavans2D 渲染上下文
         */
        this._ctx = null;

        /**
         * @member {Object} LevelRenderer.Tool.Areal.prototype._textWidthCache
         * @description 文本宽度缓存
         */
        this._textWidthCache = {};

        /**
         * @member {Object} LevelRenderer.Tool.Areal.prototype._textHeightCache
         * @description 文本高度缓存
         */
        this._textHeightCache = {};

        /**
         * @member {number} LevelRenderer.Tool.Areal.prototype._textWidthCacheCounter
         * @description 文本宽度缓存数量
         */
        this._textWidthCacheCounter = 0;

        /**
         * @member {number} LevelRenderer.Tool.Areal.prototype._textHeightCacheCounter
         * @description 文本高度缓存数量
         */
        this._textHeightCacheCounter = 0;

        /**
         * @member {number} LevelRenderer.Tool.Areal.prototype.TEXT_CACHE_MAX
         * @description 文本最大缓存数量
         */
        this.TEXT_CACHE_MAX = 5000;

        /**
         * @member {number} LevelRenderer.Tool.Areal.prototype.PI2
         * @description 2*PI 的值
         */
        this.PI2 = Math.PI * 2;

        /**
         * @member {Array.<number>} LevelRenderer.Tool.Areal.prototype.roots
         * @description 临时数组
         */
        this.roots = [-1, -1, -1];

        /**
         * @member {Array.<number>} LevelRenderer.Tool.Areal.prototype.extrema
         * @description 临时数组
         */
        this.extrema = [-1, -1];

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Area";
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.normalizeRadian
     * @description 弧度标准化函数。
     * @param {number} angle - 弧度值。
     * @returns {number} 标准化后的弧度值。
     */
    normalizeRadian(angle) {
        angle %= this.PI2;
        if (angle < 0) {
            angle += this.PI2;
        }
        return angle;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInside
     * @description 包含判断。
     * @param {Object} shape - 图形。
     * @param {number} area - 目标区域。
     * @param {number} x - 横坐标。
     * @param {number} y - 纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置。
     */
    isInside(shape, area, x, y) {
        if (!area || !shape) {
            // 无参数或不支持类型
            return false;
        }
        var zoneType = shape.type;

        this._ctx = this._ctx || this.util.getContext();

        // 未实现或不可用时则数学运算，主要是line，brokenLine，ring
        var _mathReturn = this._mathMethod(shape, area, x, y);
        if (typeof _mathReturn != 'undefined') {
            return _mathReturn;
        }

        if (shape.buildPath && this._ctx.isPointInPath) {
            return this._buildPathMethod(shape, this._ctx, area, x, y);
        }

        // 上面的方法都行不通时
        switch (zoneType) {
            case 'ellipse': // Todo，不精确
            case 'smicellipse': // Todo，不精确
                return true;
            // 旋轮曲线  不准确
            case 'trochoid':
                var _r = area.location == 'out'
                    ? area.r1 + area.r2 + area.d
                    : area.r1 - area.r2 + area.d;
                return this.isInsideCircle(area, x, y, _r);
            // 玫瑰线 不准确
            case 'rose' :
                return this.isInsideCircle(area, x, y, area.maxr);
            // 路径，椭圆，曲线等-----------------13
            default:
                return false;   // Todo，暂不支持
        }
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype._mathMethod
     * @description 包含判断。用数学方法判断，三个方法中最快，但是支持的shape少。
     * @param {Object} shape - 图形。
     * @param {number} area - 目标区域。
     * @param {number} x - 横坐标。
     * @param {number} y - 纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置，true表示坐标处在图形中。
     */
    _mathMethod(shape, area, x, y) {
        var zoneType = shape.type;
        // 在矩形内则部分图形需要进一步判断
        switch (zoneType) {
            // 贝塞尔曲线
            case 'bezier-curve':
                if (typeof(area.cpX2) === 'undefined') {
                    return this.isInsideQuadraticStroke(
                        area.xStart, area.yStart,
                        area.cpX1, area.cpY1,
                        area.xEnd, area.yEnd,
                        area.lineWidth, x, y
                    );
                }
                return this.isInsideCubicStroke(
                    area.xStart, area.yStart,
                    area.cpX1, area.cpY1,
                    area.cpX2, area.cpY2,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
            // 线
            case 'line':
                return this.isInsideLine(
                    area.xStart, area.yStart,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
            // 折线
            case 'broken-line':
                return this.isInsideBrokenLine(
                    area.pointList, area.lineWidth, x, y
                );
            // 扩展折线
            case 'smicbroken-line': {
                // SMIC-修改 - start
                let icX = x;
                let icY = y;
                if (shape.refOriginalPosition) {
                    icX = x - shape.refOriginalPosition[0];
                    icY = y - shape.refOriginalPosition[1];
                }
                return this.isInsideBrokenLine(
                    area.pointList, area.lineWidth, icX, icY
                );
            }
            //初始代码：
            //      return isInsideBrokenLine(
            //          area.pointList, area.lineWidth, x, y
            //      );
            // SMIC-修改 - end
            // 圆环
            case 'ring':
                return this.isInsideRing(
                    area.x, area.y, area.r0, area.r, x, y
                );
            case 'smicring': {
                let areaX = area.x;
                let areaY = area.y;
                if (shape.refOriginalPosition) {
                    areaX = area.x + shape.refOriginalPosition[0];
                    areaY = area.y + shape.refOriginalPosition[1];
                }
                return this.isInsideRing(
                    areaX, areaY, area.r0, area.r, x, y
                );
            }
            // 圆形
            case 'circle':
                return this.isInsideCircle(
                    area.x, area.y, area.r, x, y
                );
            // 扩展-点
            case 'smicpoint': {
                // SMIC-修改 - start
                let icX = x;
                let icY = y;
                if (shape.refOriginalPosition) {
                    icX = x - shape.refOriginalPosition[0];
                    icY = y - shape.refOriginalPosition[1];
                }
                return this.isInsideCircle(
                    area.x, area.y, area.r, icX, icY
                );
            }
            //初始代码：
            //  无
            // SMIC-修改 - end
            // 扇形
            case 'sector': {
                let startAngle = area.startAngle * Math.PI / 180;
                let endAngle = area.endAngle * Math.PI / 180;
                if (!area.clockWise) {
                    startAngle = -startAngle;
                    endAngle = -endAngle;
                }
                return this.isInsideSector(
                    area.x, area.y, area.r0, area.r,
                    startAngle, endAngle,
                    !area.clockWise,
                    x, y
                );
            }
            //初始代码：
            //  无
            // SMIC-增加 - end
            // 扇形
            case 'smicsector': {
                let startAngle = area.startAngle * Math.PI / 180;
                let endAngle = area.endAngle * Math.PI / 180;
                if (!area.clockWise) {
                    startAngle = -startAngle;
                    endAngle = -endAngle;
                }

                let areaX = area.x;
                let areaY = area.y;
                if (shape.refOriginalPosition) {
                    areaX = area.x + shape.refOriginalPosition[0];
                    areaY = area.y + shape.refOriginalPosition[1];
                }

                return this.isInsideSector(
                    areaX, areaY, area.r0, area.r,
                    startAngle, endAngle,
                    !area.clockWise,
                    x, y
                );
            }
            // 多边形
            case 'path':
                return this.isInsidePath(
                    area.pathArray, Math.max(area.lineWidth, 5),
                    area.brushType, x, y
                );
            case 'polygon':
            case 'star':
            case 'smicstar':
            case 'isogon':
            case 'smicisogon':
                return this.isInsidePolygon(area.pointList, x, y);
            // 扩展多边形
            case 'smicpolygon': {
                // SMIC-修改 - start
                let icX = x;
                let icY = y;
                if (shape.refOriginalPosition) {
                    icX = x - shape.refOriginalPosition[0];
                    icY = y - shape.refOriginalPosition[1];
                }

                //岛洞面
                if (shape.holePolygonPointLists && shape.holePolygonPointLists.length > 0) {
                    var isOnBase = this.isInsidePolygon(area.pointList, icX, icY);

                    // 遍历岛洞子面
                    var holePLS = shape.holePolygonPointLists;
                    var isOnHole = false;
                    for (var i = 0, holePLSen = holePLS.length; i < holePLSen; i++) {
                        var holePL = holePLS[i];
                        var isOnSubHole = this.isInsidePolygon(holePL, icX, icY);
                        if (isOnSubHole === true) {
                            isOnHole = true;
                        }
                    }

                    // 捕获判断
                   return isOnBase === true && isOnHole === false;
                } else {
                    return this.isInsidePolygon(area.pointList, icX, icY);
                }
            }
            // 初始代码：
            //  无
            // SMIC-修改 - end
            // 文本
            case 'text':
                var rect = area.__rect || shape.getRect(area);
                return this.isInsideRect(
                    rect.x, rect.y, rect.width, rect.height, x, y
                );
            // 扩展文本
            case 'smictext':
                //用文本背景矩形判断
                var textBg = shape.getTextBackground(area);
                return this.isInsidePolygon(textBg, x, y);
            //初始代码：
            //  无
            // SMIC-修改 - end
            // 矩形
            case 'rectangle':
            case 'image':
                // 图片
                return this.isInsideRect(
                    area.x, area.y, area.width, area.height, x, y
                );
            case 'smicimage': {
                let areaX = area.x;
                let areaY = area.y;
                if (shape.refOriginalPosition) {
                    areaX = area.x + shape.refOriginalPosition[0];
                    areaY = area.y + shape.refOriginalPosition[1];
                }
                return this.isInsideRect(
                    areaX, areaY, area.width, area.height, x, y
                );
            }
            //// 扩展矩形
            //case 'smicpolygon':
            //    // SMIC-修改 - start
            //    var icX = x;
            //    var icY = y;
            //    if(shape.refOriginalPosition) {
            //        icX = x - shape.refOriginalPosition[0];
            //        icY = y - shape.refOriginalPosition[1];
            //    }
            //    return this.isInsideRect(
            //        area.x, area.y, area.width, area.height, icX, icY
            //    );
            //初始代码：
            //  无
            // SMIC-修改 - end
        }
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype._buildPathMethod
     * @description 包含判断。通过buildPath方法来判断，三个方法中较快，但是不支持线条类型的 shape。
     * @param {Object} shape - 图形。
     * @param {Object} context - 上下文。
     * @param {number} area - 目标区域。
     * @param {number} x - 横坐标。
     * @param {number} y - 纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置，true表示坐标处在图形中。
     */
    _buildPathMethod(shape, context, area, x, y) {
        // 图形类实现路径创建了则用类的path
        context.beginPath();
        shape.buildPath(context, area);
        context.closePath();
        return context.isPointInPath(x, y);
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isOutside
     * @description 图形是否不包含鼠标位置。
     * @param {Object} shape - 图形。
     * @param {number} area - 目标区域。
     * @param {number} x - 横坐标。
     * @param {number} y - 纵坐标。
     * @returns {boolean} 图形是否不包含鼠标位置, true表示坐标处在图形外。
     */
    isOutside(shape, area, x, y) {
        return !this.isInside(shape, area, x, y);
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideLine
     * @description 线段包含判断。
     * @param {number} x0 - 线起始点横坐标。
     * @param {number} y0 - 线起始点纵坐标。
     * @param {number} x1 - 线终点横坐标。
     * @param {number} y1 - 线终点纵坐标。
     * @param {number} lineWidth - 线宽。
     * @param {number} x - 鼠标位置横坐标。
     * @param {number} y - 鼠标位置纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置，true表示坐标处在图形内。
     */
    isInsideLine(x0, y0, x1, y1, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        var _a = 0;
        var _b = 0;
        // Quick reject
        if (
            (y > y0 + _l && y > y1 + _l)
            || (y < y0 - _l && y < y1 - _l)
            || (x > x0 + _l && x > x1 + _l)
            || (x < x0 - _l && x < x1 - _l)
        ) {
            return false;
        }

        if (x0 !== x1) {
            _a = (y0 - y1) / (x0 - x1);
            _b = (x0 * y1 - x1 * y0) / (x0 - x1);
        } else {
            return Math.abs(x - x0) <= _l / 2;
        }
        var tmp = _a * x - y + _b;
        var _s = tmp * tmp / (_a * _a + 1);
        return _s <= _l / 2 * _l / 2;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideCubicStroke
     * @description 三次贝塞尔曲线描边包含判断。
     * @param {number} x0 - 点1横坐标。
     * @param {number} y0 - 点1纵坐标。
     * @param {number} x1 - 点2横坐标。
     * @param {number} y1 - 点2纵坐标。
     * @param {number} x2 - 点3纵坐标。
     * @param {number} y2 - 点3纵坐标。
     * @param {number} lineWidth - 线宽。
     * @param {number} x - 鼠标位置横坐标。
     * @param {number} y - 鼠标位置纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideCubicStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        // Quick reject
        if (
            (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
            || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
            || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
            || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)
        ) {
            return false;
        }
        var d = this.curve.cubicProjectPoint(
            x0, y0, x1, y1, x2, y2, x3, y3,
            x, y, null
        );
        return d <= _l / 2;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideQuadraticStroke
     * @description 二次贝塞尔曲线描边包含判断。
     * @param {number} x0 - 点1横坐标。
     * @param {number} y0 - 点1纵坐标。
     * @param {number} x1 - 点2横坐标。
     * @param {number} y1 - 点2纵坐标。
     * @param {number} x2 - 点3纵坐标。
     * @param {number} y2 - 点3纵坐标。
     * @param {number} lineWidth - 线宽。
     * @param {number} x - 鼠标位置横坐标。
     * @param {number} y - 鼠标位置纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideQuadraticStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        // Quick reject
        if (
            (y > y0 + _l && y > y1 + _l && y > y2 + _l)
            || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
            || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
            || (x < x0 - _l && x < x1 - _l && x < x2 - _l)
        ) {
            return false;
        }
        var d = this.curve.quadraticProjectPoint(
            x0, y0, x1, y1, x2, y2,
            x, y, null
        );
        return d <= _l / 2;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideArcStroke
     * @description 圆弧描边包含判断。
     * @param {number} cx - 圆心横坐标。
     * @param {number} cy - 圆心纵坐标。
     * @param {number} r - 圆半径。
     * @param {number} startAngle - 起始角度。
     * @param {number} endAngle - 终止角度。
     * @param {number} anticlockwise - 顺时针还是逆时针。
     * @param {number} lineWidth - 线宽。
     * @param {number} x - 鼠标位置横坐标。
     * @param {number} y - 鼠标位置纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideArcStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
        var PI2 = this.PI2;

        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);

        x -= cx;
        y -= cy;
        var d = Math.sqrt(x * x + y * y);
        if ((d - _l > r) || (d + _l < r)) {
            return false;
        }
        if (Math.abs(startAngle - endAngle) >= PI2) {
            // Is a circle
            return true;
        }
        if (anticlockwise) {
            var tmp = startAngle;
            startAngle = this.normalizeRadian(endAngle);
            endAngle = this.normalizeRadian(tmp);
        } else {
            startAngle = this.normalizeRadian(startAngle);
            endAngle = this.normalizeRadian(endAngle);
        }
        if (startAngle > endAngle) {
            endAngle += PI2;
        }

        var angle = Math.atan2(y, x);
        if (angle < 0) {
            angle += PI2;
        }
        return (angle >= startAngle && angle <= endAngle)
            || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideBrokenLine
     * @description 图形 BrokenLine 是否包含鼠标位置, true表示坐标处在图形内。
     * @param {Array} points - 曲线点对象。
     * @param {number} lineWidth - 线宽。
     * @param {number} x - 鼠标位置横坐标。
     * @param {number} y - 鼠标位置纵坐标。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideBrokenLine(points, lineWidth, x, y) {
        var _lineWidth = Math.max(lineWidth, 10);
        for (var i = 0, l = points.length - 1; i < l; i++) {
            var x0 = points[i][0];
            var y0 = points[i][1];
            var x1 = points[i + 1][0];
            var y1 = points[i + 1][1];

            if (this.isInsideLine(x0, y0, x1, y1, _lineWidth, x, y)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideRing
     * @description  图形 Ring 是否包含鼠标位置, true表示坐标处在图形内。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideRing(cx, cy, r0, r, x, y) {
        var d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        return (d < r * r) && (d > r0 * r0);
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideRect
     * @description 图形 Rect 是否包含鼠标位置, true表示坐标处在图形内。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideRect(x0, y0, width, height, x, y) {
        return x >= x0 && x <= (x0 + width) && y >= y0 && y <= (y0 + height);
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideCircle
     * @description 图形 Circle 是否包含鼠标位置, true表示坐标处在图形内。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideCircle(x0, y0, r, x, y) {
        return (x - x0) * (x - x0) + (y - y0) * (y - y0) < r * r;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsideSector
     * @description 图形 Sector 是否包含鼠标位置, true表示坐标处在图形内。
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsideSector(cx, cy, r0, r, startAngle, endAngle, anticlockwise, x, y) {
        return this.isInsideArcStroke(cx, cy, (r0 + r) / 2, startAngle, endAngle, anticlockwise, r - r0, x, y);
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsidePolygon
     * @description 图形 Polygon 是否包含鼠标位置, true表示坐标处在图形内。与 canvas 一样采用 non-zero winding rule
     * @returns {boolean} 图形是否包含鼠标位置, true表示坐标处在图形内。
     */
    isInsidePolygon(points, x, y) {
        var N = points.length;
        var w = 0;

        for (var i = 0, j = N - 1; i < N; i++) {
            var x0 = points[j][0];
            var y0 = points[j][1];
            var x1 = points[i][0];
            var y1 = points[i][1];
            w += this.windingLine(x0, y0, x1, y1, x, y);
            j = i;
        }
        return w !== 0;
    }


    /**
     * @function LevelRenderer.Tool.Areal.prototype.windingLine
     */
    windingLine(x0, y0, x1, y1, x, y) {
        if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
            return 0;
        }
        if (y1 == y0) {
            return 0;
        }
        var dir = y1 < y0 ? 1 : -1;
        var t = (y - y0) / (y1 - y0);
        var x_ = t * (x1 - x0) + x0;

        return x_ > x ? dir : 0;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.swapExtrema
     */
    swapExtrema() {
        var tmp = this.extrema[0];
        this.extrema[0] = this.extrema[1];
        this.extrema[1] = tmp;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.windingCubic
     */
    windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
        var curve = this.curve;
        var roots = this.roots;
        var extrema = this.extrema;

        // Quick reject
        if (
            (y > y0 && y > y1 && y > y2 && y > y3)
            || (y < y0 && y < y1 && y < y2 && y < y3)
        ) {
            return 0;
        }
        var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
        if (nRoots === 0) {
            return 0;
        } else {
            var w = 0;
            var nExtrema = -1;
            var y0_, y1_;
            for (var i = 0; i < nRoots; i++) {
                var t = roots[i];
                var x_ = curve.cubicAt(x0, x1, x2, x3, t);
                if (x_ < x) { // Quick reject
                    continue;
                }
                if (nExtrema < 0) {
                    nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
                    if (extrema[1] < extrema[0] && nExtrema > 1) {
                        this.swapExtrema();
                    }
                    y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
                    if (nExtrema > 1) {
                        y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
                    }
                }
                if (nExtrema == 2) {
                    // 分成三段单调函数
                    if (t < extrema[0]) {
                        w += y0_ < y0 ? 1 : -1;
                    } else if (t < extrema[1]) {
                        w += y1_ < y0_ ? 1 : -1;
                    } else {
                        w += y3 < y1_ ? 1 : -1;
                    }
                } else {
                    // 分成两段单调函数
                    if (t < extrema[0]) {
                        w += y0_ < y0 ? 1 : -1;
                    } else {
                        w += y3 < y0_ ? 1 : -1;
                    }
                }
            }
            return w;
        }
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.windingQuadratic
     */
    windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
        var curve = this.curve;
        var roots = this.roots;

        // Quick reject
        if (
            (y > y0 && y > y1 && y > y2)
            || (y < y0 && y < y1 && y < y2)
        ) {
            return 0;
        }
        var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
        if (nRoots === 0) {
            return 0;
        } else {
            var t = curve.quadraticExtremum(y0, y1, y2);
            if (t >= 0 && t <= 1) {
                var w = 0;
                var y_ = curve.quadraticAt(y0, y1, y2, t);
                for (let i = 0; i < nRoots; i++) {
                    let x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
                    if (x_ > x) {
                        continue;
                    }
                    if (roots[i] < t) {
                        w += y_ < y0 ? 1 : -1;
                    } else {
                        w += y2 < y_ ? 1 : -1;
                    }
                }
                return w;
            } else {
                let x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
                if (x_ > x) {
                    return 0;
                }
                return y2 < y0 ? 1 : -1;
            }
        }
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.windingArc
     * // TODO   Arc 旋转
     */
    windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
        var roots = this.roots;
        var PI2 = this.PI2;

        y -= cy;
        if (y > r || y < -r) {
            return 0;
        }
        let tmp = Math.sqrt(r * r - y * y);
        roots[0] = -tmp;
        roots[1] = tmp;

        if (Math.abs(startAngle - endAngle) >= PI2) {
            // Is a circle
            startAngle = 0;
            endAngle = PI2;
            var dir = anticlockwise ? 1 : -1;
            if (x >= roots[0] + cx && x <= roots[1] + cx) {
                return dir;
            } else {
                return 0;
            }
        }

        if (anticlockwise) {
            let tmp = startAngle;
            startAngle = this.normalizeRadian(endAngle);
            endAngle = this.normalizeRadian(tmp);
        } else {
            startAngle = this.normalizeRadian(startAngle);
            endAngle = this.normalizeRadian(endAngle);
        }
        if (startAngle > endAngle) {
            endAngle += PI2;
        }

        var w = 0;
        for (let i = 0; i < 2; i++) {
            var x_ = roots[i];
            if (x_ + cx > x) {
                let angle = Math.atan2(y, x_);
                let dir = anticlockwise ? 1 : -1;
                if (angle < 0) {
                    angle = PI2 + angle;
                }
                if (
                    (angle >= startAngle && angle <= endAngle)
                    || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)
                ) {
                    if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                        dir = -dir;
                    }
                    w += dir;
                }
            }
        }
        return w;
    }


    /**
     * @function LevelRenderer.Tool.Areal.prototype.isInsidePath
     * @description 与 canvas 一样采用 non-zero winding rule
     */
    isInsidePath(pathArray, lineWidth, brushType, x, y) {
        var w = 0;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        var beginSubpath = true;
        var firstCmd = true;

        brushType = brushType || 'fill';

        var hasStroke = brushType === 'stroke' || brushType === 'both';
        var hasFill = brushType === 'fill' || brushType === 'both';

        // var roots = [-1, -1, -1];
        for (var i = 0; i < pathArray.length; i++) {
            var seg = pathArray[i];
            var p = seg.points;
            // Begin a new subpath
            if (beginSubpath || seg.command === 'M') {
                if (i > 0) {
                    // Close previous subpath
                    if (hasFill) {
                        w += this.windingLine(xi, yi, x0, y0, x, y);
                    }
                    if (w !== 0) {
                        return true;
                    }
                }
                x0 = p[p.length - 2];
                y0 = p[p.length - 1];
                beginSubpath = false;
                if (firstCmd && seg.command !== 'A') {
                    // 如果第一个命令不是M, 是lineTo, bezierCurveTo
                    // 等绘制命令的话，是会从该绘制的起点开始算的
                    // Arc 会在之后做单独处理所以这里忽略
                    firstCmd = false;
                    xi = x0;
                    yi = y0;
                }
            }
            switch (seg.command) {
                case 'M':
                    xi = p[0];
                    yi = p[1];
                    break;
                case 'L':
                    if (hasStroke) {
                        if (this.isInsideLine(
                                xi, yi, p[0], p[1], lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingLine(xi, yi, p[0], p[1], x, y);
                    }
                    xi = p[0];
                    yi = p[1];
                    break;
                case 'C':
                    if (hasStroke) {
                        if (this.isInsideCubicStroke(
                                xi, yi, p[0], p[1], p[2], p[3], p[4], p[5],
                                lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingCubic(
                            xi, yi, p[0], p[1], p[2], p[3], p[4], p[5], x, y
                        );
                    }
                    xi = p[4];
                    yi = p[5];
                    break;
                case 'Q':
                    if (hasStroke) {
                        if (this.isInsideQuadraticStroke(
                                xi, yi, p[0], p[1], p[2], p[3],
                                lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingQuadratic(
                            xi, yi, p[0], p[1], p[2], p[3], x, y
                        );
                    }
                    xi = p[2];
                    yi = p[3];
                    break;
                case 'A':
                    // TODO Arc 旋转
                    // TODO Arc 判断的开销比较大
                    var cx = p[0];
                    var cy = p[1];
                    var rx = p[2];
                    var ry = p[3];
                    var theta = p[4];
                    var dTheta = p[5];
                    var x1 = Math.cos(theta) * rx + cx;
                    var y1 = Math.sin(theta) * ry + cy;
                    // 不是直接使用 arc 命令
                    if (!firstCmd) {
                        w += this.windingLine(xi, yi, x1, y1);
                    } else {
                        firstCmd = false;
                        // 第一个命令起点还未定义
                        x0 = x1;
                        y0 = y1;
                    }
                    // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
                    var _x = (x - cx) * ry / rx + cx;
                    if (hasStroke) {
                        if (this.isInsideArcStroke(
                                cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                                lineWidth, _x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingArc(
                            cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                            _x, y
                        );
                    }
                    xi = Math.cos(theta + dTheta) * rx + cx;
                    yi = Math.sin(theta + dTheta) * ry + cy;
                    break;
                case 'z':
                    if (hasStroke) {
                        if (this.isInsideLine(
                                xi, yi, x0, y0, lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    beginSubpath = true;
                    break;
            }
        }
        if (hasFill) {
            w += this.windingLine(xi, yi, x0, y0, x, y);
        }
        return w !== 0;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.getTextWidth
     * @description 测算多行文本宽度
     */
    getTextWidth(text, textFont) {
        var key = text + ':' + textFont;
        if (this._textWidthCache[key]) {
            return this._textWidthCache[key];
        }
        this._ctx = this._ctx || this.util.getContext();
        this._ctx.save();

        if (textFont) {
            this._ctx.font = textFont;
        }

        text = (text + '').split('\n');
        var width = 0;
        for (var i = 0, l = text.length; i < l; i++) {
            width = Math.max(
                this._ctx.measureText(text[i]).width,
                width
            );
        }
        this._ctx.restore();

        this._textWidthCache[key] = width;
        if (++this._textWidthCacheCounter > this.TEXT_CACHE_MAX) {
            // 内存释放
            this._textWidthCacheCounter = 0;
            this._textWidthCache = {};
        }

        return width;
    }

    /**
     * @function LevelRenderer.Tool.Areal.prototype.getTextHeight
     * @description 测算多行文本高度
     */
    getTextHeight(text, textFont) {
        var key = text + ':' + textFont;
        if (this._textHeightCache[key]) {
            return this._textHeightCache[key];
        }

        this._ctx = this._ctx || this.util.getContext();

        this._ctx.save();
        if (textFont) {
            this._ctx.font = textFont;
        }

        text = (text + '').split('\n');
        // 比较粗暴
        //var height = (this._ctx.measureText('国').width + 2) * text.length;  //打包不支持中文，替换掉
        var height = (this._ctx.measureText('ZH').width + 2) * text.length;

        this._ctx.restore();

        this._textHeightCache[key] = height;
        if (++this._textHeightCacheCounter > this.TEXT_CACHE_MAX) {
            // 内存释放
            this._textHeightCacheCounter = 0;
            this._textHeightCache = {};
        }
        return height;
    }
}
