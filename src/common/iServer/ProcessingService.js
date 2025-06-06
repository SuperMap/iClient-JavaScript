/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { DataFormat } from '../REST';
 import { KernelDensityJobsService } from './KernelDensityJobsService';
 import { SingleObjectQueryJobsService } from './SingleObjectQueryJobsService';
 import { SummaryMeshJobsService } from './SummaryMeshJobsService';
 import { VectorClipJobsService } from './VectorClipJobsService';
 import { OverlayGeoJobsService } from './OverlayGeoJobsService';
 import { SummaryRegionJobsService } from './SummaryRegionJobsService';
 import { BuffersAnalystJobsService } from './BuffersAnalystJobsService';
 import { TopologyValidatorJobsService } from './TopologyValidatorJobsService';
 import { SummaryAttributesJobsService } from './SummaryAttributesJobsService';
 
 /**
  * @class ProcessingService
  * @category  iServer ProcessingService
  * @classdesc 分布式分析相关服务类。分布式分析服务采用了分布式计算技术，可对超大体量空间数据集进行分布式空间分析和数据处理。
  * 提供方法：缓冲区分析任务、核密度分析任务、叠加分析任务、单对象空间查询任务、点聚合分析任务、区域汇总分析任务、
  * 拓扑检查分析任务、矢量裁剪分析任务等。
  * @extends {ServiceBase}
  * @example
  * new ProcessingService(url,options)
  *  .getKernelDensityJobs(function(result){
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
 export class ProcessingService {
 
     constructor(url, options) {
         this.url = url;
         this.options = options || {};
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
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getKernelDensityJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return kernelDensityJobsService.getKernelDensityJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getKernelDensityJob
      * @description 获取指定 ID 的密度分析。
      * @param {string} id - 空间分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getKernelDensityJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return kernelDensityJobsService.getKernelDensityJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addKernelDensityJob
      * @description 新建密度分析。目前提供 1 种密度分析方法：核密度分析。<br>
     * 核密度分析是指使用核函数来计算点或线邻域范围内的每单位面积量值。
     * 其结果是中间值大周边值小的光滑曲面，在邻域边界处降为 0。
     * 对于点对象，其核密度曲面与下方的平面所围成的空间的体积近似于此点的测量值；
     * 对于线对象，其核密度曲面与下方的平面所围成的空间的体积近似于此线的测量值与线长度的乘积。
     * 点或线的邻域叠加处，其密度值也相加。每个输出栅格的密度均为叠加在栅格上的所有核曲面值之和。 
      * @param {KernelDensityJobParameter} params -密度分析参数类。 
      * @param {RequestCallback} callback 回调函数。 
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addKernelDensityJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return kernelDensityJobsService.addKernelDensityJob(params, seconds, callback, function (job) {
          me.kernelDensityJobs[job.id] = job.state;
        });
     }
 
     /**
      * @function ProcessingService.prototype.getKernelDensityJobState
      * @description 获取密度分析的状态。
      * @param {string} id - 密度分析的 ID。
      * @returns {Object} 密度分析的状态。
      */
     getKernelDensityJobState(id) {
         return this.kernelDensityJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryMeshJobs
      * @description 获取点聚合分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryMeshJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryMeshJobsService.getSummaryMeshJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryMeshJob
      * @description 获取指定 ID 的点聚合分析。
      * @param {string} id - 空间分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryMeshJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryMeshJobsService.getSummaryMeshJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addSummaryMeshJob
      * @description 新建点聚合分析。<br>
     * 点聚合分析是指针对点数据集制作聚合图的一种空间分析作业。通过网格面或多边形对地图点要素进行划分，
     * 然后，计算每个面对象内点要素的数量，并作为面对象的统计值，也可以引入点的权重信息，
     * 考虑面对象内点的加权值作为面对象的统计值；最后基于面对象的统计值，按照统计值大小排序的结果，
     * 通过色带对面对象进行色彩填充。
      * @param {SummaryMeshJobParameter} params - 点聚合分析任务参数类。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addSummaryMeshJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryMeshJobsService.addSummaryMeshJob(params, seconds, callback, function (job) {
          me.summaryMeshJobs[job.id] = job.state;
        });
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
      * @description 获取单对象空间查询分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getQueryJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return singleObjectQueryJobsService.getQueryJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getQueryJob
      * @description 获取指定 ID 的单对象空间查询分析。
      * @param {string} id - 空间分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getQueryJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return singleObjectQueryJobsService.getQueryJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addQueryJob
      * @description 新建单对象空间查询分析。<br>
     * 单对象空间查询，指的是只支持查询对象数据集中有一个对象对被查询数据集做空间查询。
     * 如果查询对象数据集中有多个对象，则默认用 SmID 最小的对象对被查询数据集做空间查询。
      * @param {SingleObjectQueryJobsParameter} params - 单对象空间查询分析的请求参数。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addQueryJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return singleObjectQueryJobsService.addQueryJob(params, seconds, callback, function (job) {
          me.queryJobs[job.id] = job.state;
        });
     }
 
     /**
      * @function ProcessingService.prototype.getQueryJobState
      * @description 获取单对象空间查询分析的状态。
      * @param {string} id - 单对象空间查询分析的 ID。
      * @returns {Object} 单对象空间查询分析的状态。
      */
     getQueryJobState(id) {
         return this.queryJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryRegionJobs
      * @description 获取区域汇总分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryRegionJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryRegionJobsService.getSummaryRegionJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryRegionJob
      * @description 获取指定 ID 的区域汇总分析。
      * @param {string} id - 区域汇总分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryRegionJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryRegionJobsService.getSummaryRegionJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addSummaryRegionJob
      * @description 新建区域汇总分析。<br>
     * 区域汇总分析是指针对线数据集和面数据集制作聚合图的一种空间分析作业。
     * 通过网格面或多边形对地图线或面要素进行划分，然后，以标准属性字段或权重字段对每个网格单元内线或面要素进行统计，
     * 将统计结果作为该网格单元的统计值。最后按照网格单元统计值的大小进行排序，通过色带对网格单元进行色彩填充。
      * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addSummaryRegionJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryRegionJobsService.addSummaryRegionJob(params, seconds, callback, function (job) {
          me.summaryRegionJobs[job.id] = job.state;
      });
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryRegionJobState
      * @description 获取区域汇总分析的状态。
      * @param {string} id - 生成区域汇总分析的 ID。
      * @returns {Object} 区域汇总分析的状态。
      */
     getSummaryRegionJobState(id) {
         return this.summaryRegionJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getVectorClipJobs
      * @description 获取矢量裁剪分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getVectorClipJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var vectorClipJobsService = new VectorClipJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return vectorClipJobsService.getVectorClipJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getVectorClipJob
      * @description 获取指定 ID 的矢量裁剪分析。
      * @param {string} id - 矢量裁剪分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getVectorClipJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var vectorClipJobsService = new VectorClipJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return vectorClipJobsService.getVectorClipJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addVectorClipJob
      * @description 新建矢量裁剪分析。<br>
     * 矢量裁剪是指对矢量数据集进行裁剪，包括内部裁剪和外部裁剪。
     * 内部裁剪，则被裁剪的矢量数据集在裁剪区范围内的部分被保留到结果数据集中；
     * 外部裁剪，则保留不在裁剪区范围内的那部分数据到结果数据集中。
      * @param {VectorClipJobsParameter} params - 矢量裁剪分析请求参数类。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addVectorClipJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var vectorClipJobsService = new VectorClipJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return vectorClipJobsService.addVectorClipJob(params, seconds, callback, function (job) {
          me.vectorClipJobs[job.id] = job.state;
        });
     }
 
     /**
      * @function ProcessingService.prototype.getVectorClipJobState
      * @description 获取矢量裁剪分析的状态。
      * @param {number} id - 矢量裁剪分析的 ID。
      * @returns {Object} 矢量裁剪分析的状态。
      */
     getVectorClipJobState(id) {
         return this.vectorClipJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getOverlayGeoJobs
      * @description 获取叠加分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getOverlayGeoJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return overlayGeoJobsService.getOverlayGeoJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getOverlayGeoJob
      * @description 获取指定 ID 的叠加分析。
      * @param {string} id - 叠加分析的 ID。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getOverlayGeoJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return overlayGeoJobsService.getOverlayGeoJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addOverlayGeoJob
      * @description 新建叠加分析。<br>
     * 叠加分析是在统一空间参考系统下，通过对两个数据集进行的一系列集合运算，产生新数据集的过程。
     * 在叠加分析中至少涉及到三个数据集，其中一个数据集的类型可以是点、线、面等，被称作源数据集；
     * 另一个数据集是面数据集，被称作叠加对象数据集；还有一个数据集就是叠加结果数据集，包含叠加后数据的几何信息和属性信息。
      * @param {OverlayGeoJobParameter} params - 叠加分析请求参数类。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addOverlayGeoJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var overlayGeoJobsService = new OverlayGeoJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return overlayGeoJobsService.addOverlayGeoJob(params, seconds, callback, function (job) {
          me.overlayGeoJobs[job.id] = job.state;
        });
     }
 
     /**
      * @function ProcessingService.prototype.getoverlayGeoJobState
      * @description 获取叠加分析的状态。
      * @param {string} id - 叠加分析的 ID。
      * @returns {Object} 叠加分析的状态。
      */
     getoverlayGeoJobState(id) {
         return this.overlayGeoJobs[id];
     }
 
     /**
      * @function ProcessingService.prototype.getBuffersJobs
      * @description 获取缓冲区分析的列表。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getBuffersJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return buffersAnalystJobsService.getBuffersJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getBuffersJob
      * @description 获取指定 ID 的缓冲区分析。
      * @param {string} id - 缓冲区分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getBuffersJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return buffersAnalystJobsService.getBuffersJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addBuffersJob
      * @description 新建缓冲区分析。<br>
     * 缓冲区分析是围绕空间对象，使用与空间对象的距离值（称为缓冲半径）作为半径，生成该对象的缓冲区域的过程，
     * 其中缓冲半径可以是固定数值也可以是空间对象各自的属性值。缓冲区也可以理解为空间对象的影响或服务范围。
      * @param {BuffersAnalystJobsParameter} params - 缓冲区分析请求参数类。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} seconds - 获取创建成功结果的时间间隔。 
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addBuffersJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var buffersAnalystJobsService = new BuffersAnalystJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return buffersAnalystJobsService.addBuffersJob(params, seconds, callback, function (job) {
          me.buffersJobs[job.id] = job.state;
      });
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
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getTopologyValidatorJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return topologyValidatorJobsService.getTopologyValidatorJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getTopologyValidatorJob
      * @description 获取指定 ID 的拓扑检查分析。
      * @param {string} id - 拓扑检查分析的 ID。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getTopologyValidatorJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return topologyValidatorJobsService.getTopologyValidatorJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addTopologyValidatorJob
      * @description 新建拓扑检查分析。<br>
     * 拓扑检查是指根据相应的拓扑规则对点、线和面数据进行检查，返回不符合规则的对象的一种操作作业。
     * 支持以下种拓扑规则:面数据集内部无交叠、面数据集和面数据集无交叠、面数据集被面数据集包含、
     * 面数据集被面数据集覆盖、线数据集内部无交叠、线数据集与线数据集无交叠、点数据集内部无重复点。
      * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析请求参数类。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。 
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addTopologyValidatorJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var topologyValidatorJobsService = new TopologyValidatorJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return topologyValidatorJobsService.addTopologyValidatorJob(params, seconds, callback, function (job) {
          me.topologyValidatorJobs[job.id] = job.state;
      });
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
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryAttributesJobs(callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryAttributesJobsService.getSummaryAttributesJobs(callback);
     }
 
     /**
      * @function ProcessingService.prototype.getSummaryAttributesJob
      * @description 获取指定 ID 的属性汇总分析。
      * @param {string} id - 属性汇总分析的 ID。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     getSummaryAttributesJob(id, callback, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryAttributesJobsService.getSummaryAttributesJob(id, callback);
     }
 
     /**
      * @function ProcessingService.prototype.addSummaryAttributesJob
      * @description 新建属性汇总分析。<br>
     * 属性汇总分析是指对输入的数据集中所选择的属性进行汇总统计。
     * 通过对输入的数据集设定分组字段、属性字段以及对属性字段需进行的统计模式，从而得到汇总统计的结果。
      * @param {SummaryAttributesJobsParameter} params - 属性汇总分析参数类。 
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {number} [seconds=1000] - 获取创建成功结果的时间间隔。
      * @param {DataFormat}  [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     addSummaryAttributesJob(params, callback, seconds, resultFormat) {
         var me = this,
             format = me._processFormat(resultFormat);
         var summaryAttributesJobsService = new SummaryAttributesJobsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
         return summaryAttributesJobsService.addSummaryAttributesJob(params, seconds, callback, function (job) {
          me.summaryAttributesJobs[job.id] = job.state;
      });
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
 }
 