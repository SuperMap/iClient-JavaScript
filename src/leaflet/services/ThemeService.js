/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {ThemeService as SuperMapThemeService} from '@supermap/iclient-common';

/**
 * @class L.supermap.themeService
 * @classdesc 专题图服务类。
 * @category  iServer Map Theme
 * @extends {L.supermap.ServiceBase}
 * @example
 * L.supermap.themeService(url,{
 *      projection:projection
 *  }).getThemeInfo(params,function(result){
 *      //doSomething
 * });
 * @param {string} url - 服务的访问地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export var ThemeService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.themeService.prototype.getThemeInfo
     * @description 获取专题图信息。
     * @param {SuperMap.ThemeParameters} params - 专题图参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    getThemeInfo: function (params, callback) {
        var me = this;
        var themeService = new SuperMapThemeService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
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

L.supermap.themeService = themeService;