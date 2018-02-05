import {SuperMap} from '../SuperMap';
import {ServerStyle} from './ServerStyle';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ThemeGraduatedSymbolStyle
 * @category  iServer Map Theme
 * @classdesc 等级符号专题图正负零值显示风格类
 * @param options - {Object} 可选参数。如：<br>
 *        negativeDisplayed - {boolean} 是否显示负值。默认为 false。<br>
 *        negativeStyle - {{@link SuperMap.ServerStyle}} 负值的等级符号风格。<br>
 *        positiveStyle - {{@link SuperMap.ServerStyle}}  正值的等级符号风格。<br>
 *        zeroDisplayed - {boolean} 是否显示0值。默认为 false。<br>
 *        zeroStyle - {{@link SuperMap.ServerStyle}} 0值的等级符号风格。
 */
export class ThemeGraduatedSymbolStyle {

    constructor(options) {
        /**
         * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.negativeDisplayed -{boolean}
         * @description 是否显示负值。默认为 false。
         */
        this.negativeDisplayed = false;

        /**
         * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.negativeStyle -{SuperMap.ServerStyle} 负值的等级符号风格。
         */
        this.negativeStyle = new ServerStyle();

        /**
         * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.positiveStyle -{SuperMap.ServerStyle}
         * @description 正值的等级符号风格。
         */
        this.positiveStyle = new ServerStyle();

        /**
         * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.zeroDisplayed -{boolean}
         * @description 是否显示0值。默认为 false。
         */
        this.zeroDisplayed = false;

        /**
         * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.zeroStyle -{SuperMap.ServerStyle}
         * @description 0值的等级符号风格。
         */
        this.zeroStyle = new ServerStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraduatedSymbolStyle";
    }

    /**
     * @function SuperMap.ThemeGraduatedSymbolStyle.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.negativeDisplayed = null;
        me.negativeStyle = null;
        me.positiveStyle = null;
        me.zeroDisplayed = null;
        me.zeroStyle = null;
    }

    /**
     * @function SuperMap.ThemeGraduatedSymbolStyle.fromObj
     * @description 从传入对象获取等级符号专题图正负零值显示风格类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGraduatedSymbolStyle} ThemeGraduatedSymbolStyle对象
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGraduatedSymbolStyle();
        Util.copy(res, obj);
        res.negativeStyle = ServerStyle.fromJson(obj.negativeStyle);
        res.positiveStyle = ServerStyle.fromJson(obj.positiveStyle);
        res.zeroStyle = ServerStyle.fromJson(obj.zeroStyle);
        return res;
    }

}


SuperMap.ThemeGraduatedSymbolStyle = ThemeGraduatedSymbolStyle;

