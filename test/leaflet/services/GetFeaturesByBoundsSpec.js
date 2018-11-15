import {featureService} from '../../../src/leaflet/services/FeatureService';
import {GetFeaturesByBoundsParameters} from '../../../src/common/iServer/GetFeaturesByBoundsParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var options = {
    serverType: 'iServer'
};

describe('leaflet_FeatureService_getFeaturesByBounds', () => {
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

    it('successEvent:getFeaturesByBounds_returnContent=true', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getBounds(),
            returnContent: true
        });
        var getFeaturesByBoundsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            expect(params).toContain("'datasetNames':[\"World:Capitals\"]");
            expect(options).not.toBeNull();
            var result=`{"features":[{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":39.253347298189766,"y":-6.817356064000194},"parts":[1],"style":null,"prjCoordSys":null,"id":49,"type":"POINT","partTopo":null,"points":[{"x":39.253347298189766,"y":-6.817356064000194}]},"fieldValues":["49","39.253347298189766","-6.817356064000194","1","0","16","0","2698652.0","Dodoma","达累斯萨拉姆","坦桑尼亚","Dar es Salaam","Tanzania","坦桑尼亚","2698652.0","达累斯萨拉姆"],"ID":49},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":31.020003395825285,"y":-17.829999013060934},"parts":[1],"style":null,"prjCoordSys":null,"id":174,"type":"POINT","partTopo":null,"points":[{"x":31.020003395825285,"y":-17.829999013060934}]},"fieldValues":["174","31.020003395825285","-17.829999013060934","1","0","16","0","1542813.0","Harare","哈拉雷","津巴布韦","Harare","Zimbabwe","津巴布韦","1542813.0","哈拉雷"],"ID":174},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":28.170000297413026,"y":-15.429995959678699},"parts":[1],"style":null,"prjCoordSys":null,"id":179,"type":"POINT","partTopo":null,"points":[{"x":28.170000297413026,"y":-15.429995959678699}]},"fieldValues":["179","28.170000297413026","-15.429995959678699","1","0","16","0","1267440.0","Lusaka","卢萨卡","赞比亚","Lusaka","Zambia","赞比亚","1267440.0","卢萨卡"],"ID":179},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":29.35600232025743,"y":-3.3720029963673355},"parts":[1],"style":null,"prjCoordSys":null,"id":180,"type":"POINT","partTopo":null,"points":[{"x":29.35600232025743,"y":-3.3720029963673355}]},"fieldValues":["180","29.35600232025743","-3.3720029963673355","1","0","16","0","331700.0","Bujumbura","布琼布拉","布隆迪","Bujumbura","Burundi","布隆迪","331700.0","布琼布拉"],"ID":180},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":30.059001395495898,"y":-1.9500030725109454},"parts":[1],"style":null,"prjCoordSys":null,"id":181,"type":"POINT","partTopo":null,"points":[{"x":30.059001395495898,"y":-1.9500030725109454}]},"fieldValues":["181","30.059001395495898","-1.9500030725109454","1","0","16","0","745261.0","Kigali","基加利","卢旺达","Kigali","Rwanda","卢旺达","745261.0","基加利"],"ID":181},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":36.803997348645254,"y":-1.269998944599834},"parts":[1],"style":null,"prjCoordSys":null,"id":182,"type":"POINT","partTopo":null,"points":[{"x":36.803997348645254,"y":-1.269998944599834}]},"fieldValues":["182","36.803997348645254","-1.269998944599834","1","0","16","0","2750547.0","Nairobi","内罗毕","肯尼亚","Nairobi","Kenya","肯尼亚","2750547.0","内罗毕"],"ID":182},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":33.774003300725525,"y":-13.983003038795545},"parts":[1],"style":null,"prjCoordSys":null,"id":183,"type":"POINT","partTopo":null,"points":[{"x":33.774003300725525,"y":-13.983003038795545}]},"fieldValues":["183","33.774003300725525","-13.983003038795545","1","0","16","0","646750.0","Lilongwe","利隆圭","马拉维","Lilongwe","Malawi","马拉维","646750.0","利隆圭"],"ID":183}],"featureUriList":[],"totalCount":7,"featureCount":7}`;
            return Promise.resolve(new Response(result));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.featureCount).toEqual(7);
                expect(serviceResult.result.totalCount).toEqual(7);
                expect(serviceResult.result.features.type).toBe("FeatureCollection");
                expect(serviceResult.result.features.features.length).toEqual(7);
                for (var i = 0; i < serviceResult.result.features.features.length; i++) {
                    expect(serviceResult.result.features.features[i].type).toBe("Feature");
                    expect(serviceResult.result.features.features[i].geometry.type).toBe("Point");
                    expect(serviceResult.result.features.features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceResult.result.features.features[0].properties).toEqual(Object({
                    CAPITAL: "达累斯萨拉姆",
                    CAPITAL_CH: "达累斯萨拉姆",
                    CAPITAL_EN: "Dar es Salaam",
                    CAPITAL_LO: "Dodoma",
                    CAP_POP: "2698652.0",
                    COUNTRY: "坦桑尼亚",
                    COUNTRY_CH: "坦桑尼亚",
                    COUNTRY_EN: "Tanzania",
                    ID: 49,
                    POP: "2698652.0",
                    SMGEOMETRYSIZE: "16",
                    SMID: "49",
                    SMLIBTILEID: "1",
                    SMUSERID: "0",
                    SMX: "39.253347298189766",
                    SMY: "-6.817356064000194",
                    USERID: "0"
                }));
                getFeaturesByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'successEvent:returnContent=true'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000)
    });

    it('successEvent:getFeaturesByBounds_returnContent=false', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World:Capitals"],
            bounds: polygon.getBounds(),
            returnContent: false
        });
        var getFeaturesByBoundsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?");
            expect(params).toContain("'datasetNames':[\"World:Capitals\"]");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"postResultType":"CreateChild","newResourceID":"c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d","succeed":true,"newResourceLocation":"http://localhost:8090/iserver/services/data-world/rest/data/featureResults/c01d29d8d41743adb673cd1cecda6ed0_7ceca76cc8b34309a640d38555902d5d.json"}`));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.result).not.toBeNull();
                expect(serviceResult.result.succeed).toBeTruthy();
                expect(serviceResult.result.postResultType).toBe("CreateChild");
                expect(serviceResult.result.newResourceLocation.length).toBeGreaterThan(0);
                expect(serviceResult.result.newResourceID.length).toBeGreaterThan(0);
                getFeaturesByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'successEvent:returnContent=false'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });

    it('failEvent:getFeaturesByBounds_datasetNotExist', (done) => {
        var polygon = L.polygon([[-20, 20], [0, 20], [0, 40], [-20, 40], [-20, 20]]);
        var getFeaturesByBoundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World1:Capitals"],
            bounds: polygon.getBounds()
        });
        var getFeaturesByBoundsService = featureService(dataServiceURL, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(dataServiceURL + "/featureResults.json?returnContent=true&fromIndex=0&toIndex=19");
            expect(params).toContain("'datasetNames':[\"World1:Capitals\"");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据源World1不存在，获取相应的数据服务组件失败"}}`));
        });
        getFeaturesByBoundsService.getFeaturesByBounds(getFeaturesByBoundsParams, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(getFeaturesByBoundsService).not.toBeNull();
                expect(getFeaturesByBoundsService.options.serverType).toBe("iServer");
                expect(serviceResult.type).toBe("processFailed");
                expect(serviceResult.object.isInTheSameDomain).toBeFalsy();
                expect(serviceResult.error).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).toBe("数据源World1不存在，获取相应的数据服务组件失败");
                getFeaturesByBoundsService.destroy();
                done();
            } catch (exception) {
                console.log("leafletGetFeaturesByBoundsService_'failEvent:datasetNotExist'案例失败：" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);
    });
});

