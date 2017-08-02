var SuperMap = require('../SuperMap');
var ProcessingServiceBase = require('./ProcessingServiceBase');
var SummaryMeshJobParameter = require('./SummaryMeshJobParameter');

/**
 * @class SuperMap.SummaryMeshJobsService
 * @description 点聚合分析大数据任务类。
 * @param url -{String} 点聚合分析任务地址。
 * @param options - {Object} 交互服务时所需可选参数。
 */
SuperMap.SummaryMeshJobsService = SuperMap.Class(ProcessingServiceBase, {

    initialize: function (url, options) {
        ProcessingServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/aggregatepoints";
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        ProcessingServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJobs
     * @description 获取点聚合分析大数据
     */
    getSummaryMeshJobs: function () {
        return ProcessingServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.getSummaryMeshJob
     * @description 获取指定ip的点聚合分析大数据
     * @param id -{String} 指定要获取数据的id
     */
    getSummaryMeshJob: function (id) {
        return ProcessingServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    /**
     * @function SuperMap.SummaryMeshJobsService.protitype.addSummaryMeshJob
     * @description 新建点聚合分析大数据服务
     * @param params - {SuperMap.SummaryMeshJobParameter} 创建一个空间分析的请求参数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryMeshJob: function (params, seconds) {
        ProcessingServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryMeshJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SummaryMeshJobsService"
});

module.exports = SuperMap.SummaryMeshJobsService;