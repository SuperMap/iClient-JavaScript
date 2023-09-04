/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @class ProcessingServiceBase
 * @deprecatedclass SuperMap.ProcessingServiceBase
 * @category  iServer Core
 * @classdesc 分布式分析服务基类
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {number} options.index - 服务访问地址在数组中的位置。
 * @param {number} options.length - 服务访问地址数组长度。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class ProcessingServiceBase extends CommonServiceBase {

    constructor(url, options) {
        options = options || {};
        super(url, options);

        this.CLASS_NAME = "SuperMap.ProcessingServiceBase";
    }

    /**
     * @function ProcessingServiceBase.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function ProcessingServiceBase.prototype.getJobs
     * @description 获取分布式分析任务。
     * @param {string} url - 资源地址。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getJobs(url, callback) {
        var me = this;
        return FetchRequest.get(SecurityManager.appendCredential(url), null, {
            proxy: me.proxy
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            const res = { result, object: me, type: 'processCompleted' };
            callback(res);
            return res;
        }).catch(function (e) {
          const res = { error: e, object: me, type: 'processFailed' };
          callback(res);
          return res;
        });
    }

    /**
     * @function ProcessingServiceBase.prototype.addJob
     * @description 添加分布式分析任务。
     * @param {string} url - 资源根地址。
     * @param {Object} params - 创建一个空间分析的请求参数。
     * @param {string} paramType - 请求参数类型。
     * @param {number} seconds - 开始创建后，获取创建成功结果的时间间隔。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {RequestCallback} [processRunningCallback] - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    addJob(url, params, paramType, seconds, callback, processRunningCallback) {
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
        return FetchRequest.post(SecurityManager.appendCredential(url), JSON.stringify(parameterObject), options).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result.succeed) {
                return me.transformResult(result, seconds, callback, processRunningCallback);
            } else {
              result = me.transformErrorResult(result);
              result.options = me;
              result.type = 'processFailed';
              callback(result);
              return result;
            }
        }).catch(function (e) {
            e = me.transformErrorResult({ error: e });
            e.options = me;
            e.type = 'processFailed';
            callback(e);
            return e;
        });
    }

    transformResult(result, seconds, callback, processRunningCallback) {
        result = Util.transformResult(result);
        seconds = seconds || 1000;
        var me = this;
        if (result) {
           return new Promise((resolve) => {
              var id = setInterval(function () {
                FetchRequest.get(SecurityManager.appendCredential(result.newResourceLocation), {
                        _t: new Date().getTime()
                    })
                    .then(function (response) {
                        return response.json();
                    }).then(function (job) {
                        resolve({
                          object: me,
                          id: job.id,
                          state: job.state
                        });
                        processRunningCallback({
                            id: job.id,
                            state: job.state,
                            object: me
                        });
                        if (job.state.runState === 'LOST' || job.state.runState === 'KILLED' || job.state.runState === 'FAILED') {
                            clearInterval(id);
                            const res = {
                              error: job.state.errorMsg,
                              state: job.state.runState,
                              object: me,
                              type: 'processFailed'
                            };
                            resolve(res);
                            callback(res);
                        }
                        if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
                            clearInterval(id);
                            const res = {
                              result: job,
                              object: me, 
                              type: 'processCompleted'
                            };
                            resolve(res);
                            callback(res);
                        }
                    }).catch(function (e) {
                        clearInterval(id);
                        const res = {
                          error: e,
                          object: me,
                          type: 'processFailed'
                        };
                        resolve(res);
                        callback(res);
                    });
            }, seconds);
           });
        }
    }
}
