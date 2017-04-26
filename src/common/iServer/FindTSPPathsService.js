/**
 * Class: SuperMap.REST.FindTSPPathsService
 * 旅行商分析服务类
 * 旅行商分析是路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
 * 旅行商分析也可以指定到达的终点，这时查找从起点能够遍历所有途经点最后到达终点，且花费最小的路径。
 * 该类负责将客户端指定的旅行商分析参数传递给服务端，并接收服务端返回的结果数据。
 * 旅行商分析结果通过该类支持的事件的监听函数参数获取
 * Inherits from:
 *  - <SuperMap.REST.NetworkAnalystServiceBase>
 */
require('./NetworkAnalystServiceBase');
require('./FindTSPPathsParameters');
SuperMap.REST.FindTSPPathsService = SuperMap.Class(SuperMap.REST.NetworkAnalystServiceBase, {

    /**
     * Constructor: SuperMap.REST.FindTSPPathsService
     * 最佳路径分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myFindTSPPathsService = new SuperMap.REST.FindTSPPathsService(url, {
     *     eventListeners: {
     *	      "processCompleted": findTSPPathsCompleted, 
     *		  "processFailed": findTSPPathsError
     *		  }
     *  });
     * (end)
     *
     * Parameters:
     * url - {String} 网络分析服务地址。请求网络分析服务，URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
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
     * 释放资源,将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.REST.NetworkAnalystServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.FindTSPPathsParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "tsppath" : "/tsppath") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            parameter: SuperMap.Util.toJSON(params.parameter),
            endNodeAssigned: params.endNodeAssigned,
            nodes: me.getNodesJson(params)
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
     * Method: getNodesJson
     * 将节点对象转化为JSON字符串。
     *
     * Parameters:
     * params - {<SuperMap.FindTSPPathsParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getNodesJson: function (params) {
        var jsonParameters = "", nodesString, i, len, nodes;
        if (params.isAnalyzeById === false) {
            for (nodesString = "[", i = 0, nodes = params.nodes, len = nodes.length; i < len; i++) {
                if (i > 0) nodesString += ",";
                nodesString += '{"x":' + nodes[i].x + ',"y":' + nodes[i].y + '}';
            }
            nodesString += ']';
            jsonParameters += nodesString;
        } else if (params.isAnalyzeById == true) {
            for (var nodeIDsString = "[", i = 0, nodes = params.nodes, len = nodes.length; i < len; i++) {
                if (i > 0) nodeIDsString += ",";
                nodeIDsString += nodes[i];
            }
            nodeIDsString += ']';
            jsonParameters += nodeIDsString;
        }
        return jsonParameters;
    },
    /**
     * Method: toGeoJSONResult
     * 将含有geometry的数据转换为geojson格式。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult: function (result) {
        if (!result || !result.tspPathList) {
            return null;
        }
        var geoJSONFormat = new SuperMap.Format.GeoJSON();
        result.tspPathList.forEach(function (path) {
            if (path.route) {
                path.route = JSON.parse(geoJSONFormat.write(path.route));
            }
            if (path.pathGuideItems) {
                path.pathGuideItems = JSON.parse(geoJSONFormat.write(path.pathGuideItems));
            }
            if (path.edgeFeatures) {
                path.edgeFeatures = JSON.parse(geoJSONFormat.write(path.edgeFeatures));
            }
            if (path.nodeFeatures) {
                path.nodeFeatures = JSON.parse(geoJSONFormat.write(path.nodeFeatures));
            }
        });
        return result;
    },
    CLASS_NAME: "SuperMap.REST.FindTSPPathsService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.FindTSPPathsService(url, options);
};