/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ThemeLabelItem} from './ThemeLabelItem';
import {ThemeUniqueItem} from './ThemeUniqueItem';
import {ThemeFlow} from './ThemeFlow';
import {ThemeOffset} from './ThemeOffset';
import {ThemeLabelText} from './ThemeLabelText';
import {ThemeLabelAlongLine} from './ThemeLabelAlongLine';
import {ThemeLabelBackground} from './ThemeLabelBackground';
import {LabelOverLengthMode} from '../REST';

/**
 * @class SuperMap.ThemeLabel
 * @category  iServer Map Theme
 * @classdesc 标签专题图类。
 * @extends SuperMap.Theme
 * @param {Object} options - 参数。
 * @param {Array.<SuperMap.ThemeUniqueItem>} options.items - 分段标签专题图的子项数组。
 * @param {string} options.labelExpression - 标注字段表达式。
 * @param {Array.<SuperMap.LabelMatrixCell>} options.matrixCells - 矩阵标签元素数组。
 * @param {SuperMap.ThemeLabelAlongLine} [options.alongLine] - 标签沿线标注方向样式类。
 * @param {SuperMap.ThemeLabelBackground} [options.background] - 标签专题图中标签的背景风格类。
 * @param {SuperMap.ThemeFlow} [options.flow] - 标签专题图标签流动显示与牵引线设置类。
 * @param {SuperMap.LabelOverLengthMode} [options.labelOverLengthMode=SuperMap.LabelOverLengthMode.NONE] - 标签专题图中超长标签的处理模式枚举类。
 * @param {number} [options.maxLabelLength=256] - 标签在每一行显示的最大长度。
 * @param {number} [options.numericPrecision=0] - 通过该字段设置其显示的精度。
 * @param {SuperMap.ThemeOffset} [options.offset] - 用于设置标签专题图中标记文本相对于要素内点的偏移量对象。
 * @param {boolean} [options.overlapAvoided=true] - 是否允许以文本避让方式显示文本。
 * @param {string} [options.rangeExpression] - 制作分段标签专题的分段字段或字段表达式。
 * @param {boolean} [options.smallGeometryLabeled=false] - 是否显示长度大于被标注对象本身长度的标签。
 * @param {SuperMap.ThemeLabelText} options.text - 标签中文本风格。
 * @param {number} [options.textSpace=0] - 沿线标注，相邻两个文字之间的间距，单位当前设置的字高。
 * @param {SuperMap.ThemeMemoryData} [options.memoryData] - 专题图内存数据。
 */
export class ThemeLabel extends Theme {


