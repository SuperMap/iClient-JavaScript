/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {
    DataFormat,
    KernelDensityJobsService,
    SingleObjectQueryJobsService,
    SummaryMeshJobsService,
    SummaryRegionJobsService,
    VectorClipJobsService,
    OverlayGeoJobsService,
    BuffersAnalystJobsService,
    TopologyValidatorJobsService,
    SummaryAttributesJobsService
} from '@supermap/iclient-common';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';

/**
 * @class ol.supermap.ProcessingService
 * @category  iServer ProcessingService
 * @classdesc 分布式分析相关服务类。
 * @extends {ol.supermap.ServiceBase}
 * @example
 *      new ol.supermap.ProcessingService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param {string} url - 分布式分析服务地址。
 * @param {object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export class ProcessingService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this.kernelDensityJobs = {};
        this.summaryMeshJobs = {};
        this.queryJobs = {};
        this.summaryRegionJobs = {};
        this.vectorClipJobs = {};
        this.overlayGeoJobs = {};
        this.buffersJobs = {};
        this.topologyValidatorJobs = {};
        this.summaryAttributesJobs = {};
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getKernelDensityJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        kernelDensityJobsService.getKernelDensityJobs();
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getKernelDensityJob
     * @description 获取某一个密度分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getKernelDensityJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        kernelDensityJobsService.getKernelDensityJob(id);
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addKernelDensityJob
     * @description 新建一个密度分析。
     * @param {SuperMap.KernelDensityJobParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addKernelDensityJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            proxy: me.proxy,
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析的 ID。
     * @returns {Object} 密度分析的状态
     */
    getKernelDensityJobState(id) {
        return this.kernelDensityJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getSummaryMeshJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryMeshJobsService.getSummaryMeshJobs();
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJob
     * @description 获取某一个点聚合分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getSummaryMeshJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryMeshJobsService.getSummaryMeshJob(id);
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addSummaryMeshJob
     * @description 新建一个点聚合分析。
     * @param {SuperMap.SummaryMeshJobParameter} params - 点聚合分析任务参数类。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addSummaryMeshJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            proxy: me.proxy,
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 ID。
     * @returns {Object} 点聚合分析的状态
     */
    getSummaryMeshJobState(id) {
        return this.summaryMeshJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getQueryJobs
     * @description 获取单对象查询分析的列表。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getQueryJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        singleObjectQueryJobsService.getQueryJobs();
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getQueryJob
     * @description 获取某一个单对象查询分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getQueryJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        singleObjectQueryJobsService.getQueryJob(id);
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addQueryJob
     * @description 新建一个单对象查询分析。
     * @param {SuperMap.SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addQueryJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            proxy: me.proxy,
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getQueryJobState
     * @description 获取单对象查询分析的状态。
     * @param {string} id - 单对象查询分析的 ID。
     * @returns {Object} 单对象查询分析的状态
     */
    getQueryJobState(id) {
        return this.queryJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getSummaryRegionJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryRegionJobsService.getSummaryRegionJobs();
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJob
     * @description 获取某一个区域汇总分析。
     * @param {string} id - 区域汇总分析的 ID。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getSummaryRegionJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryRegionJobsService.getSummaryRegionJob(id);
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addSummaryRegionJob
     * @description 新建一个区域汇总分析。
     * @param {SuperMap.SummaryRegionJobParameter} params - 区域汇总分析参数类。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addSummaryRegionJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            proxy: me.proxy,
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 生成区域汇总分析的 ID。
     * @returns {Object} 区域汇总分析的状态。
     */
    getSummaryRegionJobState(id) {
        return this.summaryRegionJobs[id];
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getVectorClipJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        vectorClipJobsService.getVectorClipJobs();
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getVectorClipJob
     * @description 获取某一个矢量裁剪分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getVectorClipJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        vectorClipJobsService.getVectorClipJob(id);
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.addVectorClipJob
     * @description 新建一个矢量裁剪分析。
     * @param {SuperMap.VectorClipJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addVectorClipJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
    }

    /**
     * @function ol.supermap.ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {number} id - 矢量裁剪分析的 ID。
     * @returns {Object} 矢量裁剪分析的状态
     */
    getVectorClipJobState(id) {
        return this.vectorClipJobs[id];
    }

    /**
     * @function ol.supermap.processingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getOverlayGeoJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        overlayGeoJobsService.getOverlayGeoJobs();
    }

    /**
     * @function ol.supermap.processingService.prototype.getOverlayGeoJob
     * @description 获取某一个叠加分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getOverlayGeoJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        overlayGeoJobsService.getOverlayGeoJob(id);
    }

    /**
     * @function ol.supermap.processingService.prototype.addOverlayGeoJob
     * @description 新建一个叠加分析。
     * @param {SuperMap.OverlayGeoJobParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addOverlayGeoJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.overlayGeoJobs[job.id] = job.state;
                }
            },
            format: format
        });
        overlayGeoJobsService.addOverlayGeoJob(param, seconds);
    }

    /**
     * @function ol.supermap.processingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的 ID。
     * @returns {Object} 叠加分析的状态
     */
    getoverlayGeoJobState(id) {
        return this.overlayGeoJobs[id];
    }

    /**
     * @function ol.supermap.processingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getBuffersJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        buffersAnalystJobsService.getBuffersJobs();
    }

    /**
     * @function ol.supermap.processingService.prototype.getBuffersJob
     * @description 获取某一个缓冲区分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getBuffersJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        buffersAnalystJobsService.getBuffersJob(id);
    }

    /**
     * @function ol.supermap.processingService.prototype.addBuffersJob
     * @description 新建一个缓冲区分析。
     * @param {SuperMap.BuffersAnalystJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addBuffersJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.buffersJobs[job.id] = job.state;
                }
            },
            format: format
        });
        buffersAnalystJobsService.addBuffersJob(param, seconds);
    }

    /**
     * @function ol.supermap.processingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 ID。
     * @returns {Object} 缓冲区分析的状态。
     */
    getBuffersJobState(id) {
        return this.buffersJobs[id];
    }

    /**
     * @function ol.supermap.processingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {RequestCallback} callback 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getTopologyValidatorJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        topologyValidatorJobsService.getTopologyValidatorJobs();
    }

    /**
     * @function ol.supermap.processingService.prototype.getTopologyValidatorJob
     * @description 获取某一个拓扑检查分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getTopologyValidatorJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        topologyValidatorJobsService.getTopologyValidatorJob(id);
    }

    /**
     * @function ol.supermap.processingService.prototype.addTopologyValidatorJob
     * @description 新建一个拓扑检查分析。
     * @param {SuperMap.TopologyValidatorJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addTopologyValidatorJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.topologyValidatorJobs[job.id] = job.state;
                }
            },
            format: format
        });
        topologyValidatorJobsService.addTopologyValidatorJob(param, seconds);
    }

    /**
     * @function ol.supermap.processingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 ID。
     * @returns {Object} 拓扑检查分析的状态
     */
    getTopologyValidatorJobState(id) {
        return this.topologyValidatorJobs[id];
    }

    /**
     * @function ol.supermap.processingService.prototype.getSummaryAttributesJobs
     * @description 获取拓扑检查属性汇总分析的列表。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getSummaryAttributesJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryAttributesJobsService.getSummaryAttributesJobs();
    }

    /**
     * @function ol.supermap.processingService.prototype.getSummaryAttributesJob
     * @description 获取某一个属性汇总分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    getSummaryAttributesJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        summaryAttributesJobsService.getSummaryAttributesJob(id);
    }

    /**
     * @function ol.supermap.processingService.prototype.addSummaryAttributesJob
     * @description 新建一个属性汇总分析。
     * @param {SuperMap.SummaryAttributesJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的结果类型。
     */
    addSummaryAttributesJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback,
                processRunning: function (job) {
                    me.summaryAttributesJobs[job.id] = job.state;
                }
            },
            format: format
        });
        summaryAttributesJobsService.addSummaryAttributesJob(param, seconds);
    }

    /**
     * @function ol.supermap.processingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 ID。
     * @returns {Object} 属性汇总分析的状态。
     */
    getSummaryAttributesJobState(id) {
        return this.summaryAttributesJobs[id];
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.bounds) {
            params.bounds = Util.toSuperMapBounds(params.bounds);
        }
        if (params.query) {
            params.query = Util.toSuperMapBounds(params.query);
        }
        if (params.geometryQuery) {
            params.geometryQuery = Util.toProcessingParam(params.geometryQuery);
        }
        if (params.geometryClip) {
            params.geometryClip = Util.toProcessingParam(params.geometryClip);
        }
        return params;
    }
}

ol.supermap.ProcessingService = ProcessingService;
