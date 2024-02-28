/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class LabelMixedTextStyle
 * @deprecatedclass SuperMap.LabelMixedTextStyle
 * @category iServer Map Theme
 * @classdesc 标签文本复合风格类。
 * 该类主要用于对标签专题图中标签的文本内容进行风格设置。通过该类用户可以使标签的文字显示不同的风格，比如文本 “喜马拉雅山”，通过本类可以将前三个字用红色显示，后两个字用蓝色显示。对同一文本设置不同的风格实质上是对文本的字符进行分段，同一分段内的字符具有相同的显示风格。对字符分段有两种方式，一种是利用分隔符对文本进行分段；另一种是根据分段索引值进行分段：</br>
 *  1.利用分隔符对文本进行分段: 比如文本 “5&109” 被分隔符 “&” 分为 “5” 和 “109” 两部分，
 *     在显示时，“5” 和分隔符 “&” 使用同一个风格，字符串 “109” 使用相同的风格。<br>
 *  2.利用分段索引值进行分段: 文本中字符的索引值是以 0 开始的整数，比如文本 “珠穆朗玛峰”，
 *     第一个字符（“珠”）的索引值为 0，第二个字符（“穆”）的索引值为 1，以此类推；当设置分段索引值为 1，3，4，9 时，
 *     字符分段范围相应的就是 (-∞，1)，[1，3)，[3，4)，[4，9)，[9，+∞)，可以看出索引号为 0 的字符（即“珠” ）在第一个分段内，
 *     索引号为 1，2 的字符（即“穆”、“朗”）位于第二个分段内，索引号为 3 的字符（“玛”）在第三个分段内，索引号为 4 的字符（“峰”）在第四个分段内，其余分段中没有字符。
 * @param {Object} options - 可选参数。
 * @param {ServerTextStyle} [options.defaultStyle] - 默认的文本复合风格。
 * @param {string} [options.separator] - 文本的分隔符。
 * @param {boolean} [options.separatorEnabled=false] - 文本的分隔符是否有效。
 * @param {Array.<number>} [options.splitIndexes] - 分段索引值，分段索引值用来对文本中的字符进行分段。
 * @param {Array.<ServerTextStyle>} [options.styles] - 文本样式集合。
 * @usage
 */
export class LabelMixedTextStyle {

    constructor(options) {
        /**
         * @member {ServerTextStyle} LabelMixedTextStyle.prototype.defaultStyle
         * @description 默认的文本复合风格，即 ServerTextStyle 各字段的默认值。
         */
        this.defaultStyle = null;

        /**
         * @member {string} LabelMixedTextStyle.prototype.separator
         * @description 文本的分隔符，分隔符的风格与前一个字符的风格一样。文本的分隔符是一个将文本分割开的符号，
         *              比如文本 “5_109” 被 “ _ ” 分隔为 “5” 和 “109” 两部分，假设有风格数组：style1、style2。
         *              在显示时，“5” 和分隔符 “ _ ” 使用 Style1 风格渲染，字符串 “109” 使用 Style2 的风格。
         */
        this.separator = null;

        /**
         * @member {boolean} [LabelMixedTextStyle.prototype.separatorEnabled=false]
         * @description 文本的分隔符是否有效。分隔符有效时利用分隔符对文本进行分段；无效时根据文本中字符的位置进行分段。
         *              分段后，同一分段内的字符具有相同的显示风格。
         */
        this.separatorEnabled = false;

        /**
         * @member {Array.<number>} LabelMixedTextStyle.prototype.splitIndexes
         * @description 分段索引值，分段索引值用来对文本中的字符进行分段。
         *              文本中字符的索引值是以 0 开始的整数，比如文本“珠穆朗玛峰”，第一个字符（“珠”）的索引值为0，第二个字符（“穆”）的索引值为 1，
         *              以此类推；当设置分段索引值数组为 [1，3，4，9] 时，字符分段范围相应的就是 (-∞，1)，[1，3)，[3，4)，[4，9)，[9，+∞)，
         *              可以看出索引号为 0 的字符（即 “珠”）在第一个分段内，索引号为 1，2 的字符（即 “穆”、“朗”）位于第二个分段内，
         *              索引号为 3 的字符（“玛”）在第三个分段内，索引号为 4 的字符（“峰”）在第四个分段内，其余分段中没有字符。
         */
        this.splitIndexes = null;

        /**
         * @member {Array.<ServerTextStyle>} LabelMixedTextStyle.prototype.styles
         * @description 文本样式集合。文本样式集合中的样式根据索引与不同分段一一对应，
         *              如果有分段没有风格对应则使用 defaultStyle。
         */
        this.styles = new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.LabelMixedTextStyle"
    }

    /**
     * @function LabelMixedTextStyle.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.defaultStyle) {
            me.defaultStyle.destroy();
            me.defaultStyle = null;
        }
        me.separator = null;
        me.separatorEnabled = null;
        if (me.splitIndexes) {
            me.splitIndexes = null;
        }
        if (me.styles) {
            for (var i = 0, styles = me.styles, len = styles.length; i < len; i++) {
                styles[i].destroy();
            }
            me.styles = null;
        }
    }

    /**
     * @function LabelMixedTextStyle.fromObj
     * @description 从传入对象获取标签文本复合风格类。
     * @param {Object} obj - 传入对象。
     * @returns {LabelMixedTextStyle} 返回新的 LabelMixedTextStyle 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new LabelMixedTextStyle();
        var stys = obj.styles;
        Util.copy(res, obj);
        res.defaultStyle = new ServerTextStyle(obj.defaultStyle);
        if (stys) {
            res.styles = [];
            for (var i = 0, len = stys.length; i < len; i++) {
                res.styles.push(new ServerTextStyle(stys[i]));
            }
        }
        return res;
    }

}


