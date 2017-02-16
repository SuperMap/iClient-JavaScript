/**
 * Class: GetFieldsService
 * 字段查询服务基类
 */
require('./ServiceBase');

ol.supermap.FieldsServiceBase = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.options.dataSourceName = options.dataSourceName;
    this.options.dataSetName = options.dataSetName;
}
ol.inherits(ol.supermap.FieldsServiceBase, ol.supermap.ServiceBase);

module.exports = ol.supermap.FieldsServiceBase;