    constructor(options) {
        super("LABEL", options);
        /**
         * @member {SuperMap.ThemeLabelAlongLine} [SuperMap.ThemeLabel.prototype.alongLine]
         * @description 标签沿线标注方向样式类。
         *              在该类中可以设置标签是否沿线标注以及沿线标注的多种方式。沿线标注属性只适用于线数据集专题图。
         */
        this.alongLine = new ThemeLabelAlongLine();

        /**
         * @member {SuperMap.ThemeLabelBackground} [SuperMap.ThemeLabel.prototype.background] 
         * @description 标签专题图中标签的背景风格类。通过该字段可以设置标签的背景形状和风格。
         */
        this.background = new ThemeLabelBackground();

        /**
         * @member {SuperMap.ThemeFlow} [SuperMap.ThemeLabel.prototype.flow]
         * @description 标签专题图标签流动显示与牵引线设置类。通过该字段可以设置标签是否流动显示和牵引线风格。
         */
        this.flow = new ThemeFlow();

        /**
         * @member {Array.<SuperMap.ThemeUniqueItem>} [SuperMap.ThemeLabel.prototype.items]
         * @description 分段标签专题图的子项数组。分段标签专题图使用 rangeExpression
         *              指定数字型的字段作为分段数据，items 中的每个子对象的 [start，end) 分段值必须来源于属性 rangeExpression 的字段值。每个子项拥有自己的风格。
         */
        this.items = null;

        /**
         * @member {Array.<SuperMap.ThemeLabelUniqueItem>} SuperMap.ThemeLabel.prototype.uniqueItems
         * @description 单值标签专题图子项数组。单值标签专题图使用 uniqueExpression单值标签专题图子项集合。
         */
        this.uniqueItems = null;

        /**
         * @member {string} SuperMap.ThemeLabel.prototype.labelExpression
         * @description 标注字段表达式。系统将 labelExpression 对应的字段或字段表达式的值以标签的形式显示在图层中。
         */
        this.labelExpression = null;

        /**
         * @member {SuperMap.LabelOverLengthMode} [SuperMap.ThemeLabel.prototype.labelOverLengthMode=SuperMap.LabelOverLengthMode.NONE] - 标签专题图中超长标签的处理模式枚举类。
         * @description 对于标签的长度超过设置的标签最大长度 maxLabelLength 时称为超长标签。
         */
        this.labelOverLengthMode = LabelOverLengthMode.NONE;

        /**
         * @member {Array.<SuperMap.LabelMatrixCell>} SuperMap.ThemeLabel.prototype.matrixCells
         * @description 矩阵标签元素数组，用于制作矩阵标签专题图。
         *              数组中可以放置符号类型的矩阵标签元素和图片类型的矩阵标签元素。
         */
        this.matrixCells = null;

        /**
         * @member {number} [SuperMap.ThemeLabel.prototype.maxLabelLength=256]
         * @description 标签在每一行显示的最大长度，一个中文为两个字符。
         *              如果超过最大长度，可以采用两种方式来处理，一种是换行的模式进行显示，另一种是以省略号方式显示。单位为字符。
         */
        this.maxLabelLength = 256;

        /**
         * @member {number} [SuperMap.ThemeLabel.prototype.numericPrecision=0]
         * @description 如果显示的标签内容为数字，通过该字段设置其显示的精度。例如标签对应的数字是8071.64529347，
         *              如果该属性为0时，显示8071；为1时，显示8071.6；为3时，则是8071.645。
         */
        this.numericPrecision = 0;

        /**
         * @member {SuperMap.ThemeOffset} [SuperMap.ThemeLabel.prototype.offset]
         * @description 用于设置标签专题图中标记文本相对于要素内点的偏移量对象。
         */
        this.offset = new ThemeOffset();

        /**
         * @member {boolean} [SuperMap.ThemeLabel.prototype.overlapAvoided=true]
         * @description 是否允许以文本避让方式显示文本。true 表示自动避免文本叠盖。只针对该标签专题图层中的文本数据。
         *              在标签重叠度很大的情况下，即使使用自动避让功能，可能也无法完全避免标签重叠现象。
         */
        this.overlapAvoided = true;

        /**
         * @member {string} SuperMap.ThemeLabel.prototype.rangeExpression
         * @description 制作分段标签专题的分段字段或字段表达式。该表达式对应的字段（或者字段表达式）的值应该为数值型。
         *              该字段与 items 分段子项联合使用，每个子项的起始值 [start，end)来源于 rangeExpression 字段值。
         *              最后 labelExpression 指定的标签字段（标签专题图要显示的具体内容）会根据分段子项的风格进行分段显示。
         */
        this.rangeExpression = null;

        /**
         * @member {string} SuperMap.ThemeLabel.prototype.uniqueExpression
         * @description 用于制作单值专题图的字段或字段表达式。
         *              该字段值的数据类型可以为数值型或字符型。如果设置字段表达式，只能是相同数据类型字段间的运算。必须与labelExpression一起使用。
         */
        this.uniqueExpression = null;

        /**
         * @member {boolean} [SuperMap.ThemeLabel.prototype.smallGeometryLabeled=false]
         * @description 是否显示长度大于被标注对象本身长度的标签。在标签的长度大于线或者面对象本身的长度时，
         *              如果该值为 true，则标签文字会叠加在一起显示，为了清楚完整的显示该标签，
         *              可以采用换行模式来显示标签，但必须保证每行的长度小于对象本身的长度。
         */
        this.smallGeometryLabeled = false;

        /**
         * @member {SuperMap.ThemeLabelText} SuperMap.ThemeLabel.prototype.text
         * @description 标签中文本风格。
         */
        this.text = new ThemeLabelText();

        /**
         * @member {number} [SuperMap.ThemeLabel.prototype.textSpace=0]
         * @description 沿线标注，相邻两个文字之间的间距，单位当前设置的字高。
         */
        this.textSpace = 0;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeLabel";
    }


