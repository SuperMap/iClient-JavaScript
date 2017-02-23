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
     * @param params
     * {AreaSolarRadiationParameters}
     */
    getAreaSolarRadiationResult: function (params) {
        var me = this;
        var areaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        areaSolarRadiationService.processAsync(params);
        return me;
    },

    /**
     * 缓冲区分析
     * @param params
     * {DatasetBufferAnalystParameters}
     */
    bufferAnalysis: function (params) {
        var me = this;
        var bufferAnalystService = new SuperMap.REST.BufferAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        bufferAnalystService.processAsync(params);
        return me;
    },

    /**
     * 点密度分析
     * @param params
     * {DensityKernelAnalystParameters}
     */
    densityAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var densityAnalystService = new SuperMap.REST.DensityAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        densityAnalystService.processAsync(param);
        return me;
    },

    /**
     * 动态分段分析
     * @param params
     * {GenerateSpatialDataParameters}
     */
    generateSpatialData: function (params) {
        var me = this;
        var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        generateSpatialDataService.processAsync(params);
        return me;
    },

    /**
     * 空间关系分析
     * @param params
     * {GeoRelationAnalystParameters}
     */
    geoRelationAnalysis: function (params) {
        var me = this;
        var geoRelationAnalystService = new SuperMap.REST.GeoRelationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        geoRelationAnalystService.processAsync(params);
        return me;
    },

    /**
     * 插值分析
     * @param params
     * {InterpolationRBFAnalystParameters}
     */
    interpolationAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var interpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        interpolationAnalystService.processAsync(param);
        return me;
    },

    /**
     * 栅格代数运算
     * @param params
     * {MathExpressionAnalysisParameters}
     */
    mathExpressionAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var mathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        mathExpressionAnalysisService.processAsync(param);
        return me;
    },

    /**
     * 叠加分析
     * @param params
     * {DatasetOverlayAnalystParameters}
     */
    overlayAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var overlayAnalystService = new SuperMap.REST.OverlayAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        overlayAnalystService.processAsync(param);
        return me;
    },

    /**
     * 路由测量计算
     * @param params
     * {RouteCalculateMeasureParameters}
     */
    routeCalculateMeasure: function (params) {
        var me = this, param = me._processParams(params);
        var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        routeCalculateMeasureService.processAsync(param);
        return me;
    },

    /**
     * 路由定位
     * @param params
     * {RouteLocatorParameters}
     */
    routeLocate: function (params) {
        var me = this, param = me._processParams(params);
        var routeLocatorService = new SuperMap.REST.RouteLocatorService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        routeLocatorService.processAsync(param);
        return me;
    },

    /**
     * 表面分析
     * @param params
     * {DatasetSurfaceAnalystParameters}
     */
    surfaceAnalysis: function (params) {
        var me = this, param = me._processParams(params);
        var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        surfaceAnalystService.processAsync(param);
        return me;
    },

    /**
     * 地形曲率计算
     * @param params
     * {TerrainCurvatureCalculationParameters}
     */
    terrainCurvatureCalculate: function (params) {
        var me = this;
        var terrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        terrainCurvatureCalculationService.processAsync(params);
        return me;
    },

    /**
     * 泰森多边形分析
     * @param params
     * {DatasetThiessenAnalystParameters}
     */
    thiessenAnalysis: function (params) {
        var me = this;
        var thiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        thiessenAnalystService.processAsync(params);
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
        if (params.clipRegion) {
            params.clipRegion = L.Util.toSuperMapGeometry(params.clipRegion);
        }
        if (params.sourceRoute && params.sourceRoute.points) {
            params.sourceRoute.points = L.Util.toSuperMapGeometry(params.sourceRoute.points);
        }
        if (params.operateRegions && ol.supermap.isArray(params.operateRegions)) {
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = L.Util.toSuperMapGeometry(geometry);
            });
        }
        if (params.sourceRoute && params.sourceRoute.components && ol.supermap.isArray(params.sourceRoute.components)) {
            params.sourceRoute.components.map(function (geometry, key) {
                params.sourceRoute.components[key] = L.Util.toSuperMapGeometry(geometry);
            });
        }
        
        return params;
    }
});
L.supermap.spatialAnalystService = function (url, options) {
    return new SpatialAnalystService(url, options);
};
module.exports = L.supermap.spatialAnalystService;