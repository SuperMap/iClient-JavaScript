/**
 * Class: NetworkAnalystService
 * 网络分析服务类
 * 用法：
 *      L.superMap.networkAnalystService(url).findPath({
 *          nodes:[xxx,xxx],
 *          parameter:{xxx:xxx}
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('../../../Core/base');
require('../../../Core/iServer/BurstPipelineAnalystService');
require('../../../Core/iServer/ComputeWeightMatrixService');
require('../../../Core/iServer/FacilityAnalystStreamService');
require('../../../Core/iServer/FindClosestFacilitiesService');
require('../../../Core/iServer/FindLocationService');
require('../../../Core/iServer/FindMTSPPathsService');
require('../../../Core/iServer/FindPathService');
require('../../../Core/iServer/FindServiceAreasService');
require('../../../Core/iServer/FindTSPPathsService');
require('../../../Core/iServer/UpdateEdgeWeightService');
require('../../../Core/iServer/UpdateTurnNodeWeightService');
require('./ServiceBase');

NetworkAnalystService = ServiceBase.extend({

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
     *  <BurstPipelineAnalystParameters>
     */
    burstPipelineAnalyst: function (params) {
        var me = this, param = me._processParams(params);
        var burstPipelineAnalystService = new SuperMap.REST.BurstPipelineAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        burstPipelineAnalystService.processAsync(param);
        return me;
    },
    /**
     * 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param params
     *      <ComputeWeightMatrixParameters>
     */
    computeWeightMatrix: function (params) {
        var me = this, param = me._processParams(params);
        var computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        computeWeightMatrixService.processAsync(param);
        return me;
    },

    /**
     * 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param params
     *      <FindClosestFacilitiesParameters>
     */
    findClosestFacilities: function (params) {
        var me = this, param = me._processParams(params);
        var findClosestFacilitiesService = new SuperMap.REST.FindClosestFacilitiesService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        findClosestFacilitiesService.processAsync(param);
        return me;
    },
    /**
     *上游/下游 关键设施查找资源服务:查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param params
     *      <FacilityAnalystStreamParameters>
     */
    streamFacilityAnalyst: function (params) {
        var me = this, param = me._processParams(params);
        var facilityAnalystStreamService = new SuperMap.REST.FacilityAnalystStreamService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystStreamService.processAsync(param);
        return me;
    },
    /**
     * 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置
     * @param params
     *      <FindLocationParameters>
     */
    findLocation: function (params) {
        var me = this, param = me._processParams(params);
        var findLocationService = new SuperMap.REST.FindLocationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        findLocationService.processAsync(param);
        return me;
    },
    /**
     * 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param params
     *      <FindPathParameters>
     */
    findPath: function (params) {
        var me = this, param = me._processParams(params);
        var findPathService = new SuperMap.REST.FindPathService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        findPathService.processAsync(param);
        return me;
    },
    /**
     * 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param params
     *      <FindTSPPathsParameters>
     */
    findTSPPaths: function (params) {
        var me = this, param = me._processParams(params);
        var findTSPPathsService = new SuperMap.REST.FindTSPPathsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        findTSPPathsService.processAsync(param);
        return me;
    },
    /**
     * 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param params
     *      <FindMTSPPathsParameters>
     */
    findMTSPPaths: function (params) {
        var me = this, param = me._processParams(params);
        var findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        findMTSPPathsService.processAsync(param);
        return me;
    },
    /**
     * 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param params
     *      <FindServiceAreasParameters>
     */
    findServiceAreas: function (params) {
        var me = this, param = me._processParams(params);
        var findServiceAreasService = new SuperMap.REST.FindServiceAreasService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        findServiceAreasService.processAsync(param);
        return me;
    },
    /**
     * 更新边的耗费权重服务
     * @param params
     *      <UpdateEdgeWeightParameters>
     */
    updateEdgeWeight: function (params) {
        var me = this;
        var updateEdgeWeightService = new SuperMap.REST.UpdateEdgeWeightService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        updateEdgeWeightService.processAsync(params);
        return me;
    },
    /**
     * 转向耗费权重更新服务
     * @param params
     *      <UpdateTurnNodeWeightParameters>
     */
    updateTurnNodeWeight: function (params) {
        var me = this;
        var updateTurnNodeWeightService = new SuperMap.REST.UpdateTurnNodeWeightService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
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
                params.centers[key] = (point instanceof L.LatLng) ? {x: point.lng, y: params.lat} : point;
            });
        }

        if (params.nodes && L.Util.isArray(params.nodes)) {
            params.nodes.map(function (point, key) {
                params.nodes[key] = (point instanceof L.LatLng) ? {x: point.lng, y: params.lat} : point;
            });
        }

        if (params.event && params.event instanceof L.LatLng) {
            params.event = {x: point.lng, y: params.lat};
        }

        if (params.facilities && L.Util.isArray(params.facilities)) {
            params.facilities.map(function (point, key) {
                params.facilities[key] = (point instanceof L.LatLng) ? {x: point.lng, y: params.lat} : point;
            });
        }

        if (params.parameter && params.parameter.barrierPoints) {
            var barrierPoints = params.parameter.barrierPoints;
            if (L.Util.isArray(barrierPoints)) {
                barrierPoints.map(function (point, key) {
                    params.parameter.barrierPoints[key] = (point instanceof L.LatLng) ? {x: point.lng, y: params.lat} : point;
                });
            } else {
                params.parameter.barrierPoints = [(barrierPoints instanceof L.LatLng) ? {x: barrierPoints.lng, y: barrierPoints.lat} : barrierPoints];
            }
        }
        return params;

    }
});

L.supermap.networkAnalystService = function (url, options) {
    return new NetworkAnalystService(url, options);
};

module.exports = L.supermap.networkAnalystService;