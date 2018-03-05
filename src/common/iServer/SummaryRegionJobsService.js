import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {SummaryRegionJobParameter} from './SummaryRegionJobParameter';

/**
 * @class SuperMap.SummaryRegionJobsService
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 区域汇总分析服务地址。
 * @param options - {Object} 区域汇总分析服务可选参数。
 */
export class SummaryRegionJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/summaryregion";
        this.CLASS_NAME = "SuperMap.SummaryRegionJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析任务集合。
     */
    getSummaryRegionJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定id的区域汇总分析任务。
     * @param id -{string} 要获取区域汇总分析任务的id
     */
    getSummaryRegionJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总任务。
     * @param params - {SuperMap.SummaryRegionJobParameter} 创建一个区域汇总任务的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryRegionJob(params, seconds) {
        super.addJob(this.url, params, SummaryRegionJobParameter, seconds);
    }

}

SuperMap.SummaryRegionJobsService = SummaryRegionJobsService;