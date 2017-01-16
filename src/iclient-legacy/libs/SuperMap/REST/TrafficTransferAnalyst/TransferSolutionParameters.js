/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 *@requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.TransferSolutionParameters
 * 交通换乘方案查询参数类。 
 */
SuperMap.REST.TransferSolutionParameters = SuperMap.Class({
    /** 
     * APIProperty: solutionCount
     * {Number} 乘车方案的数量。默认为6。
     */
    solutionCount: 6,
    
    /** 
     * APIProperty: transferPreference
     * {<SuperMap.REST.TransferPreference>} 乘车偏好枚举。默认为SuperMap.REST.TransferPreference.NONE
     */
    transferPreference: SuperMap.REST.TransferPreference.NONE,
    
    /** 
     * APIProperty: transferTactic
     * {<SuperMap.REST.TransferTactic>} 交通换乘策略类型，包括时间最短、距离最短、最少换乘、
     * 最少步行四种选择。默认为SuperMap.REST.TransferTactic.LESS_TIME
     */
    transferTactic: SuperMap.REST.TransferTactic.LESS_TIME,
    
    /** 
     * APIProperty: walkingRatio
     * {Number} 步行与公交的消耗权重比，默认值为 10。此值越大，则步行因素对于方案选择的影响越大。例如：
     * 例如现在有两种换乘方案（在仅考虑消耗因素的情况下）： 
     * 方案1：坐车10公里，走路1公里； 
     * 方案2：坐车15公里，走路0.5公里； 
     * 1. 假设权重比为15： 
     * •方案1的总消耗为：10 + 1*15 = 25
     * •方案2的总消耗为：15 + 0.5*15 = 22.5
     * 此时方案2消耗更低。 
     * 2. 假设权重比为2： 
     * •方案1的总消耗为：10+1*2 = 12
     * •方案2的总消耗为：15+0.5*2 = 17
     * 此时方案1消耗更低。 
     */
    walkingRatio: null,
    
    /** 
     * APIProperty: points
     * {Array(String) or Array(Object)} 两种查询方式： 
     *           1. 按照公交站点的起止ID进行查询，则points参数的类型为int[]，形如：[起点ID、终点ID]，
     * 公交站点的ID对应服务提供者配置中的站点ID字段；
     *           2. 按照起止点的坐标进行查询，则points参数的类型为Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
     */
    points: false,

    /**
     * APIProperty: evadeLines
     * {Array(Number)} 避让路线ID。
     * */
    evadeLines: null,

    /**
     * APIProperty: evadeStops
     * {Array(Number)} 避让站点ID。
     * */
    evadeStops: null,

    /**
     * APIProperty: priorLines
     * {Array(Number)} 优先路线ID。
     * */
    priorLines: null,

    /**
     * APIProperty: priorStops
     * {Array(Number)} 优先站点ID。
     * */
    priorStops: null,

    /**
     * APIProperty: travelTime
     * {String} 出行的时间； 格式是："小时:分钟"，如："08:30"。如果设置了该参数，在分析时，则会考虑线路的首末班车时间的限制，即在返回的结果中会提示公交的首末班发车时间。
     */
    travelTime: null,

    /**
     * Constructor: SuperMap.REST.TransferSolutionParameters
     * 交通换乘方案查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * solutionCount - {Boolean} 乘车方案的数量。默认为6。
     * transferTactic - {<SuperMap.REST.TransferTactic>} 交通换乘策略类型，
     * 包括时间最短、距离最短、最少换乘、最少步行四种选择。
     * transferPreference - {<SuperMap.REST.TransferPreference>} 乘车偏好枚举。
     * walkingRatio - {Array(Number)} 步行与公交的消耗权重比，默认值为 10。
     * points - {Array(Number)} 两种查询方式：按照公交站点的起止ID进行查询和按照起止点的坐标进行查询。
     * evadeLines - {Array(Number)} 避让路线的ID，默认为null。
     * evadeStops - {Array(Number)} 避让站点的ID，默认为null。
     * priorLines - {Array(Number)} 优先路线的ID，默认为null。
     * priorStops - {Array(Number)} 优先站点的ID，默认为null。
     * travelTime - {String} 出行的时间。
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        SuperMap.Util.reset(this);
    },
    
    CLASS_NAME:"SuperMap.REST.TransferSolutionParameters"
});
/**
 * Function: SuperMap.REST.TransferSolutionParameters.toJsonParameters
 * 将 <SuperMap.REST.TransferSolutionParameters> 对象参数转换为 json 字符串。 
 *
 * Parameters:
 * params - {<SuperMap.REST.TransferSolutionParameters>} 交通换乘参数。 
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.REST.TransferSolutionParameters.toJson = function(params) {
    if(params) {
        return SuperMap.Util.toJSON(params);
    }
};
