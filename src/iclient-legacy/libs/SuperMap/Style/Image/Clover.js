/**
 * 三叶草
 */
SuperMap.Style.Clover = SuperMap.Class(SuperMap.Style.Image,{
    /**
     * APIProperty: angle
     * 三叶草每个扇叶的圆心角,默认为30，单位弧度。
     * {number}
     */
    angle: 30,

    /**
     * Property: spaceAngle
     * 扇叶间隔角度，通过计算获取
     */
    spaceAngle: 0,

    /**
     * Property: count
     * 扇叶数量， 默认是三个
     */
    count: 3,

    /**
     * Constructor: SuperMap.Style.Clover
     * 三叶草
     *
     * Examples:
     * (start code)
     *  var clover = new SuperMap.Style.Clover({
     *        radius: 15,
     *        angle: 60,
     *        count: 3,
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
     *   graphic.style = { image: clover}
     *
     * (end)
     *
     * Parameters:
     * opt_options - {Object}
     *               Object.radius - {number} 外接圆半径
     *               Object.angle - {Number} 三叶草扇叶角度
     *               Object.count - {Number} 三叶草叶片数量
     *               Object.fill - {<SuperMap.Style.Fill>}
     *               Object.stroke - {<SuperMap.Style.Fill>}
     */
    initialize: function(opt_options){
        SuperMap.Style.Image.prototype.initialize.apply(this,arguments);
        this.angle = opt_options.angle !== undefined ? opt_options.angle : this.angle;
        this.count = opt_options.count !== undefined ? opt_options.count : this.count;

        this.render();
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        SuperMap.Style.Image.prototype.destroy.apply(this, arguments);
        this.angle = null;
        this.spaceAngle = null;
        this.count = null;
    },

    /**
     * Method: render
     * 渲染三叶草
     */
    render: function(){
        var strokeWidth = this.stroke.width === undefined? 1: this.stroke.width;

        var size = 2 * (this.radius + strokeWidth) + 1;

        var renderOptions = {
            strokeStyle: this.stroke,
            fillStyle: this.fill,
            size: size
        };

        // no atlas manager is used, create a new canvas
        var context = this.createCanvasContext2D(size, size);
        this.canvas = context.canvas;

        // canvas.width and height are rounded to the closest integer
        size = this.canvas.width;

        this.anchor = [size / 2, size / 2];

        // draw the circle on the canvas
        this.draw(context, renderOptions,0,0);

        this.size = [size, size];
    },


    /**
     * Method: draw.
     * 绘制三叶草
     *
     * Parameters:
     * context - {CanvasRenderingContext2D}
     * renderOptions - {Object} 渲染参数
     * x - {Number} canvas 原点x
     * y - {Number} canvas 原点y
     */
    draw: function(context,renderOptions,x,y){
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);

        //起始角度
        var sAngle = 0;
        var eAngle = this.angle;
        this.spaceAngle = 360/this.count - this.angle;

        if(this.spaceAngle <0) return; //设置参数无效

        context.translate(x, y);
        context.beginPath();
        for(var i = 0; i < this.count; i++){
            this.drawSector(context,this.anchor[0],this.anchor[1],this.radius,sAngle,eAngle);
            sAngle = eAngle + this.spaceAngle;
            eAngle = sAngle + this.angle;
        }
        if(renderOptions){
            this.setStyle(context,renderOptions);
        } else{
            //离屏Canvas 事件有用参数
            context.fill();
        }
        context.closePath();
    },

    /**
     * Method: setStyle
     * 设置图形样式
     */
    setStyle: function(context,renderOptions){
        if (renderOptions.fillStyle) {
            context.fillStyle = renderOptions.fillStyle.color;
            context.fill();
        }
        if (renderOptions.strokeStyle) {
            context.strokeStyle = renderOptions.strokeStyle.color;
            context.lineWidth = renderOptions.strokeStyle.width;
            if (renderOptions.strokeStyle.lineDash) {
                context.setLineDash(renderOptions.strokeStyle.lineDash);
            }
            context.stroke();
        }
    },

    /**
     * Method: drawSector
     * 绘制扇形
     *
     * Parameters:
     * context - {CanvasRenderingContext2D}
     * x - {Number} 中心点 x
     * y - {Number} 中心点 y
     * r - {Number} 中心点 r
     * sAngle - {Number} 扇叶起始角度
     * eAngle - {NUmber} 扇叶终止角度
     */
    drawSector: function(context,x,y,r,sAngle,eAngle){
        //角度转换
        sAngle = sAngle/180*Math.PI;
        eAngle = eAngle/180*Math.PI;
        context.moveTo(x,y);
        context.lineTo(x + r*Math.cos(sAngle), y + r*Math.sin(sAngle));
        context.arc(x,y,r,sAngle,eAngle);
        context.lineTo(x , y );
    },


    /**
     * Method: drawHitDetectionCanvas
     * context - {CanvasRendingContext2D}
     * x - {Number} Geometry 像素 x
     * y - {Number} Geometry 像素 y
     */
    drawHitDetectionCanvas: function(context, x, y){
        this.draw(context ,undefined , x, y);
    },


    CLASS_NAME: "SuperMap.Style.Clover"
});