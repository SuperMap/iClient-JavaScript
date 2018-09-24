/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import { ClientComputationViewModel } from "./ClientComputationViewModel";
import { WidgetContainer, WidgetDropDownBox, WidgetSelect, MessageBox, Lang } from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.clientComputation
 * @classdesc 客户端计算微件，用于进行叠加图层的客户端计算。
 * @param {string} workerUrl - worker 地址，原始位置为 dist/leaflet/workers/TurfWorker.js。
 * @category Widgets ClientComputationLayer
 */
export var ClientComputationView = L.Control.extend({

    options: {
        //控件位置 继承自 leaflet control
        position: 'topright'
    },

    initialize: function (workerUrl, options) {
        if (!workerUrl) {
            throw new Error('workerUrl is required');
        }
        this.workerUrl = workerUrl;
        L.Util.setOptions(this, options);
    },
    /**
     * @function L.supermap.widgets.clientComputation.prototype.onAdd
     * @description 添加控件。
     * @private
     */
    onAdd: function (map) {
        this.map = map;
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        return this._initSpatialAnalysisView();
    },
    /**
     * @function L.supermap.widgets.clientComputation.prototype.addLayer
     * @description 添加叠加图层。
     */
    addLayer: function (layer) {
        this.layers = this.layers || [];
        this.layers.push(layer);
        let fillData = this.viewModel.getLayersData(this.layers);
        this.fillDataToView(fillData);
    },

    /**
     * @function L.supermap.widgets.clientComputation.prototype.fillDataToView
     * @private
     * @description 填充数据到 view。
     * @param {Object} fillData - 待填充的数据。
     */
    fillDataToView: function (fillData) {
        if (!fillData) {
            return;
        }
        this.fillData = fillData;

        // 填充分析图层下拉框
        let layserArr = [];
        for (let layerName in fillData) {
            layserArr.push(layerName);
        }
        let layersSelect = document.getElementById('layersSelect');
        let layerSelectName = document.getElementById('layerSelectName');
        // 清空 layersSelect；
        layersSelect.innerHTML = '';
        layerSelectName.title = layserArr[0];
        layerSelectName.innerHTML = layserArr[0];
        this._createOptions(layersSelect, layserArr);
        // 设置 layer select option 点击事件
        this.layerSelectObj.optionClickEvent(layersSelect, layerSelectName, this.layersSelectOnchange);

        // 当前选中图层数据
        let currentData = fillData[layerSelectName.title];
        let fieldsArr = currentData.fields;
        let textAreaData = currentData.fieldsValue;
        // 设置当前数据
        this.currentData = currentData;

        // 填充字段下拉框
        let fieldsSelect = document.getElementById('fieldsSelect');
        // 清空 fieldsSelect
        fieldsSelect.innerHTML = '';
        let fieldsSelectNameDiv = document.getElementById('fieldsSelectName');
        fieldsSelectNameDiv.innerHTML = fieldsArr[0];
        fieldsSelectNameDiv.title = fieldsArr[0];
        this._createOptions(fieldsSelect, fieldsArr);
        this.fieldsSelectObj.optionClickEvent(fieldsSelect, fieldsSelectNameDiv, this.fieldsSelectOnchange);

        // 当前选中字段
        let fieldsSelectName = fieldsSelectNameDiv.title;
        // 通过当前选中字段 填充 TextArea 初始值
        let getValueTextArea = document.getElementById('getValueTextArea');
        getValueTextArea.value = textAreaData[fieldsSelectName].toString().replace(/,/g, ",\r\n");
        getValueTextArea.setAttribute('data-value', textAreaData[fieldsSelectName])

        // 结果图层
        let resultLayersName = document.getElementById('resultLayersName');
        let analysisType = document.getElementById('dropDownTop').getAttribute('data-value');
        switch (analysisType) {
            case 'isolines': resultLayersName.value = Lang.i18n('text_label_isolines') + layerSelectName.title;
                break;
            case 'buffer': resultLayersName.value = Lang.i18n('text_label_buffer') + layerSelectName.title;
                break;
        }
    },

    /**
     * @function L.supermap.widgets.clientComputation.prototype._initOpenFileView
     * @description 创建客户端计算微件。
     * @returns {HTMLElement}
     * @private
     */
    _initSpatialAnalysisView: function () {
        //初始化 ViewModel
        this.workerUrl && ~~(this.viewModel = new ClientComputationViewModel(this.workerUrl));
        //初始化 view
        // widgetContainer
        let container = (new WidgetContainer(Lang.i18n('title_clientComputing'))).getElement();
        container.classList.add('widget-analysis-container');
        container.children[0].style.fontSize = '12px';
        let analysisOptionsArr = [{
            'title': Lang.i18n('text_isoline'),
            'dataValue': 'isolines',
            'remark': Lang.i18n('text_extractDiscreteValue'),
            'icon': {
                'className': 'analyst-isoline-img'
            }
        }, {
            'title': Lang.i18n('text_buffer'),
            'dataValue': 'buffer',
            'remark': Lang.i18n('text_specifyTheDistance'),
            'icon': {
                'className': 'analyst-buffer-img'
            }
        }];
        let widgetContentContainer = container.children[1];
        widgetContentContainer.classList.add('analysis-content-container');
        widgetContentContainer.classList.add('widget-scroll-content');

        // 下拉框
        let dropDownBox = (new WidgetDropDownBox(analysisOptionsArr)).getElement();
        widgetContentContainer.appendChild(dropDownBox);
        let dropDownTopContainer = dropDownBox.children[0].children[0];
        let dropDownItems = dropDownBox.children[0].children[2].children[0].children[0];
        dropDownTopContainer.children[0].id = 'dropDownTop';
        // analysisContainer
        let analyusisTypeContainer = L.DomUtil.create('div', 'analyusistype-container di-font-content-md', widgetContentContainer);
        let analysisType = L.DomUtil.create('div', 'analysistype', analyusisTypeContainer);

        // 分析图层
        let analysisLayer = L.DomUtil.create('div', 'analysisLayer', analysisType);
        let layerSelectControl = L.DomUtil.create('div', 'select-control', analysisLayer);
        layerSelectControl.id = 'layerSelectControl';
        let layerOptions = {
            'optionsArr': [''],
            'labelName': Lang.i18n('text_label_analysisLayer')
        }
        let layerSelectObj = new WidgetSelect(layerOptions);
        let layerSelectTool = layerSelectObj.getElement();
        this.layerSelectObj = layerSelectObj;
        layerSelectControl.appendChild(layerSelectTool);
        // 图层选中div
        let layerSelectName = layerSelectTool.children[1].children[0];
        layerSelectName.id = 'layerSelectName';
        // 图层下拉框select
        let layersSelect = layerSelectTool.children[1].children[2].children[0].children[0];
        layersSelect.id = 'layersSelect';

        // ISOLINE
        // 提取字段
        let div = L.DomUtil.create('div', '', analysisType);
        let isolineDiv = L.DomUtil.create('div', 'analyse ISOLINE surface_option', div);
        let fieldsOptions = {
            'optionsArr': [''],
            'labelName': Lang.i18n('text_label_extractField'),
            'optionsClickCb': this.fieldsSelectOnchange

        }
        let fieldsSelectControl = L.DomUtil.create('div', 'select-control', isolineDiv);
        let fieldsSelectObj = new WidgetSelect(fieldsOptions);
        let fieldsSelectTool = fieldsSelectObj.getElement();
        this.fieldsSelectObj = fieldsSelectObj;
        let fieldsSelectName = fieldsSelectTool.children[1].children[0];
        fieldsSelectName.id = 'fieldsSelectName';
        let fieldsSelect = fieldsSelectTool.children[1].children[2].children[0].children[0];
        fieldsSelect.id = 'fieldsSelect';
        fieldsSelectControl.appendChild(fieldsSelectTool);

        // 提取值
        let textareaContainer = L.DomUtil.create('div', 'textarea-container', isolineDiv);
        let textareaSpan = L.DomUtil.create('span', 'textarea-name', textareaContainer);
        textareaSpan.innerHTML = Lang.i18n('text_label_extractedValue');
        let textareaControl = L.DomUtil.create('div', 'textarea-control', textareaContainer);
        textareaControl.id = 'getValueText';
        let scrollarea = L.DomUtil.create('div', 'scrollarea', textareaControl);
        let scrollareaContent = L.DomUtil.create('div', 'scrollarea-content', scrollarea);
        scrollareaContent.setAttribute('tabindex', '1');
        let getValueTextArea = L.DomUtil.create('textarea', 'textarea', scrollareaContent);
        getValueTextArea.id = 'getValueTextArea';
        getValueTextArea.setAttribute('rows', '20');

        // 距离衰减
        let breaksDiv = L.DomUtil.create('div', '', isolineDiv);
        let breaksSpan = L.DomUtil.create('span', '', breaksDiv);
        breaksSpan.innerHTML = Lang.i18n('text_label_distanceAttenuation');
        let breaks = L.DomUtil.create('input', '', breaksDiv);
        breaks.value = '3';

        // 栅格大小
        let cellSizeDiv = L.DomUtil.create('div', '', isolineDiv);
        let cellSizeSpan = L.DomUtil.create('span', '', cellSizeDiv);
        cellSizeSpan.innerHTML = Lang.i18n('text_label_gridSize');
        let cellSize = L.DomUtil.create('input', '', cellSizeDiv);
        cellSize.value = '30';

        // BUFFER
        // 缓冲半径
        let bufferDiv = L.DomUtil.create('div', 'analyse BUFFER hidden', analysisType);
        let bufferRadius = L.DomUtil.create('div', 'buffer-radius', bufferDiv);
        let bufferRadiusSpan = L.DomUtil.create('span', '', bufferRadius);
        bufferRadiusSpan.innerHTML = Lang.i18n('text_label_bufferRadius');
        let bufferRadiusDiv = L.DomUtil.create('div', '', bufferRadius);
        let bufferRadiusInput = L.DomUtil.create('input', 'buffer-radius-input', bufferRadiusDiv);
        bufferRadiusInput.id = 'bufferRadiusInput';
        bufferRadiusInput.value = '10';
        bufferRadiusInput.setAttribute('placeholder', Lang.i18n('text_label_defaultkilometers'));
        let bufferUnit = L.DomUtil.create('div', 'buffer-unit', bufferRadiusDiv);
        bufferUnit.id = 'bufferUnit';
        // 半径单位选择下拉框
        let bufferUnitOptions = {
            'optionsArr': [Lang.i18n('text_option_kilometer')],
            'labelName': Lang.i18n('text_label_unit')
        };

        let bufferUnitSelectTool = (new WidgetSelect(bufferUnitOptions)).getElement();
        let bufferUnitSelectName = bufferUnitSelectTool.children[1].children[0];
        bufferUnitSelectName.id = 'bufferUnitSelectName';
        let bufferUnitSelect = bufferUnitSelectTool.children[1].children[2].children[0].children[0];
        bufferUnitSelect.id = 'bufferUnitSelect';
        bufferUnitSelectTool.children[0].style.display = 'none';
        bufferUnit.appendChild(bufferUnitSelectTool);

        // 保留原对象字段属性
        let saveFieldDiv = L.DomUtil.create('div', '', bufferRadius);
        let saveAttrsContainer = L.DomUtil.create('div', 'is-save-attrs', saveFieldDiv);
        saveAttrsContainer.id = 'saveAttrsContainer';
        let saveAttrsCheckbox = L.DomUtil.create('div', 'checkbox checkbox-fault', saveAttrsContainer);
        saveAttrsCheckbox.id = 'saveAttrsCheckbox';
        let saveAttrsLabel = L.DomUtil.create('div', 'lable', saveAttrsContainer);
        saveAttrsLabel.id = 'saveAttrsLabel';
        saveAttrsLabel.innerHTML = Lang.i18n('text_retainOriginal');

        // 合并缓冲区
        let isUnionContainer = L.DomUtil.create('div', 'is-union', saveFieldDiv);
        isUnionContainer.id = 'isUnionContainer';
        let isUnionCheckbox = L.DomUtil.create('div', 'checkbox checkbox-fault', isUnionContainer);
        isUnionCheckbox.id = 'isUnionCheckbox';
        let isUnionLabel = L.DomUtil.create('div', 'lable', isUnionContainer);
        isUnionLabel.innerHTML = Lang.i18n('text_mergeBuffer');
        isUnionLabel.id = 'isUnionLabel';

        // 结果图层
        let resultLayerDiv = L.DomUtil.create('div', '', analysisType);
        let resultLayerSpan = L.DomUtil.create('span', '', resultLayerDiv);
        resultLayerSpan.innerHTML = Lang.i18n('text_label_resultLayerName');
        let resultLayersName = L.DomUtil.create('input', '', resultLayerDiv);
        resultLayersName.id = 'resultLayersName';

        // 分析按钮
        let runBtnContainer = L.DomUtil.create('div', 'run-btn-container di-font-content-md', analyusisTypeContainer);
        let runBtn = L.DomUtil.create('div', 'run-btn', runBtnContainer);
        let analysisBtn = L.DomUtil.create('button', 'analysis-btn', runBtn);
        analysisBtn.innerHTML = Lang.i18n('btn_analyze');
        let analysingContainer = L.DomUtil.create('div', 'analysing-container hidden', runBtn);
        let analysisingBtn = L.DomUtil.create('div', 'analysising-btn', analysingContainer);
        let svgContainer = L.DomUtil.create('div', 'svg-container', analysisingBtn);
        svgContainer.id = 'analyse_background';
        svgContainer.innerHTML = `<svg class="svg-rotate" width="16px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path id="ring" fill="#FFF" transform="translate(8,8)" d="M 0 0 v -8 A 8 8 0 1 1 -8.00 0 z"></path>
            <circle cx="8" cy="8" r="6" fill="#38ADF5"></circle>
            <rect class="svg-top" x="8" y="0" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
            <rect class="svg-left" x="0" y="8" rx="2" ry="2" width="2" height="2" style="fill: rgb(255, 255, 255); stroke-width: 0;"></rect>
        </svg>`
        L.DomUtil.create('span', '', analysisingBtn).innerHTML = Lang.i18n('btn_analyzing');
        let analysisCancelBtn = L.DomUtil.create('button', 'analysis-cancel', analysingContainer);
        analysisCancelBtn.innerHTML = Lang.i18n('btn_cancelAnalysis');
        let deleteLayersBtn = L.DomUtil.create('button', 'analysis-btn delete-layers', runBtn);
        deleteLayersBtn.innerHTML = Lang.i18n('btn_emptyTheAnalysisLayer');
        let me = this;

        for (let i = 0; i < dropDownItems.children.length; i++) {
            dropDownItems.children[i].onclick = () => {
                dropDownTopContainer.innerHTML = dropDownItems.children[i].outerHTML;
                dropDownTopContainer.children[0].id = 'dropDownTop';
                let analysisMethod = dropDownItems.children[i].getAttribute('data-value');
                switch (analysisMethod) {
                    case 'buffer':
                        isolineDiv.classList.add('hidden');
                        bufferDiv.classList.remove('hidden');
                        widgetContentContainer.style.height = '422px'
                        resultLayersName.value = Lang.i18n('text_label_buffer') + layerSelectName.title;
                        break;
                    case 'isolines':
                        isolineDiv.classList.remove('hidden');
                        bufferDiv.classList.add('hidden');
                        widgetContentContainer.style.height = '712px'
                        resultLayersName.value = Lang.i18n('text_label_isolines') + layerSelectName.title;
                        break;
                }
            }
        }

        // 字段下拉框 onchange 事件
        this.fieldsSelectOnchange = fieldsSelectOnchange.bind(this);
        function fieldsSelectOnchange(option) {
            if (this.fillData) {
                let displayData = this.currentData;
                let fieldsSelectName = option.title;
                getValueTextArea.value = displayData.fieldsValue[fieldsSelectName].toString().replace(/,/g, ",\r\n");
                getValueTextArea.setAttribute('data-value', displayData.fieldsValue[fieldsSelectName]);
            }
        }


        // 选中图层实时改变事件
        this.layersSelectOnchange = layersSelectOnchange.bind(this);
        function layersSelectOnchange(option) {
            if (this.fillData) {
                let layerSelectName = option.title;
                let displayData = this.fillData[layerSelectName];
                this.currentData = displayData;
                fieldsSelect.innerHTML = '';
                this._createOptions(fieldsSelect, displayData.fields);
                let fieldsSelectNameDiv = document.getElementById('fieldsSelectName');
                let field = displayData.fields[0];
                fieldsSelectNameDiv.title = field;
                fieldsSelectNameDiv.innerHTML = field;
                let fieldsSelectName = field;
                this.fieldsSelectObj.optionClickEvent(fieldsSelect, fieldsSelectNameDiv, this.fieldsSelectOnchange);
                getValueTextArea.value = displayData.fieldsValue[fieldsSelectName].toString().replace(/,/g, ",\r\n");
                getValueTextArea.setAttribute('data-value', displayData.fieldsValue[fieldsSelectName]);

            }
        }

        //复选框事件
        let isSaveStatus = true;
        //选中select
        saveAttrsLabel.classList.add("selected");
        saveAttrsCheckbox.classList.add("checkbox-active");
        saveAttrsContainer.onclick = () => {
            if (isSaveStatus) {
                //将当前状态和样式->不选中的样式和状态
                saveAttrsCheckbox.classList.add("checkbox-fault");
                saveAttrsCheckbox.classList.remove("checkbox-active");
                saveAttrsLabel.classList.remove("selected");
                isSaveStatus = false;
            } else {
                //将当前样式和状态改为选中
                saveAttrsCheckbox.classList.add("checkbox-active");
                saveAttrsCheckbox.classList.remove("checkbox-fault");
                saveAttrsLabel.classList.add("selected");
                isSaveStatus = true;
                //如果当前状态为选中的状态，则将上一个复选框的样式和状态由选中-不选中
                if (isUnion) {
                    //移除dom样式和复选框的状态改变
                    isUnionCheckbox.classList.add("checkbox-fault");
                    isUnionCheckbox.classList.remove("checkbox-active");
                    isUnion = false;
                }
            }
        }
        //合并缓冲区
        //合并缓冲区，默认不选中，即为false
        let isUnion = false;
        isUnionContainer.onclick = () => {
            if (isUnion) {
                //将选中状态 由选中->不选中，修改其样式和状态
                isUnionCheckbox.classList.add("checkbox-fault");
                isUnionCheckbox.classList.remove("checkbox-active");
                isUnionLabel.classList.remove("selected");
                isUnion = false;

            } else {
                //将状态由不选中->选中，修改其样式和状态
                isUnionCheckbox.classList.add("checkbox-active");
                isUnionCheckbox.classList.remove("checkbox-fault");
                isUnionLabel.classList.add("selected");
                isUnion = true;
                //如果当前状态为选中的，将上一个复选框改为不选中的状态
                if (isSaveStatus) {
                    //修改当前样式和状态
                    saveAttrsCheckbox.classList.add("checkbox-fault");
                    saveAttrsCheckbox.classList.remove("checkbox-active");
                    isSaveStatus = false;
                }
            }
        }

        // 提示框
        this.messageBox = new MessageBox();
        // 分析按钮点击事件
        analysisBtn.onclick = () => {
            analysingContainer.style.display = 'block';
            analysisBtn.style.display = 'none';
            let dropDownTop = document.getElementById('dropDownTop');
            let analysisMethod = dropDownTop.getAttribute('data-value');
            let params;
            switch (analysisMethod) {
                case 'isolines': params = getIsolinesAnalysisParams();
                    break;
                case 'buffer': params = getBufferAnalysisParams();
                    break;
            }
            me.viewModel.analysis(params, me.map);
            me.viewModel.on('layerloaded', function () {
                analysingContainer.style.display = 'none';
                analysisBtn.style.display = 'block';
            });
            // 若分析的结果为空
            me.viewModel.on('analysisfailed', function () {
                analysingContainer.style.display = 'none';
                analysisBtn.style.display = 'block';
                me.messageBox.showView(Lang.i18n('msg_resultIsEmpty'), "failure");
            })
        }
        // 取消按钮点击事件
        analysisCancelBtn.onclick = () => {
            analysingContainer.style.display = 'none';
            analysisBtn.style.display = 'block';
            me.viewModel.cancelAnalysis()
        }
        // 删除按钮点击事件
        deleteLayersBtn.onclick = () => {
            me.viewModel.clearLayers();
        }
        // 获取分析数据
        function getIsolinesAnalysisParams() {
            let dropDownTop = document.getElementById('dropDownTop');
            let analysisMethod = dropDownTop.getAttribute('data-value');
            let resultLayersName = document.getElementById('resultLayersName').value;
            let analysisLayers = layerSelectName.title;
            let analysisFields = fieldsSelectName.title;
            let analysisFieldsValue = getValueTextArea.value.replace(/[\r\n]/g, "").split(',').toString();
            let analysisBreaks = breaks.value;
            let analysisCellSize = cellSize.value;
            let param = {
                'analysisMethod': analysisMethod,
                'analysisLayers': analysisLayers,
                'analysisFields': analysisFields,
                'analysisFieldsValue': analysisFieldsValue,
                'analysisBreaks': analysisBreaks,
                'analysisCellSize': analysisCellSize,
                'resultLayersName': resultLayersName
            }
            return param;
        }
        function getBufferAnalysisParams() {
            let dropDownTop = document.getElementById('dropDownTop');
            let resultLayersName = document.getElementById('resultLayersName').value;
            let analysisLayers = layerSelectName.title;
            let analysisMethod = dropDownTop.getAttribute('data-value');
            let radius = bufferRadiusInput.value;
            let unit = bufferUnitSelectName.title;

            let param = {
                'analysisMethod': analysisMethod,
                'analysisLayers': analysisLayers,
                'radius': radius,
                'unit': unit,
                'resultLayersName': resultLayersName,
                'isSaveStatus': isSaveStatus,
                'isUnion': isUnion

            }
            return param;
        }
        this._container = container;
        this._preventMapEvent(this._container, this.map);

        return this._container;
    },

    /**
    * @function L.supermap.widgets.clientComputation.prototype._createOptions
    * @description 创建 select 下拉框的 options。
    * @private
    */
    _createOptions(container, optionsArr) {
        for (let i in optionsArr) {
            let option = document.createElement('div');
            let optData = optionsArr[i];
            option.className = 'select-option';
            option.title = optData;
            option.innerHTML = optData;
            option.setAttribute('data-value', optData);
            container.appendChild(option);
        }
    },

    /**
    * @function L.supermap.widgets.clientComputation.prototype._preventMapEvent
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
    }
});

export var clientComputationView = function (options) {
    return new ClientComputationView(options);
};

L.supermap.widgets.clientComputation = clientComputationView;