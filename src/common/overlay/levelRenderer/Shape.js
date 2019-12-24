/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {Eventful} from './Eventful';
import {Transformable} from './Transformable';
import {Util as CommonUtil} from '../../commontypes/Util';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape
 * @category Visualization Theme
 * @classdesc 图形（shape）基类。
 * @extends SuperMap.LevelRenderer.Eventful
 * @extends SuperMap.LevelRenderer.Transformable
 */
export class Shape extends SuperMap.mixin(Eventful, Transformable) {

    /**
     * @function SuperMap.LevelRenderer.Shape.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);

        options = options || {};
        /**
         * @member {string} SuperMap.LevelRenderer.Shape.prototype.id
         * @description 唯一标识。
         */
        this.id = null;

        /**
         * @member {Object} SuperMap.LevelRenderer.Shape.prototype.style
         * @description 基础绘制样式。
         * @param {string} style.brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
         * @param {string} style.color - 填充颜色。默认值："#000000'"。
         * @param {string} style.strokeColor - 描边颜色。默认值："#000000'"。
         * @param {string} style.lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
         * @param {number} style.lineWidth - 描边宽度。默认值：1。
         * @param {number} style.opacity - 绘制透明度。默认值：1。
         * @param {number} style.shadowBlur - 阴影模糊度，大于0有效。默认值：0。
         * @param {number} style.shadowColor - 阴影颜色。默认值："#000000'"。
         * @param {number} style.shadowOffsetX - 阴影横向偏移。默认值：0。
         * @param {number} style.shadowOffsetY -  阴影纵向偏移。默认值：0。
         * @param {string} style.text -  图形中的附加文本。默认值：""。
         * @param {string} style.textColor -  文本颜色。默认值："#000000'"。
         * @param {string} style.textFont -  附加文本样式。示例:'bold 18px verdana'。
         * @param {string} style.textPosition -  附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
         * @param {string} style.textAlign -  附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
         * @param {string} style.textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
         *
         */
        this.style = {};

        /**
         * @member {Object} SuperMap.LevelRenderer.Shape.prototype.style.__rect
         * @description 包围图形的最小矩形盒子。
         *
         * @param {number} x - 左上角顶点x轴坐标。
         * @param {number} y - 左上角顶点y轴坐标。
         * @param {number} width - 包围盒矩形宽度。
         * @param {number} height - 包围盒矩形高度。
         */

        /**
         * @member {Object} SuperMap.LevelRenderer.Shape.prototype.highlightStyle
         * @description 高亮样式。
         *
         * @param {string} highlightStyle.brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
         * @param {string} highlightStyle.color -  填充颜色。默认值："#000000'"。
         * @param {string} highlightStyle.strokeColor - 描边颜色。默认值："#000000'"。
         * @param {string} highlightStyle.lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
         * @param {number} highlightStyle.lineWidth - 描边宽度。默认值：1。
         * @param {number} highlightStyle.opacity -  绘制透明度。默认值：1。
         * @param {number} highlightStyle.shadowBlur - 阴影模糊度，大于0有效。默认值：0。
         * @param {number} highlightStyle.shadowColor - 阴影颜色。默认值："#000000'"。
         * @param {number} highlightStyle.shadowOffsetX - 阴影横向偏移。默认值：0。
         * @param {number} highlightStyle.shadowOffsetY - 阴影纵向偏移。默认值：0。
         * @param {string} highlightStyle.text - 图形中的附加文本。默认值：""。
         * @param {string} highlightStyle.textColor - 文本颜色。默认值："#000000'"。
         * @param {string} highlightStyle.textFont - 附加文本样式。示例:'bold 18px verdana'。
         * @param {string} highlightStyle.textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
         * @param {string} highlightStyle.textAlign -  附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
         * @param {string} highlightStyle.textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
         */
        this.highlightStyle = null;

        /**
         * @member {Object} SuperMap.LevelRenderer.Shape.prototype.parent
         * @description 父节点，只读属性。<SuperMap.LevelRenderer.Group>
         */
        this.parent = null;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.__dirty
         * @description {boolean}
         */
        this.__dirty = true;

