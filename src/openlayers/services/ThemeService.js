import ol from 'openlayers/dist/ol-debug';
import ServiceBase from './ServiceBase';
import CommonThemeService from '../../common/iServer/ThemeService';

/**
 * @class ol.supermap.ThemeService
 * @classdesc 专题图服务类
 * @extends ol.supermap.ServiceBase
 * @example
 *      new ol.supermap.ThemeService(url,{
 *            projection:projection
 *      }).getThemeInfo(params,function(result){
 *           //doSomething
 *      });
 * @param url - {string} 服务的访问地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        serverType - {SuperMap.ServerType} 服务来源 iServer|iPortal|online
 */
export default class ThemeService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.ThemeService.prototype.getThemeInfo
     * @description 获取专题图信息
     * @param params - {SuperMap.ThemeParameters} 专题图参数类
     * @param callback - {function} 回调函数
     * @return {ol.supermap.ThemeService}
     */
    getThemeInfo(params, callback) {
        var me = this;
        var themeService = new CommonThemeService(me.url, {
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
}
ol.supermap.ThemeService = ThemeService;