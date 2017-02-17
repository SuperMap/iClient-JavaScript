/**
 * L.SuperMap.QueryByBoundsService
 * 地图Bounds查询服务类
 */
require('./ServiceBase');
require('../../../Core/iServer/QueryByBoundsService');

ol.supermap.QueryByBoundsService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.options.name = options.name;
    var queryBounds = this.options.queryBounds = options.queryBounds;
    this.options.queryBounds = new SuperMap.Bounds(
        queryBounds[0],
        queryBounds[1],
        queryBounds[2],
        queryBounds[3]
    );
}
ol.inherits(ol.supermap.QueryByBoundsService, ol.supermap.ServiceBase);

ol.supermap.QueryByBoundsService.prototype.query = function () {
    var me = this;
    var queryParam, queryByBoundsParams, queryService;
    queryParam = new SuperMap.REST.FilterParameter({name: me.options.name});
    queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({
        queryParams: [queryParam],
        bounds: me.options.queryBounds
    });
    queryService = new SuperMap.REST.QueryByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryService.processAsync(queryByBoundsParams);
    return me;
}

module.exports = ol.supermap.QueryByBoundsService;