import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.BufferDistance
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析的缓冲距离类。通过该类可以设置缓冲区分析的缓冲距离，距离可以是数值也可以是数值型的字段表达式。
 * @param {Object} options - 参数。
 * @param {string} [options.exp] - 以数值型的字段表达式作为缓冲区分析的距离值。 
 * @param {number} [options.value=100] - 以数值作为缓冲区分析的距离值。单位：米。
 */
export class BufferDistance {


    constructor(options) {
        /**
         * @member {string} [SuperMap.BufferDistance.prototype.exp]
         * @description 以数值型的字段表达式作为缓冲区分析的距离值。
         */
        this.exp = null;

        /**
         * @member {number} [SuperMap.BufferDistance.prototype.value=100]
         * @description 以数值作为缓冲区分析的距离值。单位：米。
         */
        this.value = 100;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.BufferDistance";
    }

    /**
     * @function SuperMap.BufferDistance.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.exp = null;
        this.value = null;
    }


}

SuperMap.BufferDistance = BufferDistance;