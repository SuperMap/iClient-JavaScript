/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {UGCLayer} from './UGCLayer';
import './OverlapDisplayedOptions';

/**
 * @class SuperMap.UGCMapLayer
 * @category  iServer Map Layer
 * @classdesc UGC 地图图层类。
 * @extends {SuperMap.UGCLayer}
 * @param {Object} options - 参数。 
 * @param {boolean} [options.completeLineSymbolDisplayed] - 是否显示完整线型。 
 * @param {number} [options.maxScale] - 地图最大比例尺。 
 * @param {number} [options.minScale] - 地图最小比例尺。 
 * @param {number} [options.minVisibleGeometrySize] - 几何对象的最小可见大小，以像素为单位。 
 * @param {number} [options.opaqueRate] - 图层的不透明度。 
 * @param {boolean} [options.symbolScalable] - 是否允许图层的符号大小随图缩放。 
 * @param {number} [options.symbolScale] - 图层的符号缩放基准比例尺。 
 * @param {boolean} [options.overlapDisplayed=false] - 地图对象在同一范围内时，是否重叠显示。 
 * @param {SuperMap.OverlapDisplayedOptions} [options.overlapDisplayedOptions] - 地图的压盖过滤显示选项，当overlapDisplayed 为 false 时有效。
 */
export class UGCMapLayer extends UGCLayer {

    constructor(options) {
        options = options || {};
        super(options);
        /**
         * @member {boolean} SuperMap.UGCMapLayer.prototype.completeLineSymbolDisplayed
         * @description 是否显示完整线型。
         */
        this.completeLineSymbolDisplayed = null;

        /**
         * @member {number} SuperMap.UGCMapLayer.prototype.maxScale
         * @description 地图最大比例尺。
         */
        this.maxScale = null;

        /**
         * @member {number} SuperMap.UGCMapLayer.prototype.minScale
         * @description 地图最小比例尺。
         */
        this.minScale = null;

        /**
         * @member {number} SuperMap.UGCMapLayer.prototype.minVisibleGeometrySize
         * @description 几何对象的最小可见大小，以像素为单位。
         */
        this.minVisibleGeometrySize = null;

        /**
         * @member {number} SuperMap.UGCMapLayer.prototype.opaqueRate
         * @description 图层的不透明度。
         */
        this.opaqueRate = null;
        /**
         * @member {boolean} SuperMap.UGCMapLayer.prototype.symbolScalable
         * @description 是否允许图层的符号大小随图缩放。
         */
        this.symbolScalable = null;

        /**
         * @member {number} SuperMap.UGCMapLayer.prototype.symbolScale
         * @description 图层的符号缩放基准比例尺。
         */
        this.symbolScale = null;

        /**
         * @member {boolean} [SuperMap.UGCMapLayer.prototype.overlapDisplayed=false]
         * @description 地图对象在同一范围内时，是否重叠显示。
         */
        this.overlapDisplayed = null;

        /**
         * @member {SuperMap.OverlapDisplayedOptions} SuperMap.UGCMapLayer.prototype.overlapDisplayedOptions
         * @description 地图的压盖过滤显示选项，当 overlapDisplayed 为 false 时有效。
         */
        this.overlapDisplayedOptions = null;

        this.CLASS_NAME = "SuperMap.UGCMapLayer";
    }

    /**
     * @function SuperMap.UGCMapLayer.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }


    /**
     * @function SuperMap.UGCMapLayer.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
    }


    /**
     * @function SuperMap.UGCMapLayer.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        return super.toServerJSONObject();
    }

}

SuperMap.UGCMapLayer = UGCMapLayer;
