/**
 * L.SuperMap.QueryByBoundsService
 * 地图Bounds查询服务类
 */
require('./ServiceBase');
require('../../../Core/iServer/QueryByBoundsService');

ol.supermap.QueryByBoundsService = function (url, options) {
    this.options.name = null;
    this.options.queryBounds = null;
    ol.supermap.ServiceBase.call(this, url, options);
    this.options.name = options.name;
    var queryBounds = this.options.queryBounds = options.queryBounds;
    if (queryBounds instanceof L.LatLngBounds) {
        this.options.queryBounds = new SuperMap.Bounds(
            queryBounds.getSouthWest().lng,
            queryBounds.getSouthWest().lat,
            queryBounds.getNorthEast().lng,
            queryBounds.getNorthEast().lat
        );
    }
}

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
ol.inherits(ol.supermap.QueryByBoundsService, ol.supermap.ServiceBase);

module.exports = ol.supermap.QueryByBoundsService;