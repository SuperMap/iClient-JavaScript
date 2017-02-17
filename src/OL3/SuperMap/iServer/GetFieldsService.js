/**
 * Class: GetFieldsService
 * 字段查询服务类
 */
require('./FieldsServiceBase');
require('../../../Core/iServer/GetFieldsService');

ol.supermap.GetFieldsService = function (url, options) {
    ol.supermap.FieldsServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.GetFieldsService, ol.supermap.FieldsServiceBase);

ol.supermap.GetFieldsService.prototype.getFields = function () {
    var me = this, getFieldsService;
    getFieldsService = new SuperMap.REST.GetFieldsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        datasource: me.options.dataSourceName,
        dataset: me.options.dataSetName
    });
    getFieldsService.processAsync();
    return me;
}
module.exports = ol.supermap.GetFieldsService;