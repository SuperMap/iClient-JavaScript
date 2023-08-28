import { DensityAnalystService } from '../../../src/common/iServer/DensityAnalystService';
import { DensityKernelAnalystParameters } from '../../../src/common/iServer/DensityKernelAnalystParameters';
import request from 'request';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.spatialAnalystURL_Changchun;
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;


describe('DensityAnalystService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        serviceFailedEventArgsSystem = null;
        analystEventArgsSystem = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    var resultDataset = "KernelDensity_commonTest";
    //成功事件
    it('SuccessEvent', (done) => {
        var analyzeCompleted = (analyseEventArgs) => {
            analystEventArgsSystem = analyseEventArgs;
            try {
                expect(analystEventArgsSystem.type).toEqual("processCompleted");
                var serviceResult = analystEventArgsSystem.result;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.succeed).toBeTruthy();
                expect(serviceResult.dataset).toEqual(resultDataset + "@Changchun");
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("SuccessEvent" + e.name + ":" + e.message);
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            }
        };
        var densityAnalystService = new DensityAnalystService(url);
        expect(densityAnalystService).not.toBeNull();
        expect(densityAnalystService.url).toEqual(url);
        var densityKernelAnalystParameters = new DensityKernelAnalystParameters({
            dataset: "Railway@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: resultDataset,
            //删除重复的数据集
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/Railway@Changchun/densityanalyst/kernel?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.fieldName).toBe("SmLength");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":true,"recordset":null,"message":null,"dataset":"KernelDensity_commonTest@Changchun"}`));
        });
        densityAnalystService.processAsync(densityKernelAnalystParameters, analyzeCompleted);
    });

    //失败事件
    it('FailedEvent', (done) => {
        var analyzeFailed = (serviceFailedEventArgs) => {
            serviceFailedEventArgsSystem = serviceFailedEventArgs;
            try {
                expect(serviceFailedEventArgsSystem.type).toEqual("processFailed");
                var serviceResult = serviceFailedEventArgsSystem;
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.error.code).toEqual(400);
                expect(serviceResult.error.errorMsg).not.toBeNull();
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            } catch (e) {
                expect(false).toBeTruthy();
                console.log("FailedEvent" + e.name + ":" + e.message);
                densityAnalystService.destroy();
                densityKernelAnalystParameters.destroy();
                done();
            }
        };
        var densityAnalystService = new DensityAnalystService(url);
        expect(densityAnalystService).not.toBeNull();
        expect(densityAnalystService.url).toEqual(url);
        var densityKernelAnalystParameters = new DensityKernelAnalystParameters({
            dataset: "xx@Changchun",
            //用于进行核密度分析的测量值的字段名称
            fieldName: "SmLength",
            resultGridName: resultDataset,
            deleteExistResultDataset: true
        });
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe("POST");
            expect(testUrl).toBe(url + "/datasets/xx@Changchun/densityanalyst/kernel?returnContent=true");
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, "\""));
            expect(paramsObj.fieldName).toBe("SmLength");
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集xx@Changchun不存在"}}`));
        });
        densityAnalystService.processAsync(densityKernelAnalystParameters, analyzeFailed);
    });

    it('FailedEvent promise', (done) => {
      var analyzeFailed = (serviceFailedEventArgs) => {
          serviceFailedEventArgsSystem = serviceFailedEventArgs;
          try {
              expect(serviceFailedEventArgsSystem.type).toEqual("processFailed");
              var serviceResult = serviceFailedEventArgsSystem;
              expect(serviceResult).not.toBeNull();
              expect(serviceResult.error.code).toEqual(400);
              expect(serviceResult.error.errorMsg).not.toBeNull();
              densityAnalystService.destroy();
              densityKernelAnalystParameters.destroy();
              done();
          } catch (e) {
              expect(false).toBeTruthy();
              console.log("FailedEvent" + e.name + ":" + e.message);
              densityAnalystService.destroy();
              densityKernelAnalystParameters.destroy();
              done();
          }
      };
      var densityAnalystService = new DensityAnalystService(url);
      expect(densityAnalystService).not.toBeNull();
      expect(densityAnalystService.url).toEqual(url);
      var densityKernelAnalystParameters = new DensityKernelAnalystParameters({
          dataset: "xx@Changchun",
          //用于进行核密度分析的测量值的字段名称
          fieldName: "SmLength",
          resultGridName: resultDataset,
          deleteExistResultDataset: true
      });
      spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
          expect(method).toBe("POST");
          expect(testUrl).toBe(url + "/datasets/xx@Changchun/densityanalyst/kernel?returnContent=true");
          expect(params).not.toBeNull();
          var paramsObj = JSON.parse(params.replace(/'/g, "\""));
          expect(paramsObj.fieldName).toBe("SmLength");
          expect(options).not.toBeNull();
          return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"数据集xx@Changchun不存在"}}`));
      });
      densityAnalystService.processAsync(densityKernelAnalystParameters).then(analyzeFailed);
  });
});