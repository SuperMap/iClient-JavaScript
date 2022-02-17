/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import '../core/Base';
 import { GeoFeatureThemeLayer } from './theme/GeoFeatureThemeLayer';
 import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
/**
 * @class UniqueThemeLayer
 * @deprecatedclassinstance L.supermap.uniqueThemeLayer
 * @category Visualization Theme
 * @classdesc 客户端单值专题图。单值专题图是利用不同的颜色或符号（线型、填充）表示图层中某一属性信息的不同属性值，属性值相同的要素具有相同的渲染风格。
 * 比如土壤类型分布图、土地利用图、行政区划图等。单值专题图着重表示现象质的差别，一般不表示数量的特征。
 * @extends GeoFeatureThemeLayer
 * @param {string} name - 专题图层名。
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {boolean} [options.alwaysMapCRS=false] - 要素坐标是否和地图坐标系一致，要素默认是经纬度坐标。
 * @param {Array} [options.TFEvents] - 专题要素事件临时存储。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] - 图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权描述信息。
 * @param {boolean} [options.isAllowFeatureStyle=false] - 是否允许 feature 的 style 中的有效属性应用到专题图层。
 *                                        此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
 *                                        的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 * @usage
 */
export var UniqueThemeLayer = GeoFeatureThemeLayer.extend({

    
    /** 
     * @member {Object} UniqueThemeLayer.prototype.style
     * @description 专题图样式。
     */
    
     /** 
     * @member {Object} UniqueThemeLayer.prototype.styleGroups
     * @description 各专题类型样式组。
     */

    /** 
     * @member {Object} UniqueThemeLayer.prototype.highlightStyle
     * @description 开启 hover 事件后，触发的样式风格。
     */

    initialize: function (name, options) {
        GeoFeatureThemeLayer.prototype.initialize.call(this, name, options);
        //{Array.<ThemeStyle>} 图层中专题要素的样式
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
     * @private
     * @function UniqueThemeLayer.prototype.getStyleByData
     * @description 根据用户数据（feature）设置专题要素的 Style。
     * @param {FeatureVector} feat - 用户要素数据。
     * @returns {Array.<ThemeStyle>} 返回包含专题要素 style 的对象。
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
            var tf = me.themeField,
                attributes = feature.attributes;
            for (var property in attributes) {
                if (tf !== property) {
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
                if ((attribute).toString() === ( groups[i].value).toString()) {
                    var sty1 = groups[i].style;
                    style = CommonUtil.copyAttributesWithClip(style, sty1);
                }

            }
        }
        return style;
    }
});

export var uniqueThemeLayer = function (name, options) {
    return new UniqueThemeLayer(name, options);
};
