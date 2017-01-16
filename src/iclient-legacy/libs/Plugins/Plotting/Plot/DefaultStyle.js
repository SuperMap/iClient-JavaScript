/**
 *
 * Class: SuperMap.Plot.DefaultStyle
 * 缺省属性类。
 * 用户可以通过该类设置缺省标绘属性，包括线型、线色、线宽等属性。启用缺省属性后，标号将以缺省属性为默认风格去绘制。
 */

SuperMap.Plot.DefualtStyle = new SuperMap.Class({

    /*
     * APIProperty:lineColor
     * 线色
     */
    lineColor:"#ff0000",

    /*
     * APIProperty:lineWidth
     * 线宽
     */
    lineWidth:2,

    /*
     * APIProperty:lineType
     * 线型，dot,dash,dashdot,longdash,longdashdot,solid
     */
    lineType: "solid",

    /*
     * APIProperty: lineOpacity
     * 线透明度，范围为：0-1
     */
    lineOpacity: 1.0,

    /*
     * APIProperty: strokeLinecap
     * 线连接拐点处理，butt，round，square
     */
    lineCap: "round",

    /*
     * APIProperty: flagTextSize
     * 生成旗面文字的字号
     */
    flagTextSize: 60,

    /*
     * APIProperty: maxScale
     * 标号最大缩放比例
     */
    maxScale: 5,

    /*
     * APIProperty: minScale
     * 标号最小缩放比例
     */
    minScale: 1,

    /*
     * APIProperty: dotSymbolSize
     * 标号大小，单位：pixel
     */
    dotSymbolSize: 40,

    /*
     * APIProperty: dotTextSpace
     * 标号与注记之间的距离，单位：pixel
     */
    dotTextSpace: 7,

    /*
     * APIProperty: scaleByMap
     * 标号随图缩放
     */
    scaleByMap: false,

    /*
     * APIProperty: fill
     * 填充
     */
    fill: false,

    /*
     * APIProperty: fillColor
     * 填充色
     */
    fillColor: "#ff0000",

    /*
     * APIProperty: fillOpacity
     * 填充透明度，范围为：0-1
     */
    fillOpacity: 0.31,

    /*
     * APIProperty: fontColor
     * 字体颜色
     */
    fontColor: "#000000",

    /*
     * APIProperty:fontOpacity
     * 字体透明度，范围为：0-1
     */
    fontOpacity: 1,

    /*
     * APIProperty: fontStroke
     * 字体描边是否启用
     */
    fontStroke: true,

    /*
     * APIProperty: fontStrokeColor
     * 字体描边颜色
     */
    fontStrokeColor: "#ff0000",

    /*
     * APIProperty:fontStrokeWidth
     * 字体描边宽度
     */
    fontStrokeWidth: "2px",

    /*
     * APIProperty: fontSize
     * 字体大小
     */
    fontSize: 14,

    /*
     * APIProperty: fontFamily
     * 字体类型
     */
    fontFamily: "微软雅黑",

    /*
     * APIProperty: fontWeight
     * 字体粗细
     */
    fontWeight: "bold",

    /*
     * APIProperty: fontStyle
     * 字体样式
     */
    fontStyle: "",

    /*
     * APIProperty:defaultFlag
     * 是否使用标号缺省颜色
     */
    defaultFlag: true,

    /**
     * Constructor: SuperMap.Plot.DefaultStyle
     * 构建一个图形缺省属性类。
     *
     * Parameters:
     *
     * Returns:
     * {<SuperMap.Plot.DefaultStyle>}  结果类型对象。
     */
    initialize: function(options){
        if(options){
            SuperMap.Util.extend(this,options);
        }

        this.parserConfiguration();
    },

    /**
     * APIMethod: setLineType
     * 设置缺省的标绘线型
     */
    parserConfiguration : function(){
        if(typeof DefaultStyleConfiguration === "undefined"){
            return;
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["flagTextSize"] !== undefined){
            this.flagTextSize = parseFloat(DefaultStyleConfiguration["flagTextSize"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["maxScale"] !== undefined){
            this.maxScale = parseFloat(DefaultStyleConfiguration["maxScale"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["minScale"] !== undefined){
            this.minScale = parseFloat(DefaultStyleConfiguration["minScale"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["dotSymbolSize"] !== undefined){
            this.dotSymbolSize = parseFloat(DefaultStyleConfiguration["dotSymbolSize"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["dotTextSpace"] !== undefined){
            this.dotTextSpace = parseFloat(DefaultStyleConfiguration["dotTextSpace"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["scaleByMap"] !== undefined){
            this.scaleByMap = DefaultStyleConfiguration["scaleByMap"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["strokeWidth"] !== undefined){
            this.lineWidth = parseFloat(DefaultStyleConfiguration["strokeWidth"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["strokeColor"] !== undefined){
            this.lineColor = DefaultStyleConfiguration["strokeColor"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["strokeOpacity"] !== undefined){
            this.lineOpacity = parseFloat(DefaultStyleConfiguration["strokeOpacity"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["strokeDashstyle"] !== undefined){
            this.lineType = DefaultStyleConfiguration["strokeDashstyle"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["strokeLinecap"] !== undefined){
            this.lineCap = DefaultStyleConfiguration["strokeLinecap"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fill"] !== undefined){
            this.fill = DefaultStyleConfiguration["fill"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fillColor"] !== undefined){
            this.fillColor = DefaultStyleConfiguration["fillColor"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fillOpacity"] !== undefined){
            this.fillOpacity = parseFloat(DefaultStyleConfiguration["fillOpacity"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontColor"] !== undefined){
            this.fontColor = DefaultStyleConfiguration["fontColor"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontOpacity"] !== undefined){
            this.fontOpacity = parseFloat(DefaultStyleConfiguration["fontOpacity"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontStroke"] !== undefined){
            this.fontStroke = DefaultStyleConfiguration["fontStroke"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontStrokeColor"] !== undefined){
            this.fontStrokeColor = DefaultStyleConfiguration["fontStrokeColor"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontStrokeWidth"] !== undefined){
            this.fontStrokeWidth = parseFloat(DefaultStyleConfiguration["fontStrokeWidth"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontBackground"] !== undefined){
            this.fontBackground = DefaultStyleConfiguration["fontBackground"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontBackgroundColor"] !== undefined){
            this.fontBackgroundColor = DefaultStyleConfiguration["fontBackgroundColor"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontShadow"] !== undefined){
            this.fontShadow = DefaultStyleConfiguration["fontShadow"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontShadowColor"] !== undefined){
            this.fontShadowColor = DefaultStyleConfiguration["fontShadowColor"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontShadowOffsetX"] !== undefined){
            this.fontShadowOffsetX = DefaultStyleConfiguration["fontShadowOffsetX"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontShadowOffsetY"] !== undefined){
            this.fontShadowOffsetY = DefaultStyleConfiguration["fontShadowOffsetY"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontSize"] !== undefined){
            this.fontSize = parseFloat(DefaultStyleConfiguration["fontSize"]);
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontFamily"] !== undefined){
            this.fontFamily = DefaultStyleConfiguration["fontFamily"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontWeight"] !== undefined){
            this.fontWeight = DefaultStyleConfiguration["fontWeight"];
        }

        if(DefaultStyleConfiguration && DefaultStyleConfiguration["fontStyle"] !== undefined){
            this.fontStyle = DefaultStyleConfiguration["fontStyle"];
        }
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        this.lineColor = null;
        this.lineWidth = null;
        this.dotSymbolSize = null;
        this.lineType = null;
        this.defaultFlag = null;
        this.flagTextSize = null;
        this.maxScale = null;
        this.minScale = null;
        this.dotTextSpace = null;
        this.scaleByMap = null;
        this.lineOpacity = null;
        this.lineCap = null;
        this.fill = null;
        this.fillColor = null;
        this.fillOpacity = null;
        this.fontColor = null;
        this.fontOpacity = null;
        this.fontSize = null;
        this.fontFamily = null;
        this.fontWeight = null;
        this.fontStyle = null;
    },

    CLASS_NAME: "SuperMap.Plot.DefualtStyle"
});