import L from "leaflet";
import '../../core/Base';
import {MessageBox, WidgetContainer} from '@supermap/iclient-common';
import {DataFlowViewModel} from './DataFlowViewModel';

/**
 * @class L.supermap.widgets.DataFlowView
 * @classdesc dataFlow 微件，用于打开本地数据文件并加载到底图
 * @category  Control Widgets
 */
export var DataFlowView = L.Control.extend({
    options: {
        //绑定的底图图层
        layer: null,
        //控件位置 继承自leaflet control
        position: 'topright'
    },
    /**
     * @function L.supermap.widgets.DataFlowView.prototype.onAdd
     * @description 向底图添加微件
     */
    onAdd(map) {
        this.map = map;
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        this.viewModel = new DataFlowViewModel(map);
        return this._initView();
    },

    /**
     * @function L.supermap.widgets.DataFlowView.prototype._initView
     * @description 创建打开本地文件数据微件
     * @return {div}
     * @private
     */
    _initView() {
        const widgetContainer = (new WidgetContainer("数据流服务")).getElement();

        const widgetContent = document.createElement("div");
        widgetContent.setAttribute("class", "widget-content-container");
        widgetContainer.appendChild(widgetContent);

        const dataFlowContainer1 = document.createElement("div");
        dataFlowContainer1.setAttribute("class", "dataflow-container");
        //输入框
        const dataFlowInputContainer = document.createElement("div");
        dataFlowInputContainer.setAttribute("class", "widget-input-default");
        const dataFlowInput = document.createElement("input");
        dataFlowInput.setAttribute("class", "widget-input-default");
        dataFlowInput.type = "text";
        dataFlowInput.value = "请输入数据流地址";
        //---输入框值改变,打开清除按钮
        dataFlowInput.oninput = this.inputOnchange.bind(this);
        this.dataFlowInput = dataFlowInput;
        dataFlowInputContainer.appendChild(dataFlowInput);
        //删除输入值按钮:
        const inputClearBtn = document.createElement("span");
        inputClearBtn.setAttribute("class", "supermapol-icons-close");
        inputClearBtn.hidden = true;
        //---清除输入值
        inputClearBtn.onclick = this.clearInputValue.bind(this);
        this.inputClearBtn = inputClearBtn;
        dataFlowInputContainer.appendChild(inputClearBtn);
        dataFlowContainer1.appendChild(dataFlowInputContainer);

        widgetContent.appendChild(dataFlowContainer1);

        //复选框条件
        const dataFlowContainer2 = document.createElement("div");
        dataFlowContainer2.setAttribute("class", "dataflow-container");
        const checkboxContainer = document.createElement("div");
        checkboxContainer.setAttribute("class", "widget-checkbox-container");
        const attributesCheckbox = document.createElement("div");
        attributesCheckbox.setAttribute("class", "widget-checkbox-default checkbox-selected-img");
        attributesCheckbox.checked = true;
        attributesCheckbox.onclick = this.isShowAttributes.bind(this);
        this.attributesCheckbox = attributesCheckbox;
        checkboxContainer.appendChild(attributesCheckbox);
        const checkboxLabel = document.createElement("div");
        checkboxLabel.setAttribute("class", "label label-selected");
        checkboxLabel.innerHTML = "显示要素信息";
        this.checkboxLabel = checkboxLabel;
        checkboxContainer.appendChild(checkboxLabel);

        dataFlowContainer2.appendChild(checkboxContainer);
        widgetContent.appendChild(dataFlowContainer2);

        //订阅按钮,取消按钮:
        const dataFlowContainer3 = document.createElement("div");
        dataFlowContainer3.setAttribute("class", "dataflow-container init-center");
        const subscribe = document.createElement("button");
        subscribe.setAttribute("class", "widget-button-default");
        subscribe.innerHTML = "订阅";
        subscribe.onclick = this.subscribe.bind(this);
        dataFlowContainer3.appendChild(subscribe);
        const cancelSubscribe = document.createElement("button");
        cancelSubscribe.setAttribute("class", "widget-button-default");
        cancelSubscribe.innerHTML = "取消订阅";
        cancelSubscribe.onclick = this.cancelSubscribe.bind(this);
        dataFlowContainer3.appendChild(cancelSubscribe);
        widgetContent.appendChild(dataFlowContainer3);

        //关闭在控件上触发地图的事件响应：
        const self = this;
        widgetContainer.addEventListener('mouseover', function () {
            self.map.dragging.disable();
            self.map.scrollWheelZoom.disable();
            self.map.doubleClickZoom.disable();
        });
        widgetContainer.addEventListener('mouseout', function () {
            self.map.dragging.enable();
            self.map.scrollWheelZoom.enable();
            self.map.doubleClickZoom.enable();
        });

        //增加提示框：
        this.messageBox = new MessageBox();
        this.viewModel.on("dataFlowServiceSubscribed", this._showMessageBox.bind(this));
        return widgetContainer;
    },
    _showMessageBox(e) {
        if (e.type === "dataFlowServiceSubscribed") {
            this.messageBox.showView("已订阅该数据流服务。");
        }
    },

    /**
     * 订阅
     * @private
     */
    subscribe() {
        const urlDataFlow = this.dataFlowInput.value;
        if (urlDataFlow === "") {
            this.messageBox.showView("请先输入数据流服务地址。");
            return;
        }
        this.viewModel.subscribe(urlDataFlow);
    },
    /**
     * 取消订阅
     * @private
     */
    cancelSubscribe() {
        this.viewModel.cancelSubscribe();
    },
    /**
     * 是否显示要素信息
     * @private
     */
    isShowAttributes(e) {
        this.attributesCheckbox.checked = !e.target.checked;
        if (this.attributesCheckbox.checked) {
            this.checkboxLabel.setAttribute("class", "label label-selected");
            this.attributesCheckbox.setAttribute("class", "widget-checkbox-default checkbox-selected-img");
            this.viewModel.openPopups();
        } else {
            this.checkboxLabel.setAttribute("class", "label");
            this.attributesCheckbox.setAttribute("class", "widget-checkbox-default checkbox-default-img");
            this.viewModel.closePopups();
        }
    },
    /**
     * 清除输入框内容
     * @private
     */
    clearInputValue() {
        this.dataFlowInput.value = "";
        this.inputClearBtn.hidden = true;
    },
    /**
     * 输入框值改变,打开清除按钮
     * @private
     */
    inputOnchange() {
        this.inputClearBtn.hidden = false;
    }
});

export var dataFlowView = function (options) {
    return new DataFlowView(options);
};

L.supermap.widgets.dataFlow = dataFlowView;
