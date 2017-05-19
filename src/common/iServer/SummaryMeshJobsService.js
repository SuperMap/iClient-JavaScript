var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var SummaryMeshJobParameter = require('./SummaryMeshJobParameter');

SuperMap.REST.SummaryMeshJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    initialize: function (url, options) {
        url += "/spatialanalyst/aggregatePoints";
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

    addSummaryMeshJob: function (params) {
        ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, SummaryMeshJobParameter]);
    },

    CLASS_NAME: "SuperMap.REST.SummaryMeshJobsService"
});

module.exports = SuperMap.REST.SummaryMeshJobsService;