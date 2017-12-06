import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {TopologyValidatorJobsParameter} from './TopologyValidatorJobsParameter';

/**
 * @class SuperMap.TopologyValidatorJobsService
 * @classdesc 拓扑检查分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 拓扑检查分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export class TopologyValidatorJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/topologyvalidator";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.TopologyValidatorJobsService.protitype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析所有任务
     */
    getTopologyValidatorJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.TopologyValidatorJobsService.protitype.getTopologyValidatorJob
     * @description 获取指定id的拓扑检查分析服务
     * @param id -{string} 指定要获取数据的id
     */
    getTopologyValidatorJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.TopologyValidatorJobsService.protitype.addTopologyValidatorJob
     * @description 新建拓扑检查分析服务
     * @param params - {SuperMap.TopologyValidatorJobsParameter} 创建一个空间分析的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addTopologyValidatorJob(params, seconds) {
        super.addJob(this.url, params, TopologyValidatorJobsParameter, seconds);
    }

    CLASS_NAME = "SuperMap.TopologyValidatorJobsService"
}

SuperMap.TopologyValidatorJobsService = TopologyValidatorJobsService;