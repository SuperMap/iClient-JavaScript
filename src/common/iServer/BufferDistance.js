import SuperMap from '../SuperMap';
/**
 * @class SuperMap.BufferDistance
 * @classdesc 缓冲区分析的缓冲距离类。通过该类可以设置缓冲区分析的缓冲距离，距离可以是数值也可以是数值型的字段表达式。
 * @param options - {string} 缓冲区分析可选参数。如：<br>
 *        exp -{string} 以数值型的字段表达式作为缓冲区分析的距离值。<br>
 *        value -{number}以数值作为缓冲区分析的距离值。默认为100，单位：米。
 */
export default  class BufferDistance {

    /**
     * @member SuperMap.BufferDistance.prototype.exp -{string}
     * @description 以数值型的字段表达式作为缓冲区分析的距离值。
     */
    exp = null;

    /**
     * @member SuperMap.BufferDistance.prototype.value -{number}
     * @description 以数值作为缓冲区分析的距离值。默认为100，单位：米。
     */
    value = 100;

    constructor(options) {
        if (!options) {
            return this;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.BufferDistance.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.exp = null;
        this.value = null;
    }

    CLASS_NAME = "SuperMap.BufferDistance"
}
SuperMap.BufferDistance = BufferDistance;