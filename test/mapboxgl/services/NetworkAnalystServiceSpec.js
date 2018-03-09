import {NetworkAnalystService} from '../../../src/mapboxgl/services/NetworkAnalystService';
import {BurstPipelineAnalystParameters} from '../../../src/common/iServer/BurstPipelineAnalystParameters';
import {ComputeWeightMatrixParameters} from '../../../src/common/iServer/ComputeWeightMatrixParameters';
import {FindClosestFacilitiesParameters} from '../../../src/common/iServer/FindClosestFacilitiesParameters';
import {TransportationAnalystResultSetting} from '../../../src/common/iServer/TransportationAnalystResultSetting';
import {TransportationAnalystParameter} from '../../../src/common/iServer/TransportationAnalystParameter';
import {FindLocationParameters} from '../../../src/common/iServer/FindLocationParameters';
import {FindPathParameters} from '../../../src/common/iServer/FindPathParameters';
import {FindTSPPathsParameters} from '../../../src/common/iServer/FindTSPPathsParameters';
import {FindMTSPPathsParameters} from '../../../src/common/iServer/FindMTSPPathsParameters';
import {FindServiceAreasParameters} from '../../../src/common/iServer/FindServiceAreasParameters';
import {UpdateEdgeWeightParameters} from '../../../src/common/iServer/UpdateEdgeWeightParameters';
import {UpdateTurnNodeWeightParameters} from '../../../src/common/iServer/UpdateTurnNodeWeightParameters';
import {SupplyCenter} from '../../../src/common/iServer/SupplyCenter'
import {SupplyCenterType} from '../../../src/common/REST';
import mapboxgl from 'mapbox-gl';

var url = GlobeParameter.networkAnalystURL;
var options = {
    serverType: 'iServer'
};

