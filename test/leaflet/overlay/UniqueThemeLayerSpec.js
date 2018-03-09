import {uniqueThemeLayer} from '../../../src/leaflet/overlay/UniqueThemeLayer';
import {featureService} from '../../../src/leaflet/services/FeatureService';
import {tiledMapLayer} from '../../../src/leaflet/mapping/TiledMapLayer';
import {Geometry} from '../../../src/common/commontypes/Geometry';
import {ThemeStyle} from '../../../src/common/style/ThemeStyle';
import {GetFeaturesBySQLParameters} from '../../../src/common/iServer/GetFeaturesBySQLParameters';
import {FilterParameter} from '../../../src/common/iServer/FilterParameter';
import {DataFormat} from '../../../src/common/REST';

var baseUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图",
    dataUrl = GlobeParameter.editServiceURL_leaflet;
var features = [];
describe('leaflet_UniqueThemeLayer', () => {
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
        map = L.map("map", {
            crs: L.CRS.EPSG4326,
            center: [40, 117],
            maxZoom: 18,
            zoom: 6
        });
        tiledMapLayer(baseUrl).addTo(map);

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
        map.remove();
    });

    it('prepareFeaturesToAdd', (done) => {
        var concatAttributes = (fieldNames, filedValues) => {
            var attr = {};
            for (var i = 0; i < fieldNames.length; i++) {
                attr[fieldNames[i]] = filedValues[i];
            }
            return attr;
        }

        var islandHoleHandlerForFeature = (feature) => {
            if (feature.geometry instanceof Geometry.MultiPolygon && feature.geometry.components.length > 1) {
                feature.geometry = islandHoleHandlerForMultiPolygon(feature.geometry);
            }
            return feature;

            /*
             * Method: islandHoleHandlerForMultiPolygon
             * 处理误判为岛洞的多面。
             *
             * iClient 在解析 iServer 数据时，默认将面要素处理为 MultiPolygon 类型，但有的面要素带有岛洞，
             * 这种情况下应该做特殊处理，本函数可以对一个多面进行岛洞处理，并返回新的多面。
             *
             * Parameters:
             * multiPolygon - {<SuperMap.Geometry.MultiPolygon>} 需要进行岛洞处理的多面。
             *
             * Returns:
             * {<SuperMap.Geometry.MultiPolygon>} 处理后的多面。
             */
            var islandHoleHandlerForMultiPolygon = (multiPolygon) => {
                if (!(multiPolygon instanceof Geometry.MultiPolygon) || multiPolygon.components.length < 2) {
                    return multiPolygon;
                }
                var mPTmp = multiPolygon.clone();
                var componentsPolygons = mPTmp.components;

                //洞面关系数组
                var polygonHoleGroup = [];

                for (var k = 0, len = componentsPolygons.length; k < len; k++) {
                    var geoPolygon = componentsPolygons[k];

                    //不处理已经是岛洞的面
                    if (geoPolygon.components.length != 1) {
                        continue;
                    }
                    var lineRings = geoPolygon.components[0];

                    //将每个点放到面中进行判断
                    for (var j = 0, len1 = componentsPolygons.length; j < len1; j++) {
                        if (componentsPolygons[j].components.length != 1 || (j == k)) continue;
                        var polygonGeoComp = componentsPolygons[j].components[0].components;

                        //假设此面为岛洞
                        var isAllPoiIn = true;

                        for (var i = 0, len2 = geoPolygon.components.length; i < len2; i++) {
                            var point = lineRings.components[i];
                            if (isPointInPoly(point, polygonGeoComp) == false) {
                                isAllPoiIn = false;
                            }
                        }

                        //确定并记录洞面关系
                        if (isAllPoiIn == true) {
                            var polygonHole = [j, k];
                            polygonHoleGroup.push(polygonHole);
                        }
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
                return multiPolygon;
            }

            /*
             * Method: delRepeatInArray
             * 删除数组中的重复元素。
             *
             * Parameters:
             * arr - {Array} 要进行重复元素删除的数组。
             *
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
             * Method: PointInPoly
             * 判断一个点是否在多边形里面。(射线法)
             *
             * Parameters:
             * pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
             * poly - {Array(Objecy)}  多边形节点数组。例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
             *
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

        var getFeatureBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: new FilterParameter({
                name: "Jingjin",
                attributeFilter: "SMID > -1"
            }),
            toIndex: 500,
            datasetNames: ["Jingjin:Landuse_R"]
        });
        var getServiceResult = null;
        featureService(dataUrl).getFeaturesBySQL(getFeatureBySQLParams, (serviceResult) => {
            getServiceResult = serviceResult;
        }, DataFormat.ISERVER);
        setTimeout(() => {
            expect(getServiceResult).not.toBeNull();
            var result = getServiceResult.result;
            if (result && result.features) {
                var fea = result.features;
                var IHFeas = []; //岛洞多面
                for (var i = 0, len = fea.length; i < len; i++) {
                    var feature = fea[i];
                    feature.attributes = concatAttributes(feature.fieldNames, feature.fieldValues);
                    var smid = feature.attributes.SMID.toString();
                    if (smid === "86" || smid === "87" || smid === "89") {
                        // islandHoleHandlerForFeature 处理岛洞面
                        IHFeas.push(islandHoleHandlerForFeature(feature));
                    } else {
                        features.push(feature);
                    }
                }
                // 岛洞多面要素必需在其他要素之前添加
                features = IHFeas.concat(features);
                expect(features.length).toBeGreaterThan(0);
                done();
            } else {
                console.log("未能通过'getFeaturesBySQL'方法获取接下来'addFeatures'方法所需要的数据");
                done();
            }
        }, 6000);
    });

    it('addFeatures', (done) => {
        //initialize
        var themeLayer = uniqueThemeLayer("ThemeLayer", {
            isHoverAble: true,
            opacity: 0.8
        }).addTo(map);
        // 图层基础样式
        themeLayer.style = new ThemeStyle({
            shadowBlur: 3,
            shadowColor: "#000000",
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            fillColor: "#FFFFFF"
        });
        // hover 高亮样式
        themeLayer.highlightStyle = new ThemeStyle({
            stroke: true,
            strokeWidth: 2,
            strokeColor: 'blue',
            fillColor: "#00F5FF",
            fillOpacity: 0.2
        });
        // 用于单值专题图的属性字段名称
        themeLayer.themeField = "LANDTYPE";
        // 风格数组，设定值对应的样式
        themeLayer.styleGroups = [
            {
                value: "草地",
                style: {
                    fillColor: "#C1FFC1"
                }
            }, {
                value: "城市",
                style: {
                    fillColor: "#CD7054"
                }
            }, {
                value: "灌丛",
                style: {
                    fillColor: "#7CCD7C"
                }
            }, {
                value: "旱地",
                style: {
                    fillColor: "#EE9A49"
                }
            }, {
                value: "湖泊水库",
                style: {
                    fillColor: "#8EE5EE"
                }
            }, {
                value: "经济林",
                style: {
                    fillColor: "#548B54"
                }
            }, {
                value: "沙漠",
                style: {
                    fillColor: "#DEB887"
                }
            }, {
                value: "水浇地",
                style: {
                    fillColor: "#E0FFFF"
                }
            }, {
                value: "水田",
                style: {
                    fillColor: "#388E8E"
                }
            }, {
                value: "用材林",
                style: {
                    fillColor: "#556B2F"
                }
            }, {
                value: "沼泽",
                style: {
                    fillColor: "#2F4F4F"
                }
            }, {
                value: "缺省风格",
                style: {
                    fillColor: "#ABABAB"
                }
            }
        ];
        expect(themeLayer).not.toBeNull();
        expect(themeLayer.options.isHoverAble).toBeTruthy();
        expect(themeLayer.name).toBe("ThemeLayer");
        expect(themeLayer.id).not.toBeNull();
        expect(themeLayer.options.opacity).toEqual(0.8);
        expect(themeLayer.style).not.toBeNull();
        expect(themeLayer.highlightStyle).not.toBeNull();
        expect(themeLayer.styleGroups.length).toEqual(12);
        expect(themeLayer.themeField).toBe("LANDTYPE");
        expect(themeLayer.features.length).toEqual(0);
        // addFeatures
        if (features.length != 0) {
            themeLayer.addFeatures(features);
            setTimeout(() => {
                try {
                    expect(themeLayer.features.length).toBeGreaterThan(0);
                    // getCacheCount
                    var cacheCount = themeLayer.getCacheCount();
                    expect(cacheCount).toBeGreaterThan(0);
                    // setMaxCacheCount
                    expect(themeLayer.maxCacheCount).toBeGreaterThan(10);
                    themeLayer.setMaxCacheCount(10);
                    expect(themeLayer.maxCacheCount).toEqual(10);
                    // getShapesByFeatureID
                    var shape1 = themeLayer.getShapesByFeatureID();
                    var shape2 = themeLayer.getShapesByFeatureID(features[0].ID);
                    expect(shape1.length).toBeGreaterThan(0);
                    expect(shape2.length).toEqual(0);
                    // redraw
                    var isRedraw = themeLayer.redraw();
                    expect(isRedraw).toBeTruthy();
                    // removeFeatures
                    themeLayer.removeFeatures(features);
                    themeLayer.removeAllFeatures();
                    expect(themeLayer.features.length).toEqual(0);
                    themeLayer.clear();
                    done();
                } catch (exception) {
                    console.log("'addFeatures'案例失败：" + exception.name + ":" + exception.message);
                    themeUniqueService.destroy();
                    expect(false).toBeTruthy();
                    done();
                }
            }, 6000);
        } else {
            console.log("'addFeatures'案例未获取到待添加的数据");
        }
    });
});