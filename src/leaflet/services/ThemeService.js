/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import '../core/Base';
import { ThemeService as SuperMapThemeService } from '@supermap/iclient-common/iServer/ThemeService';

/**
 * @class ThemeService
 * @deprecatedclassinstance L.supermap.themeService
 * @classdesc 专题图服务类。
 * @category  iServer Map Theme
 * @extends {ServiceBase}
 * @example
 * new ThemeService(url,{
 *      projection:projection
 *  }).getThemeInfo(params,function(result){
 *      //doSomething
 * });
 * @param {string} url - 服务的访问地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var ThemeService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function ThemeService.prototype.getThemeInfo
     * @description 获取专题图信息。
     * @param {ThemeParameters} params - 专题图参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    getThemeInfo: function (params, callback) {
        var me = this;
        var themeService = new SuperMapThemeService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        themeService.processAsync(params);
    }
});

export var themeService = function (url, options) {
    return new ThemeService(url, options);
};
