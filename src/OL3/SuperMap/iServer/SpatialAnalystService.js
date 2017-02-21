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
}
ol.inherits(ol.supermap.SpatialAnalystService, ol.supermap.ServiceBase);

/**
 * 地区太阳辐射
 */
ol.supermap.SpatialAnalystService.prototype.getAreaSolarRadiationResult = function () {
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
};

/**
 * 缓冲区分析
 */
ol.supermap.SpatialAnalystService.prototype.bufferAnalysis = function (params) {
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
};

/**
 * 点密度分析
 */
ol.supermap.SpatialAnalystService.prototype.densityAnalysis = function (params) {
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
};

/**
 * 动态分段分析
 */
ol.supermap.SpatialAnalystService.prototype.generateSpatialData = function (params) {
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
};

/**
 * 空间关系分析
 */
ol.supermap.SpatialAnalystService.prototype.geoRelationAnalysis = function (params) {
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
};

/**
 * 插值分析
 */
ol.supermap.SpatialAnalystService.prototype.interpolationAnalysis = function (params) {
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
};

/**
 * 栅格代数运算
 */
ol.supermap.SpatialAnalystService.prototype.mathExpressionAnalysis = function (params) {
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
};

/**
 * 叠加分析
 */
ol.supermap.SpatialAnalystService.prototype.overlayAnalysis = function (params) {
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
};

/**
 * 路由测量计算
 */
ol.supermap.SpatialAnalystService.prototype.routeCalculateMeasure = function (params) {
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
};

/**
 * 路由定位
 */
ol.supermap.SpatialAnalystService.prototype.routeLocate = function (params) {
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
};

/**
 * 表面分析
 */
ol.supermap.SpatialAnalystService.prototype.surfaceAnalysis = function (params) {
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
};

/**
 * 地形曲率计算
 */
ol.supermap.SpatialAnalystService.prototype.terrainCurvatureCalculate = function (params) {
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
};

/**
 * 泰森多边形分析
 */
ol.supermap.SpatialAnalystService.prototype.thiessenAnalysis = function (params) {
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
    if (params.extractParameter && params.extractParameter.clipRegion) {
        params.extractParameter.clipRegion = this.convertGeometry(params.extractParameter.clipRegion);
    }
    if (params.operateRegions) {
        params.operateRegions = this.convertGeometry(params.operateRegions);
    }
    if (params.sourceRoute) {
        params.sourceRoute = this.convertGeometry(params.sourceRoute);
    }
    return params;
}

ol.supermap.SpatialAnalystService.prototype.convertGeometry = function (ol3Geometry) {
    return ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(ol3Geometry)));
}

module.exports = ol.supermap.SpatialAnalystService;