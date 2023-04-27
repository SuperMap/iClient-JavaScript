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
 * @classdesc 缓冲区分析服务类
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
     * @description 获取缓冲区分析所有任务
     */
    getBuffersJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function BuffersAnalystJobsService.prototype.getBufferJob
     * @description 获取指定id的缓冲区分析服务
     * @param {string} id - 指定要获取数据的id。
     */
    getBuffersJob(id) {
        super.getJobs(Util.urlPathAppend(this.url, id));
    }

    /**
     * @function BuffersAnalystJobsService.prototype.addBufferJob
     * @description 新建缓冲区分析服务
     * @param {BuffersAnalystJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addBuffersJob(params, seconds) {
        super.addJob(this.url, params, BuffersAnalystJobsParameter, seconds);
    }
}

