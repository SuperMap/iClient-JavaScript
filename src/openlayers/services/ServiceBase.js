import ol from 'openlayers';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.ServiceBase
 * @category  iServer
 * @classdesc ol.supermap的服务基类。
 * @param url - {string} 与客户端交互的服务地址。
 * @param options - {Object} 参数。<br>
 *        proxy - {string} 服务代理地址<br>
 *        serverType -{SuperMap.ServerType} 服务来源 iServer|iPortal|online <br>
 * @extends ol.Observable{@linkdoc-openlayers/ol.Observable}
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