import {FileTypes} from '../CommonTypes';

export let widgetsUtil = {
    /**
     * 获取上传文件类型
     *
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
    }
};