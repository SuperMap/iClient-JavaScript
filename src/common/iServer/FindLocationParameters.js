/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class FindLocationParameters
 * @deprecatedclass SuperMap.FindLocationParameters
 * @category iServer NetworkAnalyst Location
 * @classdesc 选址分区分析参数类。
 * @param {Object} options - 参数。
 * @param {string} options.turnWeightField - 转向权值字段的名称。
 * @param {string} options.weightName - 阻力字段的名称，标识了进行网络分析时所使用的阻力字段。
 * @param {Array.<SupplyCenter>} options.supplyCenters - 资源供给中心集合。
 * @param {number} [options.expectedSupplyCenterCount=1] - 期望用于最终设施选址的资源供给中心数量。
 * @param {boolean} [options.isFromCenter=false] - 是否从中心点开始分配资源。
 * @usage
 */
export class FindLocationParameters {


    constructor(options) {
        /**
         * @member {number} [FindLocationParameters.prototype.expectedSupplyCenterCount=1]
         * @description 期望用于最终设施选址的资源供给中心数量。
         *              当输入值为 0 时，最终设施选址的资源供给中心数量默认为覆盖分析区域内的所需最少的供给中心数。
         */
        this.expectedSupplyCenterCount = null;

        /**
         * @member {boolean} [FindLocationParameters.prototype.isFromCenter=false]
         * @description 是否从中心点开始分配资源。
         *              由于网路数据中的弧段具有正反阻力，即弧段的正向阻力值与其反向阻力值可能不同，
         *              因此，在进行分析时，从资源供给中心开始分配资源到需求点与从需求点向资源供给中心分配这两种分配形式下，所得的分析结果会不同。
         */
        this.isFromCenter = false;


        /**
         * @member {Array.<SupplyCenter>} FindLocationParameters.prototype.supplyCenters
         * @description 资源供给中心集合。
         *              资源供给中心是提供资源和服务的设施，对应于网络结点，
         *              资源供给中心的相关信息包括资源量、最大阻力值、资源供给中心类型，资源供给中心在网络中所处结点的 ID 等，以便在进行选址分区分析时使用。
         */
        this.supplyCenters = null;

        /**
         * @member {string} FindLocationParameters.prototype.turnWeightField
         * @description 转向权值字段的名称。
         */
        this.turnWeightField = null;

        /**
         * @member {string} FindLocationParameters.prototype.weightName
         * @description 阻力字段的名称，标识了进行网络分析时所使用的阻力字段。
         */
        this.weightName = null;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.FindLocationParameters";
    }

    /**
     * @function FindLocationParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.expectedSupplyCenterCount = null;
        me.isFromCenter = null;
        me.turnWeightField = null;
        me.weightName = null;
        if (me.supplyCenters) {
            for (var i = 0, supplyCenters = me.supplyCenters, len = supplyCenters.length; i < len; i++) {
                supplyCenters[i].destroy();
            }
            me.supplyCenters = null;
        }
    }


}
