/**
 * Class: SuperMap.TransferPathParameters
 * 交通换乘线路查询参数类。
 */
require('../Base');
require('./TransferLine');
SuperMap.TransferPathParameters = SuperMap.Class({
    /**
     * APIProperty: transferLines
     * {Array(<SuperMap.TransferLine>)} 本换乘分段内可乘车的路线集合，通过交通换乘方案查询得到
     */
    transferLines: null,

    /**
     * APIProperty: points
     * {Array(String) or Array(Object)} 两种查询方式：
     *           1. 按照公交站点的起止ID进行查询，则points参数的类型为int[]，形如：[起点ID、终点ID]，
     * 公交站点的ID对应服务提供者配置中的站点ID字段；
     *           2. 按照起止点的坐标进行查询，则points参数的类型为Point2D[]，形如：[{"x":44,"y":39},{"x":45,"y":40}]。
     */
    points: false,

    /**
     * Constructor: SuperMap.TransferPathParameters
     * 交通换乘线路查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * transferLines - {Array(<SuperMap.TransferLine>)} 本换乘分段内可乘车的路线集合。
     * points - {Array(Integer)} 两种查询方式：按照公交站点的起止ID进行查询和按照起止点的坐标进行查询。
     */
    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.Util.reset(this);
    },

    CLASS_NAME: "SuperMap.TransferPathParameters"
});
/**
 * Function: SuperMap.TransferPathParameters.toJson
 * 将 <SuperMap.TransferPathParameters> 对象参数转换为 json 字符串。
 *
 * Parameters:
 * params - {<SuperMap.TransferPathParameters>} 交通换乘参数。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.TransferPathParameters.toJson = function (params) {
    if (params) {
        return SuperMap.Util.toJSON(params);
    }
};

module.exports = function (options) {
    return new SuperMap.TransferPathParameters(options);
};