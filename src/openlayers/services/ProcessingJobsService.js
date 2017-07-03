/**
 * Class:ChartService
 * 分布式空间处理作业服务
 * 用法：
 *      new ol.superMap.ProcessingJobsService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 */
var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
var KernelDensityJobsService = require('../../common/iServer/KernelDensityJobsService');
var BuildCacheJobsService = require('../../common/iServer/BuildCacheJobsService');
var SummaryMeshJobsService = require('../../common/iServer/SummaryMeshJobsService');

ol.supermap.ProcessingJobsService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.kernelDensityJobs = {};
    this.buildCacheJobs = {};
    this.summaryMeshJobs = {};
};
ol.inherits(ol.supermap.ProcessingJobsService, ol.supermap.ServiceBase);

/**
 * 获取密度分析作业的列表。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.getKernelDensityJobs = function (callback, resultFormat) {
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
};

/**
 * 获取某一个密度分析作业。
 * @param id 空间分析作业的id。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.getKernelDensityJob = function (id, callback, resultFormat) {
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
};

/**
 * 新建一个密度分析作业。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.addKernelDensityJob = function (params, callback, resultFormat) {
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
    kernelDensityJobsService.addKernelDensityJob(param);
    return me;
};

/**
 * 获取密度分析作业的状态。
 * @param id 密度分析作业的id。
 */
ol.supermap.ProcessingJobsService.prototype.getKernelDensityJobState = function (id) {
    return this.kernelDensityJobs[id];
};

/**
 * 获取格网聚合分析作业的列表。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJobs = function (callback, resultFormat) {
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
};

/**
 * 获取某一个格网聚合分析作业。
 * @param id 空间分析作业的id。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJob = function (id, callback, resultFormat) {
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
};

/**
 * 新建一个格网聚合分析作业。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.addSummaryMeshJob = function (params, callback, resultFormat) {
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
    summaryMeshJobsService.addSummaryMeshJob(param);
    return me;
};

/**
 * 获取格网聚合分析作业的状态。
 * @param id 格网聚合分析作业的id。
 */
ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJobState = function (id) {
    return this.summaryMeshJobs[id];
};

/**
 * 获取生成地图缓存作业的列表。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.getBuildCacheJobs = function (callback, resultFormat) {
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
};

/**
 * 获取某一个生成地图缓存作业。
 * @param id 空间分析作业的id。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.getBuildCacheJob = function (id, callback, resultFormat) {
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
};

/**
 * 新建一个生成地图缓存作业。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.ProcessingJobsService.prototype.addBuildCacheJob = function (params, callback, resultFormat) {
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
    buildCacheJobsService.addBuildCacheJob(param);
    return me;
};

/**
 * 获取生成地图缓存作业的状态。
 * @param id 生成地图缓存作业的id。
 */
ol.supermap.ProcessingJobsService.prototype.getBuildCacheJobState = function (id) {
    return this.buildCacheJobs[id];
};

ol.supermap.ProcessingJobsService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

ol.supermap.ProcessingJobsService.prototype._processParams = function (params) {
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
};

module.exports = ol.supermap.ProcessingJobsService;
