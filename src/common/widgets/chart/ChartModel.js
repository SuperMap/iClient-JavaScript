/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../../SuperMap';
import { FetchRequest } from '@supermap/iclient-common';
/**
 * @class SuperMap.Widgets.ChartModel
 * @classdesc 图表微件数据模型
 * @private
 * @param {object} datasets - 数据来源。
 * @category Widgets Common
 */

export class ChartModel {

    constructor(datasets) {
        this.datasets = datasets;
    }

    /**
     * @function SuperMap.Widgets.ChartModel.prototype.getDatasetInfo
     * @description 获得数据集数据。
     * @param {string} datasetUrl - 数据集资源地址。
     */
    getDatasetInfo(success) {
        let datasetUrl = this.datasets.url;
        let me = this;

        FetchRequest.get(datasetUrl).then(function (response) {
            return response.json();
        }).then(function (results) {
            if (results.datasetInfo) {
                let datasetInfo = results.datasetInfo;
                me.datasetsInfo = {
                    dataSourceName: datasetInfo.dataSourceName,
                    datasetName: datasetInfo.name,
                    mapName: results.name
                };
                success({
                    result: me.datasetsInfo
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

    /**
     * @function SuperMap.Widgets.ChartModel.prototype.getDataFeatures
     * @description 请求数据集的数据信息
     * @param {object} results - 数据集信息。
     * @param {function} success - 成功回调函数。
     */
    getDataFeatures(results, success) {
        let datasetsInfo = results.result;
        let getFeatureParam, getFeatureBySQLParams, getFeatureBySQLService;
        let params = {
            name: datasetsInfo.datasetName + "@" + datasetsInfo.dataSourceName
        }
        Object.assign(params, this.datasets.queryInfo);
        getFeatureParam = new SuperMap.FilterParameter(params);
        getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: [datasetsInfo.dataSourceName + ":" + datasetsInfo.datasetName],
            fromIndex: 0,
            toIndex: 100000
        });
        getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(datasetsInfo.dataUrl, {
            eventListeners: {
                "processCompleted": success,
                "processFailed": function () { }
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    /**
     * @function SuperMap.Widgets.ChartModel.prototype.getLayerFeatures
     * @description 请求图层要素的数据信息
     * @param {object} results - 数据集信息。
     * @param {function} success - 成功回调函数。
     */
    getLayerFeatures(results, success) {
        let datasetsInfo = results.result;
        let queryParam, queryBySQLParams, queryBySQLService;
        let params = {
            name: datasetsInfo.mapName
        }
        Object.assign(params, this.datasets.queryInfo);
        queryParam = new SuperMap.FilterParameter(params);
        queryBySQLParams = new SuperMap.QueryBySQLParameters({
            queryParams: [queryParam],
            expectCount: 100000
        });
        queryBySQLService = new SuperMap.QueryBySQLService(datasetsInfo.dataUrl, {
            eventListeners: {
                "processCompleted": success,
                "processFailed": function () { }
            }
        });
        queryBySQLService.processAsync(queryBySQLParams);
    }
}