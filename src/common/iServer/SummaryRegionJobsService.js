var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var SummaryRegionJobParameter = require('./SummaryRegionJobParameter');
/**
 * @class SuperMap.SummaryRegionJobsService
 * @description 范围汇总分析服务类
 * @augments SuperMap.ProcessingJobsServiceBase
 * @param url -{String} 范围汇总分析服务地址。
 * @param options - {Object} 范围汇总分析服务可选参数。
 */
SuperMap.SummaryRegionJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.initialize
     * @description SuperMap.SummaryRegionJobsService 的构造函数
     * @param url -{String} 范围汇总分析服务地址。
     * @param options - {Object} 范围汇总分析服务可选参数。
     */
    initialize: function (url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/summaryregion";
    },

    /**
     *@inheritDoc
     */
    destroy: function () {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.getSummaryRegionJobs
     * @description 获取范围汇总分析任务集合。
     * @return {*}
     */
    getSummaryRegionJobs: function () {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.getSummaryRegionJob
     * @description 获取指定id的范围汇总分析任务。
     * @param id -{String} 要获取范围汇总分析任务的id
     */
    getSummaryRegionJob: function (id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SummaryRegionJobsService.protitype.addSummaryRegionJob
     * @description 新建范围汇总任务。
     * @param params - {SuperMap.SummaryRegionJobParameter} 创建一个范围汇总任务的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addSummaryRegionJob: function (params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryRegionJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SummaryRegionJobsService"
});

module.exports = SuperMap.SummaryRegionJobsService;