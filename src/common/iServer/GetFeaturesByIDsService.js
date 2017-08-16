import SuperMap from '../SuperMap';
import GetFeaturesServiceBase from './GetFeaturesServiceBase';
import GetFeaturesByIDsParameters from './GetFeaturesByIDsParameters';

/**
 * @class SuperMap.GetFeaturesByIDsService
 * @classdesc 数据集ID查询服务类。在数据集集合中查找指定 ID 号对应的空间地物要素。
 * @param url - {string} 数据查询结果资源地址。请求数据服务中数据集查询服务。
 * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；</br>
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param options - {Object} 可選参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。</br>
 * @extends SuperMap.GetFeaturesServiceBase
 * @example 例如：
 * (start code)
 * var myGetFeaturesByIDsService = new SuperMap.GetFeaturesByIDsService(url, {
     *     eventListeners: {
     *         "processCompleted": getFeatureCompleted,
     *         "processFailed": getFeatureError
     *            }
     *     });
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 * (end)
 */
export default  class GetFeaturesByIDsService extends GetFeaturesServiceBase {


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
     * @function SuperMap.GetFeaturesByIDsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     * @param  params - {SuperMap.GetFeaturesByIDsParameters}
     * return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        return GetFeaturesByIDsParameters.toJsonParameters(params);
    }

    CLASS_NAME = "SuperMap.GetFeaturesByIDsService"
}

SuperMap.GetFeaturesByIDsService = GetFeaturesByIDsService;