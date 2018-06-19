import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Point
 * @category Visualization Theme
 * @classdesc 点参数对象。
 * @extends {SuperMap.Feature.ShapeParameters}
 */
export class Point extends ShapeParameters {

    /**
     * @function SuperMap.Feature.ShapeParameters.Point.prototype.constructor
     * @description 创建一个图形点参数对象。
     * @param {number} x - 点 x 坐标，必设参数。
     * @param {number} y - 点 y 坐标，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Point} 标签参数对象。
     */
    constructor(x, y) {
        super(x, y);
        /**
         * @member {number}  SuperMap.Feature.ShapeParameters.Point.prototype.x
         * @description 点 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number}  SuperMap.Feature.ShapeParameters.Point.prototype.y
         * @description 点 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * @member {number}  SuperMap.Feature.ShapeParameters.Point.prototype.r
         * @description 点的半径。
         */
        this.r = 6;


        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Point";
    }

    
    /**
     * @function SuperMap.Feature.ShapeParameters.Point.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;

        super.destroy();
    }

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Point = Point;