/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';

/**
 * @class ThemeFlow
 * @deprecatedclass SuperMap.ThemeFlow
 * @private
 * @category  iServer Map Theme
 * @classdesc 标签或符号流动显示和牵引线风格设置类。
 *            通过该类可以设置专题图中符号是否流动显示、是否使用牵引线以及牵引线风格。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.flowEnabled=false] - 是否流动显示标签或符号。
 * @param {boolean} [options.leaderLineDisplayed=false] - 是否显示标签或符号和它标注的对象之间的牵引线。
 * @param {ServerStyle} [options.leaderLineStyle] - 标签或符号与其标注对象之间牵引线的风格。
 * @usage
 */
export class ThemeFlow {

    constructor(options) {
        /**
         * @member {boolean} [ThemeFlow.prototype.flowEnabled=false]
         * @description 是否流动显示标签或符号。<br>
         *              对于标签专题图而言，对于跨越比较大的区域和线条状的几何对象，在一个地图窗口中不能完全显示的情况下，如果其标签位置比较固定，
         *              在当前地图窗口中该对象的标签不可见，则需要通过平移地图来查看对象的标签信息。如果采用了流动显示的效果，在当前地图窗口中，对象即使是部分显示，
         *              其标签也会显示在当前地图窗口中。当平移地图时，对象的标签会随之移动，以保证在当前地图窗口中部分或全部显示的对象其标签都可见，从而可以方便地查看各要素的标签信息。
         */
        this.flowEnabled = false;

        /**
         * @member {boolean} [ThemeFlow.prototype.leaderLineDisplayed=false]
         * @description 是否显示标签或符号和它标注的对象之间的牵引线。false表示不显示标签或符号和它标注的对象之间的牵引线。<br>
         *              只有当 flowEnabled 为 true 时，牵引线才起作用。在当标签流动显示时，其位置不固定，由于牵引线始终指向要素的内点，
         *              因而通过牵引线显示功能可以找到流动的标签或符号实际对应的要素。或者渲染符号偏移它所指向的对象时，图与对象之间可以采用牵引线进行连接。
         */
        this.leaderLineDisplayed = false;

        /**
         * @member {ServerStyle} ThemeFlow.prototype.leaderLineStyle
         * @description 标签或符号与其标注对象之间牵引线的风格。
         */
        this.leaderLineStyle =  new ServerStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeFlow";
    }

    /**
     * @function ThemeFlow.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.flowEnabled = null;
        me.leaderLineDisplayed = null;
        if (me.leaderLineStyle) {
            me.leaderLineStyle.destroy();
            me.leaderLineStyle = null;
        }
    }

    /**
     * @function ThemeFlow.fromObj
     * @description 从传入对象获取标签或符号流动显示和牵引线风格设置类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeFlow} ThemeFlow 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeFlow();
        Util.copy(res, obj);
        res.leaderLineStyle = ServerStyle.fromJson(obj.leaderLineStyle);
        return res;
    }

}

