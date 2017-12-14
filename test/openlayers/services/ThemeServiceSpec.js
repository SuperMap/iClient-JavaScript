var ol = require('openlayers');
require('../../../src/openlayers/services/ThemeService');

var worldUrl = GlobeParameter.WorldURL;
var chinaUrl = GlobeParameter.ChinaURL;
var jingjinAreaUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区地图";
var jingjinPopulationUrl = GlobeParameter.jingjinMapURL + "/maps/京津地区人口分布图_专题图";

describe('openlayers_ThemeService', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //点密度专题图
    it('getThemeInfo_dotDensity', function (done) {
        var themeDotDensity = new SuperMap.ThemeDotDensity({
            dotExpression: "Pop_1994",
            value: 5000000,
            style: new SuperMap.ServerStyle({
                markerSize: 3,
                markerSymbolID: 12
            })
        });
        var themeParameters = new SuperMap.ThemeParameters({
            themes: [themeDotDensity],
            datasetNames: ["Countries"],
            dataSourceNames: ["World"]
        });
        var service = new ol.supermap.ThemeService(worldUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000);
    });

    //等级符号专题图
    it('getThemeInfo_GraduatedSymbol', function (done) {
        var themeGraduatedSymbol = new SuperMap.ThemeGraduatedSymbol({
            expression: "SMAREA",
            baseValue: 3000000000000,
            graduatedMode: SuperMap.GraduatedMode.CONSTANT,
            flow: new SuperMap.ThemeFlow({
                flowEnabled: true
            }),
            style: new SuperMap.ThemeGraduatedSymbolStyle({
                positiveStyle: new SuperMap.ServerStyle({
                    markerSize: 50,
                    markerSymbolID: 0,
                    lineColor: new SuperMap.ServerColor(255, 165, 0),
                    fillBackColor: new SuperMap.ServerColor(255, 0, 0)
                })
            })
        });
        var themeParameters = new SuperMap.ThemeParameters({
            themes: [themeGraduatedSymbol],
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"]
        });
        var service = new ol.supermap.ThemeService(chinaUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000)
    });

    //统计专题图
    it('getThemeInfo_Graph', function (done) {
        var themeGraph = new SuperMap.ThemeGraph({
            items: [
                new SuperMap.ThemeGraphItem({
                    caption: "全国省份2013_GDP",
                    graphExpression: "GDP_2013",
                    uniformStyle: new SuperMap.ServerStyle({
                        fillForeColor: new SuperMap.ServerColor(255, 215, 0),
                        lineWidth: 0
                    })
                }),
                new SuperMap.ThemeGraphItem({
                    caption: "全国省份2014_GDP",
                    graphExpression: "GDP_2014",
                    uniformStyle: new SuperMap.ServerStyle({
                        fillForeColor: new SuperMap.ServerColor(0, 191, 255),
                        lineWidth: 0
                    })
                }),
            ],
            barWidth: 0.001,
            graduatedMode: SuperMap.GraduatedMode.CONSTANT,
            graphAxes: new SuperMap.ThemeGraphAxes({
                axesDisplayed: true
            }),
            graphSize: new SuperMap.ThemeGraphSize({
                maxGraphSize: 500000,
                minGraphSize: 200000
            }),
            graphText: new SuperMap.ThemeGraphText({
                graphTextDisplayed: true,
                graphTextFormat: SuperMap.ThemeGraphTextFormat.VALUE,
                graphTextStyle: new SuperMap.ServerTextStyle({
                    fontHeight: 10,
                    fontWidth: 10
                })
            }),
            overlapAvoided: false,
            graphSizeFixed: false,
            graphType: SuperMap.ThemeGraphType.BAR
        });
        var themeParameters = new SuperMap.ThemeParameters({
            themes: [themeGraph],
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"]
        });
        var service = new ol.supermap.ThemeService(chinaUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000)
    });

    //栅格分段专题图
    it('getThemeInfo_GridRange', function (done) {
        var themeGridRangeItem1 = new SuperMap.ThemeGridRangeItem({
            start: -4,
            end: 120,
            color: new SuperMap.ServerColor(198, 244, 240)
        });
        var themeGridRangeItem2 = new SuperMap.ThemeGridRangeItem({
            start: 120,
            end: 240,
            color: new SuperMap.ServerColor(176, 244, 188)
        });
        var themeGridRangeItem3 = new SuperMap.ThemeGridRangeItem({
            start: 240,
            end: 360,
            color: new SuperMap.ServerColor(218, 251, 178)
        });
        var themeGridRange = new SuperMap.ThemeGridRange({
            reverseColor: false,
            rangeMode: SuperMap.RangeMode.EQUALINTERVAL,
            items: [themeGridRangeItem1, themeGridRangeItem2, themeGridRangeItem3]
        });
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            joinItems: null,
            themes: [themeGridRange]
        });
        var service = new ol.supermap.ThemeService(jingjinPopulationUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000);
    });

    it('getThemeInfo_GridUnique', function (done) {
        function setItems() {
            var items = [];
            for (var i = -4; i < 2197; i++) {
                var num = parseInt(i / 135);
                var item = new SuperMap.ThemeGridUniqueItem();
                item.caption = 1;
                item.unique = i;
                item.visible = true;
                switch (num) {
                    case 0:
                        item.color = new SuperMap.ServerColor(198, 244, 240);
                        break;
                    case 1:
                        item.color = new SuperMap.ServerColor(176, 244, 188);
                        break;
                    case 2:
                        item.color = new SuperMap.ServerColor(218, 251, 178);
                        break;
                    default:
                        item.color = new SuperMap.ServerColor(198, 244, 240);
                        break;
                }
                items.push(item);
            }
            return items;
        }

        var themeGridUnique = new SuperMap.ThemeGridUnique({
            defaultcolor: new SuperMap.ServerColor(0, 0, 0),
            items: setItems()
        });
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            themes: [themeGridUnique]
        });
        var service = new ol.supermap.ThemeService(jingjinAreaUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 8000)
    });

    //标签专题图
    it('getThemeInfo_Label', function (done) {
        var themeLabelItem1 = new SuperMap.ThemeLabelItem({
            start: 300,
            end: 3508,
            style: new SuperMap.ServerTextStyle({
                fontHeight: 4,
                foreColor: new SuperMap.ServerColor(0, 0, 0),
            })
        });
        var themeLabelItem2 = new SuperMap.ThemeLabelItem({
            start: 3508,
            end: 5508,
            style: new SuperMap.ServerTextStyle({
                fontHeight: 4,
                foreColor: new SuperMap.ServerColor(155, 30, 45),
            })
        });
        var themeLabelItem3 = new SuperMap.ThemeLabelItem({
            start: 5508,
            end: 10724,
            style: new SuperMap.ServerTextStyle({
                fontHeight: 4,
                foreColor: new SuperMap.ServerColor(30, 45, 155),
            })
        });
        var themeLabel = new SuperMap.ThemeLabel({
            labelExpression: "NAME",
            rangeExpression: "pop_2014",
            numericPrecision: 0,
            items: [themeLabelItem1, themeLabelItem2, themeLabelItem3],
            background: new SuperMap.ThemeLabelBackground({
                backStyle: new SuperMap.ServerStyle({
                    fillForeColor: new SuperMap.ServerColor(179, 209, 193),
                    fillOpaqueRate: 60,
                    lineWidth: 0.1
                }),
                labelBackShape: "RECT"
            })
        });
        var themeParameters = new SuperMap.ThemeParameters({
            themes: [themeLabel],
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"]
        });
        var service = new ol.supermap.ThemeService(chinaUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000)
    });

    //范围分段专题图
    it('getThemeInfo_Range', function (done) {
        themeRangeItem1 = new SuperMap.ThemeRangeItem({
            start: 0,
            end: 500000000000,
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(211, 255, 250),
                lineColor: new SuperMap.ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        themeRangeItem2 = new SuperMap.ThemeRangeItem({
            start: 500000000000,
            end: 1000000000000,
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(178, 218, 199),
                lineColor: new SuperMap.ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        themeRangeItem3 = new SuperMap.ThemeRangeItem({
            start: 1000000000000,
            end: 3000000000000,
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(58, 178, 166),
                lineColor: new SuperMap.ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        var themeRange = new SuperMap.ThemeRange({
            rangeExpression: "SMAREA",
            rangeMode: SuperMap.RangeMode.EQUALINTERVAL,
            items: [themeRangeItem1, themeRangeItem2, themeRangeItem3]
        });
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"],
            joinItems: null,
            themes: [themeRange]
        });
        var service = new ol.supermap.ThemeService(chinaUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000)
    });

    //单值专题图
    it('getThemeInfo_Unique', function (done) {
        var themeUniqueIteme1 = new SuperMap.ThemeUniqueItem({
                unique: "黑龙江省",
                style: new SuperMap.ServerStyle({
                    fillForeColor: new SuperMap.ServerColor(248, 203, 249),
                    lineColor: new SuperMap.ServerColor(255, 255, 255),
                    lineWidth: 0.1
                })
            }),
            themeUniqueIteme2 = new SuperMap.ThemeUniqueItem({
                unique: "湖北省",
                style: new SuperMap.ServerStyle({
                    fillForeColor: new SuperMap.ServerColor(196, 255, 189),
                    lineColor: new SuperMap.ServerColor(255, 255, 255),
                    lineWidth: 0.1
                })
            }),
            themeUniqueIteme3 = new SuperMap.ThemeUniqueItem({
                unique: "吉林省",
                style: new SuperMap.ServerStyle({
                    fillForeColor: new SuperMap.ServerColor(255, 173, 173),
                    lineColor: new SuperMap.ServerColor(255, 255, 255),
                    lineWidth: 0.1
                })
            });
        var themeUniqueItemes = [themeUniqueIteme1, themeUniqueIteme2, themeUniqueIteme3];
        var themeUnique = new SuperMap.ThemeUnique({
            uniqueExpression: "Name",
            items: themeUniqueItemes,
            defaultStyle: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(248, 203, 249),
                lineColor: new SuperMap.ServerColor(255, 255, 255),
                lineWidth: 0.1
            })
        });
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"],
            themes: [themeUnique]
        });
        var service = new ol.supermap.ThemeService(chinaUrl);
        service.getThemeInfo(themeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
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
        }, 5000)
    });
});