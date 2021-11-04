/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import '../../core/Base';
 import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
 import { GeoJsonLayersDataModel } from '../commonmodels/GeoJsonLayersModel';

/**
 * @class L.supermap.components.searchViewModel
 * @classdesc 图层查询组件功能类。
 * @version 9.1.1
 * @category Components Search
 * @param {L.Map} map - Leaflet Map 对象。
 * @param {Object} options - 可选参
 * @param {Object} [options.cityGeoCodingConfig] - 城市地址匹配服务配置，包括：{addressUrl:"",key:""}，默认为 online 本地搜索服务。
 * @fires L.supermap.components.searchViewModel#newlayeradded
 * @fires L.supermap.components.searchViewModel#searchlayersucceeded
 * @fires L.supermap.components.searchViewModel#searchfailed
 * @fires L.supermap.components.searchViewModel#geocodesucceeded
 * @extends {L.Evented}
 */
export var SearchViewModel = L.Evented.extend({
    options: {
        cityGeoCodingConfig: {
            addressUrl: "https://www.supermapol.com/iserver/services/localsearch/rest/searchdatas/China/poiinfos",
            key: "fvV2osxwuZWlY0wJb8FEb2i5"
        }
    },

    initialize(map, options) {
        if (map) {
            /**
             * @member {L.Map} L.supermap.components.searchViewModel.prototype.map
             * @description 当前组件所在的地图。
             */
            this.map = map;
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }

        L.Util.setOptions(this, options);
        //初始化Model
        this.dataModel = new GeoJsonLayersDataModel();
        //初始话地址匹配服务

        this.geoCodeParam = {
            keyWords: '北京市',
            city: "北京市",
            pageSize: this.options.pageSize,
            pageNum: this.options.pageNum
        };
        //查询缓存
        this.searchCache = {};
    },

    /**
     * @function L.supermap.components.searchViewModel.prototype.search
     * @description 查询。
     * @param {string} keyWords - 查询的关键字。
     * @param {string} [searchLayerName] - 执行的查询类型，支执行矢量图层属性查询，当为 "geocode" 则执行地址匹配。
     */
    search(keyWord, searchLayerName) {
        if (!searchLayerName) {
            this.searchFromCityLocalSearchService(keyWord);
        } else {
            this.searchFromLayer(keyWord, searchLayerName);
        }
    },

    /**
     * @function L.supermap.components.searchViewModel.prototype.searchFromLayer
     * @description 图层属性查询。
     * @param {string} searchLayerName - 查询的图层名。
     * @param {string} keyWord - 图层属性搜索关键字。
     */
    searchFromLayer(keyWord, searchLayerName) {
        if (this.dataModel.layers[searchLayerName]) {
            let resultFeatures = this.dataModel.layers[searchLayerName].getFeaturesByKeyWord(keyWord);
            if (resultFeatures && resultFeatures.length > 0) {
                /**
                 * @event L.supermap.components.searchViewModel#searchlayersucceeded
                 * @description 图层属性查询成功后触发。
                 * @property {Object} result - 图层数据。
                 */
                this.fire("searchlayersucceeded", {
                    result: resultFeatures
                });
            } else {
                /**
                 * @event L.supermap.components.searchViewModel#searchfailed
                 * @description 图层属性查询失败后触发。
                 * @property {string} searchType - 图层属性查询状态。
                 */
                this.fire("searchfailed", {
                    searchType: "searchLayersField"
                });
            }
        }
    },

    /**
     * @function L.supermap.components.searchViewModel.prototype.searchFromCityLocalSearchService
     * @description 城市地址匹配查询。
     * @param {string} keyWords - 城市地址匹配查询关键字。
     */
    searchFromCityLocalSearchService(keyWords) {
        //todo 是否保留缓存？请求过的数据保留一份缓存？
        if (this.searchCache[keyWords]) {
            /**
             * @event L.supermap.components.searchViewModel#geocodesucceeded
             * @description 城市地址匹配成功后触发。
             * @property {Object} result - 城市匹配成功后返回的数据。
             */
            this.fire("geocodesucceeded", {
                result: this.searchCache[keyWords]
            });
        } else {
            this.geoCodeParam.keyWords = keyWords || this.geoCodeParam.city;
            const self = this;
            let url = this._getSearchUrl(this.geoCodeParam);
            FetchRequest.get(url).then((response) => {
                return response.json();
            }).then((geocodingResult) => {
                if (geocodingResult.error || geocodingResult.poiInfos.length === 0) {
                    self.fire("searchfailed", {
                        searchType: "searchGeocodeField"
                    });
                    return;
                }
                if (geocodingResult.poiInfos) {
                    const geoJsonResult = self._dataToGeoJson(geocodingResult.poiInfos, self.geoCodeParam);
                    self.fire("geocodesucceeded", {
                        result: geoJsonResult
                    });
                }
            })
        }
    },

    /**
     * @function L.supermap.components.searchViewModel.prototype.addSearchLayers
     * @description 添加新的可查询图层。
     * @param {Array.<L.GeoJSON>} layers - 新添加的图层对象。
     */
    addSearchLayers(layers) {
        this.dataModel.addLayers(layers, (e) => {
            /**
             * @event L.supermap.components.searchViewModel#newlayeradded
             * @description 添加查询图层事件。
             * @property {Object} result  - 事件返回的新的查询图层对象。
             * @property {string} layerName  - 事件返回的新的查询图层对象名。
             */
            this.fire("newlayeradded", {
                layerName: e.layerName
            });
        }, null, this);
    },

    /**
     * @function L.supermap.components.searchViewModel.prototype.panToLayer
     * @description 缩放到指定图层。
     * @param {string} layerName - 指定缩放的图层名。
     */
    panToLayer(layerName) {
        if (this.dataModel.layers[layerName]) {
            this.map.flyToBounds(this.dataModel.layers[layerName].layer.getBounds());
        }
    },

    /**
     * @function L.supermap.components.searchViewModel.prototype.panToCity
     * @description 缩放到指定城市。
     * @param {string} city - 指定缩放的城市名。
     */
    panToCity(city) {
        this.geoCodeParam.keyWords = city;
        this.geoCodeParam.city = city;
        const self = this;
        let url = this._getSearchUrl(this.geoCodeParam);
        FetchRequest.get(url).then((response) => {
            return response.json();
        }).then((geocodingResult) => {
            if (geocodingResult.poiInfos.length > 0) {
                //缩放至城市
                const center = L.latLng(geocodingResult.poiInfos[0].location.y, geocodingResult.poiInfos[0].location.x);
                self.map.setView(center, 8);
            } else {
                self.fire("searchfailed", {
                    searchType: "cityGeocodeField"
                });
            }
        })
    },


    /**
     * @description 将地址匹配返回的数据转为 GeoJSON 格式数据。
     * @param data
     * @private
     */
    _dataToGeoJson(data, geoCodeParam) {
        let features = [];
        for (let i = 0; i < data.length; i++) {
            let feature = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [data[i].location.x, data[i].location.y]
                },
                properties: {
                    name: data[i].name || geoCodeParam.keyWords,
                    address: data[i].formatedAddress || data[i].address
                }
            };
            features.push(feature);
        }

        return features;
    },

     /**
     * @function L.supermap.components.searchViewModel.prototype._getSearchUrl
     * @description 获取地理编码查询地址。
     * @param {Object} geoCodeParam - 地理编码查询参数。
     * @private
     */
    _getSearchUrl(geoCodeParam) {
        let url = this.options.cityGeoCodingConfig.addressUrl + `.json?keywords=${geoCodeParam.keyWords}&city=${geoCodeParam.city}&pageSize=${geoCodeParam.pageSize}&pageNum=${geoCodeParam.pageNum}&key=${this.options.cityGeoCodingConfig.key}`;
        return url;
    }
});

export var searchViewModel = function (options) {
    return new SearchViewModel(options);
};
