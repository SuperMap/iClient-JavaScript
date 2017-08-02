var SuperMap = require('../SuperMap');
var ProcessingServiceBase = require('./ProcessingServiceBase');
var VectorClipJobsParameter = require('./VectorClipJobsParameter');
/**
 * @class SuperMap.VectorClipJobsService
 * @description 大数据矢量裁剪分析服务类
 * @augments SuperMap.ProcessingServiceBase
 * @param url -{String} 大数据矢量裁剪分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.VectorClipJobsService = SuperMap.Class(ProcessingServiceBase, {

    /**
     * @function SuperMap.VectorClipJobsService.protitype.initialize
     * @description SuperMap.VectorClipJobsService 的构造函数
     * @param url -{String} 大数据矢量裁剪分析服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function (url, options) {
        ProcessingServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/vectorclip";
    },

    /**
     *@inheritDoc
     */
    destroy: function () {
        ProcessingServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取大数据矢量裁剪分析所有
     * @return {*}
     */
    getVectorClipJobs: function () {
        return ProcessingServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定id的矢量裁剪分析服务
     * @param id -{String} 指定要获取数据的id
     */
    getVectorClipJob: function (id) {
        return ProcessingServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建大数据矢量裁剪分析服务
     * @param params - {SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addVectorClipJob: function (params, seconds) {
        return ProcessingServiceBase.prototype.addJob.apply(this, [this.url, params, VectorClipJobsParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.VectorClipJobsService"
});

module.exports = SuperMap.VectorClipJobsService;