/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {config} from '../../../leaflet/widgets/poisearch/CityConfig';
import {
    WidgetSelect,
    MessageBox,
    NavTabsPage,
    CityTabsPage,
    PaginationContainer,
    AttributesPopContainer
} from '@supermap/iclient-common';
import {POISearchViewModel} from './POISearchViewModel';

/**
 * @class L.supermap.widgets.poiSearch
 * @classdesc 地址匹配或图层要素查询微件
 * @category Widgets
 * @param {string} [options.position='topright'] - 控件位置，继承自 leaflet control。
 * @param {string} [options.addressUrl] - 配置地址匹配服务。
 * @param {Object|Array.<string>} [options.cityConfig] - 城市地址匹配配置，默认为全国城市，与 options.cityGeoCodingConfig 支持匹配的服务对应；
 *                                    配置两种格式：{key1:{A:[],B:[]}, key2:{C:[],D:[]}} 或 ["成都市","北京市"]，用户可根据自己的项目需求进行配置
 * @param {Object} [options.cityGeoCodingConfig] - 城市地址匹配服务配置，包括：{addressUrl:"",key:""} 默认为 online 地址匹配服务，与 options.cityConfig 对应
 * @param {boolean} [options.isGeoCoding=true] - 是否支持城市地址匹配功能
 */
