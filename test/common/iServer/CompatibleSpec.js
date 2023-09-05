import { GeoCodingParameter } from '../../../src/common/iServer/GeoCodingParameter';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { CommonServiceBase } from '../../../src/common/iServer/CommonServiceBase';

var addressMatchURL_code = GlobeParameter.addressMatchURL_code;
describe('Compatible custom AddressMatchService', () => {
  var originalTimeout;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('compatible code', done => {
    var codingSuccessEventArgs = null;
    var codeCompleted = analyseEventArgs => {
      codingSuccessEventArgs = analyseEventArgs;
      try {
        expect(addressCodeService).not.toBeNull();
        expect(codingSuccessEventArgs).not.toBeNull();
        expect(codingSuccessEventArgs.type).toBe('processCompleted');
        expect(codingSuccessEventArgs.result).not.toBeNull();
        expect(codingSuccessEventArgs.result.length).toEqual(10);
        addressCodeService.destroy();
        GeoCodingParams.destroy();
        codingSuccessEventArgs = null;
        done();
      } catch (exception) {
        console.log("'code'案例失败：" + exception.name + ':' + exception.message);
        addressCodeService.destroy();
        GeoCodingParams.destroy();
        codingSuccessEventArgs = null;
        expect(false).toBeTruthy();
        done();
      }
    };
    var GeoCodingParams = new GeoCodingParameter({
      address: '公司',
      fromIndex: 0,
      toIndex: 10,
      filters: '北京市,海淀区',
      prjCoordSys: '{epsgcode:4326}',
      maxReturn: -1
    });



    class AddressMatchService extends CommonServiceBase {
      constructor(url, options) {
        super(url, options);
        this.options = options || {};
        this.CLASS_NAME = 'SuperMap.AddressMatchService';
      }

      destroy() {
        super.destroy();
      }

      code(url, params) {
        if (!(params instanceof GeoCodingParameter)) {
          return;
        }
        return this.processAsync(url, params);
      }

      processAsync(url, params) {
        var me = this;
        return this.request({
          method: 'GET',
          url,
          params,
          scope: me,
          success: me.serviceProcessCompleted,
          failure: me.serviceProcessFailed
        });
      }

      serviceProcessCompleted(result, options) {
        if (result.succeed) {
          delete result.succeed;
        }
        this.events.triggerEvent('processCompleted', {
          result: result,
          options: options
        });
      }
    }
    var options = {
      eventListeners: { processCompleted: codeCompleted }
    };
    var addressCodeService = new AddressMatchService(addressMatchURL_code, options);
    spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
      expect(testUrl).toBe(addressMatchURL_code);
      expect(params.address).toBe('公司');
      expect(params.prjCoordSys).toBe('{epsgcode:4326}');
      expect(options).not.toBeNull();
      return Promise.resolve(new Response(codeSuccessEscapedJson));
    });
    addressCodeService.code(addressMatchURL_code, GeoCodingParams);
  });
});
