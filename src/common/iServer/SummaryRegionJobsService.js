/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { SummaryRegionJobParameter } from './SummaryRegionJobParameter';

/**
 * @class SummaryRegionJobsService
 * @deprecatedclass SuperMap.SummaryRegionJobsService
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析服务类。区域汇总分析是指针对线数据集和面数据集制作聚合图的一种空间分析作业。
 * 通过网格面或多边形对地图线或面要素进行划分，然后，以标准属性字段或权重字段对每个网格单元内线或面要素进行统计，
 * 将统计结果作为该网格单元的统计值。最后按照网格单元统计值的大小进行排序，通过色带对网格单元进行色彩填充。<br>
 * 区域汇总分析的概念与点聚合分析的概念类似，不同的是点聚合分析是对点数据集进行统计计算，
 * 而区域汇总分析，是对线数据集和面数据集进行统计计算。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SummaryRegionJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/summaryregion');
        this.CLASS_NAME = 'SuperMap.SummaryRegionJobsService';
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析任务集合。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定 ID 的区域汇总分析任务。
     * @param {string} id -要获取区域汇总分析任务的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryRegionJob(id, callback) {
       return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总分析任务。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addSummaryRegionJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SummaryRegionJobParameter, seconds, callback, processRunningCallback);
    }
}

