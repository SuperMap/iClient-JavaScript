/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';

/**
 * @class ServiceBase
 * @category  iServer Core
 * @classdesc maplibregl.supermap 服务基类。
 * @version 11.1.0
 * @param {string} url - 服务地址。 
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @fires ServiceBase#initialized
 * @usage
 */
export class ServiceBase extends maplibregl.Evented {

    constructor(url, options) {
        super();
        this.options = options || {};
        this.url = url;
        /**
         * @event ServiceBase#initialized
         * @description 构造函数构造成功之后触发。
         * @property {Object} this - this 对象。
         */
        this.fire('initialized', this);
    }
}
