var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var SummaryMeshJobParameter = require('./SummaryMeshJobParameter');

SuperMap.SummaryMeshJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    initialize: function (url, options) {
        url += "/spatialanalyst/aggregatepoints";
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
    },

    destroy: function () {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    getSummaryMeshJobs: function () {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    getSummaryMeshJob: function (id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    addSummaryMeshJob: function (params, seconds) {
        ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryMeshJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.SummaryMeshJobsService"
});

module.exports = SuperMap.SummaryMeshJobsService;