/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/TransportationAnalystParameter.js
 */

/**
 * Class: SuperMap.REST.FindClosestFacilitiesParameters
 * 最近设施分析参数类。
 * 最近设施分析是指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 * 设施点一般为学校、超市、加油站等服务设施；事件点为需要服务设施的事件位置。
 * 例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，超过10分钟能到达的都不予考虑。此例中，事故发生地即是一个事件点，周边的医院则是设施点。
 * 最近设施查找实际上也是一种路径分析，因此对路径分析起作用的障碍边、障碍点、转向表、耗费等属性在最近设施分析时同样可设置。
 */
SuperMap.REST.FindClosestFacilitiesParameters = SuperMap.Class({

    /** 
     * APIProperty: event
     * {<SuperMap.Geometry.Point>/Integer} 事件点，一般为需要获得服务设施服务的事件位置，必设字段。  
     * 可以通过两种方式赋予事件点：当该类中字段 isAnalyzeById = true 时，应输入事件点 ID 号；当 isAnalyzeById = false 时，应输入事件点坐标。
     */
    event: null,
    
    /** 
     * APIProperty: expectFacilityCount
     * {Number} 要查找的设施点数量。默认值为1。
     */ 
    expectFacilityCount: 1,
    
    /** 
     * APIProperty: facilities
     * {Array(<SuperMap.Geometry.Point>/Number)} 设施点集合，一般为提供服务的服务设施位置，必设字段。
     * 可以通过两种方式赋予设施点：当该类中字段 isAnalyzeById = true 时，应输入设施点 ID 号；当 isAnalyzeById = false 时，应输入设施点坐标。
     */ 
    facilities: null,

    /** 
     * APIProperty: fromEvent
     * {Boolean} 是否从事件点到设施点进行查找。
     * 最近设施分析主要是通过设施点和事件点之间最优的路线来分析在一定范围内哪个或哪些设施与事件点有最优路线的关系。
     * 这个行走线路是通过网络图层进行网络分析算法计算出来的两点间的最优路线。
     * 由于存在从 A 点到 B 点与从 B 点到 A 点的耗费不一样的情况，因此起止点不同可能会得到不同的最优路线。
     * 因此在进行最近设施分析之前，需要设置获取的最优路线的方向，即是以事件点作为起点到最近设施点的方向分析，还是以最近设施点为起点到事件点的方向分析。
     * 如果需要以事件点作为起点到设施点方向进行查找，设置该字段值为 true；默认为 false，表示从设施点到事件点进行查找。
     */ 
    fromEvent: false,

    /** 
     * APIProperty: isAnalyzeById
     * {Boolean} 事件点和设施点是否通过节点 ID 号来指定，默认为 false，即通过坐标点指定事件点和设施点。
     */ 
    isAnalyzeById: false,

    /** 
     * APIProperty: maxWeight
     * {Number} 查找半径。单位与该类中 parameter 字段（交通网络分析通用参数）中设置的耗费字段一致。默认值为0，表示查找全网络。
     * 例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，超过10分钟能到达的都不予考虑。那么需要将网络分析参数中 parameter.weightFieldName 设置为表示时间的字段，然后设置查找范围的半径值为10。
     */ 
    maxWeight: 0,

    /** 
     * APIProperty: parameter
     * {<SuperMap.REST.TransportationAnalystParameter>} 交通网络分析通用参数。
     * 通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息。
     * 它为 TransportationAnalystParameter 类型，虽然为可选参数，但是如果不设置其中的 resultSetting 字段，则返回结果空间信息等都为空。
     */ 
    parameter: null,
 
    /**
     * Constructor: SuperMap.REST.FindClosestFacilitiesParameters
     * 最近设施分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * event - {<SuperMap.Geometry.Point>/Integer} 事件点，一般为需要获得服务设施服务的事件位置，必设字段。
     * expectFacilityCount - {Integer} 要查找的设施点数量。默认值为1。
     * facilities - {Array(<SuperMap.Geometry.Point>/Number)} 设施点集合，一般为提供服务的服务设施位置，必设字段。
     * fromEvent - {Boolean} 是否从事件点到设施点进行查找。
     * isAnalyzeById - {Boolean} 事件点和设施点是否通过节点 ID 号来指定，默认为 false，即通过坐标点指定事件点和设施点。
     * maxWeight - {Number} 查找半径。单位与该类中 parameter 字段（交通网络分析通用参数）中设置的耗费字段一致。默认值为0，表示查找全网络。
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
        me.event = null;
        me.expectFacilityCount = null;
        me.facilities = null;
        me.fromEvent = null;
        me.isAnalyzeById = null;
        me.maxWeight = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindClosestFacilitiesParameters"
}); 