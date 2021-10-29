/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { DataFormat } from '@supermap/iclient-common/REST';
import { KernelDensityJobsService } from '@supermap/iclient-common/iServer/KernelDensityJobsService';
import { SingleObjectQueryJobsService } from '@supermap/iclient-common/iServer/SingleObjectQueryJobsService';
import { SummaryMeshJobsService } from '@supermap/iclient-common/iServer/SummaryMeshJobsService';
import { VectorClipJobsService } from '@supermap/iclient-common/iServer/VectorClipJobsService';
import { OverlayGeoJobsService } from '@supermap/iclient-common/iServer/OverlayGeoJobsService';
import { SummaryRegionJobsService } from '@supermap/iclient-common/iServer/SummaryRegionJobsService';
import { BuffersAnalystJobsService } from '@supermap/iclient-common/iServer/BuffersAnalystJobsService';
import { TopologyValidatorJobsService } from '@supermap/iclient-common/iServer/TopologyValidatorJobsService';
import { SummaryAttributesJobsService } from '@supermap/iclient-common/iServer/SummaryAttributesJobsService';

/**
 * @class ProcessingService
 * @category  iServer ProcessingService
 * @classdesc 分布式分析相关服务类。
 * @extends {ServiceBase}
 * @example
 * new ProcessingService(url,options)
 *  .getKernelDensityJobs(function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。 
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
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
     * @function ProcessingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getKernelDensityJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.getKernelDensityJob
     * @description 获取某个密度分析。
     * @param {string} id - 空间分析的id。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getKernelDensityJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.addKernelDensityJob
     * @description 密度分析。
     * @param {KernelDensityJobParameter} params -密度分析参数类。 
     * @param {RequestCallback} callback 回调函数。 
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addKernelDensityJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析的id。
     * @returns {Object} 密度分析的状态。
     */
    getKernelDensityJobState(id) {
        return this.kernelDensityJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getSummaryMeshJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.getSummaryMeshJob
     * @description 获取某个点聚合分析。
     * @param {string} id - 空间分析的 id。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getSummaryMeshJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.addSummaryMeshJob
     * @description 点聚合分析。
     * @param {SummaryMeshJobParameter} params - 点聚合分析任务参数类。 
     * @param {RequestCallback} callback 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addSummaryMeshJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 ID。
     * @returns {Object} 点聚合分析的状态。
     */
    getSummaryMeshJobState(id) {
        return this.summaryMeshJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getQueryJobs
     * @description 获取单对象查询分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getQueryJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getQueryJob
     * @description 获取某个单对象查询分析。
     * @param {string} id - 空间分析的 id。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getQueryJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.addQueryJob
     * @description 单对象查询分析。
     * @param {SingleObjectQueryJobsParameter} params - 单对象查询分析的请求参数。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addQueryJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getQueryJobState
     * @description 获取单对象查询分析的状态。
     * @param {string} id - 单对象查询分析的 ID。
     * @returns {Object} 单对象查询分析的状态。
     */
    getQueryJobState(id) {
        return this.queryJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getSummaryRegionJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.getSummaryRegionJob
     * @description 获取某个区域汇总分析。
     * @param {string} id - 区域汇总分析的 id。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getSummaryRegionJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.addSummaryRegionJob
     * @description 区域汇总分析。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addSummaryRegionJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 生成区域汇总分析的 id。
     * @returns {Object} 区域汇总分析的状态。
     */
    getSummaryRegionJobState(id) {
        return this.summaryRegionJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getVectorClipJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
     * @function ProcessingService.prototype.getVectorClipJob
     * @description 获取某个矢量裁剪分析。
     * @param {string} id - 空间分析的 id。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getVectorClipJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.addVectorClipJob
     * @description 矢量裁剪分析。
     * @param {VectorClipJobsParameter} params - 矢量裁剪分析请求参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addVectorClipJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var vectorClipJobsService = new VectorClipJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {number} id - 矢量裁剪分析的id。
     * @returns {Object} 矢量裁剪分析的状态。
     */
    getVectorClipJobState(id) {
        return this.vectorClipJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getOverlayGeoJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getOverlayGeoJob
     * @description 获取某个叠加分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getOverlayGeoJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.addOverlayGeoJob
     * @description 叠加分析。
     * @param {OverlayGeoJobParameter} params - 叠加分析请求参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addOverlayGeoJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的id。
     * @returns {Object} 叠加分析的状态
     */
    getoverlayGeoJobState(id) {
        return this.overlayGeoJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getBuffersJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getBuffersJob
     * @description 获取某个缓冲区分析。
     * @param {string} id - 空间分析的 ID。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getBuffersJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.addBuffersJob
     * @description 缓冲区分析。
     * @param {BuffersAnalystJobsParameter} params - 缓冲区分析请求参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} seconds - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addBuffersJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 ID。
     * @returns {Object} 缓冲区分析的状态。
     */
    getBuffersJobState(id) {
        return this.buffersJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getTopologyValidatorJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getTopologyValidatorJob
     * @description 获取某个拓扑检查分析。
     * @param {string} id - 空间分析的 ID。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getTopologyValidatorJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.addTopologyValidatorJob
     * @description 拓扑检查分析。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析请求参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addTopologyValidatorJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 ID。
     * @returns {Object} 拓扑检查分析的状态。
     */
    getTopologyValidatorJobState(id) {
        return this.topologyValidatorJobs[id];
    }

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJobs
     * @description 获取属性汇总分析的列表。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getSummaryAttributesJobs(callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getSummaryAttributesJob
     * @description 获取某个属性汇总分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getSummaryAttributesJob(id, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.addSummaryAttributesJob
     * @description 属性汇总分析。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析参数类。 
     * @param {RequestCallback} callback - 回调函数。
     * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
     * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    addSummaryAttributesJob(params, callback, seconds, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,

            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function ProcessingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 ID。 
     * @returns {Object} 属性汇总分析的状态
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
        //这里只允许传端的bounds
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
