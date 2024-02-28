/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class  Size
 * @deprecatedclass SuperMap.Size
 * @category BaseTypes Style
 * @classdesc 此类描绘一对高宽值的实例。
 * @param {number} [w=0.0] - 宽度。
 * @param {number} [h=0.0] - 高度。
 *
 * @example
 * var size = new Size(31,46);
 * @usage
 */
export class Size {

    constructor(w, h) {
        /**
         * @member {number} [Size.prototype.w=0.0]
         * @description 宽度。
         */
        this.w = w ? parseFloat(w) : 0.0;

        /**
         * @member {number} [Size.prototype.h=0.0]
         * @description 高度。
         */
        this.h = w ? parseFloat(h) : 0.0;
        this.CLASS_NAME = "SuperMap.Size";
    }


    /**
     * @function Size.prototype.toString
     * @description 返回字符串形式。
     * @example
     * var size = new Size(10,5);
     * var str = size.toString();
     * @returns {string} 例如："w=10,h=5"。
     */
    toString() {
        return ("w=" + this.w + ",h=" + this.h);
    }


    /**
     * @function Size.prototype.clone
     * @description 克隆当前 size 对象。
     * @example
     * var size = new Size(31,46);
     * var size2 = size.clone();
     * @returns {Size}  新的与当前 size 对象有相同宽、高的 Size 对象。
     */
    clone() {
        return new Size(this.w, this.h);
    }


    /**
     *
     * @function Size.prototype.equals
     * @description 比较两个 size 对象是否相等。
     * @example
     * var size = new Size(31,46);
     * var size2 = new Size(31,46);
     * var isEquals = size.equals(size2);
     *
     * @param {Size} sz - 用于比较相等的 Size 对象。
     * @returns {boolean} 传入的 size 和当前 size 高宽相等，注意：如果传入的 size 为空则返回 false。
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
     * @function Size.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var size = new Size(31,46);
     * size.destroy();
     */
    destroy() {
        this.w = null;
        this.h = null;
    }
}
