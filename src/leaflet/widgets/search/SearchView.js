/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {
    WidgetsViewBase
} from '../WidgetsViewBase';
import {
    config
} from './CityConfig';
import {
    // WidgetSelect,
    MessageBox,
    NavTabsPage,
    CityTabsPage,
    PaginationContainer,
    AttributesPopContainer,
    Lang
} from '@supermap/iclient-common';

import {
    SearchViewModel
} from './SearchViewModel';

/**
 * @class L.supermap.widgets.search
 * @classdesc 图层查询组件。
 * @category Components Search
 * @version 9.1.1
 * @param {Object} options - 可选参数。
 * @param {Object|Array.<string>} [options.cityConfig] - 城市地址匹配配置，默认为全国城市，与 options.cityGeoCodingConfig 支持匹配的服务对应；
 *                                    配置两种格式：{key1:{A:[],B:[]}, key2:{C:[],D:[]}} 或 ["成都市","北京市"]，用户可根据自己的项目需求进行配置
 * @param {Object} [options.cityGeoCodingConfig] - 城市地址匹配服务配置，包括：{addressUrl:"",key:""} 默认为 online 地址匹配服务，与 options.cityConfig 对应
 * @param {boolean} [options.isGeoCoding=true] - 是否支持城市地址匹配功能。
 * @param {number} [options.pageSize=10] - 地址匹配查询返回记录结果数，最大设置为 20。
 * @param {number} [options.pageNum=1] - 地址匹配查询分页页码，默认 1 代表第一页。
 * @param {number} [options.perPageDataNum=8] - 每页显示个数，最大值为 8。
 * @param {string} [options.position='topright'] - 组件在地图中显示的位置，包括：'topleft'，'topright'，'bottomleft' 和 'bottomright'，继承自 leaflet control。
 * @param {function} [options.style] - 设置图层点线面默认样式，点样式返回 maker 或者 circleMaker；线和面返回 L.path 样式。
 * @param {function} [options.onEachFeature] - 在创建和设置样式后，将为每个创建的要素调用一次的函数。用于将事件和弹出窗口附加到要素。默认情况下，对新创建的图层不执行任何操作。
 * @extends {L.supermap.widgets.widgetsViewBase}
 * @fires L.supermap.widgets.search#searchlayersucceeded
 * @fires L.supermap.widgets.search#searchfailed
 * @fires L.supermap.widgets.search#geocodesucceeded
 */
