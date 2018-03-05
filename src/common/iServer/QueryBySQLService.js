import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryService} from './QueryService';
import {QueryBySQLParameters} from './QueryBySQLParameters';

/**
 * @class SuperMap.QueryBySQLService
 * @category  iServer Map QueryResults
 * @classdesc SQL 查询服务类。在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
 * @extends SuperMap.QueryService
 * @example
 * var queryParam = new SuperMap.FilterParameter({
 *     name: "Countries@World.1",
 *     attributeFilter: "Pop_1994>1000000000 and SmArea>900"
 * });
 * var queryBySQLParams = new SuperMap.QueryBySQLParameters({
 *     queryParams: [queryParam]
 * });
 * var myQueryBySQLService = new SuperMap.QueryBySQLService(url, {eventListeners: {
 *     "processCompleted": queryCompleted,
 *     "processFailed": queryError
 *	   }
 * });
 * queryBySQLService.processAsync(queryBySQLParams);
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * @param url - {string} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class QueryBySQLService extends QueryService {

    /*
     * @function SuperMap.QueryBySQLService.prototype.constructor
     * @descriptionSQL 查询服务类构造函数。
     * @param url - {string} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
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
     * @function SuperMap.QueryBySQLService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     * @param params - {SuperMap.QueryBySQLParameters}
     * @return {Object} 转化后的 JSON 字符串。
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

SuperMap.QueryBySQLService = QueryBySQLService;
