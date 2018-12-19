/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import L from "leaflet";
import '../../core/Base';
import {GeoJSONLayerWithName} from '../commonmodels/GeoJSONLayerWithName';
import {GeoJsonLayersDataModel} from '../commonmodels/GeoJsonLayersModel';
import {AttributesPopContainer} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.clientComputationViewModel
 * @classdesc 客户端计算微件功能类。
 * @version 9.1.1
 * @category Widgets ClientComputation
 * @param {string} workerUrl - worker 地址，原始位置为 dist/leaflet/workers/TurfWorker.js。
 * @fires L.supermap.widgets.clientComputationViewModel#analysisfailed
 * @fires L.supermap.widgets.clientComputationViewModel#analysissucceeded
 * @fires L.supermap.widgets.clientComputationViewModel#layerloaded
 * @fires L.supermap.widgets.clientComputationViewModel#layersremoved
 * @extends {L.Evented}
 */
export class ClientComputationViewModel extends L.Evented {
    initialize(workerUrl) {
        this.workerUrl = workerUrl;
        this.turfLayers = [];
    }

    /**
     * @function L.supermap.widgets.clientComputationViewModel.prototype.getLayersData
     * @description 获取填充到 view 的数据。
     * @param {Array.<L.GeoJSON>} layersArr - 图层数组。
     * @returns {Object} layers 数据。
     */

