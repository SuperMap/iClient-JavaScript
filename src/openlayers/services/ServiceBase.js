/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
/**
 * @namespace ol
 * @category BaseTypes Namespace
 */
/**
 * @namespace ol.supermap
 * @category BaseTypes Namespace
 */
/**
 * @namespace ol.source
 * @category BaseTypes Namespace
 */
ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.ServiceBase
 * @category iServer
 * @classdesc ol.supermap 的服务基类。
 * @param {string} url - 与客户端交互的服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
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