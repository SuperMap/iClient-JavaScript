/*
 * Class: ThemeService
 * 地图信息服务类
 * 用法：
 *      new ol.supermap.ThemeService(url,{
 *            projection:projection
 *      }).getThemeInfo(params,function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var ThemeService = require('../../common/iServer/ThemeService');

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
ol.supermap.ThemeService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.ThemeService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.ThemeService.getThemeInfo
 * @description 获取专题图信息
 * @param params - {SuperMap.ThemeParameters} 专题图参数类
 * @param callback - {function} 回调函数
 * @return {ol.supermap.ThemeService}
 */
ol.supermap.ThemeService.prototype.getThemeInfo = function (params, callback) {
    var me = this;
    var themeService = new ThemeService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        }
    });
    themeService.processAsync(params);
    return me;
};

module.exports = ol.supermap.ThemeService;