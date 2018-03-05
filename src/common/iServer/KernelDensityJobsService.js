import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {KernelDensityJobParameter} from './KernelDensityJobParameter';

/**
 * @class SuperMap.KernelDensityJobsService
 * @category  iServer ProcessingService DensityAnalyst
 * @classdesc 核密度分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 核密度分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export class KernelDensityJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/density";
        this.CLASS_NAME = "SuperMap.KernelDensityJobsService";
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度分析任务
     */
    getKernelDensityJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定id的核密度分析服务
     * @param id -{string} 指定要获取数据的id
     */
    getKernelDensityJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.addKernelDensityJob
     * @description 新建核密度分析服务
     * @param params - {SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addKernelDensityJob(params, seconds) {
        super.addJob(this.url, params, KernelDensityJobParameter, seconds);
    }

}

SuperMap.KernelDensityJobsService = KernelDensityJobsService;