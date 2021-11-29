/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindPathParameters} from './FindPathParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class FindPathService
 * @deprecatedclass SuperMap.FindPathService
 * @category iServer NetworkAnalyst Path
 * @classdesc 最佳路径分析服务类。
 *            最佳路径是在网络数据集中指定一些节点，按照节点的选择顺序，
 *            顺序访问这些节点从而求解起止点之间阻抗最小的路经。
 *            该类负责将客户端指定的最佳路径分析参数传递给服务端，并接收服务端返回的结果数据。
 *            最佳路径分析结果通过该类支持的事件的监听函数参数获取
 * @extends {NetworkAnalystServiceBase}
 * @example
 * var myFindPathService = new FindPathService(url, {
 *     eventListeners: {
 *	       "processCompleted": findPathCompleted,
 *		   "processFailed": findPathError
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
export class FindPathService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindPathService";
    }

    /**
     * @function FindPathService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FindPathService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FindPathParameters} params - 最佳路径分析服务参数类
     */
    processAsync(params) {
        if (!(params instanceof FindPathParameters)) {
            return;
        }
        var me = this, jsonObject;
        me.url = Util.urlPathAppend(me.url, 'path');
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
     * @function FindPathService.prototype.getJson
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
     * @function FindMTSPPathsService.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result || !result.pathList || result.pathList.length < 1) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        result.pathList.forEach(function (path) {
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
        });
        return result;
    }

}
