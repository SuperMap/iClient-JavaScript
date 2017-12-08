import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {BuffersAnalystJobsParameter} from './BuffersAnalystJobsParameter';

/**
 * @class SuperMap.BuffersAnalystJobsService
 * @classdesc 缓冲区分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 缓冲区分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export class BuffersAnalystJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/buffers";
        this.CLASS_NAME = "SuperMap.BuffersAnalystJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.BuffersAnalystJobsService.protitype.getBufferJobs
     * @description 获取缓冲区分析所有任务
     */
    getBuffersJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.BuffersAnalystJobsService.protitype.getBufferJob
     * @description 获取指定id的缓冲区分析服务
     * @param id -{string} 指定要获取数据的id
     */
    getBuffersJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.BuffersAnalystJobsService.protitype.addBufferJob
     * @description 新建缓冲区分析服务
     * @param params - {SuperMap.BuffersAnalystJobsParameter} 创建一个空间分析的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addBuffersJob(params, seconds) {
        super.addJob(this.url, params, BuffersAnalystJobsParameter, seconds);
    }
}

SuperMap.BuffersAnalystJobsService = BuffersAnalystJobsService;