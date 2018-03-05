import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {OverlayOperationType} from '../REST';

/**
 * @class SuperMap.OverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 叠加分析参数基类，数据集叠加分析参数和几何对象叠加分析参数均继承此基类
 * @param options - {Object} 叠加分析参数。
 */
export class OverlayAnalystParameters {


    constructor(options) {
        /**
         * @member SuperMap.OverlayAnalystParameters.prototype.operation -{SuperMap.OverlayOperationType}
         * @description 指定叠加分析操作类型。
         */
        this.operation = OverlayOperationType.UNION;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.OverlayAnalystParameters";
    }

    /**
     * @function SuperMap.OverlayAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.operation = null;
    }


}

SuperMap.OverlayAnalystParameters = OverlayAnalystParameters;