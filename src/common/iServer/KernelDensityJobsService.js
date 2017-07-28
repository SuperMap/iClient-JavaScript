var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var KernelDensityJobParameter = require('./KernelDensityJobParameter');
/**
 * @class SuperMap.KernelDensityJobsService
 * @description 核密度大数据服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 核密度大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.KernelDensityJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.initialize
     * @description SuperMap.KernelDensityJobsService 的构造函数
     * @param url -{String} 核密度大数据服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function (url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/density";
    },

    /**
     *@inheritDoc
     */
    destroy: function () {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getKernelDensityJobs
     * @description 获取核密度大数据
     * @return {*}
     */
    getKernelDensityJobs: function () {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getKernelDensityJobs
     * @description 获取指定id的核密度大数据服务
     * @param id -{String} 指定要获取数据的id
     */
    getKernelDensityJob: function (id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.addKernelDensityJob
     * @description 新建核密度大数据服务
     * @param params - {SuperMap.KernelDensityJobParameter} 创建一个空间分析作业的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addKernelDensityJob: function (params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, KernelDensityJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.KernelDensityJobsService"
});

module.exports = SuperMap.KernelDensityJobsService;