/**
 * Class:SpatialAnalystService
 * 空间分析服务类。
 * 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * 用法：
 *      L.superMap.spatialAnalystService(url)
 *      .bufferAnalysis(params,function(result){
 *          //doSomething 
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/AreaSolarRadiationService');
require('../../common/iServer/BufferAnalystService');
require('../../common/iServer/DensityAnalystService');
require('../../common/iServer/GenerateSpatialDataService');
require('../../common/iServer/GeoRelationAnalystService');
require('../../common/iServer/InterpolationAnalystService');
require('../../common/iServer/MathExpressionAnalysisService');
require('../../common/iServer/OverlayAnalystService');
require('../../common/iServer/RouteCalculateMeasureService');
require('../../common/iServer/RouteLocatorService');
require('../../common/iServer/SurfaceAnalystService');
require('../../common/iServer/TerrainCurvatureCalculationService');
require('../../common/iServer/ThiessenAnalystService');

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
     * @param callback
     * @param resultFormat
     */
    getAreaSolarRadiationResult: function (params, callback, resultFormat) {
        var me = this;
        var areaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        areaSolarRadiationService.processAsync(params);
        return me;
    },

    /**
     * 缓冲区分析
     * @param params
     * {DatasetBufferAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    bufferAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var bufferAnalystService = new SuperMap.REST.BufferAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        bufferAnalystService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 点密度分析
     * @param params
     * {DensityKernelAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    densityAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var densityAnalystService = new SuperMap.REST.DensityAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        densityAnalystService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 动态分段分析
     * @param params
     * {GenerateSpatialDataParameters}
     * @param callback
     * @param resultFormat
     */
    generateSpatialData: function (params, callback, resultFormat) {
        var me = this;
        var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        generateSpatialDataService.processAsync(params);
        return me;
    },

    /**
     * 空间关系分析
     * @param params
     * {GeoRelationAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    geoRelationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var geoRelationAnalystService = new SuperMap.REST.GeoRelationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        geoRelationAnalystService.processAsync(params);
        return me;
    },

    /**
     * 插值分析
     * @param params
     * {InterpolationRBFAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    interpolationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var interpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        interpolationAnalystService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 栅格代数运算
     * @param params
     * {MathExpressionAnalysisParameters}
     * @param callback
     * @param resultFormat
     */
    mathExpressionAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var mathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        mathExpressionAnalysisService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 叠加分析
     * @param params
     * {DatasetOverlayAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    overlayAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var overlayAnalystService = new SuperMap.REST.OverlayAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        overlayAnalystService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 路由测量计算
     * @param params
     * {RouteCalculateMeasureParameters}
     * @param callback
     * @param resultFormat
     */
    routeCalculateMeasure: function (params, callback, resultFormat) {
        var me = this;
        var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        routeCalculateMeasureService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 路由定位
     * @param params
     * {RouteLocatorParameters}
     * @param callback
     * @param resultFormat
     */
    routeLocate: function (params, callback, resultFormat) {
        var me = this;
        var routeLocatorService = new SuperMap.REST.RouteLocatorService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        routeLocatorService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 表面分析
     * @param params
     * {DatasetSurfaceAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    surfaceAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        surfaceAnalystService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 地形曲率计算
     * @param params
     * {TerrainCurvatureCalculationParameters}
     * @param callback
     * @param resultFormat
     */
    terrainCurvatureCalculate: function (params, callback, resultFormat) {
        var me = this;
        var terrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        terrainCurvatureCalculationService.processAsync(params);
        return me;
    },

    /**
     * 泰森多边形分析
     * @param params
     * {DatasetThiessenAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    thiessenAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var thiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        thiessenAnalystService.processAsync(me._processParams(params));
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
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});
L.supermap.spatialAnalystService = function (url, options) {
    return new SpatialAnalystService(url, options);
};
module.exports = L.supermap.spatialAnalystService;