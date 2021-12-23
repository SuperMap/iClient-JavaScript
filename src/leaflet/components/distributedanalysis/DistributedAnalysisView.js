/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {ComponentsViewBase} from '../ComponentsViewBase';
import {DistributedAnalysisViewModel} from "./DistributedAnalysisViewModel";
import { CommonContainer, DropDownBox, Select, MessageBox, Lang, KernelDensityJobParameter, MappingParameters } from '@supermap/iclient-common';

/**
 * @class L.supermap.components.distributedAnalysis
 * @classdesc 分布式分析组件。
 * @version 9.1.1
 * @param {string} processingUrl - 分布式分析服务地址。
 * @param {Object} options - 可选参数。
 * @param {string} [options.position='topright'] - 组件在地图中显示的位置，包括：'topleft'，'topright'，'bottomleft' 和 'bottomright'，继承自 leaflet control。
 * @param {function} [options.style] - 设置图层点线面默认样式，点样式返回 maker 或者 circleMaker；线和面返回 L.path 样式。
 * @param {function} [options.onEachFeature] - 在创建和设置样式后，将为每个创建的要素调用一次的函数。用于将事件和弹出窗口附加到要素。默认情况下，对新创建的图层不执行任何操作。
 * @fires L.supermap.components.distributedAnalysis#analysissucceeded
 * @fires L.supermap.components.distributedAnalysis#analysisfailed
 * @fires L.supermap.components.distributedAnalysis#layersremoved
 * @extends {L.supermap.components.componentsViewBase}
 * @category Components DistributedAnalysis
 */
