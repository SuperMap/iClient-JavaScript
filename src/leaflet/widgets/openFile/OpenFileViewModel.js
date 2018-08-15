import L from "leaflet";
import '../../core/Base';
import {
    FileModel,
    FileReaderUtil,
    widgetsUtil,
    GeoJSON as GeoJSONFormat
} from '@supermap/iclient-common';

/**
 * @class L.supermap.widgets.OpenFileViewModel
 * @classdesc 打开本地文件微件 ViewModel，用于管理一些业务逻辑
 * @category Control Widgets
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
     * @function L.supermap.widgets.OpenFileViewModel.prototype.selectFileOnchange
     * @description 选中文件并加载到底图
     * @param {Object} fileEventObject - 通过文件选择框打开的本地文件对象
     */
    selectFileLoadToMap(fileEventObject) {
        let inputDom = fileEventObject.target;
        let file = inputDom.files[0];
        //文件大小限制
        if (file.size > this.fileModel.FileConfig.fileMaxSize) {
            // document.alert("File supports up to 10M.");
            this.fire("filesizeexceed", {messageType: "warring", message: "文件大小不得超过 10M。"});
            return false;
        }

        let filePath = inputDom.value;
        let fileName = file.name;
        let fileType = widgetsUtil.getFileType(fileName);
        //文件格式不支持
        if (!fileType) {
            // document.alert("Unsupported data type.");
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
     * @function L.supermap.widgets.OpenFileViewModel.prototype._readData
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
            me._newLayerToMap(me._processDatas(type, data));
        }, (error) => {
            me.fire("openfilefail", {messageType: "failure", message: "打开文件失败！"});
            // throw new Error("Incorrect data format: " + error);
        }, this);
    },

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._newLayerToMap
     * @description 将数据创建为图层并加载到底图
     * @param geojson
     * @private
     */
    _newLayerToMap(geojson) {
        const layer = L.geoJSON(geojson);
        this.fileModel.map.flyToBounds(layer.getBounds());
        //若有图层控件，则加入图层控件中
        if (this.fileModel.map.layersControl) {
            const layerName = this.fileModel.loadFileObject.fileName.split('.')[0];
            this.fileModel.map.layersControl.addOverlay(layer, layerName);
        }
        layer.addTo(this.fileModel.map);
    },

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._processDatas
     * @description 将读取回来得数据统一处理为 geoJson 格式
     * @param {string} type - 文件类型
     * @param {Object} data - 读取返回的数据对象
     * @return {Object} geojson - 返回标准 GeoJson 规范格式数据
     * @private
     */
    _processDatas(type, data) {
        //数据处理
        if (type === "EXCEL" || type === "CSV") {
            return this._processExcelData(data);
        } else if (type === 'JSON' || type === 'GEOJSON') {
            let geojson = null;
            let result = data;

            //geojson、json未知，通过类容来判断
            if ((typeof result) === "string") {
                result = JSON.parse(result);
            }
            if (result.type === 'ISERVER') {
                geojson = result.data.recordsets[0].features;
            } else if (result.type === 'FeatureCollection') {
                //geojson
                geojson = result;
            } else {
                //不支持数据
                this.fire("readdatafail", {messageType: "failure", message: "数据格式错误！非标准的 'GEOJSON' 格式数据！"});
                // throw new Error("Unsupported data type.");
                // return false;
            }
            return geojson;
        } else {
            this.fire("readdatafail", {messageType: "failure", message: "数据格式错误！非标准的'EXCEL','CSV','GEOJSON'格式数据！"});
            // throw new Error("Unsupported data type.");
        }
    },

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._processExcelData
     * @description 表格文件数据处理
     * @param {Object} data - 读取的表格文件数据
     * @return {Object} - 返回标准 GeoJson 规范格式数据
     * @private
     */
    _processExcelData(data) {
        //处理为对象格式转化
        let dataContent = widgetsUtil.string2Csv(data);
        let fieldCaptions = dataContent.colTitles;

        //位置属性处理
        let xfieldIndex = -1,
            yfieldIndex = -1;
        for (let i = 0, len = fieldCaptions.length; i < len; i++) {
            if (widgetsUtil.isXField(fieldCaptions[i])) {
                xfieldIndex = i;
            }
            if (widgetsUtil.isYField(fieldCaptions[i])) {
                yfieldIndex = i;
            }
        }
        // feature 构建后期支持坐标系 4326/3857
        let features = [];
        for (let i = 0, len = dataContent.rows.length; i < len; i++) {
            let row = dataContent.rows[i];
            //if (featureFrom === "LonLat") {
            let x = Number(row[xfieldIndex]),
                y = Number(row[yfieldIndex]);

            let point = L.point(x, y);

            //属性信息
            let attributes = {};
            for (let index in dataContent.colTitles) {
                let key = dataContent.colTitles[index];
                attributes[key] = dataContent.rows[i][index];
            }

            let feature = L.supermap.themeFeature(point, attributes);
            features.push(feature.toFeature());
        }
        let format = new GeoJSONFormat();
        return JSON.parse(format.write(features));
    }
});

export var openFileViewModel = function (options) {
    return new OpenFileViewModel(options);
};

L.supermap.widgets.OpenFileViewModel = openFileViewModel;

L.supermap.widgets.util = widgetsUtil;