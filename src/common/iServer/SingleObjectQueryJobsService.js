/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {SingleObjectQueryJobsParameter} from './SingleObjectQueryJobsParameter';

/**
 * @class SuperMap.SingleObjectQueryJobsService
 * @category  iServer ProcessingService Query
 * @classdesc 单对象查询分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url - 单对象空间查询分析服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class SingleObjectQueryJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url += "/spatialanalyst/query";
        this.CLASS_NAME = "SuperMap.SingleObjectQueryJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.getQueryJobs
     * @description 获取单对象空间查询分析所有任务
     */
    getQueryJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getQueryJob
     * @description 获取指定id的单对象空间查询分析服务
     * @param {string} id - 指定要获取数据的id
     */
    getQueryJob(id) {
        super.getJobs(this.url + '/' + id);
    }

    /**
     * @function SuperMap.SingleObjectQueryJobsService.protitype.addQueryJob
     * @description 新建单对象空间查询分析服务
     * @param {SuperMap.SingleObjectQueryJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addQueryJob(params, seconds) {
        super.addJob(this.url, params, SingleObjectQueryJobsParameter, seconds);
    }

}

SuperMap.SingleObjectQueryJobsService = SingleObjectQueryJobsService;