/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Size} from './Size';
import {Pixel} from './Pixel';
import {LonLat} from './LonLat';
import {Util} from './Util';

/**
 * @class SuperMap.Bounds
 * @category BaseTypes Geometry
 * @classdesc 表示边界类实例。使用 bounds 之前需要设置 left，bottom，right，top 四个属性，这些属性的初始值为 null。
 * @param {number} [left] - 左边界，注意考虑宽度，理论上小于 right 值。
 * @param {number} [bottom] - 下边界。考虑高度，理论上小于 top 值。
 * @param {number} [right] - 右边界。
 * @param {number} [top] - 上边界。
 * @param {Array.<number>} [array] - [left, bottom, right, top]，如果同时传多个参数，则使用左下右上组成的数组。
 * @example
 * var bounds = new SuperMap.Bounds();
 * bounds.extend(new SuperMap.LonLat(4,5));
 * bounds.extend(new SuperMap.LonLat(5,6));
 * bounds.toBBOX(); // returns 4,5,5,6
 */
export class Bounds {


    constructor(left, bottom, right, top) {
        if (Util.isArray(left)) {
            top = left[3];
            right = left[2];
            bottom = left[1];
            left = left[0];
        }
        /**
         * @member {number} SuperMap.Bounds.prototype.left
         * @description 最小的水平坐标系。
         */
        this.left = left != null ? Util.toFloat(left) : this.left;

        /**
         * @member {number} SuperMap.Bounds.prototype.bottom
         * @description 最小的垂直坐标系。
         */
        this.bottom = bottom != null ? Util.toFloat(bottom) : this.bottom;

        /**
         * @member {number} SuperMap.Bounds.prototype.right
         * @description 最大的水平坐标系。
         */
        this.right = right != null ? Util.toFloat(right) : this.right;

        /**
         * @member {number} SuperMap.Bounds.prototype.top
         * @description 最大的垂直坐标系。
         */
        this.top = top != null ? Util.toFloat(top) : this.top;

        /**
         * @member {SuperMap.LonLat} SuperMap.Bounds.prototype.centerLonLat
         * @description bounds 的地图空间的中心点。用 getCenterLonLat() 获得。
         */
        this.centerLonLat = null;
        this.CLASS_NAME = "SuperMap.Bounds";
    }

    /**
     * @function SuperMap.Bounds.prototype.clone
     * @description 复制当前 bounds 对象。
     * @example
     * var bounds1 = new SuperMap.Bounds(-180,-90,180,90);
     * var bounds2 = bounds1.clone();
     * @returns {SuperMap.Bounds} 返回一个克隆的 bounds。
     */
    clone() {
        return new Bounds(this.left, this.bottom,
            this.right, this.top);
    }

