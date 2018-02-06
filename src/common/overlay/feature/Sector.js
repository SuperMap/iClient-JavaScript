import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Sector
 * @category Visualization Theme
 * 扇形参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export class Sector extends ShapeParameters {


    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Sector
     * 创建一个扇形参数对象。
     *
     * Parameters:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 外圆半径，必设参数。
     * startAngle - {Number} 起始角度，必设参数。取值范围[0, 360)。
     * endAngle - {Number} 结束角度，必设参数。取值范围(0, 360]。
     * r0 - {Number} 内圆半径，指定后将出现内弧，同时扇边长度为`r - r0`。取值范围[0, r)，默认值：0。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Sector>} 扇形参数对象。
     */
    constructor(x, y, r, startAngle, endAngle, r0, clockWise) {
        super(x, y, r, startAngle, endAngle, r0, clockWise);
        /**
         * APIProperty: x
         * {Number} 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 圆心 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * APIProperty: r
         * {Number} 外圆半径。
         */
        this.r = !isNaN(r) ? r : 0;

        /**
         * APIProperty: startAngle
         * {Number} 起始角度。取值范围[0, 360)，默认值：null。
         */
        this.startAngle = !isNaN(startAngle) ? startAngle : 0;

        /**
         * APIProperty: endAngle
         * {Number} 结束角度。取值范围(0, 360]，默认值：null。
         */
        this.endAngle =  !isNaN(endAngle) ? endAngle : 0;

        /**
         * APIProperty: r0
         * {Number} 内圆半径，指定后将出现内弧，同时扇边长度为 r 减 r0。取值范围[0, r)，默认值：0。
         */
        this.r0 = !isNaN(r0) ? r0 : 0;

        /**
         * Property: clockWise
         * {Boolean} 是否是顺时针。默认值：false。
         */
        this.clockWise = clockWise;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Sector";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
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