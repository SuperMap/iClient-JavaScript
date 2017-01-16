/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Style.Image
 * 图形形类基类. Base cladd for {<SuperMap.Style.Circle>}，{<SuperMap.Style.Clover>},
 * {<SuperMap.Style.HitClover>},{<SuperMap.Style.RegularShape>}
 */
SuperMap.Style.Image = new SuperMap.Class({

    /**
     * Property: canvas
     * {HTMLCanvasElement}
     */
    canvas: null,

    /**
     * APIProperty: fill
     * 图形填充样式
     * {<SuperMao.Style.Fill>}
     */
    fill: null,

    /**
     * APIProperty: stroke
     * 图层的边框样式
     * {<SuperMap.Style.Stroke>}
     */
    stroke: null,

    /**
     * APIProperty: radius
     * 图形半径
     * {number}
     */
    radius: null,

    /**
     * Property: origin
     * {Array.<number>}
     */
    origin: [0,0],

    /**
     * Property: anchor
     * {Array.<number>}
     */
    anchor: null,

    /**
     * APIProperty: size
     * 图形大小，即高度和宽度
     * {<Supermap.size>}
     */
    size: null,

    /**
     * Constructor: SuperMap.Style.Circle
     * 圆形
     *
     * Parameters:
     * opt_options - {Object}
     */
    initialize:function(opt_options){
        SuperMap.Util.extend(this,opt_options)
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        this.canvas = null;
        if(this.fill){
            this.fill.destroy();
            this.fill = null;
        }
        if(this.stroke){
            this.stroke.destroy();
            this.stroke = null;
        }
        this.radius = null;
        this.anchor = null;
        this.size = null;
    },

    /**
     * Method: render
     * 渲染图层，子类必须重写实现方法
     */
    render: function(){},

    /**
     * Methos: drawHitDetectionCanvas
     * 如子类需要事件，子类必须重写实现方法
     */
    drawHitDetectionCanvas: function(){},

    /**
     *
     * Create an html canvas element and returns its 2d context.
     * @param {number=} opt_width Canvas width.
     * @param {number=} opt_height Canvas height.
     * @return {CanvasRenderingContext2D} The context.
     */
    createCanvasContext2D: function(width,height){
        var canvas = document.createElement('CANVAS');
        ;
        if (width) {
            canvas.width = width;
        }
        if (height) {
            canvas.height = height;
        }
        return canvas.getContext('2d');
    },

    CLASS_NAME: "SuperMap.Style.Image"
});