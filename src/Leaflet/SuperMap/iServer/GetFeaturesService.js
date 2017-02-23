/**
 * Class: GetFeaturesService
 * 数据集查询类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询
 * 用法：
 *      L.superMap.getFeaturesService(url).getFeaturesByIDs({
 *           dataSetNames:name,
 *           IDs:IDs
 *      }).on("complete",function(result){
 *          //doSomething
 *      }).on("failed",function(result){
 *          //doSomething
 *      });
 */
require('../../../Core/base');
require('../../../Core/iServer/GetFeaturesByIDsService');
require('../../../Core/iServer/GetFeaturesBySQLService');
require('../../../Core/iServer/GetFeaturesByBoundsService');
require('../../../Core/iServer/GetFeaturesByBufferService');
require('../../../Core/iServer/GetFeaturesByGeometryService');
require('./ServiceBase');

GetFeaturesService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 数据集ID查询服务
     * @param params:
     *    <GetFeaturesByIDsParameters>
     */
    getFeaturesByIDs: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByIDsService.processAsync(param);
        return me;

    },
    /**
     * 数据集Bounds查询服务
     * @param params:
     *    <GetFeaturesByBoundsParameters>
     */
    getFeaturesByBounds: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByBoundsService.processAsync(param);
        return me;
    },
    /**
     * 数据集Buffer查询服务
     * @param params:
     *    <GetFeaturesByBufferParameters>
     */
    getFeaturesByBuffer: function (params) {
        var me = this, param = me._processParams(params);
        var getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeatureService.processAsync(param);
        return me;
    },
    /**
     * 数据集SQL查询服务
     * @param params:
     *     <GetFeaturesBySQLParameters>
     */
    getFeaturesBySQL: function (params) {
        var me = this, param = me._processParams(params);
        var getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });

        getFeatureBySQLService.processAsync(param);
        return me;
    },
    /**
     * 数据集几何查询服务类
     * @param params:
     *   <GetFeaturesByGeometryParameters>
     */
    getFeaturesByGeometry: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByGeometryService.processAsync(param);
        return me;
    },
    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        params.fromIndex = params.fromIndex ? params.fromIndex : 0;
        params.toIndex = params.fromIndex ? params.fromIndex : -1;
        if (params.bounds && params.bounds instanceof L.LatLngBounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
        if (params.geometry) {
            params.geometry = L.Util.toSuperMapGeometry(params.geometry);
        }
        return params;
    }
});

L.supermap.getFeaturesService = function (url, options) {
    return new GetFeaturesService(url, options);
};

module.exports = L.supermap.getFeaturesService;
