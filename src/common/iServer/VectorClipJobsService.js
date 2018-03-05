import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {VectorClipJobsParameter} from './VectorClipJobsParameter';

/**
 * @class SuperMap.VectorClipJobsService
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 矢量裁剪分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
export class VectorClipJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/vectorclip";
        this.CLASS_NAME = "SuperMap.VectorClipJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取矢量裁剪分析所有任务
     */
    getVectorClipJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定id的矢量裁剪分析服务
     * @param id -{string} 指定要获取数据的id
     */
    getVectorClipJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建矢量裁剪分析服务
     * @param params - {SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addVectorClipJob(params, seconds) {
        super.addJob(this.url, params, VectorClipJobsParameter, seconds);
    }

}

SuperMap.VectorClipJobsService = VectorClipJobsService;