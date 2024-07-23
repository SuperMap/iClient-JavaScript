import { FindLocationService } from '../../../src/common/iServer/FindLocationService';
import { FindLocationParameters } from '../../../src/common/iServer/FindLocationParameters';
import { SupplyCenter } from '../../../src/common/iServer/SupplyCenter'
import { SupplyCenterType } from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.networkAnalystURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindLocationService_RegisterListener = () => {
    return new FindLocationService(url);
};



describe('FindLocationService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('processAsync:default', (done) => {
        var expectedSupplyCenterCount = 1,
            turnWeightField = "TurnCost",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: false,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        var findLocationServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
            try {
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.demandResults).not.toBeNull();
                expect(analystResult.demandResults.type).toEqual("FeatureCollection");
                expect(analystResult.demandResults.features).not.toBeNull();
                expect(analystResult.demandResults.features[0].type).toEqual("Feature");
                expect(analystResult.demandResults.features[0].geometry).not.toBeNull();
                expect(analystResult.demandResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.demandResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.demandResults.features[0].properties.actualResourceValue).toEqual(161);
                expect(analystResult.demandResults.features[0].properties.demandID).toEqual(124);
                expect(analystResult.demandResults.features[0].properties.isEdge).toBeFalsy();
                expect(analystResult.demandResults.features[0].properties.supplyCenter.nodeID).toEqual(139);
                expect(analystResult.supplyResults).not.toBeNull();
                expect(analystResult.supplyResults.type).toEqual("FeatureCollection");
                expect(analystResult.supplyResults.features).not.toBeNull();
                expect(analystResult.supplyResults.features[0].type).toEqual("Feature");
                expect(analystResult.supplyResults.features[0].geometry).not.toBeNull();
                expect(analystResult.supplyResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.supplyResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.supplyResults.features[0].properties.actualResourceValue).toEqual(0);
                expect(analystResult.supplyResults.features[0].properties.averageWeight).toEqual(79.5);
                expect(analystResult.supplyResults.features[0].properties.demandCount).toEqual(6);
                expect(analystResult.supplyResults.features[0].properties.maxWeight).toEqual(500);
                expect(analystResult.supplyResults.features[0].properties.nodeID).toEqual(139);
                expect(analystResult.supplyResults.features[0].properties.totalWeights).toEqual(477);
                expect(analystResult.supplyResults.features[0].properties.type).toEqual("OPTIONALCENTER");
                findLocationService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findLocationService = initFindLocationService_RegisterListener();


        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify(findLocationResultJson)));
        });
        findLocationService.processAsync(parameter, findLocationServiceCompleted);
    });

    //isFromCenter为true的情况
    it('processAsync_isFromCenter:true', (done) => {
        var expectedSupplyCenterCount = 1;
        // var nodeDemandField = "Demand";
        var turnWeightField = "TurnCost";
        var weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            })];
        var parameter = new FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: true,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });

        var findLocationServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result;
                expect(analystResult.demandResults).not.toBeNull();
                expect(analystResult.demandResults.type).toEqual("FeatureCollection");
                expect(analystResult.demandResults.features).not.toBeNull();
                expect(analystResult.demandResults.features[0].type).toEqual("Feature");
                expect(analystResult.demandResults.features[0].geometry).not.toBeNull();
                expect(analystResult.demandResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.demandResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.demandResults.features[0].properties.actualResourceValue).toEqual(161);
                expect(analystResult.demandResults.features[0].properties.demandID).toEqual(124);
                expect(analystResult.demandResults.features[0].properties.isEdge).toBeFalsy();
                expect(analystResult.demandResults.features[0].properties.supplyCenter.nodeID).toEqual(139);
                expect(analystResult.supplyResults).not.toBeNull();
                expect(analystResult.supplyResults.type).toEqual("FeatureCollection");
                expect(analystResult.supplyResults.features).not.toBeNull();
                expect(analystResult.supplyResults.features[0].type).toEqual("Feature");
                expect(analystResult.supplyResults.features[0].geometry).not.toBeNull();
                expect(analystResult.supplyResults.features[0].geometry.type).toEqual("Point");
                expect(analystResult.supplyResults.features[0].geometry.coordinates.length).toEqual(2);
                expect(analystResult.supplyResults.features[0].properties.actualResourceValue).toEqual(0);
                expect(analystResult.supplyResults.features[0].properties.averageWeight).toEqual(79.5);
                expect(analystResult.supplyResults.features[0].properties.demandCount).toEqual(6);
                expect(analystResult.supplyResults.features[0].properties.maxWeight).toEqual(500);
                expect(analystResult.supplyResults.features[0].properties.nodeID).toEqual(139);
                expect(analystResult.supplyResults.features[0].properties.totalWeights).toEqual(477);
                expect(analystResult.supplyResults.features[0].properties.type).toEqual("OPTIONALCENTER");
                findLocationService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findLocationService = initFindLocationService_RegisterListener();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.resolve(new Response(JSON.stringify(findLocationResultJson)));
        });
        findLocationService.processAsync(parameter, findLocationServiceCompleted);
    });

    it('processAsync_isFromCenter:true promise', (done) => {
      var expectedSupplyCenterCount = 1;
      // var nodeDemandField = "Demand";
      var turnWeightField = "TurnCost";
      var weightName = "length";
      var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
      var supplyCenters = [
          new SupplyCenter({
              maxWeight: 500,
              nodeID: 139,
              resourceValue: 100,
              type: supplyCenterType_OPTIONALCENTER
          }),
          new SupplyCenter({
              maxWeight: 500,
              nodeID: 1358,
              resourceValue: 100,
              type: supplyCenterType_OPTIONALCENTER

          })];
      var parameter = new FindLocationParameters({
          expectedSupplyCenterCount: expectedSupplyCenterCount,
          isFromCenter: true,
          supplyCenters: supplyCenters,
          turnWeightField: turnWeightField,
          weightName: weightName
      });

      var findLocationServiceCompleted = (serviceSucceedEventArgsSystem) => {
          try {
              var analystResult = serviceSucceedEventArgsSystem.result;
              expect(analystResult.demandResults).not.toBeNull();
              expect(analystResult.demandResults.type).toEqual("FeatureCollection");
              expect(analystResult.demandResults.features).not.toBeNull();
              expect(analystResult.demandResults.features[0].type).toEqual("Feature");
              expect(analystResult.demandResults.features[0].geometry).not.toBeNull();
              expect(analystResult.demandResults.features[0].geometry.type).toEqual("Point");
              expect(analystResult.demandResults.features[0].geometry.coordinates.length).toEqual(2);
              expect(analystResult.demandResults.features[0].properties.actualResourceValue).toEqual(161);
              expect(analystResult.demandResults.features[0].properties.demandID).toEqual(124);
              expect(analystResult.demandResults.features[0].properties.isEdge).toBeFalsy();
              expect(analystResult.demandResults.features[0].properties.supplyCenter.nodeID).toEqual(139);
              expect(analystResult.supplyResults).not.toBeNull();
              expect(analystResult.supplyResults.type).toEqual("FeatureCollection");
              expect(analystResult.supplyResults.features).not.toBeNull();
              expect(analystResult.supplyResults.features[0].type).toEqual("Feature");
              expect(analystResult.supplyResults.features[0].geometry).not.toBeNull();
              expect(analystResult.supplyResults.features[0].geometry.type).toEqual("Point");
              expect(analystResult.supplyResults.features[0].geometry.coordinates.length).toEqual(2);
              expect(analystResult.supplyResults.features[0].properties.actualResourceValue).toEqual(0);
              expect(analystResult.supplyResults.features[0].properties.averageWeight).toEqual(79.5);
              expect(analystResult.supplyResults.features[0].properties.demandCount).toEqual(6);
              expect(analystResult.supplyResults.features[0].properties.maxWeight).toEqual(500);
              expect(analystResult.supplyResults.features[0].properties.nodeID).toEqual(139);
              expect(analystResult.supplyResults.features[0].properties.totalWeights).toEqual(477);
              expect(analystResult.supplyResults.features[0].properties.type).toEqual("OPTIONALCENTER");
              findLocationService.destroy();
              parameter.destroy();
              done();
          } catch (exception) {
              expect(false).toBeTruthy();
              console.log("FindLocationService_" + exception.name + ":" + exception.message);
              findLocationService.destroy();
              parameter.destroy();
              done();
          }
      };

      var findLocationService = initFindLocationService_RegisterListener();
      spyOn(FetchRequest, 'get').and.callFake((url) => {
          return Promise.resolve(new Response(JSON.stringify(findLocationResultJson)));
      });
      findLocationService.processAsync(parameter).then(findLocationServiceCompleted);
  });

    //参数错误
    it('processAsync_parameterWrong', (done) => {
        var expectedSupplyCenterCount = 1,
            turnWeightField = "TurnCost1",
            weightName = "length";
        var supplyCenterType_OPTIONALCENTER = SupplyCenterType.OPTIONALCENTER;
        var supplyCenters = [
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 139,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER

            }),
            new SupplyCenter({
                maxWeight: 500,
                nodeID: 1358,
                resourceValue: 100,
                type: supplyCenterType_OPTIONALCENTER
            })];
        var parameter = new FindLocationParameters({
            expectedSupplyCenterCount: expectedSupplyCenterCount,
            isFromCenter: true,
            supplyCenters: supplyCenters,
            turnWeightField: turnWeightField,
            weightName: weightName
        });
        var findLocationServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                findLocationService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindLocationService_" + exception.name + ":" + exception.message);
                findLocationService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findLocationService = initFindLocationService_RegisterListener();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"key(UGCTransportationAnalystProvider.checkField.turnWeightList.illegal) not found in resources."}}`));
        });
        findLocationService.processAsync(parameter, findLocationServiceFailed);
    });

    //参数为空
    it('processAsync_parameterNull', () => {
        var flag = false;
        var findLocationServiceCompleted = (serviceSucceedEventArgs) => {
            flag = true;
        };
        var findLocationService = initFindLocationService_RegisterListener();
        findLocationService.processAsync(findLocationServiceCompleted);
        //不会发送任何请求，在processAsync直接return 了 so 应为false
        expect(flag).toBeFalsy;
    })
});


