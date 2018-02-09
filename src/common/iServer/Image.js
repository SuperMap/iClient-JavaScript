import {SuperMap} from '../SuperMap';
import {UGCSubLayer} from './UGCSubLayer';
import {ServerColor} from './ServerColor';
import {Util} from '../commontypes/Util';
import '../REST';

/**
 * @class SuperMap.Image
 * @category  iServer Map
 * @classdesc UGC 影像图层类。
 * @extends SuperMap.UGCSubLayer
 * @param options - {Object} 可选参数。如：<br>
 *        colorSpaceType - {SuperMap.ColorSpaceType} 返回影像图层的色彩显示模式。<br>
 *        brightness - {integer} 影像图层的亮度。<br>
 *        displayBandIndexes - {Array<integer>} 返回当前影像图层显示的波段索引。<br>
 *        contrast - {integer} 影像图层的对比度。<br>
 *        transparent - {boolean} 是否背景透明。<br>
 *        transparentColor - {@link SuperMap.ServerColor} 返回背景透明色。<br>
 *        transparentColorTolerance - {integer} 背景透明色容限。
 */
export class UGCImage extends UGCSubLayer {


    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member SuperMap.Image.prototype.brightness - {integer}
         * @description 影像图层的亮度。
         */
        this.brightness = null;

        /**
         * @member SuperMap.Image.prototype.colorSpaceType - {SuperMap.ColorSpaceType}
         * @description 返回影像图层的色彩显示模式。
         */
        this.colorSpaceType = null;

        /**
         * @member SuperMap.Image.prototype.contrast - {integer}
         * @description 影像图层的对比度。
         */
        this.contrast = null;

        /**
         * @member SuperMap.Image.prototype.displayBandIndexes - {Array<integer>}
         * @description 返回当前影像图层显示的波段索引。
         */
        this.displayBandIndexes = null;

        /**
         * @member SuperMap.Image.prototype.transparent - {boolean}
         * @description 是否背景透明。
         */
        this.transparent = null;

        /**
         * @member SuperMap.Image.prototype.transparentColor - {SuperMap.ServerColor}
         * @description 返回背景透明色。
         */
        this.transparentColor = null;

        /**
         * @member SuperMap.Image.prototype.transparentColorTolerance - {integer}
         * @description 背景透明色容限。
         */
        this.transparentColorTolerance = null;

        this.CLASS_NAME = "SuperMap.Image";
    }

    /**
     * @function SuperMap.Image.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.Image.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象。
     * @param jsonObject - {Object} 要转换的 JSON 对象。
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
     * @function SuperMap.Image.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        return super.toServerJSONObject();
    }


}

SuperMap.Image = UGCImage;
