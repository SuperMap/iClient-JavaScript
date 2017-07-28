/**
 * @class L.supermap.mapService
 * @constructs L.supermap.mapService
 * @extends {ServiceBase}
 * @classdesc
 * 地图信息服务类
 * @example  用法：
 * L.supermap.mapService(url)
 *   .getMapInfo(function(result){
 *    //doSomething
 *  })
 * @api
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var SuperMapMapService = require('../../common/iServer/MapService');
var TilesetsService = require('../../common/iServer/TilesetsService');
var MapService = ServiceBase.extend({
    options: {
        projection: null
    },

    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        if (options.projection) {
            this.options.projection = options = new SuperMap.Projection(options.projection);
        }
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @method L.supermap.mapService.getMapInfo
     * @description 地图信息查询服务
     * @param callback
     */
    getMapInfo: function (callback) {
        var me = this;
        var getMapStatusService = new SuperMapMapService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
        return me;
    },

    /**
     * @method L.supermap.mapService.getTilesets
     * @description 切片列表信息查询服务
     * @param callback
     */
    getTilesets: function (callback) {
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
    }
});

L.supermap.mapService = function (url, options) {
    return new MapService(url, options);
};

module.exports = MapService;