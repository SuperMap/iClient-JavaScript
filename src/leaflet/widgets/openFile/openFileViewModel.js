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

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype.selectFileOnchange
     * @description 选中文件并加载到底图
     * @param e
     * @return {boolean}
     */
    selectFileLoadToMap(e) {
        let inputDom = e.target;
        let file = inputDom.files[0];
        //文件大小限制
        if (file.size > this.fileModel.FileConfig.fileMaxSize) {
            //todo 这里都用wegit？
            alert("File supports up to 10M.");
            return false;
        }

        let filePath = inputDom.value;
        let fileName = file.name;
        let fileType = widgetsUtil.getFileType(fileName);
        //文件格式不支持
        if (!fileType) {
            alert("Unsupported data type.");
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
            this._loadData();
        }
    }

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._loadData
     * @description 加载数据
     * @private
     */
    _loadData() {
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
            throw new Error("Incorrect data format: " + error);
        }, this);
    }

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._newLayerToMap
     * @description 将数据创建为图层并加载到底图
     * @param geojson
     * @private
     */
    _newLayerToMap(geojson) {
        const layer = L.geoJSON(geojson);
        this.fileModel.map.flyToBounds(layer.getBounds());
        layer.addTo(this.fileModel.map);
    }

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._processDatas
     * @description 将读取回来得数据统一处理为 geoJson 格式
     * @param type
     * @param data
     * @return {*}
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
                throw new Error("Unsupported data type.");
                // return false;
            }
            return geojson;
        } else {
            throw new Error("Unsupported data type.");
        }
    }

    /**
     * @function L.supermap.widgets.OpenFileViewModel.prototype._processExcelData
     * @description 表格形式数据处理
     * @param data
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
}

L.supermap.widgets.OpenFileViewModel = OpenFileViewModel;

L.supermap.widgets.util = widgetsUtil;