var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
var KernelDensityJobsService = require('../../common/iServer/KernelDensityJobsService');
var SingleObjectQueryJobsService = require('../../common/iServer/SingleObjectQueryJobsService');
var BuildCacheJobsService = require('../../common/iServer/BuildCacheJobsService');
var SummaryMeshJobsService = require('../../common/iServer/SummaryMeshJobsService');
var SummaryRegionJobsService = require('../../common/iServer/SummaryRegionJobsService');
var VectorClipJobsService = require('../../common/iServer/VectorClipJobsService');
/**
 * @class ol.supermap.ProcessingService
 * @description 大数据处理相关服务类。
 * @augments ol.supermap.ServiceBase
 * @example
 * 用法：
 *      new ol.supermap.ProcessingService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param url -{String} 大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
ol.supermap.ProcessingService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.kernelDensityJobs = {};
    this.buildCacheJobs = {};
    this.summaryMeshJobs = {};
    this.queryJobs = {};
    this.summaryRegionJobs = {};
    this.vectorClipJobs = {};
};
ol.inherits(ol.supermap.ProcessingService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.ProcessingService.prototype.getKernelDensityJobs
 * @description 获取密度分析的列表。
 * @param callback -{function}请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getKernelDensityJobs = function (callback, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.getKernelDensityJob
 * @description 获取某一个密度分析。
 * @param id -{String} 空间分析的id。
 * @param callback - {function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getKernelDensityJob = function (id, callback, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.addKernelDensityJob
 * @function 新建一个密度分析。
 * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
 * @param callback - {function} 请求结果的回调函数。
 * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
 * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.addKernelDensityJob = function (params, callback, seconds, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.getKernelDensityJobState
 * @description 获取密度分析的状态。
 * @param id - {String}密度分析的id。
 */
ol.supermap.ProcessingService.prototype.getKernelDensityJobState = function (id) {
    return this.kernelDensityJobs[id];
};

/**
 * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJobs
 * @description 获取点聚合分析的列表。
 * @param callback - {function}请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getSummaryMeshJobs = function (callback, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJob
 * @description 获取某一个点聚合分析。
 * @param id - {String} 空间分析的id。
 * @param callback - -{function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getSummaryMeshJob = function (id, callback, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.addSummaryMeshJob
 * @description 新建一个点聚合分析。
 * @param params - {SuperMap.SummaryMeshJobParameter} 点聚合分析任务参数类。
 * @param callback - {function} 请求结果的回调函数。
 * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.addSummaryMeshJob = function (params, callback, seconds, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJobState
 * @description 获取点聚合分析的状态。
 * @param id - {String} 点聚合分析的id。
 */
ol.supermap.ProcessingService.prototype.getSummaryMeshJobState = function (id) {
    return this.summaryMeshJobs[id];
};

/**
 * @function ol.supermap.ProcessingService.getBuildCacheJobs
 * @description 获取生成地图缓存的列表。
 * @param callback -{function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getBuildCacheJobs = function (callback, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.getBuildCacheJob
 * @description 获取某一个生成地图缓存。
 * @param id -{String}空间分析的id。
 * @param callback - {function}请求结果的回调函数。
 * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getBuildCacheJob = function (id, callback, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.addBuildCacheJob
 * @description 新建一个生成地图缓存。
 * @param params - {SuperMap.BuildCacheJobParameter} 地图缓存参数类
 * @param callback - {function} 请求结果的回调函数
 * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔
 * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.addBuildCacheJob = function (params, callback, seconds, resultFormat) {
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
 * @function ol.supermap.ProcessingService.prototype.getBuildCacheJobState
 * @description 获取生成地图缓存的状态。
 * @param id - {String}生成地图缓存的id。
 */
ol.supermap.ProcessingService.prototype.getBuildCacheJobState = function (id) {
    return this.buildCacheJobs[id];
};

