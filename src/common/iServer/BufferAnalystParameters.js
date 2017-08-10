import SuperMap from '../SuperMap';
import BufferSetting from './BufferSetting';
/**
 * @class SuperMap.BufferAnalystParameters
 * @classdesc 缓冲区分析参数基类。
 * @param options - {Object} 可选参数。如:</br>
 *        bufferSetting - {SuperMap.BufferSetting} 设置缓冲区通用参数。
 */
export default  class BufferAnalystParameters {
    /**
     * @member SuperMap.BufferAnalystParameters.prototype.bufferSetting -{SuperMap.BufferSetting}
     * @description 设置缓冲区通用参数。
     * 为缓冲区分析提供必要的参数信息，包括左缓冲距离、右缓冲距离、端点类型、圆头缓冲圆弧处线段的个数信息。
     */
    bufferSetting = null;

    /*
     * @function SuperMap.BufferAnalystParameters.prototype.constructor
     * @param options - {Object} 可选参数。如:</br>
     *        bufferSetting - {SuperMap.BufferSetting} 设置缓冲区通用参数。
     */
    constructor(options) {
        var me = this;
        me.bufferSetting = new BufferSetting();
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.BufferAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.bufferSetting) {
            me.bufferSetting.destroy();
            me.bufferSetting = null;
        }
    }

    CLASS_NAME = "SuperMap.BufferAnalystParameters"
}
SuperMap.BufferAnalystParameters = BufferAnalystParameters;