import { SuperMap } from '../SuperMap';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class SuperMap.GeoprocessingService
 * @category  iServer GeoprocessingService
 * @classdesc 地理处理服务接口的基类。
 * @version 10.1.0
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {SuperMap.Events} options.events - 处理所有事件的对象。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务器类型，iServer|iPortal|Online。
 * @param {Object} [options.eventListeners] - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 */
export class GeoprocessingService extends CommonServiceBase {
    constructor(url, options) {
        options = options || {};
        options.EVENT_TYPES = ['processCompleted', 'processFailed', 'processRunning'];
        super(url, options);
        this.CLASS_NAME = 'SuperMap.GeoprocessingService';
        this.headers = {};
        this.crossOrigin = true;
    }
    /**
     * @function SuperMap.GeoprocessingService.prototype.getTools
     * @description 获取地理处理工具列表。
     */
    getTools() {
        const url = `${this.url}/list`;
        this._get(url);
    }
    /**
     * @function SuperMap.GeoprocessingService.prototype.getTool
     * @description 获取地理处理工具的ID、名称、描述、输入参数、环境参数和输出结果等相关参数。
     * @param {string} identifier - 地理处理工具ID。
     */
    getTool(identifier) {
        const url = `${this.url}/${identifier}`;
        this._get(url);
    }
    /**
     * @function SuperMap.GeoprocessingService.prototype.execute
     * @description 同步执行地理处理工具。
     * @param {string} identifier - 地理处理工具ID。
     * @param {Object} parameter - 地理处理工具的输入参数。
     * @param {Object} environment - 地理处理工具的环境参数。
     */
    execute(identifier, parameter, environment) {
        parameter = parameter ? parameter : null;
        environment = environment ? environment : null;
        const paramter = { parameter, environment };
        const url = `${this.url}/${identifier}/execute`;
        this._get(url, paramter);
    }
    /**
     * @function SuperMap.GeoprocessingService.prototype.submitJob
     * @description 异步执行地理处理工具。
     * @param {string} identifier - 地理处理工具ID。
     * @param {Object} parameter - 地理处理工具的输入参数。
     * @param {Object} environments - 地理处理工具的环境参数。
     */
    submitJob(identifier, parameter, environments) {
        parameter = parameter ? parameter : null;
        environments = environments ? environments : null;
        const asyncParameter = { parameter: parameter, environments: environments };
        const url = `${this.url}/${identifier}/jobs`;
        this.request({
            url: url,
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            data: JSON.stringify(asyncParameter),
            scope: this,
            success: this.serviceProcessCompleted,
            failure: this.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.GeoprocessingService.prototype.waitForJobCompletion
     * @description 获取地理处理异步执行状态信息。
     * @param {string} jobId - 地理处理任务ID。
     * @param {string} identifier - 地理处理工具ID。
     * @param {Object} options - 状态信息参数。
     * @param {number} options.interval - 定时器时间间隔。
     * @param {Callback} options.statusCallback - 任务状态的回调函数。
     */
    waitForJobCompletion(jobId, identifier, options) {
        const me = this;
        const url = `${me.url}/${identifier}/jobs/${jobId}`;
        const timer = setInterval(function () {
            const serviceProcessCompleted = function (serverResult) {
                const state = serverResult.state.runState;
                if (options.statusCallback) {
                    options.statusCallback(state);
                }
                switch (state) {
                    case 'FINISHED':
                        clearInterval(timer);
                        me.events.triggerEvent('processCompleted', {
                            result: serverResult
                        });
                        break;
                    case 'FAILED':
                        clearInterval(timer);
                        me.events.triggerEvent('processFailed', {
                            result: serverResult
                        });
                        break;
                    case 'CANCEL':
                        clearInterval(timer);
                        me.events.triggerEvent('processFailed', {
                            result: serverResult
                        });
                        break;
                }
            };
            me._get(url, null, serviceProcessCompleted);
        }, options.interval);
    }

    /**
     * @function SuperMap.GeoprocessingService.prototype.getJobInfo
     * @description 获取地理处理任务的执行信息。
     * @param {string} identifier - 地理处理工具ID。
     * @param {string} jobId - 地理处理任务ID。
     */
    getJobInfo(identifier, jobId) {
        const url = `${this.url}/${identifier}/jobs/${jobId}`;
        this._get(url);
    }

    /**
     * @function SuperMap.GeoprocessingService.prototype.cancelJob
     * @description 取消地理处理任务的异步执行。
     * @param {string} identifier - 地理处理工具ID。
     * @param {string} jobId - 地理处理任务ID。
     */
    cancelJob(identifier, jobId) {
        const url = `${this.url}/${identifier}/jobs/${jobId}/cancel`;
        this._get(url);
    }
    /**
     * @function SuperMap.GeoprocessingService.prototype.getJobs
     * @description 获取地理处理服务任务列表。
     * @param {string} identifier - 地理处理工具ID。(传参代表identifier算子的任务列表，不传参代表所有任务的列表)
     */
    getJobs(identifier) {
        let url = `${this.url}/jobs`;
        if (identifier) {
            url = `${this.url}/${identifier}/jobs`;
        }
        this._get(url);
    }
    /**
     * @function SuperMap.GeoprocessingService.prototype.getResults
     * @description 地理处理工具执行的结果等,支持结果过滤。
     * @param {string} identifier - 地理处理工具ID。
     * @param {string} jobId - 地理处理任务ID。
     * @param {string} filter - 输出异步结果的id。(可选，传入filter参数时对该地理处理工具执行的结果进行过滤获取，不填参时显示所有的执行结果)
     */
    getResults(identifier, jobId, filter) {
        let url = `${this.url}/${identifier}/jobs/${jobId}/results`;
        if (filter) {
            url = `${url}/${filter}`;
        }
        this._get(url);
    }
    _get(url, paramter, serviceProcessCompleted, serviceProcessFailed) {
        this.request({
            url: url,
            method: 'GET',
            params: paramter,
            headers: { 'Content-type': 'application/json' },
            scope: this,
            success: serviceProcessCompleted ? serviceProcessCompleted : this.serviceProcessCompleted,
            failure: serviceProcessFailed ? serviceProcessFailed : this.serviceProcessFailed
        });
    }
}
SuperMap.GeoprocessingService = GeoprocessingService;
