import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ServerStyle} from './ServerStyle';
import {ThemeUniqueItem} from './ThemeUniqueItem';
import {ColorGradientType} from '../REST';


/**
 * @class SuperMap.ThemeUnique
 * @category  iServer Map Theme
 * @classdesc 单值专题图。
 * @description 单值专题图是利用不同的颜色或符号（线型、填充）表示图层中某一属性信息的不同属性值，属性值相同的要素具有相同的渲染风格。单值专题图多用于具有分类属性的地图上，
 *              比如土壤类型分布图、土地利用图、行政区划图等。单值专题图着重表示现象质的差别，一般不表示数量的特征。尤其是有交叉或重叠现象时，此类不推荐使用，例如：民族分布区等。
 * @extends SuperMap.Theme
 * @param options - {Object} 可选参数。如：<br>
 *        items - {Array<{@link SuperMap.ThemeUniqueItem}>} 单值专题图子项类数组。<br>
 *        uniqueExpression - {string} 用于制作单值专题图的字段或字段表达式。<br>
 *        defaultStyle - {{@link SuperMap.ServerStyle}} 未参与单值专题图制作的对象的显示风格。<br>
 *        colorGradientType - {{@link SuperMap.ColorGradientType}} 渐变颜色枚举类。<br>
 *        memoryData - {{@link SuperMap.ThemeMemoryData}} 专题图内存数据。
 */
export class ThemeUnique extends Theme {

    constructor(options) {
        super("UNIQUE", options);
        /**
         * @member SuperMap.ThemeUnique.prototype.defaultStyle -{SuperMap.ServerStyle}
         * @description 未参与单值专题图制作的对象的显示风格。<br>
         *              通过单值专题图子项数组 （items）可以指定某些要素参与单值专题图制作，对于那些没有被包含的要素，即不参加单值专题表达的要素，使用该风格显示。
         */
        this.defaultStyle = new ServerStyle();

        /**
         * @member SuperMap.ThemeUnique.prototype.items -{Array<SuperMap.ThemeUniqueItem>}
         * @description 单值专题图子项类数组。<br>
         *              单值专题图是将专题值相同的要素归为一类，为每一类设定一种渲染风格，其中每一类就是一个专题图子项。比如，利用单值专题图制作行政区划图，
         *              Name 字段代表省/直辖市名，该字段用来做专题变量，如果该字段的字段值总共有5种不同值，则该行政区划图有5个专题图子项。
         */
        this.items = null;

        /**
         * @member SuperMap.ThemeUnique.prototype.uniqueExpression -{string}
         * @description 用于制作单值专题图的字段或字段表达式。<br>
         *              该字段值的数据类型可以为数值型或字符型。如果设置字段表达式，只能是相同数据类型字段间的运算。必设字段。
         */
        this.uniqueExpression = null;

        /**
         * @member SuperMap.ThemeUnique.prototype.colorGradientType -{SuperMap.ColorGradientType}
         * @description 渐变颜色枚举类。<br>
         *              渐变色是由起始色根据一定算法逐渐过渡到终止色的一种混合型颜色。
         *              该类作为单值专题图参数类、分段专题图参数类的属性，负责设置单值专题图、分段专题图的配色方案，在默认情况下专题图所有子项会根据这个配色方案完成填充。
         *              但如果为某几个子项的风格进行单独设置后（设置了 ThemeUniqueItem 或 ThemeRangeItem 类中Style属性），
         *              该配色方案对于这几个子项将不起作用。
         */
        this.colorGradientType = ColorGradientType.YELLOW_RED;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeUnique";
    }

    /**
     * @function SuperMap.ThemeUnique.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.uniqueExpression = null;
        me.colorGradientType = null;
        if (me.items) {
            if (me.items.length > 0) {
                for (var item in me.items) {
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }

        if (me.defaultStyle) {
            me.defaultStyle.destroy();
            me.defaultStyle = null;
        }
    }


    /**
     * @function SuperMap.ThemeUnique.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return {Object} 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
        if (obj.defaultStyle) {
            if (obj.defaultStyle.toServerJSONObject) {
                obj.defaultStyle = obj.defaultStyle.toServerJSONObject();
            }
        }
        if (obj.items) {
            var items = [],
                len = obj.items.length;
            for (var i = 0; i < len; i++) {
                items.push(obj.items[i].toServerJSONObject());
            }
            obj.items = items;
        }
        return obj;
    }

    /**
     * @function SuperMap.ThemeUnique.fromObj
     * @description 从传入对象获取单值专题图类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeUnique} ThemeUnique对象
     */
    static fromObj(obj) {
        var res = new ThemeUnique();
        var uItems = obj.items;
        var len = uItems ? uItems.length : 0;
        Util.extend(res, obj);
        res.items = [];
        res.defaultStyle = new ServerStyle.fromJson(obj.defaultStyle);
        for (var i = 0; i < len; i++) {
            res.items.push(new ThemeUniqueItem.fromObj(uItems[i]));
        }
        return res;
    }

}

SuperMap.ThemeUnique = ThemeUnique;
