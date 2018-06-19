import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @class  SuperMap.Feature.ShapeParameters.Rectangle
 * @category Visualization Theme
 * @classdesc 矩形参数对象。
 * @extends {SuperMap.Feature.ShapeParameters}
 */
export class Rectangle extends ShapeParameters {


    
    /**
     * @function SuperMap.Feature.ShapeParameters.Rectangle.prototype.constructor
     * @description 创建一个图形矩形参数对象。
     * @param {number} x - 矩形 x 坐标，必设参数。
     * @param {number} y - 矩形 y 坐标，必设参数。
     * @param {number} width - 矩形 width 坐标，必设参数。
     * @param {number} height - 矩形 height 坐标，必设参数。
     * @returns {SuperMap.Feature.ShapeParameters.Rectangle} 图形矩形参数对象。
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.x
         * @description 左上角 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.y
         * @description 左上角 y 坐标。
         */
        this.y = !isNaN(x) ? y : 0;

        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.width
         * @description 宽度。
         */
        this.width = !isNaN(width) ? width : 0;
        
        /**
         * @member {number} SuperMap.Feature.ShapeParameters.Rectangle.prototype.height
         * @description 高度。
         */
        this.height = !isNaN(height) ? height : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Rectangle";
    }

    
    /**
     * @function SuperMap.Feature.ShapeParameters.Rectangle.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        super.destroy();
    }

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Rectangle = Rectangle;