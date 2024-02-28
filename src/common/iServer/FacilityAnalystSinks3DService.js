/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { CommonServiceBase } from './CommonServiceBase';
import { Util } from '../commontypes/Util';
import { FacilityAnalystSinks3DParameters } from './FacilityAnalystSinks3DParameters';

/**
 * @class FacilityAnalystSinks3DService
 * @deprecatedclass SuperMap.FacilityAnalystSinks3DService
 * @category iServer FacilityAnalyst3D Sinks
 * @classdesc  汇查找服务类。<br>
 *             汇查找是指即从给定弧段或节点出发，根据流向查找流出该弧段或节点的下游汇点，
 *             并返回给定弧段或节点到达该汇的最小耗费路径所包含的弧段、结点及耗费。
 * @extends {CommonServiceBase}
 * @example
 * var myFacilityAnalystSinks3DService = new FacilityAnalystSinks3DService(url);
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL 应为：<br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                       例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。<br>
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FacilityAnalystSinks3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystSinks3DService";
    }


    /**
     * @function FacilityAnalystSinks3DService.prototype.destroy
     * @override
     */
    destroy() {
        CommonServiceBase.prototype.destroy.apply(this, arguments);
    }


    /**
     * @function FacilityAnalystSinks3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {FacilityAnalystSinks3DParameters} params - 汇查找资源参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof FacilityAnalystSinks3DParameters)) {
            return;
        }
        var me = this, jsonObject;
        me.url = Util.urlPathAppend(me.url, 'sinks');
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
