import ol from 'openlayers/dist/ol-debug';
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
 * @class ol.supermap.SpatialAnalystService
 * @constructs  ol.supermap.SpatialAnalystService
 * @classdesc
 * 空间分析服务类。
 * 提供：地区太阳辐射、缓冲区分析、点密度分析、动态分段分析、空间关系分析、插值分析、栅格代数运算、叠加分析、路由定位、路由测量计算、表面分析、地形曲率计算、泰森多边形分析。
 * @example  用法：
 *      new ol.supermap.SpatialAnalystService(url)
 *      .bufferAnalysis(params,function(result){
 *          //doSomething
 *      })
 * @api
 */
export default class SpatialAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.getAreaSolarRadiationResult
     * @description 地区太阳辐射
     * @param params
     * {AreaSolarRadiationParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.bufferAnalysis
     * @description 缓冲区分析
     * @param params
     * {DatasetBufferAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.densityAnalysis
     * @description 点密度分析
     * @param params
     * {DensityKernelAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.generateSpatialData
     * @description 动态分段分析
     * @param params
     * {GenerateSpatialDataParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.geoRelationAnalysis
     * @description 空间关系分析
     * @param params
     * {GeoRelationAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.interpolationAnalysis
     * @description 插值分析
     * @param params
     * {InterpolationRBFAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.mathExpressionAnalysis
     * @description 栅格代数运算
     * @param params
     * {MathExpressionAnalysisParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.overlayAnalysis
     * @description 叠加分析
     * @param params
     * {DatasetOverlayAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.routeCalculateMeasure
     * @description 路由测量计算
     * @param params
     * {RouteCalculateMeasureParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.routeLocate
     * @description 路由定位
     * @param params
     * {RouteLocatorParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.surfaceAnalysis
     * @description 表面分析
     * @param params
     * {DatasetSurfaceAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.terrainCurvatureCalculate
     * @description 地形曲率计算
     * @param params
     * {TerrainCurvatureCalculationParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    /**
     * @method ol.supermap.SpatialAnalystService.prototype.thiessenAnalysis
     * @description 泰森多边形分析
     * @param params
     * {DatasetThiessenAnalystParameters}
     * @param callback
     * @param resultFormat
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
        return me;
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.bounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds[0],
                params.bounds[1],
                params.bounds[2],
                params.bounds[3]
            );
        }
        if (params.inputPoints) {
            for (var i = 0; i < params.inputPoints.length; i++) {
                var inputPoint = params.inputPoints[i];
                if (Util.isArray(inputPoint)) {
                    params.inputPoints[i] = {x:inputPoint[0], y:inputPoint[1],tag:inputPoint[2]};
                }else{
                    params.inputPoints[i] = {x:inputPoint.getCoordinates()[0], y:inputPoint.getCoordinates()[1],tag:inputPoint.tag};
                }

            }
        }
        if (params.points) {
            for (var i = 0; i < params.points.length; i++) {
                var point = params.points[i];
                if (Util.isArray(point)) {
                    point.setCoordinates(point);
                }
                params.points[i] = new SuperMap.Geometry.Point(point.getCoordinates()[0], point.getCoordinates()[1]);
            }
        }
        if (params.point) {
                var point = params.point;
                if (Util.isArray(point)) {
                    point.setCoordinates(point);
                }
            params.point = new SuperMap.Geometry.Point(point.getCoordinates()[0], point.getCoordinates()[1]);
        }
        if (params.extractRegion) {
            params.extractRegion = this.convertGeometry(params.extractRegion);
        }
        if (params.extractParameter && params.extractParameter.clipRegion) {
            params.extractParameter.clipRegion = this.convertGeometry(params.extractParameter.clipRegion);
        }
        if (params.sourceGeometry) {
            params.sourceGeometry = this.convertGeometry(params.sourceGeometry);
        }
        if (params.sourceRoute) {
            if(params.sourceRoute instanceof  ol.geom.LineString&&params.sourceRoute.getCoordinates()){
                var target={};
                target.type="LINEM"
                target.parts=[params.sourceRoute.getCoordinates()[0].length];
                target.points = [];
                for(var i=0;i<params.sourceRoute.getCoordinates()[0].length;i++){
                    var point=params.sourceRoute.getCoordinates()[0][i];
                    target.points= target.points.concat({x:point[0], y: point[1],measure:point[2]})
                }
                params.sourceRoute = target;
            }

        }
        if (params.operateRegions && Util.isArray(params.operateRegions)) {
            var me = this;
            params.operateRegions.map(function (geometry, key) {
                params.operateRegions[key] = me.convertGeometry(geometry);
            });
        }
        if (params.sourceRoute && params.sourceRoute.components && Util.isArray(params.sourceRoute.components)) {
            var me = this;
            params.sourceRoute.components.map(function (geometry, key) {
                params.sourceRoute.components[key] = me.convertGeometry(geometry);
            });
        }
        return params;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }

    convertGeometry(ol3Geometry) {
        return Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(ol3Geometry)));
    }
}
ol.supermap.SpatialAnalystService = SpatialAnalystService;