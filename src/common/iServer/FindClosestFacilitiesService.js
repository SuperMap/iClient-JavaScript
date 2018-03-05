import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {GeoJSON} from '../format/GeoJSON';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindClosestFacilitiesParameters} from './FindClosestFacilitiesParameters';

/**
 * @class SuperMap.FindClosestFacilitiesService
 * @category  iServer NetworkAnalyst ClosestFacility
 * @classdesc 最近设施分析服务类。<br>
 *               最近设施分析是指在网络上给定一个事件点和一组设施点，
 *               查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *               该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 *              最近设施分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * var myfindClosestFacilitiesService = new SuperMap.FindClosestFacilitiesService(url, {
 *     eventListeners: {
 *	       "processCompleted": findClosestFacilitiesCompleted,
 *		   "processFailed": findClosestFacilitiesError
 *		   }
 * });
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FindClosestFacilitiesService extends NetworkAnalystServiceBase {

    /*
     * @function SuperMap.FindClosestFacilitiesService.prototype.constructor
     * @description 最近设施分析服务类构造函数。
     * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
     *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
     *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindClosestFacilitiesService";
    }

    /**
     * @function SuperMap.FindClosestFacilitiesService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FindClosestFacilitiesService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FindClosestFacilitiesParameters} 最近设施分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindClosestFacilitiesParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "closestfacility" : "/closestfacility") + ".json?";
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
     * @function SuperMap.FindClosestFacilitiesService.prototype.getJson
     * @description 将对象转化为JSON字符串。
     * @param isAnalyzeById - {boolean} 是否通过ID来分析
     * @param params - {Array} 分析参数数组
     * @return {Object} 转化后的JSON字符串。
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
        } else if (isAnalyzeById == true) {
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
     * @function SuperMap.FindClosestFacilitiesService.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result || !result.facilityPathList) {
            return result;
        }

        var geoJSONFormat = new GeoJSON();
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
            return path;
        });
        return result;
    }

}

SuperMap.FindClosestFacilitiesService = FindClosestFacilitiesService;