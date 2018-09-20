/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {GeoCodingParameter} from '@supermap/iclient-common';
import {AddressMatchService} from '../../services/AddressMatchService';
import {GeoJsonLayersDataModel} from '../commonmodels/GeoJsonLayersModel';


/**
 * @class L.supermap.widgets.poiSearchViewModel
 * @classdesc 搜索定位微件 viewModel 用于处理定位微件的一些业务逻辑代码
 * @param {Object} [options.cityGeoCodingConfig] - 城市地址匹配服务配置，包括：{addressUrl:"",key:""} 默认为 online 地址匹配服务，与 options.cityConfig 对应
 */
export var POISearchViewModel = L.Evented.extend({
    options: {
        cityGeoCodingConfig: {
            addressUrl: "http://www.supermapol.com/iserver/services/location-china/rest/locationanalyst/China",
            key: "fvV2osxwuZWlY0wJb8FEb2i5"
        }
    },

    initialize(map, options) {
        if (map) {
            /**
             * @member {L.map} - [L.supermap.widgets.dataFlowViewModel.prototype.map]
             * @description 当前微件所在的底图
             */
            this.map = map;
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }

        if (options) {
            L.setOptions(this, options);
        }
        //初始化Model
        this.dataModel = new GeoJsonLayersDataModel();
        //初始话地址匹配服务

        this.geoCodeService = new AddressMatchService(this.options.cityGeoCodingConfig.addressUrl);
        this.geoCodeParam = new GeoCodingParameter({
            address: null,
            city: "北京市",
            maxResult: 70,
            prjCoordSys: JSON.stringify({epsgCode: 4326}),
            key: this.options.cityGeoCodingConfig.key
        });
        //查询缓存
        this.searchCache = {};

        //监听 dataModel 数据变化：//看如何优化
        this.dataModel.on("newlayeradded", (e) => {
            let newLayer = e.newLayer;
            this.fire("newlayeradded", {newLayer: newLayer});
        });
    },

    /**
     * @function L.supermap.widgets.poiSearchViewModel.prototype.search
     * @description 查询
     * @param {string} keyWord - 查询的关键字
     * @param {string} searchLayerName - 执行的查询类型，默认为null,支执行矢量图层属性查询，当为 "geocode" 则执行地址匹配
     */
    search(keyWord, searchLayerName) {
        if (!searchLayerName) {
            this.cityGeocodeService(keyWord);
        } else {
            this.searchFromLayer(keyWord, searchLayerName);
        }
    },

    /**
     * @function L.supermap.widgets.poiSearchViewModel.prototype.searchFromLayer
     * @description 图层属性查询
     * @param {string} searchLayerName - 查询的图层名
     * @param {string} keyWord - 图层属性搜索关键字
     */
    searchFromLayer(keyWord, searchLayerName) {
        if (this.dataModel[searchLayerName]) {
            let resultFeatures = this.dataModel[searchLayerName].getFeaturesByKeyWord(keyWord);
            if (resultFeatures && resultFeatures.length > 0) {
                this.fire("searchlayersucceed", {result: resultFeatures});
            } else {
                this.fire("searchfield", {searchType: "searchLayersField"});
            }
        }
    },

    /**
     * @function L.supermap.widgets.poiSearchViewModel.prototype.addSearchLayers
     * @description 添加新的可查询图层
     * @param {Array.<L.GeoJSON>} layers - 新添加的图层对象
     */
    addSearchLayers(layers) {
        this.dataModel.addLayers(layers)
    },

    /**
     * @function L.supermap.widgets.poiSearchViewModel.prototype.panToLayer
     * @description 缩放到指定图层
     * @param {string} layerName - 指定缩放的图层名
     */
    panToLayer(layerName) {
        if (this.dataModel[layerName]) {
            this.map.flyToBounds(this.dataModel[layerName].layer.getBounds());
        }
    },

    /**
     * @function L.supermap.widgets.poiSearchViewModel.prototype.panToCity
     * @description 缩放到指定城市
     * @param {string} city - 指定缩放的城市名
     */
    panToCity(city) {
        this.geoCodeParam.address = city;
        this.geoCodeParam.city = city;
        const self = this;
        this.geoCodeService.code(this.geoCodeParam, (geocodingResult) => {
            if (geocodingResult.result.length > 0) {
                //缩放至城市
                const center = L.latLng(geocodingResult.result[0].location.y, geocodingResult.result[0].location.x);
                self.map.setView(center, 8);
            } else {
                self.fire("searchfield", {searchType: "cityGeocodeField"});
            }

        });

    },
    /**
     * @function L.supermap.widgets.poiSearchViewModel.prototype.cityGeocodeService
     * @description 城市地址匹配
     * @param {string} keyWords - 城市地址匹配关键字
     */
    cityGeocodeService(keyWords) {
        //todo 是否保留缓存？请求过的数据保留一份缓存？
        if (this.searchCache[keyWords]) {
            this.fire("geocodesucceed", {result: this.searchCache[keyWords]});
        } else {
            this.geoCodeParam.address = keyWords;
            const self = this;
            this.geoCodeService.code(this.geoCodeParam, (geocodingResult) => {
                if (geocodingResult.result) {
                    if (geocodingResult.result.error || geocodingResult.result.length === 0) {
                        self.fire("searchfield", {searchType: "searchGeocodeField"});
                        return;
                    }
                    const geoJsonResult = self._dataToGeoJson(geocodingResult.result);
                    self.fire("geocodesucceed", {result: geoJsonResult});
                }

            });
        }
    },

    /**
     * @description 将地址匹配返回的数据转为geoJson 格式数据
     * @param data
     * @private
     */
    _dataToGeoJson(data) {
        let features = [];
        for (let i = 0; i < data.length; i++) {
            let feature = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [data[i].location.x, data[i].location.y]
                },
                properties: {
                    name: data[i].name,
                    address: data[i].formatedAddress
                }
            };
            features.push(feature);
        }

        return features;
    }

});

export var poiSearchViewModel = function (options) {
    return new POISearchViewModel(options);
};

L.supermap.widgets.poiSearchViewModel = poiSearchViewModel;
