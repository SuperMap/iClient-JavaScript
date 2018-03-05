import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {QueryService} from './QueryService';
import {QueryByBoundsParameters} from './QueryByBoundsParameters';

/**
 * @class SuperMap.QueryByBoundsService
 * @category  iServer Map QueryResults
 * @classdesc Bounds 查询服务类。
 * @augments SuperMap.QueryService
 * @example
 * (start end)
 * var myQueryByBoundsService = new SuperMap.QueryByBoundsService(url, {
 *     eventListeners: {
 *         "processCompleted": queryCompleted,
 *		   "processFailed": queryError
 *		   }
 * });
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * (end)
 * @param url - {string} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class QueryByBoundsService extends QueryService {

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
     * @function SuperMap.QueryByBoundsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     *              在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds 等）。
     * @param params - {SuperMap.QueryByBoundsParameters} Bounds 查询参数。
     * @return {Object} 转化后的 JSON 字符串。
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

SuperMap.QueryByBoundsService = QueryByBoundsService;
