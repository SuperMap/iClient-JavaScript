/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {UGCSubLayer} from './UGCSubLayer';
import {ServerColor} from './ServerColor';
import {ServerStyle} from './ServerStyle';
import {ColorDictionary} from './ColorDictionary';

/**
 * @class Grid
 * @deprecatedclass SuperMap.Grid
 * @category iServer Map Layer
 * @classdesc SuperMap 栅格图层类。
 * @extends {UGCSubLayer}
 * @param {Object} options - 可选参数。
 * @param {Array.<Object>} [options.colorDictionary] - 颜色对照表对象。
 * @param {number} [options.brightness] - Grid 图层的亮度。
 * @param {ColorGradientType} [options.colorGradientType] - 颜色渐变枚举。
 * @param {ServerColor} [options.colors] - 颜色表对象。
 * @param {number} [options.contrast] - Grid 图层的对比度。
 * @param {GridType} [options.gridType] - 格网类型。
 * @param {number} [options.horizontalSpacing] - 格网水平间隔大小。
 * @param {boolean} [options.sizeFixed] - 格网是否固定大小，如果不固定大小，则格网随着地图缩放。
 * @param {ServerStyle} [options.solidStyle] - 格网实线的样式。
 * @param {ServerColor} [options.specialColor] - 栅格数据集无值数据的颜色。
 * @param {number} [options.specialValue] - 图层的特殊值。
 * @param {boolean} [options.specialValueTransparent] - 图层的特殊值（specialValue）所处区域是否透明。
 * @param {number} [options.verticalSpacing] - 格网垂直间隔大小。
 * @usage
 */
export class Grid extends UGCSubLayer {


    constructor(options) {
        options = options || {};
        super(options);

        /**
         * @member {Array.<ColorDictionary>} Grid.prototype.colorDictionarys
         * @description 颜色对照表对象。
         */
        this.colorDictionarys = null;

        /**
         * @member {number} Grid.prototype.brightness
         * @description Grid 图层的亮度。
         */
        this.brightness = null;

        /**
         * @member {ColorGradientType} Grid.prototype.colorGradientType
         * @description 渐变颜色枚举值。
         */
        this.colorGradientType = null;

        /**
         * @member {ServerColor} Grid.prototype.colors
         * @description 颜色表对象。
         */
        this.colors = null;

        /**
         * @member {number} Grid.prototype.contrast
         * @description Grid 图层的对比度。
         */
        this.contrast = null;

        /**
         * @member {ServerStyle} Grid.prototype.dashStyle
         * @description 栅格数据集特殊值数据的颜色。
         */
        this.dashStyle = null;

        /**
         * @member {GridType} Grid.prototype.gridType
         * @description 格网类型。
         */
        this.gridType = null;

        /**
         * @member {number} Grid.prototype.horizontalSpacing
         * @description 格网水平间隔大小。
         */
        this.horizontalSpacing = null;

        /**
         * @member {boolean} Grid.prototype.sizeFixed
         * @description 格网是否固定大小，如果不固定大小，则格网随着地图缩放。
         */
        this.sizeFixed = null;

        /**
         * @member {ServerStyle} Grid.prototype.solidStyle
         * @description 格网实线的样式。
         */
        this.solidStyle = null;

        /**
         * @member {ServerColor} Grid.prototype.specialColor
         * @description 栅格数据集无值数据的颜色。
         */
        this.specialColor = null;

        /**
         * @member {number} Grid.prototype.specialValue
         * @description 图层的特殊值。
         */
        this.specialValue = null;

        /**
         * @member {boolean} Grid.prototype.specialValueTransparent
         * @description 图层的特殊值（specialValue）所处区域是否透明。
         */
        this.specialValueTransparent = null;

        /**
         * @member {number} Grid.prototype.verticalSpacing
         * @description 格网垂直间隔大小。
         */
        this.verticalSpacing = null;


        this.CLASS_NAME = "SuperMap.Grid";
    }

    /**
     * @function Grid.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function Grid.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        if (this.specialColor) {
            this.specialColor = new ServerColor(this.specialColor.red,
                this.specialColor.green,
                this.specialColor.blue);
        }
        if (this.colors) {
            var colors = [],
                color;
            for (var i in this.colors) {
                color = this.colors[i];
                colors.push(new ServerColor(color.red, color.green, color.blue));
            }
            this.colors = colors;
        }
        if (this.dashStyle) {
            this.dashStyle = new ServerStyle(this.dashStyle);
        }
        if (this.solidStyle) {
            this.solidStyle = new ServerStyle(this.solidStyle);
        }
        if (this.colorDictionary) {
            var colorDics = [],
                colorDic;
            for (var key in this.colorDictionary) {
                colorDic = this.colorDictionary[key];
                colorDics.push(new ColorDictionary({elevation: key, color: colorDic}));
            }
            this.colorDictionarys = colorDics;
        }
        delete this.colorDictionary;
    }

    /**
     * @function Grid.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 对象。
     * @returns JSON 对象。
     */
    toServerJSONObject() {
        var jsonObject = super.toServerJSONObject();

        if (jsonObject.dashStyle) {
            if (jsonObject.dashStyle.toServerJSONObject) {
                jsonObject.dashStyle = jsonObject.dashStyle.toServerJSONObject();
            }
        }
        if (jsonObject.solidStyle) {
            if (jsonObject.solidStyle.toServerJSONObject) {
                jsonObject.solidStyle = jsonObject.solidStyle.toServerJSONObject();
            }
        }
        return jsonObject;
    }

}

