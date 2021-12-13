/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {UGCLayer} from './UGCLayer';

/**
 * @class OverlapDisplayedOptions
 * @deprecatedclass SuperMap.OverlapDisplayedOptions
 * @category iServer Map Layer
 * @classdesc 地图压盖过滤显示选项。
 * @description 在文本或专题图元素显示较密集的区域，文本之间或专题元素之间会发生相互压盖的现象，
 * 该类可以分别控制各种类型的对象的压盖显示情况，进而很好地处理地图中各种类型对象的压盖显示问题。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.allowPointOverlap=true] - 点和点压盖时是否显示压盖的点对象。
 * @param {boolean} [options.allowPointWithTextDisplay=true] - 标签和相应普通图层上的点是否一起过滤显示,如果过滤显示，
 *                                                             只以图层集合中对应数据集的索引最小的图层的点风格来绘制点。
 * @param {boolean} [options.allowTextOverlap=false] - 文本压盖时是否显示压盖的文本对象。
 * @param {boolean} [options.allowTextAndPointOverlap=true] - 文本和点压盖时是否显示压盖的文本或点对象（此属性不处理文本之间的压盖和点之间的压盖）。
 * @param {boolean} [options.allowThemeGraduatedSymbolOverlap=false] - 等级符号元素压盖时是否显示压盖的等级符号元素。
 * @param {boolean} [options.allowThemeGraphOverlap=false] - 统计专题图元素压盖时是否显示压盖的统计专题图元素。
 * @param {number} [options.horizontalOverlappedSpaceSize=0] - 两个对象之间的横向压盖间距，单位为 0.1 毫米，跟 verticalOverlappedSpaceSize 结合使用，
 *                                                             当两个对象的横向间距小于该值，且纵向间距小于 verticalOverlappedSpaceSize 时认为压盖。
 * @param {number} [options.verticalOverlappedSpaceSize=0] - 两个对象之间的纵向压盖间距，单位为 0.1 毫米，跟 horizontalOverlappedSpaceSize 结合使用，
 *                                                           当两个对象的纵向间距小于该值，且横向间距小于 horizontalOverlappedSpaceSize 时认为压盖。
 * @usage
 */
export class OverlapDisplayedOptions {

    constructor(options) {
        options = options || {};
        /**
         * @member {boolean} [OverlapDisplayedOptions.prototype.allowPointOverlap=true]
         * @description 点和点压盖时是否显示压盖的点对象。
         */
        this.allowPointOverlap = true;

        /**
         * @member {boolean} [OverlapDisplayedOptions.prototype.allowPointWithTextDisplay=true]
         * @description 标签和相应普通图层上的点是否一起过滤显示，如果过滤显示，
         * 只以图层集合中对应数据集的索引最小的图层的点风格来绘制点。
         */
        this.allowPointWithTextDisplay = true;

        /**
         * @member {boolean} [OverlapDisplayedOptions.prototype.allowTextOverlap=false]
         * @description 文本压盖时是否显示压盖的文本对象。
         */
        this.allowTextOverlap = false;

        /**
         * @member {boolean} [OverlapDisplayedOptions.prototype.allowTextAndPointOverlap=true]
         * @description  文本和点压盖时是否显示压盖的文本或点对象（此属性不处理文本之间的压盖和点之间的压盖）。
         */
        this.allowTextAndPointOverlap = true;

        /**
         * @member {boolean} [OverlapDisplayedOptions.prototype.allowThemeGraduatedSymbolOverlap=false]
         * @description 等级符号元素压盖时是否显示压盖的等级符号元素。
         */
        this.allowThemeGraduatedSymbolOverlap = false;

        /**
         * @member {boolean} [OverlapDisplayedOptions.prototype.allowThemeGraphOverlap=false]
         * @description 统计专题图元素压盖时是否显示压盖的统计专题图元素。
         */
        this.allowThemeGraphOverlap = false;

        /**
         * @member {number} [OverlapDisplayedOptions.prototype.horizontalOverlappedSpaceSize=0]
         * @description 两个对象之间的横向压盖间距，单位为0.1毫米，跟 verticalOverlappedSpaceSize 结合使用，
         * 当两个对象的横向间距小于该值，且纵向间距小于 verticalOverlappedSpaceSize 时认为压盖。
         */
        this.horizontalOverlappedSpaceSize = 0;

        /**
         * @member {number} [OverlapDisplayedOptions.prototype.verticalOverlappedSpaceSize=0]
         * @description 两个对象之间的纵向压盖间距，单位为0.1毫米，跟 horizontalOverlappedSpaceSize 结合使用，
         * 当两个对象的纵向间距小于该值，且横向间距小于 horizontalOverlappedSpaceSize 时认为压盖。
         */
        this.verticalOverlappedSpaceSize = 0;

        Util.extend(this, options);
        this.ugcLayer = new UGCLayer(options);

        this.CLASS_NAME = "SuperMap.OverlapDisplayedOptions";
    }

    /**
     * @function OverlapDisplayedOptions.prototype.destroy
     * @description 释放资源，将资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }


    /**
     * @function OverlapDisplayedOptions.prototype.fromJson
     * @description 将服务端 JSON 对象转换成当前客户端对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        this.ugcLayer.fromJson.apply(this, [jsonObject]);
    }


    /**
     * @function OverlapDisplayedOptions.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = this.ugcLayer.toServerJSONObject.apply(this, arguments);
        return jsonObject;
    }


    /**
     * @function OverlapDisplayedOptions.prototype.toString
     * @description 转换成对应的 tileLayer 请求瓦片时 overlapDisplayedOptions 参数。
     * @returns {string} 对应的 tileLayer 请求瓦片时 overlapDisplayedOptions 参数。
     */

    toString() {
        var jsonObject = this.ugcLayer.toServerJSONObject.apply(this, arguments);
        var str = "{";
        for (var attr in jsonObject) {
            if (jsonObject.hasOwnProperty(attr)) {
                str += "'" + attr + "':" + jsonObject[attr] + ",";
            }
        }
        str = str.substr(0, str.length - 1);
        str += "}";
        return str;
    }

}
