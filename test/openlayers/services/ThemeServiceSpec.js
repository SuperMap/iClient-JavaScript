import {ThemeService} from '../../../src/openlayers/services/ThemeService';
import {ThemeDotDensity} from '../../../src/common/iServer/ThemeDotDensity';
import {ServerStyle} from '../../../src/common/iServer/ServerStyle';
import {ThemeParameters} from '../../../src/common/iServer/ThemeParameters';
import {ThemeGraduatedSymbol} from '../../../src/common/iServer/ThemeGraduatedSymbol';
import {ThemeFlow} from '../../../src/common/iServer/ThemeFlow';
import {ThemeGraduatedSymbolStyle} from '../../../src/common/iServer/ThemeGraduatedSymbolStyle';
import {ServerColor} from '../../../src/common/iServer/ServerColor';
import {ThemeGraph} from '../../../src/common/iServer/ThemeGraph';
import {ThemeGraphItem} from '../../../src/common/iServer/ThemeGraphItem';
import {ThemeGraphAxes} from '../../../src/common/iServer/ThemeGraphAxes';
import {ThemeGraphSize} from '../../../src/common/iServer/ThemeGraphSize';
import {ThemeGraphText} from '../../../src/common/iServer/ThemeGraphText';
import {ServerTextStyle} from '../../../src/common/iServer/ServerTextStyle';
import {ThemeGridRangeItem} from '../../../src/common/iServer/ThemeGridRangeItem';
import {ThemeGridRange} from '../../../src/common/iServer/ThemeGridRange';
import {ThemeGridUniqueItem} from '../../../src/common/iServer/ThemeGridUniqueItem';
import {ThemeGridUnique} from '../../../src/common/iServer/ThemeGridUnique';
import {ThemeLabelItem} from '../../../src/common/iServer/ThemeLabelItem';
import {ThemeLabel} from '../../../src/common/iServer/ThemeLabel';
import {ThemeLabelBackground} from '../../../src/common/iServer/ThemeLabelBackground';
import {ThemeRangeItem} from '../../../src/common/iServer/ThemeRangeItem';
import {ThemeRange} from '../../../src/common/iServer/ThemeRange';
import {ThemeUniqueItem} from '../../../src/common/iServer/ThemeUniqueItem';
import {ThemeUnique} from '../../../src/common/iServer/ThemeUnique';
import {GraduatedMode} from '../../../src/common/REST';
import {ThemeGraphTextFormat} from '../../../src/common/REST';
import {ThemeGraphType} from '../../../src/common/REST';
import {RangeMode} from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var worldUrl = GlobeParameter.WorldURL;
var chinaUrl = GlobeParameter.ChinaURL;
var jingjinAreaUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图";
var jingjinPopulationUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区人口分布图_专题图";

