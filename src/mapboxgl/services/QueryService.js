/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import {
    Bounds,
    Geometry,
    GeometryPoint,
    DataFormat,
    QueryByBoundsService,
    QueryByDistanceService,
    QueryBySQLService,
    QueryByGeometryService
} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.QueryService
 * @category  iServer Map QueryResults
 * @classdesc 地图查询服务类。
 *            提供：范围查询，SQL 查询，几何查询，距离查询。
 * @extends {mapboxgl.supermap.ServiceBase}
 * @param {string} url - 地图查询服务访问地址。
 * @param {Object} options - 服务交互时所需的可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @example
 * new mapboxgl.supermap.QueryService(url)
 * .queryByBounds(param,function(result){
 *     //doSomething
 * })
 */
export class QueryService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.QueryService.prototype.queryByBounds
     * @description Bounds 查询地图服务。
     * @param {SuperMap.QueryByBoundsParameters} params - 通过 Bounds 查询的相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回结果类型。
     */
    queryByBounds(params, callback, resultFormat) {
        var me = this;
        var queryService = new QueryByBoundsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @description 地图距离查询服务。
     * @param {SuperMap.QueryByDistanceParameters} params - Distance 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回结果类型
     */
    queryByDistance(params, callback, resultFormat) {
        var me = this;
        var queryByDistanceService = new QueryByDistanceService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @description 地图 SQL 查询服务。
     * @param {SuperMap.QueryBySQLParameters} params - SQL 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回结果类型。
     */
    queryBySQL(params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @description 地图几何查询服务。
     * @param {SuperMap.QueryByGeometryParameters} params - Geometry 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回结果类型。
     */
    queryByGeometry(params, callback, resultFormat) {
        var me = this;
        var queryByGeometryService = new QueryByGeometryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
        params.returnContent = params.returnContent == null ? true : params.returnContent;
        if (params.queryParams && !Util.isArray(params.queryParams)) {
            params.queryParams = [params.queryParams];
        }
        if (params.bounds) {
            if (params.bounds instanceof Array) {
                params.bounds = new Bounds(params.bounds[0], params.bounds[1], params.bounds[2], params.bounds[3]);
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

            if (params.geometry instanceof mapboxgl.LngLatBounds) {
                params.geometry = Util.toSuperMapPolygon(params.geometry);
            }

            if (!(params.geometry instanceof Geometry)) {
                params.geometry = Util.toSuperMapGeometry(params.geometry);
            }
        }
        return params;
    }

    _processFormat(resultFormat) {
        return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
}

mapboxgl.supermap.QueryService = QueryService;