    /**
     * @function SuperMap.Bounds.prototype.equals
     * @description 判断两个 bounds 对象是否相等。
     * @example
     * var bounds1 = new SuperMap.Bounds(-180,-90,180,90);
     * var bounds2 = new SuperMap.Bounds(-180,-90,180,90);
     * var isEquals = bounds1.equals(bounds2);
     * @param {SuperMap.Bounds} bounds - 需要进行计较的 bounds。
     * @returns {boolean} 如果 bounds 对象的边和传入的 bounds 一致则返回 true，不一致或传入的 bounds 参数为 NULL 则返回 false。
     */
    equals(bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left === bounds.left) &&
                (this.right === bounds.right) &&
                (this.top === bounds.top) &&
                (this.bottom === bounds.bottom));
        }
        return equals;
    }

    /**
     * @function SuperMap.Bounds.prototype.toString
     * @description 返回此对象的字符串形式。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,180,90);
     * var str = bounds.toString();
     * @returns {string} 边界对象的字符串表示形式（left,bottom,right,top），例如: "-180,-90,180,90"。
     */
    toString() {
        return [this.left, this.bottom, this.right, this.top].join(",");
    }

    /**
     * @function SuperMap.Bounds.prototype.toArray
     * @description 边界对象的数组表示形式。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * //array1 = [-180,-90,100,80];
     * var array1 = bounds.toArray();
     * //array1 = [-90,-180,80,100];
     * var array2 = bounds.toArray(true);
     * @param {boolean} [reverseAxisOrder=false] - 是否反转轴顺序。
     * 如果设为 true，则倒转顺序（bottom,left,top,right），否则按正常轴顺序（left,bottom,right,top）。
     * @returns {Array.<number>} left, bottom, right, top 数组。
     */
    toArray(reverseAxisOrder) {
        if (reverseAxisOrder === true) {
            return [this.bottom, this.left, this.top, this.right];
        } else {
            return [this.left, this.bottom, this.right, this.top];
        }
    }

    /**
     * @function SuperMap.Bounds.prototype.toBBOX
     * @description 取小数点后 decimal 位数字进行四舍五入再转换为 BBOX 字符串。
     * @example
     * var bounds = new SuperMap.Bounds(-1.1234567,-1.7654321,1.4444444,1.5555555);
     * //str1 = "-1.123457,-1.765432,1.444444,1.555556";
     * var str1 = bounds.toBBOX();
     * //str2 = "-1.1,-1.8,1.4,1.6";
     * var str2 = bounds.toBBOX(1);
     * //str2 = "-1.8,-1.1,1.6,1.4";
     * var str2 = bounds.toBBOX(1,true);
     * @param {integer} [decimal=6] - 边界方位坐标的有效数字个数。
     * @param {boolean} [reverseAxisOrder=false] - 是否是反转轴顺序。
     * 如果设为true，则倒转顺序（bottom,left,top,right）,否则按正常轴顺序（left,bottom,right,top）。
     * @returns {string} 边界对象的字符串表示形式，如："5,42,10,45"。
     */
    toBBOX(decimal, reverseAxisOrder) {
        if (decimal == null) {
            decimal = 6;
        }
        var mult = Math.pow(10, decimal);
        var xmin = Math.round(this.left * mult) / mult;
        var ymin = Math.round(this.bottom * mult) / mult;
        var xmax = Math.round(this.right * mult) / mult;
        var ymax = Math.round(this.top * mult) / mult;
        if (reverseAxisOrder === true) {
            return ymin + "," + xmin + "," + ymax + "," + xmax;
        } else {
            return xmin + "," + ymin + "," + xmax + "," + ymax;
        }
    }

    /**
     * @function SuperMap.Bounds.prototype.toGeometry
     * @description 基于当前边界范围创建一个新的多边形对象。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * //SuperMap.Geometry.Polygon对象
     * var geo = bounds.toGeometry();
     * @returns {SuperMap.Geometry.Polygon} 基于当前 bounds 坐标创建的新的多边形。
     */
    // toGeometry() {
    //     return new Polygon([
    //         new LinearRing([
    //             new Point(this.left, this.bottom),
    //             new Point(this.right, this.bottom),
    //             new Point(this.right, this.top),
    //             new Point(this.left, this.top)
    //         ])
    //     ]);
    // }

    /**
     * @function SuperMap.Bounds.prototype.getWidth
     * @description 获取 bounds 的宽度。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * //width = 280;
     * var width = bounds.getWidth();
     * @returns {float} 获取当前 bounds 的宽度（right 减去 left）。
     */
    getWidth() {
        return (this.right - this.left);
    }

    /**
     * @function SuperMap.Bounds.prototype.getHeight
     * @description 获取 bounds 的高度。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * //height = 170;
     * var height = bounds.getHeight();
     * @returns {float} 返回边界高度（top 减去 bottom）。
     */
    getHeight() {
        return (this.top - this.bottom);
    }

    /**
     * @function SuperMap.Bounds.prototype.getSize
     * @description 获取边框大小。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * var size = bounds.getSize();
     * @returns {SuperMap.Size} 返回边框大小。
     */
    getSize() {
        return new Size(this.getWidth(), this.getHeight());
    }

    /**
     * @function SuperMap.Bounds.prototype.getCenterPixel
     * @description 获取像素格式的范围中心点。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * var pixel = bounds.getCenterPixel();
     * @returns {SuperMap.Pixel} 返回像素格式的当前范围的中心点。
     */
    getCenterPixel() {
        return new Pixel((this.left + this.right) / 2,
            (this.bottom + this.top) / 2);
    }

    /**
     * @function SuperMap.Bounds.prototype.getCenterLonLat
     * @description 获取地理格式的范围中心点。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * var lonlat = bounds.getCenterLonLat();
     * @returns {SuperMap.LonLat} 返回当前地理范围的中心点。
     */
    getCenterLonLat() {
        if (!this.centerLonLat) {
            this.centerLonLat = new LonLat(
                (this.left + this.right) / 2, (this.bottom + this.top) / 2
            );
        }
        return this.centerLonLat;
    }

    /**
     * @function SuperMap.Bounds.prototype.scale
     * @description 按照比例扩大/缩小出一个新的 bounds。
     * @example
     * var bounds = new SuperMap.Bounds(-50,-50,40,40);
     * var bounds2 = bounds.scale(2);
     * @param {float} [ratio=1] - 需要扩大的比例。
     * @param {(SuperMap.Pixel|SuperMap.LonLat)} [origin] - 扩大时的基准点，默认为当前 bounds 的中心点。
     * @returns {SuperMap.Bounds} 返回通过 ratio、origin 计算得到的新的边界范围。
     */
    scale(ratio, origin) {
        ratio = ratio ? ratio : 1;
        if (origin == null) {
            origin = this.getCenterLonLat();
        }

        var origx, origy;

        // get origin coordinates
        if (origin.CLASS_NAME === "SuperMap.LonLat") {
            origx = origin.lon;
            origy = origin.lat;
        } else {
            origx = origin.x;
            origy = origin.y;
        }

        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;

        return new Bounds(left, bottom, right, top);
    }

    /**
     * @function SuperMap.Bounds.prototype.add
     * @description 在当前的 Bounds 上按照传入的坐标点进行平移，返回新的范围。
     * @example
     * var bounds1 = new SuperMap.Bounds(-50,-50,40,40);
     * //bounds2 是新的 bounds
     * var bounds2 = bounds.add(20,10);
     * @param {float} x - 传入坐标点的 x 坐标。
     * @param {float} y - 传入坐标点的 y 坐标。
     * @returns {SuperMap.Bounds} 返回一个新的 bounds，此 bounds 的坐标是由传入的 x，y 参数与当前 bounds 坐标计算所得。
     */
    add(x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Bounds.add cannot receive null values');
        }
        return new Bounds(this.left + x, this.bottom + y,
            this.right + x, this.top + y);
    }

    /**
     * @function SuperMap.Bounds.prototype.extend
     * @description 在当前 bounds 上扩展 bounds，支持 point，lanlat 和 bounds。扩展后的 bounds 的范围是两者的结合。
     * @example
     * var bounds1 = new SuperMap.Bounds(-50,-50,40,40);
     * //bounds 改变
     * bounds.extend(new SuperMap.LonLat(50,60));
     * @param {(SuperMap.Geometry.Point|SuperMap.LonLat|SuperMap.Bounds)} object - 可以是 point、lonlat 和 bounds。
     */
    extend(object) {
        var bounds = null;
        if (object) {
            // clear cached center location
            switch (object.CLASS_NAME) {
                case "SuperMap.LonLat":
                    bounds = new Bounds(object.lon, object.lat,
                        object.lon, object.lat);
                    break;
                case "SuperMap.Geometry.Point":
                    bounds = new Bounds(object.x, object.y,
                        object.x, object.y);
                    break;

                case "SuperMap.Bounds":
                    bounds = object;
                    break;
            }

            if (bounds) {
                this.centerLonLat = null;
                if ((this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left;
                }
                if ((this.bottom == null) || (bounds.bottom < this.bottom)) {
                    this.bottom = bounds.bottom;
                }
                if ((this.right == null) || (bounds.right > this.right)) {
                    this.right = bounds.right;
                }
                if ((this.top == null) || (bounds.top > this.top)) {
                    this.top = bounds.top;
                }
            }
        }
    }

    /**
     * @function SuperMap.Bounds.prototype.containsLonLat
     * @description 判断传入的坐标是否在范围内。
     * @example
     * var bounds1 = new SuperMap.Bounds(-50,-50,40,40);
     * //isContains1 = true
     * //这里的第二个参数可以直接为 boolean 类型，也就是inclusive
     * var isContains1 = bounds.containsLonLat(new SuperMap.LonLat(40,40),true);
     *
     * //(40,40)在范围内，同样(40+360,40)也在范围内
     * var bounds2 = new SuperMap.Bounds(-50,-50,40,40);
     * //isContains2 = true;
     * var isContains2 = bounds2.containsLonLat(
     *      new SuperMap.LonLat(400,40),
     *      {
     *           inclusive:true,
     *           //全球的范围
     *           worldBounds: new SuperMap.Bounds(-180,-90,180,90)
     *      }
     * );
     * @param {(SuperMap.LonLat|Object)} ll - <SuperMap.LonLat> 对象或者是一个包含 'lon' 与 'lat' 属性的对象。
     * @param {Object} options - 可选参数。
     * @param {boolean} [options.inclusive=true] - 是否包含边界。
     * @param {SuperMap.Bounds} [options.worldBounds] - 如果提供 worldBounds 参数, 如果 ll 参数提供的坐标超出了世界边界（worldBounds），
     *        但是通过日界线的转化可以被包含, 它将被认为是包含在该范围内的。
     * @returns {boolean} 传入坐标是否包含在范围内。
     */
    containsLonLat(ll, options) {
        if (typeof options === "boolean") {
            options = {inclusive: options};
        }
        options = options || {};
        var contains = this.contains(ll.lon, ll.lat, options.inclusive),
            worldBounds = options.worldBounds;
        //日界线以外的也有可能算包含，
        if (worldBounds && !contains) {
            var worldWidth = worldBounds.getWidth();
            var worldCenterX = (worldBounds.left + worldBounds.right) / 2;
            //这一步很关键
            var worldsAway = Math.round((ll.lon - worldCenterX) / worldWidth);
            contains = this.containsLonLat({
                lon: ll.lon - worldsAway * worldWidth,
                lat: ll.lat
            }, {inclusive: options.inclusive});
        }
        return contains;
    }

    /**
     * @function SuperMap.Bounds.prototype.containsPixel
     * @description 判断传入的像素是否在范围内。直接匹配大小，不涉及像素和地理转换。
     * @example
     * var bounds = new SuperMap.Bounds(-50,-50,40,40);
     * //isContains = true
     * var isContains = bounds.containsPixel(new SuperMap.Pixel(40,40),true);
     * @param {SuperMap.Pixel} px - 提供的像素参数。
     * @param {boolean} [inclusive=true] - 是否包含边界。
     * @returns {boolean} 传入的 pixel 在当前边界范围之内。
     */
    containsPixel(px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    }

    /**
     * @function SuperMap.Bounds.prototype.contains
     * @description 判断传入的 x，y 坐标值是否在范围内。
     * @example
     * var bounds = new SuperMap.Bounds(-50,-50,40,40);
     * //isContains = true
     * var isContains = bounds.contains(40,40,true);
     * @param {float} x - 传入的 x 坐标值。
     * @param {float} y - 传入的 y 坐标值。
     * @param {boolean} [inclusive=true] - 是否包含边界。
     * @returns {boolean} 传入的 x，y 坐标是否在当前范围内。
     */
    contains(x, y, inclusive) {
        //set default
        if (inclusive == null) {
            inclusive = true;
        }

        if (x == null || y == null) {
            return false;
        }

        //x = Util.toFloat(x);
        //y = Util.toFloat(y);

        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) &&
                (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) &&
                (y > this.bottom) && (y < this.top));
        }
        return contains;
    }

    /**
     * @function SuperMap.Bounds.prototype.intersectsBounds
     * @description 判断目标边界范围是否与当前边界范围相交。如果两个边界范围中的任意
     *              边缘相交或者一个边界包含了另外一个就认为这两个边界相交。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * var isIntersects = bounds.intersectsBounds(
     *      new SuperMap.Bounds(-170,-90,120,80)
     *  );
     * @param {SuperMap.Bounds} bounds - 目标边界。
     * @param {Object} options - 参数。
     * @param {boolean} [options.inclusive=true] - 边缘重合也看成相交。如果是false，
     *                               两个边界范围没有重叠部分仅仅是在边缘相接（重合），
     *                               这种情况被认为没有相交。
     * @param {SuperMap.Bounds} [options.worldBounds] - 提供了 worldBounds 参数, 如果他们相交时
     *                               是在全球范围内, 两个边界将被视为相交。这仅适用于交叉或完全不在世界范围的边界。
     * @returns {boolean} 传入的 bounds 对象与当前 bounds 相交。
     */
    intersectsBounds(bounds, options) {
        if (typeof options === "boolean") {
            options = {inclusive: options};
        }
        options = options || {};
        if (options.worldBounds) {
            var self = this.wrapDateLine(options.worldBounds);
            bounds = bounds.wrapDateLine(options.worldBounds);
        } else {
            self = this;
        }
        if (options.inclusive == null) {
            options.inclusive = true;
        }
        var intersects = false;
        var mightTouch = (
            self.left === bounds.right ||
            self.right === bounds.left ||
            self.top === bounds.bottom ||
            self.bottom === bounds.top
        );

        // if the two bounds only touch at an edge, and inclusive is false,
        // then the bounds don't *really* intersect.
        if (options.inclusive || !mightTouch) {
            // otherwise, if one of the boundaries even partially contains another,
            // inclusive of the edges, then they do intersect.
            var inBottom = (
                ((bounds.bottom >= self.bottom) && (bounds.bottom <= self.top)) ||
                ((self.bottom >= bounds.bottom) && (self.bottom <= bounds.top))
            );
            var inTop = (
                ((bounds.top >= self.bottom) && (bounds.top <= self.top)) ||
                ((self.top > bounds.bottom) && (self.top < bounds.top))
            );
            var inLeft = (
                ((bounds.left >= self.left) && (bounds.left <= self.right)) ||
                ((self.left >= bounds.left) && (self.left <= bounds.right))
            );
            var inRight = (
                ((bounds.right >= self.left) && (bounds.right <= self.right)) ||
                ((self.right >= bounds.left) && (self.right <= bounds.right))
            );
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        // document me
        if (options.worldBounds && !intersects) {
            var world = options.worldBounds;
            var width = world.getWidth();
            var selfCrosses = !world.containsBounds(self);
            var boundsCrosses = !world.containsBounds(bounds);
            if (selfCrosses && !boundsCrosses) {
                bounds = bounds.add(-width, 0);
                intersects = self.intersectsBounds(bounds, {inclusive: options.inclusive});
            } else if (boundsCrosses && !selfCrosses) {
                self = self.add(-width, 0);
                intersects = bounds.intersectsBounds(self, {inclusive: options.inclusive});
            }
        }
        return intersects;
    }

    /**
     * @function SuperMap.Bounds.prototype.containsBounds
     * @description 判断目标边界是否被当前边界包含在内。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * var isContains = bounds.containsBounds(
     *      new SuperMap.Bounds(-170,-90,100,80),true,true
     *  );
     * @param {SuperMap.Bounds} bounds - 目标边界。
     * @param {boolean} [partial=false] - 目标边界的任意部分都包含在当前边界中则被认为是包含关系。
     * 如果设为 false，整个目标边界全部被包含在当前边界范围内。
     * @param {boolean} [inclusive=true] - 边缘共享被视为包含。
     * @returns {boolean} 传入的边界被当前边界包含。
     */
    containsBounds(bounds, partial, inclusive) {
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }
        var bottomLeft = this.contains(bounds.left, bounds.bottom, inclusive);
        var bottomRight = this.contains(bounds.right, bounds.bottom, inclusive);
        var topLeft = this.contains(bounds.left, bounds.top, inclusive);
        var topRight = this.contains(bounds.right, bounds.top, inclusive);

        return (partial) ? (bottomLeft || bottomRight || topLeft || topRight)
            : (bottomLeft && bottomRight && topLeft && topRight);
    }

    /**
     * @function SuperMap.Bounds.prototype.determineQuadrant
     * @description 判断传入坐标是否在 bounds 范围内的象限。以 bounds 中心点为坐标原点。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * //str = "tr";
     * var str = bounds.determineQuadrant(
     *      new SuperMap.LonLat(20,20)
     *  );
     * @param {SuperMap.LonLat} lonlat - 传入的坐标对象。
     * @returns {string} 传入坐标所在的象限（"br" "tr" "tl" "bl" 分别对应"右下"，"右上"，"左上" "左下"）。
     */
    determineQuadrant(lonlat) {

        var quadrant = "";
        var center = this.getCenterLonLat();

        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";

        return quadrant;
    }

    /**
     * @function SuperMap.Bounds.prototype.wrapDateLine
     * @description 将当前 bounds 移动到最大边界范围内部（所谓的内部是相交或者内部）。
     * @example
     * var bounds = new SuperMap.Bounds(380,-40,400,-20);
     * var maxExtent = new SuperMap.Bounds(-180,-90,100,80);
     * //新的bounds
     * var newBounds = bounds.wrapDateLine(maxExtent);
     * @param {SuperMap.Bounds} maxExtent - 最大的边界范围（一般是全球范围）。
     * @param {Object} options - 可选选项参数。 
     * @param {float} [options.leftTolerance=0] - left 允许的误差。 
     * @param {float} [options.rightTolerance=0] - right 允许的误差。
     * @returns {SuperMap.Bounds} 克隆当前边界。如果当前边界完全在最大范围之外此函数则返回一个不同值的边界，
     *                            若落在最大边界的左边，则给当前的bounds值加上最大范围的宽度，即向右移动，
     *                            若落在右边，则向左移动，即给当前的bounds值加上负的最大范围的宽度。
     */
    wrapDateLine(maxExtent, options) {
        options = options || {};

        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;

        var newBounds = this.clone();

        if (maxExtent) {
            var width = maxExtent.getWidth();
            //如果 newBounds 在 maxExtent 的左边，那么一直向右移动，直到相交或者包含为止，每次移动width
            //shift right?
            while (newBounds.left < maxExtent.left &&
            newBounds.right - rightTolerance <= maxExtent.left) {
                newBounds = newBounds.add(width, 0);
            }
            //如果 newBounds 在 maxExtent 的右边，那么一直向左移动，直到相交或者包含为止，每次移动width
            //shift left?
            while (newBounds.left + leftTolerance >= maxExtent.right &&
            newBounds.right > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
            //如果和右边相交，左边又在内部，那么再次向左边移动一次
            // crosses right only? force left
            var newLeft = newBounds.left + leftTolerance;
            if (newLeft < maxExtent.right && newLeft > maxExtent.left &&
                newBounds.right - rightTolerance > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
        }

        return newBounds;
    }

    /**
     * @function SuperMap.Bounds.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * var obj = bounds.toServerJSONObject();
     * @returns {Object} 返回 JSON 格式的 Object 对象。
     */
    toServerJSONObject() {
        var jsonObject = {
            rightTop: {x: this.right, y: this.top},
            leftBottom: {x: this.left, y: this.bottom},
            left: this.left,
            right: this.right,
            top: this.top,
            bottom: this.bottom
        }
        return jsonObject;
    }

    /**
     *
     * @function SuperMap.Bounds.prototype.destroy
     * @description 销毁此对象。
     * 销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var bounds = new SuperMap.Bounds(-180,-90,100,80);
     * bounds.destroy();
     */
    destroy() {
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.centerLonLat = null;
    }

    /**
     * @function SuperMap.Bounds.fromString
     * @description 通过字符串参数创建新的 bounds 的构造函数。
     * @example
     * var bounds = SuperMap.Bounds.fromString("-180,-90,100,80");
     * @param {string} str - 边界字符串，用逗号隔开（e.g. <i>"5,42,10,45"</i>）。
     * @param {boolean} [reverseAxisOrder=false] - 是否反转轴顺序。
     * 如果设为true，则倒转顺序（bottom,left,top,right），否则按正常轴顺序（left,bottom,right,top）。
     * @returns {SuperMap.Bounds} 返回给定的字符串创建的新的边界对象。
     */
    static fromString(str, reverseAxisOrder) {
        var bounds = str.split(",");
        return Bounds.fromArray(bounds, reverseAxisOrder);
    }

    /**
     * @function SuperMap.Bounds.fromArray
     * @description 通过边界框数组创建 Bounds。
     * @example
     * var bounds = SuperMap.Bounds.fromArray([-180,-90,100,80]);
     * @param {Array.<float>} bbox - 边界值数组。（e.g. <i>[5,42,10,45]</i>）。
     * @param {boolean} [reverseAxisOrder=false] - 是否是反转轴顺序。如果设为true，则倒转顺序（bottom,left,top,right），否则按正常轴顺序（left,bottom,right,top）。
     * @returns {SuperMap.Bounds} 返回根据传入的数组创建的新的边界对象。
     */
    static fromArray(bbox, reverseAxisOrder) {
        return reverseAxisOrder === true ?
            new Bounds(bbox[1], bbox[0], bbox[3], bbox[2]) :
            new Bounds(bbox[0], bbox[1], bbox[2], bbox[3]);
    }

    /**
     * @function SuperMap.Bounds.fromSize
     * @description 通过传入的边界大小来创建新的边界。
     * @example
     * var bounds = SuperMap.Bounds.fromSize(new SuperMap.Size(20,10));
     * @param {SuperMap.Size} size - 传入的边界大小。
     * @returns {SuperMap.Bounds} 返回根据传入的边界大小的创建新的边界。
     */
    static fromSize(size) {
        return new Bounds(0,
            size.h,
            size.w,
            0);
    }

    /**
     * @function SuperMap.Bounds.oppositeQuadrant
     * @description 反转象限。"t"和"b" 交换，"r"和"l"交换, 如："tl"变为"br"。
     * @param {string} quadrant - 代表象限的字符串，如："tl"。
     * @returns {string} 反转后的象限。
     */
    static oppositeQuadrant(quadrant) {
        var opp = "";

        opp += (quadrant.charAt(0) === 't') ? 'b' : 't';
        opp += (quadrant.charAt(1) === 'l') ? 'r' : 'l';

        return opp;
    }

}

SuperMap.Bounds = Bounds;
