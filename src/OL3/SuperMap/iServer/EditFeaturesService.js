/**
 * Class: EditFeaturesService
 * 数据服务中数据集添加、更新、删除服务类
 */
require('./ServiceBase');
require('../../../Core/iServer/EditFeaturesService');

ol.supermap.EditFeaturesService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.EditFeaturesService, ol.supermap.ServiceBase);

/**
 * @param params:
 * features(目前只支持GeoJSON格式的features)
 * editType，IDs，returnContent，isUseBatch
 */
ol.supermap.EditFeaturesService.prototype.editFeatures = function (params) {
    var me = this, param = me._processParams(params);
    var editFeatureParameter = new SuperMap.REST.EditFeaturesParameters(param);
    editFeatureService = new SuperMap.REST.EditFeaturesService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    editFeatureService.processAsync(editFeatureParameter);
    return me;
};

ol.supermap.EditFeaturesService.prototype._processParams = function (params) {
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
        if ((Object.prototype.toString.call(params.features) === '[object Array]')) {
            params.features.map(function (feature) {
                features.push(me._createServerFeature(feature));
            });
        } else {
            features.push(me._createServerFeature(params.features));
        }
        params.features = features;
    }
    return params;
};

ol.supermap.EditFeaturesService.prototype._createServerFeature = function (geoFeature) {
    var geoJSONFeature, feature = {}, fieldNames = [], fieldValues = [];
    geoJSONFeature = JSON.parse((new ol.format.GeoJSON()).writeGeometry(geoFeature));
    for (var key in geoJSONFeature) {
        fieldNames.push(key);
        fieldValues.push(geoJSONFeature[key]);
    }
    feature.fieldNames = fieldNames;
    feature.fieldValues = fieldValues;
    feature.geometry = ol.supermap.Util.toSuperMapGeometry(geoJSONFeature);
    return feature;
};

module.exports = ol.supermap.EditFeaturesService;