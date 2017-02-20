/**
 * Class:MeasureService
 * 距离测量服务
 */
require('./ServiceBase');
require('../../../Core/iServer/MeasureService');

ol.supermap.MeasureService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.MeasureService, ol.supermap.ServiceBase);

ol.supermap.MeasureService.prototype.measureDistance = function (measureGeo) {
    this.measure(measureGeo, 'DISTANCE');
};

ol.supermap.MeasureService.prototype.measureArea = function (measureGeo) {
    this.measure(measureGeo, 'AREA');
};

ol.supermap.MeasureService.prototype.measure = function (measureGeo, type) {
    var me = this, geometry = me._processGeometry(measureGeo);
    var measureService = new SuperMap.REST.MeasureService(me.options.url, {
        measureMode: type,
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    measureService.processAsync(new SuperMap.REST.MeasureParameters(geometry));
    return me;
};

ol.supermap.MeasureService.prototype._processGeometry = function (measureGeo) {
    if (measureGeo) {
        measureGeo = ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(measureGeo)));
    }
    return measureGeo;
};
module.exports = ol.supermap.MeasureService;