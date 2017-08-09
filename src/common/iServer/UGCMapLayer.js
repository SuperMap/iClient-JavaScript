import SuperMap from '../SuperMap';
import UGCLayer from './UGCLayer';

/**
 * @class SuperMap.UGCMapLayer
 * @classdesc UGC 地图图层类。
 * @extends SuperMap.UGCLayer
 * @param options - {Object} 可选参数。如：<br>
 *        completeLineSymbolDisplayed - {Boolean} 是否显示完整线型。<br>
 *        maxScale - {Number} 地图最大比例尺。<br>
 *        minScale - {Number} 地图最小比例尺。<br>
 *        minVisibleGeometrySize - {Number} 几何对象的最小可见大小，以像素为单位。<br>
 *        opaqueRate - {Integer} 图层的不透明度。<br>
 *        symbolScalable - {Boolean} 是否允许图层的符号大小随图缩放。<br>
 *        symbolScale - {Number} 图层的符号缩放基准比例尺。<br>
 *        overlapDisplayed - {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。<br>
 *        overlapDisplayedOptions - {SuperMap.OverlapDisplayedOptions} 地图的压盖过滤显示选项，当
 *                                   overlapDisplayed 为 false 时有效。
 */
export default  class UGCMapLayer extends UGCLayer {

    /**
     * @member SuperMap.UGCMapLayer.prototype.completeLineSymbolDisplayed -{Boolean}
     * @description 是否显示完整线型。
     */
    completeLineSymbolDisplayed = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.maxScale -{Number}
     * @description 地图最大比例尺。
     */
    maxScale = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.minScale -{Number}
     * @description 地图最小比例尺。
     */
    minScale = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.minVisibleGeometrySize -{Number}
     * @description 几何对象的最小可见大小，以像素为单位。
     */
    minVisibleGeometrySize = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.opaqueRate -{Integer}
     * @description 图层的不透明度。
     */
    opaqueRate = null;
    /**
     * @member SuperMap.UGCMapLayer.prototype.symbolScalable -{Boolean}
     * @description 是否允许图层的符号大小随图缩放。
     */
    symbolScalable = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.symbolScale -{Number}
     * @description 图层的符号缩放基准比例尺。
     */
    symbolScale = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.overlapDisplayed -{Boolean}
     * @description 地图对象在同一范围内时，是否重叠显示，默认为False。
     */
    overlapDisplayed = null;

    /**
     * @member SuperMap.UGCMapLayer.prototype.overlapDisplayedOptions -{SuperMap.OverlapDisplayedOptions}
     * @description 地图的压盖过滤显示选项，当 overlapDisplayed 为 false 时有效。
     */
    overlapDisplayedOptions = null;

    /*
     * Constructor: SuperMap.UGCMapLayer
     * UGC 地图图层类构造函数。
     */
    constructor(options) {
        options = options || {};
        super(options);
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }


    /**
     * @function SuperMap.UGCMapLayer.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
    }


    /**
     * @function SuperMap.UGCMapLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        return super.toServerJSONObject();
    }

    CLASS_NAME = "SuperMap.UGCMapLayer"
}

SuperMap.UGCMapLayer = UGCMapLayer;
