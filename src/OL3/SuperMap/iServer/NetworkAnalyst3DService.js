/**
 * Class: NetworkAnalyst3DService
 * 3D网络分析服务类
 */
require('../../../Core/iServer/FacilityAnalystSinks3DService');
require('../../../Core/iServer/FacilityAnalystSources3DService');
require('../../../Core/iServer/FacilityAnalystTraceup3DService');
require('../../../Core/iServer/FacilityAnalystTracedown3DService');
require('../../../Core/iServer/FacilityAnalystUpstream3DService');
require('./ServiceBase');

ol.supermap.NetworkAnalyst3DService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.NetworkAnalyst3DService, ol.supermap.ServiceBase);

ol.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystSinks3DParams = new SuperMap.REST.FacilityAnalystSinks3DParameters(param);
    var facilityAnalystSinks3DService = new SuperMap.REST.FacilityAnalystSinks3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystSinks3DService.processAsync(facilityAnalystSinks3DParams);
    return me;
};

ol.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystSources3DParams = new SuperMap.REST.FacilityAnalystSources3DParameters(param);
    var facilityAnalystSources3DService = new SuperMap.REST.FacilityAnalystSources3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystSources3DService.processAsync(facilityAnalystSources3DParams);
    return me;
};

ol.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystTraceup3DParams = new SuperMap.REST.FacilityAnalystTraceup3DParameters(param);
    var facilityAnalystTraceup3DService = new SuperMap.REST.FacilityAnalystTraceup3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystTraceup3DService.processAsync(facilityAnalystTraceup3DParams);
    return me;
};

ol.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystTracedown3DParames = new SuperMap.REST.FacilityAnalystTracedown3DParameters(param);
    var facilityAnalystTracedown3DService = new SuperMap.REST.FacilityAnalystTracedown3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystTracedown3DService.processAsync(facilityAnalystTracedown3DParames);
    return me;
};

ol.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst = function (params) {
    var me = this;
    var facilityAnalystUpstream3DParams = new SuperMap.REST.FacilityAnalystUpstream3DParameters(param);
    var facilityAnalystUpstream3DService = new SuperMap.REST.FacilityAnalystUpstream3DService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    facilityAnalystUpstream3DService.processAsync(facilityAnalystUpstream3DParams);
    return me;
};

module.exports = ol.supermap.NetworkAnalyst3DService;