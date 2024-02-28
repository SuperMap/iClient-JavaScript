/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FindMTSPPathsParameters} from './FindMTSPPathsParameters';
import {GeoJSON} from '../format/GeoJSON';

/**
 * @class FindMTSPPathsService
 * @deprecatedclass SuperMap.FindMTSPPathsService
 * @category  iServer NetworkAnalyst MTSPPath
 * @classdesc 多旅行商分析服务类
 *            多旅行商分析也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。
 *            查找经济有效的配送路径，并给出相应的行走路线。
 *            物流配送功能就是解决如何合理分配配送次序和送货路线，使配送总花费达到最小或每个配送中心的花费达到最小。
 *            该类负责将客户端指定的多旅行商分析参数传递给服务端，并接收服务端返回的结果数据。
 *            多旅行商分析结果通过该类支持的事件的监听函数参数获取。
 * @extends {NetworkAnalystServiceBase}
 * @example
 * var myFindMTSPPathsService = new FindMTSPPathsService(url);
 * @param {string} url - 服务地址。请求网络分析服务，URL 应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 互服务时所需可选参数。如：
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FindMTSPPathsService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FindMTSPPathsService";
    }

    /**
     * @function FindMTSPPathsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FindMTSPPathsService..prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FindMTSPPathsParameters} params - 多旅行商分析服务参数类
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof FindMTSPPathsParameters)) {
            return;
        }
        var me = this,
            jsonObject,
            //end = me.url.substr(me.url.length - 1, 1),
            centers = me.getJson(params.isAnalyzeById, params.centers),
            nodes = me.getJson(params.isAnalyzeById, params.nodes);
        me.url = Util.urlPathAppend(me.url, 'mtsppath');
        jsonObject = {
            centers: centers,
            nodes: nodes,
            parameter: Util.toJSON(params.parameter),
            hasLeastTotalCost: params.hasLeastTotalCost
        };
        return me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: callback,
            failure: callback
        });
    }

    /**
     * @function FindMTSPPathsService.prototype.getJson
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
        if (!result || !result.pathList) {
            return null;
        }
        var geoJSONFormat = new GeoJSON();
        result.pathList.map(function (path) {
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
