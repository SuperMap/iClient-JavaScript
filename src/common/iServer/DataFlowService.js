import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {Util} from '../commontypes/Util';
import {SecurityManager} from '../security/SecurityManager';

/**
 * @class SuperMap.DataFlowService
 * @category  iServer DataFlow
 * @classdesc 实时数据服务类
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 实时数据服务地址
 * @param options - {Object} 加载实时数据可选参数。如：<br>
 *        style - {function} 设置数据加载样式。<br>
 *        onEachFeature - {function} 设置每个数据加载popup等。<br>
 *        geometry - {Array<Object>} 设置增添的几何要素对象数组。
 *        excludeField - -{Object} 排除字段
 */
export class DataFlowService extends CommonServiceBase {


    constructor(url, options) {
        options = options || {};
        /*
         * @constant EVENT_TYPES
         * {Array<string>}
         * 此类支持的事件类型
         */
        options.EVENT_TYPES = ["broadcastSocketConnected", "broadcastSocketError", "broadcastFailed", "broadcastSuccessed", "subscribeSocketConnected", "subscribeSocketError", "messageSuccessed", "setFilterParamSuccessed"]
        super(url, options);

        /**
         * @member SuperMap.DataFlowService.prototype.geometry -{Aarry<Object>}
         * @description 设置增添的几何要素对象数组。
         */
        this.geometry = null;

        /**
         * @member SuperMap.DataFlowService.prototype.prjCoordSys -{Object}
         * @description 动态投影参数
         */
        this.prjCoordSys = null;

        /**
         * @member SuperMap.DataFlowService.prototype.excludeField -{Object}
         * @description 排除字段
         */
        this.excludeField = null;

        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }
        if (options) {
            Util.extend(me, options);
        }

        this.CLASS_NAME = "SuperMap.DataFlowService";
    }

    /**
     * @function SuperMap.DataFlowService.prototype.initBroadcast
     * @description 初始化广播
     * @return{SuperMap.DataFlowService}
     */
    initBroadcast() {
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
    }

    /**
     * @function SuperMap.DataFlowService.prototype.broadcast
     * @description 加载广播数据
     * @param geoJSONFeature {JSON} json格式的要素数据
     */
    broadcast(geoJSONFeature) {
        if (!this.broadcastWebSocket||!this.broadcastWebSocket.isOpen) {
            this.events.triggerEvent('broadcastFailed');
            return;
        }
        this.broadcastWebSocket.send(JSON.stringify(geoJSONFeature));
        this.events.triggerEvent('broadcastSuccessed');

    }

    /**
     * @function SuperMap.DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据
     * @return {this} this
     */
    initSubscribe() {
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
    }


    /**
     * @function SuperMap.DataFlowService.prototype.setExcludeField
     * @description 设置排除字段
     * @param excludeField - {Object} 排除字段
     * @return {this} this
     */
    setExcludeField(excludeField) {
        this.excludeField = excludeField;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    }

    /**
     * @function SuperMap.DataFlowService.prototype.setGeometry
     * @description 设置添加的几何要素数据
     * @param geometry - {Array<Object>} 设置增添的几何要素对象数组。
     * @return {this} this
     */
    setGeometry(geometry) {
        this.geometry = geometry;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    }

    /**
     * @function SuperMap.DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据
     */
    unSubscribe() {
        if (!this.subscribeWebSocket) {
            return;
        }
        this.subscribeWebSocket.close();
        this.subscribeWebSocket = null;
    }

    /**
     * @function SuperMap.DataFlowService.prototype.unBroadcast
     * @description 结束加载广播
     */
    unBroadcast() {
        if (!this.broadcastWebSocket) {
            return;
        }
        this.broadcastWebSocket.close();
        this.broadcastWebSocket = null;
    }

    /**
     * @function SuperMap.DataFlowService.prototype.destroy
     * @override
     */
    destroy() {
        CommonServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.geometry = null;
        me.prjCoordSys = null;
        me.excludeField = null;
        this.unBroadcast();
        this.unSubscribe();

    }


    _getFilterParams() {
        var filter = {
            filterParam: {
                prjCoordSys: this.prjCoordSys,
                excludeField: this.excludeField,
                geometry: this.geometry
            }
        };
        return Util.toJSON(filter);
    }


    _onMessage(e) {
        if (e.data && e.data.indexOf("filterParam") > 0) {
            var filterParam = JSON.parse(e.data);
            e.filterParam = filterParam;
            e.eventType = 'setFilterParamSuccessed';
            this.events.triggerEvent('setFilterParamSuccessed', e);
            return;
        }
        var feature = JSON.parse(e.data);
        e.featureResult = feature;
        e.eventType = 'messageSuccessed';
        this.events.triggerEvent('messageSuccessed', e);
    }


    _connect(url) {
        url = this._appendCredentials(url);
        if ("WebSocket" in window) {
            return new WebSocket(url);
        } else if ("MozWebSocket" in window) {
            var mozWebSocket = window.MozWebSocket;
            return new mozWebSocket(url);
        } else {
            console.log("no WebSocket");
            return null;
        }
    }

    _appendCredentials(url) {
        var token = SecurityManager.getToken(url);
        if (token) {
            url += "?token=" + token;
        }
        return url;
    }

}

SuperMap.DataFlowService = DataFlowService;