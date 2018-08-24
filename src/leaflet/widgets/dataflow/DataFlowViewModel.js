import L from "leaflet";
import '../../core/Base';
import {DataFlowLayer} from "../../overlay/DataFlowLayer";

/**
 * @class L.supermap.widgets.dataFlowViewModel
 * @classdesc 打开本地文件微件 ViewModel，用于管理一些业务逻辑
 * @category Control Widgets
 * @param {L.map} map - 当前微件所在的底图
 */
export var DataFlowViewModel = L.Evented.extend({
    initialize(map) {
        if (map) {
            /**
             * @member {L.map} - [L.supermap.widgets.dataFlowViewModel.prototype.map]
             * @description 当前微件所在的底图
             */
            this.map = map;
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }

        /**
         * @member {boolean} - [L.supermap.widgets.dataFlowViewModel.prototype.popupsStatus=true]
         * @description 图层 popup 打开 "true" 或关闭 "false" 的状态
         */
        this.popupsStatus = true;
        /**
         * @member {boolean} - [ L.supermap.widgets.dataFlowViewModel.prototype.dataFlowStatus=false]
         * @description 数据流服务当前状态，订阅 "true" 或未订阅 "false" 的状态
         */
        this.dataFlowStatus = false;

        /**
         * @member {string} - [L.supermap.widgets.dataFlowViewModel.prototype.urlDataFlow=""]
         * @description 数据流地址
         */
        this.urlDataFlow = "";

        /**
         * @member {Array.<Object>} - [L.supermap.widgets.dataFlowViewModel.prototype.currentFeatures]
         * @description 当前订阅数据流返回的要素数组
         */
        this.currentFeatures = [];

        /**
         * @member {L.supermap.dataFlowLayer} - [L.supermap.widgets.dataFlowViewModel.prototype.dataFlowLayer=null]
         * @description 当前 dataFlowLayer 图层对象
         */
        this.dataFlowLayer = null;
    },

    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.subscribe
     * @description 订阅数据流
     */
    subscribe(urlDataFlow) {
        //若当前数据流服务没变，则不进行重新订阅 todo 或者没点击暂停
        if (this.urlDataFlow === urlDataFlow) {
            if (this.dataFlowStatus) {
                this.fire("dataFlowServiceSubscribed");
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
        const self = this;
        self.tempFeatures = [];
        //创建DataFlowLayer，创建DataFlowLayer订阅iServer dataflow服务并将结果加载到地图上
        const dataFlowLayer = new DataFlowLayer(urlDataFlow, {
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
                const content = feature.properties.time;
                layer.bindPopup(content);
                self.tempFeatures.push(layer)
            }
        });
        dataFlowLayer.on('dataupdated', function (result) {
            self.currentFeatures = self.tempFeatures;
            const bounds = result.layer.getBounds();
            if (bounds.getNorthEast().lng === bounds.getSouthWest().lng && bounds.getNorthEast().lat === bounds.getSouthWest().lat) {
                self.map.setView(bounds.getCenter())
            } else {
                self.map.flyToBounds(result.layer.getBounds());
            }
            if (self.popupsStatus) {
                self.openPopups();
            }
            self.tempFeatures = [];
        });
        dataFlowLayer.addTo(this.map);

        this.dataFlowLayer = dataFlowLayer;
    },

    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.cancelSubscribe
     * @description 取消订阅的数据流
     */
    cancelSubscribe() {
        this.dataFlowStatus = false;
        this.dataFlowLayer.dataService.unSubscribe();
    },

    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.openPopups
     * @description 打开图层要素 popup
     */
    openPopups() {
        this.popupsStatus = true;
        if (this.currentFeatures.length > 0) {
            for (let i = 0; i < this.currentFeatures.length; i++) {
                this.currentFeatures[i].openPopup();
            }
        }
    },
    /**
     * @function L.supermap.widgets.dataFlowViewModel.prototype.closePopups
     * @description 关闭图层要素 popup
     */
    closePopups() {
        this.popupsStatus = false;
        if (this.currentFeatures.length > 0) {
            for (let i = 0; i < this.currentFeatures.length; i++) {
                this.currentFeatures[i].closePopup();
            }
        }
    }
});

export var dataFlowViewModel = function (options) {
    return new DataFlowViewModel(options);
};

L.supermap.widgets.dataFlowViewModel = dataFlowViewModel;