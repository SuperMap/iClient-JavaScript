import SuperMap from '../SuperMap';
import QueryService from './QueryService';
import QueryByDistanceParameters from './QueryByDistanceParameters';

/**
 * @class SuperMap.QueryByDistanceService
 * @description Distance查询服务类。
 * @extends SuperMap.QueryService
 * @example
 *(start code)
 * var myQueryByDistService = new SuperMap.QueryByDistanceService(url, {
 *     eventListeners: {
 *         "processCompleted": queryCompleted,
 *		   "processFailed": queryError
 *		   }
 * });
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 *(end)
 *
 * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export default  class QueryByDistanceService extends QueryService {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.QueryByDistanceService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     * @param params - {SuperMap.QueryByDistanceParameters}
     * @return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        var me = this,
            jsonParameters = "",
            qp = me.getQueryParameters(params);
        var sg = SuperMap.REST.ServerGeometry.fromGeometry(params.geometry);

        jsonParameters += params.isNearest ? "'queryMode':'FindNearest','queryParameters':" : "'queryMode':'DistanceQuery','queryParameters':";
        jsonParameters += SuperMap.Util.toJSON(qp);
        jsonParameters += ",'geometry':" + SuperMap.Util.toJSON(sg) + ",'distance':" + params.distance;
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    }

    CLASS_NAME = "SuperMap.QueryByDistanceService"
}

SuperMap.QueryByDistanceService = QueryByDistanceService;