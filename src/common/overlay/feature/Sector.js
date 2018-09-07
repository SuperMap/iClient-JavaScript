/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Sector
 * @category Visualization Theme
 * @classdesc 扇形参数对象。
 * @extends {SuperMap.Feature.ShapeParameters}
 */

export class Sector extends ShapeParameters {

    

    /**
     * @function SuperMap.Feature.ShapeParameters.Sector.prototype.constructor
     * @description 创建一个扇形参数对象。
     * @param {number} x - 圆心 x 坐标，必设参数。
     * @param {number} y - 圆心 y 坐标，必设参数。
     * @param {number} r - 外圆半径，必设参数。
     * @param {number} startAngle - 起始角度，必设参数。取值范围[0, 360)。
     * @param {number} endAngle - 结束角度，必设参数。取值范围(0, 360]。
     * @param {number} [r0=0] - 内圆半径，指定后将出现内弧，同时扇边长度为'r - r0'。取值范围[0, r)。
     * @returns {SuperMap.Feature.ShapeParameters.Sector} 扇形参数对象。
     */
    constructor(x, y, r, startAngle, endAngle, r0, clockWise) {
        super(x, y, r, startAngle, endAngle, r0, clockWise);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Sector.prototype.x
         * @description  圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Sector.prototype.Y
         * @description  圆心 Y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Sector.prototype.r
         * @description  外圆半径。
         */
        this.r = !isNaN(r) ? r : 0;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Sector.prototype.startAngle
         * @description  起始角度。取值范围[0, 360)，默认值：null。
         */
        this.startAngle = !isNaN(startAngle) ? startAngle : 0;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Sector.prototype.endAngle
         * @description  结束角度。取值范围(0, 360]，默认值：null。
         */
        this.endAngle =  !isNaN(endAngle) ? endAngle : 0;
        
        /**
         * @member {number} [SuperMap.Feature.ShapeParameters.Sector.prototype.r0=0]
         * @description 内圆半径，指定后将出现内弧，同时扇边长度为 r 减 r0。取值范围[0, r)。
         */
        this.r0 = !isNaN(r0) ? r0 : 0;
        
        /**
         * @member {number} [SuperMap.Feature.ShapeParameters.Sector.prototype.clockWise=false]
         * @description 是否是顺时针。默认值：false。
         */
        this.clockWise = clockWise;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Sector";
    }
    
    /**
     * @function SuperMap.Feature.ShapeParameters.Sector.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        this.startAngle = null;
        this.endAngle = null;
        this.r0 = null;
        this.clockWise = null;

        super.destroy();
    }

}

/**
 * @typedef {Object} SuperMap.Feature.ShapeParameters.Sector.style
 * @property {boolean} fill - 是否填充，不需要填充则设置为false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
 * @property {string} fillColor - 十六进制填充颜色。默认值为 "#000000"。
 * @property {number} fillOpacity - 填充不透明度。取值范围[0, 1]，默认值 1。
 * @property {boolean} stroke - 是否描边，不需要描边则设置为 false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
 * @property {string} strokeColor - 十六进制描边颜色。
 * @property {number} strokeWidth - 描边宽度，默认值 1。
 * @property {number} strokeOpacity - 描边的不透明度。取值范围[0, 1]，默认值 1。
 * @property {number} shadowBlur - 阴影模糊度，（大于 0 有效; 默认值 0）。
 * @property {string} shadowColor - 阴影颜色; 默认值 '#000000'。
 * @property {number} shadowOffsetX - 阴影 X 方向偏移值; 默认值 0。
 * @property {number} shadowOffsetY - 阴影 Y 方向偏移值; 默认值 0。
 */

SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Sector = Sector;