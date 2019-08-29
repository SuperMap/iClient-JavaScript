/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DensityKernelAnalystParameters} from './DensityKernelAnalystParameters';

/**
 * @class SuperMap.DensityAnalystService
 * @category iServer SpatialAnalyst DensityAnalyst
 * @classdesc
 * 密度分析服务类，密度分析可计算每个输出栅格像元周围圆形邻域内输入的点或线对象的密度。
 * 密度分析，在某种意义上来说，相当于在表面上将输入的点线对象的测量值散开来，将每个点或线对象的测量量分布在整个研究区域，并计算输出栅格中每个像元的密度值。目前提供1种密度分析：核密度分析（Kernel）。
 * @param {string} url - 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SuperMap.SpatialAnalystBase}
 * @example  例如：
 *  var myDensityAnalystService = new SuperMap.DensityAnalystService(url);
 *  myDensityAnalystService.on({
 *     "processCompleted": processCompleted,
 *     "processFailed": processFailed
 *     }
 *  );
 */
export class DensityAnalystService extends SpatialAnalystBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} SuperMap.DensityAnalystService.prototype.mode
         * @description 密度分析类型。
         */
        this.mode = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.DensityAnalystService";
    }

    /**
     * @function SuperMap.DensityAnalystService.prototype.destroy
     * @description 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function SuperMap.DensityAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {SuperMap.DensityKernelAnalystParameters} parameter - 核密度分析参数。
     */
    processAsync(parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }
        var parameterObject = new Object();

        if (parameter instanceof DensityKernelAnalystParameters) {
            me.url += 'datasets/' + parameter.dataset + '/densityanalyst/kernel';
            me.mode = "kernel";
        }

        DensityKernelAnalystParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url += '.json?returnContent=true';

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.DensityAnalystService = DensityAnalystService;