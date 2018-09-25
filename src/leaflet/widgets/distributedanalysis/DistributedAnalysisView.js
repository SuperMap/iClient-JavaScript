/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {DistributedAnalysisViewModel} from "./DistributedAnalysisViewModel";
import {CommonContainer, DropDownBox, Select, MessageBox, Lang} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.distributedAnalysis
 * @classdesc 分布式分析微件。
 * @param {string} processingUrl - 分布式分析服务地址。
 * @category Widgets DistributedAnalysis
 */
export var DistributedAnalysisView = L.Control.extend({

    options: {
        //控件位置 继承自 leaflet control
        position: 'topright'
    },

    initialize: function (processingUrl, options) {
        this.processingUrl = processingUrl;
        L.Util.setOptions(this, options);
    },
    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype.onAdd
     * @description 添加控件。
     * @private
     */
    onAdd: function (map) {
        this.map = map;
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        let container = this._initDistributedAnalystView();
        this._fillDataToView();
        return container;
    },
    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._fillDataToView
     * @description 填充数据到 view。
     * @private
     */
    _fillDataToView: function () {
        this.viewModel.getDatasetsName();
        // 提示框
        let me = this;
        // 获取数据集
        this.viewModel.on('datasetsloaded', function (e) {
            let datasetOptionsArr = e.result.dataset.datasetNames;
            me.datasetSelect.innerHTML = '';
            me._createOptions(me.datasetSelect, datasetOptionsArr);
            me.datasetSelectObj.optionClickEvent(me.datasetSelect, me.datasetSelectName, me.datasetSelectOnchange);
            me.dataHash = e.result.datasetHash;
        })
    },

    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._preventMapEvent
     * @description 阻止 map 默认事件。
     * @private
     */
    _preventMapEvent(div, map) {
        if (!div || !map) {
            return;
        }
        div.addEventListener('mouseover', function () {
            map.dragging.disable();
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
        });
        div.addEventListener('mouseout', function () {
            map.dragging.enable();
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();
        });
    },

    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._initDistributedAnalystView
     * @description 创建分布式分析微件。
     * @returns {HTMLElement}
     * @private
     */
    _initDistributedAnalystView: function () {
        //初始化 ViewModel:
        this.viewModel = new DistributedAnalysisViewModel(this.processingUrl);
        let me = this;

        // 微件 container
        let container = (new CommonContainer(Lang.i18n('title_distributedAnalysis'))).getElement();
        container.classList.add('widget-analysis-container');
        container.children[0].style.fontSize = '12px';

        // 微件内容 container
        let widgetContentContainer = L.DomUtil.create('div', 'widget-content-container widget-scroll-content analysis-content-container', container);

        // 分析方式下拉框
        let analysisOptionsArr = [{
            'title': Lang.i18n('text_densityAnalysis'),
            'dataValue': 'density',
            'remark': Lang.i18n('text_CalculateTheValuePerUnitArea'),
            'icon': {
                'className': 'analyst-density-img'
            }
        }];
        let dropDownBox = (new DropDownBox(analysisOptionsArr)).getElement();
        widgetContentContainer.appendChild(dropDownBox);
        // 选中的 dropDownItem
        let dropDownTop = dropDownBox.children[0].children[0].children[0];

        // 各分析参数 container
        let analyusisTypeContainer = L.DomUtil.create('div', 'analyusistype-container di-font-content-md', widgetContentContainer);
        let analysisType = L.DomUtil.create('div', 'analysistype', analyusisTypeContainer);
        let analysisLayer = L.DomUtil.create('div', 'analysisLayer', analysisType);

        // 数据集下拉框
        let datasetSelectControl = L.DomUtil.create('div', 'select-control', analysisLayer);
        let datasetOptions = {
            'optionsArr': [Lang.i18n('text_option_selectDataset')],
            'labelName': Lang.i18n('text_label_dataset'),
            "optionsClickCb": datasetSelectOnchange.bind(this)
        }
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
        let analyseIDW = L.DomUtil.create('div', 'analyse IDW', analysisLayer);
        let analysisOptions = [{
            'optionsArr': [Lang.i18n('text_option_simplePointDensityAnalysis'), Lang.i18n('text_option_nuclearDensityAnalysis')],
            'labelName': Lang.i18n('text_label_analyticalMethod')
            // 'optionsClickCb': analysisMethodSelectOnchange.bind(this)
        }, {
            'optionsArr': [Lang.i18n('text_option_quadrilateral'), Lang.i18n('text_option_hexagon')],
            'labelName': Lang.i18n('text_label_meshType')
        }];
        // 分析参数 select control
        let analysisSelectControl = L.DomUtil.create('div', 'select-control', analyseIDW);
        for (let i in analysisOptions) {
            let selectTool = (new Select(analysisOptions[i])).getElement();
            analysisSelectControl.appendChild(selectTool);
        }

        // 权重选择下拉框
        let weightFieldsSelectOptions = {
            'optionsArr': [Lang.i18n('text_option_notSet')],
            'labelName': Lang.i18n('text_label_weightField')
        }
        let weightFieldsSelectObj = new Select(weightFieldsSelectOptions);
        let weightFieldsSelectTool = weightFieldsSelectObj.getElement();
        analysisSelectControl.appendChild(weightFieldsSelectTool);
        this.weightFieldsSelectObj = weightFieldsSelectObj;

        // 分析方法选中值 & option attr设置
        let analysisMethodSelectName = analysisSelectControl.children[0].children[1].children[0];
        analysisMethodSelectName.setAttribute('data-value', '0');
        let analysisMethodSelect = analysisSelectControl.children[0].children[1].children[2].children[0].children[0];
        let analysisMethodDV = ['0', '1'];
        this._setEleAtribute(analysisMethodDV, 'data-value', analysisMethodSelect.children)

        // 网格面类型选中值 & option attr设置
        let gridTypeSelectName = analysisSelectControl.children[1].children[1].children[0];
        gridTypeSelectName.setAttribute('data-value', '0');
        let gridTypeSelect = analysisSelectControl.children[1].children[1].children[2].children[0].children[0];
        let gridTypeDV = ['0', '1'];
        this._setEleAtribute(gridTypeDV, 'data-value', gridTypeSelect.children)

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
        queryRangeInput.setAttribute('placeholder', Lang.i18n('text_label_queryRangeTips'))
        queryRangeInput.title = Lang.i18n('text_label_queryRangeTips');
        
        // 网格大小
        let gridSizeUnitSelectOptions = {
            'optionsArr': ['Meter', 'Kilometer', 'Yard', 'Foot', 'Mile']
        }
        let gridSizeOptions = {
            'labelName': Lang.i18n('text_label_gridSizeInMeters'),
            'selectOptions':gridSizeUnitSelectOptions
        }
        let gridSizeContainer = this._creatUnitSelectBox(gridSizeOptions, analysisSelectControl);
        let gridSizeInput = gridSizeContainer.children[1].children[0];
        gridSizeInput.value = '1000';
        let gridSizeUnitSelectName = gridSizeContainer.children[1].children[1].children[0].children[0].children[0];

        // 搜索半径 
        let searchRadiusUnitSelectOptions = {
            'optionsArr': ['Meter', 'Kilometer', 'Yard', 'Foot', 'Mile']
        }
        let searchRadiusOptions = {
            'labelName': Lang.i18n('text_label_searchRadius'),
            'selectOptions':searchRadiusUnitSelectOptions
        }
        let searchRadiusContainer = this._creatUnitSelectBox(searchRadiusOptions, analysisSelectControl);
        let searchRadiusInput = searchRadiusContainer.children[1].children[0];
        searchRadiusInput.value = '300';
        let searchRadiusSelectName = searchRadiusContainer.children[1].children[1].children[0].children[0].children[0];
        // 面积单位
        let areaUnitSelectOptions = {
            'labelName': Lang.i18n('text_label_areaUnit'),
            'optionsArr': ['SquareMile', 'SquareMeter', 'Hectare', 'Acre', 'SquareFoot', 'SquareYard']
        }
        let areaUnitSelectTool= (new Select(areaUnitSelectOptions)).getElement();
        analysisSelectControl.appendChild(areaUnitSelectTool);
        let areaUnitSelectName = areaUnitSelectTool.children[1].children[0];
        // 专题图分段
        let rangeContent = L.DomUtil.create('div', 'range-content', analysisType);
        let rangeContentOptions = {
            'optionsArr': [Lang.i18n('text_option_notSet'), Lang.i18n('text_option_equidistantSegmentation'), Lang.i18n('text_option_logarithm'), Lang.i18n('text_option_equalCountingSegment'), Lang.i18n('text_option_squareRootSegmentation')],
            'labelName': Lang.i18n('text_label_thematicMapSegmentationMode'),
            "optionsClickCb": themeModelSelectOnchange
        }
        rangeContent.appendChild((new Select(rangeContentOptions)).getElement());

        let themeModelSelectName = rangeContent.children[0].children[1].children[0];
        themeModelSelectName.setAttribute('data-value', 'NOTSET');
        let themeModelSelect = rangeContent.children[0].children[1].children[2].children[0].children[0];
        let themeModelDataValue = ['NOTSET', 'EQUALINTERVAL', 'LOGARITHM', 'QUANTILE', 'SQUAREROOT']
        this._setEleAtribute(themeModelDataValue, 'data-value', themeModelSelect.children)

        let rangeContentParamInput = this._creatInputBox({
            'spanName': Lang.i18n('text_label_thematicMapSegmentationParameters'),
            'value': '20'
        }, rangeContent)
        rangeContentParamInput.classList.add('hidden');
        let rangeContentModelSelectTool = (new Select({
            'optionsArr': [
                Lang.i18n('text_option_greenOrangePurpleGradient'),
                Lang.i18n('text_option_greenOrangeRedGradient'),
                Lang.i18n('text_option_rainbowGradient'),
                Lang.i18n('text_option_spectralGradient'),
                Lang.i18n('text_option_terrainGradient')],
            'labelName': Lang.i18n('text_label_thematicMapColorGradientMode')
        })).getElement()
        rangeContent.appendChild(rangeContentModelSelectTool);
        rangeContentModelSelectTool.classList.add('hidden');
        let rangeContentModelSelect = rangeContentModelSelectTool.children[1].children[2].children[0].children[0];
        let rangeContentModelSelectName = rangeContentModelSelectTool.children[1].children[0];
        rangeContentModelSelectName.setAttribute('data-value', 'GREENORANGEVIOLET');
        let rangeContentModelDV = ['GREENORANGEVIOLET', 'GREENORANGERED', 'RAINBOW', 'SPECTRUM', 'TERRAIN']
        this._setEleAtribute(rangeContentModelDV, 'data-value', rangeContentModelSelect.children)

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
        let resultLayerInput = L.DomUtil.create('input', 'distributeInput', resultLayerContainer);


        // 分析 & 分析中 & 取消 按钮
        let runBtnContainer = L.DomUtil.create('div', 'run-btn-container di-font-content-md', analyusisTypeContainer);
        let runBtn = L.DomUtil.create('div', 'run-btn', runBtnContainer);
        let analysisBtn = L.DomUtil.create('button', 'analysis-btn', runBtn);
        analysisBtn.innerHTML = Lang.i18n('btn_analyze');
        let analysingContainer = L.DomUtil.create('div', 'analysing-container hidden', runBtn);
        let analysisingBtn = L.DomUtil.create('div', 'analysising-btn', analysingContainer);
        analysisingBtn.style.width = '200px';
        let svgContainer = L.DomUtil.create('div', 'svg-container', analysisingBtn);
        svgContainer.innerHTML = `<svg class="svg-rotate" width="16px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path id="ring" fill="#FFF" transform="translate(8,8)" d="M 0 0 v -8 A 8 8 0 1 1 -8.00 0 z"></path>
            <circle cx="8" cy="8" r="6" fill="#38ADF5"></circle>
            <rect class="svg-top" x="8" y="0" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
            <rect class="svg-left" x="0" y="8" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
        </svg>`
        L.DomUtil.create('span', '', analysisingBtn).innerHTML = Lang.i18n('btn_analyzing');

        // 删除按钮
        let deleteLayersBtn = L.DomUtil.create('button', 'analysis-btn delete-layers', runBtn);
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
                this.viewModel.getDatasetInfo(datasetUrl);
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
                })
            }
        }

        // 分析按钮点击事件
        analysisBtn.onclick = () => {
            me.messageBox.closeView();
            let params = getAnalysisParam();
            if (params.datasetName === Lang.i18n('text_option_selectDataset')) {
                me.messageBox.showView(Lang.i18n('msg_selectDataset'), "failure");
            } else if (params.fields === Lang.i18n('text_option_notSet')) {
                me.messageBox.showView(Lang.i18n('msg_setTheWeightField'), "failure");
            } else {
                me.messageBox.closeView();
                analysingContainer.style.display = 'block';
                analysisBtn.style.display = 'none';
                me.viewModel.analysis(params, me.map);
                let _me = me;
                me.viewModel.on('layerloaded', function () {
                    analysingContainer.style.display = 'none';
                    analysisBtn.style.display = 'block';
                })
                me.viewModel.on('analysisfailed', function () {
                    _me.messageBox.showView(Lang.i18n('msg_theFieldNotSupportAnalysis'), "failure");
                    analysingContainer.style.display = 'none';
                    analysisBtn.style.display = 'block';
                })
            }
        }

        // 删除按钮点击事件
        deleteLayersBtn.onclick = () => {
            me.viewModel.clearLayers();
        }

        // 获取分析参数
        function getAnalysisParam() {
            let analysisType = dropDownTop.getAttribute('data-value');
            let analysisMethod = analysisMethodSelectName.getAttribute('data-value');
            let gridType = gridTypeSelectName.getAttribute('data-value');
            let queryRange = queryRangeInput.value;
            let gridSizeUnit = gridSizeUnitSelectName.title;
            let searchRadiusUnit = searchRadiusSelectName.title;
            let areaUnit = areaUnitSelectName.title
            let colorGradientType = rangeContentModelSelectName.getAttribute('data-value');
            let themeModel = themeModelSelectName.getAttribute('data-value');
            let date = new Date();
            let resultLayer = resultLayerInput.value || date.getTime();
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
            let analysisParam = {
                'datasetName': datasetSelectName.title,
                'analysisType': analysisType,
                'method': analysisMethod,
                'meshType': gridType,
                'resolution': gridSizeInput.value,
                'gridSizeUnit': gridSizeUnit,
                'queryRange': queryRange,
                'fields': weightFieldsSelectName.title,
                'radius': searchRadiusInput.value,
                'searchRadiusUnit':searchRadiusUnit,
                'areaUnit': areaUnit,
                'mappingParameter': mappingParameter,
                'resultLayer': resultLayer
            }
            return analysisParam;
        }

        this._container = container;
        this._preventMapEvent(this._container, this.map);
        return this._container;
    },
    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._createOptions
     * @description 创建下拉框 options。
     * @private
     */
    _createOptions(container, optionsArr) {
        for (let i in optionsArr) {
            let option = document.createElement('div');
            option.className = 'select-option';
            option.title = optionsArr[i];
            option.innerHTML = optionsArr[i];
            option.setAttribute('data-value', optionsArr[i]);
            container.appendChild(option);
        }
    },
    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._creatInputBox
     * @description 创建含有 span 的 input 框。
     * @private
     */
    _creatInputBox(inputOptions, parentEle) {
        let div = L.DomUtil.create('div', '', parentEle);
        let span = L.DomUtil.create('span', '', div);
        span.innerHTML = inputOptions.spanName;
        let input = L.DomUtil.create('input', '', div);
        input.value = inputOptions.value;
        input.className = 'distributeInput'
        return div;
    },
    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._creatInputBox
     * @description 创建含有 span 的 input 框。
     * @private
     */
    _creatUnitSelectBox(options, parentEle) {
        let unitSelectBoxContainer = L.DomUtil.create('div','buffer-radius', parentEle);
        let unitSelectSpan = L.DomUtil.create('span','', unitSelectBoxContainer);
        unitSelectSpan.innerHTML = options.labelName;
        let unitSelectInputContainer = L.DomUtil.create('div','', unitSelectBoxContainer);
        L.DomUtil.create('input','buffer-radius-input', unitSelectInputContainer);

        let unitSelectUnitContainer = L.DomUtil.create('div','buffer-unit', unitSelectInputContainer);
        let unitSelectOptions = options.selectOptions;
        let unitSelectTool = (new Select(unitSelectOptions)).getElement();
        unitSelectUnitContainer.appendChild(unitSelectTool)

        return unitSelectBoxContainer;
    },
    /**
     * @function L.supermap.widgets.distributedAnalysis.prototype._setEleAtribute
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

L.supermap.widgets.distributedAnalysis = distributedAnalysisView;