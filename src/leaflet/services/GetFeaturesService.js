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
require('../../common/iServer/GetFeaturesByIDsService');
require('../../common/iServer/GetFeaturesBySQLService');
require('../../common/iServer/GetFeaturesByBoundsService');
require('../../common/iServer/GetFeaturesByBufferService');
require('../../common/iServer/GetFeaturesByGeometryService');
require('./ServiceBase');

GetFeaturesService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 数据集ID查询服务
     * @param params:
     *    <GetFeaturesByIDsParameters>
     * @param resultFormat
     */
    getFeaturesByIDs: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        getFeaturesByIDsService.processAsync(param);
        return me;

    },
    /**
     * 数据集Bounds查询服务
     * @param params:
     *    <GetFeaturesByBoundsParameters>
     * @param resultFormat
     */
    getFeaturesByBounds: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var getFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        getFeaturesByBoundsService.processAsync(param);
        return me;
    },
    /**
     * 数据集Buffer查询服务
     * @param params:
     *    <GetFeaturesByBufferParameters>
     * @param resultFormat
     */
    getFeaturesByBuffer: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });
        getFeatureService.processAsync(param);
        return me;
    },
    /**
     * 数据集SQL查询服务
     * @param params:
     *     <GetFeaturesBySQLParameters>
     * @param resultFormat
     */
    getFeaturesBySQL: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });

        getFeatureBySQLService.processAsync(param);
        return me;
    },
    /**
     * 数据集几何查询服务类
     * @param params:
     *   <GetFeaturesByGeometryParameters>
     * @param resultFormat
     */
    getFeaturesByGeometry: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
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
    },
    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.Format.GEOJSON;
    }
});

L.supermap.getFeaturesService = function (url, options) {
    return new GetFeaturesService(url, options);
};

module.exports = L.supermap.getFeaturesService;
