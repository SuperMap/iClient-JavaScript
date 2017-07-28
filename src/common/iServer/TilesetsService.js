/*
 * Class: SuperMap.TilesetsService
 * 切片列表信息查询服务类;即查询切片地图服务的切片列表，返回切片集名称、地图切片元数据信息、切片版本集信息
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */

require('./ServiceBase');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.TilesetsService
 * @description 切片列表信息查询服务类;即查询切片地图服务的切片列表，返回切片集名称、地图切片元数据信息、切片版本集信息
 * @augments SuperMap.ServiceBase
 * @param url - {String} 地图服务地址。URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{服务名}/rest/maps/map；<br>
 *                       例如: "http://localhost:8090/iserver/services/test/rest/maps/tianlocal";
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.TilesetsService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * @function SuperMap.TilesetsService.initialize
     * @description 切片列表信息查询服务类构造函数。
     * @param url - {String} 地图服务地址。URL应为：<br>
     *                        http://{服务器地址}:{服务端口号}/iserver/services/{服务名}/rest/maps/map；<br>
     *                       例如: "http://localhost:8090/iserver/services/test/rest/maps/tianlocal";
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.TilesetsService.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     */
    processAsync: function () {
        if (!this.url) {
            return;
        }
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);

        me.url = me.url + ((end === "/") ? "tilesets" : "/tilesets") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");

        me.request({
            method: "GET",
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.TilesetsService"
});

module.exports = SuperMap.TilesetsService;