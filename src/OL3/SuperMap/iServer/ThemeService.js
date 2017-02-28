/**
 * Class: ThemeService
 */
require('./ServiceBase');
require('../../../Core/iServer/ThemeService');

ol.supermap.ThemeService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.ThemeService, ol.supermap.ServiceBase);

ol.supermap.ThemeService.prototype.getThemeStatus = function (params) {
    var me = this;
    var themeService = new SuperMap.REST.ThemeService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    themeService.processAsync(params);
    return me;
}

module.exports = ol.supermap.ThemeService;