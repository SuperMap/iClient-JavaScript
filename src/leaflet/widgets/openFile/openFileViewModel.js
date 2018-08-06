import L from "leaflet";
import '../../core/Base';
import {
    FileModel, FileReaderUtil, widgetsUtil
} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.OpenFileViewModel
 * @classdesc 打开本地文件微件
 */
export class OpenFileViewModel {
    constructor(map) {
        if (map) {
            this.fileModel = new FileModel({map: map});
        } else {
            return new Error(`Cannot find map, fileModel.map cannot be null.`);
        }
    }

    selectFileOnchange(e) {
        let inputDom = e.target;
        let file = inputDom.files[0];
        //文件大小限制
        if (file.size > this.fileModel.FileConfig.fileMaxSize) {
            //todo 这里都用wegit？
            alert("文件最大支持10M数据");
            return false;
        }

        let filePath = inputDom.value;
        let fileName = file.name;
        let fileType = widgetsUtil.getFileType(fileName);
        //文件格式不支持
        if (!fileType) {
            alert("文件最大支持10M数据");
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
            this.loadData();
        }
    }

    /**
     * 加载数据
     */
    loadData() {
        //todo 需要测试另外两个
        const me = this;
        FileReaderUtil.readFile(this.fileModel.loadFileObject.fileType, {
            file: this.fileModel.loadFileObject.file,
            path: this.fileModel.loadFileObject.filePath
        }, (data) => {
            const result = JSON.parse(data);
            const layer = L.geoJSON(result).addTo(me.fileModel.map);
            me.fileModel.map.flyToBounds(layer.getBounds());
        }, (error) => {
            throw new Error("Incorrect data format: " + error);
        }, this);
    }

}

L.supermap.widgets.OpenFileViewModel = OpenFileViewModel;

L.supermap.widgets.util = widgetsUtil;