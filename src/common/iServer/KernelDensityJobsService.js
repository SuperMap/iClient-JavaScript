/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {KernelDensityJobParameter} from './KernelDensityJobParameter';

/**
 * @class KernelDensityJobsService
 * @deprecatedclass SuperMap.KernelDensityJobsService
 * @category  iServer ProcessingService DensityAnalyst
 * @classdesc 核密度分析服务类
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class KernelDensityJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/density');
        this.CLASS_NAME = "SuperMap.KernelDensityJobsService";
    }

    /**
     * @function KernelDensityJobsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度分析任务
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定id的核密度分析服务
     * @param {string} id - 指定要获取数据的id
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJob(id, callback) {
      return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.addKernelDensityJob
     * @description 新建核密度分析服务
     * @param {KernelDensityJobParameter} params - 核密度分析服务参数类。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    addKernelDensityJob(params, seconds, callback, processRunningCallback) {
      return super.addJob(this.url, params, KernelDensityJobParameter, seconds, callback, processRunningCallback);
    }

}
