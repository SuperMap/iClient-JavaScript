/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { CommonServiceBase } from './CommonServiceBase';
import { Util } from '../commontypes/Util';
import { FacilityAnalystSources3DParameters } from './FacilityAnalystSources3DParameters';

/**
 * @class FacilityAnalystSources3DService
 * @deprecatedclass SuperMap.FacilityAnalystSources3DService
 * @category  iServer FacilityAnalyst3D Sources
 * @classdesc 最近设施分析服务类(源查找资源)
 *            最近设施分析是指在网络上给定一个事件点和一组设施点，
 *            查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *            该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 *            最近设施分析结果通过该类支持的事件的监听函数参数获取。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FacilityAnalystSources3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FacilityAnalystSources3DService";
    }


    /**
     * @function FacilityAnalystSources3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function FacilityAnalystSources3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FacilityAnalystSources3DParameters} params - 最近设施分析参数类（源查找资源）
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof FacilityAnalystSources3DParameters)) {
            return;
        }
        var me = this, jsonObject;
        me.url = Util.urlPathAppend(me.url, 'sources');
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
