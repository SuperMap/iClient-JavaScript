/*
 * Class: NetworkAnalyst3DService
 * 3D网络分析服务类
 * 用法：
 *      new ol.supermap.NetworkAnalyst3DService(url)
 *      .sinksFacilityAnalyst(params,function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var FacilityAnalystSinks3DService = require('../../common/iServer/FacilityAnalystSinks3DService');
var FacilityAnalystSources3DService = require('../../common/iServer/FacilityAnalystSources3DService');
var FacilityAnalystTraceup3DService = require('../../common/iServer/FacilityAnalystTraceup3DService');
var FacilityAnalystTracedown3DService = require('../../common/iServer/FacilityAnalystTracedown3DService');
var FacilityAnalystUpstream3DService = require('../../common/iServer/FacilityAnalystUpstream3DService');

/**
 * @class ol.supermap.NetworkAnalyst3DService
 * @description 3D网络分析服务类
 * @augments ol.supermap.ServiceBase
 * @example
 * 用法：
 *      new ol.supermap.NetworkAnalyst3DService(url)
 *      .sinksFacilityAnalyst(params,function(result){
 *           //doSomething
 *      })
 * @param url - {String} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象
 */
ol.supermap.NetworkAnalyst3DService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.NetworkAnalyst3DService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst
 * @description 汇查找服务
 * @param params - {FacilityAnalystSinks3DParameters} 最近设施分析参数类(汇查找资源)
 * @param callback - {function} 回调函数
 */
ol.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst = function (params, callback) {
    var me = this;
    var facilityAnalystSinks3DService = new FacilityAnalystSinks3DService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    facilityAnalystSinks3DService.processAsync(params);
    return me;
};

/**
 * @function ol.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst
 * @description 源查找服务
 * @param params -{FacilityAnalystSources3DParameters} 最近设施分析参数类(源查找服务)
 * @param callback - {function} 回调函数
 */
ol.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst = function (params, callback) {
    var me = this;
    var facilityAnalystSources3DService = new FacilityAnalystSources3DService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    facilityAnalystSources3DService.processAsync(params);
    return me;
};

/**
 * @function ol.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst
 * @description 上游追踪资源服务
 * @param params - {FacilityAnalystTraceup3DParameters} 上游追踪资源参数类
 * @param callback - {function} 回调函数
 */
ol.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst = function (params, callback) {
    var me = this;
    var facilityAnalystTraceup3DService = new FacilityAnalystTraceup3DService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    facilityAnalystTraceup3DService.processAsync(params);
    return me;
};

/**
 * @function ol.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst
 * @description 下游追踪资源服务
 * @param params - {FacilityAnalystTracedown3DParameters} 下游追踪资源服务参数类
 * @param callback - {function} 回调函数
 */
ol.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst = function (params, callback) {
    var me = this;
    var facilityAnalystTracedown3DService = new FacilityAnalystTracedown3DService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    facilityAnalystTracedown3DService.processAsync(params);
    return me;
};

/**
 * @function ol.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst
 * @description 上游关键设施查找服务
 * @param params -{FacilityAnalystUpstream3DParameters} 上游关键设施查找服务参数类
 * @param callback - {function} 回调函数
 */
ol.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst = function (params, callback) {
    var me = this;
    var facilityAnalystUpstream3DService = new FacilityAnalystUpstream3DService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    facilityAnalystUpstream3DService.processAsync(params);
    return me;
};

module.exports = ol.supermap.NetworkAnalyst3DService;