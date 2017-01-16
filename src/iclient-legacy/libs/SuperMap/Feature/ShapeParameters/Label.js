/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap.Feature.ShapeParameters.js
 */

/**
 * Class: SuperMap.Feature.ShapeParameters.Label
 * 标签参数对象。
 *
 * Inherits:
 *  - <SuperMap.Feature.ShapeParameters>
 */
SuperMap.Feature.ShapeParameters.Label = SuperMap.Class(SuperMap.Feature.ShapeParameters, {

    /**
     * APIProperty: x
     * {Number} 标签 x 坐标。
     */
    x: null,

    /**
     * APIProperty: y
     * {Number} 标签 y 坐标。
     */
    y: null,

    /**
     * APIProperty: text
     * {String} 标签的文本内容。
     */
    text: null,

    /**
     * APIProperty: style
     * {Object} 标签样式对象，可设属性如下：
     *
     * Symbolizer properties:
     * fill - {Boolean} 是否填充，不需要填充则设置为 false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
     * fillColor - {String} 十六进制填充颜色。默认值为 "#000000"。
     * fillOpacity - {Number} 填充不透明度。取值范围[0, 1]，默认值 1。
     * stroke - {Boolean} 是否描边，不需要描边则设置为false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
     * strokeColor - {String} 十六进制描边颜色。
     * strokeOpacity - {Number} 描边的不透明度。取值范围[0, 1]，默认值 1。
     * strokeWidth - {Number} 描边宽度，默认值 1。
     * maxWidth - {Number} 最大宽度限制。默认值：null。
     * fontSize - {Number} 标签文本字体大小。默认值 12，单位是像素。
     * fontStyle - {String} 标签文本字体样式。可设值："normal", "italic", "oblique"; 默认值："normal" 。
     * fontVariant - {String} 标签文本字体变体。可设值："normal", "small-caps"; 默认值："normal" 。
     * fontWeight - {String} 标签文本字体粗细。可设值："normal", "bold", "bolder", "lighter"; 默认值："normal" 。
     * fontFamily - {String} 标签文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个值。
     * 可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。默认值："arial,sans-serif".
     * labelBaseline - {string} 标签文本垂直对齐, 可以是 'top', 'bottom', 'middle'，默认值 'middle'。
     * labelAlign - {string} 标签文本水平对齐。可以是 'left', 'right', 'center'; 默认值 'center'。
     * shadowBlur - {Number} 阴影模糊度，大于 0 有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     */
    // * fill - {Boolean} 是否填充，不需要填充则设置为 false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
    // * fillColor - {String} 十六进制填充颜色。默认值为 "#000000"。
    // * fillOpacity - {Number} 填充不透明度。取值范围[0, 1]，默认值 1。
    // * stroke - {Boolean} 是否描边，不需要描边则设置为false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
    // * strokeColor - {String} 十六进制描边颜色。
    // * strokeOpacity - {Number} 描边的不透明度。取值范围[0, 1]，默认值 1。
    // * strokeWidth - {Number} 线宽度/描边宽度，默认值 1。
    // * maxWidth - {Number} 最大宽度限制。默认值：null。
    // * fontSize - {Number} 标签文本字体大小。默认值 12，单位是像素。
    // * fontStyle - {String} 标签文本字体样式。可设值："normal", "italic", "oblique"; 默认值："normal" 。
    // * fontVariant - {String} 标签文本字体变体。可设值："normal", "small-caps"; 默认值："normal" 。
    // * fontWeight - {String} 标签文本字体粗细。可设值："normal", "bold", "bolder", "lighter"; 默认值："normal" 。
    // * fontFamily - {String} 标签文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个值。可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。默认值："arial,sans-serif".
    // * labelPosition - {string} 标签文本位置, 可以是 'inside', 'left', 'right', 'top', 'bottom'; 默认值 'top'。
    // * labelAlign - {string} 标签文本水平对齐。可以是 'left', 'right', 'center'; 默认值 'center'。
    // * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
    // * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
    // * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
    // * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
    // 公开父类 style 属性

    /**
     * APIProperty: highlightStyle
     * {Object} 标签高亮样式对象，可设样式属性与 style 的可设样式属性相同。
     *
     * Symbolizer properties:
     * fill - {Boolean} 是否填充，不需要填充则设置为 false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
     * fillColor - {String} 十六进制填充颜色。默认值为 "#000000"。
     * fillOpacity - {Number} 填充不透明度。取值范围[0, 1]，默认值 1。
     * stroke - {Boolean} 是否描边，不需要描边则设置为false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
     * strokeColor - {String} 十六进制描边颜色。
     * strokeOpacity - {Number} 描边的不透明度。取值范围[0, 1]，默认值 1。
     * strokeWidth - {Number} 描边宽度，默认值 1。
     * maxWidth - {Number} 最大宽度限制。默认值：null。
     * fontSize - {Number} 标签文本字体大小。默认值 12，单位是像素。
     * fontStyle - {String} 标签文本字体样式。可设值："normal", "italic", "oblique"; 默认值："normal" 。
     * fontVariant - {String} 标签文本字体变体。可设值："normal", "small-caps"; 默认值："normal" 。
     * fontWeight - {String} 标签文本字体粗细。可设值："normal", "bold", "bolder", "lighter"; 默认值："normal" 。
     * fontFamily - {String} 标签文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个值。
     * 可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。默认值："arial,sans-serif".
     * labelBaseline - {string} 标签文本垂直对齐, 可以是 'top', 'bottom', 'middle'，默认值 'middle'。
     * labelAlign - {string} 标签文本水平对齐。可以是 'left', 'right', 'center'; 默认值 'center'。
     * shadowBlur - {Number} 阴影模糊度，大于 0 有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     */
    // 公开父类 highlightStyle 属性


    /**
     * Constructor: SuperMap.Feature.ShapeParameters.Label
     * 创建一个标签参数对象。
     *
     * Parameters:
     * x - {Number} 横坐标，必设参数。
     * y - {Number} 纵坐标，必设参数。
     * text - {String} 图形中的附加文本，必设参数。
     *
     * Returns:
     * {<SuperMap.Feature.ShapeParameters.Label>} 标签参数对象。
     */
    initialize: function(x, y, text) {
        SuperMap.Feature.ShapeParameters.prototype.initialize.apply(this, arguments);

        this.x = x;
        this.y = y;
        this.text = text;
    },

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy: function() {
        this.x = null;
        this.y = null;
        this.text = null;

        SuperMap.Feature.ShapeParameters.prototype.destroy.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.Feature.ShapeParameters.Label"
});
