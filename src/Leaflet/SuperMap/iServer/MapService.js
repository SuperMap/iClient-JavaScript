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
require('../../base');
require('../../../Core/iServer/MapService');

MapService = L.Evented.extend({
    options: {
        url: null,
        projection: null
    },
    initialize: function (url, options) {
        this.options.url = url;
        var projection = "3857";
        if (options && options.projection && options.projection === "4326") {
            projection = "4326";
        }
        this.options.projection = new SuperMap.Projection(projection);
        L.setOptions(this, options);
        this._getMapStatus();
    },

    _getMapStatus: function () {
        var me = this;
        var getMapStatusService = new SuperMap.REST.MapService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
    },
    processCompleted: function (mapStatus) {
        this.fire('complete', {data:mapStatus.result});

    },
    processFailed: function (failedMessage) {
        this.fire('failed', failedMessage);
    }
});

L.supermap.mapService = function (url, options) {
    return new MapService(url, options);
};

module.exports = L.supermap.mapService;