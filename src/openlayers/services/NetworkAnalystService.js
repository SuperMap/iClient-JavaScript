/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { DataFormat } from '@supermap/iclient-common/REST';
import { NetworkAnalystService as CommonNetworkAnalystService } from '@supermap/iclient-common/iServer/NetworkAnalystService';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import Point from 'ol/geom/Point';

/**
 * @class NetworkAnalystService
 * @category  iServer NetworkAnalyst
 * @classdesc 网络分析服务类。提供方法：爆管分析、最近设施分析、选址分区分析、旅行商分析、多旅行商分析、最佳路径分析、
 * 服务区分析、上游/下游关键设施查找、耗费矩阵计算、边的耗费权重更新、转向耗费权重更新等。
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      new NetworkAnalystService(url).findPath(params,function(result){
 *           //doSomething
 *      })
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL 应为:
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class NetworkAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._networkAnalystService = new CommonNetworkAnalystService(url, options);
    }

    /**
     * @function NetworkAnalystService.prototype.burstPipelineAnalyst
     * @description 爆管分析服务。<br>
     * 可应用于查找爆管点上游或下游最近的阀门位置（关键设施点），根据管道流向指示，
     * 迅速找到上游中需要关闭的最临近且最少数量的阀门。关闭这些阀门后，爆裂管段与它的上游不再连通，从而阻止水的流出，
     * 防止灾情加重和资源浪费。爆管分析的结果将给出影响爆管位置上下游的关键设施点和弧段、受爆管位置影响的上下游的普通设施点和弧段，
     * 即返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
     * @param {BurstPipelineAnalystParameters} params - 爆管分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     */
    burstPipelineAnalyst(params, callback) {
      params = this._processParams(params);
      return this._networkAnalystService.burstPipelineAnalyst(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.computeWeightMatrix
     * @description 耗费矩阵分析服务。<br>
     * 根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param {ComputeWeightMatrixParameters} params - 耗费矩阵分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     */
    computeWeightMatrix(params, callback) {
      params = this._processParams(params);
      return this._networkAnalystService.computeWeightMatrix(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.findClosestFacilities
     * @description 最近设施分析服务。<br>
     * 指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param {FindClosestFacilitiesParameters} params - 最近设施分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    findClosestFacilities(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.findClosestFacilities(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.traceAnalyst
     * @description 上游/下游 追踪分析服务。<br>
     * 查找给定弧段或节点的上游/下游弧段和结点。
     * @version 11.1.1
     * @param {TraceAnalystParameters} params - 上游/下游 追踪分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    traceAnalyst(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.traceAnalyst(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.connectedEdgesAnalyst
     * @description 连通性分析服务。<br>
     * 根据给定的弧段 ID 数组或结点 ID 数组，查找与这些弧段或结点相连通或不连通的弧段，返回弧段 ID 数组或结点 ID 数组。
     * @version 11.1.1
     * @param {ConnectedEdgesAnalystParameters} params - 连通性分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    connectedEdgesAnalyst(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.connectedEdgesAnalyst(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.streamFacilityAnalyst
     * @description 上游/下游 关键设施查找资源服务。<br>
     * 查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param {FacilityAnalystStreamParameters} params - 上游/下游 关键设施查找资源服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    streamFacilityAnalyst(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.streamFacilityAnalyst(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.findLocation
     * @description 选址分区分析服务。<br>
     * 确定一个或多个待建设施的最佳或最优位置，使得设施可以用一种最经济有效的方式为需求方提供服务或者商品。
     * 选址分区既有选址过程，也有资源分配过程，也就是将需求点的需求分配到相应的新建设施的服务区中。
     * @param {FindLocationParameters} params - 选址分区分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    findLocation(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.findLocation(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.findPath
     * @description 最佳路径分析服务。<br>
     * 在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param {FindPathParameters} params - 最佳路径分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    findPath(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.findPath(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.findTSPPaths
     * @description 旅行商分析服务。<br>
     * 路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param {FindTSPPathsParameters} params - 旅行商分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    findTSPPaths(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.findTSPPaths(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.findMTSPPaths
     * @description 多旅行商分析服务。<br>
     * 多旅行商分析也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param {FindMTSPPathsParameters} params - 多旅行商分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    findMTSPPaths(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.findMTSPPaths(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.findServiceAreas
     * @description 服务区分析服务。<br>
     * 以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param {FindServiceAreasParameters} params - 服务区分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    findServiceAreas(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._networkAnalystService.findServiceAreas(params, callback, resultFormat);
    }

    /**
     * @function NetworkAnalystService.prototype.updateEdgeWeight
     * @description 更新边的耗费权重服务。边的耗费权重又称弧段权值。
     * @param {UpdateEdgeWeightParameters} params - 更新边的耗费权重服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     */
    updateEdgeWeight(params, callback) {
      return this._networkAnalystService.updateEdgeWeight(params, callback);
    }

    /**
     * @function NetworkAnalystService.prototype.updateTurnNodeWeight
     * @description 更新转向耗费权重服务。转向耗费权重又称转向结点权值。
     * @param {UpdateTurnNodeWeightParameters} params - 更新转向耗费权重服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     */
    updateTurnNodeWeight(params, callback) {
      return this._networkAnalystService.updateTurnNodeWeight(params, callback);
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.centers && Util.isArray(params.centers)) {
            params.centers.map(function (point, key) {
                params.centers[key] = (point instanceof Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.centers[key];
            });
        }

        if (params.nodes && Util.isArray(params.nodes)) {
            params.nodes.map(function (point, key) {
                params.nodes[key] = (point instanceof Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.nodes[key];
            });
        }

        if (params.event && params.event instanceof Point) {
            params.event = {x: params.event.getCoordinates()[0], y: params.event.getCoordinates()[1]};
        }

        if (params.facilities && Util.isArray(params.facilities)) {
            params.facilities.map(function (point, key) {
                params.facilities[key] = (point instanceof Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.facilities[key];
            });
        }
        if (params.parameter && params.parameter.barrierPoints) {
            var barrierPoints = params.parameter.barrierPoints;
            if (Util.isArray(barrierPoints)) {
                barrierPoints.map(function (point, key) {
                    params.parameter.barrierPoints[key] = (point instanceof Point) ? {
                        x: point.getCoordinates()[0],
                        y: point.getCoordinates()[1]
                    } : point;
                    return params.parameter.barrierPoints[key];
                });
            } else {
                params.parameter.barrierPoints = [(barrierPoints instanceof Point) ? {
                    x: barrierPoints.getCoordinates()[0],
                    y: barrierPoints.getCoordinates()[1]
                } : barrierPoints];
            }
        }
        return params;

    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}