describe('openlayers_ThemeService', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //点密度专题图
    it('getThemeInfo_dotDensity', (done) => {
        var themeDotDensity = new ThemeDotDensity({
            dotExpression: "Pop_1994",
            value: 5000000,
            style: new ServerStyle({
                markerSize: 3,
                markerSymbolID: 12
            })
        });
        var themeParameters = new ThemeParameters({
            themes: [themeDotDensity],
            datasetNames: ["Countries"],
            dataSourceNames: ["World"]
        });
        var service = new ThemeService(worldUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("World");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("Countries");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_3bf6200f253a42d1bd7b44637e07225f","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_3bf6200f253a42d1bd7b44637e07225f.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'Countries'");
                expect(serviceResult.object.options.data).toContain("'dataSourceName': 'World'");
                done();
            } catch (e) {
                console.log("'getThemeInfo_dotDensity'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //等级符号专题图
    it('getThemeInfo_GraduatedSymbol', (done) => {
        var themeGraduatedSymbol = new ThemeGraduatedSymbol({
            expression: "SMAREA",
            baseValue: 3000000000000,
            graduatedMode: GraduatedMode.CONSTANT,
            style: new ThemeGraduatedSymbolStyle({
                positiveStyle: new ServerStyle({
                    markerSize: 50,
                    markerSymbolID: 0,
                    lineColor: new ServerColor(255, 165, 0),
                    fillBackColor: new ServerColor(255, 0, 0)
                })
            })
        });
        var themeParameters = new ThemeParameters({
            themes: [themeGraduatedSymbol],
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"]
        });
        var service = new ThemeService(chinaUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params,options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("China");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("China_Province_pg");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_53ac9e8fb44b4fee92cc0bd0d503e00c","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_53ac9e8fb44b4fee92cc0bd0d503e00c.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_GraduatedSymbol'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //统计专题图
    it('getThemeInfo_Graph', (done) => {
        var themeGraph = new ThemeGraph({
            items: [
                new ThemeGraphItem({
                    caption: "全国省份2013_GDP",
                    graphExpression: "GDP_2013",
                    uniformStyle: new ServerStyle({
                        fillForeColor: new ServerColor(255, 215, 0),
                        lineWidth: 0
                    })
                }),
                new ThemeGraphItem({
                    caption: "全国省份2014_GDP",
                    graphExpression: "GDP_2014",
                    uniformStyle: new ServerStyle({
                        fillForeColor: new ServerColor(0, 191, 255),
                        lineWidth: 0
                    })
                }),
            ],
            barWidth: 0.001,
            graduatedMode: GraduatedMode.CONSTANT,
            graphAxes: new ThemeGraphAxes({
                axesDisplayed: true
            }),
            graphSize: new ThemeGraphSize({
                maxGraphSize: 500000,
                minGraphSize: 200000
            }),
            graphText: new ThemeGraphText({
                graphTextDisplayed: true,
                graphTextFormat: ThemeGraphTextFormat.VALUE,
                graphTextStyle: new ServerTextStyle({
                    fontHeight: 10,
                    fontWidth: 10
                })
            }),
            overlapAvoided: false,
            graphSizeFixed: false,
            graphType: ThemeGraphType.BAR
        });
        var themeParameters = new ThemeParameters({
            themes: [themeGraph],
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"]
        });
        var service = new ThemeService(chinaUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl,params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("China");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("China_Province_pg");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7042d3977d3440b2a02375d7bde4a640","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-jingjin/rest/maps/京津地区人口分布图_专题图/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_7042d3977d3440b2a02375d7bde4a640.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_dotDensity'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //栅格分段专题图
    it('getThemeInfo_GridRange', (done) => {
        var themeGridRangeItem1 = new ThemeGridRangeItem({
            start: -4,
            end: 120,
            color: new ServerColor(198, 244, 240)
        });
        var themeGridRangeItem2 = new ThemeGridRangeItem({
            start: 120,
            end: 240,
            color: new ServerColor(176, 244, 188)
        });
        var themeGridRangeItem3 = new ThemeGridRangeItem({
            start: 240,
            end: 360,
            color: new ServerColor(218, 251, 178)
        });
        var themeGridRange = new ThemeGridRange({
            reverseColor: false,
            rangeMode: RangeMode.EQUALINTERVAL,
            items: [themeGridRangeItem1, themeGridRangeItem2, themeGridRangeItem3]
        });
        var themeParameters = new ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            joinItems: null,
            themes: [themeGridRange]
        });
        var service = new ThemeService(jingjinPopulationUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl,params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(jingjinPopulationUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("Jingjin");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("JingjinTerrain");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_fff5ed237346469c81d2e9be21f42496","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-jingjin/rest/maps/京津地区人口分布图_专题图/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_fff5ed237346469c81d2e9be21f42496.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'JingjinTerrain','dataSourceName': 'Jingjin'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_GridRange'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    it('getThemeInfo_GridUnique', (done) => {
        var setItems = () => {
            var items = [];
            for (var i = -4; i < 2197; i++) {
                var num = parseInt(i / 135);
                var item = new ThemeGridUniqueItem();
                item.caption = 1;
                item.unique = i;
                item.visible = true;
                switch (num) {
                    case 0:
                        item.color = new ServerColor(198, 244, 240);
                        break;
                    case 1:
                        item.color = new ServerColor(176, 244, 188);
                        break;
                    case 2:
                        item.color = new ServerColor(218, 251, 178);
                        break;
                    default:
                        item.color = new ServerColor(198, 244, 240);
                        break;
                }
                items.push(item);
            }
            return items;
        };
        var themeGridUnique = new ThemeGridUnique({
            defaultcolor: new ServerColor(0, 0, 0),
            items: setItems()
        });
        var themeParameters = new ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            themes: [themeGridUnique]
        });
        var service = new ThemeService(jingjinAreaUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params,options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(jingjinAreaUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("Jingjin");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("JingjinTerrain");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"f701028a2b7144b19b582f55c1902b18_71d7221ef21a48e19f7930115aaea07a","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-jingjin/rest/maps/京津地区地图/tempLayersSet/f701028a2b7144b19b582f55c1902b18_71d7221ef21a48e19f7930115aaea07a.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'JingjinTerrain','dataSourceName': 'Jingjin'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_GridUnique'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //标签专题图
    it('getThemeInfo_Label', (done) => {
        var themeLabelItem1 = new ThemeLabelItem({
            start: 300,
            end: 3508,
            style: new ServerTextStyle({
                fontHeight: 4,
                foreColor: new ServerColor(0, 0, 0),
            })
        });
        var themeLabelItem2 = new ThemeLabelItem({
            start: 3508,
            end: 5508,
            style: new ServerTextStyle({
                fontHeight: 4,
                foreColor: new ServerColor(155, 30, 45),
            })
        });
        var themeLabelItem3 = new ThemeLabelItem({
            start: 5508,
            end: 10724,
            style: new ServerTextStyle({
                fontHeight: 4,
                foreColor: new ServerColor(30, 45, 155),
            })
        });
        var themeLabel = new ThemeLabel({
            labelExpression: "NAME",
            rangeExpression: "pop_2014",
            numericPrecision: 0,
            items: [themeLabelItem1, themeLabelItem2, themeLabelItem3],
            background: new ThemeLabelBackground({
                backStyle: new ServerStyle({
                    fillForeColor: new ServerColor(179, 209, 193),
                    fillOpaqueRate: 60,
                    lineWidth: 0.1
                }),
                labelBackShape: "RECT"
            })
        });
        var themeParameters = new ThemeParameters({
            themes: [themeLabel],
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"]
        });
        var service = new ThemeService(chinaUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params,options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("China");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("China_Province_pg");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_aaffb9a238aa4ab88cca495fbca6991b","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_aaffb9a238aa4ab88cca495fbca6991b.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_Label'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //范围分段专题图
    it('getThemeInfo_Range', (done) => {
        var themeRangeItem1 = new ThemeRangeItem({
            start: 0,
            end: 500000000000,
            style: new ServerStyle({
                fillForeColor: new ServerColor(211, 255, 250),
                lineColor: new ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        var themeRangeItem2 = new ThemeRangeItem({
            start: 500000000000,
            end: 1000000000000,
            style: new ServerStyle({
                fillForeColor: new ServerColor(178, 218, 199),
                lineColor: new ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        var themeRangeItem3 = new ThemeRangeItem({
            start: 1000000000000,
            end: 3000000000000,
            style: new ServerStyle({
                fillForeColor: new ServerColor(58, 178, 166),
                lineColor: new ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        var themeRange = new ThemeRange({
            rangeExpression: "SMAREA",
            rangeMode: RangeMode.EQUALINTERVAL,
            items: [themeRangeItem1, themeRangeItem2, themeRangeItem3]
        });
        var themeParameters = new ThemeParameters({
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"],
            joinItems: null,
            themes: [themeRange]
        });
        var service = new ThemeService(chinaUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params,options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("China");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("China_Province_pg");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_689a8864220f484ea694c6f7d60ca3cb","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_689a8864220f484ea694c6f7d60ca3cb.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_Range'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //单值专题图
    it('getThemeInfo_Unique', (done) => {
        var themeUniqueIteme1 = new ThemeUniqueItem({
                unique: "黑龙江省",
                style: new ServerStyle({
                    fillForeColor: new ServerColor(248, 203, 249),
                    lineColor: new ServerColor(255, 255, 255),
                    lineWidth: 0.1
                })
            }),
            themeUniqueIteme2 = new ThemeUniqueItem({
                unique: "湖北省",
                style: new ServerStyle({
                    fillForeColor: new ServerColor(196, 255, 189),
                    lineColor: new ServerColor(255, 255, 255),
                    lineWidth: 0.1
                })
            }),
            themeUniqueIteme3 = new ThemeUniqueItem({
                unique: "吉林省",
                style: new ServerStyle({
                    fillForeColor: new ServerColor(255, 173, 173),
                    lineColor: new ServerColor(255, 255, 255),
                    lineWidth: 0.1
                })
            });
        var themeUniqueItemes = [themeUniqueIteme1, themeUniqueIteme2, themeUniqueIteme3];
        var themeUnique = new ThemeUnique({
            uniqueExpression: "Name",
            items: themeUniqueItemes,
            defaultStyle: new ServerStyle({
                fillForeColor: new ServerColor(248, 203, 249),
                lineColor: new ServerColor(255, 255, 255),
                lineWidth: 0.1
            })
        });
        var themeParameters = new ThemeParameters({
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"],
            themes: [themeUnique]
        });
        var service = new ThemeService(chinaUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl,params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaUrl + "/tempLayersSet");
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj[0].type).toBe("UGC");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.dataSourceName).toBe("China");
            expect(paramsObj[0].subLayers.layers[0].datasetInfo.name).toBe("China_Province_pg");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_2cbb15b9a3dc4fddad377781f250d3a7","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/c01d29d8d41743adb673cd1cecda6ed0_2cbb15b9a3dc4fddad377781f250d3a7.json"}`));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.options.method).toEqual("POST");
                expect(serviceResult.object.options.data).toContain("UNIQUE");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceID).not.toBeNull();
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'getThemeInfo_Unique'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});