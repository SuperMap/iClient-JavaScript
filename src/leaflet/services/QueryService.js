/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { QueryService as CommonQueryService } from '@supermap/iclient-common/iServer/QueryService';
import * as Util from '../core/Util';
import { CommontypesConversion } from '../core/CommontypesConversion';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';

/**
 * @class  QueryService
 * @deprecatedclassinstance L.supermap.queryService
 * @classdesc 地图查询服务类。
 * @category  iServer Map QueryResults
 * @modulecategory Services
 * @extends {ServiceBase}
 * @param {string} url -  服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * new QueryService(url).queryByBounds(param,function(result){
 *   //doSomething
 * })
 * @usage
 */
export var QueryService = ServiceBase.extend({
    initialize: function(url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._queryService = new CommonQueryService(url, options);
    },
    /**
     * @function QueryService.prototype.queryByBounds
     * @description bounds 查询地图服务。
     * @param {QueryByBoundsParameters} params - Bounds 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryByBounds: function(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._queryService.queryByBounds(params, callback, resultFormat);
    },

    /**
     * @function QueryService.prototype.queryByDistance
     * @description 地图距离查询服务。
     * @param {QueryByDistanceParameters} params - Distance 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryByDistance: function(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._queryService.queryByDistance(params, callback, resultFormat);
    },

    /**
     * @function QueryService.prototype.queryBySQL
     * @description 地图 SQL 查询服务。
     * @param {QueryBySQLParameters} params - SQL 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryBySQL: function(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._queryService.queryBySQL(params, callback, resultFormat);
    },

    /**
     * @function QueryService.prototype.queryByGeometry
     * @description 地图几何查询服务。
     * @param {QueryByGeometryParameters} params - Geometry 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryByGeometry: function(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._queryService.queryByGeometry(params, callback, resultFormat);
    },

    _processParams: function(params) {
        if (!params) {
            return {};
        }
        params.returnContent = params.returnContent == null ? true : params.returnContent;
        if (params.queryParams && !L.Util.isArray(params.queryParams)) {
            params.queryParams = [params.queryParams];
        }

        if (params.bounds) {
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds);
        }

        if (params.geometry) {
            if (params.geometry instanceof L.Point) {
                params.geometry = new GeometryPoint(params.geometry.x, params.geometry.y);
            } else {
                params.geometry = Util.toSuperMapGeometry(params.geometry);
            }
        }

        return params;
    }
});

export var queryService = function(url, options) {
    return new QueryService(url, options);
};

