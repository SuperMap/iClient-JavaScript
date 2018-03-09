import {networkAnalystService} from '../../../src/leaflet/services/NetworkAnalystService';
import {BurstPipelineAnalystParameters} from '../../../src/common/iServer/BurstPipelineAnalystParameters';
import {ComputeWeightMatrixParameters} from '../../../src/common/iServer/ComputeWeightMatrixParameters';
import {FindClosestFacilitiesParameters} from '../../../src/common/iServer/FindClosestFacilitiesParameters';
import {FindLocationParameters} from '../../../src/common/iServer/FindLocationParameters';
import {FindPathParameters} from '../../../src/common/iServer/FindPathParameters';
import {FindTSPPathsParameters} from '../../../src/common/iServer/FindTSPPathsParameters';
import {FindMTSPPathsParameters} from '../../../src/common/iServer/FindMTSPPathsParameters';
import {FindServiceAreasParameters} from '../../../src/common/iServer/FindServiceAreasParameters';
import {UpdateEdgeWeightParameters} from '../../../src/common/iServer/UpdateEdgeWeightParameters';
import {UpdateTurnNodeWeightParameters} from '../../../src/common/iServer/UpdateTurnNodeWeightParameters';
import {TransportationAnalystParameter} from '../../../src/common/iServer/TransportationAnalystParameter';
import {TransportationAnalystResultSetting} from '../../../src/common/iServer/TransportationAnalystResultSetting';
import {SupplyCenter} from '../../../src/common/iServer/SupplyCenter'
import {SupplyCenterType} from '../../../src/common/REST';

