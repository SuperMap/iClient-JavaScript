/**
 * Class: GetFieldsService
 * 字段查询服务基类
 * 用法：
 *      L.superMap.getFieldsService(url,{
 *            projection:projection
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('../../base');

FieldsServiceBase = L.Evented.extend({
    options: {
        url: null,
        dataSourceName: null,
        dataSetName: null
    },
    initialize: function (url, options) {
        this.options.url = url;
        this.options.dataSourceName = options.dataSourceName;
        this.options.dataSetName = options.dataSetName;
        L.setOptions(this, url, options);
    },

    processCompleted: function (fieldsResult) {
        this.fire('complete', {data: fieldsResult.result});
    },

    processFailed: function (failedMessage) {
        this.fire('failed', failedMessage);
    }
});

module.exports = function (url, options) {
    return new GetFieldsService(url, options);
};
