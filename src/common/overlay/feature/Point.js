import SuperMap from '../../SuperMap';
import ShapeParameters from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Point
 * 点参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export default class Point extends ShapeParameters {

    /**
     * APIProperty: x
     * {Number} 点 x 坐标。
     */
    x = null;

    /**
     * APIProperty: y
     * {Number} 点 y 坐标。
     */
    y = null;

    /**
     * Property: y
     * {Number} 点的半径。style.pointRadius 默认值。
     */
    r = 6;

    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Point
     * 创建一个图形点参数对象。
     *
     * Parameters:
     * x - {Number} 点 x 坐标，必设参数
     * y - {Number} 点 y 坐标，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Point>} 图形点参数对象。
     */
    constructor(x, y) {
        super(x, y);

        this.x = !isNaN(x) ? x : 0;
        this.y = !isNaN(y) ? y : 0;
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;

        super.destroy();
    }


    CLASS_NAME = "SuperMap.Feature.ShapeParameters.Point"
}
SuperMap.Feature.ShapeParameters.Point = Point;
