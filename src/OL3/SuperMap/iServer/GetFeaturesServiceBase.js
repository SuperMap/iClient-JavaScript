/**
 * Class: GetFeaturesServiceBase
 * 数据集查询基类。
 */
require('./ServiceBase');

ol.supermap.GetFeaturesServiceBase = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.options.dataSetNames = options.dataSetNames;
    this.options.returnContent = options.returnContent ? options.returnContent : true;
    this.options.fromIndex = options.fromIndex ? options.fromIndex : 0;
    this.options.toIndex = options.toIndex ? options.toIndex : -1;
}
ol.inherits(ol.supermap.GetFeaturesServiceBase, ol.supermap.ServiceBase);

module.exports = ol.supermap.GetFeaturesServiceBase;
