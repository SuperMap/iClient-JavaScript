import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class GeoprocessingService
 * @deprecatedclass SuperMap.GeoprocessingService
 * @category  iServer ProcessingAutomationService
 * @classdesc 处理自动化服务接口的基类。
 * @version 10.1.0
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Events} options.events - 处理所有事件的对象。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @usage
 */
export class GeoprocessingService extends CommonServiceBase {
    constructor(url, options) {
        options = options || {};
        options.EVENT_TYPES = ['processCompleted', 'processFailed', 'processRunning'];
        super(url, options);
        this.CLASS_NAME = 'SuperMap.GeoprocessingService';
        this.headers = {};
        this.crossOrigin = true;
        this.eventCount = 0;
    }
    /**
     * @function GeoprocessingService.prototype.getTools
     * @description 获取处理自动化工具列表。
     * @param {string} identifier - 处理自动化工具ID。
     */
    getTools(callback) {
        this._processAsync({ url: `${this.url}/list`, callback });
    }
    /**
     * @function GeoprocessingService.prototype.getTool
     * @description 获取处理自动化工具的ID、名称、描述、输入参数、环境参数和输出结果等相关参数。
     * @param {string} identifier - 处理自动化工具ID。
     */
    getTool(identifier, callback) {
        this._processAsync({ url: `${this.url}/${identifier}`, callback });
    }
    /**
     * @function GeoprocessingService.prototype.execute
     * @description 同步执行处理自动化工具。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} parameter - 处理自动化工具的输入参数。
     * @param {Object} environment - 处理自动化工具的环境参数。
     */
    execute(identifier, parameter, environment, callback) {
        parameter = parameter ? parameter : null;
        environment = environment ? environment : null;
        const executeParamter = { parameter, environment };
        this._processAsync({ url: `${this.url}/${identifier}/execute`, executeParamter, callback });
    }
    /**
     * @function GeoprocessingService.prototype.submitJob
     * @description 异步执行处理自动化工具。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} parameter - 处理自动化工具的输入参数。
     * @param {Object} environments - 处理自动化工具的环境参数。
     */
    submitJob(identifier, parameter, environments, callback) {
        parameter = parameter ? parameter : null;
        environments = environments ? environments : null;
        const asyncParamter = JSON.stringify({ parameter: parameter, environments: environments });
        this._processAsync({ url: `${this.url}/${identifier}/jobs`, method: 'POST', callback, params: asyncParamter });
    }

    /**
     * @function GeoprocessingService.prototype.waitForJobCompletion
     * @description 获取处理自动化异步执行状态信息。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} options - 状态信息参数。
     * @param {number} options.interval - 定时器时间间隔。
     * @param {function} options.statusCallback - 任务状态的回调函数。
     */
    waitForJobCompletion(jobId, identifier, options, callback) {
        const me = this;
        const timer = setInterval(function () {
            const serviceProcessCompleted = function (serverResult, options) {
                const state = serverResult.state.runState;
                if (options.statusCallback) {
                    options.statusCallback(state);
                }
                switch (state) {
                    case 'FINISHED':
                        clearInterval(timer);
                        me.events.triggerEvent('processCompleted', {
                            result: serverResult,
                            options
                        });
                        break;
                    case 'FAILED':
                        clearInterval(timer);
                        me.events.triggerEvent('processFailed', {
                            result: serverResult,
                            options
                        });
                        break;
                    case 'CANCELED':
                        clearInterval(timer);
                        me.events.triggerEvent('processFailed', {
                            result: serverResult,
                            options
                        });
                        break;
                }
            };
            me._processAsync({ url: `${me.url}/${identifier}/jobs/${jobId}`, serviceProcessCompleted, callback });
        }, options.interval);
    }

    /**
     * @function GeoprocessingService.prototype.getJobInfo
     * @description 获取处理自动化任务的执行信息。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     */
    getJobInfo(identifier, jobId, callback) {
        this._processAsync({ url: `${this.url}/${identifier}/jobs/${jobId}`, callback });
    }

    /**
     * @function GeoprocessingService.prototype.cancelJob
     * @description 取消处理自动化任务的异步执行。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     */
    cancelJob(identifier, jobId, callback) {
        this._processAsync({ url: `${this.url}/${identifier}/jobs/${jobId}/cancel`, callback });
    }
    /**
     * @function GeoprocessingService.prototype.getJobs
     * @description 获取处理自动化服务任务列表。
     * @param {string} identifier - 处理自动化工具ID。(传参代表identifier算子的任务列表，不传参代表所有任务的列表)
     */
    getJobs(identifier, callback) {
        let url = `${this.url}/jobs`;
        if (identifier) {
            url = `${this.url}/${identifier}/jobs`;
        }
        this._processAsync({ url, callback });
    }
    /**
     * @function GeoprocessingService.prototype.getResults
     * @description 处理自动化工具执行的结果等,支持结果过滤。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {string} filter - 输出异步结果的ID。(可选，传入filter参数时对该处理自动化工具执行的结果进行过滤获取，不填参时显示所有的执行结果)
     */
    getResults(identifier, jobId, filter, callback) {
        let url = `${this.url}/${identifier}/jobs/${jobId}/results`;
        if (filter) {
            url = `${url}/${filter}`;
        }
        this._processAsync({ url, callback });
    }
   
    _processAsync({ url, method, callback, paramter, serviceProcessCompleted, serviceProcessFailed }) {
        let eventId = ++this.eventCount;
        let eventListeners = {
          scope: this,
          processCompleted: function(result) {
            if (eventId === result.result.eventId && callback) {
              delete result.result.eventId;
              callback(result);
              this.events.un(eventListeners);
              return false;
            }
          },
          processFailed: function(result) {
            if ((eventId === result.error.eventId || eventId === result.eventId) && callback) {
              callback(result);
              this.events.un(eventListeners);
              return false;
            }
          }
        }
        this.events.on(eventListeners);
          this.request({
              url: url,
              method: method || 'GET',
              params: paramter,
              headers: { 'Content-type': 'application/json' },
              scope: this,
              success(result, options) {
                result.eventId = eventId;
                const callback = serviceProcessCompleted || this.serviceProcessCompleted.bind(this);
                callback(result, options);
              },
              failure(result, options) {
                if (result.error) {
                  result.error.eventId = eventId;
                }
                result.eventId = eventId;
                const callback = serviceProcessFailed || this.serviceProcessFailed.bind(this);
                callback(result, options);
              }
          });
      }
}
