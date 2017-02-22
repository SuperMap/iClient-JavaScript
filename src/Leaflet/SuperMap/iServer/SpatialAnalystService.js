/**
 * Class:SpatialAnalystService
 * 空间分析服务类。
 * 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * 用法：
 *      L.superMap.spatialAnalystService(url).bufferAnalysis({
 *
 *      }).on("complete",function(result){
 *          //doSomething 
 *      }).on("failed",function(result){
 *          //doSomething
 *      });
 */

require('../../../Core/base');
require('../../../Core/iServer/AreaSolarRadiationService');
require('../../../Core/iServer/BufferAnalystService');
require('../../../Core/iServer/DensityAnalystService');
require('../../../Core/iServer/GenerateSpatialDataService');
require('../../../Core/iServer/GeoRelationAnalystService');
require('../../../Core/iServer/InterpolationAnalystService');
require('../../../Core/iServer/MathExpressionAnalysisService');
require('../../../Core/iServer/OverlayAnalystService');
require('../../../Core/iServer/RouteCalculateMeasureService');
require('../../../Core/iServer/RouteLocatorService');
require('../../../Core/iServer/SurfaceAnalystService');
require('../../../Core/iServer/TerrainCurvatureCalculationService');
require('../../../Core/iServer/ThiessenAnalystService');
require('./ServiceBase');

SpatialAnalystService = ServiceBase.extend({

    /**
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     * @param url
     * @param options
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },
    /**
     * 地区太阳辐射
     */
    getAreaSolarRadiationResult: function () {
        var me = this;
        var areaSolarRadiationParameters = new SuperMap.REST.AreaSolarRadiationParameters(params);
        var areaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        areaSolarRadiationService.processAsync(areaSolarRadiationParameters);
        return me;
    },

    /**
     * 缓冲区分析
     */
    bufferAnalysis: function (params) {
        var me = this;
        var bufferAnalystParameters = new SuperMap.REST.DatasetBufferAnalystParameters(params);
        var bufferAnalystService = new SuperMap.REST.BufferAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        bufferAnalystService.processAsync(bufferAnalystParameters);
        return me;
    },

    /**
     * 点密度分析
     */
    densityAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var densityKernelAnalystParameters = new SuperMap.REST.DensityKernelAnalystParameters(param);
        var densityAnalystService = new SuperMap.REST.DensityAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        densityAnalystService.processAsync(densityKernelAnalystParameters);
        return me;
    },

    /**
     * 动态分段分析
     */
    generateSpatialData: function (params) {
        var me = this;
        var generateSpatialDataParameters = new SuperMap.REST.GenerateSpatialDataParameters(params);
        var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        generateSpatialDataService.processAsync(generateSpatialDataParameters);
        return me;
    },

    /**
     * 空间关系分析
     */
    geoRelationAnalysis: function (params) {
        var me = this;
        var geoRelationAnalystParameters = new SuperMap.REST.GeoRelationAnalystParameters(params);
        var geoRelationAnalystService = new SuperMap.REST.GeoRelationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        geoRelationAnalystService.processAsync(geoRelationAnalystParameters);
        return me;
    },

    /**
     * 插值分析
     */
    interpolationAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var interpolationRBFAnalystParameters = new SuperMap.REST.InterpolationRBFAnalystParameters(param);
        var interpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        interpolationAnalystService.processAsync(interpolationRBFAnalystParameters);
        return me;
    },

    /**
     * 栅格代数运算
     */
    mathExpressionAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var mathExpressionAnalysisParameters = new SuperMap.REST.MathExpressionAnalysisParameters(param);
        var mathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        mathExpressionAnalysisService.processAsync(mathExpressionAnalysisParameters);
        return me;
    },

    /**
     * 叠加分析
     */
    overlayAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var datasetOverlayAnalystParameters = new SuperMap.REST.DatasetOverlayAnalystParameters(param);
        var overlayAnalystService = new SuperMap.REST.OverlayAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        overlayAnalystService.processAsync(datasetOverlayAnalystParameters);
        return me;
    },

    /**
     * 路由测量计算
     */
    routeCalculateMeasure: function (params) {
        var me = this, param = me._processParams(params);
        var routeCalculateMeasureParameters = new SuperMap.REST.RouteCalculateMeasureParameters(param);
        var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        routeCalculateMeasureService.processAsync(routeCalculateMeasureParameters);
        return me;
    },

    /**
     * 路由定位
     */
    routeLocate: function (params) {
        var me = this, param = me._processParams(params);
        var routeLocatorParameters = new SuperMap.REST.RouteLocatorParameters(param);
        var routeLocatorService = new SuperMap.REST.RouteLocatorService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        routeLocatorService.processAsync(routeLocatorParameters);
        return me;
    },

    /**
     * 表面分析
     */
    surfaceAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var datasetSurfaceAnalystParameters = new SuperMap.REST.DatasetSurfaceAnalystParameters(param);
        var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        surfaceAnalystService.processAsync(datasetSurfaceAnalystParameters);
        return me;
    },

    /**
     * 地形曲率计算
     */
    terrainCurvatureCalculate: function (params) {
        var me = this;
        var terrainCurvatureCalculationParameters = new SuperMap.REST.TerrainCurvatureCalculationParameters(params);
        var terrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        terrainCurvatureCalculationService.processAsync(terrainCurvatureCalculationParameters);
        return me;
    },

    /**
     * 泰森多边形分析
     */
    thiessenAnalysis: function (params) {
        var me = this;
        var datasetThiessenAnalystParameters = new SuperMap.REST.DatasetThiessenAnalystParameters(params);
        var thiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        thiessenAnalystService.processAsync(datasetThiessenAnalystParameters);
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        if (params.bounds && params.bounds instanceof L.LatLngBounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
        if (params.inputPoints) {
            for (var i = 0; i < params.inputPoints.length; i++) {
                params.inputPoints[i] = {x: arams.inputPoints[i].flatCoordinates[0], y: params.inputPoints[i].flatCoordinates[1]};
            }
        }
        if (params.extractRegion) {
            params.extractRegion = L.Util.toSuperMapGeometry(params.extractRegion);
        }
        if (params.extractParameter && params.extractParameter.clipRegion) {
            params.extractParameter.clipRegion = L.Util.toSuperMapGeometry(params.extractParameter.clipRegion);
        }
        if (params.operateRegions) {
            params.operateRegions = L.Util.toSuperMapGeometry(params.operateRegions);
        }
        if (params.sourceRoute) {
            params.sourceRoute = L.Util.toSuperMapGeometry(params.sourceRoute);
        }
        return params;
    }
});
L.supermap.spatialAnalystService = function (url, options) {
    return new SpatialAnalystService(url, options);
};
module.exports = L.supermap.spatialAnalystService;