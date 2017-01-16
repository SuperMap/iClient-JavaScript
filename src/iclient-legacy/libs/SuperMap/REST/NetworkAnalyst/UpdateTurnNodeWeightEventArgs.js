/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/NetworkAnalyst/UpdateTurnNodeWeightResult.js
 */

/**
 * Class: SuperMap.REST.UpdateTurnNodeWeightEventArgs
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.UpdateTurnNodeWeightEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    /**
     * APIProperty: result
     * {<SuperMap.REST.UpdateTurnNodeWeightResult>} 转向耗费权重更新服务结果
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.UpdateTurnNodeWeightEventArgs
     *回调函数参数类
     *
     * Parameters:
     * result - {<SuperMap.REST.UpdateTurnNodeWeightResult>}
     * originResult - {Object}
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

    CLASS_NAME: "SuperMap.REST.UpdateTurnNodeWeightEventArgs"
});