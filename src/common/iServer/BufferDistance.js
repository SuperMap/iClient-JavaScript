/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class BufferDistance
 * @deprecatedclass SuperMap.BufferDistance
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析的缓冲距离类。通过该类可以设置缓冲区分析的缓冲距离，距离可以是数值也可以是数值型的字段表达式。
 * @param {Object} options - 可选参数。
 * @param {string} [options.exp] - 以数值型的字段表达式作为缓冲区分析的距离值。
 * @param {number} [options.value=100] - 以数值作为缓冲区分析的距离值。单位：米。
 * @usage
 */
export class BufferDistance {


    constructor(options) {
        /**
         * @member {string} [BufferDistance.prototype.exp]
         * @description 以数值型的字段表达式作为缓冲区分析的距离值。
         */
        this.exp = null;

        /**
         * @member {number} [BufferDistance.prototype.value=100]
         * @description 以数值作为缓冲区分析的距离值。单位：米。
         */
        this.value = 100;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.BufferDistance";
    }

    /**
     * @function BufferDistance.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.exp = null;
        this.value = null;
    }


}
