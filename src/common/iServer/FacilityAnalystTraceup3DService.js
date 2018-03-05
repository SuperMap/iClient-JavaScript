import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {FacilityAnalystTraceup3DParameters} from './FacilityAnalystTraceup3DParameters';

/**
 * @class SuperMap.FacilityAnalystTraceup3DService
 * @category  iServer FacilityAnalyst3D TraceUpResult
 * @classdesc 上游追踪资源服务类
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FacilityAnalystTraceup3DService extends CommonServiceBase {

    /*
     * @function SuperMap.FacilityAnalystTraceup3DService.constructor
     * @description 上游追踪资源服务类构造函数。
     * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
     *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
     *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystTraceup3DService";
    }

    /**
     * @function SuperMap.FacilityAnalystTraceup3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FacilityAnalystTraceup3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FacilityAnalystTraceup3DParameters} 上游追踪资源参数类
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystTraceup3DParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "traceupresult" : "/traceupresult") + ".json?";
        jsonObject = {
            edgeID: params.edgeID,
            nodeID: params.nodeID,
            weightName: params.weightName,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.FacilityAnalystTraceup3DService = FacilityAnalystTraceup3DService;