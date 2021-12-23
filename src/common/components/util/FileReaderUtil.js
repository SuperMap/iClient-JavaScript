/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import XLSX from 'xlsx'
import {FileTypes} from '../CommonTypes';
import {Lang} from '../../lang/Lang';

/**
 * @class SuperMap.Components.FileReaderUtil
 * @classdesc 组件读取文件工具类。
 * @version 9.1.1
 * @type {{rABS: (boolean|*), rABF: (boolean|*), rAT: (boolean|*), readFile: (function(*, *=, *=, *=, *=)), readTextFile: (function(*, *=, *=, *=)), readXLSXFile: (function(*, *=, *=, *=)), processDataToGeoJson: (function(string, Object): GeoJSONObject), processExcelDataToGeoJson: (function(Object): GeoJSONObject), isXField: (function(*)), isYField: (function(*)), string2Csv: (function(*, *=))}}
 */
export let FileReaderUtil = {
    rABS: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString,
    rABF: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsArrayBuffer,
    rAT: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsText,

    /**
     * @function SuperMap.Components.FileReaderUtil.prototype.readFile
     * @description 读取文件
     * @param {string} fileType - 当前读取的文件类型
     *
     * @param {Object} file - 读取回来的文件内容对象
     * @param {function} success - 读取文件成功回调函数
     * @param {function} failed - 读取文件失败回调函数
     * @param {Object} context - 回调重定向对象
     */
    readFile(fileType, file, success, failed, context) {
        if (FileTypes.JSON === fileType || FileTypes.GEOJSON === fileType) {
            this.readTextFile(file, success, failed, context)
        } else if (FileTypes.EXCEL === fileType || FileTypes.CSV === fileType) {
            this.readXLSXFile(file, success, failed, context)
        }
    },

    /**
     * 读取文本文件
     * @param file
     * @param success
     * @param failed
     * @param {Object} context - 回调重定向对象
     */
    readTextFile(file, success, failed, context) {
        let reader = new FileReader();
        reader.onloadend = function (evt) {
            success && success.call(context, evt.target.result);
        };
        reader.onerror = function (error) {
            failed && failed.call(context, error)
        };
        this.rAT ? reader.readAsText(file.file, 'utf-8') : reader.readAsBinaryString(file.file);
    },

    /**
     * 读取excel或csv文件
     * @param file
     * @param success
     * @param failed
     * @param {Object} context - 回调重定向对象
     */
    readXLSXFile(file, success, failed, context) {
        let reader = new FileReader();
        reader.onloadend = function (evt) {
            let xLSXData = new Uint8Array(evt.target.result);
            let workbook = XLSX.read(xLSXData, {type: "array"});
            try {
                if (workbook && workbook.SheetNames && workbook.SheetNames.length > 0) {
                    //暂时只读取第一个sheets的内容
                    let sheetName = workbook.SheetNames[0];
                    let xLSXCSVString = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                    success && success.call(context, xLSXCSVString);
                }
            } catch (error) {
                failed && failed.call(context, error);
            }
        };
        reader.onerror = function (error) {
            failed && failed.call(context, error)
        };
        this.rABF && reader.readAsArrayBuffer(file.file);
    },

    /**
     * @function SuperMap.Components.FileReaderUtil.prototype.processDataToGeoJson
     * @description 将读取回来得数据统一处理为 GeoJSON 格式
     * @param {string} type - 文件类型
     * @param {Object} data - 读取返回的数据对象
     * @param {function} success - 数据处理成功的回调
     * @param {function} failed - 数据处理失败的回调
     * @param {Object} context - 回调重定向对象
     * @returns {GeoJSONObject} 返回标准 GeoJSON 规范格式数据
     * @private
     */
    processDataToGeoJson(type, data, success, failed, context) {
        let geojson = null;
        if (type === "EXCEL" || type === "CSV") {
            geojson = this.processExcelDataToGeoJson(data);
            success && success.call(context, geojson);
        } else if (type === 'JSON' || type === 'GEOJSON') {
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
                failed && failed.call(context, Lang.i18n('msg_dataInWrongGeoJSONFormat'));
            }
            success && success.call(context, geojson);
        } else {
            failed && failed.call(context, Lang.i18n('msg_dataInWrongFormat'));
        }
    },
    /**
     * @function SuperMap.Components.FileReaderUtil.prototype.processExcelDataToGeoJson
     * @description 表格文件数据处理
     * @param {Object} data - 读取的表格文件数据
     * @returns {GeoJSONObject} 返回标准 GeoJSON 规范格式数据
     * @private
     */
    processExcelDataToGeoJson(data) {
        //处理为对象格式转化
        let dataContent = this.string2Csv(data);
        let fieldCaptions = dataContent.colTitles;

        //位置属性处理
        let xfieldIndex = -1,
            yfieldIndex = -1;
        for (let i = 0, len = fieldCaptions.length; i < len; i++) {
            if (this.isXField(fieldCaptions[i])) {
                xfieldIndex = i;
            }
            if (this.isYField(fieldCaptions[i])) {
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

            //属性信息
            let attributes = {};
            for (let index in dataContent.colTitles) {
                let key = dataContent.colTitles[index];
                attributes[key] = dataContent.rows[i][index];
            }

            //目前csv 只支持处理点，所以先生成点类型的 geojson
            let feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [x, y]
                },
                "properties": attributes
            };
            features.push(feature);
        }
        return features;
    },
    /**
     * 判断是否地理X坐标
     * @param data
     */
    isXField(data) {
        var lowerdata = data.toLowerCase();
        return (lowerdata === "x" || lowerdata === "smx" ||
            lowerdata === "jd" || lowerdata === "经度" || lowerdata === "东经" || lowerdata === "longitude" ||
            lowerdata === "lot" || lowerdata === "lon" || lowerdata === "lng" || lowerdata === "x坐标");
    },

    /**
     * 判断是否地理Y坐标
     * @param data
     */
    isYField(data) {
        var lowerdata = data.toLowerCase();
        return (lowerdata === "y" || lowerdata === "smy" ||
            lowerdata === "wd" || lowerdata === "纬度" || lowerdata === "北纬" ||
            lowerdata === "latitude" || lowerdata === "lat" || lowerdata === "y坐标");
    },
    /**
     * 字符串转为dataEditor 支持的csv格式数据
     * @param string
     * @param withoutTitle
     */
    string2Csv(string, withoutTitle) {
        // let rows = string.split('\r\n');
        let rows = string.split('\n');
        let result = {};
        if (!withoutTitle) {
            result["colTitles"] = rows[0].split(',');
        } else {
            result["colTitles"] = [];
        }
        result['rows'] = [];
        for (let i = (withoutTitle) ? 0 : 1; i < rows.length; i++) {
            rows[i] && result['rows'].push(rows[i].split(','));
        }
        return result;
    }

};

SuperMap.Components.FileReaderUtil = FileReaderUtil;

