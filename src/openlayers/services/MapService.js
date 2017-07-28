/**
 * @class ol.supermap.MapService
 * @constructs ol.supermap.MapService
 * @classdesc
 * 地图信息服务类
 * @example 用法：
 *      new ol.superMap.MapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 * @api
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var MapService = require('../../common/iServer/MapService');
var TilesetsService = require('../../common/iServer/TilesetsService');
ol.supermap.MapService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.MapService, ol.supermap.ServiceBase);

/**
 * @method ol.supermap.MapService.prototype.getMapInfo
 * @description 地图信息查询服务
 * @param callback
 */
ol.supermap.MapService.prototype.getMapInfo = function (callback) {
    var me = this;
    var getMapStatusService = new MapService(me.url, {
        serverType: me.options.serverType,
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
 * @method ol.supermap.MapService.prototype.getTilesets
 * @description 切片列表信息查询服务
 * @param callback
 */
ol.supermap.MapService.prototype.getTilesets = function (callback) {
    var me = this;
    var tilesetsService = new TilesetsService(me.url, {
        serverType: me.options.serverType,
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