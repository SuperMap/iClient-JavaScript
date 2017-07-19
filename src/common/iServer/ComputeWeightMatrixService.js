/**
 * Class: SuperMap.ComputeWeightMatrixService
 * 耗费矩阵分析服务类。
 * 耗费矩阵是根据交通网络分析参数中的耗费字段来计算一个二维数组，
 * 用来存储指定的任意两点间的资源消耗。
 * 耗费矩阵分析结果通过该类支持的事件的监听函数参数获取
 * Inherits from:
 *  - <SuperMap.NetworkAnalystServiceBase>
 */
require('./NetworkAnalystServiceBase');
require('./ComputeWeightMatrixParameters');
var SuperMap = require('../SuperMap');
SuperMap.ComputeWeightMatrixService = SuperMap.Class(SuperMap.NetworkAnalystServiceBase, {

    /**
     * Constructor: SuperMap.ComputeWeightMatrixService
     * 耗费矩阵分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var mycomputeWeightMatrixService = new SuperMap.ComputeWeightMatrixService(url,{
     *     eventListeners: {
     *	       "processCompleted": computeWeightMatrixCompleted, 
     *		   "processFailed": computeWeightMatrixnError
     *		   }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 耗费矩阵分析服务地址。请求服务的URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */

    initialize: function (url, options) {
        SuperMap.NetworkAnalystServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.NetworkAnalystServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<ComputeWeightMatrixParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "weightmatrix" : "/weightmatrix") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            parameter: SuperMap.Util.toJSON(params.parameter),
            nodes: me.getJson(params.isAnalyzeById, params.nodes)
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: getJson
     * 将对象转化为JSON字符串。
     *
     * Parameters:
     * isAnalyzeById - {Boolean}
     * params - {Array}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJson: function (isAnalyzeById, params) {
        var jsonString = "[",
            len = params ? params.length : 0;

        if (isAnalyzeById === false) {
            for (var i = 0; i < len; i++) {
                if (i > 0) jsonString += ",";
                jsonString += '{"x":' + params[i].x + ',"y":' + params[i].y + '}';
            }
        } else if (isAnalyzeById == true) {
            for (var i = 0; i < len; i++) {
                if (i > 0) jsonString += ",";
                jsonString += params[i];
            }
        }
        jsonString += ']';
        return jsonString;
    },

    CLASS_NAME: "SuperMap.ComputeWeightMatrixService"
});

module.exports = SuperMap.ComputeWeightMatrixService;