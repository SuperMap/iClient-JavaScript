import SuperMap from '../SuperMap';
import SpatialAnalystBase from './SpatialAnalystBase';
import DatasetSurfaceAnalystParameters from './DatasetSurfaceAnalystParameters';
import GeometrySurfaceAnalystParameters from './GeometrySurfaceAnalystParameters';

/**
 * @class SuperMap.SurfaceAnalystService
 * @constructs SuperMap.SurfaceAnalystService
 * @classdesc
 * 表面分析服务类。
 * 该类负责将客户设置的表面分析服务参数传递给服务端，并接收服务端返回的表面分析服务分析结果数据。
 * 表面分析结果通过该类支持的事件的监听函数参数获取
 * @extends {SuperMap.SpatialAnalystBase}
 * @api
 * @example 例如：
 * (start code)
 * var mySurfaceAnalystService = new SuperMap.SurfaceAnalystService(url, {
     *      eventListeners: {
     *	       "processCompleted": surfaceAnalysCompleted,
     *		   "processFailed": surfaceAnalysFailed
     *		   }
     * });
 * (end)
 *
 *
 */
export default  class SurfaceAnalystService extends SpatialAnalystBase {


    /**
     *
     * @method SuperMap.SurfaceAnalystService.initialize
     * @param options - {Object} 参数。
     * @param url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     *
     */
    constructor(url, options) {
        super(url, options);
    }

    /*
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @method SuperMap.SurfaceAnalystService.processAsync
     * @description 负责将客户端的表面分析服务参数传递到服务端。
     * @param params - {SuperMap.SurfaceAnalystParameters}
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this, jsonParameters;
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @method SuperMap.SurfaceAnalystService.getJsonParameters
     * @description 将参数转化为 JSON 字符串。
     * @param params - {SuperMap.SurfaceAnalystParameters}
     * @return {Object} 转化后的JSON字符串。
     */
    getJsonParameters(params) {
        var jsonParameters = "";
        var me = this, end;
        if (params instanceof DatasetSurfaceAnalystParameters) {
            var end = me.url.substr(me.url.length - 1, 1);

            if (me.isInTheSameDomain) {
                me.url += (end === "/") ? "datasets/" + params.dataset + "/" + params.surfaceAnalystMethod.toLowerCase() +
                    ".json?returnContent=true" : "/datasets/" + params.dataset + "/" +
                    params.surfaceAnalystMethod.toLowerCase() + ".json?returnContent=true";
            } else {
                me.url += (end === "/") ? "datasets/" + params.dataset + "/" + params.surfaceAnalystMethod.toLowerCase() +
                    ".jsonp?returnContent=true" : "/datasets/" + params.dataset + "/" +
                    params.surfaceAnalystMethod.toLowerCase() + ".jsonp?returnContent=true";
            }
        } else if (params instanceof GeometrySurfaceAnalystParameters) {
            end = me.url.substr(me.url.length - 1, 1);
            if (me.isInTheSameDomain) {
                me.url += (end === "/") ? "geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                    ".json?returnContent=true" : "/geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                    ".json?returnContent=true";
            } else {
                me.url += (end === "/") ? "geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                    ".jsonp?returnContent=true" : "/geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                    ".jsonp?returnContent=true";
            }
        } else {
            return;
        }
        jsonParameters = SuperMap.Util.toJSON(params);
        return jsonParameters;
    }

    CLASS_NAME = "SuperMap.SurfaceAnalystService"
}

SuperMap.SurfaceAnalystService = SurfaceAnalystService;