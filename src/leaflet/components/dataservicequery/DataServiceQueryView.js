/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import { ComponentsViewBase } from '../ComponentsViewBase';
 import { DataServiceQueryViewModel } from './DataServiceQueryViewModel';
 import { GetFeaturesByIDsParameters } from '@supermap/iclient-common/iServer/GetFeaturesByIDsParameters';
 import { GetFeaturesBySQLParameters } from '@supermap/iclient-common/iServer/GetFeaturesBySQLParameters';
 import { GetFeaturesByBoundsParameters } from '@supermap/iclient-common/iServer/GetFeaturesByBoundsParameters';
 import { GetFeaturesByBufferParameters } from '@supermap/iclient-common/iServer/GetFeaturesByBufferParameters';
 import { GetFeaturesByGeometryParameters } from '@supermap/iclient-common/iServer/GetFeaturesByGeometryParameters';
 import { CommonContainer } from '@supermap/iclient-common/components/templates/CommonContainer';
 import { Select } from '@supermap/iclient-common/components/templates/Select';
 import { MessageBox } from '@supermap/iclient-common/components/messagebox/MessageBox';
 import { Lang } from '@supermap/iclient-common/lang/Lang';

/**
 * @class DataServiceQueryView
 * @aliasclass Components.DataServiceQueryView
 * @deprecatedclassinstance L.supermap.components.dataServiceQuery
 * @classdesc 数据服务查询组件类。
 * @version 9.1.1
 * @modulecategory Components
 * @param {string} dataServiceUrl - 数据服务地址。
 * @param {(Array.<string>|string)} dataSetNames - 配置查询方式和查询的数据集数组。格式：" 数据源名：数据集名 "，例："World: Countries"。
 * @param {Object} options - 参数。
 * @param {(Array.<GetFeatureMode>|GetFeatureMode)} [options.getFeatureMode] - 查询方式。
 * @param {string} [options.position='topright'] - 组件在地图中显示的位置（ 'topleft'|'topright'|'bottomleft'|'bottomright' ）。
 * @param {function} [options.style] - 默认图层样式。返回类型：点样式（ maker|circleMaker）；线和面样式（ L.path ）。
 * @param {function} [options.onEachFeature] - 给该元素绑定事件和弹窗。
 * @fires DataServiceQueryView#getfeaturessucceeded
 * @fires DataServiceQueryView#getfeaturesfailed
 * @category Components DataServiceQuery
 * @extends {ComponentsViewBase}
 * @usage
 */
