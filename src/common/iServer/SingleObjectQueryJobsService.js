/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { SingleObjectQueryJobsParameter } from './SingleObjectQueryJobsParameter';

/**
 * @class SingleObjectQueryJobsService
 * @deprecatedclass SuperMap.SingleObjectQueryJobsService
 * @category  iServer ProcessingService Query
 * @classdesc 单对象空间查询分析服务类。空间查询是通过几何对象之间的空间位置关系来构建过滤条件的一种查询方式。例如：通过空间查询可以找到被包含在面中的空间对象，相离或者相邻的空间对象等。<br>
 * 分布式分析服务中的单对象空间查询，指的是只支持查询对象数据集中有一个对象对被查询数据集做空间查询。如果查询对象数据集中有多个对象，则默认用 SmID 最小的对象对被查询数据集做空间查询。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SingleObjectQueryJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/query');
        this.CLASS_NAME = 'SuperMap.SingleObjectQueryJobsService';
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取单对象空间查询分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getQueryJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定 ID 的单对象空间查询分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getQueryJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建单对象空间查询分析服务。
     * @param {SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addQueryJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SingleObjectQueryJobsParameter, seconds, callback, processRunningCallback);
    }
}

