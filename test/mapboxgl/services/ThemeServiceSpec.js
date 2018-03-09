import {ThemeService} from '../../../src/mapboxgl/services/ThemeService';
import {ThemeParameters} from '../../../src/common/iServer/ThemeParameters';
import {ThemeDotDensity} from '../../../src/common/iServer/ThemeDotDensity';
import {ServerStyle} from '../../../src/common/iServer/ServerStyle';
import {ThemeFlow} from '../../../src/common/iServer/ThemeFlow';
import {ThemeGraduatedSymbol} from '../../../src/common/iServer/ThemeGraduatedSymbol';
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
import {ThemeLabelItem} from '../../../src/common/iServer/ThemeLabelItem';
import {ThemeLabel} from '../../../src/common/iServer/ThemeLabel';
import {ThemeLabelBackground} from '../../../src/common/iServer/ThemeLabelBackground';
import {ThemeRangeItem} from '../../../src/common/iServer/ThemeRangeItem';
import {ThemeRange} from '../../../src/common/iServer/ThemeRange';
import {ThemeUniqueItem} from '../../../src/common/iServer/ThemeUniqueItem';
import {ThemeUnique} from '../../../src/common/iServer/ThemeUnique';
import {ThemeGridUnique} from '../../../src/common/iServer/ThemeGridUnique';
import {ThemeGridUniqueItem} from '../../../src/common/iServer/ThemeGridUniqueItem';
import {RangeMode} from '../../../src/common/REST';
import {GraduatedMode} from '../../../src/common/REST';
import {ThemeGraphTextFormat} from '../../../src/common/REST';
import {ThemeGraphType} from '../../../src/common/REST';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var worldURL = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
var chinaURL = "http://supermap:8090/iserver/services/map-china400/rest/maps/China";
var jingjingURL = "http://supermap:8090/iserver/services/map-jingjin/rest/maps/京津地区地图";
var jingjinPopulationUrl = "http://supermap:8090/iserver/services/map-jingjin/rest/maps/京津地区人口分布图_专题图";
describe('mapboxgl_ThemeService', () => {
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
            value: 20,
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
        var service = new ThemeService(worldURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'memoryData':null,'type':\"DOTDENSITY\",'dotExpression':\"Pop_1994\",'value':20,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':3,'markerSymbolID':12}},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'Countries','dataSourceName': 'World'}}]},'name': 'World'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(worldURL + "/tempLayersSet/93dtest.json");
            done();
        });
    });

    //等级符号专题图
    it('getThemeInfo_GraduatedSymbol', (done) => {
        var themeGraduatedSymbol = new ThemeGraduatedSymbol({
            expression: "SMAREA",
            baseValue: 300,
            graduatedMode: GraduatedMode.CONSTANT,
            flow: new ThemeFlow({
                flowEnabled: true
            }),
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
        var service = new ThemeService(chinaURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'type':\"GRADUATEDSYMBOL\",'memoryData':null,'baseValue':300,'expression':\"SMAREA\",'graduatedMode':\"CONSTANT\",'flowEnabled':true,'leaderLineDisplayed':false,'leaderLineStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'offsetFixed':false,'offsetX':\"0.0\",'offsetY':\"0.0\",'negativeStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'negativeDisplayed':false,'positiveStyle':{'fillBackColor':{'red':255,'green':0,'blue':0},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':255,'green':165,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':50,'markerSymbolID':0},'zeroDisplayed':false,'zeroStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1}},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'China_Province_pg','dataSourceName': 'China'}}]},'name': 'China'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(chinaURL + "/tempLayersSet/93dtest.json");
            done();
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
                })
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
        var service = new ThemeService(chinaURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'type':\"GRAPH\",'graphTextDisplayed':true,'graphTextFormat':\"VALUE\",'graphTextStyle':{'align':\"BASELINECENTER\",'backColor':{'red':255,'green':255,'blue':255},'foreColor':{'red':0,'green':0,'blue':0},'backOpaque':false,'sizeFixed':true,'fontHeight':10,'fontWidth':10,'fontWeight':400,'fontName':\"Times New Roman\",'bold':false,'italic':false,'italicAngle':0,'shadow':false,'strikeout':false,'outline':false,'opaqueRate':0,'underline':false,'rotation':0},'flowEnabled':false,'leaderLineDisplayed':false,'leaderLineStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'axesColor':{'red':0,'green':0,'blue':0},'axesDisplayed':true,'axesGridDisplayed':false,'axesTextDisplayed':false,'axesTextStyle':{'align':\"BASELINECENTER\",'backColor':{'red':255,'green':255,'blue':255},'foreColor':{'red':0,'green':0,'blue':0},'backOpaque':false,'sizeFixed':true,'fontHeight':6,'fontWidth':0,'fontWeight':400,'fontName':\"Times New Roman\",'bold':false,'italic':false,'italicAngle':0,'shadow':false,'strikeout':false,'outline':false,'opaqueRate':0,'underline':false,'rotation':0},'maxGraphSize':500000,'minGraphSize':200000,'offsetFixed':false,'offsetX':\"0.0\",'offsetY':\"0.0\",'barWidth':0.001,'graduatedMode':\"CONSTANT\",'graphSizeFixed':false,'graphType':\"BAR\",'graphAxesTextDisplayMode':\"NONE\",'items':[{'caption':\"全国省份2013_GDP\",'graphExpression':\"GDP_2013\",'memoryDoubleValues':null,'uniformStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':215,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':0,'markerAngle':0,'markerSize':1,'markerSymbolID':-1}},{'caption':\"全国省份2014_GDP\",'graphExpression':\"GDP_2014\",'memoryDoubleValues':null,'uniformStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':0,'green':191,'blue':255},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':0,'markerAngle':0,'markerSize':1,'markerSymbolID':-1}}],'memoryKeys':null,'negativeDisplayed':false,'overlapAvoided':false,'roseAngle':0,'startAngle':0},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'China_Province_pg','dataSourceName': 'China'}}]},'name': 'China'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(chinaURL + "/tempLayersSet/93dtest.json");
            done();
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
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(jingjinPopulationUrl + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'memoryData':null,'type':\"GRIDRANGE\",'reverseColor':false,'rangeMode':\"EQUALINTERVAL\",'items':[{'caption':null,'color':{'red':198,'green':244,'blue':240},'end':120,'start':-4,'visible':true},{'caption':null,'color':{'red':176,'green':244,'blue':188},'end':240,'start':120,'visible':true},{'caption':null,'color':{'red':218,'green':251,'blue':178},'end':360,'start':240,'visible':true}],'rangeParameter':0,'colorGradientType':\"YELLOWRED\"},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'JingjinTerrain','dataSourceName': 'Jingjin'}}]},'name': '京津地区人口分布图_专题图'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-jingjin/rest/maps/京津地区人口分布图_专题图/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(jingjinPopulationUrl + "/tempLayersSet/93dtest.json");
            done();
        });
    });

    //栅格单值专题图
    it('getThemeInfo_GridUnique', (done) => {
        var setItems = () => {
            var items = [];
            for (var i = 0; i < 5; i++) {
                var item = new ThemeGridUniqueItem();
                item.caption = 1;
                item.unique = i;
                item.visible = true;
                item.color = new ServerColor(198, 244, 240);
                items.push(item);
            }
            return items;
        }

        var themeGridUnique = new ThemeGridUnique({
            defaultcolor: new ServerColor(0, 0, 0),
            items: setItems()
        });
        var themeParameters = new ThemeParameters({
            datasetNames: ["JingjinTerrain"],
            dataSourceNames: ["Jingjin"],
            themes: [themeGridUnique]
        });
        var service = new ThemeService(jingjingURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(jingjingURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'memoryData':null,'type':\"GRIDUNIQUE\",'defaultcolor':{'red':0,'green':0,'blue':0},'items':[{'caption':1,'color':{'red':198,'green':244,'blue':240},'unique':0,'visible':true},{'caption':1,'color':{'red':198,'green':244,'blue':240},'unique':1,'visible':true},{'caption':1,'color':{'red':198,'green':244,'blue':240},'unique':2,'visible':true},{'caption':1,'color':{'red':198,'green':244,'blue':240},'unique':3,'visible':true},{'caption':1,'color':{'red':198,'green':244,'blue':240},'unique':4,'visible':true}]},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'JingjinTerrain','dataSourceName': 'Jingjin'}}]},'name': '京津地区地图'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-jingjin/rest/maps/京津地区地图/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(jingjingURL + "/tempLayersSet/93dtest.json");
            done();
        });
    });

    //标签专题图
    it('getThemeInfo_Label', (done) => {
        var themeLabelItem1 = new ThemeLabelItem({
            start: 300,
            end: 3508,
            style: new ServerTextStyle({
                fontHeight: 4,
                foreColor: new ServerColor(0, 0, 0)
            })
        });
        var themeLabelItem2 = new ThemeLabelItem({
            start: 3508,
            end: 5508,
            style: new ServerTextStyle({
                fontHeight: 4,
                foreColor: new ServerColor(155, 30, 45)
            })
        });
        var themeLabelItem3 = new ThemeLabelItem({
            start: 5508,
            end: 10724,
            style: new ServerTextStyle({
                fontHeight: 4,
                foreColor: new ServerColor(30, 45, 155)
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
        var service = new ThemeService(chinaURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'type':\"LABEL\",'memoryData':null,'alongLine':true,'alongLineDirection':\"LEFT_BOTTOM_TO_RIGHT_TOP\",'angleFixed':false,'isLabelRepeated':null,'labelRepeatInterval':0,'repeatedLabelAvoided':false,'repeatIntervalFixed':false,'offsetFixed':false,'offsetX':\"0.0\",'offsetY':\"0.0\",'flowEnabled':false,'leaderLineDisplayed':false,'leaderLineStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':0,'blue':0},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'maxTextHeight':0,'maxTextWidth':0,'minTextHeight':0,'minTextWidth':0,'uniformStyle':{'align':\"BASELINECENTER\",'backColor':{'red':255,'green':255,'blue':255},'foreColor':{'red':0,'green':0,'blue':0},'backOpaque':false,'sizeFixed':true,'fontHeight':6,'fontWidth':0,'fontWeight':400,'fontName':\"Times New Roman\",'bold':false,'italic':false,'italicAngle':0,'shadow':false,'strikeout':false,'outline':false,'opaqueRate':0,'underline':false,'rotation':0},'uniformMixedStyle':null,'labelBackShape':\"RECT\",'backStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':179,'green':209,'blue':193},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':60,'fillSymbolID':0,'lineColor':{'red':0,'green':0,'blue':0},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'labelOverLengthMode':\"NONE\",'maxLabelLength':256,'smallGeometryLabeled':false,'rangeExpression':\"pop_2014\",'uniqueExpression':null,'numericPrecision':0,'items':[{'caption':null,'end':3508,'start':300,'visible':true,'style':{'align':\"BASELINECENTER\",'backColor':{'red':255,'green':255,'blue':255},'foreColor':{'red':0,'green':0,'blue':0},'backOpaque':false,'sizeFixed':true,'fontHeight':4,'fontWidth':0,'fontWeight':400,'fontName':\"Times New Roman\",'bold':false,'italic':false,'italicAngle':0,'shadow':false,'strikeout':false,'outline':false,'opaqueRate':0,'underline':false,'rotation':0}},{'caption':null,'end':5508,'start':3508,'visible':true,'style':{'align':\"BASELINECENTER\",'backColor':{'red':255,'green':255,'blue':255},'foreColor':{'red':155,'green':30,'blue':45},'backOpaque':false,'sizeFixed':true,'fontHeight':4,'fontWidth':0,'fontWeight':400,'fontName':\"Times New Roman\",'bold':false,'italic':false,'italicAngle':0,'shadow':false,'strikeout':false,'outline':false,'opaqueRate':0,'underline':false,'rotation':0}},{'caption':null,'end':10724,'start':5508,'visible':true,'style':{'align':\"BASELINECENTER\",'backColor':{'red':255,'green':255,'blue':255},'foreColor':{'red':30,'green':45,'blue':155},'backOpaque':false,'sizeFixed':true,'fontHeight':4,'fontWidth':0,'fontWeight':400,'fontName':\"Times New Roman\",'bold':false,'italic':false,'italicAngle':0,'shadow':false,'strikeout':false,'outline':false,'opaqueRate':0,'underline':false,'rotation':0}}],'uniqueItems':null,'labelExpression':\"NAME\",'overlapAvoided':true,'matrixCells':null,'textSpace':0},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'China_Province_pg','dataSourceName': 'China'}}]},'name': 'China'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe("93dtest");
            expect(serviceResult.result.newResourceLocation).toBe(chinaURL + "/tempLayersSet/93dtest.json");
            done();
        });
    });

    //范围分段专题图
    it('getThemeInfo_Range', (done) => {
        var themeRangeItem1, themeRangeItem2, themeRangeItem3;
        themeRangeItem1 = new ThemeRangeItem({
            start: 0,
            end: 20,
            style: new ServerStyle({
                fillForeColor: new ServerColor(211, 255, 250),
                lineColor: new ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        themeRangeItem2 = new ThemeRangeItem({
            start: 20,
            end: 40,
            style: new ServerStyle({
                fillForeColor: new ServerColor(178, 218, 199),
                lineColor: new ServerColor(179, 209, 193),
                lineWidth: 0.1
            })
        });
        themeRangeItem3 = new ThemeRangeItem({
            start: 40,
            end: 60,
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
        var service = new ThemeService(chinaURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'memoryData':null,'type':\"RANGE\",'rangeExpression':\"SMAREA\",'rangeMode':\"EQUALINTERVAL\",'items':[{'caption':null,'end':20,'start':0,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':211,'green':255,'blue':250},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':179,'green':209,'blue':193},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'visible':true},{'caption':null,'end':40,'start':20,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':178,'green':218,'blue':199},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':179,'green':209,'blue':193},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'visible':true},{'caption':null,'end':60,'start':40,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':58,'green':178,'blue':166},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':179,'green':209,'blue':193},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'visible':true}],'precision':\"1.0E-12\",'rangeParameter':0,'colorGradientType':\"YELLOWRED\"},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'China_Province_pg','dataSourceName': 'China'}}]},'name': 'China'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(chinaURL + "/tempLayersSet/93dtest.json");
            done();
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
        var service = new ThemeService(chinaURL);
        var expectParams;
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(chinaURL + "/tempLayersSet.json?");
            expectParams = "[{'type': 'UGC','subLayers': {'layers': [{'theme': {'memoryData':null,'type':\"UNIQUE\",'uniqueExpression':\"Name\",'items':[{'caption':null,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':248,'green':203,'blue':249},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':255,'green':255,'blue':255},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'unique':\"黑龙江省\",'visible':true},{'caption':null,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':196,'green':255,'blue':189},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':255,'green':255,'blue':255},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'unique':\"湖北省\",'visible':true},{'caption':null,'style':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':255,'green':173,'blue':173},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':255,'green':255,'blue':255},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'unique':\"吉林省\",'visible':true}],'defaultStyle':{'fillBackColor':{'red':255,'green':255,'blue':255},'fillBackOpaque':false,'fillForeColor':{'red':248,'green':203,'blue':249},'fillGradientMode':null,'fillGradientAngle':0,'fillGradientOffsetRatioX':0,'fillGradientOffsetRatioY':0,'fillOpaqueRate':100,'fillSymbolID':0,'lineColor':{'red':255,'green':255,'blue':255},'lineSymbolID':0,'lineWidth':0.1,'markerAngle':0,'markerSize':1,'markerSymbolID':-1},'colorGradientType':\"YELLOWRED\"},'type': 'UGC','ugcLayerType': 'THEME','datasetInfo': {'name': 'China_Province_pg','dataSourceName': 'China'}}]},'name': 'China'}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"93dtest\",\"succeed\":true,\"newResourceLocation\":\"http://supermap:8090/iserver/services/map-china400/rest/maps/China/tempLayersSet/93dtest.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        service.getThemeInfo(themeParameters, (result) => {
            serviceResult = result;
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.object.options.method).toEqual("POST");
            expect(serviceResult.object.options.data).toBe(expectParams);
            expect(serviceResult.result.succeed).toBe(true);
            expect(serviceResult.result.postResultType).toBe("CreateChild");
            expect(serviceResult.result.newResourceID).toBe('93dtest');
            expect(serviceResult.result.newResourceLocation).toBe(chinaURL + "/tempLayersSet/93dtest.json");
            done();
        });
    });
});