import L from "leaflet";
import '../core/Base';
import {GeoFeatureThemeLayer} from './theme/GeoFeatureThemeLayer';
import {CommonUtil} from '@supermap/iclient-common';

/**
 * @class L.supermap.rangeThemeLayer
 * @classdesc 范围分段专题图。
 * @category Visualization Theme
 * @description 范围分段专题图对数据（<{@link SuperMap.Feature.Vector}>）属性字段（attributes）的属性值进行分段，使用不同的颜色或符号（线型、填充）渲染不同范围段的属性值。
 *            分段专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
 * @extends L.supermap.GeoFeatureThemeLayer
 * @param name - {string} 图层名
 * @param options - {Object} 图层参数。如：<br>
 *        nodesClipPixel - {number}节点抽稀像素距离，默认值 2。<br>
 *        isHoverAble - {boolean} 图形是否在 hover 时高亮 ，默认值：false。<br>
 *        isMultiHover - {boolean} 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。<br>
 *        isClickAble - {boolean} 图形是否可点击，默认 true。<br>
 *        isAllowFeatureStyle - {boolean} 是否允许 feature 样式（style） 中的有效属性应用到专题图层。
 *                                        默认值为： false，禁止对专题要素使用数据（feature）的 style。
 *                                        此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
 *                                        的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 */
export var RangeThemeLayer = GeoFeatureThemeLayer.extend({


    initialize: function (name, options) {
        GeoFeatureThemeLayer.prototype.initialize.call(this, name, options);
        //{Array<SuperMap.ThemeStyle>} 图层中专题要素的样式
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
     * @param feat - {SuperMap.Feature.Vector} 矢量要素对象
     * @return {Array<SuperMap.ThemeStyle>} 专题要素的 Style
     */
    getStyleByData: function (feat) {
        var me = this,
            feature = feat,
            style = CommonUtil.copyAttributesWithClip({}, me.style);

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
				var isContianed = i === len-1 ? ((attribute >= groups[i].start) && (attribute <= groups[i].end)) : ((attribute >= groups[i].start) && (attribute < groups[i].end));
                if (isContianed) {
                    var sty1 = groups[i].style;
                    style = CommonUtil.copyAttributesWithClip(style, sty1);
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