        /**
         * @member {Array} SuperMap.LevelRenderer.Shape.prototype.__clipShapes
         * @description {Array}
         * 
         */
        this.__clipShapes = [];

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.invisible
         * @description 图形是否可见，为 true 时不绘制图形，但是仍能触发鼠标事件。默认值：false。
         */
        this.invisible = false;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.ignore
         * @description 图形是否忽略，为 true 时忽略图形的绘制以及事件触发。默认值：false。
         */
        this.ignore = false;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.zlevel
         * @description z 层 level，决定绘画在哪层 canvas 中。默认值：0。
         */
        this.zlevel = 0;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.draggable
         * @description 是否可拖拽。默认值：false。
         */
        this.draggable = false;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.clickable
         * @description 是否可点击。默认值：false。
         */
        this.clickable = false;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.hoverable
         * @description 是否可以 hover。默认值：true。
         */
        this.hoverable = true;

        /**
         * @member {number} SuperMap.LevelRenderer.Shape.prototype.z
         * @description z值，跟zlevel一样影响shape绘制的前后顺序，z值大的shape会覆盖在z值小的上面，但是并不会创建新的canvas，所以优先级低于zlevel，而且频繁改动的开销比zlevel小很多。默认值：0。
         */
        this.z = 0;

        //地理扩展
        /**
         * @member {Array} SuperMap.LevelRenderer.Shape.prototype.refOriginalPosition
         * @description 图形参考原点位置，图形的参考中心位置。
         * refOriginalPosition 是长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         *
         * refOriginalPosition 表示图形的参考中心，通常情况下，图形是使用 canvas 的原点位置作为位置参考，
         * 但 refOriginalPosition 可以改变图形的参考位置，例如： refOriginalPosition = [80, 80],
         * 图形圆的 style.x = 20, style.y = 20，那么圆在 canvas 中的实际位置是 [100, 100]。
         *
         * 图形（Shape） 的所有位置相关属性都是以 refOriginalPosition 为参考中心，
         * 也就是说图形的所有位置信息在 canvas 中都是以 refOriginalPosition 为参考的相对位置，只有
         * refOriginalPosition 的值为 [0, 0] 时，形的位置信息才是 canvas 绝对位置。
         *
         * 图形的位置信息通常有：style.pointList，style.x，style.y。
         *
         * refOriginalPosition。默认值是： [0, 0]。
         */
        this.refOriginalPosition = [0, 0];

        /**
         * @member {string} SuperMap.LevelRenderer.Shape.prototype.refDataID
         * @description 图形所关联数据的 ID。
         *
         */
        this.refDataID = null;

        /**
         * @member {boolean} SuperMap.LevelRenderer.Shape.prototype.isHoverByRefDataID
         * @description 是否根据 refDataID 进行高亮。用于同时高亮所有 refDataID 相同的图形。
         *
         */
        this.isHoverByRefDataID = false;

        /**
         *  @member {string} SuperMap.LevelRenderer.Shape.prototype.refDataHoverGroup 
         *  @description 高亮图形组的组名。此属性在 refDataID 有效且 isHoverByRefDataID 为 true 时生效。
         * 一旦设置此属性，且属性值有效，只有关联同一个数据的图形且此属性相同的图形才会高亮。
         *
         */
        this.refDataHoverGroup = null;

        /**
         * @member {Object} SuperMap.LevelRenderer.Shape.prototype.dataInfo
         * @description 图形的数据信息。
         *
         */
        this.dataInfo = null;
        CommonUtil.extend(this, options);
        this.id = this.id  || CommonUtil.createUniqueID("smShape_");
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape";
        /**
         * @function SuperMap.LevelRenderer.Shape.prototype.getTansform
         * @description 变换鼠标位置到 shape 的局部坐标空间
         *
         */
        this.getTansform = (function () {
            var invTransform = [];

            return function (x, y) {
                var originPos = [x, y];
                // 对鼠标的坐标也做相同的变换
                if (this.needTransform && this.transform) {
                    SUtil.Util_matrix.invert(invTransform, this.transform);

                    SUtil.Util_matrix.mulVector(originPos, invTransform, [x, y, 1]);

                    if (x == originPos[0] && y == originPos[1]) {
                        // 避免外部修改导致的 needTransform 不准确
                        this.updateNeedTransform();
                    }
                }
                return originPos;
            };
        })();

    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.id = null;
        this.style = null;
        this.highlightStyle = null;
        this.parent = null;
        this.__dirty = null;
        this.__clipShapes = null;
        this.invisible = null;
        this.ignore = null;
        this.zlevel = null;
        this.draggable = null;
        this.clickable = null;
        this.hoverable = null;
        this.z = null;

