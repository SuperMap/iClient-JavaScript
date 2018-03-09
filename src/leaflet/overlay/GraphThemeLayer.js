import L from "leaflet";
import '../core/Base';
import {Bounds, LonLat, CommonUtil, FeatureTheme} from '@supermap/iclient-common';
import {ThemeLayer} from './theme/ThemeLayer';
import {CommontypesConversion} from '../core/CommontypesConversion';

/**
 * @class L.supermap.graphThemeLayer
 * @classdesc 统计专题图图层。
 * @category Visualization Theme
 * @extends L.supermap.ThemeLayer
 * @description 统计专题图通过为每个要素绘制统计图表来反映其对应的专题值的大小。它可同时表示多个字段属性信息，在区域本身与各区域之间形成横向和纵向的对比。<br>
 *              统计专题图多用于具有相关数量特征的地图上，比如表示不同地区多年的粮食产量、GDP、人口等，不同时段客运量、地铁流量等。
 *              目前提供的统计图类型有：柱状图（Bar），折线图（Line），饼图（Pie），三维柱状图（Bar3D），点状图（Point），环状图（Ring）。
 * @param name - {string} 专题图表名称
 * @param chartsType - {string} 图表类型。目前可用："Bar", "Bar3D", "Line","Point","Pie","Ring"。
 * @param options - {Object} 待设置得参数。如：<br>
 *        isOverLay - {boolean} 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表,默认值：true。<br>
 *        chartsType :图表类型。目前可用："Bar", "Line", "Pie"。<br>
 *        chartsSetting:各类型图表的 chartsSetting 对象可设属性请参考具体图表模型类的注释中对 chartsSetting 对象可设属性的描述。<br>
 *  * chartsSetting 对象通常都具有以下 5 个基础可设属性
 *  * width - {number}专题要素（图表）宽度，必设参数。
 *  * height - {number}专题要素（图表）高度，必设参数。
 *  * codomain - {Array<number>} 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限，必设参数。
 *  * XOffset - {Number}  专题要素（图表）在 X 方向上的偏移值，单位像素。
 *  * YOffset - {Number}  专题要素（图表）在 Y 方向上的偏移值，单位像素。
 *  * dataViewBoxParameter - {Array{Number}} 数据视图框 dataViewBox 参数，
 *      它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 *  * decimalNumber - {number}数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。
 *      如果不设置此参数，在取数据值时不对数据做小数位处理。
 */
