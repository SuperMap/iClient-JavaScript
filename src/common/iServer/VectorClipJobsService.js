/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { ProcessingServiceBase } from './ProcessingServiceBase';
import { VectorClipJobsParameter } from './VectorClipJobsParameter';

/**
 * @class SuperMap.VectorClipJobsService
 * @category  iServer ProcessingService VectorClip
 * @classdesc 矢量裁剪分析服务类
 * @extends {SuperMap.ProcessingServiceBase}
 * @param {string} url -矢量裁剪分析服务地址。
 * @param {Object} options - 交互服务时所需可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
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
     * @function SuperMap.VectorClipJobsService.protitype.getVectorClipJobs
     * @description 获取矢量裁剪分析所有任务
     */
    getVectorClipJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function SuperMap.KernelDensityJobsService.protitype.getVectorClipJob
     * @description 获取指定id的矢量裁剪分析服务
     * @param {string} id - 指定要获取数据的id
     */
    getVectorClipJob(id) {
        super.getJobs(Util.urlPathAppend(this.url, id));
    }

    /**
     * @function SuperMap.VectorClipJobsService.protitype.addVectorClipJob
     * @description 新建矢量裁剪分析服务
     * @param {SuperMap.VectorClipJobsParameter} params - 创建一个空间分析的请求参数。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addVectorClipJob(params, seconds) {
        super.addJob(this.url, params, VectorClipJobsParameter, seconds);
    }
}

SuperMap.VectorClipJobsService = VectorClipJobsService;
