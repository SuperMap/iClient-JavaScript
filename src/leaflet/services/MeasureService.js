/*
 * Class: MeasureService
 * 量算服务服务类
 * 用法：
 *      L.supermap.measureService(url).measureDistance({
 *          geometry:xxx
 *      },function(result){
 *           //doSomething
 *      })
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var Util = require('../core/Util');
var SuperMapMeasureService = require('../../common/iServer/MeasureService');
/**
 * @class L.supermap.MeasureService
 * @description 量算服务服务类
 * @augments L.supermap.ServiceBase
 * @example
 * 用法：
 *     L.supermap.measureService(url).measureDistance({
 *          geometry:xxx
 *      },function(result){
 *           //doSomething
 *      })
 * @param url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 *         measureMode - {MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
 */
var MeasureService = ServiceBase.extend({
    /**
     * @function L.supermap.MeasureService.initialize
     * @param url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     *         measureMode - {MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.MeasureService.measureDistance
     * @description 测距
     * @param params -{MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureDistance: function (params, callback) {
        this.measure(SuperMap.MeasureMode.DISTANCE, params, callback);
        return this;
    },

    /**
     * @function L.supermap.MeasureService.measureArea
     * @description 测面积
     * @param params -{MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureArea: function (params, callback) {
        this.measure(SuperMap.MeasureMode.AREA, params, callback);
        return this;
    },

    /*
     * @function L.supermap.MeasureService.
     * @param params -{MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measure: function (type, params, callback) {
        if (!params) {
            return;
        }
        var me = this;
        if (params.geometry) {
            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        var measureService = new SuperMapMeasureService(me.url, {
            serverType: me.options.serverType,
            measureMode: type,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        measureService.processAsync(params);
        return me;
    }
});

L.supermap.measureService = function (url, options) {
    return new MeasureService(url, options);
};

module.exports = MeasureService;