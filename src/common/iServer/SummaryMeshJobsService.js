import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {SummaryMeshJobParameter} from './SummaryMeshJobParameter';

/**
 * @class SuperMap.SummaryMeshJobsService
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务类。
 * @param url -{string} 点聚合分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        events - {SuperMap.Events} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        index - {number}服务访问地址在数组中的位置。<br>
 *        length - {number}服务访问地址数组长度。
 */
export class SummaryMeshJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/aggregatepoints";
        this.CLASS_NAME = "SuperMap.SummaryMeshJobsService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析任务
     */
    getSummaryMeshJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.SummaryMeshJobsService.prototype.getSummaryMeshJob
     * @description 获取指定ip的点聚合分析任务
     * @param id -{string} 指定要获取数据的id
     */
    getSummaryMeshJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.SummaryMeshJobsService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析服务
     * @param params - {SuperMap.SummaryMeshJobParameter} 创建一个空间分析的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryMeshJob(params, seconds) {
        super.addJob(this.url, params, SummaryMeshJobParameter, seconds);
    }

}

SuperMap.SummaryMeshJobsService = SummaryMeshJobsService;