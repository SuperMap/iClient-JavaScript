/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {FileTypes, FileConfig} from '../CommonTypes'

/**
 * @class SuperMap.FileModel
 * @description 文件数据组件数据模型，用于存储一些文件数据或状态，todo 结构待完善
 * @category Components OpenFile
 * @private
 */
export class FileModel {
    constructor(options) {
        this.FileTypes = FileTypes;
        this.FileConfig = FileConfig;
        this.loadFileObject = options && options.loadFileObject ? options.loadFileObject : [];
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
     * @returns {string|Object} value - 返回属性值
     */
    get(key) {
        return this[key];
    }

}