module("ThemeService");

var themeEventArgsSystem, serviceFailedEventArgsSystem,
    themeUrl = GlobeParameter.mapServiceURL + "World Map";

function themeCompleted(themeEventArgs){
    themeEventArgsSystem = themeEventArgs;
}

function themeFailed(serviceFailedEventArgs){
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}    
    
function initThemeService() {
    themeEventArgsSystem = null;
    serviceFailedEventArgsSystem = null;
    var themeService = new SuperMap.REST.ThemeService(themeUrl);
    return themeService;
}

function initThemeService_RegisterListener() {
    themeEventArgsSystem = null;
    serviceFailedEventArgsSystem = null;
    var themeService = new SuperMap.REST.ThemeService(themeUrl, {eventListeners:
        {"processCompleted": themeCompleted, "processFailed": themeFailed}});
    return themeService;
}

asyncTest("TestThemeService_Range", function() {
    var themeService = initThemeService();
        themeRange = new SuperMap.REST.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: SuperMap.REST.RangeMode.CUSTOMINTERVAL
        });
        style1 =  new SuperMap.REST.ServerStyle({
           fillForeColor: new SuperMap.REST.ServerColor(250, 105, 25),
           lineWidth: 0.05
        });
        themeRangeItem1 = new SuperMap.REST.ThemeRangeItem({
            style: style1,
            visible: true,
            start: -5,
            caption: "item1",
            end: 8609844.5
        });
        style2 =  new SuperMap.REST.ServerStyle({
           fillForeColor: new SuperMap.REST.ServerColor(114, 15, 205),
           lineWidth: 0.02
        });
        themeRangeItem2 = new SuperMap.REST.ThemeRangeItem({
            style: style2,
            visible: true,
            start: 8609844.5,
            caption: "item2",
            end: 28609844.5,
        });
        themeRangeItem3 = new SuperMap.REST.ThemeRangeItem({
            style: new SuperMap.REST.ServerStyle({
               fillForeColor: new SuperMap.REST.ServerColor(67, 78, 127),
               lineWidth: 0.01
            }),
            visible: true,
            start: 28609844.5,
            caption: "item3",
            end: 15028139690,
        });
    themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeRange)
    });
    
    themeService.processAsync(themeParameters);
    
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            var themeResultOther = new SuperMap.REST.ThemeResult({
                resourceInfo: themeResult.resourceInfo
            });
            deepEqual(themeResultOther,themeResult);
            
            themeRange.destroy();
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

asyncTest("TestThemeService_Range_1", function() {
    var themeService = initThemeService_RegisterListener();
        themeRange = new SuperMap.REST.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 2,
            rangeMode: SuperMap.REST.RangeMode.CUSTOMINTERVAL
        });
    style1 = new SuperMap.REST.ServerStyle();
    style1.fillForeColor = new SuperMap.REST.ServerColor();
    style1.fillForeColor.blue = 0;
    style1.fillForeColor.green = 50;
    style1.fillForeColor.red = 20;
    style1.lineColor = new SuperMap.REST.ServerColor();
    style1.lineColor = style1.fillForeColor;
    themeRangeItem1 = new SuperMap.REST.ThemeRangeItem({
        style: style1,
        visible: true,
        start: -1,
        caption: "item1",
        end: 104069844.5
    });
    style2 = new SuperMap.REST.ServerStyle();
    style2.fillForeColor = new SuperMap.REST.ServerColor();
    style2.fillForeColor.blue = 25;
    style2.fillForeColor.green = 250;
    style2.fillForeColor.red = 100;
    style2.lineColor = new SuperMap.REST.ServerColor();
    style2.lineColor = style2.fillForeColor;
    
    themeRangeItem2 = new SuperMap.REST.ThemeRangeItem({
        style: style2,
        visible: true,
        start: 104069844.5,
        caption: "item2",
        end: 1128139690,
    });
    themeRange.items = new Array(themeRangeItem1, themeRangeItem2);
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeRange)
    });
    
    themeService.processAsync(themeParameters);
    
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

