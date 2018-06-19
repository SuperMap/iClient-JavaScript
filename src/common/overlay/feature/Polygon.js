import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Polygon
 * @category Visualization Theme
 * @classdesc 面参数对象。
 * @extends {SuperMap.Feature.ShapeParameters}
 */
export class Polygon extends ShapeParameters {
    
    /**
     * @function SuperMap.Feature.ShapeParameters.Polygon.prototype.constructor
     * @description 创建一个图形面参数对象。
     * @param {Array} pointList - 横坐标，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Polygon} 标签参数对象。
     */
    constructor(pointList) {
        super(pointList);
        /**
         * @member {Array} SuperMap.Feature.ShapeParameters.Polygon.prototype.pointList
         * @description 面要素节点数组，二维数组。
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
         * @member {Array} SuperMap.Feature.ShapeParameters.Polygon.prototype.holePolygonPointLists
         * @description 岛洞面多边形顶点数组（三维数组）
         */
        this.holePolygonPointLists = null;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Polygon";
    }
    
    /**
     * @function SuperMap.Feature.ShapeParameters.Polygon.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.pointList = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }
}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Polygon = Polygon;