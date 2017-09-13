import SuperMap from '../SuperMap';
import UGCSubLayer from './UGCSubLayer';
import ServerColor from './ServerColor';
import {ColorSpaceType} from '../REST';

/**
 * @class SuperMap.Image
 * @classdesc UGC 影像图层类。
 * @extends SuperMap.UGCSubLayer
 * @param options - {Object} 可选参数。如：<br>
 *        colorSpaceType - {SuperMap.ColorSpaceType} 返回影像图层的色彩显示模式。<br>
 *        brightness - {Integer} 影像图层的亮度。<br>
 *        displayBandIndexes - {Array<Integer>} 返回当前影像图层显示的波段索引。<br>
 *        contrast - {Integer} 影像图层的对比度。<br>
 *        transparent - {boolean} 是否背景透明。<br>
 *        transparentColor - {SuperMap.ServerColor} 返回背景透明色。<br>
 *        transparentColorTolerance - {Integer} 背景透明色容限。
 */
export default class UGCImage extends UGCSubLayer {

    /**
     * @member SuperMap.Image.prototype.brightness -{Integer}
     * @description 影像图层的亮度。
     */
    brightness = null;

    /**
     * @member SuperMap.Image.prototype.colorSpaceType -{SuperMap.ColorSpaceType}
     * @description 返回影像图层的色彩显示模式。
     */
    colorSpaceType = null;

    /**
     * @member SuperMap.Image.prototype.contrast -{Integer}
     * @description 影像图层的对比度。
     */
    contrast = null;

    /**
     * @member SuperMap.Image.prototype.displayBandIndexes {Array<Integer>}
     * @description 返回当前影像图层显示的波段索引。
     */
    displayBandIndexes = null;

    /**
     * @member SuperMap.Image.prototype.transparent -{boolean}
     * @description 是否背景透明。
     */
    transparent = null;

    /**
     * @member SuperMap.Image.prototype.transparentColor -{SuperMap.ServerColor}
     * @description 返回背景透明色。
     */
    transparentColor = null;

    /**
     * @member SuperMap.Image.prototype.transparentColorTolerance -{Integer}
     * @description 背景透明色容限。
     */
    transparentColorTolerance = null;

    /*
     * @function SuperMap.Image.prototype.constructor
     * @description UGC 影像图层类构造函数。
     * @param options - {Object} 可选参数。如：<br>
     *        colorSpaceType - {SuperMap.ColorSpaceType} 返回影像图层的色彩显示模式。<br>
     *        brightness - {Integer} 影像图层的亮度。<br>
     *        displayBandIndexes - {Array<Integer>} 返回当前影像图层显示的波段索引。<br>
     *        contrast - {Integer} 影像图层的对比度。<br>
     *        transparent - {boolean} 是否背景透明。<br>
     *        transparentColor - {SuperMap.ServerColor} 返回背景透明色。<br>
     *        transparentColorTolerance - {Integer} 背景透明色容限。
     */
    constructor(options) {
        options = options || {};
        super(options);
    }

    /**
     * @function SuperMap.Image.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }

    /**
     * @function SuperMap.Image.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
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


    CLASS_NAME = "SuperMap.Image"
}

SuperMap.Image = UGCImage;
