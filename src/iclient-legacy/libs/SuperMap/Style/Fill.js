
/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Style.Fill
 * 填充类.
 */
SuperMap.Style.Fill = SuperMap.Class({
    /**
     * APIProperty: color
     * {String} "#ff0000"、"rgba(238,153,0,1)"
     */
    color: null,

    /**
     * Constructor: SuperMap.Style.Fill
     *
     * Parameters:
     * opt_options - {Object}
     *                opt_options.color - {String}
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
    },

    CLASS_NAME: 'SuperMap.Style.Fill'
});