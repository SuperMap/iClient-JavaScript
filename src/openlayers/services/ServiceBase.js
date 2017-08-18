import ol from 'openlayers/dist/ol-debug';
ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.ServiceBase
 * @classdesc ol.supermap的服务基类。
 * @param url - {string} 与客户端交互的服务地址。
 * @param options - {Object} 参数。<br>
 *        serverType -{SuperMap.ServerType} 服务来源 iServer|iPortal|online <br>
 * @extends ol.Observable{@linkdoc-openlayers/ol.Observable}
 */
export default class ServiceBase extends ol.Observable {
    constructor(url, options) {
        super(url, options);
        this.options = options || {};
        this.url = url;
        this.dispatchEvent({type: 'initialized', value: this});
    }
}
ol.supermap.ServiceBase = ServiceBase;