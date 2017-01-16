
/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style/Clover.js
 */

/**
 * Class: SuperMap.Style.HitClover
 * 三叶草扇叶选中样式
 */
SuperMap.Style.HitClover = SuperMap.Class(SuperMap.Style.Clover,{
    /**
     * APIProperty: context
     * {Canvas.Context}
     */
    context: null,

    initialize: function(){},

    /**
     * APIMethod: destory
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        SuperMap.Style.Clover.prototype.destroy.apply(this, arguments);
        this.context = null;
    },

    /**
     * APIMethod: render
     * 渲染三叶草选中的扇叶
     *
     * Parameters:
     * renderOpt - {Object} 渲染参数
     *              renderOpt.strokeStyle - {<SuperMap.Style.Stroke>} 边框样式
     *              renderOpt.fillStyle - {<SuperMap.Style.Fill>}填充样式
     *              renderOpt.size - {<SuperMap.Size>} 尺寸大小，建议与原三叶草的大小保持一致
     *              renderOpt.radius -{Nnmber} 半径
     *              renderOpt.angle - {Number} 圆心角
     *              renderOpt.sAngle - {Number} 扇叶起始角度
     *              renderOpt.eAngle - {Number} 扇叶终止角度
     */
    render: function(renderOpt){
        // no atlas manager is used, create a new canvas
        if(this.context === null || this.canvas.width !== renderOpt.size[0]){
            this.context = this.createCanvasContext2D(renderOpt.size[0], renderOpt.size[1]);
            this.canvas = this.context.canvas;
        }

        // canvas.width and height are rounded to the closest integer
        var size = this.canvas.width;

        this.anchor = [size / 2, size / 2];

        // draw the circle on the canvas
        this.draw(this.context, renderOpt,0,0);

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
    draw: function(context ,renderOptions,x,y){
        context.clearRect(0,0,this.canvas.width,this.canvas.height);
        // reset transform
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(x, y);
        context.beginPath();

            this.drawSector(context,this.anchor[0],this.anchor[1],renderOptions.radius,renderOptions.sAngle,renderOptions.eAngle);
            this.setStyle(context,renderOptions);

        context.closePath();
    },

    CLASS_NAME: "SuperMap.Style.HitClover"
});