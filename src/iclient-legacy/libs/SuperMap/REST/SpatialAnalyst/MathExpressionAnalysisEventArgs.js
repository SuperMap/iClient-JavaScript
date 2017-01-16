/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/MathExpressionAnalysisResult.js
 * @requires SuperMap/REST/SpatialAnalyst/MathExpressionAnalysisParameters.js
 */

/**
 * Class: SuperMap.REST.MathExpressionAnalysisEventArgs
 * 栅格代数运算服务事件数据类。
 * 该类包含了从服务端传回的栅格代数运算结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.MathExpressionAnalysisEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.MathExpressionAnalysisResult>} 服务端返回的栅格代数运算结果数据。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.MathExpressionAnalysisEventArgs
     * 栅格代数运算服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.MathExpressionAnalysisResult>} 服务端返回的栅格代数运算结果数据 。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的栅格代数运算结果数据 。
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
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.MathExpressionAnalysisEventArgs"
});                                               