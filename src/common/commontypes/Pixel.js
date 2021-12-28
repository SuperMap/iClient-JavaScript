/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class Pixel
 * @deprecatedclass SuperMap.Pixel
 * @category BaseTypes Geometry
 * @classdesc 用 x,y 坐标描绘屏幕坐标（像素点）。
 * @param {number} [x=0.0] - x 坐标。
 * @param {number} [y=0.0] - y 坐标。
 * @param {Pixel.Mode} [mode=Pixel.Mode.LeftTop] - 坐标模式。
 *
 * @example
 * //单独创建一个对象
 * var pixcel = new Pixel(100,50);
 *
 * //依据 size 创建
 *  var size = new Size(21,25);
 *  var offset = new Pixel(-(size.w/2), -size.h);
 * @usage
 */
export class Pixel {
  constructor(x, y, mode) {
    /**
     * @member {number} [Pixel.prototype.x=0.0]
     * @description x 坐标。
     */
    this.x = x ? parseFloat(x) : 0.0;

    /**
     * @member {number} [Pixel.prototype.y=0.0]
     * @description y 坐标。
     */
    this.y = y ? parseFloat(y) : 0.0;

    /**
     * @member {Pixel.Mode} [Pixel.prototype.mode=Pixel.Mode.LeftTop]
     * @description 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。
     */
    this.mode = mode;
    this.CLASS_NAME = 'SuperMap.Pixel';
  }

  /**
   * @function Pixel.prototype.toString
   * @description 返回此对象的字符串形式。
   * @example
   *
   * var pixcel = new Pixel(100,50);
   * var str = pixcel.toString();
   *
   * @returns {string} 例如: "x=200.4,y=242.2"
   */
  toString() {
    return 'x=' + this.x + ',y=' + this.y;
  }

  /**
   * @function Pixel.prototype.clone
   * @description 克隆当前的 pixel 对象。
   * @example
   * var pixcel = new Pixel(100,50);
   * var pixcel2 = pixcel.clone();
   * @returns {Pixel} 新的与当前 pixel 对象有相同 x、y 坐标的 pixel 对象。
   */
  clone() {
    return new Pixel(this.x, this.y, this.mode);
  }

  /**
   * @function Pixel.prototype.equals
   * @description 比较两 pixel 是否相等。
   * @example
   * var pixcel = new Pixel(100,50);
   * var pixcel2 = new Pixel(100,50);
   * var isEquals = pixcel.equals(pixcel2);
   *
   * @param {Pixel} px - 用于比较相等的 pixel 对象。
   * @returns {boolean} 如果传入的像素点和当前像素点相同返回 true，如果不同或传入参数为 NULL 则返回 false。
   */
  equals(px) {
    var equals = false;
    if (px != null) {
      equals = (this.x == px.x && this.y == px.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y));
    }
    return equals;
  }

  /**
   * @function Pixel.prototype.distanceTo
   * @description 返回两个 pixel 的距离。
   * @example
   * var pixcel = new Pixel(100,50);
   * var pixcel2 = new Pixel(110,30);
   * var distance = pixcel.distanceTo(pixcel2);
   *
   * @param {Pixel} px - 需要计算的 pixel。
   * @returns {float} 作为参数传入的像素与当前像素点的距离。
   */
  distanceTo(px) {
    return Math.sqrt(Math.pow(this.x - px.x, 2) + Math.pow(this.y - px.y, 2));
  }

  /**
   * @function Pixel.prototype.add
   * @description 在原来像素坐标基础上，x 值加上传入的 x 参数，y 值加上传入的 y 参数。
   * @example
   * var pixcel = new Pixel(100,50);
   * //pixcel2是新的对象
   * var pixcel2 = pixcel.add(20,30);
   *
   * @param {number} x - 传入的 x 值。
   * @param {number} y - 传入的 y 值。
   * @returns {Pixel} 新的 pixel 对象，该 pixel 是由当前的 pixel 与传入的 x，y 相加得到。
   */
  add(x, y) {
    if (x == null || y == null) {
      throw new TypeError('Pixel.add cannot receive null values');
    }
    return new Pixel(this.x + x, this.y + y);
  }

  /**
   * @function Pixel.prototype.offset
   * @description 通过传入的 {@link Pixel} 参数对原屏幕坐标进行偏移。
   * @example
   * var pixcel = new Pixel(100,50);
   * var pixcel2 = new Pixel(130,20);
   * //pixcel3 是新的对象
   * var pixcel3 = pixcel.offset(pixcel2);
   *
   * @param {Pixel} px - 传入的 {@link Pixel} 对象。
   * @returns {Pixel} 新的 pixel，该 pixel 是由当前的 pixel 对象的 x，y 值与传入的 Pixel 对象的 x，y 值相加得到。
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
   * @function Pixel.prototype.destroy
   * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
   * @example
   * var pixcel = new Pixel(100,50);
   * pixcel.destroy();
   */
  destroy() {
    this.x = null;
    this.y = null;
    this.mode = null;
  }
}
/**
 * @enum Mode
 * @memberOf Pixel
 * @readonly
 * @description 模式。
 * @type {string}
 */
Pixel.Mode = {
  /** 左上模式。*/
  LeftTop: 'lefttop',
  /** 右上模式。 */
  RightTop: 'righttop',
  /** 右下模式。 */
  RightBottom: 'rightbottom',
  /** 左下模式。 */
  LeftBottom: 'leftbottom'
};
