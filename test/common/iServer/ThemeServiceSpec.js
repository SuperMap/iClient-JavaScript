require('../../../src/common/iServer/ThemeService');

var themeEventArgsSystem = null,
    serviceFailedEventArgsSystem = null;
var mapServiceURL= GlobeParameter.mapServiceURL,
    themeURL = mapServiceURL + "World Map";

function themeCompleted(themeEventArgs){
    themeEventArgsSystem = themeEventArgs;
}
function themeFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}
function initThemeService() {
    return new SuperMap.ThemeService(themeURL);
}
function initThemeService_RegisterListener() {
    return new SuperMap.ThemeService(themeURL,
        {eventListeners: {
            "processCompleted": themeCompleted,
            "processFailed": themeFailed
        }});
}

describe('testThemeService_processAsync', function () {
    var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('Range',function(done){
        var themeService = initThemeService();
        themeRange = new SuperMap.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: SuperMap.RangeMode.CUSTOMINTERVAL
        });
        style1 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(250, 105, 25),
            lineWidth: 0.05
        });
        themeRangeItem1 = new SuperMap.ThemeRangeItem({
            style: style1,
            visible: true,
            start: -5,
            caption: "item1",
            end: 8609844.5
        });
        style2 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(114, 15, 205),
            lineWidth: 0.02
        });
        themeRangeItem2 = new SuperMap.ThemeRangeItem({
            style: style2,
            visible: true,
            start: 8609844.5,
            caption: "item2",
            end: 28609844.5
        });
        themeRangeItem3 = new SuperMap.ThemeRangeItem({
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(67, 78, 127),
                lineWidth: 0.01
            }),
            visible: true,
            start: 28609844.5,
            caption: "item3",
            end: 15028139690,
        });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
        expect(themeService).not.toBeNull();
        expect(themeService.url).toEqual(themeURL+"/tempLayersSet.json?");
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        setTimeout(function() {
            try{
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

    it('Range_1',function(done){
        var themeService = initThemeService_RegisterListener();
        themeRange = new SuperMap.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 2,
            rangeMode: SuperMap.RangeMode.CUSTOMINTERVAL
        });
        style1 = new SuperMap.ServerStyle();
        style1.fillForeColor = new SuperMap.ServerColor();
        style1.fillForeColor.blue = 0;
        style1.fillForeColor.green = 50;
        style1.fillForeColor.red = 20;
        style1.lineColor = new SuperMap.ServerColor();
        style1.lineColor = style1.fillForeColor;
        themeRangeItem1 = new SuperMap.ThemeRangeItem({
            style: style1,
            visible: true,
            start: -1,
            caption: "item1",
            end: 104069844.5
        });
        style2 = new SuperMap.ServerStyle();
        style2.fillForeColor = new SuperMap.ServerColor();
        style2.fillForeColor.blue = 25;
        style2.fillForeColor.green = 250;
        style2.fillForeColor.red = 100;
        style2.lineColor = new SuperMap.ServerColor();
        style2.lineColor = style2.fillForeColor;
        themeRangeItem2 = new SuperMap.ThemeRangeItem({
            style: style2,
            visible: true,
            start: 104069844.5,
            caption: "item2",
            end: 1128139690,
        });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2);
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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

    it('Range_UrlLarge',function(done){
        var themeService = initThemeService();
        themeRange = new SuperMap.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 6,
            rangeMode: SuperMap.RangeMode.QUANTILE
        });
        var themeRangeIteme1 = new SuperMap.ThemeRangeItem();
        themeRangeIteme1.start = 0.0;
        themeRangeIteme1.end = 59973;
        style1 = new SuperMap.ServerStyle();
        style1.fillForeColor = new SuperMap.ServerColor();
        style1.fillForeColor.blue = 232;
        style1.fillForeColor.green = 227;
        style1.fillForeColor.red = 204;
        style1.lineColor = new SuperMap.ServerColor();
        style1.lineColor = style1.fillForeColor;
        themeRangeIteme1.style = style1;

        var themeRangeIteme2 = new SuperMap.ThemeRangeItem();
        themeRangeIteme2.start = 59973;
        themeRangeIteme2.end = 1097234;
        style2 = new SuperMap.ServerStyle();
        style2.fillForeColor = new SuperMap.ServerColor();
        style2.fillForeColor.blue = 50;
        style2.fillForeColor.green = 20;
        style2.fillForeColor.red = 100;
        style2.lineColor = new SuperMap.ServerColor();
        style2.lineColor = style2.fillForeColor;
        themeRangeIteme2.style = style2;

        var themeRangeIteme3 = new SuperMap.ThemeRangeItem();
        themeRangeIteme3.start = 1097234;
        themeRangeIteme3.end = 5245515;
        style3 = new SuperMap.ServerStyle();
        style3.fillForeColor = new SuperMap.ServerColor();
        style3.fillForeColor.blue = 189;
        style3.fillForeColor.green = 113;
        style3.fillForeColor.red = 218;
        style3.lineColor = new SuperMap.ServerColor();
        style3.lineColor = style3.fillForeColor;
        themeRangeIteme3.style = style3;

        var themeRangeIteme4 = new SuperMap.ThemeRangeItem();
        themeRangeIteme4.start = 5245515;
        themeRangeIteme4.end = 17250390;
        style4 = new SuperMap.ServerStyle();
        style4.fillForeColor = new SuperMap.ServerColor();
        style4.fillForeColor.blue = 186;
        style4.fillForeColor.green = 196;
        style4.fillForeColor.red = 29;
        style4.lineColor = new SuperMap.ServerColor();
        style4.lineColor = style4.fillForeColor;
        themeRangeIteme4.style = style4;

        var themeRangeIteme5 = new SuperMap.ThemeRangeItem();
        themeRangeIteme5.start = 17250390;
        themeRangeIteme5.end = 894608700;
        style5 = new SuperMap.ServerStyle();
        style5.fillForeColor = new SuperMap.ServerColor();
        style5.fillForeColor.blue = 116;
        style5.fillForeColor.green = 167;
        style5.fillForeColor.red = 216;
        style5.lineColor = new SuperMap.ServerColor();
        style5.lineColor = style5.fillForeColor;
        themeRangeIteme5.style = style5;

        var themeRangeIteme6 = new SuperMap.ThemeRangeItem();
        themeRangeIteme6.start = 894608700;
        themeRangeIteme6.end = 1.84467E+19;
        style6 = new SuperMap.ServerStyle();
        style6.fillForeColor = new SuperMap.ServerColor();
        style6.fillForeColor.blue = 81;
        style6.fillForeColor.green = 81;
        style6.fillForeColor.red = 229;
        style6.lineColor = new SuperMap.ServerColor();
        style6.lineColor = style6.fillForeColor;
        themeRangeIteme6.style = style6;

        themeRange.items = [themeRangeIteme1,themeRangeIteme2,themeRangeIteme3,themeRangeIteme4,themeRangeIteme5,themeRangeIteme6];
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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

    it('Graph',function(done){
        var themeService = initThemeService();
        themeGraph = new SuperMap.ThemeGraph({
            barWidth: 2,
            graphType: SuperMap.ThemeGraphType.PIE,
            flow: new SuperMap.ThemeFlow({
                flowEnabled: false,
                leaderLineDisplayed: false
            }),
            graphAxes: new SuperMap.ThemeGraphAxes({
                axesTextDisplayed: false
            }),
            graphSize: new SuperMap.ThemeGraphSize({
                maxGraphSize: 100,
                minGraphSize: 10
            }),
            graphText: new SuperMap.ThemeGraphText(),
            offset: new SuperMap.ThemeOffset({
                offsetFixed: false
            })
        });
        uniformStyle1 = new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(120,120,110)
        });
        uniformStyle2 = new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(250,105,85)
        });
        themeGraphItem1 = new SuperMap.ThemeGraphItem({
            caption: "SQMI", graphExpression:"SQMI",uniformStyle:uniformStyle1
        });
        themeGraphItem2 = new SuperMap.ThemeGraphItem({
            caption: "SQKM", graphExpression:"SQKM",uniformStyle:uniformStyle2
        });
        themeGraph.items = new Array(themeGraphItem1, themeGraphItem2);
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeGraph)
        });
        themeService.processAsync(themeParameters);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        setTimeout(function() {
            try{
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

    it('JoinItem',function(done){
        var themeService = initThemeService_RegisterListener();
        joinItem = new SuperMap.JoinItem({
            foreignTableName: "Capitals",
            joinFilter: "Countries.Country = Capitals.Country",
            joinType: SuperMap.JoinType.LEFTJOIN
        });
        themeRange = new SuperMap.ThemeRange({
            rangeExpression: "Cap_Pop",
            rangeParameter: 3,
            rangeMode: SuperMap.RangeMode.CUSTOMINTERVAL
        });
        var style1 = new SuperMap.ServerStyle();
        style1.fillForeColor = new SuperMap.ServerColor();
        style1.fillForeColor.blue = 0;
        style1.fillForeColor.green = 0;
        style1.fillForeColor.red = 255;
        style1.lineColor = new SuperMap.ServerColor();
        style1.lineColor = style1.fillForeColor;
        themeRangeItem1 = new SuperMap.ThemeRangeItem({
            style: style1,
            visible: true,
            start: 0,
            caption: "item1",
            end: 500000
        });
        var style2 = new SuperMap.ServerStyle();
        style2.fillForeColor = new SuperMap.ServerColor();
        style2.fillForeColor.blue = 25;
        style2.fillForeColor.green = 250;
        style2.fillForeColor.red = 100;
        style2.lineColor = new SuperMap.ServerColor();
        style2.lineColor = style2.fillForeColor;
        themeRangeItem2 = new SuperMap.ThemeRangeItem({
            style: style2,
            visible: true,
            start: 500000,
            caption: "item2",
            end: 5000000,
        });
        var style3 = new SuperMap.ServerStyle();
        style3.fillForeColor = new SuperMap.ServerColor();
        style3.fillForeColor.blue = 25;
        style3.fillForeColor.green = 10;
        style3.fillForeColor.red = 40;
        style3.lineColor = new SuperMap.ServerColor();
        style3.lineColor = style3.fillForeColor;
        themeRangeItem3 = new SuperMap.ThemeRangeItem({
            style: style3,
            visible: true,
            start: 5000000,
            caption: "item3",
            end: 50000000,
        });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: [joinItem],//new Array(joinItem)
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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

    it('Unique',function(done){
        var themeService = initThemeService();
        themeUnique = new SuperMap.ThemeUnique({
            uniqueExpression: "CONTINENT"
        });
        style1 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(250, 105, 25),
            lineWidth: 0.05
        });
        themeUniqueItem1 = new SuperMap.ThemeUniqueItem({
            style: style1,
            visible: true,
            unique:  "亚洲",
            caption: "亚洲"
        });
        style2 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(114, 15, 205),
            lineWidth: 0.02
        });
        themeUniqueItem2 = new SuperMap.ThemeUniqueItem({
            style: style2,
            visible: true,
            unique:  "欧洲",
            caption: "欧洲"
        });
        themeUniqueItem3 = new SuperMap.ThemeUniqueItem({
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(67, 78, 127),
                lineWidth: 0.01
            }),
            visible: true,
            unique:  "非洲",
            caption: "非洲"
        });
        themeUniqueItem4 = new SuperMap.ThemeUniqueItem({
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(57, 48, 113),
                lineWidth: 0.01
            }),
            visible: true,
            unique:  "北美洲",
            caption: "北美洲"
        });
        //南美洲默认风格
        themeUnique.items = [themeUniqueItem1, themeUniqueItem2, themeUniqueItem3, themeUniqueItem4];
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeUnique)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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

    it('Unique_0',function(done){
        var themeService = initThemeService();
        themeUnique = new SuperMap.ThemeUnique({
            uniqueExpression: "SmID"
        });
        style1 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(250, 105, 25),
            lineWidth: 0.05,
            markerSize: 10,
            markerSymbolID: 1
        });
        themeUniqueItem1 = new SuperMap.ThemeUniqueItem({
            style: style1,
            visible: true,
            unique:  "1",
            caption: "ARCTIC  OCEAN"
        });
        style2 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(114, 15, 205),
            lineWidth: 0.02,
            markerSize: 14,
            markerSymbolID: 59
        });
        themeUniqueItem2 = new SuperMap.ThemeUniqueItem({
            style: style2,
            visible: true,
            unique:  "2",
            caption: "PACIFIC   OCEAN"
        });
        themeUniqueItem3 = new SuperMap.ThemeUniqueItem({
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(67, 78, 127),
                lineWidth: 0.01,
                markerSize: 15,
                markerSymbolID: 66
            }),
            visible: true,
            unique:  "3",
            caption: "ATLANTIC   OCEAN"
        });
        themeUniqueItem4 = new SuperMap.ThemeUniqueItem({
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(57, 48, 113),
                lineWidth: 0.01,
                markerSize: 12,
                markerSymbolID: 11
            }),
            visible: true,
            unique:  "4",
            caption: "INDIAN OCEAN"
        });
        //南美洲默认风格
        themeUnique.items = new Array(themeUniqueItem1, themeUniqueItem2, themeUniqueItem3, themeUniqueItem4);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("OceanLabelP_E"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeUnique)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('Label_uniformStyle',function(done){
        var themeService = initThemeService();
        var themeLabel = new SuperMap.ThemeLabel({
            labelExpression: "Pop_1994",
            labelOverLengthMode: SuperMap.LabelOverLengthMode.NEWLINE,
            maxLabelLength:6,
            background: new SuperMap.ThemeLabelBackground({
                backStyle: new SuperMap.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.LabelBackShape.NONE
            })
        });
        text = new SuperMap.ThemeLabelText({
            uniformStyle: new SuperMap.ServerTextStyle({
                sizeFixed: true,
                foreColor: new SuperMap.ServerColor(220, 15, 205)
            })
        });
        themeLabel.text = text;

        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('Label_range_1',function(done){
        var themeService = initThemeService();
        var themeLabel = new SuperMap.ThemeLabel({
            //alongLine: false,
            labelExpression: "smid",//smid    COUNTRY
            rangeExpression: "smid",
            labelOverLengthMode: SuperMap.LabelOverLengthMode.OMIT,
            maxLabelLength:10,
            background: new SuperMap.ThemeLabelBackground({
                backStyle: new SuperMap.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.LabelBackShape.ELLIPSE
            })
        });
        style1 =  new SuperMap.ServerTextStyle({
            rotation: 10,
            sizeFixed: true,
            foreColor: new SuperMap.ServerColor(250, 15, 25)
        });
        themeLabelItem1 = new SuperMap.ThemeLabelItem({
            style: style1,
            visible: true,
            start: 1,
            end: 40
        });
        style2 =  new SuperMap.ServerTextStyle({
            shadow: true,
            sizeFixed: true,
            foreColor: new SuperMap.ServerColor(114, 15, 205)
        });
        themeLabelItem2 = new SuperMap.ThemeLabelItem({
            style: style2,
            visible: true,
            start: 40,
            end: 100
        });
        themeLabelItem3 = new SuperMap.ThemeLabelItem({
            style: new SuperMap.ServerTextStyle({
                strikeout: true,
                sizeFixed: true,
                foreColor: new SuperMap.ServerColor(67, 118, 27)
            }),
            visible: true,
            start: 100,
            end: 160
        });
        themeLabelItem4 = new SuperMap.ThemeLabelItem({
            style: new SuperMap.ServerTextStyle({
                rotation: -30,
                foreColor: new SuperMap.ServerColor(17, 108, 163)
            }),
            visible: true,
            start: 160,
            end: 3000000000//300
        });
        themeLabel.items = new Array(themeLabelItem1, themeLabelItem2, themeLabelItem3, themeLabelItem4);
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('Label_range_2',function(done){
        var themeService = initThemeService();
        var themeLabelIteme1 = new SuperMap.ThemeLabelItem();
        themeLabelIteme1.start = 0;
        themeLabelIteme1.end = 59973;
        style1 = new SuperMap.ServerTextStyle();
        style1.fontHeight =5;
        style1.fontWidth =5;
        style1.foreColor = new SuperMap.ServerColor();
        style1.foreColor.blue = 232;
        style1.foreColor.green = 227;
        style1.foreColor.red = 204;
        style1.sizeFixed = true;
        style1.bold = true;
        themeLabelIteme1.style = style1;

        var themeLabelIteme2 = new SuperMap.ThemeLabelItem();
        themeLabelIteme2.start = 59973;
        themeLabelIteme2.end = 1097234;
        style2 = new SuperMap.ServerTextStyle();
        style2.fontHeight =5;
        style2.fontWidth =5;
        style2.foreColor = new SuperMap.ServerColor();
        style2.foreColor.blue = 50;
        style2.foreColor.green = 20;
        style2.foreColor.red = 100;
        style2.sizeFixed = true;
        style2.bold = true;
        themeLabelIteme2.style = style2;

        var themeLabelIteme3 = new SuperMap.ThemeLabelItem();
        themeLabelIteme3.start = 1097234;
        themeLabelIteme3.end = 5245515;
        style3 = new SuperMap.ServerTextStyle();
        style3.fontHeight =5;
        style3.fontWidth =5;
        style3.foreColor = new SuperMap.ServerColor();
        style3.foreColor.blue = 255;
        style3.foreColor.green = 95;
        style3.foreColor.red = 93;
        style3.sizeFixed = true;
        style3.bold = true;
        themeLabelIteme3.style = style3;

        var themeLabelIteme4 = new SuperMap.ThemeLabelItem();
        themeLabelIteme4.start = 5245515;
        themeLabelIteme4.end = 17250390;
        style4 = new SuperMap.ServerTextStyle();
        style4.fontHeight =5;
        style4.fontWidth =5;
        style4.foreColor = new SuperMap.ServerColor();
        style4.foreColor.blue = 6;
        style4.foreColor.green = 129;
        style4.foreColor.red = 1;
        style4.sizeFixed = true;
        style4.bold = true;
        themeLabelIteme4.style = style4;

        var themeLabelIteme5 = new SuperMap.ThemeLabelItem();
        themeLabelIteme5.start = 17250390;
        themeLabelIteme5.end = 894608700;
        style5 = new SuperMap.ServerTextStyle();
        style5.fontHeight =5;
        style5.fontWidth =5;
        style5.foreColor = new SuperMap.ServerColor();
        style5.foreColor.blue = 0;
        style5.foreColor.green = 129;
        style5.foreColor.red = 255;
        style5.sizeFixed = true;
        style5.bold = true;
        themeLabelIteme5.style = style5;

        var themeLabelIteme6 = new SuperMap.ThemeLabelItem();
        themeLabelIteme6.start = 894608700;
        themeLabelIteme6.end = 1.84467E+19;
        style6 = new SuperMap.ServerTextStyle();
        style6.fontHeight =5;
        style6.fontWidth =5;
        style6.foreColor = new SuperMap.ServerColor();
        style6.foreColor.blue = 81;
        style6.foreColor.green = 81;
        style6.foreColor.red = 229;
        style6.sizeFixed = true;
        style6.bold = true;
        themeLabelIteme6.style = style6;

        //创建标签专题图对象，ThemeLabel 必设 labelExpression，如果要分段则 rangeExpression 和 items 也必须设置；每个子项将以子项中的风格进行显示，未分段的标签使用默认风格。
        var themeLabel = new SuperMap.ThemeLabel();
        themeLabel.labelExpression = "Capital";
        themeLabel.rangeExpression = "Pop_1994";
        themeLabel.items = [themeLabelIteme1,themeLabelIteme2,themeLabelIteme3,themeLabelIteme4,themeLabelIteme5,themeLabelIteme6];
        themeLabel.text.uniformStyle.sizeFixed = true;
        //专题图参数 ThemeParameters 必设 theme（即以设置好的分段专题图对象）、dataSourceName 和 datasetName
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('Label_matrixCells',function(done){
        var themeService = initThemeService(),
            labelThemeOfThemeCell = new SuperMap.ThemeLabel({
                labelExpression: "Capital",
                labelOverLengthMode: SuperMap.LabelOverLengthMode.NEWLINE,
                maxLabelLength:6,
                background: new SuperMap.ThemeLabelBackground({
                    backStyle: new SuperMap.ServerStyle({
                        fillBackOpaque: true,
                        fillForeColor: new SuperMap.ServerColor(10, 20, 0),
                        fillOpaqueRate: 20,
                        lineColor: new SuperMap.ServerColor(255, 50, 0),
                        lineWidth: 0.1
                    }),
                    labelBackShape: SuperMap.LabelBackShape.NONE
                })
            }),
            text = new SuperMap.ThemeLabelText({
                uniformStyle: new SuperMap.ServerTextStyle({
                    sizeFixed: true,
                    foreColor: new SuperMap.ServerColor(50, 45, 225)
                })
            }),
            themeLabel = new SuperMap.ThemeLabel();

        labelThemeOfThemeCell.text = text;
        var labelSymbolCell = new SuperMap.LabelSymbolCell({symbolIDField: "60"});
        labelSymbolCell.style = new SuperMap.ServerStyle({markerSize: 5});
        var labelThemeCell = new SuperMap.LabelThemeCell({themeLabel: labelThemeOfThemeCell});
        var matrixCells = new Array(new Array(labelSymbolCell),new Array(labelThemeCell));
        //var matrixCells = new Array(new Array(labelSymbolCell, labelThemeCell));
        themeLabel.matrixCells = matrixCells;
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('Label__WithMemortData',function(done){
        var themeService = initThemeService();
        srcData = new Array("亚洲", "欧洲", "非洲", "北美洲", "南美洲");
        targetData = new Array("亚洲国家", "欧洲国家", "非洲国家", "北美洲国家", "南美洲国家");
        themeMemoryData = new SuperMap.ThemeMemoryData(srcData, targetData);
        themeLabel = new SuperMap.ThemeLabel({
            labelExpression: "CONTINENT",
            labelOverLengthMode: SuperMap.LabelOverLengthMode.NEWLINE,
            maxLabelLength:6,
            background: new SuperMap.ThemeLabelBackground({
                backStyle: new SuperMap.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.LabelBackShape.NONE
            }),
            memoryData: themeMemoryData
        });
        text = new SuperMap.ThemeLabelText({
            uniformStyle: new SuperMap.ServerTextStyle({
                sizeFixed: true,
                foreColor: new SuperMap.ServerColor(220, 15, 205)
            })
        });
        themeLabel.text = text;
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeLabel)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('Range_withMemoryData',function(done){
        var themeService = initThemeService(),
        themeRange = new SuperMap.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: SuperMap.RangeMode.CUSTOMINTERVAL
        }),
        style1 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(250, 105, 25),
            lineWidth: 0.05
        }),
        themeRangeItem1 = new SuperMap.ThemeRangeItem({
            style: style1,
            visible: true,
            start: -5,
            caption: "item1",
            end: 8609844.5
        }),
        style2 =  new SuperMap.ServerStyle({
            fillForeColor: new SuperMap.ServerColor(114, 15, 205),
            lineWidth: 0.02
        }),
        themeRangeItem2 = new SuperMap.ThemeRangeItem({
            style: style2,
            visible: true,
            start: 8609844.5,
            caption: "item2",
            end: 28609844.5
        }),
        themeRangeItem3 = new SuperMap.ThemeRangeItem({
            style: new SuperMap.ServerStyle({
                fillForeColor: new SuperMap.ServerColor(67, 78, 127),
                lineWidth: 0.01
            }),
            visible: true,
            start: 28609844.5,
            caption: "item3",
            end: 15028139690
        });
        themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);

        var srcData = new Array(1128139689,17827520,33796870);
        var targetData =  new Array(2,17827520,33796870);
        var themeMemoryData = new SuperMap.ThemeMemoryData(srcData, targetData);
        themeRange.memoryData = themeMemoryData;
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('DotDensity_style',function(done){
        var themeService = initThemeService();
        var themeDotDensity = new SuperMap.ThemeDotDensity({
            dotExpression: "Pop_1994",
            value: 10000000
        });
        var style1 = new SuperMap.ServerStyle({
            fillBackOpaque: true,
            fillForeColor: new SuperMap.ServerColor(10, 20, 0),
            fillOpaqueRate: 20,
            lineColor: new SuperMap.ServerColor(255, 50, 0),
            lineWidth: 0.1
        });
        themeDotDensity.style = style1;

        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeDotDensity)
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
    it('GraduatedSymbol',function(done){
        var themeService = initThemeService();
        var myOffset = new SuperMap.ThemeOffset({
            offsetFixed: true,
            offsetX: 0.2,
            offsetY: 0.1
        });
        var myStyle = new SuperMap.ThemeGraduatedSymbolStyle({
            negativeDisplayed: true,
            negativeStyle: new SuperMap.ServerStyle({
                fillBackOpaque: true,
                fillGradientAngle: 20,
                fillOpaqueRate: 80
            })
        });
        var themeGradSym = new SuperMap.ThemeGraduatedSymbol({
            baseValue: 5,
            expression: "POP_1994",
            flow: new SuperMap.ThemeFlow({
                flowEnabled: false
            }),
            graduatedMode: SuperMap.GraduatedMode.LOGARITHM,
            offset:myOffset,
            style: myStyle
        });
        var themeParameters = new SuperMap.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: null,
            themes: new Array(themeGradSym)
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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

    it('data',function(done){
        var themeService = initThemeService();
        var themeRange = new SuperMap.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: SuperMap.RangeMode.CUSTOMINTERVAL
        });
        themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
        var themeParameters = new SuperMap.ThemeParameters({
            joinItems: null,
            themes: new Array(themeRange)
        });
        themeService.processAsync(themeParameters);

        setTimeout(function() {
            try{
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
});

describe('testThemeService',function(){
   it('ThemeUniqueItem',function(){
       var themeUniqueItem = new SuperMap.ThemeUniqueItem({
           visible: true,
           unique:  "亚洲",
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