    /**
     * @function SuperMap.ThemeLabel.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.alongLine = null;
        if (me.background) {
            me.background.destroy();
            me.background = null;
        }
        me.flow = null;
        if (me.items) {
            for (var i = 0, items = me.items, len = items.length; i < len; i++) {
                items[i].destroy();
            }
            me.items = null;
        }
        if (me.uniqueItems) {
            for (var j = 0, uniqueItems = me.uniqueItems, uniqueLen = uniqueItems.length; j < uniqueLen; j++) {
                uniqueItems[j].destory();
            }
            me.uniqueItems = null;
        }
        me.labelExpression = null;
        me.labelOverLengthMode = null;
        me.matrixCells = null;
        me.maxLabelLength = null;
        me.numericPrecision = null;
        me.overlapAvoided = null;
        me.rangeExpression = null;
        me.uniqueExpression = null;
        if (me.offset) {
            me.offset.destroy();
            me.offset = null;
        }
        me.overlapAvoided = null;
        me.smallGeometryLabeled = null;
        if (me.text) {
            me.text.destroy();
            me.text = null;
        }
        me.textSpace = null;
    }

    /**
     * @function SuperMap.ThemeLabel.prototype.toJSON
     * @description 将themeLabel对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        return Util.toJSON(this.toServerJSONObject());
    }

    /**
     * @function SuperMap.ThemeLabel.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj.type = this.type;
        obj.memoryData = this.memoryData;
        if (this.alongLine) {
            obj.alongLine = this.alongLine.isAlongLine;
            obj.alongLineDirection = this.alongLine.alongLineDirection;
            obj.angleFixed = this.alongLine.angleFixed;
            obj.isLabelRepeated = this.alongLine.isLabelRepeated;
            obj.labelRepeatInterval = this.alongLine.labelRepeatInterval;
            obj.repeatedLabelAvoided = this.alongLine.repeatedLabelAvoided;
            obj.repeatIntervalFixed = this.alongLine.repeatIntervalFixed;
        }
        if (this.offset) {
            obj.offsetFixed = this.offset.offsetFixed;
            obj.offsetX = this.offset.offsetX;
            obj.offsetY = this.offset.offsetY;
        }

        if (this.flow) {
            obj.flowEnabled = this.flow.flowEnabled;
            obj.leaderLineDisplayed = this.flow.leaderLineDisplayed;
            obj.leaderLineStyle = this.flow.leaderLineStyle;
        }
        if (this.text) {
            obj.maxTextHeight = this.text.maxTextHeight;
            obj.maxTextWidth = this.text.maxTextWidth;
            obj.minTextHeight = this.text.minTextHeight;
            obj.minTextWidth = this.text.minTextWidth;
            obj.uniformStyle = this.text.uniformStyle;
            obj.uniformMixedStyle = this.text.uniformMixedStyle;
        }
        if (this.background) {
            obj.labelBackShape = this.background.labelBackShape;
            obj.backStyle = this.background.backStyle;
        }
        obj.labelOverLengthMode = this.labelOverLengthMode;
        obj.maxLabelLength = this.maxLabelLength;
        obj.smallGeometryLabeled = this.smallGeometryLabeled;
        obj.rangeExpression = this.rangeExpression;
        obj.uniqueExpression = this.uniqueExpression;
        obj.numericPrecision = this.numericPrecision;
        obj.items = this.items;
        obj.uniqueItems = this.uniqueItems;
        obj.labelExpression = this.labelExpression;
        obj.overlapAvoided = this.overlapAvoided;
        obj.matrixCells = this.matrixCells;
        obj.textSpace = this.textSpace;
        return obj;
    }

    /**
     * @function SuperMap.ThemeLabel.fromObj
     * @description 从传入对象获取标签专题图类。
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeLabel} ThemeLabel 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var lab = new ThemeLabel();
        var itemsL = obj.items, itemsU = obj.uniqueItems, cells = obj.matrixCells;
        obj.matrixCells = null;
        Util.copy(lab, obj);
        lab.alongLine = ThemeLabelAlongLine.fromObj(obj);
        lab.background = ThemeLabelBackground.fromObj(obj);
        lab.flow = new ThemeFlow({
            flowEnabled: obj.flowEnabled,
            leaderLineDisplayed: obj.leaderLineDisplayed,
            leaderLineStyle: obj.leaderLineStyle
        });
        if (itemsL) {
            lab.items = [];
            for (var i = 0, len = itemsL.length; i < len; i++) {
                lab.items.push(ThemeLabelItem.fromObj(itemsL[i]));
            }
        }
        if (itemsU) {
            lab.uniqueItems = [];
            for (let j = 0, uniqueLen = itemsU.length; j < uniqueLen; j++) {
                lab.uniqueItems.push(ThemeUniqueItem.fromObj(itemsU[j]));
            }
        }
        if (cells) {
            lab.matrixCells = [];
            for (let i = 0, len = cells.length; i < len; i++) {
                //TODO
                //lab.matrixCells.push(SuperMap.LabelMatrixCell.fromObj(cells[i]));
            }
        }
        lab.offset = ThemeOffset.fromObj(obj);
        lab.text = ThemeLabelText.fromObj(obj);
        return lab;
    }

}

SuperMap.ThemeLabel = ThemeLabel;
