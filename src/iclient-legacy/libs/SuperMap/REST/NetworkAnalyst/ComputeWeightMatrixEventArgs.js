/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/NetworkAnalyst/ComputeWeightMatrixResult.js
 */

/**
 * Class: SuperMap.REST.ComputeWeightMatrixEventArgs
 * 耗费矩阵分析服务事件数据类。
 * 类包含了从服务端传回的指定的任意两点间的耗费矩阵。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.ComputeWeightMatrixEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.ComputeWeightMatrixResult>} 服务端返回的耗费矩阵分析结果数据。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.ComputeWeightMatrixEventArgs
     * 耗费矩阵分析服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.ComputeWeightMatrixResult>} 服务端返回的耗费矩阵分析结果数据。
     * originResult - {Object} 服务端返回的存储了耗费矩阵分析结果数据的 JSON 字符串。
     */
    initialize: function(result, originResult) {
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
    
    CLASS_NAME: "SuperMap.REST.ComputeWeightMatrixEventArgs"
});