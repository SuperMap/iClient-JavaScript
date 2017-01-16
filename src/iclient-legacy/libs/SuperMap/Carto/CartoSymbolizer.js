/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.CartoSymbolizer
 * CartoCSS符号类，其保存了渲染几何图形所需要的渲染信息
 */
SuperMap.CartoSymbolizer=SuperMap.Class({
    /**
     * Property: context
     * {CanvasRenderingContext2D} 绘制Canvas上下文,此值将会传递给CartoRenderer
     * */
    context:null,

    /**
     * Property: hitContext
     * {CanvasRenderingContext2D} 用于要素选择的Canvas上下文,此值将会传递给CartoRenderer
     * */
    hitContext:null,

    /**
     * Property: feature
     * {Object} Carto符号对应的一个要素，也可以为空
     * */
    feature:null,

    /**
     * Property: attachment
     * {Object} 伪类，不同的attachment代表一个要素的多种符号，相同的attachment内样式会被后面的覆盖
     * */
    attachment:null,

    /**
     * Property: shader
     * {Object} 着色器对象，其拥有shader或者style属性，分别用于保存来自CartoCSS和服务端返回的渲染风格信息
     * */
    shader:null,

    style:null,

    hightlightShader:null,

    /**
     * Property: layer
     * {<SuperMap.Layer.TiledVectorLayer>} 此Carto符号所属的矢量分块图层
     * */
    layer:null,

    /**
     * Property: cartoLayer
     * {<SuperMap.CartoLayer>} 此Carto符号所属的Carto图层
     * */
    cartoLayer:null,

    /**
     * Property: cartoRenderer
     * {<SuperMap.CartoRenderer>} 符号系统的渲染器
     * */
    cartoRenderer:null,

    /**
     * Property: isForLayer
     * {Boolean} 此值如果为true，则此符号类将应用于cartoLayer里的所有要素，否则只应用于
     * 其自身的要素，默认为false
     * */
    isForLayer:false,

    /**
     * Constructor: SuperMap.CartoSymbolizer
     * Carto符号系统的符号类，此符号类的主要功能就是将来自CartoCSS的一套style和来自服务端的style
     * 转化为Canvas绘制用的style，并将这个style赋到faeture上，供渲染器类进行渲染。相同的要素也可以
     * 拥有多个不同的符号，多个基本符号组合成一个复杂的符号
     *
     * Parameters:
     * cartoLayer - {<SuperMap.CartoLayer>} 此符号对象所属的Carto图层
     * feature - {Object} 此符号类所对应的要素对象
     * shaderer - {Object} 渲染器信息
     * options - {Object} 可选参数
     *
     * Examples:
     * (code)
     *  var symbol=new SuperMap.CartoSymbolizer(cartoLayer,feature,{shader:shader},
     *  {
     *      layer:layer,              //此图层指的是TiledVectorLayer
     *      context:context,          //用于绘制显示要素的Canvas上下文
     *      hitContext:hitContext     //用于要素选择的Canvas上下文
     *  });
     *  symbol.render();
     * (end)
     * */
    initialize:function(cartoLayer,feature,style,options){
        this.cartoLayer=cartoLayer;
        this.feature=feature;
        this.style=style;
        SuperMap.Util.extend(this,options);

        //判断是否设置了renderer，没有则通过渲染器列表判断支持情况。
        if (!this.cartoRenderer) {
            this.cartoRenderer=new SuperMap.CartoRenderer(this.context,this.hitContext,options);
        }

    },

    /**
     * APIMethod: destroy
     * 符号类析构函数
     * */
    destroy:function(){
        this.context=null;
        this.style = null;
        this.shader=null;
        this.cartoLayer=null;
        this.cartoRenderer=null;
        this.feature=null;
    },

    /**
     * APIMethod: render
     * 此函数将渲染信息的类型来给选择相应的渲染风格，比如服务端的style会被转化为Canvas绘制时用的style，
     * 假如Shaderer拥有shader属性,则优先使用shader转化过来style，否则直接使用服务端style转化过来的style，
     * 转化出来的风格style会直接赋给feature的style属性，供CartoRenderer的drawFeature函数对要素进行渲染。
     * 假如这个要素在矢量分块图层的高亮显示表中，这个要素将会被标上高亮显示的标签
     * */
    render:function(){
        //将渲染器的canvas上下文换为本符号的上下文
        this.cartoRenderer.context=this.context;
        this.cartoRenderer.hitContext=this.hitContext;

        var feature=this.feature,style=this.style||{};
        feature.layerIndex=this.cartoLayer.originIndex;
        this.cartoRenderer.drawFeature(feature,style,this.layerType);
    },

    CLASS_NAME:"SuperMap.CartoSymbolizer"
});

/**
 * CartoCSS中的style属性名与Canvas的style属性名的对应表
 * */
