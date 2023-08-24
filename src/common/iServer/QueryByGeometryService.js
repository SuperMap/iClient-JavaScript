/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {QueryServiceBase} from './QueryServiceBase';
import {QueryByGeometryParameters} from './QueryByGeometryParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class QueryByGeometryService
 * @deprecatedclass SuperMap.QueryByGeometryService
 * @category  iServer Map QueryResults
 * @classdesc Geometry查询服务类。
 * @extends {QueryServiceBase}
 * @example
 * var myQueryByGeometryService = new QueryByGeometryService(url);
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * @param {string} url - 服务地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class QueryByGeometryService extends QueryServiceBase {
    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.QueryByGeometryService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function QueryByGeometryService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     * @param {QueryByGeometryParameters} params - Geometry 查询参数类。
     * @returns {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        if (!(params instanceof QueryByGeometryParameters)) {
            return;
        }
        var me = this,
            jsonParameters = "",
            qp = null,
            geometry = params.geometry,
            sg = ServerGeometry.fromGeometry(geometry);
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'SpatialQuery','queryParameters':";
        jsonParameters += Util.toJSON(qp) + ",'geometry':" + Util.toJSON(sg)
            + ",'spatialQueryMode':" + Util.toJSON(params.spatialQueryMode);
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    }

}

