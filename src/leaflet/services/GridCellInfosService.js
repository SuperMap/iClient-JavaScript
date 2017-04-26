/**
 * Class: GridCellInfosService
 * 数据栅格查询服务
 * 用法：
 *      L.superMap.gridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/GetGridCellInfosService');

GridCellInfosService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },
    /**
     *
     * @param params
     * <SuperMap.GetGridCellInfosParameters>
     * @param callback
     */
    getGridCellInfos: function (params, callback) {
        if (!params) {
            return null;
        }
        var me = this;
        var gridCellQueryService = new SuperMap.REST.GetGridCellInfosService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        gridCellQueryService.processAsync(params);
        return me;
    }
});

L.supermap.gridCellInfosService = function (url, options) {
    return new GridCellInfosService(url, options);
};

module.exports = L.supermap.gridCellInfosService;