asyncTest("TestThemeService_Range_UrlLarge", function() {
    var themeService = initThemeService();
        themeRange = new SuperMap.REST.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 6,
            rangeMode: SuperMap.REST.RangeMode.QUANTILE
        });
    var themeRangeIteme1 = new SuperMap.REST.ThemeRangeItem();
    themeRangeIteme1.start = 0.0;
    themeRangeIteme1.end = 59973;
    style1 = new SuperMap.REST.ServerStyle();
    style1.fillForeColor = new SuperMap.REST.ServerColor();
    style1.fillForeColor.blue = 232;
    style1.fillForeColor.green = 227;
    style1.fillForeColor.red = 204;
    style1.lineColor = new SuperMap.REST.ServerColor();
    style1.lineColor = style1.fillForeColor;
    themeRangeIteme1.style = style1;

    var themeRangeIteme2 = new SuperMap.REST.ThemeRangeItem();
    themeRangeIteme2.start = 59973;
    themeRangeIteme2.end = 1097234;
    style2 = new SuperMap.REST.ServerStyle();
    style2.fillForeColor = new SuperMap.REST.ServerColor();
    style2.fillForeColor.blue = 50;
    style2.fillForeColor.green = 20;
    style2.fillForeColor.red = 100;
    style2.lineColor = new SuperMap.REST.ServerColor();
    style2.lineColor = style2.fillForeColor;
    themeRangeIteme2.style = style2;

    var themeRangeIteme3 = new SuperMap.REST.ThemeRangeItem();
    themeRangeIteme3.start = 1097234;
    themeRangeIteme3.end = 5245515;
    style3 = new SuperMap.REST.ServerStyle();
    style3.fillForeColor = new SuperMap.REST.ServerColor();
    style3.fillForeColor.blue = 189;
    style3.fillForeColor.green = 113;
    style3.fillForeColor.red = 218;
    style3.lineColor = new SuperMap.REST.ServerColor();
    style3.lineColor = style3.fillForeColor;
    themeRangeIteme3.style = style3;

    var themeRangeIteme4 = new SuperMap.REST.ThemeRangeItem();
    themeRangeIteme4.start = 5245515;
    themeRangeIteme4.end = 17250390;
    style4 = new SuperMap.REST.ServerStyle();
    style4.fillForeColor = new SuperMap.REST.ServerColor();
    style4.fillForeColor.blue = 186;
    style4.fillForeColor.green = 196;
    style4.fillForeColor.red = 29;
    style4.lineColor = new SuperMap.REST.ServerColor();
    style4.lineColor = style4.fillForeColor;
    themeRangeIteme4.style = style4;

    var themeRangeIteme5 = new SuperMap.REST.ThemeRangeItem();
    themeRangeIteme5.start = 17250390;
    themeRangeIteme5.end = 894608700;
    style5 = new SuperMap.REST.ServerStyle();
    style5.fillForeColor = new SuperMap.REST.ServerColor();
    style5.fillForeColor.blue = 116;
    style5.fillForeColor.green = 167;
    style5.fillForeColor.red = 216;
    style5.lineColor = new SuperMap.REST.ServerColor();
    style5.lineColor = style5.fillForeColor;
    themeRangeIteme5.style = style5;
     
    var themeRangeIteme6 = new SuperMap.REST.ThemeRangeItem();
    themeRangeIteme6.start = 894608700;
	themeRangeIteme6.end = 1.84467E+19;
    style6 = new SuperMap.REST.ServerStyle();
    style6.fillForeColor = new SuperMap.REST.ServerColor();
    style6.fillForeColor.blue = 81;
    style6.fillForeColor.green = 81;
    style6.fillForeColor.red = 229;
    style6.lineColor = new SuperMap.REST.ServerColor();
    style6.lineColor = style6.fillForeColor;
    themeRangeIteme6.style = style6;

    themeRange.items = new Array(themeRangeIteme1,themeRangeIteme2,themeRangeIteme3,themeRangeIteme4,themeRangeIteme5,themeRangeIteme6);
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeRange)
    });
    
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    themeService.processAsync(themeParameters);
    
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15,
                "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, 
                "themeEventArgsSystem.originResult.newResourceLocation.length");
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

asyncTest("TestThemeService_Graph", function() {
    var themeService = initThemeService();
        themeGraph = new SuperMap.REST.ThemeGraph({
            barWidth: 2,
            graphType: SuperMap.REST.ThemeGraphType.PIE,
            flow: new SuperMap.REST.ThemeFlow({
                flowEnabled: false,
                leaderLineDisplayed: false
            }),
            graphAxes: new SuperMap.REST.ThemeGraphAxes({
                axesTextDisplayed: false
            }),
            graphSize: new SuperMap.REST.ThemeGraphSize({
              maxGraphSize: 100,
              minGraphSize: 10
            }),
            graphText: new SuperMap.REST.ThemeGraphText(),
            offset: new SuperMap.REST.ThemeOffset({
                offsetFixed: false
            })
        });
        uniformStyle1 = new SuperMap.REST.ServerStyle({
            fillForeColor: new SuperMap.REST.ServerColor(120,120,110)
        });
        uniformStyle2 = new SuperMap.REST.ServerStyle({
            fillForeColor: new SuperMap.REST.ServerColor(250,105,85)
        });
        themeGraphItem1 = new SuperMap.REST.ThemeGraphItem({
            caption: "SQMI", graphExpression:"SQMI",uniformStyle:uniformStyle1
        });
        themeGraphItem2 = new SuperMap.REST.ThemeGraphItem({
            caption: "SQKM", graphExpression:"SQKM",uniformStyle:uniformStyle2
        });
    themeGraph.items = new Array(themeGraphItem1, themeGraphItem2);
    
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeGraph)
    });
    
    themeService.processAsync(themeParameters);
    
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, 
                "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            
            themeGraph.destroy();
            ok(themeGraph.barWidth == null, "themeGraph.barWidth");
            ok(themeGraph.flow == null, "themeGraph.flow");
            ok(themeGraph.raduatedMode == null, "themeGraph.raduatedMode");
            ok(themeGraph.graphAxes == null, "themeGraph.graphAxes");
            ok(themeGraph.graphSize == null, "themeGraph.graphSize");
            ok(themeGraph.graphSizeFixed == null, "themeGraph.graphSizeFixed");
            ok(themeGraph.graphText == null, "themeGraph.graphText");
            ok(themeGraph.graphType == null, "themeGraph.graphType");
            
            ok(themeGraph.items == null, "themeGraph.items");
            ok(themeGraph.memoryKeys == null, "themeGraph.memoryKeys");
            ok(themeGraph.negativeDisplayed == null, "themeGraph.negativeDisplayed");
            ok(themeGraph.offset == null, "themeGraph.offset");
            ok(themeGraph.overlapAvoided == null, "themeGraph.overlapAvoided");
            ok(themeGraph.roseAngle == null, "themeGraph.roseAngle");
            ok(themeGraph.startAngle == null, "themeGraph.startAngle");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000)
});