        this.refOriginalPosition = null;
        this.refDataID = null;
        this.refDataHoverGroup = null;
        this.isHoverByRefDataID = null;
        this.dataInfo = null;
        super.destroy();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.brush
     * @description 绘制图形。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {boolean} isHighlight - 是否使用高亮属性。
     * @param {Function} updateCallback - 需要异步加载资源的 shape 可以通过这个 callback(e),让painter更新视图，base.brush 没用，需要的话重载 brush。
     */
    brush(ctx, isHighlight) {

        var style = this.beforeBrush(ctx, isHighlight);

        ctx.beginPath();
        this.buildPath(ctx, style);

        switch (style.brushType) {
            /* jshint ignore:start */
            case 'both':
                this.setCtxGlobalAlpha(ctx, "fill", style);
                ctx.fill();
                if (style.lineWidth > 0) {
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    ctx.stroke();
                }
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
            case 'stroke':
                this.setCtxGlobalAlpha(ctx, "stroke", style);
                style.lineWidth > 0 && ctx.stroke();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
            /* jshint ignore:end */
            default:
                this.setCtxGlobalAlpha(ctx, "fill", style);
                ctx.fill();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
        }

        this.drawText(ctx, style, this.style);

        this.afterBrush(ctx);
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.beforeBrush
     * @description 具体绘制操作前的一些公共操作。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {boolean} isHighlight - 是否使用高亮属性。
     * @return {Object} 处理后的样式。
     */
    beforeBrush(ctx, isHighlight) {
        var style = this.style;

        if (this.brushTypeOnly) {
            style.brushType = this.brushTypeOnly;
        }

        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style,
                this.highlightStyle || {},
                this.brushTypeOnly
            );
        }

        if (this.brushTypeOnly == 'stroke') {
            style.strokeColor = style.strokeColor || style.color;
        }

        ctx.save();

        this.doClip(ctx);

        this.setContext(ctx, style);

        // 设置transform
        this.setTransform(ctx);

