import mapboxgl from 'mapbox-gl';
import SuperMap from '../../common/SuperMap';
import GeoFeature from './theme/GeoFeatureThemeLayer';
import ServerFeature from '../../common/iServer/ServerFeature';
import Vector from '../../common/overlay/ThemeVector';

/**
 * @class mapboxgl.supermap.RangeThemeLayer
 * @classdesc 分段专题图层。
 * @param name - {string} 图层名。
 * @param options -{Object} 参数。
 * @extends mapboxgl.supermap.GeoFeatureThemeLayer
 */
export default class Range extends GeoFeature {

    constructor(name, opt_options) {
        super(name, opt_options);
        this.style = opt_options.style;
        this.isHoverAble = opt_options.isHoverAble;
        this.highlightStyle = opt_options.highlightStyle;
        this.themeField = opt_options.themeField;
        this.styleGroups = opt_options.styleGroups;
    }

    /**
     * @private
     * @function mapboxgl.supermap.RangeThemeLayer.prototype.createThematicFeature
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
        options.highlightStyle = SuperMap.Feature.ShapeFactory.transformStyle(this.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new Vector(feature, this, SuperMap.Feature.ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    }

    /**
     * @private
     * @function mapboxgl.supermap.RangeThemeLayer.prototype.getStyleByData
     * @description 通过数据获取style
     * @param fea -{Object} 要素数据
     */
    getStyleByData(fea) {
        var style = {};
        var feature = fea;
        style = SuperMap.Util.copyAttributesWithClip(style, this.style);
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
                        style = SuperMap.Util.copyAttributesWithClip(style, sty1);
                    }
                }
            }
        }
        if (feature.style && this.isAllowFeatureStyle === true) {
            style = SuperMap.Util.copyAttributesWithClip(feature.style);
        }
        return style;
    }

}

mapboxgl.supermap.RangeThemeLayer = Range;