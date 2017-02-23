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

require('../../../Core/iServer/AreaSolarRadiationParameters');
require('../../../Core/iServer/DatasetBufferAnalystParameters');
require('../../../Core/iServer/DensityKernelAnalystParameters');
require('../../../Core/iServer/GenerateSpatialDataParameters');
require('../../../Core/iServer/GeoRelationAnalystParameters');
require('../../../Core/iServer/InterpolationRBFAnalystParameters');
require('../../../Core/iServer/MathExpressionAnalysisParameters');
require('../../../Core/iServer/DatasetOverlayAnalystParameters');
require('../../../Core/iServer/RouteCalculateMeasureParameters');
require('../../../Core/iServer/RouteLocatorParameters');
require('../../../Core/iServer/DatasetSurfaceAnalystParameters');
require('../../../Core/iServer/TerrainCurvatureCalculationParameters');
require('../../../Core/iServer/DatasetThiessenAnalystParameters');

ol.supermap.SpatialAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.SpatialAnalystService, ol.supermap.ServiceBase);

/**
 * 地区太阳辐射
 * @param params {AreaSolarRadiationParameters}
 */
ol.supermap.SpatialAnalystService.prototype.getAreaSolarRadiationResult = function (params) {
    var me = this;
    var areaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    areaSolarRadiationService.processAsync(me._processParams(params));
    return me;
};

/**
 * 缓冲区分析
 * @param params {DatasetBufferAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.bufferAnalysis = function (params) {
    var me = this;
    var bufferAnalystService = new SuperMap.REST.BufferAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    bufferAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 点密度分析
 * @param params {DensityKernelAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.densityAnalysis = function (params) {
    var me = this;
    var densityAnalystService = new SuperMap.REST.DensityAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    densityAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 动态分段分析
 * @param params {GenerateSpatialDataParameters}
 */
ol.supermap.SpatialAnalystService.prototype.generateSpatialData = function (params) {
    var me = this;
    var generateSpatialDataService = new SuperMap.REST.GenerateSpatialDataService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    generateSpatialDataService.processAsync(me._processParams(params));
    return me;
};

/**
 * 空间关系分析
 * @param params {GeoRelationAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.geoRelationAnalysis = function (params) {
    var me = this;
    var geoRelationAnalystService = new SuperMap.REST.GeoRelationAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    geoRelationAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 插值分析
 * @param params {InterpolationRBFAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.interpolationAnalysis = function (params) {
    var me = this;
    var interpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    interpolationAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 栅格代数运算
 * @param params {MathExpressionAnalysisParameters}
 */
ol.supermap.SpatialAnalystService.prototype.mathExpressionAnalysis = function (params) {
    var me = this;
    var mathExpressionAnalysisService = new SuperMap.REST.MathExpressionAnalysisService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    mathExpressionAnalysisService.processAsync(me._processParams(params));
    return me;
};

/**
 * 叠加分析
 * @param params {DatasetOverlayAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.overlayAnalysis = function (params) {
    var me = this;
    var overlayAnalystService = new SuperMap.REST.OverlayAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    overlayAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 路由测量计算
 * @param params {RouteCalculateMeasureParameters}
 */
ol.supermap.SpatialAnalystService.prototype.routeCalculateMeasure = function (params) {
    var me = this;
    var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    routeCalculateMeasureService.processAsync(me._processParams(params));
    return me;
};

/**
 * 路由定位
 * @param params {RouteLocatorParameters}
 */
ol.supermap.SpatialAnalystService.prototype.routeLocate = function (params) {
    var me = this;
    var routeLocatorService = new SuperMap.REST.RouteLocatorService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    routeLocatorService.processAsync(me._processParams(params));
    return me;
};

/**
 * 表面分析
 * @param params {DatasetSurfaceAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.surfaceAnalysis = function (params) {
    var me = this;
    var surfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    surfaceAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地形曲率计算
 * @param params {TerrainCurvatureCalculationParameters}
 */
ol.supermap.SpatialAnalystService.prototype.terrainCurvatureCalculate = function (params) {
    var me = this;
    var terrainCurvatureCalculationService = new SuperMap.REST.TerrainCurvatureCalculationService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    terrainCurvatureCalculationService.processAsync(me._processParams(params));
    return me;
};

/**
 * 泰森多边形分析
 * @param params {DatasetThiessenAnalystParameters}
 */
ol.supermap.SpatialAnalystService.prototype.thiessenAnalysis = function (params) {
    var me = this;
    var thiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
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
    if (params.sourceRoute && params.sourceRoute.points) {
        params.sourceRoute.points = this.convertGeometry(params.sourceRoute.points);
    }
    if (params.operateRegions && ol.supermap.isArray(params.operateRegions)) {
        params.operateRegions.map(function (geometry, key) {
            params.operateRegions[key] = this.convertGeometry(geometry);
        });
    }
    if (params.sourceRoute && params.sourceRoute.components && ol.supermap.isArray(params.sourceRoute.components)) {
        params.sourceRoute.components.map(function (geometry, key) {
            params.sourceRoute.components[key] = this.convertGeometry(geometry);
        });
    }
    return params;
}

ol.supermap.SpatialAnalystService.prototype.convertGeometry = function (ol3Geometry) {
    return ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(ol3Geometry)));
}

module.exports = ol.supermap.SpatialAnalystService;