export var GraphThemeLayer = ThemeLayer.extend({

    options: {
        //是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表,默认值：true。
        isOverLay: true
    },

    initialize: function (name, chartsType, options) {
        var newArgs = [];
        newArgs.push(name);
        newArgs.push(options);
        ThemeLayer.prototype.initialize.apply(this, newArgs);
        this.chartsType = chartsType;
        this.themeFields = options && options.themeFields ? options.themeFields : null;
        this.charts = options && options.charts ? options.charts : [];
        this.cache = options && options.cache ? options.cache : {};
        this.chartsSetting = options && options.chartsSetting ? options.chartsSetting : {};
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.setChartsType
     * @description 设置图表类型，此函数可动态改变图表类型。在调用此函数前请通过 chartsSetting 为新类型的图表做相关配置。图表类型，目前支持："Bar", "Bar3D", "Line","Point","Pie","Ring"。
     * @param chartsType  - {string} 图表类型。目前可用："Bar", "Bar3D", "Line","Point","Pie","Ring"。
     */
    setChartsType: function (chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据, 支持的feature类型为:iServer返回的feature json对象 或L.supermap.themeFeature类型
     * @param features - {L.features} 待添加得要素
     */
    addFeatures: function (features) {
        var me = this;
        me.fire("beforefeaturesadded", {features: features});

        //转换 features 形式
        this.features = this.toFeature(features);

        //绘制专题要素
        if (!me.renderer) {
            return;
        }

        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }

    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素 此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，压盖处理，缓存等步骤。地图漫游时调用此方法进行图层刷新。
     * @param bounds - {L.bounds} 重绘得范围
     */
    redrawThematicFeatures: function (bounds) {
        var me = this;
        //清除当前所有可视元素
        me.renderer.clearAll();
        var features = me.features;
        if (this.options.alwaysMapCRS && bounds && bounds instanceof L.LatLngBounds) {
            var crs = this._map.options.crs;
            bounds = L.bounds(crs.project(bounds.getSouthWest()), crs.project(bounds.getNorthEast()));
        }
        bounds = CommontypesConversion.toSuperMapBounds(bounds);
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // 要素范围判断
            var feaBounds = feature.geometry.getBounds();
            //剔除当前视图（地理）范围以外的数据
            if (bounds && !bounds.intersectsBounds(feaBounds)) {
                continue;
            }
            var cache = me.cache;
            // 用feature id 做缓存标识
            var cacheField = feature.id;
            // 数据对应的图表是否已缓存，没缓存则重新创建图表
            if (!cache[cacheField]) {
                cache[cacheField] = cacheField;
                var chart = me.createThematicFeature(feature);
                // 压盖处理权重值
                var isValidOverlayWeightField = me.overlayWeightField
                    && feature.attributes[me.overlayWeightField]
                    && !isNaN(feature.attributes[me.overlayWeightField]);
                if (chart && isValidOverlayWeightField) {
                    chart["__overlayWeight"] = feature.attributes[me.overlayWeightField];
                }

                if (chart) {
                    me.charts.push(chart);
                }
            }
        }

        me.drawCharts();
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素（图表）
     * @param feature - {L.features} 待创建得要素
     */
    createThematicFeature: function (feature) {
        var me = this;
        var thematicFeature;
        // 检查图表创建条件并创建图形
        if (FeatureTheme[me.chartsType] && me.themeFields && me.chartsSetting) {
            thematicFeature = new FeatureTheme[me.chartsType](feature, me, me.themeFields, me.chartsSetting);
        }

        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.drawCharts
     * @description 绘制图表。包含压盖处理。
     */
    drawCharts: function () {
        var me = this;
        if (!me.renderer) {
            return;
        }

        // 图表权重值处理
        if (me.overlayWeightField) {
            me._sortChart();
        }

        if (me.options && !me.options.isOverLay) {
            // 不进行避让
            me._addOverlayShape();
        } else {
            //进行避让
            me._addNoOverlayShape();
        }
        // 绘制图形
        me.renderer.render();
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.getShapesByFeatureID
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param featureID - {number}要素ID
     */
    getShapesByFeatureID: function (featureID) {
        var me = this, list = [];
        var shapeList = me.renderer.getAllShapes();

        if (!featureID) {
            return shapeList;
        }

        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.isQuadrilateralOverLap
     * @description 判断两个四边形是否有压盖。
     * @param quadrilateral - {Array<Object>} 四边形节点数组。
     * @example
     * [{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}];
     * @param quadrilateral2 - {Array<Object>}  第二个四边形节点数组。
     */
    isQuadrilateralOverLap: function (quadrilateral, quadrilateral2) {
        var me = this;
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) {
            return null;
        }//不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for (var i = 0; i < quadLen; i++) {
            if (me.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quad2Len; i++) {
            if (me.isPointInPoly(quadrilateral2[i], quadrilateral)) {
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
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.isPointInPoly
     * @description 判断一个点是否在多边形里面。(射线法)
     * @param pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * @param poly - {Array<Object>}  多边形节点数组。<br>
     *        例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     */
    isPointInPoly: function (pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (isIn = !isIn);
        }
        return isIn;
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.isChartInMap
     * @description 判断图表是否在地图里。
     * @param mapPxBounds - {SuperMap.Bounds} 地图像素范围。
     * @param chartPxBounds - {Array<Object>} 图表范围的四边形节点数组。<br>
     *        例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    isChartInMap: function (mapPxBounds, chartPxBounds) {
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
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.clearCache
     * @description 清除缓存数据。
     */
    clearCache: function () {
        this.cache = {};
        this.charts = [];
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素（数据）。
     * @param features - {L.features} 待删除得要输
     */
    removeFeatures: function (features) { // eslint-disable-line no-unused-vars
        var me = this;
        me.clearCache();
        ThemeLayer.prototype.removeFeatures.apply(me, arguments);
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        var me = this;
        me.clearCache();
        ThemeLayer.prototype.removeAllFeatures.apply(me, arguments);
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.redraw
     * @description 重绘该图层，成功则返回true，否则返回false。
     */
    redraw: function () {
        var me = this;
        me.clearCache();
        return ThemeLayer.prototype.redraw.apply(me, arguments);
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.clear
     * @description 清除图层。清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear: function () {
        var me = this;
        if (me.renderer) {
            me.renderer.clearAll();
            me.renderer.refresh();
        }
        me.removeAllFeatures();
        me.clearCache();
    },

    /**
     * @function L.supermap.GraphThemeLayer.prototype.getWeightFieldValue
     * @description 获取权重字段的值。
     * @param feature - {SuperMap.Feature.Vector} 矢量要素。
     * @param weightField - {Array<string>} 字段名数组。
     * @param defaultValue - {number}当通过 weightField 获取不到权重值时，使用 defaultValue 作为权重值。
     */
    getWeightFieldValue: function (feature, weightField, defaultValue) {
        if (typeof(defaultValue) === "undefined" || isNaN(defaultValue)) {
            defaultValue = 0;
        }
        if (!feature.attributes) {
            return defaultValue;
        }

        var fieldValue = feature.attributes[weightField];

        if (typeof(fieldValue) === "undefined" || isNaN(fieldValue)) {
            fieldValue = defaultValue
        }

        return fieldValue;
    },

    _sortChart: function () {
        var me = this;
        if (!me.charts) {
            return;
        }
        me.charts.sort(function (cs, ce) {
            if (typeof(cs["__overlayWeight"]) === "undefined" && typeof(ce["__overlayWeight"]) === "undefined") {
                return 0;
            } else if (typeof(cs["__overlayWeight"]) !== "undefined" && typeof(ce["__overlayWeight"]) === "undefined") {
                return -1;
            } else if (typeof(cs["__overlayWeight"]) === "undefined" && typeof(ce["__overlayWeight"]) !== "undefined") {
                return 1;
            } else if (typeof(cs["__overlayWeight"]) !== "undefined" && typeof(ce["__overlayWeight"]) !== "undefined") {
                return (parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])) ? 1 : -1;
            }
            return 0;
        });
    },

    _addOverlayShape: function () {
        var me = this;
        var charts = me.charts;
        for (var m = 0, len_m = charts.length; m < len_m; m++) {
            var chart_m = charts[m];

            // 图形参考位置  (reSetLocation 会更新 chartBounds)
            var shapeROP_m = chart_m.resetLocation();

            // 添加图形
            var shapes_m = chart_m.shapes;
            for (var n = 0, slen_n = shapes_m.length; n < slen_n; n++) {
                shapes_m[n].refOriginalPosition = shapeROP_m;
                me.renderer.addShape(shapes_m[n]);
            }
        }
    },
    _addNoOverlayShape: function () {
        var me = this;
        // 压盖判断所需 chartsBounds 集合
        var mapBounds = me._map.getBounds();
        var crs = this._map.options.crs;
        if (this.options.alwaysMapCRS) {
            mapBounds = L.bounds(crs.project(mapBounds.getSouthWest()), crs.project(mapBounds.getNorthEast()));
        }
        mapBounds = CommontypesConversion.toSuperMapBounds(mapBounds);
        var charts = me.charts;
        var chartsBounds = [];
        // 获取地图像素 bounds
        var mapPxLT = me.getLocalXY(new LonLat(mapBounds.left, mapBounds.top));
        var mapPxRB = me.getLocalXY(new LonLat(mapBounds.right, mapBounds.bottom));
        var mBounds = new Bounds(mapPxLT[0], mapPxRB[1], mapPxRB[0], mapPxLT[1]);

        // 压盖处理 & 添加图形
        for (var i = 0, len = charts.length; i < len; i++) {
            var chart = charts[i];
            // 图形参考位置  (reSetLocation 会更新 chartBounds)
            var shapeROP = chart.resetLocation();
            // 图表框
            var cbs = chart.chartBounds;
            var cBounds = [
                {"x": cbs.left, "y": cbs.top},
                {"x": cbs.left, "y": cbs.bottom},
                {"x": cbs.right, "y": cbs.bottom},
                {"x": cbs.right, "y": cbs.top},
                {"x": cbs.left, "y": cbs.top}
            ];
            // 地图范围外不绘制
            if (mBounds && !me.isChartInMap(mBounds, cBounds)) {
                continue;
            }
            // 是否压盖
            var isOverlay = false;

            for (let j = 0; j < chartsBounds.length; j++) {
                //压盖判断
                if (me.isQuadrilateralOverLap(cBounds, chartsBounds[j])) {
                    isOverlay = true;
                    break;
                }
            }

            if (isOverlay) {
                continue;
            } else {
                chartsBounds.push(cBounds);
            }

            // 添加图形
            var shapes = chart.shapes;
            for (let j = 0, slen = shapes.length; j < slen; j++) {
                shapes[j].refOriginalPosition = shapeROP;
                me.renderer.addShape(shapes[j]);
            }
        }
    }

});
export var graphThemeLayer = function (name, chartsType, options) {
    return new GraphThemeLayer(name, chartsType, options);
};

L.supermap.graphThemeLayer = graphThemeLayer;