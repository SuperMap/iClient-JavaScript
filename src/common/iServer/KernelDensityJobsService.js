/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {KernelDensityJobParameter} from './KernelDensityJobParameter';

/**
 * @class KernelDensityJobsService
 * @deprecatedclass SuperMap.KernelDensityJobsService
 * @category  iServer ProcessingService DensityAnalyst
 * @classdesc 核密度分析服务类。核密度分析是指使用核函数来计算点或线邻域范围内的每单位面积量值。
 * 其结果是中间值大周边值小的光滑曲面，在邻域边界处降为0。<br>
 * 对于点对象，其核密度曲面与下方的平面所围成的空间的体积近似于此点的测量值；<br>
 * 对于线对象，其核密度曲面与下方的平面所围成的空间的体积近似于此线的测量值与线长度的乘积。<br>
 * 点或线的邻域叠加处，其密度值也相加。每个输出栅格的密度均为叠加在栅格上的所有核曲面值之和。    
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class KernelDensityJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/density');
        this.CLASS_NAME = "SuperMap.KernelDensityJobsService";
    }

    /**
     * @function KernelDensityJobsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取核密度分析任务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJobs(callback) {
      return super.getJobs(this.url, callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.getKernelDensityJobs
     * @description 获取指定 ID 的核密度分析任务。
     * @param {string} id - 指定要获取数据的 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getKernelDensityJob(id, callback) {
      return super.getJobs(Util.urlPathAppend(this.url, id), callback);
    }

    /**
     * @function KernelDensityJobsService.prototype.addKernelDensityJob
     * @description 新建核密度分析任务。
     * @param {KernelDensityJobParameter} params - 核密度分析任务参数类。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    addKernelDensityJob(params, seconds, callback, processRunningCallback) {
      return super.addJob(this.url, params, KernelDensityJobParameter, seconds, callback, processRunningCallback);
    }

}
