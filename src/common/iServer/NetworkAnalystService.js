/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { DataFormat } from '../REST';
import { BurstPipelineAnalystService } from './BurstPipelineAnalystService';
import { ComputeWeightMatrixService } from './ComputeWeightMatrixService';
import { FacilityAnalystStreamService } from './FacilityAnalystStreamService';
import { TraceAnalystService } from './TraceAnalystService';
import { ConnectedEdgesAnalystService } from './ConnectedEdgesAnalystService';
import { FindClosestFacilitiesService } from './FindClosestFacilitiesService';
import { FindLocationService } from './FindLocationService';
import { FindMTSPPathsService } from './FindMTSPPathsService';
import { FindPathService } from './FindPathService';
import { FindServiceAreasService } from './FindServiceAreasService';
import { FindTSPPathsService } from './FindTSPPathsService';
import { UpdateEdgeWeightService } from './UpdateEdgeWeightService';
import { UpdateTurnNodeWeightService } from './UpdateTurnNodeWeightService';

/**
 * @class NetworkAnalystService
 * @category  iServer NetworkAnalyst
 * @classdesc 网络分析服务类。
 * @extends {ServiceBase}
 * @example
 * new NetworkAnalystService(url)
 *  .findPath(params,function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。请求网络分析服务，URL应为：</br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}。
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet"。
 * @param {Object} options - 参数。 
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class NetworkAnalystService {

    constructor(url, options) {
        this.url = url;
        this.options = options || {};
    }

    /**
     * @function NetworkAnalystService.prototype.burstPipelineAnalyst
     * @description 爆管分析服务:即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
     * @param {BurstPipelineAnalystParameters} params - 爆管分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    burstPipelineAnalyst(params, callback) {
        var me = this;
        var burstPipelineAnalystService = new BurstPipelineAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return burstPipelineAnalystService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.computeWeightMatrix
     * @description 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param {ComputeWeightMatrixParameters} params - 耗费矩阵分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    computeWeightMatrix(params, callback) {
        var me = this;
        var computeWeightMatrixService = new ComputeWeightMatrixService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return computeWeightMatrixService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findClosestFacilities
     * @description 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param {FindClosestFacilitiesParameters} params - 最近设施分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    findClosestFacilities(params, callback, resultFormat) {
        var me = this;
        var findClosestFacilitiesService = new FindClosestFacilitiesService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return findClosestFacilitiesService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.traceAnalyst
     * @description 上游/下游 追踪分析服务:查找给定弧段或节点的上游/下游弧段和结点。
     * @param {TraceAnalystParameters} params - 上游/下游 追踪分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
      traceAnalyst(params, callback, resultFormat) {
        var me = this;
        var traceAnalystService = new TraceAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return traceAnalystService.processAsync(params, callback);
      }
  
      /**
       * @function NetworkAnalystService.prototype.connectedEdgesAnalyst
       * @description 连通性分析服务。
       * @param {ConnectedEdgesAnalystParameters} params - 连通性分析服务参数类。
       * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
       * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
       * @returns {Promise} Promise 对象。
       */
      connectedEdgesAnalyst(params, callback, resultFormat) {
        var me = this;
        var connectedEdgesAnalystService = new ConnectedEdgesAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return connectedEdgesAnalystService.processAsync(params, callback);
      }

    /**
     * @function NetworkAnalystService.prototype.streamFacilityAnalyst
     * @description 上游/下游 关键设施查找资源服务：查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param {FacilityAnalystStreamParameters} params - 上游/下游 关键设施查找资源服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    streamFacilityAnalyst(params, callback, resultFormat) {
        var me = this;
        var facilityAnalystStreamService = new FacilityAnalystStreamService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return facilityAnalystStreamService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findLocation
     * @description 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置。
     * @param {FindLocationParameters} params - 选址分区分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    findLocation(params, callback, resultFormat) {
        var me = this;
        var findLocationService = new FindLocationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return findLocationService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findPath
     * @description 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param {FindPathParameters} params - 最佳路径分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    findPath(params, callback, resultFormat) {
        var me = this;
        var findPathService = new FindPathService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return findPathService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findTSPPaths
     * @description 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param {FindTSPPathsParameters} params - 旅行商分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    findTSPPaths(params, callback, resultFormat) {
        var me = this;
        var findTSPPathsService = new FindTSPPathsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return findTSPPathsService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findMTSPPaths
     * @description 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param {FindMTSPPathsParameters} params - 多旅行商分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    findMTSPPaths(params, callback, resultFormat) {
        var me = this;
        var findMTSPPathsService = new FindMTSPPathsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return findMTSPPathsService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findServiceAreas
     * @description 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param {FindServiceAreasParameters} params - 服务区分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    findServiceAreas(params, callback, resultFormat) {
        var me = this;
        var findServiceAreasService = new FindServiceAreasService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return findServiceAreasService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.updateEdgeWeight
     * @description 更新边的耗费权重服务。
     * @param {UpdateEdgeWeightParameters} params - 更新边的耗费权重服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    updateEdgeWeight(params, callback) {
        var me = this;
        var updateEdgeWeightService = new UpdateEdgeWeightService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return updateEdgeWeightService.processAsync(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.updateTurnNodeWeight
     * @description 转向耗费权重更新服务。
     * @param {UpdateTurnNodeWeightParameters} params - 转向耗费权重更新服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    updateTurnNodeWeight(params, callback) {
        var me = this;
        var updateTurnNodeWeightService = new UpdateTurnNodeWeightService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return updateTurnNodeWeightService.processAsync(params, callback);
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}
