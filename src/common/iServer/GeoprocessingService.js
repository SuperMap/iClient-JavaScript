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
 * @usage
 */
export class GeoprocessingService extends CommonServiceBase {
    constructor(url, options) {
        options = options || {};
        super(url, options);
        this.CLASS_NAME = 'SuperMap.GeoprocessingService';
        this.headers = {};
        this.crossOrigin = true;
    }
    /**
     * @function GeoprocessingService.prototype.getTools
     * @description 获取处理自动化工具列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTools(callback) {
      return this._processAsync({ url: `${this.url}/list`, callback });
    }
    /**
     * @function GeoprocessingService.prototype.getTool
     * @description 获取处理自动化工具的ID、名称、描述、输入参数、环境参数和输出结果等相关参数。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTool(identifier, callback) {
      return this._processAsync({ url: `${this.url}/${identifier}`, callback });
    }
    /**
     * @function GeoprocessingService.prototype.execute
     * @description 同步执行处理自动化工具。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} parameter - 处理自动化工具的输入参数。
     * @param {Object} environment - 处理自动化工具的环境参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    execute(identifier, parameter, environment, callback) {
        parameter = parameter ? parameter : null;
        environment = environment ? environment : null;
        const executeParamter = { parameter, environment };
        return this._processAsync({ url: `${this.url}/${identifier}/execute`, executeParamter, callback });
    }
    /**
     * @function GeoprocessingService.prototype.submitJob
     * @description 异步执行处理自动化工具。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} parameter - 处理自动化工具的输入参数。
     * @param {Object} environments - 处理自动化工具的环境参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    submitJob(identifier, parameter, environments, callback) {
        parameter = parameter ? parameter : null;
        environments = environments ? environments : null;
        const asyncParamter = JSON.stringify({ parameter: parameter, environments: environments });
        return this._processAsync({ url: `${this.url}/${identifier}/jobs`, method: 'POST', callback, params: asyncParamter });
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
            const serviceProcessCompleted = function (serverResult) {
                const state = serverResult.result.state.runState;
                if (serverResult.options.statusCallback) {
                    serverResult.options.statusCallback(state);
                }
                if (['FINISHED', 'FAILED', 'CANCELED'].indexOf(state) !== -1) {
                  clearInterval(timer);
                  callback(serverResult);
                }
            };
            me._processAsync({ url: `${me.url}/${identifier}/jobs/${jobId}`, callback: serviceProcessCompleted });
        }, options.interval);
    }

    /**
     * @function GeoprocessingService.prototype.getJobInfo
     * @description 获取处理自动化任务的执行信息。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @returns {Promise} Promise 对象。
     */
    getJobInfo(identifier, jobId, callback) {
      return this._processAsync({ url: `${this.url}/${identifier}/jobs/${jobId}`, callback });
    }

    /**
     * @function GeoprocessingService.prototype.cancelJob
     * @description 取消处理自动化任务的异步执行。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @returns {Promise} Promise 对象。
     */
    cancelJob(identifier, jobId, callback) {
      return this._processAsync({ url: `${this.url}/${identifier}/jobs/${jobId}/cancel`, callback });
    }
    /**
     * @function GeoprocessingService.prototype.getJobs
     * @description 获取处理自动化服务任务列表。
     * @param {string} identifier - 处理自动化工具ID。(传参代表identifier算子的任务列表，不传参代表所有任务的列表)
     * @returns {Promise} Promise 对象。
     */
    getJobs(identifier, callback) {
        let url = `${this.url}/jobs`;
        if (identifier && typeof identifier === 'string') {
            url = `${this.url}/${identifier}/jobs`;
        } else {
          callback = identifier;
        }
        this._processAsync({ url, callback });
    }
    /**
     * @function GeoprocessingService.prototype.getResults
     * @description 处理自动化工具执行的结果等,支持结果过滤。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {string} filter - 输出异步结果的ID。(可选，传入filter参数时对该处理自动化工具执行的结果进行过滤获取，不填参时显示所有的执行结果)
     * @returns {Promise} Promise 对象。
     */
    getResults(identifier, jobId, filter, callback) {
        let url = `${this.url}/${identifier}/jobs/${jobId}/results`;
        if (filter) {
          if (typeof filter === 'string') {
            url = `${url}/${filter}`;
          } else {
            callback = filter;
          }
        } 
        return this._processAsync({ url, callback });
    }
   
    _processAsync({ url, method, callback, paramter }) {
          return this.request({
              url: url,
              method: method || 'GET',
              params: paramter,
              headers: { 'Content-type': 'application/json' },
              scope: this,
              success: callback,
              failure: callback
          });
      }
}
