/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap.Feature.ShapeParameters.js
 *
 */

/**
 * Class: SuperMap.Feature.ShapeParameters.Circle
 * 圆形参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
SuperMap.Feature.ShapeParameters.Circle = SuperMap.Class(SuperMap.Feature.ShapeParameters, {

    /**
     * APIProperty: x
     * {Number} 圆心 x 坐标。
     */
    x: null,

    /**
     * APIProperty: y
     * {Number} 圆心 y 坐标。
     */
    y: null,

    /**
     * APIProperty: r
     * {Number} 圆半径。
     */
    r: null,


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
    initialize: function(x, y, r) {
        SuperMap.Feature.ShapeParameters.prototype.initialize.apply(this, arguments);

        this.x = !isNaN(x)? x: 0;
        this.y = !isNaN(y)? y: 0;
        this.r = !isNaN(r)? r: 0;
    },

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy: function(){
        this.x = null;
        this.y = null;
        this.r = null;
        SuperMap.Feature.ShapeParameters.prototype.destroy.apply(this, arguments);
    },


    CLASS_NAME: "SuperMap.Feature.ShapeParameters.Circle"
});
