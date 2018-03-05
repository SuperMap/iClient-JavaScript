import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {
    Bounds, Geometry, GeometryPoint, DataFormat,
    QueryByBoundsService,
    QueryByDistanceService,
    QueryBySQLService,
    QueryByGeometryService
} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.QueryService
 * @category  iServer Map QueryResults
 * @classdesc 地图查询服务类。
 *            提供：范围查询，SQL查询，几何查询，距离查询
 * @extends mapboxgl.supermap.ServiceBase
 * @param url - {string} 地图查询服务访问地址。
 * @param options - {Object} 服务交互时所需的可选参数。
 * @example
 *    new mapboxgl.supermap.QueryService(url)
 *      .queryByBounds(param,function(result){
 *          //doSomething
 *      })
 */
export class QueryService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.QueryService.prototype.queryByBounds
     * @description bounds查询地图服务
     * @param params - {SuperMap.QueryByBoundsParameters} 通过Bounds查询的相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByBounds(params, callback, resultFormat) {
        var me = this;
        var queryService = new QueryByBoundsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },

            format: me._processFormat(resultFormat)
        });

        queryService.processAsync(me._processParams(params));
    }

    /**
     * @function mapboxgl.supermap.QueryService.prototype.queryByDistance
     * @description 地图距离查询服务
     * @param params - {QueryByDistanceParameters} Distance查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByDistance(params, callback, resultFormat) {
        var me = this;
        var queryByDistanceService = new QueryByDistanceService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryByDistanceService.processAsync(me._processParams(params));
    }

    /**
     * @function mapboxgl.supermap.QueryService.prototype.queryBySQL
     * @description 地图SQL查询服务
     * @param params - {SuperMap.QueryBySQLParameters} SQL查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryBySQL(params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryBySQLService.processAsync(me._processParams(params));
    }

    /**
     * @function mapboxgl.supermap.QueryService.prototype.queryByGeometry
     * @description 地图几何查询服务
     * @param params - {SuperMap.QueryByGeometryParameters} Geometry查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByGeometry(params, callback, resultFormat) {
        var me = this;
        var queryByGeometryService = new QueryByGeometryService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryByGeometryService.processAsync(me._processParams(params));
    }


    _processParams(params) {

        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.queryParams && !Util.isArray(params.queryParams)) {
            params.queryParams = [params.queryParams];
        }
        if (params.bounds) {
            if (params.bounds instanceof Array) {
                params.bounds = new Bounds(
                    params.bounds[0],
                    params.bounds[1],
                    params.bounds[2],
                    params.bounds[3]
                );
            }
            if (params.bounds instanceof mapboxgl.LngLatBounds) {
                params.bounds = new Bounds(
                    params.bounds.getSouthWest().lng,
                    params.bounds.getSouthWest().lat,
                    params.bounds.getNorthEast().lng,
                    params.bounds.getNorthEast().lat
                );
            }

        }

        if (params.geometry) {

            if (params.geometry instanceof mapboxgl.LngLat) {
                params.geometry = new GeometryPoint(params.geometry.lng, params.geometry.lat);
            }

            if (params.geometry instanceof mapboxgl.Point) {
                params.geometry = new GeometryPoint(params.geometry.x, params.geometry.y);
            }

            if (params && !(params.geometry instanceof Geometry)) {

                params.geometry = Util.toSuperMapGeometry(params.geometry);
            }
        }
        return params;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}

mapboxgl.supermap.QueryService = QueryService;