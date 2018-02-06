import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Rectangle
 * @category Visualization Theme
 * 矩形参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
export class Rectangle extends ShapeParameters {



    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Rectangle
     * 创建一个图形矩形参数对象。
     *
     * Parameters:
     * x - {Number} 矩形 x 坐标，必设参数。
     * y - {Number} 矩形 y 坐标，必设参数。
     * width - {Number} 矩形 width 坐标，必设参数。
     * height - {Number} 矩形 height 坐标，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Rectangle>} 图形矩形参数对象。
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
        /**
         * APIProperty: x
         * {Number} 左上角 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 左上角 y 坐标。
         */
        this.y = !isNaN(x) ? y : 0;

        /**
         * APIProperty: width
         * {Number} 宽度。
         */
        this.width = !isNaN(width) ? width : 0;

        /**
         * APIProperty: height
         * {Number} 高度。
         */
        this.height = !isNaN(height) ? height : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Rectangle";
    }


    /**
     * APIMethod: destroy
     * 销毁对象。
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