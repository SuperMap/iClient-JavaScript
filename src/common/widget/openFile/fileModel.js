import {FileTypes, FileConfig} from '../CommonTypes'

/**
 * @description 文件数据微件数据模型，用于存储一些数据或状态，todo 结构待完善
 */
export class FileModel {
    constructor(options) {
        this.FileTypes = FileTypes;
        this.FileConfig = FileConfig;
        this.map = options && options.map ? options.map : null;
        this.loadFileObject = [];
    }

    set(key, value) {
        this[key] = value;
    }

    get(key) {
        return this[key];
    }

}