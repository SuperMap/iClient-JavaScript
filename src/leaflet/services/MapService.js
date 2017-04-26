/**
 * Class: MapService
 * 地图信息服务类
 * 用法：
 *      L.superMap.mapService(url)
 *      .getMapStatus(function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/MapService');

MapService = ServiceBase.extend({
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
     * 地图信息查询服务
     * @param callback
     */
    getMapInfo: function (callback) {
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
    },

    /**
     * 切片列表信息查询服务
     * @param callback
     */
    getTilesets: function (callback) {
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
    }
});

L.supermap.mapService = function (url, options) {
    return new MapService(url, options);
};

module.exports = L.supermap.mapService;