test("testParameter_Null", function() {
    var themeService = initThemeService();
    themeService.processAsync(null);

    themeService.destroy();
    ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
    ok(themeService.events == null, "themeService.events");
    ok(themeService.lastResult == null, "themeService.lastResult");
    ok(themeService.eventListeners == null, "themeService.eventListeners");
    ok(themeEventArgsSystem == null);
    ok(serviceFailedEventArgsSystem == null);
})

test("TestThemeParameters", function() {
    var joinItem = new SuperMap.REST.JoinItem({
        foreignTableName: "foreignTableName",
        joinType: SuperMap.REST.JoinType.INNERJOIN,
    });
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: new Array(joinItem),
        themes: null
    });

    ok(themeParameters != null, "themeParameters")
    ok(themeParameters.joinItems != null, "themeParameters.joinItems");
    
    themeParameters.destroy();
    ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
    ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
    ok(themeParameters.joinItems == null, "themeParameters.joinItems");
    ok(themeParameters.themes == null, "themeParameters.themes");
})

asyncTest("TestThemeService_JoinItem", function() {
    var themeService = initThemeService_RegisterListener();
        joinItem = new SuperMap.REST.JoinItem({
            foreignTableName: "Capitals",
            joinFilter: "Countries.Country = Capitals.Country",
            joinType: SuperMap.REST.JoinType.LEFTJOIN
        });
        themeRange = new SuperMap.REST.ThemeRange({
            rangeExpression: "Cap_Pop",
            rangeParameter: 3,
            rangeMode: SuperMap.REST.RangeMode.CUSTOMINTERVAL
        });
    var style1 = new SuperMap.REST.ServerStyle();
    style1.fillForeColor = new SuperMap.REST.ServerColor();
    style1.fillForeColor.blue = 0;
    style1.fillForeColor.green = 0;
    style1.fillForeColor.red = 255;
    style1.lineColor = new SuperMap.REST.ServerColor();
    style1.lineColor = style1.fillForeColor;
    themeRangeItem1 = new SuperMap.REST.ThemeRangeItem({
        style: style1,
        visible: true,
        start: 0,
        caption: "item1",
        end: 500000
    });
    var style2 = new SuperMap.REST.ServerStyle();
    style2.fillForeColor = new SuperMap.REST.ServerColor();
    style2.fillForeColor.blue = 25;
    style2.fillForeColor.green = 250;
    style2.fillForeColor.red = 100;
    style2.lineColor = new SuperMap.REST.ServerColor();
    style2.lineColor = style2.fillForeColor;
    themeRangeItem2 = new SuperMap.REST.ThemeRangeItem({
        style: style2,
        visible: true,
        start: 500000,
        caption: "item2",
        end: 5000000,
    });
    var style3 = new SuperMap.REST.ServerStyle();
    style3.fillForeColor = new SuperMap.REST.ServerColor();
    style3.fillForeColor.blue = 25;
    style3.fillForeColor.green = 10;
    style3.fillForeColor.red = 40;
    style3.lineColor = new SuperMap.REST.ServerColor();
    style3.lineColor = style3.fillForeColor;
    themeRangeItem3 = new SuperMap.REST.ThemeRangeItem({
        style: style3,
        visible: true,
        start: 5000000,
        caption: "item3",
        end: 50000000,
    });
    themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
            datasetNames: new Array("Countries"),
            dataSourceNames: new Array("World"),
            joinItems: [joinItem],//new Array(joinItem)
            themes: new Array(themeRange)
        });
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            var themeResultOther = new SuperMap.REST.ThemeResult({
                resourceInfo: themeResult.resourceInfo
            });
            deepEqual(themeResultOther,themeResult);
            
            themeRange.destroy();
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000)
})

asyncTest("TestThemeService_Unique", function() {
    var themeService = initThemeService();
        themeUnique = new SuperMap.REST.ThemeUnique({
            uniqueExpression: "CONTINENT"
        });
        style1 =  new SuperMap.REST.ServerStyle({
           fillForeColor: new SuperMap.REST.ServerColor(250, 105, 25),
           lineWidth: 0.05
        });
        themeUniqueItem1 = new SuperMap.REST.ThemeUniqueItem({
            style: style1,
            visible: true,
            unique:  "亚洲",
            caption: "亚洲"
        });
        style2 =  new SuperMap.REST.ServerStyle({
           fillForeColor: new SuperMap.REST.ServerColor(114, 15, 205),
           lineWidth: 0.02
        });
        themeUniqueItem2 = new SuperMap.REST.ThemeUniqueItem({
            style: style2,
            visible: true,
            unique:  "欧洲",
            caption: "欧洲"
        });
        themeUniqueItem3 = new SuperMap.REST.ThemeUniqueItem({
            style: new SuperMap.REST.ServerStyle({
               fillForeColor: new SuperMap.REST.ServerColor(67, 78, 127),
               lineWidth: 0.01
            }),
            visible: true,
            unique:  "非洲",
            caption: "非洲"
        });
        themeUniqueItem4 = new SuperMap.REST.ThemeUniqueItem({
            style: new SuperMap.REST.ServerStyle({
               fillForeColor: new SuperMap.REST.ServerColor(57, 48, 113),
               lineWidth: 0.01
            }),
            visible: true,
            unique:  "北美洲",
            caption: "北美洲"
        });
    //南美洲默认风格
    themeUnique.items = new Array(themeUniqueItem1, themeUniqueItem2, themeUniqueItem3, themeUniqueItem4);
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeUnique)
    });
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            var themeResultOther = new SuperMap.REST.ThemeResult({
                resourceInfo: themeResult.resourceInfo
            });
            deepEqual(themeResultOther,themeResult);
            
            themeUnique.destroy();
            ok(themeUnique.defaultStyle == null, "themeUnique.defaultStyle");
            ok(themeUnique.items == null, "themeUnique.items");
            ok(themeUnique.uniqueExpression == null, "themeUnique.uniqueExpression");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

