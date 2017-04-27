/**
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
var ol = require('openlayers');
var ThemeService = require('../../common/iServer/ThemeService');

ol.supermap.ThemeService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.ThemeService, ol.supermap.ServiceBase);

ol.supermap.ThemeService.prototype.getThemeInfo = function (params, callback) {
    var me = this;
    var themeService = new ThemeService(me.options.url, {
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