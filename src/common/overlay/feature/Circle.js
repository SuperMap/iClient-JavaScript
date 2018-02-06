import {SuperMap} from '../../SuperMap';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  SuperMap.Feature.ShapeParameters.Circle
 * @classdesc 圆形参数对象。
 * @category Visualization Theme
 * @extends SuperMap.Feature.ShapeParameters
 */


export class Circle extends ShapeParameters {


    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Circle
     * 创建一个圆形参数对象。
     *
     * Parameters:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 圆半径，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Circle>} 圆形参数对象。
     */
    constructor(x, y, r) {
        super(x, y, r);
        /**
         * APIProperty: x
         * {Number} 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * APIProperty: y
         * {Number} 圆心 y 坐标。
         */
        this.y =  !isNaN(y) ? y : 0;

        /**
         * APIProperty: r
         * {Number} 圆半径。
         */
        this.r =  !isNaN(r) ? r : 0;

        this.CLASS_NAME = "SuperMap.Feature.ShapeParameters.Circle";
        /**
         * APIProperty: style
         * {Object} 圆形样式对象，可设属性如下：
         *
         * Symbolizer properties:
         * brushType - {string} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
         * color - {string} 填充颜色,默认值"#000000"
         * strokeColor - {string} 描边颜色,默认值为'#000000'
         * lineCape — {string} 线帽样式，可以是 butt, round, square，默认是butt
         * lineWidth - {number} 描边宽度、默认是1
         * opacity - {number} 绘制透明度、默认是1，不透明
         * shadowBlur - {number} 阴影模糊度，大于0有效，默认是0
         * shadowColor - {string} 阴影颜色，默认是'#000000'
         * shadowOffsetX - {number} 阴影横向偏移，默认是0
         * shadowOffsetY - {number} 阴影纵向偏移，默认是0
         */

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

}
SuperMap.Feature = SuperMap.Feature || {};
SuperMap.Feature.ShapeParameters.Circle = Circle;
