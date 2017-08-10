import SuperMap from '../SuperMap';
import GetFeaturesServiceBase from './GetFeaturesServiceBase';
import GetFeaturesByBoundsParameters from './GetFeaturesByBoundsParameters';
/**
 * @class SuperMap.GetFeaturesByBoundsService
 * @classdesc 数据集范围查询服务类,查询与指定范围对象符合一定空间关系的矢量要素。
 * @description 数据集范围查询服务类构造函数。
 * @extends SuperMap.GetFeaturesServiceBase
 * @param url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；</br>
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 *@param options - {Object} 可选参数。如：<br>
 *       eventListeners - {Object} 需要被注册的监听器对象。</br>
 * @example
 * (start code)
 * var myGetFeaturesByBoundsService = new SuperMa.GetFeaturesByBoundsService(url, {
     *     eventListeners: {
     *           "processCompleted": getFeatureCompleted,
     *           "processFailed": getFeatureError
     *           }
     * });
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 * (end)
 */

export default  class GetFeaturesByBoundsService extends GetFeaturesServiceBase {
    /*
     *  @function SuperMap.GetFeaturesByBoundsService.prototype.constructor
     * @param url - {string} 服务地址。
     * @param options - {Object} 参数。
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
     * @function SuperMap.GetFeaturesByBoundsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry,Bounds等）。
     *
     * @param params  {SuperMap.GetFeaturesByBoundsParameters}
     *
     * @return {Object} 转化后的 JSON 字符串。
     *
     */
    getJsonParameters(params) {
        return GetFeaturesByBoundsParameters.toJsonParameters(params);
    }

    CLASS_NAME = "SuperMap.GetFeaturesByBoundsService"
}

SuperMap.GetFeaturesByBoundsService = GetFeaturesByBoundsService;