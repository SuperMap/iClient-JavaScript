/**
 * Class: ServiceBase
 * 服务基类
 */
require('../core/Base');
require('../../common/util/Request');
var ol = require('openlayers');

ol.supermap.ServiceBase = function (url, options) {
    ol.Observable.call(this);
    this.options = options || {};
    this.options.url = url;
    //服务来源 iServer|iPortal|online
    this.options.serverType = url;
    this.dispatchEvent(new ol.supermap.ResultEvent('initialized', this));
};
ol.inherits(ol.supermap.ServiceBase, ol.Observable);

ol.supermap.ResultEvent = function (type, opt_element) {
    ol.events.Event.call(this, type);
    this.result = opt_element;

};
ol.inherits(ol.supermap.ResultEvent, ol.events.Event);

module.exports = ol.supermap.ServiceBase;