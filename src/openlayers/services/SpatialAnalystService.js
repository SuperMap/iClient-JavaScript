/**
 * Class:SpatialAnalystService
 * 空间分析服务类。
 * 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * 用法：
 *      new ol.supermap.SpatialAnalystService(url)
 *      .bufferAnalysis(params,function(result){
 *          //doSomething 
 *      })
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var Util = require('../core/Util');
var SuperMap = require('../../common/SuperMap');
var AreaSolarRadiationService = require('../../common/iServer/AreaSolarRadiationService');
var BufferAnalystService = require('../../common/iServer/BufferAnalystService');
var DensityAnalystService = require('../../common/iServer/DensityAnalystService');
var GenerateSpatialDataService = require('../../common/iServer/GenerateSpatialDataService');
var GeoRelationAnalystService = require('../../common/iServer/GeoRelationAnalystService');
var InterpolationAnalystService = require('../../common/iServer/InterpolationAnalystService');
var MathExpressionAnalysisService = require('../../common/iServer/MathExpressionAnalysisService');
var OverlayAnalystService = require('../../common/iServer/OverlayAnalystService');
var RouteCalculateMeasureService = require('../../common/iServer/RouteCalculateMeasureService');
var RouteLocatorService = require('../../common/iServer/RouteLocatorService');
var SurfaceAnalystService = require('../../common/iServer/SurfaceAnalystService');
var TerrainCurvatureCalculationService = require('../../common/iServer/TerrainCurvatureCalculationService');
var ThiessenAnalystService = require('../../common/iServer/ThiessenAnalystService');

/**
 * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst 。
 * options - {Object} 参数。
 * @param url
 * @param options
 */
ol.supermap.SpatialAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.SpatialAnalystService, ol.supermap.ServiceBase);

/**
 * 地区太阳辐射
 * @param params
 * {AreaSolarRadiationParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.getAreaSolarRadiationResult = function (params, callback, resultFormat) {
    var me = this;
    var areaSolarRadiationService = new AreaSolarRadiationService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    areaSolarRadiationService.processAsync(params);
    return me;
};

/**
 * 缓冲区分析
 * @param params
 * {DatasetBufferAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.bufferAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var bufferAnalystService = new BufferAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    bufferAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 点密度分析
 * @param params
 * {DensityKernelAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.densityAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var densityAnalystService = new DensityAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    densityAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 动态分段分析
 * @param params
 * {GenerateSpatialDataParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.generateSpatialData = function (params, callback, resultFormat) {
    var me = this;
    var generateSpatialDataService = new GenerateSpatialDataService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    generateSpatialDataService.processAsync(params);
    return me;
};

/**
 * 空间关系分析
 * @param params
 * {GeoRelationAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.geoRelationAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var geoRelationAnalystService = new GeoRelationAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    geoRelationAnalystService.processAsync(params);
    return me;
};

/**
 * 插值分析
 * @param params
 * {InterpolationRBFAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.interpolationAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var interpolationAnalystService = new InterpolationAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    interpolationAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 栅格代数运算
 * @param params
 * {MathExpressionAnalysisParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.mathExpressionAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var mathExpressionAnalysisService = new MathExpressionAnalysisService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    mathExpressionAnalysisService.processAsync(me._processParams(params));
    return me;
};

/**
 * 叠加分析
 * @param params
 * {DatasetOverlayAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.overlayAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var overlayAnalystService = new OverlayAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    overlayAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 路由测量计算
 * @param params
 * {RouteCalculateMeasureParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.routeCalculateMeasure = function (params, callback, resultFormat) {
    var me = this;
    var routeCalculateMeasureService = new RouteCalculateMeasureService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    routeCalculateMeasureService.processAsync(me._processParams(params));
    return me;
};

/**
 * 路由定位
 * @param params
 * {RouteLocatorParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.routeLocate = function (params, callback, resultFormat) {
    var me = this;
    var routeLocatorService = new RouteLocatorService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    routeLocatorService.processAsync(me._processParams(params));
    return me;
};

/**
 * 表面分析
 * @param params
 * {DatasetSurfaceAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.surfaceAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var surfaceAnalystService = new SurfaceAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    surfaceAnalystService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地形曲率计算
 * @param params
 * {TerrainCurvatureCalculationParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.terrainCurvatureCalculate = function (params, callback, resultFormat) {
    var me = this;
    var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    terrainCurvatureCalculationService.processAsync(params);
    return me;
};

/**
 * 泰森多边形分析
 * @param params
 * {DatasetThiessenAnalystParameters}
 * @param callback
 * @param resultFormat
 */
ol.supermap.SpatialAnalystService.prototype.thiessenAnalysis = function (params, callback, resultFormat) {
    var me = this;
    var thiessenAnalystService = new ThiessenAnalystService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
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
            var inputPoint = params.points[i];
            if (Util.isArray(inputPoint)) {
                inputPoint.flatCoordinates = inputPoint;
            }
            params.inputPoints[i] = new SuperMap.Geometry.Point(inputPoint.flatCoordinates[0], inputPoint.flatCoordinates[1]);
        }
    }
    if (params.points) {
        for (var i = 0; i < params.points.length; i++) {
            var point = params.points[i];
            if (Util.isArray(point)) {
                point.flatCoordinates = point;
            }
            params.points[i] = new SuperMap.Geometry.Point(point.flatCoordinates[0], point.flatCoordinates[1]);
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
    if (params.operateRegions && Util.isArray(params.operateRegions)) {
        var me = this;
        params.operateRegions.map(function (geometry, key) {
            params.operateRegions[key] = me.convertGeometry(geometry);
        });
    }
    if (params.sourceRoute && params.sourceRoute.components && Util.isArray(params.sourceRoute.components)) {
        var me = this;
        params.sourceRoute.components.map(function (geometry, key) {
            params.sourceRoute.components[key] = me.convertGeometry(geometry);
        });
    }
    return params;
};

ol.supermap.SpatialAnalystService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

ol.supermap.SpatialAnalystService.prototype.convertGeometry = function (ol3Geometry) {
    return Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(ol3Geometry)));
};
module.exports = ol.supermap.SpatialAnalystService;