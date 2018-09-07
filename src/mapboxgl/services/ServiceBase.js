/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';

/**
 * @class mapboxgl.supermap.ServiceBase
 * @category  iServer
 * @description mapboxgl.supermap 服务基类。
 * @param {string} url - 与客户端交互的服务地址。 
 * @param {Object} options - 可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export class ServiceBase extends mapboxgl.Evented {

    constructor(url, options) {
        super();
        this.options = options || {};
        this.url = url;
        this.fire('initialized', this);
    }
}

mapboxgl.supermap.ServiceBase = ServiceBase;