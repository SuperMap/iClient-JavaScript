/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style.js
 */

/**
 * Class: SuperMap.Style.RadialGradient
 * 放射渐变类.
 */
SuperMap.Style.RadialGradient=SuperMap.Class(SuperMap.Style.Gradient,{
    /**
     * APIProperty: cx
     * {Number} 外圆的中心坐标的x坐标，值范围为0~1
     * */
    cx:null,

    /**
     * APIProperty: cy
     * {Number} 外圆的中心坐标的y坐标，值范围为0~1
     * */
    cy:null,

    /**
     * APIProperty: radius
     * {Number} 外圆的辐射范围半径，值范围为0~1
     * */
    radius:null,

    /**
     * APIProperty: fx
     * {Number} 内圆的中心坐标的x坐标，值范围为0~1
     * */
    fx:null,

    /**
     * APIProperty: fy
     * {Number} 内圆的中心坐标的y坐标，值范围为0~1
     * */
    fy:null,

    /**
     * Constructor: SuperMap.Style.RadialGradient
     * 放射渐变样式
     *
     * Examples:
     * (start code)
     *      var style={
     *          fillColor:new SuperMap.Style.RadialGradient(0.3,0.3,0.5,0.5,0.5,[{offset:0,color:"black",opacity:0.5},{offset:1,color:"white",opacity:0.9}])
     *      };
     * (end)
     *
     * Parameters:
     * cx - {Number} 外圆的中心坐标的x坐标，值范围为0~1
     * cy - {Number} 外圆的中心坐标的y坐标，值范围为0~1
     * radius - {Number} 外圆的辐射范围半径，值范围为0~1
     * x2 - {Number} 内圆的中心坐标的x坐标，值范围为0~1
     * y2 - {Number} 内圆的中心坐标的y坐标，值范围为0~1
     * colorStops - {Array} 颜色数组
     *
     * Return:
     * {<SuperMap.Style.RadialGradient>}
     */
    initialize:function(cx,cy,radius,fx,fy,colorStops){
        this.cx=cx||0;
        this.cy=cy||0;
        this.radius=radius||0;
        this.fx=fx||0;
        this.fy=fy||0;
        SuperMap.Style.Gradient.prototype.initialize.call(this,colorStops);
    },

    /**
     * APIMethod: destroy
     * 销毁放射渐变对象
     * */
    destroy:function(){
        this.cx=null;
        this.cy=null;
        this.radius=null;
        this.fx=null;
        this.fy=null;
        SuperMap.Style.Gradient.prototype.destroy.call(this);
    },

    CLASS_NAME:"SuperMap.Style.RadialGradient"
});