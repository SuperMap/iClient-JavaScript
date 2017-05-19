/**
 * Class: NetworkAnalystService
 * 网络分析服务类
 * 用法：
 *      L.supermap.networkAnalystService(url)
 *      .findPath(params,function(result){
 *           //doSomething
 *      })
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var BurstPipelineAnalystService = require('../../common/iServer/BurstPipelineAnalystService');
var ComputeWeightMatrixService = require('../../common/iServer/ComputeWeightMatrixService');
var FacilityAnalystStreamService = require('../../common/iServer/FacilityAnalystStreamService');
var FindClosestFacilitiesService = require('../../common/iServer/FindClosestFacilitiesService');
var FindLocationService = require('../../common/iServer/FindLocationService');
var FindMTSPPathsService = require('../../common/iServer/FindMTSPPathsService');
var FindPathService = require('../../common/iServer/FindPathService');
var FindServiceAreasService = require('../../common/iServer/FindServiceAreasService');
var FindTSPPathsService = require('../../common/iServer/FindTSPPathsService');
var UpdateEdgeWeightService = require('../../common/iServer/UpdateEdgeWeightService');
var UpdateTurnNodeWeightService = require('../../common/iServer/UpdateTurnNodeWeightService');

var NetworkAnalystService = ServiceBase.extend({

    /**
     * url - {String} 网络分析服务地址。请求网络分析服务，URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
     * @param url
     * @param options
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 爆管分析服务:即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
     * @param params
     * <BurstPipelineAnalystParameters>
     * @param callback
     */
    burstPipelineAnalyst: function (params, callback) {
        var me = this;
        var burstPipelineAnalystService = new BurstPipelineAnalystService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        burstPipelineAnalystService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param params
     * <ComputeWeightMatrixParameters>
     * @param callback
     */
    computeWeightMatrix: function (params, callback) {
        var me = this;
        var computeWeightMatrixService = new ComputeWeightMatrixService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        computeWeightMatrixService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param params
     * <FindClosestFacilitiesParameters>
     * @param callback
     * @param resultFormat
     */
    findClosestFacilities: function (params, callback, resultFormat) {
        var me = this;
        var findClosestFacilitiesService = new FindClosestFacilitiesService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findClosestFacilitiesService.processAsync(me._processParams(params));
        return me;
    },
    /**
     *上游/下游 关键设施查找资源服务:查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param params
     * <FacilityAnalystStreamParameters>
     * @param callback
     * @param resultFormat
     */
    streamFacilityAnalyst: function (params, callback, resultFormat) {
        var me = this;
        var facilityAnalystStreamService = new FacilityAnalystStreamService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        facilityAnalystStreamService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置
     * @param params
     *  <FindLocationParameters>
     * @param callback
     * @param resultFormat
     */
    findLocation: function (params, callback, resultFormat) {
        var me = this;
        var findLocationService = new FindLocationService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findLocationService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param params
     * <FindPathParameters>
     * @param callback
     * @param resultFormat
     */
    findPath: function (params, callback, resultFormat) {
        var me = this;
        var findPathService = new FindPathService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findPathService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param params
     * <SuperMap.FindTSPPathsParameters>
     * @param callback
     * @param resultFormat
     */
    findTSPPaths: function (params, callback, resultFormat) {
        var me = this;
        var findTSPPathsService = new FindTSPPathsService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findTSPPathsService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param params
     * <FindMTSPPathsParameters>
     * @param callback
     * @param resultFormat
     */
    findMTSPPaths: function (params, callback, resultFormat) {
        var me = this;
        var findMTSPPathsService = new FindMTSPPathsService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findMTSPPathsService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param params
     * <FindServiceAreasParameters>
     * @param callback
     * @param resultFormat
     */
    findServiceAreas: function (params, callback, resultFormat) {
        var me = this;
        var findServiceAreasService = new FindServiceAreasService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        findServiceAreasService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 更新边的耗费权重服务
     * @param params
     * <UpdateEdgeWeightParameters>
     * @param callback
     */
    updateEdgeWeight: function (params, callback) {
        var me = this;
        var updateEdgeWeightService = new UpdateEdgeWeightService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        updateEdgeWeightService.processAsync(params);
        return me;
    },
    /**
     * 转向耗费权重更新服务
     * @param params
     * <UpdateTurnNodeWeightParameters>
     * @param callback
     */
    updateTurnNodeWeight: function (params, callback) {
        var me = this;
        var updateTurnNodeWeightService = new UpdateTurnNodeWeightService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        updateTurnNodeWeightService.processAsync(params);
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }

        if (params.centers && L.Util.isArray(params.centers)) {
            params.centers.map(function (point, key) {
                params.centers[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
            });
        }

        if (params.nodes && L.Util.isArray(params.nodes)) {
            params.nodes.map(function (point, key) {
                params.nodes[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
            });
        }

        if (params.event && params.event instanceof L.LatLng) {
            params.event = {x: params.event.lng, y: params.event.lat};
        }

        if (params.facilities && L.Util.isArray(params.facilities)) {
            params.facilities.map(function (point, key) {
                params.facilities[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
            });
        }

        if (params.parameter && params.parameter.barrierPoints) {
            var barrierPoints = params.parameter.barrierPoints;
            if (L.Util.isArray(barrierPoints)) {
                barrierPoints.map(function (point, key) {
                    params.parameter.barrierPoints[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
                });
            } else {
                params.parameter.barrierPoints = [(barrierPoints instanceof L.LatLng) ? {x: barrierPoints.lng, y: barrierPoints.lat} : barrierPoints];
            }
        }
        return params;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }

});

L.supermap.networkAnalystService = function (url, options) {
    return new NetworkAnalystService(url, options);
};

module.exports = NetworkAnalystService;