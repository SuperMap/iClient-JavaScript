/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { SummaryMeshJobParameter } from './SummaryMeshJobParameter';

/**
 * @class SummaryMeshJobsService
 * @deprecatedclass SuperMap.SummaryMeshJobsService
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务地址在数组中的位置。
 * @param {number} options.length - 服务地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SummaryMeshJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/aggregatepoints');
        this.CLASS_NAME = 'SuperMap.SummaryMeshJobsService';
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SummaryMeshJobsService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析任务
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function SummaryMeshJobsService.prototype.getSummaryMeshJob
     * @description 获取指定ip的点聚合分析任务
     * @param {string} id - 指定要获取数据的id
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryMeshJobsService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析服务
     * @param {SummaryMeshJobParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addSummaryMeshJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SummaryMeshJobParameter, seconds, callback, processRunningCallback);
    }
}

