/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.UpdateTurnNodeWeightResult
 * 转向耗费权重更新服务结果数据类。
 * 更新转向耗费权重后服务器返回的结果保存在此类中。
 */
SuperMap.REST.UpdateTurnNodeWeightResult=SuperMap.Class({
    /**
     * APIProperty: updateResult
     * {Object} 更新结果数据
     */
    updateResult:null,

    /**
     * Constructor: SuperMap.REST.UpdateTurnNodeWeightResult
     * 转向耗费权重更新服务结果数据类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * updateResult - {Object} 耗费结果数据。
     */
    initialize:function(options){
        options&&SuperMap.Util.extend(this,options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function(){
        this.updateResult=null;
    },

    CLASS_NAME:"SuperMap.REST.UpdateTurnNodeWeightResult"
});

/**
 * Function: SuperMap.REST.UpdateTurnNodeWeightResult.fromJson
 * 将 JSON 对象转换为 UpdateTurnNodeWeightResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的转向耗费权重更新结果。
 *
 * Returns:
 * {<SuperMap.REST.UpdateTurnNodeWeightResult>} 转化后的 UpdateTurnNodeWeightResult 对象。
 */
SuperMap.REST.UpdateTurnNodeWeightResult.fromJson=function(jsonObject){
    if (!jsonObject) {
        return;
    }
    var succeed="update failured";
    if(jsonObject.succeed==true)succeed="update succeed";
    var result = new SuperMap.REST.UpdateTurnNodeWeightResult({
        updateResult: succeed
    });
    return result;
};