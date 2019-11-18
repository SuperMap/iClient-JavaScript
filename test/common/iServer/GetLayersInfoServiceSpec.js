import { GetLayersInfoService } from '../../../src/common/iServer/GetLayersInfoService';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var serviceFailedEventArgsSystem = null;
var getFieldsEventArgsSystem = null;
var initGetLayersInfoService = (url, getLayersInfoServiceCompleted, getLayersInfoServiceFailed) => {
    return new GetLayersInfoService(url, {
        eventListeners: {
            processCompleted: getLayersInfoServiceCompleted,
            processFailed: getLayersInfoServiceFailed
        }
    });
};

describe('GetLayersInfoService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var getLayersInfoService = new GetLayersInfoService(GlobeParameter.vectorURL, { headers: myHeaders });
        expect(getLayersInfoService).not.toBeNull();
        expect(getLayersInfoService.headers).not.toBeNull();
        getLayersInfoService.destroy();
    });

    it('crossOrigin', () => {
        var getLayersInfoService = new GetLayersInfoService(GlobeParameter.vectorURL, { crossOrigin: false });
        expect(getLayersInfoService).not.toBeNull();
        expect(getLayersInfoService.crossOrigin).toBeFalsy();
        getLayersInfoService.destroy();
    });

    it('constructor, destroy', () => {
        var vectorURL = GlobeParameter.vectorURL;
        var getLayersInfoServiceCompleted = result => {
            getFieldsEventArgsSystem = result;
        };
        var getLayersInfoServiceFailed = result => {
            serviceFailedEventArgsSystem = result;
        };
        var getLayersInfoService = initGetLayersInfoService(
            vectorURL,
            getLayersInfoServiceCompleted,
            getLayersInfoServiceFailed
        );
        expect(getLayersInfoService).not.toBeNull();
        getLayersInfoService.destroy();
        expect(getLayersInfoService.events).toBeNull();
        expect(getLayersInfoService.eventListeners).toBeNull();
    });

    it('processAsync_Vector', done => {
        var vectorURL = GlobeParameter.vectorURL;
        spyOn(FetchRequest, 'get').and.callFake(url => {
            expect(url).toBe(vectorURL + 'layers.json?');
            return Promise.resolve(new Response('[' + JSON.stringify(layersInfo) + ']'));
        });
        var getLayersInfoServiceCompleted = getFieldsEventArgsSystem => {
            try {
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.type).toBe('UGC');
                var layers = analystResult.subLayers.layers;
                expect(layers[0].datasetInfo.type).toEqual('TEXT');
                expect(layers.length).toBeGreaterThan(0);
                for (var i = 0; i < layers.length; i++) {
                    expect(layers[i].type).toEqual('UGC');
                    expect(layers[i].CLASS_NAME).not.toBeNull();
                    expect(layers[i].ugcLayerType).not.toBeNull();
                    expect(layers[i].style).not.toBeNull();
                    expect(layers[i].bounds).not.toBeNull();
                    expect(layers[i].datasetInfo.bounds.left).toEqual(layers[i].bounds.left);
                    expect(layers[i].caption).not.toBeNull();
                    expect(layers[i].name).not.toBeNull();
                    expect(layers[i].opaqueRate).toBe(100);
                    expect(layers[i].datasetInfo.dataSourceName).toEqual('World');
                    expect(layers[i].datasetInfo.name).not.toBeNull();
                    expect(layers[i].datasetInfo.type).not.toBeNull();
                }
                getLayersInfoService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('GetLayersInfoService_' + exception.name + ':' + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        };
        var getLayersInfoServiceFailed = result => {
            serviceFailedEventArgsSystem = result;
        };
        var getLayersInfoService = initGetLayersInfoService(
            vectorURL,
            getLayersInfoServiceCompleted,
            getLayersInfoServiceFailed
        );
        getLayersInfoService.processAsync();
    });

    it('processAsync_image', done => {
        var imageURL = GlobeParameter.imageURL;
        var getLayersInfoServiceCompleted = getFieldsEventArgsSystem => {
            try {
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('GetLayersInfoService_' + exception.name + ':' + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        };
        var getLayersInfoServiceFailed = result => {
            serviceFailedEventArgsSystem = result;
        };
        var getLayersInfoService = initGetLayersInfoService(
            imageURL,
            getLayersInfoServiceCompleted,
            getLayersInfoServiceFailed
        );
        spyOn(FetchRequest, 'get').and.callFake(url => {
            expect(url).toBe(imageURL + '/layers.json?');
            return Promise.resolve(new Response('[' + JSON.stringify(layersInfo) + ']'));
        });
        getLayersInfoService.processAsync();
    });

    it('processAsync_grid', done => {
        var gridURL = GlobeParameter.gridURL;
        var getLayersInfoServiceCompleted = getFieldsEventArgsSystem => {
            try {
                var analystResult = getFieldsEventArgsSystem.result;
                expect(analystResult).not.toBeNull();
                expect(analystResult.subLayers.layers).not.toBeNull();
                getLayersInfoService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('GetLayersInfoService_' + exception.name + ':' + exception.message);
                getLayersInfoService.destroy();
                done();
            }
        };
        var getLayersInfoServiceFailed = result => {
            serviceFailedEventArgsSystem = result;
        };
        var getLayersInfoService = initGetLayersInfoService(
            gridURL,
            getLayersInfoServiceCompleted,
            getLayersInfoServiceFailed
        );
        spyOn(FetchRequest, 'get').and.callFake(url => {
            expect(url).toBe(gridURL + '/layers.json?');
            return Promise.resolve(new Response('[' + JSON.stringify(layersInfo) + ']'));
        });
        getLayersInfoService.processAsync();
    });
});
