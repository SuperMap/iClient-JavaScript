/**
 * Class: SuperMap.ThemeService
 * 专题图服务类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./ThemeParameters');
var SuperMap = require('../SuperMap');
SuperMap.ThemeService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constructor: SuperMap.ThemeService
     * 专题图服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myThemeService = new SuperMap.ThemeService(url, {
     *     eventListeners: {
     *           "processCompleted": themeCompleted,
     *           "processFailed": themeFailed
     *           }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var end,
            me = this;
        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? "tempLayersSet.json?" : "/tempLayersSet.json?";
        } else {
            me.url += (end === "/") ? "tempLayersSet.jsonp?" : "/tempLayersSet.jsonp?";
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的专题图参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.ThemeParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            jsonParameters = null;
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: getJsonParameters
     * 将专题图参数参数转化为 JSON 字符串。
     *
     * Parameters:
     * params - {<SuperMap.ThemeParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function (parameter) {
        var jsonParameters = "",
            themeType = "",
            themeObj = null,
            filters = null,
            orderBys = null,
            fieldValuesDisplayFilter;
        jsonParameters += "[{'type': 'UGC','subLayers': {'layers': [";
        for (var themeID in parameter.themes) {
            themeObj = parameter.themes[themeID];
            var jsonTheme = SuperMap.Util.toJSON(themeObj);
            jsonTheme = jsonTheme.slice(0, -1);

            jsonParameters += "{'theme': " + jsonTheme + "},'type': 'UGC','ugcLayerType': 'THEME',";
            filters = parameter.displayFilters;
            if (filters && filters.length > 0) {
                if (filters.length === 1) {
                    jsonParameters += "'displayFilter':\"" + filters[0] + "\",";
                } else {
                    jsonParameters += "'displayFilter':\"" + filters[themeID] + "\",";
                }
            }
            orderBys = parameter.displayOrderBy;
            if (orderBys && orderBys.length > 0) {
                if (orderBys.length === 1) {
                    jsonParameters += "'displayOrderBy':'" + orderBys[0] + "',";
                } else {
                    jsonParameters += "'displayOrderBy':'" + orderBys[themeID] + "',";
                }
            }

            fieldValuesDisplayFilter = parameter.fieldValuesDisplayFilter;
            if (fieldValuesDisplayFilter) {
                jsonParameters += "'fieldValuesDisplayFilter':" + SuperMap.Util.toJSON(fieldValuesDisplayFilter) + ",";
            }

            if (parameter.joinItems && parameter.joinItems.length > 0 && parameter.joinItems[themeID]) {
                jsonParameters += "'joinItems':[" + SuperMap.Util.toJSON(parameter.joinItems[themeID]) + "],";
            }
            if (parameter.datasetNames && parameter.dataSourceNames) {
                var datasetID = parameter.datasetNames[themeID] ? themeID : (parameter.datasetNames.length - 1);
                var dataSourceID = parameter.dataSourceNames[themeID] ? themeID : (parameter.dataSourceNames.length - 1);
                jsonParameters += "'datasetInfo': {'name': '" + parameter.datasetNames[datasetID] +
                    "','dataSourceName': '" + parameter.dataSourceNames[dataSourceID] + "'}},";
            } else {
                jsonParameters += "},";
            }
        }
        //去除多余的逗号
        if (parameter.themes && parameter.themes.length > 0) {
            jsonParameters = jsonParameters.substring(0, jsonParameters.length - 1);
        }
        jsonParameters += "]},";
        var urlArray = this.url.split("/");
        var jsonMapName = urlArray[urlArray.length - 2];

        jsonParameters += "'name': '" + jsonMapName + "'}]";
        return jsonParameters;
    },

    CLASS_NAME: "SuperMap.ThemeService"
});
module.exports = SuperMap.ThemeService;