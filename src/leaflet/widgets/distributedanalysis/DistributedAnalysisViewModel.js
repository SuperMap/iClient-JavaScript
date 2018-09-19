/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import { DistributedAnalysisModel } from "./DistributedAnalysisModel";
import { KernelDensityJobParameter, MappingParameters, FetchRequest} from "@supermap/iclient-common";
import { ProcessingService } from '../../services/ProcessingService'
/**
 * @class L.supermap.widgets.DistributedAnalysisViewModel
 * @classdesc 分布式分析 ViewModel。
 * @category Widgets
 * @param {string} processingUrl - 分布式分析地址。
 * @fires L.supermap.widgets.DistributedAnalysisViewModel#datasetsloaded
 * @fires L.supermap.widgets.DistributedAnalysisViewModel#datasetinfoloaded
 * @fires L.supermap.widgets.DistributedAnalysisViewModel#analysisfailed
 * @fires L.supermap.widgets.DistributedAnalysisViewModel#layerloaded
 * @fires L.supermap.widgets.DistributedAnalysisViewModel#layersremoved
 */
export class DistributedAnalysisViewModel extends L.Evented {
    initialize(processingUrl) {
        this.processingUrl = processingUrl
    }
    /**
     * @function L.supermap.widgets.DistributedAnalysisViewModel.prototype.getDatasetsName
     * @description 获取所有数据集名称。
     * @param {string} url - 分布式分析服务地址。 
     */
    getDatasetsName() {
        let processingUrl = this.processingUrl;
        this.resultLayers = [];
        this.processingService = new ProcessingService(processingUrl);
        this.datasetNames = [];
        this.distributedAnalysisModel = new DistributedAnalysisModel(processingUrl);
        this.distributedAnalysisModel.getDatasetsName();
        let me = this;
        this.distributedAnalysisModel.on('datasetsloaded', function(e){
            /**
             * @event L.supermap.widgets.DistributedAnalysisViewModel#datasetsloaded
             * @description 数据集获取完成之后触发。
             * @property {Object} result - 数据集数据。
             */ 
            me.fire('datasetsloaded', {'result': e.result});
        })
    }

    /**
     * @function L.supermap.widgets.DistributedAnalysisViewModel.prototype.getDatasetInfo
     * @description 获得数据集类型与 fields。
     * @param {string} datasetUrl - 数据集资源地址。
     */
    getDatasetInfo(datasetUrl){
        // 判断数据集类型
        this.distributedAnalysisModel.getDatasetInfo(datasetUrl);
        let me = this;
        this.distributedAnalysisModel.on('datasetinfoloaded', function(e){
            let type = e.result.type;
            let fields = e.result.fields;
             /**
             * @event L.supermap.widgets.DistributedAnalysisViewModel#datasetinfoloaded
             * @description 数据集类型与字段获取完成之后触发。
             * @property {Object} result - 数据集数据。
             * @property {string} result.type - 数据集类型。
             * @property {Array.<string>} result.fields - 数据集所含有的字段。
             */ 
            me.fire('datasetinfoloaded', {'result': {'type': type, 'fields': fields}})
        })
    }

    /**
     * @function L.supermap.widgets.DistributedAnalysisViewModel.prototype.analysis
     * @description 进行分布式分析。
     * @param {Object} params - 分布式分析参数。
     * @param {L.map} map - leaflet Map 对象。
     */
    analysis(params, map){
        if(params.analysisType === 'density'){
            let kernelDensityJobParameter = new KernelDensityJobParameter({
                'datasetName': params.datasetName,
                'method': params.method,
                'meshType': params.meshType,
                'resolution': params.resolution,
                'fields': params.fields,
                'radius': params.radius,
                'meshSizeUnit': 'Meter',
                'radiusUnit': 'Meter',
                'areaUnit': 'SquareMile',
                'mappingParameters': new MappingParameters({
                    'rangeMode': params.mappingParameter.rangeMode,
                    'rangeCount': params.mappingParameter.rangeCount,
                    'colorGradientType': params.mappingParameter.colorGradientType
                })
            })
            let me = this;
            this.processingService.addKernelDensityJob(kernelDensityJobParameter, function (serviceResult){
                if (serviceResult.error) {
                    /**
                     * @event L.supermap.widgets.DistributedAnalysisViewModel#analysisfailed
                     * @description 分析失败后触发。
                     */
                    me.fire('analysisfailed');
                    return;
                }
                serviceResult.result.setting.serviceInfo.targetServiceInfos.map(function (info) {
                    if (info.serviceType === 'RESTMAP') {
                        FetchRequest.get(info.serviceAddress + '/maps').then(function (response) {
                            return response.json();
                        }).then(function (result) {
                            let mapUrl = result[0].path;
                            let layer = L.supermap.tiledMapLayer(mapUrl, {noWrap: true, transparent: true});
                            me.resultLayers.push(layer);
                            layer.addTo(map);
                            /**
                             * @event L.supermap.widgets.DistributedAnalysisViewModel#layerloaded
                             * @description 分析结果图层加载完成后触发。
                             * @property {L.GeoJSON} layer - 结果图层。
                             * @property {string} name - 结果图层名称。
                             */
                            me.fire('layerloaded', {'layer': layer, 'name': params.resultLayer})
                        });
                    }
                    return info;
                });
            })
        }
        
    }
    /**
     * @function L.supermap.widgets.DistributedAnalysisViewModel.prototype.clearLayers
     * @description 清空分析图层。
     */
    clearLayers() {
        for (let i in this.resultLayers) {
            this.resultLayers[i].remove();
        }
        /**
         * @event L.supermap.widgets.DistributedAnalysisViewModel#layersremoved
         * @description 图层删除后触发。
         * @property {Array.<L.GeoJSON>} layers - 结果图层数组。
         */
        this.fire('layersremoved', { layers: this.resultLayers });
    }
    
}
L.supermap.widgets.DistributedAnalysisViewModel = DistributedAnalysisViewModel;

// L.supermap.widgets.util = widgetsUtil;