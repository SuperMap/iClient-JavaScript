/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style/Image.js
 */

/**
 * Class: SuperMap.Style.LinearGradient
 * 圆形类.
 */
SuperMap.Style.Circle = SuperMap.Class(SuperMap.Style.Image,{
    /**
     * Constructor: SuperMap.Style.Circle
     * 圆形
     *
     * Examples:
     * (start code)
     *  var circle = new SuperMap.Style.Circle(
     *        6,
     *       new SuperMap.Style.Fill({
     *           color: "rgba(238, 153, 0, 0.4)"
     *       }),
     *       new SuperMap.Style.Stroke({
     *           color: "#ff0000",
     *           width: 1
     *       })
     *   );
     *
     *   var graphic = new SuperMap.Graphic(new SuperMap.Geometry.Point(0,0));
     *   graphic.style = { image: circle}
     *
     * (end)
     *
     * Parameters:
     * opt_options - {Object}
     *               Object.radius 半径
     *               Object.fill   图形填充样式
     *               Object.stroke 图形边框样式
     */
    initialize: function(opt_options){
        SuperMap.Style.Image.prototype.initialize.apply(this,[opt_options]);
        this.render();
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        SuperMap.Style.Image.prototype.destroy.apply(this, arguments);
    },


    /**
     * Method: render
     * 渲染
     */
    render: function(){
        var lineDash = null, strokeStyle, strokeWidth = 0;

        if(this.stroke){
            strokeStyle = this.stroke.color;
            strokeWidth = this.stroke.width;
            if(strokeWidth === undefined){
                strokeWidth = 1;
            }
            lineDash = this.stroke.lineDash;
        }

        var size = 2 * (this.radius + strokeWidth) + 1;

        /** @type {renderOptions} */
        var renderOptions = {
            strokeStyle: strokeStyle,
            strokeWidth: strokeWidth,
            size: size,
            lineDash: lineDash
        };

        // no atlas manager is used, create a new canvas
        var context = this.createCanvasContext2D(size, size);
        this.canvas = context.canvas;

        // canvas.width and height are rounded to the closest integer
        size = this.canvas.width;

        // draw the circle on the canvas
        this.draw(renderOptions, context, 0, 0);

        this.anchor = [size / 2, size / 2];
        this.size = [size, size];
    },


    /**
     * Method: draw.
     * 绘制圆
     *
     * Parameters:
     * context - {CanvasRenderingContext2D}
     * renderOptions - {Object} 渲染参数
     * x - {Number} canvas 原点x
     * y - {Number} canvas 原点y
     */
    draw: function(renderOptions,context, x, y){
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);

        //then move to (x, y)
        context.translate(x, y);

        context.beginPath();
        context.arc(
            renderOptions.size / 2, renderOptions.size / 2,
            this.radius, 0, 2 * Math.PI, true);

        if (this.fill) {
            context.fillStyle = this.fill.color;
            context.fill();
        }
        if (this.stroke) {
            context.strokeStyle = renderOptions.strokeStyle;
            context.lineWidth = renderOptions.strokeWidth;
            if (renderOptions.lineDash) {
                context.setLineDash(renderOptions.lineDash);
            }
            context.stroke();
        }
        context.closePath();
    },

    /**
     * Method: drawHitDetectionCanvas
     * context - {CanvasRendingContext2D}
     * x - {Number} Geometry 像素 x
     * y - {Number} Geometry 像素 y
     */
    drawHitDetectionCanvas: function(context, x, y){
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);

        // then move to (x, y)
        context.translate(x, y);

        context.beginPath();
        context.arc(
            this.size[0] / 2, this.size[0] / 2,
            this.radius, 0, 2 * Math.PI, true);
        //离屏canvas style在render中设置
        context.fill();

        context.closePath();
    },

    CLASS_NAME: "SuperMap.Style.Circle"
});