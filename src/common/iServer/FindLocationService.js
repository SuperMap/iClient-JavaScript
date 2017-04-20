/**
 * Class: SuperMap.REST.FindLocationService
 * 选址分区分析服务类。
 * 选址分区分析是为了确定一个或多个待建设施的最佳或最优位置，使得设施可以用一种最经济有效的方式为需求方提供服务或者商品。
 * 选址分区不仅仅是一个选址过程，还要将需求点的需求分配到相应的新建设施的服务区中，因此称之为选址与分区。
 * 选址分区分析结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.REST.NetworkAnalystServiceBase>
 */
require('./NetworkAnalystServiceBase');
require('./FindLocationParameters');
SuperMap.REST.FindLocationService = SuperMap.Class(SuperMap.REST.NetworkAnalystServiceBase, {

    /**
     * Constructor: SuperMap.REST.FindLocationService
     * 选址分区分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var findLocationService = new SuperMap.REST.FindLocationService(url, {
     *     eventListeners: {
     *         "processCompleted": findLocationCompleted, 
     *		   "processFailed": findLocationError
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
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.FindLocationParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "location" : "/location") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            isFromCenter: params.isFromCenter,
            expectedSupplyCenterCount: params.expectedSupplyCenterCount,
            weightName: params.weightName,
            turnWeightField: params.turnWeightField,
            returnEdgeFeature: true,
            returnEdgeGeometry: true,
            returnNodeFeature: true,
            mapParameter: SuperMap.Util.toJSON(params.mapParameter),
            supplyCenters: me.getCentersJson(params.supplyCenters)
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
     * Method: getCentersJson
     * 将数组对象转化为JSON字符串。
     *
     * Parameters:
     * params - {Array}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getCentersJson: function (params) {
        var json = "[",
            len = params ? params.length : 0;
        for (var i = 0; i < len; i++) {
            if (i > 0) json += ",";
            json += SuperMap.Util.toJSON(params[i]);
        }
        json += "]";
        return json;
    },
    /**
     * Method: toGeoJSONResult
     * 将含有geometry的数据转换为geojson格式。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult: function (result) {
        if (!result) {
            return null;
        }
        var analystResult = {};
        var geoJSONFormat = new SuperMap.Format.GeoJSON();
        if (result.demandResults) {
            analystResult.demandResults = JSON.parse(geoJSONFormat.write(result.demandResults));
        }
        if (result.supplyResults) {
            analystResult.supplyResults = JSON.parse(geoJSONFormat.write(result.supplyResults)); }

        return analystResult;
    },

    CLASS_NAME: "SuperMap.REST.FindLocationService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.FindLocationService(url, options);
};