/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/GeoRelationAnalystResult.js
 */

/**
 * Class: SuperMap.REST.GeoRelationAnalystEventArgs
 * 空间关系分析事件数据类。
 * 该类包含了空间关系分析服务的查询结果状态和结果数据。
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.GeoRelationAnalystEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /** 
     * APIProperty: result
     * {<SuperMap.REST.GeoRelationAnalystResult>} 获取服务端返回的空间关系分析结果。 
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.GeoRelationAnalystEventArgs
     * 空间关系分析事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.GeoRelationAnalystResult>}
     * originResult - {Object}
     */
    initialize: function (result, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this,arguments);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.GeoRelationAnalystEventArgs"
});