asyncTest("TestThemeService_Unique_0", function() {
    var themeService = initThemeService();
        themeUnique = new SuperMap.REST.ThemeUnique({
            uniqueExpression: "SmID"
        });
        style1 =  new SuperMap.REST.ServerStyle({
            fillForeColor: new SuperMap.REST.ServerColor(250, 105, 25),
            lineWidth: 0.05,
            markerSize: 10,
            markerSymbolID: 1
        });
        themeUniqueItem1 = new SuperMap.REST.ThemeUniqueItem({
            style: style1,
            visible: true,
            unique:  "1",
            caption: "ARCTIC  OCEAN"
        });
        style2 =  new SuperMap.REST.ServerStyle({
                fillForeColor: new SuperMap.REST.ServerColor(114, 15, 205),
                lineWidth: 0.02,
                markerSize: 14,
                markerSymbolID: 59
        });
        themeUniqueItem2 = new SuperMap.REST.ThemeUniqueItem({
            style: style2,
            visible: true,
            unique:  "2",
            caption: "PACIFIC   OCEAN"
        });
        themeUniqueItem3 = new SuperMap.REST.ThemeUniqueItem({
            style: new SuperMap.REST.ServerStyle({
                fillForeColor: new SuperMap.REST.ServerColor(67, 78, 127),
                lineWidth: 0.01,
                markerSize: 15,
                markerSymbolID: 66
            }),
            visible: true,
            unique:  "3",
            caption: "ATLANTIC   OCEAN"
        });
        themeUniqueItem4 = new SuperMap.REST.ThemeUniqueItem({
            style: new SuperMap.REST.ServerStyle({
                fillForeColor: new SuperMap.REST.ServerColor(57, 48, 113),
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
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});

    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("OceanLabelP_E"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeUnique)
    });
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            var themeResultOther = new SuperMap.REST.ThemeResult({
                resourceInfo: themeResult.resourceInfo
            });
            deepEqual(themeResultOther,themeResult);
            
            themeUnique.destroy();
            ok(themeUnique.defaultStyle == null, "themeUnique.defaultStyle");
            ok(themeUnique.items == null, "themeUnique.items");
            ok(themeUnique.uniqueExpression == null, "themeUnique.uniqueExpression");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

test("TestThemeUniqueItem", function(){
    var themeUniqueItem = new SuperMap.REST.ThemeUniqueItem({
        visible: true,
        unique:  "亚洲",
        caption: "亚洲"
    });
    
    ok(themeUniqueItem != null, "themeUniqueItem");
    ok(themeUniqueItem.style != null, "themeUniqueItem.style");
    themeUniqueItem.destroy();
    ok(themeUniqueItem.visible == null, "themeUniqueItem.visible");
    ok(themeUniqueItem.unique == null, "themeUniqueItem.unique");
    ok(themeUniqueItem.caption == null, "themeUniqueItem.caption");
    ok(themeUniqueItem.style == null, "themeUniqueItem.style");
});

//统一风格标签专题图
asyncTest("TestThemeService_Label_uniformStyle", function() {
   var themeService = initThemeService();
        themeLabel = new SuperMap.REST.ThemeLabel({
            labelExpression: "Pop_1994",
            labelOverLengthMode: SuperMap.REST.LabelOverLengthMode.NEWLINE,
            maxLabelLength:6,
            background: new SuperMap.REST.ThemeLabelBackground({
                backStyle: new SuperMap.REST.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.REST.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.REST.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.REST.LabelBackShape.NONE
            })
        });
        text = new SuperMap.REST.ThemeLabelText({
            uniformStyle: new SuperMap.REST.ServerTextStyle({
                sizeFixed: true,
                foreColor: new SuperMap.REST.ServerColor(220, 15, 205)
            })
        });
    themeLabel.text = text;
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
       
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeLabel)
    });
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeLabel.destroy();
            ok(themeLabel.alongLine == null, "themeLabel.alongLine");
            ok(themeLabel.background == null, "themeLabel.background");
            ok(themeLabel.flow == null, "themeLabel.flow");
            ok(themeLabel.items == null, "themeLabel.items");
            ok(themeLabel.labelExpression == null, "themeLabel.labelExpression");
            ok(themeLabel.labelOverLengthMode == null, "themeLabel.labelOverLengthMode");
            ok(themeLabel.matrixCells == null, "themeLabel.matrixCells");
            ok(themeLabel.maxLabelLength == null, "themeLabel.maxLabelLength");
            ok(themeLabel.numericPrecision == null, "themeLabel.numericPrecision");
            ok(themeLabel.offset == null, "themeLabel.offset");
            ok(themeLabel.overlapAvoided == null, "themeLabel.overlapAvoided");
            ok(themeLabel.rangeExpression == null, "themeLabel.rangeExpression");
            ok(themeLabel.smallGeometryLabeled == null, "themeLabel.smallGeometryLabeled");
            ok(themeLabel.text == null, "themeLabel.text");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//分段标签专题图
asyncTest("TestThemeService_Label_range_1", function() {
    var themeService = initThemeService();
        themeLabel = new SuperMap.REST.ThemeLabel({
            //alongLine: false,
            labelExpression: "smid",//smid    COUNTRY
            rangeExpression: "smid",
            labelOverLengthMode: SuperMap.REST.LabelOverLengthMode.OMIT,
            maxLabelLength:10,
            background: new SuperMap.REST.ThemeLabelBackground({
                backStyle: new SuperMap.REST.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.REST.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.REST.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.REST.LabelBackShape.ELLIPSE
            })
        });
        style1 =  new SuperMap.REST.ServerTextStyle({
            rotation: 10,
            sizeFixed: true,
            foreColor: new SuperMap.REST.ServerColor(250, 15, 25)
        });
        themeLabelItem1 = new SuperMap.REST.ThemeLabelItem({
            style: style1,
            visible: true,
            start: 1,
            end: 40
        });
        style2 =  new SuperMap.REST.ServerTextStyle({
            shadow: true,
            sizeFixed: true,
            foreColor: new SuperMap.REST.ServerColor(114, 15, 205)
        });
        themeLabelItem2 = new SuperMap.REST.ThemeLabelItem({
            style: style2,
            visible: true,
            start: 40,
            end: 100
        });
        themeLabelItem3 = new SuperMap.REST.ThemeLabelItem({
            style: new SuperMap.REST.ServerTextStyle({
                strikeout: true,
                sizeFixed: true,
                foreColor: new SuperMap.REST.ServerColor(67, 118, 27)
            }),
            visible: true,
            start: 100,
            end: 160
        });
        themeLabelItem4 = new SuperMap.REST.ThemeLabelItem({
            style: new SuperMap.REST.ServerTextStyle({
                rotation: -30,
                foreColor: new SuperMap.REST.ServerColor(17, 108, 163)
            }),
            visible: true,
            start: 160,
            end: 3000000000//300
        });
    themeLabel.items = new Array(themeLabelItem1, themeLabelItem2, themeLabelItem3, themeLabelItem4);
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeLabel)
    });
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeLabel.destroy();
            ok(themeLabel.alongLine == null, "themeLabel.alongLine");
            ok(themeLabel.background == null, "themeLabel.background");
            ok(themeLabel.flow == null, "themeLabel.flow");
            ok(themeLabel.items == null, "themeLabel.items");
            ok(themeLabel.labelExpression == null, "themeLabel.labelExpression");
            ok(themeLabel.labelOverLengthMode == null, "themeLabel.labelOverLengthMode");
            ok(themeLabel.matrixCells == null, "themeLabel.matrixCells");
            ok(themeLabel.maxLabelLength == null, "themeLabel.maxLabelLength");
            ok(themeLabel.numericPrecision == null, "themeLabel.numericPrecision");
            ok(themeLabel.offset == null, "themeLabel.offset");
            ok(themeLabel.overlapAvoided == null, "themeLabel.overlapAvoided");
            ok(themeLabel.rangeExpression == null, "themeLabel.rangeExpression");
            ok(themeLabel.smallGeometryLabeled == null, "themeLabel.smallGeometryLabeled");
            ok(themeLabel.text == null, "themeLabel.text");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//分段标签专题图