SuperMap.CartoSymbolizer._cartoStyleMap={
    "TEXT":{
        //前两个属性值组成font
        "text-size":"fontSize",
        "text-face-name":"fontFamily",

        "text-align":"textAlign",
        "text-vertical-alignment":"textBaseline",
        "text-horizontal-alignment":"textAlign",
        /*expand*/
        'text-bold':'bold',
        'text-weight':'fontWeight',
        "text-name":"textName",
        "text-halo-radius":"haloRadius",
        "text-halo-color":"backColor",
        "text-fill":"foreColor",
        "text-opacity":"globalAlpha",
        "text-dx":"offsetX",
        "text-dy":"offsetY",
        "text-comp-op":"globalCompositeOperation"
    },
    /*expand*/
    "POINT":{
        "point-file":"pointFile",
        "point-fill":"fillStyle",
        "point-radius":"pointRadius",
        "point-halo-radius":"pointHaloRadius",
        "point-halo-color":"pointHaloColor",
        "point-dx":"offsetX",
        "point-dy":"offsetY",
        "point-opacity":"globalAlpha",
        "point-comp-op":"globalCompositeOperation"
    },
    "LINE":{
        "line-color":"strokeStyle",
        "line-width":"lineWidth",
        "line-cap":"lineCap",
        "line-join":"lineJoin",
        "line-miterlimit":"miterLimit",
        "line-dash-offset":"lineDashOffset",
        /*expand*/
        "line-opacity":"strokeOpacity",
        "line-dasharray":"lineDasharray",
        "line-offset":"offset",
        "line-comp-op":"globalCompositeOperation"
    },
    "REGION":{
        /*包括LINE的部分，用以设置面的外围边界*/
        "line-color":"strokeStyle",
        "line-width":"lineWidth",
        "line-cap":"lineCap",
        "line-join":"lineJoin",
        "line-miterlimit":"miterLimit",
        "line-dash-offset":"lineDashOffset",
        /*expand*/
        "line-opacity":"strokeOpacity",
        "line-dasharray":"lineDasharray",

        /*以下为面的特性*/
        "polygon-fill":"fillStyle",
        "polygon-dx":"offsetX",
        "polygon-dy":"offsetY",
        "polygon-opacity":"fillOpacity",
        "polygon-comp-op":"globalCompositeOperation"
    }
};

/**
 * 服务端传过来的style属性名与Canvas的style属性名的对应表
 * */
SuperMap._serverStyleMap={
    fillBackOpaque:{
        canvasStyle:"",
        type:"bool",
        defaultValue:true
    },
    lineWidth:{
        canvasStyle:"lineWidth",
        type:"number",
        unit:"mm",
        defaultValue:0.1
    },
    fillBackColor:{
        canvasStyle:"",
        type:"color",
        defaultValue:"rgba(0,0,0,0)"
    },
    markerWidth:{
        canvasStyle:"",
        type:"number",
        unit:"mm",
        defaultValue:""
    },
    markerAngle:{
        canvasStyle:"",
        type:"number",
        unit:"degree",
        defaultValue:""
    },
    fillForeColor:{
        canvasStyle:"fillStyle",
        type:"color",
        defaultValue:"rgba(0,0,0,0)"
    },
    foreColor:{
        canvasStyle:"fillStyle",
        type:"color",
        defaultValue:"rgba(0,0,0,0)"
    },
    markerSize:{
        canvasStyle:"markerSize",
        type:"number",
        unit:"mm",
        defaultValue:2.4
    },
    fillGradientOffsetRatioX:{
        canvasStyle:"",
        type:"number",
        defaultValue:0
    },
    fillGradientOffsetRatioY:{
        canvasStyle:"",
        type:"number",
        defaultValue:0
    },
    lineColor:{
        canvasStyle:"strokeStyle",
        type:"color",
        defaultValue:"rgba(0,0,0,0)"
    },
    fillOpaqueRate:{
        canvasStyle:"",
        type:"number",
        defaultValue:100
    },
    markerHeight:{
        canvasStyle:"",
        type:"number",
        unit:"mm",
        defaultValue:0
    },
    fillGradientMode:{
        canvasStyle:"",
        type:"string",
        defaultValue:"NONE"
    },
    fillSymbolID:{
        canvasStyle:"",
        type:"number",
        defaultValue:0
    },
    fillGradientAngle:{
        canvasStyle:"",
        type:"number",
        unit:"degree",
        defaultValue:0
    },
    markerSymbolID:{
        canvasStyle:"",
        type:"number",
        defaultValue:0
    },
    lineSymbolID:{
        canvasStyle:"",
        type:"number",
        defaultValue:0
    }
};

/**
 * Canvas中的globalCompositeOperation属性值与CartoCSS中的CompOp属性值对照表
 * */
SuperMap.CartoSymbolizer._compOpMap={
    "clear":"",
    "src":"",
    "dst":"",
    "src-over":"source-over",
    "dst-over":"destination-over",
    "src-in":"source-in",
    "dst-in":"destination-in",
    "src-out":"source-out",
    "dst-out":"destination-out",
    "src-atop":"source-atop",
    "dst-atop":"destination-atop",
    "xor":"xor",
    "plus":"lighter",
    "minus":"",
    "multiply":"",
    "screen":"",
    "overlay":"",
    "darken":"",
    "lighten":"lighter",
    "color-dodge":"",
    "color-burn":"",
    "hard-light":"",
    "soft-light":"",
    "difference":"",
    "exclusion":"",
    "contrast":"",
    "invert":"",
    "invert-rgb":"",
    "grain-merge":"",
    "grain-extract":"",
    "hue":"",
    "saturation":"",
    "color":"",
    "value":""
}