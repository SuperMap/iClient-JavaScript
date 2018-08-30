import {FileTypes, FileConfig} from '../CommonTypes'

/**
 * @class SuperMap.FileModel
 * @description 文件数据微件数据模型，用于存储一些文件数据或状态，todo 结构待完善
 */
export class FileModel {
    constructor(options) {
        this.FileTypes = FileTypes;
        this.FileConfig = FileConfig;
        this.map = options && options.map ? options.map : null;
        this.loadFileObject = [];
    }

    /**
     * @function SuperMap.FileModel.prototype.set
     * @description 设置属性值
     * @param {string} key - 属性名称
     * @param {string|Object} value - 属性值
     */
    set(key, value) {
        this[key] = value;
    }

    /**
     * @function SuperMap.FileModel.prototype.get
     * @description 获取数据值
     * @param {string} key - 属性名称
     * @return {string|Object} value - 返回属性值
     */
    get(key) {
        return this[key];
    }

}