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
     * @param resultFormat
     */
    getAreaSolarRadiationResult: function (params, resultFormat) {
        var me = this, format = me._processFormat(resultFormat);
        var areaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        areaSolarRadiationService.processAsync(params);
        return me;
    },

    /**
     * 缓冲区分析
     * @param params
     * {DatasetBufferAnalystParameters}
     * @param resultFormat
     */
    bufferAnalysis: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var bufferAnalystService = new SuperMap.REST.BufferAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        bufferAnalystService.processAsync(param);
        return me;
    },

    /**
     * 点密度分析
     * @param params
     * {DensityKernelAnalystParameters}
     * @param resultFormat
     */
    densityAnalysis: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var densityAnalystService = new SuperMap.REST.DensityAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        densityAnalystService.processAsync(param);
        return me;
    },

    /**
     * 动态分段分析
     * @param params
     * {GenerateSpatialDataParameters}
     * @param resultFormat
     */
    generateSpatialData: function (params, resultFormat) {
        var me = this, format = me._processFormat(resultFormat);
        var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        generateSpatialDataService.processAsync(params);
        return me;
    },

    /**
     * 空间关系分析
     * @param params
     * {GeoRelationAnalystParameters}
     * @param resultFormat
     */
    geoRelationAnalysis: function (params, resultFormat) {
        var me = this, format = me._processFormat(resultFormat);
        var geoRelationAnalystService = new SuperMap.REST.GeoRelationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        geoRelationAnalystService.processAsync(params);
        return me;
    },

    /**
     * 插值分析
     * @param params
     * {InterpolationRBFAnalystParameters}
     * @param resultFormat
     */
    interpolationAnalysis: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var interpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        interpolationAnalystService.processAsync(param);
        return me;
    },

    /**
     * 栅格代数运算
     * @param params
     * {MathExpressionAnalysisParameters}
     * @param resultFormat
     */
    mathExpressionAnalysis: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var mathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        mathExpressionAnalysisService.processAsync(param);
        return me;
    },

    /**
     * 叠加分析
     * @param params
     * {DatasetOverlayAnalystParameters}
     * @param resultFormat
     */
    overlayAnalysis: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var overlayAnalystService = new SuperMap.REST.OverlayAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        overlayAnalystService.processAsync(param);
        return me;
    },

    /**
     * 路由测量计算
     * @param params
     * {RouteCalculateMeasureParameters}
     * @param resultFormat
     */
    routeCalculateMeasure: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        routeCalculateMeasureService.processAsync(param);
        return me;
    },

    /**
     * 路由定位
     * @param params
     * {RouteLocatorParameters}
     * @param resultFormat
     */
    routeLocate: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var routeLocatorService = new SuperMap.REST.RouteLocatorService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        routeLocatorService.processAsync(param);
        return me;
    },

    /**
     * 表面分析
     * @param params
     * {DatasetSurfaceAnalystParameters}
     * @param resultFormat
     */
    surfaceAnalysis: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        surfaceAnalystService.processAsync(param);
        return me;
    },

    /**
     * 地形曲率计算
     * @param params
     * {TerrainCurvatureCalculationParameters}
     * @param resultFormat
     */
    terrainCurvatureCalculate: function (params, resultFormat) {
        var me = this, format = me._processFormat(resultFormat);
        var terrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        terrainCurvatureCalculationService.processAsync(params);
        return me;
    },

    /**
     * 泰森多边形分析
     * @param params
     * {DatasetThiessenAnalystParameters}
     * @param resultFormat
     */
    thiessenAnalysis: function (params, resultFormat) {
        var me = this, format = me._processFormat(resultFormat);
        var thiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
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
                var inputPoint = params.inputPoints[i];
                if (L.Util.isArray(inputPoint)) {
                    params.inputPoints[i] = {x: inputPoint[0], y: inputPoint[1]};
                }
            }
        }

        if (params.points) {
            for (var i = 0; i < params.points.length; i++) {
                var point = params.points[i];
                if (L.Util.isArray(point)) {
                    params.points[i] = {x: point[0], y: point[1]};
                }
            }
        }

        if (params.extractRegion) {
            params.extractRegion = L.Util.toSuperMapGeometry(params.extractRegion);
        }
        if (params.clipRegion) {
            params.clipRegion = L.Util.toSuperMapGeometry(params.clipRegion);
        }
        if (params.sourceGeometry) {
            params.sourceGeometry = L.Util.toSuperMapGeometry(params.sourceGeometry);
        }
        if (params.sourceRoute && params.sourceRoute.points) {
            params.sourceRoute.points = L.Util.toSuperMapGeometry(params.sourceRoute.points);
        }
        if (params.operateRegions && L.Util.isArray(params.operateRegions)) {
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = L.Util.toSuperMapGeometry(geometry);
            });
        }
        if (params.sourceRoute && params.sourceRoute.components && L.Util.isArray(params.sourceRoute.components)) {
            params.sourceRoute.components.map(function (geometry, key) {
                params.sourceRoute.components[key] = L.Util.toSuperMapGeometry(geometry);
            });
        }

        return params;
    },
    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : Format.GEOJSON;
    }
});
L.supermap.spatialAnalystService = function (url, options) {
    return new SpatialAnalystService(url, options);
};
module.exports = L.supermap.spatialAnalystService;