/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style.js
 */

/**
 * Class: SuperMap.Style.LinearGradient
 * 线性渐变类.
 */
SuperMap.Style.LinearGradient=SuperMap.Class(SuperMap.Style.Gradient,{
    /**
     * APIProperty: x1
     * {Number} 起始颜色的x坐标
     * */
    x1:null,

    /**
     * APIProperty: y1
     * {Number} 起始颜色的y坐标
     * */
    y1:null,

    /**
     * APIProperty: x2
     * {Number} 终点颜色的x坐标
     * */
    x2:null,

    /**
     * APIProperty: y2
     * {Number} 终点颜色的y坐标
     * */
    y2:null,

    /**
     * Constructor: SuperMap.Style.LinearGradient
     * 线性渐变样式
     * 当 y1 和 y2 相等，而 x1 和 x2 不同时，可创建水平渐变。
     * 当 x1 和 x2 相等，而 y1 和 y2 不同时，可创建垂直渐变。
     * 当 x1 和 x2 不同，且 y1 和 y2 不同时，可创建角形渐变。
     *
     * Examples:
     * (start code)
     *      var style={
     *          fillColor:new SuperMap.Style.LinearGradient(0,0,1,0,[{offset:0,color:"black",opacity:0.5},{offset:1,color:"white",opacity:0.9}])
     *      };
     * (end)
     *
     * Parameters:
     * x1 - {Number} 起始颜色的x坐标
     * y1 - {Number} 起始颜色的y坐标
     * x2 - {Number} 终点颜色的x坐标
     * y2 - {Number} 终点颜色的y坐标
     * colorStops - {Array} 颜色数组
     *
     * Return:
     * {<SuperMap.Style.LinearGradient>}
     */
    initialize:function(x1,y1,x2,y2,colorStops){
        this.x1=x1||0;
        this.y1=y1||0;
        this.x2=x2||0;
        this.y2=y2||0;
        SuperMap.Style.Gradient.prototype.initialize.call(this,colorStops);
    },

    /**
     * APIMethod: destroy
     * 销毁线性渐变对象
     * */
    destroy:function(){
        this.x1=null;
        this.y1=null;
        this.x2=null;
        this.y2=null;
        SuperMap.Style.Gradient.prototype.destroy.call(this);
    },

    CLASS_NAME:"SuperMap.Style.LinearGradient"
});