/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/SpatialAnalyst/BufferSetting.js
 */


/**
 * Class: SuperMap.REST.BufferAnalystParameters
 * 缓冲区分析参数基类。
 */
SuperMap.REST.BufferAnalystParameters = SuperMap.Class({

    /** 
     * APIProperty: bufferSetting
     * {<SuperMap.REST.BufferSetting>} 设置缓冲区通用参数。
     * 为缓冲区分析提供必要的参数信息，包括左缓冲距离、右缓冲距离、端点类型、圆头缓冲圆弧处线段的个数信息。
     */
    bufferSetting: null,

    /**
     * Constructor: SuperMap.REST.BufferAnalystParameters
     * 缓冲区分析参数基类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bufferSetting - {<SuperMap.REST.BufferSetting>} 设置缓冲区通用参数。
     */    
    initialize: function (options) {
        var me = this;
        me.bufferSetting = new SuperMap.REST.BufferSetting();
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
        if (me.bufferSetting) {
            me.bufferSetting.destroy();
            me.bufferSetting = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.BufferAnalystParameters"
});