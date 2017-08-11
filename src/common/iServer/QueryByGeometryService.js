import SuperMap from '../SuperMap';
import QueryService from './QueryService';
import QueryByGeometryParameters from './QueryByGeometryParameters';

/**
 * @class SuperMap.QueryByGeometryService
 * @classdesc Geometry查询服务类。
 * @extends SuperMap.QueryService
 * @example
 * var myQueryByGeometryService = new SuperMap.QueryByGeometryService(url, {
 *     eventListeners: {
 *	      "processCompleted": queryCompleted,
 *		  "processFailed": queryError
 *		  }
 * });
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export default  class QueryByGeometryService extends QueryService {

    /*
     * @function SuperMap.QueryByGeometryService.prototype.constructor
     * @description Geometry 查询服务类构造函数。
     * @param url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
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
     * @function SuperMap.QueryByGeometryService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     * @param params - {SuperMap.QueryByGeometryParameters}
     * @return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        var me = this,
            jsonParameters = "",
            qp = null,
            geometry = params.geometry,
            sg = SuperMap.REST.ServerGeometry.fromGeometry(geometry);
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'SpatialQuery','queryParameters':";
        jsonParameters += SuperMap.Util.toJSON(qp) + ",'geometry':" + SuperMap.Util.toJSON(sg)
            + ",'spatialQueryMode':" + SuperMap.Util.toJSON(params.spatialQueryMode);
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    }

    CLASS_NAME = "SuperMap.QueryByGeometryService"
}

SuperMap.QueryByGeometryService = QueryByGeometryService;
