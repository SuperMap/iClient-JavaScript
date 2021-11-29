/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class Theme
 * @deprecatedclass SuperMap.Theme
 * @category  iServer Map Theme
 * @classdesc 专题图基类。
 * @param {string} type - 专题图类型。
 * @param {Object} options - 参数。
 * @param {ThemeMemoryData} [options.memoryData] - 专题图内存数据。
 * @usage
 */
export class Theme {

    constructor(type, options) {
        if (!type) {
            return this;
        }
        /**
         * @member {ThemeMemoryData} Theme.prototype.memoryData
         * @description 专题图内存数据。<br>
         *              用内存数据制作专题图的方式与表达式制作专题图的方式互斥，前者优先级较高。
         *              第一个参数代表专题值，即数据集中用来做专题图的字段或表达式的值；第二个参数代表外部值。在制作专题图时，会用外部值代替专题值来制作相应的专题图。
         */
        this.memoryData = null;

        /**
         * @member {string} Theme.prototype.type
         * @description 专题图类型。
         */
        this.type = type;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.Theme";
    }

    /**
     * @function Theme.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.memoryData) {
            me.memoryData.destroy();
            me.memoryData = null;
        }
        me.type = null;
    }

    /**
     * @function Theme.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        //return 子类实现
        return;
    }

}
