/*
 * Class:ProcessingJobsService
 * 大数据处理相关服务类
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
/**
 * @class ol.supermap.ProcessingJobsService
 * @description 分大数据处理相关服务类。
 * @augments ol.supermap.ServiceBase
 * @example
 * 用法：
 *      new ol.supermap.ProcessingJobsService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param url -{String} 大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
ol.supermap.ProcessingJobsService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.kernelDensityJobs = {};
    this.buildCacheJobs = {};
    this.summaryMeshJobs = {};
};
ol.inherits(ol.supermap.ProcessingJobsService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.ProcessingJobsService.prototype.getKernelDensityJobs
 * @description 获取密度分析作业的列表。
 * @param callback -{function}请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
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
 * @function ol.supermap.ProcessingJobsService.prototype.getKernelDensityJob
 * @description 获取某一个密度分析作业。
 * @param id -{String} 空间分析作业的id。
 * @param callback - {function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
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
 * @function ol.supermap.ProcessingJobsService.prototype.addKernelDensityJob
 * @function 新建一个密度分析作业。
 * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析作业的请求参数。
 * @param callback - {function} 请求结果的回调函数。
 * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
 * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
 */
ol.supermap.ProcessingJobsService.prototype.addKernelDensityJob = function (params, callback, seconds, resultFormat) {
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
};

/**
 * @function ol.supermap.ProcessingJobsService.prototype.getKernelDensityJobState
 * @description 获取密度分析作业的状态。
 * @param id - {String}密度分析作业的id。
 */
ol.supermap.ProcessingJobsService.prototype.getKernelDensityJobState = function (id) {
    return this.kernelDensityJobs[id];
};

/**
 * @function ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJobs
 * @description 获取格网聚合分析作业的列表。
 * @param callback - {function}请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
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
 * @function ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJob
 * @description 获取某一个格网聚合分析作业。
 * @param id - {String} 空间分析作业的id。
 * @param callback - -{function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
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
 * @function ol.supermap.ProcessingJobsService.prototype.addSummaryMeshJob
 * @description 新建一个格网聚合分析作业。
 * @param params - {SummaryMeshJobParameter} 格网聚合分析任务参数类。
 * @param callback - {function} 请求结果的回调函数。
 * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
 */
ol.supermap.ProcessingJobsService.prototype.addSummaryMeshJob = function (params, callback, seconds, resultFormat) {
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
};

/**
 * @function ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJobState
 * @description 获取格网聚合分析作业的状态。
 * @param id - {String} 格网聚合分析作业的id。
 */
ol.supermap.ProcessingJobsService.prototype.getSummaryMeshJobState = function (id) {
    return this.summaryMeshJobs[id];
};

/**
 * @function ol.supermap.ProcessingJobsService.getBuildCacheJobs
 * @description 获取生成地图缓存作业的列表。
 * @param callback -{function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
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
 * @function ol.supermap.ProcessingJobsService.prototype.getBuildCacheJob
 * @description 获取某一个生成地图缓存作业。
 * @param id -{String}空间分析作业的id。
 * @param callback - {function}请求结果的回调函数。
 * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingJobsService}
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
 * @function ol.supermap.ProcessingJobsService.prototype.addBuildCacheJob
 * @description 新建一个生成地图缓存作业。
 * @param params - {BuildCacheJobParameter} 地图缓存作业参数类
 * @param callback - {function} 请求结果的回调函数
 * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔
 * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）
 * @return {ol.supermap.ProcessingJobsService}
 */
ol.supermap.ProcessingJobsService.prototype.addBuildCacheJob = function (params, callback, seconds, resultFormat) {
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
};

/**
 * @function ol.supermap.ProcessingJobsService.prototype.getBuildCacheJobState
 * @description 获取生成地图缓存作业的状态。
 * @param id - {String}生成地图缓存作业的id。
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
