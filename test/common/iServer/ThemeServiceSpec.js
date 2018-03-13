import {ThemeService} from '../../../src/common/iServer/ThemeService';
import {ThemeParameters} from '../../../src/common/iServer/ThemeParameters';
import {ThemeDotDensity} from '../../../src/common/iServer/ThemeDotDensity';
import {ThemeGraduatedSymbol} from '../../../src/common/iServer/ThemeGraduatedSymbol';
import {ThemeGraduatedSymbolStyle} from '../../../src/common/iServer/ThemeGraduatedSymbolStyle';
import {ThemeGraph} from '../../../src/common/iServer/ThemeGraph';
import {ThemeGraphItem} from '../../../src/common/iServer/ThemeGraphItem';
import {ThemeGraphAxes} from '../../../src/common/iServer/ThemeGraphAxes';
import {ThemeGraphSize} from '../../../src/common/iServer/ThemeGraphSize';
import {ThemeGraphText} from '../../../src/common/iServer/ThemeGraphText';
import {ThemeLabelItem} from '../../../src/common/iServer/ThemeLabelItem';
import {ThemeLabel} from '../../../src/common/iServer/ThemeLabel';
import {LabelThemeCell} from '../../../src/common/iServer/LabelThemeCell';
import {LabelSymbolCell} from '../../../src/common/iServer/LabelSymbolCell';
import {ThemeLabelBackground} from '../../../src/common/iServer/ThemeLabelBackground';
import {ThemeRangeItem} from '../../../src/common/iServer/ThemeRangeItem';
import {ThemeRange} from '../../../src/common/iServer/ThemeRange';
import {ThemeUniqueItem} from '../../../src/common/iServer/ThemeUniqueItem';
import {ThemeUnique} from '../../../src/common/iServer/ThemeUnique';
import {ThemeLabelText} from '../../../src/common/iServer/ThemeLabelText';
import {ServerStyle} from '../../../src/common/iServer/ServerStyle';
import {ServerColor} from '../../../src/common/iServer/ServerColor';
import {ServerTextStyle} from '../../../src/common/iServer/ServerTextStyle';
import {ThemeFlow} from '../../../src/common/iServer/ThemeFlow';
import {ThemeOffset} from '../../../src/common/iServer/ThemeOffset';
import {JoinItem} from '../../../src/common/iServer/JoinItem';
import {ThemeMemoryData} from '../../../src/common/iServer/ThemeMemoryData';
import {RangeMode} from '../../../src/common/REST';
import {LabelOverLengthMode} from '../../../src/common/REST';
import {GraduatedMode} from '../../../src/common/REST';
import {ThemeGraphType} from '../../../src/common/REST';
import {JoinType} from '../../../src/common/REST';
import {LabelBackShape} from '../../../src/common/REST';

var mapServiceURL = GlobeParameter.mapServiceURL,
    themeURL = mapServiceURL + "World Map";
var themeEventArgsSystem = null, serviceFailedEventArgsSystem = null;
var themeCompleted = (themeEventArgs) => {
    themeEventArgsSystem = themeEventArgs;
};
var themeFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var initThemeService = () => {
    return new ThemeService(themeURL);
};
var initThemeService_RegisterListener = () => {
    return new ThemeService(themeURL,
        {
            eventListeners: {
                "processCompleted": themeCompleted,
                "processFailed": themeFailed
            }
        });
};

