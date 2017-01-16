/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class:SuperMap.REST.UpdateEdgeWeightParameters
 * 边的耗费权重更新服务参数类
 * */
SuperMap.REST.UpdateEdgeWeightParameters=SuperMap.Class({
    /**
     * APIProperty: edgeId
     * {String} 所在边的id
     */
    edgeId:"",

    /**
     * APIProperty: fromNodeId
     * {String} 起始转向点的id
     */
    fromNodeId:"",

    /**
     * APIProperty: toNodeId
     * {String} 终止转向点的id
     */
    toNodeId:"",

    /**
     * APIProperty: weightField
     * {String} 边的耗费字段
     */
    weightField:"",

    /**
     * APIProperty: edgeWeight
     * {String} 耗费权重
     */
    edgeWeight:"",

    /**
     * Constructor: SuperMap.REST.UpdateEdgeWeightParameters
     * 边的耗费权重更新服务参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * edgeId - {String} 所在边的id
     * fromNodeId - {String} 起始转向点的id
     * toNodeId - {String}  终止转向点的id
     * weightField - {String}  边的耗费字段
     * edgeWeight - {String}   耗费权重
     */
    initialize: function(option){
        if(!option)return;

        option.edgeId&&(this.edgeId = option.edgeId);
        option.fromNodeId&&(this.fromNodeId=option.fromNodeId);
        option.toNodeId&&(this.toNodeId=option.toNodeId);
        option.weightField&&(this.weightField=option.weightField);
        option.edgeWeight&&(this.edgeWeight = option.edgeWeight);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function(){
        this.edgeId=null;
        this.fromNodeId=null;
        this.toNodeId=null;
        this.weightField=null;
        this.edgeWeight=null;
    },

    CLASS_NAME:"UpdateEdgeWeightParameters"
});