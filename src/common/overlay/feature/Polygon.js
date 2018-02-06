import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Polygon
 * @category Visualization Theme
 * 面参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export class Polygon extends ShapeParameters {

    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Polygon
     * 创建一个图形面参数对象。
     *
     * Parameters:
     * pointList - {Array} 面要素节点数组，二维数组，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Polygon>} 图形面参数对象。
     */
    constructor(pointList) {
        super(pointList);
        /**
         * APIProperty: pointList
         * {Array} 面要素节点数组，二维数组。
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

        /**
         * Property: holePolygonPointLists
         * {Array} 岛洞面多边形顶点数组（三维数组）
         */
        this.holePolygonPointLists = null;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Polygon";
    }

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy() {
        this.pointList = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }
}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Polygon = Polygon;