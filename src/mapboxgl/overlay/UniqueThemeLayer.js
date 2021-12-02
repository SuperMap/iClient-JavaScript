/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { ShapeFactory } from '@supermap/iclient-common/overlay/feature/ShapeFactory';
import { ThemeVector as Vector } from '@supermap/iclient-common/overlay/ThemeVector';
import {GeoFeature} from './theme/GeoFeatureThemeLayer';

/**
 * @class UniqueThemeLayer
 * @category  Visualization Theme
 * @classdesc  单值专题图层。
 * @param {string} name - 图层名。
 * @param {Object} opt_options - 参数。
 * @param {string} opt_options.themeField - 指定创建专题图字段。
 * @param {Object} opt_options.style - 专题图样式。
 * @param {Object} opt_options.styleGroups - 各专题类型样式组。
 * @param {mapboxgl.Map} opt_options.map - 当前 mapboxgl map 对象。
 * @param {string} [opt_options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {boolean} [opt_options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {number} [opt_options.opacity=1] - 图层透明度。
 * @param {boolean} [opt_options.isHoverAble=false] - 是否开启 hover 事件。
 * @param {Object} [opt_options.highlightStyle] - 开启 hover 事件后，触发的样式风格。
 * @extends {GeoFeature}
 * @usage
 */
export class Unique extends GeoFeature {

    constructor(name, opt_options) {
        super(name, opt_options);
        this.themeField = opt_options.themeField;
        this.style = opt_options.style;
        this.styleGroups = opt_options.styleGroups;
        this.isHoverAble = opt_options.isHoverAble;
        this.highlightStyle = opt_options.highlightStyle;
    }

    /**
     * @private
     * @function UniqueThemeLayer.prototype.createThematicFeature
     * @description 创建专题图要素。
     * @param {Object} feature - 要创建的专题图形要素。
     */
    createThematicFeature(feature) {
        //赋 style
        var style = this.getStyleByData(feature);
        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = this.nodesClipPixel;
        options.isHoverAble = this.isHoverAble;
        options.isMultiHover = this.isMultiHover;
        options.isClickAble = this.isClickAble;
        options.highlightStyle = ShapeFactory.transformStyle(this.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new Vector(feature, this, ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    }

    /**
     * @private
     * @function UniqueThemeLayer.prototype.getStyleByData
     * @description 通过数据获取 style。
     * @param {Object} fea - 要素数据。
     */
    getStyleByData(fea) {
        var style = {};
        var feature = fea;
        style = CommonUtil.copyAttributesWithClip(style, this.style);
        if (this.themeField && this.styleGroups && this.styleGroups.length > 0 && feature.attributes) {
            var tf = this.themeField;
            var Attrs = feature.attributes;
            var Gro = this.styleGroups;
            var isSfInAttrs = false; //指定的 themeField 是否是 feature 的属性字段之一
            var attr = null; //属性值
            for (var property in Attrs) {
                if (tf === property) {
                    isSfInAttrs = true;
                    attr = Attrs[property];
                    break;
                }
            }
            //判断属性值是否属于styleGroups的某一个范围，以便对获取分组 style
            if (isSfInAttrs) {
                for (var i = 0, len = Gro.length; i < len; i++) {
                    if ((attr).toString() === ( Gro[i].value).toString()) {
                        //feature.style = CommonUtil.copyAttributes(feature.style, this.defaultStyle);
                        var sty1 = Gro[i].style;
                        style = CommonUtil.copyAttributesWithClip(style, sty1);
                    }
                }
            }
        }
        if (feature.style && this.isAllowFeatureStyle === true) {
            style = CommonUtil.copyAttributesWithClip(feature.style);
        }
        return style;
    }

}
