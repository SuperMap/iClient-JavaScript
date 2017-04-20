/**
 * Class: GetFieldsService
 * 字段查询服务类
 * 用法：
 *      L.superMap.getFieldsService(url,{
 *            projection:projection
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./FieldsServiceBase');
require('../../common/iServer/GetFieldsService');

GetFieldsService = FieldsServiceBase.extend({

    initialize: function (url, options) {
        FieldsServiceBase.prototype.initialize.call(this, url, options);
    },

    getFields: function () {
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
});

L.supermap.getFieldsService = function (url, options) {
    return new GetFieldsService(url, options);
};

module.exports = L.supermap.getFieldsService;