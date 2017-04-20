/**
 * Class: MapService
 * 地图信息服务类
 * 用法：
 *      L.superMap.mapService(url,{
 *            projection:projection
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../common/iServer/MapService');

MapService = ServiceBase.extend({
    options: {
        projection: null
    },
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
        var projection = "3857";
        if (options && options.projection && options.projection === "4326") {
            projection = "4326";
        }
        this.options.projection = new SuperMap.Projection(projection);

    },

    getMapStatus: function () {
        var me = this;
        var getMapStatusService = new SuperMap.REST.MapService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
        return me;
    }
});

L.supermap.mapService = function (url, options) {
    return new MapService(url, options);
};

module.exports = L.supermap.mapService;