/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { CommontypesConversion } from '../core/CommontypesConversion';
import { ProcessingService as CommonProcessingService } from '@supermap/iclient-common/iServer/ProcessingService';

/**
 * @class ProcessingService
 * @deprecatedclassinstance L.supermap.processingService
 * @classdesc 分布式分析服务类。
 * @category  iServer ProcessingService
 * @modulecategory Services
 * @extends  ServiceBase
 * @example
 * new ProcessingService(url)
 * .getKernelDensityJobs(function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var ProcessingService = ServiceBase.extend({
    initialize: function(url, options) {
        options = options || {};
        L.setOptions(this, options);
        ServiceBase.prototype.initialize.call(this, url, options);
        this._processingService = new CommonProcessingService(url, options);
    },

    /**
     * @function ProcessingService.prototype.getKernelDensityJobs
     * @description 获取密度分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJobs: function(callback, resultFormat) {
      return this._processingService.getKernelDensityJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getKernelDensityJob
     * @description 获取指定 ID 的密度分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJob: function(id, callback, resultFormat) {
      return this._processingService.getKernelDensityJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addKernelDensityJob
     * @description 新建密度分析。
     * @param {KernelDensityJobParameter} params - 密度分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addKernelDensityJob: function(params, callback, seconds, resultFormat) {
      let processParams = this._processParams(params);
      return this._processingService.addKernelDensityJob(processParams, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getKernelDensityJobState
     * @description 获取密度分析的状态。
     * @param {string} id - 密度分析 ID。
     * @returns {Object} 密度分析的状态。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJobState: function(id) {
      return this._processingService.getKernelDensityJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getSummaryMeshJobs
     * @description 获取点聚合分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJobs: function(callback, resultFormat) {
      return this._processingService.getSummaryMeshJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getSummaryMeshJob
     * @description 获取指定 ID 的点聚合分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryMeshJob: function(id, callback, resultFormat) {
      return this._processingService.getSummaryMeshJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addSummaryMeshJob
     * @description 新建点聚合分析。
     * @param {SummaryMeshJobParameter} params - 点聚合分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addSummaryMeshJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryMeshJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getSummaryMeshJobState
     * @description 获取点聚合分析的状态。
     * @param {string} id - 点聚合分析的 ID。
     * @returns {Object} 点聚合分析的状态。
     */
    getSummaryMeshJobState: function(id) {
      return this._processingService.getSummaryMeshJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getQueryJobs
     * @description 获取单对象查询分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getQueryJobs: function(callback, resultFormat) {
      return this._processingService.getQueryJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getQueryJob
     * @description 获取指定 ID 的单对象查询分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getQueryJob: function(id, callback, resultFormat) {
      return this._processingService.getQueryJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addQueryJob
     * @description 新建单对象查询分析。
     * @param {SingleObjectQueryJobsParameter} params - 单对象空间查询分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addQueryJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addQueryJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getQueryJobState
     * @description 获取单对象查询分析的状态。
     * @param {string} id - 单对象查询分析的 ID。
     * @returns {Object} 单对象查询分析的状态。
     * @returns {Promise} Promise 对象。
     */
    getQueryJobState: function(id) {
      return this._processingService.getQueryJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJobs: function(callback, resultFormat) {
      return this._processingService.getSummaryRegionJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getSummaryRegionJob
     * @description 获取指定 ID 的区域汇总分析。
     * @param {string} id - 区域汇总分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJob: function(id, callback, resultFormat) {
      return this._processingService.getSummaryRegionJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addSummaryRegionJob
     * @description 新建区域汇总分析。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addSummaryRegionJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryRegionJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getSummaryRegionJobState
     * @description 获取区域汇总分析的状态。
     * @param {string} id - 区域汇总分析的 ID。
     * @returns {Object} 区域汇总分析的状态。
     */
    getSummaryRegionJobState: function(id) {
        return this._processingService.getSummaryRegionJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getVectorClipJobs
     * @description 获取矢量裁剪分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJobs: function(callback, resultFormat) {
      return this._processingService.getVectorClipJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getVectorClipJob
     * @description 获取指定 ID 的矢量裁剪分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJob: function(id, callback, resultFormat) {
      return this._processingService.getVectorClipJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addVectorClipJob
     * @description 新建矢量裁剪分析。
     * @param {VectorClipJobsParameter} params - 矢量裁剪分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addVectorClipJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addVectorClipJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getVectorClipJobState
     * @description 获取矢量裁剪分析的状态。
     * @param {string} id - 矢量裁剪分析的 ID。
     * @returns {Object} 矢量裁剪分析的状态。
     */
    getVectorClipJobState: function(id) {
      return this._processingService.getVectorClipJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJobs: function(callback, resultFormat) {
      return this._processingService.getOverlayGeoJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getOverlayGeoJob
     * @description 获取指定 ID 的叠加分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJob: function(id, callback, resultFormat) {
      return this._processingService.getOverlayGeoJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addOverlayGeoJob
     * @description 新建叠加分析。
     * @param {OverlayGeoJobParameter} params - 叠加分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addOverlayGeoJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addOverlayGeoJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getoverlayGeoJobState
     * @description 获取叠加分析的状态。
     * @param {string} id - 叠加分析的 ID。
     * @returns {Object} 叠加分析的状态。
     */
    getoverlayGeoJobState: function(id) {
        return this._processingService.getoverlayGeoJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getBuffersJobs
     * @description 获取缓冲区分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJobs: function(callback, resultFormat) {
      return this._processingService.getBuffersJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getBuffersJob
     * @description 获取指定 ID 的缓冲区分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getBuffersJob: function(id, callback, resultFormat) {
      return this._processingService.getBuffersJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addBuffersJob
     * @description 新建缓冲区分析。
     * @param {BuffersAnalystJobsParameter} params - 缓冲区分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addBuffersJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addBuffersJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getBuffersJobState
     * @description 获取缓冲区分析的状态。
     * @param {string} id - 缓冲区分析的 ID。
     * @returns {Object} 缓冲区分析的状态
     */
    getBuffersJobState: function(id) {
        return this._processingService.getBuffersJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJobs: function(callback, resultFormat) {
      return this._processingService.getTopologyValidatorJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJob
     * @description 获取指定 ID 的拓扑检查分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getTopologyValidatorJob: function(id, callback, resultFormat) {
      return this._processingService.getTopologyValidatorJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addTopologyValidatorJob
     * @description 新建拓扑检查分析。
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addTopologyValidatorJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addTopologyValidatorJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getTopologyValidatorJobState
     * @description 获取拓扑检查分析的状态。
     * @param {string} id - 拓扑检查分析的 ID。
     * @returns {Object} 拓扑检查分析的状态。
     */
    getTopologyValidatorJobState: function(id) {
        return this._processingService.getTopologyValidatorJobState(id);
    },

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJobs
     * @description 获取属性汇总分析的列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJobs: function(callback, resultFormat) {
      return this._processingService.getSummaryAttributesJobs(callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJob
     * @description 获取指定 ID 的属性汇总分析。
     * @param {string} id - 空间分析的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJob: function(id, callback, resultFormat) {
      return this._processingService.getSummaryAttributesJob(id, callback, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.addSummaryAttributesJob
     * @description 新建属性汇总分析。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析任务参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {number} [seconds=1000] - 开始创建后，获取创建成功结果的时间间隔。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    addSummaryAttributesJob: function(params, callback, seconds, resultFormat) {
      params = this._processParams(params);
      return this._processingService.addSummaryAttributesJob(params, callback, seconds, resultFormat);
    },

    /**
     * @function ProcessingService.prototype.getSummaryAttributesJobState
     * @description 获取属性汇总分析的状态。
     * @param {string} id - 属性汇总分析的 ID。
     * @returns {Object} 属性汇总分析的状态。
     */
    getSummaryAttributesJobState: function(id) {
      return this._processingService.getSummaryAttributesJobState(id);
    },

    _processParams: function(params) {
        if (!params) {
            return {};
        }
        if (params.bounds) {
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds);
        }
        if (params.query) {
            params.query = CommontypesConversion.toSuperMapBounds(params.query);
        }
        if (params.geometryQuery) {
            params.geometryQuery = CommontypesConversion.toProcessingParam(params.geometryQuery);
        }
        if (params.geometryClip) {
            params.geometryClip = CommontypesConversion.toProcessingParam(params.geometryClip);
        }
        return params;
    }
});
export var processingService = function(url, options) {
    return new ProcessingService(url, options);
};

