/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';
import {
    FileModel,
    FileReaderUtil,
    widgetsUtil
} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.openFileViewModel
 * @classdesc 打开本地文件微件功能类。
 * @category Widgets OpenFile
 * @param {L.Map} map - leaflet map 对象。
 * @fires L.supermap.widgets.openFileViewModel#filesizeexceed
 * @fires L.supermap.widgets.openFileViewModel#errorfileformat
 * @fires L.supermap.widgets.openFileViewModel#openfilesuccess
 * @fires L.supermap.widgets.openFileViewModel#openfilefail
 */
export var OpenFileViewModel = L.Evented.extend({
    initialize(map) {
        if (map) {
            this.fileModel = new FileModel({map: map});
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }
    },


    /**
     * @function L.supermap.widgets.openFileViewModel.prototype.readFile
     * @description 选中文件并加载到底图
     * @param {Object} fileEventObject - 通过文件选择框打开的本地文件对象
     */
    readFile(fileEventObject) {
        let inputDom = fileEventObject.target;
        let file = inputDom.files[0];
        //文件大小限制
        if (file.size > this.fileModel.FileConfig.fileMaxSize) {
            // document.alert("File supports up to 10M.");
            /**
             * @event L.supermap.widgets.openFileViewModel#filesizeexceed
             * @description 超出文件大小限制后触发。
             * @property {string} messageType - 警告类型。
             * @property {string} message - 警告内容。
             */
            this.fire("filesizeexceed", {messageType: "warring", message: "文件大小不得超过 10M。"});
            return false;
        }

        let filePath = inputDom.value;
        let fileName = file.name;
        let fileType = widgetsUtil.getFileType(fileName);
        //文件格式不支持
        if (!fileType) {
            // document.alert("Unsupported data type.");
            /**
             * @event L.supermap.widgets.openFileViewModel#errorfileformat
             * @description 文件格式不支持时触发。
             * @property {string} messageType - 警告类型。
             * @property {string} message - 警告内容。
             */
            this.fire("errorfileformat", {messageType: "failure", message: "不支持该文件格式！"});
            return false;
        }
        //文件类型限制
        if (fileName !== "") {
            //给control 一份数据
            //todo MVVM模式 应该是数据变化触发数据变化的事件
            this.fileModel.set(
                "loadFileObject", {
                    file: file,
                    filePath: filePath,
                    fileName: fileName,
                    fileType: fileType
                });
            //响应选中文件添加到地图
            this._readData();
        }
    },

    /**
     * @function L.supermap.widgets.openFileViewModel.prototype._readData
     * @description 数据文件中的数据
     * @private
     */
    _readData() {
        //todo 需要测试另外两个
        const me = this;
        const type = this.fileModel.loadFileObject.fileType;
        FileReaderUtil.readFile(type, {
            file: this.fileModel.loadFileObject.file,
            path: this.fileModel.loadFileObject.filePath
        }, (data) => {
            //将数据统一转换为 geoJson 格式加载到底图
            const geojson = FileReaderUtil.processDataToGeoJson(type, data);
            if (geojson) {
                /**
                 * @event L.supermap.widgets.openFileViewModel#openfilesuccess
                 * @description 打开文件成功。
                 * @property {GeoJSONObject} result - GeoJSON 格式数据。
                 * @property {string} layerName - 图层名。
                 */
                this.fire("openfilesuccess", {
                    result: geojson,
                    layerName: this.fileModel.loadFileObject.fileName.split('.')[0]
                });
            }
        }, () => {
            /**
             * @event L.supermap.widgets.openFileViewModel#openfilefail
             * @description 打开文件失败。
             * @property {string} messageType - 警告类型。
             * @property {string} message - 警告内容。
             */
            me.fire("openfilefail", {messageType: "failure", message: "打开文件失败！"});
            // throw new Error("Incorrect data format: " + error);
        }, this);
    }


});

export var openFileViewModel = function (options) {
    return new OpenFileViewModel(options);
};

L.supermap.widgets.openFileViewModel = openFileViewModel;

L.supermap.widgets.util = widgetsUtil;