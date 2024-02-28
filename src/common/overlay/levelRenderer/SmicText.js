/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicText
 * @category Visualization Theme
 * @extends {LevelRenderer.Shape}
 * @example
 *   var shape = new LevelRenderer.Shape.SmicText({
 *         style: {
 *             text: 'Label',
 *             x: 100,
 *             y: 100,
 *             textFont: '14px Arial'
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 */
export class SmicText extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicText.prototype.type
         * @description 图形类型.
         */
        this.type = 'smictext';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicText";
    }


    /**
     * @function LevelRenderer.Shape.SmicText.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;

        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicText.prototype.brush
     * @description 笔触。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {boolean} isHighlight - 是否使用高亮属性。
     *
     */
    brush(ctx, isHighlight) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var style = this.style;
        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }

        ctx.save();
        this.doClip(ctx);

        this.setContext(ctx, style);

        // 设置transform
        this.setTransform(ctx);

        if (style.textFont) {
            ctx.font = style.textFont;
        }
        ctx.textAlign = style.textAlign || 'start';
        ctx.textBaseline = style.textBaseline || 'middle';

        var text = (style.text + '').split('\n');
        var lineHeight = SUtil.Util_area.getTextHeight('ZH', style.textFont);
        var rect = this.getRectNoRotation(style);
        // var x = style.x;
        var x = style.x + __OP[0];
        var y;
        if (style.textBaseline == 'top') {
            y = rect.y;
        } else if (style.textBaseline == 'bottom') {
            y = rect.y + lineHeight;
        } else {
            y = rect.y + lineHeight / 2;
        }
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //文本绘制
        for (var i = 0, l = text.length; i < l; i++) {
            //是否渲染矩形背景及颜色
            if (style.labelRect) {
                //+4,-2是为了让文字距边框左右边缘有点间隔
                ctx.fillRect(rect.x - 2, rect.y, rect.width + 4, rect.height);
                ctx.fillStyle = style.strokeColor;
                ctx.strokeRect(rect.x - 2, rect.y, rect.width + 4, rect.height);
                ctx.fillStyle = style.textColor;
            }

            switch (style.brushType) {
                case 'stroke':
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * i, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * i);
                            }
                        } else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height);
                            }
                        } else {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                        } else {
                            ctx.strokeText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
                    break;
                case 'both':
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        } else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        } else {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        } else {
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        }
                    }
                    break;
                default:
                    //fill or others
                    this.setCtxGlobalAlpha(ctx, "fill", style);
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline == 'top') {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * i, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * i);
                            }
                        } else if (style.textBaseline == 'bottom') {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height);
                            }
                        } else {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1) - rect.height / 2 - lineHeight / 2);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            ctx.fillText(text[i], x, y, style.maxWidth);
                        } else {
                            ctx.fillText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
            }
            y += lineHeight;
        }

        ctx.restore();
        return;
    }


    /**
     * @function LevelRenderer.Shape.SmicText.prototype.getRect
     * @description 返回文字包围盒矩形
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        var left, top, right, bottom
        var tbg = this.getTextBackground(style, true);
        for (var i = 0, len = tbg.length; i < len; i++) {
            var poi = tbg[i];

            //用第一个点初始化
            if (i == 0) {
                left = poi[0];
                right = poi[0];
                top = poi[1];
                bottom = poi[1];
            } else {
                if (poi[0] < left) {
                    left = poi[0]
                }
                if (poi[0] > right) {
                    right = poi[0]
                }
                if (poi[1] < top) {
                    top = poi[1]
                }
                if (poi[1] > bottom) {
                    bottom = poi[1]
                }
            }
        }

        style.__rect = {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };

        return style.__rect;
    }


    /**
     * @function LevelRenderer.Shape.SmicText.prototype.getRectNoRotation
     * @description 返回忽略旋转和maxWidth时文字包围盒矩形
     */
    getRectNoRotation(style) {

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineHeight = SUtil.Util_area.getTextHeight('ZH', style.textFont);

        var width = SUtil.Util_area.getTextWidth(style.text, style.textFont);
        var height = SUtil.Util_area.getTextHeight(style.text, style.textFont);

        //处理文字位置，注：文本的绘制是由此 rect 决定
        var textX = style.x + __OP[0];                 // 默认start == left
        if (style.textAlign == 'end' || style.textAlign == 'right') {
            textX -= width;
        } else if (style.textAlign == 'center') {
            textX -= (width / 2);
        }

        var textY;
        if (style.textBaseline == 'top') {
            // textY = style.y;
            textY = style.y + __OP[1];
        } else if (style.textBaseline == 'bottom') {
            textY = (style.y + __OP[1]) - height;
        } else {
            // middle
            textY = (style.y + __OP[1]) - height / 2;
        }

        var isWidthChangeByMaxWidth = false;
        var widthBeforeChangeByMaxWidth;

        //处理 maxWidth
        if (style.maxWidth) {
            var maxWidth = parseInt(style.maxWidth);
            if (maxWidth < width) {
                widthBeforeChangeByMaxWidth = width;
                isWidthChangeByMaxWidth = true;
                width = maxWidth;
            }

            textX = style.x + __OP[0];
            if (style.textAlign == 'end' || style.textAlign == 'right') {
                textX -= width;
            } else if (style.textAlign == 'center') {
                textX -= (width / 2);
            }
        }

        //处理斜体字
        if (style.textFont) {
            var textFont = style.textFont;
            var textFontStr = textFont.toLowerCase()
            if (textFontStr.indexOf("italic") > -1) {
                if (isWidthChangeByMaxWidth === true) {
                    width += (lineHeight / 3) * (width / widthBeforeChangeByMaxWidth);
                } else {
                    width += lineHeight / 3;
                }
            }
        }

        var rect = {
            x: textX,
            y: textY,
            width: width,
            height: height
        };

        return rect;
    }


    /**
     * @function LevelRenderer.Shape.SmicText.prototype.getTextBackground
     * @description 获取文本背景框范围
     *
     * @param {Object} style - 样式。
     * @param {boolean} redo - 是否强制重新计算 textBackground。
     */
    getTextBackground(style, redo) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if ((!redo) && style.__textBackground) {
            return style.__textBackground;
        }

        //不旋转时矩形框
        var rect = this.getRectNoRotation(style);

        //旋转中心点
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //背景框
        var background = [];

        if (style.textRotation && style.textRotation !== 0) {
            let textRotation = style.textRotation;
            let ltPoi = this.getRotatedLocation(rect.x, rect.y, ox, oy, textRotation);
            let rtPoi = this.getRotatedLocation(rect.x + rect.width, rect.y, ox, oy, textRotation);
            let rbPoi = this.getRotatedLocation(rect.x + rect.width, rect.y + rect.height, ox, oy, textRotation);
            let lbPoi = this.getRotatedLocation(rect.x, rect.y + rect.height, ox, oy, textRotation);

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        } else {
            let ltPoi = [rect.x, rect.y];
            let rtPoi = [rect.x + rect.width, rect.y];
            let rbPoi = [rect.x + rect.width, rect.y + rect.height];
            let lbPoi = [rect.x, rect.y + rect.height];

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        }

        style.__textBackground = background;

        return style.__textBackground;
    }


    /**
     * @function LevelRenderer.Shape.SmicText.prototype.getRotatedLocation
     * @description 获取一个点绕旋转中心顺时针旋转后的位置。（此方法用于屏幕坐标）
     *
     * @param {number} x - 旋转点横坐标。
     * @param {number} y - 旋转点纵坐标。
     * @param {number} rx - 旋转中心点横坐标。
     * @param {number} ry - 旋转中心点纵坐标。
     * @param {number} angle - 旋转角度（度）。
     * @return {Array.<number>} 旋转后的坐标位置，长度为 2 的一维数组，数组第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     */
    getRotatedLocation(x, y, rx, ry, angle) {
        var loc = new Array(), x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle;//顺时针旋转
        x0 = (x - rx) * Math.cos((angle / 180) * Math.PI) - (y - ry) * Math.sin((angle / 180) * Math.PI) + rx;
        y0 = (x - rx) * Math.sin((angle / 180) * Math.PI) + (y - ry) * Math.cos((angle / 180) * Math.PI) + ry;

        loc[0] = x0;
        loc[1] = -y0;
        return loc;
    }

}
