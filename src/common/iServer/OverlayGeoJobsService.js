import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import OverlayGeoJobParameter from './OverlayGeoJobParameter';

/**
 * @class SuperMap.OverlayGeoJobsService
 * @classdesc 叠加分析任务类。
 * @param url -{string} 叠加分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        events - {SuperMap.Events} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        index - {number}服务访问地址在数组中的位置。<br>
 *        length - {number}服务访问地址数组长度。
 */
export default class OverlayGeoJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/overlay";
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
    getOverlayGeoJobs(){
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.getOverlayGeoJob
     * @description 获取指定id的叠加分析任务
     * @param id -{string} 指定要获取数据的id
     */
    getOverlayGeoJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.OverlayGeoJobsService.prototype.addOverlayGeoJob
     * @description 新建点叠加析服务
     * @param params - {SuperMap.OverlayGeoJobParameter} 创建一个叠加分析的请求参数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     */
    addOverlayGeoJob(params, seconds) {
        super.addJob(this.url, params, OverlayGeoJobParameter, seconds);
    }

    CLASS_NAME = "SuperMap.OverlayGeoJobsService";
}
SuperMap.OverlayGeoJobsService = OverlayGeoJobsService;