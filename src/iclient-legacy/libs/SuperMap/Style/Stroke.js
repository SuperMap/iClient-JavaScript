/**
 * @requires SuperMap/Style/Clover.js
 */

/**
 * Class: SuperMap.Style.Stroke
 * 边框样式
 */
SuperMap.Style.Stroke = SuperMap.Class({
    /**
     * APTProperty: color
     * {string} 颜色 如："#ff0000"、"rgba(238,153,0,1)"
     */
    color: null,

    /**
     * APTProperty: lineCap
     * {string} 线断点样式，默认为round
     */
    lineCap: 'round',

    /**
     * APTProperty: lineJoin
     * {string} 两条线相交时拐角类型
     */
    lineJoin: 'round',

    /**
     * APTProperty: miterLimit
     * {Number} 最大斜接长度，默认是10 单位px。
     */
    miterLimit: 10,

    /**
     * APTProperty: width
     * {number} 线宽
     */
    width: null,

    /**
     * Constructor: SuperMap.Style.Stroke
     *
     * Parameters:
     * opt_options - {Object}
     *                opt_options.color - {string}
     *                opt_options.lineCap - {string}
     *                opt-options.lineJoin - {string}
     */
    initialize: function(opt_options){
        SuperMap.Util.extend(this,opt_options);
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        this.color = null;
        this.lineCap = null;
        this.linejoin = null;
        this.miterLimit = null;
        this.width = null;
    },

    CLASS_NAME: "SuperMap.Style.Stroke"
});