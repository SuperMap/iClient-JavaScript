var SuperMap = require('../SuperMap');
var ProcessingServiceBase = require('./ProcessingServiceBase');
var SingleObjectQueryJobsParameter = require('./SingleObjectQueryJobsParameter');
/**
 * @class SuperMap.SingleObjectQueryJobsService
 * @description 大数据单对象查询分析服务类
 * @augments SuperMap.ProcessingServiceBase
 * @param url -{String} 大数据单对象空间查询分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.SingleObjectQueryJobsService = SuperMap.Class(ProcessingServiceBase, {

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.initialize
     * @description SuperMap.SingleObjectQueryJobsService 的构造函数
     * @param url -{String} 大数据单对象空间查询分析服务地址。
     * @param options - {Object} 交互服务时所需可选参数。
     */
    initialize: function (url, options) {
        ProcessingServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/query";
    },

    /**
     *@inheritDoc
     */
    destroy: function () {
        ProcessingServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取大数据单对象空间查询分析所有
     * @return {*}
     */
    getQueryJobs: function () {
        return ProcessingServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定id的单对象空间查询分析服务
     * @param id -{String} 指定要获取数据的id
     */
    getQueryJob: function (id) {
        return ProcessingServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建大数据单对象空间查询分析服务
     * @param params - {SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addQueryJob: function (params, seconds) {
        return ProcessingServiceBase.prototype.addJob.apply(this, [this.url, params, SingleObjectQueryJobsParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SingleObjectQueryJobsService"
});

module.exports = SuperMap.SingleObjectQueryJobsService;