import L from "leaflet";
import '../../core/Base';
import {OpenFileViewModel} from "./OpenFileViewModel";
import {MessageBox} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.openFile
 * @classdesc openFile 微件，用于打开本地数据文件并加载到底图
 * @category  Control Widgets
 */
export var OpenFileView = L.Control.extend({
    options: {
        //绑定的底图图层
        layer: null,
        //控件位置 继承自leaflet control
        position: 'topright'
    },
    /**
     * @function L.supermap.widgets.openFile.prototype.onAdd
     * @description 向底图添加微件
     */
    onAdd: function (map) {
        this.map = map;
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        return this._initOpenFileView();
    },

    /**
     * @function L.supermap.widgets.openFile.prototype._initOpenFileView
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
        fileSpan.appendChild(document.createTextNode("选择文件"));

        this.fileInput = L.DomUtil.create('input', 'openFile_input', this.fileSelect);
        this.fileInput.id = "input_file";
        this.fileInput.type = "file";
        this.fileInput.accept = ".json,.geojson,.csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"

        this.fileInput.onchange = this.viewModel.selectFileLoadToMap.bind(this.viewModel);

        //增加提示框：
        this.messageBox = new MessageBox();

        this.viewModel.on("filesizeexceed", this._showMessageListener.bind(this));
        this.viewModel.on("errorfileformat", this._showMessageListener.bind(this));
        this.viewModel.on("openfilefail", this._showMessageListener.bind(this));
        this.viewModel.on("readdatafail", this._showMessageListener.bind(this));

        return uploadContent;
    },

    /**
     * @function L.supermap.widgets.openFile.prototype._showMessageListener
     * @description 监听 OpenFileViewModel 事件，显示提示框
     * @param {Object} e - 事件对象
     * @private
     */
    _showMessageListener(e) {
        this.messageBox.showView(e.message, e.messageType);
    }

});
export var openFileView = function (options) {
    return new OpenFileView(options);
};

L.supermap.widgets.openFile = openFileView;