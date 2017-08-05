import '../../../common/REST';
import '../../../common/iServer/Bar';
import '../../../common/iServer/Bar3D';
import '../../../common/iServer/Circle';
import '../../../common/iServer/Pie';
import '../../../common/iServer/Point';
import '../../../common/iServer/Line';
import '../../../common/iServer/Ring';
import '../../../common/iServer/ThemeVector';
import '../../../common/style/ThemeStyle';
import SuperMap from '../../../common/SuperMap';
import Theme from './theme';

export default class Graph extends Theme {

    constructor(name, chartsType, opt_options) {
        super(name, opt_options);
        this.chartsSetting = {};
        this.themeFields = null;
        this.overlayWeightField = null;
        this.isOverLay = true;
        this.charts = [];
        this.cache = {};
        this.chartsType = chartsType;
    }

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

    setChartsType(chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    }

    addFeatures(features) {
        //数组
        if (!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        var event = {features: features};
        var ret = this.dispatchEvent({type: 'beforefeaturesadded', value: event});
        if (ret === false) {
            return;
        }
        features = event.features;
        var featuresFailAdded = [];
        for (var i = 0, len = features.length; i < len; i++) {
            this.features.push(this.toiClientFeature(features[i]));
        }
        var succeed = featuresFailAdded.length == 0 ? true : false;
        this.dispatchEvent({type: 'featuresadded', value: {features: featuresFailAdded, succeed: succeed}});
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getView().calculateExtent());
        }
    }

    redrawThematicFeatures(extent, zoomChanged, dragging) {
        //清除当前所有可视元素
        this.renderer.clearAll();
        var features = this.features;
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // 要素范围判断
            var feaBounds = feature.geometry.getBounds();
            //剔除当前视图（地理）范围以外的数据
            if (extent) {
                var bounds = new SuperMap.Bounds(extent[0], extent[1], extent[2], extent[3]);
                if (!bounds.intersectsBounds(feaBounds)) continue;
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

    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图表创建条件并创建图形
        if (SuperMap.Feature.Theme[this.chartsType] && this.themeFields && this.chartsSetting) {
            thematicFeature = new SuperMap.Feature.Theme[this.chartsType](feature, this, this.themeFields, this.chartsSetting);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) return false;
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

    drawCharts() {
        // 判断 rendere r就绪
        if (!this.renderer) return;
        var charts = this.charts;
        // 图表权重值处理
        if (this.overlayWeightField) {
            charts.sort(function (cs, ce) {
                if (typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) == "undefined") {
                    return 0;
                }
                else if (typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) == "undefined") {
                    return -1;
                }
                else if (typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) != "undefined") {
                    return 1;
                }
                else if (typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) != "undefined") {
                    if (parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
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
        }
        else {
            // 压盖判断所需 chartsBounds 集合
            var chartsBounds = [];
            var extent = this.map.getView().calculateExtent();
            var mapBounds = new SuperMap.Bounds(extent[0], extent[1], extent[2], extent[3]);
            if (mapBounds) {
                // 获取地图像素 bounds
                var mapPxLT = this.getLocalXY(new SuperMap.LonLat(mapBounds.left, mapBounds.top));
                var mapPxRB = this.getLocalXY(new SuperMap.LonLat(mapBounds.right, mapBounds.bottom));
                var mBounds = new SuperMap.Bounds(mapPxLT[0], mapPxRB[1], mapPxRB[0], mapPxLT[1]);
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
                        if (!this.isChartInMap(mBounds, cBounds)) continue;
                    }
                    // 是否压盖
                    var isOL = false;
                    if (i !== 0) {
                        for (var j = 0; j < chartsBounds.length; j++) {
                            //压盖判断
                            if (this.isQuadrilateralOverLap(cBounds, chartsBounds[j])) {
                                isOL = true;
                                break;
                            }
                        }
                    }
                    if (isOL) {
                        continue;
                    }
                    else {
                        chartsBounds.push(cBounds);
                    }
                    // 添加图形
                    var shapes = chart.shapes;
                    for (var j = 0, slen = shapes.length; j < slen; j++) {
                        shapes[j].refOriginalPosition = shapeROP;
                        this.renderer.addShape(shapes[j]);
                    }
                }
            }
        }
        // 绘制图形
        this.renderer.render();
    }

    getShapesByFeatureID = function (featureID) {
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

    isQuadrilateralOverLap(quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) return null;//不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for (var i = 0; i < quadLen; i++) {
            if (this.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (var i = 0; i < quad2Len; i++) {
            if (this.isPointInPoly(quadrilateral2[i], quadrilateral)) {
                OverLap = true;
                break;
            }
        }
        //加上两矩形十字相交的情况
        for (var i = 0; i < quadLen - 1; i++) {
            if (OverLap) {
                break;
            }
            for (var j = 0; j < quad2Len - 1; j++) {
                var isLineIn = SuperMap.Util.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "SuperMap.Geometry.Point") {
                    OverLap = true;
                    break;
                }
            }
        }
        return OverLap;
    }

    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (isIn = !isIn);
        return isIn;
    }

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

    clearCache() {
        this.cache = {};
        this.charts = [];
    }

    removeFeatures(features) {
        this.clearCache();
        SuperMap.Layer.Theme.prototype.removeFeatures.apply(this, arguments);
    }

    removeAllFeatures() {
        this.clearCache();
        SuperMap.Layer.Theme.prototype.removeAllFeatures.apply(this, arguments);
    }

    redraw() {
        this.clearCache();
        return SuperMap.Layer.Theme.prototype.redraw.apply(this, arguments);
    }

    clear() {
        if (this.renderer) {
            this.renderer.clearAll();
            this.renderer.refresh();
        }
        this.removeAllFeatures();
        this.clearCache();
    }

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
        return Theme.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}
ol.source.Graph = Graph;