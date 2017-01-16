/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.OverlayAnalystParameters
 * 叠加分析参数基类，数据集叠加分析参数和几何对象叠加分析参数均继承此基类
 */
SuperMap.REST.OverlayAnalystParameters = SuperMap.Class({

    /** 
     * Property: operation
     * {<SuperMap.REST.OverlayOperationType>}
     */
    operation: SuperMap.REST.OverlayOperationType.UNION,
    
    /**
     * Constructor: SuperMap.REST.OverlayAnalystParameters 
     * 叠加分析参数基类构造函数构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * operation - {<SuperMap.REST.OverlayOperationType>} 指定叠加分析操作类型。
     */
    initialize: function (options) {
        var me = this;
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        var me = this;
        me.operation = null;
    },

    CLASS_NAME: "SuperMap.REST.OverlayAnalystParameters"
});