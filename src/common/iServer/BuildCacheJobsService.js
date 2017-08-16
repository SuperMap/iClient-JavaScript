import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import BuildCacheJobParameter from './BuildCacheJobParameter';

/**
 * @class SuperMap.BuildCacheJobsService
 * @classdesc 创建大数据缓存服务类
 * @extends SuperMap.ProcessingServiceBase
 * @param url -{string} 大数据缓存服务地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        events - {SuperMap.Events} 处理所有事件的对象。<br>
 *        eventListeners - {Object} 听器对象。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        index - {number}服务访问地址在数组中的位置。<br>
 *        length - {number}服务访问地址数组长度。
 */
export default  class BuildCacheJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/mapping/buildCache";
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destory();
    }

    /**
     * @function SuperMap.BuildCacheJobsService.prototype.getBuildCacheJobs
     * @description 获取创建的大数据缓存
     */
    getBuildCacheJobs() {
        return super.getJobs(this.url);
    }

    /**
     * @function SuperMap.BuildCacheJobsService.prototype.getBuildCacheJob
     * @description 获取指定 id的大数据缓存
     * @param id - {string} 大数据缓存id
     */
    getBuildCacheJob(id) {
        return super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.BuildCacheJobsService.prototype.addBuildCacheJob
     * @description 新建大数据缓存服务
     * @param params - {SuperMap.BuildCacheJobParameter} 地图缓存参数类
     * @param seconds - {string} 开始创建后，获取创建成功结果的时间间隔
     */
    addBuildCacheJob(params, seconds) {
        super.addJob(this.url, params, BuildCacheJobParameter, seconds);
    }
}

SuperMap.BuildCacheJobsService = BuildCacheJobsService;
