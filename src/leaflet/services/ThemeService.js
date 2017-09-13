import L from "leaflet";
import {ServiceBase} from './ServiceBase';
import SuperMapThemeService from '../../common/iServer/ThemeService';
/**
 * @class L.supermap.themeService
 * @classdesc 专题图服务类
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
     * @return {this}
     */
    getThemeInfo: function (params, callback) {
        var me = this;
        var themeService = new SuperMapThemeService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        themeService.processAsync(params);
        return me;
    }
});

export var themeService = function (url, options) {
    return new ThemeService(url, options);
};

L.supermap.themeService = themeService;