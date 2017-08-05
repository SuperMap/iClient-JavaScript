import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import SingleObjectQueryJobsParameter from './SingleObjectQueryJobsParameter';

/**
 * @class SuperMap.SingleObjectQueryJobsService
 * @description 大数据单对象查询分析服务类
 * @augments SuperMap.ProcessingServiceBase
 * @param url -{String} 大数据单对象空间查询分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export default  class SingleObjectQueryJobsService extends ProcessingServiceBase {

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.initialize
     * @description SuperMap.SingleObjectQueryJobsService 的构造函数
     * @param url -{String} 大数据单对象空间查询分析服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/query";
    }

    /**
     *@inheritDoc
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取大数据单对象空间查询分析所有
     * @return {*}
     */
    getQueryJobs() {
        return super.getJobs(this.url);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定id的单对象空间查询分析服务
     * @param id -{String} 指定要获取数据的id
     */
    getQueryJob(id) {
        return super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建大数据单对象空间查询分析服务
     * @param params - {SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addQueryJob(params, seconds) {
        return super.addJob(this.url, params, SingleObjectQueryJobsParameter, seconds);
    }

    CLASS_NAME = "SuperMap.SingleObjectQueryJobsService"
}

SuperMap.SingleObjectQueryJobsService = SingleObjectQueryJobsService;