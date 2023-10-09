/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { CommonServiceBase } from './CommonServiceBase';
import { Util } from '../commontypes/Util';
import { FacilityAnalystSources3DParameters } from './FacilityAnalystSources3DParameters';

/**
 * @class FacilityAnalystSources3DService
 * @deprecatedclass SuperMap.FacilityAnalystSources3DService
 * @category  iServer FacilityAnalyst3D Sources
 * @classdesc 源查找服务类。
 *            源查找是指根据流向查找流向指定弧段或节点的网络源头，
 *            并返回该源到达指定弧段或结点的最小耗费路径所包含的弧段、结点及耗费。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求网络分析服务，URL 应为：
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
     * @param {FacilityAnalystSources3DParameters} params - 源查找资源参数类。
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
