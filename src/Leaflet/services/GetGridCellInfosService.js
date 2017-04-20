/**
 * Class: GetGridCellInfosService
 * 数据栅格查询服务
 * 用法：
 *      L.superMap.getGridCellInfosService(url).getGridCellInfos({
 *            datasetName:xxx,dataSourceName:xxx,X:xxx,y:xxx
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../common/iServer/GetGridCellInfosService');

GetGridCellInfosService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },
    /**
     * @param params:
     *    <GetGridCellInfosParameters>
     */

    getGridCellInfos: function (params) {
        if (!params) {
            return null;
        }
        var me = this;
        var gridCellQueryService = new SuperMap.REST.GetGridCellInfosService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        gridCellQueryService.processAsync(params);
        return me;
    }
});

L.supermap.getGridCellInfosService = function (url, options) {
    return new GetGridCellInfosService(url, options);
};

module.exports = L.supermap.getGridCellInfosService;