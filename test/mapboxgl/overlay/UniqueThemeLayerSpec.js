import {Unique} from '../../../src/mapboxgl/overlay/UniqueThemeLayer';
import {GetFeaturesBySQLService} from '../../../src/common/iServer/GetFeaturesBySQLService';
import {GetFeaturesBySQLParameters} from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {Geometry} from '../../../src/common/commontypes/Geometry';
import {DataFormat} from '../../../src/common/REST';
import mapboxgl from 'mapbox-gl';

var baseUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图",
    dataUrl = GlobeParameter.editServiceURL_leaflet;
describe('mapboxgl_UniqueThemeLayer', () => {
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
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
        map = null;
    });

    it('initialize, addFeatures, getShapesByFeatureID, getCacheCount, setMaxCacheCount, removeFeatures', (done) => {
        var themeLayer, result;
        var getFeatureBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: new FilterParameter({
                name: "Jingjin",
                attributeFilter: "SMID > -1"
            }),
            toIndex: 500,
            datasetNames: ["Jingjin:Landuse_R"]
        });
        var getFeatureBySQLService = new GetFeaturesBySQLService(dataUrl, {
            format: DataFormat.ISERVER,
            eventListeners: {
                processCompleted: (serviceResult) => {
                    if (serviceResult.error) {
                        alert("error:" + JSON.stringify(serviceResult.error));
                        return;
                    }
                    result = serviceResult.result;
                }
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        setTimeout(() => {
            if (result && result.features) {
                //岛洞和多面的处理
                var features = result.features;
                var feas = [];
                var IHFeas = []; //岛洞多面
                for (var i = 0, len = features.length; i < len; i++) {
                    var feature = features[i];
                    var smid = feature.fieldValues[0];
                    if (smid === "86" || smid === "87" || smid === "89") {
                        // islandHoleHandlerForFeature 处理岛洞面
                        IHFeas.push(islandHoleHandlerForFeature(feature));
                    }
                    else {
                        feas.push(feature);
                    }
                }
                // 岛洞多面要素必需在其他要素之前添加
                feas = IHFeas.concat(feas);
                //创建RangeThemeLayer
                themeLayer = new Unique("ThemeLayer",
                    {
                        map: map,
                        style: {
                            shadowBlur: 3,
                            shadowColor: "#000000",
                            shadowOffsetX: 1,
                            shadowOffsetY: 1,
                            fillColor: "#FFFFFF"
                        },
                        isHoverAble: true,
                        highlightStyle: {
                            stroke: true,
                            strokeWidth: 2,
                            strokeColor: 'blue',
                            fillColor: "#00F5FF",
                            fillOpacity: 0.2
                        },
                        themeField: "LANDTYPE",
                        styleGroups: [
                            {
                                value: "草地",
                                style: {
                                    fillColor: "#C1FFC1"
                                }
                            },
                            {
                                value: "城市",
                                style: {
                                    fillColor: "#CD7054"
                                }
                            },
                            {
                                value: "灌丛",
                                style: {
                                    fillColor: "#7CCD7C"
                                }
                            },
                            {
                                value: "旱地",
                                style: {
                                    fillColor: "#EE9A49"
                                }
                            },
                            {
                                value: "湖泊水库",
                                style: {
                                    fillColor: "#8EE5EE"
                                }
                            }
                        ]
                    });
                expect(themeLayer.features.length).toEqual(0);
                var cacheCount = themeLayer.getCacheCount();
                expect(cacheCount).toEqual(0);
                //添加数据
                themeLayer.addFeatures(feas);
                expect(themeLayer).not.toBeNull();
                expect(themeLayer.features.length).toBeGreaterThan(0);
                for (var j = 0; j < themeLayer.features.length; j++) {
                    var features_j = themeLayer.features[j];
                    expect(features_j.data).not.toBeNull();
                    expect(features_j.CLASS_NAME).toBe("SuperMap.Feature.Vector");
                    expect(features_j.id).not.toBeNull();
                    var geometry_j = features_j.geometry;
                    expect(geometry_j).not.toBeNull();
                    expect(geometry_j.CLASS_NAME).toBe("SuperMap.Geometry.MultiPolygon");
                    expect(geometry_j.bounds).not.toBeUndefined();
                    expect(geometry_j.componentTypes).not.toBeUndefined();
                    expect(geometry_j.components).not.toBeUndefined();
                    expect(geometry_j.id).not.toBeUndefined();
                }
                expect(themeLayer.styleGroups.length).toEqual(5);
                expect(themeLayer.renderer).not.toBeUndefined();
                expect(themeLayer.renderer).not.toBeNull();
                expect(themeLayer.style).not.toBeNull();
                expect(themeLayer.maxCacheCount).toBeGreaterThan(0);
                expect(themeLayer.themeField).toBe("LANDTYPE");
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
            done();
        }, 5000)
    });


    /*
     * 要素岛洞处理。多面中，一个子面包含另一个子面，则被包含子面处理为岛洞。
     * Parameters:
     * multiPolygon - {<SuperMap.Feature.Vector>} 需要进行岛洞处理的要素。
     * Returns:
     * {<SuperMap.Feature.Vector>} 处理后的要素。
     */
    var islandHoleHandlerForFeature = (feature) => {
        if (feature.geometry instanceof Geometry.MultiPolygon && feature.geometry.components.length > 1) {
            var newGeometry = islandHoleHandlerForMultiPolygon(feature.geometry);
            feature.geometry = newGeometry;
        }
        return feature;

        /*
         * 处理误判为岛洞的多面。
         * iClient 在解析 iServer 数据时，默认将面要素处理为 MultiPolygon 类型，但有的面要素带有岛洞，
         * 这种情况下应该做特殊处理，本函数可以对一个多面进行岛洞处理，并返回新的多面。
         * Parameters:
         * multiPolygon - {<Geometry.MultiPolygon>} 需要进行岛洞处理的多面。
         * Returns:
         * {<Geometry.MultiPolygon>} 处理后的多面。
         */
        var islandHoleHandlerForMultiPolygon = (multiPolygon) => {
            if (multiPolygon instanceof Geometry.MultiPolygon && multiPolygon.components.length > 1) {
                var mPTmp = multiPolygon.clone();
                var componentsPolygons = mPTmp.components;
                //洞面关系数组
                var polygonHoleGroup = [];
                for (var k = 0, len = componentsPolygons.length; k < len; k++) {
                    var geoPolygon = componentsPolygons[k];
                    //不处理已经是岛洞的面
                    if (geoPolygon.components.length = 1) {
                        var lineRings = geoPolygon.components[0];
                        //将每个点放到面中进行判断
                        for (var j = 0, len1 = componentsPolygons.length; j < len1; j++) {
                            if (componentsPolygons[j].components.length != 1) continue;
                            if (j != k) {
                                var polygonGeoComp = componentsPolygons[j].components[0].components;
                                //假设此面为岛洞
                                var isAllPoiIn = true;
                                for (var i = 0, len2 = geoPolygon.components.length; i < len2; i++) {
                                    var point = lineRings.components[i];
                                    if (isPointInPoly(point, polygonGeoComp) == false) {
                                        isAllPoiIn = false;
                                        continue;
                                    }
                                }
                                //确定并记录洞面关系
                                if (isAllPoiIn == true) {
                                    var polygonHole = [j, k];
                                    polygonHoleGroup.push(polygonHole);
                                }
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
                // 根据洞面信息重构多面 Geometry。
                var bPsTmp = [];
                var hPsTmp = [];
                for (var m = 0, len3 = polygonHoleGroup.length; m < len3; m++) {
                    bPsTmp.push(polygonHoleGroup[m][0]);
                    hPsTmp.push(polygonHoleGroup[m][1]);
                }
                //岛洞基础面
                var bPs = delRepeatInArray(bPsTmp);
                //洞面
                var hPs = delRepeatInArray(hPsTmp);
                //独立面
                var iPs = [];
                //查找独立面
                for (var isIPs = 0, compLen = componentsPolygons.length; isIPs < compLen; isIPs++) {
                    var isNoHP = true;
                    for (var o = 0, len = bPs.length; o < len; o++) {
                        if (isIPs == bPs[o]) {
                            isNoHP = false;
                            break;
                        }
                    }
                    if (isNoHP == true) {
                        for (var o = 0, len = hPs.length; o < len; o++) {
                            if (isIPs == hPs[o]) {
                                isNoHP = false;
                                break;
                            }
                        }
                    }
                    if (isNoHP == true) {
                        iPs.push(isIPs);
                    }
                }
                //新洞面信息
                var hpInfo = [];
                //组织新geometry所需要的信息
                for (var o = 0, len4 = bPs.length; o < len4; o++) {
                    var ph = [];
                    ph.push(bPs[o]);
                    for (var m = 0, len3 = polygonHoleGroup.length; m < len3; m++) {
                        if (bPs[o] == polygonHoleGroup[m][0]) {
                            ph.push(polygonHoleGroup[m][1]);
                        }
                    }
                    if (ph.length > 1) {
                        hpInfo.push(ph);
                    }
                }
                var newComponents = [];
                //岛洞子面处理
                for (var m = 0, len3 = hpInfo.length; m < len3; m++) {
                    var geoP = hpInfo[m];
                    var newLineRings = [];
                    for (var n = 0, len6 = geoP.length; n < len6; n++) {
                        newLineRings.push(componentsPolygons[geoP[n]].components[0]);
                    }
                    var newGeoPolygon = new Geometry.Polygon(newLineRings);
                    newComponents.push(newGeoPolygon)
                }
                //独立子面处理
                for (var s = 0, len7 = iPs.length; s < len7; s++) {
                    var is = iPs[s];
                    newComponents.push(componentsPolygons[is])
                }
                multiPolygon.components = newComponents;
            }
            return multiPolygon;
        }

        /*
         * 删除数组中的重复元素。
         * Parameters:
         * arr - {Array} 要进行重复元素删除的数组。
         * Returns:
         * {Array} 无重复元素的数组。
         */
        var delRepeatInArray = (arr) => {
            var newArray = [];
            var provisionalTable = {};
            for (var i = 0, a; (a = arr[i]) != null; i++) {
                if (!provisionalTable[a]) {
                    newArray.push(a);
                    provisionalTable[a] = true;
                }
            }
            return newArray;
        }

        /*
         * 判断一个点是否在多边形里面。(射线法)
         * Parameters:
         * pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
         * poly - {Array(Objecy)}  多边形节点数组。例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
         * Returns:
         * {Boolean} 点是否在多边形内。
         */
        var isPointInPoly = (pt, poly) => {
            for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                && (isIn = !isIn);
            return isIn;
        }
    }
});

