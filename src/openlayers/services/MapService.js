/**
 * Class: MapService
 * 地图信息服务类
 * 用法：
 *      new ol.superMap.MapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/MapService');

ol.supermap.MapService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.MapService, ol.supermap.ServiceBase);

/**
 * 地图信息查询服务
 * @param callback
 */
ol.supermap.MapService.prototype.getMapInfo = function (callback) {
    var me = this;
    var getMapStatusService = new SuperMap.REST.MapService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }, projection: me.options.projection
    });
    getMapStatusService.processAsync();
    return me;
};

/**
 * 切片列表信息查询服务
 * @param callback
 */
ol.supermap.MapService.prototype.getTilesets = function (callback) {
    var me = this;
    var tilesetsService = new SuperMap.REST.TilesetsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });

    tilesetsService.processAsync();
    return me;
};

module.exports = ol.supermap.MapService;