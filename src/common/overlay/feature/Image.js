/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Image
 * @category Visualization Theme
 * @classdesc 图片参数对象。
 * @extends {SuperMap.Feature.ShapeParameters}
 */
export class Image extends ShapeParameters {


    /**
     * @function SuperMap.Feature.ShapeParameters.Image.prototype.constructor
     * @description 创建一个图片参数对象。
     * @param {number} x - 左上角横坐标，必设参数。
     * @param {number} y - 左上角纵坐标，必设参数。
     * @param {(string|Object)} image - 图片地址或Cavans对象，必设参数。
     * @param {number} width - 绘制到画布上的宽度，默认为图片高度。
     * @param {number} height - 绘制到画布上的高度，默认为图片高度。
     * @param {number} sx - 从图片中裁剪的左上角横坐标。
     * @param {number} sy - 从图片中裁剪的左上角纵坐标。
     * @param {number} sWidth - 从图片中裁剪的宽度，默认为图片高度。
     * @param {number} sHeight - 绘制到画布上的高度，默认为图片高度。
     * @returns {SuperMap.Feature.ShapeParameters.Image} 圆形参数对象。
     */
    constructor(x, y, image, width, height, sx, sy, sWidth, sHeight) {
        super(x, y, image, width, height, sx, sy, sWidth, sHeight);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.x
         * @description 左上角横坐标，必设参数。
         */
        this.x = x;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.y
         * @description 左上角纵坐标，必设参数。
         */
        this.y = y;

        /**
         * @member {(string|Object)} SuperMap.Feature.ShapeParameters.Image.prototype.image
         * @description 图片地址。
         */
        this.image = image;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.width
         * @description 绘制到画布上的宽度，默认为图片高度。
         */
        this.width = width;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.height
         * @description 绘制到画布上的高度，默认为图片高度。
         */
        this.height = height;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.sx
         * @description 从图片中裁剪的左上角横坐标。
         */
        this.sx = sx;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.sy
         * @description 从图片中裁剪的左上角纵坐标。
         */
        this.sy = sy;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.sWidth
         * @description 从图片中裁剪的宽度，默认为图片高度。
         */
        this.sWidth = sWidth;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Image.prototype.sHeight
         * @description 绘制到画布上的高度，默认为图片高度。
         */
        this.sHeight = sHeight;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Image";

    }


    /**
     * @function SuperMap.Feature.ShapeParameters.Image.prototype.destroy
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
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Image = Image;