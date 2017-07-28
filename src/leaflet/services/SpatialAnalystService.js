/**
 * @class L.supermap.SpatialAnalystService
 * @constructs SuperMap.SpatialAnalystService
 * @classdesc
 * 空间分析服务类。
 * 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @example 用法：
 *      L.supermap.spatialAnalystService(url)
 *      .bufferAnalysis(params,function(result){
 *          //doSomething
 *      })
 * @extends{ServiceBase}
 * @api
 */

var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var Util = require('../core/Util');
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

var SpatialAnalystService = ServiceBase.extend({

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
     * @method L.supermap.SpatialAnalystService.getAreaSolarRadiationResult
     * @description 地区太阳辐射
     * @param params {AreaSolarRadiationParameters}
     * @param callback
     * @param resultFormat
     */
    getAreaSolarRadiationResult: function (params, callback, resultFormat) {
        var me = this;
        var areaSolarRadiationService = new AreaSolarRadiationService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.bufferAnalysis
     * @description 缓冲区分析
     * @param params {DatasetBufferAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    bufferAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var bufferAnalystService = new BufferAnalystService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.densityAnalysis
     * @description 点密度分析
     * @param params {DensityKernelAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    densityAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var densityAnalystService = new DensityAnalystService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.generateSpatialData
     * @description 动态分段分析
     * @param params {GenerateSpatialDataParameters}
     * @param callback
     * @param resultFormat
     */
    generateSpatialData: function (params, callback, resultFormat) {
        var me = this;
        var generateSpatialDataService = new GenerateSpatialDataService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.generateSpatialData
     * @description 空间关系分析
     * @param params {GeoRelationAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    geoRelationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var geoRelationAnalystService = new GeoRelationAnalystService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.interpolationAnalysis
     * @description 插值分析
     * @param params {InterpolationRBFAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    interpolationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var interpolationAnalystService = new InterpolationAnalystService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.mathExpressionAnalysis
     * @description 栅格代数运算
     * @param params {MathExpressionAnalysisParameters}
     * @param callback
     * @param resultFormat
     */
    mathExpressionAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var mathExpressionAnalysisService = new MathExpressionAnalysisService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.overlayAnalysis
     * @description 叠加分析
     * @param params {DatasetOverlayAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    overlayAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var overlayAnalystService = new OverlayAnalystService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.routeCalculateMeasure
     * @description 路由测量计算
     * @param params {RouteCalculateMeasureParameters}
     * @param callback
     * @param resultFormat
     */
    routeCalculateMeasure: function (params, callback, resultFormat) {
        var me = this;
        var routeCalculateMeasureService = new RouteCalculateMeasureService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.routeLocate
     * @description 路由定位
     * @param params {RouteLocatorParameters}
     * @param callback
     * @param resultFormat
     */
    routeLocate: function (params, callback, resultFormat) {
        var me = this;
        var routeLocatorService = new RouteLocatorService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.surfaceAnalysis
     * @description 表面分析
     * @param params {DatasetSurfaceAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    surfaceAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var surfaceAnalystService = new SurfaceAnalystService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.terrainCurvatureCalculate
     * @description 地形曲率计算
     * @param params {TerrainCurvatureCalculationParameters}
     * @param callback
     * @param resultFormat
     */
    terrainCurvatureCalculate: function (params, callback, resultFormat) {
        var me = this;
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(me.url, {
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
    },

    /**
     * @method L.supermap.SpatialAnalystService.thiessenAnalysis
     * @description 泰森多边形分析
     * @param params {DatasetThiessenAnalystParameters}
     * @param callback
     * @param resultFormat
     */
    thiessenAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var thiessenAnalystService = new ThiessenAnalystService(me.url, {
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
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        if (params.bounds) {
            params.bounds = L.supermap.CommontypesConversion.toSuperMapBounds(params.bounds);
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
            params.extractRegion = Util.toSuperMapGeometry(params.extractRegion);
        }
        if (params.clipRegion) {
            params.clipRegion = Util.toSuperMapGeometry(params.clipRegion);
        }
        if (params.sourceGeometry) {
            params.sourceGeometry = Util.toSuperMapGeometry(params.sourceGeometry);
        }
        if (params.sourceRoute && params.sourceRoute.points) {
            params.sourceRoute.points = Util.toSuperMapGeometry(params.sourceRoute.points);
        }
        if (params.operateRegions && L.Util.isArray(params.operateRegions)) {
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = Util.toSuperMapGeometry(geometry);
            });
        }
        if (params.sourceRoute && params.sourceRoute.components && L.Util.isArray(params.sourceRoute.components)) {
            params.sourceRoute.components.map(function (geometry, key) {
                params.sourceRoute.components[key] = Util.toSuperMapGeometry(geometry);
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
module.exports = SpatialAnalystService;