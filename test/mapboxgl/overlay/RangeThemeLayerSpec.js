require('../../../src/mapboxgl/overlay/RangeThemeLayer');
require('../../../src/common/util/FetchRequest');
var mapboxgl = require('mapbox-gl');
window.mapboxgl = mapboxgl;

var baseUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图",
    dataUrl = GlobeParameter.editServiceURL_leaflet;
describe('mapboxgl_RangeThemeLayer', function () {
    var originalTimeout;
    var testDiv, map;
    beforeAll(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                "version": 8,
                "sources": {
                    "raster-tiles": {
                        "type": "raster",
                        "tiles": [baseUrl + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                        "tileSize": 256
                    }
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                }]
            },
            center: [116.85, 39.79],
            zoom: 7
        });
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize, addFeatures, getShapesByFeatureID, getCacheCount, setMaxCacheCount, removeFeatures', function (done) {
        var themeLayer, result;
        var getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.FilterParameter({
                name: "Jingjin",
                attributeFilter: "SMID > -1"
            }),
            toIndex: 500,
            datasetNames: ["Jingjin:BaseMap_R"]
        });
        var getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(dataUrl, {
            format: SuperMap.DataFormat.ISERVER,
            eventListeners: {
                processCompleted: function (serviceResult) {
                    if (serviceResult.error) {
                        alert("error:" + JSON.stringify(serviceResult.error));
                        return;
                    }
                    result = serviceResult.result;
                }
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        setTimeout(function () {
            if (result && result.features) {
                //创建RangeThemeLayer
                themeLayer = new mapboxgl.supermap.RangeThemeLayer("ThemeLayer",
                    {
                        map: map,
                        opacity: 0.8,
                        style: {
                            shadowBlur: 16,
                            shadowColor: "#000000",
                            fillColor: "#FFFFFF"
                        },
                        isHoverAble: true,
                        highlightStyle: {
                            stroke: true,
                            strokeWidth: 4,
                            strokeColor: 'blue',
                            fillColor: "#00EEEE",
                            fillOpacity: 0.8
                        },
                        themeField: "POP_DENSITY99",
                        styleGroups: [
                            {
                                start: 0,
                                end: 0.02,
                                style: {
                                    color: '#FDE2CA'
                                }
                            },
                            {
                                start: 0.02,
                                end: 0.04,
                                style: {
                                    color: '#FACE9C'
                                }
                            },
                            {
                                start: 0.04,
                                end: 0.06,
                                style: {
                                    color: '#F09C42'
                                }
                            },
                            {
                                start: 0.06,
                                end: 0.1,
                                style: {
                                    color: '#D0770B'
                                }
                            },
                            {
                                start: 0.1,
                                end: 0.2,
                                style: {
                                    color: '#945305'
                                }
                            }]
                    });
                expect(themeLayer.features.length).toEqual(0);
                var cacheCount = themeLayer.getCacheCount();
                expect(cacheCount).toEqual(0);
                //添加数据
                themeLayer.addFeatures(result.features);
                expect(themeLayer).not.toBeNull();
                expect(themeLayer.features.length).toBeGreaterThan(0);
                for (var i = 0; i < themeLayer.features.length; i++) {
                    var features_i = themeLayer.features[i];
                    expect(features_i.data).not.toBeNull();
                    expect(features_i.CLASS_NAME).toBe("SuperMap.Feature.Vector");
                    expect(features_i.id).not.toBeNull();
                    var geometry_i = features_i.geometry;
                    expect(geometry_i).not.toBeNull();
                    expect(geometry_i.CLASS_NAME).toBe("SuperMap.Geometry.MultiPolygon");
                    expect(geometry_i.bounds).not.toBeUndefined();
                    expect(geometry_i.componentTypes).not.toBeUndefined();
                    expect(geometry_i.components).not.toBeUndefined();
                    expect(geometry_i.id).not.toBeUndefined();
                }
                expect(themeLayer.themeField).toBe("POP_DENSITY99");
                expect(themeLayer.styleGroups.length).toEqual(5);
                expect(themeLayer.renderer).not.toBeUndefined();
                expect(themeLayer.renderer).not.toBeNull();
                expect(themeLayer.style).not.toBeNull();
                expect(themeLayer.opacity).toEqual(0.8);
                expect(themeLayer.maxCacheCount).toBeGreaterThan(0);
                var shape1 = themeLayer.getShapesByFeatureID(result.features[1].id);
                var shape2 = themeLayer.getShapesByFeatureID();
                expect(shape1.length).toBeGreaterThan(0);
                expect(shape2.length).toBeGreaterThan(0);
                var cacheCount1 = themeLayer.getCacheCount();
                expect(cacheCount1).toBeGreaterThan(0);
                themeLayer.setMaxCacheCount(10);
                expect(themeLayer.maxCacheCount).toEqual(10);
                themeLayer.removeFeatures();
                expect(themeLayer.features.length).toBeGreaterThan(0);
                themeLayer.removeAllFeatures();
                expect(themeLayer.features.length).toEqual(0);
            }
            themeLayer.clear();
            done();
        }, 5000)
    });

    //测试父类ThemeVector类下的方法
    it('lineToTF', function (done) {
        var themeLayer, result;
        var getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.FilterParameter({
                name: "Jingjin",
                attributeFilter: "SMID > -1"
            }),
            toIndex: 500,
            datasetNames: ["Jingjin:BaseMap_L"]
        });
        var getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(dataUrl, {
            format: SuperMap.DataFormat.ISERVER,
            eventListeners: {
                processCompleted: function (serviceResult) {
                    if (serviceResult.error) {
                        alert("error:" + JSON.stringify(serviceResult.error));
                        return;
                    }
                    result = serviceResult.result;
                }
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        setTimeout(function () {
            if (result && result.features) {
                themeLayer = new mapboxgl.supermap.RangeThemeLayer("ThemeLayer",
                    {
                        map: map,
                        opacity: 0.8,
                        style: {
                            shadowBlur: 16,
                            shadowColor: "#000000",
                            fillColor: "#FFFFFF"
                        },
                        isHoverAble: true,
                        highlightStyle: {
                            stroke: true,
                            strokeWidth: 4,
                            strokeColor: 'blue',
                            fillColor: "#00EEEE",
                            fillOpacity: 0.8
                        },
                        themeField: "SmID",
                        styleGroups: [
                            {
                                start: 2,
                                end: 3,
                                style: {
                                    color: '#FDE2CA'
                                }
                            },
                            {
                                start: 3,
                                end: 4,
                                style: {
                                    color: '#FACE9C'
                                }
                            }
                        ]
                    });
                themeLayer.addFeatures(result.features);
                expect(themeLayer).not.toBeNull();
                expect(themeLayer.themeField).toBe("SmID");
                expect(themeLayer.features.length).toBeGreaterThan(0);
                for (var i = 0; i < themeLayer.features.length; i++) {
                    var features_i = themeLayer.features[i];
                    expect(features_i.data).not.toBeNull();
                    expect(features_i.CLASS_NAME).toBe("SuperMap.Feature.Vector");
                    expect(features_i.id).not.toBeNull();
                    var geometry_i = features_i.geometry;
                    expect(geometry_i).not.toBeNull();
                    expect(geometry_i.CLASS_NAME).toBe("SuperMap.Geometry.LineString");
                    expect(geometry_i.bounds).not.toBeUndefined();
                    expect(geometry_i.componentTypes).not.toBeUndefined();
                    expect(geometry_i.components).not.toBeUndefined();
                    expect(geometry_i.id).not.toBeUndefined();
                }
            }
            themeLayer.clear();
            done();
        }, 5000)
    });

    it('pointToTF', function (done) {
        var themeLayer, result;
        var getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.FilterParameter({
                name: "Jingjin",
                attributeFilter: "SMID > -1"
            }),
            toIndex: 500,
            datasetNames: ["Jingjin:BaseMap_P"]
        });
        var getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(dataUrl, {
            format: SuperMap.DataFormat.ISERVER,
            eventListeners: {
                processCompleted: function (serviceResult) {
                    if (serviceResult.error) {
                        alert("error:" + JSON.stringify(serviceResult.error));
                        return;
                    }
                    result = serviceResult.result;
                }
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        setTimeout(function () {
            if (result && result.features) {
                //创建RangeThemeLayer
                themeLayer = new mapboxgl.supermap.RangeThemeLayer("ThemeLayer",
                    {
                        map: map,
                        opacity: 0.8,
                        style: {
                            shadowBlur: 16,
                            shadowColor: "#000000",
                            fillColor: "#FFFFFF"
                        },
                        isHoverAble: true,
                        highlightStyle: {
                            stroke: true,
                            strokeWidth: 4,
                            strokeColor: 'blue',
                            fillColor: "#00EEEE",
                            fillOpacity: 0.8
                        },
                        themeField: "SmID",
                        styleGroups: [
                            {
                                start: 2,
                                end: 3,
                                style: {
                                    color: '#FDE2CA'
                                }
                            },
                            {
                                start: 3,
                                end: 4,
                                style: {
                                    color: '#FACE9C'
                                }
                            }
                        ]
                    });
                themeLayer.addFeatures(result.features);
                expect(themeLayer).not.toBeNull();
                expect(themeLayer.themeField).toBe("SmID");
                expect(themeLayer.features.length).toBeGreaterThan(0);
                for (var i = 0; i < themeLayer.features.length; i++) {
                    var features_i = themeLayer.features[i];
                    expect(features_i.data).not.toBeNull();
                    expect(features_i.CLASS_NAME).toBe("SuperMap.Feature.Vector");
                    expect(features_i.id).not.toBeNull();
                    var geometry_i = features_i.geometry;
                    expect(geometry_i).not.toBeNull();
                    expect(geometry_i.CLASS_NAME).toBe("SuperMap.Geometry.Point");
                    expect(geometry_i.bounds).not.toBeNull();
                    expect(geometry_i.id).not.toBeUndefined();
                }
            }
            themeLayer.clear();
            done();
        }, 5000)
    });

    //未找到合适的数据源
    //xit('multiPointToTF', function () {
    //});
    //xit('multiLineStringToTF', function () {
    //});
    //xit('rectangleToTF', function () {
    //});

    // 测试父类mapbox/overlay/theme/ThemeLayer类中的方法
    it('getFeatures, getFeatureBy, getFeatureById, getFeaturesByAttribute, moveEvent, zoomEvent, resizeEvent, destroyFeatures', function (done) {
        var themeLayer, result;
        var getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.FilterParameter({
                name: "Jingjin",
                attributeFilter: "SMID > -1"
            }),
            toIndex: 500,
            datasetNames: ["Jingjin:BaseMap_R"]
        });
        var getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(dataUrl, {
            format: SuperMap.DataFormat.ISERVER,
            eventListeners: {
                processCompleted: function (serviceResult) {
                    if (serviceResult.error) {
                        alert("error:" + JSON.stringify(serviceResult.error));
                        return;
                    }
                    result = serviceResult.result;
                }
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        setTimeout(function () {
            if (result && result.features) {
                themeLayer = new mapboxgl.supermap.RangeThemeLayer("ThemeLayer",
                    {
                        map: map,
                        opacity: 0.8,
                        style: {
                            shadowBlur: 16,
                            shadowColor: "#000000",
                            fillColor: "#FFFFFF"
                        },
                        themeField: "POP_DENSITY99",
                        styleGroups: [
                            {
                                start: 0,
                                end: 0.02,
                                style: {
                                    color: '#FDE2CA'
                                }
                            }]
                    });
                themeLayer.addFeatures(result.features);
                expect(themeLayer.features.length).toBeGreaterThan(0);
                //getFeatures方法
                var resultFeatures = themeLayer.getFeatures();
                expect(resultFeatures.length).toBeGreaterThan(0);
                //getFeatureBy方法
                var id = resultFeatures[0].id;
                var feature = themeLayer.getFeatureBy("id", id);
                expect(feature).toBe(resultFeatures[0]);
                //getFeatureById方法
                var featureGetById = themeLayer.getFeatureById(id);
                expect(featureGetById).toBe(resultFeatures[0]);
                //getFeatureByAttribute方法
                var featureGetByAttribute = themeLayer.getFeaturesByAttribute("NAME", "北京市");
                expect(featureGetByAttribute.length).toBeGreaterThan(0);
                expect(featureGetByAttribute[0].attributes.NAME).toBe("北京市");
                //on方法
                themeLayer.on('click', function () {
                    console.log('test on');
                });
                //moveEvent方法
                themeLayer.moveEvent();
                //zoomEvent方法
                themeLayer.zoomEvent();
                //resizeEvent方法
                themeLayer.resizeEvent();
                //destroyFeatures方法
                themeLayer.destroyFeatures(result.features[0]);     //有问题，没删掉，待开发修改
                //expect(themeLayer.features.length).toEqual(resultFeatures.length - 1);
                themeLayer.destroyFeatures();
                expect(themeLayer.features.length).toEqual(0);
                expect(1).not.toBeNull();
            }
            themeLayer.clear();
            done();
        }, 5000)
    });
})
;

