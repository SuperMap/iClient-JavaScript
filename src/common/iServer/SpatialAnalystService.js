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
import { TerrainCutFillCalculationService } from './TerrainCutFillCalculationService';
import { TerrainAspectCalculationService } from './TerrainAspectCalculationService';
import { TerrainSlopeCalculationService } from './TerrainSlopeCalculationService';
import { ThiessenAnalystService } from './ThiessenAnalystService';
import { MinDistanceAnalystService } from './MinDistanceAnalystService';
import { ConvexHullAnalystService } from './ConvexHullAnalystService';
import { GeometryBatchAnalystService } from './GeometryBatchAnalystService';

/**
 * @class SpatialAnalystService
 * @extends {ServiceBase}
 * @category  iServer SpatialAnalyst
 * @classdesc 空间分析服务类。提供方法：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、
 * 插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、坡度计算、坡向计算、
 * 泰森多边形分析、填挖方分析、凸包计算等。
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
     * @description 地区太阳辐射。<br>
     * 地区太阳辐射计算，指的是计算整个 DEM 范围内每个栅格的太阳辐射情况，计算可得到太阳辐射的总辐射量、直射辐射量、散射辐射量、直射持续时间。
     * @param {AreaSolarRadiationParameters} params - 地区太阳辐射参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    getAreaSolarRadiationResult(params, callback, resultFormat) {
        var me = this;
        var areaSolarRadiationService = new AreaSolarRadiationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return areaSolarRadiationService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析。<br>
     * 缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程，
     * 其中缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
     * @param {DatasetBufferAnalystParameters} params - 数据集缓冲区分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    bufferAnalysis(params, callback, resultFormat) {
        var me = this;
        var bufferAnalystService = new BufferAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return bufferAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析。目前提供1种点密度分析方式：核密度分析。<br>
     * 核密度分析用于计算点、线要素测量值在指定邻域范围内的单位密度,能直观地反映出离散测量值在连续区域内的分布情况。
     * 其结果是中间值大周边值小的光滑曲面，栅格值即为单位密度，在邻域边界处降为0。
     * 核密度分析可用于计算人口密度、建筑密度、获取犯罪情况报告、旅游区人口密度监测、连锁店经营情况分析等等。
     * @param {DensityKernelAnalystParameters} params - 核密度分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    densityAnalysis(params, callback, resultFormat) {
        var me = this;
        var densityAnalystService = new DensityAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return densityAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析。<br>
     * 动态分段技术是在传统 GIS 数据模型的基础上，利用线性参考技术，根据属性数据的空间位置，实现属性数据在地图上动态地显示、分析及输出等。
     * 线性参考是一种采用沿具有测量值的线性要素的相对位置来描述和存储地理位置的方法，即使用距离来定位沿线的事件。
     * @param {GenerateSpatialDataParameters} params - 动态分段操作参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    generateSpatialData(params, callback, resultFormat) {
        var me = this;
        var generateSpatialDataService = new GenerateSpatialDataService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return generateSpatialDataService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析。<br>
     * 根据指定的空间关系，查询数据集中所有满足要求的对象。支持的空间关系判断类型：包含、被包含、相交。
     * @param {GeoRelationAnalystParameters} params - 空间关系分析服务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    geoRelationAnalysis(params, callback, resultFormat) {
        var me = this;
        var geoRelationAnalystService = new GeoRelationAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return geoRelationAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析。<br>
     * 插值分析可以将有限的采样点数据，通过插值对采样点周围的数值情况进行预测，
     * 从而掌握研究区域内数据的总体分布状况，使采样的离散点不仅仅反映其所在位置的数值情况，而且可以反映区域的数值分布。
     * @param {InterpolationRBFAnalystParameters|InterpolationDensityAnalystParameters|InterpolationIDWAnalystParameters|InterpolationKrigingAnalystParameters} params - 样条插值（径向基函数插值法）分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    interpolationAnalysis(params, callback, resultFormat) {
        var me = this;
        var interpolationAnalystService = new InterpolationAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return interpolationAnalystService.processAsync(params, callback);
    }
    /**
     * @function SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算。<br>
     * 栅格代数运算的思想是运用代数学的观点对地理特征和现象进行空间分析，实质上是对多个栅格数据集进行数学运算以及函数运算。
     * 运算结果栅格的像元值是由输入的一个或多个栅格同一位置的像元的值通过代数规则运算得到的。
     * @param {MathExpressionAnalysisParameters} params - 栅格代数运算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    mathExpressionAnalysis(params, callback, resultFormat) {
        var me = this;
        var mathExpressionAnalysisService = new MathExpressionAnalysisService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return mathExpressionAnalysisService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析。<br>
     * 叠加分析是指在统一空间参考系统下，通过对两个数据集进行的一系列集合运算，产生新数据集的过程。
     * @param {DatasetOverlayAnalystParameters|GeometryOverlayAnalystParameters} params - 数据集叠加分析参数类或几何对象叠加分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    overlayAnalysis(params, callback, resultFormat) {
        var me = this;
        var overlayAnalystService = new OverlayAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return overlayAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算。<br>
     * 基于路由对象计算指定点 M 值。
     * @param {RouteCalculateMeasureParameters} params - 基于路由对象计算指定点 M 值操作的参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    routeCalculateMeasure(params, callback, resultFormat) {
        var me = this;
        var routeCalculateMeasureService = new RouteCalculateMeasureService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return routeCalculateMeasureService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.routeLocate
     * @description 路由定位。<br>
     * 路由定位有定位点和定位线两种类型。路由定点是根据指定路由上的 M 值来定位点，路由定线是根据指定线的范围来确定路由上对应的线对象。
     * @param {RouteLocatorParameters} params - 路由对象定位空间对象的参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    routeLocate(params, callback, resultFormat) {
        var me = this;
        var routeLocatorService = new RouteLocatorService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return routeLocatorService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析。<br>
     * 表面分析主要通过生成新数据集，如等值线、坡度、坡向等数据，获得更多反映原始数据集中所暗含的空间特征、空间格局等信息。
     * 支持的表面分析提取操作：提取等值线和提取等值面。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    surfaceAnalysis(params, callback, resultFormat) {
        var me = this;
        var surfaceAnalystService = new SurfaceAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return surfaceAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算。<br>
     * 地形曲率是表达地形曲面结构的主要参数之一。
     * DEM 栅格数据每个像元的表面曲率，是通过将目标像元与八个相邻像元拟合为二次曲面，再对此拟合曲面求（0,0）位置处的曲率而得。
     * 支持计算平均曲率数据集、剖面曲率（即沿最大斜率方向的曲率）数据集、平面曲率（即垂直于最大斜率方向的曲率）数据集。
     * 输出的三种曲率数据集都是和原数据集等大且分辨率相同的数据集。
     * @param {TerrainCurvatureCalculationParameters} params - 地形曲率计算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    terrainCurvatureCalculate(params, callback, resultFormat) {
        var me = this;
        var terrainCurvatureCalculationService = new TerrainCurvatureCalculationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return terrainCurvatureCalculationService.processAsync(params, callback);
    }

     /**
     * @function SpatialAnalystService.prototype.terrainCutFillCalculate
     * @description 填挖方计算。<br>
     * 填挖方计算用于计算填挖操作过程中填方、挖方的面积和体积，包含四种类型：栅格填挖方、选面填挖方、斜面填挖方和三维面填挖方。
     * @param {TerrainCutFillCalculationParameters} params - 填挖方计算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
     terrainCutFillCalculate(params, callback, resultFormat) {
      var me = this;
      var terrainCutFillCalculationService = new TerrainCutFillCalculationService(me.url, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers,
          format: me._processFormat(resultFormat)
      });
      return terrainCutFillCalculationService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainAspectCalculate
     * @description 地形坡向分析。<br>
     * 地形坡向分析用于计算栅格数据集（通常使用 DEM 数据）中各个像元的坡度面的朝向。
     * 坡向计算的范围是 0 到 360 度，以正北方 0 度为开始，按顺时针移动，回到正北方以 360 度结束。平坦的坡面没有方向，赋值为：-1。
     * @param {TerrainAspectCalculationParameters} params - 地形坡向分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    terrainAspectCalculate(params, callback, resultFormat) {
        var me = this;
        var terrainAspectCalculationService = new TerrainAspectCalculationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return terrainAspectCalculationService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.terrainSlopeCalculate
     * @description 地形坡度分析。<br>
     * 地形坡度分析用于计算栅格数据集（通常使用 DEM 数据）中各个像元的坡度值。坡度值越大，地势越陡峭；坡度值越小，地势越平坦。
     * DEM 数据中的像元值即该点的高程值，通过高程值计算该点的坡度。由于计算点的坡度没有实际意义，在 SuperMap 中，坡度计算的是各像元平面的平均值，
     * 并且提供了三种坡度表现形式：度数、弧度、百分比。
     * @param {TerrainSlopeCalculationParameters} params - 地形坡度分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    terrainSlopeCalculate(params, callback, resultFormat) {
        var me = this;
        var terrainSlopeCalculationService = new TerrainSlopeCalculationService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return terrainSlopeCalculationService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析。<br>
     * 泰森多边形又称为 Voronoi 图，是由一组连接两邻点直线的垂直平分线组成的连续多边形组成。
     * 泰森多边形可用于定性分析、统计分析、邻近分析等，通过创建泰森多边形创建的多边形要素可对可用空间进行划分并将其分配给最近的点要素。
     * 泰森多边形有时会用于替代插值操作，以便将一组样本测量值概化到最接近他们的区域。使用泰森多边形可将取自一组气候测量仪的测量值概化到周围区域，还可为一组店铺快速建立服务区模型等。例如：<br>
     * 1.可用离散点的性质来描述泰森多边形区域的性质；<br>
     * 2.可用离散点的数据来计算泰森多边形区域的数据；<br>
     * 3.判断一个离散点与其它哪些离散点相邻时，可根据泰森多边形直接得出，且若泰森多边形是 n 边形，则就与 n 个离散点相邻；<br>
     * 4.当某一数据点落入某一泰森多边形中时，它与相应的离散点最邻近，无需计算距离。
     * @param {DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters} params - 数据集泰森多边形分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    thiessenAnalysis(params, callback, resultFormat) {
        var me = this;
        var thiessenAnalystService = new ThiessenAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return thiessenAnalystService.processAsync(params, callback);
    }

     /**
     * @function SpatialAnalystService.prototype.minDistanceAnalysis
     * @description 最近距离计算。<br>
     * 最近距离计算即在指定地图上，查找距离指定几何对象一定容限内最近的几何对象。
     * @param {DatasetMinDistanceAnalystParameters|GeometryMinDistanceAnalystParameters} params - 最近距离计算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
     minDistanceAnalysis(params, callback, resultFormat) {
      var me = this;
      var minDistanceAnalystService = new MinDistanceAnalystService(me.url, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers,
          format: me._processFormat(resultFormat)
      });
      return minDistanceAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.convexHullAnalysis
     * @description 凸包计算。<br>
     * 三维模型对象可以看作三维空间中由无数个三维点构成的点集，该模型对象的凸包即是一个能够包含选中模型的所有三维点的最小闭合几何体。
     * 基于模型对象进行凸包运算，可以得到该模型对象的凸包。
     * @param {ConvexHullAnalystParameters} params - 凸包计算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     */
    convexHullAnalysis(params, callback, resultFormat) {
        var me = this;
        var convexHullAnalystService = new ConvexHullAnalystService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return convexHullAnalystService.processAsync(params, callback);
    }

    /**
     * @function SpatialAnalystService.prototype.geometrybatchAnalysis
     * @description 批量空间分析。<br>
     * 支持的批量空间分析方法包括：缓冲区分析、插值分析、叠加分析、表面分析等。
     * @param {Array.<Object>} params - 批量分析参数对象数组。
     * @param {Array.<Object>} params.analystName - 空间分析方法的名称。包括：</br>
     *                                              "buffer"，"overlay"，"interpolationDensity"，"interpolationidw"，"interpolationRBF"，"interpolationKriging"，"isoregion"，"isoline"。
     * @param {Object} params.param - 空间分析类型对应的请求参数，包括：</br>
     *                                {@link GeometryBufferAnalystParameters} 缓冲区分析参数类。</br>
     *                                {@link GeometryOverlayAnalystParameters} 叠加分析参数类。</br>
     *                                {@link InterpolationAnalystParameters} 插值分析参数类。</br>
     *                                {@link SurfaceAnalystParameters} 表面分析参数类。</br>
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {Promise} Promise 对象。
     */
    geometrybatchAnalysis(params, callback, resultFormat) {
        var me = this;
        var geometryBatchAnalystService = new GeometryBatchAnalystService(me.url, {
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

        return geometryBatchAnalystService.processAsync(analystParameters, callback);
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}
