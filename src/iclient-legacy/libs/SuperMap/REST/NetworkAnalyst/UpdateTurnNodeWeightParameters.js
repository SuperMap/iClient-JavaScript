/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class:SuperMap.REST.UpdateTurnNodeWeightParameters
 * 转向耗费权重更新服务参数类
 * */
SuperMap.REST.UpdateTurnNodeWeightParameters=SuperMap.Class({
    /**
     * APIProperty:  nodeId
     * {String} 转向结点的id
     */
    nodeId:"",

    /**
     * APIProperty: fromEdgeId
     * {String} 起始边的id
     */
    fromEdgeId:"",

    /**
     * APIProperty: toEdgeId
     * {String} 终止边的id
     */
    toEdgeId:"",

    /**
     * APIProperty: weightField
     * {String} 转向结点的耗费字段
     */
    weightField:"",

    /**
     * APIProperty: turnNodeWeight
     * {String} 耗费权重
     */
    turnNodeWeight:"",


    /**
     * Constructor: SuperMap.REST.UpdateEdgeWeightParameters
     * 转向耗费权重更新服务参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * nodeId - {String} 转向结点的id
     * fromEdgeId - {String} 起始边的id
     * toEdgeId - {String}  终止边的id
     * weightField - {String}  转向结点的耗费字段
     * turnNodeWeight - {String}   耗费权重
     */
    initialize: function(option){
        if(!option)return;

        option.nodeId&&(this.nodeId = option.nodeId);
        option.fromEdgeId&&(this.fromEdgeId=option.fromEdgeId);
        option.toEdgeId&&(this.toEdgeId=option.toEdgeId);
        option.weightField&&(this.weightField=option.weightField);
        option.turnNodeWeight&&(this.turnNodeWeight = option.turnNodeWeight);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function(){
        this.nodeId=null;
        this.fromEdgeId=null;
        this.toEdgeId=null;
        this.weightField=null;
        this.turnNodeWeight=null;
    },

    CLASS_NAME:"UpdateTurnNodeWeightParameters"
});