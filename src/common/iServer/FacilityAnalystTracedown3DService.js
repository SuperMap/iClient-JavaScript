import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {FacilityAnalystTracedown3DParameters} from './FacilityAnalystTracedown3DParameters';

/**
 * @class SuperMap.FacilityAnalystTracedown3DService
 * @category iServer FacilityAnalyst3D TraceDownResult
 * @classdesc 下游追踪资源服务类
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。<br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 */
export class FacilityAnalystTracedown3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystTracedown3DService";
    }

    /**
     * @function SuperMap.FacilityAnalystTracedown3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FacilityAnalystTracedown3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {SuperMap.FacilityAnalystTracedown3DParameters} params - 下游追踪资源参数类。
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystTracedown3DParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "tracedownresult" : "/tracedownresult") + ".json?";
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

SuperMap.FacilityAnalystTracedown3DService = FacilityAnalystTracedown3DService;