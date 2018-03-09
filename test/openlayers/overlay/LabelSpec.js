import ol from 'openlayers';
import {Label} from '../../../src/openlayers/overlay/Label';
import {ThemeFeature} from '../../../src/openlayers/overlay/theme/ThemeFeature';
import {TileSuperMapRest} from '../../../src/openlayers/mapping/TileSuperMapRest';
import {ThemeStyle} from '../../../src/common/style/ThemeStyle';
import {Bounds} from '../../../src/common/commontypes/Bounds';
import '../../resources/themeLabelData';

var url = GlobeParameter.China4326URL;
var themeSource;

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
    themeSource.addFeatures(labelFeatures);
}

describe('openlayers_Label', () => {
    var originalTimeout;
    var testDiv, map;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [110.85, 39.79],
                zoom: 4,
                projection: "EPSG:4326"
            })
        });
        var layer = new ol.layer.Tile({
            source: new TileSuperMapRest({
                url: url
            })
        });
        map.addLayer(layer);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        themeSource = new Label("labelThemeLayer", {
            map: map,
            attributions: " ",
            style: new ThemeStyle({
                labelRect: true,
                fontColor: "#000000",
                fontWeight: "bolder",
                fontSize: "18px",
                fill: true,
                fillColor: "#FFFFFF",
                fillOpacity: 1,
                stroke: false,
                strokeColor: "#8B7B8B"
            }),
            themeField: "aqi",
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
        themeSource.style.fontSize = "10px";
        themeSource.groupField = "aqi";
        var themeLayer = new ol.layer.Image({
            source: themeSource
        });
        map.addLayer(themeLayer);
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('constructor, destroy', () => {
        expect(themeSource).not.toBeNull();
        expect(themeSource.defaultStyle).not.toBeNull();
        //此时还没有添加features所以长度应该为0
        expect(themeSource.features.length).toEqual(0);
        expect(themeSource.themeField).toEqual("aqi");
        expect(themeSource.style).not.toBeNull();
        expect(themeSource.styleGroups.length).toEqual(6);
        themeSource.destroy();
        expect(themeSource.style).toBeNull();
        expect(themeSource.themeField).toBeNull();
        expect(themeSource.styleGroups).toBeNull();
    });

    //创建专题要素
    it('createThematicFeature', (done) => {
        addFeatures();
        setTimeout(() => {
            var feature = themeSource.labelFeatures[0];
            var thematicFeature = themeSource.createThematicFeature(feature);
            expect(themeSource.features.length).toBeGreaterThan(0);
            expect(thematicFeature).not.toBeNull();
            expect(thematicFeature.CLASS_NAME).toEqual("SuperMap.Feature.Theme.Vector");
            expect(thematicFeature.dataBounds).not.toBeNull();
            expect(thematicFeature.id).not.toBeNull();
            expect(thematicFeature.style).not.toBeNull();
            done();
        }, 2000);
    });

    //重绘所有专题要素
    it('redrawThematicFeatures', (done) => {
        addFeatures();
        setTimeout(() => {
            var bounds = [-180, -90, 90, 180];
            themeSource.redrawThematicFeatures(bounds);
            expect(themeSource).not.toBeNull();
            expect(themeSource.defaultStyle).not.toBeNull();
            expect(themeSource.features.length).toBeGreaterThan(0);
            expect(themeSource.themeField).toEqual("aqi");
            expect(themeSource.style).not.toBeNull();
            expect(themeSource.styleGroups.length).toEqual(6);
            done();
        }, 2000);
    });

    //获取经（压盖）处理后将要绘制在图层上的标签要素
    it('getDrawnLabels', (done) => {
        addFeatures();
        setTimeout(() => {
            var labelFeatures = themeSource.labelFeatures;
            labelFeatures[0].style.minZoomLevel = 4;
            var feas = themeSource.getDrawnLabels(labelFeatures);
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
                done();
            }
        }, 2000)
    });

    //根据用户数据（feature）设置专题要素的 Style
    it('getStyleByData', (done) => {
        addFeatures();
        setTimeout(() => {
            var feat = themeSource.labelFeatures[0];
            var featStyle = themeSource.getStyleByData(feat);
            expect(featStyle).not.toBeNull();
            expect(featStyle.fillColor).toEqual("#6ACD06");
            expect(featStyle.fontSize).toEqual("12px");
            expect(featStyle.label).toEqual(13);
            expect(featStyle.strokeColor).toEqual("#8B7B8B");
            done();
        }, 2000)
    });

    //设置标签要素的Style
    it('setLabelsStyle', (done) => {
        addFeatures();
        setTimeout(() => {
            var labelFeatures = themeSource.labelFeatures;
            var labelFeas = themeSource.setLabelsStyle(labelFeatures);
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
            done();
        }, 2000)
    });

    //设置标签要素的Style
    it('setStyle', (done) => {
        addFeatures();
        setTimeout(() => {
            var feat = themeSource.labelFeatures[0];
            var feature = themeSource.setStyle(feat);
            expect(feature).not.toBeNull();
            expect(feature.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
            expect(feature.attributes.aqi).toEqual(13);
            expect(feature.attributes.area).toEqual("山南");
            expect(feature.id).toContain("SuperMap.Feature_");
            expect(feature.geometry.CLASS_NAME).toEqual("SuperMap.Geometry.GeoText");
            expect(feature.geometry.bounds).not.toBeNull();
            expect(feature.style).not.toBeNull();
            done();
        }, 2000)
    });

    //获取标签要素的像素坐标
    it('getLabelPxLocation', (done) => {
        addFeatures();
        setTimeout(() => {
            var feature = themeSource.labelFeatures[0];
            feature.style.labelXOffset = 1;
            feature.style.labelYOffset = 1;
            var location = themeSource.getLabelPxLocation(feature);
            expect(location).not.toBeNull();
            expect(location.x).toEqual(33.918438400000014);
            expect(location.y).toEqual(369.43862613333334);
            done();
        }, 2000)
    });

    //获得标签要素的最终范围 默认getPxBoundsMode = 0
    it('calculateLabelBounds_getPxBoundsMode = 0', (done) => {
        addFeatures();
        setTimeout(() => {
            var feature = themeSource.labelFeatures[0];
            var location = themeSource.getLabelPxLocation(feature);
            var boundsQuad = themeSource.calculateLabelBounds(feature, location);
            expect(boundsQuad).not.toBeNull();
            expect(boundsQuad.length).toEqual(5);
            for (var i = 0; i < boundsQuad.length; i++) {
                expect(boundsQuad[i].x).not.toBeNaN();
                expect(boundsQuad[i].y).not.toBeNaN();
            }
            done()
        }, 2000)
    });


    //获得标签要素的最终范围   getPxBoundsMode = 1
    it('calculateLabelBounds_getPxBoundsMode = 1', (done) => {
        addFeatures();
        setTimeout(() => {
            themeSource.getPxBoundsMode = 1;
            var feature = themeSource.labelFeatures[0];
            feature.style.labelXOffset = 1;
            feature.style.labelYOffset = 1;
            var location = themeSource.getLabelPxLocation(feature);
            var boundsQuad = themeSource.calculateLabelBounds(feature, location);
            expect(boundsQuad).not.toBeNull();
            expect(boundsQuad.length).toEqual(5);
            for (var i = 0; i < boundsQuad.length; i++) {
                expect(boundsQuad[i].x).not.toBeNaN();
                expect(boundsQuad[i].y).not.toBeNaN();
            }
            done();
        }, 2000)
    });

    //获得标签要素的最终范围的另一种算法
    it('calculateLabelBounds2', (done) => {
        addFeatures();
        setTimeout(() => {
            var feature = themeSource.labelFeatures[0];
            var location = themeSource.getLabelPxLocation(feature);
            feature.style.fontStyle = "italic";
            feature.style.labelAlign = "lt";
            var boundsQuad_lt = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_lt).not.toBeNull();
            expect(boundsQuad_lt.length).toEqual(5);
            for (var i = 0; i < boundsQuad_lt.length; i++) {
                expect(boundsQuad_lt[i].x).not.toBeNaN();
                expect(boundsQuad_lt[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "lm";
            var boundsQuad_lm = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_lm).not.toBeNull();
            expect(boundsQuad_lm.length).toEqual(5);
            for (var i = 0; i < boundsQuad_lm.length; i++) {
                expect(boundsQuad_lm[i].x).not.toBeNaN();
                expect(boundsQuad_lm[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "lb";
            var boundsQuad_lb = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_lb).not.toBeNull();
            expect(boundsQuad_lb.length).toEqual(5);
            for (var i = 0; i < boundsQuad_lb.length; i++) {
                expect(boundsQuad_lb[i].x).not.toBeNaN();
                expect(boundsQuad_lb[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "ct";
            var boundsQuad_ct = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_ct).not.toBeNull();
            expect(boundsQuad_ct.length).toEqual(5);
            for (var i = 0; i < boundsQuad_ct.length; i++) {
                expect(boundsQuad_ct[i].x).not.toBeNaN();
                expect(boundsQuad_ct[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "cb";
            var boundsQuad_cb = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_cb).not.toBeNull();
            expect(boundsQuad_cb.length).toEqual(5);
            for (var i = 0; i < boundsQuad_cb.length; i++) {
                expect(boundsQuad_cb[i].x).not.toBeNaN();
                expect(boundsQuad_cb[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "rt";
            var boundsQuad_rt = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_rt).not.toBeNull();
            expect(boundsQuad_rt.length).toEqual(5);
            for (var i = 0; i < boundsQuad_rt.length; i++) {
                expect(boundsQuad_rt[i].x).not.toBeNaN();
                expect(boundsQuad_rt[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "rm";
            var boundsQuad_rm = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_rm).not.toBeNull();
            expect(boundsQuad_rm.length).toEqual(5);
            for (var i = 0; i < boundsQuad_rm.length; i++) {
                expect(boundsQuad_rm[i].x).not.toBeNaN();
                expect(boundsQuad_rm[i].y).not.toBeNaN();
            }
            feature.style.labelAlign = "rb";
            var boundsQuad_rb = themeSource.calculateLabelBounds2(feature, location);
            expect(boundsQuad_rb).not.toBeNull();
            expect(boundsQuad_rb.length).toEqual(5);
            for (var i = 0; i < boundsQuad_rb.length; i++) {
                expect(boundsQuad_rb[i].x).not.toBeNaN();
                expect(boundsQuad_rb[i].y).not.toBeNaN();
            }
            done();
        }, 2000);
    });

    //根据当前位置获取绘制后的标签信息，包括标签的宽，高和行数等
    it('getLabelInfo', (done) => {
        addFeatures();
        setTimeout(() => {
            var feature = themeSource.labelFeatures[0];
            var location = feature.geometry.getCentroid();
            var style = feature.style;
            var labelInfo = themeSource.getLabelInfo(location, style);
            expect(labelInfo).not.toBeNull();
            expect(labelInfo).not.toBeNull();
            expect(labelInfo.h).toEqual("12px");
            expect(labelInfo.rows).toEqual(1);
            expect(labelInfo.w).not.toBeNull();
            done();
        }, 2000)
    });

    //旋转bounds
    it('rotationBounds', (done) => {
        addFeatures();
        setTimeout(() => {
            var feature = themeSource.labelFeatures[0];
            var bounds = new Bounds(50, 30, 30, 50);
            var rotationCenterPoi = themeSource.getLabelPxLocation(feature);
            var angle = feature.style.labelRotation;
            var boundsQuad = themeSource.rotationBounds(bounds, rotationCenterPoi, angle);
            expect(boundsQuad).not.toBeNull();
            expect(boundsQuad.length).toEqual(5);
            for (var i = 0; i < boundsQuad.length; i++) {
                expect(boundsQuad[i].x).not.toBeNaN();
                expect(boundsQuad[i].y).not.toBeNaN();
            }
            done();
        }, 2000);
    });

    //获取一个点绕旋转中心顺时针旋转后的位置  (此方法用于屏幕坐标)
    it('getRotatedLocation', () => {
        var x = 10, y = 10, rx = 15, ry = 10, angle = 5;
        var location = themeSource.getRotatedLocation(x, y, rx, ry, angle);
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
        var avoidInfo = themeSource.getAvoidInfo(bounds, quadrilateral);
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
        var avoidInfo = themeSource.getAvoidInfo(bounds, quadrilateral);
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
        var overLap = themeSource.isQuadrilateralOverLap(quadrilateral, quadrilateral2);
        expect(overLap).toBeNull();
    });
});