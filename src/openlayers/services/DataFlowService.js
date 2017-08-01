/**
 *@class DataFlowService
 */
var ol = require('openlayers/dist/ol-debug');
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var DataFlow = require('../../common/iServer/DataFlowService');
ol.supermap.DataFlowService = function (url, options) {
    options = options || {};
    if (options.projection) {
        this.options.prjCoordSys = new SuperMap.Projection(options.projection);
    }
    ServiceBase.call(this, url, options);
    this.dataFlow = new DataFlow(url, options);
    this.dataFlow.events.on({
        "broadcastSocketConnected": this._defaultEvent,
        "broadcastSocketError": this._defaultEvent,
        "broadcastFailed": this._defaultEvent,
        "broadcastSuccessed": this._defaultEvent,
        "subscribeSocketConnected": this._defaultEvent,
        "subscribeSocketError": this._defaultEvent,
        "messageSuccessed": this._defaultEvent,
        "setFilterParamSuccessed": this._defaultEvent,
        scope: this
    })
};
ol.inherits(ol.supermap.DataFlowService, ServiceBase);

ol.supermap.DataFlowService.prototype.initBroadcast = function () {
    this.dataFlow.initBroadcast();
    return this;
};
ol.supermap.DataFlowService.prototype.broadcast = function (obj) {
    this.dataFlow.broadcast(obj);
};
ol.supermap.DataFlowService.prototype.initSubscribe = function () {
    this.dataFlow.initSubscribe();
    return this;
};
ol.supermap.DataFlowService.prototype.setPrjCoordSys = function (prjCoordSys) {
    if (!prj) {
        return;
    }
    var prj = new SuperMap.Projection(options.projection);
    this.dataFlow.setPrjCoordSys(prj);
    this.options.prjCoordSys = prj;
    return this;
};
ol.supermap.DataFlowService.prototype.setExcludeField = function (excludeField) {
    this.dataFlow.setExcludeField(excludeField);
    this.options.excludeField = excludeField;
    return this;
};
ol.supermap.DataFlowService.prototype.setGeometry = function (geometry) {
    this.dataFlow.setGeometry(geometry);
    this.options.geometry = geometry;
    return this;
};
ol.supermap.DataFlowService.prototype.unSubscribe = function () {
    this.dataFlow.unSubscribe();
};
ol.supermap.DataFlowService.prototype.unBroadcast = function () {
    this.dataFlow.unBroadcast();
};
ol.supermap.DataFlowService.prototype._defaultEvent = function (e) {
    this.dispatchEvent({type: e.eventType || e.type, value: e});
};
module.exports = ol.supermap.DataFlowService;