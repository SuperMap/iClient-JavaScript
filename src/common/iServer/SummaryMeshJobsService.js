var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var SummaryMeshJobParameter = require('./SummaryMeshJobParameter');

/**
 * @class SuperMap.SummaryMeshJobsService
 * @description 格网聚合分析大数据任务类。
 * @param url -{String} 格网聚合分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.SummaryMeshJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    initialize: function (url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/aggregatepoints";
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJobs
     * @description 获取格网聚合分析大数据
     */
    getSummaryMeshJobs: function () {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJob
     * @description 获取指定ip的格网聚合分析大数据
     * @param id -{String} 指定要获取数据的id
     */
    getSummaryMeshJob: function (id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.addSummaryMeshJob
     * @description 新建格网聚合分析大数据服务
     * @param params - {SuperMap.SummaryMeshJobParameter} 创建一个空间分析作业的请求参数。
     * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addSummaryMeshJob: function (params, seconds) {
        ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryMeshJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SummaryMeshJobsService"
});

module.exports = SuperMap.SummaryMeshJobsService;