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
 * @modulecategory Services
 * @classdesc 空间分析服务类。提供方法：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、
 * 插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、坡度计算、坡向计算、
 * 泰森多边形分析、填挖方分析、凸包计算等。
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
     * @description 地区太阳辐射。地区太阳辐射计算指的是计算整个 DEM 范围内每个栅格的太阳辐射情况，计算可得到太阳辐射的总辐射量、直射辐射量、散射辐射量、直射持续时间。
     * @param {AreaSolarRadiationParameters} params -查询相关参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getAreaSolarRadiationResult(params, callback, resultFormat) {
      return this._spatialAnalystService.getAreaSolarRadiationResult(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析。<br>
     * 缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程，
     * 其中缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
     * @param {DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    bufferAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.bufferAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析。目前提供1种点密度分析方式：核密度分析。<br>
     * 核密度分析用于计算点、线要素测量值在指定邻域范围内的单位密度,能直观地反映出离散测量值在连续区域内的分布情况。
     * 其结果是中间值大周边值小的光滑曲面，栅格值即为单位密度，在邻域边界处降为0。
     * 核密度分析可用于计算人口密度、建筑密度、获取犯罪情况报告、旅游区人口密度监测、连锁店经营情况分析等等。
     * @param {DensityKernelAnalystParameters} params - 核密度分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    densityAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.densityAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析。动态分段技术是在传统 GIS 数据模型的基础上，利用线性参考技术，根据属性数据的空间位置，实现属性数据在地图上动态地显示、分析及输出等。
     * 线性参考是一种采用沿具有测量值的线性要素的相对位置来描述和存储地理位置的方法，即使用距离来定位沿线的事件。
     * @param {GenerateSpatialDataParameters} params - 动态分段操作参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    generateSpatialData(params, callback, resultFormat) {
        return this._spatialAnalystService.generateSpatialData(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析。根据指定的空间关系，查询数据集中所有满足要求的对象。支持的空间关系判断类型：包含、被包含、相交。
     * @param {GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    geoRelationAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.geoRelationAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析。插值分析可以将有限的采样点数据，通过插值对采样点周围的数值情况进行预测，
     * 从而掌握研究区域内数据的总体分布状况，使采样的离散点不仅仅反映其所在位置的数值情况，而且可以反映区域的数值分布。
     * @param {InterpolationDensityAnalystParameters|InterpolationIDWAnalystParameters|InterpolationRBFAnalystParameters|InterpolationKrigingAnalystParameters} params - 样条插值（径向基函数插值法）分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    interpolationAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.interpolationAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算。栅格代数运算的思想是运用代数学的观点对地理特征和现象进行空间分析，实质上是对多个栅格数据集进行数学运算以及函数运算。
     * 运算结果栅格的像元值是由输入的一个或多个栅格同一位置的像元的值通过代数规则运算得到的。
     * @param {MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    mathExpressionAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.mathExpressionAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析。叠加分析是指在统一空间参考系统下，通过对两个数据集进行的一系列集合运算，产生新数据集的过程。
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 数据集叠加分析参数类或者几何对象叠加分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    overlayAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.overlayAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算。<br>
     * 基于路由对象计算指定点 M 值。
     * @param {RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    routeCalculateMeasure(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.routeCalculateMeasure(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.routeLocate
     * @description 路由定位。<br>
     * 路由定位有定位点和定位线两种类型。路由定点是根据指定路由上的 M 值来定位点，路由定线是根据指定线的范围来确定路由上对应的线对象。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    routeLocate(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.routeLocate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析。<br>
     * 表面分析主要通过生成新数据集，如等值线、坡度、坡向等数据，获得更多反映原始数据集中所暗含的空间特征、空间格局等信息。
     * 支持的表面分析提取操作：提取等值线和提取等值面。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    surfaceAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.surfaceAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算。地形曲率是表达地形曲面结构的主要参数之一。
     * DEM 栅格数据每个像元的表面曲率，是通过将目标像元与八个相邻像元拟合为二次曲面，再对此拟合曲面求（0,0）位置处的曲率而得。
     * 支持计算平均曲率数据集、剖面曲率（即沿最大斜率方向的曲率）数据集、平面曲率（即垂直于最大斜率方向的曲率）数据集。
     * 输出的三种曲率数据集都是和原数据集等大且分辨率相同的数据集。
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainCurvatureCalculate(params, callback, resultFormat) {
        return this._spatialAnalystService.terrainCurvatureCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCutFillCalculate
     * @description 填挖方计算。<br>
     * 填挖方计算用于计算填挖操作过程中填方、挖方的面积和体积，包含四种类型：栅格填挖方、选面填挖方、斜面填挖方和三维面填挖方。
     * @version 11.1.1
     * @param {TerrainCutFillCalculationParameters} params - 填挖方计算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainCutFillCalculate(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.terrainCutFillCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainAspectCalculate
     * @description 地形坡向分析。<br>
     * 地形坡向分析用于计算栅格数据集（通常使用 DEM 数据）中各个像元的坡度面的朝向。
     * 坡向计算的范围是 0 到 360 度，以正北方 0 为开始，按顺时针移动，回到正北方以 360 度结束。平坦的坡面没有方向，赋值为 -1。
     * @version 11.1.1
     * @param {TerrainAspectCalculationParameters} params - 地形坡向分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainAspectCalculate(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.terrainAspectCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainSlopeCalculate
     * @description 地形坡度分析。<br>
     * 地形坡度分析用于计算栅格数据集（通常使用 DEM 数据）中各个像元的坡度值。坡度值越大，地势越陡峭；坡度值越小，地势越平坦。
     * DEM 数据中的像元值即该点的高程值，通过高程值计算该点的坡度。由于计算点的坡度没有实际意义，在 SuperMap 中，坡度计算的是各像元平面的平均值，
     * 并且提供了三种坡度表现形式：度数、弧度、百分比。
     * @version 11.1.1
     * @param {TerrainSlopeCalculationParameters} params - 地形坡度分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainSlopeCalculate(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.terrainSlopeCalculate(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析。泰森多边形又称为 Voronoi 图，是由一组连接两邻点直线的垂直平分线组成的连续多边形组成。
     * 泰森多边形可用于定性分析、统计分析、邻近分析等，通过创建泰森多边形创建的多边形要素可对可用空间进行划分并将其分配给最近的点要素。
     * 泰森多边形有时会用于替代插值操作，以便将一组样本测量值概化到最接近他们的区域。使用泰森多边形可将取自一组气候测量仪的测量值概化到周围区域，还可为一组店铺快速建立服务区模型等。例如：<br>
     * 1.可用离散点的性质来描述泰森多边形区域的性质；<br>
     * 2.可用离散点的数据来计算泰森多边形区域的数据；<br>
     * 3.判断一个离散点与其它哪些离散点相邻时，可根据泰森多边形直接得出，且若泰森多边形是 n 边形，则就与 n 个离散点相邻；<br>
     * 4.当某一数据点落入某一泰森多边形中时，它与相应的离散点最邻近，无需计算距离。
     * @param {DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    thiessenAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.thiessenAnalysis(params, callback, resultFormat);
    } 

    /**
     * @function SpatialAnalystService.prototype.minDistanceAnalysis
     * @description 最近距离计算。<br>
     * 最近距离计算即在指定地图上，查找距离指定几何对象一定容限内最近的几何对象。
     * @version 11.1.1
     * @param {DatasetMinDistanceAnalystParameters|GeometryMinDistanceAnalystParameters} params - 最近距离计算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    minDistanceAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.minDistanceAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.convexHullAnalysis
     * @description 凸包计算。<br>
     * 三维模型对象可以看作三维空间中由无数个三维点构成的点集，该模型对象的凸包即是一个能够包含选中模型的所有三维点的最小闭合几何体。
     * 基于模型对象进行凸包运算，可以得到该模型对象的凸包。
     * @version 11.1.1
     * @param {ConvexHullAnalystParameters} params - 凸包计算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    convexHullAnalysis(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._spatialAnalystService.convexHullAnalysis(params, callback, resultFormat);
    }

    /**
     * @function SpatialAnalystService.prototype.geometrybatchAnalysis
     * @description 批量空间分析。<br>
     * 支持的批量空间分析方法包括：缓冲区分析、插值分析、叠加分析、表面分析等。
     * @param {Array.<Object>} params - 批量分析参数对象数组，包括：
     * @param {string} params.analystName - 空间分析方法的名称。包括：</br>
     *                                      "buffer"，"overlay"，"interpolationDensity"，"interpolationidw"，"interpolationRBF"，"interpolationKriging"，"isoregion"，"isoline"。
     * @param {Object} params.param - 空间分析类型对应的请求参数，包括：</br>
     *                                {@link GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     *                                {@link GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     *                                {@link InterpolationAnalystParameters} 插值分析参数类。</br>
     *                                {@link SurfaceAnalystParameters} 表面分析参数类。</br>
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
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
        // 最近距离
        if (params.inputGeometries) {
          var inputGeometries = [];
          for (var l = 0; l < params.inputGeometries.length; l++) {
            inputGeometries.push(Util.toSuperMapGeometry(params.inputGeometries[l]));
          }
          params.inputGeometries = inputGeometries;
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
