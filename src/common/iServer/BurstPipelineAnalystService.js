/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { BurstPipelineAnalystParameters } from './BurstPipelineAnalystParameters';

/**
 * @class BurstPipelineAnalystService
 * @deprecatedclass SuperMap.BurstPipelineAnalystService
 * @category iServer NetworkAnalyst BurstAnalyse
 * @classdesc 爆管分析服务类。爆管分析可应用于查找爆管点上游或下游最近的阀门位置（关键设施点），
 * 根据管道流向指示，迅速找到上游中需要关闭的最临近且最少数量的阀门。关闭这些阀门后，爆裂管段与它的上游不再连通，
 * 从而阻止水的流出，防止灾情加重和资源浪费。爆管分析的结果将给出影响爆管位置上下游的关键设施点和弧段、
 * 受爆管位置影响的上下游的普通设施点和弧段，即返回关键结点 ID 数组、普通结点 ID 数组及其上下游弧段 ID 数组。
 * @extends {NetworkAnalystServiceBase}
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL 应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}，
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet"。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class BurstPipelineAnalystService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.BurstPipelineAnalystService";
    }

    /**
     * @function BurstPipelineAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function BurstPipelineAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {BurstPipelineAnalystParameters} params - 爆管分析参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof BurstPipelineAnalystParameters)) {
            return null;
        }
        var me = this, jsonObject;
        me.url = Util.urlPathAppend(me.url, 'burstAnalyse');
        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };

        //必传参数不正确，就终止
        if (params.edgeID !== null && params.nodeID !== null) {
            throw new Error('edgeID and nodeID cannot be null at the same time.');
        }
        if (params.edgeID === null && params.nodeID === null) {
            throw new Error('edgeID and nodeID cannot be null at the same time.');
        }
        if (params.edgeID !== null) {
            jsonObject.edgeID = params.edgeID;
        } else {
            jsonObject.nodeID = params.nodeID;
        }

        return me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: callback,
            failure: callback
        });
    }
}
