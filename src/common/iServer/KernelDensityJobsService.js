var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var KernelDensityJobParameter = require('./KernelDensityJobParameter');

SuperMap.KernelDensityJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    initialize: function (url, options) {
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
        this.url += "/spatialanalyst/density";
    },

    destroy: function () {
        ProcessingJobsServiceBase.prototype.destroy.apply(this, arguments);
    },

    getKernelDensityJobs: function () {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url]);
    },

    getKernelDensityJob: function (id) {
        return ProcessingJobsServiceBase.prototype.getJobs.apply(this, [this.url + '/' + id]);
    },

    addKernelDensityJob: function (params, seconds) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, KernelDensityJobParameter, seconds]);
    },

    CLASS_NAME: "SuperMap.KernelDensityJobsService"
});

module.exports = SuperMap.KernelDensityJobsService;