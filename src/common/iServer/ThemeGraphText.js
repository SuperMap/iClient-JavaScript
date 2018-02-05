import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';
import {ThemeGraphTextFormat} from '../REST';

/**
 * @class SuperMap.ThemeGraphText
 * @category  iServer Map Theme
 * @classdesc 统计图文字标注风格类。
 * @param options - {Object} 可选参数。<br>
 *        graphTextDisplayed - {boolean} 是否显示统计图上的文字标注。<br>
 *        graphTextFormat - {{@link SuperMap.ThemeGraphTextFormat}} 统计专题图文本显示格式。<br>
 *        graphTextStyle - {{@link SuperMap.ServerTextStyle}} 统计图上的文字标注风格。
 */
export class ThemeGraphText {

    constructor(options) {

        /**
         * @member SuperMap.ThemeGraphText.prototype.graphTextDisplayed -{boolean}
         * @description 是否显示统计图上的文字标注。默认为 false，即不显示。
         */
        this.graphTextDisplayed = false;

        /**
         * @member SuperMap.ThemeGraphText.prototype.graphTextFormat -{SuperMap.ThemeGraphTextFormat}
         * @description 统计专题图文本显示格式。<br>
         *              文本显示格式包括百分数、真实数值、标题、标题+百分数、标题+真实数值。默认为 SuperMap.ThemeGraphTextFormat.CAPTION。
         */
        this.graphTextFormat = ThemeGraphTextFormat.CAPTION;

        /**
         * @member SuperMap.ThemeGraphText.prototype.graphTextStyle -{SuperMap.ServerTextStyle}
         * @description 统计图上的文字标注风格。
         */
        this.graphTextStyle =  new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraphText";
    }

    /**
     * @function SuperMap.ThemeGraphText.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.graphTextDisplayed = null;
        me.graphTextFormat = null;
        if (me.graphTextStyle) {
            me.graphTextStyle.destroy();
            me.graphTextStyle = null;
        }
    }

    /**
     * @function SuperMap.ThemeGraphText.fromObj
     * @description 从传入对象获取统计图文字标注风格类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGraphText} ThemeGraphText对象
     */
    static fromObj(obj) {
        var res = new ThemeGraphText();
        Util.copy(res, obj);
        res.graphTextStyle = ServerTextStyle.fromObj(obj.graphTextStyle);
        return res;

    }

}

SuperMap.ThemeGraphText = ThemeGraphText;
