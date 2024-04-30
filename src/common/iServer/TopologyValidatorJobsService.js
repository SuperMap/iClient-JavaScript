/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {TopologyValidatorJobsParameter} from './TopologyValidatorJobsParameter';

/**
 * @class TopologyValidatorJobsService
 * @deprecatedclass SuperMap.TopologyValidatorJobsService
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析服务类。拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。<br>
 * 支持以下 7 种拓扑规则:面数据集内部无交叠、面数据集和面数据集无交叠、面数据集被面数据集包含、面数据集被面数据集覆盖、
 * 线数据集内部无交叠、线数据集与线数据集无交叠、点数据集内部无重复点。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class TopologyValidatorJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/topologyvalidator');
        this.CLASS_NAME = "SuperMap.TopologyValidatorJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJob
     * @description 获取指定 ID 的拓扑检查分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.addTopologyValidatorJob
     * @description 新建拓扑检查分析服务。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析任务参数类。
     * @param {number} seconds -创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addTopologyValidatorJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, TopologyValidatorJobsParameter, seconds, callback, processRunningCallback);
    }

}
