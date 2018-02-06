import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Line
 * @category Visualization Theme
 * 线参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export class Line extends ShapeParameters {



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
        this.pointList = pointList;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Line";

    }

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.pointList = null;
        super.destroy();
    }

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Line = Line;