import ol from 'openlayers';
import {ShapeFactory, CommonUtil, ThemeVector} from '@supermap/iclient-common';
import {GeoFeature} from './theme/GeoFeature';

/**
 * @class ol.source.Range
 * @category  Visualization Theme
 * @classdesc 分段专题图图层源。
 * @param name - {string} 名称
 * @param opt_options -{Object} 参数，如：<br>
 *        id - {string} 专题图层ID。</br>
 *        map - {mapboxgl.Map} 当前mapboxgl map对象。</br>
 *        opacity - {number} 图层透明的。</br>
 *        attributions - {string|Object} 版权信息。 </br>
 *        logo - {string} Logo</br>
 *        projection - [{ol.proj.Projection}]{@linkdoc-openlayers/ol.proj.Projection} 投影信息。</br>
 *        ratio - {number} 视图比, 1表示画布是地图视口的大小，2表示地图视口的宽度和高度的两倍，依此类推。 必须是1或更高。 默认值是1.5。</br>
 *        resolutions - {Array} 分辨率数组。</br>
 *        state - {[ol.source.html#.State]}{@linkdoc-openlayers/ol.source.html#.State} 资源状态。<br>
 *        themeField - {string}  指定创建专题图字段。<br>
 *        style - {Object} 专题图样式。<br>
 *        styleGroups - {Object} 各专题类型样式组。<br>
 *        isHoverAble - {boolean} 是否开启hover事件。<br>
 *        highlightStyle - {Object} 开启hover事件后，触发的样式风格。
 * @extends ol.source.GeoFeature
 */
export class Range extends GeoFeature {

    constructor(name, opt_options) {
        super(name, opt_options);
        this.style = opt_options.style;
        this.isHoverAble = opt_options.isHoverAble;
        this.highlightStyle = opt_options.highlightStyle;
        this.themeField = opt_options.themeField;
        this.styleGroups = opt_options.styleGroups;
    }

    /**
     * @function ol.source.Range.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.style = null;
        this.themeField = null;
        this.styleGroups = null;
        GeoFeature.prototype.destroy.apply(this, arguments);
    }

    /**
     * @private
     * @function ol.source.Range.prototype.createThematicFeature
     * @description 创建专题图要素
     * @param feature -{Object} 要创建的专题图形要素
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

        //将数据转为专题要素（ThemeVector）
        var thematicFeature = new ThemeVector(feature, this, ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    }

    /**
     * @private
     * @function ol.source.Range.prototype.getStyleByData
     * @description 通过数据获取style
     * @param fea -{Object} 要素数据
     */
    getStyleByData(fea) {
        var style = {};
        var feature = fea;
        style = CommonUtil.copyAttributesWithClip(style, this.style);
        if (this.themeField && this.styleGroups && this.styleGroups.length > 0 && feature.attributes) {
            var Sf = this.themeField;
            var Attrs = feature.attributes;
            var Gro = this.styleGroups;
            var isSfInAttrs = false; //指定的 themeField 是否是 feature 的属性字段之一
            var attr = null; //属性值

            for (var property in Attrs) {
                if (Sf === property) {
                    isSfInAttrs = true;
                    attr = Attrs[property];
                    break;
                }
            }
            //判断属性值是否属于styleGroups的某一个范围，以便对获取分组 style
            if (isSfInAttrs) {
                for (var i = 0, len = Gro.length; i < len; i++) {
                    if ((attr >= Gro[i].start) && (attr < Gro[i].end)) {
                        //feature.style = SuperMap.Util.copyAttributes(feature.style, this.defaultStyle);
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

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return GeoFeature.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

ol.source.Range = Range;