var SuperMap = require('../SuperMap');
var ServiceBase = require('../../common/iServer/ServiceBase');
var KernelDensityJobsService = require('../../common/iServer/KernelDensityJobsService');
var SingleObjectQueryJobsService = require('../../common/iServer/SingleObjectQueryJobsService');
var BuildCacheJobsService = require('../../common/iServer/BuildCacheJobsService');
var SummaryMeshJobsService = require('../../common/iServer/SummaryMeshJobsService');
var SummaryRegionJobsService = require('../../common/iServer/SummaryRegionJobsService');
var VectorClipJobsService = require('../../common/iServer/VectorClipJobsService');
/**
 * @class SuperMap.REST.ProcessingJobsService
 * @description 大数据处理相关服务类。
 * @augments SuperMap.ServiceBase
 * @example
 * 用法：
 *      new SuperMap.REST.ProcessingJobsService(url,options)
 *      .getKernelDensityJobs(function(result){
 *          //doSomething
 *      })
 * @param url -{String} 大数据服务地址。
 * @param options - {Object} 交互服务时所需可选参数
 */
SuperMap.REST.ProcessingJobsService = SuperMap.Class(ServiceBase, {

        initialize: function (url, options) {
            ServiceBase.prototype.initialize.apply(this, arguments);
            this.kernelDensityJobs = {};
            this.buildCacheJobs = {};
            this.summaryMeshJobs = {};
            this.queryJobs = {};
            this.summaryRegionJobs = {};
            this.vectorClipJobs = {};
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getKernelDensityJobs
         * @description 获取密度分析作业的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getKernelDensityJobs: function (callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            kernelDensityJobsService.getKernelDensityJobs();
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getKernelDensityJob
         * @description 获取某一个密度分析作业。
         * @param id - {String}空间分析作业的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getKernelDensityJob: function (id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            kernelDensityJobsService.getKernelDensityJob(id);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.addKernelDensityJob
         * @description 新建一个密度分析作业。
         * @param params -{SuperMap.KernelDensityJobParameter} 创建一个空间分析作业的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        addKernelDensityJob: function (params, callback, seconds, resultFormat) {
            var me = this,
                param = me._processParams(params),
                format = me._processFormat(resultFormat);
            var kernelDensityJobsService = new KernelDensityJobsService(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function (job) {
                        me.kernelDensityJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            kernelDensityJobsService.addKernelDensityJob(param, seconds);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getKernelDensityJobState
         * @description 获取密度分析作业的状态。
         * @param id - {String}密度分析作业的id。
         */
        getKernelDensityJobState: function (id) {
            return this.kernelDensityJobs[id];
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryMeshJobs
         * @description 获取格网聚合分析作业的列表。
         * @param callback - {function}  请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getSummaryMeshJobs: function (callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryMeshJobsService.getSummaryMeshJobs();
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryMeshJob
         * @description 获取某一个格网聚合分析作业。
         * @param id - {String}空间分析作业的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getSummaryMeshJob: function (id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryMeshJobsService.getSummaryMeshJob(id);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.addSummaryMeshJob
         * @description 新建一个格网聚合分析作业。
         * @param params - {SuperMap.SummaryMeshJobParameter} 格网聚合分析任务参数类。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        addSummaryMeshJob: function (params, callback, seconds, resultFormat) {
            var me = this,
                param = me._processParams(params),
                format = me._processFormat(resultFormat);
            var summaryMeshJobsService = new SummaryMeshJobsService(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function (job) {
                        me.summaryMeshJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            summaryMeshJobsService.addSummaryMeshJob(param, seconds);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryMeshJobState
         * @description 获取格网聚合分析作业的状态。
         * @param id - {String} 格网聚合分析作业的id。
         */
        getSummaryMeshJobState: function (id) {
            return this.summaryMeshJobs[id];
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getBuildCacheJobs
         * @description 获取生成地图缓存作业的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getBuildCacheJobs: function (callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var buildCacheJobsService = new BuildCacheJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            buildCacheJobsService.getBuildCacheJobs();
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getBuildCacheJob
         * @description 获取某一个生成地图缓存作业。
         * @param id - {String} 空间分析作业的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getBuildCacheJob: function (id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var buildCacheJobsService = new BuildCacheJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            buildCacheJobsService.getBuildCacheJob(id);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.addBuildCacheJob
         * @description 新建一个生成地图缓存作业。
         * @param params - {SuperMap.BuildCacheJobParameter} 地图缓存作业参数类
         * @param callback - {function} 请求结果的回调函数
         * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔
         * @param resultFormat -{SuperMap.DataFormat}返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        addBuildCacheJob: function (params, callback, seconds, resultFormat) {
            var me = this,
                param = me._processParams(params),
                format = me._processFormat(resultFormat);
            var buildCacheJobsService = new BuildCacheJobsService(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function (job) {
                        me.buildCacheJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            buildCacheJobsService.addBuildCacheJob(param, seconds);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getBuildCacheJobState
         * @description 获取生成地图缓存作业的状态。
         * @param id - {String}生成地图缓存作业的id。
         */
        getBuildCacheJobState: function (id) {
            return this.buildCacheJobs[id];
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getQueryJobs
         * @description 获取单对象查询分析作业的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getQueryJobs: function (callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            singleObjectQueryJobsService.getQueryJobs();
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getQueryJob
         * @description 获取某一个单对象查询分析作业。
         * @param id - {String}空间分析作业的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getQueryJob: function (id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            singleObjectQueryJobsService.getQueryJob(id);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.addQueryJob
         * @description 新建一个单对象查询分析作业。
         * @param params -{SuperMap.SingleObjectQueryJobsParameter} 创建一个空间分析作业的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        addQueryJob: function (params, callback, seconds, resultFormat) {
            var me = this,
                param = me._processParams(params),
                format = me._processFormat(resultFormat);
            var singleObjectQueryJobsService = new SingleObjectQueryJobsService(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function (job) {
                        me.queryJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            singleObjectQueryJobsService.addQueryJob(param, seconds);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getQueryJobState
         * @description 获取单对象查询分析作业的状态。
         * @param id - {String}单对象查询分析作业的id。
         */
        getQueryJobState: function (id) {
            return this.queryJobs[id];
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryRegionJobs
         * @description 获取范围分析作业的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getSummaryRegionJobs: function (callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryRegionJobsService.getSummaryRegionJobs();
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryRegionJob
         * @description 获取某一个范围分析作业。
         * @param id - {String}范围分析作业的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        getSummaryRegionJob: function (id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            summaryRegionJobsService.getSummaryRegionJob(id);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.addSummaryRegionJob
         * @description 新建一个范围分析作业。
         * @param params -{SuperMap.SummaryRegionJobParameter} 创建一个范围分析作业的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {SuperMap.REST.ProcessingJobsService}
         */
        addSummaryRegionJob: function (params, callback, seconds, resultFormat) {
            var me = this,
                param = me._processParams(params),
                format = me._processFormat(resultFormat);
            var summaryRegionJobsService = new SummaryRegionJobsService(me.url, {
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function (job) {
                        me.summaryRegionJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            summaryRegionJobsService.addSummaryRegionJob(param, seconds);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getSummaryRegionJobState
         * @description 获取范围分析作业的状态。
         * @param id - {String}范围分析作业的id。
         */
        getSummaryRegionJobState: function (id) {
            return this.summaryRegionJobs[id];
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getVectorClipJobs
         * @description 获取矢量裁剪分析作业的列表。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {L.supermap.ProcessingJobsService}
         */
        getVectorClipJobs: function (callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var vectorClipJobsService = new VectorClipJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            vectorClipJobsService.getVectorClipJobs();
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getVectorClipJob
         * @description 获取某一个矢量裁剪分析作业。
         * @param id - {String}空间分析作业的id。
         * @param callback - {function} 请求结果的回调函数。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {L.supermap.ProcessingJobsService}
         */
        getVectorClipJob: function (id, callback, resultFormat) {
            var me = this,
                format = me._processFormat(resultFormat);
            var vectorClipJobsService = new VectorClipJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback
                },
                format: format
            });
            vectorClipJobsService.getVectorClipJob(id);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.addVectorClipJob
         * @description 新建一个矢量裁剪分析作业。
         * @param params -{SuperMap.VectorClipJobsParameter} 创建一个空间分析作业的请求参数。
         * @param callback - {function} 请求结果的回调函数。
         * @param seconds - {Number} 开始创建作业后，获取创建成功结果的时间间隔。
         * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
         * @return {L.supermap.ProcessingJobsService}
         */
        addVectorClipJob: function (params, callback, seconds, resultFormat) {
            var me = this,
                param = me._processParams(params),
                format = me._processFormat(resultFormat);
            var vectorClipJobsService = new VectorClipJobsService(me.url, {
                serverType: me.serverType,
                eventListeners: {
                    scope: me,
                    processCompleted: callback,
                    processFailed: callback,
                    processRunning: function (job) {
                        me.vectorClipJobs[job.id] = job.state;
                    }
                },
                format: format
            });
            vectorClipJobsService.addVectorClipJob(param, seconds);
            return me;
        },

        /**
         * @function SuperMap.REST.ProcessingJobsService.prototype.getVectorClipJobState
         * @description 获取矢量裁剪分析作业的状态。
         * @param id - {String}矢量裁剪分析作业的id。
         */
        getVectorClipJobState: function (id) {
            return this.vectorClipJobs[id];
        },

        _processFormat: function (resultFormat) {
            return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
        },

        _processParams: function (params) {
            if (!params) {
                return {};
            }
            if (params.query) {
                params.query = params.query.toString();
            }
            if (params.bounds) {
                params.bounds = params.bounds.toString();
            }
            return params;
        }
    }
);

module.exports = SuperMap.REST.ProcessingJobsService;
