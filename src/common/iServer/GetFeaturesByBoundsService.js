import {SuperMap} from '../SuperMap';
import {GetFeaturesServiceBase} from './GetFeaturesServiceBase';
import {GetFeaturesByBoundsParameters} from './GetFeaturesByBoundsParameters';

/**
 * @class SuperMap.GetFeaturesByBoundsService
 * @category  iServer Data FeatureResults
 * @classdesc 数据集范围查询服务类,查询与指定范围对象符合一定空间关系的矢量要素。
 * @description 数据集范围查询服务类构造函数。
 * @extends SuperMap.GetFeaturesServiceBase
 * @param url - {string} 数据查询结果资源地址。请求数据服务中数据集查询服务，URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；
 * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
 * @param options - {Object} 可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 * @example
 * var myGetFeaturesByBoundsService = new SuperMa.GetFeaturesByBoundsService(url, {
 *     eventListeners: {
 *           "processCompleted": getFeatureCompleted,
 *           "processFailed": getFeatureError
 *           }
 * });
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 */

export class GetFeaturesByBoundsService extends GetFeaturesServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.GetFeaturesByBoundsService";
    }

    /**
     * @function SuperMap.GetFeaturesByBoundsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.GetFeaturesByBoundsService.prototype.getJsonParameters
     * @description 将查询参数转化为 JSON 字符串。在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry,Bounds等）。
     * @param params {SuperMap.GetFeaturesByBoundsParameters}
     * @return {string} 转化后的 JSON 字符串。
     *
     */
    getJsonParameters(params) {
        return GetFeaturesByBoundsParameters.toJsonParameters(params);
    }

}

SuperMap.GetFeaturesByBoundsService = GetFeaturesByBoundsService;