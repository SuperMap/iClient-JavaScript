/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { Theme as FeatureTheme } from "@supermap/iclient-common/overlay/feature/Theme";
import {
    Theme
} from './theme/ThemeLayer';

/**
 * @class GraphThemeLayer
 * @category  Visualization Theme
 * @classdesc 统计专题图层。
 * @param {string} name - 图层名。
 * @param {string} chartsType - 图表类别。
 * @param {Object} opt_options - 参数。
 * @param {string} [opt_options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {boolean} [opt_options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {mapboxgl.Map} opt_options.map - 当前mapboxgl map对象。
 * @param {number} [opt_options.opacity=1] - 图层透明度。
 * @param {string} opt_options.themeFields - 指定创建专题图字段。
 * @param {boolean} [opt_options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @param {string} [opt_options.chartsType] - 图表类型。目前可用："Bar", "Line", "Pie"。
 * @param {Object} opt_options.chartsSetting - 符号 Circle 配置对象。
 * @param {Array.<number>} opt_options.chartsSetting.codomain - 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @param {number} [opt_options.chartsSetting.maxR] - 圆形的最大半径。
 * @param {number} [opt_options.chartsSetting.minR] - 圆形的最小半径。
 * @param {string} opt_options.chartsSetting.fillColor - 圆形的填充色，如：fillColor: "#FFB980"。
 * @param {Object} opt_options.chartsSetting.circleStyle - 圆形的基础 style，此参数控制圆形基础样式，优先级低于 circleStyleByFields 和 circleStyleByCodomain。
 * @param {number} opt_options.chartsSetting.decimalNumber - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @param {Object} opt_options.chartsSetting.circleHoverStyle - 圆形 hover 状态时的样式，circleHoverAble 为 true 时有效。
 * @param {boolean} [opt_options.chartsSetting.circleHoverAble=true] - 是否允许圆形使用 hover 状态。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 * @param {boolean} [opt_options.chartsSetting.circleClickAble=true] - 是否允许圆形被点击。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 * @extends {ThemeLayer}
 * @fires Graph#beforefeaturesadded
 * @usage
 */
export class Graph extends Theme {

    constructor(name, chartsType, opt_options) {
        super(name, opt_options);
        this.chartsSetting = opt_options.chartsSetting || {};
        this.themeFields = opt_options.themeFields || null;
        this.overlayWeightField = opt_options.overlayWeightField || null;
        this.isOverLay = opt_options.isOverLay === undefined ? true : opt_options.isOverLay;
        this.charts = opt_options.charts || [];
        this.cache = opt_options.cache || {};
        this.chartsType = chartsType;
    }

    /**
     * @function Graph.prototype.setChartsType
     * @description 设置图表类型，此函数可动态改变图表类型。在调用此函数前请通过 chartsSetting 为新类型的图表做相关配置。
     * @param {string} [chartsType] - 图表类型。目前可用："Bar", "Line", "Pie"。
     */
    setChartsType(chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    }

    /**
     * @function Graph.prototype.addFeatures
     * @description 向专题图图层中添加数据，支持的 feature 类型为：iServer 返回的 feature JSON 对象。
     * @param {ServerFeature} features - 待添加的要素。
     */
    addFeatures(features) {
        /**
         * @event Graph#beforefeaturesadded
         * @description 要素添加之前触发。
         * @property {ServerFeature} features - 要被添加的要素。
         */
        var ret = mapboxgl.Evented.prototype.fire('beforefeaturesadded', {
            features: features
        });
        if (ret === false) {
            return;
        }
        //转换 features 形式
        this.features = this.toiClientFeature(features);
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function Graph.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param {mapboxgl.LngLatBounds} extent - 重绘的范围。
     */
    redrawThematicFeatures(extent) { // eslint-disable-line no-unused-vars
        this.clearCache();
        //清除当前所有可视元素
        this.renderer.clearAll();
        var features = this.features;
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // // 要素范围判断
            // var feaBounds = feature.geometry.getBounds();
            // //剔除当前视图（地理）范围以外的数据
            // if (extent) {
            //     var bounds = new Bounds(extent.getWest(), extent.getSouth(), extent.getEast(), extent.getNorth());
            //     // if (!bounds.intersectsBounds(feaBounds)) continue;
            // }
            var cache = this.cache;
            // 用 feature id 做缓存标识
            var cacheField = feature.id;
            // 数据对应的图表是否已缓存，没缓存则重新创建图表
            if (cache[cacheField]) {
                continue;
            }
            cache[cacheField] = cacheField;
            var chart = this.createThematicFeature(feature);
            // 压盖处理权重值
            if (chart && this.overlayWeightField) {
                if (feature.attributes[this.overlayWeightField] && !isNaN(feature.attributes[this.overlayWeightField])) {
                    chart["__overlayWeight"] = feature.attributes[this.overlayWeightField];
                }
            }
            if (chart) {
                this.charts.push(chart);
            }
        }
        this.drawCharts();
    }

