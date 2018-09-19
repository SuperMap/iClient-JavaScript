/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {OpenFileViewModel} from "./OpenFileViewModel";
import {MessageBox, Lang} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.openFile
 * @classdesc openfile 微件，用于打开本地数据文件并加载到底图
 * @category Widgets
 */
export var OpenFileView = L.Control.extend({
    options: {
        //绑定的底图图层
        layer: null,
        //控件位置 继承自leaflet control
        position: 'topright'
    },
    /**
     * @function L.supermap.widgets.openfile.prototype.onAdd
     * @description 向底图添加微件
     */
    onAdd: function (map) {
        this.map = map;
        this.event = new L.Evented();
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        return this._initOpenFileView();
    },

    /**
     * @function L.supermap.widgets.openfile.prototype.onAdd
     * @description 改变微件样式
     * @param {string} styleName - css样式名
     * @param {string} value - css样式值
     */
    setViewStyle(styleName, value) {
        this.rootContainer.style[styleName] = value;
    },

    /**
     * @function L.supermap.widgets.openfile.prototype._initOpenFileView
     * @description 创建打开本地文件数据微件
     * @return {div}
     * @private
     */
    _initOpenFileView: function () {
        //初始化 ViewModel:
        this.viewModel = new OpenFileViewModel(this.map, this);
        //初始化 view

        const uploadContent = L.DomUtil.create('div', 'openFileContainer');
        uploadContent.id = 'openFile';

        this.fileSelect = L.DomUtil.create('div', '', uploadContent);
        this.label = L.DomUtil.create('label', 'file-selectSpan', this.fileSelect);
        this.label.htmlFor = "input_file";

        L.DomUtil.create('div', 'supermapol-icons-upload', this.label);
        const fileSpan = L.DomUtil.create('span', 'openFile-span', this.label);
        fileSpan.appendChild(document.createTextNode(Lang.i18n('text_chooseFile')));

        this.fileInput = L.DomUtil.create('input', 'openFile_input', this.fileSelect);
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
        this.viewModel.on("openfilefail", (e) => {
            this.messageBox.showView(e.message, e.messageType);
        });
        this.viewModel.on("readdatafail", (e) => {
            this.messageBox.showView(e.message, e.messageType);
        });
        this.viewModel.on("openfilesuccess", (e) => {
            this.event.fire("openfilesuccess", e);
        });

        this.rootContainer = uploadContent;
        return uploadContent;
    },

    on(eventType, callback) {
        this.event.on(eventType, callback);
    }

});
export var openFileView = function (options) {
    return new OpenFileView(options);
};

L.supermap.widgets.openFile = openFileView;