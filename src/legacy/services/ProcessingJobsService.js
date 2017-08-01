var SuperMap = require('../SuperMap');
var ServiceBase = require('../../common/iServer/ServiceBase');
var KernelDensityJobsService = require('../../common/iServer/KernelDensityJobsService');
var SingleObjectQueryJobsService = require('../../common/iServer/SingleObjectQueryJobsService');
var BuildCacheJobsService = require('../../common/iServer/BuildCacheJobsService');
var SummaryMeshJobsService = require('../../common/iServer/SummaryMeshJobsService');

SuperMap.REST.ProcessingJobsService = SuperMap.Class(ServiceBase, {

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
        this.kernelDensityJobs = {};
        this.buildCacheJobs = {};
        this.summaryMeshJobs = {};
        this.queryJobs={};
    },

    /**
     * 获取密度分析作业的列表。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getKernelDensityJobs: function (callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        kernelDensityJobsService.getKernelDensityJobs();
        return me;
    },

    /**
     * 获取某一个密度分析作业。
     * @param id 空间分析作业的id。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getKernelDensityJob: function (id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        kernelDensityJobsService.getKernelDensityJob(id);
        return me;
    },

    addKernelDensityJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.kernelDensityJobs[job.id] = job.state;
                }
            },
            format: format
        });
        kernelDensityJobsService.addKernelDensityJob(param, seconds);
        return me;
    },

    /**
     * 获取密度分析作业的状态。
     * @param id 密度分析作业的id。
     */
    getKernelDensityJobState: function (id) {
        return this.kernelDensityJobs[id];
    },

    /**
     * 获取格网聚合分析作业的列表。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getSummaryMeshJobs: function (callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryMeshJobsService.getSummaryMeshJobs();
        return me;
    },

    /**
     * 获取某一个格网聚合分析作业。
     * @param id 空间分析作业的id。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getSummaryMeshJob: function (id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryMeshJobsService.getSummaryMeshJob(id);
        return me;
    },

    /**
     * 新建一个格网聚合分析作业。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    addSummaryMeshJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.summaryMeshJobs[job.id] = job.state;
                }
            },
            format: format
        });
        summaryMeshJobsService.addSummaryMeshJob(param, seconds);
        return me;
    },

    /**
     * 获取格网聚合分析作业的状态。
     * @param id 格网聚合分析作业的id。
     */
    getSummaryMeshJobState: function (id) {
        return this.summaryMeshJobs[id];
    },

    /**
     * 获取生成地图缓存作业的列表。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getBuildCacheJobs: function (callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        buildCacheJobsService.getBuildCacheJobs();
        return me;
    },

    /**
     * 获取某一个生成地图缓存作业。
     * @param id 空间分析作业的id。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getBuildCacheJob: function (id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        buildCacheJobsService.getBuildCacheJob(id);
        return me;
    },

    /**
     * 新建一个生成地图缓存作业。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    addBuildCacheJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.buildCacheJobs[job.id] = job.state;
                }
            },
            format: format
        });
        buildCacheJobsService.addBuildCacheJob(param, seconds);
        return me;
    },

    /**
     * 获取生成地图缓存作业的状态。
     * @param id 生成地图缓存作业的id。
     */
    getBuildCacheJobState: function (id) {
        return this.buildCacheJobs[id];
    },

    /**
     * 获取单对象查询分析作业的列表。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getQueryJobs: function (callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        singleObjectQueryJobsService.getQueryJobs();
        return me;
    },

    /**
     * 获取某一个单对象查询分析作业。
     * @param id 空间分析作业的id。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    getQueryJob: function (id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        singleObjectQueryJobsService.getQueryJob(id);
        return me;
    },

    addQueryJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.queryJobs[job.id] = job.state;
                }
            },
            format: format
        });
        singleObjectQueryJobsService.addQueryJob(param, seconds);
        return me;
    },

    /**
     * 获取单对象查询分析作业的状态。
     * @param id 单对象查询分析作业的id。
     */
    getQueryJobState: function (id) {
        return this.queryJobs[id];
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        if (params.query) {
            params.query = params.query.toString();
        }
        if (params.bounds) {
            params.bounds = params.bounds.toString();
        }
        return params;
    }

});

module.exports = SuperMap.REST.ProcessingJobsService;
