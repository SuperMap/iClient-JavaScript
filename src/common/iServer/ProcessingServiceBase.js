/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    SuperMap
} from '../SuperMap';
import {
    CommonServiceBase
} from './CommonServiceBase';
import {
    FetchRequest
} from '../util/FetchRequest';
import {
    Util
} from '../commontypes/Util';
import {
    SecurityManager
} from '../security/SecurityManager';

/**
 * @class SuperMap.ProcessingServiceBase
 * @category  iServer ProcessingService
 * @classdesc 分布式分析服务基类
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 分布式分析服务地址。
 * @param {Object} options - 参数。
 * @param {SuperMap.Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class ProcessingServiceBase extends CommonServiceBase {

    constructor(url, options) {
        options = options || {};
        /*
         * Constant: EVENT_TYPES
         * {Array.<string>}
         * 此类支持的事件类型
         * - *processCompleted* 创建成功后触发的事件。
         * - *processFailed* 创建失败后触发的事件 。
         * - *processRunning* 创建过程的整个阶段都会触发的事件，用于获取创建过程的状态 。
         */
        options.EVENT_TYPES = ["processCompleted", "processFailed", "processRunning"];
        super(url, options);

        this.CLASS_NAME = "SuperMap.ProcessingServiceBase";
    }

    /**
     * @function SuperMap.ProcessingServiceBase.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.ProcessingServiceBase.prototype.getJobs
     * @description 获取分布式分析任务。
     * @param {string} url - 资源地址。
     */
    getJobs(url) {
        var me = this;
        FetchRequest.get(SecurityManager.appendCredential(url), null, {
            proxy: me.proxy
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            me.events.triggerEvent("processCompleted", {
                result: result
            });
        }).catch(function (e) {
            me.eventListeners.processFailed({
                error: e
            });
        });
    }

    /**
     * @function SuperMap.ProcessingServiceBase.prototype.addJob
     * @description 添加分布式分析任务。
     * @param {string} url - 资源根地址。
     * @param {Object} params - 创建一个空间分析的请求参数。
     * @param {string} paramType - 请求参数类型。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     */
    addJob(url, params, paramType, seconds) {
        var me = this,
            parameterObject = null;
        if (params && params instanceof paramType) {
            parameterObject = new Object();
            paramType.toObject(params, parameterObject);
        }
        let headers = Object.assign({
          'Content-Type': 'application/x-www-form-urlencoded'
        }, me.headers || {})
        var options = {
            proxy: me.proxy,
            headers,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            isInTheSameDomain: me.isInTheSameDomain
        };
        FetchRequest.post(SecurityManager.appendCredential(url), JSON.stringify(parameterObject), options).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result.succeed) {
                me.serviceProcessCompleted(result, seconds);
            } else {
                me.serviceProcessFailed(result);
            }
        }).catch(function (e) {
            me.serviceProcessFailed({
                error: e
            });
        });
    }

    serviceProcessCompleted(result, seconds) {
        result = Util.transformResult(result);
        seconds = seconds || 1000;
        var me = this;
        if (result) {
            var id = setInterval(function () {
                FetchRequest.get(SecurityManager.appendCredential(result.newResourceLocation), {
                        _t: new Date().getTime()
                    })
                    .then(function (response) {
                        return response.json();
                    }).then(function (job) {
                        me.events.triggerEvent("processRunning", {
                            id: job.id,
                            state: job.state
                        });
                        if (job.state.runState === 'LOST' || job.state.runState === 'KILLED' || job.state.runState === 'FAILED') {
                            clearInterval(id);
                            me.events.triggerEvent("processFailed", {
                                error: job.state.errorMsg,
                                state: job.state.runState
                            });
                        }
                        if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
                            clearInterval(id);
                            me.events.triggerEvent("processCompleted", {
                                result: job
                            });
                        }
                    }).catch(function (e) {
                        clearInterval(id);
                        me.events.triggerEvent("processFailed", {
                            error: e
                        });
                    });
            }, seconds);
        }
    }

    serviceProcessFailed(result) {
        super.serviceProcessFailed(result);
    }
}

SuperMap.ProcessingServiceBase = ProcessingServiceBase;