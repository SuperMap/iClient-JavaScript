/**
 * Class: GridCellInfosService
 * 数据栅格查询服务
 * 用法：
 *      L.supermap.gridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var GetGridCellInfosService = require('../../common/iServer/GetGridCellInfosService');
var GridCellInfosService = ServiceBase.extend({

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
        var gridCellQueryService = new GetGridCellInfosService(me.url, {
            serverType: me.options.serverType,
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

module.exports = GridCellInfosService;