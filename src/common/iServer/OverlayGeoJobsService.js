import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {OverlayGeoJobParameter} from './OverlayGeoJobParameter';

/**
 * @class SuperMap.OverlayGeoJobsService
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务类。
 * @param {string} url - 叠加分析任务地址。
 * @param {Object} options - 参数。<br>
 * @param {SuperMap.Events} options.events - 处理所有事件的对象。<br>
 * @param {Object} options.eventListeners - 听器对象。<br>
 * @param {SuperMap.ServerType} options.serverType - 服务器类型，iServer|iPortal|Online。<br>
 * @param {number} options.index - 服务访问地址在数组中的位置。<br>
 * @param {number} options.length - 服务访问地址数组长度。
 */
export class OverlayGeoJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/overlay";
        this.CLASS_NAME = "SuperMap.OverlayGeoJobsService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析任务
     */
    getOverlayGeoJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.getOverlayGeoJob
     * @description 获取指定id的叠加分析任务
     * @param {string} id - 指定要获取数据的id
     */
    getOverlayGeoJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.addOverlayGeoJob
     * @description 新建点叠加析服务
     * @param {SuperMap.OverlayGeoJobParameter} params - 创建一个叠加分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addOverlayGeoJob(params, seconds) {
        super.addJob(this.url, params, OverlayGeoJobParameter, seconds);
    }

}
SuperMap.OverlayGeoJobsService = OverlayGeoJobsService;