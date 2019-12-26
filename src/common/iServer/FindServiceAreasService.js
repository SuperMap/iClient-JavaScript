/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindServiceAreasParameters} from './FindServiceAreasParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.FindServiceAreasService
 * @category iServer NetworkAnalyst ServiceArea
 * @classdesc 服务区分析服务类。
 *            服务区分析是以指定服务站点为中心，
 *            在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
 *            该类负责将客户端指定的服务区分析参数传递给服务端，并接收服务端返回的结果数据。
 *            服务区分析结果通过该类支持的事件的监听函数参数获取
 * @extends {SuperMap.NetworkAnalystServiceBase}
 * @example
 * var myFindServiceAreasService = new SuperMap.FindServiceAreasService(url, {
 *          eventListeners: {
 *              "processCompleted": findServiceAreasCompleted,
 *              "processFailed": findServiceAreasError
 *          }
 * });
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 互服务时所需可选参数。如：
 * @param {Object} options.eventListeners - 需要被注册的监听器对象
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class FindServiceAreasService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindServiceAreasService";
    }

    /**
     * @function SuperMap.FindServiceAreasService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FindServiceAreasService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {SuperMap.FindServiceAreasParameters} params - 服务区分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindServiceAreasParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "servicearea" : "/servicearea") + ".json?";
        jsonObject = {
            isFromCenter: params.isFromCenter,
            isCenterMutuallyExclusive: params.isCenterMutuallyExclusive,
            parameter: Util.toJSON(params.parameter),
            centers: me.getJson(params.isAnalyzeById, params.centers),
            weights: me.getJson(true, params.weights)
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
     * @function SuperMap.FindServiceAreasService.prototype.getJson
     * @description 将对象转化为JSON字符串。
     * @param {boolean} isAnalyzeById - 是否通过id分析
     * @param {Array} params - 需要转换的数字
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
     * @function SuperMap.FindServiceAreasService.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。。
     */
    toGeoJSONResult(result) {
        if (!result || !result.serviceAreaList) {
            return result;
        }
        var geoJSONFormat = new GeoJSON();
        result.serviceAreaList.map(function (serviceArea) {
            if (serviceArea.serviceRegion) {
                serviceArea.serviceRegion = geoJSONFormat.toGeoJSON(serviceArea.serviceRegion);
            }
            if (serviceArea.edgeFeatures) {
                serviceArea.edgeFeatures = geoJSONFormat.toGeoJSON(serviceArea.edgeFeatures);
            }
            if (serviceArea.nodeFeatures) {
                serviceArea.nodeFeatures = geoJSONFormat.toGeoJSON(serviceArea.nodeFeatures);
            }
            if (serviceArea.routes) {
                serviceArea.routes = geoJSONFormat.toGeoJSON(serviceArea.routes);
            }
            return serviceArea;
        });

        return result;
    }

}

SuperMap.FindServiceAreasService = FindServiceAreasService;