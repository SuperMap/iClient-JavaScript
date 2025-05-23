/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {UGCSubLayer} from './UGCSubLayer';
import {ServerColor} from './ServerColor';
import {Util} from '../commontypes/Util';

/**
 * @class UGCImage
 * @deprecatedclass SuperMap.Image
 * @category iServer Map Layer
 * @classdesc SuperMap 影像图层类
 * @extends {UGCSubLayer}
 * @param {Object} options - 可选参数。
 * @param {ColorSpaceType} [options.colorSpaceType] - 返回影像图层的色彩显示模式。
 * @param {number} [options.brightness] - 影像图层的亮度。
 * @param {Array.<number>} [options.displayBandIndexes] - 返回当前影像图层显示的波段索引。
 * @param {number} [options.contrast] - 影像图层的对比度。
 * @param {boolean} [options.transparent] - 背景是否透明。
 * @param {ServerColor} [options.transparentColor] - 返回背景透明色。
 * @param {number} [options.transparentColorTolerance] - 背景透明色容限。
 * @param {number} [options.gamma] - Gamma 参数，数值范围为 0 到 10，数值精度为小数点后两位。实现影像非线性亮度和对比度调整，
 * 当 Gamma 值等于1时，图像没有进行 Gamma 校正。当 Gamma 值大于1时，图像的暗部区域对比度增加，细节更加突出，
 * 但亮部区域的细节会有所损失，整体图像变亮。当Gamma值小于1时，图像的亮部区域对比度增加，细节更加突出，
 * 但暗部区域的细节会有所损失，整体图像变暗。
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
         * @description 背景是否透明。
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

        /**
          * @member {number} UGCImage.prototype.gamma
          * @description Gamma 参数，数值范围为 0 到 10，数值精度为小数点后两位。实现影像非线性亮度和对比度调整，
          * 当 Gamma 值等于1时，图像没有进行 Gamma 校正。当 Gamma 值大于1时，图像的暗部区域对比度增加，细节更加突出，
          * 但亮部区域的细节会有所损失，整体图像变亮。当Gamma值小于1时，图像的亮部区域对比度增加，细节更加突出，
          * 但暗部区域的细节会有所损失，整体图像变暗。
         */
        this.gamma = null;

        this.CLASS_NAME = "SuperMap.Image";
        Util.extend(this, options);
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
