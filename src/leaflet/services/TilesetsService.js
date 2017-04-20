/**
 * Class:TilesetsService
 * 切片列表信息查询服务
 * 用法：
 *      L.superMap.tilesetsService(url).getTilesets()
 *      .on("complete",function(result){
 *          //doSomething
 *      }).on("failed",function(result){
 *          //doSomething
 *      });
 */
require('./ServiceBase');
require('../../common/iServer/TilesetsService');

TilesetsService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    getTilesets: function () {
        var me = this;
        var tilesetsService = new SuperMap.REST.TilesetsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });

        tilesetsService.processAsync();
        return me;
    }
});

L.supermap.tilesetsService = function (url, options) {
    return new TilesetsService(url, options);
};

module.exports = L.supermap.tilesetsService;