export var SearchView = WidgetsViewBase.extend({
    options: {
        cityConfig: config,
        cityGeoCodingConfig: {
            addressUrl: "http://www.supermapol.com/iserver/services/localsearch/rest/searchdatas/China/poiinfos",
            key: "fvV2osxwuZWlY0wJb8FEb2i5"
        },
        isGeoCoding: true,
        pageSize: 10,
        pageNum: 1,
        perPageDataNum: 8
    },

    initialize(options) {
        WidgetsViewBase.prototype.initialize.apply(this, [options]);
        //当前选中查询的图层名：
        this.currentSearchLayerName = "";
        this.isSearchLayer = false;
        this.perPageDataNum = this.options.perPageDataNum;
    },

    /*------以下是一些接口-----*/
    /**
     * @function L.supermap.widgets.search.prototype.onAdd
     * @description 向底图添加组件。
     * @private
     * @override
     */
    onAdd: function (map) {
        //初始化组件业务逻辑执行对象 viewModel
        this.viewModel = new SearchViewModel(map, this.options);
        return WidgetsViewBase.prototype.onAdd.apply(this, [map]);
    },

    /**
     * @function L.supermap.widgets.search.prototype.addSearchLayer
     * @description 添加可查询的图层。
     * @param {Array.<L.GeoJSON>|L.GeoJSON} layers - 可查询的图层。
     */
    addSearchLayer(layers) {
        //将可查询图层数据传入vm处理
        this.viewModel.addSearchLayers(layers);
    },

    /*----------以下是创建 dom 元素的方法---------*/
    /**
     * @function L.supermap.widgets.search.prototype._initView
     * @description 创建地址匹配或图层要素查询组件。
     * @override
     * @returns {HTMLElement}
     * @private
     */
    _initView() {
        // self 便于 this 对象的使用
        const self = this;
        const div = document.createElement("div");
        div.setAttribute("class", "widget-search-container");

        //外框
        const poiContainer = document.createElement("div");
        poiContainer.setAttribute("class", "widget-search");
        //主体
        //---------下拉框：
        const poiSettings = document.createElement("div");
        poiSettings.setAttribute("class", "widget-search__settings");
        //下拉框
        const poiSearchName = document.createElement("div");
        //由View 维护，进行交互操作
        poiSearchName.setAttribute("class", "widget-search__settings__name");
        //poiSettings.innerHTML 通过下拉框选项改变

        poiSettings.appendChild(poiSearchName);

        //下拉标记
        const triangleIcon = document.createElement("span");
        triangleIcon.setAttribute("class", "supermapol-icons-solid-down-triangle");
        poiSettings.appendChild(triangleIcon);

        //城市地址匹配页面, 以及图层查询页面
        //城市地址匹配页面：
        let citySelect = null;
        if (this.options.isGeoCoding) {
            const cityTabsPageObj = new CityTabsPage({
                config: this.options.cityConfig
            });
            citySelect = cityTabsPageObj.getElement();
            //点选城市名，修改显示，并执行定位城市查询【城市列表列表点击事件】
            cityTabsPageObj.content.onclick = (e) => {
                if (e.target.nodeName === "SPAN" && e.target.innerText) {
                    this.viewModel.panToCity(e.target.innerHTML);
                    this.messageBox.closeView();
                    poiSearchName.removeChild(poiSearchName.firstChild);
                    poiSearchName.insertBefore(document.createTextNode(e.target.innerHTML), poiSearchName.firstChild);
                    this.isSearchLayer = false;
                }
            };
            //支持城市地址匹配，则初始化显示配置的第一个城市名：
            poiSearchName.appendChild(document.createTextNode(cityTabsPageObj.content.getElementsByTagName("span")[0].innerText));
        }

        //图层查询页面：写法是为了为了代码可读性
        const layersSelect = function () {
            const layersSelect = document.createElement("div");
            layersSelect.setAttribute("class", "widget-search__layers");

            const layersContent = document.createElement("div");
            layersContent.setAttribute("class", "widget-search-layers-content");
            layersSelect.appendChild(layersContent);

            //header todo 两个选项的功能暂没用到，先关闭，后续用到再打开
            const layersHeader = document.createElement("div");
            layersHeader.setAttribute("class", "widget-search__layers__header");
            //加载搜索条件
            const loadBtn = document.createElement("div");
            loadBtn.setAttribute("class", "load-btn");
            layersHeader.appendChild(loadBtn);
            const loadIcon = document.createElement("span");
            loadIcon.setAttribute("class", "supermapol-icons-poi-load");
            loadBtn.appendChild(loadIcon);
            const loadBtnText = document.createElement("span");
            loadBtnText.appendChild(document.createTextNode(Lang.i18n("text_loadSearchCriteria")));
            loadBtn.appendChild(loadBtnText);
            //保存搜索条件
            const saveBtn = document.createElement("div");
            saveBtn.setAttribute("class", "save-btn");
            layersHeader.appendChild(saveBtn);
            const icon = document.createElement("span");
            icon.setAttribute("class", "supermapol-icons-poi-save");
            saveBtn.appendChild(icon);
            const saveBtnText = document.createElement("span");
            saveBtnText.appendChild(document.createTextNode(Lang.i18n("text_saveSearchCriteria")));
            saveBtn.appendChild(saveBtnText);

            //body
            const layerSelectOptions = document.createElement("div");
            layerSelectOptions.setAttribute("class", "widget-search__layers__body");
            //选中查询图层监听
            //选择查询图层【图层列表点击事件】
            layerSelectOptions.onclick = (e) => {
                //先进行清除操作
                self.clearSearchResult();

                let selectLayerOption = null;
                if (e.target.classList[0] === "widget-search__layers__itme__singleselect") {
                    selectLayerOption = e.target;
                } else if (e.target.classList[0] === "widget-single-default-img" || e.target.classList[0] === "single-label") {
                    selectLayerOption = e.target.parentNode;
                } else {
                    return;
                }

                if (document.getElementsByClassName("widget-single-checked-img").length > 0) {
                    document.getElementsByClassName("widget-single-checked-img")[0].setAttribute("class", "widget-single-default-img");
                }

                selectLayerOption.firstChild.setAttribute("class", "widget-single-checked-img");
                self.currentSearchLayerName = selectLayerOption.lastChild.innerText;
                self.isSearchLayer = true;
                poiSearchName.removeChild(poiSearchName.firstChild);
                poiSearchName.insertBefore(document.createTextNode(self.currentSearchLayerName), poiSearchName.firstChild);

                self.viewModel.panToLayer(self.currentSearchLayerName);
                self.messageBox.closeView();
            };

            layersContent.appendChild(layerSelectOptions);

            //读取当前图层数据，并展现
            //只有调用添加查询图层接口才能添加图层选项

            return layersSelect;
        }();

        //配置开启 城市匹配功能则添加
        let navTabs = [];
        if (citySelect) {
            navTabs.push({
                title: Lang.i18n("title_searchCity"),
                content: citySelect
            })
        }
        navTabs.push({
            title: Lang.i18n("title_searchLayer"),
            content: layersSelect
        });
        const navTabsPageObject = new NavTabsPage({
            tabs: navTabs
        });
        const navTabsPage = navTabsPageObject.getElement();
        navTabsPageObject.closeView();
        poiContainer.appendChild(navTabsPage);

        poiSettings.onclick = () => {
            if (navTabsPage.hidden) {
                navTabsPageObject.showView();
            } else {
                navTabsPageObject.closeView();
            }
        };
        poiContainer.appendChild(poiSettings);
        //初始时，下拉框若没赋值显示信息，则再次赋值：
        if (!poiSearchName.innerText) {
            poiSearchName.appendChild(document.createTextNode(Lang.i18n("text_label_chooseSearchLayers")));
        }
        //---------下拉框 END

        //---------搜索输入框：
        const poiInputContainer = document.createElement("div");
        poiInputContainer.setAttribute("class", "widget-search__input");
        const poiInput = document.createElement("input");
        poiInput.type = "text";
        poiInput.placeholder = Lang.i18n("text_label_searchTips");

        poiInputContainer.appendChild(poiInput);
        //由View 维护，进行交互操作
        this.poiInput = poiInput;
        //清除输入内容按钮：
        const poiInputClose = document.createElement("span");
        poiInputClose.setAttribute("class", "supermapol-icons-close");
        poiInputClose.hidden = true;

        poiInputContainer.appendChild(poiInputClose);

        poiContainer.appendChild(poiInputContainer);
        //---------搜索输入框 END

        //--------搜索按钮：
        const searchBtn = document.createElement("div");
        searchBtn.setAttribute("class", "widget-search-icon supermapol-icons-search");
        //查询要素或匹配要素【搜索按钮点击事件】
        searchBtn.onclick = () => {
            //若是遮挡结果显示，则关闭
            resultDomObj.closeView();
            this.clearSearchResult();
            this.messageBox.closeView();
            navTabsPageObject.closeView();
            const keyWord = this.poiInput.value.trim();
            if (keyWord === "") {
                this.messageBox.showView(Lang.i18n('msg_searchKeywords'));
                return;
            }
            if (this.isSearchLayer) {
                this.viewModel.search(keyWord, this.currentSearchLayerName);
            } else {
                this.viewModel.search(keyWord);
            }
        };

        //【输入框输入内容回车事件】
        poiInput.onkeypress = (e) => {
            //.which属性判断按下的是哪个键，回车键的键位序号为13
            if (e.which == 13) {
                //手动触发 searchBtn 得点击事件，执行查询操作
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, true);
                searchBtn.dispatchEvent(evt);
            }
        };

        poiContainer.appendChild(searchBtn);
        //--------搜索按钮 END

        //查询结果页面
        const resultDomObj = new PaginationContainer();
        this._resultDomObj = resultDomObj;
        const resultContainer = function createResultPage() {
            const resultContainer = resultDomObj.getElement();
            resultContainer.style.position = "absolute";
            resultContainer.style.top = "44px";
            resultContainer.style.right = "0";
            //先关闭结果界面，当有数据时再打开
            resultDomObj.closeView();

            //【结果列表点击事件】，以支持联动map上对应要素：
            resultDomObj.content.onclick = (e) => {
                let selectFeatureOption = null;
                if (e.target.parentNode.className === "widget-search-result-info") {
                    selectFeatureOption = e.target.parentNode.parentNode;
                } else if (e.target.parentNode.className === "widget-search__resultitme") {
                    selectFeatureOption = e.target.parentNode;
                } else if (e.target.className === "widget-search__resultitme") {
                    selectFeatureOption = e.target;
                } else {
                    return;
                }
                //修改
                if (document.getElementsByClassName("widget-search__resultitme-selected").length > 0) {
                    document.getElementsByClassName("widget-search__resultitme-selected")[0].classList.remove("widget-search__resultitme-selected");
                }

                selectFeatureOption.firstChild.classList.add("widget-search__resultitme-selected");

                let filter = selectFeatureOption.children[1].firstChild.innerText;
                //联动地图上要素响应
                self._linkageFeature(filter);
            };

            return resultContainer;
        }();
        poiContainer.appendChild(resultContainer);

        //清除输入框内容【输入框删除按钮点击事件】
        poiInputClose.onclick = (e) => {
            this.clearSearchResult();
            poiInput.value = "";
            e.target.hidden = true;
            resultDomObj.closeView();
        };

        //【输入框输入内容事件】
        poiInput.oninput = () => {
            poiInputClose.hidden = false;
        };

        //添加提示框
        this.messageBox = new MessageBox();
        //绑定 VM 的监听
        this._addViewModelListener();
        div.appendChild(poiContainer);

        //阻止 map 默认事件
        this._preventMapEvent(div, this.map);
        return div;
    },

    /**
     * @function L.supermap.widgets.search.prototype._createSearchLayerItem
     * @description 创建查询图层选项。
     * @private
     */
    _createSearchLayerItem(layerName) {
        const layerOption = document.createElement("div");
        layerOption.setAttribute("class", "widget-search__layers__itme");

        // 创建圆形单选框
        const singleSelect = document.createElement("div");
        singleSelect.setAttribute("class", "widget-search__layers__itme__singleselect");
        const singleIcon = document.createElement("div");
        singleIcon.setAttribute("class", "widget-single-default-img");
        singleSelect.appendChild(singleIcon);
        const singleLabel = document.createElement("span");
        singleLabel.setAttribute("class", "single-label");
        singleLabel.innerHTML = layerName;
        singleSelect.appendChild(singleLabel);

        layerOption.appendChild(singleSelect);

        //attributes-select todo 暂不支持该功能
        // const attributesSelect = (new WidgetSelect(layer.layer.attributeNames)).getElement();
        //选择查询的字段  todo 限制图层查找属性功能待属性选择框优化后完善
        /*attributesSelect.onchange = (e) => {
            this.searchAttributes = e.target.value;
        };*/
        // layerOption.appendChild(attributesSelect);

        document.getElementsByClassName("widget-search__layers__body")[0].appendChild(layerOption);
    },

    /**
     * @function L.supermap.widgets.search.prototype._createResultItem
     * @description 创建查询结果列表。
     * @private
     */
    _createResultItem(featureType, properties) {
        const item = document.createElement("div");
        item.setAttribute("class", "widget-search__resultitme");

        let icon = document.createElement("div");
        if (featureType === "Point" || featureType === "MultiPoint") {
            icon.setAttribute("class", "supermapol-icons-marker-layer widget-search-result-icon");
        } else if (featureType === "LineString" || featureType === "MultiLineString ") {
            icon.setAttribute("class", "supermapol-icons-line-layer widget-search-result-icon");
        } else if (featureType === "Polygon" || featureType === "MultiPolygon") {
            icon.setAttribute("class", "supermapol-icons-polygon-layer widget-search-result-icon");
        } else {
            icon.setAttribute("class", "supermapol-icons-point-layer widget-search-result-icon");
        }
        item.appendChild(icon);

        const info = document.createElement("div");
        info.setAttribute("class", "widget-search-result-info");
        const info1 = document.createElement("div");
        info.appendChild(info1);

        const info2 = document.createElement("div");
        //分地址匹配和图层搜索的两种数据展现形式：
        if (properties.name) {
            info1.innerHTML = properties.name;
            info2.innerHTML = properties.address;
            info.appendChild(info2);
        } else {
            info1.innerHTML = properties.filterAttributeName + ": " + properties.filterAttributeValue;
        }

        item.appendChild(info);

        //暂时删除复选框UI
        const check = document.createElement("div");
        check.setAttribute("class", "widget-checkbox widget-checkbox-default-img");
        // item.appendChild(check);
        return item;
    },

    /*----------对 VM 的一些事件监听 ----------*/
    /**
     * @function L.supermap.widgets.search.prototype._addViewModelListener
     * @description 绑定对 VM 的事件监听。
     * @private
     */
    _addViewModelListener() {
        //----可查询图层变化监听
        this.viewModel.on("searchlayerschanged", (layers) => {
            for (let i = 0; i < layers.length; i++) {
                this._createSearchLayerItem(layers[i]);
            }
        });

        //----可查询图层变化监听
        this.viewModel.on("newlayeradded", (e) => {
            this._createSearchLayerItem(e.layerName);
        });

        //----图层查询结果监听
        this.viewModel.on("searchlayersucceeded", (e) => {
            const data = e.result;
            this.clearSearchResult();
            this.searchResultLayer = L.featureGroup(data, {
                pointToLayer: this.options.style,
                style: this.options.style
            }).bindPopup(function (layer) {
                if (layer.feature.properties) {
                    return (new AttributesPopContainer({
                        attributes: layer.feature.properties
                    })).getElement();
                }
            }).addTo(this.map);
            this.searchResultLayer.eachLayer((layer) => {
                this.options.onEachFeature ? this.options.onEachFeature(layer.toGeoJSON(), layer) :
                    this._featureOnclickEvent.bind(this)(layer.toGeoJSON(), layer);
            });
            this.searchLayersData = data;
            //查询结果列表：
            this._prepareResultData(data);
            /**
             * @event L.supermap.widgets.search#searchlayersucceeded
             * @description 图层查询成功后触发。
             * @property {Object} result  - 事件返回的 GeoJSON 格式数据对象。
             */
            this._event.fire("searchlayersucceeded", {
                result: this.searchResultLayer.toGeoJSON()
            });
        });

        //----地址匹配服务监听
        this.viewModel.on("geocodesucceeded", (e) => {
            const data = e.result;
            //先清空当前有的地址匹配图层
            this.clearSearchResult();
            this.searchResultLayer = L.geoJSON(data, {
                pointToLayer: this.options.style,
                style: this.options.style,
                onEachFeature: this.options.onEachFeature || this._featureOnclickEvent.bind(this)
            }).bindPopup(function (layer) {
                if (layer.feature.properties) {
                    return (new AttributesPopContainer({
                        attributes: layer.feature.properties
                    })).getElement();
                }
            }).addTo(this.map);
            this.searchLayersData = data
            //查询结果列表：
            this._prepareResultData(data);
            /**
             * @event L.supermap.widgets.search#geocodesucceeded
             * @description 地址匹配服务成功后触发。
             * @property {Object} result  - 事件返回的 GeoJSON 格式数据对象。
             */
            this._event.fire("geocodesucceeded", {
                result: data
            });
        });

        //----地址匹配或图层查询失败监听
        this.viewModel.on("searchfailed", (e) => {
            let message = "";
            if (e.searchType === "searchGeocodeField") {
                message = Lang.i18n("msg_searchGeocodeField");
            } else if (e.searchType === "cityGeocodeField") {
                message = Lang.i18n("msg_cityGeocodeField");
            } else {
                message = Lang.i18n("msg_getFeatureField");
            }
            this.messageBox.showView(message)
            /**
             * @event L.supermap.widgets.search#searchfailed
             * @description 图层属性查询失败后触发。
             * @property {string} message - 失败原因。
             */
            this._event.fire("searchfailed", {
                message: message
            });
        });
    },

    /*-------以下是一些辅助性功能函数 -------*/
    /**
     * @function L.supermap.widgets.search.prototype._prepareResultData
     * @description 准备需要填入结果展示页面里的数据。
     * @param {Array.<Feature>} data - 图层查询或地址匹配返回的要素数据数组。
     * @private
     */
    _prepareResultData(data) {
        this.currentResult = data;
        //向下取舍，这只页码
        let pageCounts = Math.ceil(data.length / this.perPageDataNum);
        this._resultDomObj.setPageLink(pageCounts);
        //初始结果页面内容：
        this._createResultListByPageNum(1, data);
        this._resultDomObj.showView();

        //给页面模板设置联动事件
        this._resultDomObj.setLinkageEvent(_linkageEvent);
        const self = this;

        function _linkageEvent(page) {
            self._createResultListByPageNum(page, self.currentResult);
        }
    },

    /**
     * @function L.supermap.widgets.search.prototype._createResultListByPageNum
     * @description 根据页面值填充内容。
     * @param {number} page - 页数。
     * @param {Array.<Feature>} data - 图层查询或地址匹配返回的要素数据数组。
     * @private
     */
    _createResultListByPageNum(page, data) {
        let start = 0,
            end;
        if (page === 1 && data.length < this.perPageDataNum) {
            //data数据不满8个时：
            end = data.length - 1;
        } else if (page * this.perPageDataNum > data.length) {
            //最后一页且数据不满8个时
            start = this.perPageDataNum * (page - 1);
            end = data.length - 1
        } else {
            //中间页面的情况
            start = this.perPageDataNum * (page - 1);
            end = page * this.perPageDataNum - 1
        }
        const content = document.createElement("div");
        for (let i = start; i <= end; i++) {
            let properties, featureType = "Point";
            if (data[i].filterAttribute) {
                featureType = data[i].feature.geometry.type;
                properties = data[i].filterAttribute;
            } else {
                properties = data[i].properties;
            }
            content.appendChild(this._createResultItem(featureType, properties))
        }
        this._resultDomObj.setContent(content);
        this._resultDomObj.showView();

        //查询完成默认选中第一个结果：
        content.firstChild.getElementsByClassName("widget-search-result-icon")[0].classList.add("widget-search__resultitme-selected");
        const filter = content.firstChild.getElementsByClassName("widget-search-result-info")[0].firstChild.innerText;

        !this._selectMarkerFeature && this._linkageFeature(filter);
    },

    /**
     * @function L.supermap.widgets.search.prototype._flyToBounds
     * @param {L.Bounds} bounds - 当前图层范围。
     * @description 移动到图层。
     * @private
     */
    _flyToBounds(bounds) {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        if (sw.lat === ne.lat && sw.lng === ne.lng) {
            this.map.flyTo(sw);
        } else {
            // this.map.fitBounds(this.searchResultLayer.getBounds());
            this.map.fitBounds(bounds);
        }
    },

    /**
     * @function L.supermap.widgets.search.prototype._linkageFeature
     * @description 点击结果列表联动地图上要素响应。
     * @private
     */
    _linkageFeature(filter) {
        let filterValue = "";
        if (this.isSearchLayer) {
            filterValue = filter.split(":")[1].trim();
        } else {
            filterValue = filter;
        }
        this._selectFeature && this._selectFeature.addTo(this.map);
        this.searchResultLayer.eachLayer((layer) => {
            // this._resetLayerStyleToDefault(layer);
            if (!filterValue || layer.filterAttribute && layer.filterAttribute.filterAttributeValue === filterValue ||
                layer.feature.properties && layer.feature.properties.name === filterValue) {
                layer.remove();

                this._setSelectedLayerStyle(layer);
                /*layer.bindPopup(function () {
                    return (new AttributesPopContainer(layer.feature.properties)).getElement()
                }, {closeOnClick: false}).openPopup().addTo(this.map);*/
                //若这个图层只有一个点的话，则直接 flyTo 到点：

            }
        });
    },

    /**
     * @function L.supermap.widgets.search.prototype.clearSearchResult
     * @description 清空当前查询的结果等。
     */
    clearSearchResult() {
        if (this.searchResultLayer) {
            this.map.closePopup();
            //若当前是查询图层的结果，则不删除图层，只修改样式
            !this.isSearchLayer && this.map.removeLayer(this.searchResultLayer);
            this._selectMarkerFeature && this.map.removeLayer(this._selectMarkerFeature);
            this._selectFeaturethis && this.map.removeLayer(this._selectFeature);
            this._selectMarkerFeature = null;
            this._selectFeature = null;
            this.searchResultLayer = null;
            this.currentResult = null;
        }
    },
    /**
     * @function L.supermap.widgets.search.prototype._featureOnclickEvent
     * @description 要素点击事件
     * @param {L.layer} layer - 需要设置选中样式的图层。
     * @private
     */
    _featureOnclickEvent(feature, layer) {
        layer.on('click', () => {
            let pageEles1 = document.getElementsByClassName('widget-pagination__link')[0];
            this._resultDomObj._changePageEvent({
                target: pageEles1.children[0].children[0]
            });
            this._selectFeature && this._selectFeature.addTo(this.map);
            layer.remove();
            let page, dataIndex;

            for (let i = 0; i < this.searchLayersData.length; i++) {
                let item = this.searchLayersData[i]
                if ((item.properties && (item.properties.name === feature.properties.name)) || (item.filterAttribute && (item.filterAttribute.filterAttributeName + ": " + item.filterAttribute.filterAttributeValue) === (layer.filterAttribute.filterAttributeName + ": " + layer.filterAttribute.filterAttributeValue))) {
                    dataIndex = i % this.perPageDataNum;
                    page = parseInt(i / this.perPageDataNum) + 1;
                    break;
                }
            }
            if (page > 1) {
                for (let i = 1; i < page; i++) {
                    let pageEles;
                    pageEles = document.getElementsByClassName('widget-pagination__link')[0];
                    this._resultDomObj._changePageEvent({
                        target: pageEles.children[pageEles.children.length - 2].children[0]
                    });
                }
            }
            let pageList = document.getElementsByClassName('widget-search-result-info')

            let target = pageList[dataIndex].children[0];

            if (target.innerHTML === feature.properties.name || target.innerHTML === (layer.filterAttribute.filterAttributeName + ": " + layer.filterAttribute.filterAttributeValue)) {
                let selectFeatureOption = pageList[dataIndex].parentNode;
                //修改
                if (document.getElementsByClassName("widget-search__resultitme-selected").length > 0) {
                    document.getElementsByClassName("widget-search__resultitme-selected")[0].classList.remove("widget-search__resultitme-selected");
                }
                selectFeatureOption.firstChild.classList.add("widget-search__resultitme-selected");
                this._setSelectedLayerStyle(layer);
            }
        }, this)
    },
    /**
     * @function L.supermap.widgets.search.prototype._setSelectedLayerStyle
     * @description 设置图层选中样式。
     * @param {L.layer} layer - 需要设置选中样式的图层。
     * @private
     */
    _setSelectedLayerStyle(layer) {
        this._selectMarkerFeature && this._selectMarkerFeature.remove();
        this._selectMarkerFeature = null;
        this._selectFeature = layer;
        //circleMarker 需要变成 marker 的样式：
        this._selectMarkerFeature = L.geoJSON(layer.toGeoJSON(), {
            //点选中样式, todo marker 显示位置需要调整
            pointToLayer: (geoJsonPoint, latlng) => {
                return L.marker(latlng, {
                    icon: L.divIcon({
                        className: 'widget-select-marker-icon',
                        iconAnchor: [15, 0]
                    })
                })
            },
            //线和面选中样式：
            style: {
                fillColor: 'red',
                weight: 1,
                opacity: 1,
                color: 'red',
                fillOpacity: 0.2
            }
        }).addTo(this.map);
        this._selectMarkerFeature.bindPopup(function () {
            return (new AttributesPopContainer({
                attributes: layer.feature.properties
            })).getElement()
        }, {
            closeOnClick: false
        }).openPopup().addTo(this.map);

        this._flyToBounds(this.searchResultLayer.getBounds());
        let center;
        if (layer.getLatLng) {
            center = layer.getLatLng();
        } else if (layer.getCenter) {
            center = layer.getCenter();
        }
        this.map.setView(center);
    }
});

export var searchView = function (options) {
    return new SearchView(options);
};

L.supermap.widgets.search = searchView;