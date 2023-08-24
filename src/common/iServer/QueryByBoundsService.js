/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import { QueryServiceBase } from './QueryServiceBase';
import {QueryByBoundsParameters} from './QueryByBoundsParameters';

/**
 * @class QueryByBoundsService
 * @deprecatedclass SuperMap.QueryByBoundsService
 * @category  iServer Map QueryResults
 * @classdesc Bounds 查询服务类。
 * @augments {QueryService}
 * @example
 * (start end)
 * var myQueryByBoundsService = new QueryByBoundsService(url);
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * (end)
 * @param {string} url - 服务地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class QueryByBoundsService extends QueryServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.QueryByBoundsService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function QueryByBoundsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds 等）。
     * @param {QueryByBoundsParameters} params - Bounds 查询参数。
     * @returns {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        if (!(params instanceof QueryByBoundsParameters)) {
            return null;
        }
        var me = this,
            jsonParameters = "",
            qp = null,
            bounds = params.bounds;
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'BoundsQuery','queryParameters':";
        jsonParameters += Util.toJSON(qp);
        jsonParameters += ",'bounds': {'rightTop':{'y':" + bounds.top + ",'x':" +
            bounds.right + "},'leftBottom':{'y':" + bounds.bottom + ",'x':" + bounds.left + "}}";
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    }

}