asyncTest("TestThemeService_Label_range_2", function() {
    var themeService = initThemeService();

    var themeLabelIteme1 = new SuperMap.REST.ThemeLabelItem();
    themeLabelIteme1.start = 0;
    themeLabelIteme1.end = 59973;
    style1 = new SuperMap.REST.ServerTextStyle();
    style1.fontHeight =5;
    style1.fontWidth =5;
    style1.foreColor = new SuperMap.REST.ServerColor();
    style1.foreColor.blue = 232;
    style1.foreColor.green = 227;
    style1.foreColor.red = 204;
    style1.sizeFixed = true;
    style1.bold = true;
    themeLabelIteme1.style = style1;

    var themeLabelIteme2 = new SuperMap.REST.ThemeLabelItem();
    themeLabelIteme2.start = 59973;
    themeLabelIteme2.end = 1097234;
    style2 = new SuperMap.REST.ServerTextStyle();
    style2.fontHeight =5;
    style2.fontWidth =5;
    style2.foreColor = new SuperMap.REST.ServerColor();
    style2.foreColor.blue = 50;
    style2.foreColor.green = 20;
    style2.foreColor.red = 100;
    style2.sizeFixed = true;
    style2.bold = true;
    themeLabelIteme2.style = style2;

    var themeLabelIteme3 = new SuperMap.REST.ThemeLabelItem();
    themeLabelIteme3.start = 1097234;
    themeLabelIteme3.end = 5245515;
    style3 = new SuperMap.REST.ServerTextStyle();
    style3.fontHeight =5;
    style3.fontWidth =5;
    style3.foreColor = new SuperMap.REST.ServerColor();
    style3.foreColor.blue = 255;
    style3.foreColor.green = 95;
    style3.foreColor.red = 93;
    style3.sizeFixed = true;
    style3.bold = true;
    themeLabelIteme3.style = style3;
    
    var themeLabelIteme4 = new SuperMap.REST.ThemeLabelItem();
    themeLabelIteme4.start = 5245515;
    themeLabelIteme4.end = 17250390;
    style4 = new SuperMap.REST.ServerTextStyle();
    style4.fontHeight =5;
    style4.fontWidth =5;
    style4.foreColor = new SuperMap.REST.ServerColor();
    style4.foreColor.blue = 6;
    style4.foreColor.green = 129;
    style4.foreColor.red = 1;
    style4.sizeFixed = true;
    style4.bold = true;
    themeLabelIteme4.style = style4;
    
    var themeLabelIteme5 = new SuperMap.REST.ThemeLabelItem();
    themeLabelIteme5.start = 17250390;
    themeLabelIteme5.end = 894608700;
    style5 = new SuperMap.REST.ServerTextStyle();
    style5.fontHeight =5;
    style5.fontWidth =5;
    style5.foreColor = new SuperMap.REST.ServerColor();
    style5.foreColor.blue = 0;
    style5.foreColor.green = 129;
    style5.foreColor.red = 255;
    style5.sizeFixed = true;
    style5.bold = true;
    themeLabelIteme5.style = style5;

    var themeLabelIteme6 = new SuperMap.REST.ThemeLabelItem();
    themeLabelIteme6.start = 894608700;
    themeLabelIteme6.end = 1.84467E+19;
    style6 = new SuperMap.REST.ServerTextStyle();
    style6.fontHeight =5;
    style6.fontWidth =5;
    style6.foreColor = new SuperMap.REST.ServerColor();
    style6.foreColor.blue = 81;
    style6.foreColor.green = 81;
    style6.foreColor.red = 229;
    style6.sizeFixed = true;
    style6.bold = true;
    themeLabelIteme6.style = style6;
    
    //创建标签专题图对象，ThemeLabel 必设 labelExpression，如果要分段则 rangeExpression 和 items 也必须设置；每个子项将以子项中的风格进行显示，未分段的标签使用默认风格。
    //专题图参数 ThemeParameters 必设 theme（即以设置好的分段专题图对象）、dataSourceName 和 datasetName
    var themeLabel = new SuperMap.REST.ThemeLabel();
    themeLabel.labelExpression = "Capital";
    themeLabel.rangeExpression = "Pop_1994";
    themeLabel.items = [themeLabelIteme1,themeLabelIteme2,themeLabelIteme3,themeLabelIteme4,themeLabelIteme5,themeLabelIteme6];
    themeLabel.text.uniformStyle.sizeFixed = true;
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeLabel)
    });

    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeLabel.destroy();
            ok(themeLabel.alongLine == null, "themeLabel.alongLine");
            ok(themeLabel.background == null, "themeLabel.background");
            ok(themeLabel.flow == null, "themeLabel.flow");
            ok(themeLabel.items == null, "themeLabel.items");
            ok(themeLabel.labelExpression == null, "themeLabel.labelExpression");
            ok(themeLabel.labelOverLengthMode == null, "themeLabel.labelOverLengthMode");
            ok(themeLabel.matrixCells == null, "themeLabel.matrixCells");
            ok(themeLabel.maxLabelLength == null, "themeLabel.maxLabelLength");
            ok(themeLabel.numericPrecision == null, "themeLabel.numericPrecision");
            ok(themeLabel.offset == null, "themeLabel.offset");
            ok(themeLabel.overlapAvoided == null, "themeLabel.overlapAvoided");
            ok(themeLabel.rangeExpression == null, "themeLabel.rangeExpression");
            ok(themeLabel.smallGeometryLabeled == null, "themeLabel.smallGeometryLabeled");
            ok(themeLabel.text == null, "themeLabel.text");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//矩阵标签专题图
