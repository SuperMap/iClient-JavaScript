/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.SpatialAnalystResult
 * 空间分析结果类 
 */
SuperMap.REST.SpatialAnalystResult = SuperMap.Class({

    /** 
     * Property: succeed
     * {Boolean} 是否成功返回结果。true 表示成功返回结果。
     */
    succeed: null,

    /**
     * Constructor: SuperMap.REST.SpatialAnalystResult 
     * 缓冲区分析结果构造函数构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * succeed - {Boolean} 是否成功返回结果。true 表示成功返回结果。
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
        me.succeed = null;
    },

    CLASS_NAME: "SuperMap.REST.SpatialAnalystResult"
});