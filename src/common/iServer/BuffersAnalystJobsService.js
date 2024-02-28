/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { BuffersAnalystJobsParameter } from './BuffersAnalystJobsParameter';

/**
 * @class BuffersAnalystJobsService
 * @deprecatedclass SuperMap.BuffersAnalystJobsService
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析服务类。缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程。
 * 缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class BuffersAnalystJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/buffers');
        this.CLASS_NAME = 'SuperMap.BuffersAnalystJobsService';
    }

    /**
     *@override
     */
    destroy() {
      super.destroy();
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJobs
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @description 获取缓冲区分析所有任务。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJob
     * @description 获取指定 ID 的缓冲区分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.addBufferJob
     * @description 新建缓冲区分析任务。
     * @param {BuffersAnalystJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    addBuffersJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, BuffersAnalystJobsParameter, seconds, callback, processRunningCallback);
    }
}

