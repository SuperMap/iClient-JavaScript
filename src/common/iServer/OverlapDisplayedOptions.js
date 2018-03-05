import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {UGCLayer} from './UGCLayer';

/**
 * @class  SuperMap.OverlapDisplayedOptions
 * @category  iServer Map Layer
 * @classdesc 地图压盖过滤显示选项。
 * @description 在文本或专题图元素显示较密集的区域，文本之间或专题元素之间会发生相互压盖的现象，
 * 该类可以分别控制各种类型的对象的压盖显示情况，进而很好地处理地图中各种类型对象的压盖显示问题。
 * @param  options - {Object} 过滤显示参数。<br>
 *          allowPointOverlap - {boolean} 点和点压盖时是否显示压盖的点对象。默认值为true。<br>
 *          allowPointWithTextDisplay - {boolean} 标签和相应普通图层上的点是否一起过滤显示,如果过滤显示，
 *                  只以图层集合中对应数据集的索引最小的图层的点风格来绘制点。默认值为true。
 *          allowTextOverlap - {boolean} 文本压盖时是否显示压盖的文本对象。默认值为false。<br>
 *          allowTextAndPointOverlap - {boolean} 文本和点压盖时是否显示压盖的文本或点对象(此属性不处理文本之间的压盖和点之间的压盖)。默认值为true。<br>
 *          allowThemeGraduatedSymbolOverlap - {boolean} 等级符号元素压盖时是否显示压盖的等级符号元素。默认值为false。<br>
 *          allowThemeGraphOverlap - {number} 统计专题图元素压盖时是否显示压盖的统计专题图元素。默认值为false。<br>
 *          horizontalOverlappedSpaceSize - {number} 两个对象之间的横向压盖间距，单位为0.1毫米，跟verticalOverlappedSpaceSize 结合使用，
 *                  当两个对象的横向间距小于该值，且纵向间距小于 verticalOverlappedSpaceSize 时认为压盖。默认值为0。<br>
 *          verticalOverlappedSpaceSize - {number} 两个对象之间的纵向压盖间距，单位为0.1毫米，跟horizontalOverlappedSpaceSize 结合使用，
 *                  当两个对象的纵向间距小于该值，且横向间距小于 horizontalOverlappedSpaceSize 时认为压盖。默认值为0。
 */
export class OverlapDisplayedOptions {

    constructor(options) {
        options = options || {};
        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.allowPointOverlap -{boolean}
         * @description 点和点压盖时是否显示压盖的点对象。默认值为true。
         */
        this.allowPointOverlap = true;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.allowPointWithTextDisplay -{boolean}
         * @description 标签和相应普通图层上的点是否一起过滤显示,如果过滤显示，
         * 只以图层集合中对应数据集的索引最小的图层的点风格来绘制点。默认值为true。
         */
        this.allowPointWithTextDisplay = true;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.allowTextOverlap -{boolean}
         * @description 文本压盖时是否显示压盖的文本对象。默认值为false。
         */
        this.allowTextOverlap = false;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.allowTextAndPointOverlap -{boolean}
         * @description  文本和点压盖时是否显示压盖的文本或点对象(此属性不处理文本之间的压盖和点之间的压盖)。默认值为true。
         */
        this.allowTextAndPointOverlap = true;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.allowThemeGraduatedSymbolOverlap -{boolean}
         * @description 等级符号元素压盖时是否显示压盖的等级符号元素。默认值为false。
         */
        this.allowThemeGraduatedSymbolOverlap = false;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.allowThemeGraphOverlap -{boolean}
         * @description 统计专题图元素压盖时是否显示压盖的统计专题图元素。默认值为false。
         */
        this.allowThemeGraphOverlap = false;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.horizontalOverlappedSpaceSize -{number}
         * @description 两个对象之间的横向压盖间距，单位为0.1毫米，跟 verticalOverlappedSpaceSize 结合使用，
         * 当两个对象的横向间距小于该值，且纵向间距小于 verticalOverlappedSpaceSize 时认为压盖。默认值为0。
         */
        this.horizontalOverlappedSpaceSize = 0;

        /**
         * @member SuperMap.OverlapDisplayedOptions.prototype.verticalOverlappedSpaceSize -{number}
         * @description 两个对象之间的纵向压盖间距，单位为0.1毫米，跟 horizontalOverlappedSpaceSize 结合使用，
         * 当两个对象的纵向间距小于该值，且横向间距小于 horizontalOverlappedSpaceSize 时认为压盖。默认值为0。
         */
        this.verticalOverlappedSpaceSize = 0;

        Util.extend(this, options);
        this.ugcLayer = new UGCLayer(options);

        this.CLASS_NAME = "SuperMap.OverlapDisplayedOptions";
    }

    /**
     * @function SuperMap.OverlapDisplayedOptions.prototype.destroy
     * @description 释放资源，将资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }


    /**
     * @function SuperMap.OverlapDisplayedOptions.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param jsonObject -{Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        this.ugcLayer.fromJson.apply(this, [jsonObject]);
    }


    /**
     * @function SuperMap.OverlapDisplayedOptions.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return {Object} 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var jsonObject = this.ugcLayer.toServerJSONObject.apply(this, arguments);
        return jsonObject;
    }


    /**
     * @function SuperMap.OverlapDisplayedOptions.prototype.toString
     * @description 转换成对应的 tileLayer请求瓦片时overlapDisplayedOptions参数。
     * @return {string} 对应的 tileLayer请求瓦片时overlapDisplayedOptions参数
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

SuperMap.OverlapDisplayedOptions = OverlapDisplayedOptions;