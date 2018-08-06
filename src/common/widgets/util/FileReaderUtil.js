import XLSX from 'xlsx'
import {FileTypes} from '../CommonTypes.js';

export let FileReaderUtil = {

    rABS: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString,
    rABF: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsArrayBuffer,
    rAT: typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsText,
    /**
     * 读取文件
     * @param fileType
     * @param file
     * @param success
     * @param failed
     * @param context
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
     * @param context
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
     * @param context
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
    }

};