asyncTest("TestThemeService_Label_matrixCells", function() {
    var themeService = initThemeService(),
        labelThemeOfThemeCell = new SuperMap.REST.ThemeLabel({
            labelExpression: "Capital",
            labelOverLengthMode: SuperMap.REST.LabelOverLengthMode.NEWLINE,
            maxLabelLength:6,
            background: new SuperMap.REST.ThemeLabelBackground({
                backStyle: new SuperMap.REST.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.REST.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.REST.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.REST.LabelBackShape.NONE
            })
        }),
        text = new SuperMap.REST.ThemeLabelText({
            uniformStyle: new SuperMap.REST.ServerTextStyle({
                sizeFixed: true,
                foreColor: new SuperMap.REST.ServerColor(50, 45, 225)
            })
        }),
        themeLabel = new SuperMap.REST.ThemeLabel();
        
    labelThemeOfThemeCell.text = text;
    var labelSymbolCell = new SuperMap.REST.LabelSymbolCell({symbolIDField: "60"});
    labelSymbolCell.style = new SuperMap.REST.ServerStyle({markerSize: 5});
    var labelThemeCell = new SuperMap.REST.LabelThemeCell({themeLabel: labelThemeOfThemeCell});
    var matrixCells = new Array(new Array(labelSymbolCell),new Array(labelThemeCell));
    //var matrixCells = new Array(new Array(labelSymbolCell, labelThemeCell));
    themeLabel.matrixCells = matrixCells;
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
       
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeLabel)
    });
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeLabel.destroy();
            ok(themeLabel.alongLine == null, "themeLabel.alongLine");
            ok(themeLabel.background == null, "themeLabel.background");
            ok(themeLabel.flow == null, "themeLabel.flow");
            ok(themeLabel.items == null, "themeLabel.items");
            ok(themeLabel.labelExpression == null, "themeLabel.labelExpression");
            ok(themeLabel.labelOverLengthMode == null, "themeLabel.labelOverLengthMode");
            ok(themeLabel.matrixCells == null, "themeLabel.matrixCells");
            ok(themeLabel.maxLabelLength == null, "themeLabel.maxLabelLength");
            ok(themeLabel.numericPrecision == null, "themeLabel.numericPrecision");
            ok(themeLabel.offset == null, "themeLabel.offset");
            ok(themeLabel.overlapAvoided == null, "themeLabel.overlapAvoided");
            ok(themeLabel.rangeExpression == null, "themeLabel.rangeExpression");
            ok(themeLabel.smallGeometryLabeled == null, "themeLabel.smallGeometryLabeled");
            ok(themeLabel.text == null, "themeLabel.text");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//使用内存数据制作统一风格标签专题图
