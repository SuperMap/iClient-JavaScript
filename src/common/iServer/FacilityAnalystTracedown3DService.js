/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {FacilityAnalystTracedown3DParameters} from './FacilityAnalystTracedown3DParameters';

/**
 * @class FacilityAnalystTracedown3DService
 * @deprecatedclass SuperMap.FacilityAnalystTracedown3DService
 * @category iServer FacilityAnalyst3D TraceDownResult
 * @classdesc 下游追踪资源服务类
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FacilityAnalystTracedown3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystTracedown3DService";
    }

    /**
     * @function FacilityAnalystTracedown3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FacilityAnalystTracedown3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FacilityAnalystTracedown3DParameters} params - 下游追踪资源参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    processAsync(params, callback) {
        if (!(params instanceof FacilityAnalystTracedown3DParameters)) {
            return;
        }
        var me = this, jsonObject;
        me.url = Util.urlPathAppend(me.url, 'tracedownresult');

        jsonObject = {
            edgeID: params.edgeID,
            nodeID: params.nodeID,
            weightName: params.weightName,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };
        return me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: callback,
            failure: callback
        });
    }


}
