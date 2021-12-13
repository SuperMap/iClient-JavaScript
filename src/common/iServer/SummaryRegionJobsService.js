/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { SummaryRegionJobParameter } from './SummaryRegionJobParameter';

/**
 * @class SummaryRegionJobsService
 * @deprecatedclass SuperMap.SummaryRegionJobsService
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析服务类
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
     */
    getSummaryRegionJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SummaryRegionJobsService.prototype.getSummaryRegionJob
     * @description 获取指定id的区域汇总分析任务。
     * @param {string} id -要获取区域汇总分析任务的id
     */
    getSummaryRegionJob(id) {
        super.getJobs(Util.urlPathAppend(this.url, id));
    }

    /**
     * @function SummaryRegionJobsService.prototype.addSummaryRegionJob
     * @description 新建区域汇总任务。
     * @param {SummaryRegionJobParameter} params - 区域汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     */
    addSummaryRegionJob(params, seconds) {
        super.addJob(this.url, params, SummaryRegionJobParameter, seconds);
    }
}