describe('ThemeService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync_Range', (done) => {
        var themeService = initThemeService();
        var themeRange = new ThemeRange({
                rangeExpression: "POP_1994",
                rangeParameter: 3,
                rangeMode: RangeMode.CUSTOMINTERVAL
            }),
            style1 = new ServerStyle({
                fillForeColor: new ServerColor(250, 105, 25),
                lineWidth: 0.05
            }),
            themeRangeItem1 = new ThemeRangeItem({
                style: style1,
                visible: true,
                start: -5,
                caption: "item1",
                end: 8609844.5
            }),
            style2 = new ServerStyle({
                fillForeColor: new ServerColor(114, 15, 205),
                lineWidth: 0.02
            }),
            themeRangeItem2 = new ThemeRangeItem({
                style: style2,
                visible: true,
                start: 8609844.5,
                caption: "item2",
                end: 28609844.5
            }),
            themeRangeItem3 = new ThemeRangeItem({
                style: new ServerStyle({
                    fillForeColor: new ServerColor(67, 78, 127),
                    lineWidth: 0.01
                }),
                visible: true,
                start: 28609844.5,
                caption: "item3",
                end: 15028139690,
            });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
        expect(themeService).not.toBeNull();
        expect(themeService.url).toEqual(themeURL + "/tempLayersSet.json?");
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 4000);
    });

    it('processAsync_Range_1', (done) => {
        var themeService = initThemeService_RegisterListener();
        var themeRange = new ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 2,
            rangeMode: RangeMode.CUSTOMINTERVAL
        });
        var style1 = new ServerStyle();
        style1.fillForeColor = new ServerColor();
        style1.fillForeColor.blue = 0;
        style1.fillForeColor.green = 50;
        style1.fillForeColor.red = 20;
        style1.lineColor = new ServerColor();
        style1.lineColor = style1.fillForeColor;
        var themeRangeItem1 = new ThemeRangeItem({
            style: style1,
            visible: true,
            start: -1,
            caption: "item1",
            end: 104069844.5
        });
        var style2 = new ServerStyle();
        style2.fillForeColor = new ServerColor();
        style2.fillForeColor.blue = 25;
        style2.fillForeColor.green = 250;
        style2.fillForeColor.red = 100;
        style2.lineColor = new ServerColor();
        style2.lineColor = style2.fillForeColor;
        var themeRangeItem2 = new ThemeRangeItem({
            style: style2,
            visible: true,
            start: 104069844.5,
            caption: "item2",
            end: 1128139690,
        });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2);
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_Range_UrlLarge', (done) => {
        var themeService = initThemeService();
        var themeRange = new ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 6,
            rangeMode: RangeMode.QUANTILE
        });
        var themeRangeIteme1 = new ThemeRangeItem();
        themeRangeIteme1.start = 0.0;
        themeRangeIteme1.end = 59973;
        var style1 = new ServerStyle();
        style1.fillForeColor = new ServerColor();
        style1.fillForeColor.blue = 232;
        style1.fillForeColor.green = 227;
        style1.fillForeColor.red = 204;
        style1.lineColor = new ServerColor();
        style1.lineColor = style1.fillForeColor;
        themeRangeIteme1.style = style1;

        var themeRangeIteme2 = new ThemeRangeItem();
        themeRangeIteme2.start = 59973;
        themeRangeIteme2.end = 1097234;
        var style2 = new ServerStyle();
        style2.fillForeColor = new ServerColor();
        style2.fillForeColor.blue = 50;
        style2.fillForeColor.green = 20;
        style2.fillForeColor.red = 100;
        style2.lineColor = new ServerColor();
        style2.lineColor = style2.fillForeColor;
        themeRangeIteme2.style = style2;

        var themeRangeIteme3 = new ThemeRangeItem();
        themeRangeIteme3.start = 1097234;
        themeRangeIteme3.end = 5245515;
        var style3 = new ServerStyle();
        style3.fillForeColor = new ServerColor();
        style3.fillForeColor.blue = 189;
        style3.fillForeColor.green = 113;
        style3.fillForeColor.red = 218;
        style3.lineColor = new ServerColor();
        style3.lineColor = style3.fillForeColor;
        themeRangeIteme3.style = style3;

        var themeRangeIteme4 = new ThemeRangeItem();
        themeRangeIteme4.start = 5245515;
        themeRangeIteme4.end = 17250390;
        var style4 = new ServerStyle();
        style4.fillForeColor = new ServerColor();
        style4.fillForeColor.blue = 186;
        style4.fillForeColor.green = 196;
        style4.fillForeColor.red = 29;
        style4.lineColor = new ServerColor();
        style4.lineColor = style4.fillForeColor;
        themeRangeIteme4.style = style4;

        var themeRangeIteme5 = new ThemeRangeItem();
        themeRangeIteme5.start = 17250390;
        themeRangeIteme5.end = 894608700;
        var style5 = new ServerStyle();
        style5.fillForeColor = new ServerColor();
        style5.fillForeColor.blue = 116;
        style5.fillForeColor.green = 167;
        style5.fillForeColor.red = 216;
        style5.lineColor = new ServerColor();
        style5.lineColor = style5.fillForeColor;
        themeRangeIteme5.style = style5;

        var themeRangeIteme6 = new ThemeRangeItem();
        themeRangeIteme6.start = 894608700;
        themeRangeIteme6.end = 1.84467E+19;
        var style6 = new ServerStyle();
        style6.fillForeColor = new ServerColor();
        style6.fillForeColor.blue = 81;
        style6.fillForeColor.green = 81;
        style6.fillForeColor.red = 229;
        style6.lineColor = new ServerColor();
        style6.lineColor = style6.fillForeColor;
        themeRangeIteme6.style = style6;

        themeRange.items = [themeRangeIteme1, themeRangeIteme2, themeRangeIteme3, themeRangeIteme4, themeRangeIteme5, themeRangeIteme6];
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_Graph', (done) => {
        var themeService = initThemeService();
        var themeGraph = new ThemeGraph({
                barWidth: 2,
                graphType: ThemeGraphType.PIE,
                flow: new ThemeFlow({
                    flowEnabled: false,
                    leaderLineDisplayed: false
                }),
                graphAxes: new ThemeGraphAxes({
                    axesTextDisplayed: false
                }),
                graphSize: new ThemeGraphSize({
                    maxGraphSize: 100,
                    minGraphSize: 10
                }),
                graphText: new ThemeGraphText(),
                offset: new ThemeOffset({
                    offsetFixed: false
                })
            }),
            uniformStyle1 = new ServerStyle({
                fillForeColor: new ServerColor(120, 120, 110)
            }),
            uniformStyle2 = new ServerStyle({
                fillForeColor: new ServerColor(250, 105, 85)
            }),
            themeGraphItem1 = new ThemeGraphItem({
                caption: "SQMI", graphExpression: "SQMI", uniformStyle: uniformStyle1
            }),
            themeGraphItem2 = new ThemeGraphItem({
                caption: "SQKM", graphExpression: "SQKM", uniformStyle: uniformStyle2
            });
        themeGraph.items = new Array(themeGraphItem1, themeGraphItem2);
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeGraph)
        });
        themeService.processAsync(themeParameters);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_JoinItem', (done) => {
        var themeService = initThemeService_RegisterListener();
        var joinItem = new JoinItem({
            foreignTableName: "Capitals",
            joinFilter: "Countries.Country = Capitals.Country",
            joinType: JoinType.LEFTJOIN
        });
        var themeRange = new ThemeRange({
            rangeExpression: "Cap_Pop",
            rangeParameter: 3,
            rangeMode: RangeMode.CUSTOMINTERVAL
        });
        var style1 = new ServerStyle();
        style1.fillForeColor = new ServerColor();
        style1.fillForeColor.blue = 0;
        style1.fillForeColor.green = 0;
        style1.fillForeColor.red = 255;
        style1.lineColor = new ServerColor();
        style1.lineColor = style1.fillForeColor;
        var themeRangeItem1 = new ThemeRangeItem({
            style: style1,
            visible: true,
            start: 0,
            caption: "item1",
            end: 500000
        });
        var style2 = new ServerStyle();
        style2.fillForeColor = new ServerColor();
        style2.fillForeColor.blue = 25;
        style2.fillForeColor.green = 250;
        style2.fillForeColor.red = 100;
        style2.lineColor = new ServerColor();
        style2.lineColor = style2.fillForeColor;
        var themeRangeItem2 = new ThemeRangeItem({
            style: style2,
            visible: true,
            start: 500000,
            caption: "item2",
            end: 5000000,
        });
        var style3 = new ServerStyle();
        style3.fillForeColor = new ServerColor();
        style3.fillForeColor.blue = 25;
        style3.fillForeColor.green = 10;
        style3.fillForeColor.red = 40;
        style3.lineColor = new ServerColor();
        style3.lineColor = style3.fillForeColor;
        var themeRangeItem3 = new ThemeRangeItem({
            style: style3,
            visible: true,
            start: 5000000,
            caption: "item3",
            end: 50000000,
        });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: [joinItem],//new Array(joinItem)
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_Unique', (done) => {
        var themeService = initThemeService();
        var themeUnique = new ThemeUnique({
            uniqueExpression: "CONTINENT"
        });
        var style1 = new ServerStyle({
            fillForeColor: new ServerColor(250, 105, 25),
            lineWidth: 0.05
        });
        var themeUniqueItem1 = new ThemeUniqueItem({
            style: style1,
            visible: true,
            unique: "亚洲",
            caption: "亚洲"
        });
        var style2 = new ServerStyle({
            fillForeColor: new ServerColor(114, 15, 205),
            lineWidth: 0.02
        });
        var themeUniqueItem2 = new ThemeUniqueItem({
            style: style2,
            visible: true,
            unique: "欧洲",
            caption: "欧洲"
        });
        var themeUniqueItem3 = new ThemeUniqueItem({
            style: new ServerStyle({
                fillForeColor: new ServerColor(67, 78, 127),
                lineWidth: 0.01
            }),
            visible: true,
            unique: "非洲",
            caption: "非洲"
        });
        var themeUniqueItem4 = new ThemeUniqueItem({
            style: new ServerStyle({
                fillForeColor: new ServerColor(57, 48, 113),
                lineWidth: 0.01
            }),
            visible: true,
            unique: "北美洲",
            caption: "北美洲"
        });
        //南美洲默认风格
        themeUnique.items = [themeUniqueItem1, themeUniqueItem2, themeUniqueItem3, themeUniqueItem4];
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeUnique)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_Unique_0', (done) => {
        var themeService = initThemeService();
        var themeUnique = new ThemeUnique({
                uniqueExpression: "SmID"
            }),
            style1 = new ServerStyle({
                fillForeColor: new ServerColor(250, 105, 25),
                lineWidth: 0.05,
                markerSize: 10,
                markerSymbolID: 1
            }),
            themeUniqueItem1 = new ThemeUniqueItem({
                style: style1,
                visible: true,
                unique: "1",
                caption: "ARCTIC  OCEAN"
            }),
            style2 = new ServerStyle({
                fillForeColor: new ServerColor(114, 15, 205),
                lineWidth: 0.02,
                markerSize: 14,
                markerSymbolID: 59
            }),
            themeUniqueItem2 = new ThemeUniqueItem({
                style: style2,
                visible: true,
                unique: "2",
                caption: "PACIFIC   OCEAN"
            }),
            themeUniqueItem3 = new ThemeUniqueItem({
                style: new ServerStyle({
                    fillForeColor: new ServerColor(67, 78, 127),
                    lineWidth: 0.01,
                    markerSize: 15,
                    markerSymbolID: 66
                }),
                visible: true,
                unique: "3",
                caption: "ATLANTIC   OCEAN"
            }),
            themeUniqueItem4 = new ThemeUniqueItem({
                style: new ServerStyle({
                    fillForeColor: new ServerColor(57, 48, 113),
                    lineWidth: 0.01,
                    markerSize: 12,
                    markerSymbolID: 11
                }),
                visible: true,
                unique: "4",
                caption: "INDIAN OCEAN"
            });
        //南美洲默认风格
        themeUnique.items = new Array(themeUniqueItem1, themeUniqueItem2, themeUniqueItem3, themeUniqueItem4);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("OceanLabelP_E"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeUnique)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //统一风格标签专题图
    it('processAsync_Label_uniformStyle', (done) => {
        var themeService = initThemeService();
        var themeLabel = new ThemeLabel({
            labelExpression: "Pop_1994",
            labelOverLengthMode: LabelOverLengthMode.NEWLINE,
            maxLabelLength: 6,
            background: new ThemeLabelBackground({
                backStyle: new ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: LabelBackShape.NONE
            })
        });
        var text = new ThemeLabelText({
            uniformStyle: new ServerTextStyle({
                sizeFixed: true,
                foreColor: new ServerColor(220, 15, 205)
            })
        });
        themeLabel.text = text;

        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //分段标签专题图
    it('processAsync_Label_range_1', (done) => {
        var themeService = initThemeService();
        var themeLabelItem1, themeLabelItem2, themeLabelItem3, themeLabelItem4;
        var style1, style2;
        var themeLabel = new ThemeLabel({
            //alongLine: false,
            labelExpression: "smid",//smid    COUNTRY
            rangeExpression: "smid",
            labelOverLengthMode: LabelOverLengthMode.OMIT,
            maxLabelLength: 10,
            background: new ThemeLabelBackground({
                backStyle: new ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: LabelBackShape.ELLIPSE
            })
        });
        style1 = new ServerTextStyle({
            rotation: 10,
            sizeFixed: true,
            foreColor: new ServerColor(250, 15, 25)
        });
        themeLabelItem1 = new ThemeLabelItem({
            style: style1,
            visible: true,
            start: 1,
            end: 40
        });
        style2 = new ServerTextStyle({
            shadow: true,
            sizeFixed: true,
            foreColor: new ServerColor(114, 15, 205)
        });
        themeLabelItem2 = new ThemeLabelItem({
            style: style2,
            visible: true,
            start: 40,
            end: 100
        });
        themeLabelItem3 = new ThemeLabelItem({
            style: new ServerTextStyle({
                strikeout: true,
                sizeFixed: true,
                foreColor: new ServerColor(67, 118, 27)
            }),
            visible: true,
            start: 100,
            end: 160
        });
        themeLabelItem4 = new ThemeLabelItem({
            style: new ServerTextStyle({
                rotation: -30,
                foreColor: new ServerColor(17, 108, 163)
            }),
            visible: true,
            start: 160,
            end: 3000000000//300
        });
        themeLabel.items = new Array(themeLabelItem1, themeLabelItem2, themeLabelItem3, themeLabelItem4);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //分段标签专题图
    it('processAsync_Label_range_2', (done) => {
        var themeService = initThemeService();
        var themeLabelIteme1 = new ThemeLabelItem();
        themeLabelIteme1.start = 0;
        themeLabelIteme1.end = 59973;
        var style1 = new ServerTextStyle();
        style1.fontHeight = 5;
        style1.fontWidth = 5;
        style1.foreColor = new ServerColor();
        style1.foreColor.blue = 232;
        style1.foreColor.green = 227;
        style1.foreColor.red = 204;
        style1.sizeFixed = true;
        style1.bold = true;
        themeLabelIteme1.style = style1;

        var themeLabelIteme2 = new ThemeLabelItem();
        themeLabelIteme2.start = 59973;
        themeLabelIteme2.end = 1097234;
        var style2 = new ServerTextStyle();
        style2.fontHeight = 5;
        style2.fontWidth = 5;
        style2.foreColor = new ServerColor();
        style2.foreColor.blue = 50;
        style2.foreColor.green = 20;
        style2.foreColor.red = 100;
        style2.sizeFixed = true;
        style2.bold = true;
        themeLabelIteme2.style = style2;

        var themeLabelIteme3 = new ThemeLabelItem();
        themeLabelIteme3.start = 1097234;
        themeLabelIteme3.end = 5245515;
        var style3 = new ServerTextStyle();
        style3.fontHeight = 5;
        style3.fontWidth = 5;
        style3.foreColor = new ServerColor();
        style3.foreColor.blue = 255;
        style3.foreColor.green = 95;
        style3.foreColor.red = 93;
        style3.sizeFixed = true;
        style3.bold = true;
        themeLabelIteme3.style = style3;

        var themeLabelIteme4 = new ThemeLabelItem();
        themeLabelIteme4.start = 5245515;
        themeLabelIteme4.end = 17250390;
        var style4 = new ServerTextStyle();
        style4.fontHeight = 5;
        style4.fontWidth = 5;
        style4.foreColor = new ServerColor();
        style4.foreColor.blue = 6;
        style4.foreColor.green = 129;
        style4.foreColor.red = 1;
        style4.sizeFixed = true;
        style4.bold = true;
        themeLabelIteme4.style = style4;

        var themeLabelIteme5 = new ThemeLabelItem();
        themeLabelIteme5.start = 17250390;
        themeLabelIteme5.end = 894608700;
        var style5 = new ServerTextStyle();
        style5.fontHeight = 5;
        style5.fontWidth = 5;
        style5.foreColor = new ServerColor();
        style5.foreColor.blue = 0;
        style5.foreColor.green = 129;
        style5.foreColor.red = 255;
        style5.sizeFixed = true;
        style5.bold = true;
        themeLabelIteme5.style = style5;

        var themeLabelIteme6 = new ThemeLabelItem();
        themeLabelIteme6.start = 894608700;
        themeLabelIteme6.end = 1.84467E+19;
        var style6 = new ServerTextStyle();
        style6.fontHeight = 5;
        style6.fontWidth = 5;
        style6.foreColor = new ServerColor();
        style6.foreColor.blue = 81;
        style6.foreColor.green = 81;
        style6.foreColor.red = 229;
        style6.sizeFixed = true;
        style6.bold = true;
        themeLabelIteme6.style = style6;

        //创建标签专题图对象，ThemeLabel 必设 labelExpression，如果要分段则 rangeExpression 和 items 也必须设置；每个子项将以子项中的风格进行显示，未分段的标签使用默认风格。
        var themeLabel = new ThemeLabel();
        themeLabel.labelExpression = "Capital";
        themeLabel.rangeExpression = "Pop_1994";
        themeLabel.items = [themeLabelIteme1, themeLabelIteme2, themeLabelIteme3, themeLabelIteme4, themeLabelIteme5, themeLabelIteme6];
        themeLabel.text.uniformStyle.sizeFixed = true;
        //专题图参数 ThemeParameters 必设 theme（即以设置好的分段专题图对象）、dataSourceName 和 datasetName
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //矩阵标签专题图
    it('processAsync_Label_matrixCells', (done) => {
        var themeService = initThemeService(),
            labelThemeOfThemeCell = new ThemeLabel({
                labelExpression: "Capital",
                labelOverLengthMode: LabelOverLengthMode.NEWLINE,
                maxLabelLength: 6,
                background: new ThemeLabelBackground({
                    backStyle: new ServerStyle({
                        fillBackOpaque: true,
                        fillForeColor: new ServerColor(10, 20, 0),
                        fillOpaqueRate: 20,
                        lineColor: new ServerColor(255, 50, 0),
                        lineWidth: 0.1
                    }),
                    labelBackShape: LabelBackShape.NONE
                })
            }),
            text = new ThemeLabelText({
                uniformStyle: new ServerTextStyle({
                    sizeFixed: true,
                    foreColor: new ServerColor(50, 45, 225)
                })
            }),
            themeLabel = new ThemeLabel();

        labelThemeOfThemeCell.text = text;
        var labelSymbolCell = new LabelSymbolCell({symbolIDField: "60"});
        labelSymbolCell.style = new ServerStyle({markerSize: 5});
        var labelThemeCell = new LabelThemeCell({themeLabel: labelThemeOfThemeCell});
        var matrixCells = new Array(new Array(labelSymbolCell), new Array(labelThemeCell));
        //var matrixCells = new Array(new Array(labelSymbolCell, labelThemeCell));
        themeLabel.matrixCells = matrixCells;
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //使用内存数据制作统一风格标签专题图
    it('processAsync_Label__WithMemortData', (done) => {
        var themeService = initThemeService();
        var srcData = new Array("亚洲", "欧洲", "非洲", "北美洲", "南美洲");
        var targetData = new Array("亚洲国家", "欧洲国家", "非洲国家", "北美洲国家", "南美洲国家");
        var themeMemoryData = new ThemeMemoryData(srcData, targetData);
        var themeLabel = new ThemeLabel({
            labelExpression: "CONTINENT",
            labelOverLengthMode: LabelOverLengthMode.NEWLINE,
            maxLabelLength: 6,
            background: new ThemeLabelBackground({
                backStyle: new ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: LabelBackShape.NONE
            }),
            memoryData: themeMemoryData
        });
        var text = new ThemeLabelText({
            uniformStyle: new ServerTextStyle({
                sizeFixed: true,
                foreColor: new ServerColor(220, 15, 205)
            })
        });
        themeLabel.text = text;
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //使用内存数据制作范围分段专题图
    it('processAsync_Range_withMemoryData', (done) => {
        var themeService = initThemeService();
        var themeRange = new ThemeRange({
                rangeExpression: "POP_1994",
                rangeParameter: 3,
                rangeMode: RangeMode.CUSTOMINTERVAL
            }),
            style1 = new ServerStyle({
                fillForeColor: new ServerColor(250, 105, 25),
                lineWidth: 0.05
            }),
            themeRangeItem1 = new ThemeRangeItem({
                style: style1,
                visible: true,
                start: -5,
                caption: "item1",
                end: 8609844.5
            }),
            style2 = new ServerStyle({
                fillForeColor: new ServerColor(114, 15, 205),
                lineWidth: 0.02
            }),
            themeRangeItem2 = new ThemeRangeItem({
                style: style2,
                visible: true,
                start: 8609844.5,
                caption: "item2",
                end: 28609844.5
            }),
            themeRangeItem3 = new ThemeRangeItem({
                style: new ServerStyle({
                    fillForeColor: new ServerColor(67, 78, 127),
                    lineWidth: 0.01
                }),
                visible: true,
                start: 28609844.5,
                caption: "item3",
                end: 15028139690
            });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);

        var srcData = new Array(1128139689, 17827520, 33796870);
        var targetData = new Array(2, 17827520, 33796870);
        var themeMemoryData = new ThemeMemoryData(srcData, targetData);
        themeRange.memoryData = themeMemoryData;
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //点密度专题图
    it('processAsync_DotDensity_style', (done) => {
        var themeService = initThemeService();
        var themeDotDensity = new ThemeDotDensity({
            dotExpression: "Pop_1994",
            value: 10000000
        });
        var style1 = new ServerStyle({
            fillBackOpaque: true,
            fillForeColor: new ServerColor(10, 20, 0),
            fillOpaqueRate: 20,
            lineColor: new ServerColor(255, 50, 0),
            lineWidth: 0.1
        });
        themeDotDensity.style = style1;

        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeDotDensity)
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    //等级符号专题图
    it('processAsync_GraduatedSymbol', (done) => {
        var themeService = initThemeService();
        var myOffset = new ThemeOffset({
            offsetFixed: true,
            offsetX: 0.2,
            offsetY: 0.1
        });
        var myStyle = new ThemeGraduatedSymbolStyle({
            negativeDisplayed: true,
            negativeStyle: new ServerStyle({
                fillBackOpaque: true,
                fillGradientAngle: 20,
                fillOpaqueRate: 80
            })
        });
        var themeGradSym = new ThemeGraduatedSymbol({
            baseValue: 5,
            expression: "POP_1994",
            flow: new ThemeFlow({
                flowEnabled: false
            }),
            graduatedMode: GraduatedMode.LOGARITHM,
            offset: myOffset,
            style: myStyle
        });
        var themeParameters = new ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeGradSym)
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                expect(themeResult.succeed).toBeTruthy();
                expect(themeResult.newResourceID).not.toBeNull();
                expect(themeResult.newResourceLocation).not.toBeNull();
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    });

    it('processAsync_data', (done) => {
        var themeService = initThemeService();
        var themeRange = new ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: RangeMode.CUSTOMINTERVAL
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        var themeParameters = new ThemeParameters({
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(() => {
            try {
                var themeResult = themeEventArgsSystem.result;
                expect(themeResult).not.toBeNull();
                /*expect(themeResult.succeed).toBeTruthy();
                 expect(themeResult.newResourceID).not.toBeNull();
                 expect(themeResult.newResourceLocation).not.toBeNull();*/
                themeService.destroy();
                expect(themeService.EVENT_TYPES == null).toBeTruthy();
                expect(themeService.events == null).toBeTruthy();
                expect(themeService.eventListeners == null).toBeTruthy();
                themeParameters.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("ThemeService_" + exception.name + ":" + exception.message);
                themeService.destroy();
                themeParameters.destroy();
                done();
            }
        }, 2000);
    })

    it('ThemeUniqueItem', () => {
        var themeUniqueItem = new ThemeUniqueItem({
            visible: true,
            unique: "亚洲",
            caption: "亚洲"
        });

        expect(themeUniqueItem).not.toBeNull();
        expect(themeUniqueItem.style).not.toBeNull();
        themeUniqueItem.destroy();
        expect(themeUniqueItem.visible).toBeNull();
        expect(themeUniqueItem.unique).toBeNull();
        expect(themeUniqueItem.caption).toBeNull();
        expect(themeUniqueItem.style).toBeNull();
    })
});

