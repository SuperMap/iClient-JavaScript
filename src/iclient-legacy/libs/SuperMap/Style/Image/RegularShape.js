/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style/Image.js
 */

/**
 * Class: SuperMap.Style.RegularShape
 * 正多边形类.
 */
SuperMap.Style.RegularShape = new SuperMap.Class(SuperMap.Style.Image,{
    /**
     * APIProperty: pointsLength
     * {number} 图形与外包园的交点数
     */
    pointsLength: null,

    /**
     * APIProperty: radius1
     * {number} 中心点与内接圆的半径，单位像素。PS: 如果radius1 = radius 即是正多边形。
     */
    radius1: null,

    /**
     * APIProperty: angle
     * {number} 旋转角度
     */
    angle: null,

    /**
     * Constructor: SuperMap.Style.RegularShape
     * 多边形
     *
     * Examples:
     * (start code)
     *  var RegularShape = new SuperMap.Style.RegularShape({
     *        pointsLength：5
     *        radius: 15,
     *        radius1: 8,
     *        angle: 60,
     *        fill: new SuperMap.Style.Fill({
     *           color: "rgba(238, 153, 0, 0.4)"
     *        }),
     *        stroke: new SuperMap.Style.Stroke({
     *           color: "#ff0000",
     *           width: 1
     *       })
     *  } );
     *
     *   var graphic = new SuperMap.Graphic(new SuperMap.Geometry.Point(0,0));
     *   graphic.style = { image: RegularShape}
     *
     * (end)
     *
     * Parameters:
     * opt_options - {Object}
     *               Object.pointsLength - {number} 图形与外接圆的点数量
     *               Object.radius - {Number} 外接圆半径
     *               Object.radius1 - {Number} 内接圆半径
     *               Object.angle - {Number} 旋转角度
     *               Object.fill - {<SuperMap.Style.Fill>}
     *               Object.stroke - {<SuperMap.Style.Fill>}
     */
    initialize: function(options){
        var me = this;
        if(options.radius === null){
            //必须有半径
            return;
        }
        SuperMap.Style.Image.prototype.initialize.apply(this,arguments);
        me.pointsLength = options.pointsLength;
        me.radius1 = options.radius1 !== undefined ? options.radius1 : me.radius;
        me.angle = options.angle !== undefined ? options.angle/180*Math.PI : 0;

        this.render();
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        SuperMap.Style.Image.prototype.destroy.apply(this, arguments);
        this.pointsLength = null;
        this.radius1 =null;
        this.angle = null;
    },

    /**
     * Method: render
     * 渲染图形
     */
    render: function(){
        var lineCap = '';
        var lineJoin = '';
        var miterLimit = 0;
        var strokeStyle;
        var strokeWidth = 0;

        if (this.stroke) {
            strokeStyle = this.stroke.color;
            strokeWidth = this.stroke.width;
            if (strokeWidth === undefined) {
                strokeWidth = 1;
            }
            lineJoin = this.stroke.lineJoin;
            lineCap = this.stroke.lineCap;
            miterLimit = this.stroke.miterLimit;
        }

        var size = 2 * (this.radius + strokeWidth) + 1;

        var renderOptions = {
            strokeStyle: strokeStyle,
            strokeWidth: strokeWidth,
            size: size,
            lineCap: lineCap,
            lineJoin: lineJoin,
            miterLimit: miterLimit
        };

            var context = this.createCanvasContext2D(size, size);
            this.canvas = context.canvas;
            size = this.canvas.width;

        this.draw(renderOptions, context, 0, 0);
        this.anchor = [size / 2, size / 2];
        this.size = [size, size];
    },

    /**
     * Method: draw.
     * 绘制图形
     *
     * Parameters:
     * context - {CanvasRenderingContext2D}
     * renderOptions - {Object} 渲染参数
     * x - {Number} canvas 原点x
     * y - {Number} canvas 原点y
     */
    draw: function(renderOptions, context, x, y){
        var i, angle0, radiusC;
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);

        // then move to (x, y)
        context.translate(x, y);

        context.beginPath();
        if (this.radius1 !== this.radius) {
            this.pointsLength = 2 * this.pointsLength;
        }
        for (i = 0; i <= this.pointsLength; i++) {
            angle0 = i * 2 * Math.PI / this.pointsLength - Math.PI / 2 + this.angle;
            radiusC = i % 2 === 0 ? this.radius : this.radius1;
            context.lineTo(renderOptions.size / 2 + radiusC * Math.cos(angle0),
                renderOptions.size / 2 + radiusC * Math.sin(angle0));
        }

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
            context.lineCap = renderOptions.lineCap;
            context.lineJoin = renderOptions.lineJoin;
            context.miterLimit = renderOptions.miterLimit;
            context.stroke();
        }
        context.closePath();
    },

    /**
     * Method: drawHitDetectionCanvas
     * context - {CanvasRenderingContext2D}
     * x - {Number} Geometry 像素 x
     * y - {Number} Geometry 像素 y
     */
    drawHitDetectionCanvas: function(context, x, y){
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);

        // then move to (x, y)
        context.translate(x, y);

        context.beginPath();
        var i, radiusC, angle0;
        for (i = 0; i <= this.pointsLength; i++) {
            angle0 = i * 2 * Math.PI / this.pointsLength - Math.PI / 2 + this.angle;
            radiusC = i % 2 === 0 ? this.radius : this.radius1;
            context.lineTo(this.size[0] / 2 + radiusC * Math.cos(angle0),
                this.size[0] / 2 + radiusC * Math.sin(angle0));
        }
        context.fill();
        context.closePath();
    },

    CLASS_NAME: "SuperMap.Style.RegularShape"
});