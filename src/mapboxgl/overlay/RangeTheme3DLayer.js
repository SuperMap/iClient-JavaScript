/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {Theme3DLayer} from './theme/Theme3DLayer';

/**
 * @class RangeTheme3DLayer
 * @category  Visualization Theme
 * @classdesc 三维分段专题图图层类。分段专题图是指按照某种分段方式被分成多个范围段，要素根据各自的专题值被分配到其中一个范围段中，
 * 在同一个范围段中的要素使用相同的颜色，填充，符号等风格进行显示。 分段专题图所基于的专题变量必须为数值型，
 * 分段专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
 * @modulecategory Overlay
 * @param  {string} [id] - 专题图图层 ID。默认使用 CommonUtil.createUniqueID("theme3DLayer") 创建专题图层 ID。
 * @param  {Object} layerOptions - 专题图图层配置项，参数继承自 Theme3DLayer。
 * @param  {Array} [layerOptions.heightStops] - 新增参数，数据高度分段数组。
 * @param  {Array} layerOptions.colorStops - 新增参数，数据颜色分段数组。
 * @param  {number} [layerOptions.base] - 新增参数，数据分段线性增量。
 * @param  {number} [layerOptions.legendRatio=1] - 新增参数，图例数值扩大系数。
 * @example
 * new RangeTheme3DLayer(layerId, map, {
 *      enableHighlight:true,
 *      // 设置分段
 *      heightField: "floor",
 *      heightStops: [[1, 10], [10, 100]],
 *      colorStops: [[0, 'rgba(33, 41, 52, 0.8)'], [20, 'rgba(69,117,180, 0.7)'], [50, 'rgba(116,173,209, 0.7)'], [100, 'rgba(171,217,233, 0.7)']],
 *      // 显示图例
 *      showLegend: true,
 *      legendTheme: 'dark',
 *      legendTitle: "图例"
 * });
 * @usage
 */
export class RangeTheme3DLayer extends Theme3DLayer {

    constructor(id, layerOptions) {
        super(id, layerOptions);
        /**
         * @member  {Array} RangeTheme3DLayer.prototype.heightStops
         * @description 数据高度分段数组。
         */
        this.heightStops = null;

        /**
         * @member  {Array} RangeTheme3DLayer.prototype.colorStops
         * @description 数据颜色分段数组。
         */
        this.colorStops = null;
        /**
         * @member  {number} RangeTheme3DLayer.prototype.base
         * @description 数据分段线性增量。
         */
        this.base = null;

        /**
         * @member  {number} [RangeTheme3DLayer.prototype.legendRatio=1]
         * @description 图例数值扩大系数。
         */
        this.legendRatio = 1;

        this._extend(this, layerOptions);
    }

    /**
     * @function RangeTheme3DLayer.prototype.getLayerStyleOptions
     * @description 获取图层样式。
     * @returns {Object} Mapbox GL 样式对象。
     */
    getLayerStyleOptions() {
        var opacity = this.opacity == null ? 1 : this.opacity;
        opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
        var reg = /^[0-9]+.?[0-9]*$/;
        var options = {
            'fill-extrusion-color': {
                'stops': this.colorStops,
                'property': this.themeField || this.heightField,
                'type': 'interval',
                'base': reg.test(this.base) ? this.base : 1
            },
            'fill-extrusion-opacity': opacity
        };
        if (this.heightStops) {
            options['fill-extrusion-height'] = {
                'stops': this.heightStops,
                'property': this.heightField || 'height',
                'base': reg.test(this.base) ? this.base : 1
            }
        } else if (this.height) {
            options['fill-extrusion-height'] = this.height;
        } else {
            options['fill-extrusion-height'] = {
                'property': this.heightField || 'height',
                'type': 'identity'
            }
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
     * @function RangeTheme3DLayer.prototype.getHighlightStyleOptions
     * @description 获取高亮样式。
     * @returns {Object} mapboxgl 样式对象。
     */
    getHighlightStyleOptions() {
        var color = (this.highlight && this.highlight.color != null) ? this.highlight.color : '#ADA91E';
        return {
            'fill-extrusion-color': color,
            'fill-extrusion-height': {
                "stops": this.heightStops,
                "property": this.heightField
            },
            'fill-extrusion-opacity': this.highlight && this.highlight.opacity || 0.6
        }
    }

    _createLegendElement() {
        var len = this.colorStops && this.colorStops.length || 0;
        //颜色分段对应标识
        var legendListElement = "<ul>";
        var i;
        for (i = 0; i < len; i++) {
            var value = this.colorStops[i][0];
            var text = this._getWrapperText(value);
            if (i === len - 1) {
                text = "> " + text;
            } else {
                var next = this._getWrapperText(this.colorStops[i + 1][0]);
                text = text + "-" + next;
            }

            var color = this.colorStops[i][1];

            legendListElement += "<li><span style='background-color:" + color + ";'></span><span>" + text + "</span></li>";
        }
        legendListElement += "</ul>";
        return legendListElement;
    }

    _getWrapperText(number) {
        var value = number * ((this.legendRatio == null) ? 1 : parseFloat(this.legendRatio));

        //单个颜色值宽度为60px,最大只能完全显示1000000，否则就超出宽度，则显示以为k计数单位的值
        var num = parseFloat(value);
        if (num % 1000000 <= 1000000) {
            return num.toString();
        }
        return parseInt(num / 1000) + 'k'
    }

}
