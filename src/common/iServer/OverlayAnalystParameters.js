import SuperMap from '../SuperMap';
import {OverlayOperationType} from '../REST';

/**
 * @class SuperMap.OverlayAnalystParameters
 * @classdesc 叠加分析参数基类，数据集叠加分析参数和几何对象叠加分析参数均继承此基类
 * @param options - {Object} 叠加分析参数。
 */
export default class OverlayAnalystParameters {

    /**
     * @member SuperMap.OverlayAnalystParameters.prototype.operation -{SuperMap.OverlayOperationType}
     * @description 指定叠加分析操作类型。
     */
    operation = OverlayOperationType.UNION;

    constructor(options) {
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    }

    /**
     * @function SuperMap.OverlayAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.operation = null;
    }

    CLASS_NAME = "SuperMap.OverlayAnalystParameters"
}
SuperMap.OverlayAnalystParameters = OverlayAnalystParameters;