/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {DataFlowLayer} from "../../overlay/DataFlowLayer";
import {CommontypesConversion} from '../../core/CommontypesConversion';

/**
 * @class DataFlowViewModel
 * @aliasclass Components.DataFlowViewModel
 * @deprecatedclassinstance L.supermap.components.dataFlowViewModel
 * @classdesc 数据流组件功能类。
 * @version 9.1.1
 * @category Components DataFlow
 * @param {L.Map} map - Leaflet Map 对象。
 * @param {Object} [dataFlowLayerOptions] - 数据流服务返回数据数据展示样式，默认采用 ViewModel 默认样式。
 * @param {Object} options - 参数。
 * @param {function} [options.style] - 定义点、线、面要素样式。参数为{@link L.Path-option}。</br>
 `function (feature) {
                                                    return {
                                                        fillColor: "red",
                                                        fillOpacity: 1,
                                                        radius: 6,
                                                        weight: 0
                                                    };
                                            }`
 * @param {function} [options.onEachFeature] - 给该元素绑定事件和弹窗，默认对新创建的图层不执行任何操作。
 * @fires DataFlowViewModel#dataflowservicesubscribed
 * @fires DataFlowViewModel#subscribesucceeded
 * @fires DataFlowViewModel#subscribefailed
 * @fires DataFlowViewModel#dataupdated
 * @extends {L.Evented}
 * @usage
 */
export var DataFlowViewModel = L.Evented.extend({
    options: {
        _defaultLayerOptions: {
            //style 返回 marker样式或者 L.path 样式
            style: null,
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
             * @member {L.Map} DataFlowViewModel.prototype.map
             * @description Leaflet Map 对象。
             */
            this.map = map;
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }
        //合并用户的 dataFlowLayerOptions
        L.Util.extend(this.options._defaultLayerOptions, dataFlowLayerOptions);
        //点样式也存储在style里
        this.options._defaultLayerOptions.pointToLayer = this.options._defaultLayerOptions.style;

        /**
         * @member {boolean} [DataFlowViewModel.prototype.popupsStatus=true]
         * @description 图层 popup 打开 "true" 或关闭 "false" 的状态。
         */
        this.popupsStatus = true;
        /**
         * @member {boolean} [DataFlowViewModel.prototype.dataFlowStatus=false]
         * @description 数据流服务当前状态，订阅 "true" 或未订阅 "false" 的状态。
         */
        this.dataFlowStatus = false;

        /**
         * @member {string} [DataFlowViewModel.prototype.dataFlowUrl=""]
         * @description 数据流地址。
         */
        this.dataFlowUrl = "";

        /**
         * @member {Array.<Object>} [DataFlowViewModel.prototype.currentFeatures]
         * @description 当前订阅数据流返回的要素数组。
         */
        this.currentFeatures = [];

        /**
         * @member {DataFlowLayer} [DataFlowViewModel.prototype.dataFlowLayer=null]
         * @description 当前 dataFlowLayer 图层对象。
         */
        this.dataFlowLayer = null;

    },

    /**
     * @function DataFlowViewModel.prototype.subscribe
     * @description 订阅数据流。
     * @param {string} dataFlowUrl - 数据流服务地址。
     */
    subscribe(dataFlowUrl) {
        //若当前数据流服务没变，则不进行重新订阅 todo 或者没点击暂停
        if (this.dataFlowUrl === dataFlowUrl) {
            if (this.dataFlowStatus) {
                /**
                 * @event DataFlowViewModel#dataflowservicesubscribed
                 * @description 数据流订阅成功后触发。
                 */
                this.fire("dataflowservicesubscribed");
                return;
            }
        } else {
            this.dataFlowUrl = dataFlowUrl
        }
        this.dataFlowStatus = true;
        //移除已有图层
        if (this.dataFlowLayer) {
            this.dataFlowLayer.remove();
            this.dataFlowLayer = null;
        }
        //创建DataFlowLayer，创建DataFlowLayer订阅iServer dataflow服务并将结果加载到地图上
        const dataFlowLayer = new DataFlowLayer(dataFlowUrl, this.options._defaultLayerOptions);
        dataFlowLayer.on('subscribesucceeded', (result) => {
            /**
             * @event DataFlowViewModel#subscribesucceeded
             * @description 数据流订阅成功后触发。
             * @property {Object} result - 返回的数据。
             */
            this.fire("subscribesucceeded", {result: result});
        });
        dataFlowLayer.on('subscribefailed', (result) => {
            /**
             * @event DataFlowViewModel#subscribefailed
             * @description 数据流订阅失败后触发。
             * @property {Object} result - 返回的数据。
             */
            this.fire("subscribefailed", {result: result});
        });
        dataFlowLayer.on('dataupdated', (result) => {
            //派发出订阅返回的数据：
            /**
             * @event DataFlowViewModel#dataupdated
             * @description 数据返回成功后触发。
             * @property {Object} result - 返回的数据。
             */
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
     * @function DataFlowViewModel.prototype.cancelSubscribe
     * @description 取消订阅的数据流。
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
     * @function DataFlowViewModel.prototype.openPopups
     * @description 打开图层要素弹窗。
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
     * @function DataFlowViewModel.prototype.closePopups
     * @description 关闭图层要素弹窗。
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
