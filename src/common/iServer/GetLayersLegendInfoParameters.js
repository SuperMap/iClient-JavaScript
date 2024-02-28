/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class GetLayersLegendInfoParameters
 * @deprecatedclass SuperMap.GetLayersLegendInfoParameters
 * @category iServer Map Layer
 * @classdesc 图例参数类。该类用于设置图例的尺寸、背景透明、可见范围等参数。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {string} options.bbox - 查询与此矩形框有交集的图层的图例，当 layers 参数未设置时，bbox 是必填参数。格式：bbox=xmin,ymin,xmax,ymax。
 * @param {string} options.layers - 图层过滤，当 bbox 参数未设置时，layers 是必填参数。语法：[show|hide]:layerName1,layerName2。show 表示只返回指定图层的图例，hide 表示指定图层图例不返回，其他查询出来的图层图例都返回。例如：show:country@World@@World，表示只返回 country@World@@World 图层的图例。
 * @param {boolean} [options.transparent=true] - 图例图片是否背景透明。true 代表背景透明。
 * @param {number} [options.mapScale] - 地图比例尺。当 returnVisibleOnly 为 true 时，mapScale 是必填参数。
 * @param {boolean} [options.returnVisibleOnly=false] - 是否只返回当前地图范围内可见要素的图例。
 * @param {number} [options.width=16] - 返回图例的宽度。单位为像素。
 * @param {number} [options.height=16] - 返回图例的高度。单位为像素。

 * @usage
 */
export class GetLayersLegendInfoParameters {


    constructor(options) {
        /**
         * @member {string} GetLayersLegendInfoParameters.prototype.bbox
         * @description 查询与此矩形框有交集的图层的图例，当layers 参数未设置时，bbox 是必填参数。格式：bbox=xmin,ymin,xmax,ymax。
         */
        this.bbox = null;

        /**
         * @member {string} GetLayersLegendInfoParameters.prototype.layers
         * @description 图层过滤，当 bbox 参数未设置时，layers 是必填参数。语法：[show|hide]:layerName1,layerName2。show 表示只返回指定图层的图例，hide 表示指定图层图例不返回，其他查询出来的图层图例都返回。例如：show:country@World@@World，表示只返回 country@World@@World 图层的图例。
         */
        this.layers = null;

        /**
         * @member {boolean} [GetLayersLegendInfoParameters.prototype.transparent=true]
         * @description 图例图片是否背景透明。
         */
        this.transparent = null;

        /**
         * @member {number} GetLayersLegendInfoParameters.prototype.mapScale
         * @description  地图比例尺。当 returnVisibleOnly 为 true 时，mapScale 是必填参数。
         */
        this.mapScale = null;

        /**
         * @member {boolean} [GetLayersLegendInfoParameters.prototype.returnVisibleOnly=false]
         * @description  是否只返回当前地图范围内可见要素的图例。
         */
        this.returnVisibleOnly = null;

        /**
         * @member {number} [GetLayersLegendInfoParameters.prototype.width=16]
         * @description  返回图例的宽度。单位为像素。
         */
        this.width = null;

        /**
         * @member {number} [GetLayersLegendInfoParameters.prototype.height=16]
         * @description  返回图例的高度。单位为像素。
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

