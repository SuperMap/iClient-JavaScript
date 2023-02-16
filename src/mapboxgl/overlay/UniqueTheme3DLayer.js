/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {Theme3DLayer} from './theme/Theme3DLayer';

/**
 * @class UniqueTheme3DLayer
 * @category  Visualization Theme
 * @classdesc 三维单值专题图。
 * @param {string} [id] - 专题图图层 ID。默认使用 CommonUtil.createUniqueID("theme3DLayer") 创建专题图层 ID。
 * @param {Object} layerOptions - 专题图图层配置项，参数继承自 Theme3DLayer。
 * @param {number} [layerOptions.height] - 新增参数，如果数据指定的 heightField (默认为 height )没有可以表示高度的字段，可以为所有数据统一设置一个高度。
 * @param {Array} layerOptions.colorStops - 新增参数，数据颜色分段数组。
 * @usage
 */
export class UniqueTheme3DLayer extends Theme3DLayer {


    constructor(id, layerOptions) {
        super(id, layerOptions);
        /**
         * @member {Array} UniqueTheme3DLayer.prototype.colorStops
         * @description 数据颜色数组，如[["绿地","#CD7054"],["道路","#AD1283"]]。
         */
        this.colorStops = null;
        this._extend(this, layerOptions);
    }

    /**
     * @function  UniqueTheme3DLayer.prototype.getLayerStyleOptions
     * @description 获取图层样式。
     * @returns {Object} Mapbox GL 样式对象。
     */
    getLayerStyleOptions() {
        var opacity = this.opacity == null ? 1 : this.opacity;
        opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
        var options = {
            'fill-extrusion-color': {
                'stops': this.colorStops,
                'property': this.themeField,
                'type': 'categorical'
            },
            'fill-extrusion-opacity': opacity
        };

        if (this.height != null) {
            options['fill-extrusion-height'] = this.height;
        } else {
            options['fill-extrusion-height'] = {
                'property': this.heightField || 'height',
                'type': 'categorical'
            };
        }

        if (this.baseHeightField) {
            options['fill-extrusion-base'] = {
                'property': this.baseHeightField,
                'type': 'identity'
            }
        }
        return options;
    }

    /**
     * @function UniqueTheme3DLayer.prototype.getHighlightStyleOptions
     * @description 获取高亮样式。
     * @returns {Object} Mapbox GL 样式对象。
     */
    getHighlightStyleOptions() {
        var color = (this.highlight && this.highlight.color != null) ? this.highlight.color : '#ADA91E';
        var paint = {
            'fill-extrusion-color': color,
            'fill-extrusion-height': {
                "stops": this.heightStops,
                "property": this.heightField,
                'type': 'categorical'
            },
            'fill-extrusion-opacity': this.highlight && this.highlight.opacity || 0.6
        };
        if (this.height != null) {
            paint['fill-extrusion-height'] = this.height || 0;
        }
        return paint;
    }

    _createLegendElement() {
        var legendListElement = "<ul>";
        var len = this.colorStops && this.colorStops.length || 0;
        for (var i = 0; i < len; i++) {
            var text = this.colorStops[i][0];
            var color = this.colorStops[i][1];
            legendListElement += "<li><span style='background-color:" + color + ";'></span><span>" + text + "</span></li>";
        }
        legendListElement += "</ul>";
        return legendListElement;
    }
}
