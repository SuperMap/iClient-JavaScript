import SuperMap from '../SuperMap';
import SupplyCenter from './SupplyCenter';

/**
 * @class SuperMap.FindLocationParameters
 * @classdesc 选址分区分析参数类。
 * @param options - {Object} 可选参数。如：<br>
 *        expectedSupplyCenterCount - {Integer} 期望用于最终设施选址的资源供给中心数量，必设字段。<br>
 *        isFromCenter - {boolean} 是否从中心点开始分配资源。默认为 false。<br>
 *        supplyCenters - {Array<SupplyCenter>} 资源供给中心集合，必设字段。<br>
 *        turnWeightField - {string} 转向权值字段的名称。<br>
 *        weightName - {string} 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，必设字段。
 */
export default  class FindLocationParameters {

    /**
     * @member SuperMap.FindLocationParameters.prototype.expectedSupplyCenterCount -{number}
     * @description 期望用于最终设施选址的资源供给中心数量，必设字段。<br>
     *              当输入值为0时，最终设施选址的资源供给中心数量默认为覆盖分析区域内的所需最少的供给中心数。
     */
    expectedSupplyCenterCount = null;

    /**
     * @member SuperMap.FindLocationParameters.prototype.isFromCenter -{boolean}
     * @description 是否从中心点开始分配资源。默认为 false。<br>
     *              由于网路数据中的弧段具有正反阻力，即弧段的正向阻力值与其反向阻力值可能不同，
     *              因此，在进行分析时，从资源供给中心开始分配资源到需求点与从需求点向资源供给中心分配这两种分配形式下，所得的分析结果会不同。
     */
    isFromCenter = false;


    /**
     * @member SuperMap.FindLocationParameters.prototype.supplyCenters -{Array<SuperMap.SupplyCenter>}
     * @description 资源供给中心集合，必设字段。<br>
     *              资源供给中心是提供资源和服务的设施，对应于网络结点，
     *              资源供给中心的相关信息包括资源量、最大阻力值、资源供给中心类型，资源供给中心在网络中所处结点的 ID 等，以便在进行选址分区分析时使用。
     */
    supplyCenters = null;

    /**
     * @member SuperMap.FindLocationParameters.prototype.turnWeightField -{string}
     * @description 转向权值字段的名称。
     */
    turnWeightField = null;

    /**
     * @member SuperMap.FindLocationParameters.prototype.weightName -{string}
     * @description 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，必设字段。
     */
    weightName = null;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.FindLocationParameters.prototype.destroy
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

    CLASS_NAME = "SuperMap.FindLocationParameters"
}

SuperMap.FindLocationParameters = FindLocationParameters;