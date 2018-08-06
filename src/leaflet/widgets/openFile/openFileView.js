import L from "leaflet";
import '../../core/Base';
import {OpenFileViewModel} from "./openFileViewModel";

/**
 * @classdesc OpenFileViewModel
 */
export var OpenFileView = L.Control.extend({
    options: {
        //绑定的底图图层
        layer: null,
        //控件位置 继承自leaflet control
        position: 'topright'
    },
    /**
     * @function L.supermap.control.changeTileVersion.prototype.onAdd
     * @description 添加控件
     */
    onAdd: function (map) {
        this.map = map;
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        return this._initOpenFileView();
    },

    _initOpenFileView: function () {
        //初始化 ViewModel:
        this.viewModel = new OpenFileViewModel(this.map);
        //初始化 view

        const uploadContent = L.DomUtil.create('div', 'addData_upload');

        this.fileSelect = L.DomUtil.create('div', 'file-select', uploadContent);
        this.label = L.DomUtil.create('label', 'file-selectSpan', this.fileSelect);
        this.label.htmlFor = "input_file";

        L.DomUtil.create('div', 'upload-icon', this.label);
        const fileSpan = L.DomUtil.create('span', 'upload-span', this.label);
        fileSpan.appendChild(document.createTextNode("选择文件"));

        this.fileInput = L.DomUtil.create('input', 'add_data_input', this.fileSelect);
        this.fileInput.id = "input_file";
        this.fileInput.type = "file";
        this.fileInput.accept = ".json,.geojson,.csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"

        //todo 解释一下bind
        this.fileInput.onchange = this.viewModel.selectFileOnchange.bind(this.viewModel);

        return uploadContent;
    }

});
export var openFileView = function (options) {
    return new OpenFileView(options);
};

L.supermap.widgets.openFile = openFileView;