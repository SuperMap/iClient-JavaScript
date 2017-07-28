/*
 * Class: MapService
 * 地图信息服务类
 * 用法：
 *      new ol.supermap.MapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 *      
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var MapService = require('../../common/iServer/MapService');
var TilesetsService = require('../../common/iServer/TilesetsService');
/**
 * @class ol.supermap.MapService
 * @description 地图信息服务类
 * @augments ol.supermap.ServiceBase
 * @param url -{String} 地图服务地址
 * @param options -{Object} 地图服务信息相关参数
 * @example
 *   new ol.supermap.MapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 */
ol.supermap.MapService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.MapService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.MapService.prototype.getMapInfo
 * @description 地图信息查询服务
 * @param callback -{function} 回调函数
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
 * @function ol.supermap.MapService.prototype.getTilesets
 * @description 切片列表信息查询服务
 * @param callback -{function} 回调函数
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