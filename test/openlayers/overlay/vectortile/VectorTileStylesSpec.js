// 开发代码有bug，因为用的静态方法，所以一旦设置了客户端样式就会一直保留，其它变量也可能有未被清除掉的现象。
// 本测试待开发改好bug后需要调整测顺序，验证出图结果。
// 目前一旦将使用客户端样式的测试放到最前面，则会影响后续测试。
import ol from 'openlayers';
import {VectorTileStyles} from '../../../../src/openlayers/overlay/vectortile/VectorTileStyles';
import {MapService} from '../../../../src/openlayers/services/MapService';
import {VectorTileSuperMapRest} from '../../../../src/openlayers/overlay/VectorTileSuperMapRest';

var url = GlobeParameter.ChinaURL;
describe('openlayers_VectorTileStyles', () => {
    var testDiv, map, mapView, vectorTileStyles, originalTimeout;
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
                center: [12957388, 4853991],
                zoom: 11
            })
        });
        mapView = map.getView();

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    xit('bug log', () => {
        console.log('开发代码有bug，因为用的静态方法，所以一旦设置了客户端样式就会一直保留，其它变量也可能有未被清除掉的现象。' +
            '本测试待开发改好bug后需要调整测顺序，验证出图结果。' +
            '目前一旦将使用客户端样式的测试放到最前面，则会影响后续测试。');
    });

    it('getFeatureStyle_default', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        // featureJSON通过JSON.stringify((new ol.format.GeoJSON()).writeFeatureObject(feature)获得,其中feature为视野范围内四环左边的线对象
        var featureJSON = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [[21, 258], [22, 227], [22, 192], [27, 176], [34, 126], [36, 101], [37, 97], [40, 93], [47, 90], [61, 86], [70, 81], [78, 79], [97, 77], [101, 76], [106, 73], [112, 63], [116, 60], [149, 55], [162, 51], [184, 46], [203, 39], [224, 40], [233, 40], [258, 40]]
            },
            "properties": {
                "searchValues": null,
                "attributes": null,
                "id": 6955,
                "layerName": "Provincial_Road_ln@China#1",
                "type": "LINE"
            }
        };
        var feature = (new ol.format.GeoJSON()).readFeature(featureJSON);
        var style = vectorTileStyles.getFeatureStyle(feature);
        setTimeout(() => {
            expect(style).not.toBeNull();
            expect(style.length).toEqual(1);
            expect(style[0].getStroke().getColor()).toBe("rgba(232, 212, 85, 1)");
            expect(style[0].getStroke().getWidth()).toEqual(1.5118110236220474);
            expect(style[0].getStroke().getLineJoin()).toBe("round");
            expect(style[0].getStroke().getMiterLimit()).toEqual(10);
            vectorTileStyles = null;
            done();
        }, 1000);
    });

    // 下面将上述测试显示在div中
    it('constructor_donotNeedServerCartoCss=true_inDiv', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView,
            donotNeedServerCartoCss: true
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        var style = vectorTileStyles.getFeatureStyle;
        new MapService(url).getMapInfo((serviceResult) => {
            var vectorLayer;
            var vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileOptions.returnAttributes = false;
            vectorLayer = new ol.layer.VectorTile({
                source: new VectorTileSuperMapRest(vectorTileOptions),
                style: style
            });
            map.addLayer(vectorLayer);
            setTimeout(() => {
                expect(style).not.toBeNull();
                expect(vectorTileStyles).not.toBeNull();
                map.removeLayer(vectorLayer);
                done();
            }, 1000)
        });
    });

    it('getFeatureStyle_donotNeedServerCartoCss = false', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView,
            donotNeedServerCartoCss: false,
            selectedPointStyle: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'red'
                    })
                })
            }),
            selectedLineStyle: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
                })
            }),
            selectedRegionStyle: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [0, 0, 255, 0.5]
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
                })
            }),
            selectedTextStyle: new ol.style.Style({
                text: new ol.style.Text({
                    font: '15px 微软雅黑',
                    fill: new ol.style.Fill({
                        color: 'red'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 1
                    })
                })
            })
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        // featureJSON通过JSON.stringify((new ol.format.GeoJSON()).writeFeatureObject(feature)获得,其中feature为视野范围内四环左边的线对象
        var featureJSON = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [[21, 258], [22, 227], [22, 192], [27, 176], [34, 126], [36, 101], [37, 97], [40, 93], [47, 90], [61, 86], [70, 81], [78, 79], [97, 77], [101, 76], [106, 73], [112, 63], [116, 60], [149, 55], [162, 51], [184, 46], [203, 39], [224, 40], [233, 40], [258, 40]]
            },
            "properties": {
                "searchValues": null,
                "attributes": null,
                "id": 6955,
                "layerName": "Provincial_Road_ln@China#1",
                "type": "LINE"
            }
        };
        var feature = (new ol.format.GeoJSON()).readFeature(featureJSON);
        var style = vectorTileStyles.getFeatureStyle(feature);
        setTimeout(() => {
            expect(style).not.toBeNull();
            expect(style.length).toEqual(1);
            expect(style[0].getStroke().getColor()).toBe("rgba(232, 212, 85, 1)");
            expect(style[0].getStroke().getWidth()).toEqual(1.5118110236220474);
            expect(style[0].getStroke().getLineJoin()).toBe("round");
            expect(style[0].getStroke().getMiterLimit()).toEqual(10);
            vectorTileStyles = null;
            done();
        }, 1000);
    });

    // 下面将上述测试显示在div中
    it('constructor_default_inDiv', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView
        };
        vectorTileStyles = new VectorTileStyles(stylesOptions);
        var style = vectorTileStyles.getFeatureStyle;
        new MapService(url).getMapInfo((serviceResult) => {
            var vectorLayer;
            var vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileOptions.returnAttributes = false;
            vectorLayer = new ol.layer.VectorTile({
                source: new VectorTileSuperMapRest(vectorTileOptions),
                style: style
            });
            map.addLayer(vectorLayer);
            setTimeout(() => {
                expect(style).not.toBeNull();
                expect(vectorTileStyles).not.toBeNull();
                map.removeLayer(vectorLayer);
                done();
            }, 1000)
        });
    });

    it('getFeatureStyle_donotNeedServerCartoCss = true', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView,
            donotNeedServerCartoCss: true
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        // featureLineJSON通过JSON.stringify((new ol.format.GeoJSON()).writeFeatureObject(feature)获得,其中feature为视野范围内四环左边的线对象
        var featureLineJSON = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [[21, 258], [22, 227], [22, 192], [27, 176], [34, 126], [36, 101], [37, 97], [40, 93], [47, 90], [61, 86], [70, 81], [78, 79], [97, 77], [101, 76], [106, 73], [112, 63], [116, 60], [149, 55], [162, 51], [184, 46], [203, 39], [224, 40], [233, 40], [258, 40]]
            },
            "properties": {
                "searchValues": null,
                "attributes": null,
                "id": 6955,
                "layerName": "Provincial_Road_ln@China#1",
                "type": "LINE"
            }
        };
        var featureLine = (new ol.format.GeoJSON()).readFeature(featureLineJSON);
        var styleLine = vectorTileStyles.getFeatureStyle(featureLine);
        setTimeout(() => {
            expect(styleLine).not.toBeNull();
            expect(styleLine.getStroke().getColor()).toBe("rgba(232,212,85,1)");
            expect(styleLine.getStroke().getWidth()).toEqual(3.77952);
            expect(styleLine.getStroke().getLineJoin()).toBe("round");
            expect(styleLine.getStroke().getMiterLimit()).toEqual(10);
        }, 1000);
        // featureRegionJSON通过JSON.stringify((new ol.format.GeoJSON()).writeFeatureObject(feature)获得,其中feature为视野范围内背景面对象
        var featureRegionJSON = {
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[-2, 258], [-2, -2], [258, -2], [258, 258], [-2, 258], [-2, 258]]]]
            },
            "properties": {
                "searchValues": null,
                "attributes": null,
                "id": 26,
                "layerName": "China_Province_pl@China",
                "type": "REGION"
            }
        };
        var featureRegion = (new ol.format.GeoJSON()).readFeature(featureRegionJSON);
        var styleRegion = vectorTileStyles.getFeatureStyle(featureRegion);
        setTimeout(() => {
            expect(styleRegion).not.toBeNull();
            expect(styleRegion.getFill().getColor()).toBe("rgba(255,255,255,1)");
            expect(styleRegion.getStroke().getColor()).toBe("rgba(120,113,102,0)");
            expect(styleRegion.getStroke().getWidth()).toEqual(0.94488);
            expect(styleRegion.getStroke().getLineJoin()).toBe("round");
            expect(styleRegion.getStroke().getMiterLimit()).toEqual(10);
            vectorTileStyles = null;
            done();
        }, 1000);
    });

    // 下面将上述测试显示在div中
    it('constructor_donotNeedServerCartoCss=false_inDiv', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView,
            donotNeedServerCartoCss: false,
            selectedPointStyle: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'red'
                    })
                })
            }),
            selectedLineStyle: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
                })
            }),
            selectedRegionStyle: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [0, 0, 255, 0.5]
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 3
                })
            }),
            selectedTextStyle: new ol.style.Style({
                text: new ol.style.Text({
                    font: '15px 微软雅黑',
                    fill: new ol.style.Fill({
                        color: 'red'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'white',
                        width: 1
                    })
                })
            })
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        var style = vectorTileStyles.getFeatureStyle;
        new MapService(url).getMapInfo((serviceResult) => {
            var vectorLayer;
            var vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileOptions.returnAttributes = false;
            vectorLayer = new ol.layer.VectorTile({
                source: new VectorTileSuperMapRest(vectorTileOptions),
                style: style
            });
            map.addLayer(vectorLayer);
            setTimeout(() => {
                expect(style).not.toBeNull();
                expect(vectorTileStyles).not.toBeNull();
                map.removeLayer(vectorLayer);
                done();
            }, 1000)
        });
    });

    it('getFeatureStyle_cartoCss', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView,
            donotNeedServerCartoCss: true,
            cartoCss: initClientCssStr()
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        // featureLineJSON通过JSON.stringify((new ol.format.GeoJSON()).writeFeatureObject(feature)获得,其中feature为视野范围内四环左边的线对象
        var featureLineJSON = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [[21, 258], [22, 227], [22, 192], [27, 176], [34, 126], [36, 101], [37, 97], [40, 93], [47, 90], [61, 86], [70, 81], [78, 79], [97, 77], [101, 76], [106, 73], [112, 63], [116, 60], [149, 55], [162, 51], [184, 46], [203, 39], [224, 40], [233, 40], [258, 40]]
            },
            "properties": {
                "searchValues": null,
                "attributes": null,
                "id": 6955,
                "layerName": "Provincial_Road_ln@China#1",
                "type": "LINE"
            }
        };
        var featureLine = (new ol.format.GeoJSON()).readFeature(featureLineJSON);
        var styleLine = vectorTileStyles.getFeatureStyle(featureLine);
        setTimeout(() => {
            expect(styleLine).not.toBeNull();
            expect(styleLine.getStroke().getColor()).toBe("rgba(232,212,85,1)");
            expect(styleLine.getStroke().getWidth()).toEqual(3.77952);
            expect(styleLine.getStroke().getLineJoin()).toBe("round");
            expect(styleLine.getStroke().getMiterLimit()).toEqual(10);
        }, 1000);
        // featureRegionJSON通过JSON.stringify((new ol.format.GeoJSON()).writeFeatureObject(feature)获得,其中feature为视野范围内背景面对象
        var featureRegionJSON = {
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[[[-2, 258], [-2, -2], [258, -2], [258, 258], [-2, 258], [-2, 258]]]]
            },
            "properties": {
                "searchValues": null,
                "attributes": null,
                "id": 26,
                "layerName": "China_Province_pl@China",
                "type": "REGION"
            }
        };
        var featureRegion = (new ol.format.GeoJSON()).readFeature(featureRegionJSON);
        var styleRegion = vectorTileStyles.getFeatureStyle(featureRegion);
        setTimeout(() => {
            expect(styleRegion).not.toBeNull();
            expect(styleRegion.length).toEqual(1);
            expect(styleRegion[0].getFill().getColor()).toBe("rgba(8, 48, 75, 1)");
            expect(styleRegion[0].getStroke().getColor()).toBe("rgba(0, 0, 0, 0)");
            expect(styleRegion[0].getStroke().getWidth()).toEqual(1);
            expect(styleRegion[0].getStroke().getLineJoin()).toBe("round");
            expect(styleRegion[0].getStroke().getMiterLimit()).toEqual(10);
            vectorTileStyles = null;
            done();
        }, 1000);
    });

    // 下面将上述测试显示在div中
    it('constructor_cartoCss_inDiv', (done) => {
        var stylesOptions = {
            url: url,
            view: mapView,
            donotNeedServerCartoCss: true,
            cartoCss: initClientCssStr()
        };
        var vectorTileStyles = new VectorTileStyles(stylesOptions);
        var style = vectorTileStyles.getFeatureStyle;
        new MapService(url).getMapInfo((serviceResult) => {
            var vectorLayer;
            var vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileOptions.returnAttributes = false;
            vectorLayer = new ol.layer.VectorTile({
                source: new VectorTileSuperMapRest(vectorTileOptions),
                style: style
            });
            map.addLayer(vectorLayer);
            setTimeout(() => {
                expect(style).not.toBeNull();
                expect(vectorTileStyles).not.toBeNull();
                map.removeLayer(vectorLayer);
                done();
            }, 1000)
        });
    });

    var initClientCssStr = () => {
        var cartoCss = "@waterColor:rgb(2,16,25);" +
            "@roadColora:rgb(18,117,142);" +
            "@roadColorb:rgb(0,0,0);" +
            "@railwayColora:rgb(0,0,0);" +
            "@railwayColorb:rgb(0,0,0);" +
            "@vegetationColor:rgb(2,16,25);" +
            "@continentColor:rgb(8,48,75);" +
            "@provinceLineColor:rgb(30,30,30);";
        cartoCss = cartoCss.replace(/[@]/gi, "\n@");
        var cartoCss2 = "#World_Continent_pl___China{\npolygon-fill:@continentColor;\nline-width:1;\nline-color:@continentColor;\n}" +
            "#China_Province_pl___China{\npolygon-fill:@continentColor;\nline-color:rgba(0,0,0,0);\n}" +
            "#Arterial_Road_ln___China::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Arterial_Road_ln___China::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Arterial_Road_ln___China___1::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Arterial_Road_ln___China___1::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Arterial_Road_ln___China___1___1::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Arterial_Road_ln___China___1___1::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Main_Road_L___China::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Main_Road_L___China::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Main_Road_L___China___1::one{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Main_Road_L___China___1::two{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Main_Road_L___China___1___1::a{\nline-color:@roadColora;\nline-width:2;\n}" +
            "#Main_Road_L___China___1___1::b{\nline-color:@roadColorb;\nline-width:1;\n}" +
            "#Hydside_Area_pl___Hydside{\npolygon-fill:@waterColor;\nline-color:@waterColor;\n}" +
            "#China_Provinces_L___China400{\nline-dasharray:10,10;\nline-color:@provinceLineColor;\nline-width:1;\n}";
        cartoCss2 = cartoCss2.replace(/[#]/gi, "\n#");
        return cartoCss + cartoCss2;
    }
});
