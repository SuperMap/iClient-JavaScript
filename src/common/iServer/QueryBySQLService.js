/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {QueryServiceBase} from './QueryServiceBase';
import {QueryBySQLParameters} from './QueryBySQLParameters';

/**
 * @class QueryBySQLService
 * @deprecatedclass SuperMap.QueryBySQLService
 * @category  iServer Map QueryResults
 * @classdesc SQL 查询服务类。在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
 * @extends {QueryServiceBase}
 * @example
 * var queryParam = new FilterParameter({
 *     name: "Countries@World.1",
 *     attributeFilter: "Pop_1994>1000000000 and SmArea>900"
 * });
 * var queryBySQLParams = new QueryBySQLParameters({
 *     queryParams: [queryParam]
 * });
 * var myQueryBySQLService = new QueryBySQLService(url, {eventListeners: {
 *     "processCompleted": queryCompleted,
 *     "processFailed": queryError
 *	   }
 * });
 * queryBySQLService.processAsync(queryBySQLParams);
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * @param {string} url - 服务地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class QueryBySQLService extends QueryServiceBase {
    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.QueryBySQLService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function QueryBySQLService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     * @param {QueryBySQLParameters} params - SQL 查询参数类。
     * @returns {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        if (!(params instanceof QueryBySQLParameters)) {
            return;
        }
        var me = this,
            jsonParameters = "",
            qp = null;
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'SqlQuery','queryParameters':";
        jsonParameters += Util.toJSON(qp);
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    }

}

