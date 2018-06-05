import ol from 'openlayers';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.ServiceBase
 * @category  iServer
 * @classdesc ol.supermap的服务基类。
 * @param {Object} options - 参数。
 * @param {string} options.url - 与客户端交互的服务地址。
 * @param {string} options.proxy - 服务代理地址
 * @param {SuperMap.ServerType} options.serverType - 服务来源 iServer|iPortal|online
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 * @extends {ol.Observable}
 */
export class ServiceBase extends ol.Observable {
    constructor(url, options) {
        super(url, options);
        this.options = options || {};
        this.url = url;
        this.dispatchEvent({type: 'initialized', value: this});
    }
}
ol.supermap.ServiceBase = ServiceBase;