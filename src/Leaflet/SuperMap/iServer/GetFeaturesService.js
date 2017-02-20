/**
 * Class: GetFeaturesService
 * 数据集查询类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询
 * 用法：
 *      L.superMap.getFeaturesService(url).getFeaturesByIDs{
 *           dataSetNames:name,
 *           IDs:IDs
 *      }.on("complete",function(result){
 *          //doSomething like L.geoJSON(result.data[0]).addTo(map)
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
     *      IDs,getFeatureMode,fields,
     *      dataSetNames,returnContent,fromIndex,toIndex,returnCountOnly,maxFeatures
     */
    getFeaturesByIDs: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters(param);
        var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        return me;

    },
    /**
     * 数据集Bounds查询服务
     * @param params:
     *      bounds,spatialQueryMode ,attributeFilter,getFeatureMode,fields,
     *      dataSetNames,returnContent,fromIndex,toIndex,returnCountOnly,maxFeatures
     */
    getFeaturesByBounds: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByBoundsParameters = new SuperMap.REST.GetFeaturesByBoundsParameters(param);
        var getFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByBoundsService.processAsync(getFeaturesByBoundsParameters);
        return me;
    },
    /**
     * 数据集Buffer查询服务
     * @param params:
     *      bufferDistance,attributeFilter,geometry,fields,
     *      dataSetNames,returnContent,fromIndex,toIndex,returnCountOnly,maxFeatures
     */
    getFeaturesByBuffer: function (params) {
        var me = this, param = me._processParams(params);
        var getFeatureByBufferParameter = new SuperMap.REST.GetFeaturesByBufferParameters(param);
        var getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeatureService.processAsync(getFeatureByBufferParameter);
        return me;
    },
    /**
     * 数据集SQL查询服务
     * @param params:
     *      getFeatureMode,queryParameter,
     *      dataSetNames,returnContent,fromIndex,toIndex,returnCountOnly,maxFeatures
     */
    getFeaturesBySQL: function (params) {
        var me = this, param = me._processParams(params);
        param.queryParameter = new SuperMap.REST.FilterParameter(param);
        var getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters(param);
        var getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });

        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        return me;
    },
    /**
     * 数据集几何查询服务类
     * @param params:
     *      getFeatureMode,geometry,fields,attributeFilter,spatialQueryMode
     *      dataSetNames,returnContent,fromIndex,toIndex,returnCountOnly,maxFeatures
     */
    getFeaturesByGeometry: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters(param);
        var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
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
