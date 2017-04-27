/**
 * Class: SuperMap.ThemeLabel
 * 标签专题图。
 * 标签专题图是用文本的形式在图层中显示点、线、面等对象的属性信息，一般将文本型或数值型字段标注于图层中，如地名、道路名称、河流等级、宽度等信息。
 * 这里需要注意的是地图上一般还会出现图例说明，图名，比例尺等等，这些都是制图元素，不属于标签专题图标注的范畴。标签专题图有两种表现形式:
 * 第一种 统一标签专题图，即将指定图层的表达式的所有值使用统一的风格输出，labelExpression 用于设定标签专题图所使用的字段。
 * 第二种 为分段标签专题图。它仍然使用 labelExpression 设定标签专题图显示的字段值，通过 rangeExpression 指定数字型的字段作为分段数据，items 中的每
 * 个子对象的 [start，end) 分段值必须来源于属性 rangeExpression 的字段值，并在 items 中为每个或部分分段子项自定义特殊的风格。
 *
 * Inherits from:
 *  - <SuperMap.Theme>
 */
require('../REST');
require('./Theme');
require('./ThemeLabelItem');
require('./ThemeLabelUniqueItem');

var SuperMap = require('../SuperMap');
var ThemeFlow = require('./ThemeFlow');
var ThemeOffset = require('./ThemeOffset');
var ThemeLabelText = require('./ThemeLabelText');
var ThemeLabelAlongLine = require('./ThemeLabelAlongLine');
var ThemeLabelBackground = require('./ThemeLabelBackground');
SuperMap.ThemeLabel = SuperMap.Class(SuperMap.Theme, {

    /**
     * APIProperty: alongLine
     * {<SuperMap.ThemeLabelAlongLine>} 标签沿线标注方向样式类。
     * 在该类中可以设置标签是否沿线标注以及沿线标注的多种方式。沿线标注属性只适用于线数据集专题图。
     */
    alongLine: null,

    /**
     * APIProperty: background
     * {<SuperMap.ThemeLabelBackground>} 标签专题图中标签的背景风格类。通过该字段可以设置标签的背景形状和风格。
     */
    background: null,

    /**
     * APIProperty: flow
     * {<SuperMap.ThemeFlow>} 标签专题图标签流动显示与牵引线设置类。通过该字段可以设置标签是否流动显示和牵引线风格。
     */
    flow: null,

    /**
     * APIProperty: items
     * {Array(<SuperMap.ThemeUniqueItem>)} 分段标签专题图的子项数组。分段标签专题图使用 rangeExpression
     * 指定数字型的字段作为分段数据，items 中的每个子对象的 [start，end) 分段值必须来源于属性 rangeExpression 的字段值。每个子项拥有自己的风格。
     */
    items: null,

    /**
     * APIProperty: uniqueItems
     * {Array(<SuperMap.ThemeLabelUniqueItem>)} 单值标签专题图子项数组。单值标签专题图使用 uniqueExpression
     * 单值标签专题图子项集合
     */
    uniqueItems: null,

    /**
     * APIProperty: labelExpression
     * {String} 标注字段表达式。系统将 labelExpression 对应的字段或字段表达式的值以标签的形式显示在图层中。必设字段。
     */
    labelExpression: null,

    /**
     * APIProperty: labelOverLengthMode
     * {<SuperMap.LabelOverLengthMode>} 标签专题图中超长标签的处理模式枚举类。
     * 对于标签的长度超过设置的标签最大长度 maxLabelLength 时称为超长标签。默认为 SuperMap.LabelOverLengthMode.NONE。
     */
    labelOverLengthMode: SuperMap.LabelOverLengthMode.NONE,

    /**
     * APIProperty: matrixCells
     * {Array(<SuperMap.LabelMatrixCell>)} 矩阵标签元素数组，用于制作矩阵标签专题图。
     * 数组中可以放置符号类型的矩阵标签元素和图片类型的矩阵标签元素。
     */
    matrixCells: null,

    /**
     * APIProperty: maxLabelLength
     * {Number} 标签在每一行显示的最大长度，一个中文为两个字符。
     * 如果超过最大长度，可以采用两种方式来处理，一种是换行的模式进行显示，另一种是以省略号方式显示。默认最大长度为256个字符。
     */
    maxLabelLength: 256,

    /**
     * APIProperty: numericPrecision
     * {Number} 如果显示的标签内容为数字，通过该字段设置其显示的精度。例如标签对应的数字是8071.64529347，
     * 如果该属性为0时，显示8071；为1时，显示8071.6；为3时，则是8071.645。
     */
    numericPrecision: 0,

    /**
     * APIProperty: offset
     * {<SuperMap.ThemeOffset>} 用于设置标签专题图中标记文本相对于要素内点的偏移量对象。
     */
    offset: null,

    /**
     * APIProperty: overlapAvoided
     * {Boolean} 是否允许以文本避让方式显示文本。默认值为 true， 即自动避免文本叠盖。只针对该标签专题图层中的文本数据。
     * 在标签重叠度很大的情况下，即使使用自动避让功能，可能也无法完全避免标签重叠现象。
     */
    overlapAvoided: true,

    /**
     * APIProperty: rangeExpression
     * {String} 制作分段标签专题的分段字段或字段表达式。该表达式对应的字段（或者字段表达式）的值应该为数值型。
     * 该字段与 items 分段子项联合使用，每个子项的起始值 [start，end)来源于 rangeExpression 字段值。
     * 最后 labelExpression 指定的标签字段（标签专题图要显示的具体内容）会根据分段子项的风格进行分段显示。
     */
    rangeExpression: null,

    /**
     * APIProperty: uniqueExpression
     * {String} 用于制作单值专题图的字段或字段表达式。
     * 该字段值的数据类型可以为数值型或字符型。如果设置字段表达式，只能是相同数据类型字段间的运算。必设字段,必须与labelExpression一起使用
     */
    uniqueExpression: null,

    /**
     * APIProperty: smallGeometryLabeled
     * {Boolean} 是否显示长度大于被标注对象本身长度的标签，默认为 false。在标签的长度大于线或者面对象本身的长度时，
     * 如果该值为 true，则标签文字会叠加在一起显示，为了清楚完整的显示该标签，
     * 可以采用换行模式来显示标签，但必须保证每行的长度小于对象本身的长度。
     */
    smallGeometryLabeled: false,

    /**
     * APIProperty: text
     * {<ThemeLabelText>} 标签中文本风格。
     */
    text: null,

    /**
     * Constructor: SuperMap.ThemeLabel
     * 标签专题图构造函数，用于创建 SuperMap.ThemeLabel 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * alongLine - {<SuperMap.ThemeLabelAlongLine>} 标签沿线标注方向样式类。
     * background - {<SuperMap.ThemeLabelBackground>} 标签专题图中标签的背景风格类。
     * flow - {<SuperMap.ThemeFlow>} 标签专题图标签流动显示与牵引线设置类。
     * items - {Array(<SuperMap.ThemeUniqueItem>)} 分段标签专题图的子项数组。
     * labelExpression - {String} 标注字段表达式。
     * labelOverLengthMode - {<SuperMap.LabelOverLengthMode>} 标签专题图中超长标签的处理模式枚举类。
     * matrixCells - {Array(<SuperMap.LabelMatrixCell>)} 矩阵标签元素数组。
     * maxLabelLength - {Number>} 标签在每一行显示的最大长度。
     * numericPrecision - {Number} 通过该字段设置其显示的精度。
     * offset - {<SuperMap.ThemeOffset>} 用于设置标签专题图中标记文本相对于要素内点的偏移量对象。
     * overlapAvoided - {Boolean} 是否允许以文本避让方式显示文本。
     * rangeExpression - {String} 制作分段标签专题的分段字段或字段表达式。
     * smallGeometryLabeled - {Boolean} 是否显示长度大于被标注对象本身长度的标签。
     * text - {<SuperMap.ThemeLabelText>} 标签中文本风格。
     * memoryData - {<SuperMap.ThemeMemoryData>} 专题图内存数据。
     */
    initialize: function (options) {
        var me = this;
        me.alongLine = new ThemeLabelAlongLine();
        me.background = new ThemeLabelBackground();
        me.flow = new ThemeFlow();
        me.offset = new ThemeOffset();
        me.text = new ThemeLabelText();
        SuperMap.Theme.prototype.initialize.apply(this, ["LABEL", options]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.Theme.prototype.destroy.apply(this, arguments);
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
    },


    /**
     * Method: toJSON
     * 将themeLabel对象转化为json字符串。
     *
     * Returns:
     * {String} 返回转换后的 JSON 字符串。
     */
    toJSON: function () {
        return SuperMap.Util.toJSON(this.toServerJSONObject());
    },

    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
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
        return obj;
    },

    CLASS_NAME: "SuperMap.ThemeLabel"
});
SuperMap.ThemeLabel.fromObj = function (obj) {
    if (!obj) return;
    var lab = new SuperMap.ThemeLabel();
    var itemsL = obj.items, itemsU = obj.uniqueItems, cells = obj.matrixCells;
    obj.matrixCells = null;
    SuperMap.Util.copy(lab, obj);
    lab.alongLine = SuperMap.ThemeLabelAlongLine.fromObj(obj);
    lab.background = SuperMap.ThemeLabelBackground.fromObj(obj);
    lab.flow = new SuperMap.ThemeFlow({flowEnabled: obj.flowEnabled, leaderLineDisplayed: obj.leaderLineDisplayed, leaderLineStyle: obj.leaderLineStyle});
    if (itemsL) {
        lab.items = [];
        for (var i = 0, len = itemsL.length; i < len; i++) {
            lab.items.push(SuperMap.ThemeLabelItem.fromObj(itemsL[i]));
        }
    }
    if (itemsU) {
        lab.uniqueItems = [];
        for (var j = 0, uniqueLen = itemsU.length; j < uniqueLen; j++) {
            lab.uniqueItems.push(SuperMap.ThemeUniqueItem.fromObj(itemsU[j]));
        }
    }
    if (cells) {
        lab.matrixCells = [];
        for (var i = 0, len = cells.length; i < len; i++) {
            //TODO
            //lab.matrixCells.push(SuperMap.LabelMatrixCell.fromObj(cells[i]));
        }
    }
    lab.offset = SuperMap.ThemeOffset.fromObj(obj);
    lab.text = SuperMap.ThemeLabelText.fromObj(obj);
    return lab;
};
module.exports = SuperMap.ThemeLabel;
