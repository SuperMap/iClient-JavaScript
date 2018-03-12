import {Label} from '../../../src/mapboxgl/overlay/LabelThemeLayer';
import {ThemeFeature} from '../../../src/mapboxgl/overlay/theme/ThemeFeature';
import {ThemeStyle} from '../../../src/common/style/ThemeStyle';
import {Bounds} from '../../../src/common/commonTypes/Bounds';
import '../../resources/themeLabelData';
import mapboxgl from 'mapbox-gl';

var url = GlobeParameter.ChinaURL;
var themeLayer;

var addFeatures = () => {
    var labelFeatures = [];
    var feat;
    for (var i = 0; i < themeData.length; i++) {
        var lonlat = themeData[i].lonLat.split(",");
        var lng = parseFloat(lonlat[0]);
        var lat = parseFloat(lonlat[1]);
        var text = themeData[i].aqi;
        feat = new ThemeFeature([lng, lat, text], themeData[i]);
        labelFeatures.push(feat);
    }
    themeLayer.addFeatures(labelFeatures);
}

describe('mapboxgl_LabelThemeLayer', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "1000px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                "version": 8,
                "sources": {
                    "raster-tiles": {
                        "type": "raster",
                        "tiles": [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        "tileSize": 256,
                    },
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                }]
            },
            center: [116.40, 39.79],
            zoom: 3
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        themeLayer = new Label("labelThemeLayer", {
            map: map,
            attributions: " ",
            style: new ThemeStyle({
                labelRect: true,
                fontColor: "#000000",
                fontWeight: "bolder",
                fontSize: "10px",
                fill: true,
                fillColor: "#FFFFFF",
                fillOpacity: 1,
                stroke: false,
                strokeColor: "#8B7B8B"
            }),
            themeField: "aqi",
            groupField: "aqi",
            styleGroups: [
                {
                    start: 0,
                    end: 51,
                    style: {
                        fillColor: "#6ACD06",
                        fontSize: "10px"
                    }
                }, {
                    start: 51,
                    end: 101,
                    style: {
                        fillColor: "#FBD12A",
                        fontSize: "19px"
                    }
                }, {
                    start: 101,
                    end: 151,
                    style: {
                        fillColor: "#FE8800",
                        fontSize: "22px"
                    }
                }, {
                    start: 151,
                    end: 201,
                    style: {
                        fillColor: "#FF0000",
                        fontSize: "24px"
                    }
                }, {
                    start: 201,
                    end: 301,
                    style: {
                        fillColor: "#CC0000",
                        fontSize: "26px"
                    }
                }, {
                    start: 301,
                    end: 601,
                    style: {
                        fillColor: "#960453",
                        fontSize: "28px"
                    }
                }
            ]
        });
        addFeatures();
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('constructor', () => {
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.defaultStyle).not.toBeNull();
        expect(themeLayer.features.length).toBeGreaterThan(0);
        expect(themeLayer.themeField).toEqual("aqi");
        expect(themeLayer.style).not.toBeNull();
        expect(themeLayer.styleGroups.length).toEqual(6);
    });

    //重绘所有专题要素
    it('redrawThematicFeatures', () => {
        var sw = new mapboxgl.LngLat(-180, -90);
        var ne = new mapboxgl.LngLat(180, 90);
        var bounds = new mapboxgl.LngLatBounds(sw, ne);
        themeLayer.redrawThematicFeatures(bounds);
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.defaultStyle).not.toBeNull();
        expect(themeLayer.features.length).toBeGreaterThan(0);
        expect(themeLayer.themeField).toEqual("aqi");
        expect(themeLayer.style).not.toBeNull();
        expect(themeLayer.styleGroups.length).toEqual(6);
    });

    // 创建专题图要素
    it('createThematicFeature', () => {
        var feature = themeLayer.labelFeatures[0];
        feature.geometry.calculateBounds();
        var thematicFeature = themeLayer.createThematicFeature(feature);
        expect(themeLayer.features.length).toBeGreaterThan(0);
        expect(thematicFeature).not.toBeNull();
        expect(thematicFeature.CLASS_NAME).toEqual("SuperMap.Feature.Theme.Vector");
        expect(thematicFeature.dataBounds).not.toBeNull();
        expect(thematicFeature.id).not.toBeNull();
        expect(thematicFeature.style).not.toBeNull();
    });

    //获取经（压盖）处理后将要绘制在图层上的标签要素
    it('getDrawnLabels', () => {
        var labelFeatures = themeLayer.labelFeatures;
        labelFeatures[0].style.minZoomLevel = 4;
        labelFeatures[1].style.maxZoomLevel = 2;
        var feas = themeLayer.getDrawnLabels(labelFeatures);
        expect(feas).not.toBeNull();
        expect(feas.length).toBeGreaterThan(0);
        for (var i = 0; i < feas.length; i++) {
            expect(feas[i].CLASS_NAME).toEqual("SuperMap.Feature.Vector");
            expect(feas[i].attributes).not.toBeNull();
            expect(feas[i].geometry).not.toBeNull();
            expect(feas[i].geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
            expect(feas[i].geometry.bounds).not.toBeNull();
            expect(feas[i].geometry.id).not.toBeNull();
            expect(feas[i].style).not.toBeNull();
            expect(feas[i].id).toContain("SuperMap.Feature_");
        }
    });

    // 根据用户数据（feature）设置专题要素的 Style
    it('getStyleByData', () => {
        themeLayer.style.fontSize = "10px";
        themeLayer.styleGroups[0].style.fontSize = "10px";
        var feat = themeLayer.labelFeatures[0];
        var featStyle = themeLayer.getStyleByData(feat);
        expect(featStyle).not.toBeNull();
        expect(featStyle.fillColor).toEqual("#6ACD06");
        expect(featStyle.fontSize).toEqual("12px");
        expect(featStyle.label).toEqual(13);
        expect(featStyle.strokeColor).toEqual("#8B7B8B");
    });

    //设置标签要素的Style
    it('setLabelsStyle', () => {
        var labelFeatures = themeLayer.labelFeatures;
        var labelFeas = themeLayer.setLabelsStyle(labelFeatures);
        expect(labelFeas).not.toBeNull();
        expect(labelFeas.length).toBeGreaterThan(0);
        for (var i = 0; i < labelFeas.length; i++) {
            expect(labelFeas[i].CLASS_NAME).toEqual("SuperMap.Feature.Vector");
            expect(labelFeas[i].attributes).not.toBeNull();
            expect(labelFeas[i].geometry).not.toBeNull();
            expect(labelFeas[i].geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
            expect(labelFeas[i].geometry.id).not.toBeNull();
            expect(labelFeas[i].style).not.toBeNull();
            expect(labelFeas[i].id).toContain("SuperMap.Feature_");
        }
    });

    // // 设置标签要素的Style
    // // 有未知UT影响，暂时注释掉
    // xit('setStyle', ()=> {
    //     var feat = themeLayer.labelFeatures[0];
    //     var feature = themeLayer.setStyle(feat);
    //     expect(feature).not.toBeNull();
    //     expect(feature.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
    //     expect(feature.attributes.aqi).toEqual(13);
    //     expect(feature.attributes.area).toEqual("山南");
    //     expect(feature.id).toContain("SuperMap.Feature_");
    //     expect(feature.geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
    //     expect(feature.geometry.bounds).not.toBeNull();
    //     expect(feature.style).not.toBeNull();
    // });

    //获取标签要素的像素坐标
    it('getLabelPxLocation', () => {
        var feature = themeLayer.labelFeatures[0];
        feature.style.labelXOffset = 1;
        feature.style.labelYOffset = 1;
        var location = themeLayer.getLabelPxLocation(feature);
        expect(location).not.toBeNull();
        expect(location.x).not.toBeNaN();
        expect(location.y).not.toBeNaN();
    });

    //获得标签要素的最终范围  原数据默认getPxBoundsMode = 0，此处测 getPxBoundsMode = 1 时的情况
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

    //获得标签要素的最终范围  原数据默认getPxBoundsMode = 0，此处测 getPxBoundsMode = 2 时的情况
    it('calculateLabelBounds_getPxBoundsMode = 2', () => {
        themeLayer.getPxBoundsMode = 2;
        var feature = themeLayer.labelFeatures[0];
        var location = themeLayer.getLabelPxLocation(feature);
        var boundsQuad = themeLayer.calculateLabelBounds(feature, location);
        expect(boundsQuad).toBeNull();
    });

    // 获得标签要素的最终范围的另一种算法
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

    //根据当前位置获取绘制后的标签信息
    it('getLabelInfo', () => {
        var feature = themeLayer.labelFeatures[0];
        var location = feature.geometry.getCentroid();
        var style = feature.style;
        var labelInfo = themeLayer.getLabelInfo(location, style);
        expect(labelInfo).not.toBeNull();
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

    //获取一个点绕旋转中心顺时针旋转后的位置  (此方法用于屏幕坐标)
    it('getRotatedLocation', () => {
        var x = 10, y = 10, rx = 15, ry = 10, angle = 5;
        var location = themeLayer.getRotatedLocation(x, y, rx, ry, angle);
        expect(location).not.toBeNull();
        expect(location.x).toEqual(10.019026509541273);
        expect(location.y).toEqual(9.56422128626171);
    });

    //获取避让的信息 quadrilateral.length = 5
    it('getAvoidInfo_quadrilateral.length = 5', () => {
        var bounds = new Bounds(35, 40, 40, 45);
        var quadrilateral = [{"x": 30, "y": 30},
            {"x": 30, "y": 50},
            {"x": 50, "y": 30},
            {"x": 50, "y": 50},
            {"x": 30, "y": 30}];
        var avoidInfo = themeLayer.getAvoidInfo(bounds, quadrilateral);
        expect(avoidInfo).not.toBeNull();
        expect(avoidInfo.aspectH).toEqual("top");
        expect(avoidInfo.aspectW).toEqual("right");
        expect(avoidInfo.offsetX).toEqual(10);
        expect(avoidInfo.offsetY).toEqual(15);
    });

    // 获取避让的信息 quadrilateral.length != 5
    it('getAvoidInfo_quadrilateral.length != 5', () => {
        var bounds = new Bounds(35, 40, 40, 45);
        var quadrilateral = [{"x": 30, "y": 30},
            {"x": 30, "y": 50},
            {"x": 50, "y": 30},
            {"x": 30, "y": 30}];
        var avoidInfo = themeLayer.getAvoidInfo(bounds, quadrilateral);
        expect(avoidInfo).toBeNull();
    });

    //判断两个四边形是否有压盖  原数据quadLen = 5 && quad2Len = 5，此处另测 ！= 5 的情况
    it('isQuadrilateralOverLap_quadLen != 5', () => {
        var quadrilateral = [{"x": 30, "y": 30},
            {"x": 30, "y": 50},
            {"x": 50, "y": 30},
            {"x": 30, "y": 30}];
        var quadrilateral2 = [
            {"x": 25, "y": 35},
            {"x": 25, "y": 55},
            {"x": 45, "y": 35},
            {"x": 25, "y": 35}
        ];
        var overLap = themeLayer.isQuadrilateralOverLap(quadrilateral, quadrilateral2);
        expect(overLap).toBeNull();
    });
});
