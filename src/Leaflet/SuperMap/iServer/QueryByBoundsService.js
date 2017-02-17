/**
 * L.SuperMap.QueryByBoundsService
 * 地图Bounds查询服务类
 * 用法：
 *      L.superMap.QueryByBoundsService(url,{
 *           name:name,
 *           queryBounds:bounds
 *      }).on("complete",function(result){
 *          //doSomething like L.geoJSON(result.data[0]).addTo(map)
 *      }).on("failed",function(result){
 *          //doSomething
 *      });
 */
require('./ServiceBase');
require('../../../Core/iServer/QueryByBoundsService');

QueryByBoundsService = ServiceBase.extend({
    options: {
        name: null,//图层名称。格式：数据集名称@数据源别名）
        queryBounds: null
    },

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
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
    },

    //返回数据格式统一处理为geoJSON格式
    query: function () {
        var me = this;
        var queryParam, queryByBoundsParams, queryService;
        queryParam = new SuperMap.REST.FilterParameter({name: me.options.name});
        queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({queryParams: [queryParam], bounds: me.options.queryBounds});
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
});

L.supermap.queryByBoundsService = function (url, options) {
    return new QueryByBoundsService(url, options);
};

module.exports = L.supermap.queryByBoundsService;
