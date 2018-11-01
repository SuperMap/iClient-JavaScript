import ol from 'openlayers';
import {SpatialAnalystService} from '../../../src/openlayers/services/SpatialAnalystService';
import {DatasetThiessenAnalystParameters} from '../../../src/common/iServer/DatasetThiessenAnalystParameters';
import {GeometryThiessenAnalystParameters} from '../../../src/common/iServer/GeometryThiessenAnalystParameters';
import {FetchRequest} from "@supermap/iclient-common";

var originalTimeout, serviceResults;
var changchunServiceUrl = GlobeParameter.spatialAnalystURL_Changchun;
describe('openlayers_SpatialAnalystService_thiessenAnalysis', () => {
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResults = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //数据集泰森多边形
    it('thiessenAnalysis_datasets', (done) => {
        var dThiessenAnalystParameters = new DatasetThiessenAnalystParameters({
            dataset: "Factory@Changchun"
        });
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/datasets/Factory@Changchun/thiessenpolygon.json?returnContent=true");
            var expectParams = `{'clipRegion':null,'createResultDataset':false,'resultDatasetName':null,'resultDatasourceName':null,'returnResultRegion':true,'dataset':"Factory@Changchun",'filterQueryParameter':null}`;
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(JSON.stringify(thiessenAnalysisEscapedJson)));
        });
        spatialAnalystService.thiessenAnalysis(dThiessenAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            done();
        }, 8000);
    });

    //几何泰森多边形
    it('thiessenAnalysis_geometry', (done) => {
        //创建几何泰森多边形参数
        var pointsList = [
            new ol.geom.Point([5238.998556, -1724.229865]),
            new ol.geom.Point([4996.270055, -2118.538477]),
            new ol.geom.Point([5450.34263, -2070.794081]),
            new ol.geom.Point([5317.70775, -2521.162355]),
            new ol.geom.Point([5741.149405, -1970.130198]),
            new ol.geom.Point([4716.133098, -1575.858795]),
            new ol.geom.Point([5447.671615, -2255.928819]),
            new ol.geom.Point([4783.423507, -1135.598744]),
            new ol.geom.Point([5472.712382, -2189.15344]),
            new ol.geom.Point([5752.716961, -2425.40363])
        ];
        var gThiessenAnalystParameters = new GeometryThiessenAnalystParameters({
            points: pointsList
        });
        //创建泰森多边形服务实例
        var spatialAnalystService = new SpatialAnalystService(changchunServiceUrl);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(changchunServiceUrl + "/geometry/thiessenpolygon.json?returnContent=true");
            var expectParams = `{'clipRegion':null,'createResultDataset':false,'resultDatasetName':null,'resultDatasourceName':null,'returnResultRegion':true,'points':[{'id':"SuperMap.Geometry_3",'bounds':null,'SRID':null,'x':5238.998556,'y':-1724.229865,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_4",'bounds':null,'SRID':null,'x':4996.270055,'y':-2118.538477,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_5",'bounds':null,'SRID':null,'x':5450.34263,'y':-2070.794081,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_6",'bounds':null,'SRID':null,'x':5317.70775,'y':-2521.162355,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_7",'bounds':null,'SRID':null,'x':5741.149405,'y':-1970.130198,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_8",'bounds':null,'SRID':null,'x':4716.133098,'y':-1575.858795,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_9",'bounds':null,'SRID':null,'x':5447.671615,'y':-2255.928819,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_10",'bounds':null,'SRID':null,'x':4783.423507,'y':-1135.598744,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_11",'bounds':null,'SRID':null,'x':5472.712382,'y':-2189.15344,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_12",'bounds':null,'SRID':null,'x':5752.716961,'y':-2425.40363,'tag':null,'type':"Point"}]}`;
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var thiessenAnalysis_geometryEscapedJson = `{"regions":[{"center":{"x":5344.758425269733,"y":-1487.9920795784092},"parts":[8],"style":null,"prjCoordSys":null,"id":1,"type":"REGION","partTopo":[1],"points":[{"x":5211.138426165488,"y":-1978.9434389331516},{"x":4932.8475864843085,"y":-1807.633159872232},{"x":5048.141928382961,"y":-1401.3313863415344},{"x":5570.510456969339,"y":-997.0407202236668},{"x":5891.274984776333,"y":-997.0407202236668},{"x":5891.274984776333,"y":-1027.8910843922556},{"x":5516.842020701361,"y":-1792.5172583789085},{"x":5211.138426165488,"y":-1978.9434389331516}]},{"center":{"x":4892.705149704053,"y":-2233.6767693242828},"parts":[8],"style":null,"prjCoordSys":null,"id":2,"type":"REGION","partTopo":[1],"points":[{"x":5211.138426165488,"y":-1978.9434389331516},{"x":5230.197503560644,"y":-2160.204593644218},{"x":5189.509228305737,"y":-2293.8875778802862},{"x":4731.2772807540705,"y":-2659.7203787763333},{"x":4577.575074223667,"y":-2659.7203787763333},{"x":4577.575074223667,"y":-1991.0285656549763},{"x":4932.8475864843085,"y":-1807.633159872232},{"x":5211.138426165488,"y":-1978.9434389331516}]},{"center":{"x":5397.61730728453,"y":-1976.8393034642713},"parts":[6],"style":null,"prjCoordSys":null,"id":3,"type":"REGION","partTopo":[1],"points":[{"x":5211.138426165488,"y":-1978.9434389331516},{"x":5516.842020701361,"y":-1792.5172583789085},{"x":5623.0844148878305,"y":-2099.439732466718},{"x":5296.512581815288,"y":-2161.161348549634},{"x":5230.197503560644,"y":-2160.204593644218},{"x":5211.138426165488,"y":-1978.9434389331516}]},{"center":{"x":4776.126885626566,"y":-1660.2186890199118},"parts":[5],"style":null,"prjCoordSys":null,"id":4,"type":"REGION","partTopo":[1],"points":[{"x":5048.141928382961,"y":-1401.3313863415344},{"x":4932.8475864843085,"y":-1807.633159872232},{"x":4577.575074223667,"y":-1991.0285656549763},{"x":4577.575074223667,"y":-1329.4088123848474},{"x":5048.141928382961,"y":-1401.3313863415344}]},{"center":{"x":4943.450633449907,"y":-1199.1860532826006},"parts":[5],"style":null,"prjCoordSys":null,"id":5,"type":"REGION","partTopo":[1],"points":[{"x":5048.141928382961,"y":-1401.3313863415344},{"x":4577.575074223667,"y":-1329.4088123848474},{"x":4577.575074223667,"y":-997.0407202236668},{"x":5570.510456969339,"y":-997.0407202236668},{"x":5048.141928382961,"y":-1401.3313863415344}]},{"center":{"x":5747.92171685259,"y":-1613.3719116576058},"parts":[6],"style":null,"prjCoordSys":null,"id":6,"type":"REGION","partTopo":[1],"points":[{"x":5891.274984776333,"y":-2194.099487443053},{"x":5704.197514443446,"y":-2198.852738922956},{"x":5623.0844148878305,"y":-2099.439732466718},{"x":5516.842020701361,"y":-1792.5172583789085},{"x":5891.274984776333,"y":-1027.8910843922556},{"x":5891.274984776333,"y":-2194.099487443053}]},{"center":{"x":5248.190342916603,"y":-2476.8039783283098},"parts":[5],"style":null,"prjCoordSys":null,"id":7,"type":"REGION","partTopo":[1],"points":[{"x":5189.509228305737,"y":-2293.8875778802862},{"x":5532.744504208792,"y":-2462.0721284972283},{"x":5576.252880506611,"y":-2659.7203787763333},{"x":4731.2772807540705,"y":-2659.7203787763333},{"x":5189.509228305737,"y":-2293.8875778802862}]},{"center":{"x":5420.657109745785,"y":-2311.1383610707235},"parts":[6],"style":null,"prjCoordSys":null,"id":8,"type":"REGION","partTopo":[1],"points":[{"x":5189.509228305737,"y":-2293.8875778802862},{"x":5230.197503560644,"y":-2160.204593644218},{"x":5296.512581815288,"y":-2161.161348549634},{"x":5630.367113268588,"y":-2286.35679721966},{"x":5532.744504208792,"y":-2462.0721284972283},{"x":5189.509228305737,"y":-2293.8875778802862}]},{"center":{"x":5721.777319208567,"y":-2426.909933109693},"parts":[7],"style":null,"prjCoordSys":null,"id":9,"type":"REGION","partTopo":[1],"points":[{"x":5630.367113268588,"y":-2286.35679721966},{"x":5704.197514443446,"y":-2198.852738922956},{"x":5891.274984776333,"y":-2194.099487443053},{"x":5891.274984776333,"y":-2659.7203787763333},{"x":5576.252880506611,"y":-2659.7203787763333},{"x":5532.744504208792,"y":-2462.0721284972283},{"x":5630.367113268588,"y":-2286.35679721966}]},{"center":{"x":5540.2417483086265,"y":-2192.8982648431893},"parts":[5],"style":null,"prjCoordSys":null,"id":10,"type":"REGION","partTopo":[1],"points":[{"x":5630.367113268588,"y":-2286.35679721966},{"x":5296.512581815288,"y":-2161.161348549634},{"x":5623.0844148878305,"y":-2099.439732466718},{"x":5704.197514443446,"y":-2198.852738922956},{"x":5630.367113268588,"y":-2286.35679721966}]}],"datasetName":null,"datasourceName":null}`;
            return Promise.resolve(new Response(thiessenAnalysis_geometryEscapedJson));
        });
        spatialAnalystService.thiessenAnalysis(gThiessenAnalystParameters, (serviceResult) => {
            serviceResults = serviceResult;
        });
        setTimeout(() => {
            expect(serviceResults).not.toBeNull();
            expect(serviceResults.type).toBe('processCompleted');
            expect(serviceResults.result.dataset).not.toBeNull();
            expect(serviceResults.result.succeed).toBeTruthy();
            var regions = serviceResults.result.regions;
            expect(regions).not.toBeNull();
            expect(regions.features).not.toBeNull();
            expect(regions.features.length).toBeGreaterThan(0);
            for (var i = 0; i < regions.features.length; i++) {
                expect(regions.features[i].type).toEqual("Feature");
                expect(regions.features[i].geometry.type).toEqual("MultiPolygon");
                var coordinates = regions.features[i].geometry.coordinates;
                expect(coordinates).not.toBeNull();
                expect(coordinates[0][0].length).toBeGreaterThan(0);
                for (var j = 0; j < coordinates[0][0].length; j++) {
                    expect(coordinates[0][0][j].length).toEqual(2);
                }
            }
            expect(regions.type).toEqual("FeatureCollection");
            done();
        }, 8000);
    });
});