/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import { NetworkAnalyst3DService as CommonNetworkAnalyst3DService } from '@supermap/iclient-common/iServer/NetworkAnalyst3DService';
/**
 * @class NetworkAnalyst3DService
 * @category  iServer FacilityAnalyst3D
 * @classdesc 3D 网络分析服务类。提供方法：汇查找、源查找、下游追踪资源、上游追踪资源、上游关键设施查找等。
 * @version 11.1.0
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 * new NetworkAnalyst3DService(url)
 *  .sinksFacilityAnalyst(params,function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。请求网络分析服务，URL 应为：</br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}。
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class NetworkAnalyst3DService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._networkAnalyst3DService = new CommonNetworkAnalyst3DService(url, options);
    }

    /**
     * @function NetworkAnalyst3DService.prototype.sinksFacilityAnalyst
     * @description 汇查找服务。<br>
     * 汇查找是指即从给定弧段或节点出发，根据流向查找流出该弧段或节点的下游汇点，并返回给定弧段或节点到达该汇的最小耗费路径所包含的弧段、结点及耗费。
     * @param {FacilityAnalystSinks3DParameters} params - 汇查找资源参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    sinksFacilityAnalyst(params, callback) {
      return this._networkAnalyst3DService.sinksFacilityAnalyst(params, callback);
    }

    /**
     * @function NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst
     * @description 源查找服务。<br>
     * 源查找是根据流向查找流向指定弧段或节点的网络源头，并返回该源到达指定弧段或结点的最小耗费路径所包含的弧段、结点及耗费。
     * @param {FacilityAnalystSources3DParameters} params - 源查找资源参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    sourcesFacilityAnalyst(params, callback) {
      return this._networkAnalyst3DService.sourcesFacilityAnalyst(params, callback);
    }

    /**
     * @function NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst
     * @description 上游追踪资源服务。<br>
      * 上游追踪分析是指根据给定的弧段 ID 或结点 ID 进行上游追踪，即查找给定弧段的上游，返回上游包含的弧段、结点及总耗费。
     * @param {FacilityAnalystTraceup3DParameters} params - 上游追踪资源参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */

    traceUpFacilityAnalyst(params, callback) {
      return this._networkAnalyst3DService.traceUpFacilityAnalyst(params, callback);
    }

    /**
     * @function NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst
     * @description 下游追踪资源服务。<br>
     * 下游追踪分析是指根据给定的弧段 ID 或结点 ID 进行下游追踪，即查找给定弧段的下游，返回下游包含的弧段、结点及总耗费。
     * @param {FacilityAnalystTracedown3DParameters} params - 下游追踪资源服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    traceDownFacilityAnalyst(params, callback) {
      return this._networkAnalyst3DService.traceDownFacilityAnalyst(params, callback);
    }

    /**
     * @function NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst
     * @description 上游关键设施查找服务。<br>
      * 上游关键设施查找即查找给定弧段或节点的上游中的关键设施结点，返回关键设施结点 ID 数组及其下游弧段 ID 数组。
     * @param {FacilityAnalystUpstream3DParameters} params - 上游关键设施查找服务参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    upstreamFacilityAnalyst(params, callback) {
      return this._networkAnalyst3DService.upstreamFacilityAnalyst(params, callback);
    }
}
