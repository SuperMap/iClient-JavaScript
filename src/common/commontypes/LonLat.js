/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from './Util';

/**
 * @class SuperMap.LonLat
 * @category BaseTypes Geometry
 * @classdesc  这个类用来表示经度和纬度对。
 * @param {number} [lon=0.0] - 地图单位上的 X 轴坐标，如果地图是地理投影，则此值是经度，否则，此值是地图地理位置的 x 坐标。
 * @param {number} [lat=0.0] - 地图单位上的 Y 轴坐标，如果地图是地理投影，则此值是纬度，否则，此值是地图地理位置的 y 坐标。
 * @param {Array.<float>} [location] - 如果要同时设置，则使用传入横纵坐标组成的数组。
 * @example
 * var lonLat = new SuperMap.LonLat(30,45);
 */
export class LonLat {


    constructor(lon, lat) {
        if (Util.isArray(lon)) {
            lat = lon[1];
            lon = lon[0];
        }
        /**
         * @member {float} [SuperMap.LonLat.prototype.lon=0.0]
         * @description 地图的单位的 X 轴（横轴）坐标。
         */
        this.lon = lon ? Util.toFloat(lon) : 0.0;

        /**
         * @member {float} [SuperMap.LonLat.prototype.lat=0.0]
         * @description 地图的单位的 Y 轴（纵轴）坐标。
         */
        this.lat = lat ? Util.toFloat(lat) : 0.0;
        this.CLASS_NAME = "SuperMap.LonLat";
    }

    /**
     * @function SuperMap.LonLat.prototype.toString
     * @description 返回此对象的字符串形式
     * @example
     * var lonLat = new SuperMap.LonLat(100,50);
     * var str = lonLat.toString();
     * @returns {string} 例如: "lon=100,lat=50"
     */
    toString() {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    }

    /**
     * @function SuperMap.LonLat.prototype.toShortString
     * @description 将经度纬度转换成简单字符串。
     * @example
     * var lonLat = new SuperMap.LonLat(100,50);
     * var str = lonLat.toShortString();
     * @returns {string} 返回处理后的经纬度字符串。例如："100,50"
     */
    toShortString() {
        return (this.lon + "," + this.lat);
    }

    /**
     * @function SuperMap.LonLat.prototype.clone
     * @description 复制坐标对象，并返回复制后的新对象。
     * @example
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * var lonLat2 = lonLat1.clone();
     * @returns {SuperMap.LonLat}  返回相同坐标值的新的坐标对象。
     */
    clone() {
        return new LonLat(this.lon, this.lat);
    }

    /**
     * @function SuperMap.LonLat.prototype.add
     * @description 在已有坐标对象的经纬度基础上加上新的坐标经纬度，并返回新的坐标对象。
     * @example
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * //lonLat2 是新的对象
     * var lonLat2 = lonLat1.add(100,50);
     * @param {float} lon - 传入的经度参数。
     * @param {float} lat - 传入的纬度参数。
     * @returns {SuperMap.LonLat} 返回一个新的 LonLat 对象，此对象的经纬度是由传入的经纬度与当前的经纬度相加所得。
     */
    add(lon, lat) {
        if ((lon == null) || (lat == null)) {
            throw new TypeError('LonLat.add cannot receive null values');
        }
        return new LonLat(this.lon + Util.toFloat(lon),
            this.lat + Util.toFloat(lat));
    }

    /**
     * @function SuperMap.LonLat.prototype.equals
     * @description 判断两个坐标对象是否相等。
     * @example
     * var lonLat1 = new SuperMap.LonLat(100,50);
     * var lonLat2 = new SuperMap.LonLat(100,50);
     * var isEquals = lonLat1.equals(lonLat2);
     * @param {SuperMap.LonLat} ll - 需要进行比较的坐标对象。
     * @returns {boolean} 如果LonLat对象的经纬度和传入的经纬度一致则返回true,不一
     *      致或传入的ll参数为NULL则返回false。
     */
    equals(ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon === ll.lon && this.lat === ll.lat) ||
                (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    }

    /**
     * @function SuperMap.LonLat.prototype.wrapDateLine
     * @description 通过传入的范围对象对坐标对象转换到该范围内。
     * 如果经度小于给定范围最小精度，则在原经度基础上加上范围宽度，直到精度在范围内为止，如果经度大于给定范围则在原经度基础上减去范围宽度。
     * 即指将不在经度范围内的坐标转换到范围以内（只会转换 lon，不会转换 lat，主要用于转移到日界线以内）。
     * @example
     * var lonLat1 = new SuperMap.LonLat(420,50);
     * var lonLat2 = lonLat1.wrapDateLine(
     *      new SuperMap.Bounds(-180,-90,180,90)
     *  );
     * @param {SuperMap.Bounds} maxExtent - 最大边界的范围。
     * @returns {SuperMap.LonLat} 将坐标转换到范围对象以内，并返回新的坐标。
     */
    wrapDateLine(maxExtent) {

        var newLonLat = this.clone();

        if (maxExtent) {
            //shift right?
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon += maxExtent.getWidth();
            }

            //shift left?
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }
        }

        return newLonLat;
    }

    /**
     *
     * @function SuperMap.LonLat.prototype.destroy
     * @description 销毁此对象。
     * 销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var lonLat = new SuperMap.LonLat(100,50);
     * lonLat.destroy();
     */
    destroy() {
        this.lon = null;
        this.lat = null;
    }

    /**
     * @function SuperMap.LonLat.fromString
     * @description 通过字符串生成一个 {@link SuperMap.LonLat} 对象。
     * @example
     * var str = "100,50";
     * var lonLat = SuperMap.LonLat.fromString(str);
     * @param {string} str - 字符串的格式：Lon+","+Lat。如："100,50"。
     * @returns {SuperMap.LonLat} 返回一个 {@link SuperMap.LonLat} 对象。
     */
    static fromString(str) {
        var pair = str.split(",");
        return new LonLat(pair[0], pair[1]);
    }

    /**
     * @function SuperMap.LonLat.fromArray
     * @description 通过数组生成一个 <SuperMap.LonLat> 对象。
     * @param {Array.<float>} arr - 数组的格式，长度只能为2,：[Lon,Lat]。如：[5,-42]。
     * @returns {SuperMap.LonLat} 返回一个 <SuperMap.LonLat> 对象。
     */
    static fromArray(arr) {
        var gotArr = Util.isArray(arr),
            lon = gotArr && arr[0],
            lat = gotArr && arr[1];
        return new LonLat(lon, lat);
    }


}

