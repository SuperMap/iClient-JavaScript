/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ShapeParameters} from './ShapeParameters';

/**
 * @class ShapeParametersImage
 * @aliasclass Feature.ShapeParameters.Image
 * @deprecatedclass SuperMap.Feature.ShapeParameters.Image
 * @category Visualization Theme
 * @classdesc 图片参数对象。
 * @extends {ShapeParameters}
 * @param {number} x - 左上角横坐标。
 * @param {number} y - 左上角纵坐标。
 * @param {(string|Object)} image - 图片地址或Cavans对象。
 * @param {number} width - 绘制到画布上的宽度，默认为图片高度。
 * @param {number} height - 绘制到画布上的高度，默认为图片高度。
 * @param {number} sx - 从图片中裁剪的左上角横坐标。
 * @param {number} sy - 从图片中裁剪的左上角纵坐标。
 * @param {number} sWidth - 从图片中裁剪的宽度，默认为图片高度。
 * @param {number} sHeight - 绘制到画布上的高度，默认为图片高度。
 * @usage
 */
export class Image extends ShapeParameters {
    constructor(x, y, image, width, height, sx, sy, sWidth, sHeight) {
        super(x, y, image, width, height, sx, sy, sWidth, sHeight);
        /**
         * @member {number} ShapeParametersImage.prototype.x
         * @description 左上角横坐标，必设参数。
         */
        this.x = x;

        /**
         * @member {number} ShapeParametersImage.prototype.y
         * @description 左上角纵坐标，必设参数。
         */
        this.y = y;

        /**
         * @member {(string|Object)} ShapeParametersImage.prototype.image
         * @description 图片地址。
         */
        this.image = image;

        /**
         * @member {number} ShapeParametersImage.prototype.width
         * @description 绘制到画布上的宽度，默认为图片高度。
         */
        this.width = width;

        /**
         * @member {number} ShapeParametersImage.prototype.height
         * @description 绘制到画布上的高度，默认为图片高度。
         */
        this.height = height;

        /**
         * @member {number} ShapeParametersImage.prototype.sx
         * @description 从图片中裁剪的左上角横坐标。
         */
        this.sx = sx;

        /**
         * @member {number} ShapeParametersImage.prototype.sy
         * @description 从图片中裁剪的左上角纵坐标。
         */
        this.sy = sy;

        /**
         * @member {number} ShapeParametersImage.prototype.sWidth
         * @description 从图片中裁剪的宽度，默认为图片高度。
         */
        this.sWidth = sWidth;

        /**
         * @member {number} ShapeParametersImage.prototype.sHeight
         * @description 绘制到画布上的高度，默认为图片高度。
         */
        this.sHeight = sHeight;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Image";

    }


    /**
     * @function ShapeParametersImage.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.image = null;
        this.width = null;
        this.height = null;
        this.sx = null;
        this.sy = null;
        this.sWidth = null;
        this.sHeight = null;
        super.destroy();
    }
}
