import {SuperMap} from '../SuperMap';

/**
 * @class SuperMap.Pixel
 * @classdesc 此类用x,y坐标描绘屏幕坐标（像素点）。
 * @param x - {number} x坐标，默认为0.0
 * @param y - {number} y坐标，默认为0.0
 * @param mode - {string} 坐标模式，默认为{@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
 *
 * @example
 * //单独创建一个对象
 * var pixcel = new SuperMap.Pixel(100,50);
 *
 * //依据size创建
 *  var size = new SuperMap.Size(21,25);
 *  var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
 */
export class Pixel {


    constructor(x, y, mode) {
        /**
         * @member SuperMap.Pixel.prototype.x -{number}
         * @description x坐标，默认为0.0
         */
        this.x = x ? parseFloat(x) : 0.0;

        /**
         * @member SuperMap.Pixel.prototype.y -{number}
         * @description y坐标，默认为0.0
         */
        this.y = y ? parseFloat(y) : 0.0;

        /**
         * @member SuperMap.Pixel.prototype.mode -{SuperMap.Pixel.Mode}
         * @description 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。<br>
         * 值有<br>
         * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
         * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.RightTop}
         * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.RightBottom}
         * * {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftBottom}
         *
         * 这四种 默认值为：{@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
         *
         * @default {@link SuperMap.Pixel.Mode|SuperMap.Pixel.Mode.LeftTop}
         */
        this.mode = mode;
        this.CLASS_NAME = "SuperMap.Pixel";
        /**
         * @member SuperMap.Pixel.Mode
         * @enum {string}
         * @readonly
         * @description 模式
         *
         * * SuperMap.Pixel.Mode.LeftTop 左上模式
         * * SuperMap.Pixel.Mode.RightTop 右上模式
         * * SuperMap.Pixel.Mode.RightBottom 右下模式
         * * SuperMap.Pixel.Mode.LeftBottom 左下模式
         */

        Pixel.Mode = {
            LeftTop: "lefttop",
            RightTop: "righttop",
            RightBottom: "rightbottom",
            LeftBottom: "leftbottom"
        };
    }

    /**
     * @function SuperMap.Pixel.prototype.toString
     * @description 返回此对象的字符串形式
     * @example
     *
     * var pixcel = new SuperMap.Pixel(100,50);
     * var str = pixcel.toString();
     *
     * @returns {string} 例如: "x=200.4,y=242.2"
     */
    toString() {
        return ("x=" + this.x + ",y=" + this.y);
    }

    /**
     * @function SuperMap.Pixel.prototype.clone
     * @description 克隆当前的 pixel 对象。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = pixcel.clone();
     * @returns {SuperMap.Pixel} 返回一个新的与当前 pixel 对象有相同x、y坐标的 pixel 对象。
     */
    clone() {
        return new Pixel(this.x, this.y, this.mode);
    }

    /**
     * @function SuperMap.Pixel.prototype.equals
     * @description 比较两 pixel 是否相等
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(100,50);
     * var isEquals = pixcel.equals(pixcel2);
     *
     * @param px - {SuperMap.Pixel} 用于比较相等的 pixel 对象。
     * @returns {Boolean} 如果传入的像素点和当前像素点相同返回true,如果不同或传入参数为NULL则返回false
     */
    equals(px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) ||
                (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    }

    /**
     * @function SuperMap.Pixel.prototype.distanceTo
     * @description 返回两个 pixel 的距离。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(110,30);
     * var distance = pixcel.distanceTo(pixcel2);
     *
     * @param px - {SuperMap.Pixel} 用于计算的一个 pixel
     * @returns {float} 作为参数传入的像素与当前像素点的距离。
     */
    distanceTo(px) {
        return Math.sqrt(
            Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2)
        );
    }

    /**
     * @function SuperMap.Pixel.prototype.add
     * @description 在原来像素坐标基础上，x值加上传入的x参数，y值加上传入的y参数。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * //pixcel2是新的对象
     * var pixcel2 = pixcel.add(20,30);
     *
     * @param x - {number} 传入的x值。
     * @param y - {number} 传入的y值。
     * @returns {SuperMap.Pixel} 返回一个新的pixel对象，该pixel是由当前的pixel与传
     *      入的x,y相加得到。
     */
    add(x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Pixel.add cannot receive null values');
        }
        return new Pixel(this.x + x, this.y + y);
    }

    /**
     * @function SuperMap.Pixel.prototype.offset
     * @description 通过传入的 {@link SuperMap.Pixel} 参数对原屏幕坐标进行偏移。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * var pixcel2 = new SuperMap.Pixel(130,20);
     * //pixcel3 是新的对象
     * var pixcel3 = pixcel.offset(pixcel2);
     *
     * @param px - {SuperMap.Pixel}  传入的 <SuperMap.Pixel> 对象。
     * @returns {SuperMap.Pixel} 返回一个新的pixel，该pixel是由当前的pixel对象的x，y
     *      值与传入的Pixel对象的x，y值相加得到。
     */
    offset(px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    }

    /**
     *
     * @function SuperMap.Pixel.prototype.destroy
     * @description 销毁此对象。
     * 销毁后此对象的所有属性为null，而不是初始值。
     * @example
     * var pixcel = new SuperMap.Pixel(100,50);
     * pixcel.destroy();
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.mode = null;
    }
}

SuperMap.Pixel = Pixel;

