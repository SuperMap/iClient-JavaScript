/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Rectangle
 * @category Visualization Theme
 * @classdesc 矩形参数对象。
 * @extends {SuperMap.Feature.ShapeParameters}
 */

export class Rectangle extends ShapeParameters {
    
    
    /**
     * @function SuperMap.Feature.ShapeParameters.Rectangle.prototype.constructor
     * @description 创建一个图形矩形参数对象。
     * @param {number} x - 矩形 x 坐标，必设参数。
     * @param {number} y - 矩形 y 坐标，必设参数。
     * @param {number} width - 矩形 width 坐标，必设参数。
     * @param {number} height - 矩形 height 坐标，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Rectangle} 图形矩形参数对象。
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.x
         * @description 左上角 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.y
         * @description 左上角 y 坐标。
         */
        this.y = !isNaN(x) ? y : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.width
         * @description 宽度。
         */
        this.width = !isNaN(width) ? width : 0;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.height
         * @description 高度。
         */
        this.height = !isNaN(height) ? height : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Rectangle";
    }

    
    /**
     * @function SuperMap.Feature.ShapeParameters.Rectangle.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        super.destroy();
    }

}

/**
 * @typedef {Object} SuperMap.Feature.ShapeParameters.Rectangle.style
 * @property {boolean} fill - 是否填充，不需要填充则设置为false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
 * @property {string}  fillColor - 十六进制填充颜色。默认值为 "#000000"。
 * @property {number} fillOpacity - 填充不透明度。取值范围[0, 1]，默认值 1。
 * @property {boolean} stroke - 是否描边，不需要描边则设置为 false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
 * @property {string}  strokeColor - 十六进制描边颜色。
 * @property {number} strokeWidth - 描边宽度，默认值 1。
 * @property {number} strokeOpacity - 描边的不透明度。取值范围[0, 1]，默认值 1。
 * @property {string}  strokeLinecap - 线帽样式；strokeLinecap 有三种类型 ：“butt", "round", "square"; 默认为"butt"。
 * @property {string}  strokeLineJoin - 线段连接样式；strokeLineJoin 有三种类型： “miter", "round", "bevel"; 默认为"miter"。
 * @property {string}  strokeDashstyle - 虚线类型； strokeDashstyle 有八种类型 ：“dot",“dash",“dashdot",“longdash",“longdashdot",“solid", "dashed", "dotted"; 默认值 "solid"。solid 表示实线。
 * @property {number} shadowBlur - 阴影模糊度，（大于 0 有效; 默认值 0）。
 * @property {string}  shadowColor - 阴影颜色; 默认值 '#000000'。
 * @property {number} shadowOffsetX - 阴影 X 方向偏移值; 默认值 0。
 * @property {number} shadowOffsetY - 阴影 Y 方向偏移值; 默认值 0。
*/

SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Rectangle = Rectangle;