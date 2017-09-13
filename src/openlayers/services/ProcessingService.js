import ol from 'openlayers/dist/ol-debug';
import SuperMap from '../../common/SuperMap';
import Util from '../core/Util';
import ServiceBase from './ServiceBase';
import KernelDensityJobsService from '../../common/iServer/KernelDensityJobsService';
import SingleObjectQueryJobsService from '../../common/iServer/SingleObjectQueryJobsService';
import SummaryMeshJobsService from '../../common/iServer/SummaryMeshJobsService';
import SummaryRegionJobsService from '../../common/iServer/SummaryRegionJobsService';
import VectorClipJobsService from '../../common/iServer/VectorClipJobsService';

/**
 * @class ol.supermap.ProcessingService
 * @classdesc 分布式分析相关服务类。
 * @extends ol.supermap.ServiceBase
 * @example
 *      new ol.supermap.ProcessingService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param url -{string} 分布式分析服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
export default class ProcessingService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this.kernelDensityJobs = {};
        this.summaryMeshJobs = {};
        this.queryJobs = {};
        this.summaryRegionJobs = {};
        this.vectorClipJobs = {};
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param callback -{function}请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getKernelDensityJobs(callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getKernelDensityJob
     * @description 获取某一个密度分析。
     * @param id -{string} 空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getKernelDensityJob(id, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addKernelDensityJob
     * @description 新建一个密度分析。
     * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    addKernelDensityJob(params, callback, seconds, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param id - {string}密度分析的id。
     */
    getKernelDensityJobState(id) {
        return this.kernelDensityJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param callback - {function}请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getSummaryMeshJobs(callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJob
     * @description 获取某一个点聚合分析。
     * @param id - {string} 空间分析的id。
     * @param callback - -{function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getSummaryMeshJob(id, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addSummaryMeshJob
     * @description 新建一个点聚合分析。
     * @param params - {SuperMap.SummaryMeshJobParameter} 点聚合分析任务参数类。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    addSummaryMeshJob(params, callback, seconds, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param id - {string} 点聚合分析的id。
     */
    getSummaryMeshJobState(id) {
        return this.summaryMeshJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getQueryJobs
     * @description 获取单对象查询分析的列表。
     * @param callback -{function}请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getQueryJobs(callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getQueryJob
     * @description 获取某一个单对象查询分析。
     * @param id -{string} 空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getQueryJob(id, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addQueryJob
     * @description 新建一个单对象查询分析。
     * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    addQueryJob(params, callback, seconds, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getQueryJobState
     * @description 获取单对象查询分析的状态。
     * @param id - {string}单对象查询分析的id。
     */
    getQueryJobState(id) {
        return this.queryJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param callback -{function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getSummaryRegionJobs(callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJob
     * @description 获取某一个区域汇总分析。
     * @param id -{string}区域汇总分析的id。
     * @param callback - {function}请求结果的回调函数。
     * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getSummaryRegionJob(id, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addSummaryRegionJob
     * @description 新建一个区域汇总分析。
     * @param params - {SuperMap.SummaryRegionJobParameter} 区域汇总分析参数类
     * @param callback - {function} 请求结果的回调函数
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔
     * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）
     * @return {ol.supermap.ProcessingService}
     */
    addSummaryRegionJob(params, callback, seconds, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param id - {string}生成区域汇总分析的id。
     */
    getSummaryRegionJobState(id) {
        return this.summaryRegionJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getVectorClipJobs(callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getVectorClipJob
     * @description 获取某一个矢量裁剪分析。
     * @param id - {string}空间分析的id。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    getVectorClipJob(id, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addVectorClipJob
     * @description 新建一个矢量裁剪分析。
     * @param params -{SuperMap.VectorClipJobsParameter} 创建一个空间分析的请求参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param seconds - {number}开始创建后，获取创建成功结果的时间间隔。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {ol.supermap.ProcessingService}
     */
    addVectorClipJob(params, callback, seconds, resultFormat) {
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param id - {number} 矢量裁剪分析的id。
     */
    getVectorClipJobState(id) {
        return this.vectorClipJobs[id];
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.query) {
            params.query = Util.toSuperMapBounds(params.query);
        }
        return params;
    }
}

ol.supermap.ProcessingService = ProcessingService;
