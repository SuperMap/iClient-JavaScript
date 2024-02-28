﻿import { FindTSPPathsService } from '../../../src/common/iServer/FindTSPPathsService';
import { FindTSPPathsParameters } from '../../../src/common/iServer/FindTSPPathsParameters';
import { TransportationAnalystParameter } from '../../../src/common/iServer/TransportationAnalystParameter';
import { TransportationAnalystResultSetting } from '../../../src/common/iServer/TransportationAnalystResultSetting';
import { Point } from '../../../src/common/commontypes/geometry/Point';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

//服务初始化时注册事件监听函数
var url = GlobeParameter.networkAnalystURL;
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var initFindTSPPathService = () => {
    return new FindTSPPathsService(url);
};


describe('FindTSPPathsService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceSucceedEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //测试正常情况
   it('processAsync_default', (done) => {
        var nodeArray = [new Point(5627.7550668827, -3627.4849836293),
        new Point(5018.1469160422, -4638.5424045354),
        new Point(6133.2837773358, -4645.9766502774)
        ];
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
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathServiceCompleted = (serviceSucceedEventArgsSystem) => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.tspPathList;
                expect(analystResult).not.toBeNull();
                expect(analystResult[0].edgeFeatures).not.toBeNull();
                expect(analystResult[0].edgeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].edgeFeatures.features).not.toBeNull();
                expect(analystResult[0].edgeFeatures.features.length).toBeGreaterThan(0);
                for (var i = 0; i < analystResult[0].edgeFeatures.features.length; i++) {
                    expect(analystResult[0].edgeFeatures.features[i].type).toBe("Feature");
                    expect(analystResult[0].edgeFeatures.features[i].geometry).not.toBeNull();
                    expect(analystResult[0].edgeFeatures.features[i].id).not.toBeNull();
                    expect(analystResult[0].edgeFeatures.features[i].properties).not.toBeNull();
                }
                expect(analystResult[0].edgeFeatures.features[0].id).toEqual(6569);
                expect(analystResult[0].edgeFeatures.features[0].geometry.type).toBe("LineString");
                expect(analystResult[0].edgeFeatures.features[0].geometry.coordinates.length).toBeGreaterThan(0);
                expect(analystResult[0].edgeFeatures.features[0].id).toEqual(6569);
                expect(analystResult[0].nodeFeatures).not.toBeNull();
                expect(analystResult[0].nodeFeatures.type).toEqual("FeatureCollection");
                expect(analystResult[0].nodeFeatures.features).not.toBeNull();
                expect(analystResult[0].nodeFeatures.features.length).toBeGreaterThan(0);
                for (var j = 0; j < analystResult[0].edgeFeatures.features.length; j++) {
                    expect(analystResult[0].nodeFeatures.features[j].type).toBe("Feature");
                    expect(analystResult[0].nodeFeatures.features[j].geometry).not.toBeNull();
                    expect(analystResult[0].nodeFeatures.features[j].id).not.toBeNull();
                    expect(analystResult[0].nodeFeatures.features[j].properties).not.toBeNull();
                }
                expect(analystResult[0].nodeFeatures.features[0].id).toEqual(1575);
                expect(analystResult[0].nodeFeatures.features[0].geometry.type).toBe("Point");
                expect(analystResult[0].nodeFeatures.features[0].geometry.coordinates.length).toBeGreaterThan(0);
                expect(analystResult[0].nodeFeatures.features[0].id).toEqual(1575);
                expect(analystResult[0].pathGuideItems).not.toBeNull();
                expect(analystResult[0].pathGuideItems.type).toBe("FeatureCollection");
                expect(analystResult[0].pathGuideItems.features.length).toBeGreaterThan(0);
                expect(analystResult[0].route).not.toBeNull();
                expect(analystResult[0].route.type).toBe("Feature");
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };
        var findTSPPathServiceFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
        };
        var findTSPPathsService = initFindTSPPathService(findTSPPathServiceCompleted, findTSPPathServiceFailed);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/tsppath");
            return Promise.resolve(new Response(JSON.stringify(findTSPPathsResultJson)))
        });
        findTSPPathsService.processAsync(parameter, findTSPPathServiceCompleted);
    });

    //id为空
   it('processAsync_isAnalyzeById:null', (done) => {
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
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
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: true,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findTSPPathServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findTSPPathsService = initFindTSPPathService(findTSPPathServiceCompleted, findTSPPathServiceFailed);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/tsppath");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"参数nodes 不是有效的JSON 字符串对象"}}`))
        });
        findTSPPathsService.processAsync(parameter, findTSPPathServiceFailed);
    });

    //参数错误
   it('processAsync_parameterWrong', (done) => {
        var nodeArray = [new Point(119.6100397551, -122.6278394459),
        new Point(171.9035599945, -113.2491141857)
        ];
        var resultSetting = new TransportationAnalystResultSetting({
            returnEdgeFeatures: false,
            returnEdgeGeometry: false,
            returnEdgeIDs: false,
            returnNodeFeatures: false,
            returnNodeGeometry: false,
            returnNodeIDs: false,
            returnPathGuides: false,
            returnRoutes: false
        });
        var analystParameter = new TransportationAnalystParameter({
            resultSetting: resultSetting,
            weightFieldName: "TurnCost1"
        });
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: false,
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathServiceCompleted = (serviceSucceedEventArgs) => {
            serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
        };
        var findTSPPathServiceFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem.type).toBe("processFailed");
                expect(serviceFailedEventArgsSystem.error.code).toEqual(400);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findTSPPathsService = initFindTSPPathService(findTSPPathServiceCompleted, findTSPPathServiceFailed);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/tsppath");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"执行 findTSPPath 操作时出错,原因是：权重字段TurnCost1不存在。 "}}`))
        });
        findTSPPathsService.processAsync(parameter, findTSPPathServiceFailed);
    });

    //参数为空
   it('processAsync_parameterNull', () => {
        var flag = false;
        var findTSPPathServiceCompleted = (serviceSucceedEventArgs) => {
            flag = true;
        };

        var findTSPPathsService = initFindTSPPathService();
        findTSPPathsService.processAsync(findTSPPathServiceCompleted);
        expect(flag).toBeFalsy;
    });

    //AnalyzeById_wrong
    it('processAsync_AnalyzeById_wrong', (done) => {
        var nodeArray = [new Point(5627.7550668827, -3627.4849836293),
        new Point(5018.1469160422, -4638.5424045354),
        new Point(6133.2837773358, -4645.9766502774)
        ];
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
        var parameter = new FindTSPPathsParameters({
            isAnalyzeById: "AnalyzeById",
            nodes: nodeArray,
            endNodeAssigned: false,
            parameter: analystParameter
        });
        var findTSPPathServiceCompleted = (serviceSucceedEventArgs) => {
            try {
                expect(serviceSucceedEventArgs.type).toBe("processCompleted");
                expect(serviceSucceedEventArgs.result.succeed).toBeTruthy;
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
                findTSPPathsService.destroy();
                parameter.destroy();
                done();
            }
        };

        var findTSPPathsService = initFindTSPPathService();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/tsppath");
            return Promise.resolve(new Response(`tsppath`))
        });

        findTSPPathsService.processAsync(parameter, findTSPPathServiceCompleted);
    })

    it('processAsync_AnalyzeById_wrong promise', (done) => {
      var nodeArray = [new Point(5627.7550668827, -3627.4849836293),
      new Point(5018.1469160422, -4638.5424045354),
      new Point(6133.2837773358, -4645.9766502774)
      ];
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
      var parameter = new FindTSPPathsParameters({
          isAnalyzeById: "AnalyzeById",
          nodes: nodeArray,
          endNodeAssigned: false,
          parameter: analystParameter
      });
      var findTSPPathServiceCompleted = (serviceSucceedEventArgs) => {
          try {
              expect(serviceSucceedEventArgs.type).toBe("processCompleted");
              expect(serviceSucceedEventArgs.result.succeed).toBeTruthy;
              findTSPPathsService.destroy();
              parameter.destroy();
              done();
          } catch (exception) {
              expect(false).toBeTruthy();
              console.log("FindTSPPathsService_" + exception.name + ":" + exception.message);
              findTSPPathsService.destroy();
              parameter.destroy();
              done();
          }
      };

      var findTSPPathsService = initFindTSPPathService();
      spyOn(FetchRequest, 'get').and.callFake((url) => {
          expect(url).toContain("iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun/tsppath");
          return Promise.resolve(new Response(`tsppath`))
      });

      findTSPPathsService.processAsync(parameter).then(findTSPPathServiceCompleted);
  })
});
