import SuperMap from '../SuperMap';
import GetFeaturesServiceBase from './GetFeaturesServiceBase';
import GetFeaturesBySQLParameters from './GetFeaturesBySQLParameters';

/**
 * @class SuperMap.GetFeaturesBySQLService
 * @constructs SuperMap.GetFeaturesBySQLService
 * @classdesc
 * 数据服务中数据集 SQL 查询服务类。
 * 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
 * @extends {SuperMap.GetFeaturesServiceBase}
 * @example 例如：
 * (start code)
 * var myGetFeaturesBySQLService = new SuperMap.GetFeaturesBySQLService(url, {
     *     eventListeners: {
     *         "processCompleted": GetFeaturesCompleted,
     *         "processFailed": GetFeaturesError
     *         }
     * });
 * function getFeaturesCompleted(object){//todo};
 * function getFeaturesError(object){//todo};
 * (end)
 *
 */
export default  class GetFeaturesBySQLService extends GetFeaturesServiceBase {
    /*
     * @method SuperMap.GetFeaturesBySQLService.prototype.constructor
     * @description  SQL 查询服务类构造函数。
     * @param url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；</br>
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
     *@param  options - {Object} 可選参数。如</br>
     *        eventListeners - {Object} 需要被注册的监听器对象。
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

    /*
     * @method SuperMap.GetFeaturesBySQLService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     * @param params - {SuperMap.GetFeaturesBySQLParameters}
     * @return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        return GetFeaturesBySQLParameters.toJsonParameters(params);
    }

    CLASS_NAME = "SuperMap.GetFeaturesBySQLService"
}

SuperMap.GetFeaturesBySQLService = GetFeaturesBySQLService;