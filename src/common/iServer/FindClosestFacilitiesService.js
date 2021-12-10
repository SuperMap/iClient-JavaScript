/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {GeoJSON} from '../format/GeoJSON';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindClosestFacilitiesParameters} from './FindClosestFacilitiesParameters';

/**
 * @class FindClosestFacilitiesService
 * @deprecatedclass SuperMap.FindClosestFacilitiesService
 * @category  iServer NetworkAnalyst ClosestFacility
 * @classdesc 最近设施分析服务类。
 *            最近设施分析是指在网络上给定一个事件点和一组设施点，
 *            查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *            该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 *            最近设施分析结果通过该类支持的事件的监听函数参数获取
 * @extends {NetworkAnalystServiceBase}
 * @example
 * var myfindClosestFacilitiesService = new FindClosestFacilitiesService(url, {
 *     eventListeners: {
 *	       "processCompleted": findClosestFacilitiesCompleted,
 *		   "processFailed": findClosestFacilitiesError
 *		   }
 * });
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FindClosestFacilitiesService extends NetworkAnalystServiceBase {
    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindClosestFacilitiesService";
    }

    /**
     * @function FindClosestFacilitiesService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FindClosestFacilitiesService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FindClosestFacilitiesParameters} params - 最近设施分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindClosestFacilitiesParameters)) {
            return;
        }
        var me = this,
            jsonObject;
        me.url = Util.urlPathAppend(me.url, 'closestfacility');
        jsonObject = {
            expectFacilityCount: params.expectFacilityCount,
            fromEvent: params.fromEvent,
            maxWeight: params.maxWeight,
            parameter: Util.toJSON(params.parameter),
            event: Util.toJSON(params.event),
            facilities: me.getJson(params.isAnalyzeById, params.facilities)
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function FindClosestFacilitiesService.prototype.getJson
     * @description 将对象转化为JSON字符串。
     * @param {boolean} isAnalyzeById - 是否通过ID来分析
     * @param {Array} params - 分析参数数组
     * @returns {Object} 转化后的JSON字符串。
     */
    getJson(isAnalyzeById, params) {
        var jsonString = "[",
            len = params ? params.length : 0;

        if (isAnalyzeById === false) {
            for (let i = 0; i < len; i++) {
                if (i > 0) {
                    jsonString += ",";
                }
                jsonString += '{"x":' + params[i].x + ',"y":' + params[i].y + '}';
            }
        } else if (isAnalyzeById === true) {
            for (let i = 0; i < len; i++) {
                if (i > 0) {
                    jsonString += ",";
                }
                jsonString += params[i];
            }
        }
        jsonString += ']';
        return jsonString;
    }

    /**
     * @function FindClosestFacilitiesService.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result || !result.facilityPathList) {
            return result;
        }

        var geoJSONFormat = new GeoJSON();
        result.facilityPathList.map(function (path) {
            if (path.route) {
                path.route = geoJSONFormat.toGeoJSON(path.route);
            }
            if (path.pathGuideItems) {
                path.pathGuideItems = geoJSONFormat.toGeoJSON(path.pathGuideItems);

            }
            if (path.edgeFeatures) {
                path.edgeFeatures = geoJSONFormat.toGeoJSON(path.edgeFeatures);
            }
            if (path.nodeFeatures) {
                path.nodeFeatures = geoJSONFormat.toGeoJSON(path.nodeFeatures);
            }
            return path;
        });
        return result;
    }

}
