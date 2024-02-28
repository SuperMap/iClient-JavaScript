/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class ThemeMemoryData
 * @deprecatedclass SuperMap.ThemeMemoryData
 * @category  iServer Map Theme
 * @classdesc 专题图内存数据类。制作专题图时，如果设置了内存数据，则会制作基于内存数据的专题图。
 * 具体实现为：在使用专题值制作专题图后，会用外部值代替原始值来制作相应的专题图。
 * @param {Array} srcData - 原始值数组。
 * @param {Array} targetData - 外部值数组。
 * @usage
 */
export class ThemeMemoryData {

    constructor(srcData, targetData) {
        /**
         * @member {Array} ThemeMemoryData.prototype.srcData
         * @description 原始值数组，该属性值将被 targetData 属性所指定的值替换掉，然后制作专题图，但数据库中的值并不会改变。
         */
        this.srcData = srcData;

        /**
         * @member {Array} ThemeMemoryData.prototype.targetData
         * @description 外部值数组，即用于制作专题图的内存数据，设定该属性值后，会将 srcData 属性所指定的原始值替换掉制作专题图，但数据库中的值并不会改变。
         */
        this.targetData = targetData;

        this.CLASS_NAME = "SuperMap.ThemeMemoryData";
    }

    /**
     * @function ThemeMemoryData.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.srcData = null;
        me.targetData = null;
    }


    /**
     * @function ThemeMemoryData.prototype.toJSON
     * @description 将 ThemeMemoryData 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        if (this.srcData && this.targetData) {
            var memoryDataStr = "";
            var count = Math.min(this.srcData.length, this.targetData.length);
            for (var i = 0; i < count; i++) {
                memoryDataStr += "\'" + this.srcData[i] + "\':\'" + this.targetData[i] + "\',";
            }
            //去除多余的逗号
            if (i > 0) {
                memoryDataStr = memoryDataStr.substring(0, memoryDataStr.length - 1);
            }
            return "{" + memoryDataStr + "}";
        } else {
            return null;
        }
    }

}
