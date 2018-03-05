import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {ThemeService as CommonThemeService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.ThemeService
 * @category  iServer Map Theme
 * @classdesc 专题图服务类 
 * @extends mapboxgl.supermap.ServiceBase
 * @example
 *      new mapboxgl.supermap.ThemeService(url,{
 *            projection:projection
 *      }).getThemeInfo(params,function(result){
 *           //doSomething
 *      });
 * @param url - {string} 服务的访问地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        serverType - {SuperMap.ServerType} 服务来源 iServer|iPortal|online
 */
export class ThemeService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.ThemeService.prototype.getThemeInfo
     * @description 获取专题图信息
     * @param params - {SuperMap.ThemeParameters} 专题图参数类
     * @param callback - {function} 回调函数
     */
    getThemeInfo(params, callback) {
        var me = this;
        var themeService = new CommonThemeService(me.url, {
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
}

mapboxgl.supermap.ThemeService = ThemeService;