/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import {ProcessingServiceBase} from './ProcessingServiceBase';
import {TopologyValidatorJobsParameter} from './TopologyValidatorJobsParameter';

/**
 * @class TopologyValidatorJobsService
 * @deprecatedclass SuperMap.TopologyValidatorJobsService
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析服务类
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class TopologyValidatorJobsService extends ProcessingServiceBase {

    constructor(url, options) {
        super(url, options);
        this.url = Util.urlPathAppend(this.url, 'spatialanalyst/topologyvalidator');
        this.CLASS_NAME = "SuperMap.TopologyValidatorJobsService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJobs
     * @description 获取拓扑检查分析所有任务
     */
    getTopologyValidatorJobs() {
        super.getJobs(this.url);
    }

    /**
     * @function TopologyValidatorJobsService.protitype.getTopologyValidatorJob
     * @description 获取指定id的拓扑检查分析服务
     * @param {string} id - 指定要获取数据的id
     */
    getTopologyValidatorJob(id) {
        super.getJobs( Util.urlPathAppend(this.url, id));
    }

    /**
     * @function TopologyValidatorJobsService.protitype.addTopologyValidatorJob
     * @description 新建拓扑检查分析服务
     * @param {TopologyValidatorJobsParameter} params - 拓扑检查分析任务参数类。
     * @param {number} seconds -创建成功结果的时间间隔。
     */
    addTopologyValidatorJob(params, seconds) {
        super.addJob(this.url, params, TopologyValidatorJobsParameter, seconds);
    }

}
