/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @param {string} name - 图层名
 * @param {Object} options - 图层参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {boolean} [options.alwaysMapCRS=false] - 要素坐标是否和地图坐标系一致，要素默认是经纬度坐标。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 * @param {Array} [options.TFEvents] - 专题要素事件临时存储。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] - 图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {boolean} [options.isAllowFeatureStyle=false] - 是否允许 feature 样式（style） 中的有效属性应用到专题图层。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 *                                        禁止对专题要素使用数据（feature）的 style。
 *                                        此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
 *                                        的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。                             
 */
export var RangeThemeLayer = GeoFeatureThemeLayer.extend({
    
    /** 
     * @member {Object} L.supermap.rangeThemeLayer.prototype.style
     * @description 专题图样式。
     */
    
     /** 
     * @member {Object} L.supermap.rangeThemeLayer.prototype.styleGroups
     * @description 各专题类型样式组。
     */

    /** 
     * @member {Object} L.supermap.rangeThemeLayer.prototype.highlightStyle
     * @description 开启 hover 事件后，触发的样式风格。
     */

    initialize: function (name, options) {
        GeoFeatureThemeLayer.prototype.initialize.call(this, name, options);
        //{Array.<SuperMap.ThemeStyle>} 图层中专题要素的样式
        this.style = [];
        //{string} 用于指定专题要素样式的属性字段名称。
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
     * @description 根据用户数据（feature）设置专题要素的 Style。
     * @param {SuperMap.Feature.Vector} feat - 矢量要素对象。
     * @returns {Array.<SuperMap.ThemeStyle>} 专题要素的 Style。
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
        if (isSfInAttributes) {
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