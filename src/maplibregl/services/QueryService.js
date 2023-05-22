/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import maplibregl from 'maplibre-gl';
import '../core/Base';
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import { QueryService as CommonQueryService } from '@supermap/iclient-common/iServer/QueryService';
import { Bounds } from '@supermap/iclient-common/commontypes/Bounds';
import { Geometry } from '@supermap/iclient-common/commontypes/Geometry';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
/**
 * @class QueryService
 * @category  iServer Map QueryResults
 * @classdesc 地图查询服务类。
 *            提供：范围查询，SQL 查询，几何查询，距离查询。
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * new QueryService(url)
 * .queryByBounds(param,function(result){
 *     //doSomething
 * })
 * @usage
 */
export class QueryService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
        this._queryService = new CommonQueryService(url, options);
    }

    /**
     * @function QueryService.prototype.queryByBounds
     * @description Bounds 查询地图服务。
     * @param {QueryByBoundsParameters} params - Bounds 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    queryByBounds(params, callback, resultFormat) {
      params = this._processParams(params);
      this._queryService.queryByBounds(params, callback, resultFormat);
    }

    /**
     * @function QueryService.prototype.queryByDistance
     * @description 地图距离查询服务。
     * @param {QueryByDistanceParameters} params - Distance 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型
     */
    queryByDistance(params, callback, resultFormat) {
      params = this._processParams(params);
      this._queryService.queryByDistance(params, callback, resultFormat);
    }

    /**
     * @function QueryService.prototype.queryBySQL
     * @description 地图 SQL 查询服务。
     * @param {QueryBySQLParameters} params - SQL 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    queryBySQL(params, callback, resultFormat) {
      params = this._processParams(params);
      this._queryService.queryBySQL(params, callback, resultFormat);
    }

    /**
     * @function QueryService.prototype.queryByGeometry
     * @description 地图几何查询服务。
     * @param {QueryByGeometryParameters} params - Geometry 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    queryByGeometry(params, callback, resultFormat) {
      params = this._processParams(params);
      this._queryService.queryByGeometry(params, callback, resultFormat);
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
            if (params.bounds instanceof maplibregl.LngLatBounds) {
                params.bounds = new Bounds(
                    params.bounds.getSouthWest().lng,
                    params.bounds.getSouthWest().lat,
                    params.bounds.getNorthEast().lng,
                    params.bounds.getNorthEast().lat
                );
            }
        }

        if (params.geometry) {
            if (params.geometry instanceof maplibregl.LngLat) {
                params.geometry = new GeometryPoint(params.geometry.lng, params.geometry.lat);
            }

            if (params.geometry instanceof maplibregl.Point) {
                params.geometry = new GeometryPoint(params.geometry.x, params.geometry.y);
            }

            if (params.geometry instanceof maplibregl.LngLatBounds) {
                params.geometry = Util.toSuperMapPolygon(params.geometry);
            }

            if (!(params.geometry instanceof Geometry)) {
                params.geometry = Util.toSuperMapGeometry(params.geometry);
            }
        }
        return params;
    }
}

