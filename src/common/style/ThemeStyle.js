/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class ThemeStyle
 * @deprecatedclass SuperMap.ThemeStyle
 * @classdesc 客户端专题图风格类。
 * @modulecategory Overlay
 * @category Visualization Theme
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.fill=true] - 是否填充，不需要填充则设置为 false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
 * @param {string} [options.fillColor='#000000'] - 十六进制填充颜色。
 * @param {number} [options.fillOpacity=1] - 填充不透明度。取值范围[0, 1]。
 * @param {boolean} [options.stroke=false] -  是否描边，不需要描边则设置为false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
 * @param {string} [options.strokeColor='#000000'] - 十六进制描边颜色。
 * @param {number} [options.strokeOpacity=1] - 描边的不透明度。取值范围[0, 1]。
 * @param {number} [options.strokeWidth=1] - 线宽度/描边宽度。
 * @param {string} [options.strokeLinecap='butt'] - 线帽样式。strokeLinecap 有三种类型 “butt", "round", "square"。
 * @param {string} [options.strokeLineJoin='iter'] - 线段连接样式。strokeLineJoin 有三种类型 “miter", "round", "bevel"。
 * @param {string} [options.strokeDashstyle='solid'] - 虚线类型。strokeDashstyle 有八种类型 “dot",“dash",“dashdot",“longdash",“longdashdot",“solid", "dashed", "dotted"。solid 表示实线。
 * @param {number} [options.pointRadius=6] - 点半径，单位为像素。
 * @param {number} [options.shadowBlur=0] - 阴影模糊度，（大于 0 有效）。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
 * @param {string} [options.shadowColor='#000000'] - 阴影颜色。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
 * @param {number} [options.shadowOffsetX=0] - 阴影 X 方向偏移值。
 * @param {number} [options.shadowOffsetY=0] - 阴影 Y 方向偏移值。
 * @param {string} options.label - 专题要素附加文本标签内容。
 * @param {string} [options.fontColor] - 附加文本字体颜色。
 * @param {number} [options.fontSize=12] - 附加文本字体大小，单位是像素。
 * @param {string} [options.fontStyle='normal'] - 附加文本字体样式。可设值："normal", "italic", "oblique"。
 * @param {string} [options.fontVariant='normal'] - 附加文本字体变体。可设值："normal", "small-caps"。
 * @param {string} [options.fontWeight='normal'] - 附加文本字体粗细。可设值："normal", "bold", "bolder", "lighter"。
 * @param {string} [options.fontFamily='arial,sans-serif'] - 附加文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，
 *                             浏览器会使用它可识别的第一个可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称
 *                              （"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。
 * @param {string} [options.labelPosition='top'] - 附加文本位置，可以是 'inside', 'left', 'right', 'top', 'bottom'。
 * @param {string} [options.labelAlign='center'] - 附加文本水平对齐。可以是 'left', 'right', 'center'。
 * @param {string} [options.labelBaseline='middle'] - 附加文本垂直对齐。可以是 'top', 'bottom', 'middle' 。
 * @param {number} [options.labelXOffset=0] - 附加文本在x轴方向的偏移量。
 * @param {number} [options.labelYOffset=0] - 附加文本在y轴方向的偏移量。
 * @usage
 */
export class ThemeStyle {


