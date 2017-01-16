/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap.Feature.ShapeParameters.js
 */

/**
 * Class: SuperMap.Feature.ShapeParameters.Line
 * 线参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
SuperMap.Feature.ShapeParameters.Line = SuperMap.Class(SuperMap.Feature.ShapeParameters, {

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
    pointList: null,

    /**
     * APIProperty: style
     * {Object} 线样式对象，可设属性如下：
     *
     * Symbolizer properties:
     * strokeColor - {String} 十六进制线颜色。
     * strokeWidth - {Number} 线宽度，默认值 1。
     * strokeLinecap - {String} 线帽样式；strokeLinecap 有三种类型 ：“butt", "round", "square"; 默认为"butt"。
     * strokeLineJoin - {String} 线段连接样式；strokeLineJoin 有三种类型： “miter", "round", "bevel"; 默认为"miter"。
     * strokeDashstyle - {Sting} 虚线类型； strokeDashstyle 有八种类型 ：“dot",“dash",“dashot",“longdash",“longdashdot",“solid", "dashed", "dotted"; 默认值 "solid"。solid 表示实线。
     * strokeOpacity - {Number} 线的不透明度。取值范围[0, 1]，默认值 1。
     * shadowBlur - {number} 阴影模糊度，（大于 0 有效; 默认值 0）。
     * shadowColor - {string} 阴影颜色; 默认值 '#000000'。
     * shadowOffsetX - {number} 阴影 X 方向偏移值; 默认值 0。
     * shadowOffsetY - {number} 阴影 Y 方向偏移值; 默认值 0。
     */
    // * strokeColor - {String} 十六进制线颜色。
    // * strokeWidth - {Number} 线宽度，默认值 1。
    // * strokeLinecap - {String} 线帽样式；strokeLinecap 有三种类型 ：“butt", "round", "square"; 默认为"butt"。
    // * strokeLineJoin - {String} 线段连接样式；strokeLineJoin 有三种类型： “miter", "round", "bevel"; 默认为"miter"。
    // * strokeDashstyle - {Sting} 虚线类型； strokeDashstyle 有八种类型 ：“dot",“dash",“dashot",“longdash",“longdashdot",“solid", "dashed", "dotted"; 默认值 "solid"。solid 表示实线。
    // * strokeOpacity - {Number} 线的不透明度。取值范围[0, 1]，默认值 1。
    // * shadowBlur - {number} 阴影模糊度，（大于 0 有效; 默认值 0）。
    // * shadowColor - {string} 阴影颜色; 默认值 '#000000'。
    // * shadowOffsetX - {number} 阴影 X 方向偏移值; 默认值 0。
    // * shadowOffsetY - {number} 阴影 Y 方向偏移值; 默认值 0。
    // * label - {String} 图形附加文本标签内容。
    // * fontColor - {String} 附加文本字体颜色。
    // * fontSize - {Number} 附加文本字体大小。默认值 12，单位是像素。
    // * fontStyle - {String} 附加文本字体样式。可设值："normal", "italic", "oblique"; 默认值："normal" 。
    // * fontVariant - {String} 附加文本字体变体。可设值："normal", "small-caps"; 默认值："normal" 。
    // * fontWeight - {String} 附加文本字体粗细。可设值："normal", "bold", "bolder", "lighter"; 默认值："normal" 。
    // * fontFamily - {String} 附加文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个值。可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。默认值："arial,sans-serif".
    // * textPosition - {string} 附加文本位置, 可以是 'inside', 'left', 'right', 'top', 'bottom'; 默认值 'inside'。
    // * labelAlign - {string} 附加文本水平对齐。可以是 'left', 'right', 'center'; 默认值 'left'。
    // * labelBaseline - {string} 附加文本垂直对齐。可以是 'top', 'bottom', 'middle';默认值 'top'。
    // 公开父类 style 属性

    /**
     * APIProperty: highlightStyle
     * {Object} 线高亮样式对象，可设样式属性与 style 的可设样式属性相同。
     *
     * Symbolizer properties:
     * strokeColor - {String} 十六进制线颜色。
     * strokeWidth - {Number} 线宽度，默认值 1。
     * strokeLinecap - {String} 线帽样式；strokeLinecap 有三种类型 ：“butt", "round", "square"; 默认为"butt"。
     * strokeLineJoin - {String} 线段连接样式；strokeLineJoin 有三种类型： “miter", "round", "bevel"; 默认为"miter"。
     * strokeDashstyle - {Sting} 虚线类型； strokeDashstyle 有八种类型 ：“dot",“dash",“dashot",“longdash",“longdashdot",“solid", "dashed", "dotted"; 默认值 "solid"。solid 表示实线。
     * strokeOpacity - {Number} 线的不透明度。取值范围[0, 1]，默认值 1。
     * shadowBlur - {number} 阴影模糊度，（大于 0 有效; 默认值 0）。
     * shadowColor - {string} 阴影颜色; 默认值 '#000000'。
     * shadowOffsetX - {number} 阴影 X 方向偏移值; 默认值 0。
     * shadowOffsetY - {number} 阴影 Y 方向偏移值; 默认值 0。
     */
    // 公开父类 highlightStyle 属性

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
    initialize: function(pointList) {
        SuperMap.Feature.ShapeParameters.prototype.initialize.apply(this, arguments);
        this.pointList = pointList;
    },

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy: function() {
        this.pointList = null;
        SuperMap.Feature.ShapeParameters.prototype.destroy.apply(this, arguments);
    },


    CLASS_NAME: "SuperMap.Feature.ShapeParameters.Line"
});
