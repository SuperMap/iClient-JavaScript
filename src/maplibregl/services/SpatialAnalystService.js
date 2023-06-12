/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { DataFormat } from '@supermap/iclient-common/REST';
import { SpatialAnalystService as CommonSpatialAnalystService } from '@supermap/iclient-common/iServer/SpatialAnalystService';

/**
 * @class SpatialAnalystService
 * @extends {ServiceBase}
 * @category  iServer SpatialAnalyst
 * @version 11.1.0
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
        this._spatialAnalystService = new CommonSpatialAnalystService(url, options);
    }

    /**
     * @function SpatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射。
     * @param {AreaSolarRadiationParameters} params -查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getAreaSolarRadiationResult(params, callback, resultFormat) {
      this._spatialAnalystService.getAreaSolarRadiationResult(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析。
     * @param {DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    bufferAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.bufferAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析。
     * @param {DensityKernelAnalystParameters} params - 核密度分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    densityAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.densityAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析。
     * @param {GenerateSpatialDataParameters} params - 动态分段操作参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    generateSpatialData(params, callback, resultFormat) {
      this._spatialAnalystService.generateSpatialData(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析。
     * @param {GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    geoRelationAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.geoRelationAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析。
     * @param {InterpolationDensityAnalystParameters|InterpolationIDWAnalystParameters|InterpolationRBFAnalystParameters|InterpolationKrigingAnalystParameters} params - 样条插值（径向基函数插值法）分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    interpolationAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.interpolationAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算。
     * @param {MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    mathExpressionAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.mathExpressionAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析。
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 数据集叠加分析参数类或者几何对象叠加分析参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    overlayAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.overlayAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算。
     * @param {RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    routeCalculateMeasure(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.routeCalculateMeasure(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.routeLocate
     * @description 路由定位。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    routeLocate(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.routeLocate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    surfaceAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.surfaceAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算。
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    terrainCurvatureCalculate(params, callback, resultFormat) {
      this._spatialAnalystService.terrainCurvatureCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析。
     * @param {DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    thiessenAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.thiessenAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.geometrybatchAnalysis
     * @description 批量空间分析。
     * @param {Array.<Object>} params - 批量分析参数对象数组，包括：
     * @param {string} params.analystName - 空间分析方法的名称。包括：</br>
     *                                      "buffer"，"overlay"，"interpolationDensity"，"interpolationidw"，"interpolationRBF"，"interpolationKriging"，"isoregion"，"isoline"。
     * @param {Object} params.param - 空间分析类型对应的请求参数，包括：</br>
     *                                {@link GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     *                                {@link GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     *                                {@link InterpolationAnalystParameters} 插值分析参数类。</br>
     *                                {@link SurfaceAnalystParameters} 表面分析参数类。</br>
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    geometrybatchAnalysis(params, callback, resultFormat) {
        for (var i = 0; i < params.length; i++) {
            params[i].param = this._processParams(params[i].param)
        }
        this._spatialAnalystService.geometrybatchAnalysis(params, callback, resultFormat);
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
        //maplibregl点对象转SuperMap点对象
        if (params.point) {
            params.point = Util.toSuperMapPoint(params.point);
        }

        //初步判断maplibre数据就为geojson格式 ，进行转json格式即可

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
        //components 几何对象数组      Route
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
