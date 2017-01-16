/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.BufferDistance
 * 缓冲区分析的缓冲距离类
 * 通过该类可以设置缓冲区分析的缓冲距离，距离可以是数值也可以是数值型的字段表达式。
 */
SuperMap.REST.BufferDistance = SuperMap.Class({

    /** 
     * APIProperty: exp
     * {String} 以数值型的字段表达式作为缓冲区分析的距离值。 
     */
    exp: null,

    /** 
     * APIProperty: value
     * {Number} 以数值作为缓冲区分析的距离值。默认为100，单位：米。 
     */
    value: 100,

    /**
     * Constructor: SuperMap.REST.BufferDistance 
     * 缓冲区分析的缓冲距离类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * exp - {String} 以数值型的字段表达式作为缓冲区分析的距离值。 
     * value - {Number} 以数值作为缓冲区分析的距离值。默认为100，单位：米。 
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        var me = this;
        me.exp = null;
        me.value = null;
    },

    CLASS_NAME: "SuperMap.REST.BufferDistance"
});