asyncTest("TestThemeService_Label__WithMemortData", function() {
    var themeService = initThemeService();
        srcData = new Array("亚洲", "欧洲", "非洲", "北美洲", "南美洲");
        targetData = new Array("亚洲国家", "欧洲国家", "非洲国家", "北美洲国家", "南美洲国家");
        themeMemoryData = new SuperMap.REST.ThemeMemoryData(srcData, targetData);
        themeLabel = new SuperMap.REST.ThemeLabel({
            labelExpression: "CONTINENT",
            labelOverLengthMode: SuperMap.REST.LabelOverLengthMode.NEWLINE,
            maxLabelLength:6,
            background: new SuperMap.REST.ThemeLabelBackground({
                backStyle: new SuperMap.REST.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.REST.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.REST.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                }),
                labelBackShape: SuperMap.REST.LabelBackShape.NONE
            }),
            memoryData: themeMemoryData
        });
        text = new SuperMap.REST.ThemeLabelText({
            uniformStyle: new SuperMap.REST.ServerTextStyle({
                sizeFixed: true,
                foreColor: new SuperMap.REST.ServerColor(220, 15, 205)
            })
        });
    themeLabel.text = text;
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
       
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeLabel)
    });
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeLabel.destroy();
            ok(themeLabel.alongLine == null, "themeLabel.alongLine");
            ok(themeLabel.background == null, "themeLabel.background");
            ok(themeLabel.flow == null, "themeLabel.flow");
            ok(themeLabel.items == null, "themeLabel.items");
            ok(themeLabel.labelExpression == null, "themeLabel.labelExpression");
            ok(themeLabel.labelOverLengthMode == null, "themeLabel.labelOverLengthMode");
            ok(themeLabel.matrixCells == null, "themeLabel.matrixCells");
            ok(themeLabel.maxLabelLength == null, "themeLabel.maxLabelLength");
            ok(themeLabel.memoryData == null, "themeLabel.memoryData");
            ok(themeLabel.numericPrecision == null, "themeLabel.numericPrecision");
            ok(themeLabel.offset == null, "themeLabel.offset");
            ok(themeLabel.overlapAvoided == null, "themeLabel.overlapAvoided");
            ok(themeLabel.rangeExpression == null, "themeLabel.rangeExpression");
            ok(themeLabel.smallGeometryLabeled == null, "themeLabel.smallGeometryLabeled");
            ok(themeLabel.text == null, "themeLabel.text");
            
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//使用内存数据制作范围分段专题图
asyncTest("TestThemeService_Range_withMemoryData", function() {
    var themeService = initThemeService();
        themeRange = new SuperMap.REST.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: SuperMap.REST.RangeMode.CUSTOMINTERVAL
        });
        style1 =  new SuperMap.REST.ServerStyle({
           fillForeColor: new SuperMap.REST.ServerColor(250, 105, 25),
           lineWidth: 0.05
        });
        themeRangeItem1 = new SuperMap.REST.ThemeRangeItem({
            style: style1,
            visible: true,
            start: -5,
            caption: "item1",
            end: 8609844.5
        });
        style2 =  new SuperMap.REST.ServerStyle({
           fillForeColor: new SuperMap.REST.ServerColor(114, 15, 205),
           lineWidth: 0.02
        });
        themeRangeItem2 = new SuperMap.REST.ThemeRangeItem({
            style: style2,
            visible: true,
            start: 8609844.5,
            caption: "item2",
            end: 28609844.5,
        });
        themeRangeItem3 = new SuperMap.REST.ThemeRangeItem({
            style: new SuperMap.REST.ServerStyle({
               fillForeColor: new SuperMap.REST.ServerColor(67, 78, 127),
               lineWidth: 0.01
            }),
            visible: true,
            start: 28609844.5,
            caption: "item3",
            end: 15028139690,
        });
    themeRange.items = new Array(themeRangeItem1, themeRangeItem2, themeRangeItem3);
    
    srcData = new Array(1128139689,17827520,33796870);
    targetData =  new Array(2,17827520,33796870);
    themeMemoryData = new SuperMap.REST.ThemeMemoryData(srcData, targetData);
    themeRange.memoryData = themeMemoryData;
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeRange)
    });
    
    themeService.processAsync(themeParameters);
    
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            var themeResultOther = new SuperMap.REST.ThemeResult({
                resourceInfo: themeResult.resourceInfo
            });
            deepEqual(themeResultOther,themeResult);

            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//点密度专题图
