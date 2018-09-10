/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {
    DataFormat,
    Bounds,
    GeometryPoint,
    QueryByBoundsService,
    QueryByDistanceService,
    QueryBySQLService,
    QueryByGeometryService
} from '@supermap/iclient-common';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';

/**
 * @class ol.supermap.QueryService
 * @category  iServer Map QueryResults
 * @classdesc 地图查询服务类。
 *            提供：范围查询，SQL 查询，几何查询，距离查询。
 * @extends {ol.supermap.ServiceBase}
 * @param {string} url - 地图查询服务访问地址。
 * @param {object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @example
 *    new ol.supermap.QueryService(url)
 *      .queryByBounds(param,function(result){
 *          //doSomething
 *      })
 */
export class QueryService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.QueryService.prototype.queryByBounds
     * @description bounds 查询地图服务。
     * @param {SuperMap.QueryByBoundsParameters} params - 通过 bounds 查询的相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     * @returns {ol.supermap.QueryService}
     */
    queryByBounds(params, callback, resultFormat) {
        var me = this;
        var queryService = new QueryByBoundsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
     * @function ol.supermap.QueryService.prototype.queryByDistance
     * @description 地图距离查询服务。
     * @param {SuperMap.QueryByDistanceParameters} params - Distance 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    queryByDistance(params, callback, resultFormat) {
        var me = this;
        var queryByDistanceService = new QueryByDistanceService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
     * @function ol.supermap.QueryService.prototype.queryBySQL
     * @description 地图 SQL 查询服务。
     * @param {SuperMap.QueryBySQLParameters} params - SQL 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    queryBySQL(params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
     * @function ol.supermap.QueryService.prototype.queryByGeometry
     * @description 地图几何查询服务。
     * @param {SuperMap.QueryByGeometryParameters} params - Geometry 查询相关参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    queryByGeometry(params, callback, resultFormat) {
        var me = this;
        var queryByGeometryService = new QueryByGeometryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
            params.bounds = new Bounds(
                params.bounds[0],
                params.bounds[1],
                params.bounds[2],
                params.bounds[3]
            );
        }
        if (params.geometry) {
            if (params.geometry instanceof ol.geom.Point) {
                params.geometry = new GeometryPoint(params.geometry.getCoordinates()[0], params.geometry.getCoordinates()[1]);
            } else {
                params.geometry = Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
            }
        }
        return params;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}

ol.supermap.QueryService = QueryService;