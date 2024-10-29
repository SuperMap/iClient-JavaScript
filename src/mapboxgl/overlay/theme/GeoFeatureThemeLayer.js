/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import { Util } from '@supermapgis/iclient-common/commontypes/Util';
import { ShapeFactory } from '@supermapgis/iclient-common/overlay/feature/ShapeFactory';
import { ThemeVector as Vector } from '@supermapgis/iclient-common/overlay/ThemeVector';
import {Theme} from './ThemeLayer';

/**
 * @class GeoFeatureThemeLayer
 * @category Visualization Theme
 * @modulecategory Overlay
 * @classdesc 地理几何专题要素型专题图层类。
 * @param {string} name - 图层名。
 * @param {Object} options - 参数。
 * @param {mapboxgl.Map} options.map - MapBoxGL Map 对象。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] - 图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {boolean} [options.isAllowFeatureStyle=false] -  是否允许 feature 样式（style） 中的有效属性应用到专题图层。
 *                                        禁止对专题要素使用数据（feature）的 style。
 *                                        此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @extends {ThemeLayer}
 * @fires GeoFeatureThemeLayer#beforefeaturesadded
 * @usage
 */

export class GeoFeature extends Theme {

    constructor(name, options) {
        super(name, options);
        /**
         * @member {string} GeoFeatureThemeLayer.prototype.name
         * @description 专题图图层名称。
         */
        this.name = null;
        /**
         * @member {ThemeStyle} GeoFeatureThemeLayer.prototype.style
         * @description 专题图图层全局样式。
         */
        this.style = null;

        /**
         * @member {ThemeStyle} GeoFeatureThemeLayer.prototype.highlightStyle
         * @description 专题图图层高亮样式。
         */
        this.highlightStyle = null;

        /**
         * @member {number} [GeoFeatureThemeLayer.prototype.nodesClipPixel=2]
         * @description 节点抽稀像素距离。
         */
        this.nodesClipPixel = 2;

        /**
         * @member {boolean} [GeoFeatureThemeLayer.prototype.isHoverAble=false]
         * @description 图形是否在 hover 时高亮。
         */
        this.isHoverAble = false;
        /**
         * @member {boolean} [GeoFeatureThemeLayer.prototype.isMultiHover=false]
         * @description 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
         */
        this.isMultiHover = false;
        /**
         * @member {boolean} [GeoFeatureThemeLayer.prototype.isClickAble=true]
         * @description  图形是否可点击。
         */
        this.isClickAble = true;

        /**
         * @member {boolean} [GeoFeatureThemeLayer.prototype.isAllowFeatureStyle=false]
         * @description  是否允许 feature 样式（style） 中的有效属性应用到专题图层。</br>
         *               禁止对专题要素使用数据（feature）的 style。此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
         */
        this.isAllowFeatureStyle = false;
        Util.extend(this, options);
        this.cache = options.cache || {};
        this.cacheFields = options.cacheFields || [];
        this.maxCacheCount = options.maxCacheCount || 0;
        this.isCustomSetMaxCacheCount = options.isCustomSetMaxCacheCount === undefined ? false : options.isCustomSetMaxCacheCount;

    }

    /**
     * @function GeoFeatureThemeLayer.prototype.addFeatures
     * @description 添加要素。
     * @param {ThemeFeature|ServerFeature} features - 要素对象。
     */
    addFeatures(features) {
        /**
         * @event GeoFeatureThemeLayer#beforefeaturesadded
         * @description 要素添加之前触发。
         * @property {ThemeFeature|ServerFeature} features - 被添加的要素。
         */
        mapboxgl.Evented.prototype.fire('beforefeaturesadded', {features: features});
        //转换 features 形式
        this.features = this.toiClientFeature(features);

        if (!this.isCustomSetMaxCacheCount) {
            this.maxCacheCount = this.features.length * 5;
        }
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param {(FeatureVector|Function)} features - 要删除的要素对象或用于过滤的回调函数。
     */
    removeFeatures(features) {
        this.clearCache();
        Theme.prototype.removeFeatures.call(this, features);
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        this.clearCache();
        Theme.prototype.removeAllFeatures.apply(this, arguments);
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     * @param {mapboxgl.LngLatBounds} extent - 重绘的范围。
     */
    redrawThematicFeatures(extent) { // eslint-disable-line no-unused-vars
        this.clearCache();
        //获取高亮专题要素对应的用户 id
        var hoverone = this.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
        }
        //清除当前所有可视元素
        this.renderer.clearAll();

        var features = this.features;
        var cache = this.cache;
        var cacheFields = this.cacheFields;
        var cmZoom = this.map.getZoom();

        var maxCC = this.maxCacheCount;

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // var feaBounds = feature.geometry.getBounds();
            //
            // //剔除当前视图（地理）范围以外的数据
            // if (extent) {
            //     var bounds = new Bounds(extent.getWest(), extent.getSouth(), extent.getEast(), extent.getNorth());
            //     // if (!bounds.intersectsBounds(feaBounds)) continue;
            // }

            //缓存字段
            var fields = feature.id + "_zoom_" + cmZoom.toString();

            var thematicFeature;

            //判断专题要素缓存是否存在
            if (cache[fields]) {
                cache[fields].updateAndAddShapes();
            } else {
                //如果专题要素缓存不存在，创建专题要素
                thematicFeature = this.createThematicFeature(features[i]);

                //检查 thematicFeature 是否有可视化图形
                if (thematicFeature.getShapesCount() < 1) {
                    continue;
                }

                //加入缓存
                cache[fields] = thematicFeature;
                cacheFields.push(fields);

                //缓存数量限制
                if (cacheFields.length > maxCC) {
                    var fieldsTemp = cacheFields[0];
                    cacheFields.splice(0, 1);
                    delete cache[fieldsTemp];
                }
            }

        }
        this.renderer.render();

        //地图漫游后，重新高亮图形
        if (hoverFid && this.isHoverAble && this.isMultiHover) {
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param {FeatureVector} feature - 要素对象。
     * @returns {Array.<FeatureVector>} 返回矢量要素。
     */
    createThematicFeature(feature) {
        var style = Util.copyAttributesWithClip(this.style);
        if (feature.style && this.isAllowFeatureStyle === true) {
            style = Util.copyAttributesWithClip(feature.style);
        }
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
     * @function GeoFeatureThemeLayer.prototype.clearCache
     * @description 清除缓存。
     */
    clearCache() {
        this.cache = {};
        this.cacheFields = [];
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.clear
     * @description  清除的内容包括数据（features）、专题要素和缓存。
     */
    clear() {
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @returns {number} 当前缓存数量。
     */
    getCacheCount() {
        return this.cacheFields.length;
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param {number} [cacheCount] - 缓存总数。
     * @description 设置最大缓存条数。
     */
    setMaxCacheCount(cacheCount) {
        if (!isNaN(cacheCount)) {
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    }

    /**
     * @function GeoFeatureThemeLayer.prototype.getShapesByFeatureID
     * @param {number} [featureID=si.refDataID] - 要素 ID。
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @returns {Array} 返回图形数组。
     */
    getShapesByFeatureID(featureID) {
        var list = [];
        var shapeList = this.renderer.getAllShapes();
        if (!featureID) {
            return shapeList
        }
        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    }

}
