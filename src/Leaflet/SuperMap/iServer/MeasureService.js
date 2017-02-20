/**
 * Class: MeasureService
 * 量算服务服务类
 * 用法：
 *      L.superMap.measureService(url).measureDistance({
 *          geometry:xxx
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../../Core/iServer/MeasureService');

MeasureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);

    },

    /**
     * @param params:
     *      geometry,unit,prjCoordSys,distanceMode
     */
    measureDistance: function (params) {
        this.measure(params, 'DISTANCE');
        return this;
    },

    /**
     * @param params:
     *      geometry,unit,prjCoordSys,distanceMode
     */
    measureArea: function (params) {
        this.measure(params, 'AREA');
        return this;
    },

    measure: function (params, type) {
        if (!params) {
            return;
        }
        var me = this;
        if (params.geometry) {
            params.geometry = L.Util.toSuperMapGeometry(params.geometry);
        }
        var measureParam = new SuperMap.REST.MeasureParameters(params.geometry, params);
        var measureService = new SuperMap.REST.MeasureService(me.options.url, {
            measureMode: type,
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        measureService.processAsync(measureParam);
        return me;
    }
});

L.supermap.measureService = function (url, options) {
    return new MeasureService(url, options);
};

module.exports = L.supermap.measureService;