/**
 * @function ol.supermap.ProcessingService.prototype.getQueryJobs
 * @description 获取单对象查询分析的列表。
 * @param callback -{function}请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getQueryJobs = function (callback, resultFormat) {
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
};

/**
 * @function ol.supermap.ProcessingService.prototype.getQueryJob
 * @description 获取某一个单对象查询分析。
 * @param id -{String} 空间分析的id。
 * @param callback - {function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getQueryJob = function (id, callback, resultFormat) {
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
};

/**
 * @function ol.supermap.ProcessingService.prototype.addQueryJob
 * @function 新建一个单对象查询分析。
 * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
 * @param callback - {function} 请求结果的回调函数。
 * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
 * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.addQueryJob = function (params, callback, seconds, resultFormat) {
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
};

/**
 * @function ol.supermap.ProcessingService.prototype.getQueryJobState
 * @description 获取单对象查询分析的状态。
 * @param id - {String}单对象查询分析的id。
 */
ol.supermap.ProcessingService.prototype.getQueryJobState = function (id) {
    return this.queryJobs[id];
};

/**
 * @function ol.supermap.ProcessingService.getSummaryRegionJobs
 * @description 获取范围汇总分析的列表。
 * @param callback -{function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getSummaryRegionJobs = function (callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: format
    });
    summaryRegionJobsService.getSummaryRegionJobs();
    return me;
};

/**
 * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJob
 * @description 获取某一个范围汇总分析。
 * @param id -{String}范围汇总分析的id。
 * @param callback - {function}请求结果的回调函数。
 * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getSummaryRegionJob = function (id, callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: format
    });
    summaryRegionJobsService.getSummaryRegionJob(id);
    return me;
};

/**
 * @function ol.supermap.ProcessingService.prototype.addSummaryRegionJob
 * @description 新建一个范围汇总分析。
 * @param params - {SuperMap.SummaryRegionJobParameter} 范围汇总分析参数类
 * @param callback - {function} 请求结果的回调函数
 * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔
 * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.addSummaryRegionJob = function (params, callback, seconds, resultFormat) {
    var me = this,
        param = me._processParams(params),
        format = me._processFormat(resultFormat);
    var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback,
            processRunning: function (job) {
                me.summaryRegionJobs[job.id] = job.state;
            }
        },
        format: format
    });
    summaryRegionJobsService.addSummaryRegionJob(param, seconds);
    return me;
};

/**
 * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJobState
 * @description 获取范围汇总分析的状态。
 * @param id - {String}生成范围汇总分析的id。
 */
ol.supermap.ProcessingService.prototype.getSummaryRegionJobState = function (id) {
    return this.summaryRegionJobs[id];
};

/**
 * @function ol.supermap.ProcessingService.prototype.getVectorClipJobs
 * @description 获取矢量裁剪分析的列表。
 * @param callback - {function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getVectorClipJobs = function (callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var vectorClipJobsService = new VectorClipJobsService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: format
    });
    vectorClipJobsService.getVectorClipJobs();
    return me;
};

/**
 * @function ol.supermap.ProcessingService.prototype.getVectorClipJob
 * @description 获取某一个矢量裁剪分析。
 * @param id - {String}空间分析的id。
 * @param callback - {function} 请求结果的回调函数。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.getVectorClipJob = function (id, callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var vectorClipJobsService = new VectorClipJobsService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: format
    });
    vectorClipJobsService.getVectorClipJob(id);
    return me;
};

/**
 * @function ol.supermap.ProcessingService.prototype.addVectorClipJob
 * @description 新建一个矢量裁剪分析。
 * @param params -{SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
 * @param callback - {function} 请求结果的回调函数。
 * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
 * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
 * @return {ol.supermap.ProcessingService}
 */
ol.supermap.ProcessingService.prototype.addVectorClipJob = function (params, callback, seconds, resultFormat) {
    var me = this,
        param = me._processParams(params),
        format = me._processFormat(resultFormat);
    var vectorClipJobsService = new VectorClipJobsService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback,
            processRunning: function (job) {
                me.vectorClipJobs[job.id] = job.state;
            }
        },
        format: format
    });
    vectorClipJobsService.addVectorClipJob(param, seconds);
    return me;
};

/**
 * @function ol.supermap.ProcessingService.prototype.getVectorClipJobState
 * @description 获取矢量裁剪分析的状态。
 * @param id - {String}矢量裁剪分析的id。
 */
ol.supermap.ProcessingService.prototype.getVectorClipJobState = function (id) {
    return this.vectorClipJobs[id];
};

ol.supermap.ProcessingService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

ol.supermap.ProcessingService.prototype._processParams = function (params) {
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

module.exports = ol.supermap.ProcessingService;
