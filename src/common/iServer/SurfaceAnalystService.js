import {SuperMap} from '../SuperMap';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {Util} from '../commontypes/Util';
import {DatasetSurfaceAnalystParameters} from './DatasetSurfaceAnalystParameters';
import {GeometrySurfaceAnalystParameters} from './GeometrySurfaceAnalystParameters';
import {SurfaceAnalystParameters} from './SurfaceAnalystParameters';


/**
 * @class SuperMap.SurfaceAnalystService
 * @category  iServer SpatialAnalyst SurfaceAnalyst
 * @classdesc
 * 表面分析服务类。
 * 该类负责将客户设置的表面分析服务参数传递给服务端，并接收服务端返回的表面分析服务分析结果数据。
 * 表面分析结果通过该类支持的事件的监听函数参数获取
 * @param options - {Object} 可选参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。s
 * @extends SuperMap.SpatialAnalystBase
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
 */
export class SurfaceAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.SurfaceAnalystService";
    }

    /**
     * @function SuperMap.SurfaceAnalystService.prototype.destroy
     * @description 释放资源,将引用的资源属性置空。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SurfaceAnalystService.prototype.processAsync
     * @description 负责将客户端的表面分析服务参数传递到服务端。
     * @param params - {SuperMap.SurfaceAnalystParameters}
     */
    processAsync(params) {
        if (!(params instanceof SurfaceAnalystParameters)) {
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
     * @function SuperMap.SurfaceAnalystService.prototype.getJsonParameters
     * @description 将参数转化为 JSON 字符串。
     * @param params - {SuperMap.SurfaceAnalystParameters}
     * @return {Object} 转化后的JSON字符串。
     */
    getJsonParameters(params) {
        var jsonParameters = "";
        var parameterObject = {};
        var me = this, end;
        if (params instanceof DatasetSurfaceAnalystParameters) {
            end = me.url.substr(me.url.length - 1, 1);
            me.url += (end === "/") ? "datasets/" + params.dataset + "/" + params.surfaceAnalystMethod.toLowerCase() +
                ".json?returnContent=true" : "/datasets/" + params.dataset + "/" +
                params.surfaceAnalystMethod.toLowerCase() + ".json?returnContent=true";
            DatasetSurfaceAnalystParameters.toObject(params, parameterObject);
            jsonParameters = Util.toJSON(parameterObject);
        } else if (params instanceof GeometrySurfaceAnalystParameters) {
            end = me.url.substr(me.url.length - 1, 1);
            me.url += (end === "/") ? "geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                ".json?returnContent=true" : "/geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                ".json?returnContent=true";
            jsonParameters = Util.toJSON(params);
        } else {
            return;
        }
        return jsonParameters;
    }
}

SuperMap.SurfaceAnalystService = SurfaceAnalystService;