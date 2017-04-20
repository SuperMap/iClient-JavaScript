/**
 * Class: SuperMap.REST.UpdateEdgeWeightService
 *  更新边的边的耗费权重服务
 */
require('./NetworkAnalystServiceBase');
require('./UpdateEdgeWeightParameters');
SuperMap.REST.UpdateEdgeWeightService = SuperMap.Class(SuperMap.REST.NetworkAnalystServiceBase, {

    /**
     * Constructor: SuperMap.REST.UpdateEdgeWeightService
     * 更新边的边的耗费权重服务类构造函数。
     *
     * 例如：
     * (start code)
     * var updateEdgeWeightService = new SuperMap.REST.UpdateEdgeWeightService(url, {
     *     eventListeners: {
     *         "processCompleted": UpdateEdgeWeightCompleted,      //参数为SuperMap.REST.UpdateEdgeWeightEventArgs
     *		   "processFailed": UpdateEdgeWeightError             //参数为SuperMap.ServiceFailedEventArgs
     *		   }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.REST.NetworkAnalystServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.NetworkAnalystServiceBase.prototype.destroy.apply(this, arguments);
    },


    /**
     * APIMethod: processAsync
     * 开始异步执行边的边的耗费权重的更新
     * Parameters:
     * params - {SuperMapUpdateEdgeWeightParameters} 更新服务参数
     *
     * 例如:
     * (code)
     *  var updateEdgeWeightParam=new SuperMapUpdateEdgeWeightParameters({
      *          edgeId:"20",
      *          fromNodeId:"26",
      *          toNodeId:"109",
      *          weightField:"time",
      *          edgeWeight:"25"
      *      });
     *  updateEdgeWeightService.processAsync(updateEdgeWeightParam);
     * (end)
     *
     **/
    processAsync: function (params) {
        if (!params) {
            return;
        }

        var me = this, end = me.url.substr(me.url.length - 1, 1);
        var paramStr = me.parse(params);
        if (end === "/") {
            me.url.splice(me.url.length - 1, 1);
        }
        me.url = me.url + paramStr + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        var data = params.edgeWeight ? params.edgeWeight : null;
        me.request({
            method: "PUT",
            scope: me,
            data: data,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: parse
     * 将更新服务参数解析为用‘/’做分隔的字符串
     * */
    parse: function (params) {
        if (!params) {
            return;
        }
        var paramStr = "";
        for (var attr in params) {
            if (params[attr] === "" || params[attr] === "edgeWeight")continue;
            switch (attr) {
                case "edgeId":
                    paramStr += "/edgeweight/" + params[attr];
                    break;
                case "fromNodeId":
                    paramStr += "/fromnode/" + params[attr];
                    break;
                case "toNodeId":
                    paramStr += "/tonode/" + params[attr];
                    break;
                case "weightField":
                    paramStr += "/weightfield/" + params[attr];
                    break;
                default :
                    break;
            }
        }
        return paramStr;
    },

    CLASS_NAME: "SuperMap.REST.UpdateEdgeWeightService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.UpdateEdgeWeightService(url, options);
};