/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import { DataFormat } from '@supermap/iclient-common/REST';
import { NetworkAnalystService as CommonNetworkAnalystService } from '@supermap/iclient-common/iServer/NetworkAnalystService';

/**
 * @class NetworkAnalystService
 * @deprecatedclassinstance L.supermap.networkAnalystService
 * @classdesc 网络分析服务类。
 * @category  iServer NetworkAnalyst
 * @modulecategory Services
 * @example
 * new NetworkAnalystService(url)
 *  .findPath(params,function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。请求网络分析服务，URL应为：
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}。<br>
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {ServiceBase}
 * @usage
 */
export var NetworkAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._networkAnalystService = new CommonNetworkAnalystService(url, options);
    },

    /**
     * @function NetworkAnalystService.prototype.burstPipelineAnalyst
     * @description 爆管分析服务：即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
     * @param {BurstPipelineAnalystParameters} params - 爆管分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    burstPipelineAnalyst: function (params, callback) {
      params = this._processParams(params);
      this._networkAnalystService.burstPipelineAnalyst(params, callback);
    },

    /**
     * @function NetworkAnalystService.prototype.computeWeightMatrix
     * @description 耗费矩阵分析服务：根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param {ComputeWeightMatrixParameters} params - 耗费矩阵分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    computeWeightMatrix: function (params, callback) {
      params = this._processParams(params);
      this._networkAnalystService.computeWeightMatrix(params, callback);
    },

    /**
     * @function NetworkAnalystService.prototype.findClosestFacilities
     * @description 最近设施分析服务：指在网络上给定一个事件点和一组设施点，查找从事件点到设施点（或从设施点到事件点）以最小耗费能到达的最佳路径。
     * @param {FindClosestFacilitiesParameters} params - 最近设施分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findClosestFacilities: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.findClosestFacilities(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.streamFacilityAnalyst
     * @description 上游/下游关键设施查找资源服务：查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param {FacilityAnalystStreamParameters} params - 上游/下游关键设施查找资源参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    streamFacilityAnalyst: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.streamFacilityAnalyst(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.findLocation
     * @description 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置。
     * @param {FindLocationParameters} params - 选址分区分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findLocation: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.findLocation(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.findPath
     * @description 最佳路径分析服务：在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param {FindPathParameters} params - 最佳路径分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findPath: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.findPath(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.findTSPPaths
     * @description 旅行商分析服务：路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param {FindTSPPathsParameters} params - 旅行商分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findTSPPaths: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.findTSPPaths(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.findMTSPPaths
     * @description 多旅行商分析服务：也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param {FindMTSPPathsParameters} params - 多旅行商分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findMTSPPaths: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.findMTSPPaths(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.findServiceAreas
     * @description 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param {FindServiceAreasParameters} params -  服务区分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findServiceAreas: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._networkAnalystService.findServiceAreas(params, callback, resultFormat);
    },

    /**
     * @function NetworkAnalystService.prototype.updateEdgeWeight
     * @description 更新边的耗费权重服务。
     * @param {UpdateEdgeWeightParameters} params - 更新边的耗费权重服务参数类。
     * @param {RequestCallback} callback -回调函数。
     */
    updateEdgeWeight: function (params, callback) {
      this._networkAnalystService.updateEdgeWeight(params, callback);
    },

    /**
     * @function NetworkAnalystService.prototype.updateTurnNodeWeight
     * @description 转向耗费权重更新服务。
     * @param {UpdateTurnNodeWeightParameters} params - 转向耗费权重更新服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    updateTurnNodeWeight: function (params, callback) {
      this._networkAnalystService.updateTurnNodeWeight(params, callback);
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }

        if (params.centers && L.Util.isArray(params.centers)) {
            params.centers.map(function (point, key) {
                params.centers[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
                return params.centers[key];
            });
        }

        if (params.nodes && L.Util.isArray(params.nodes)) {
            params.nodes.map(function (point, key) {
                params.nodes[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
                return params.nodes[key];
            });
        }

        if (params.event && params.event instanceof L.LatLng) {
            params.event = {x: params.event.lng, y: params.event.lat};
        }

        if (params.facilities && L.Util.isArray(params.facilities)) {
            params.facilities.map(function (point, key) {
                params.facilities[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
                return params.facilities[key];
            });
        }

        if (params.parameter && params.parameter.barrierPoints) {
            var barrierPoints = params.parameter.barrierPoints;
            if (L.Util.isArray(barrierPoints)) {
                barrierPoints.map(function (point, key) {
                    params.parameter.barrierPoints[key] = (point instanceof L.LatLng) ? {
                        x: point.lng,
                        y: point.lat
                    } : point;
                    return params.parameter.barrierPoints[key];
                });
            } else {
                params.parameter.barrierPoints = [(barrierPoints instanceof L.LatLng) ? {
                    x: barrierPoints.lng,
                    y: barrierPoints.lat
                } : barrierPoints];
            }
        }
        return params;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

});

export var networkAnalystService = function (url, options) {
    return new NetworkAnalystService(url, options);
};
