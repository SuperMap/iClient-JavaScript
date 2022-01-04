/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class RasterFunctionParameter
 * @deprecatedclass SuperMap.RasterFunctionParameter
 * @category iServer Map
 * @classdesc iServer 地图服务栅格分析参数基类
 * @param {Object} options - 参数。
 * @param {RasterFunctionType} options.type - 栅格分析方法。
 * @usage
 */
export class RasterFunctionParameter {
    constructor(options) {
        options = options || {};

        /**
         * @member {RasterFunctionType} [RasterFunctionParameter.prototype.type]
         * @description 栅格分析方法。
         */
        this.type = null;

        Util.extend(this, options);
        this.CLASS_NAME = 'SuperMap.RasterFunctionParameter';
    }

    /**
     * @function RasterFunctionParameter.prototype.destroy
     * @description 释放资源，将资源的属性置空。
     */
    destroy() {
        this.type = null;
    }
}

