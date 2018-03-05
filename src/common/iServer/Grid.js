import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {UGCSubLayer} from './UGCSubLayer';
import {ServerColor} from './ServerColor';
import {ServerStyle} from './ServerStyle';
import {ColorDictionary} from './ColorDictionary';
import '../REST';

/**
 * @class SuperMap.Grid
 * @category  iServer Map Layer
 * @classdesc UGC 栅格图层类。
 * @extends SuperMap.UGCSubLayer
 * @param options - {Object} 可选参数。如：<br>
 *        colorDictionary - {Array<Object>} 颜色对照表对象。<br>
 *        brightness - {integer} Grid 图层的亮度。<br>
 *        colorGradientType - {boolean} 文本压盖时是否显示压盖的文本对象。<br>
 *        colors - {@link SuperMap.ServerColor} 颜色表对象。<br>
 *        contrast - {integer} Grid 图层的对比度。<br>
 *        gridType - {SuperMap.GridType} 格网类型。<br>
 *        horizontalSpacing - {number}格网水平间隔大小。<br>
 *        sizeFixed - {boolean} 格网是否固定大小，如果不固定大小，则格网随着地图缩放。<br>
 *        solidStyle - {@link SuperMap.ServerStyle} 格网实线的样式。<br>
 *        specialColor - {@link SuperMap.ServerColor} 栅格数据集无值数据的颜色。<br>
 *        specialValue - {number}图层的特殊值。<br>
 *        specialValueTransparent - {boolean} 图层的特殊值（specialValue）所处区域是否透明。<br>
 *        verticalSpacing - {number} 格网垂直间隔大小。
 */
export class Grid extends UGCSubLayer {


    constructor(options) {
        options = options || {};
        super(options);

        /**
         * @member SuperMap.Grid.prototype.colorDictionarys - {Array<SuperMap.ColorDictionary>}
         * @description 颜色对照表对象。
         */
        this.colorDictionarys = null;

        /**
         * @member SuperMap.Grid.prototype.brightness - {integer}
         * @description Grid 图层的亮度。
         */
        this.brightness = null;

        /**
         * @member SuperMap.Grid.prototype.colorGradientType - {SuperMap.ColorGradientType}
         * @description 渐变颜色枚举值。
         */
        this.colorGradientType = null;

        /**
         * @member SuperMap.Grid.prototype.colors - {SuperMap.ServerColor}
         * @description 颜色表对象。
         */
        this.colors = null;

        /**
         * @member SuperMap.Grid.prototype.contrast - {integer}
         * @description Grid 图层的对比度。
         */
        this.contrast = null;

        /**
         * @member SuperMap.Grid.prototype.dashStyle - {SuperMap.ServerStyle}
         * @description 栅格数据集特殊值数据的颜色。
         */
        this.dashStyle = null;

        /**
         * @member SuperMap.Grid.prototype.gridType - {SuperMap.GridType}
         * @description 格网类型。
         */
        this.gridType = null;

        /**
         * @member SuperMap.Grid.prototype.horizontalSpacing - {number}
         * @description 格网水平间隔大小。
         */
        this.horizontalSpacing = null;

        /**
         * @member SuperMap.Grid.prototype.sizeFixed -{boolean}
         * @description 格网是否固定大小，如果不固定大小，则格网随着地图缩放。
         */
        this.sizeFixed = null;

        /**
         * @member SuperMap.Grid.prototype.solidStyle - {SuperMap.ServerStyle}
         * @description 格网实线的样式。
         */
        this.solidStyle = null;

        /**
         * @member SuperMap.Grid.prototype.specialColor - {SuperMap.ServerColor}
         * @description 栅格数据集无值数据的颜色。
         */
        this.specialColor = null;

        /**
         * @member SuperMap.Grid.prototype.specialValue - {number}
         * @description 图层的特殊值。
         */
        this.specialValue = null;

        /**
         * @member SuperMap.Grid.prototype.specialValueTransparent - {boolean}
         * @description 图层的特殊值（specialValue）所处区域是否透明。
         */
        this.specialValueTransparent = null;

        /**
         * @member SuperMap.Grid.prototype.verticalSpacing - {number}
         * @description 格网垂直间隔大小。
         */
        this.verticalSpacing = null;


        this.CLASS_NAME = "SuperMap.Grid";
    }

    /**
     * @function SuperMap.Grid.prototype.destroy
     * @description 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.Grid.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象。
     * @param jsonObject - {Object} 要转换的 JSON 对象。
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
     * @description 转换成对应的JSON对象。
     * @return JSON对象。
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
