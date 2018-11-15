import {queryService} from '../../../src/leaflet/services/QueryService';
import {QueryByBoundsParameters} from '../../../src/common/iServer/QueryByBoundsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var worldMapURL = GlobeParameter.mapServiceURL + "World Map";
var options = {
    serverType: 'iServer'
};

describe('leaflet_QueryService_queryByBounds', ()=> {
    var serviceResult;
    var originalTimeout;
    beforeEach(()=> {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(()=> {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('successEvent:queryByBounds_returnContent=true', (done)=> {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var queryByBoundsParams = new QueryByBoundsParameters({
            queryParams: {name: "Capitals@World"},
            bounds: polygon.getBounds()
        });
        var queryByBoundsService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'queryMode':'BoundsQuery'");
            expect(params).toContain("'bounds': {'rightTop':{'y':39,'x':60},'leftBottom':{'y':0,'x':0}}");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(queryByBoundsEscapeJson)));
        });
        queryByBoundsService.queryByBounds(queryByBoundsParams, (result)=> {
            serviceResult = result;
        });
        setTimeout(()=> {
            try {
                expect(queryByBoundsService).not.toBeNull();
                expect(queryByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.customResponse).toBeNull();
                expect(serviceResult.result.currentCount).toBeGreaterThan(0);
                expect(serviceResult.result.totalCount).toEqual(serviceResult.result.currentCount);
                expect(serviceResult.result.recordsets.length).toBeGreaterThan(0);
                expect(serviceResult.result.recordsets[0].datasetName).toBe("Capitals@World");
                expect(serviceResult.result.recordsets[0].fieldCaptions.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].fieldTypes.length).toEqual(16);
                expect(serviceResult.result.recordsets[0].features.type).toBe("FeatureCollection");
                expect(serviceResult.result.recordsets[0].features.features.length).toEqual(serviceResult.result.totalCount);
                for (var i = 0; i < serviceResult.result.recordsets[0].features.features.length; i++) {
                    expect(serviceResult.result.recordsets[0].features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.recordsets[0].features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.recordsets[0].features.features[0].properties).toEqual(Object({
                    CAPITAL: "圣多美",
                    CAPITAL_CH: "圣多美",
                    CAPITAL_EN: "Sao Tome",
                    CAPITAL_LO: "São Tomé",
                    CAP_POP: "53300.0",
                    COUNTRY: "圣多美和普林西比",
                    COUNTRY_CH: "圣多美和普林西比",
                    COUNTRY_EN: "Sao Tome & Principe",
                    ID: 19,
                    POP: "53300.0",
                    SmGeometrySize: "16",
                    SmID: "19",
                    SmLibTileID: "1",
                    SmUserID: "0",
                    SmX: "6.728004415891377",
                    SmY: "0.33699598913014484",
                    USERID: "0"
                }));
                queryByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByBounds_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:queryByBounds_customsResult=true', (done)=> {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var queryByBoundsParams = new QueryByBoundsParameters({
            queryParams: {name: "Capitals@World"},
            bounds: polygon.getBounds(),
            customParams: null,
            expectCount: 100,
            returnContent: false
        });
        queryByBoundsParams.startRecord = 0;
        queryByBoundsParams.holdTime = 10;
        queryByBoundsParams.returnCustomResult = true;
        var queryByBoundsService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnCustomResult=true");
            expect(params).not.toBeNull();
            expect(params).toContain("'queryMode':'BoundsQuery'");
            expect(params).toContain("'expectCount':100");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_74e108f826bb45e2be52a31c6d448486","succeed":true,"customResult":{"top":37.95041694606847,"left":1.2015454003744992,"bottom":0.32300103608403674,"leftBottom":{"x":1.2015454003744992,"y":0.32300103608403674},"right":58.588002445423115,"rightTop":{"x":58.588002445423115,"y":37.95041694606847}},"newResourceLocation":"http://localhost:8090/iserver/services/map-world/rest/maps/World Map/queryResults/c01d29d8d41743adb673cd1cecda6ed0_74e108f826bb45e2be52a31c6d448486.json"}`));
        });
        queryByBoundsService.queryByBounds(queryByBoundsParams, (result)=> {
            serviceResult = result;
        });
        setTimeout(()=> {
            try {
                expect(queryByBoundsService).not.toBeNull();
                expect(queryByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                expect(serviceResult.result.customResult).not.toBeNull();
                queryByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leaflet_queryByBounds_'successEvent:customsResult=true'案例失败：" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });


    it('failEvent:queryByBounds_layerNotExist', (done)=> {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var queryByBoundsParams = new QueryByBoundsParameters({
            queryParams: {name: "Capitals@World1"},
            bounds: polygon.getBounds()
        });
        var queryByBoundsService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"查询目标图层不存在。(Capitals@World1)"}}`));
        });
        queryByBoundsService.queryByBounds(queryByBoundsParams, (result)=> {
            serviceResult = result;
        });
        setTimeout(()=> {
            try {
                expect(queryByBoundsService).not.toBeNull();
                expect(queryByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("查询目标图层不存在。(Capitals@World1)");
                queryByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("failEvent:queryByBounds_layerNotExist'案例失败：" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });


    it('failEvent:queryByBounds_queryParamsNull', (done)=> {
        var polygon = L.polygon([[0, 0], [39, 0], [39, 60], [0, 60], [0, 0]]);
        var queryByBoundsParams = new QueryByBoundsParameters({
            queryParams: null,
            bounds: polygon.getBounds()
        });
        var queryByBoundsService = queryService(worldMapURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(worldMapURL + "/queryResults.json?returnContent=true");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数queryParameterSet.queryParams非法，不能为空。"}}`));
        });
        queryByBoundsService.queryByBounds(queryByBoundsParams, (result)=> {
            serviceResult = result;
        });
        setTimeout(()=> {
            try {
                expect(queryByBoundsService).not.toBeNull();
                expect(queryByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("参数queryParameterSet.queryParams非法，不能为空。");
                queryByBoundsService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("queryByBounds_queryParamsNull'案例失败：" + exception.name + ":" + exception.message);
                queryByBoundsService.destroy();
                done();
            }
        }, 2000);
    })
});

