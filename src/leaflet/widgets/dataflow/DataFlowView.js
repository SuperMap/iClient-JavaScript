/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {WidgetsViewBase} from '../WidgetsViewBase';
import {MessageBox, CommonContainer, Lang} from '@supermap/iclient-common';
import {DataFlowViewModel} from './DataFlowViewModel';

/**
 * @class L.supermap.widgets.dataFlow
 * @classdesc 数据流微件。
 * @version 9.1.1
 * @category Widgets DataFlow
 * @param {Object} options - 可选参数。
 * @param {string} [options.position='topright'] - 微件在地图中显示的位置，包括：'topleft'，'topright'，'bottomleft' 和 'bottomright'，继承自 leaflet control。
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
 * @fires L.supermap.widgets.dataFlow#dataupdated
 */
export var DataFlowView = WidgetsViewBase.extend({
    initialize(options) {
        WidgetsViewBase.prototype.initialize.apply(this, [options]);
    },

    /**
     * @function L.supermap.widgets.dataFlow.prototype.onAdd
     * @description 向底图添加微件
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
        return WidgetsViewBase.prototype.onAdd.apply(this, [map]);
    },

    /**
     * @function L.supermap.widgets.dataFlow.prototype._initView
     * @description 创建打开本地文件数据微件
     * @returns {HTMLElement}
     * @private
     * @override
     */
    _initView() {
        const containerObj = new CommonContainer({title: Lang.i18n("title_dataFlowService")});
        const container = containerObj.getElement();

        const widgetContent = containerObj.getContentElement();
        widgetContent.style.padding = "10px 18px";
        const dataFlowContainer1 = document.createElement("div");
        dataFlowContainer1.setAttribute("class", "widget-dataflow__container");
        //输入框
        const dataFlowInputContainer = document.createElement("div");
        dataFlowInputContainer.setAttribute("class", "widget-input-default");
        const dataFlowInput = document.createElement("input");
        dataFlowInput.setAttribute("class", "widget-input-default");
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

        widgetContent.appendChild(dataFlowContainer1);

        //复选框条件
        const dataFlowContainer2 = document.createElement("div");
        dataFlowContainer2.setAttribute("class", "widget-dataflow__container");
        const checkboxContainer = document.createElement("div");
        checkboxContainer.setAttribute("class", "widget-checkbox-container");
        const attributesCheckbox = document.createElement("div");
        attributesCheckbox.setAttribute("class", "widget-checkbox-default widget-checkbox-selected-img");
        attributesCheckbox.checked = true;
        checkboxContainer.appendChild(attributesCheckbox);
        const checkboxLabel = document.createElement("div");
        checkboxLabel.setAttribute("class", "widget-label widget-label-selected");
        checkboxLabel.innerHTML = Lang.i18n('text_displayFeaturesInfo');
        checkboxContainer.appendChild(checkboxLabel);
        //----是否显示属性框【属性框复选框点击事件】
        attributesCheckbox.onclick = (e) => {
            e.target.checked = !e.target.checked;
            if (e.target.checked) {
                checkboxLabel.setAttribute("class", "widget-label widget-label-selected");
                e.target.setAttribute("class", "widget-checkbox-default widget-checkbox-selected-img");
                this.viewModel.openPopups();
            } else {
                checkboxLabel.setAttribute("class", "widget-label");
                e.target.setAttribute("class", "widget-checkbox-default widget-checkbox-default-img");
                this.viewModel.closePopups();
            }
        };

        dataFlowContainer2.appendChild(checkboxContainer);
        widgetContent.appendChild(dataFlowContainer2);

        //订阅按钮,取消按钮:
        const dataFlowContainer3 = document.createElement("div");
        dataFlowContainer3.setAttribute("class", "widget-dataflow__container widget-init-center");
        const subscribe = document.createElement("button");
        subscribe.setAttribute("class", "widget-button-default");
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
        cancelSubscribe.setAttribute("class", "widget-button-default");
        cancelSubscribe.innerHTML = Lang.i18n('text_cancelSubscribe');
        //----取消订阅服务【取消订阅按钮点击事件】
        cancelSubscribe.onclick = () => {
            this.viewModel.cancelSubscribe();
        };
        dataFlowContainer3.appendChild(cancelSubscribe);
        widgetContent.appendChild(dataFlowContainer3);

        //增加提示框：
        this.messageBox = new MessageBox();

        this.viewModel.on("dataflowservicesubscribed", () => {
            this.messageBox.showView("已订阅该数据流服务。");
        });

        this.viewModel.on("subscribesucceed", () => {
            this.messageBox.showView("数据流服务订阅成功。");
        });

        /**
         * @event L.supermap.widgets.dataFlow#dataupdated
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

L.supermap.widgets.dataFlow = dataFlowView;
