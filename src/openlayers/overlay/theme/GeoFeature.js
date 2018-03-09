import ol from 'openlayers';
import {Bounds, CommonUtil, ShapeFactory, ThemeVector as Vector} from '@supermap/iclient-common';
import {Theme} from './Theme';

/**
 * @class ol.source.GeoFeature
 * @classdesc 地理几何专题要素型专题图层基类。
 * @private
 * @param name - {string} 图层名称
 * @param opt_options -{Object} 参数。
 * @extends ol.source.Theme
 */

export class GeoFeature extends Theme {

    constructor(name, opt_options) {
        super(name, opt_options);
        this.cache = opt_options.cache || {};
        this.cacheFields = opt_options.cacheFields || [];
        this.style = opt_options.style || {};
        this.maxCacheCount = opt_options.maxCacheCount || 0;
        this.isCustomSetMaxCacheCount = opt_options.isCustomSetMaxCacheCount === undefined ? false : opt_options.isCustomSetMaxCacheCount;
        this.nodesClipPixel = opt_options.nodesClipPixel || 2;
        this.isHoverAble = opt_options.isHoverAble === undefined ? false : opt_options.isHoverAble;
        this.isMultiHover = opt_options.isMultiHover === undefined ? false : opt_options.isMultiHover;
        this.isClickAble = opt_options.isClickAble === undefined ? true : opt_options.isClickAble;
        this.highlightStyle = opt_options.highlightStyle || null;
        this.isAllowFeatureStyle = opt_options.isAllowFeatureStyle === undefined ? false : opt_options.isAllowFeatureStyle;
    }

    /**
     * @function ol.source.GeoFeature.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.maxCacheCount = null;
        this.isCustomSetMaxCacheCount = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;
        this.cache = null;
        this.cacheFields = null;
        this.style = null;
        this.highlightStyle = null;
        this.isAllowFeatureStyle = null;
    }

    /**
     * @function ol.source.GeoFeature.prototype.addFeatures
     * @description 添加要素
     * @param features - {Object} 要素对象
     */
    addFeatures(features) {
        this.dispatchEvent({type: 'beforefeaturesadded', value: {features: features}});
        //转换 features 形式
        this.features = this.toFeature(features);
        if (!this.isCustomSetMaxCacheCount) {
            this.maxCacheCount = this.features.length * 5;
        }
        //绘制专题要素
        if (this.renderer) {
            this.changed();
        }
    }

    /**
     * @function ol.source.GeoFeature.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param features - {Object} 要删除的要素对象
     */
    removeFeatures(features) { // eslint-disable-line no-unused-vars
        this.clearCache();
        Theme.prototype.removeFeatures.apply(this, arguments);
    }

    /**
     * @function ol.source.GeoFeature.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        this.clearCache();
        Theme.prototype.removeAllFeatures.apply(this, arguments);
    }

    /**
     * @function ol.source.GeoFeature.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     * @param extent -{Object} 视图范围数据
     */
    redrawThematicFeatures(extent) {
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
        var cmZoom = this.map.getView().getZoom();

        var maxCC = this.maxCacheCount;

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            if (!feature.geometry) {
                continue;
            }
            var feaBounds = feature.geometry.getBounds();

            //剔除当前视图（地理）范围以外的数据
            if (extent) {
                var bounds = new Bounds(extent[0], extent[1], extent[2], extent[3]);
                if (!bounds.intersectsBounds(feaBounds)) {
                    continue;
                }
            }

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
     * @function ol.source.GeoFeature.prototype.createThematicFeature
     * @description 创建专题要素
     * @param feature - {Object} 要素对象
     */
    createThematicFeature(feature) {
        var style = CommonUtil.copyAttributesWithClip(this.style);
        if (feature.style && this.isAllowFeatureStyle === true) {
            style = CommonUtil.copyAttributesWithClip(feature.style);
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

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return Theme.prototype.canvasFunctionInternal_.apply(this, arguments);
    }

    /**
     * @function ol.source.GeoFeature.prototype.clearCache
     * @description 清除缓存
     */
    clearCache() {
        this.cache = {};
        this.cacheFields = [];
    }

    /**
     * @function ol.source.GeoFeature.prototype.clear
     * @description  清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear() {
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    }

    /**
     * @function ol.source.GeoFeature.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @return {Number} 返回当前缓存数量。
     */
    getCacheCount() {
        return this.cacheFields.length;
    }

    /**
     * @function ol.source.GeoFeature.prototype.setMaxCacheCount
     * @param cacheCount -{number} 缓存总数
     * @description 设置最大缓存条数
     */
    setMaxCacheCount(cacheCount) {
        if (!isNaN(cacheCount)) {
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    }

    /**
     * @function ol.source.GeoFeature.prototype.setMaxCacheCount
     * @param featureID -{number} 要素ID。
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

ol.source.GeoFeature = GeoFeature;