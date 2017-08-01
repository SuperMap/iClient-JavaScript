require('../core/Base');
require('../../common/util/FetchRequest');

/**
 * @class ol.supermap.ServiceBase
 * @description ol.supermap的服务基类。
 * @param url - {String} 与客户端交互的服务地址。
 * @param options - {Object} 参数。
 */
var ol = require('openlayers/dist/ol-debug');

ol.supermap.ServiceBase = function (url, options) {
    ol.Observable.call(this);
    this.options = options || {};
    this.url = url;
    //服务来源 iServer|iPortal|online
    this.options.serverType = url;
    this.dispatchEvent({type:'initialized',value:this});
};
ol.inherits(ol.supermap.ServiceBase, ol.Observable);


module.exports = ol.supermap.ServiceBase;