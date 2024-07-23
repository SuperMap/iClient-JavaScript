/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import Observable from 'ol/Observable';

/**
 * @class ServiceBase
 * @category iServer Core
 * @classdesc ol.supermap 的服务基类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {ol.Observable}
 * @usage
 */
export class ServiceBase extends Observable {
    constructor(url, options) {
        super(url, options);
        this.options = options || {};
        this.url = url;
        this.dispatchEvent({type: 'initialized', value: this});
    }
}
