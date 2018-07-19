import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {UGCSubLayer} from './UGCSubLayer';
import {ServerColor} from './ServerColor';
import {ServerStyle} from './ServerStyle';
import {ColorDictionary} from './ColorDictionary';
import '../REST';

/**
 * @class SuperMap.Grid
 * @category iServer Map Layer
 * @classdesc UGC 栅格图层类 
 * @extends {SuperMap.UGCSubLayer}
 * @param {Object} options - 参数。 
 * @param {Array.<Object>} [options.colorDictionary] - 颜色对照表对象。 
 * @param {number} [options.brightness] - Grid 图层的亮度。 
 * @param {SuperMap.ColorGradientType} [options.colorGradientType] - 颜色渐变枚举。 
 * @param {SuperMap.ServerColor} [options.colors] - 颜色表对象。 
 * @param {number} [options.contrast] - Grid 图层的对比度。 
 * @param {SuperMap.GridType} [options.gridType] - 格网类型。 
 * @param {number} [options.horizontalSpacing] - 格网水平间隔大小。 
 * @param {boolean} [options.sizeFixed] - 格网是否固定大小，如果不固定大小，则格网随着地图缩放。 
 * @param {SuperMap.ServerStyle} [options.solidStyle] - 格网实线的样式。 
 * @param {SuperMap.ServerColor} [options.specialColor] - 栅格数据集无值数据的颜色。 
 * @param {number} [options.specialValue] - 图层的特殊值。 
 * @param {boolean} [options.specialValueTransparent] - 图层的特殊值（specialValue）所处区域是否透明。 
 * @param {number} [options.verticalSpacing] - 格网垂直间隔大小。
 */
export class Grid extends UGCSubLayer {


    constructor(options) {
        options = options || {};
        super(options);

        /**
         * @member {Array.<SuperMap.ColorDictionary>} SuperMap.Grid.prototype.colorDictionarys
         * @description 颜色对照表对象。
         */
        this.colorDictionarys = null;

        /**
         * @member {number} SuperMap.Grid.prototype.brightness
         * @description Grid 图层的亮度。
         */
        this.brightness = null;

        /**
         * @member {SuperMap.ColorGradientType} SuperMap.Grid.prototype.colorGradientType
         * @description 渐变颜色枚举值。
         */
        this.colorGradientType = null;

        /**
         * @member {SuperMap.ServerColor} SuperMap.Grid.prototype.colors
         * @description 颜色表对象。
         */
        this.colors = null;

        /**
         * @member {number} SuperMap.Grid.prototype.contrast
         * @description Grid 图层的对比度。
         */
        this.contrast = null;

        /**
         * @member {SuperMap.ServerStyle} SuperMap.Grid.prototype.dashStyle
         * @description 栅格数据集特殊值数据的颜色。
         */
        this.dashStyle = null;

        /**
         * @member {SuperMap.GridType} SuperMap.Grid.prototype.gridType
         * @description 格网类型。
         */
        this.gridType = null;

        /**
         * @member {number} SuperMap.Grid.prototype.horizontalSpacing
         * @description 格网水平间隔大小。
         */
        this.horizontalSpacing = null;

        /**
         * @member {boolean} SuperMap.Grid.prototype.sizeFixed
         * @description 格网是否固定大小，如果不固定大小，则格网随着地图缩放。
         */
        this.sizeFixed = null;

        /**
         * @member {SuperMap.ServerStyle} SuperMap.Grid.prototype.solidStyle
         * @description 格网实线的样式。
         */
        this.solidStyle = null;

        /**
         * @member {SuperMap.ServerColor} SuperMap.Grid.prototype.specialColor
         * @description 栅格数据集无值数据的颜色。
         */
        this.specialColor = null;

        /**
         * @member {number} SuperMap.Grid.prototype.specialValue
         * @description 图层的特殊值。
         */
        this.specialValue = null;

        /**
         * @member {boolean} SuperMap.Grid.prototype.specialValueTransparent
         * @description 图层的特殊值（specialValue）所处区域是否透明。
         */
        this.specialValueTransparent = null;

        /**
         * @member {number} SuperMap.Grid.prototype.verticalSpacing
         * @description 格网垂直间隔大小。
         */
        this.verticalSpacing = null;


        this.CLASS_NAME = "SuperMap.Grid";
    }

    /**
     * @function SuperMap.Grid.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.Grid.prototype.fromJson
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
     * @function SuperMap.Grid.prototype.toServerJSONObject
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

SuperMap.Grid = Grid;
