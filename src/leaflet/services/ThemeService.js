import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {ThemeService as SuperMapThemeService} from '@supermap/iclient-common';

/**
 * @class L.supermap.themeService
 * @classdesc 专题图服务类
 * @category  iServer Map Theme
 * @extends L.supermap.ServiceBase
 * @example
 * L.supermap.themeService(url,{
 *      projection:projection
 *  }).getThemeInfo(params,function(result){
 *      //doSomething
 * });
 * @param url - {string} 服务的访问地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。
 */
export var ThemeService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.themeService.prototype.getThemeInfo
     * @description 获取专题图信息
     * @param params - {SuperMap.ThemeParameters} 专题图参数类
     * @param callback - {function} 回调函数
     */
    getThemeInfo: function (params, callback) {
        var me = this;
        var themeService = new SuperMapThemeService(me.url, {
            proxy: me.options.proxy,
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