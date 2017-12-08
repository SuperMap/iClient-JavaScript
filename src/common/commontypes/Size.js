import {SuperMap} from '../SuperMap';

/**
 * @class  SuperMap.Size
 * @classdesc 此类描绘一对高宽值的实例。
 * @param  w -{number} 宽度，默认值为0.0
 * @param  h -{number} 高度 ，默认值为0.0
 *
 * @example
 * var size = new SuperMap.Size(31,46);
 */
export class Size {

    constructor(w, h) {
        /**
         * @member SuperMap.Size.prototype.w -{number}
         * @description  宽，默认值为0.0
         */
        this.w = w ? parseFloat(w) : 0.0;

        /**
         * @member SuperMap.Size.prototype.h -{number}
         * @description 高，默认值为0.0
         */
        this.h = w ? parseFloat(h) : 0.0;
        this.CLASS_NAME = "SuperMap.Size";
    }


    /**
     * @function SuperMap.Size.prototype.toString
     * @description 返回此对象的字符串形式
     * @example
     * var size = new SuperMap.Size(10,5);
     * var str = size.toString();
     * @returns {string} 例如："w=10,h=5"
     */
    toString() {
        return ("w=" + this.w + ",h=" + this.h);
    }


    /**
     * @function SuperMap.Size.prototype.clone
     * @description 克隆当前size对象.
     * @example
     * var size = new SuperMap.Size(31,46);
     * var size2 = size.clone();
     *
     * @returns {SuperMap.Size}  返回一个新的与当前size对象有相同宽、高的Size对象。
     */
    clone() {
        return new Size(this.w, this.h);
    }


    /**
     *
     * @function SuperMap.Size.prototype.equals
     * @description 比较两个size对象是否相等。
     * @example
     * var size = new SuperMap.Size(31,46);
     * var size2 = new SuperMap.Size(31,46);
     * var isEquals = size.equals(size2);
     *
     * @param sz -{SuperMap.Size} 用于比较相等的Size对象。
     * @returns {Boolean} 传入的size和当前size高宽相等，注意：如果传入的size为空则返回false
     *
     */
    equals(sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w === sz.w && this.h === sz.h) ||
                (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    }

    /**
     *
     * @function SuperMap.Size.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为null，而不是初始值。
     * @example
     * var size = new SuperMap.Size(31,46);
     * size.destroy();
     */
    destroy() {
        this.w = null;
        this.h = null;
    }
}

SuperMap.Size = Size;