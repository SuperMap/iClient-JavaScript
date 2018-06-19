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
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Sector = Sector;