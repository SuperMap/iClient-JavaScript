import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import {CommonUtil as Util, ThemeVector as Vector, ShapeFactory} from '@supermap/iclient-common';
import {Theme} from './ThemeLayer';

/**
 * @class mapboxgl.supermap.GeoFeatureThemeLayer
 * @classdesc 地理几何专题要素型专题图层。
 * @private
 * @param name - {string} 图层名
 * @param opt_options - {Object} 参数。
 * @extends mapboxgl.supermap.ThemeLayer
 */

export class GeoFeature extends Theme {

    constructor(name, opt_options) {
        super(name, opt_options);
        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.name -{string}
         * @description 专题图图层名称
         */
        this.name = null;
        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.style -{SuperMap.ThemeStyle}
         * @description 专题图图层全局样式
         */
        this.style = null;

        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.highlightStyle -{SuperMap.ThemeStyle}
         * @description 专题图图层高亮样式
         */
        this.highlightStyle = null;

        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.nodesClipPixel -{number}
         * @description 节点抽稀像素距离，默认值 2。
         */
        this.nodesClipPixel = 2;

        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.isHoverAble -{boolean}
         * @description 图形是否在 hover 时高亮 ，默认值：false。
         */
        this.isHoverAble = false;
        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.isMultiHover -{boolean}
         * @description 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。
         */
        this.isMultiHover = false;
        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.isClickAble -{boolean}
         * @description  图形是否可点击，默认 true
         */
        this.isClickAble = true;

        /**
         * @member mapboxgl.supermap.GeoFeatureThemeLayer.prototype.isAllowFeatureStyle -{boolean}
         * @description  是否允许 feature 样式（style） 中的有效属性应用到专题图层。<br>
         *               默认值为： false，禁止对专题要素使用数据（feature）的 style。此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素
         *               的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
         */
        this.isAllowFeatureStyle = false;
        Util.extend(this, opt_options);
        this.cache = opt_options.cache || {};
        this.cacheFields = opt_options.cacheFields || [];
        this.maxCacheCount = opt_options.maxCacheCount || 0;
        this.isCustomSetMaxCacheCount = opt_options.isCustomSetMaxCacheCount === undefined ? false : opt_options.isCustomSetMaxCacheCount;

    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.addFeatures
     * @description 添加要素
     * @param features - {mapboxgl.supermap.ThemeFeature|SuperMap.ServerFeature} 要素对象
     */
    addFeatures(features) {
        mapboxgl.Evented.prototype.fire('beforefeaturesadded', {features: features});
        //转换 features 形式
        this.features = this.toFeature(features);

        if (!this.isCustomSetMaxCacheCount) {
            this.maxCacheCount = this.features.length * 5;
        }
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param features - {Object} 要删除的要素对象
     */
    removeFeatures(features) { // eslint-disable-line no-unused-vars
        this.clearCache();
        Theme.prototype.removeFeatures.apply(this, arguments);
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        this.clearCache();
        Theme.prototype.removeAllFeatures.apply(this, arguments);
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     * @param extent - {mapboxgl.LngLatBounds} 重绘的范围。
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
            //     var bounds = new SuperMap.Bounds(extent.getWest(), extent.getSouth(), extent.getEast(), extent.getNorth());
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
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param feature - {SuperMap.Feature.Vector} 要素对象。
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
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.clearCache
     * @description 清除缓存。
     */
    clearCache() {
        this.cache = {};
        this.cacheFields = [];
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.clear
     * @description  清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear() {
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @return {number} 当前缓存数量。
     */
    getCacheCount() {
        return this.cacheFields.length;
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param cacheCount - {number} 缓存总数
     * @description 设置最大缓存条数。
     */
    setMaxCacheCount(cacheCount) {
        if (!isNaN(cacheCount)) {
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    }

    /**
     * @function mapboxgl.supermap.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param featureID - {number} 要素ID。
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
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

mapboxgl.supermap.GeoFeatureThemeLayer = GeoFeature;