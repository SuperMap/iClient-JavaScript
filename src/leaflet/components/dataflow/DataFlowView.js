/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {ComponentsViewBase} from '../ComponentsViewBase';
import {MessageBox, CommonContainer, Lang} from '@supermap/iclient-common';
import {DataFlowViewModel} from './DataFlowViewModel';

/**
 * @class L.supermap.components.dataFlow
 * @classdesc 数据流组件。
 * @version 9.1.1
 * @category Components DataFlow
 * @param {Object} options - 可选参数。
 * @param {string} [options.position='topright'] - 组件在地图中显示的位置，包括：'topleft'，'topright'，'bottomleft' 和 'bottomright'，继承自 leaflet control。
 * @param {Function} [options.style] - 设置图层点线面默认样式，点样式返回 maker 或者 circleMaker；线和面返回 L.path 样式。<br>
 `function (feature) {
                                                    return {
                                                        fillColor: "red",
                                                        fillOpacity: 1,
                                                        radius: 6,
                                                        weight: 0
                                                    };
                                            }`
 * @param {function} [options.onEachFeature] - 在创建和设置样式后，将为每个创建的要素调用一次的函数。用于将事件和弹出窗口附加到要素。默认情况下，对新创建的图层不执行任何操作。
 * @fires L.supermap.components.dataFlow#dataupdated
 * @extends {L.supermap.components.componentsViewBase}
 */
export var DataFlowView = ComponentsViewBase.extend({
    initialize(options) {
      ComponentsViewBase.prototype.initialize.apply(this, [options]);
    },

    /**
     * @function L.supermap.components.dataFlow.prototype.onAdd
     * @description 向底图添加组件
     * @override
     * @private
     */
    onAdd(map) {
        //为了避免空对象为复写默认配置的现象，先判断参数是否为空
        let options = {};
        if (this.options.style) {
            options.style = this.options.style;
        }
        if (this.options.onEachFeature) {
            options.style = this.options.onEachFeature;
        }
        this.viewModel = new DataFlowViewModel(map, options);
        return ComponentsViewBase.prototype.onAdd.apply(this, [map]);
    },

    /**
     * @function L.supermap.components.dataFlow.prototype._initView
     * @description 创建打开本地文件数据组件
     * @returns {HTMLElement}
     * @private
     * @override
     */
    _initView() {
        const containerObj = new CommonContainer({title: Lang.i18n("title_dataFlowService")});
        const container = containerObj.getElement();

        const componentContent = containerObj.getContentElement();
        componentContent.style.padding = "10px 18px";
        const dataFlowContainer1 = document.createElement("div");
        dataFlowContainer1.setAttribute("class", "component-dataflow__container");
        //输入框
        const dataFlowInputContainer = document.createElement("div");
        dataFlowInputContainer.setAttribute("class", "component-input-default");
        const dataFlowInput = document.createElement("input");
        dataFlowInput.setAttribute("class", "component-input-default");
        dataFlowInput.type = "text";
        dataFlowInput.placeholder = Lang.i18n('text_input_value_inputDataFlowUrl');
        dataFlowInput.title = Lang.i18n('text_input_value_inputDataFlowUrl');

        dataFlowInputContainer.appendChild(dataFlowInput);
        //删除输入值按钮:
        const inputClearBtn = document.createElement("span");
        inputClearBtn.setAttribute("class", "supermapol-icons-close");
        inputClearBtn.hidden = true;
        //---清除输入值【清除按钮点击事件】
        inputClearBtn.onclick = (e) => {
            dataFlowInput.value = "";
            e.target.hidden = true;
        };
        //---输入框值改变,打开清除按钮【输入框内容改变事件】
        dataFlowInput.oninput = () => {
            inputClearBtn.hidden = false;
        };
        dataFlowInputContainer.appendChild(inputClearBtn);
        dataFlowContainer1.appendChild(dataFlowInputContainer);

        componentContent.appendChild(dataFlowContainer1);

        //复选框条件
        const dataFlowContainer2 = document.createElement("div");
        dataFlowContainer2.setAttribute("class", "component-dataflow__container");
        const checkboxContainer = document.createElement("div");
        checkboxContainer.setAttribute("class", "component-checkbox-container");
        const attributesCheckbox = document.createElement("div");
        attributesCheckbox.setAttribute("class", "component-checkbox-default component-checkbox-selected-img");
        attributesCheckbox.checked = true;
        checkboxContainer.appendChild(attributesCheckbox);
        const checkboxLabel = document.createElement("div");
        checkboxLabel.setAttribute("class", "component-label component-label-selected");
        checkboxLabel.innerHTML = Lang.i18n('text_displayFeaturesInfo');
        checkboxContainer.appendChild(checkboxLabel);
        //----是否显示属性框【属性框复选框点击事件】
        attributesCheckbox.onclick = (e) => {
            e.target.checked = !e.target.checked;
            if (e.target.checked) {
                checkboxLabel.setAttribute("class", "component-label component-label-selected");
                e.target.setAttribute("class", "component-checkbox-default component-checkbox-selected-img");
                this.viewModel.openPopups();
            } else {
                checkboxLabel.setAttribute("class", "component-label");
                e.target.setAttribute("class", "component-checkbox-default component-checkbox-default-img");
                this.viewModel.closePopups();
            }
        };

        dataFlowContainer2.appendChild(checkboxContainer);
        componentContent.appendChild(dataFlowContainer2);

        //订阅按钮,取消按钮:
        const dataFlowContainer3 = document.createElement("div");
        dataFlowContainer3.setAttribute("class", "component-dataflow__container component-init-center");
        const subscribe = document.createElement("button");
        subscribe.setAttribute("class", "component-button-default");
        subscribe.innerHTML = Lang.i18n('text_subscribe');
        //----订阅服务【订阅按钮点击事件】
        subscribe.onclick = () => {
            const urlDataFlow = dataFlowInput.value;
            if (urlDataFlow === "") {
                this.messageBox.showView(Lang.i18n('msg_inputDataFlowUrlFirst'));
                return;
            }
            this.viewModel.subscribe(urlDataFlow);
        };
        dataFlowContainer3.appendChild(subscribe);
        const cancelSubscribe = document.createElement("button");
        cancelSubscribe.setAttribute("class", "component-button-default");
        cancelSubscribe.innerHTML = Lang.i18n('text_cancelSubscribe');
        //----取消订阅服务【取消订阅按钮点击事件】
        cancelSubscribe.onclick = () => {
            this.viewModel.cancelSubscribe();
        };
        dataFlowContainer3.appendChild(cancelSubscribe);
        componentContent.appendChild(dataFlowContainer3);

        //增加提示框：
        this.messageBox = new MessageBox();

        this.viewModel.on("dataflowservicesubscribed", () => {
            this.messageBox.showView(Lang.i18n("msg_dataflowservicesubscribed"));
        });

        this.viewModel.on("subscribesucceeded", () => {
            this.messageBox.showView(Lang.i18n("msg_subscribesucceeded"));
        });

        /**
         * @event L.supermap.components.dataFlow#dataupdated
         * @description 数据流服务成功返回数据后触发。
         * @property {Object} result  - 事件返回的数据对象。
         */
        this.viewModel.on("dataupdated", (result) => {
            this.messageBox.closeView();
            this._event.fire("dataupdated", result);
        });

        //关闭在控件上触发地图的事件响应：
        //阻止 map 默认事件
        this._preventMapEvent(container, this.map);
        return container;
    }

});

export var dataFlowView = function (options) {
    return new DataFlowView(options);
};

L.supermap.components.dataFlow = dataFlowView;
