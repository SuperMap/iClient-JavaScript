import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryService} from './QueryService';
import {QueryByGeometryParameters} from './QueryByGeometryParameters';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.QueryByGeometryService
 * @category  iServer Map QueryResults
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
 * @param url - {string} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class QueryByGeometryService extends QueryService {

    /*
     * @function SuperMap.QueryByGeometryService.prototype.constructor
     * @description Geometry 查询服务类构造函数。
     * @param url - {string} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
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
     * @function SuperMap.QueryByGeometryService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     * @param params - {SuperMap.QueryByGeometryParameters}
     * @return {Object} 转化后的 JSON 字符串。
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

SuperMap.QueryByGeometryService = QueryByGeometryService;
