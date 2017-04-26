/**
 * Class: NetworkAnalystService
 * 网络分析服务类
 */
require('./ServiceBase');
require('../../common/iServer/BurstPipelineAnalystService');
require('../../common/iServer/ComputeWeightMatrixService');
require('../../common/iServer/FacilityAnalystStreamService');
require('../../common/iServer/FindClosestFacilitiesService');
require('../../common/iServer/FindLocationService');
require('../../common/iServer/FindMTSPPathsService');
require('../../common/iServer/FindPathService');
require('../../common/iServer/FindServiceAreasService');
require('../../common/iServer/FindTSPPathsService');
require('../../common/iServer/UpdateEdgeWeightService');
require('../../common/iServer/UpdateTurnNodeWeightService');

ol.supermap.NetworkAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.NetworkAnalystService, ol.supermap.ServiceBase);

/**
 * 爆管分析服务:即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
 * @param params
 *  <BurstPipelineAnalystParameters>
 */
ol.supermap.NetworkAnalystService.prototype.burstPipelineAnalyst = function (params) {
    var me = this;
    var burstPipelineAnalystService = new SuperMap.REST.BurstPipelineAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    burstPipelineAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
 * @param params
 *      <ComputeWeightMatrixParameters>
 */
ol.supermap.NetworkAnalystService.prototype.computeWeightMatrix = function (params) {
    var me = this;
    var computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    computeWeightMatrixService.processAsync(me._processParams(params));
    return me;
};

/**
 * 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 * @param params
 *      <FindClosestFacilitiesParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */
ol.supermap.NetworkAnalystService.prototype.findClosestFacilities = function (params, resultFormat) {
    var me = this;
    var findClosestFacilitiesService = new SuperMap.REST.FindClosestFacilitiesService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    findClosestFacilitiesService.processAsync(me._processParams(params));
    return me;
};

/**
 *上游/下游 关键设施查找资源服务:查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
 * @param params
 *      <FacilityAnalystStreamParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */
ol.supermap.NetworkAnalystService.prototype.streamFacilityAnalyst = function (params, resultFormat) {
    var me = this;
    var facilityAnalystStreamService = new SuperMap.REST.FacilityAnalystStreamService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    facilityAnalystStreamService.processAsync(me._processParams(params));
    return me;
};

/**
 * 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置
 * @param params
 *      <FindLocationParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */
ol.supermap.NetworkAnalystService.prototype.findLocation = function (params, resultFormat) {
    var me = this;
    var findLocationService = new SuperMap.REST.FindLocationService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    findLocationService.processAsync(me._processParams(params));
    return me;
};

/**
 * 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
 * @param params
 *      <FindPathParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */

ol.supermap.NetworkAnalystService.prototype.findPath = function (params, resultFormat) {
    var me = this;
    var findPathService = new SuperMap.REST.FindPathService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    findPathService.processAsync(me._processParams(params));
    return me;
};

/**
 * 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
 * @param params
 *      <SuperMap.FindTSPPathsParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */
ol.supermap.NetworkAnalystService.prototype.findTSPPaths = function (params, resultFormat) {
    var me = this;
    var findTSPPathsService = new SuperMap.REST.FindTSPPathsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    findTSPPathsService.processAsync(me._processParams(params));
    return me;
};

/**
 * 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
 * @param params
 *      <FindMTSPPathsParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */
ol.supermap.NetworkAnalystService.prototype.findMTSPPaths = function (params, resultFormat) {
    var me = this;
    var findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    findMTSPPathsService.processAsync(me._processParams(params));
    return me;
};

/**
 * 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
 * @param params
 *      <FindServiceAreasParameters>
 * @param resultFormat
		 *		<SuperMap.DataFormat>
 */
ol.supermap.NetworkAnalystService.prototype.findServiceAreas = function (params, resultFormat) {
    var me = this;
    var findServiceAreasService = new SuperMap.REST.FindServiceAreasService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    findServiceAreasService.processAsync(me._processParams(params));
    return me;
};

/**
 * 更新边的耗费权重服务
 * @param params
 *      <UpdateEdgeWeightParameters>
 */
ol.supermap.NetworkAnalystService.prototype.updateEdgeWeight = function (params) {
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
};

/**
 * 转向耗费权重更新服务
 * @param params
 *      <UpdateTurnNodeWeightParameters>
 */
ol.supermap.NetworkAnalystService.prototype.updateTurnNodeWeight = function (params) {
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
};

ol.supermap.NetworkAnalystService.prototype.processCompleted = function (serverResult) {
    this.dispatchEvent(new ol.Collection.Event('complete', {result: serverResult.result, originalResult: serverResult.originalResult}));
};

ol.supermap.NetworkAnalystService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

ol.supermap.NetworkAnalystService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    if (params.centers && ol.supermap.Util.isArray(params.centers)) {
        params.centers.map(function (point, key) {
            params.centers[key] = (point instanceof ol.geom.Point) ? {
                x: point.flatCoordinates[0],
                y: point.flatCoordinates[1]
            } : point;
        });
    }

    if (params.nodes && ol.supermap.Util.isArray(params.nodes)) {
        params.nodes.map(function (point, key) {
            params.nodes[key] = (point instanceof ol.geom.Point) ? {
                x: point.flatCoordinates[0],
                y: point.flatCoordinates[1]
            } : point;
        });
    }

    if (params.event && params.event instanceof ol.geom.Point) {
        params.event = {x: params.event.flatCoordinates[0], y: params.event.flatCoordinates[1]};
    }

    if (params.facilities && ol.supermap.Util.isArray(params.facilities)) {
        params.facilities.map(function (point, key) {
            params.facilities[key] = (point instanceof ol.geom.Point) ? {
                x: point.flatCoordinates[0],
                y: point.flatCoordinates[1]
            } : point;
        });
    }

    if (params.parameter && params.parameter.barrierPoints) {
        var barrierPoints = params.parameter.barrierPoints;
        if (ol.supermap.Util.isArray(barrierPoints)) {
            barrierPoints.map(function (point, key) {
                params.parameter.barrierPoints[key] = (point instanceof ol.geom.Point) ? {
                    x: point.flatCoordinates[0],
                    y: point.flatCoordinates[1]
                } : point;
            });
        } else {
            params.parameter.barrierPoints = [(barrierPoints instanceof ol.geom.Point) ? {
                x: barrierPoints.flatCoordinates[0],
                y: barrierPoints.flatCoordinates[1]
            } : barrierPoints];
        }
    }
    return params;

};

module.exports = ol.supermap.NetworkAnalystService;