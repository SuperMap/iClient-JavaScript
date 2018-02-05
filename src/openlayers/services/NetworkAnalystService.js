import ol from 'openlayers';
import {
    DataFormat,
    BurstPipelineAnalystService,
    ComputeWeightMatrixService,
    FacilityAnalystStreamService,
    FindClosestFacilitiesService,
    FindLocationService,
    FindMTSPPathsService,
    FindPathService,
    FindServiceAreasService,
    FindTSPPathsService,
    UpdateEdgeWeightService,
    UpdateTurnNodeWeightService
} from '@supermap/iclient-common';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';

/**
 * @class ol.supermap.NetworkAnalystService
 * @category  iServer NetworkAnalyst
 * @classdesc 网络分析服务类
 * @extends ol.supermap.ServiceBase
 * @example
 *      new ol.supermap.NetworkAnalystService(url)
 *      .findPath(params,function(result){
 *           //doSomething
 *      })
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
 * @param options - {Object} 服务所需可选参数。如：<br>
 *        serverType - {SuperMap.ServerType} 服务来源 iServer|iPortal|online
 */
export class NetworkAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.NetworkAnalystService.prototype.burstPipelineAnalyst
     * @description 爆管分析服务:即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
     * @param params -{SuperMap.BurstPipelineAnalystParameters} 爆管分析服务参数类
     * @param callback -{function} 回调函数
     */
    burstPipelineAnalyst(params, callback) {
        var me = this;
        var burstPipelineAnalystService = new BurstPipelineAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        burstPipelineAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function ol.supermap.NetworkAnalystService.prototype.computeWeightMatrix
     * @description 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param params - {SuperMap.ComputeWeightMatrixParameters} 耗费矩阵分析服务参数类
     * @param callback - {function} 回调函数
     */
    computeWeightMatrix(params, callback) {
        var me = this;
        var computeWeightMatrixService = new ComputeWeightMatrixService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        computeWeightMatrixService.processAsync(me._processParams(params));
    }

    /**
     * @function ol.supermap.NetworkAnalystService.prototype.findClosestFacilities
     * @description 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param params - {SuperMap.FindClosestFacilitiesParameters} 最近设施分析服务参数类
     * @param callback -{function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    findClosestFacilities(params, callback, resultFormat) {
        var me = this;
        var findClosestFacilitiesService = new FindClosestFacilitiesService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.streamFacilityAnalyst
     * @description 上游/下游 关键设施查找资源服务:查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param params - {SuperMap.FacilityAnalystStreamParameters} 上游/下游 关键设施查找资源服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    streamFacilityAnalyst(params, callback, resultFormat) {
        var me = this;
        var facilityAnalystStreamService = new FacilityAnalystStreamService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.findLocation
     * @description 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置
     * @param params - {SuperMap.FindLocationParameters} 选址分区分析服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    findLocation(params, callback, resultFormat) {
        var me = this;
        var findLocationService = new FindLocationService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.findPath
     * @description 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param params - {SuperMap.FindPathParameters} 最佳路径分析服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    findPath(params, callback, resultFormat) {
        var me = this;
        var findPathService = new FindPathService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.findTSPPaths
     * @description 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param params - {SuperMap.SuperMap.FindTSPPathsParameters} 旅行商分析服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    findTSPPaths(params, callback, resultFormat) {
        var me = this;
        var findTSPPathsService = new FindTSPPathsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.findMTSPPaths
     * @description 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param params - {SuperMap.FindMTSPPathsParameters} 多旅行商分析服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    findMTSPPaths(params, callback, resultFormat) {
        var me = this;
        var findMTSPPathsService = new FindMTSPPathsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.findServiceAreas
     * @description 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param params - {SuperMap.FindServiceAreasParameters} 服务区分析服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     */
    findServiceAreas(params, callback, resultFormat) {
        var me = this;
        var findServiceAreasService = new FindServiceAreasService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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
     * @function ol.supermap.NetworkAnalystService.prototype.updateEdgeWeight
     * @description 更新边的耗费权重服务
     * @param params - {SuperMap.UpdateEdgeWeightParameters} 更新边的耗费权重服务参数类
     * @param callback - {function} 回调函数
     */
    updateEdgeWeight(params, callback) {
        var me = this;
        var updateEdgeWeightService = new UpdateEdgeWeightService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        updateEdgeWeightService.processAsync(params);
    }

    /**
     * @function ol.supermap.NetworkAnalystService.prototype.updateTurnNodeWeight
     * @description 转向耗费权重更新服务
     * @param params - {SuperMap.UpdateTurnNodeWeightParameters} 转向耗费权重更新服务参数类
     * @param callback - {function} 回调函数
     */
    updateTurnNodeWeight(params, callback) {
        var me = this;
        var updateTurnNodeWeightService = new UpdateTurnNodeWeightService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        updateTurnNodeWeightService.processAsync(params);
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.centers && Util.isArray(params.centers)) {
            params.centers.map(function (point, key) {
                params.centers[key] = (point instanceof ol.geom.Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.centers[key];
            });
        }

        if (params.nodes && Util.isArray(params.nodes)) {
            params.nodes.map(function (point, key) {
                params.nodes[key] = (point instanceof ol.geom.Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.nodes[key];
            });
        }

        if (params.event && params.event instanceof ol.geom.Point) {
            params.event = {x: params.event.getCoordinates()[0], y: params.event.getCoordinates()[1]};
        }

        if (params.facilities && Util.isArray(params.facilities)) {
            params.facilities.map(function (point, key) {
                params.facilities[key] = (point instanceof ol.geom.Point) ? {
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
                    params.parameter.barrierPoints[key] = (point instanceof ol.geom.Point) ? {
                        x: point.getCoordinates()[0],
                        y: point.getCoordinates()[1]
                    } : point;
                    return params.parameter.barrierPoints[key];
                });
            } else {
                params.parameter.barrierPoints = [(barrierPoints instanceof ol.geom.Point) ? {
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

ol.supermap.NetworkAnalystService = NetworkAnalystService;