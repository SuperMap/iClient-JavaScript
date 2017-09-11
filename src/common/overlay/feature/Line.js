import SuperMap from '../../SuperMap';
import ShapeParameters from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Line
 * 线参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export default class Line extends ShapeParameters {

    /**
     * APIProperty: pointList
     * {Array} 线要素节点数组，二维数组。
     *
     * 数组形如：
     * (start code)
     *  [
     *  [10, 20],         //节点
     *  [30, 40],
     *  [25, 30]         //最后一个节点和第一个节点不必相同，绘制时自动封闭
     *   ]
     * (end)
     */
    pointList = null;


    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Line
     * 创建一个图形线参数对象。
     *
     * Parameters:
     * pointList - {Array} 线要素节点数组，二维数组，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Line>} 图形线参数对象。
     */
    constructor(pointList) {
        super(pointList);
        this.pointList = pointList;
    }

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.pointList = null;
        super.destroy();
    }


    CLASS_NAME = "SuperMap.Feature.ShapeParameters.Line"
}
SuperMap.Feature.ShapeParameters.Line = Line;
