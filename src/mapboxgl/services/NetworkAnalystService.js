/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { DataFormat } from '@supermap/iclient-common/REST';
import { BurstPipelineAnalystService } from '@supermap/iclient-common/iServer/BurstPipelineAnalystService';
import { ComputeWeightMatrixService } from '@supermap/iclient-common/iServer/ComputeWeightMatrixService';
import { FacilityAnalystStreamService } from '@supermap/iclient-common/iServer/FacilityAnalystStreamService';
import { FindClosestFacilitiesService } from '@supermap/iclient-common/iServer/FindClosestFacilitiesService';
import { FindLocationService } from '@supermap/iclient-common/iServer/FindLocationService';
import { FindMTSPPathsService } from '@supermap/iclient-common/iServer/FindMTSPPathsService';
import { FindPathService } from '@supermap/iclient-common/iServer/FindPathService';
import { FindServiceAreasService } from '@supermap/iclient-common/iServer/FindServiceAreasService';
import { FindTSPPathsService } from '@supermap/iclient-common/iServer/FindTSPPathsService';
import { UpdateEdgeWeightService } from '@supermap/iclient-common/iServer/UpdateEdgeWeightService';
import { UpdateTurnNodeWeightService } from '@supermap/iclient-common/iServer/UpdateTurnNodeWeightService';

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
export class NetworkAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function NetworkAnalystService.prototype.burstPipelineAnalyst
     * @description 爆管分析服务:即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
     * @param {BurstPipelineAnalystParameters} params - 爆管分析服务参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    burstPipelineAnalyst(params, callback) {
        var me = this;
        var burstPipelineAnalystService = new BurstPipelineAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        burstPipelineAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.computeWeightMatrix
     * @description 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param {ComputeWeightMatrixParameters} params - 耗费矩阵分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    computeWeightMatrix(params, callback) {
        var me = this;
        var computeWeightMatrixService = new ComputeWeightMatrixService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        computeWeightMatrixService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.findClosestFacilities
     * @description 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param {FindClosestFacilitiesParameters} params - 最近设施分析服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findClosestFacilities(params, callback, resultFormat) {
        var me = this;
        var findClosestFacilitiesService = new FindClosestFacilitiesService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findClosestFacilitiesService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.streamFacilityAnalyst
     * @description 上游/下游 关键设施查找资源服务：查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param {FacilityAnalystStreamParameters} params - 上游/下游 关键设施查找资源服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    streamFacilityAnalyst(params, callback, resultFormat) {
        var me = this;
        var facilityAnalystStreamService = new FacilityAnalystStreamService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        facilityAnalystStreamService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.findLocation
     * @description 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置。
     * @param {FindLocationParameters} params - 选址分区分析服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findLocation(params, callback, resultFormat) {
        var me = this;
        var findLocationService = new FindLocationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findLocationService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.findPath
     * @description 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param {FindPathParameters} params - 最佳路径分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findPath(params, callback, resultFormat) {
        var me = this;
        var findPathService = new FindPathService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findPathService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.findTSPPaths
     * @description 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param {FindTSPPathsParameters} params - 旅行商分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findTSPPaths(params, callback, resultFormat) {
        var me = this;
        var findTSPPathsService = new FindTSPPathsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findTSPPathsService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.findMTSPPaths
     * @description 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param {FindMTSPPathsParameters} params - 多旅行商分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findMTSPPaths(params, callback, resultFormat) {
        var me = this;
        var findMTSPPathsService = new FindMTSPPathsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findMTSPPathsService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.findServiceAreas
     * @description 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param {FindServiceAreasParameters} params - 服务区分析服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    findServiceAreas(params, callback, resultFormat) {
        var me = this;
        var findServiceAreasService = new FindServiceAreasService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findServiceAreasService.processAsync(me._processParams(params));
    }

    /**
     * @function NetworkAnalystService.prototype.updateEdgeWeight
     * @description 更新边的耗费权重服务。
     * @param {UpdateEdgeWeightParameters} params - 更新边的耗费权重服务参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    updateEdgeWeight(params, callback) {
        var me = this;
        var updateEdgeWeightService = new UpdateEdgeWeightService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        updateEdgeWeightService.processAsync(params);
    }

    /**
     * @function NetworkAnalystService.prototype.updateTurnNodeWeight
     * @description 转向耗费权重更新服务。
     * @param {UpdateTurnNodeWeightParameters} params - 转向耗费权重更新服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    updateTurnNodeWeight(params, callback) {
        var me = this;
        var updateTurnNodeWeightService = new UpdateTurnNodeWeightService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        updateTurnNodeWeightService.processAsync(params);
    }

    /**
     * @description 所有 Point 考虑 mapboxgl.lnglat、mapboxgl.Point、[]三种形式。
     * @param {Object} params - 待转换参数。
     * @returns {Object}  
     * @private
     */
    _processParams(params) {
        if (!params) {
            return {};
        }
        var me = this;
        if (params.centers && Util.isArray(params.centers)) {
            params.centers.map(function (point, key) {
                params.centers[key] = me._toPointObject(point);
                return params.centers[key];
            });
        }

        if (params.nodes && Util.isArray(params.nodes)) {
            params.nodes.map(function (point, key) {
                params.nodes[key] = me._toPointObject(point);
                return params.nodes[key];
            });
        }

        if (params.event) {
            params.event = me._toPointObject(params.event);
        }

        if (params.facilities && Util.isArray(params.facilities)) {
            params.facilities.map(function (point, key) {
                params.facilities[key] = me._toPointObject(point);
                return params.facilities[key];
            });
        }
        if (params.parameter && params.parameter.barrierPoints) {
            var barrierPoints = params.parameter.barrierPoints;
            if (Util.isArray(barrierPoints)) {
                barrierPoints.map(function (point, key) {
                    params.parameter[key] = me._toPointObject(point);
                    return params.parameter.barrierPoints[key];
                });
            } else {
                params.parameter.barrierPoints = [(barrierPoints instanceof mapboxgl.LngLat) ? {
                    x: barrierPoints.lng,
                    y: barrierPoints.lat
                } : barrierPoints];
            }
        }
        return params;

    }

    _toPointObject(point) {
        if (Util.isArray(point)) {
            return {
                x: point[0],
                y: point[1]
            };
        }
        if (point instanceof mapboxgl.LngLat) {
            return {
                x: point.lng,
                y: point.lat
            };
        }
        return (point instanceof mapboxgl.Point) ? {
            x: point.x,
            y: point.y
        } : point;

    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}
