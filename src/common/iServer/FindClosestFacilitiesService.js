/**
 * Class: SuperMap.REST.FindClosestFacilitiesService
 * 最近设施分析服务类。
 * 最近设施分析是指在网络上给定一个事件点和一组设施点，
 * 查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 * 该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 * 最近设施分析结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.REST.NetworkAnalystServiceBase>
 */
require('./NetworkAnalystServiceBase');
require('./FindClosestFacilitiesParameters');
SuperMap.REST.FindClosestFacilitiesService = SuperMap.Class(SuperMap.REST.NetworkAnalystServiceBase, {

    /**
     * Constructor: SuperMap.REST.FindClosestFacilitiesService
     * 最近设施分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myfindClosestFacilitiesService = new SuperMap.REST.FindClosestFacilitiesService(url, {
     *     eventListeners: {
     *	       "processCompleted": findClosestFacilitiesCompleted, 
     *		   "processFailed": findClosestFacilitiesError
     *		   }
     * });
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
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.REST.NetworkAnalystServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.FindClosestFacilitiesParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "closestfacility" : "/closestfacility") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            expectFacilityCount: params.expectFacilityCount,
            fromEvent: params.fromEvent,
            maxWeight: params.maxWeight,
            parameter: SuperMap.Util.toJSON(params.parameter),
            event: SuperMap.Util.toJSON(params.event),
            facilities: me.getJson(params.isAnalyzeById, params.facilities)
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
    /**
     * Method: toGeoJSONResult
     * 将含有geometry的数据转换为geojson格式。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult: function (result) {
        if (!result || !result.facilityPathList) {
            return result;
        }

        var geoJSONFormat = new SuperMap.Format.GeoJSON();
        result.facilityPathList.map(function (path) {
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

    CLASS_NAME: "SuperMap.REST.FindClosestFacilitiesService"
});
module.exports = function (url, options) {
    return new SuperMap.REST.FindClosestFacilitiesService(url, options);
};