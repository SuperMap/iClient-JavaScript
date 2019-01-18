/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {WidgetsViewBase} from '../WidgetsViewBase';
import {OpenFileViewModel} from "./OpenFileViewModel";
import {MessageBox, Lang} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.openFile
 * @classdesc 打开文件微件，用于打开本地数据文件并加载到地图，目前支持打开 .csv|.xls|.xlsx|.geojson|.json 格式文件，只支持WGS84经纬度坐标。
 * @version 9.1.1
 * @param {Object} options - 可选参数。
 * @param {string} [options.position='topright'] - 微件在地图中显示的位置，包括：'topleft'，'topright'，'bottomleft' 和 'bottomright'，继承自 leaflet control。
 * @param {function} [options.style] - 设置图层点线面默认样式，点样式返回 maker 或者 circleMaker；线和面返回 L.path 样式。
 * @param {function} [options.onEachFeature] - 在创建和设置样式后，将为每个创建的要素调用一次的函数。用于将事件和弹出窗口附加到要素。默认情况下，对新创建的图层不执行任何操作。
 * @fires L.supermap.widgets.openFile#openfilesucceeded
 * @fires L.supermap.widgets.openFile#openfilefailed
 * @extends {L.supermap.widgets.widgetsViewBase}
 * @category Widgets OpenFile
 */
export var OpenFileView = WidgetsViewBase.extend({
    options: {
        //绑定的底图图层
        layer: null
    },

    initialize(options) {
        WidgetsViewBase.prototype.initialize.apply(this, [options]);
        //初始化 ViewModel:
        this.viewModel = new OpenFileViewModel();
    },

    /**
     * @function L.supermap.widgets.openFile.prototype.setViewStyle
     * @description 改变微件样式。
     * @param {string} styleName - css 样式名。
     * @param {string} value - css 样式值。
     */
    setViewStyle(styleName, value) {
        this.rootContainer.style[styleName] = value;
    },

    /**
     * @function L.supermap.widgets.openFile.prototype._initView
     * @description 创建打开本地文件数据微件。
     * @returns {HTMLElement}
     * @private
     * @override
     */
    _initView() {

        //初始化 view
        const uploadContent = L.DomUtil.create('div', 'widget-openfile');
        uploadContent.id = 'openFile';

        this.fileSelect = L.DomUtil.create('div', '', uploadContent);
        this.label = L.DomUtil.create('label', 'widget-openfile__span--select', this.fileSelect);
        this.label.htmlFor = "input_file";

        L.DomUtil.create('div', 'supermapol-icons-upload', this.label);
        const fileSpan = L.DomUtil.create('span', 'widget-openfile__span', this.label);
        fileSpan.appendChild(document.createTextNode(Lang.i18n('text_chooseFile')));

        this.fileInput = L.DomUtil.create('input', 'widget-openfile__input', this.fileSelect);
        this.fileInput.id = "input_file";
        this.fileInput.type = "file";
        this.fileInput.accept = ".json,.geojson,.csv,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"

        this.fileInput.onchange = (fileEventObject) => {
            this.messageBox.closeView();
            this.viewModel.readFile(fileEventObject);
        };
        //增加提示框：
        this.messageBox = new MessageBox();

        //添加监听
        this.viewModel.on("filesizeexceed", (e) => {
            this.messageBox.showView(e.message, e.messageType);
        });
        this.viewModel.on("errorfileformat", (e) => {
            this.messageBox.showView(e.message, e.messageType);
        });
        this.viewModel.on("openfilefailed", (e) => {
            this.messageBox.showView(e.message, e.messageType);
             /**
             * @event L.supermap.widgets.openFile#openfilefailed
             * @description 打开文件失败。
             * @property {Object} e - 事件对象。
             */
            this._event.fire("openfilefailed", e);
        });
        this.viewModel.on("readdatafail", (e) => {
            this.messageBox.showView(e.message, e.messageType);
        });
        this.viewModel.on("openfilesucceeded", (e) => {
            /**
             * @event L.supermap.widgets.openFile#openfilesucceeded
             * @description 打开文件成功。
             * @property {Object} e - 事件对象。
             */
            this._event.fire("openfilesucceeded", e);
        });

        // 阻止 map 默认事件
        this._preventMapEvent(uploadContent, this.map);
        return uploadContent;
    }

});
export var openFileView = function (options) {
    return new OpenFileView(options);
};

L.supermap.widgets.openFile = openFileView;