import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindPathParameters} from './FindPathParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class SuperMap.FindPathService
 * @category  iServer NetworkAnalyst Path
 * @classdesc 最佳路径分析服务类。<br>
 *               最佳路径是在网络数据集中指定一些节点，按照节点的选择顺序，<br>
 *               顺序访问这些节点从而求解起止点之间阻抗最小的路经。<br>
 *               该类负责将客户端指定的最佳路径分析参数传递给服务端，并接收服务端返回的结果数据。<br>
 *               最佳路径分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * var myFindPathService = new SuperMap.FindPathService(url, {
 *     eventListeners: {
 *	       "processCompleted": findPathCompleted,
 *		   "processFailed": findPathError
 *		   }
 * });
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *               例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FindPathService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindPathService";
    }

    /**
     * @function SuperMap.FindPathService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FindPathService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FindPathParameters} 最佳路径分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindPathParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "path" : "/path") + ".json?";
        jsonObject = {
            hasLeastEdgeCount: params.hasLeastEdgeCount,
            parameter: Util.toJSON(params.parameter),
            nodes: me.getJson(params.isAnalyzeById, params.nodes)
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
     * @function SuperMap.FindPathService.prototype.getJson
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
        if (!result || !result.pathList || result.pathList.length < 1) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        result.pathList.forEach(function (path) {
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
    }

}

SuperMap.FindPathService = FindPathService;