/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {FileTypes} from '../CommonTypes';

export let widgetsUtil = {
    /**
     * 获取上传文件类型
     * @param fileName
     */
    getFileType(fileName) {
        let regCSV = /^.*\.(?:csv)$/i;
        let regExcel = /^.*\.(?:xls|xlsx)$/i; //文件名可以带空格
        let regGeojson = /^.*\.(?:geojson|json)$/i;
        if (regExcel.test(fileName)) { //校验不通过
            return FileTypes.EXCEL;
        } else if (regCSV.test(fileName)) {
            return FileTypes.CSV;
        } else if (regGeojson.test(fileName)) {
            return FileTypes.GEOJSON;
        }
        return null;
    },

    /**
     * 判断是否地理X坐标
     *
     * @param data
     */
    isXField(data) {
        var lowerdata = data.toLowerCase();
        return (lowerdata === "x" || lowerdata === "smx" ||
            lowerdata === "jd" || lowerdata === "经度" || lowerdata === "东经" || lowerdata === "longitude" ||
            lowerdata === "lot" || lowerdata === "lon" || lowerdata === "lng");
    },

    /**
     * 判断是否地理Y坐标
     *
     * @param data
     */
    isYField(data) {
        var lowerdata = data.toLowerCase();
        return (lowerdata === "y" || lowerdata === "smy" ||
            lowerdata === "wd" || lowerdata === "纬度" || lowerdata === "北纬" ||
            lowerdata === "latitude" || lowerdata === "lat");
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