describe('mapboxgl_NetworkAnalystService', () => {
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

    //爆管分析服务
    it('burstPipelineAnalyst', (done) => {
        var burstPipelineAnalystParameters = new BurstPipelineAnalystParameters({
            sourceNodeIDs: [84, 85],
            nodeID: 85,
            isUncertainDirectionValid: false
        });
        var service = new NetworkAnalystService(url, options);
        // spyOn(service,'burstPipelineAnalyst').and.callFake();
        service.burstPipelineAnalyst(burstPipelineAnalystParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.succeed).toBe(true);
                expect(result.criticalNodes[0]).toEqual(84);
                expect(result.edges.length).toEqual(12);
                done();
            } catch (exception) {
                console.log("'burstPipelineAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //耗费矩阵分析服务
    it('computeWeightMatrix', (done) => {
        var computeWeightMatrixParameters = new ComputeWeightMatrixParameters({
            //是否通过节点 ID 指定路径分析的结点，默认为 false，即通过坐标点指定。
            isAnalyzeById: true,
            nodes: [84, 85],
        });
        var service = new NetworkAnalystService(url, options);
        service.computeWeightMatrix(computeWeightMatrixParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                var result = serviceResult.result;
                expect(result.succeed).toBe(true);
                expect(result.length).toEqual(2);
                expect(result[0].length).toEqual(2);
                expect(result[1].length).toEqual(2);
                done();
            } catch (e) {
                console.log("'computeWeightMatrix'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //选址分区分析服务
    it('findLocation', (done) => {
        var findLocationParameters = new FindLocationParameters({
            //期望用于最终设施选址的资源供给中心数量，必设字段
            expectedSupplyCenterCount: 1,
            //是否从中心点开始分配资源。默认为 false
            isFromCenter: false,
            //	资源供给中心数组，其中包含了一系列资源供给中心的信息：中心结点ID、最大耗费、资源量、类型等
            supplyCenters: [{
                "nodeID": 11,
                "maxWeight": 100,
                "resourceValue": 500,
                "type": "FIXEDCENTER"
            }, {
                "nodeID": 12,
                "maxWeight": 100,
                "resourceValue": 500,
                "type": "OPTIONALCENTER"
            }],
            //转向权值字段的名称。
            turnWeightField: "TurnCost",
            //阻力字段的名称，标识了进行网络分析时所使用的阻力字段，必设字段。
            weightName: "length"
        });
        var service = new NetworkAnalystService(url, options);
        service.findLocation(findLocationParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.demandResults.type).toEqual("FeatureCollection");
                expect(serviceResult.result.supplyResults.type).toEqual("FeatureCollection");
                var demanFeatures = serviceResult.result.demandResults.features;
                expect(demanFeatures.length).toBeGreaterThan(0);
                for (var i = 0; i < demanFeatures.length; i++) {
                    expect(demanFeatures[i].id).not.toBeNull();
                    expect(demanFeatures[i].type).toEqual("Feature");
                    expect(demanFeatures[i].geometry.type).toEqual("Point");
                    expect(demanFeatures[i].geometry.coordinates.length).toEqual(2);
                    expect(demanFeatures[i].properties).not.toBeNull();
                }
                expect(serviceResult.result.supplyResults.features[0].id).not.toBeNull();
                expect(serviceResult.result.supplyResults.features[0].type).toEqual("Feature");
                expect(serviceResult.result.supplyResults.features[0].geometry.type).toEqual("Point");
                expect(serviceResult.result.supplyResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(serviceResult.result.supplyResults.features[0].properties).not.toBeNull();
                done();
            } catch (e) {
                console.log("'findLocation'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //最佳路径分析服务
    it('findPath', (done) => {
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var findPathParameters = new FindPathParameters({
            isAnalyzeById: false,
            nodes: [new mapboxgl.Point(4000, -3000), new mapboxgl.Point(5500, -2500), new mapboxgl.Point(6900, -4000)],
            hasLeastEdgeCount: false,
            parameter: analystParameter
        });
        var service = new NetworkAnalystService(url, options);
        service.findPath(findPathParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.pathList[0].edgeFeatures.type).toEqual("FeatureCollection");
                var edge_Features = serviceResult.result.pathList[0].edgeFeatures.features;
                expect(edge_Features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_Features.length; i++) {
                    expect(edge_Features[i].id).not.toBeNull();
                    expect(edge_Features[i].type).toEqual("Feature");
                    expect(edge_Features[i].geometry.type).toEqual("LineString");
                    expect(edge_Features[i].geometry.coordinates.length).toBeGreaterThan(1);
                    if (edge_Features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < edge_Features[i].geometry.coordinates.length; j++) {
                            expect(edge_Features[i].geometry.coordinates[j].length).toEqual(2);
                        }
                    }
                    expect(edge_Features[i].properties).not.toBeNull();
                }
                expect(serviceResult.result.pathList[0].edgeIDs.length).toEqual(edge_Features.length);
                expect(serviceResult.result.pathList[0].nodeFeatures.type).toEqual("FeatureCollection");
                var node_Features = serviceResult.result.pathList[0].nodeFeatures.features;
                expect(node_Features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_Features.length; i++) {
                    expect(node_Features[i].id).not.toBeNull();
                    expect(node_Features[i].type).toEqual("Feature");
                    expect(node_Features[i].geometry.type).toEqual("Point");
                    expect(node_Features[i].geometry.coordinates.length).toEqual(2);
                    expect(node_Features[i].properties).not.toBeNull();
                }
                expect(serviceResult.result.pathList[0].nodeIDs.length).toEqual(node_Features.length);
                var features = serviceResult.result.pathList["0"].pathGuideItems.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).not.toBeNull();
                    expect(features[i].geometry.coordinates.length).toBeGreaterThan(1);
                    if (features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < features[i].geometry.coordinates.length; j++) {
                            expect(features[i].geometry.coordinates[j].length).toEqual(2);
                        }
                    }
                    expect(features[i].properties).not.toBeNull();
                }
                expect(serviceResult.result.pathList[0].stopWeights).not.toBeNull();
                done();
            } catch (e) {
                console.log("'findPath'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //旅行商分析服务
    it('findTSPPaths', (done) => {
        //创建多旅行商分析参数实例
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
            returnNodeFeatures: true,
            returnNodeGeometry: true,
            returnNodeIDs: true,
            returnPathGuides: true,
            returnRoutes: true
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var findTSPPathsParameters = new FindTSPPathsParameters({
            //是否指定终止点
            endNodeAssigned: false,
            isAnalyzeById: false,
            //旅行商分析途经点数组，必设字段
            nodes: [new mapboxgl.Point(3000, -1000), new mapboxgl.Point(3760, -4850), new mapboxgl.Point(8000, -2700)],
            parameter: analystParameter
        });
        var service = new NetworkAnalystService(url, options);
        service.findTSPPaths(findTSPPathsParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                var tspPathList = serviceResult.result.tspPathList[0];
                expect(tspPathList.edgeFeatures.type).toEqual("FeatureCollection");
                var edge_Features = tspPathList.edgeFeatures.features;
                for (var i = 0; i < edge_Features.length; i++) {
                    expect(edge_Features[i].id).not.toBeNull();
                    expect(edge_Features[i].type).toEqual("Feature");
                    expect(edge_Features[i].geometry.type).toEqual("LineString");
                    expect(edge_Features[i].geometry.coordinates).not.toBeNull();
                    expect(edge_Features[i].properties).not.toBeNull();
                }
                expect(tspPathList.edgeIDs.length).toEqual(edge_Features.length);
                var node_Features = tspPathList.nodeFeatures;
                expect(tspPathList.nodeFeatures.type).toEqual("FeatureCollection");
                for (var i = 0; i < node_Features.length; i++) {
                    expect(node_Features[i].id).not.toBeNull();
                    expect(node_Features[i].type).toEqual("Feature");
                    expect(node_Features[i].geometry.type).toEqual("Point");
                    expect(node_Features[i].geometry.coordinates).not.toBeNull();
                    expect(node_Features[i].properties).not.toBeNull();
                }
                expect(tspPathList.nodeIDs.length).toBeGreaterThan(1);
                expect(tspPathList.pathGuideItems.type).toEqual("FeatureCollection");
                expect(tspPathList.pathGuideItems.features).not.toBeNull();
                expect(tspPathList.route.type).toEqual("Feature");
                expect(tspPathList.route.geometry.type).toEqual("MultiLineString");
                expect(tspPathList.route.geometry.coordinates).not.toBeNull();
                expect(tspPathList.stopIndexes.length).toEqual(3);
                expect(tspPathList.stopWeights).not.toBeNull();
                done();
            } catch (e) {
                console.log("'findTSPPaths'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    // 多旅行商分析服务
    it('findMTSPPaths', (done) => {
        var findMTSPPathsParameter = new FindMTSPPathsParameters({
            centers: [new mapboxgl.Point(6000, -5500), new mapboxgl.Point(5500, -2500), new mapboxgl.Point(2500, -3500)],
            isAnalyzeById: false,
            nodes: [new mapboxgl.Point(5000, -5000), new mapboxgl.Point(6500, -3200)],
            hasLeastTotalCost: true,
        });
        var service = new NetworkAnalystService(url, options);
        service.findMTSPPaths(findMTSPPathsParameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.pathList[0].center.x).toEqual(6000);
                expect(serviceResult.result.pathList[0].center.y).toEqual(-5500);
                expect(serviceResult.result.pathList[0].nodesVisited[0].x).toEqual(5000);
                expect(serviceResult.result.pathList[0].nodesVisited[0].y).toEqual(-5000);
                expect(serviceResult.result.pathList[0].stopWeights).not.toBeNull();
                expect(serviceResult.result.pathList[0].weight).not.toBeNull();
                done();
            } catch (e) {
                console.log("'findMTSPPaths'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //服务区分析服务
    it('findServiceAreas', (done) => {
        var point = new mapboxgl.Point(5605, -3375);
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: true,
            returnEdgeGeometry: true,
            returnEdgeIDs: true,
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "length"
        });
        var parameter = new FindServiceAreasParameters({
            centers: [point],
            isAnalyzeById: false,
            parameter: analystParameter
        });
        parameter.weights = [400 + Math.random() * 100];
        var service = new NetworkAnalystService(url, options);
        service.findServiceAreas(parameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                var serviceAreaList = serviceResult.result.serviceAreaList[0];
                expect(serviceAreaList.edgeFeatures.type).toEqual("FeatureCollection");
                var features = serviceAreaList.edgeFeatures.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].id).not.toBeNull();
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("LineString");
                    if (features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < features[i].geometry.coordinates.length; j++) {
                            expect(features[i].geometry.coordinates[j].length).toEqual(2);
                        }
                    }
                }
                expect(serviceAreaList.edgeIDs.length).toEqual(features.length);
                expect(serviceAreaList.serviceRegion).not.toBeNull();
                done();
            } catch (e) {
                console.log("'findServiceAreas'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //更新边的耗费权重服务
    it('updateEdgeWeight', (done) => {
        var updateEdgeWeightParameters = new UpdateEdgeWeightParameters({
            edgeId: "20",
            edgeWeight: "30",
            fromNodeId: "26",
            toNodeId: "109",
            weightField: "time"
        });
        var service = new NetworkAnalystService(url, options);
        service.updateEdgeWeight(updateEdgeWeightParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (e) {
                console.log("'updateEdgeWeight'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //转向耗费权重更新服务
    it('updateTurnNodeWeight', (done) => {
        var parameters = new UpdateTurnNodeWeightParameters({
            //转向结点的id
            nodeId: "106",
            //耗费权重
            turnNodeWeight: "10",
            //起始边的id
            fromEdgeId: "6508",
            //终止边的id
            toEdgeId: "6504",
            //转向结点的耗费字段
            weightField: "TurnCost"
        });
        var service = new NetworkAnalystService(url, options);
        service.updateTurnNodeWeight(parameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                done();
            } catch (e) {
                console.log("'updateTurnNodeWeight'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });
});


