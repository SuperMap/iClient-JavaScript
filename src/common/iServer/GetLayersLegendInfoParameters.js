/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class GetLayersLegendInfoParameters
 * @deprecatedclass SuperMap.GetLayersLegendInfoParameters
 * @category iServer Map Layer
 * @classdesc 图例参数类。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {string} options.bbox - 查询与此矩形框有交集的图层的图例，当layers参数未设置时，bbox是必填参数。格式：bbox=xmin,ymin,xmax,ymax。
 * @param {string} options.layers - 图层过滤，当bbox参数未设置时，layers是必填参数。语法：[show|hide]:layerName1,layerName2。show表示只返回指定图层的图例，hide表示指定图层图例不返回，其他查询出来的图层图例都返回。例如：show:country@World@@World，表示只返回country@World@@World图层的图例。
 * @param {boolean} [options.transparent] - 图例图片是否背景透明。默认为true。
 * @param {number} [options.mapScale] - 地图比例尺。当returnVisibleOnly为true时，mapScale是必填参数。
 * @param {boolean} [options.returnVisibleOnly] - 是否只返回当前地图范围内可见要素的图例。默认为false。
 * @param {number} [options.width] - 返回图例的宽度。默认16像素。
 * @param {number} [options.height] - 返回图例的高度。默认16像素。

 * @usage
 */
export class GetLayersLegendInfoParameters {


    constructor(options) {
        /**
         * @member {string} GetLayersLegendInfoParameters.prototype.bbox
         * @description 查询与此矩形框有交集的图层的图例，当layers参数未设置时，bbox是必填参数。格式：bbox=xmin,ymin,xmax,ymax。
         */
        this.bbox = null;

        /**
         * @member {string} GetLayersLegendInfoParameters.prototype.layers
         * @description 图层过滤，当bbox参数未设置时，layers是必填参数。语法：[show|hide]:layerName1,layerName2。show表示只返回指定图层的图例，hide表示指定图层图例不返回，其他查询出来的图层图例都返回。例如：show:country@World@@World，表示只返回country@World@@World图层的图例。
         */
        this.layers = null;

        /**
         * @member {boolean} GetLayersLegendInfoParameters.prototype.transparent
         * @description 图例图片是否背景透明。默认为true。
         */
        this.transparent = null;

        /**
         * @member {number} GetLayersLegendInfoParameters.prototype.mapScale
         * @description  地图比例尺。当returnVisibleOnly为true时，mapScale是必填参数。
         */
        this.mapScale = null;

        /**
         * @member {boolean} GetLayersLegendInfoParameters.prototype.returnVisibleOnly
         * @description  是否只返回当前地图范围内可见要素的图例。默认为false。
         */
        this.returnVisibleOnly = null;

        /**
         * @member {number} GetLayersLegendInfoParameters.prototype.width
         * @description  返回图例的宽度。默认16像素。
         */
        this.width = null;

        /**
         * @member {number} GetLayersLegendInfoParameters.prototype.height
         * @description  返回图例的高度。默认16像素。
         */
        this.height = null;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetLayersLegendInfoParameters";
    }


    /**
     * @function GetLayersLegendInfoParameters.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        var me = this;
        me.bbox = null;
        me.layers = null;
        me.transparent = null;
        me.mapScale = null;
        me.returnVisibleOnly = null;
        me.width = null;
        me.height = null;
    }

}

