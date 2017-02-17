/**
 * Class: ServiceBase
 * 服务基类
 */
require('../../base');

ol.supermap.ServiceBase = function (url, options) {
    ol.Observable.call(this);
    this.options = options || {};
    this.options.url = url;
};
ol.inherits(ol.supermap.ServiceBase, ol.Observable);

ol.supermap.ServiceBase.prototype.processCompleted = function (serverResult) {
    this.dispatchEvent(new ol.Collection.Event('complete', {result: serverResult.result}));
};

ol.supermap.ServiceBase.prototype.processFailed = function (failedResult) {
    this.dispatchEvent(new ol.Collection.Event('failed', {error: failedResult.error}));
    console.log(failedResult.error.errorMsg);
};

module.exports = ol.supermap.ServiceBase;