/**
 * Class:SpatialAnalystService
 * 空间分析服务类。
 * 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 */

require('./ServiceBase');
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

ol.supermap.SpatialAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.SpatialAnalystService, ol.supermap.ServiceBase);

/**
 * 地区太阳辐射
 * @param params {AreaSolarRadiationParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.getAreaSolarRadiationResult = function (params, resultFormat) {
    var me = this;
    var areaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    areaSolarRadiationService.processAsync(me._processParams(params));
    return me;
};

/**
 * 缓冲区分析
 * @param params {DatasetBufferAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.bufferAnalysis = function (params, resultFormat) {
    var me = this;
    var bufferAnalystService = new SuperMap.REST.BufferAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    bufferAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 点密度分析
 * @param params {DensityKernelAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.densityAnalysis = function (params, resultFormat) {
    var me = this;
    var densityAnalystService = new SuperMap.REST.DensityAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    densityAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 动态分段分析
 * @param params {GenerateSpatialDataParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.generateSpatialData = function (params, resultFormat) {
    var me = this;
    var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    generateSpatialDataService.processAsync(me._processParams(params));
    return me;
};

/**
 * 空间关系分析
 * @param params {GeoRelationAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.geoRelationAnalysis = function (params, resultFormat) {
    var me = this;
    var geoRelationAnalystService = new SuperMap.REST.GeoRelationAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    geoRelationAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 插值分析
 * @param params {InterpolationRBFAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.interpolationAnalysis = function (params, resultFormat) {
    var me = this;
    var interpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    interpolationAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 栅格代数运算
 * @param params {MathExpressionAnalysisParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.mathExpressionAnalysis = function (params, resultFormat) {
    var me = this;
    var mathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    mathExpressionAnalysisService.processAsync(me._processParams(params));
    return me;
};

/**
 * 叠加分析
 * @param params {DatasetOverlayAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.overlayAnalysis = function (params, resultFormat) {
    var me = this;
    var overlayAnalystService = new SuperMap.REST.OverlayAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    overlayAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 路由测量计算
 * @param params {RouteCalculateMeasureParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.routeCalculateMeasure = function (params, resultFormat) {
    var me = this;
    var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    routeCalculateMeasureService.processAsync(me._processParams(params));
    return me;
};

/**
 * 路由定位
 * @param params {RouteLocatorParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.routeLocate = function (params, resultFormat) {
    var me = this;
    var routeLocatorService = new SuperMap.REST.RouteLocatorService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    routeLocatorService.processAsync(me._processParams(params));
    return me;
};

/**
 * 表面分析
 * @param params {DatasetSurfaceAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.surfaceAnalysis = function (params, resultFormat) {
    var me = this;
    var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    surfaceAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地形曲率计算
 * @param params {TerrainCurvatureCalculationParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.terrainCurvatureCalculate = function (params, resultFormat) {
    var me = this;
    var terrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    terrainCurvatureCalculationService.processAsync(me._processParams(params));
    return me;
};

/**
 * 泰森多边形分析
 * @param params {DatasetThiessenAnalystParameters}
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.thiessenAnalysis = function (params, resultFormat) {
    var me = this;
    var thiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    thiessenAnalystService.processAsync(me._processParams(params));
    return me;
};

ol.supermap.SpatialAnalystService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    if (params.bounds) {
        params.bounds = new SuperMap.Bounds(
            params.bounds[0],
            params.bounds[1],
            params.bounds[2],
            params.bounds[3]
        );
    }
    if (params.inputPoints) {
        for (var i = 0; i < params.inputPoints.length; i++) {
            params.inputPoints[i] = new SuperMap.Geometry.Point(params.inputPoints[i].flatCoordinates[0], params.inputPoints[i].flatCoordinates[1]);
        }
    }
    if (params.extractRegion) {
        params.extractRegion = this.convertGeometry(params.extractRegion);
    }
    if (params.clipRegion) {
        params.clipRegion = this.convertGeometry(params.clipRegion);
    }
    if (params.sourceGeometry) {
        params.sourceGeometry = this.convertGeometry(params.sourceGeometry);
    }
    if (params.sourceRoute && params.sourceRoute.points) {
        params.sourceRoute.points = this.convertGeometry(params.sourceRoute.points);
    }
    if (params.operateRegions && ol.supermap.isArray(params.operateRegions)) {
        var me = this;
        params.operateRegions.map(function (geometry, key) {
            params.operateRegions[key] = me.convertGeometry(geometry);
        });
    }
    if (params.sourceRoute && params.sourceRoute.components && ol.supermap.isArray(params.sourceRoute.components)) {
        var me = this;
        params.sourceRoute.components.map(function (geometry, key) {
            params.sourceRoute.components[key] = me.convertGeometry(geometry);
        });
    }
    return params;
};
ol.supermap.SpatialAnalystService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : Format.GEOJSON;
};
ol.supermap.SpatialAnalystService.prototype.convertGeometry = function (ol3Geometry) {
    return ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(ol3Geometry)));
};

module.exports = ol.supermap.SpatialAnalystService;