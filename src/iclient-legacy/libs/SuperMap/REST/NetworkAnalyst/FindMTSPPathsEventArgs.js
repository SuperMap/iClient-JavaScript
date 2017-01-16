/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/NetworkAnalyst/FindMTSPPathsResult.js
 */

/**
 * Class: SuperMap.REST.FindMTSPPathsEventArgs
 * 多旅行商分析服务事件数据类
 * 该类包含了从服务端传回的多旅行商分析结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.FindMTSPPathsEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    /** 
     * APIProperty: result
     * {<SuperMap.REST.FindMTSPPathsResult>} 服务端返回的多旅行商分析结果数据。    
     * FindMTSPPathsResult 类，分析结果中包含每个配送中心所负责的配送目的地。
     * 并且在某个配送中心向其负责的配送目的地配送货物的时候，又给出经过各个配送目的地的顺序，和相应的行走路线。
     * 从而使该配送中心的配送花费最少，或者使得所有的配送中心的总花费最小。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.FindMTSPPathsEventArgs
     * 多旅行商分析服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.FindMTSPPathsResult>} 服务端返回的多旅行商分析结果数据。
     * originResult - {Object} 获取服务端返回的存储了多旅行商分析结果数据的 JSON 字符串。
     */
    initialize: function(result,originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function() {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindMTSPPathsEventArgs"
});