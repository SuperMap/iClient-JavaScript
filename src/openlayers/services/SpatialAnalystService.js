/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import { DataFormat } from '@supermap/iclient-common/REST';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { SpatialAnalystService as CommonSpatialAnalystService } from '@supermap/iclient-common/iServer/SpatialAnalystService';
import {ServiceBase} from './ServiceBase';
import LineString from 'ol/geom/LineString';
import GeoJSON from 'ol/format/GeoJSON';

/**
 * @class SpatialAnalystService
 * @extends {ServiceBase}
 * @category  iServer SpatialAnalyst
 * @classdesc 空间分析服务类。提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @modulecategory Services
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
export class SpatialAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._spatialAnalystService = new CommonSpatialAnalystService(url, options);
    }

    /**
     * @function SpatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射。
     * @param {AreaSolarRadiationParameters} params - 地区太阳辐射参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    getAreaSolarRadiationResult(params, callback, resultFormat) {
        return this._spatialAnalystService.getAreaSolarRadiationResult(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析。
     * @param {DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    bufferAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.bufferAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析。
     * @param {DensityKernelAnalystParameters} params - 核密度分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    densityAnalysis(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._spatialAnalystService.densityAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析。
     * @param {GenerateSpatialDataParameters} params - 动态分段操作参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    generateSpatialData(params, callback, resultFormat) {
      return this._spatialAnalystService.generateSpatialData(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析。
     * @param {GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    geoRelationAnalysis(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._spatialAnalystService.geoRelationAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析。
     * @param {InterpolationRBFAnalystParameters|InterpolationDensityAnalystParameters|InterpolationIDWAnalystParameters|InterpolationKrigingAnalystParameters} params - 样条插值分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    interpolationAnalysis(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._spatialAnalystService.interpolationAnalysis(params, callback, resultFormat);
    }
    /**
     * @function SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算。
     * @param {MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    mathExpressionAnalysis(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._spatialAnalystService.mathExpressionAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析。
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 数据集叠加分析参数类或几何对象叠加分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    overlayAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.overlayAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算。
     * @param {RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    routeCalculateMeasure(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.routeCalculateMeasure(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.routeLocate
     * @description 路由定位。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    routeLocate(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._spatialAnalystService.routeLocate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    surfaceAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.surfaceAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算。
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainCurvatureCalculate(params, callback, resultFormat) {
        return this._spatialAnalystService.terrainCurvatureCalculate(params, callback, resultFormat);
    }

   /**
     * @function SpatialAnalystService.prototype.terrainCutFillCalculate
     * @description 填挖方计算。
     * @param {TerrainCutFillCalculationParameters} params - 填挖方计算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainCutFillCalculate(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.terrainCutFillCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainAspectCalculate
     * @description 地形坡向分析。
     * @param {TerrainAspectCalculationParameters} params - 地形坡向分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainAspectCalculate(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.terrainAspectCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainSlopeCalculate
     * @description 地形坡度分析。
     * @param {TerrainSlopeCalculationParameters} params - 地形坡度分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    terrainSlopeCalculate(params, callback, resultFormat) {
      params = this._processParams(params);
      this._spatialAnalystService.terrainSlopeCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析。
     * @param {DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    thiessenAnalysis(params, callback, resultFormat) {
        params = this._processParams(params);
        this._spatialAnalystService.thiessenAnalysis(params, callback, resultFormat);
    } 

    /**
     * @function SpatialAnalystService.prototype.minDistanceAnalysis
     * @description 最近距离计算。
     * @param {DatasetMinDistanceAnalystParameters|GeometryMinDistanceAnalystParameters} params - 最近距离计算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    minDistanceAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.minDistanceAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.convexHullAnalysis
     * @description 凸包计算。
     * @param {ConvexHullAnalystParameters} params - 凸包计算参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    convexHullAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.convexHullAnalysis(params, callback, resultFormat);
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
     * @returns {Promise} Promise 对象。
     */
    geometrybatchAnalysis(params, callback, resultFormat) {
        for (var i = 0; i < params.length; i++) {
          params[i].param = this._processParams(params[i].param)
        }
        return this._spatialAnalystService.geometrybatchAnalysis(params, callback, resultFormat);
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

        // 最近距离
        if (params.inputGeometries) {
          var inputGeometries = [];
          for (var l = 0; l < params.inputGeometries.length; l++) {
            inputGeometries.push(this.convertGeometry(params.inputGeometries[l]));
          }
          params.inputGeometries = inputGeometries;
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
