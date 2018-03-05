import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindServiceAreasParameters} from './FindServiceAreasParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.FindServiceAreasService
 * @category  iServer NetworkAnalyst ServiceArea
 * @classdesc 服务区分析服务类。<br>
 *               服务区分析是以指定服务站点为中心，<br>
 *               在一定服务范围内查找网络上服务站点能够提供服务的区域范围。<br>
 *               该类负责将客户端指定的服务区分析参数传递给服务端，并接收服务端返回的结果数据。<br>
 *               服务区分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * var myFindServiceAreasService = new SuperMap.FindServiceAreasService(url, {
 *          eventListeners: {
 *              "processCompleted": findServiceAreasCompleted,
 *              "processFailed": findServiceAreasError
 *          }
 * });
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象
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
     * @param params - {SuperMap.FindServiceAreasParameters} 服务区分析服务参数类
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
     * @param isAnalyzeById - {boolean} 是否通过id分析
     * @param params - {Array} 需要转换的数字
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
     * @function SuperMap.FindServiceAreasService.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。。
     */
    toGeoJSONResult(result) {
        if (!result || !result.serviceAreaList) {
            return result;
        }
        var geoJSONFormat = new GeoJSON();
        result.serviceAreaList.map(function (serviceArea) {
            if (serviceArea.serviceRegion) {
                serviceArea.serviceRegion = JSON.parse(geoJSONFormat.write(serviceArea.serviceRegion));
            }
            if (serviceArea.edgeFeatures) {
                serviceArea.edgeFeatures = JSON.parse(geoJSONFormat.write(serviceArea.edgeFeatures));
            }
            if (serviceArea.nodeFeatures) {
                serviceArea.nodeFeatures = JSON.parse(geoJSONFormat.write(serviceArea.nodeFeatures));
            }
            if (serviceArea.routes) {
                serviceArea.routes = JSON.parse(geoJSONFormat.write(serviceArea.routes));
            }
            return serviceArea;
        });

        return result;
    }

}

SuperMap.FindServiceAreasService = FindServiceAreasService;