import SuperMap from '../SuperMap';
import {OverlayOperationType} from '../REST';

/**
 * @class SuperMap.OverlayAnalystParameters
 * @constructs SuperMap.OverlayAnalystParameters
 * @classdesc
 * 叠加分析参数基类，数据集叠加分析参数和几何对象叠加分析参数均继承此基类
 * @api
 */
export default class OverlayAnalystParameters {

    /**
     * Property: operation
     * {OverlayOperationType}
     */
    operation = OverlayOperationType.UNION;

    /**
     * @method SuperMap.OverlayAnalystParameters.initialize
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * operation - {OverlayOperationType} 指定叠加分析操作类型。
     */
    constructor(options) {
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    }

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.operation = null;
    }

    CLASS_NAME = "SuperMap.OverlayAnalystParameters"
}
SuperMap.OverlayAnalystParameters = OverlayAnalystParameters;