var url = GlobeParameter.networkAnalystURL;
var options = {
    serverType: 'iServer'
};
describe('leaflet_NetworkAnalystService', () => {
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
        var burstPipelineAnalystParams = new BurstPipelineAnalystParameters({
            sourceNodeIDs: [84, 85],
            edgeID: 310,
            isUncertainDirectionValid: false
        });
        var service = networkAnalystService(url, options);
        service.burstPipelineAnalyst(burstPipelineAnalystParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.edges).not.toBeNull();
                expect(serviceResult.result.edges.length).toBeGreaterThan(0);
                service.destroy();
                done();
            } catch (exception) {
                console.log("'burstPipelineAnalyst'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //耗费矩阵分析服务
    it('computeWeightMatrix', (done) => {
        var computeWeightMatrixParams = new ComputeWeightMatrixParameters({
            //nodes: [2,6,9],
            isAnalyzeById: true,
            nodes: [84, 85],
        });
        var service = networkAnalystService(url, options);
        service.computeWeightMatrix(computeWeightMatrixParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.length).toEqual(2);
                expect(serviceResult.result[0].length).toEqual(2);
                expect(serviceResult.result[1].length).toEqual(2);
                service.destroy();
                done();
            } catch (exception) {
                console.log("'computeWeightMatrix'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //最近设施分析服务  isAnalyzeById 为 true,
    it('findClosestFacilities_isAnalyzeById:true', (done) => {
        var findClosetFacilitiesParameter = new FindClosestFacilitiesParameters({
            //事件点,必设参数
            event: 2,
            //要查找的设施点数量。默认值为1
            expectFacilityCount: 2,
            //设施点集合,必设
            facilities: [1, 6, 52],
            isAnalyzeById: true,
        });
        var service = networkAnalystService(url, options);
        service.findClosestFacilities(findClosetFacilitiesParameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.facilityPathList).not.toBeNull();
                expect(serviceResult.result.facilityPathList[0].facility).toEqual(1);
                expect(serviceResult.result.facilityPathList[0].weight).toEqual(125);
                service.destroy();
                done();
            } catch (exception) {
                console.log("'findClosestFacilities_isAnalyzeById:true'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //最近设施分析服务  isAnalyzeById 为 false,
    it('findClosestFacilities', (done) => {
        //创建最近设施分析参数实例
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
            turnWeightField: "TurnCost",
            weightFieldName: "length"  //length,time
        });
        var findClosetFacilitiesParameter = new FindClosestFacilitiesParameters({
            //事件点,必设参数
            event: L.latLng(-3700, 5000),
            //要查找的设施点数量。默认值为1
            expectFacilityCount: 1,
            //设施点集合,必设
            //设施点集合,必设
            facilities: [L.latLng(-3500, 2500), L.latLng(-2500, 5500), L.latLng(-4000, 7000)],
            isAnalyzeById: false,
            parameter: analystParameter
        });
        var service = networkAnalystService(url, options);
        service.findClosestFacilities(findClosetFacilitiesParameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(service.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.facilityPathList.length).toEqual(1);
                var facilityPath = serviceResult.result.facilityPathList[0];
                expect(facilityPath.edgeFeatures.type).toEqual("FeatureCollection");
                var edge_Features = facilityPath.edgeFeatures.features;
                expect(edge_Features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_Features.length; i++) {
                    expect(edge_Features[i].id).not.toBeNull();
                    expect(edge_Features[i].type).toEqual("Feature");
                    expect(edge_Features[i].properties).not.toBeNull();
                    expect(edge_Features[i].geometry.type).toEqual("LineString");
                    if (edge_Features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < edge_Features[i].geometry.coordinates.length; j++) {
                            expect(edge_Features[i].geometry.coordinates[j].length).toEqual(2);
                        }
                    }
                }
                expect(facilityPath.edgeIDs.length).toEqual(edge_Features.length);
                expect(facilityPath.facility).not.toBeNull();
                expect(facilityPath.facilityIndex).toEqual(1);
                var node_Features = facilityPath.nodeFeatures.features;
                expect(facilityPath.nodeFeatures.type).toEqual("FeatureCollection");
                expect(node_Features.length).toBeGreaterThan(0);
                for (var i = 0; i < node_Features.length; i++) {
                    expect(node_Features[i].id).not.toBeNull();
                    expect(node_Features[i].type).toEqual("Feature");
                    expect(node_Features[i].properties).not.toBeNull();
                    expect(node_Features[i].geometry.type).toEqual("Point");
                    expect(node_Features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(facilityPath.nodeIDs.length).toEqual(node_Features.length);
                expect(facilityPath.pathGuideItems.type).toEqual("FeatureCollection");
                var features = facilityPath.pathGuideItems.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                }
                expect(features[0].geometry.type).toEqual("Point");
                expect(features[0].geometry.coordinates.length).toEqual(2);
                expect(facilityPath.route.type).toEqual("Feature");
                expect(facilityPath.route.geometry.type).toEqual("MultiLineString");
                expect(facilityPath.route.geometry.coordinates[0][0].length).toEqual(3);
                expect(facilityPath.stopWeights[0]).toEqual(1862.4094746581616);
                expect(facilityPath.weight).toEqual(facilityPath.stopWeights[0]);
                service.destroy();
                done();
            } catch (exception) {
                console.log("'findClosestFacilities'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);

    });

    //选址分区分析服务
    it('findLocation', (done) => {
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER,
            supplyCenterType_NULL = SupplyCenterType.NULL,
            supplyCenterType_FIXEDCENTER = SupplyCenterType.FIXEDCENTER;
        var supplyCenters = [new SupplyCenter({
            maxWeight: 500,             // 资源供给中心的最大耗费值,必设参数
            nodeID: 139,                // 资源供给中心点的结点 ID 号,必设参数
            resourceValue: 100,         // 资源供给中心能提供的最大服务量或商品数量,必设参数
            type: supplyCenterType_OPTIONALCENTER      //选址分区中资源中心的类型包括固定中心和可选中心两种
        }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 2972,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 5523,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1161,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 4337,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 5732,
                resourceValue: 100,
                type: supplyCenterType_NULL
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 663,
                resourceValue: 100,
                type: supplyCenterType_FIXEDCENTER
            })
        ];
        var findLocationParams = new FindLocationParameters({
            // 期望用于最终设施选址的资源供给中心数量,必设字段
            expectedSupplyCenterCount: 8,
            // 是否从中心点开始分配资源。默认为 false
            isFromCenter: false,
            nodeDemandField: "Demand",
            // 转向权值字段的名称
            turnWeightField: "TurnCost",
            // 阻力字段的名称, 必设
            weightName: "length",
            // 资源供给中心集合,必设字段
            supplyCenters: supplyCenters
        });
        var service = networkAnalystService(url, options);
        service.findLocation(findLocationParams, (result) => {
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
                var demandFeatures = serviceResult.result.demandResults.features;
                var supplyFeatures = serviceResult.result.supplyResults.features;
                expect(demandFeatures.length).toBeGreaterThan(0);
                expect(supplyFeatures.length).toBeGreaterThan(0);
                for (var i = 0; i < demandFeatures.length; i++) {
                    expect(demandFeatures[i].id).not.toBeNull();
                    expect(demandFeatures[i].type).toEqual("Feature");
                    expect(demandFeatures[i].properties).not.toBeNull();
                    expect(demandFeatures[i].geometry.type).toEqual("Point");
                    expect(demandFeatures[i].geometry.coordinates.length).toEqual(2);
                }
                for (var j = 0; j < supplyFeatures.length; j++) {
                    expect(supplyFeatures[j].id).not.toBeNull();
                    expect(supplyFeatures[j].type).toEqual("Feature");
                    expect(supplyFeatures[j].properties).not.toBeNull();
                    expect(supplyFeatures[j].geometry.type).toEqual("Point");
                    expect(supplyFeatures[j].geometry.coordinates.length).toEqual(2);
                }
                service.destroy();
                done();
            } catch (e) {
                console.log("'findLocation'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
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
        var findPathParameter = new FindPathParameters({
            isAnalyzeById: false,
            nodes: [L.latLng(-3000, 4000), L.latLng(-2500, 5500), L.latLng(-4000, 6900)],
            hasLeastEdgeCount: false,
            parameter: analystParameter
        });
        var service = networkAnalystService(url, options);
        service.findPath(findPathParameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                var path = serviceResult.result.pathList[0];
                expect(path.edgeFeatures.type).toEqual("FeatureCollection");
                var edge_features = path.edgeFeatures.features;
                expect(edge_features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_features.length; i++) {
                    expect(edge_features[i].id).not.toBeNull();
                    expect(edge_features[i].type).toEqual("Feature");
                    expect(edge_features[i].properties).not.toBeNull();
                    expect(edge_features[i].geometry.type).toEqual("LineString");
                    for (var j = 0; j < edge_features[i].geometry.coordinates.length; j++) {
                        expect(edge_features[i].geometry.coordinates[j].length).toEqual(2);
                    }
                }
                expect(path.edgeIDs.length).toEqual(edge_features.length);
                expect(path.nodeFeatures.type).toEqual("FeatureCollection");
                var node_features = path.nodeFeatures.features;
                expect(node_features.length).toBeGreaterThan(0);
                for (var i = 0; i < node_features.length; i++) {
                    expect(node_features[i].id).not.toBeNull();
                    expect(node_features[i].type).toEqual("Feature");
                    expect(node_features[i].properties).not.toBeNull();
                    expect(node_features[i].geometry.type).toEqual("Point");
                    expect(node_features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(path.nodeIDs.length).toEqual(node_features.length);
                expect(path.pathGuideItems.type).toEqual("FeatureCollection");
                var features = path.pathGuideItems.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].properties).not.toBeNull();
                }
                expect(features[0].geometry.type).toEqual("Point");
                expect(features[0].geometry.coordinates.length).toEqual(2);
                expect(path.route.type).toEqual("Feature");
                expect(path.route.geometry.type).toEqual("MultiLineString");
                expect(path.stopWeights).not.toBeNull();
                expect(path.weight).toEqual(4671.658639872307);
                service.destroy();
                done();
            } catch (e) {
                console.log("'findPath'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
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
        var findTSPPathsParameter = new FindTSPPathsParameters({
            //是否指定终止点,
            endNodeAssigned: false,
            isAnalyzeById: false,
            //旅行商分析途经点数组，必设字段
            nodes: [L.latLng(-1000, 3000), L.latLng(-4850, 3760), L.latLng(-2700, 8000)],
            parameter: analystParameter
        });
        var service = networkAnalystService(url, options);
        service.findTSPPaths(findTSPPathsParameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                var tspPath = serviceResult.result.tspPathList[0];
                expect(tspPath.edgeFeatures.type).toEqual("FeatureCollection");
                var edge_features = tspPath.edgeFeatures.features;
                expect(edge_features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_features.length; i++) {
                    expect(edge_features[i].id).not.toBeNull();
                    expect(edge_features[i].type).toEqual("Feature");
                    expect(edge_features[i].properties).not.toBeNull();
                    expect(edge_features[i].geometry.type).toEqual("LineString");
                    if (edge_features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < edge_features[i].geometry.coordinates.length; j++) {
                            expect(edge_features[i].geometry.coordinates[j].length).toEqual(2)
                        }
                    }
                }
                expect(tspPath.edgeIDs.length).toEqual(edge_features.length);
                expect(tspPath.nodeFeatures.type).toEqual("FeatureCollection");
                var node_features = tspPath.nodeFeatures.features;
                expect(node_features.length).toBeGreaterThan(0);
                for (var i = 0; i < node_features.length; i++) {
                    expect(node_features[i].id).not.toBeNull();
                    expect(node_features[i].type).toEqual("Feature");
                    expect(node_features[i].properties).not.toBeNull();
                    expect(node_features[i].geometry.type).toEqual("Point");
                    expect(node_features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(tspPath.nodeIDs.length).toEqual(node_features.length);
                expect(tspPath.pathGuideItems.type).toEqual("FeatureCollection");
                expect(tspPath.pathGuideItems.features[0].type).toEqual("Feature");
                expect(tspPath.pathGuideItems.features[0].geometry.type).toEqual("Point");
                expect(tspPath.pathGuideItems.features[0].geometry.coordinates.length).toEqual(2);
                expect(tspPath.route.geometry.type).toEqual("MultiLineString");
                expect(tspPath.route.geometry.coordinates[0][0].length).toEqual(3);
                expect(tspPath.stopIndexes.length).toEqual(3);
                expect(tspPath.stopWeights).not.toBeNull();
                expect(tspPath.weight).toEqual(10287.324455311546);
                service.destroy();
                done();
            } catch (e) {
                console.log("'findTSPPaths'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000)
    });

    //多旅行商分析服务
    it('findMTSPPaths', (done) => {
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
        var findMTSPPathsParameter = new FindMTSPPathsParameters({
            centers: [L.latLng(-5500, 6000), L.latLng(-2500, 5500), L.latLng(-3500, 2500)],
            isAnalyzeById: false,
            nodes: [L.latLng(-5000, 5000), L.latLng(-2800, 8000)],
            hasLeastTotalCost: true,
            parameter: analystParameter
        });
        var service = networkAnalystService(url, options);
        service.findMTSPPaths(findMTSPPathsParameter, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.pathList.length).toEqual(2);
                var path = serviceResult.result.pathList["0"];
                expect(path.center).not.toBeNull();
                expect(path.edgeFeatures.type).toEqual("FeatureCollection");
                var edge_features = path.edgeFeatures.features;
                expect(edge_features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_features.length; i++) {
                    expect(edge_features[i].id).not.toBeNull();
                    expect(edge_features[i].type).toEqual("Feature");
                    expect(edge_features[i].properties).not.toBeNull();
                    expect(edge_features[i].geometry.type).toEqual("LineString");
                    if (edge_features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < edge_features[i].geometry.coordinates.length; j++) {
                            expect(edge_features[i].geometry.coordinates[j].length).toEqual(2);
                        }
                    }
                }
                expect(path.edgeIDs.length).toEqual(edge_features.length);
                expect(path.nodeFeatures.type).toEqual("FeatureCollection");
                var node_features = path.nodeFeatures.features;
                expect(node_features.length).toBeGreaterThan(0);
                for (var i = 0; i < node_features.length; i++) {
                    expect(node_features[i].id).not.toBeNull();
                    expect(node_features[i].type).toEqual("Feature");
                    expect(node_features[i].properties).not.toBeNull();
                    expect(node_features[i].geometry.type).toEqual("Point");
                    expect(node_features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(path.nodeIDs.length).toEqual(node_features.length);
                expect(path.pathGuideItems.type).toEqual("FeatureCollection");
                var features = path.pathGuideItems.features;
                expect(features.length).toBeGreaterThan(0);
                expect(features[0].type).toEqual("Feature");
                expect(features[0].geometry.type).toEqual("Point");
                expect(features[0].geometry.coordinates.length).toEqual(2);
                expect(path.route.type).toEqual("Feature");
                expect(path.route.geometry.type).toEqual("MultiLineString");
                expect(path.route.geometry.coordinates[0][0].length).toEqual(3);
                expect(path.stopWeights).not.toBeNull();
                expect(path.weight).not.toBeNull();
                service.destroy();
                done();
            } catch (e) {
                console.log("'findMTSPPaths'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //服务区分析服务
    it('findServiceAreas', (done) => {
        var marker = L.marker([-3375, 5605]);
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
        var findServiceAreasParams = new FindServiceAreasParameters({
            centers: [marker.getLatLng()],
            isAnalyzeById: false,
            parameter: analystParameter
        });
        findServiceAreasParams.weights = [400 + Math.random() * 100];
        var service = networkAnalystService(url, options);
        service.findServiceAreas(findServiceAreasParams, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                var serviceArea = serviceResult.result.serviceAreaList[0];
                expect(serviceArea.edgeFeatures.type).toEqual("FeatureCollection");
                var edge_features = serviceArea.edgeFeatures.features;
                expect(edge_features.length).toBeGreaterThan(0);
                for (var i = 0; i < edge_features.length; i++) {
                    expect(edge_features[i].id).not.toBeNull();
                    expect(edge_features[i].type).toEqual("Feature");
                    expect(edge_features[i].properties).not.toBeNull();
                    expect(edge_features[i].geometry.type).toEqual("LineString");
                    if (edge_features[i].geometry.coordinates.length > 2) {
                        for (var j = 0; j < edge_features[i].geometry.coordinates.length; j++) {
                            expect(edge_features[i].geometry.coordinates[j].length).toEqual(2);
                        }
                    }
                }
                expect(serviceArea.edgeIDs.length).toEqual(edge_features.length);
                expect(serviceArea.nodeFeatures.type).toEqual("FeatureCollection");
                var node_features = serviceArea.nodeFeatures.features;
                expect(node_features.length).toBeGreaterThan(0);
                for (var i = 0; i < node_features.length; i++) {
                    expect(node_features[i].id).not.toBeNull();
                    expect(node_features[i].type).toEqual("Feature");
                    expect(node_features[i].properties).not.toBeNull();
                    expect(node_features[i].geometry.type).toEqual("Point");
                    expect(node_features[i].geometry.coordinates.length).toEqual(2);
                }
                expect(serviceArea.nodeIDs.length).toEqual(node_features.length);
                expect(serviceArea.routes.type).toEqual("FeatureCollection");
                var features = serviceArea.routes.features;
                expect(features.length).toBeGreaterThan(0);
                for (var i = 0; i < features.length; i++) {
                    expect(features[i].type).toEqual("Feature");
                    expect(features[i].geometry.type).toEqual("MultiLineString");
                    expect(features[i].geometry.coordinates.length).toBeGreaterThan(0);
                }
                expect(serviceArea.serviceRegion.type).toEqual("Feature");
                expect(serviceArea.serviceRegion.geometry.type).toEqual("MultiPolygon");
                expect(serviceArea.serviceRegion.geometry.coordinates[0][0].length).toBeGreaterThan(0);
                for (var i = 0; i < serviceArea.serviceRegion.geometry.coordinates[0][0].length; i++) {
                    expect(serviceArea.serviceRegion.geometry.coordinates[0][0][i].length).toEqual(2);
                }
                service.destroy();
                done();
            } catch (e) {
                console.log("'findServiceAreas'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000);
    });

    //更新边的耗费权重服务
    it('updateEdgeWeight', (done) => {
        var updateEdgeWeightParams = new UpdateEdgeWeightParameters({
            edgeId: "20",
            edgeWeight: "30",
            fromNodeId: "26",
            toNodeId: "109",
            weightField: "time"
        });
        var service = networkAnalystService(url, options);
        service.updateEdgeWeight(updateEdgeWeightParams, (result) => {
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
        var service = networkAnalystService(url, options);
        service.updateTurnNodeWeight(parameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                service.destroy();
                done();
            } catch (e) {
                console.log("'updateTurnNodeWeight'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                service.destroy();
                done();
            }
        }, 5000)
    })
});
