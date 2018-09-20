/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {DataFlowLayer} from "../../overlay/DataFlowLayer";
import {CommontypesConversion} from '../../core/CommontypesConversion';

/**
 * @class L.supermap.widgets.dataFlowViewModel
 * @classdesc 打开本地文件微件 ViewModel，用于管理一些业务逻辑
 * @category Widgets
 * @param {L.Map} map - 当前微件所在的底图
 * @param {Object} [dataFlowLayerOptions] - 数据流服务返回数据数据展示样式，默认采用 ViewModel 默认样式。
 * @param {Function} [options.pointToLayer] - 定义点要素如何绘制在地图上。
 `function(geoJsonPoint, latlng) {
                                                return L.marker(latlng);
                                            }`
 * @param {Function} [options.style] - 定义点、线、面要素样式。参数为{@link L.Path-option}。</br>
 `function (feature) {
                                                    return {
                                                        fillColor: "red",
                                                        fillOpacity: 1,
                                                        radius: 6,
                                                        weight: 0
                                                    };
                                            }`
 * @param {Function} [options.onEachFeature] - 在创建和设置样式后，将为每个创建的要素调用一次的函数。 用于将事件和弹出窗口附加到要素。 默认情况下，对新创建的图层不执行任何操作
 */
export var DataFlowViewModel = L.Evented.extend({
    options: {
        _defaultLayerOptions: {
            style: null,
            pointToLayer: function (geoJsonPoint, latlng) {
                return L.circleMarker(latlng, {
                    color: "red",
                    weight: 1.5,
                    fillColor: "red",
                    fillOpacity: 0.4,
                    radius: 6
                });
            },
            onEachFeature: function (feature, layer) {
                let content = "属性信息如下：<br>";
                for (let key in feature.properties) {
                    content += key + ": " + feature.properties[key] + "<br>"
                }
                layer.bindPopup(content);

            }
        }
    },

    initialize(map, dataFlowLayerOptions = null) {
        if (map) {
            /**
             * @member {L.Map} [L.supermap.widgets.dataFlowViewModel.prototype.map]
             * @description 当前微件所在的底图
             */
            this.map = map;
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }
        //合并用户的 dataFlowLayerOptions
        L.Util.extend(this.options._defaultLayerOptions, dataFlowLayerOptions);

        /**
         * @member {boolean} [L.supermap.widgets.dataFlowViewModel.prototype.popupsStatus=true]
         * @description 图层 popup 打开 "true" 或关闭 "false" 的状态
         */
        this.popupsStatus = true;
        /**
         * @member {boolean} [L.supermap.widgets.dataFlowViewModel.prototype.dataFlowStatus=false]
         * @description 数据流服务当前状态，订阅 "true" 或未订阅 "false" 的状态
         */
        this.dataFlowStatus = false;

        /**
         * @member {string} [L.supermap.widgets.dataFlowViewModel.prototype.urlDataFlow=""]
         * @description 数据流地址
         */
        this.urlDataFlow = "";

        /**
         * @member {Array.<Object>} [L.supermap.widgets.dataFlowViewModel.prototype.currentFeatures]
         * @description 当前订阅数据流返回的要素数组
         */
        this.currentFeatures = [];

        /**
         * @member {L.supermap.dataFlowLayer} [L.supermap.widgets.dataFlowViewModel.prototype.dataFlowLayer=null]
         * @description 当前 dataFlowLayer 图层对象
         */
        this.dataFlowLayer = null;

    },

    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.subscribe
     * @description 订阅数据流。
     * @param {string} urlDataFlow - 数据流服务地址。
     */
    subscribe(urlDataFlow) {
        //若当前数据流服务没变，则不进行重新订阅 todo 或者没点击暂停
        if (this.urlDataFlow === urlDataFlow) {
            if (this.dataFlowStatus) {
                this.fire("dataflowfervicefubscribed");
                return;
            }
        } else {
            this.urlDataFlow = urlDataFlow
        }
        this.dataFlowStatus = true;
        //移除已有图层
        if (this.dataFlowLayer) {
            this.dataFlowLayer.remove();
            this.dataFlowLayer = null;
        }
        //创建DataFlowLayer，创建DataFlowLayer订阅iServer dataflow服务并将结果加载到地图上
        const dataFlowLayer = new DataFlowLayer(urlDataFlow, this.options._defaultLayerOptions);
        dataFlowLayer.on('subscribesuccessed', (result) => {
            this.fire("subscribesuccessed", {result: result});
        });
        dataFlowLayer.on('dataupdated', (result) => {
            //派发出订阅返回的数据：
            this.fire("dataupdated", {result: result});
            //若数据超出当前视图范围，则移动到数据所在视图范围：
            let layerBounds = result.layer.getBounds(),
                mapBounds = CommontypesConversion.toSuperMapBounds(this.map.getBounds()),
                layerBoundsSuperMap = CommontypesConversion.toSuperMapBounds(layerBounds);
            if (!mapBounds.intersectsBounds(layerBoundsSuperMap)) {
                if (layerBoundsSuperMap.left === layerBoundsSuperMap.right && layerBoundsSuperMap.top === layerBoundsSuperMap.bottom) {
                    this.map.setView(layerBounds.getCenter())
                } else {
                    this.map.flyToBounds(layerBounds);
                }
            }
            if (this.popupsStatus) {
                this.openPopups();
            }
        });
        dataFlowLayer.addTo(this.map);

        this.dataFlowLayer = dataFlowLayer;
    },

    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.cancelSubscribe
     * @description 取消订阅的数据流
     */
    cancelSubscribe() {
        if (this.dataFlowLayer) {
            this.dataFlowStatus = false;
            this.dataFlowLayer.dataService.unSubscribe();
            this.dataFlowLayer.remove();
            this.dataFlowLayer = null;
        }

    },

    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.openPopups
     * @description 打开图层要素 popup
     */
    openPopups() {
        this.popupsStatus = true;
        if (this.dataFlowLayer) {
            const layers = this.dataFlowLayer.getLayers();
            for (let i = 0; i < layers.length; i++) {
                for (let j = 0; j < layers[i].getLayers().length; j++) {
                    layers[i].getLayers()[j].openPopup();
                }
            }
        }

    },
    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.closePopups
     * @description 关闭图层要素 popup
     */
    closePopups() {
        this.popupsStatus = false;
        if (this.dataFlowLayer) {
            const layers = this.dataFlowLayer.getLayers();
            for (let i = 0; i < layers.length; i++) {
                for (let j = 0; j < layers[i].getLayers().length; j++) {
                    layers[i].getLayers()[j].closePopup();
                }
            }
        }
    }
});

export var dataFlowViewModel = function (options) {
    return new DataFlowViewModel(options);
};

L.supermap.widgets.dataFlowViewModel = dataFlowViewModel;