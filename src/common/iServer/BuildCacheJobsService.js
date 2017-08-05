import SuperMap from '../SuperMap';
import ProcessingServiceBase from './ProcessingServiceBase';
import BuildCacheJobParameter from './BuildCacheJobParameter';

/**
 * @class SuperMap.BuildCacheJobsService
 * @description 创建大数据缓存服务类
 * @augments SuperMap.ProcessingServiceBase
 * @param url -{String} 大数据缓存服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */

export default  class BuildCacheJobsService extends ProcessingServiceBase {

    /**
     * @function SuperMap.BuildCacheJobsService.constructor
     * @description SuperMap.BuildCacheJobsService 的构造函数
     * @param url -{String} 大数据缓存服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
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
     * @function SuperMap.BuildCacheJobsService.getBuildCacheJobs
     * @description 获取创建的大数据缓存
     */
    getBuildCacheJobs() {
        return super.getJobs(this.url);
    }

    /**
     * @function SuperMap.BuildCacheJobsService.getBuildCacheJob
     * @description 获取指定 id的大数据缓存
     * @param id - {String} 大数据缓存id
     */
    getBuildCacheJob(id) {
        return super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.BuildCacheJobsService.addBuildCacheJob
     * @description 新建大数据缓存服务
     * @param params - {BuildCacheJobParameter}地图缓存参数类
     * @param seconds - {String} 开始创建后，获取创建成功结果的时间间隔
     */
    addBuildCacheJob(params, seconds) {
        super.addJob(this.url, params, BuildCacheJobParameter, seconds);
    }
}

SuperMap.BuildCacheJobsService = BuildCacheJobsService;
