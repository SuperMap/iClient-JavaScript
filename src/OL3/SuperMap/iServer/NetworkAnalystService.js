/**
 * Class: NetworkAnalystService
 * 网络分析服务类
 */
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

ol.supermap.NetworkAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.NetworkAnalystService, ol.supermap.ServiceBase);

ol.supermap.NetworkAnalystService.prototype.burstPipelineAnalyst = function (params) {
    var me = this, param = me._processParams(params);
    var burstPipelineAnalystParams = new SuperMap.REST.BurstPipelineAnalystParameters(param);
    var burstPipelineAnalystService = new SuperMap.REST.BurstPipelineAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    burstPipelineAnalystService.processAsync(burstPipelineAnalystParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.computeWeightMatrix = function (params) {
    var me = this, param = me._processParams(params);
    var computeWeightMatrixParams = new SuperMap.REST.ComputeWeightMatrixParameters(param);
    var computeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    computeWeightMatrixService.processAsync(computeWeightMatrixParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.findClosestFacilities = function (params) {
    var me = this, param = me._processParams(params);
    var findClosestFacilitiesParams = new SuperMap.REST.FindClosestFacilitiesParameters(param);
    var findClosestFacilitiesService = new SuperMap.REST.FindClosestFacilitiesService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    findClosestFacilitiesService.processAsync(findClosestFacilitiesParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.streamFacilityAnalyst = function (params) {
    var me = this, param = me._processParams(params);
    var facilityAnalystStreamParams = new SuperMap.REST.FacilityAnalystStreamParameters(param);
    var facilityAnalystStreamService = new SuperMap.REST.FacilityAnalystStreamService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystStreamService.processAsync(facilityAnalystStreamParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.findLocation = function (params) {
    var me = this, param = me._processParams(params);
    var findLocationParams = new SuperMap.REST.FindLocationParameters(param);
    var findLocationService = new SuperMap.REST.FindLocationService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    findLocationService.processAsync(findLocationParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.findPath = function (params) {
    var me = this, param = me._processParams(params);
    var findPathParams = new SuperMap.REST.FindPathParameters(param);
    var findPathService = new SuperMap.REST.FindPathService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    findPathService.processAsync(findPathParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.findTSPPaths = function (params) {
    var me = this, param = me._processParams(params);
    var findTSPPathsParams = new SuperMap.REST.FindTSPPathsParameters(param);
    var findTSPPathsService = new SuperMap.REST.FindTSPPathsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    findTSPPathsService.processAsync(findTSPPathsParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.findMTSPPaths = function (params) {
    var me = this, param = me._processParams(params);
    var findMTSPPathsParams = new SuperMap.REST.FindMTSPPathsParameters(param);
    var findMTSPPathsService = new SuperMap.REST.FindMTSPPathsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    findMTSPPathsService.processAsync(findMTSPPathsParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.findServiceAreas = function (params) {
    var me = this, param = me._processParams(params);
    var findServiceAreasParams = new SuperMap.REST.FindServiceAreasParameters(param);
    var findServiceAreasService = new SuperMap.REST.FindServiceAreasService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    findServiceAreasService.processAsync(findServiceAreasParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.updateEdgeWeight = function (params) {
    var me = this;
    var updateEdgeWeightParams = new SuperMap.REST.UpdateEdgeWeightParameters(params);
    var updateEdgeWeightService = new SuperMap.REST.UpdateEdgeWeightService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    updateEdgeWeightService.processAsync(updateEdgeWeightParams);
    return me;
};

ol.supermap.NetworkAnalystService.prototype.updateTurnNodeWeight = function (params) {
    var me = this;
    var updateTurnNodeWeightParams = new SuperMap.REST.UpdateTurnNodeWeightParameters(params);
    var updateTurnNodeWeightService = new SuperMap.REST.UpdateTurnNodeWeightService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    updateTurnNodeWeightService.processAsync(updateTurnNodeWeightParams);
    return me;
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
        params.event = {x: point.flatCoordinates[0], y: params.flatCoordinates[1]};
    }

    if (params.facilities && ol.supermap.Util.isArray(params.facilities)) {
        params.facilities.map(function (point, key) {
            params.facilities[key] = (point instanceof ol.geom.Point) ? {
                    x: point.flatCoordinates[0],
                    y: params.flatCoordinates[1]
                } : point;
        });
    }

    if (params.parameter) {
        var param = params.parameter;
        if (param.barrierPoints && ol.supermap.Util.isArray(param.barrierPoints)) {
            param.barrierPoints.map(function (point, key) {
                params.parameter.barrierPoints[key] = (point instanceof ol.geom.Point) ? {
                        x: point.flatCoordinates[0],
                        y: params.flatCoordinates[1]
                    } : point;
            });
        }
        if (param.resultSetting) {
            params.parameter.resultSetting = new SuperMap.REST.TransportationAnalystResultSetting(param.resultSetting);
        }
    }

    if (params.supplyCenters && ol.supermap.Util.isArray(params.supplyCenters)) {
        params.supplyCenters.map(function (supplyCenter, key) {
            params.supplyCenters[key] = new SuperMap.REST.SupplyCenter(supplyCenter);
        })
    }
    return params;

}

module.exports = ol.supermap.NetworkAnalystService;