    constructor(options) {
        options = options || {};
        /**
         * @member {boolean} [ThemeStyle.prototype.fill=true]
         * @description 是否填充，不需要填充则设置为 false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
         */
        this.fill = true;
        /**
         * @member {string} [ThemeStyle.prototype.fillColor="#000000"]
         * @description 十六进制填充颜色。
         */
        this.fillColor = "#000000";
        /**
         *  @member {number} [ThemeStyle.prototype.fillOpacity=1]
         *  @description 填充不透明度。取值范围[0, 1]。
         */
        this.fillOpacity = 1;
        /**
         * @member {boolean} [ThemeStyle.prototype.stroke=false]
         * @description  是否描边，不需要描边则设置为false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
         */
        this.stroke = false;
        /**
         * @member {string} [ThemeStyle.prototype.strokeColor="#000000"]
         * @description  十六进制描边颜色。
         */
        this.strokeColor = "#000000";
        /**
         * @member {number} [ThemeStyle.prototype.strokeOpacity=1]
         * @description  描边的不透明度。取值范围[0, 1]。
         */
        this.strokeOpacity = 1;
        /**
         * @member {number} [ThemeStyle.prototype.strokeWidth=1]
         * @description  线宽度/描边宽度。
         */
        this.strokeWidth = 1;
        /**
         * @member {string} [ThemeStyle.prototype.strokeLinecap="butt"]
         * @description  线帽样式；strokeLinecap 有三种类型 “butt", "round", "square" 。
         */
        this.strokeLinecap = "butt";
        /**
         * @member {string} [ThemeStyle.prototype.strokeLineJoin="miter"]
         * @description  线段连接样式；strokeLineJoin 有三种类型 “miter", "round", "bevel"。
         */
        this.strokeLineJoin = "miter";
        /**
         * @member {string} [ThemeStyle.prototype.strokeDashstyle="solid"]
         * @description   虚线类型；strokeDashstyle 有八种类型 “dot",“dash",“dashdot",“longdash",“longdashdot",“solid", "dashed", "dotted";
         * solid 表示实线。
         */
        this.strokeDashstyle = "solid";
        /**
         * @member {number} [ThemeStyle.prototype.pointRadius=6]
         * @description   点半径。单位为像素。
         */
        this.pointRadius = 6;
        /**
         * @member {number} [ThemeStyle.prototype.shadowBlur=0]
         * @description   阴影模糊度，（大于 0 有效）。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
         */
        this.shadowBlur = 0;
        /**
         * @member {string} [ThemeStyle.prototype.shadowColor='#000000']
         * @description  阴影颜色。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
         */
        this.shadowColor = "#000000";
        /**
         * @member {number} [ThemeStyle.prototype.shadowOffsetX=0]
         * @description 阴影 X 方向偏移值。
         */
        this.shadowOffsetX = 0;
        /**
         * @member {number} ThemeStyle.prototype.shadowOffsetY
         * @description Y 方向偏移值。
         */
        this.shadowOffsetY = 0;
        /**
         * @member {string} [ThemeStyle.prototype.label]
         * @description 专题要素附加文本标签内容。
         */
        this.label = "";
        /**
         * @member {boolean} [ThemeStyle.prototype.labelRect=false]
         * @description 是否显示文本标签矩形背景。
         */
        this.labelRect = false;
        /**
         * @member {string} [ThemeStyle.prototype.fontColor]
         * @description 附加文本字体颜色。
         */
        this.fontColor = "";
        /**
         * @member {number} [ThemeStyle.prototype.fontSize=12]
         * @description 附加文本字体大小，单位是像素。
         */
        this.fontSize = 12;
        /**
         * @member {string} [ThemeStyle.prototype.fontStyle="normal"]
         * @description 附加文本字体样式。可设值："normal", "italic", "oblique"。
         */
        this.fontStyle = "normal";
        /**
         * @member {string} [ThemeStyle.prototype.fontVariant="normal"]
         * @description 附加文本字体变体。可设值："normal", "small-caps"。
         */
        this.fontVariant = "normal";
        /**
         * @member {string} [ThemeStyle.prototype.fontWeight="normal"]
         * @description 附加文本字体粗细。可设值："normal", "bold", "bolder", "lighter"。
         */
        this.fontWeight = "normal";
        /**
         * @member {string} [ThemeStyle.prototype.fontFamily="arial,sans-serif"]
         * @description 附加文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个
         * 可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。
         */
        this.fontFamily = "arial,sans-serif";
        /**
         * @member {string} [ThemeStyle.prototype.labelPosition='top']
         * @description 附加文本位置，可以是 'inside', 'left', 'right', 'top', 'bottom'。
         */
        this.labelPosition = "top";
        /**
         * @member {string} [ThemeStyle.prototype.labelAlign='center']
         * @description 附加文本水平对齐。可以是 'left', 'right', 'center'。
         */
        this.labelAlign = "center";
        /**
         * @member {string} [ThemeStyle.prototype.labelBaseline='middle']
         * @description  附加文本垂直对齐。可以是 'top', 'bottom', 'middle'。
         */
        this.labelBaseline = "middle";
        /**
         * @member {number} [ThemeStyle.prototype.labelXOffset=0]
         * @description  附加文本在 X 轴方向的偏移量。
         */
        this.labelXOffset = 0;
        /**
         * @member {number} [ThemeStyle.prototype.labelYOffset=0]
         * @description 附加文本在 Y 轴方向的偏移量。
         */
        this.labelYOffset = 0;

        Util.extend(this, options);
    }
}

