/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../../SuperMap';
import { ShapeParameters } from './ShapeParameters';

/**
 * @class SuperMap.Feature.ShapeParameters.Label
 * @category Visualization Theme
 * @classdesc 标签参数对象。
 * @extent {SuperMap.Feature.ShapeParameters}
 */

export class Label extends ShapeParameters {


    /**
     * @function SuperMap.Feature.ShapeParameters.Label.prototype.constructor
     * @description 创建一个标签参数对象。
     * @param {number} x - 横坐标，必设参数。
     * @param {number} y - 纵坐标，必设参数。
     * @param {string} text - 图形中的附加文本，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Label} 标签参数对象。
     */
    constructor(x, y, text) {
        super(x, y, text);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Label.prototype.x
         * @description 标签 x 坐标。
         */
        this.x = x;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Label.prototype.y
         * @description 标签 y 坐标。
         */
        this.y = y;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Label.prototype.text
         * @description 标签的文本内容。
         */
        this.text = text;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Label";
    }


    /**
     * @function SuperMap.Feature.ShapeParameters.Label.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.text = null;

        super.destroy();
    }


}

/**
* @typedef {Object} SuperMap.Feature.ShapeParameters.Label.style
* @property {boolean} fill - 是否填充，不需要填充则设置为 false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
* @property {string} fillColor - 十六进制填充颜色。默认值为 "#000000"。
* @property {number} fillOpacity - 填充不透明度。取值范围[0, 1]，默认值 1。
* @property {boolean} stroke - 是否描边，不需要描边则设置为false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
* @property {string} strokeColor - 十六进制描边颜色。
* @property {number} strokeOpacity - 描边的不透明度。取值范围[0, 1]，默认值 1。
* @property {number} strokeWidth -描边宽度，默认值 1。
* @property {number} maxWidth - 最大宽度限制。默认值：null。
* @property {number} fontSize - 标签文本字体大小。默认值 12，单位是像素。
* @property {string} fontStyle - 标签文本字体样式。可设值："normal", "italic", "oblique"; 默认值："normal" 。
* @property {string} fontVariant - 标签文本字体变体。可设值："normal", "small-caps"; 默认值："normal" 。
* @property {string} fontWeight - 标签文本字体粗细。可设值："normal", "bold", "bolder", "lighter"; 默认值："normal" 。
* @property {string} fontFamily - 标签文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个值。
* 可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。默认值："arial,sans-serif".
* @property {string} labelBaseline - 标签文本垂直对齐, 可以是 'top', 'bottom', 'middle'，默认值 'middle'。
* @property {string} labelAlign - 标签文本水平对齐。可以是 'left', 'right', 'center'; 默认值 'center'。
* @property {number} shadowBlur - 阴影模糊度，大于 0 有效。默认值：0。
* @property {number} shadowColor - 阴影颜色。默认值："#000000'"。
* @property {number} shadowOffsetX - 阴影横向偏移。默认值：0。
* @property {number} shadowOffsetY - 阴影纵向偏移。默认值：0。
*/

SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Label = Label;