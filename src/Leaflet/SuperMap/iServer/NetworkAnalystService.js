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
     *  sourceNodeIDs:{Array(Number)} 指定的设施点ID数组,可以为空。
     *  edgeID:{Number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
     *  nodeID: {Number}: 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
     *  isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效，默认为false。指定为 true，表示不确定流向有效，
     *        遇到不确定流向时分析继续进行；指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
     */
    burstPipelineAnalyst: function (params) {
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
    },
    /**
     * 耗费矩阵分析服务:根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
     * @param params
     * isAnalyzeById:{Boolean} 是否通过节点 ID 指定路径分析的结点，默认为 false，即通过坐标点指定。
     * nodes: {Array(<L.LatLng>/Number)} 要计算耗费矩阵的点数组，必设字段。
     * parameter:{Object:(barrierEdgeIDs,barrierNodeIDs,barrierPoints,weightFieldName,turnWeightField,resultSetting)} 交通网络分析通用参数。
     * <resultSetting:(returnEdgeFeatures,returnEdgeGeometry,returnEdgeIDs,returnNodeFeatures,returnNodeGeometry,returnNodeIDs,returnPathGuides,returnRoutes)>
     */
    computeWeightMatrix: function (params) {
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
    },

    /**
     * 最近设施分析服务:指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
     * @param params
     * event:{L.LatLng>/Number} 事件点，一般为需要获得服务设施服务的事件位置，必设字段
     * expectFacilityCount:{Number} 要查找的设施点数量。默认值为1。
     * facilities:{Array(<L.LatLng>/Number)} 设施点集合，一般为提供服务的服务设施位置，必设字段。
     * fromEvent: {Boolean} 是否从事件点到设施点进行查找。
     * isAnalyzeById: {Boolean} 事件点和设施点是否通过节点 ID 号来指定，默认为 false，即通过坐标点指定事件点和设施点。
     * maxWeight: {Number} 查找半径。单位与该类中 parameter 字段（交通网络分析通用参数）中设置的耗费字段一致。默认值为0，表示查找全网络。
     * parameter:{Object:(barrierEdgeIDs,barrierNodeIDs,barrierPoints,weightFieldName,turnWeightField,resultSetting)} 交通网络分析通用参数。
     * <resultSetting:(returnEdgeFeatures,returnEdgeGeometry,returnEdgeIDs,returnNodeFeatures,returnNodeGeometry,returnNodeIDs,returnPathGuides,returnRoutes)>
     */
    findClosestFacilities: function (params) {
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
    },
    /**
     *上游/下游 关键设施查找资源服务:查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
     * @param params
     * sourceNodeIDs:{Array<Number>} 指定的设施点ID数组,可以为空。
     * edgeID: {Number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
     * nodeID:{Number}: 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
     * isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效，默认为false。
     * queryType:{Number}: 分析类型，只能是 0 (上游关键设施查询) 或者是 1（下游关键设施查询）。
     */
    streamFacilityAnalyst: function (params) {
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
    },
    /**
     * 选址分区分析服务：确定一个或多个待建设施的最佳或最优位置
     * @param params
     * expectedSupplyCenterCount: {Number} 期望用于最终设施选址的资源供给中心数量，必设字段。
     * isFromCenter: {Boolean} 是否从中心点开始分配资源。默认为 false。
     * supplyCenters: {Array(<Object(maxWeight,nodeID,resourceValue,type)>)} 资源供给中心集合，必设字段。
     * turnWeightField:{String} 转向权值字段的名称。
     * weightName:{String} 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，必设字段。
     */
    findLocation: function (params) {
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
    },
    /**
     * 最佳路径分析服务:在网络数据集中指定一些节点，按照节点的选择顺序，顺序访问这些节点从而求解起止点之间阻抗最小的路经。
     * @param params
     * isAnalyzeById:{Boolean} 是否通过节点 ID 指定路径分析的结点，默认为 false。
     * hasLeastEdgeCount:{Boolean} 是否按照弧段数最少的进行最佳路径分析。
     * nodes:{Array(<L.LatLng>/Number)} 最佳路径分析经过的结点或设施点数组，必设字段。该字段至少包含两个点。
     * parameter:{Object:(barrierEdgeIDs,barrierNodeIDs,barrierPoints,weightFieldName,turnWeightField,resultSetting)} 交通网络分析通用参数。
     * <resultSetting:(returnEdgeFeatures,returnEdgeGeometry,returnEdgeIDs,returnNodeFeatures,returnNodeGeometry,returnNodeIDs,returnPathGuides,returnRoutes)>
     */
    findPath: function (params) {
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
    },
    /**
     * 旅行商分析服务:路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。
     * @param params
     * endNodeAssigned: {Boolean} 是否指定终止点，将指定的途经点的最后一个点作为终止点， 默认为 false。
     * isAnalyzeById:{Boolean} 是否通过节点 ID 号来指定途经点，默认为 false，即通过坐标点指定。
     * nodes:{Array(<L.LatLng>/Number)} 旅行商分析途经点数组，必设字段。
     * parameter:{Object:(barrierEdgeIDs,barrierNodeIDs,barrierPoints,weightFieldName,turnWeightField,resultSetting)} 交通网络分析通用参数。
     * <resultSetting:(returnEdgeFeatures,returnEdgeGeometry,returnEdgeIDs,returnNodeFeatures,returnNodeGeometry,returnNodeIDs,returnPathGuides,returnRoutes)>
     */
    findTSPPaths: function (params) {
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
    },
    /**
     * 多旅行商分析服务:也称为物流配送，是指在网络数据集中，给定 M 个配送中心点和 N 个配送目的地（M，N 为大于零的整数）。查找经济有效的配送路径，并给出相应的行走路线。
     * @param params
     * centers: {Array(<L.LatLng>/Number)} 配送中心集合，必设字段。
     * hasLeastTotalCost:{Boolean} 配送模式是否为总花费最小方案。默认为 false。
     * isAnalyzeById: {Boolean} 是否通过节点 ID 号来指定配送中心点和配送目的点，默认为 false，即通过坐标点指定。
     * nodes:{Array(<L.LatLng>/Number)} 配送目标集合，必设字段。
     * parameter:{Object:(barrierEdgeIDs,barrierNodeIDs,barrierPoints,weightFieldName,turnWeightField,resultSetting)} 交通网络分析通用参数。
     * <resultSetting:(returnEdgeFeatures,returnEdgeGeometry,returnEdgeIDs,returnNodeFeatures,returnNodeGeometry,returnNodeIDs,returnPathGuides,returnRoutes)>
     */
    findMTSPPaths: function (params) {
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
    },
    /**
     * 服务区分析服务：以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。
     * @param params
     * isAnalyzeById: {Boolean} 是否通过节点 ID 指定路径分析的结点，默认为 false。
     * isCenterMutuallyExclusive:{Boolean} 是否中心点互斥，即按照中心点的距离进行判断是否要进行互斥处理，默认为 false。
     * centers: {Array(<L.LatLng>/Number)} 服务站点数组，必设字段。
     * isFromCenter: {Boolean} 是否从中心点开始分析。默认为 false。
     * weights:{Array(Number)} 每个服务站点提供服务的阻力半径，即超过这个阻力半径的区域不予考虑，其单位与阻力字段一致，必设字段。
     * parameter:{Object:(barrierEdgeIDs,barrierNodeIDs,barrierPoints,weightFieldName,turnWeightField,resultSetting)} 交通网络分析通用参数。
     * <resultSetting:(returnEdgeFeatures,returnEdgeGeometry,returnEdgeIDs,returnNodeFeatures,returnNodeGeometry,returnNodeIDs,returnPathGuides,returnRoutes)>
     */
    findServiceAreas: function (params) {
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
    },
    /**
     * 更新边的耗费权重服务
     * @param params
     * edgeId: {String} 所在边的id
     * fromNodeId:{String} 起始转向点的id
     * toNodeId:{String} 终止转向点的id
     * weightField:{String} 边的耗费字段
     * edgeWeight:{String} 耗费权重
     */
    updateEdgeWeight: function (params) {
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
    },
    /**
     * 转向耗费权重更新服务
     * @param params
     * nodeId:{String} 转向结点的id
     * fromEdgeId: {String} 起始边的id
     * toEdgeId:{String} 终止边的id
     * weightField:{String} 转向结点的耗费字段
     * turnNodeWeight: {String} 耗费权重
     */
    updateTurnNodeWeight: function (params) {
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

        if (params.parameter) {
            var param = params.parameter;
            if (param.barrierPoints && L.Util.isArray(param.barrierPoints)) {
                param.barrierPoints.map(function (point, key) {
                    params.parameter.barrierPoints[key] = (point instanceof L.LatLng) ? {x: point.lng, y: params.lat} : point;
                });
            }
            if (param.resultSetting) {
                params.parameter.resultSetting = new SuperMap.REST.TransportationAnalystResultSetting(param.resultSetting);
            }
        }

        if (params.supplyCenters && L.Util.isArray(params.supplyCenters)) {
            params.supplyCenters.map(function (supplyCenter, key) {
                params.supplyCenters[key] = new SuperMap.REST.SupplyCenter(supplyCenter);
            })
        }
        return params;

    }
});

L.supermap.networkAnalystService = function (url, options) {
    return new NetworkAnalystService(url, options);
};

module.exports = L.supermap.networkAnalystService;