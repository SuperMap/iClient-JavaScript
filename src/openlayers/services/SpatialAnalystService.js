/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import { DataFormat } from '@supermap/iclient-common/REST';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { AreaSolarRadiationService } from '@supermap/iclient-common/iServer/AreaSolarRadiationService';
import { BufferAnalystService } from '@supermap/iclient-common/iServer/BufferAnalystService';
import { DensityAnalystService } from '@supermap/iclient-common/iServer/DensityAnalystService';
import { GenerateSpatialDataService } from '@supermap/iclient-common/iServer/GenerateSpatialDataService';
import { GeoRelationAnalystService } from '@supermap/iclient-common/iServer/GeoRelationAnalystService';
import { InterpolationAnalystService } from '@supermap/iclient-common/iServer/InterpolationAnalystService';
import { MathExpressionAnalysisService } from '@supermap/iclient-common/iServer/MathExpressionAnalysisService';
import { OverlayAnalystService } from '@supermap/iclient-common/iServer/OverlayAnalystService';
import { RouteCalculateMeasureService } from '@supermap/iclient-common/iServer/RouteCalculateMeasureService';
import { RouteLocatorService } from '@supermap/iclient-common/iServer/RouteLocatorService';
import { SurfaceAnalystService } from '@supermap/iclient-common/iServer/SurfaceAnalystService';
import { TerrainCurvatureCalculationService } from '@supermap/iclient-common/iServer/TerrainCurvatureCalculationService';
import { ThiessenAnalystService } from '@supermap/iclient-common/iServer/ThiessenAnalystService';
import { GeometryBatchAnalystService } from '@supermap/iclient-common/iServer/GeometryBatchAnalystService';

import {ServiceBase} from './ServiceBase';
import LineString from 'ol/geom/LineString';
import GeoJSON from 'ol/format/GeoJSON';

