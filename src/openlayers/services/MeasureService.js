/*
 * Class:MeasureService
 * 距离测量服务
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var Util = require('../core/Util');
var MeasureService = require('../../common/iServer/MeasureService');
/**
 * @class ol.supermap.MeasureService
 * @description 距离测量服务
 * @augments ol.supermap.ServiceBase
 * @param url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 *         measureMode - {MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
 */
ol.supermap.MeasureService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.MeasureService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.MeasureService.measureDistance
 * @description 测距
 * @param params -{MeasureParameters} 测量相关参数类
 * @param callback - {function} 回调函数
 */
ol.supermap.MeasureService.prototype.measureDistance = function (params, callback) {
    this.measure(params, 'DISTANCE', callback);
};

/**
 * @function ol.supermap.MeasureService.measureArea
 * @description 测面积
 * @param params -{MeasureParameters} 测量相关参数类
 * @param callback - {function} 回调函数
 */
ol.supermap.MeasureService.prototype.measureArea = function (params, callback) {
    this.measure(params, 'AREA', callback);
};

ol.supermap.MeasureService.prototype.measure = function (params, type, callback) {
    var me = this;
    var measureService = new MeasureService(me.url, {
        serverType: me.options.serverType,
        measureMode: type,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    measureService.processAsync(me._processParam(params));
    return me;
};

ol.supermap.MeasureService.prototype._processParam = function (params) {
    if (params && params.geometry) {
        params.geometry = Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
    }
    return params;
};
module.exports = ol.supermap.MeasureService;