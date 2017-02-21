/**
 * Class:TilesetsService
 * 切片列表信息查询服务
 */
require('./ServiceBase');
require('../../../Core/iServer/TilesetsService');

ol.supermap.TilesetsService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.TilesetsService, ol.supermap.ServiceBase);

ol.supermap.ChartQueryService.prototype.getTilesets = function () {
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
module.exports = ol.supermap.TilesetsService;