/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { OverlayGeoJobParameter } from './OverlayGeoJobParameter';

/**
 * @class OverlayGeoJobsService
 * @deprecatedclass SuperMap.OverlayGeoJobsService
 * @category iServer ProcessingService OverlayAnalyst
 * @classdesc 叠加分析任务类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class OverlayGeoJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/overlay');
        this.CLASS_NAME = 'SuperMap.OverlayGeoJobsService';
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function OverlayGeoJobsService.prototype.getOverlayGeoJobs
     * @description 获取叠加分析任务
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function OverlayGeoJobsService.prototype.getOverlayGeoJob
     * @description 获取指定id的叠加分析任务
     * @param {string} id - 指定要获取数据的id
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getOverlayGeoJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function OverlayGeoJobsService.prototype.addOverlayGeoJob
     * @description 新建点叠加析服务
     * @param {OverlayGeoJobParameter} params - 创建一个叠加分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    addOverlayGeoJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, OverlayGeoJobParameter, seconds, callback, processRunningCallback);
    }
}
