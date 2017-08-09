import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {GeoFeatureThemeLayer} from './theme/GeoFeatureThemeLayer';

/**
 * @class L.supermap.rangeThemeLayer
 * @classdesc 范围分段专题图。
 *            范围分段专题图对数据（<SuperMap.Feature.Vector>）属性字段（attributes）的属性值进行分段，使用不同的颜色或符号（线型、填充）渲染不同范围段的属性值。
 *            分段专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
 * @extends L.supermap.GeoFeatureThemeLayer
 * @param name - {String} 图层名
 * @param options - {Object} 图层参数
 */
export var RangeThemeLayer = GeoFeatureThemeLayer.extend({


    initialize: function (name, options) {
        GeoFeatureThemeLayer.prototype.initialize.call(this, name, options);
        //{Array(ThemeStyle)} 图层中专题要素的样式
        this.style = [];
        //{String} 用于指定专题要素样式的属性字段名称。
        // 此属性字段是要用户数据（feature） attributes 中包含的字段，且字段对应的值的类型必须是数值型。使用标签分组显示还需要设置 styleGroups 属性。

        this.themeField = null;

        //使用此属性需要设置 themeField 属性。
        //1.没有同时设置 themeField 和 styleGroups，则所有专题要素都使用本图层的 style 进行渲染；
        //2.同时设置 themeField 和 styleGroups，则按照 themeField 指定的字段名称获取用户数据（feature）attributes 中对应的属性值；
        //   a.如果属性值等于 styleGroups 数组里某个元素定义的 value 值，则此专题要素取 styleGroups 数组中该元素定义的 style 进行渲染。
        //   b.如果属性值不等于 styleGroups 数组里任何元素定义的 value 值，则此专题要素按照本图层的 style 进行渲染。
        //此数组每个元素对象必须有两个属性：value : 与字段 themeField 相对应的属性值；style：专题要素 style。
        this.styleGroups = [];
    },

    /**
     * @function L.supermap.rangeThemeLayer.prototype.getStyleByData
     * @description 根据用户数据（feature）设置专题要素的 Style
     * @param feat - {L.feature} 用户要素数据
     */
    getStyleByData: function (feat) {
        var me = this,
            feature = feat,
            style = SuperMap.Util.copyAttributesWithClip({}, me.style);

        var groups = me.styleGroups,
            isSfInAttributes = false,//指定的 themeField 是否是 feature 的属性字段之一
            attribute = null; //属性值

        var isValidStyleGroup = me.styleGroups && me.styleGroups.length > 0;

        if (me.themeField && isValidStyleGroup && feature.attributes) {
            var Sf = me.themeField,
                attributes = feature.attributes;

            for (var property in attributes) {
                if (Sf !== property) {
                    continue;
                }
                isSfInAttributes = true;
                attribute = attributes[property];
                break;
            }
        }

        //判断属性值是否属于styleGroups的某一个范围，以便对获取分组 style
        if (isSfInAttributes && isValidStyleGroup) {
            for (var i = 0, len = groups.length; i < len; i++) {
                if ((attribute >= groups[i].start) && (attribute < groups[i].end)) {
                    var sty1 = groups[i].style;
                    style = SuperMap.Util.copyAttributesWithClip(style, sty1);
                }
            }

        }
        return style;
    }

});
export var rangeThemeLayer = function (name, options) {
    return new RangeThemeLayer(name, options);
};

L.supermap.rangeThemeLayer = rangeThemeLayer;