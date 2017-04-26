/**
 * Class: ThemeService
 * 地图信息服务类
 * 用法：
 *      L.superMap.themeService(url,{
 *            projection:projection
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../common/iServer/ThemeService');
ThemeService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    getThemeInfo: function (params, callback) {
        var me = this;
        var themeService = new SuperMap.REST.ThemeService(me.options.url, {
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

module.exports = L.supermap.ThemeService;