asyncTest("TestThemeService_DotDensity_style", function() {
    var themeService = initThemeService();

    var themeDotDensity = new SuperMap.REST.ThemeDotDensity({
        dotExpression: "Pop_1994",
        value: 10000000
    });
    var style1 = new SuperMap.REST.ServerStyle({
                    fillBackOpaque: true,
                    fillForeColor: new SuperMap.REST.ServerColor(10, 20, 0),
                    fillOpaqueRate: 20,
                    lineColor: new SuperMap.REST.ServerColor(255, 50, 0),
                    lineWidth: 0.1
                });
    themeDotDensity.style = style1;
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeDotDensity)
    });

    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeDotDensity.destroy();
            ok(themeDotDensity.style == null, "themeDotDensity.style");
            ok(themeDotDensity.value == null, "themeDotDensity.value");
            ok(themeDotDensity.dotExpression == null, "themeDotDensity.dotExpression");
                        
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.joinItems == null, "themeParameters.joinItems");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

//等级符号专题图
asyncTest("testThemeService_GraduatedSymbol", function(){
    var themeService = initThemeService();
    var style, offset;
    myOffset = new SuperMap.REST.ThemeOffset({
        offsetFixed: true,
        offsetX: 0.2,
        offsetY: 0.1
    });
    myStyle = new SuperMap.REST.ThemeGraduatedSymbolStyle({
        negativeDisplayed: true,
        negativeStyle: new SuperMap.REST.ServerStyle({
            fillBackOpaque: true,
            fillGradientAngle: 20,
            fillOpaqueRate: 80
        })
    });
        
    var themeGradSym;
    themeGradSym = new SuperMap.REST.ThemeGraduatedSymbol({
        baseValue: 5,
        expression: "POP_1994",
        flow: new SuperMap.REST.ThemeFlow({
            flowEnabled: false
        }),
        graduatedMode: SuperMap.REST.GraduatedMode.LOGARITHM,
        offset:myOffset,
        style: myStyle
    });
    var themeParameters = new SuperMap.REST.ThemeParameters({
        datasetNames: new Array("Countries"),
        dataSourceNames: new Array("World"),
        joinItems: null,
        themes: new Array(themeGradSym)
    });
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    themeService.processAsync(themeParameters);
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            ok(themeResult.resourceInfo != null, "themeResult.resourceInfo");
            equal(themeResult.resourceInfo.succeed, true, "themeResult.resourceInfo.succeed");
            ok(themeResult.resourceInfo.newResourceLocation != null, 
                "themeResult.resourceInfo.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            ok(themeResult.resourceInfo.newResourceLocation.length > themeUrl.length + 15, "themeResult.resourceInfo.newResourceLocation.length");
            
            ok(themeEventArgsSystem != null, "themeEventArgsSystem");
            ok(themeEventArgsSystem.result != null, "themeEventArgsSystem.result");
            deepEqual(themeEventArgsSystem.result, themeResult, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult != null, "themeEventArgsSystem.originResult");
            equal(themeEventArgsSystem.originResult.succeed, true, "themeEventArgsSystem.originResult.succeed");
            equal(themeEventArgsSystem.originResult.newResourceLocation, themeResult.resourceInfo.newResourceLocation,
                "themeEventArgsSystem.originResult.newResourceLocation:" + themeResult.resourceInfo.newResourceLocation);
            equal(themeEventArgsSystem.originResult.newResourceLocation.length, 
                themeResult.resourceInfo.newResourceLocation.length, "themeEventArgsSystem.originResult.newResourceLocation.length");
            
            themeEventArgsSystem.destroy();
            ok(themeEventArgsSystem.result == null, "themeEventArgsSystem.result");
            ok(themeEventArgsSystem.originResult == null, "themeEventArgsSystem.originResult");
            
            themeGradSym.destroy();
            ok(themeGradSym !== null, "not null");
            equal(themeGradSym.baseValue, 5, "themeGradSym.baseValue");
            equal(themeGradSym.expression, null, "themeGradSym.expression");
            equal(themeGradSym.flow, null, "themeGradSym.flow");
            equal(themeGradSym.graduatedMode, SuperMap.REST.GraduatedMode.CONSTANT, "themeGradSym.graduatedMode");
            equal(themeGradSym.offset, null, "themeGradSym.offset");
            equal(themeGradSym.style, null, "themeGradSym.style");
    
            themeResult.destroy();
            ok(themeResult.resourceInfo === null, "themeService.resourceInfo");  
            
            themeParameters.destroy();
            ok(themeParameters.datasetNames == null, "themeParameters.datasetNames");
            ok(themeParameters.dataSourceNames == null, "themeParameters.dataSourceNames");
            ok(themeParameters.themes == null, "themeParameters.themes");
            
            themeService.destroy();
            ok(themeService.EVENT_TYPES == null, "themeService.EVENT_TYPES");
            ok(themeService.events == null, "themeService.events");
            ok(themeService.lastResult == null, "themeService.lastResult");
            ok(themeService.eventListeners == null, "themeService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

asyncTest("TestThemeService_data", function() {
    var themeService = initThemeService();
        themeRange = new SuperMap.REST.ThemeRange({
            rangeExpression: "POP_1994",
            rangeParameter: 3,
            rangeMode: SuperMap.REST.RangeMode.CUSTOMINTERVAL
        });
    
    ok(themeService != null, "not null");
    equal(themeService.url, themeUrl + "/tempLayersSet.jsonp?", "url");
    themeService.events.on({"processCompleted": themeCompleted, "processFailed": themeFailed});
    
    
    var themeParameters = new SuperMap.REST.ThemeParameters({
        joinItems: null,
        themes: new Array(themeRange)
    });
    
    themeService.processAsync(themeParameters);
    
    setTimeout(function() {
        try{
            var themeResult = themeService.lastResult;
            ok(themeResult != null, "themeService.lastResult");  
            
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:"+excepion.message)
            start();
        }
    }, 6000);
});

