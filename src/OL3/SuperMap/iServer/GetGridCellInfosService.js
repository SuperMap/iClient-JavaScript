/**
 * Class: GetGridCellInfosService
 * 数据栅格查询服务
 */
require('./ServiceBase');
require('../../../Core/iServer/GetGridCellInfosService');

ol.supermap.GetGridCellInfosService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.GetGridCellInfosService, ol.supermap.ServiceBase);

/**
 * @param params <GetGridCellInfosParameter>
 */
ol.supermap.GetGridCellInfosService.prototype.getGridCellInfos = function (params) {
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
};

module.exports = ol.supermap.GetGridCellInfosService;