/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Style.js
 */

/**
 * Class: SuperMap.Style.Gradient
 * 颜色渐变基类.
 */
SuperMap.Style.Gradient=SuperMap.Class({
    /**
     * Property: id
     * {String} 颜色渐变对象的标识
     * */
    id:null,

    /**
     * APIProperty: colorStops
     * {Array<Object>} 颜色值数组,其中每一项为一个Object对象，其有三个属性，分别是"offset","color","opacity",
     * "offset"指的是颜色的偏移值，范围为0~1；"color"指颜色值，可以是16进行的颜色值，也可以是颜色名，比如"white"；
     * "opacity"指的是颜色的透明度，范围为0~1。
     * */
    colorStops:null,

    /**
     * Constructor: SuperMap.Style.Gradient
     * 颜色渐变构造函数
     *
     * Parameters:
     * colorStops - {Array} 颜色数组
     *
     * Return:
     * {<SuperMap.Style.Gradient>}
     */
    initialize:function(colorStops){
        this.setColorStops(colorStops);
        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_");
    },

    /**
     * APIMethod: destroy
     * 销毁颜色渐变对象
     * */
    destroy:function(){
        this.id=null;
        this.colorStops=null;
    },

    /**
     * APIMethod: setColorStops
     * 设置颜色数组
     *
     * Parameters:
     * colorStops - {Array} 颜色数组
     * */
    setColorStops:function(colorStops){
        if(SuperMap.Util.isArray(colorStops)){
            if(colorStops.length>1){
                this.colorStops=colorStops;
            }else{
                throw error("it must be more than two color!");
            }
        }else{
            throw error("parameters is not array!");
        }
    },

    CLASS_NAME:"SuperMap.Style.Gradient"
});