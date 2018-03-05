import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindMTSPPathsParameters} from './FindMTSPPathsParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.FindMTSPPathsService
 * @category  iServer NetworkAnalyst MTSPPath
 * @classdesc 多旅行商分析服务类<br>
 *               多旅行商分析也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。<br>
 *               查找经济有效的配送路径，并给出相应的行走路线。<br>
 *               物流配送功能就是解决如何合理分配配送次序和送货路线，使配送总花费达到最小或每个配送中心的花费达到最小。<br>
 *               该类负责将客户端指定的多旅行商分析参数传递给服务端，并接收服务端返回的结果数据。<br>
 *               多旅行商分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * var myFindMTSPPathsService = new SuperMap.FindMTSPPathsService(url, {
 *     eventListeners: {
 *         "processCompleted": findMTSPPathsCompleted,
 *		   "processFailed": findMTSPPathsError
 *		   }
 * });
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FindMTSPPathsService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindMTSPPathsService";
    }

    /**
     * @function SuperMap.FindMTSPPathsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FindMTSPPathsService..prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FindMTSPPathsParameters} 多旅行商分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindMTSPPathsParameters)) {
            return;
        }
        var me = this, jsonObject,
            //end = me.url.substr(me.url.length - 1, 1),
            centers = me.getJson(params.isAnalyzeById, params.centers),
            nodes = me.getJson(params.isAnalyzeById, params.nodes);
        me.url = me.url + "/mtsppath" + ".json?";
        jsonObject = {
            centers: centers,
            nodes: nodes,
            parameter: Util.toJSON(params.parameter),
            hasLeastTotalCost: params.hasLeastTotalCost
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
     * @function SuperMap.FindMTSPPathsService.prototype.getJson
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
     * @function SuperMap.FindMTSPPathsService.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result || !result.pathList) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        result.pathList.map(function (path) {
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

SuperMap.FindMTSPPathsService = FindMTSPPathsService;