/**
 * Class:MeasureService
 * 距离测量服务
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var Util = require('../core/Util');
var MeasureService = require('../../common/iServer/MeasureService');

ol.supermap.MeasureService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.MeasureService, ol.supermap.ServiceBase);

ol.supermap.MeasureService.prototype.measureDistance = function (params, callback) {
    this.measure(params, 'DISTANCE', callback);
};

ol.supermap.MeasureService.prototype.measureArea = function (params, callback) {
    this.measure(params, 'AREA', callback);
};

ol.supermap.MeasureService.prototype.measure = function (params, type, callback) {
    var me = this;
    var measureService = new MeasureService(me.options.url, {
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