export var DistributedAnalysisView = ComponentsViewBase.extend({

    initialize: function (processingUrl, options) {
      ComponentsViewBase.prototype.initialize.apply(this, [options]);
        //初始化 ViewModel:
        this.viewModel = new DistributedAnalysisViewModel(processingUrl);
    },
    /**
     * @function L.supermap.components.distributedAnalysis.prototype.onAdd
     * @description 添加控件。
     * @private
     * @override
     */
    onAdd: function (map) {
        this._fillDataToView();
        return ComponentsViewBase.prototype.onAdd.apply(this, [map]);
    },

    /**
     * @function L.supermap.components.distributedAnalysis.prototype._fillDataToView
     * @description 填充数据到 view。
     * @private
     */
    _fillDataToView: function () {
        
        // 获取数据集
        this.viewModel.on('datasetsloaded', (e) => {
            let datasetOptionsArr = e.result.dataset.datasetNames;
            this.datasetSelect.innerHTML = '';
            this._createOptions(this.datasetSelect, datasetOptionsArr);
            this.datasetSelectObj.optionClickEvent(this.datasetSelect, this.datasetSelectName, this.datasetSelectOnchange);
            this.dataHash = e.result.datasetHash;
        });
        this.viewModel.getDatasetsName();
    },

    /**
     * @function L.supermap.components.distributedAnalysis.prototype._initView
     * @description 创建分布式分析组件。
     * @returns {HTMLElement}
     * @private
     * @override
     */
    _initView: function () {
        // 组件 container
        let container = (new CommonContainer({title: Lang.i18n('title_distributedAnalysis')})).getElement();
        container.classList.add('component-analysis');
        container.children[0].style.fontSize = '12px';

        // 组件内容 container
        let componentContentContainer = L.DomUtil.create('div', 'component-content component-content--scroll component-content--analysis', container);

        // 分析方式下拉框
        let analysisOptionsArr = [{
            'title': Lang.i18n('text_densityAnalysis'),
            'dataValue': 'density',
            'remark': Lang.i18n('text_CalculateTheValuePerUnitArea'),
            'icon': {
                'className': 'component-analyst-density-img'
            }
        }];
        let dropDownBox = (new DropDownBox(analysisOptionsArr)).getElement();
        componentContentContainer.appendChild(dropDownBox);
        // 选中的 dropDownItem
        let dropDownTop = dropDownBox.children[0].children[0].children[0];

        // 各分析参数 container
        let analysisTypeContainer = L.DomUtil.create('div', 'component-analysis__container', componentContentContainer);
        let analysisType = L.DomUtil.create('div', 'analysistype', analysisTypeContainer);
        let analysisLayer = L.DomUtil.create('div', 'component-analysis__container__analysisLayer', analysisType);

        // 数据集下拉框
        let datasetSelectControl = L.DomUtil.create('div', 'component-analysis__selecttool', analysisLayer);
        let datasetOptions = {
            'optionsArr': [Lang.i18n('text_option_selectDataset')],
            'labelName': Lang.i18n('text_label_dataset'),
            "optionsClickCb": datasetSelectOnchange.bind(this)
        };
        let datasetSelectObj = new Select(datasetOptions);
        let datasetSelectTool = datasetSelectObj.getElement();
        this.datasetSelectObj = datasetSelectObj;
        datasetSelectControl.appendChild(datasetSelectTool);
        // 选中的 dataset
        let datasetSelectName = datasetSelectTool.children[1].children[0];
        this.datasetSelectName = datasetSelectName;
        // dataset select container
        let datasetSelect = datasetSelectTool.children[1].children[2].children[0].children[0];
        datasetSelect.children[0].style.display = 'none';
        this.datasetSelect = datasetSelect;

        // 分析方法下拉框 & 网格面类型下拉框
        let analyseIDW = L.DomUtil.create('div', 'component-analysis__idw', analysisLayer);
        let analysisOptions = [{
            'optionsArr': [Lang.i18n('text_option_simplePointDensityAnalysis'), Lang.i18n('text_option_nuclearDensityAnalysis')],
            'labelName': Lang.i18n('text_label_analyticalMethod')
            // 'optionsClickCb': analysisMethodSelectOnchange.bind(this)
        }, {
            'optionsArr': [Lang.i18n('text_option_quadrilateral'), Lang.i18n('text_option_hexagon')],
            'labelName': Lang.i18n('text_label_meshType')
        }];
        // 分析参数 select control
        let analysisSelectControl = L.DomUtil.create('div', 'component-analysis__idw__selecttool', analyseIDW);
        for (let i in analysisOptions) {
            let selectTool = (new Select(analysisOptions[i])).getElement();
            analysisSelectControl.appendChild(selectTool);
        }

        // 权重选择下拉框
        let weightFieldsSelectOptions = {
            'optionsArr': [Lang.i18n('text_option_notSet')],
            'labelName': Lang.i18n('text_label_weightField')
        };
        let weightFieldsSelectObj = new Select(weightFieldsSelectOptions);
        let weightFieldsSelectTool = weightFieldsSelectObj.getElement();
        analysisSelectControl.appendChild(weightFieldsSelectTool);
        this.weightFieldsSelectObj = weightFieldsSelectObj;

        // 分析方法选中值 & option attr设置
        let analysisMethodSelectName = analysisSelectControl.children[0].children[1].children[0];
        analysisMethodSelectName.setAttribute('data-value', '0');
        let analysisMethodSelect = analysisSelectControl.children[0].children[1].children[2].children[0].children[0];
        let analysisMethodDV = ['0', '1'];
        this._setEleAtribute(analysisMethodDV, 'data-value', analysisMethodSelect.children);

        // 网格面类型选中值 & option attr设置
        let gridTypeSelectName = analysisSelectControl.children[1].children[1].children[0];
        gridTypeSelectName.setAttribute('data-value', '0');
        let gridTypeSelect = analysisSelectControl.children[1].children[1].children[2].children[0].children[0];
        let gridTypeDV = ['0', '1'];
        this._setEleAtribute(gridTypeDV, 'data-value', gridTypeSelect.children);

        // 权重值选中值
        let weightFieldsSelectName = analysisSelectControl.children[2].children[1].children[0];
        let weightFieldsSelect = analysisSelectControl.children[2].children[1].children[2].children[0].children[0];

        // 分析范围 & 网格大小 & 搜索半径 & 面积单位
        // 分析范围
        let inputOptions = [{
            'spanName': Lang.i18n('text_label_queryRange'),
            'value': ''
        }];
        for (let i in inputOptions) {
            this._creatInputBox(inputOptions[i], analysisSelectControl)
        }
        let queryRangeInput = analysisSelectControl.children[3].children[1];
        queryRangeInput.setAttribute('placeholder', Lang.i18n('text_label_queryRangeTips'));
        queryRangeInput.title = Lang.i18n('text_label_queryRangeTips');

        // 网格大小
        let gridSizeUnitSelectOptions = {
            'optionsArr': ['Meter', 'Kilometer', 'Yard', 'Foot', 'Mile']
        };
        let gridSizeOptions = {
            'labelName': Lang.i18n('text_label_gridSizeInMeters'),
            'selectOptions': gridSizeUnitSelectOptions
        };
        let gridSizeContainer = this._creatUnitSelectBox(gridSizeOptions, analysisSelectControl);
        let gridSizeInput = gridSizeContainer.children[1].children[0];
        gridSizeInput.value = '1000';
        let gridSizeUnitSelectName = gridSizeContainer.children[1].children[1].children[0].children[0].children[0];

        // 搜索半径 
        let searchRadiusUnitSelectOptions = {
            'optionsArr': ['Meter', 'Kilometer', 'Yard', 'Foot', 'Mile']
        };
        let searchRadiusOptions = {
            'labelName': Lang.i18n('text_label_searchRadius'),
            'selectOptions': searchRadiusUnitSelectOptions
        };
        let searchRadiusContainer = this._creatUnitSelectBox(searchRadiusOptions, analysisSelectControl);
        let searchRadiusInput = searchRadiusContainer.children[1].children[0];
        searchRadiusInput.value = '300';
        let searchRadiusSelectName = searchRadiusContainer.children[1].children[1].children[0].children[0].children[0];
        // 面积单位
        let areaUnitSelectOptions = {
            'labelName': Lang.i18n('text_label_areaUnit'),
            'optionsArr': ['SquareMile', 'SquareMeter', 'Hectare', 'Acre', 'SquareFoot', 'SquareYard']
        };
        let areaUnitSelectTool = (new Select(areaUnitSelectOptions)).getElement();
        analysisSelectControl.appendChild(areaUnitSelectTool);
        let areaUnitSelectName = areaUnitSelectTool.children[1].children[0];
        // 专题图分段
        let rangeContent = L.DomUtil.create('div', 'range-content', analysisType);
        let rangeContentOptions = {
            'optionsArr': [Lang.i18n('text_option_notSet'), Lang.i18n('text_option_equidistantSegmentation'), Lang.i18n('text_option_logarithm'), Lang.i18n('text_option_equalCountingSegment'), Lang.i18n('text_option_squareRootSegmentation')],
            'labelName': Lang.i18n('text_label_thematicMapSegmentationMode'),
            "optionsClickCb": themeModelSelectOnchange
        };
        rangeContent.appendChild((new Select(rangeContentOptions)).getElement());

        let themeModelSelectName = rangeContent.children[0].children[1].children[0];
        themeModelSelectName.setAttribute('data-value', 'NOTSET');
        let themeModelSelect = rangeContent.children[0].children[1].children[2].children[0].children[0];
        let themeModelDataValue = ['NOTSET', 'EQUALINTERVAL', 'LOGARITHM', 'QUANTILE', 'SQUAREROOT'];
        this._setEleAtribute(themeModelDataValue, 'data-value', themeModelSelect.children);

        let rangeContentParamInput = this._creatInputBox({
            'spanName': Lang.i18n('text_label_thematicMapSegmentationParameters'),
            'value': '20'
        }, rangeContent);
        rangeContentParamInput.classList.add('hidden');
        let rangeContentModelSelectTool = (new Select({
            'optionsArr': [
                Lang.i18n('text_option_greenOrangePurpleGradient'),
                Lang.i18n('text_option_greenOrangeRedGradient'),
                Lang.i18n('text_option_rainbowGradient'),
                Lang.i18n('text_option_spectralGradient'),
                Lang.i18n('text_option_terrainGradient')],
            'labelName': Lang.i18n('text_label_thematicMapColorGradientMode')
        })).getElement();
        rangeContent.appendChild(rangeContentModelSelectTool);
        rangeContentModelSelectTool.classList.add('hidden');
        let rangeContentModelSelect = rangeContentModelSelectTool.children[1].children[2].children[0].children[0];
        let rangeContentModelSelectName = rangeContentModelSelectTool.children[1].children[0];
        rangeContentModelSelectName.setAttribute('data-value', 'GREENORANGEVIOLET');
        let rangeContentModelDV = ['GREENORANGEVIOLET', 'GREENORANGERED', 'RAINBOW', 'SPECTRUM', 'TERRAIN'];
        this._setEleAtribute(rangeContentModelDV, 'data-value', rangeContentModelSelect.children);

        // 专题图分段模式下拉框 onchange 事件
        function themeModelSelectOnchange(option) {
            if (option.getAttribute('data-value') !== 'NOTSET') {
                rangeContentParamInput.classList.remove('hidden');
                rangeContentModelSelectTool.classList.remove('hidden');
            } else {
                rangeContentParamInput.classList.add('hidden');
                rangeContentModelSelectTool.classList.add('hidden');
            }
        }

        // 结果图层
        let resultLayerContainer = L.DomUtil.create('div', '', analysisType);
        let resultLayerSpan = L.DomUtil.create('span', '', resultLayerContainer);
        resultLayerSpan.innerHTML = Lang.i18n('text_label_resultLayerName');
        let resultLayerInput = L.DomUtil.create('input', 'component-distributeanalysis__input', resultLayerContainer);

        // 分析 & 分析中 & 取消 按钮
        let runBtnContainer = L.DomUtil.create('div', 'component-analysis__container__analysisbtn', analysisTypeContainer);
        let runBtn = L.DomUtil.create('div', 'component-analysis__analysisbtn', runBtnContainer);
        let analysisBtn = L.DomUtil.create('button', 'component-analysis__analysisbtn--analysis', runBtn);
        analysisBtn.innerHTML = Lang.i18n('btn_analyze');
        let analysingContainer = L.DomUtil.create('div', 'component-analysis__analysisbtn--analysing-container hidden', runBtn);
        let analysisingBtn = L.DomUtil.create('div', 'component-analysis__analysisbtn--analysising', analysingContainer);
        analysisingBtn.style.width = '200px';
        let svgContainer = L.DomUtil.create('div', 'component-analysis__svg-container', analysisingBtn);
        svgContainer.innerHTML = `<svg class="component-analysis__svg-rotate" width="16px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path id="ring" fill="#FFF" transform="translate(8,8)" d="M 0 0 v -8 A 8 8 0 1 1 -8.00 0 z"></path>
            <circle cx="8" cy="8" r="6" fill="#38ADF5"></circle>
            <rect class="svg-top" x="8" y="0" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
            <rect class="svg-left" x="0" y="8" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
        </svg>`;
        L.DomUtil.create('span', '', analysisingBtn).innerHTML = Lang.i18n('btn_analyzing');

        // 删除按钮
        let deleteLayersBtn = L.DomUtil.create('button', 'component-analysis__analysisbtn--analysis component-analysis__analysisbtn--deletelayers', runBtn);
        deleteLayersBtn.id = 'deleteLayersBtn';
        deleteLayersBtn.innerHTML = Lang.i18n('btn_emptyTheAnalysisLayer');

        // 交互
        // 弹框
        this.messageBox = new MessageBox();

        // 数据集下拉框 onchange 事件
        this.datasetSelectOnchange = datasetSelectOnchange.bind(this);

        function datasetSelectOnchange(option) {
            this.messageBox.closeView();
            if (this.dataHash) {
                weightFieldsSelect.innerHTML = '';
                // 获取当前选中数据集类型
                let datasetUrl = this.dataHash[option.title];
                // 判断当前选中数据集是否支持该选中分析类，并填充分析权重字段
                let _me = this;
                this.viewModel.on('datasetinfoloaded', function (e) {
                    weightFieldsSelectName.title = Lang.i18n('text_option_notSet');
                    weightFieldsSelectName.innerHTML = Lang.i18n('text_option_notSet');
                    weightFieldsSelect.innerHTML = '';
                    let analyseType = dropDownTop.getAttribute('data-value');
                    let type = e.result.type;
                    let fields = e.result.fields;
                    if (analyseType === 'density') {
                        if (type === 'REGION' || type === 'LINE') {
                            _me.messageBox.showView(Lang.i18n('msg_datasetOrMethodUnsupport'), "failure");
                        } else {
                            _me.messageBox.closeView();
                            _me._createOptions(weightFieldsSelect, fields);
                            _me.weightFieldsSelectObj.optionClickEvent(weightFieldsSelect, weightFieldsSelectName);
                        }
                    }
                });
                this.viewModel.getDatasetInfo(datasetUrl);
            }
        }

        // 分析按钮点击事件
        analysisBtn.onclick = () => {
            this.messageBox.closeView();
            let params = getAnalysisParam();
            if (datasetSelectName.title === Lang.i18n('text_option_selectDataset')) {
                this.messageBox.showView(Lang.i18n('msg_selectDataset'), "failure");
            } else if ( weightFieldsSelectName.title === Lang.i18n('text_option_notSet')) {
                this.messageBox.showView(Lang.i18n('msg_setTheWeightField'), "failure");
            } else {
                this.messageBox.closeView();
                analysingContainer.style.display = 'block';
                analysisBtn.style.display = 'none';

                this.viewModel.on('layerloaded', (e) => {
                    analysingContainer.style.display = 'none';
                    analysisBtn.style.display = 'block';
                    /**
                     * @event L.supermap.components.distributedAnalysis#analysissucceeded
                     * @description 分析完成后触发。
                     * @property {L.GeoJSON} layer - 结果图层。
                     * @property {string} name - 结果图层名称。
                     */
                    this._event.fire('analysissucceeded', {'layer': e.layer, 'name': e.name})
                });
                
                this.viewModel.on('analysisfailed', (e) => {
                    this.messageBox.showView(Lang.i18n('msg_theFieldNotSupportAnalysis'), "failure");
                    analysingContainer.style.display = 'none';
                    analysisBtn.style.display = 'block';
                    /**
                     * @event L.supermap.components.distributedAnalysis#analysisfailed
                     * @description 分析失败后触发。
                     * @property {string} error - 服务器返回的错误。
                     */
                    this._event.fire('analysisfailed', {'error': e.error})
                });

                this.viewModel.analysis(params, this.map);
            }
        };

        // 删除按钮点击事件
        deleteLayersBtn.onclick = () => {
            /**
             * @event L.supermap.components.distributedAnalysis#layersremoved
             * @description 结果图层删除后触发。
             * @property {Array.<L.GeoJSON>} layers - 被删除的结果图层。
             */
            this.viewModel.on('layersremoved', (e) => {
                this._event.fire('layersremoved', { 'layers': e.layers });
            });
            this.viewModel.clearLayers();
        };

        // 获取分析参数
        function getAnalysisParam() {
            let analysisType = dropDownTop.getAttribute('data-value');
            let analysisMethod = analysisMethodSelectName.getAttribute('data-value');
            let gridType = gridTypeSelectName.getAttribute('data-value');
            let queryRange = queryRangeInput.value;
            let gridSizeUnit = gridSizeUnitSelectName.title;
            let searchRadiusUnit = searchRadiusSelectName.title;
            let areaUnit = areaUnitSelectName.title;
            let colorGradientType = rangeContentModelSelectName.getAttribute('data-value');
            let themeModel = themeModelSelectName.getAttribute('data-value');
            let date = new Date();
            let resultLayerName = resultLayerInput.value || date.getTime();
            let mappingParameter;
            if (themeModel === 'NOTSET') {
                mappingParameter = '';
            } else {
                mappingParameter = {
                    'rangeMode': themeModel,
                    'rangeCount': rangeContentParamInput.value,
                    'colorGradientType': colorGradientType
                }
            }
            let analysisParam;
            if (analysisType === 'density') {
                analysisParam = new KernelDensityJobParameter({
                    'datasetName': datasetSelectName.title,
                    'method': analysisMethod,
                    'meshType': gridType,
                    'resolution': gridSizeInput.value,
                    'fields': weightFieldsSelectName.title,
                    'radius': searchRadiusInput.value,
                    'meshSizeUnit': gridSizeUnit,
                    'radiusUnit': searchRadiusUnit,
                    'areaUnit': areaUnit,
                    'query': queryRange,
                    'mappingParameters': new MappingParameters({
                        'rangeMode': mappingParameter.rangeMode,
                        'rangeCount': mappingParameter.rangeCount,
                        'colorGradientType': mappingParameter.colorGradientType
                    })
                })
            }

            let params = {
                'analysisParam': analysisParam,
                'resultLayerName': resultLayerName
            };
            return params;
        }

        //阻止 map 默认事件
        this._preventMapEvent(container, this.map);
        return container;
    },

    /**
     * @function L.supermap.components.distributedAnalysis.prototype._createOptions
     * @description 创建下拉框 options。
     * @private
     */
    _createOptions(container, optionsArr) {
        for (let i in optionsArr) {
            let option = document.createElement('div');
            option.className = 'component-selecttool__option';
            option.title = optionsArr[i];
            option.innerHTML = optionsArr[i];
            option.setAttribute('data-value', optionsArr[i]);
            container.appendChild(option);
        }
    },

    /**
     * @function L.supermap.components.distributedAnalysis.prototype._creatInputBox
     * @description 创建含有 span 的 input 框。
     * @private
     */
    _creatInputBox(inputOptions, parentEle) {
        let div = L.DomUtil.create('div', '', parentEle);
        let span = L.DomUtil.create('span', '', div);
        span.innerHTML = inputOptions.spanName;
        let input = L.DomUtil.create('input', '', div);
        input.value = inputOptions.value;
        input.className = 'component-distributeanalysis__input';
        return div;
    },

    /**
     * @function L.supermap.components.distributedAnalysis.prototype._creatUnitSelectBox
     * @description 创建含有 span 的 input 框。
     * @private
     */
    _creatUnitSelectBox(options, parentEle) {
        let unitSelectBoxContainer = L.DomUtil.create('div', 'component-clientcomputation__buffer--radius', parentEle);
        let unitSelectSpan = L.DomUtil.create('span', '', unitSelectBoxContainer);
        unitSelectSpan.innerHTML = options.labelName;
        let unitSelectInputContainer = L.DomUtil.create('div', '', unitSelectBoxContainer);
        L.DomUtil.create('input', 'buffer-radius-input', unitSelectInputContainer);

        let unitSelectUnitContainer = L.DomUtil.create('div', 'component-clientcomputation__buffer--unit', unitSelectInputContainer);
        let unitSelectOptions = options.selectOptions;
        let unitSelectTool = (new Select(unitSelectOptions)).getElement();
        unitSelectUnitContainer.appendChild(unitSelectTool);

        return unitSelectBoxContainer;
    },

    /**
     * @function L.supermap.components.distributedAnalysis.prototype._setEleAtribute
     * @description 设置元素的属性名和属性值。
     * @private
     */
    _setEleAtribute(daraValueArr, attributeName, eleArr) {
        for (let i = 0; i < eleArr.length; i++) {
            eleArr[i].setAttribute(attributeName, daraValueArr[i])
        }
    }

});
export var distributedAnalysisView = function (options) {
    return new DistributedAnalysisView(options);
};

L.supermap.components.distributedAnalysis = distributedAnalysisView;