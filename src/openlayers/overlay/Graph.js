import ol from 'openlayers';
import {CommonUtil, Bounds, LonLat, FeatureTheme} from '@supermap/iclient-common';
import {Theme} from './theme/Theme';

/**
 * @class ol.source.Graph
 * @category  Visualization Theme
 * @classdesc 统计专题图图层基类。
 * @param chartsType -{string} 图表类别
 * @param name - {string} 图层名称
 * @param opt_options - {Object} 参数。如：<br>
 *        id - {string} 专题图层ID。</br>
 *        map - {ol.Map} 当前map对象。</br>
 *        opacity - {number} 图层透明的。</br>
 *        attributions - {string|Object} 版权信息。 </br>
 *        logo - {string} Logo</br>
 *        projection - [{ol.proj.Projection}]{@linkdoc-openlayers/ol.proj.Projection} 投影信息。</br>
 *        ratio - {number} 视图比, 1表示画布是地图视口的大小，2表示地图视口的宽度和高度的两倍，依此类推。 必须是1或更高。 默认值是1.5。</br>
 *        resolutions - {Array} 分辨率数组。</br>
 *        themeFields - {string} 指定创建专题图字段。 <br>
 *        isOverLay - {boolean} 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表,默认值：true。<br>
 *        chartsType - {string}图表类型。目前可用："Bar", "Line", "Pie"。
 *        state - {[ol.source.html#.State]}{@linkdoc-openlayers/ol.source.html#.State} 资源状态。<br>
 *        symbolSetting - {Object} 符号 Circle 配置对象 symbolSetting（<SuperMap.Layer.RankSymbol::setting>） 可设属性如下：
 *  * Symbolizer properties:
 *  * codomain - {Array{number}} 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
 *  * maxR - {number} 圆形的最大半径。
 *  * minR - {number} 圆形的最小半径。
 *  * fillColor - {String} 圆形的填充色，如：fillColor: "#FFB980"。
 *  * circleStyle - {Object} 圆形的基础 style，此参数控制圆形基础样式，优先级低于 circleStyleByFields 和 circleStyleByCodomain。
 *  * decimalNumber - {number} 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 *  * circleHoverStyle - {Object} 圆 形 hover 状态时的样式，circleHoverAble 为 true 时有效。
 *  * circleHoverAble - {Object} 是否允许圆形使用 hover 状态，默认允许。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 *  * circleClickAble - {Object} 是否允许圆形被点击，默认允许。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 * @extends ol.source.Theme
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
     * @function ol.source.Graph.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.chartsType = null;
        this.chartsSetting = null;
        this.themeFields = null;
        this.overlayWeightField = null;
        this.isOverLay = null;
        Theme.prototype.destroy.apply(this, arguments);
        // charts  cache 为缓存，需要在父类destory后置为null（父类destory中有方法会初始化缓存参数）
        this.charts = null;
        this.cache = null;
    }

    /**
     * @function ol.source.Graph.prototype.setChartsType
     * @description 设置图表类型，此函数可动态改变图表类型。在调用此函数前请通过 chartsSetting 为新类型的图表做相关配置。
     * @param chartsType - {string} 图表类型。目前可用："Bar", "Line", "Pie"。
     */
    setChartsType(chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    }

    /**
     * @function ol.source.Graph.prototype.addFeatures
     * @description 向专题图图层中添加数据, 支持的feature类型为:iServer返回的feature json对象 或L.supermap.themeFeature类型
     * @param features - {Object} 待填加得要素
     */
    addFeatures(features) {
        var ret = this.dispatchEvent({type: 'beforefeaturesadded', value: {features: features}});
        if (ret === false) {
            return;
        }
        //转换 features 形式
        this.features = this.toFeature(features);
        //绘制专题要素
        if (this.renderer) {
            this.changed();
        }
    }

    /**
     * @function ol.source.Graph.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param extent - {Object} 重绘的范围
     *
     */
    redrawThematicFeatures(extent) {
        //清除当前所有可视元素
        this.renderer.clearAll();
        var features = this.features;
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // 要素范围判断
            var feaBounds = feature.geometry.getBounds();
            //剔除当前视图（地理）范围以外的数据
            if (extent) {
                var bounds = new Bounds(extent[0], extent[1], extent[2], extent[3]);
                if (!bounds.intersectsBounds(feaBounds)) {
                    continue;
                }
            }
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
     * @function ol.source.Graph.prototype.createThematicFeature
     * @description  向专题图图层中添加数据, 支持的feature类型为:iServer返回的feature json对象
     * @param feature - {Object} 待填加得要素
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
     * @function ol.source.Graph.prototype.drawCharts
     * @description 绘制图表。包含压盖处理。
     *
     */
    drawCharts() {
        // 判断 rendere r就绪
        if (!this.renderer) {
            return;
        }
        var charts = this.charts;
        // 图表权重值处理
        if (this.overlayWeightField) {
            charts.sort(function (cs, ce) {
                if (typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) == "undefined") {
                    return 0;
                } else if (typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) == "undefined") {
                    return -1;
                } else if (typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) != "undefined") {
                    return 1;
                } else if (typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) != "undefined") {
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
            var extent = this.map.getView().calculateExtent();
            var mapBounds = new Bounds(extent[0], extent[1], extent[2], extent[3]);
            if (mapBounds) {
                // 获取地图像素 bounds
                var mapPxLT = this.getLocalXY(new LonLat(mapBounds.left, mapBounds.top));
                var mapPxRB = this.getLocalXY(new LonLat(mapBounds.right, mapBounds.bottom));
                var mBounds = new Bounds(mapPxLT[0], mapPxRB[1], mapPxRB[0], mapPxLT[1]);
                // 压盖处理 & 添加图形
                for (var i = 0, len = charts.length; i < len; i++) {
                    var chart = charts[i];
                    // 图形参考位置  (reSetLocation 会更新 chartBounds)
                    var shapeROP = chart.resetLocation();
                    // 图表框
                    var cbs = chart.chartBounds;
                    var cBounds = [{"x": cbs.left, "y": cbs.top}, {"x": cbs.left, "y": cbs.bottom}, {
                        "x": cbs.right,
                        "y": cbs.bottom
                    }, {"x": cbs.right, "y": cbs.top}, {"x": cbs.left, "y": cbs.top}];
                    // 地图范围外不绘制
                    if (mBounds) {
                        if (!this.isChartInMap(mBounds, cBounds)) {
                            continue;
                        }
                    }
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
        }
        // 绘制图形
        this.renderer.render();
    }

    /**
     * @function ol.source.Graph.prototype.getShapesByFeatureID
     * @description  通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param featureID - {number} 要素ID。
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
     * @function ol.source.Graph.prototype.isQuadrilateralOverLap
     * @description  判断两个四边形是否有压盖。
     * @param quadrilateral - {Array<Object>} 四边形节点数组。
     * @param quadrilateral2 - {Array<Object>} 第二个四边形节点数组。
     */
    isQuadrilateralOverLap(quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) {
            return null;
        }//不是四边形

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
     * @function ol.source.Graph.prototype.isPointInPoly
     * @description  判断一个点是否在多边形里面。(射线法)
     * @param pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * @param poly - {Array<Object>} 多边形节点数组。
     */
    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (isIn = !isIn);
        }
        return isIn;
    }

    /**
     * @function ol.source.Graph.prototype.isChartInMap
     * @description  判断图表是否在地图里。
     * @param mapPxBounds - {SuperMap.Bounds} 地图像素范围。
     * @param chartPxBounds - {Array<Object>} 图表范围的四边形节点数组。
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
     * @function ol.source.Graph.prototype.clearCache
     * @description  清除缓存
     */
    clearCache() {
        this.cache = {};
        this.charts = [];
    }

    /**
     * @function ol.source.Graph.prototype.removeFeatures
     * @description  从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature
     * @param features - {Object} 要删除的要素
     */
    removeFeatures(features) {
        this.clearCache();
        super.removeFeatures(features);
    }

    /**
     * @function ol.source.Graph.prototype.removeAllFeatures
     * @description  移除所有的要素
     */
    removeAllFeatures() {
        this.clearCache();
        super.removeAllFeatures();
    }

    /**
     * @function ol.source.Graph.prototype.redraw
     * @description  重绘该图层
     */
    redraw() {
        this.clearCache();
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getView().calculateExtent());
            return true;
        }
        return false
    }

    /**
     * @function ol.source.Graph.prototype.clear
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

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return Theme.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

ol.source.Graph = Graph;