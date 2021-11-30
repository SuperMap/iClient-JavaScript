/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicImage
 * @category Visualization Theme
 * @classdesc 图片绘制。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicImage({
 *         style: {
 *             image: 'test.jpg',
 *             x: 100,
 *             y: 100
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 *
 *
 */
export class SmicImage extends Shape {

    /**
     * @member {Object} LevelRenderer.Shape.SmicImage.prototype.style
     * @description 绘制样式。
     *
     * @param {number} style.x - 左上角横坐标，必设参数。
     * @param {number} style.y - 左上角纵坐标，必设参数。
     * @param {(string/Cavans)} style.image - 图片地址或cavans对象，必设参数。
     * @param {number} style.width - 绘制到画布上的宽度，默认为图片高度。
     * @param {number} style.height - 绘制到画布上的高度，默认为图片高度。
     * @param {number} style.sx - 从图片中裁剪的左上角横坐标。
     * @param {number} style.sy - 从图片中裁剪的左上角纵坐标。
     * @param {number} style.sWidth - 从图片中裁剪的宽度，默认为图片高度。
     * @param {number} style.sHeight - 绘制到画布上的高度，默认为图片高度。
     * @param {number} style.opacity - 绘制透明度。默认值：1。
     * @param {number} style.shadowBlur - 阴影模糊度，大于0有效。默认值：0。
     * @param {number} style.shadowColor - 阴影颜色。默认值："#000000'"。
     * @param {number} style.shadowOffsetX - 阴影横向偏移。默认值：0。
     * @param {number} style.shadowOffsetY - 阴影纵向偏移。默认值：0。
     * @param {string} style.text - 图形中的附加文本。默认值：""。
     * @param {string} style.textColor - 文本颜色。默认值："#000000'"。
     * @param {string} style.textFont - 附加文本样式。示例:'bold 18px verdana'。
     * @param {string} style.textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * @param {string} style.textAlign - 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * @param {string} style.textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * @function LevelRenderer.Shape.SmicImage.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicImage.prototype.type
         * @description  图形类型。
         */
        this.type = 'smicimage';

        /**
         * @member {string} LevelRenderer.Shape.SmicImage.prototype._imageCache
         * @description 图片缓存。
         */
        this._imageCache = {};
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicImage";
    }


    /**
     * @function LevelRenderer.Shape.SmicImage.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        this._imageCache = null;
        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicImage.prototype.buildPath
     * @description 创建图片。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {Object} style - style。
     *
     */
    brush(ctx, isHighlight, refresh) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var style = this.style || {};

        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        var image = style.image;
        var me = this;

        if (typeof(image) === 'string') {
            var src = image;
            if (this._imageCache[src]) {
                image = this._imageCache[src];
            } else {
                image = new Image();
                image.onload = function () {
                    image.onload = null;
                    clearTimeout(SmicImage._refreshTimeout);
                    SmicImage._needsRefresh.push(me);
                    // 防止因为缓存短时间内触发多次onload事件
                    SmicImage._refreshTimeout = setTimeout(function () {
                        refresh && refresh(SmicImage._needsRefresh);
                        // 清空 needsRefresh
                        SmicImage._needsRefresh = [];
                    }, 10);
                };

                image.src = src;
                this._imageCache[src] = image;
            }
        }
        if (image) {
            // 图片已经加载完成
            if (image.nodeName.toUpperCase() == 'IMG') {
                if (window.ActiveXObject) {
                    if (image.readyState != 'complete') {
                        return;
                    }
                } else {
                    if (!image.complete) {
                        return;
                    }
                }
            }
            // Else is canvas
            var width = style.width || image.width;
            var height = style.height || image.height;
            var x = style.x + __OP[0];
            var y = style.y + __OP[1];

            // 图片加载失败
            if (!image.width || !image.height) {
                return;
            }

            ctx.save();

            this.doClip(ctx);

            this.setContext(ctx, style);

            // 设置transform
            this.setTransform(ctx);

            if (style.sWidth && style.sHeight) {
                let sx = (style.sx + __OP[0]) || 0;
                let sy = (style.sy + __OP[1]) || 0;
                ctx.drawImage(
                    image,
                    sx, sy, style.sWidth, style.sHeight,
                    x, y, width, height
                );
            } else if (style.sx && style.sy) {
                let sx = style.sx + __OP[0];
                let sy = style.sy + __OP[1];
                var sWidth = width - sx;
                var sHeight = height - sy;
                ctx.drawImage(
                    image,
                    sx, sy, sWidth, sHeight,
                    x, y, width, height
                );
            } else {
                ctx.drawImage(image, x, y, width, height);
            }
            // 如果没设置宽和高的话自动根据图片宽高设置
            if (!style.width) {
                style.width = width;
            }
            if (!style.height) {
                style.height = height;
            }
            if (!this.style.width) {
                this.style.width = width;
            }
            if (!this.style.height) {
                this.style.height = height;
            }

            this.drawText(ctx, style, this.style);

            ctx.restore();
        }
    }


    /**
     * @function LevelRenderer.Shape.SmicImage.prototype.getRect
     * @description 计算返回图片的包围盒矩形。
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        return {
            x: style.x + __OP[0],
            y: style.y + __OP[1],
            width: style.width,
            height: style.height
        };
    }


    /**
     * @function LevelRenderer.Shape.SmicImage.prototype.clearCache
     * @description 清除图片缓存。
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     *
     */
    clearCache() {
        this._imageCache = {};
    }

}
SmicImage._needsRefresh = [];
SmicImage._refreshTimeout = null;
