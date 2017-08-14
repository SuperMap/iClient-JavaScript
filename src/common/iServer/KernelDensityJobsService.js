import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import KernelDensityJobParameter from './KernelDensityJobParameter';

/**
 * @class SuperMap.KernelDensityJobsService
 * @classdesc 核密度大数据服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{String} 核密度大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export default  class KernelDensityJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/density";
    }

    /**
     *@inheritDoc
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度大数据
     * @return {*}
     */
    getKernelDensityJobs() {
        return super.getJobs(this.url);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定id的核密度大数据服务
     * @param id -{String} 指定要获取数据的id
     */
    getKernelDensityJob(id) {
        return super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.prototype.addKernelDensityJob
     * @description 新建核密度大数据服务
     * @param params - {SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addKernelDensityJob(params, seconds) {
        return super.addJob(this.url, params, KernelDensityJobParameter, seconds);
    }

    CLASS_NAME = "SuperMap.KernelDensityJobsService"
}

SuperMap.KernelDensityJobsService = KernelDensityJobsService;