/**
 * Class: MapService
 * 地图信息服务类
 * 用法：
 *      var mapService = new ol.supermap.MapService(url, options);
 *      mapService.on("complete", function (serviceResult) {});
 *      mapService.on("failed", function (serviceResult) {});
 *      mapService.getMapStatus();
 */

require('./ServiceBase');
require('../../common/iServer/MapService');

ol.supermap.MapService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    var projection = "3857";
    if (options && options.projection && options.projection === "4326") {
        projection = "4326";
    }
    this.options.projection = new SuperMap.Projection(projection);
};
ol.inherits(ol.supermap.MapService, ol.supermap.ServiceBase);

ol.supermap.MapService.prototype.getMapStatus = function () {
    var me = this;
    var getMapStatusService = new SuperMap.REST.MapService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }, projection: me.options.projection
    });
    getMapStatusService.processAsync();
};

module.exports = ol.supermap.MapService;