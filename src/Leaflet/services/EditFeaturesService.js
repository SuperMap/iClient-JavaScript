/**
 * Class: EditFeaturesService
 * 地物编辑服务类
 * 用法：
 *      L.superMap.editFeaturesService(url).editFeatures({
 *          features:{},
 *          editType:"add"
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */

require('../../common/iServer/EditFeaturesService');
require('./ServiceBase');

EditFeaturesService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @param params:
     *  <EditFeaturesParameters>
     */
    editFeatures: function (params) {
        var me = this, param = me._processParams(params);
        editFeatureService = new SuperMap.REST.EditFeaturesService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        editFeatureService.processAsync(param);
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        var me = this;
        params.returnContent = (params.returnContent == null) ? false : params.returnContent;
        params.isUseBatch = (params.isUseBatch == null) ? false : params.isUseBatch;

        if (params.editType) {
            params.editType = params.editType.toLowerCase();
        }

        if (params.features) {
            var features = [];
            if (L.Util.isArray(params.features)) {
                params.features.map(function (feature) {
                    features.push(me._createServerFeature(feature));
                });
            } else {
                features.push(me._createServerFeature(params.features));
            }
            params.features = features;
        }
        return params;
    },

    _createServerFeature: function (geoFeature) {
        var geoJSONFeature, feature = {}, fieldNames = [], fieldValues = [];
        geoJSONFeature = geoFeature.toGeoJSON();
        for (var key in geoJSONFeature.properties) {
            fieldNames.push(key);
            fieldValues.push(geoJSONFeature.properties[key]);
        }
        feature.fieldNames = fieldNames;
        feature.fieldValues = fieldValues;
        feature.geometry = L.Util.toSuperMapGeometry(geoJSONFeature);
        return feature;
    }
});

L.supermap.editFeaturesService = function (url, options) {
    return new EditFeaturesService(url, options);
};

module.exports = L.supermap.editFeaturesService;