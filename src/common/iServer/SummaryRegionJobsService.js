/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { SummaryRegionJobParameter } from './SummaryRegionJobParameter';

/**
 * @class SuperMap.SummaryRegionJobsService
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 区域汇总分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
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
     * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJobs
     * @description 获取区域汇总分析任务集合。
     */
    getSummaryRegionJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定id的区域汇总分析任务。
     * @param {string} id -要获取区域汇总分析任务的id
     */
    getSummaryRegionJob(id) {
        super.getJobs(Util.urlPathAppend(this.url, id));
    }

    /**
     * @function SuperMap.SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总任务。
     * @param {SuperMap.SummaryRegionJobParameter} params - 创建一个区域汇总任务的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addSummaryRegionJob(params, seconds) {
        super.addJob(this.url, params, SummaryRegionJobParameter, seconds);
    }
}

SuperMap.SummaryRegionJobsService = SummaryRegionJobsService;
