/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { DataFormat } from '@supermap/iclient-common/REST';
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

/**
 * @class SpatialAnalystService
 * @extends {ServiceBase}
 * @category  iServer SpatialAnalyst
 * @classdesc 空间分析服务类。提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @example
 * new SpatialAnalystService(url)
 *  .bufferAnalysis(params,function(result){
 *    //doSomething
 * })
 * @param {string} url - 服务地址。
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
     * @param {mapboxgl} params -查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {DensityKernelAnalystParameters} params - 核密度分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {GenerateSpatialDataParameters} params - 动态分段操作参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {InterpolationRBFAnalystParameters} params - 样条插值（径向基函数插值法）分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 数据集叠加分析参数类或者几何对象叠加分析参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {DatasetThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
     * @param {Array} params - 批量分析参数对象数组，包括：
     * @param {string} params.analystName - 空间分析方法的名称。包括：</br>
     *                                      "buffer"，"overlay"，"interpolationDensity"，"interpolationidw"，"interpolationRBF"，"interpolationKriging"，"isoregion"，"isoline"。
     * @param {GeometryBufferAnalystParameters|GeometryOverlayAnalystParameters|InterpolationAnalystParameters|SurfaceAnalystParameters} params.param - 空间分析类型对应的请求参数，包括：</br>
     * 几何对象缓冲区分析参数类、几何对象叠加分析参数类、插值分析参数类、表面分析提取操作参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
        //插值分析点数组转换
        if (params.inputPoints) {
            for (var i = 0; i < params.inputPoints.length; i++) {
                var inputPoint = params.inputPoints[i];
                if (Util.isArray(inputPoint)) {
                    params.inputPoints[i] = {x: inputPoint[0], y: inputPoint[1], tag: inputPoint[2]};
                }
            }
        }
        //点数组转换
        if (params.points) {
            for (let i = 0; i < params.points.length; i++) {
                var point = params.points[i];
                params.points[i] = Util.toSuperMapPoint(point);
            }
        }
        //mapboxgl点对象转SuperMap点对象
        if (params.point) {
            params.point = Util.toSuperMapPoint(params.point);
        }

        //初步判断mapbox数据就为geojson格式 ，进行转json格式即可

        //栅格代数运算的范围
        if (params.extractRegion) {
            params.extractRegion = Util.toSuperMapGeometry(params.extractRegion);
        }

        //获取或设置表面分析参数
        if (params.extractParameter && params.extractParameter.clipRegion) {
            params.extractParameter.clipRegion = Util.toSuperMapGeometry(params.extractParameter.clipRegion);
        }
        if (params.clipParam && params.clipParam.clipRegion) {
            params.clipParam.clipRegion = Util.toSuperMapGeometry(params.clipParam.clipRegion);
        }
        //sourceRoute 路由对象。用于里程分析，该对象可以是用户自己生 成或在数据源中查询得到的符合标准的路由对象；geojson格式
        if (params.sourceRoute) {
            if (params.sourceRoute) {
                var target = {};
                target.type = "LINEM";
                target.parts = [params.sourceRoute.geometry.coordinates.length];
                target.points = [];
                for (let i = 0; i < params.sourceRoute.geometry.coordinates.length; i++) {
                    var lnglat = params.sourceRoute.geometry.coordinates[i];
                    //measure 应该在传值时设置,
                    target.points = target.points.concat({x: lnglat[0], y: lnglat[1], measure: lnglat[2]})
                }
                params.sourceRoute = target;
            }

        }
        //operateRegions 操作面对象集合，数据集叠加分析,表示与这些面对象进行叠加分析
        if (params.operateRegions && Util.isArray(params.operateRegions)) {
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = Util.toSuperMapGeometry(geometry);
                return params.operateRegions[key];
            });
        }

        //叠加分析，几何数据源 支持格式:GeoJson
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
        //components 几何对象数组
        if (params.sourceRoute && params.sourceRoute.components && Util.isArray(params.sourceRoute.components)) {
            params.sourceRoute.components.map(function (geometry, key) {
                params.sourceRoute.components[key] = Util.toSuperMapGeometry(geometry);
                return params.sourceRoute.components[key];
            });
        }
        return params;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}
