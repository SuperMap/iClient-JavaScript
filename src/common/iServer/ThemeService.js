/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {ThemeParameters} from './ThemeParameters';

/**
 * @class ThemeService
 * @deprecatedclass SuperMap.ThemeService
 * @category  iServer Map Theme
 * @classdesc 专题图服务类。
 * @extends {CommonServiceBase}
 * @example
 * var myThemeService = new ThemeService(url, {
 *     eventListeners: {
 *           "processCompleted": themeCompleted,
 *           "processFailed": themeFailed
 *           }
 * });
 * @param {string} url - 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class ThemeService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.url = Util.urlPathAppend(this.url, 'tempLayersSet');
        this.CLASS_NAME = 'SuperMap.ThemeService';
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function ThemeService.prototype.processAsync
     * @description 负责将客户端的专题图参数传递到服务端。
     * @param {ThemeParameters} params - 专题图参数类。
     */
    processAsync(params) {
        if (!(params instanceof ThemeParameters)) {
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
    }

    /**
     * @function ThemeService.prototype.getJsonParameters
     * @description 将专题图参数参数转化为 JSON 字符串。
     * @param {ThemeParameters} parameter - 专题图参数类。
     * @returns {Object} 转化后的JSON字符串。
     */
    getJsonParameters(parameter) {
        var jsonParameters = "",
            themeObj = null,
            filters = null,
            orderBys = null,
            fieldValuesDisplayFilter;
        jsonParameters += "[{'type': 'UGC','subLayers': {'layers': [";

        for (var i = 0; i < parameter.themes.length; i++) {
            themeObj = parameter.themes[i];
            var jsonTheme = Util.toJSON(themeObj);
            jsonTheme = jsonTheme.slice(0, -1);

            jsonParameters += "{'theme': " + jsonTheme + "},'type': 'UGC','ugcLayerType': 'THEME',";
            filters = parameter.displayFilters;
            if (filters && filters.length > 0) {
                if (filters.length === 1) {
                    jsonParameters += "'displayFilter':\"" + filters[0] + "\",";
                } else {
                    jsonParameters += "'displayFilter':\"" + filters[i] + "\",";
                }
            }
            orderBys = parameter.displayOrderBy;
            if (orderBys && orderBys.length > 0) {
                if (orderBys.length === 1) {
                    jsonParameters += "'displayOrderBy':'" + orderBys[0] + "',";
                } else {
                    jsonParameters += "'displayOrderBy':'" + orderBys[i] + "',";
                }
            }

            fieldValuesDisplayFilter = parameter.fieldValuesDisplayFilter;
            if (fieldValuesDisplayFilter) {
                jsonParameters += "'fieldValuesDisplayFilter':" + Util.toJSON(fieldValuesDisplayFilter) + ",";
            }

            if (parameter.joinItems && parameter.joinItems.length > 0 && parameter.joinItems[i]) {
                jsonParameters += "'joinItems':[" + Util.toJSON(parameter.joinItems[i]) + "],";
            }
            if (parameter.datasetNames && parameter.dataSourceNames) {
                var datasetID = parameter.datasetNames[i] ? i : (parameter.datasetNames.length - 1);
                var dataSourceID = parameter.dataSourceNames[i] ? i : (parameter.dataSourceNames.length - 1);
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
    }

}
