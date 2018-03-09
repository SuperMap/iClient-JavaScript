import {GetFeaturesByBoundsService} from '../../../src/common/iServer/GetFeaturesByBoundsService';
import {GetFeaturesByBoundsParameters} from '../../../src/common/iServer/GetFeaturesByBoundsParameters';
import {Bounds} from '../../../src/common/commontypes/Bounds';


var url = GlobeParameter.dataServiceURL;
//服务初始化时注册事件监听函数
var serviceFailedEventArgsSystem = null, serviceSucceedEventArgsSystem = null;
var serviceCompleted = (serviceSucceedEventArgs) => {
    serviceSucceedEventArgsSystem = serviceSucceedEventArgs;
};
var serviceFailed = (serviceFailedEventArgs) => {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        'processFailed': serviceFailed,
        'processCompleted': serviceCompleted
    }
};
var initGetFeaturesByBoundsService_RegisterListener = () => {
    return new GetFeaturesByBoundsService(url, options);
};

describe('GetFeaturesByBoundsService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
        getFeaturesByBoundsService.events.on({
            'processFailed': serviceFailed,
            'processCompleted': serviceCompleted
        });
        expect(getFeaturesByBoundsService).not.toBeNull();
        expect(getFeaturesByBoundsService.CLASS_NAME).toEqual("SuperMap.GetFeaturesByBoundsService");
        getFeaturesByBoundsService.destroy();
        expect(getFeaturesByBoundsService.EVENT_TYPES).toBeNull();
        expect(getFeaturesByBoundsService.events).toBeNull();
    });

    it('success:processAsync', (done) => {
        var getFeaturesByBoundsService = initGetFeaturesByBoundsService_RegisterListener();
        var boundsParams = new GetFeaturesByBoundsParameters({
            datasetNames: ["World:Countries"],
            bounds: new Bounds(0, 0, 90, 90)
        });
        getFeaturesByBoundsService.processAsync(boundsParams);
        setTimeout(() => {
            try {
                var analystResult = serviceSucceedEventArgsSystem.result.features;
                expect(analystResult).not.toBeNull();
                expect(analystResult.type).toEqual("FeatureCollection");
                expect(analystResult.features).not.toBeNull();
                expect(analystResult.features.length).toBeGreaterThan(0);
                getFeaturesByBoundsService.destroy();
                boundsParams.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetFeaturesByBoundsService_" + exception.name + ":" + exception.message);
                getFeaturesByBoundsService.destroy();
                boundsParams.destroy();
                done();
            }
        }, 4000);
    })
});