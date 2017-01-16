/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/SupplyCenterType.js
 */

/**
 * Class: SuperMap.REST.SupplyCenter
 * 资源供给中心类
 * 资源供给中心类，在资源分配和选址分区分析两个功能中使用。
 */
 
SuperMap.REST.SupplyCenter = SuperMap.Class({
    /** 
     * APIProperty: maxWeight
     * {Number} 资源供给中心的最大耗费值，必设参数。中心点最大阻值设置越小，表示中心点所提供的资源可影响范围越大。
     * 最大阻力值是用来限制需求点到中心点的花费。
     * 如果需求点（弧段或结点）到此中心的花费大于最大阻力值，则该需求点不属于该资源供给中心提供资源的范围。 
     */    
    maxWeight: null,
    
    /** 
     * APIProperty: nodeID
     * {Integer} 资源供给中心点的结点 ID 号，必设参数。资源供给中心必须是结点。 
     */
    nodeID: null,

     /** 
     * APIProperty: resourceValue
     * {Number} 资源供给中心能提供的最大服务量或商品数量，必设参数。例如资源中心为学校，资源中心资源量表示
     * 该学校能够接纳多少学生。
     */
    resourceValue : null,

    /** 
     * APIProperty: type 
     * {<SuperMap.REST.SupplyCenterType>} 资源供给中心点的类型常量。资源供给中心点的类型包括非中心，固定中心和可选中心。 
     * 固定中心用于资源分配分析；固定中心和可选中心用于选址分析；非中心在两种网络分析时都不予考虑。
     */
    type : null,

    /**
     * Constructor: SuperMap.REST.SupplyCenter
     * 资源供给中心类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * maxWeight - {Number} 资源供给中心的最大耗费值，必设参数。
     * nodeID - {Integer} 资源供给中心点的结点 ID 号，必设参数。资源供给中心必须是结点。 
     * resourceValue - {Number} 资源供给中心能提供的最大服务量或商品数量，必设参数。
     * type - {SupplyCenterType} 资源供给中心点的类型常量。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.maxWeight = null;
        me.nodeID = null;
        me.resourceValue = null;
        me.type = null;
    },
    
    CLASS_NAME: "SuperMap.REST.SupplyCenter"                                                                    
});

SuperMap.REST.SupplyCenter.fromJson = function(jsonObject){
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.SupplyCenter({
        maxWeight: jsonObject.maxWeight,
        nodeID: jsonObject.nodeID,
        resourceValue: jsonObject.resourceValue,
        type: jsonObject.type
    });
    return result;
};

