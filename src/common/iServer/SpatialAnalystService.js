/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { DataFormat } from '../REST';
import { AreaSolarRadiationService } from './AreaSolarRadiationService';
import { BufferAnalystService } from './BufferAnalystService';
import { DensityAnalystService } from './DensityAnalystService';
import { GenerateSpatialDataService } from './GenerateSpatialDataService';
import { GeoRelationAnalystService } from './GeoRelationAnalystService';
import { InterpolationAnalystService } from './InterpolationAnalystService';
import { MathExpressionAnalysisService } from './MathExpressionAnalysisService';
import { OverlayAnalystService } from './OverlayAnalystService';
import { RouteCalculateMeasureService } from './RouteCalculateMeasureService';
import { RouteLocatorService } from './RouteLocatorService';
import { SurfaceAnalystService } from './SurfaceAnalystService';
import { TerrainCurvatureCalculationService } from './TerrainCurvatureCalculationService';
import { ThiessenAnalystService } from './ThiessenAnalystService';
import { GeometryBatchAnalystService } from './GeometryBatchAnalystService';

/**
 * @class SpatialAnalystService
 * @extends {ServiceBase}
 * @category  iServer SpatialAnalyst
 * @classdesc 空间分析服务类。提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @example
 *      new SpatialAnalystService(url).bufferAnalysis(params,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SpatialAnalystService {

    constructor(url, options) {
        this.url = url;
        this.options = options || {};
    }

    /**
     * @function SpatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射。
     * @param {AreaSolarRadiationParameters} params - 地区太阳辐射参数类。
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
     * @param {DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
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
        bufferAnalystService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析。
     * @param {DensityKernelAnalystParameters} params - 核密度分析参数类。
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
        densityAnalystService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析。
     * @param {GenerateSpatialDataParameters} params - 动态分段操作参数类。
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
     * @param {GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
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
     * @param {InterpolationRBFAnalystParameters|InterpolationDensityAnalystParameters|InterpolationIDWAnalystParameters|InterpolationKrigingAnalystParameters} params - 样条插值分析参数类。
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
        interpolationAnalystService.processAsync(params);
    }
    /**
     * @function SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算。
     * @param {MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
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
        mathExpressionAnalysisService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析。
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 数据集叠加分析参数类或几何对象叠加分析参数类。
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
        overlayAnalystService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算。
     * @param {RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
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
        routeCalculateMeasureService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.routeLocate
     * @description 路由定位。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
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
        routeLocatorService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
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
        surfaceAnalystService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算。
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
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
     * @param {DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
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
        thiessenAnalystService.processAsync(params);
    }

    /**
     * @function SpatialAnalystService.prototype.geometrybatchAnalysis
     * @description 批量空间分析。
     * @param {Array.<Object>} params - 批量分析参数对象数组。
     * @param {Array.<Object>} params.analystName - 空间分析方法的名称。包括：</br>
     *                                              "buffer"，"overlay"，"interpolationDensity"，"interpolationidw"，"interpolationRBF"，"interpolationKriging"，"isoregion"，"isoline"。
     * @param {Object} params.param - 空间分析类型对应的请求参数，包括：</br>
     *                                {@link GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     *                                {@link GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     *                                {@link InterpolationAnalystParameters} 插值分析参数类。</br>
     *                                {@link SurfaceAnalystParameters} 表面分析参数类。</br>
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
                param: tempParameter.param
            })
        }

        geometryBatchAnalystService.processAsync(analystParameters);
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}
