/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { VectorClipJobsParameter } from './VectorClipJobsParameter';

/**
 * @class VectorClipJobsService
 * @deprecatedclass SuperMap.VectorClipJobsService
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析服务类
 * @extends {ProcessingServiceBase}
 * @param {string} url -服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class VectorClipJobsService extends ProcessingServiceBase {
    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/vectorclip');
        this.CLASS_NAME = 'SuperMap.VectorClipJobsService';
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取矢量裁剪分析所有任务
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJobs(callback) {
        return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定id的矢量裁剪分析服务
     * @param {string} id - 指定要获取数据的id
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getVectorClipJob(id, callback) {
        return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建矢量裁剪分析服务
     * @param {VectorClipJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    addVectorClipJob(params, seconds, callback, processRunningCallback) {
        return super.addJob(this.url, params, VectorClipJobsParameter, seconds, callback, processRunningCallback);
    }
}

