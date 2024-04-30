/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import '../../core/Base';
 import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';

/**
 * @class DistributedAnalysisModel
 * @aliasclass Components.DistributedAnalysisModel
 * @deprecatedclassinstance L.supermap.components.DistributedAnalysisModel
 * @classdesc 分布式分析组件数据模型。
 * @private
 * @category Components DistributedAnalysis
 * @param {string} processingUrl - 分布式分析地址。
 * @fires DistributedAnalysisModel#datasetsloaded
 * @fires DistributedAnalysisModel#datasetinfoloaded
 * @extends {L.Evented}
 */
export class DistributedAnalysisModel extends L.Evented {
    
    initialize(processingUrl) {
        this.processingUrl = processingUrl
    }
    /**
     * @function DistributedAnalysisModel.prototype.getDatasetsName
     * @description 获取所有可进行分布式分析的数据集名称。
     * @param {string} url - 服务地址。
     */
    getDatasetsName() {
        let url = this.processingUrl;
        this.dataset = [];
        this.dataset['datasetNames'] = [];
        this.dataset['childUrl'] = [];

        let host = 'http://' + url.split('/')[2];
        let sharefileUrl = host + '/iserver/services/datacatalog/rest/datacatalog/sharefile.json';
        let datasetsUrl = host + '/iserver/services/datacatalog/rest/datacatalog/relationship/datasets.json';
        let me = this;
        FetchRequest.get(sharefileUrl).then(function (response) {
            return response.json();
        }).then(function (result) {
            me.dataset['datasetNames'] = me.dataset['datasetNames'].concat(result.datasetNames);
            me.dataset['childUrl'] = me.dataset['childUrl'].concat(result.childUriList);
            let _me = me;
            FetchRequest.get(datasetsUrl).then(function (response) {
                return response.json();
            }).then(function (result) {
                _me.dataset['datasetNames'] = _me.dataset['datasetNames'].concat(result.datasetNames);
                _me.dataset['childUrl'] = _me.dataset['childUrl'].concat(result.childUriList);

                let datasetHash = [];
                for (let i in _me.dataset['datasetNames']) {
                    datasetHash[_me.dataset.datasetNames[i]] = _me.dataset.childUrl[i]
                }
                /**
                 * @event DistributedAnalysisModel#datasetsloaded
                 * @description 数据集获取完成之后触发。
                 * @property {Object} result - 数据集数据。
                 * @property {Array.<string>} result.dataset - 数据集名称数组。
                 * @property {Object} result.datasetHash - 数据集名称数组与数据集 URL 一一对应的对象。
                 */ 
                _me.fire('datasetsloaded', { 'result': { 'dataset': _me.dataset, 'datasetHash': datasetHash } });

            });
        });
    }
    /**
     * @function DistributedAnalysisModel.prototype.getDatasetInfo
     * @description 获取数据集类型和字段。
     * @param {string} datasetUrl - 数据集资源地址。
     */
    getDatasetInfo(datasetUrl) {
        let type;
        let me = this;
        FetchRequest.get(datasetUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            let datasetInfo = data.datasetInfo
            if (datasetInfo.datasetType === 'LINE' || datasetInfo.type === 'LINE') {
                type = 'LINE';
            } else if (datasetInfo.datasetType === 'POINT' || datasetInfo.type === 'POINT' || datasetInfo.type === 'CSV') {
                type = 'POINT';
            } else if (datasetInfo.datasetType === 'REGION' || datasetInfo.type === 'REGION') {
                type = 'REGION';
            }
            let fields = [];
            let fieldInfos = datasetInfo.fieldInfos || datasetInfo.fieldInfo || null;
            if (fieldInfos) {
                for (let i in fieldInfos) {
                    fields.push(fieldInfos[i].name)
                }
                /**
                 * @event DistributedAnalysisModel#datasetinfoloaded
                 * @description 数据集查询完成之后触发。
                 * @property {Object} result - 数据集数据。
                 * @property {string} result.type - 数据集类型。
                 * @property {Array.<string>} result.fields - 数据集字段。
                 */ 
                me.fire('datasetinfoloaded', { 'result': { 'type': type, 'fields': fields } })
            } else {
                let fieldsUrl = data.childUriList[0].replace('//fields', '/fields');
                FetchRequest.get(fieldsUrl).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    let fieldNames = data.fieldNames;
                    let fields = [];
                    for (let i in fieldNames) {
                        fields.push(fieldNames[i])
                    }
                    me.fire('datasetinfoloaded', { 'result': { 'type': type, 'fields': fields } })
                })
            }
        })
    }
}