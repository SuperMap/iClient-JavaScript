import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import KernelDensityJobsService from  '../../common/iServer/KernelDensityJobsService';
import SingleObjectQueryJobsService from  '../../common/iServer/SingleObjectQueryJobsService';
import BuildCacheJobsService from  '../../common/iServer/BuildCacheJobsService';
import SummaryMeshJobsService from  '../../common/iServer/SummaryMeshJobsService';
import SummaryRegionJobsService from  '../../common/iServer/SummaryRegionJobsService';
import VectorClipJobsService from  '../../common/iServer/VectorClipJobsService';
import CommontypesConversion from '../core/CommontypesConversion';
/**
 * @class L.supermap.processingService
 * @classdesc 大数据处理相关服务类
 * @extends  L.supermap.ServiceBase
 * @example
 * 用法：
 *      L.supermap.processingService(url)
 *      .getKernelDensityJobs(function(result){
 *           //doSomething
 *      })
 * @param url -{String} 大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
export var ProcessingService = ServiceBase.extend({

    /**
     * @function L.supermap.processingService.prototype.initialize
     * @description L.supermap.processingService 类的构造函数
     * @param url -{String} 大数据服务地址。
     * @param options - {Object} 交互服务时所需可选参数
     */
    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        ServiceBase.prototype.initialize.call(this, url, options);
        this.kernelDensityJobs = {};
        this.buildCacheJobs = {};
        this.summaryMeshJobs = {};
        this.queryJobs = {};
        this.summaryRegionJobs = {};
        this.vectorClipJobs = {};
    },

    /**
     * @function L.supermap.processingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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
     * @function L.supermap.processingService.prototype.getKernelDensityJob
     * @description 获取某一个密度分析。
     * @param id - {String}空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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

    /**
     * @function L.supermap.processingService.prototype.addKernelDensityJob
     * @description 新建一个密度分析。
     * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    addKernelDensityJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            serverType: me.options.serverType,
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
     * @function L.supermap.processingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param id - {String}密度分析的id。
     */
    getKernelDensityJobState: function (id) {
        return this.kernelDensityJobs[id];
    },

    /**
     * @function L.supermap.processingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param callback - {function}  请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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
     * @function L.supermap.processingService.prototype.getSummaryMeshJob
     * @description 获取某一个点聚合分析。
     * @param id - {String}空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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
     * @function L.supermap.processingService.prototype.addSummaryMeshJob
     * @description 新建一个点聚合分析。
     * @param params - {SuperMap.SummaryMeshJobParameter} 点聚合分析任务参数类。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    addSummaryMeshJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            serverType: me.options.serverType,
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
     * @function L.supermap.processingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param id - {String} 点聚合分析的id。
     */
    getSummaryMeshJobState: function (id) {
        return this.summaryMeshJobs[id];
    },

    /**
     * @function L.supermap.processingService.prototype.getBuildCacheJobs
     * @description 获取生成地图缓存的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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
     * @function L.supermap.processingService.prototype.getBuildCacheJob
     * @description 获取某一个生成地图缓存。
     * @param id - {String} 空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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
     * @function L.supermap.processingService.prototype.addBuildCacheJob
     * @description 新建一个生成地图缓存。
     * @param params - {SuperMap.BuildCacheJobParameter} 地图缓存参数类
     * @param callback - {function} 请求结果的回调函数
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔
     * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    addBuildCacheJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var buildCacheJobsService = new BuildCacheJobsService(me.url, {
            serverType: me.options.serverType,
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
     * @function L.supermap.processingService.prototype.getBuildCacheJobState
     * @description 获取生成地图缓存的状态。
     * @param id - {String}生成地图缓存的id。
     */
    getBuildCacheJobState: function (id) {
        return this.buildCacheJobs[id];
    },

    /**
     * @function L.supermap.processingService.prototype.getQueryJobs
     * @description 获取单对象查询分析的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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
     * @function L.supermap.processingService.prototype.getQueryJob
     * @description 获取某一个单对象查询分析。
     * @param id - {String}空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
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

    /**
     * @function L.supermap.processingService.prototype.addQueryJob
     * @description 新建一个单对象查询分析。
     * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    addQueryJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            serverType: me.options.serverType,
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
     * @function L.supermap.processingService.prototype.getQueryJobState
     * @description 获取单对象查询分析的状态。
     * @param id - {String}单对象查询分析的id。
     */
    getQueryJobState: function (id) {
        return this.queryJobs[id];
    },

    /**
     * @function L.supermap.processingService.prototype.getSummaryRegionJobs
     * @description 获取范围汇总分析的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    getSummaryRegionJobs: function (callback, resultFormat) {
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
    },

    /**
     * @function L.supermap.processingService.prototype.getSummaryRegionJob
     * @description 获取某一个范围汇总分析。
     * @param id - {String}范围汇总分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    getSummaryRegionJob: function (id, callback, resultFormat) {
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
    },

    /**
     * @function L.supermap.processingService.prototype.addSummaryRegionJob
     * @description 新建一个范围汇总分析。
     * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个范围汇总分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    addSummaryRegionJob: function (params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            serverType: me.options.serverType,
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
    },

    /**
     * @function L.supermap.processingService.prototype.getSummaryRegionJobState
     * @description 获取范围汇总分析的状态。
     * @param id - {String}范围汇总分析的id。
     */
    getSummaryRegionJobState: function (id) {
        return this.summaryRegionJobs[id];
    },

    /**
     * @function L.supermap.processingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    getVectorClipJobs: function (callback, resultFormat) {
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
    },

    /**
     * @function L.supermap.processingService.prototype.getVectorClipJob
     * @description 获取某一个矢量裁剪分析。
     * @param id - {String}空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    getVectorClipJob: function (id, callback, resultFormat) {
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
    },

    /**
     * @function L.supermap.processingService.prototype.addVectorClipJob
     * @description 新建一个矢量裁剪分析。
     * @param params -{SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {Number} 开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {L.supermap.processingService}
     */
    addVectorClipJob: function (params, callback, seconds, resultFormat) {
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
    },

    /**
     * @function L.supermap.processingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param id - {String}矢量裁剪分析的id。
     */
    getVectorClipJobState: function (id) {
        return this.vectorClipJobs[id];
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        if (params.query) {
            params.query = CommontypesConversion.toSuperMapBounds(params.query).toBBOX();
        }
        if (params.bounds) {
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds).toBBOX();
        }
        return params;
    },
});
export var processingService = function (url, options) {
    return new ProcessingService(url, options);
};

L.supermap.processingService = processingService;