import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import SummaryRegionJobParameter from './SummaryRegionJobParameter';

/**
 * @class SuperMap.SummaryRegionJobsService
 * @description 范围汇总分析服务类
 * @augments SuperMap.ProcessingServiceBase
 * @param url -{String} 范围汇总分析服务地址。
 * @param options - {Object} 范围汇总分析服务可选参数。
 */
export default  class SummaryRegionJobsService extends ProcessingServiceBase {

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.initialize
     * @description SuperMap.SummaryRegionJobsService 的构造函数
     * @param url -{String} 范围汇总分析服务地址。
     * @param options - {Object} 范围汇总分析服务可选参数。
     */
    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/summaryregion";
    }

    /**
     *@inheritDoc
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.getSummaryRegionJobs
     * @description 获取范围汇总分析任务集合。
     * @return {*}
     */
    getSummaryRegionJobs() {
        return super.getJobs(this.url);
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.getSummaryRegionJob
     * @description 获取指定id的范围汇总分析任务。
     * @param id -{String} 要获取范围汇总分析任务的id
     */
    getSummaryRegionJob(id) {
        return super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.addSummaryRegionJob
     * @description 新建范围汇总任务。
     * @param params - {SuperMap.SummaryRegionJobParameter} 创建一个范围汇总任务的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryRegionJob(params, seconds) {
        return super.addJob(this.url, params, SummaryRegionJobParameter, seconds);
    }

    CLASS_NAME = "SuperMap.SummaryRegionJobsService"
}

SuperMap.SummaryRegionJobsService = SummaryRegionJobsService;