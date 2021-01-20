/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import L from "leaflet";
import '../../core/Base';
import { GetFeaturesByIDsParameters, GetFeaturesBySQLParameters, GetFeaturesByBoundsParameters, GetFeaturesByBufferParameters, GetFeaturesByGeometryParameters } from '@supermap/iclient-common';

/**
 * @class L.supermap.components.dataServiceQueryViewModel
 * @classdesc 数据服务查询组件功能类。
 * @version 9.1.1
 * @category Components DataServiceQuery
 * @param {string} dataserviceUrl - 数据服务地址。
 * @fires L.supermap.components.dataServiceQueryViewModel#getfeaturessucceeded
 * @fires L.supermap.components.dataServiceQueryViewModel#getfeaturesfailed
 * @extends {L.Evented}
 */
export class DataServiceQueryViewModel extends L.Evented {

    initialize(dataserviceUrl) {
        this.dataserviceUrl = dataserviceUrl;
        this.resultLayers = [];
    }

    /**
     * @function L.supermap.components.dataServiceQueryViewModel.prototype.getFeatures
     * @description 获取 features。
     * @param {(SuperMap.GetFeaturesByIDsParameters|SuperMap.GetFeaturesByBufferParameters|SuperMap.GetFeaturesByBoundsParameters|SuperMap.GetFeaturesBySQLParameters|SuperMap.GetFeaturesByGeometryParameters)} queryParam - 查询参数。
     * @param {L.Map} map - Leaflet Map 对象。
     */
    getFeatures(queryParam, map) {
        let dataserviceUrl = this.dataserviceUrl;
        let me = this;
        let featureService = L.supermap.featureService(dataserviceUrl);
        if (queryParam instanceof GetFeaturesByIDsParameters) {
            featureService.getFeaturesByIDs(queryParam, function (serviceResult) {
                me._getQureyResult(serviceResult, map);
            });
        } else if (queryParam instanceof GetFeaturesBySQLParameters) {
            featureService.getFeaturesBySQL(queryParam, function (serviceResult) {
                me._getQureyResult(serviceResult, map);
            });
        } else if (queryParam instanceof GetFeaturesByBoundsParameters) {
            featureService.getFeaturesByBounds(queryParam, function (serviceResult) {
                me._getQureyResult(serviceResult, map);
            });
        } else if (queryParam instanceof GetFeaturesByBufferParameters) {
            featureService.getFeaturesByBuffer(queryParam, function (serviceResult) {
                me._getQureyResult(serviceResult, map);
            });
        } else if (queryParam instanceof GetFeaturesByGeometryParameters) {
            featureService.getFeaturesByGeometry(queryParam, function (serviceResult) {
                me._getQureyResult(serviceResult, map);
            });
        }
    }

    /**
     * @function L.supermap.components.dataServiceQueryViewModel.prototype._getQureyResult
     * @description 获取查询结果。
     * @private
     * @param {Object} serviceResult - 服务器返回结果。
     * @param {L.Map} map - Leaflet Map 对象。
     */
    _getQureyResult(serviceResult, map) {
        if (serviceResult.error) {
            /**
            * @event L.supermap.components.dataServiceQueryViewModel#getfeaturesfailed
            * @description features 获取失败时触发。
            * @property {string} error - 服务器返回的错误。
            */
            this.fire('getfeaturesfailed', { 'error': serviceResult.error });
            return;
        }
        let resultLayer = L.geoJSON(serviceResult.result.features, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup("ID: " + feature.properties.SMID);
            },
            pointToLayer: function (geoJsonPoint, latLng) {
                return L.circleMarker(latLng, { radius: 6})
            }
        }).addTo(map);
        this.resultLayers.push(resultLayer);
        /**
         * @event L.supermap.components.dataServiceQueryViewModel#getfeaturessucceeded
         * @description features 获取成功时触发。
         * @property {Object} result - 服务器返回的结果。
         */
        this.fire('getfeaturessucceeded', { 'result': serviceResult.result.features })
    }

    /**
     * @function L.supermap.components.dataServiceQueryViewModel.prototype.clearLayers
     * @description 清除所有结果图层。
     */
    clearLayers() {
        for (let i in this.resultLayers) {
            this.resultLayers[i].remove();
        }
        this.resultLayers = [];
    }
}
export var dataServiceQueryViewModel = function (dataserviceUrl) {
    return new dataServiceQueryViewModel(dataserviceUrl);
};
L.supermap.components.dataServiceQueryViewModel = dataServiceQueryViewModel;