        return style;
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.afterBrush
     * @description 绘制后的处理。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     *
     */
    afterBrush(ctx) {
        ctx.restore();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.setContext
     * @description 设置 fillStyle, strokeStyle, shadow 等通用绘制样式。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {Object} style - 样式。
     *
     */
    setContext(ctx, style) {
        var STYLE_CTX_MAP = [
            ['color', 'fillStyle'],
            ['strokeColor', 'strokeStyle'],
            ['opacity', 'globalAlpha'],
            ['lineCap', 'lineCap'],
            ['lineJoin', 'lineJoin'],
            ['miterLimit', 'miterLimit'],
            ['lineWidth', 'lineWidth'],
            ['shadowBlur', 'shadowBlur'],
            ['shadowColor', 'shadowColor'],
            ['shadowOffsetX', 'shadowOffsetX'],
            ['shadowOffsetY', 'shadowOffsetY']
        ];

        for (var i = 0, len = STYLE_CTX_MAP.length; i < len; i++) {
            var styleProp = STYLE_CTX_MAP[i][0];
            var styleValue = style[styleProp];
            var ctxProp = STYLE_CTX_MAP[i][1];

            if (typeof styleValue != 'undefined') {
                ctx[ctxProp] = styleValue;
            }
        }
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.doClip
     *
     */
    doClip(ctx) {
        var clipShapeInvTransform = SUtil.Util_matrix.create();

        if (this.__clipShapes) {
            for (var i = 0; i < this.__clipShapes.length; i++) {
                var clipShape = this.__clipShapes[i];
                if (clipShape.needTransform) {
                    let m = clipShape.transform;
                    SUtil.Util_matrix.invert(clipShapeInvTransform, m);
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
                ctx.beginPath();
                clipShape.buildPath(ctx, clipShape.style);
                ctx.clip();
                // Transform back
                if (clipShape.needTransform) {
                    let m = clipShapeInvTransform;
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
            }
        }
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.getHighlightStyle
     * @description 根据默认样式扩展高亮样式
     * 
     * @param {Object} style - 样式。
     * @param {Object} highlightStyle - 高亮样式。
     * @param {string} brushTypeOnly - brushTypeOnly。
     *
     */
    getHighlightStyle(style, highlightStyle, brushTypeOnly) {
        var newStyle = {};
        for (let k in style) {
            newStyle[k] = style[k];
        }

        var highlightColor = SUtil.Util_color.getHighlightColor();
        // 根据highlightStyle扩展
        if (style.brushType != 'stroke') {
            // 带填充则用高亮色加粗边线
            newStyle.strokeColor = highlightColor;
            // SMIC-方法修改 - start
            newStyle.lineWidth = (style.lineWidth || 1);
            // 原始代码
            //      newStyle.lineWidth = (style.lineWidth || 1)
            //          + this.getHighlightZoom();
            // 修改代码1
            // if(!style.lineType || style.lineType === "solid"){
            //     newStyle.lineWidth = (style.lineWidth || 1)
            //         + this.getHighlightZoom();
            // }
            // else{
            //     newStyle.lineWidth = (style.lineWidth || 1);
            // }
            // SMIC-方法修改 - end
            newStyle.brushType = 'both';
        } else {
            if (brushTypeOnly != 'stroke') {
                // 描边型的则用原色加工高亮
                newStyle.strokeColor = highlightColor;
                // SMIC-方法修改 - start
                newStyle.lineWidth = (style.lineWidth || 1);
                // 原始代码
                //      newStyle.lineWidth = (style.lineWidth || 1)
                //          + this.getHighlightZoom();
                // 修改代码1
                // if(!style.lineType || style.lineType === "solid"){
                //     newStyle.lineWidth = (style.lineWidth || 1)
                //         + this.getHighlightZoom();
                // }
                // else{
                //     newStyle.lineWidth = (style.lineWidth || 1);
                // }
                // SMIC-方法修改 - end
            } else {
                // 线型的则用原色加工高亮
                newStyle.strokeColor = highlightStyle.strokeColor
                    || SUtil.Util_color.mix(
                        style.strokeColor,
                        SUtil.Util_color.toRGB(highlightColor)
                    );
            }
        }

        // 可自定义覆盖默认值
        for (let k in highlightStyle) {
            if (typeof highlightStyle[k] != 'undefined') {
                newStyle[k] = highlightStyle[k];
            }
        }

        return newStyle;
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.getHighlightZoom
     * @description 高亮放大效果参数，当前统一设置为6，如有需要差异设置，通过 this.type 判断实例类型
     *
     */
    getHighlightZoom() {
        return this.type != 'text' ? 6 : 2;
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.drift
     * @description 移动位置
     *
     * @param {Object} dx - 横坐标变化。
     * @param {Object} dy - 纵坐标变化。
     *
     */
    drift(dx, dy) {
        this.position[0] += dx;
        this.position[1] += dy;
    }




    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.buildPath
     * @description 构建绘制的Path。子类必须重新实现此方法。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {Object} style - 样式。
     */
    buildPath(ctx, style) { // eslint-disable-line no-unused-vars
        SUtil.Util_log('buildPath not implemented in ' + this.type);
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.getRect
     * @description 计算返回包围盒矩形。子类必须重新实现此方法。
     *
     * @param {Object} style - 样式。
     */
    getRect(style) { // eslint-disable-line no-unused-vars
        SUtil.Util_log('getRect not implemented in ' + this.type);
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.isCover
     * @description 判断鼠标位置是否在图形内。
     *
     * @param {number} x - x。
     * @param {number} y - y。
     */
    isCover(x, y) {
        var originPos = this.getTansform(x, y);
        x = originPos[0];
        y = originPos[1];

        // 快速预判并保留判断矩形
        var rect = this.style.__rect;
        if (!rect) {
            rect = this.style.__rect = this.getRect(this.style);
        }

        if (x >= rect.x
            && x <= (rect.x + rect.width)
            && y >= rect.y
            && y <= (rect.y + rect.height)
        ) {
            // 矩形内
            return SUtil.Util_area.isInside(this, this.style, x, y);
        }

        return false;
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.drawText
     * @description 绘制附加文本。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {string} style - 样式。
     * @param {string} normalStyle - normalStyle 默认样式，用于定位文字显示。
     */
    drawText(ctx, style, normalStyle) {
        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }
        // 字体颜色策略
        var textColor = style.textColor || style.color || style.strokeColor;
        ctx.fillStyle = textColor;

        // 文本与图形间空白间隙
        var dd = 10;
        var al;         // 文本水平对齐
        var bl;         // 文本垂直对齐
        var tx;         // 文本横坐标
        var ty;         // 文本纵坐标

        var textPosition = style.textPosition       // 用户定义
            || this.textPosition     // shape默认
            || 'top';                // 全局默认

        // Smic 方法修改 -start
        var __OP = [];
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            __OP = [0, 0];
        } else {
            __OP = this.refOriginalPosition;
        }
        //原代码：
        // Smic 方法修改 -end

        switch (textPosition) {
            case 'inside':
            case 'top':
            case 'bottom':
            case 'left':
            case 'right':
                if (this.getRect) {
                    var rect = (normalStyle || style).__rect
                        || this.getRect(normalStyle || style);

                    switch (textPosition) {
                        case 'inside':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y + rect.height / 2;
                            al = 'center';
                            bl = 'middle';
                            if (style.brushType != 'stroke'
                                && textColor == style.color
                            ) {
                                ctx.fillStyle = '#fff';
                            }
                            break;
                        case 'left':
                            tx = rect.x - dd;
                            ty = rect.y + rect.height / 2;
                            al = 'end';
                            bl = 'middle';
                            break;
                        case 'right':
                            tx = rect.x + rect.width + dd;
                            ty = rect.y + rect.height / 2;
                            al = 'start';
                            bl = 'middle';
                            break;
                        case 'top':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y - dd;
                            al = 'center';
                            bl = 'bottom';
                            break;
                        case 'bottom':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y + rect.height + dd;
                            al = 'center';
                            bl = 'top';
                            break;
                    }
                }
                break;
            case 'start':
            case 'end':
                var xStart = 0;
                var xEnd = 0;
                var yStart = 0;
                var yEnd = 0;
                if (typeof style.pointList != 'undefined') {
                    var pointList = style.pointList;
                    if (pointList.length < 2) {
                        // 少于2个点就不画了~
                        return;
                    }
                    var length = pointList.length;
                    switch (textPosition) {
                        // Smic 方法修改 -start
                        case 'start':
                            xStart = pointList[0][0] + __OP[0];
                            xEnd = pointList[1][0] + __OP[0];
                            yStart = pointList[0][1] + __OP[1];
                            yEnd = pointList[1][1] + __OP[1];
                            break;
                        case 'end':
                            xStart = pointList[length - 2][0] + __OP[0];
                            xEnd = pointList[length - 1][0] + __OP[0];
                            yStart = pointList[length - 2][1] + __OP[1];
                            yEnd = pointList[length - 1][1] + __OP[1];
                            break;
                        //原代码：
                        /*
                         case 'start':
                         xStart = pointList[0][0];
                         xEnd = pointList[1][0];
                         yStart = pointList[0][1];
                         yEnd = pointList[1][1];
                         break;
                         case 'end':
                         xStart = pointList[length - 2][0];
                         xEnd = pointList[length - 1][0];
                         yStart = pointList[length - 2][1];
                         yEnd = pointList[length - 1][1];
                         break;
                         */
                        // Smic 方法修改 -end
                    }
                } else {
                    // Smic 方法修改 -start
                    xStart = (style.xStart + __OP[0]) || 0;
                    xEnd = (style.xEnd + __OP[0]) || 0;
                    yStart = (style.yStart + __OP[1]) || 0;
                    yEnd = (style.yEnd + __OP[1]) || 0;
                    //原代码：
                    /*
                     xStart = style.xStart || 0;
                     xEnd = style.xEnd || 0;
                     yStart = style.yStart || 0;
                     yEnd = style.yEnd || 0;
                     */
                    // Smic 方法修改 -end
                }

                switch (textPosition) {
                    case 'start':
                        al = xStart < xEnd ? 'end' : 'start';
                        bl = yStart < yEnd ? 'bottom' : 'top';
                        tx = xStart;
                        ty = yStart;
                        break;
                    case 'end':
                        al = xStart < xEnd ? 'start' : 'end';
                        bl = yStart < yEnd ? 'top' : 'bottom';
                        tx = xEnd;
                        ty = yEnd;
                        break;
                }
                dd -= 4;
                if (xStart && xEnd && xStart != xEnd) {
                    tx -= (al == 'end' ? dd : -dd);
                } else {
                    al = 'center';
                }

                if (yStart != yEnd) {
                    ty -= (bl == 'bottom' ? dd : -dd);
                } else {
                    bl = 'middle';
                }
                break;
            case 'specific':
                tx = style.textX || 0;
                ty = style.textY || 0;
                al = 'start';
                bl = 'middle';
                break;
        }

        // Smic 方法修改 -start
        if (style.labelXOffset && !isNaN(style.labelXOffset)) {
            tx += style.labelXOffset;
        }
        if (style.labelYOffset && !isNaN(style.labelYOffset)) {
            ty += style.labelYOffset;
        }
        //原代码：
        // Smic 方法修改 -end

        if (tx != null && ty != null) {
            Shape._fillText(
                ctx,
                style.text,
                tx, ty,
                style.textFont,
                style.textAlign || al,
                style.textBaseline || bl
            );
        }
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.modSelf
     * @description 图形发生改变
     */
    modSelf() {
        this.__dirty = true;
        if (this.style) {
            this.style.__rect = null;
        }
        if (this.highlightStyle) {
            this.highlightStyle.__rect = null;
        }
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.isSilent
     * @description 图形是否会触发事件，通过 bind 绑定的事件
     */
    isSilent() {
        return !(
            this.hoverable || this.draggable || this.clickable
            || this.onmousemove || this.onmouseover || this.onmouseout
            || this.onmousedown || this.onmouseup || this.onclick
            || this.ondragenter || this.ondragover || this.ondragleave
            || this.ondrop
        );
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.prototype.setCtxGlobalAlpha
     * @description 设置 Cavans 上下文全局透明度
     *
     * @param {Object} _ctx - Cavans 上下文
     * @param {string} type - one of 'stroke', 'fill', or 'reset'
     * @param {Object} style - Symbolizer hash
     */
    setCtxGlobalAlpha(_ctx, type, style) {
        if (type === "fill") {
            _ctx.globalAlpha = typeof(style["fillOpacity"]) === "undefined" ? (typeof(style["opacity"]) === "undefined" ? 1 : style['opacity']) : style['fillOpacity'];
        } else if (type === "stroke") {
            _ctx.globalAlpha = typeof(style["strokeOpacity"]) === "undefined" ? (typeof(style["opacity"]) === "undefined" ? 1 : style['opacity']) : style['strokeOpacity'];
        } else {
            _ctx.globalAlpha = typeof(style["opacity"]) === "undefined" ? 1 : style['opacity'];
        }
    }

    /**
     * @function SuperMap.LevelRenderer.Shape.prototype._fillText
     * @description 填充文本
     */
    static _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
        if (textFont) {
            ctx.font = textFont;
        }
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var rect = Shape._getTextRect(
            text, x, y, textFont, textAlign, textBaseline
        );

        text = (text + '').split('\n');

        var lineHeight = SUtil.Util_area.getTextHeight('ZH', textFont);

        switch (textBaseline) {
            case 'top':
                y = rect.y;
                break;
            case 'bottom':
                y = rect.y + lineHeight;
                break;
            default:
                y = rect.y + lineHeight / 2;
        }

        for (var i = 0, l = text.length; i < l; i++) {
            ctx.fillText(text[i], x, y);
            y += lineHeight;
        }
    }

    /**
     * @function SuperMap.LevelRenderer.Shape._getTextRect
     * @description 返回矩形区域，用于局部刷新和文字定位
     *
     * @param {string} text - text。
     * @param {number} x - x。
     * @param {number} y - y。
     * @param {string} textFont -  textFont。
     * @param {string} textAlign - textAlign。
     * @param {string} textBaseline - textBaseline。
     * @return {Object} 矩形区域。
     */
    static _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
        var width = SUtil.Util_area.getTextWidth(text, textFont);
        var lineHeight = SUtil.Util_area.getTextHeight('ZH', textFont);

        text = (text + '').split('\n');

        switch (textAlign) {
            case 'end':
            case 'right':
                x -= width;
                break;
            case 'center':
                x -= (width / 2);
                break;
        }

        switch (textBaseline) {
            case 'top':
                break;
            case 'bottom':
                y -= lineHeight * text.length;
                break;
            default:
                y -= lineHeight * text.length / 2;
        }

        return {
            x: x,
            y: y,
            width: width,
            height: lineHeight * text.length
        };
    }

}