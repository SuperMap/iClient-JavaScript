/**
 * Class: NetworkAnalyst3DService
 * 3D网络分析服务类
 */
require('./ServiceBase');
require('../../common/iServer/FacilityAnalystSinks3DService');
require('../../common/iServer/FacilityAnalystSources3DService');
require('../../common/iServer/FacilityAnalystTraceup3DService');
require('../../common/iServer/FacilityAnalystTracedown3DService');
require('../../common/iServer/FacilityAnalystUpstream3DService');

ol.supermap.NetworkAnalyst3DService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.NetworkAnalyst3DService, ol.supermap.ServiceBase);

/**
 * 汇查找服务
 * @param params {FacilityAnalystSinks3DParameters}
 */
ol.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystSinks3DService = new SuperMap.REST.FacilityAnalystSinks3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystSinks3DService.processAsync(params);
    return me;
};

/**
 * 源查找服务
 * @param params {FacilityAnalystSources3DParameters}
 */
ol.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystSources3DService = new SuperMap.REST.FacilityAnalystSources3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystSources3DService.processAsync(params);
    return me;
};

/**
 * 上游追踪资源服务
 * @param params {FacilityAnalystTraceup3DParameters}
 */
ol.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystTraceup3DService = new SuperMap.REST.FacilityAnalystTraceup3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystTraceup3DService.processAsync(params);
    return me;
};

/**
 * 下游追踪资源服务
 * @param params {FacilityAnalystTracedown3DParameters}
 */
ol.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystTracedown3DService = new SuperMap.REST.FacilityAnalystTracedown3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystTracedown3DService.processAsync(params);
    return me;
};

/**
 * 上游关键设施查找服务
 * @param params {FacilityAnalystUpstream3DParameters}
 */
ol.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystUpstream3DService = new SuperMap.REST.FacilityAnalystUpstream3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystUpstream3DService.processAsync(params);
    return me;
};

module.exports = ol.supermap.NetworkAnalyst3DService;