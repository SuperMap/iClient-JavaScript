/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {OverlayOperationType} from '../REST';

/**
 * @class OverlayAnalystParameters
 * @deprecatedclass SuperMap.OverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 叠加分析参数基类。数据集叠加分析参数和几何对象叠加分析参数均继承此基类。
 * @param {Object} options - 参数。
 * @usage
 */
export class OverlayAnalystParameters {


    constructor(options) {
        /**
         * @member {OverlayOperationType} [OverlayAnalystParameters.prototype.operation=OverlayOperationType.UNION]
         * @description 指定叠加分析操作类型。
         */
        this.operation = OverlayOperationType.UNION;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.OverlayAnalystParameters";
    }

    /**
     * @function OverlayAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.operation = null;
    }


}
