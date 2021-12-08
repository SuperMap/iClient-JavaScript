/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {UGCSubLayer} from './UGCSubLayer';
import {ServerColor} from './ServerColor';
import {Util} from '../commontypes/Util';

/**
 * @class UGCImage
 * @deprecatedclass SuperMap.Image
 * @category iServer Map Layer
 * @classdesc UGC 影像图层类
 * @extends {UGCSubLayer}
 * @param {Object} options - 参数。
 * @param {ColorSpaceType} [options.colorSpaceType] - 返回影像图层的色彩显示模式。
 * @param {number} [options.brightness] - 影像图层的亮度。
 * @param {Array.<number>} [options.displayBandIndexes] - 返回当前影像图层显示的波段索引。
 * @param {number} [options.contrast] - 影像图层的对比度。
 * @param {boolean} [options.transparent] - 是否背景透明。
 * @param {ServerColor} [options.transparentColor] - 返回背景透明色。
 * @param {number} [options.transparentColorTolerance] - 背景透明色容限。
 * @usage
 * @private
 */
export class UGCImage extends UGCSubLayer {


    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member {number} UGCImage.prototype.brightness
         * @description 影像图层的亮度。
         */
        this.brightness = null;

        /**
         * @member {ColorSpaceType} UGCImage.prototype.colorSpaceType
         * @description 返回影像图层的色彩显示模式。
         */
        this.colorSpaceType = null;

        /**
         * @member {number} UGCImage.prototype.contrast
         * @description 影像图层的对比度。
         */
        this.contrast = null;

        /**
         * @member {Array.<number>} UGCImage.prototype.displayBandIndexes
         * @description 返回当前影像图层显示的波段索引。
         */
        this.displayBandIndexes = null;

        /**
         * @member {boolean} UGCImage.prototype.transparent
         * @description 是否背景透明。
         */
        this.transparent = null;

        /**
         * @member {ServerColor} UGCImage.prototype.transparentColor
         * @description 返回背景透明色。
         */
        this.transparentColor = null;

        /**
         * @member {number} UGCImage.prototype.transparentColorTolerance
         * @description 背景透明色容限。
         */
        this.transparentColorTolerance = null;

        this.CLASS_NAME = "SuperMap.Image";
    }

    /**
     * @function UGCImage.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function UGCImage.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        if (this.transparentColor) {
            this.transparentColor = new ServerColor(this.transparentColor.red,
                this.transparentColor.green,
                this.transparentColor.blue);
        }
    }

    /**
     * @function UGCImage.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        return super.toServerJSONObject();
    }


}
