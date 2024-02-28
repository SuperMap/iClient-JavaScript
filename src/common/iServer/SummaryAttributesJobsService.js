/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {SummaryAttributesJobsParameter} from './SummaryAttributesJobsParameter';

/**
 * @class SummaryAttributesJobsService
 * @deprecatedclass SuperMap.SummaryAttributesJobsService
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析服务类。属性汇总统计是指对输入的数据集中所选择的属性进行汇总统计。
 * 通过对输入的数据集设定分组字段、属性字段以及对属性字段需进行的统计模式，从而得到汇总统计的结果。
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SummaryAttributesJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/summaryattributes');
        this.CLASS_NAME = "SuperMap.SummaryAttributesJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SummaryAttributesJobsService.protitype.getSummaryAttributesJobs
     * @description 获取属性汇总分析所有任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJobs (callback){
        return super.getJobs(this.url, callback);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.getSummaryAttributesJob
     * @description 获取指定 ID 的属性汇总分析服务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getSummaryAttributesJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function SummaryAttributesJobsService.protitype.addSummaryAttributesJob
     * @description 新建属性汇总分析服务。
     * @param {SummaryAttributesJobsParameter} params - 属性汇总分析任务参数类。
     * @param {number} seconds - 创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    addSummaryAttributesJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, SummaryAttributesJobsParameter, seconds, callback, processRunningCallback);
    }
}