    getLayersData(layersArr) {
        let result = {};
        let pointData = {}, lineData = {}, polygonData = {};
        for (let i = 0; i < layersArr; i++) {
            layersArr[i] = new GeoJSONLayerWithName(layersArr[i].layerName, layersArr[i].layer)
        }
        this.geoJsonLayersDataModel = new GeoJsonLayersDataModel(layersArr);
        // 把 layersArr 转成 key = layername 对象，方便获取 fields 时遍历
        let dataObj = [];
        for (let i = 0; i < layersArr.length; i++) {
            dataObj[layersArr[i].layerName] = {
                fields: layersArr[i].fields,
                layer: layersArr[i].layer.toGeoJSON()
            }
        }

        for (let key in this.geoJsonLayersDataModel.layers) {
            let fields;
            if (dataObj[key].fields) {
                fields = dataObj[key].fields;
            } else {
                fields = this.geoJsonLayersDataModel.layers[key].getAttributeNamesByType("Num");
            }
            let fieldsValue = [];
            for (let i = 0; i < fields.length; i++) {
                fieldsValue[fields[i]] = this.geoJsonLayersDataModel.layers[key].getAttributeValueByAttributeName(fields[i]);
                // 去空 & 去重 & 转 number
                let arr = fieldsValue[fields[i]];
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] == "" || typeof (arr[j]) == "undefined") {
                        arr.splice(j, 1);
                        j = j - 1;
                    }
                    arr[j] = parseFloat(arr[j])
                }
                fieldsValue[fields[i]] = Array.from(new Set(arr.sort(function (a, b) {
                    return a - b;
                })));
            }

            let obj = {
                layerName: key,
                fields: fields,
                fieldsValue: fieldsValue,
                features: dataObj[key].layer
            }

            let layersType = dataObj[key].layer.features[0].geometry.type;
            if (layersType === "Point") {
                pointData[key] = obj;
            } else if (layersType === "LineString") {
                lineData[key] = obj;
            } else if (layersType === "Polygon") {
                polygonData[key] = obj;
            }
        }
        result['point'] = pointData;
        result['lineString'] = lineData;
        result['polygon'] = polygonData;

        return result;
    }

    /**
     * @function L.supermap.widgets.clientComputationViewModel.prototype.analysis
     * @description 进行客户端计算。
     * @param {Object} params - 客户端计算参数。
     * @param {L.Map} map - Leaflet Map 对象。
     */
    analysis(params, map) {
        this.geoJsonLayersDataModel.setCurrentLayerDataModel(params.analysisLayers);
        this.worker = new Worker(this.workerUrl);
        let resultData = this.geoJsonLayersDataModel.currentLayerDataModel.layer.toGeoJSON();
        if (params.analysisMethod === "isolines") {
            let fieldsValue = params.analysisFieldsValue.split(",");
            let pointGrid = resultData;
            for (let j = 0; j < fieldsValue.length; j++) {
                fieldsValue[j] = parseFloat(fieldsValue[j])
            }
            let me = this;
            let analysisParams = {
                "pointGrid": pointGrid,
                "analysisMethod": params.analysisMethod,
                "breaks": fieldsValue,
                "zProperty": params.analysisFields,
                "analysisCellSize": params.analysisCellSize,
                "options": {gridType: "point", property: params.analysisFields, weight: Number(params.analysisBreaks)}
            };
            this.worker.postMessage(analysisParams);
            this.worker.onmessage = (e) => {
                if (e.data.features.length === 0) {
                    /**
                     * @event L.supermap.widgets.clientComputationViewModel#analysisfailed
                     * @description 事件分析失败后触发，返回结果为空。
                     */
                    me.fire('analysisfailed');
                } else {
                    /**
                     * @event L.supermap.widgets.clientComputationViewModel#analysissucceeded
                     * @description 事件分析成功后触发。 
                     * @property {Object} data - 分析成功后的数据。
                     */
                    me.fire('analysissucceeded', {'data': e.data});

                    let turfLayer = L.geoJSON(e.data, {
                        style: {
                            color: '#1060C2', weight: 3
                        },
                        onEachFeature: function (feature, layer) {
                            if (feature.properties) {
                                layer.bindPopup((new AttributesPopContainer(feature.properties)).getElement())
                            }
                            layer.on({
                                'mouseover': function () {
                                    layer.setStyle({color: "#ffffff", weight: 5})
                                },
                                'mouseout': function () {
                                    layer.setStyle({color: '#1060C2', weight: 3})
                                },
                                "click": function () {
                                    layer.setStyle({color: "#ffffff", weight: 5})

                                }
                            });
                        }
                    }).addTo(map);
                    me.turfLayers.push(turfLayer);
                    /**
                     * @event L.supermap.widgets.clientComputationViewModel#layerloaded
                     * @description 结果图层加载完成后触发。
                     * @property {L.GeoJSON} layer - 加载完成后的结果图层。
                     * @property {string} name - 加载完成后的结果图层名称。
                     */
                    me.fire('layerloaded', {"layer": turfLayer, "name": params.resultLayersName});
                    me.worker.terminate();
                }

            };
        } else if (params.analysisMethod === "buffer") {
            let me = this;
            let analysisParams = {
                "analysisMethod": "buffer",
                "radius": params.radius,
                "unit": params.unit,
                "isSave": params.isSaveStatus,
                "isUnion": params.isUnion,
                'geoJson': resultData
            };
            this.worker.postMessage(analysisParams);
            this.worker.onmessage = (e) => {
                let turfLayer = L.geoJSON(e.data, {
                    style: {
                        color: "#ffffff", fillColor: '#1060C2', fillOpacity: .5, weight: 1.5
                    },
                    onEachFeature: function (feature, layer) {
                        if (feature.properties) {
                            layer.bindPopup((new AttributesPopContainer(feature.properties)).getElement())
                        }
                        layer.on({
                            'mouseover': function () {
                                layer.setStyle({
                                    color: "#ffffff",
                                    fillColor: "rgb(46,40,79)",
                                    fillOpacity: .5,
                                    weight: 5
                                })
                            },
                            'mouseout': function () {
                                layer.setStyle({color: "#ffffff", fillColor: '#1060C2', fillOpacity: .5, weight: 1.5})
                            },
                            "click": function () {
                                layer.setStyle({
                                    color: "#ffffff",
                                    fillColor: "rgb(46,40,79)",
                                    fillOpacity: .5,
                                    weight: 2
                                })

                            }
                        });
                    }

                }).addTo(map);
                me.turfLayers.push(turfLayer);
                me.fire('layerloaded', {"layer": turfLayer, "name": params.resultLayersName});
                me.worker.terminate();
            };
        }
    }

    /**
     * @function L.supermap.widgets.clientComputationViewModel.prototype.clearLayers
     * @description 清空分析图层。
     */
    clearLayers() {
        for (let i in this.turfLayers) {
            this.turfLayers[i].clearLayers()
        }
        /**
         * @event L.supermap.widgets.clientComputationViewModel#layersremoved
         * @description 图层删除之后触发。
         * @property {Array.<L.GeoJSON>} layer - 需要删除的图层数组。
         */
        this.fire('layersremoved', {layers: this.turfLayers});
    }

    /**
     * @function L.supermap.widgets.clientComputationViewModel.prototype.cancelAnalysis
     * @description 取消分析。
     */
    cancelAnalysis() {
        this.worker.terminate();
    }
}

export var clientComputationViewModel = function (options) {
    return new ClientComputationViewModel(options);
};
L.supermap.widgets.clientComputationViewModel = clientComputationViewModel;
