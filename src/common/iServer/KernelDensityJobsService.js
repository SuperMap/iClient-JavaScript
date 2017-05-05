var SuperMap = require('../SuperMap');
var ProcessingJobsServiceBase = require('./ProcessingJobsServiceBase');
var KernelDensityJobParameter = require('./KernelDensityJobParameter');

SuperMap.REST.KernelDensityJobsService = SuperMap.Class(ProcessingJobsServiceBase, {

    initialize: function (url, options) {
        url += "/spatialanalyst/density";
        ProcessingJobsServiceBase.prototype.initialize.apply(this, arguments);
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

    addKernelDensityJob: function (params) {
        return ProcessingJobsServiceBase.prototype.addJob.apply(this, [this.url, params, KernelDensityJobParameter]);
    },

    CLASS_NAME: "SuperMap.REST.KernelDensityJobsService"
});

module.exports = SuperMap.REST.KernelDensityJobsService;