export var POISearchView = L.Control.extend({
    options: {
        //控件位置 继承自leaflet control
        position: 'topright',
        orientation: 'horizontal',
        cityConfig: config,
        cityGeoCodingConfig: null,
        isGeoCoding: true
    },

    initialize(options) {
        L.setOptions(this, options);

        this.event = new L.Evented();

        //当前选中查询的图层名：
        this.currentSearchLayerName = "";
        this.isSearchLayer = false;
    },
    /*------以下是一些接口-----*/
    /**
     * @function L.supermap.widgets.poiSearch.prototype.onAdd
     * @description 向底图添加微件
     */
    onAdd: function (map) {
        this.map = map;
        //初始化微件业务逻辑执行对象 viewModel
        this.viewModel = new POISearchViewModel(map, this.options.cityGeoCodingConfig);

        return this._initOpenFileView();
    },
    /**
     * @function L.supermap.widgets.poiSearch.prototype.addSearchLayer
     * @description 添加可查询的图层到 viewModel
     * @param {Array.<L.GeoJSON>|L.GeoJSON} layers - 可查询的图层
     */
    addSearchLayer(layers) {
        //将可查询图层数据传入vm处理
        this.viewModel.addSearchLayers(layers);
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype.on
     * @param {string} eventType - 监听的事件类型
     * @param {Function} callback - 监听事件的回调函数
     */
    on(eventType, callback) {
        this.event.on(eventType, callback);
    },

    /*----------以下是创建 dom 元素的方法---------*/
    /**
     * @function L.supermap.widgets.poiSearch.prototype._initOpenFileView
     * @description 创建打开本地文件数据微件
     * @return {div}
     * @private
     */
    _initOpenFileView() {
        // self 便于 this 对象的使用
        const self = this;
        const div = document.createElement("div");
        div.setAttribute("class", "poi");

        //外框
        const poiContainer = document.createElement("div");
        poiContainer.setAttribute("class", "widgets-poi");
        //主体
        //---------下拉框：
        const poiSettings = document.createElement("div");
        poiSettings.setAttribute("class", "widgets-poi-settings");
        //下拉框
        const poiSearchName = document.createElement("div");
        //由View 维护，进行交互操作
        poiSearchName.setAttribute("class", "widgets-poi-settings-name");
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
            const cityTabsPageObj = new CityTabsPage(this.options.cityConfig);
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
            layersSelect.setAttribute("class", "layers-select");

            const layersContent = document.createElement("div");
            layersContent.setAttribute("class", "poi-layers-content");
            layersSelect.appendChild(layersContent);

            //header todo 两个选项的功能暂没用到，先关闭，后续用到再打开
            const layersHeader = document.createElement("div");
            layersHeader.setAttribute("class", "poi-layers-header");
            //加载搜索条件
            const loadBtn = document.createElement("div");
            loadBtn.setAttribute("class", "load-btn");
            layersHeader.appendChild(loadBtn);
            const loadIcon = document.createElement("span");
            loadIcon.setAttribute("class", "supermapol-icons-poi-load");
            loadBtn.appendChild(loadIcon);
            const loadBtnText = document.createElement("span");
            loadBtnText.appendChild(document.createTextNode("加载搜索条件"));
            loadBtn.appendChild(loadBtnText);
            //保存搜索条件
            const saveBtn = document.createElement("div");
            saveBtn.setAttribute("class", "save-btn");
            layersHeader.appendChild(saveBtn);
            const icon = document.createElement("span");
            icon.setAttribute("class", "supermapol-icons-poi-save");
            saveBtn.appendChild(icon);
            const saveBtnText = document.createElement("span");
            saveBtnText.appendChild(document.createTextNode("保存搜索条件"));
            saveBtn.appendChild(saveBtnText);

            //body
            const layerSelectOptions = document.createElement("div");
            layerSelectOptions.setAttribute("class", "poi-layers-body");
            //选中查询图层监听
            //选择查询图层【图层列表点击事件】
            layerSelectOptions.onclick = (e) => {
                //先进行清除操作
                self._clearSearchResult();

                let selectLayerOption = null;
                if (e.target.classList[0] === "widgets-singlesSelect") {
                    selectLayerOption = e.target;
                } else if (e.target.classList[0] === "single-default-img" || e.target.classList[0] === "single-label") {
                    selectLayerOption = e.target.parentNode;
                } else {
                    return;
                }

                if (document.getElementsByClassName("single-checked-img").length > 0) {
                    document.getElementsByClassName("single-checked-img")[0].setAttribute("class", "single-default-img");
                }

                selectLayerOption.firstChild.setAttribute("class", "single-checked-img");
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
        let navTabsPageOptions = [];
        if (citySelect) {
            navTabsPageOptions.push({
                title: "搜索城市",
                content: citySelect
            })
        }
        navTabsPageOptions.push({
            title: "搜索图层",
            content: layersSelect
        });
        const navTabsPageObject = new NavTabsPage(navTabsPageOptions);
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
            poiSearchName.appendChild(document.createTextNode("选择查询图层"));
        }
        //---------下拉框 END

        //---------搜索输入框：
        const poiInputContainer = document.createElement("div");
        poiInputContainer.setAttribute("class", "widgets-poi-input");
        const poiInput = document.createElement("input");
        poiInput.type = "text";
        poiInput.placeholder = "搜索城市地点或图层要素";

        poiInputContainer.appendChild(poiInput);
        //由View 维护，进行交互操作
        this.poiInput = poiInput;
        //清除输入内容按钮：
        const poiInputClose = document.createElement("span");
        poiInputClose.setAttribute("class", "supermapol-icons-close");
        poiInputClose.hidden = true;

        this.poiInputClose = poiInputClose;
        poiInputContainer.appendChild(poiInputClose);

        poiContainer.appendChild(poiInputContainer);
        //---------搜索输入框 END

        //--------搜索按钮：
        const searchBtn = document.createElement("div");
        searchBtn.setAttribute("class", "widgets-poi-icon supermapol-icons-search");
        //查询要素或匹配要素【搜索按钮点击事件】
        searchBtn.onclick = () => {
            //若是遮挡结果显示，则关闭
            resultDomObj.closeView();
            this._clearSearchResult();
            this.messageBox.closeView();
            navTabsPageObject.closeView();
            const keyWord = this.poiInput.value;
            if (keyWord === "") {
                this.messageBox.showView("搜索关键字不能为空，请输入搜索条件。");
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
                if (e.target.parentNode.className === "poi-result-info") {
                    selectFeatureOption = e.target.parentNode.parentNode;
                } else if (e.target.parentNode.className === "poi-result-items") {
                    selectFeatureOption = e.target.parentNode;
                } else if (e.target.className === "poi-result-items") {
                    selectFeatureOption = e.target;
                } else {
                    return;
                }
                //修改
                if (document.getElementsByClassName("poi-result-selected").length > 0) {
                    document.getElementsByClassName("poi-result-selected")[0].classList.remove("poi-result-selected");
                }

                selectFeatureOption.firstChild.classList.add("poi-result-selected");

                let filter = selectFeatureOption.children[1].firstChild.innerText;
                //联动地图上要素响应
                self._linkageFeature(filter);
            };

            return resultContainer;
        }();
        poiContainer.appendChild(resultContainer);

        //清除输入框内容【输入框删除按钮点击事件】
        poiInputClose.onclick = (e) => {
            this._clearSearchResult();
            poiInput.value = "";
            e.target.hidden = true;
            resultDomObj.closeView();
        };

        //【输入框输入内容事件】
        poiInput.oninput = () => {
            poiInputClose.hidden = false;
        };

        //关闭在控件上触发地图的事件响应：
        poiContainer.addEventListener('mouseover', function () {
            self.map.dragging.disable();
            self.map.scrollWheelZoom.disable();
            self.map.doubleClickZoom.disable();
        });
        poiContainer.addEventListener('mouseout', function () {
            self.map.dragging.enable();
            self.map.scrollWheelZoom.enable();
            self.map.doubleClickZoom.enable();
        });

        //添加提示框
        this.messageBox = new MessageBox();
        //绑定 VM 的监听
        this._addViewModelListener();
        div.appendChild(poiContainer);

        return div;
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._createSearchLayerItem
     * @description 创建查询图层选项：
     * @private
     */
    _createSearchLayerItem(layer) {
        const layerOption = document.createElement("div");
        layerOption.setAttribute("class", "poi-search-layer");

        // 创建圆形单选框
        const singleSelect = document.createElement("div");
        singleSelect.setAttribute("class", "widgets-singlesSelect");
        const singleIcon = document.createElement("div");
        singleIcon.setAttribute("class", "single-default-img");
        singleSelect.appendChild(singleIcon);
        const singleLabel = document.createElement("span");
        singleLabel.setAttribute("class", "single-label");
        singleLabel.innerHTML = layer.layerName;
        singleSelect.appendChild(singleLabel);

        layerOption.appendChild(singleSelect);

        //attributes-select todo 暂不支持该功能
        const attributesSelect = (new WidgetSelect(layer.layer.attributeNames)).getElement();
        //选择查询的字段  todo 限制图层查找属性功能待属性选择框优化后完善
        attributesSelect.onchange = (e) => {
            this.searchAttributes = e.target.value;
        };
        // layerOption.appendChild(attributesSelect);

        document.getElementsByClassName("poi-layers-body")[0].appendChild(layerOption);
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._createResultItem
     * @description 创建查询结果列表
     * @private
     */
    _createResultItem(featureType, properties) {
        const item = document.createElement("div");
        item.setAttribute("class", "poi-result-items");

        let icon = document.createElement("div");
        if (featureType === "Point" || featureType === "MultiPoint") {
            icon.setAttribute("class", "supermapol-icons-marker-layer poi-result-icon");
        } else if (featureType === "LineString" || featureType === "MultiLineString ") {
            icon.setAttribute("class", "supermapol-icons-line-layer poi-result-icon");
        } else if (featureType === "Polygon" || featureType === "MultiPolygon") {
            icon.setAttribute("class", "supermapol-icons-polygon-layer poi-result-icon");
        } else {
            icon.setAttribute("class", "supermapol-icons-point-layer poi-result-icon");
        }
        item.appendChild(icon);

        const info = document.createElement("div");
        info.setAttribute("class", "poi-result-info");
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
        check.setAttribute("class", "widget-checkbox checkbox-default-img");
        // item.appendChild(check);
        return item;
    },

    /*----------对 VM 的一些事件监听 ----------*/
    /**
     * @function L.supermap.widgets.poiSearch.prototype._addViewModelListener
     * @description 绑定对 VM 的事件监听
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
            this._createSearchLayerItem(e.newLayer);
        });

        //----图层查询结果监听
        this.viewModel.on("searchlayersucceed", (e) => {
            const data = e.result;
            this._clearSearchResult();
            this.searchResultLayer = L.featureGroup(data, {
                pointToLayer: null
            }).bindPopup(function (layer) {
                return (new AttributesPopContainer(layer.feature.properties)).getElement();
            }).addTo(this.map);

            this._flyToBounds(this.searchResultLayer.getBounds());
            //查询结果列表：
            this._prepareResultData(data);
            this.event.fire("searchsucceed", {result: this.searchResultLayer.toGeoJSON()});
        });

        //----地址匹配服务监听
        this.viewModel.on("geocodesucceed", (e) => {
            const data = e.result;
            //先清空当前有的地址匹配图层
            this._clearSearchResult();

            this.searchResultLayer = L.geoJSON(data)
                .bindPopup(function (layer) {
                    return (new AttributesPopContainer(layer.feature.properties)).getElement();
                }).addTo(this.map);

            //若这个图层只有一个点的话，则直接 flyTo 到点：
            this._flyToBounds(this.searchResultLayer.getBounds());
            //查询结果列表：
            this._prepareResultData(data);
            this.event.fire("searchsucceed", {result: data});
        });

        //----地址匹配或图层查询失败监听
        this.viewModel.on("searchfield", (e) => {
            let message = "";
            if (e.searchType === "searchGeocodeField") {
                message = "未匹配到地址匹配服务数据！";
            } else if (e.searchType === "cityGeocodeField") {
                message = "未配置当前城市的地址匹配服务。";
            } else {
                message = "未查找到相关矢量要素！";
            }
            this.messageBox.showView(message)
        });
    },

    /*-------以下是一些辅助性功能函数 -------*/
    /**
     * @function L.supermap.widgets.poiSearch.prototype._prepareResultData
     * @description 准备需要填入结果展示页面里的数据
     * @param {Array.<Feature>} data - 图层查询或地址匹配返回的要素数据数组
     * @private
     */
    _prepareResultData(data) {
        this.currentResult = data;
        //向下取舍，这只页码
        let pageCounts = Math.ceil(data.length / 8);
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
     * @function L.supermap.widgets.poiSearch.prototype._createResultListByPageNum
     * @description 根据页面值填充内容
     * @param {number} page - 页数
     * @param {Array.<Feature>} data - 图层查询或地址匹配返回的要素数据数组
     * @private
     */
    _createResultListByPageNum(page, data) {
        let start = 0, end;
        if (page === 1 && data.length < 8) {
            //data数据不满8个时：
            end = data.length;
        } else if (page * 8 > data.length) {
            //最后一页且数据不满8个时
            start = 8 * (page - 1);
            end = data.length
        } else {
            //中间页面的情况
            start = 8 * (page - 1);
            end = page * 8 - 1
        }
        const content = document.createElement("div");
        for (let i = start; i < end; i++) {
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
        content.firstChild.getElementsByClassName("poi-result-icon")[0].classList.add("poi-result-selected");
        const filter = content.firstChild.getElementsByClassName("poi-result-info")[0].firstChild.innerText;
        this._linkageFeature(filter);
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._flyToBounds
     * @param {L.Bounds} bounds - 当前图层范围
     * @description 移动到图层
     * @private
     */
    _flyToBounds(bounds) {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        if (sw.lat === ne.lat && sw.lng === ne.lng) {
            this.map.flyTo(sw);
        } else {
            this.map.flyToBounds(bounds);
        }
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._linkageFeature
     * @description 点击结果列表联动地图上要素响应
     * @private
     */
    _linkageFeature(filter) {
        let filterValue = "";
        if (this.isSearchLayer) {
            filterValue = filter.split(":")[1].trim();
        } else {
            filterValue = filter;
        }

        this.searchResultLayer.eachLayer((layer) => {
            this._resetLayerStyleToDefault(layer);

            if (layer.filterAttribute && layer.filterAttribute.filterAttributeValue === filterValue ||
                layer.feature.properties && layer.feature.properties.name === filterValue) {
                this._setSelectedLayerStyle(layer);
                layer.bindPopup(function () {
                    return (new AttributesPopContainer(layer.feature.properties)).getElement()
                }, {closeOnClick: false}).openPopup().addTo(this.map);
                /*let center;
                if (layer.getLatLng) {
                    center = layer.getLatLng();
                } else if (layer.getCenter) {
                    center = layer.getCenter();
                }
                 this.map.setView(center);*/
            }
        });
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._clearSearchResult
     * @description 清空当前查询的结果等
     */
    _clearSearchResult() {
        if (this.searchResultLayer) {
            this.map.closePopup();
            //若当前是查询图层的结果，则不删除图层，只修改样式
            if (this.isSearchLayer) {
                const self = this;
                this.searchResultLayer.eachLayer(function (layer) {
                    self._resetLayerStyleToDefault(layer);
                    layer.addTo(self.map)
                });
            } else {
                this.map.removeLayer(this.searchResultLayer);
            }
            this.searchResultLayer = null;
            this.currentResult = null;
        }
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._resetLayerStyleToDefault
     * @description 恢复图层默认样式
     * @param {L.layer} layer - 需要恢复样式的图层
     * @private
     */
    _resetLayerStyleToDefault(layer) {
        if (layer.setIcon) {
            layer.setIcon(L.divIcon({className: 'default-marker-icon', iconAnchor: [12.5, 0]}));
        } else {
            layer.setStyle({
                fillColor: 'blue',
                weight: 1,
                opacity: 1,
                color: 'blue',
                fillOpacity: 0.6
            });
        }
    },

    /**
     * @function L.supermap.widgets.poiSearch.prototype._setSelectedLayerStyle
     * @description 设置图层选中样式
     * @param {L.layer} layer - 需要设置选中样式的图层
     * @private
     */
    _setSelectedLayerStyle(layer) {
        if (layer.setIcon) {
            layer.setIcon(L.divIcon({className: 'select-marker-icon', iconAnchor: [15, 0]}));
        } else {
            layer.setStyle({
                fillColor: 'red',
                weight: 1,
                opacity: 1,
                color: 'red',
                fillOpacity: 0.2
            });
        }
    }
});

export var poiSearchView = function (options) {
    return new POISearchView(options);
};

L.supermap.widgets.poiSearch = poiSearchView;