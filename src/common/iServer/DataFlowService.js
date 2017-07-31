/**
 *@class SuperMap.DataFlowService
 */
require('./ServiceBase');
var SuperMap = require('../SuperMap');
SuperMap.DataFlowService = SuperMap.Class(SuperMap.ServiceBase, {
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型
     */
    EVENT_TYPES: ["broadcastSocketConnected", "broadcastSocketError", "broadcastFailed", "broadcastSuccessed", "subscribeSocketConnected", "subscribeSocketError", "messageSuccessed","setFilterParamSuccessed"],
    geometry: null,
    prjCoordSys: null,
    excludeField: null,

    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {
        } else {
            me.url += "/";
        }
    },
    /**
     * 初始化广播
     * @returns {SuperMap.DataFlowService}
     */
    initBroadcast: function () {
        var me = this;
        this.broadcastWebSocket = this._connect(me.url + 'broadcast');
        this.broadcastWebSocket.onopen = function (e) {
            me.broadcastWebSocket.isOpen = true;
            e.eventType = 'broadcastSocketConnected';
            me.events.triggerEvent('broadcastSocketConnected', e);
        };
        this.broadcastWebSocket.onclose = function (e) {
            me.broadcastWebSocket.isOpen = false;
            e.eventType = 'broadcastSocketConnected';
            me.events.triggerEvent('broadcastSocketConnected', e);
        };
        this.broadcastWebSocket.onerror = function (e) {
            e.eventType = 'broadcastSocketError';
            me.events.triggerEvent('broadcastSocketError', e);
        };
        return this;
    },
    broadcast: function (geoJSONFeature) {
        if (!this.broadcastWebSocket.isOpen) {
            this.events.triggerEvent('broadcastFailed');
            return;
        }
        this.broadcastWebSocket.send(JSON.stringify(geoJSONFeature));
        this.events.triggerEvent('broadcastSuccessed');

    },
    initSubscribe: function () {
        var me = this;
        this.subscribeWebSocket = this._connect(this.url + 'subscribe');
        this.subscribeWebSocket.onopen = function (e) {
            me.subscribeWebSocket.send(me._getFilterParams());
            e.eventType = 'subscribeSocketConnected';
            me.events.triggerEvent('subscribeSocketConnected', e);
        };
        this.subscribeWebSocket.onerror = function (e) {
            e.eventType = 'subscribeSocketError';
            me.events.triggerEvent('subscribeSocketError', e);
        };
        this.subscribeWebSocket.onmessage = function (e) {
            me._onMessage(e);
        };
        return this;
    },

    setPrjCoordSys: function (prjCoordSys) {
        this.prjCoordSys = prjCoordSys;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    },
    setExcludeField: function (excludeField) {
        this.excludeField = excludeField;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    },
    setGeometry: function (geometry) {
        this.geometry = geometry;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    },
    unSubscribe: function () {
        if (!this.subscribeWebSocket) {
            return;
        }
        this.subscribeWebSocket.close();
        this.subscribeWebSocket = null;
    },
    unBroadcast: function () {
        if (this.broadcastWebSocket) {
            return;
        }
        this.broadcastWebSocket.close();
        this.broadcastWebSocket = null;
    },
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.geometry = null;
        me.prjCoordSys = null;
        me.excludeField = null;
        this.unBroadcast();
        this.unSubscribe();

    },
    _getFilterParams: function () {
        var filter = {filterParam:{
            prjCoordSys: this.prjCoordSys,
            excludeField: this.excludeField,
            geometry: this.geometry}
        };
        return SuperMap.Util.toJSON(filter);
    },
    _onMessage: function (e) {
        if (e.data && e.data.indexOf("filterParam") > 0) {
            var filterParam = JSON.parse(e.data);
            e.filterParam = filterParam;
            e.eventType = 'setFilterParamSuccessed';
            this.events.triggerEvent('setFilterParamSuccessed', e);
            return;
        }
        var feature =JSON.parse(e.data);
        e.featureResult = feature;
        e.eventType = 'messageSuccessed';
        this.events.triggerEvent('messageSuccessed', e);
    },
    _connect: function (url) {
        if ("WebSocket" in window) {
            return new WebSocket(url);
        } else if ("MozWebSocket" in window) {
            return new MozWebSocket(url);
        } else {
            console.log("no WebSocket");
            return null;
        }
    },
    CLASS_NAME: "SuperMap.DataFlowService"
});

module.exports = SuperMap.DataFlowService;