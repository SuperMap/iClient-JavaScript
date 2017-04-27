/**
 * Class: ThemeService
 * 地图信息服务类
 * 用法：
 *      L.supermap.themeService(url,{
 *            projection:projection
 *      }).getThemeInfo(params,function(result){
 *           //doSomething
 *      });
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMapThemeService = require('../../common/iServer/ThemeService');
var ThemeService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    getThemeInfo: function (params, callback) {
        var me = this;
        var themeService = new SuperMapThemeService(me.options.url, {
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

L.supermap.themeService = function (url, options) {
    return new ThemeService(url, options);
};

module.exports = ThemeService;