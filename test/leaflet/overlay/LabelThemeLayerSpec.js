import {labelThemeLayer} from '../../../src/leaflet/overlay/LabelThemeLayer';
import {themeFeature} from '../../../src/leaflet/overlay/theme/ThemeFeature';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {ThemeStyle} from '../../../src/common/style/ThemeStyle';
import {Bounds} from '../../../src/common/commonTypes/Bounds';
import '../../resources/themeLabelData';

var url = GlobeParameter.China4326URL;
var themeLayer;
var addThemeFeatures = () => {
    var labelFeatures = [];
    var feat;
    for (var i = 0; i < themeData.length; i++) {
        var lonlat = themeData[i].lonLat.split(",");
        var lng = parseFloat(lonlat[0]);
        var lat = parseFloat(lonlat[1]);
        var text = themeData[i].aqi;
        feat = themeFeature([lat, lng, text], themeData[i]);
        labelFeatures.push(feat);
    }
    themeLayer.addFeatures(labelFeatures);
}

describe('leaflet_LabelThemeLayer', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "400px";
        window.document.body.appendChild(testDiv);
        map = L.map("map", {
            crs: L.CRS.EPSG4326,
            center: [35, 106],
            maxZoom: 18,
            zoom: 3
        });
        tiledMapLayer(url).addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        themeLayer = labelThemeLayer("ThemeLayer").addTo(map);
        themeLayer.style = new ThemeStyle({
            labelRect: true,
            fontColor: "#000000",
            fontWeight: "bolder",
            fontSize: "10px",
            fill: true,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            stroke: false,
            strokeColor: "#8B7B8B"
        });
        themeLayer.themeField = "aqi";
        themeLayer.styleGroups = [
            {
                start: 0,
                end: 51,
                style: {
                    fillColor: "#6ACD06",
                    fontSize: "8px"
                }
            }, {
                start: 51,
                end: 101,
                style: {
                    fillColor: "#FBD12A",
                    fontSize: "10px"
                }
            }, {
                start: 101,
                end: 151,
                style: {
                    fillColor: "#FE8800",
                    fontSize: "10px"
                }
            }, {
                start: 151,
                end: 201,
                style: {
                    fillColor: "#FF0000",
                    fontSize: "10px"
                }
            }, {
                start: 201,
                end: 301,
                style: {
                    fillColor: "#CC0000",
                    fontSize: "10px"
                }
            }, {
                start: 301,
                end: 601,
                style: {
                    fillColor: "#960453",
                    fontSize: "10px"
                }
            }
        ];
        addThemeFeatures();
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        themeLayer = null;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize', () => {
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.themeField).toEqual("aqi");
        expect(themeLayer.defaultStyle).not.toBeNull();
        expect(themeLayer.defaultStyle.strokeColor).toEqual("#ee9900");
        var style = themeLayer.style;
        expect(style).not.toBeNull();
        expect(style.labelRect).toBeTruthy();
        expect(style.fontWeight).toEqual("bolder");
        expect(style.strokeColor).toEqual("#8B7B8B");
        expect(themeLayer.styleGroups.length).toEqual(6);
    });

    it('redrawThematicFeatures', () => {
        var bounds = L.bounds([-180, -90], [180, 90]);
        themeLayer.redrawThematicFeatures(bounds);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.themeField).toEqual("aqi");
        expect(themeLayer.defaultStyle).not.toBeNull();
        expect(themeLayer.defaultStyle.strokeColor).toEqual("#ee9900");
        var style = themeLayer.style;
        expect(style).not.toBeNull();
        expect(style.labelRect).toBeTruthy();
        expect(style.fontWeight).toEqual("bolder");
        expect(style.strokeColor).toEqual("#8B7B8B");
        expect(themeLayer.styleGroups.length).toEqual(6);
    });

    //获取经（压盖）处理后将要绘制在图层上的标签要素,原参数数据往右上方避让
    it('getDrawnLabels', () => {
        var labelFeatures = themeLayer.labelFeatures;
        labelFeatures[0].style.minZoomLevel = 0;
        var feas = themeLayer.getDrawnLabels(labelFeatures);
        expect(feas).not.toBeNull();
        expect(feas.length).toBeGreaterThan(0);
        for (var i = 0; i < feas.length; i++) {
            expect(feas[i].id).not.toBeNull();
            expect(feas[i].CLASS_NAME).toEqual("SuperMap.Feature.Vector");
            expect(feas[i].attributes).not.toBeNull();
            expect(feas[i].geometry).not.toBeNull();
            expect(feas[i].geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
            expect(feas[i].geometry.bounds).not.toBeNull();
            expect(feas[i].style).not.toBeNull();
            expect(feas[i].id).not.toBeNull();
        }
    });

    // 根据用户数据（feature）设置专题要素的 Style
    it('getStyleByData', () => {
        var feat = themeLayer.labelFeatures[0];
        var themeStyle = themeLayer.getStyleByData(feat);
        expect(themeStyle).not.toBeNull();
        expect(themeStyle.fillColor).toEqual("#6ACD06");
        expect(themeStyle.fontSize).toEqual("12px");
        expect(themeStyle.fontColor).toEqual("#000000");
    });

    // 设置标签要素的Style
    it('setLabelsStyle', () => {
        var labelFeatures = themeLayer.labelFeatures;
        labelFeatures[0].geometry.bsInfo.w = 40;
        labelFeatures[0].geometry.bsInfo.w = 30;
        var labelFeas = themeLayer.setLabelsStyle(labelFeatures);
        expect(labelFeas).not.toBeNull();
        expect(labelFeas.length).toBeGreaterThan(0);
        for (var i = 0; i < labelFeas.length; i++) {
            expect(labelFeas[i].id).not.toBeNull();
            expect(labelFeas[i].style).not.toBeNull();
        }
    });

    //设置标签要素的Style
    it('setStyle', () => {
        var feat = themeLayer.labelFeatures[0];
        themeLayer.groupField = "aqi";
        var feature = themeLayer.setStyle(feat);
        expect(feature).not.toBeNull();
        expect(feature.id).toContain("SuperMap.Feature_");
        expect(feature.data.area).toEqual("山南");
        expect(feature.style).not.toBeNull();
        expect(feature.style.fillColor).toEqual("#6ACD06");
        expect(feature.style.strokeColor).toEqual("#8B7B8B");
    });

    //获取标签要素的像素坐标
    it('getLabelPxLocation', () => {
        var feature = themeLayer.labelFeatures[0];
        feature.style.labelXOffset = 1;
        feature.style.labelYOffset = 1;
        var location = themeLayer.getLabelPxLocation(feature);
        expect(location).not.toBeNull();
        expect(location.x).toBe(89);
        expect(location.y).toBe(264);
    });

    //获得标签要素的最终范围 默认getPxBoundsMode = 0
    it('calculateLabelBounds getPxBoundsMode = 0', () => {
        var feature = themeLayer.labelFeatures[0];
        feature.style.labelXOffset = 1;
        feature.style.labelYOffset = 1;
        var location = themeLayer.getLabelPxLocation(feature);
        var boundsQuad = themeLayer.calculateLabelBounds(feature, location);
        expect(boundsQuad).not.toBeNull();
        expect(boundsQuad.length).toEqual(5);
        for (var i = 0; i < boundsQuad.length; i++) {
            expect(boundsQuad[i].x).not.toBeNaN();
            expect(boundsQuad[i].y).not.toBeNaN();
        }
    });

    //获得标签要素的最终范围 getPxBoundsMode = 1
    it('calculateLabelBounds_getPxBoundsMode = 1', () => {
        themeLayer.getPxBoundsMode = 1;
        var feature = themeLayer.labelFeatures[0];
        feature.style.labelXOffset = 1;
        feature.style.labelYOffset = 1;
        var location = themeLayer.getLabelPxLocation(feature);
        var boundsQuad = themeLayer.calculateLabelBounds(feature, location);
        expect(boundsQuad).not.toBeNull();
        expect(boundsQuad.length).toEqual(5);
        for (var i = 0; i < boundsQuad.length; i++) {
            expect(boundsQuad[i].x).not.toBeNaN();
            expect(boundsQuad[i].y).not.toBeNaN();
        }
    });

    //获得标签要素的最终范围的另一种算法
    it('calculateLabelBounds2', () => {
        var feature = themeLayer.labelFeatures[0];
        var location = themeLayer.getLabelPxLocation(feature);
        feature.style.fontStyle = "italic";
        feature.style.labelAlign = "lt";
        var boundsQuad_lt = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_lt).not.toBeNull();
        expect(boundsQuad_lt.length).toEqual(5);
        for (var i = 0; i < boundsQuad_lt.length; i++) {
            expect(boundsQuad_lt[i].x).not.toBeNaN();
            expect(boundsQuad_lt[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "lm";
        var boundsQuad_lm = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_lm).not.toBeNull();
        expect(boundsQuad_lm.length).toEqual(5);
        for (var i = 0; i < boundsQuad_lm.length; i++) {
            expect(boundsQuad_lm[i].x).not.toBeNaN();
            expect(boundsQuad_lm[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "lb";
        var boundsQuad_lb = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_lb).not.toBeNull();
        expect(boundsQuad_lb.length).toEqual(5);
        for (var i = 0; i < boundsQuad_lb.length; i++) {
            expect(boundsQuad_lb[i].x).not.toBeNaN();
            expect(boundsQuad_lb[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "ct";
        var boundsQuad_ct = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_ct).not.toBeNull();
        expect(boundsQuad_ct.length).toEqual(5);
        for (var i = 0; i < boundsQuad_ct.length; i++) {
            expect(boundsQuad_ct[i].x).not.toBeNaN();
            expect(boundsQuad_ct[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "cb";
        var boundsQuad_cb = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_cb).not.toBeNull();
        expect(boundsQuad_cb.length).toEqual(5);
        for (var i = 0; i < boundsQuad_cb.length; i++) {
            expect(boundsQuad_cb[i].x).not.toBeNaN();
            expect(boundsQuad_cb[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "rt";
        var boundsQuad_rt = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_rt).not.toBeNull();
        expect(boundsQuad_rt.length).toEqual(5);
        for (var i = 0; i < boundsQuad_rt.length; i++) {
            expect(boundsQuad_rt[i].x).not.toBeNaN();
            expect(boundsQuad_rt[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "rm";
        var boundsQuad_rm = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_rm).not.toBeNull();
        expect(boundsQuad_rm.length).toEqual(5);
        for (var i = 0; i < boundsQuad_rm.length; i++) {
            expect(boundsQuad_rm[i].x).not.toBeNaN();
            expect(boundsQuad_rm[i].y).not.toBeNaN();
        }
        feature.style.labelAlign = "rb";
        var boundsQuad_rb = themeLayer.calculateLabelBounds2(feature, location);
        expect(boundsQuad_rb).not.toBeNull();
        expect(boundsQuad_rb.length).toEqual(5);
        for (var i = 0; i < boundsQuad_rb.length; i++) {
            expect(boundsQuad_rb[i].x).not.toBeNaN();
            expect(boundsQuad_rb[i].y).not.toBeNaN();
        }
    });

    //根据当前位置获取绘制后的标签信息，包括标签的宽，高和行数等 要求：getPxBoundsMode = 1
    it('getLabelInfo', () => {
        var feature = themeLayer.labelFeatures[0];
        var location = feature.geometry.getCentroid();
        var style = feature.style;
        style.labelXOffset = 0;
        style.labelYOffset = 0;
        var labelInfo = themeLayer.getLabelInfo(location, style);
        expect(labelInfo).not.toBeNull();
        expect(labelInfo.h).toEqual("12px");
        expect(labelInfo.rows).toEqual(1);
        expect(labelInfo.w).not.toBeNull();
    });

    //旋转bounds
    it('rotationBounds', () => {
        var feature = themeLayer.labelFeatures[0];
        var bounds = new Bounds(50, 30, 30, 50);
        var rotationCenterPoi = themeLayer.getLabelPxLocation(feature);
        var angle = feature.style.labelRotation;
        var boundsQuad = themeLayer.rotationBounds(bounds, rotationCenterPoi, angle);
        expect(boundsQuad).not.toBeNull();
        expect(boundsQuad.length).toEqual(5);
        for (var i = 0; i < boundsQuad.length; i++) {
            expect(boundsQuad[i].x).not.toBeNaN();
            expect(boundsQuad[i].y).not.toBeNaN();
        }
    });

    //获取避让的信息
    it('getAvoidInfo', () => {
        var bounds = new Bounds(35, 40, 40, 10);
        var quadrilateral = [{"x": 30, "y": 30},
            {"x": 30, "y": 50},
            {"x": 50, "y": 30},
            {"x": 50, "y": 50},
            {"x": 30, "y": 30}];
        var avoidInfo = themeLayer.getAvoidInfo(bounds, quadrilateral);
        expect(avoidInfo).not.toBeNull();
        expect(avoidInfo.aspectH).toEqual("bottom");
        expect(avoidInfo.aspectW).toEqual("right");
        expect(avoidInfo.offsetX).toEqual(10);
        expect(avoidInfo.offsetY).toEqual(10);
    });
});