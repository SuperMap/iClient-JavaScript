/**
 *@class DataFlowService
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var DataFlow = require('../../common/iServer/DataFlowService');
var DataFlowService = ServiceBase.extend({
    options: {
        geometry: null,
        prjCoordSys: null,
        excludeField: null,
    },

    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        if (options.projection) {
            this.options.prjCoordSys = new SuperMap.Projection(options.projection);
        }
        ServiceBase.prototype.initialize.call(this, url, options);
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
    },
    initBroadcast: function () {
        this.dataFlow.initBroadcast();
        return this;
    },
    broadcast: function (obj) {
        this.dataFlow.broadcast(obj);
    },
    initSubscribe: function () {
        this.dataFlow.initSubscribe();
        return this;
    },

    setPrjCoordSys: function (prjCoordSys) {
        if (!prj) {
            return;
        }
        var prj = new SuperMap.Projection(options.projection);
        this.dataFlow.setPrjCoordSys(prj);
        this.options.prjCoordSys = prj;
        return this;
    },
    setExcludeField: function (excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    },
    setGeometry: function (geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    },
    unSubscribe: function () {
        this.dataFlow.unSubscribe();
    },
    unBroadcast: function () {
        this.dataFlow.unBroadcast();
    },
    _defaultEvent: function (e) {
        this.fire(e.eventType || e.type, e);
    },
});

L.supermap.dataFlowService = function (url, options) {
    return new DataFlowService(url, options);
};

module.exports = DataFlowService;