export var DataServiceQueryView = ComponentsViewBase.extend({

    initialize: function (dataServiceUrl, dataSetNames, options) {
      ComponentsViewBase.prototype.initialize.apply(this, [options]);

        this.dataServiceUrl = dataServiceUrl;
        if (!dataSetNames || dataSetNames.length === 0) {
            throw new Error('Please configure the dataset of the query！')
        }
        if (dataSetNames instanceof Array) {
            this.dataSetNames = dataSetNames;
        } else {
            this.dataSetNames = dataSetNames.split(" ");
        }
    },

    /**
     * @function DataServiceQueryView.prototype.onAdd
     * @description 添加控件。
     * @private
     * @override
     */
    onAdd: function (map) {
        return ComponentsViewBase.prototype.onAdd.apply(this, [map]);
    },

    /**
     * @function DataServiceQueryView.prototype.onRemove
     * @description 移除控件。
     * @private
     */
    onRemove: function () {
        this.map.off('pm:create');
    },

    /**
     * @function DataServiceQueryView.prototype.setDataSetNames
     * @description 设置查询的数据集名称。
     * @param {(Array.<string>|string)} dataSetNames - 配置查询方式和查询的数据集数组。格式：" 数据源名：数据集名 "，例："World: Countries";
     */
    setDataSetNames(dataSetNames) {
        if (dataSetNames instanceof Array) {
            this.dataSetNames = dataSetNames;
        } else {
            this.dataSetNames = dataSetNames.split(" ");
        }
    },

    /**
     * @function DataServiceQueryView.prototype.setGetFeatureMode
     * @description 设置查询方式。
     * @param {(Array.<GetFeatureMode>|GetFeatureMode)} getFeatureMode - 查询方式。
     */
    setGetFeatureMode(getFeatureMode) {
        this.getFeatureMode = getFeatureMode;
        this._getFeatureModeOnchange(this.getFeatureMode);
    },
    /**
     * @function DataServiceQueryView.prototype.setDataServiceUrl
     * @description 设置查询的数据服务地址。
     * @param {string} dataServiceUrl - 数据服务地址。
     */
    setDataServiceUrl(dataServiceUrl) {
        this.dataServiceUrl = dataServiceUrl;
        this.viewModel = new DataServiceQueryViewModel(this.dataServiceUrl);

    },
    /**
     * @function DataServiceQueryView.prototype._getFeatureModeOnchange
     * @private
     * @description 改变查询方式时改变 UI。
     * @param {string} getFeatureMode - 查询方式。
     */
    _getFeatureModeOnchange(getFeatureMode) {
        let queryModelOptionsArr;
        if (!getFeatureMode || JSON.stringify(getFeatureMode) == '{}') {
            queryModelOptionsArr = ['ID', 'SQL', 'BOUNDS', 'BUFFER', 'SPATIAL'];
        } else {
            queryModelOptionsArr = getFeatureMode;
        }
        let queryModelControl = document.getElementById('queryModelControl');
        queryModelControl.innerHTML = '';
        this.creatQueryModeSelect(queryModelOptionsArr, queryModelControl)
    },

    /**
     * @function DataServiceQueryView.prototype._initView
     * @description 创建数据服务查询组件。
     * @returns {HTMLElement}
     * @private
     */
    _initView: function () {
        // 初始化 ViewModel:
        this.viewModel = new DataServiceQueryViewModel(this.dataServiceUrl);
        this.messageBox = new MessageBox();

        // 组件 container
        let container = (new CommonContainer({title: Lang.i18n('title_dataServiceQuery')})).getElement();
        container.classList.add('component-servicequery__container');
        container.children[0].classList.add('component-servicequery__title');
        let componentContentContainer = container.children[1];
        componentContentContainer.classList.add('component-content--scroll');
        componentContentContainer.classList.add('data-services');
        // 组件内容 container
        let analyusisTypeContainer = L.DomUtil.create('div', 'component-analysis__container', componentContentContainer);
        let analysisType = L.DomUtil.create('div', 'component-servicequery__analysistype', analyusisTypeContainer);
        let analysisLayer = L.DomUtil.create('div', 'component-analysis__container__analysisLayer', analysisType);

        let queryModelOptionsArr, getFeatureModeArr = this.options.getFeatureMode;
        // 获取查询模式
        if (!getFeatureModeArr || JSON.stringify(getFeatureModeArr) == '{}') {
            queryModelOptionsArr = ['ID', 'SQL', 'BOUNDS', 'BUFFER', 'SPATIAL'];
        } else {
            queryModelOptionsArr = getFeatureModeArr;
        }
        // 查询模式
        let queryModelContainer = L.DomUtil.create('div', '', analysisLayer);
        queryModelContainer.id = 'queryModelContainer';
        let queryModelControl = L.DomUtil.create('div', 'component-analysis__selecttool', queryModelContainer);
        queryModelControl.id = 'queryModelControl';
        this.creatQueryModeSelect = creatQueryModeSelect.bind(this);
        this.queryModeltOnchange = queryModeltOnchange.bind(this);
        this.creatQueryModeSelect(queryModelOptionsArr, queryModelControl);

        // 要素 ID 数组
        let featuresIdArrContainer = L.DomUtil.create('div', 'component-analysis__container component-textarea--dataservice__container', analysisLayer);
        let textareaSpan = L.DomUtil.create('span', 'textarea-name', featuresIdArrContainer);
        textareaSpan.innerHTML = Lang.i18n('text_label_IDArrayOfFeatures');
        let textareaControl = L.DomUtil.create('div', 'component-textarea component-textarea--dataservice', featuresIdArrContainer);
        textareaControl.id = 'getfeaturesIdArr';
        let scrollarea = L.DomUtil.create('div', 'scrollarea', textareaControl);
        let scrollareaContent = L.DomUtil.create('div', 'component-scrollarea-content', scrollarea);
        scrollareaContent.setAttribute('tabindex', '1');
        let getValueTextArea = L.DomUtil.create('textarea', 'component-textarea__content', scrollareaContent);
        getValueTextArea.value = '[1,2,3]';
        getValueTextArea.id = 'getValueTextArea';

        // SQL 最多可返回的要素数量
        let maxFeaturesContainer = L.DomUtil.create('div', 'component-servicequery__maxfeatures-container hidden', analysisLayer);
        let maxFeaturesOtions = {
            'spanName': Lang.i18n('text_label_maxFeatures'),
            'value': '1000'
        };
        let maxFeaturesInputBox = this._creatInputBox(maxFeaturesOtions, maxFeaturesContainer);
        let maxFeaturesInput = maxFeaturesInputBox.children[1];
        maxFeaturesInput.classList.add('max-features-input');
        // Buffer 缓冲区距离
        let bufferDistanceContainer = L.DomUtil.create('div', 'component-servicequery__distance-container hidden', analysisLayer);
        let bufferDistanceOtions = {
            'spanName': Lang.i18n('text_label_bufferDistance'),
            'value': '10'
        };
        let bufferDistanceInputBox = this._creatInputBox(bufferDistanceOtions, bufferDistanceContainer);
        let bufferDistanceInput = bufferDistanceInputBox.children[1];


        // Bounds 查询范围；
        let queryRangeContainer = L.DomUtil.create('div', 'component-analysis__container component-textarea--dataservice__container hidden', analysisLayer);
        let queryRangetextareaSpan = L.DomUtil.create('span', 'textarea-name', queryRangeContainer);
        let queryRangeMainContent = L.DomUtil.create('div', '', queryRangeContainer);
        let queryRangeIconContainer = L.DomUtil.create('div', 'component-servicequery__rangeicon-container', queryRangeMainContent);
        queryRangetextareaSpan.innerHTML = Lang.i18n('text_label_queryRange1');
        let queryRangeRecIcon = L.DomUtil.create('div', 'component-servicequery__rangeicon supermapol-icons-polygon-layer bounds', queryRangeIconContainer);
        let queryRangeLineIcon = L.DomUtil.create('div', 'component-servicequery__rangeicon supermapol-icons-line-layer hidden', queryRangeIconContainer);
        let queryRangePointIcon = L.DomUtil.create('div', 'component-servicequery__rangeicon supermapol-icons-point-layer hidden', queryRangeIconContainer);
        let queryRangetextareaControl = L.DomUtil.create('div', 'component-textarea component-textarea--rangequery', queryRangeMainContent);
        queryRangetextareaControl.id = 'getfeaturesIdArr';
        let queryRangescrollarea = L.DomUtil.create('div', '', queryRangetextareaControl);
        let queryRangescrollareaContent = L.DomUtil.create('div', 'component-scrollarea-content', queryRangescrollarea);
        queryRangescrollareaContent.setAttribute('tabindex', '1');
        let queryRangeTextArea = L.DomUtil.create('textarea', 'component-textarea__content component-textarea--rangequery__content', queryRangescrollareaContent);
        queryRangeTextArea.value = '{"leftBottom":{"x":-5,"y":-5},"rightTop":{"x":5,"y":5}}';

        // geometry 空间查询模式
        let spatialQueryModeContainer = L.DomUtil.create('div', 'component-servicequery__spatialquerymode-container hidden', analysisLayer);
        let spatialQueryModeOptions = {
            'optionsArr': ['CONTAIN', 'CROSS', 'DISJOINT', 'IDENTITY', 'INTERSECT', 'NONE', 'OVERLAP', 'TOUCH', 'WITHIN'],
            'labelName': Lang.i18n('text_label_spatialQueryMode')
        };
        let spatialQueryModeControl = L.DomUtil.create('div', 'component-analysis__selecttool', spatialQueryModeContainer);
        let spatialQueryModeSelectTool = (new Select(spatialQueryModeOptions)).getElement();
        spatialQueryModeSelectTool.children[1].classList.add('dataservice-select');
        spatialQueryModeControl.appendChild(spatialQueryModeSelectTool);
        let spatialQueryModeSelectName = spatialQueryModeSelectTool.children[1].children[0];
        spatialQueryModeSelectName.id = 'spatialQueryModeSelectName';
        let spatialQueryModeSelectContent = spatialQueryModeSelectTool.children[1].children[2];
        spatialQueryModeSelectContent.classList.add('component-servicequery__spatialquerymode__selectcontent');


        // 分析按钮
        let runBtnContainer = L.DomUtil.create('div', 'component-analysis__container__analysisbtn', analysisLayer);
        let runBtn = L.DomUtil.create('div', 'component-analysis__analysisbtn', runBtnContainer);
        let analysisBtn = L.DomUtil.create('button', 'component-analysis__analysisbtn--analysis', runBtn);
        analysisBtn.innerHTML = Lang.i18n('btn_query');
        let analysingContainer = L.DomUtil.create('div', 'component-analysis__analysisbtn--analysing-container hidden', runBtn);
        let analysisingBtn = L.DomUtil.create('div', 'component-analysis__analysisbtn--analysising component-servicequery__querybtn--querying', analysingContainer);
        let svgContainer = L.DomUtil.create('div', 'component-analysis__svg-container', analysisingBtn);
        svgContainer.innerHTML = `<svg class="component-analysis__svg-rotate" width="16px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
             <path id="ring" fill="#FFF" transform="translate(8,8)" d="M 0 0 v -8 A 8 8 0 1 1 -8.00 0 z"></path>
             <circle cx="8" cy="8" r="6" fill="#38ADF5"></circle>
             <rect class="svg-top" x="8" y="0" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
             <rect class="svg-left" x="0" y="8" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
         </svg>`;
        L.DomUtil.create('span', '', analysisingBtn).innerHTML = Lang.i18n('btn_querying');

        // 删除按钮
        let deleteLayersBtn = L.DomUtil.create('button', 'component-analysis__analysisbtn--analysis component-analysis__analysisbtn--deletelayers', runBtn);
        deleteLayersBtn.innerHTML = Lang.i18n('btn_emptyTheRresultLayer');

        // 设置当前显示参数
        queryModeltOnchange(queryModelOptionsArr[0]);

        // 分析按钮点击事件
        let me = this;
        analysisBtn.onclick = () => {
            this.messageBox.closeView();
            analysingContainer.style.display = 'block';
            analysisBtn.style.display = 'none';
            let queryParams = getQueryParams();

            this.viewModel.on('getfeaturessucceeded', (e) => {
                analysingContainer.style.display = 'none';
                analysisBtn.style.display = 'block';
                if (e.result.features.length === 0) {
                    this.messageBox.showView(Lang.i18n('msg_dataReturnedIsEmpty'), "success");
                }
                /**
                 * @event DataServiceQueryView#getfeaturessucceeded
                 * @description features 获取成功时触发。
                 * @property {Object} result - 服务器返回的结果。
                 */
                this._event.fire('getfeaturessucceeded', {'result': e.result})
            });
            this.viewModel.on('getfeaturesfailed', (e) => {
                analysingContainer.style.display = 'none';
                analysisBtn.style.display = 'block';
                this.messageBox.showView(e.error.errorMsg, "failure");
                /**
                 * @event DataServiceQueryView#getfeaturesfailed
                 * @description features 获取失败时触发。
                 * @property {string} error - 服务器返回的错误。
                 */
                this._event.fire('getfeaturesfailed', {'error': e.error})
            });
            this.viewModel.getFeatures(queryParams, this.map);
        };

        let bounds, resultLayer;
        // 矩形 & 多边形绘制
        queryRangeRecIcon.onclick = (e) => {
            let queryModelSelectName = document.getElementById('queryModelSelectName');
            let getFeatureMode = queryModelSelectName.title;
            if (resultLayer) {
                resultLayer.remove();
            }
            // 矩形
            if (getFeatureMode === 'BOUNDS') {
                this.map.pm.enableDraw('Rectangle');
                // 多边形
            } else {
                this.map.pm.enableDraw('Poly');
            }
            e.stopPropagation();
            e.preventDefault();
        };

        // 线绘制
        queryRangeLineIcon.onclick = (e) => {
            if (resultLayer) {
                resultLayer.remove();
            }
            this.map.pm.enableDraw('Line');
            e.stopPropagation();
            e.preventDefault();
        };

        // 点绘制
        queryRangePointIcon.onclick = (e) => {
            if (resultLayer) {
                resultLayer.remove();
            }
            this.map.pm.enableDraw('Marker');
            e.stopPropagation();
            e.preventDefault();
        };

        this.map.on('pm:create', (e) => {
            if (e.shape === 'Rectangle') {
                resultLayer = e.layer;
                let boundsT = resultLayer.getBounds();
                bounds = L.bounds([boundsT._southWest.lng, boundsT._southWest.lat], [boundsT._northEast.lng, boundsT._northEast.lat]);
                let geo = {
                    'leftBottom': {'x': boundsT._southWest.lng, 'y': boundsT._southWest.lat},
                    'rightTop': {'x': boundsT._northEast.lng, 'y': boundsT._northEast.lat}
                };
                queryRangeTextArea.value = JSON.stringify(geo);
            }
            if (e.shape === 'Marker') {
                resultLayer = e.layer;
                queryRangeTextArea.value = JSON.stringify(e.layer.toGeoJSON());
                this.map.pm.disableDraw("Marker");
            }
            if (e.shape === 'Line') {
                resultLayer = e.layer;
                queryRangeTextArea.value = JSON.stringify(e.layer.toGeoJSON());
            }
            if (e.shape === 'Polygon') {
                resultLayer = e.layer;
                queryRangeTextArea.value = JSON.stringify(e.layer.toGeoJSON());
            }
        });
        // 删除按钮点击事件
        deleteLayersBtn.onclick = () => {
            this.viewModel.clearLayers();
        };

        function creatQueryModeSelect(queryModelOptionsArr, queryModelControl) {
            // 查询模式
            let queryModelSelectName;

            if (queryModelOptionsArr instanceof Array && queryModelOptionsArr.length > 1) {
                let queryModelOptions = {
                    'optionsArr': queryModelOptionsArr,
                    'labelName': Lang.i18n('text_label_queryMode'),
                    'optionsClickCb': this.queryModeltOnchange
                };
                let queryModelSelectTool = (new Select(queryModelOptions)).getElement();
                queryModelControl.appendChild(queryModelSelectTool);
                queryModelSelectName = queryModelSelectTool.children[1].children[0];
                queryModelSelectTool.children[1].classList.add('dataservice-select');
                let queryModelSelect = queryModelSelectTool.children[1];
                queryModelSelect.classList.add('dataservice-select');
                queryModelSelect.classList.add('querymodel-select');
            } else {
                let span = L.DomUtil.create('span', '', queryModelContainer);
                span.innerHTML = Lang.i18n('text_label_queryMode');
                queryModelSelectName = L.DomUtil.create('div', 'component-servicequery__querymode-selectname', queryModelContainer);
                let text = L.DomUtil.create('span', '', queryModelSelectName);
                if (queryModelOptionsArr instanceof Array) {
                    text.innerHTML = queryModelOptionsArr[0];
                } else {
                    text.innerHTML = queryModelOptionsArr;
                }
                queryModelSelectName.title = text.innerHTML;
                this.queryModeltOnchange(queryModelSelectName);
            }
            queryModelSelectName.id = 'queryModelSelectName';
            return queryModelSelectName;
        }

        // 查询模式下拉框 onchange 事件
        function queryModeltOnchange(option) {
            // 获取当前选中查询模式
            let queryModelSelectName;
            if (option.title) {
                queryModelSelectName = option.title;
            } else {
                queryModelSelectName = option;
            }

            // 控制部分查询参数元素隐藏和显示
            maxFeaturesContainer.classList.add('hidden');
            queryRangeContainer.classList.add('hidden');
            bufferDistanceContainer.classList.add('hidden');
            queryRangeLineIcon.classList.add('hidden');
            queryRangePointIcon.classList.add('hidden');
            queryRangeRecIcon.classList.remove('bounds');
            spatialQueryModeContainer.classList.add('hidden');
            textareaSpan.innerHTML = Lang.i18n('text_label_featureFilter');
            getValueTextArea.value = 'SMID<10';
            if (queryModelSelectName === 'BUFFER' || queryModelSelectName === 'SPATIAL') {
                queryRangeContainer.classList.remove('hidden');
                queryRangetextareaSpan.innerHTML = Lang.i18n('text_label_geometricObject');
                queryRangeTextArea.value = '{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[84.90234375,40.25390625]}}';
                queryRangeLineIcon.classList.remove('hidden');
                queryRangePointIcon.classList.remove('hidden');
            }
            switch (queryModelSelectName) {
                case 'ID':
                    textareaSpan.innerHTML = Lang.i18n('text_label_IDArrayOfFeatures');
                    getValueTextArea.value = '[1,2,3]';
                    break;
                case 'SQL':
                    maxFeaturesContainer.classList.remove('hidden');
                    break;
                case 'BOUNDS':
                    queryRangeContainer.classList.remove('hidden');
                    queryRangetextareaSpan.innerHTML = Lang.i18n('text_label_queryRange');
                    queryRangeTextArea.value = '{"leftBottom":{"x":-5,"y":-5},"rightTop":{"x":5,"y":5}}';
                    queryRangeRecIcon.classList.add('bounds');
                    break;
                case 'BUFFER':
                    bufferDistanceContainer.classList.remove('hidden');
                    break;
                case 'SPATIAL':
                    spatialQueryModeContainer.classList.remove('hidden');
                    break;
            }
        }

        // 获取查询参数
        function getQueryParams() {
            // 数据集数组
            let datasetArr = me.dataSetNames;
            let queryModelSelectName = document.getElementById('queryModelSelectName');
            let getFeatureMode = queryModelSelectName.title;
            // 过滤条件
            let attributeFilter = getValueTextArea.value;

            let queryParam;
            if (getFeatureMode === 'ID') {
                let value = getValueTextArea.value;
                let ids = value.substring(1, value.length - 1).split(',');
                queryParam = new GetFeaturesByIDsParameters({
                    IDs: ids,
                    datasetNames: datasetArr
                });
            } else if (getFeatureMode === 'SQL') {
                let maxFeatures = maxFeaturesInput.value;
                queryParam = new GetFeaturesBySQLParameters({
                    queryParameter: {
                        attributeFilter: attributeFilter
                    },
                    datasetNames: datasetArr,
                    maxFeatures: maxFeatures
                });
            } else if (getFeatureMode === 'BOUNDS') {
                if (!bounds) {
                    let value = JSON.parse(queryRangeTextArea.value);
                    bounds = L.bounds([value.leftBottom.x, value.leftBottom.y], [value.rightTop.x, value.rightTop.y])
                }
                queryParam = new GetFeaturesByBoundsParameters({
                    attributeFilter: attributeFilter,
                    datasetNames: datasetArr,
                    bounds: bounds
                });
            } else if (getFeatureMode === 'BUFFER') {
                let bufferDistance = bufferDistanceInput.value;
                let defaultGeometryValue = JSON.parse(queryRangeTextArea.value);
                let geometryLayer = resultLayer || defaultGeometryValue;
                queryParam = new GetFeaturesByBufferParameters({
                    attributeFilter: attributeFilter,
                    datasetNames: datasetArr,
                    bufferDistance: bufferDistance,
                    geometry: geometryLayer
                });
            } else if (getFeatureMode === 'SPATIAL') {
                let spatialQueryMode = spatialQueryModeSelectName.title;
                let defaultGeometryValue = JSON.parse(queryRangeTextArea.value);
                let geometryLayer = resultLayer || defaultGeometryValue;
                queryParam = new GetFeaturesByGeometryParameters({
                    attributeFilter: attributeFilter,
                    datasetNames: datasetArr,
                    spatialQueryMode: spatialQueryMode,
                    geometry: geometryLayer
                });
            }
            return queryParam;
        }

        //阻止 map 默认事件
        this._preventMapEvent(container, this.map);
        return container;
    },

    /**
     * @function DataServiceQueryView.prototype._creatInputBox
     * @description 创建含有 span 的 input 框。
     * @private
     */
    _creatInputBox(inputOptions, parentEle) {
        let div = L.DomUtil.create('div', '', parentEle);
        let span = L.DomUtil.create('span', '', div);
        span.innerHTML = inputOptions.spanName;
        let input = L.DomUtil.create('input', '', div);
        input.value = inputOptions.value;
        // input.className = 'distributeInput'
        return div;
    }

});
export var dataServiceQueryView = function (dataServiceUrl, dataSetNames, options) {
    return new DataServiceQueryView(dataServiceUrl, dataSetNames, options);
};
