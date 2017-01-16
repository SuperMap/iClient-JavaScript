/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/ServerColor.js
 */
 
/**
 * Class: SuperMap.REST.ServerTextStyle
 * 服务端文本风格类
 * 该类用于定义文本风格的相关属性。
 */
SuperMap.REST.ServerTextStyle = SuperMap.Class({

    /**
     * APIProperty: align
     * {<SuperMap.REST.TextAlignment>} 文本的对齐方式。
     * 默认为 SuperMap.Web.REST.TextAlignment.BASELINECENTER（基准线居中对齐）。
     */
    align: SuperMap.REST.TextAlignment.BASELINECENTER,

    /**
     * APIProperty: backColor
     * {<SuperMap.REST.ServerColor>} 文本的背景色。
     * 默认为白色。
     */
    backColor: null,

    /**
     * APIProperty: foreColor
     * {<SuperMap.REST.ServerColor>} 文本的前景色。
     * 默认为黑色。
     */
    foreColor: null,

    /**
     * APIProperty: backOpaque
     * {Boolean} 文本背景是否不透明。
     * true 表示文本背景不透明。
     */
    backOpaque: false,

    /**
     * APIProperty: sizeFixed
     * {Boolean} 文本大小是否固定。
     * 默认为 true，表示图片为固定像素大小，具体大小请参考 fontHeight 。
     * 当设为 false 时，图片会随着地图缩放而缩放。
     */
    sizeFixed: true,

    /**
     * APIProperty: fontHeight
     * {Number} 文本字体的高度，默认为6，
     * 单位与 sizeFixed 有关，当 sizeFixed 为 False 时，即非固定文本大小时使用地图坐标单位，
     * 如地理坐标系下的地图中单位为度；当 sizeFixed 为 True 时，单位为毫米（mm）。
     */
    fontHeight: 6,

    /**
     * APIProperty: fontWidth
     * {Number} 文本字体的宽度。
     * 字体的宽度以英文字符为标准，由于一个中文字符相当于两个英文字符，默认为0地图坐标单位。
     */
    fontWidth: 0,

    /**
     * APIProperty: fontWeight
     * {Integer} 文本字体的磅数。
     * 表示粗体的具体数值。取值范围为从0－900之间的整百数，默认值为400。
     */
    fontWeight: 400,

    /**
     * APIProperty: fontName
     * {String} 文本字体的名称。
     * 默认值为 Times New Roman。
     */
    fontName: "Times New Roman",

    /**
     * APIProperty: bold
     * {Boolean} 文本是否为粗体字。
     * true 表示为粗体。默认值为 false，即文本不是粗体字。
     */
    bold: false,

    /**
     * APIProperty: italic
     * {Boolean}文本是否采用斜体。
     * true 表示采用斜体。默认为 false。
     */
    italic: false,

    /**
     * APIProperty: italicAngle
     * {Number} 字体倾斜角度。
     * 正负度之间，以度为单位，精确到0.1度，默认为0度。当倾斜角度为0度，为系统默认的字体倾斜样式。正负度是指以纵轴为起始零度线，其纵轴左侧为正，右侧为负。允许的最大角度为60，最小-60。大于60按照60处理，小于-60按照-60处理。目前只对标签专题图有效。
     */
    italicAngle: 0,

    /**
     * APIProperty: shadow
     * {Boolean} 文本是否有阴影。
     * true 表示给文本增加阴影。默认值为 false，即文本没有阴影。
     */
    shadow: false,

    /**
     * APIProperty: strikeout
     * {Boolean} 文本字体是否加删除线。
     * true 表示加删除线。默认值为 false，即文本字体不加删除线。
     */
    strikeout: false,

    /**
     * APIProperty: outline
     * {Boolean} 是否以轮廓的方式来显示文本的背景。
     * true 表示以轮廓的方式来显示文本的背景。默认值为 false，表示不以轮廓的方式来显示文本的背景。
     */
    outline: false,

    /**
     * APIProperty: opaqueRate
     * {Number} 注记文字的不透明度。
     * 不透明度的范围为0-100。默认为0，表示透明。
     */
    opaqueRate: 0,

    /**
     * APIProperty: underline
     * {Boolean} 文本字体是否加下划线。
     * true 表示加下划线。默认为 false。
     */
    underline: false,

    /**
     * APIProperty: rotation
     * {Number} 文本旋转的角度。
     * 逆时针方向为正方向，单位为度，精确到0.1度。默认值为0.0。
     */
    rotation: 0.0,

    /**
     * Constructor: SuperMap.REST.ServerTextStyle
     * 服务端文本风格类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * align - {<SuperMap.REST.TextAlignment>} 文本的对齐方式。
     * backColor - {<SuperMap.REST.ServerColor>} 文本的背景色。
     * foreColor - {<SuperMap.REST.ServerColor>} 文本的前景色。
     * backOpaque - {Boolean} 文本背景是否不透明。
     * sizeFixed - {Boolean} 文本大小是否固定。
     * fontHeight - {Number} 文本字体的高度。
     * fontWidth - {Number} 文本字体的宽度。
     * fontWeight - {Integer} 文本字体的磅数。
     * fontName - {String} 文本字体的名称。
     * bold - {Boolean} 文本是否为粗体字。
     * italic - {Boolean}文本是否采用斜体。
     * italicAngle - {Number} 字体倾斜角度。
     * shadow - {Boolean} 文本是否有阴影。
     * strikeout - {Boolean} 文本字体是否加删除线。
     * outline - {Boolean} 是否以轮廓的方式来显示文本的背景。
     * opaqueRate - {Number} 注记文字的不透明度。
     * underline - {Boolean} 文本字体是否加下划线。
     * rotation -  {Number} 文本旋转的角度。
     */
    initialize: function(options) {
        var me = this;
        me.backColor = new SuperMap.REST.ServerColor(255, 255, 255);
        me.foreColor = new SuperMap.REST.ServerColor(0, 0, 0);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.align = null;
        if (me.backColor) {
            me.backColor.destroy();
            me.backColor = null;
        }
        if (me.foreColor) {
            me.foreColor.destroy();
            me.foreColor = null;
        }
        me.backOpaque = null;
        me.sizeFixed = null;
        me.fontHeight = null;
        me.fontWidth = null;
        me.fontWeight = null;
        me.fontName = null;
        me.bold = null;
        me.italic = null;
        me.italicAngle = null;
        me.shadow = null;
        me.strikeout = null;
        me.outline = null;
        me.opaqueRate = null;
        me.underline = null;
        me.rotation = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ServerTextStyle"
});

SuperMap.REST.ServerTextStyle.fromObj = function(obj) {
    var res = new SuperMap.REST.ServerTextStyle(obj);
    SuperMap.Util.copy(res, obj);
    res.backColor = SuperMap.REST.ServerColor.fromJson(obj.backColor);
    res.foreColor = SuperMap.REST.ServerColor.fromJson(obj.foreColor);
    return res;
};

