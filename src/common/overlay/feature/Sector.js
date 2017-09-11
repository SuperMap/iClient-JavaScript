import SuperMap from '../../SuperMap';
import ShapeParameters from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Sector
 * 扇形参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export default class Sector extends ShapeParameters {

    /**
     * APIProperty: x
     * {Number} 圆心 x 坐标。
     */
    x = null;

    /**
     * APIProperty: y
     * {Number} 圆心 y 坐标。
     */
    y = null;

    /**
     * APIProperty: r
     * {Number} 外圆半径。
     */
    r = null;

    /**
     * APIProperty: startAngle
     * {Number} 起始角度。取值范围[0, 360)，默认值：null。
     */
    startAngle = null;

    /**
     * APIProperty: endAngle
     * {Number} 结束角度。取值范围(0, 360]，默认值：null。
     */
    endAngle = null;

    /**
     * APIProperty: r0
     * {Number} 内圆半径，指定后将出现内弧，同时扇边长度为 r 减 r0。取值范围[0, r)，默认值：0。
     */
    r0 = null;

    /**
     * Property: clockWise
     * {Boolean} 是否是顺时针。默认值：false。
     */
    clockWise = null;


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

        this.x = !isNaN(x) ? x : 0;
        this.y = !isNaN(y) ? y : 0;
        this.r = !isNaN(r) ? r : 0;
        this.startAngle = !isNaN(startAngle) ? startAngle : 0;
        this.endAngle = !isNaN(endAngle) ? endAngle : 0;
        this.r0 = !isNaN(r0) ? r0 : 0;
        this.clockWise = clockWise;
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


    CLASS_NAME = "SuperMap.Feature.ShapeParameters.Sector"
}
SuperMap.Feature.ShapeParameters.Sector = Sector;
