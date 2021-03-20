import L from 'leaflet';
import '../core/Base';
import { GeoprocessingService as CommonGeoprocessingService } from '@supermap/iclient-common/iServer/GeoprocessingService';
import { ServiceBase } from './ServiceBase';

/** 
 * @class L.supermap.geoprocessingService
 * @classdesc 地理处理服务接口类。
 * @version 10.1.0
 * @category  iServer GeoprocessingService
 * @extends  L.supermap.ServiceBase
 * @example
 *  //为了安全访问受保护的地理处理服务，必须通过传递iserver令牌(token)，才能正确访问相关资源。
 * SuperMap.SecurityManager.registerToken(serviceUrl, token);
 *  var geoprocessingService = new L.supermap.geoprocessingService("http://localhost:8090/iserver/services/geoprocessing/restjsr/gp/v2")
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
 *  
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 */
export const GeoprocessingService = ServiceBase.extend({
    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        ServiceBase.prototype.initialize.call(this, url, options);
        this.headers = {};
        this.crossOrigin = true;
        this.withCredentials = true;
        this.proxy = true;
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.getTools
     * @description 获取地理处理工具列表。
     * @param {RequestCallback} callback 请求结果的回调函数。
     */
    getTools: function (callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.getTools();
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.getTool
     * @description 获取工具的ID、名称、描述、输入参数、环境参数和输出结果等相关参数。
     * @param {string} identifier - 地理处理工具ID。
     * @param {RequestCallback} callback 请求结果的回调函数。
     */
    getTool: function (identifier, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.getTool(identifier);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.execute
     * @description 同步执行地理处理工具。
     * @param {string} identifier - 地理处理工具ID。
     * @param {Object} parameter - 地理处理工具的输入参数。
     * @param {Object} environment - 地理处理工具的环境参数。
     * @param {RequestCallback} callback 回调函数。
     */
    execute: function (identifier, parameter, environment, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.execute(identifier, parameter, environment);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.submitJob
     * @description 异步执行地理处理工具。
     * @param {string} identifier - 地理处理工具ID。
     * @param {Object} parameter - 地理处理工具的输入参数。
     * @param {Object} environment - 地理处理工具的环境参数。
     * @param {RequestCallback} callback 回调函数。
     */
    submitJob: function (identifier, parameter, environment, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.submitJob(identifier, parameter, environment);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.waitForJobCompletion
     * @description 获取地理处理异步执行状态信息。
     * @param {string} jobId - 地理处理任务ID。
     * @param {string} identifier - 地理处理工具ID。
     * @param {Object} options - 状态信息参数。
     * @param {number} options.interval - 定时器时间间隔。
     * @param {RequestCallback} options.statusCallback - 任务状态的回调函数。
     * @param {Callback} callback 回调函数。
     */
    waitForJobCompletion: function (jobId, identifier, options, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.waitForJobCompletion(jobId, identifier, options);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.getJobInfo
     * @description 获取地理处理任务的执行信息。
     * @param {string} identifier - 地理处理工具ID。
     * @param {string} jobId - 地理处理任务ID。
     * @param {RequestCallback} callback 回调函数。
     */
    getJobInfo: function (identifier, jobId, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.getJobInfo(identifier, jobId);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.cancelJob
     * @description 取消地理处理任务的异步执行。
     * @param {string} identifier - 地理处理工具ID。
     * @param {string} jobId - 地理处理任务ID。
     * @param {RequestCallback} callback 回调函数。
     */
    cancelJob: function (identifier, jobId, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.cancelJob(identifier, jobId);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.getJobs
     * @description 获取地理处理服务任务列表。
     * @param {string} identifier - 地理处理工具ID。(传参代表identifier算子的任务列表，不传参代表所有任务的列表)
     * @param {RequestCallback} callback 回调函数。
     */
    getJobs: function (identifier, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.getJobs(identifier);
    },

    /**
     * @function L.supermap.geoprocessingService.prototype.getResults
     * @description 地理处理工具异步执行的结果,支持结果过滤。
     * @param {string} identifier - 地理处理工具ID。
     * @param {string} jobId - 地理处理任务ID。
     * @param {string} filter - 输出异步结果的id。(可选，传入filter参数时对该地理处理工具执行的结果进行过滤获取，不填参时显示所有的执行结果)
     * @param {RequestCallback} callback 请求结果的回调函数。
     */
    getResults: function (identifier, jobId, filter, callback) {
        const geoprocessingJobsService = new CommonGeoprocessingService(this.url, {
            proxy: this.options.proxy,
            withCredentials: this.options.withCredentials,
            crossOrigin: this.options.crossOrigin,
            headers: this.options.headers,
            eventListeners: {
                scope: this,
                processCompleted: callback,
                processFailed: callback
            }
        });
        geoprocessingJobsService.getResults(identifier, jobId, filter);
    }
});
export const geoprocessingService = function (url, options) {
    return new GeoprocessingService(url, options);
};

L.supermap.geoprocessingService = geoprocessingService;
