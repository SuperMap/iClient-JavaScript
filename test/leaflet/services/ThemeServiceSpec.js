require('../../../src/leaflet/services/ThemeService');

var WorldURL = GlobeParameter.WorldURL;      //ThemeDotDensity, ThemeLable
var ChinaURL = GlobeParameter.ChinaURL;      //ThemeGraduatedSymbol, ThemeRange, ThemeUnique
var jingjinPopulationURL = GlobeParameter.jingjinMapURL + "/maps/京津地区人口分布图_专题图";       //themeGraph, themeGridRange
var jingjinMapURL = GlobeParameter.jingjinMapURL + "/maps/京津地区地图";       // themeGridUnique
var options = {
    serverType: 'iServer'
};

describe('leaflet_testThemeService', function () {
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

    // 点密度专题图
    it('successEvent:ThemeDotDensity', function (done) {
        var themeDotDensity = new SuperMap.ThemeDotDensity({
            dotExpression: 'Pop_1994',
            value: 5000000,
            style: new SuperMap.ServerStyle({
                markerSize: 3,
                markerSymbolID: 12
            })
        });
        var themeDotDensityParameters = new SuperMap.ThemeParameters({
            themes: [themeDotDensity],
            datasetNames: ['Countries'],
            dataSourceNames: ['World']
        });
        var themeDotDensityService = L.supermap.themeService(WorldURL, options).getThemeInfo(themeDotDensityParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeDotDensityService).not.toBeNull();
                expect(themeDotDensityService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("DOTDENSITY");
                expect(serviceResult.object.options.data).toContain("'markerSize':3,'markerSymbolID':12");
                expect(serviceResult.object.options.data).toContain("'name': 'Countries','dataSourceName': 'World'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeDotDensityService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:ThemeDotDensity'案例失败：" + exception.name + ":" + exception.message);
                themeDotDensityService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    // 等级符号专题图
    it('successEvent:ThemeGraduatedSymbol', function (done) {
        var themeGraduatedSymbol = new SuperMap.ThemeGraduatedSymbol({
            expression: 'SMAREA',
            baseValue: 3000000000000,
            graduatedMode: 'CONSTANT',
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
        var themeGraduatedSymbolParameters = new SuperMap.ThemeParameters({
            themes: [themeGraduatedSymbol],
            datasetNames: ['China_Province_pg'],
            dataSourceNames: ['China']
        });
        var themeGraduatedSymbolService = L.supermap.themeService(ChinaURL, options).getThemeInfo(themeGraduatedSymbolParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeGraduatedSymbolService).not.toBeNull();
                expect(themeGraduatedSymbolService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("GRADUATEDSYMBOL");
                expect(serviceResult.object.options.data).toContain("'markerSize':50,'markerSymbolID':0");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeGraduatedSymbolService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:ThemeGraduatedSymbol'案例失败：" + exception.name + ":" + exception.message);
                themeGraduatedSymbolService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    // 统计专题图
    it('successEvent:ThemeGraph', function (done) {
        var themeGraph = new SuperMap.ThemeGraph({
            items: [
                new SuperMap.ThemeGraphItem({
                    caption: "1992-1995人口增长率",
                    graphExpression: "Pop_Rate95",
                    uniformStyle: new SuperMap.ServerStyle({
                        fillForeColor: new SuperMap.ServerColor(92, 73, 234),
                        lineWidth: 0.1
                    })
                }),
                new SuperMap.ThemeGraphItem({
                    caption: "1995-1999人口增长率",
                    graphExpression: "Pop_Rate99",
                    uniformStyle: new SuperMap.ServerStyle({
                        fillForeColor: new SuperMap.ServerColor(211, 111, 240),
                        lineWidth: 0.1
                    })
                })
            ],
            barWidth: 0.03,
            graduatedMode: "SQUAREROOT",
            graphAxes: new SuperMap.ThemeGraphAxes({
                axesDisplayed: true
            }),
            graphSize: new SuperMap.ThemeGraphSize({
                maxGraphSize: 1,
                minGraphSize: 0.35
            }),
            graphText: new SuperMap.ThemeGraphText({
                graphTextDisplayed: true,
                graphTextFormat: "VALUE",
                graphTextStyle: new SuperMap.ServerTextStyle({
                    sizeFixed: true,
                    fontHeight: 9,
                    fontWidth: 5
                })
            }),
            graphType: "BAR3D"
        });
        var themeGraphParameters = new SuperMap.ThemeParameters({
            themes: [themeGraph],
            dataSourceNames: ["Jingjin"],
            datasetNames: ["BaseMap_R"]
        });
        var themeGraphService = L.supermap.themeService(jingjinPopulationURL, options).getThemeInfo(themeGraphParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeGraphService).not.toBeNull();
                expect(themeGraphService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("GRAPH");
                expect(serviceResult.object.options.data).toContain("'maxGraphSize':1,'minGraphSize':0.35");
                expect(serviceResult.object.options.data).toContain("'name': 'BaseMap_R','dataSourceName': 'Jingjin'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeGraphService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:ThemeGraph'案例失败：" + exception.name + ":" + exception.message);
                themeGraphService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    // 栅格分段专题图
    it('successEvent:ThemeGridRange', function (done) {
        var themeGridRangeItem1 = new SuperMap.ThemeGridRangeItem({
                start: -4,
                end: 120,
                color: new SuperMap.ServerColor(198, 244, 240)
            }),
            themeGridRangeItem2 = new SuperMap.ThemeGridRangeItem({
                start: 120,
                end: 240,
                color: new SuperMap.ServerColor(176, 244, 188)
            }),
            themeGridRangeItem3 = new SuperMap.ThemeGridRangeItem({
                start: 240,
                end: 360,
                color: new SuperMap.ServerColor(218, 251, 178)
            }),
            themeGridRangeItem4 = new SuperMap.ThemeGridRangeItem({
                start: 360,
                end: 480,
                color: new SuperMap.ServerColor(220, 236, 145)
            }),
            themeGridRangeItem5 = new SuperMap.ThemeGridRangeItem({
                start: 480,
                end: 600,
                color: new SuperMap.ServerColor(96, 198, 66)
            }),
            themeGridRangeItem6 = new SuperMap.ThemeGridRangeItem({
                start: 600,
                end: 720,
                color: new SuperMap.ServerColor(20, 142, 53)
            }),
            themeGridRange = new SuperMap.ThemeGridRange({
                reverseColor: false,
                rangeMode: SuperMap.RangeMode.EQUALINTERVAL,
                items: [
                    themeGridRangeItem1, themeGridRangeItem2,
                    themeGridRangeItem3, themeGridRangeItem4,
                    themeGridRangeItem5, themeGridRangeItem6,
                ]
            });
        var themeGridRangeParameters = new SuperMap.ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            joinItems: null,
            themes: [themeGridRange]
        });
        var themeGridRangeService = L.supermap.themeService(jingjinPopulationURL, options).getThemeInfo(themeGridRangeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeGridRangeService).not.toBeNull();
                expect(themeGridRangeService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("GRIDRANGE");
                expect(serviceResult.object.options.data).toContain("'name': 'JingjinTerrain','dataSourceName': 'Jingjin'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeGridRangeService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:themeGridRange'案例失败：" + exception.name + ":" + exception.message);
                themeGridRangeService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 6000)
    });

    // 标签专题图
    it('successEvent:ThemeLable', function (done) {
        var style1 = new SuperMap.ServerTextStyle({
            fontHeight: 4,
            foreColor: new SuperMap.ServerColor(100, 20, 50),
            sizeFixed: true,
            bold: true

        });
        var style2 = new SuperMap.ServerTextStyle({
            fontHeight: 4,
            foreColor: new SuperMap.ServerColor(250, 0, 0),
            sizeFixed: true,
            bold: true
        });
        var themeLabelItem1 = new SuperMap.ThemeLabelItem({
            start: 0.0,
            end: 7800000,
            style: style1
        });
        var themeLabelItem2 = new SuperMap.ThemeLabelItem({
            start: 7800000,
            end: 15000000,
            style: style2
        });
        var themeLabel = new SuperMap.ThemeLabel({
            matrixCells: [
                [new SuperMap.LabelThemeCell({
                    themeLabel: new SuperMap.ThemeLabel({
                        labelExpression: "CAP_POP",
                        rangeExpression: "CAP_POP",
                        numericPrecision: 0,
                        items: [themeLabelItem1]
                    })
                })],
                [new SuperMap.LabelThemeCell({
                    themeLabel: new SuperMap.ThemeLabel({
                        labelExpression: "CAPITAL",
                        rangeExpression: "SmID",
                        numericPrecision: 0,
                        items: [themeLabelItem2]
                    })
                })]
            ],
            background: new SuperMap.ThemeLabelBackground({
                backStyle: new SuperMap.ServerStyle({
                    fillForeColor: new SuperMap.ServerColor(179, 209, 193),
                    fillOpaqueRate: 60,
                    lineWidth: 0.1
                }),
                labelBackShape: "RECT"
            })
        });
        var themeLableParameters = new SuperMap.ThemeParameters({
            themes: [themeLabel],
            datasetNames: ["Capitals"],
            dataSourceNames: ["World"]
        });
        var themeLableService = L.supermap.themeService(WorldURL, options).getThemeInfo(themeLableParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeLableService).not.toBeNull();
                expect(themeLableService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("LABEL");
                expect(serviceResult.object.options.data).toContain("'name': 'Capitals','dataSourceName': 'World'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeLableService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:ThemeLable'案例失败：" + exception.name + ":" + exception.message);
                themeLableService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    // 范围分段专题图
    it('successEvent:ThemeRange', function (done) {
        var themeRangeItem1 = new SuperMap.ThemeRangeItem({
            start: 0,
            end: 500000000000,
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(211, 255, 250),
                lineColor: new SuperMap.ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        var themeRangeItem2 = new SuperMap.ThemeRangeItem({
            start: 500000000000,
            end: 1000000000000,
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(178, 218, 199),
                lineColor: new SuperMap.ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        var themeRange = new SuperMap.ThemeRange({
            rangeExpression: "SMAREA",
            rangeMode: "EQUALINTERVAL",
            items: [themeRangeItem1, themeRangeItem2]
        });
        var themeRangeParameters = new SuperMap.ThemeParameters({
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"],
            joinItems: null,
            themes: [themeRange]
        });
        var themeRangeService = L.supermap.themeService(ChinaURL, options).getThemeInfo(themeRangeParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeRangeService).not.toBeNull();
                expect(themeRangeService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("RANGE");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeRangeService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:ThemeRange'案例失败：" + exception.name + ":" + exception.message);
                themeRangeService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });

    it('successEvent:ThemeUnique', function (done) {
        var style1 = new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(248, 203, 249),
                lineColor: new SuperMap.ServerColor(255, 255, 255),
                lineWidth: 0.1
            }),
            style2 = new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(196, 255, 189),
                lineColor: new SuperMap.ServerColor(255, 255, 255),
                lineWidth: 0.1
            });
        var themeUniqueIteme1 = new SuperMap.ThemeUniqueItem({
                unique: "黑龙江省",
                style: style1
            }),
            themeUniqueIteme2 = new SuperMap.ThemeUniqueItem({
                unique: "湖北省",
                style: style2
            });
        var themeUniqueItemes = [themeUniqueIteme1, themeUniqueIteme2];
        var themeUnique = new SuperMap.ThemeUnique({
            uniqueExpression: "Name",
            items: themeUniqueItemes,
            defaultStyle: style1
        });
        var themeUniqueParameters = new SuperMap.ThemeParameters({
            datasetNames: ["China_Province_pg"],
            dataSourceNames: ["China"],
            themes: [themeUnique]
        });
        var themeUniqueService = L.supermap.themeService(ChinaURL, options).getThemeInfo(themeUniqueParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(themeUniqueService).not.toBeNull();
                expect(themeUniqueService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.object.options.method).toBe("POST");
                expect(serviceResult.object.options.data).not.toBeNull();
                expect(serviceResult.object.options.data).toContain("UNIQUE");
                expect(serviceResult.object.options.data).toContain("'name': 'China_Province_pg','dataSourceName': 'China'");
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                themeUniqueService.destroy();
                done();
            } catch (exception) {
                console.log("leafletThemeService_'successEvent:ThemeUnique'案例失败：" + exception.name + ":" + exception.message);
                themeUniqueService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 3000)
    });
});