/**
 * @class SpatialAnalystService
 * @extends {ServiceBase}
 * @category  iServer SpatialAnalyst
 * @classdesc 空间分析服务类。提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @example
 *      new SpatialAnalystService(url).bufferAnalysis(params,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务的访问地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SpatialAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function SpatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射。
     * @param {AreaSolarRadiationParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    getAreaSolarRadiationResult(params, callback, resultFormat) {
        var me = this;
        var areaSolarRadiationService = new AreaSolarRadiationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        areaSolarRadiationService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析。
     * @param {DatasetBufferAnalystParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    bufferAnalysis(params, callback, resultFormat) {
        var me = this;
        var bufferAnalystService = new BufferAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        bufferAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析。
     * @param {DensityKernelAnalystParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    densityAnalysis(params, callback, resultFormat) {
        var me = this;
        var densityAnalystService = new DensityAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        densityAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析。
     * @param {GenerateSpatialDataParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    generateSpatialData(params, callback, resultFormat) {
        var me = this;
        var generateSpatialDataService = new GenerateSpatialDataService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        generateSpatialDataService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析。
     * @param {GeoRelationAnalystParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    geoRelationAnalysis(params, callback, resultFormat) {
        var me = this;
        var geoRelationAnalystService = new GeoRelationAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        geoRelationAnalystService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析。
     * @param {InterpolationRBFAnalystParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    interpolationAnalysis(params, callback, resultFormat) {
        var me = this;
        var interpolationAnalystService = new InterpolationAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        interpolationAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算。
     * @param {MathExpressionAnalysisParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    mathExpressionAnalysis(params, callback, resultFormat) {
        var me = this;
        var mathExpressionAnalysisService = new MathExpressionAnalysisService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        mathExpressionAnalysisService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析。
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 叠加分析参数类，支持批量几何要素叠加分析。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    overlayAnalysis(params, callback, resultFormat) {
        var me = this;
        var overlayAnalystService = new OverlayAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        overlayAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算。
     * @param {RouteCalculateMeasureParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    routeCalculateMeasure(params, callback, resultFormat) {
        var me = this;
        var routeCalculateMeasureService = new RouteCalculateMeasureService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        routeCalculateMeasureService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.routeLocate
     * @description 路由定位。
     * @param {RouteLocatorParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    routeLocate(params, callback, resultFormat) {
        var me = this;
        var routeLocatorService = new RouteLocatorService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        routeLocatorService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析。
     * @param {SurfaceAnalystParameters} params - 表面分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    surfaceAnalysis(params, callback, resultFormat) {
        var me = this;
        var surfaceAnalystService = new SurfaceAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        surfaceAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算。
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算相关参数。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    terrainCurvatureCalculate(params, callback, resultFormat) {
        var me = this;
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        terrainCurvatureCalculationService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析。
     * @param {DatasetThiessenAnalystParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    thiessenAnalysis(params, callback, resultFormat) {
        var me = this;
        var thiessenAnalystService = new ThiessenAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        thiessenAnalystService.processAsync(me._processParams(params));
    }

    /**
     * @function SpatialAnalystService.prototype.geometrybatchAnalysis
     * @description 批量空间分析。
     * @param {Array} params - 批量分析参数对象数组。
     * @param {Array.<Object>} params.analystName - 空间分析方法的名称。包括：</br>
     *                                     "buffer"，"overlay"，"interpolationDensity"，"interpolationidw"，"interpolationRBF"，"interpolationKriging"，"isoregion"，"isoline"。
     * @param {Object} params.param - 空间分析类型对应的请求参数，包括：</br>
     *                                {GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     *                                {GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     *                                {InterpolationAnalystParameters} 插值分析参数类。</br>
     *                                {SurfaceAnalystParameters} 表面分析参数类。</br>
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    geometrybatchAnalysis(params, callback, resultFormat) {
        var me = this;
        var geometryBatchAnalystService = new GeometryBatchAnalystService(me.url, {

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
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.bounds) {
            params.bounds = Util.toSuperMapBounds(params.bounds);
        }
        if (params.inputPoints) {
            for (let i = 0; i < params.inputPoints.length; i++) {
                var inputPoint = params.inputPoints[i];
                if (Util.isArray(inputPoint)) {
                    params.inputPoints[i] = {x: inputPoint[0], y: inputPoint[1], tag: inputPoint[2]};
                } else {
                    params.inputPoints[i] = {
                        x: inputPoint.getCoordinates()[0],
                        y: inputPoint.getCoordinates()[1],
                        tag: inputPoint.tag
                    };
                }

            }
        }
        if (params.points) {
            for (let i = 0; i < params.points.length; i++) {
                let point = params.points[i];
                if (Util.isArray(point)) {
                    point.setCoordinates(point);
                }
                params.points[i] = new GeometryPoint(point.getCoordinates()[0], point.getCoordinates()[1]);
            }
        }
        if (params.point) {
            let point = params.point;
            if (Util.isArray(point)) {
                point.setCoordinates(point);
            }
            params.point = new GeometryPoint(point.getCoordinates()[0], point.getCoordinates()[1]);
        }
        if (params.extractRegion) {
            params.extractRegion = this.convertGeometry(params.extractRegion);
        }
        if (params.extractParameter && params.extractParameter.clipRegion) {
            params.extractParameter.clipRegion = this.convertGeometry(params.extractParameter.clipRegion);
        }
        if (params.clipParam && params.clipParam.clipRegion) {
            params.clipParam.clipRegion = this.convertGeometry(params.clipParam.clipRegion);
        }
        //支持格式：Vector Layers; GeoJson
        if (params.sourceGeometry) {
            var SRID = null;
            if (params.sourceGeometrySRID) {
                SRID = params.sourceGeometrySRID;
            }
            params.sourceGeometry = this.convertGeometry(params.sourceGeometry);
            if (SRID) {
                params.sourceGeometry.SRID = SRID;
            }
            delete params.sourceGeometry.sourceGeometrySRID;
        }
        if (params.operateGeometry) {
            params.operateGeometry = this.convertGeometry(params.operateGeometry);
        }
        //支持传入多个几何要素进行叠加分析：
        if (params.sourceGeometries) {
            var sourceGeometries = [];
            for (var k = 0; k < params.sourceGeometries.length; k++) {
                sourceGeometries.push(this.convertGeometry(params.sourceGeometries[k]));
            }
            params.sourceGeometries = sourceGeometries;
        }
        //支持传入多个几何要素进行叠加分析：
        if (params.operateGeometries) {
            var operateGeometries = [];
            for (var j = 0; j < params.operateGeometries.length; j++) {
                operateGeometries.push(this.convertGeometry(params.operateGeometries[j]));
            }
            params.operateGeometries = operateGeometries;
        }

        if (params.sourceRoute) {
            if (params.sourceRoute instanceof LineString && params.sourceRoute.getCoordinates()) {
                var target = {};
                target.type = "LINEM";
                target.parts = [params.sourceRoute.getCoordinates()[0].length];
                target.points = [];
                for (let i = 0; i < params.sourceRoute.getCoordinates()[0].length; i++) {
                    let point = params.sourceRoute.getCoordinates()[0][i];
                    target.points = target.points.concat({x: point[0], y: point[1], measure: point[2]})
                }
                params.sourceRoute = target;
            }

        }
        var me = this;
        if (params.operateRegions && Util.isArray(params.operateRegions)) {
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = me.convertGeometry(geometry);
                return params.operateRegions[key];
            });
        }
        if (params.sourceRoute && params.sourceRoute.components && Util.isArray(params.sourceRoute.components)) {
            params.sourceRoute.components.map(function (geometry, key) {
                params.sourceRoute.components[key] = me.convertGeometry(geometry);
                return params.sourceRoute.components[key];
            });
        }
        return params;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

    /**
     * @private
     * @function SpatialAnalystService.prototype.convertGeometry
     * @description 转换几何对象。
     * @param {Object} ol3Geometry - 待转换的几何对象。
     */

    convertGeometry(ol3Geometry) {
        //判断是否传入的是geojson 并作相应处理
        if(["FeatureCollection", "Feature", "Geometry"].indexOf(ol3Geometry.type) != -1){
            return Util.toSuperMapGeometry(ol3Geometry);
        }
        return Util.toSuperMapGeometry(JSON.parse((new GeoJSON()).writeGeometry(ol3Geometry)));
    }
}
