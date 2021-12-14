/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";

/**
 * @class ServiceBase
 * @classdesc L.supermap 服务基类。
 * @category  iServer
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @fires ServiceBase#initialized
 * @fires ServiceBase#destroy
 * @extends {L.Evented}
 * @usage
 */
export var ServiceBase = L.Evented.extend({

    options: {
        url: null,

        proxy: null,

        withCredentials: false,
        crossOrigin: null
    },

    initialize: function (url, options) {
        if (url) {
            url = (url.indexOf("/") !== url.length - 1) ?
                url : url.substr(0, url.length - 1);
        }
        this.url = url;
        L.setOptions(this, options);
        /**
         * @event ServiceBase#initialized
         * @description 构造函数构造成功后触发。
         * @property {ServiceBase} this - this 对象。
         */
        this.fire("initialized", this);
    },

    /**
     * @function ServiceBase.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        /**
         * @event ServiceBase#destroy
         * @description 资源释放成功后触发。
         * @property {ServiceBase} this - this 对象。
         */
        this.fire("destroy", this);
    }

});