    /**
     * @function Graph.prototype.createThematicFeature
     * @description  向专题图图层中添加数据, 支持的 feature 类型为:iServer 返回的 feature json 对象。
     * @param {Object} feature - 待添加的要素。
     *
     */
    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图表创建条件并创建图形
        if (FeatureTheme[this.chartsType] && this.themeFields && this.chartsSetting) {
            thematicFeature = new FeatureTheme[this.chartsType](feature, this, this.themeFields, this.chartsSetting);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

    /**
     * @function Graph.prototype.drawCharts
     * @description 绘制图表。包含压盖处理。
     *
     */
    drawCharts() {
        // 判断 rendere r就绪
        if (!this.renderer) {
            return;
        }
        var charts = this.charts;
        // 图表权重值处理des
        if (this.overlayWeightField) {
            charts.sort(function (cs, ce) {
                if (typeof (cs["__overlayWeight"]) == "undefined" && typeof (ce["__overlayWeight"]) == "undefined") {
                    return 0;
                } else if (typeof (cs["__overlayWeight"]) != "undefined" && typeof (ce["__overlayWeight"]) == "undefined") {
                    return -1;
                } else if (typeof (cs["__overlayWeight"]) == "undefined" && typeof (ce["__overlayWeight"]) != "undefined") {
                    return 1;
                } else if (typeof (cs["__overlayWeight"]) != "undefined" && typeof (ce["__overlayWeight"]) != "undefined") {
                    if (parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                return 0;
            });
        }
        // 不进行避让
        if (!this.isOverLay) {
            for (var m = 0, len_m = charts.length; m < len_m; m++) {
                var chart_m = charts[m];
                // 图形参考位置  (reSetLocation 会更新 chartBounds)
                var shapeROP_m = chart_m.resetLocation();
                // 添加图形
                var shapes_m = chart_m.shapes;
                for (var n = 0, slen_n = shapes_m.length; n < slen_n; n++) {
                    shapes_m[n].refOriginalPosition = shapeROP_m;
                    this.renderer.addShape(shapes_m[n]);
                }
            }
        } else {
            // 压盖判断所需 chartsBounds 集合
            var chartsBounds = [];
            //var extent = this.map.getBounds();
            //var mapBounds = new Bounds(extent.getWest(), extent.getSouth(), extent.getEast(), extent.getNorth());
            // 获取地图像素 bounds
            //var mapPxLT = this.getLocalXY(new LonLat(mapBounds.left, mapBounds.top));
            //var mapPxRB = this.getLocalXY(new LonLat(mapBounds.right, mapBounds.bottom));
            //var mBounds = new Bounds(mapPxLT[0], mapPxRB[1], mapPxRB[0], mapPxLT[1]);
            // 压盖处理 & 添加图形
            for (let i = 0, len = charts.length; i < len; i++) {
                var chart = charts[i];
                // 图形参考位置  (reSetLocation 会更新 chartBounds)
                var shapeROP = chart.resetLocation();
                // 图表框
                var cbs = chart.chartBounds;
                var cBounds = [{
                    "x": cbs.left,
                    "y": cbs.top
                }, {
                    "x": cbs.left,
                    "y": cbs.bottom
                }, {
                    "x": cbs.right,
                    "y": cbs.bottom
                }, {
                    "x": cbs.right,
                    "y": cbs.top
                }, {
                    "x": cbs.left,
                    "y": cbs.top
                }];
                // // 地图范围外不绘制
                // if (mBounds) {
                //     // if (!this.isChartInMap(mBounds, cBounds)) continue;
                // }
                // 是否压盖
                var isOL = false;
                if (i !== 0) {
                    for (let j = 0; j < chartsBounds.length; j++) {
                        //压盖判断
                        if (this.isQuadrilateralOverLap(cBounds, chartsBounds[j])) {
                            isOL = true;
                            break;
                        }
                    }
                }
                if (isOL) {
                    continue;
                } else {
                    chartsBounds.push(cBounds);
                }
                // 添加图形
                var shapes = chart.shapes;
                for (let j = 0, slen = shapes.length; j < slen; j++) {
                    shapes[j].refOriginalPosition = shapeROP;
                    this.renderer.addShape(shapes[j]);
                }
            }
        }
        // 绘制图形
        this.renderer.render();
    }

    /**
     * @function Graph.prototype.getShapesByFeatureID
     * @description  通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param {number} featureID - 要素 ID。
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

    /**
     * @function Graph.prototype.isQuadrilateralOverLap
     * @description  判断两个四边形是否有压盖。
     * @param {Array.<Object>} quadrilateral - 四边形节点数组。
     * @param {Array.<Object>} quadrilateral2 - 第二个四边形节点数组。
     */
    isQuadrilateralOverLap(quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) {
            return null;
        } //不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for (let i = 0; i < quadLen; i++) {
            if (this.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quad2Len; i++) {
            if (this.isPointInPoly(quadrilateral2[i], quadrilateral)) {
                OverLap = true;
                break;
            }
        }
        //加上两矩形十字相交的情况
        for (let i = 0; i < quadLen - 1; i++) {
            if (OverLap) {
                break;
            }
            for (let j = 0; j < quad2Len - 1; j++) {
                var isLineIn = CommonUtil.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "SuperMap.Geometry.Point") {
                    OverLap = true;
                    break;
                }
            }
        }
        return OverLap;
    }

    /**
     * @function Graph.prototype.isPointInPoly
     * @description  判断一个点是否在多边形里面。(射线法)
     * @param {Object} pt - 需要判定的点对象，该对象含有属性 x (横坐标)，属性 y (纵坐标)。
     * @param {Array.<Object>} poly - 多边形节点数组。
     */
    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
            (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) &&
            (isIn = !isIn);
        }
        return isIn;
    }

    /**
     * @function Graph.prototype.isChartInMap
     * @description  判断图表是否在地图里。
     * @param {Bounds} mapPxBounds - 地图像素范围。
     * @param {Array.<Object>} chartPxBounds - 图表范围的四边形节点数组。
     */
    isChartInMap(mapPxBounds, chartPxBounds) {
        var mb = mapPxBounds;
        var isIn = false;
        for (var i = 0, len = chartPxBounds.length; i < len; i++) {
            var cb = chartPxBounds[i];

            if (cb.x >= mb.left && cb.x <= mb.right && cb.y >= mb.top && cb.y <= mb.bottom) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }

    /**
     * @function Graph.prototype.clearCache
     * @description  清除缓存
     */
    clearCache() {
        this.cache = {};
        this.charts = [];
    }

    /**
     * @function Graph.prototype.removeFeatures
     * @description  从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature。
     * @param {Feature.Vector} features - 要删除的要素。
     */
    removeFeatures(features) {
        this.clearCache();
        super.removeFeatures(features);
    }

    /**
     * @function Graph.prototype.removeAllFeatures
     * @description  移除所有的要素。
     */
    removeAllFeatures() {
        this.clearCache();
        super.removeAllFeatures();
    }

    /**
     * @function Graph.prototype.redraw
     * @description  重绘该图层。
     */
    redraw() {
        this.clearCache();
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
            return true;
        }
        return false
    }

    /**
     * @function Graph.prototype.clear
     * @description  清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear() {
        if (this.renderer) {
            this.renderer.clearAll();
            this.renderer.refresh();
        }
        this.removeAllFeatures();
        this.clearCache();
    }
}
