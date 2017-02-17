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
require('./ServiceBase');

FieldsServiceBase = ServiceBase.extend({
    options: {
        url: null,
        dataSourceName: null,
        dataSetName: null
    },
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this.options.dataSourceName = options.dataSourceName;
        this.options.dataSetName = options.dataSetName;
        L.setOptions(this, url, options);
    }
});

module.exports = function (url, options) {
    return new FieldsServiceBase(url, options);
};
