import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {FacilityAnalystUpstream3DParameters} from './FacilityAnalystUpstream3DParameters';

/**
 * @class SuperMap.FacilityAnalystUpstream3DService
 * @category  iServer FacilityAnalyst3D UpstreamCirticalFaclilities
 * @classdesc 上游关键设施查找资源服务类
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FacilityAnalystUpstream3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystUpstream3DService";
    }

    /**
     * @function SuperMap.FacilityAnalystUpstream3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.FacilityAnalystUpstream3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FacilityAnalystUpstream3DParameters} 上游关键设施查找资源参数类
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystUpstream3DParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "upstreamcirticalfaclilities" :
            "/upstreamcirticalfaclilities") + ".json?";
        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            edgeID: params.edgeID,
            nodeID: params.nodeID,
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

SuperMap.FacilityAnalystUpstream3DService = FacilityAnalystUpstream3DService;
