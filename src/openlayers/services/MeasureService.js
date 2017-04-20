/**
 * Class:MeasureService
 * 距离测量服务
 */
require('./ServiceBase');
require('../../common/iServer/MeasureService');

ol.supermap.MeasureService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.MeasureService, ol.supermap.ServiceBase);

ol.supermap.MeasureService.prototype.measureDistance = function (params) {
    this.measure(params, 'DISTANCE');
};

ol.supermap.MeasureService.prototype.measureArea = function (params) {
    this.measure(params, 'AREA');
};

ol.supermap.MeasureService.prototype.measure = function (params, type) {
    var me = this;
    var measureService = new SuperMap.REST.MeasureService(me.options.url, {
        measureMode: type,
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    measureService.processAsync(me._processParam(params));
    return me;
};

ol.supermap.MeasureService.prototype._processParam = function (params) {
    if (params && params.geometry) {
        params.geometry = ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
    }
    return params;
};
module.exports = ol.supermap.MeasureService;