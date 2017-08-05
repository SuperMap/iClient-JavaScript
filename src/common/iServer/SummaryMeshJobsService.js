import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import SummaryMeshJobParameter from './SummaryMeshJobParameter';

/**
 * @class SuperMap.SummaryMeshJobsService
 * @description 点聚合分析大数据任务类。
 * @param url -{String} 点聚合分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export default  class SummaryMeshJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/aggregatepoints";
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJobs
     * @description 获取点聚合分析大数据
     */
    getSummaryMeshJobs() {
        return super.getJobs(this.url);
    }

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJob
     * @description 获取指定ip的点聚合分析大数据
     * @param id -{String} 指定要获取数据的id
     */
    getSummaryMeshJob(id) {
        return super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.addSummaryMeshJob
     * @description 新建点聚合分析大数据服务
     * @param params - {SuperMap.SummaryMeshJobParameter} 创建一个空间分析的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryMeshJob(params, seconds) {
        super.addJob(this.url, params, SummaryMeshJobParameter, seconds);
    }

    CLASS_NAME = "SuperMap.SummaryMeshJobsService"
}

SuperMap.SummaryMeshJobsService = SummaryMeshJobsService;