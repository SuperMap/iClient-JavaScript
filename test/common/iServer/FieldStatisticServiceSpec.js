import { FieldStatisticService } from '../../../src/common/iServer/FieldStatisticService';
import { StatisticMode } from '../../../src/common/REST';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;

describe('FieldStatisticService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //存在对应数据源数据集返回查询结果
    it('success:processAsync', (done) => {
        var fieldStatisticService;
        var fieldStatisticCompleted = (fieldStatisticEventArgsSystem) => {
            try {
                expect(fieldStatisticEventArgsSystem).not.toBeNull();
                expect(fieldStatisticEventArgsSystem.result.mode).toBe("AVERAGE");
                expect(fieldStatisticEventArgsSystem.result.result).toEqual(124);
                fieldStatisticService.destroy();
                expect(fieldStatisticService.datasource).toBeNull();
                expect(fieldStatisticService.field).toBeNull();
                expect(fieldStatisticService.statisticMode).toBeNull();
                expect(fieldStatisticService.dataset).toBeNull();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        };
        fieldStatisticService = new FieldStatisticService(dataServiceURL);
        expect(fieldStatisticService).not.toBeNull();
        expect(fieldStatisticService.url).toBe(dataServiceURL);
        fieldStatisticService.dataset = "Countries";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "SmID";
        fieldStatisticService.statisticMode = StatisticMode.AVERAGE;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(dataServiceURL + "/datasources/World/datasets/Countries/fields/SmID/AVERAGE");
            return Promise.resolve(new Response(`{"result":124,"mode":"AVERAGE"}`));
        });
        fieldStatisticService.processAsync(fieldStatisticCompleted);
    });

    it('success:processAsync promise', (done) => {
      var fieldStatisticService;
      var fieldStatisticCompleted = (fieldStatisticEventArgsSystem) => {
          try {
              expect(fieldStatisticEventArgsSystem).not.toBeNull();
              expect(fieldStatisticEventArgsSystem.result.mode).toBe("AVERAGE");
              expect(fieldStatisticEventArgsSystem.result.result).toEqual(124);
              fieldStatisticService.destroy();
              expect(fieldStatisticService.datasource).toBeNull();
              expect(fieldStatisticService.field).toBeNull();
              expect(fieldStatisticService.statisticMode).toBeNull();
              expect(fieldStatisticService.dataset).toBeNull();
              done();
          } catch (exception) {
              expect(false).toBeTruthy();
              console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
              fieldStatisticService.destroy();
              done();
          }
      };
      fieldStatisticService = new FieldStatisticService(dataServiceURL);
      expect(fieldStatisticService).not.toBeNull();
      expect(fieldStatisticService.url).toBe(dataServiceURL);
      fieldStatisticService.dataset = "Countries";
      fieldStatisticService.datasource = "World";
      fieldStatisticService.field = "SmID";
      fieldStatisticService.statisticMode = StatisticMode.AVERAGE;
      spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
          expect(testUrl).toBe(dataServiceURL + "/datasources/World/datasets/Countries/fields/SmID/AVERAGE");
          return Promise.resolve(new Response(`{"result":124,"mode":"AVERAGE"}`));
      });
      fieldStatisticService.processAsync().then(fieldStatisticCompleted);
  });

    //错误数据集，查询错误
    it('processAsync_datasetsWrong', (done) => {
        var fieldStatisticService;
        var fieldStatisticFailed = (serviceFailedEventArgsSystem) => {
            try {
                expect(serviceFailedEventArgsSystem).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error).not.toBeNull();
                expect(serviceFailedEventArgsSystem.error.code).toEqual(500);
                expect(serviceFailedEventArgsSystem.error.errorMsg).not.toBeNull();
                fieldStatisticService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        };
        fieldStatisticService = new FieldStatisticService(dataServiceURL);
        fieldStatisticService.dataset = "NoDataset";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "NotIDThis";
        fieldStatisticService.statisticMode = StatisticMode.AVERAGE;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(dataServiceURL + "/datasources/World/datasets/NoDataset/fields/NotIDThis/AVERAGE");
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":500,"errorMsg":"抛出未被捕获的异常,错误信息是数据集NoDataset在数据源中不存在"}}`));
        });
        fieldStatisticService.processAsync(fieldStatisticFailed);
    })
    it('processAsync_customQueryParam', (done) => {
        var fieldStatisticService;
        var fieldStatisticCompleted = (fieldStatisticEventArgsSystem) => {
            try {
                fieldStatisticService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("FieldStatisticService_" + exception.name + ":" + exception.message);
                fieldStatisticService.destroy();
                done();
            }
        };
        fieldStatisticService = new FieldStatisticService(dataServiceURL + '?key=111')
        expect(fieldStatisticService.url).toBe(dataServiceURL + '?key=111');
        fieldStatisticService.dataset = "Countries";
        fieldStatisticService.datasource = "World";
        fieldStatisticService.field = "SmID";
        fieldStatisticService.statisticMode = StatisticMode.AVERAGE;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            expect(testUrl).toBe(dataServiceURL + "/datasources/World/datasets/Countries/fields/SmID/AVERAGE?key=111");
            return Promise.resolve(new Response(`{"result":124,"mode":"AVERAGE"}`));
        });
        fieldStatisticService.processAsync(fieldStatisticCompleted);
    });
});
