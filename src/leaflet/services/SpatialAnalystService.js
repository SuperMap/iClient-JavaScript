/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @param {string} url - 空间分析服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {L.supermap.ServiceBase}
 */
export var SpatialAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },
    /**
     * @function L.supermap.spatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射。
     * @param {SuperMap.AreaSolarRadiationParameters} params - 地区太阳辐射参数类
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getAreaSolarRadiationResult: function (params, callback, resultFormat) {
        var me = this;
        var areaSolarRadiationService = new AreaSolarRadiationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 缓冲区分析。
     * @param {SuperMap.DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    bufferAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var bufferAnalystService = new BufferAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 点密度分析。
     * @param {SuperMap.DensityKernelAnalystParameters} params - 核密度分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    densityAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var densityAnalystService = new DensityAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 动态分段分析。
     * @param {SuperMap.GenerateSpatialDataParameters} params - 动态分段操作参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    generateSpatialData: function (params, callback, resultFormat) {
        var me = this;
        var generateSpatialDataService = new GenerateSpatialDataService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @function L.supermap.spatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析。
     * @param {SuperMap.GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    geoRelationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var geoRelationAnalystService = new GeoRelationAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 插值分析。
     * @param {SuperMap.InterpolationRBFAnalystParameters} params - 样条插值（径向基函数插值法）分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    interpolationAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var interpolationAnalystService = new InterpolationAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 栅格代数运算。
     * @param {SuperMap.MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    mathExpressionAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var mathExpressionAnalysisService = new MathExpressionAnalysisService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 叠加分析。
     * @param {SuperMap.DatasetOverlayAnalystParameters|SuperMap.GeometryOverlayAnalystParameters} params - 叠加分析参数类，支持批量几何要素叠加分析。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    overlayAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var overlayAnalystService = new OverlayAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 路由测量计算。
     * @param {SuperMap.RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    routeCalculateMeasure: function (params, callback, resultFormat) {
        var me = this;
        var routeCalculateMeasureService = new RouteCalculateMeasureService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials, 
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 路由定位。
     * @param {SuperMap.RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    routeLocate: function (params, callback, resultFormat) {
        var me = this;
        var routeLocatorService = new RouteLocatorService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 表面分析。
     * @param {SuperMap.SurfaceAnalystParameters} params - 表面分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    surfaceAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var surfaceAnalystService = new SurfaceAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 地形曲率计算。
     * @param {SuperMap.TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    terrainCurvatureCalculate: function (params, callback, resultFormat) {
        var me = this;
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 泰森多边形分析。
     * @param {SuperMap.DatasetThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    thiessenAnalysis: function (params, callback, resultFormat) {
        var me = this;
        var thiessenAnalystService = new ThiessenAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
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
     * @description 批量空间分析。
     * @param {Array} params -批量分析参数对象数组；包括：</br>
     * @param {string} params.analystName -  空间分析方法的名称。包括：</br>
     * "buffer","overlay","interpolationDensity","interpolationidw","interpolationRBF","interpolationKriging","isoregion","isoline"
     * @param {Object} param - 空间分析类型对应的请求参数，包括：</br>
     * {SuperMap.GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     * {SuperMap.GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     * {SuperMap.InterpolationAnalystParameters} 插值分析参数类。</br>
     * {SuperMap.SurfaceAnalystParameters} 表面分析参数类。</br>
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
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
        if (params.clipParam && params.clipParam.clipRegion) {
            params.clipParam.clipRegion = Util.toSuperMapGeometry(params.clipParam.clipRegion);
        }
        //支持格式：Vector Layers; GeoJson
        if (params.sourceGeometry) {
            var SRID = null;
            if (params.sourceGeometrySRID) {
                SRID = params.sourceGeometrySRID;
            }
            params.sourceGeometry = Util.toSuperMapGeometry(params.sourceGeometry);
            if (SRID) {
                params.sourceGeometry.SRID = SRID;
            }
            delete params.sourceGeometry.sourceGeometrySRID;
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