/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/TransportationAnalystParameter.js
 */

/**
 * Class: SuperMap.REST.FindMTSPPathsParameters
 * 多旅行商分析参数类。
 * 多旅行商分析也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数），查找经济有效的配送路径，并给出相应的行走路线。
 * 物流配送功能就是解决如何合理分配配送次序和送货路线，使配送总花费达到最小或每个配送中心的花费达到最小。
 * 例如：现在有50个报刊零售地（配送目的地），和4个报刊供应地（配送中心），现寻求这4个供应地向报刊零售地发送报纸的最优路线，属物流配送问题。
 */
SuperMap.REST.FindMTSPPathsParameters = SuperMap.Class({

    /** 
     * APIProperty: centers
     * {<SuperMap.Geometry.Point>/Integer} 配送中心集合，必设字段。  
     * 当 FindMTSPPathsParameters.isAnalyzeById = false 时，centers 应为点的坐标数组；当 FindMTSPPathsParameters.isAnalyzeById = true 时，centers 应为点的 ID 数组。
     */
    centers: null,
    
    /** 
     * APIProperty: hasLeastTotalCost 
     * {Boolean} 配送模式是否为总花费最小方案。默认为 false。
     * 若为 true，则按照总花费最小的模式进行配送，此时可能会出现某几个配送中心点配送的花费较多而其他配送中心点的花费很少的情况。
     * 若为 false，则为局部最优，此方案会控制每个配送中心点的花费，使各个中心点花费相对平均，此时总花费不一定最小。
     */ 
    hasLeastTotalCost: false,

    /** 
     * APIProperty: isAnalyzeById
     * {Boolean} 是否通过节点 ID 号来指定配送中心点和配送目的点，默认为 false，即通过坐标点指定。
     */ 
    isAnalyzeById: false,
    
    /** 
     * APIProperty: nodes
     * {Array(<SuperMap.Geometry.Point>/Number)} 配送目标集合，必设字段。
     * 当 FindMTSPPathsParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；当 FindMTSPPathsParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
     */ 
    nodes: null,

    /** 
     * APIProperty: parameter
     * {<SuperMap.REST.TransportationAnalystParameter>} 交通网络分析通用参数。
     * 通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息。
     * TransportationAnalystParameter 类型，它虽然为可选参数，但是如果不设置其中的 resultSetting 字段，则返回结果空间信息等都为空。
     */ 
    parameter: null,
 
    /**
     * Constructor: SuperMap.REST.FindMTSPPathsParameters
     * 多旅行商分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * centers - {<SuperMap.Geometry.Point>/Integer} 配送中心集合，必设字段。
     * hasLeastTotalCost - {Boolean} 配送模式是否为总花费最小方案。默认为 false。
     * isAnalyzeById - {Boolean} 是否通过节点 ID 号来指定配送中心点和配送目的点，默认为 false，即通过坐标点指定。
     * nodes - {Array(<SuperMap.Geometry.Point>/Number)} 配送目标集合，必设字段。
     * parameter - {<SuperMap.REST.TransportationAnalystParameter>} 交通网络分析通用参数。
     */
    initialize: function(options) {
        var me = this;
        me.parameter = new SuperMap.REST.TransportationAnalystParameter();
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() { 
        var me = this;
        me.centers = null;
        me.hasLeastTotalCost = null;
        me.isAnalyzeById = null;
        me.nodes = null;
        me.maxWeight = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindMTSPPathsParameters"
}); 