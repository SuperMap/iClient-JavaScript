/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { FindTSPPathsParameters } from './FindTSPPathsParameters';
import { GeoJSON } from '../format/GeoJSON';

/**
 * @class FindTSPPathsService
 * @deprecatedclass SuperMap.FindTSPPathsService
 * @category  iServer NetworkAnalyst TSPPath
 * @classdesc 旅行商分析服务类
 *            旅行商分析是路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
 *            旅行商分析也可以指定到达的终点，这时查找从起点能够遍历所有途经点最后到达终点，且花费最小的路径。
 *            该类负责将客户端指定的旅行商分析参数传递给服务端，并接收服务端返回的结果数据。
 *            旅行商分析结果通过该类支持的事件的监听函数参数获取
 * @extends {NetworkAnalystServiceBase}
 * @example
 * (start code)
 * var myFindTSPPathsService = new FindTSPPathsService(url, {
 *     eventListeners: {
 *	      "processCompleted": findTSPPathsCompleted,
 *		  "processFailed": findTSPPathsError
 *		  }
 *  });
 * (end)
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FindTSPPathsService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindTSPPathsService";
    }

    /**
     * @function FindTSPPathsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FindTSPPathsService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FindTSPPathsParameters} params - 旅行商分析服务参数类。
     */
    processAsync(params) {
        if (!(params instanceof FindTSPPathsParameters)) {
            return;
        }
        var me = this, jsonObject;
        me.url = Util.urlPathAppend(me.url, 'tsppath');
        jsonObject = {
            parameter: Util.toJSON(params.parameter),
            endNodeAssigned: params.endNodeAssigned,
            nodes: me.getNodesJson(params)
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
     * @function FindTSPPathsService.prototype.getNodesJson
     * @description 将节点对象转化为JSON字符串。
     * @param {FindTSPPathsParameters} params - 旅行商分析服务参数类。
     * @returns {string} 转化后的JSON字符串。
     */
    getNodesJson(params) {
        var jsonParameters = "", nodesString, i, len, nodes;
        if (params.isAnalyzeById === false) {
            for (nodesString = "[", i = 0, nodes = params.nodes, len = nodes.length; i < len; i++) {
                if (i > 0) {
                    nodesString += ",";
                }
                nodesString += '{"x":' + nodes[i].x + ',"y":' + nodes[i].y + '}';
            }
            nodesString += ']';
            jsonParameters += nodesString;
        } else if (params.isAnalyzeById === true) {
            let nodeIDsString = "[", nodes = params.nodes, len = nodes.length;
            for (let i = 0; i < len; i++) {
                if (i > 0) {
                    nodeIDsString += ",";
                }
                nodeIDsString += nodes[i];
            }
            nodeIDsString += ']';
            jsonParameters += nodeIDsString;
        }
        return jsonParameters;
    }

    /**
     * @function FindTSPPathsService.prototype.toGeoJSONResult
     * @description 将含有 geometry 的数据转换为 GeoJSON 格式。
     * @param {Object} result - 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result || !result.tspPathList) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        result.tspPathList.forEach(function (path) {
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
