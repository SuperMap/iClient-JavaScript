var ServiceBase = require('./ServiceBase');
var SuperMap = require('../SuperMap');
var Request = require('../util/Request');

SuperMap.REST.ProcessingJobsServiceBase = SuperMap.Class(ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型
     * - *processCompleted* 创建作业成功后触发的事件。
     * - *processFailed* 创建作业失败后触发的事件 。
     * - *processRunning* 创建作业过程的整个阶段都会触发的事件，用于获取作业创建过程的状态 。
     */
    EVENT_TYPES: ["processCompleted", "processFailed", "processRunning"],

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
    },

    destroy: function () {
        ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     *
     * @param url 一个空间分析作业的资源地址。
     */
    getJobs: function (url) {
        var me = this;
        return Request.get(url).then(function (response) {
            return response.json();
        }).then(function (result) {
            me.events.triggerEvent("processCompleted", {result: result});
        }).catch(function (e) {
            me.eventListeners.processFailed({error: e});
        });
    },

    /**
     *
     * @param url 分布式空间分析作业资源根地址。
     * @param params 创建一个空间分析作业的请求参数。
     * @param paramType 请求参数类型。
     * @param seconds 开始创建作业后，获取创建成功结果的时间间隔。
     */
    addJob: function (url, params, paramType, seconds) {
        var me = this, parameterObject = null;
        if (params && params instanceof paramType) {
            parameterObject = new Object();
            paramType.toObject(params, parameterObject);
        }
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return Request.post(me._processUrl(url), JSON.stringify(parameterObject), options).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result.succeed) {
                me.serviceProcessCompleted(result, seconds);
            } else {
                me.serviceProcessFailed(result);
            }
        }).catch(function (e) {
            me.eventListeners.processFailed({error: e});
        });
    },

    serviceProcessCompleted: function (result, seconds) {
        result = SuperMap.Util.transformResult(result);
        seconds = seconds || 1000;
        var me = this;
        if (result) {
            var id = setInterval(function () {
                return Request.get(result.newResourceLocation)
                    .then(function (response) {
                        return response.json();
                    }).then(function (job) {
                        me.events.triggerEvent("processRunning", {id: job.id, state: job.state});
                        if (job.state.runState === 'LOST') {
                            clearInterval(id);
                            me.events.triggerEvent("processFailed", {error: job.state.errorMsg});
                        }
                        if (job.state.runState === 'FINISHED' && job.setting.serviceInfo) {
                            clearInterval(id);
                            me.events.triggerEvent("processCompleted", {result: job});
                        }
                    }).catch(function (e) {
                        clearInterval(id);
                        me.events.triggerEvent("processFailed", {error: e});
                    });
            }, seconds);
        }
    },

    serviceProcessFailed: function (result) {
        ServiceBase.prototype.serviceProcessFailed.apply(this, arguments);
    },

    //为不是以.json结尾的url加上.json，并且如果有token的话，在.json后加上token参数。
    _processUrl: function (url) {
        if (url.indexOf('.json') === -1) {
            url += '.json';
        }
        if (SuperMap.SecurityManager.getToken(url)) {
            url += '?token=' + SuperMap.SecurityManager.getToken(url);
        }
        return url;
    },

    CLASS_NAME: "SuperMap.REST.ProcessingJobsServiceBase"
});

module.exports = SuperMap.REST.ProcessingJobsServiceBase;