/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.FindServiceAreasParameters
 * 服务区分析参数类。
 * 服务区分析是以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
 * 例如：计算某快餐店能够在30分钟内送达快餐的区域。
 */
SuperMap.REST.FindServiceAreasParameters = SuperMap.Class({

    /** 
     * APIProperty: isAnalyzeById
     * {Boolean} 是否通过节点 ID 指定路径分析的结点，默认为 false。
     * 指定路径分析经过的结点或设施点有两种方式：输入结点 ID 号或直接输入点坐标。
     * 当该字段为 true 时，表示通过结点 ID 指定途经点，即 FindServiceAreasParameters.centers = [ID1,ID2,...]；
     * 反之表示通过结点坐标指定途经点，即 FindServiceAreasParameters.centers = [new SuperMap.Geometry.Point(x1,y1),new SuperMap.Geometry.Point(x2,y2),...]。  
     */
    isAnalyzeById: false,

    /** 
     * APIProperty: isCenterMutuallyExclusive
     * {Boolean} 是否中心点互斥，即按照中心点的距离进行判断是否要进行互斥处理，默认为 false。
     * 若分析出的服务区有重叠的部分，则通过设置该参数进行互斥处理。
     */ 
    isCenterMutuallyExclusive: false,
    
    /** 
     * APIProperty: centers
     * {Array(<SuperMap.Geometry.Point>/Number)} 服务站点数组，必设字段。
     * 当该类的 iSAnalyzeById = true 时，通过结点 ID 号指定服务站点；
     * 当 iSAnalyzeById = false 时，通过点坐标指定服务站点。
     */ 
    centers: null,
    
    /** 
     * APIProperty: isFromCenter
     * {Boolean} 是否从中心点开始分析。默认为 false。
     * 从中心点开始分析和不从中心点开始分析，体现了服务中心和需要该服务的需求地的关系模式。
     * 从中心点开始分析，是一个服务中心向服务需求地提供服务；
     * 而不从中心点开始分析，是一个服务需求地主动到服务中心获得服务。
     */ 
    isFromCenter: false,
    
    /** 
     * APIProperty: weights
     * {Array(Number)} 每个服务站点提供服务的阻力半径，即超过这个阻力半径的区域不予考虑，其单位与阻力字段一致，必设字段。
     * 该字段为一个数组，数组长度跟服务中心个数一致，按照索引顺序与站点一一对应，每个元素表示了在对每个服务中心进行服务区分析时，所用的服务半径。
     */ 
    weights: null,
    
    /** 
     * APIProperty: parameter
     * {<SuperMap.REST.TransportationAnalystParameter>} 交通网络分析通用参数。
     */ 
    parameter: null,
 
    /**
     * Constructor: SuperMap.REST.FindServiceAreasParameters
     * 服务区分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * isAnalyzeById - {Boolean} 是否通过节点 ID 指定路径分析的结点。  
     * isCenterMutuallyExclusive - {Boolean} 是否中心点互斥。
     * centers - {Array()} 服务站点数组，必设字段。
     * isFromCenter - {Boolean} 是否从中心点开始分析。
     * weights - {Array()} 每个服务站点提供服务的阻力半径，即超过这个阻力半径的区域不予考虑，其单位与阻力字段一致，必设字段。
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
        me.isAnalyzeById = null;
        me.isCenterMutuallyExclusive = null;
        me.centers = null;
        me.isFromCenter = null;
        me.weights = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindServiceAreasParameters"
}); 