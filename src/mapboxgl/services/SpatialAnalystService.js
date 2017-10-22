import mapboxgl from 'mapbox-gl';
import Util from '../core/Util';
import SuperMap from '../../common/SuperMap';
import ServiceBase from './ServiceBase';
import AreaSolarRadiationService from '../../common/iServer/AreaSolarRadiationService';
import BufferAnalystService from '../../common/iServer/BufferAnalystService';
import DensityAnalystService from '../../common/iServer/DensityAnalystService';
import GenerateSpatialDataService from '../../common/iServer/GenerateSpatialDataService';
import GeoRelationAnalystService from '../../common/iServer/GeoRelationAnalystService';
import InterpolationAnalystService from '../../common/iServer/InterpolationAnalystService';
import MathExpressionAnalysisService from '../../common/iServer/MathExpressionAnalysisService';
import OverlayAnalystService from '../../common/iServer/OverlayAnalystService';
import RouteCalculateMeasureService from '../../common/iServer/RouteCalculateMeasureService';
import RouteLocatorService from '../../common/iServer/RouteLocatorService';
import SurfaceAnalystService from '../../common/iServer/SurfaceAnalystService';
import TerrainCurvatureCalculationService from '../../common/iServer/TerrainCurvatureCalculationService';
import ThiessenAnalystService from '../../common/iServer/ThiessenAnalystService';

/**
 * @class mapboxgl.supermap.SpatialAnalystService
 * @extends mapboxgl.supermap.ServiceBase
 * @classdesc 空间分析服务类。提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @example
 *      new mapboxgl.supermap.SpatialAnalystService(url)
 *      .bufferAnalysis(params,function(result){
 *          //doSomething
 *      })
 * @param url - {string} 服务的访问地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export default class SpatialAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射
     * @param params -{SuperMap.mapboxgl} 查询相关参数类
     * @param callback -{function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    getAreaSolarRadiationResult(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析
     * @param params -{SuperMap.DatasetBufferAnalystParameters} 查询相关参数类
     * @param callback -{function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    bufferAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析
     * @param params -{SuperMap.DensityKernelAnalystParameters} 查询相关参数类
     * @param callback -{function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    densityAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析
     * @param params - {SuperMap.GenerateSpatialDataParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    generateSpatialData(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析
     * @param params - {SuperMap.GeoRelationAnalystParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    geoRelationAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析
     * @param params - {SuperMap.InterpolationRBFAnalystParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    interpolationAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算
     * @param params - {SuperMap.MathExpressionAnalysisParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    mathExpressionAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析
     * @param params - {SuperMap.DatasetOverlayAnalystParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    overlayAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算
     * @param params - {SuperMap.RouteCalculateMeasureParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    routeCalculateMeasure(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.routeLocate
     * @description 路由定位
     * @param params - {SuperMap.RouteLocatorParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    routeLocate(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析
     * @param params - {SuperMap.DatasetSurfaceAnalystParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    surfaceAnalysis(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算
     * @param params - {SuperMap.TerrainCurvatureCalculationParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    terrainCurvatureCalculate(params, callback, resultFormat) {
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
    }

    /**
     * @function mapboxgl.supermap.SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析
     * @param params - {SuperMap.DatasetThiessenAnalystParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    thiessenAnalysis(params, callback, resultFormat) {
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

        //叠加分析，几何数据源
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
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
}
mapboxgl.supermap.SpatialAnalystService = SpatialAnalystService;