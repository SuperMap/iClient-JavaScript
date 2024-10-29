import '../core/Base';
import { GeoprocessingService as CommonGeoprocessingService } from '@supermapgis/iclient-common/iServer/GeoprocessingService';
import { ServiceBase } from './ServiceBase';

/**
 * @class GeoprocessingService
 * @classdesc 处理自动化服务接口类。
 * @version 10.1.0
 * @category  iServer ProcessingAutomationService
 * @modulecategory Services
 * @extends  {ServiceBase}
 * @example
 *  //为了安全访问受保护的处理自动化服务，必须通过传递iserver令牌(token)，才能正确访问相关资源。
 * SecurityManager.registerToken(serviceUrl, token);
 *  var geoprocessingService = new GeoprocessingService("http://localhost:8090/iserver/services/geoprocessing/restjsr/gp/v2")
        geoprocessingService.submitJob(identifier,params, environments, function(serverResult) {
            console.log(serverResult.result);
            var jobID = serverResult.result.jobID;
            var options = {
                interval: 5000,
                statusCallback: function(state) {
                console.log("Job Status: ", state);
                }
            };
            geoprocessingService.waitForJobCompletion(jobID, identifier, options, function(serverResult) {
                console.log(serverResult);
            })
        })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @usage
 */
export class GeoprocessingService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
        this.headers = {};
        this.crossOrigin = true;
        this.withCredentials = true;
        this.proxy = true;
        this._geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
          proxy: this.options.proxy,
          withCredentials: this.options.withCredentials,
          crossOrigin: this.options.crossOrigin,
          headers: this.options.headers
        });
    }
    /**
     * @function GeoprocessingService.prototype.getTools
     * @description 获取处理自动化工具列表。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTools(callback) {
      return this._geoprocessingJobsService.getTools(callback);
    }
    /**
     * @function GeoprocessingService.prototype.getTool
     * @description 获取处理自动化工具的ID、名称、描述、输入参数、环境参数和输出结果等相关参数。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     */
    getTool(identifier, callback) {
      this._geoprocessingJobsService.getTool(identifier, callback);
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
      return this._geoprocessingJobsService.execute(identifier, parameter, environment, callback);
    }

    /**
     * @function GeoprocessingService.prototype.submitJob
     * @description 异步执行处理自动化工具。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} parameter - 处理自动化工具的输入参数。
     * @param {Object} environment - 处理自动化工具的环境参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    submitJob(identifier, parameter, environment, callback) {
      return this._geoprocessingJobsService.submitJob(identifier, parameter, environment, callback);
    }

    /**
     * @function GeoprocessingService.prototype.waitForJobCompletion
     * @description 获取处理自动化异步执行状态信息。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {Object} options - 状态信息参数。
     * @param {number} options.interval - 定时器时间间隔。
     * @param {function} options.statusCallback - 任务状态的回调函数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    waitForJobCompletion(jobId, identifier, options, callback) {
      return this._geoprocessingJobsService.waitForJobCompletion(jobId, identifier, options, callback);
    }

    /**
     * @function GeoprocessingService.prototype.getJobInfo
     * @description 获取处理自动化任务的执行信息。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getJobInfo(identifier, jobId, callback) {
      return this._geoprocessingJobsService.getJobInfo(identifier, jobId, callback);
    }

    /**
     * @function GeoprocessingService.prototype.cancelJob
     * @description 取消处理自动化任务的异步执行。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    cancelJob(identifier, jobId, callback) {
      return this._geoprocessingJobsService.cancelJob(identifier, jobId, callback);
    }

    /**
     * @function GeoprocessingService.prototype.getJobs
     * @description 获取处理自动化服务任务列表。
     * @param {string} identifier - 处理自动化工具ID。(可选，传参代表identifier算子的任务列表，不传参代表所有任务的列表)
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getJobs(identifier, callback) {
      return this._geoprocessingJobsService.getJobs(identifier, callback);
    }

    /**
     * @function GeoprocessingService.prototype.getResults
     * @description 处理自动化工具异步执行的结果,支持结果过滤。
     * @param {string} identifier - 处理自动化工具ID。
     * @param {string} jobId - 处理自动化任务ID。
     * @param {string} filter - 输出异步结果的ID。(可选，传入filter参数时对该处理自动化工具执行的结果进行过滤获取，不填参时显示所有的执行结果)
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getResults(identifier, jobId, filter, callback) {
      return this._geoprocessingJobsService.getResults(identifier, jobId, filter, callback);
    }
}

