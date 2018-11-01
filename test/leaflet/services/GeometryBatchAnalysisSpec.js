import {spatialAnalystService} from '../../../src/leaflet/services/SpatialAnalystService';
import {GeometryBufferAnalystParameters} from '../../../src/common/iServer/GeometryBufferAnalystParameters';
import {GeometryOverlayAnalystParameters} from '../../../src/common/iServer/GeometryOverlayAnalystParameters';
import {BufferSetting} from '../../../src/common/iServer/BufferSetting';
import {BufferDistance} from '../../../src/common/iServer/BufferDistance';
import {BufferEndType} from '../../../src/common/REST';
import {OverlayOperationType} from '../../../src/common/REST';
import {FetchRequest} from "@supermap/iclient-common";

var serviceUrl = GlobeParameter.spatialAnalystURL;
describe('leaflet_SpatialAnalystService_geometryBatchAnalysis', () => {
    var originalTimeout;
    var serviceResult;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //空间关系分析
    it('geometryBatchAnalysis', (done) => {
        //缓冲区分析参数
        var bufferLine = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [[117, 40.50], [118, 40]]
            }
        };
        var geoBufferAnalystParams = {
            analystName: "buffer",
            param: new GeometryBufferAnalystParameters({
                sourceGeometry: bufferLine,
                sourceGeometrySRID: 4326,
                bufferSetting: new BufferSetting({
                    endType: BufferEndType.ROUND,
                    leftDistance: new BufferDistance({value: 0.05}),
                    rightDistance: new BufferDistance({value: 0.05}),
                    semicircleLineSegment: 10
                })
            })
        };

        //叠加分析参数
        var sourceGeometry = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[116, 39.75],
                    [116, 39.15],
                    [117, 39.15],
                    [117, 39.85],
                    [116, 39.85]]]
            }
        };
        var operateGeometry = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[116.25, 40.5],
                    [116.25, 38.5],
                    [116.75, 38.5],
                    [116.75, 40.5],
                    [116.25, 40.5]]]
            }
        };
        var OverlayBatchAnalystParameters = {
            analystName: "overlay",
            param: new GeometryOverlayAnalystParameters({
                sourceGeometry: sourceGeometry,
                operateGeometry: operateGeometry,
                operation: OverlayOperationType.CLIP
            })
        };

        //批量分析参数
        var paramter = [geoBufferAnalystParams, OverlayBatchAnalystParameters];
        //批量分析
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(serviceUrl + "/geometry/batchanalyst.json?returnContent=true&ignoreAnalystParam=true");
            //var expectParams = `[{'analystName':"buffer",'param':{'analystParameter':{'endType':"ROUND",'leftDistance':{'exp':null,'value':0.05},'rightDistance':{'exp':null,'value':0.05},'semicircleLineSegment':10,'radiusUnit':"METER"},'sourceGeometry':{'id':0,'style':null,'parts':[2],'points':[{'id':"SuperMap.Geometry_25",'bounds':null,'SRID':null,'x':117,'y':40.5,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_26",'bounds':null,'SRID':null,'x':118,'y':40,'tag':null,'type':"Point"}],'type':"LINE",'prjCoordSys':{'epsgCode':4326}},'sourceGeometrySRID':4326}},{'analystName':"overlay",'param':{'operation':"CLIP",'sourceGeometry':{'id':0,'style':null,'parts':[6],'points':[{'id':"SuperMap.Geometry_27",'bounds':null,'SRID':null,'x':116,'y':39.75,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_28",'bounds':null,'SRID':null,'x':116,'y':39.15,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_29",'bounds':null,'SRID':null,'x':117,'y':39.15,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_30",'bounds':null,'SRID':null,'x':117,'y':39.85,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_31",'bounds':null,'SRID':null,'x':116,'y':39.85,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_32",'bounds':null,'SRID':null,'x':116,'y':39.75,'tag':null,'type':"Point"}],'type':"REGION",'prjCoordSys':{'epsgCode':null}},'operateGeometry':{'id':0,'style':null,'parts':[5],'points':[{'id':"SuperMap.Geometry_33",'bounds':null,'SRID':null,'x':116.25,'y':40.5,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_34",'bounds':null,'SRID':null,'x':116.25,'y':38.5,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_35",'bounds':null,'SRID':null,'x':116.75,'y':38.5,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_36",'bounds':null,'SRID':null,'x':116.75,'y':40.5,'tag':null,'type':"Point"},{'id':"SuperMap.Geometry_37",'bounds':null,'SRID':null,'x':116.25,'y':40.5,'tag':null,'type':"Point"}],'type':"REGION",'prjCoordSys':{'epsgCode':null}}}}]`;
            //expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var geometryBatchAnalystEscapedJson = `[{"image":null,"resultGeometry":{"center":{"x":117.50000000003955,"y":40.25000002045569},"parts":[23],"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":[1],"points":[{"x":118.00000032273458,"y":40.000000396177164},{"x":118.0000004639434,"y":40.00000029515889},{"x":118.00000055482083,"y":40.000000164338125},{"x":118.00000058550799,"y":40.00000001790711},{"x":118.00000056027227,"y":39.999999889643746},{"x":118.0000004885416,"y":39.99999977223523},{"x":118.0000003571933,"y":39.99999966363337},{"x":118.00000018709451,"y":39.9999995937407},{"x":117.99999999669859,"y":39.99999957013961},{"x":117.99999982992506,"y":39.999999589548075},{"x":117.99999967726544,"y":39.999999644715196},{"x":116.99999968045223,"y":40.49999964203086},{"x":116.9999995367174,"y":40.49999974180941},{"x":116.99999944324225,"y":40.49999987182243},{"x":116.9999994101675,"y":40.50000001796533},{"x":116.99999943369343,"y":40.50000014642827},{"x":116.99999950421508,"y":40.500000264441226},{"x":116.999999634921,"y":40.50000037416583},{"x":116.99999980523283,"y":40.50000044552309},{"x":116.9999999966742,"y":40.50000047077176},{"x":117.0000001649555,"y":40.50000045281249},{"x":117.00000031954775,"y":40.50000039897753},{"x":118.00000032273458,"y":40.000000396177164}]},"succeed":true,"message":null},{"image":null,"resultGeometry":{"center":{"x":116.5,"y":39.5},"parts":[5],"style":null,"prjCoordSys":null,"id":0,"type":"REGION","partTopo":[1],"points":[{"x":116.25,"y":39.85},{"x":116.75,"y":39.85},{"x":116.75,"y":39.15},{"x":116.25,"y":39.15},{"x":116.25,"y":39.85}]},"succeed":true,"message":null}]`;
            return Promise.resolve(new Response(geometryBatchAnalystEscapedJson));
        });
        spatialAnalystService(serviceUrl).geometrybatchAnalysis(paramter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.type).toBe("processCompleted");
            expect(serviceResult.result.succeed).toEqual(true);
            expect(serviceResult.result.length).toEqual(2);
            for (var i = 0; i < serviceResult.result.length; i++) {
                expect(serviceResult.result[i].resultGeometry).not.toBeNull();
                expect(serviceResult.result[i].resultGeometry.geometry).not.toBeNull();
                expect(serviceResult.result[i].resultGeometry.geometry.coordinates.length).toBeGreaterThan(0);
                expect(serviceResult.result[i].resultGeometry.geometry.type).toBe("MultiPolygon");
                expect(serviceResult.result[i].resultGeometry.type).toBe("Feature");
                expect(serviceResult.result[i].succeed).toBeTruthy();
            }
            done();
        }, 3000)
    });
});