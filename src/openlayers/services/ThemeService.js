import ol from 'openlayers/dist/ol-debug';
import ServiceBase from './ServiceBase';
import CommonThemeService from '../../common/iServer/ThemeService';
/**
 * @class ol.supermap.ThemeService
 * @description 专题图服务类
 * @augments ol.supermap.ServiceBase
 * @example
 * 用法：
 *      new ol.supermap.ThemeService(url,{
 *            projection:projection
 *      }).getThemeInfo(params,function(result){
 *           //doSomething
 *      });
 * @param url - {String} 服务的访问地址。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export default class ThemeService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.ThemeService.getThemeInfo
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