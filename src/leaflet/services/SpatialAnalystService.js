import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import * as Util from '../core/Util';
import {CommontypesConversion} from '../core/CommontypesConversion';
import {
    DataFormat,
    AreaSolarRadiationService,
    BufferAnalystService,
    DensityAnalystService,
    GenerateSpatialDataService,
    GeoRelationAnalystService,
    InterpolationAnalystService,
    MathExpressionAnalysisService,
    OverlayAnalystService,
    RouteCalculateMeasureService,
    RouteLocatorService,
    SurfaceAnalystService,
    TerrainCurvatureCalculationService,
    ThiessenAnalystService,
    GeometryBatchAnalystService
} from '@supermap/iclient-common';

/**
 * @class L.supermap.spatialAnalystService
 * @classdesc 空间分析服务类。
 * @category  iServer SpatialAnalyst
 * @description 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @extends L.supermap.ServiceBase
 * @example
 *      L.supermap.spatialAnalystService(url)
 *      .bufferAnalysis(params,function(result){
 *          //doSomething
 *      })
 * @param url -{string} 空间分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
 */
export var SpatialAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },
    /**
     * @function L.supermap.spatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射
     * @param params - {SuperMap.AreaSolarRadiationParameters} 地区太阳辐射参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    getAreaSolarRadiationResult: function (params, callback, resultFormat) {
        var me = this;
        var areaSolarRadiationService = new AreaSolarRadiationService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        areaSolarRadiationService.processAsync(params);
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析
     * @param params - {SuperMap.DatasetBufferAnalystParameters} 数据集缓冲区分析参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    bufferAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var bufferAnalystService = new BufferAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        bufferAnalystService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析
     * @param params - {SuperMap.DensityKernelAnalystParameters} 核密度分析参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    densityAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var densityAnalystService = new DensityAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        densityAnalystService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析
     * @param params - {SuperMap.GenerateSpatialDataParameters} 动态分段操作参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    generateSpatialData: function (params, callback, resultFormat) {
        var me = this;
        var generateSpatialDataService = new GenerateSpatialDataService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        generateSpatialDataService.processAsync(params);
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.generateSpatialData
     * @description 空间关系分析
     * @param params - {SuperMap.GeoRelationAnalystParameters} 空间关系分析服务参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    geoRelationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var geoRelationAnalystService = new GeoRelationAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        geoRelationAnalystService.processAsync(params);
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析
     * @param params - {SuperMap.InterpolationRBFAnalystParameters} 样条插值（径向基函数插值法）分析参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    interpolationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var interpolationAnalystService = new InterpolationAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        interpolationAnalystService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算
     * @param params - {SuperMap.MathExpressionAnalysisParameters} 栅格代数运算参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    mathExpressionAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var mathExpressionAnalysisService = new MathExpressionAnalysisService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        mathExpressionAnalysisService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析
     * @param params - {SuperMap.DatasetOverlayAnalystParameters|SuperMap.GeometryOverlayAnalystParameters} 叠加分析参数类，支持批量几何要素叠加分析。
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    overlayAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var overlayAnalystService = new OverlayAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        overlayAnalystService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算
     * @param params - {SuperMap.RouteCalculateMeasureParameters} 基于路由对象计算指定点M值操作的参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    routeCalculateMeasure: function (params, callback, resultFormat) {
        var me = this;
        var routeCalculateMeasureService = new RouteCalculateMeasureService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        routeCalculateMeasureService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.routeLocate
     * @description 路由定位
     * @param params - {SuperMap.RouteLocatorParameters} 路由对象定位空间对象的参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    routeLocate: function (params, callback, resultFormat) {
        var me = this;
        var routeLocatorService = new RouteLocatorService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        routeLocatorService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析
     * @param params - {SuperMap.SurfaceAnalystParameters} 表面分析参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    surfaceAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var surfaceAnalystService = new SurfaceAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        surfaceAnalystService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算
     * @param params - {SuperMap.TerrainCurvatureCalculationParameters} 地形曲率计算参数类。
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    terrainCurvatureCalculate: function (params, callback, resultFormat) {
        var me = this;
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        terrainCurvatureCalculationService.processAsync(params);
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析
     * @param params - {SuperMap.DatasetThiessenAnalystParameters} 数据集泰森多边形分析参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    thiessenAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var thiessenAnalystService = new ThiessenAnalystService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        thiessenAnalystService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.spatialAnalystService.prototype.geometrybatchAnalysis
     * @description 批量空间分析
     * @param params - {Array} 批量分析参数对象数组；包括：</br>
     *                            analystName - {string} 空间分析方法的名称。包括：</br>
     *                                     "buffer","overlay","interpolationDensity","interpolationidw","interpolationRBF","interpolationKriging","isoregion","isoline"
     *                            param - {Object} 空间分析类型对应的请求参数，包括：</br>
     *                                    {SuperMap.GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     *                                    {SuperMap.GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     *                                    {SuperMap.InterpolationAnalystParameters} 插值分析参数类。</br>
     *                                    {SuperMap.SurfaceAnalystParameters} 表面分析参数类。</br>
     * @param callback
     * @param resultFormat
     */
    geometrybatchAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var geometryBatchAnalystService = new GeometryBatchAnalystService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        //处理批量分析中各个分类类型的参数：
        var analystParameters = [];
        for (var i = 0; i < params.length; i++) {
            var tempParameter = params[i];
            analystParameters.push({
                analystName: tempParameter.analystName,
                param: me._processParams(tempParameter.param)
            })
        }

        geometryBatchAnalystService.processAsync(analystParameters);
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        if (params.bounds) {
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds);
        }
        if (params.inputPoints) {
            for (let i = 0; i < params.inputPoints.length; i++) {
                let inputPoint = params.inputPoints[i];
                if (L.Util.isArray(inputPoint)) {
                    params.inputPoints[i] = {x: inputPoint[0], y: inputPoint[1], tag: inputPoint[2]};
                }
            }
        }

        if (params.points) {
            for (let i = 0; i < params.points.length; i++) {
                let point = params.points[i];
                if (L.Util.isArray(point)) {
                    params.points[i] = {x: point[0], y: point[1]};
                } else if (point instanceof L.LatLng) {
                    params.points[i] = {x: point.lng, y: point.lat};
                } else {
                    params.points[i] = {x: point.x, y: point.y};
                }
            }
        }
        if (params.point) {
            if (L.Util.isArray(params.point)) {
                params.point = {x: params.point[0], y: params.point[1]};
            } else if (params.point instanceof L.LatLng) {
                params.point = {x: params.point.lng, y: params.point.lat};
            } else {
                params.point = {x: params.point.x, y: params.point.y};
            }

        }
        if (params.extractRegion) {
            params.extractRegion = Util.toSuperMapGeometry(params.extractRegion);
        }
        if (params.extractParameter && params.extractParameter.clipRegion) {
            params.extractParameter.clipRegion = Util.toSuperMapGeometry(params.extractParameter.clipRegion);
        }
        //支持格式：Vector Layers; GeoJson
        if (params.sourceGeometry) {
            params.sourceGeometry = Util.toSuperMapGeometry(params.sourceGeometry);
        }
        if (params.operateGeometry) {
            params.operateGeometry = Util.toSuperMapGeometry(params.operateGeometry);
        }
        //支持传入多个几何要素进行叠加分析：
        if (params.sourceGeometries) {
            var sourceGeometries = [];
            for (var k = 0; k < params.sourceGeometries.length; k++) {
                sourceGeometries.push(Util.toSuperMapGeometry(params.sourceGeometries[k]));
            }
            params.sourceGeometries = sourceGeometries;
        }
        //支持传入多个几何要素进行叠加分析：
        if (params.operateGeometries) {
            var operateGeometries = [];
            for (var j = 0; j < params.operateGeometries.length; j++) {
                operateGeometries.push(Util.toSuperMapGeometry(params.operateGeometries[j]));
            }
            params.operateGeometries = operateGeometries;
        }
        if (params.sourceRoute) {
            if (params.sourceRoute instanceof L.Polyline) {
                var target = {};
                target.type = "LINEM"
                target.parts = [params.sourceRoute.getLatLngs().length];
                target.points = [];
                for (let i = 0; i < params.sourceRoute.getLatLngs().length; i++) {
                    let point = params.sourceRoute.getLatLngs()[i];
                    target.points = target.points.concat({x: point.lng, y: point.lat, measure: point.alt})
                }
                params.sourceRoute = target;
            }

        }
        if (params.operateRegions && L.Util.isArray(params.operateRegions)) {
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = Util.toSuperMapGeometry(geometry);
                return params.operateRegions[key];
            });
        }
        // if (params.sourceRoute && params.sourceRoute.components && L.Util.isArray(params.sourceRoute.components)) {
        //     params.sourceRoute.components.map(function (geometry, key) {
        //         params.sourceRoute.components[key] = Util.toSuperMapGeometry(geometry);
        //     });
        // }

        return params;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
});
export var spatialAnalystService = function (url, options) {
    return new SpatialAnalystService(url, options);
};

L.supermap.spatialAnalystService = spatialAnalystService;