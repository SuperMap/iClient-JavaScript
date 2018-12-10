/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import { DistributedAnalysisModel } from "./DistributedAnalysisModel";
import { FetchRequest, KernelDensityJobParameter } from "@supermap/iclient-common";
import { ProcessingService } from '../../services/ProcessingService'
/**
 * @class L.supermap.widgets.distributedAnalysisViewModel
 * @classdesc 分布式分析微件功能类。
 * @version 9.1.1
 * @category Widgets DistributedAnalysis
 * @param {string} processingUrl - 分布式分析地址。
 * @fires L.supermap.widgets.distributedAnalysisViewModel#datasetsloaded
 * @fires L.supermap.widgets.distributedAnalysisViewModel#datasetinfoloaded
 * @fires L.supermap.widgets.distributedAnalysisViewModel#analysisfailed
 * @fires L.supermap.widgets.distributedAnalysisViewModel#analysissucceed
 * @fires L.supermap.widgets.distributedAnalysisViewModel#layerloaded
 * @fires L.supermap.widgets.distributedAnalysisViewModel#layersremoved
 */
export class DistributedAnalysisViewModel extends L.Evented {
    initialize(processingUrl) {
        this.processingUrl = processingUrl
    }
    /**
     * @function L.supermap.widgets.distributedAnalysisViewModel.prototype.getDatasetsName
     * @description 获取所有数据集名称。
     * @param {string} url - 分布式分析服务地址。 
     */
    getDatasetsName() {
        let processingUrl = this.processingUrl;
        this.resultLayers = [];
        this.datasetNames = [];
        this.distributedAnalysisModel = new DistributedAnalysisModel(processingUrl);
        this.distributedAnalysisModel.getDatasetsName();
        let me = this;
        this.distributedAnalysisModel.on('datasetsloaded', function (e) {
            /**
             * @event L.supermap.widgets.distributedAnalysisViewModel#datasetsloaded
             * @description 数据集获取完成之后触发。
             * @property {Object} result - 数据集数据。
             */
            me.fire('datasetsloaded', { 'result': e.result });
        })
    }

    /**
     * @function L.supermap.widgets.distributedAnalysisViewModel.prototype.getDatasetInfo
     * @description 获得数据集类型与 fields。
     * @param {string} datasetUrl - 数据集资源地址。
     */
    getDatasetInfo(datasetUrl) {
        // 判断数据集类型
        this.distributedAnalysisModel.getDatasetInfo(datasetUrl);
        let me = this;
        this.distributedAnalysisModel.on('datasetinfoloaded', function (e) {
            let type = e.result.type;
            let fields = e.result.fields;
            /**
            * @event L.supermap.widgets.distributedAnalysisViewModel#datasetinfoloaded
            * @description 数据集类型与字段获取完成之后触发。
            * @property {Object} result - 数据集数据。
            * @property {string} result.type - 数据集类型。
            * @property {Array.<string>} result.fields - 数据集所含有的字段。
            */
            me.fire('datasetinfoloaded', { 'result': { 'type': type, 'fields': fields } })
        })
    }

    /**
     * @function L.supermap.widgets.distributedAnalysisViewModel.prototype.analysis
     * @description 进行分布式分析。
     * @param {Object.<SuperMap.KernelDensityJobParameter|string>} params - 参数。
     * @param {SuperMap.KernelDensityJobParameter} params.analysisParam - 分布式分析参数。
     * @param {string} [params.resultLayerName] - 结果图层名称。
     * @param {L.Map} map - leaflet Map 对象。
     */
    analysis(params, map) {
        let processingService = new ProcessingService(this.processingUrl);
        if (params.analysisParam instanceof KernelDensityJobParameter) {
            let kernelDensityJobParameter = params.analysisParam
            let me = this;
            processingService.addKernelDensityJob(kernelDensityJobParameter, function (serviceResult) {
                if (serviceResult.error) {
                    /**
                     * @event L.supermap.widgets.distributedAnalysisViewModel#analysisfailed
                     * @description 分析失败后触发。
                     */
                    me.fire('analysisfailed', { 'error': serviceResult.error });
                    return;
                }
                serviceResult.result.setting.serviceInfo.targetServiceInfos.map(function (info) {
                    if (info.serviceType === 'RESTMAP') {
                        FetchRequest.get(info.serviceAddress + '/maps').then(function (response) {
                            return response.json();
                        }).then(function (result) {
                            let mapUrl = result[0].path;
                            /**
                             * @event L.supermap.widgets.distributedAnalysisViewModel#analysissucceed
                             * @description 分析成功后服务器返回的数据。
                             */
                            me.fire('analysissucceed', { 'result': result });
                            let layer = L.supermap.tiledMapLayer(mapUrl, { noWrap: true, transparent: true });
                            me.resultLayers.push(layer);
                            layer.addTo(map);
                            /**
                             * @event L.supermap.widgets.distributedAnalysisViewModel#layerloaded
                             * @description 分析结果图层加载完成后触发。
                             * @property {L.GeoJSON} layer - 结果图层。
                             * @property {string} name - 结果图层名称。
                             */
                            let date = new Date();
                            let resultLayerName = params.resultLayerName || date.getTime();
                            me.fire('layerloaded', { 'layer': layer, 'name': resultLayerName })
                        });
                    }
                    return info;
                });
            })
        }

    }
    /**
     * @function L.supermap.widgets.distributedAnalysisViewModel.prototype.clearLayers
     * @description 清空分析图层。
     */
    clearLayers() {
        for (let i in this.resultLayers) {
            this.resultLayers[i].remove();
        }
        /**
         * @event L.supermap.widgets.distributedAnalysisViewModel#layersremoved
         * @description 图层删除后触发。
         * @property {Array.<L.GeoJSON>} layers - 结果图层数组。
         */
        this.fire('layersremoved', { 'layers': this.resultLayers });
        this.resultLayers = [];
    }

}
export var distributedAnalysisViewModel = function (options) {
    return new DistributedAnalysisViewModel(options);
};
L.supermap.widgets.distributedAnalysisViewModel = distributedAnalysisViewModel;
