/**
 * Class: GridCellInfosService
 * 数据栅格查询服务
 * 用法：
 *      new ol.superMap.GridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/GetGridCellInfosService');

ol.supermap.GridCellInfosService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.GridCellInfosService, ol.supermap.ServiceBase);

/**
 * @param params
 * <SuperMap.GetGridCellInfosParameters>
 * @param callback
 */
ol.supermap.GridCellInfosService.prototype.getGridCellInfos = function (params, callback) {
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
};

module.exports = ol.supermap.GridCellInfosService;