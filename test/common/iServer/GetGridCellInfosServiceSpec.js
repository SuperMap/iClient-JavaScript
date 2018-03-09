import {GetGridCellInfosService} from '../../../src/common/iServer/GetGridCellInfosService';
import {GetGridCellInfosParameters} from '../../../src/common/iServer/GetGridCellInfosParameters';

var dataServiceURL = GlobeParameter.dataServiceURL;
var eventCompleted, eventFailed;
var queryCompleted = (event) => {
    eventCompleted = event;
};
var queryError = (event) => {
    eventFailed = event;
};
var initGetGridCellInfosService = (url) => {
    return new GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });
};

describe('GetGridCellInfosService', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        var getGridCellInfosService = initGetGridCellInfosService(dataServiceURL);
        expect(getGridCellInfosService.CLASS_NAME).toEqual("SuperMap.GetGridCellInfosService");
        expect(getGridCellInfosService.EVENT_TYPES.length).toEqual(2);
        expect(getGridCellInfosService.EVENT_TYPES[0]).toEqual("processCompleted");
        expect(getGridCellInfosService.EVENT_TYPES[1]).toEqual("processFailed");
        expect(getGridCellInfosService.events).not.toBeNull();
        expect(getGridCellInfosService.eventListeners).not.toBeNull();
        expect(getGridCellInfosService.datasetName).toBeNull();
        expect(getGridCellInfosService.dataSourceName).toBeNull();
        expect(getGridCellInfosService.datasetType).toBeNull();
        expect(getGridCellInfosService.X).toBeNull();
        expect(getGridCellInfosService.Y).toBeNull();
        getGridCellInfosService.destroy();
        expect(getGridCellInfosService.EVENT_TYPES).toBeNull();
        expect(getGridCellInfosService.events).toBeNull();
        expect(getGridCellInfosService.eventListeners).toBeNull();
    });

    it('success:processAsync', (done) => {
        var queryParam = new GetGridCellInfosParameters({
            datasetName: "LandCover",
            dataSourceName: "World",
            X: "110",
            Y: "50"
        });
        var myService = new GetGridCellInfosService(dataServiceURL, {
            eventListeners: {
                "processCompleted": queryCompleted,
                "processFailed": queryError
            }
        });
        myService.processAsync(queryParam);
        setTimeout(() => {
            try {
                expect(myService.url).toEqual(dataServiceURL + "/datasources/World/datasets/LandCover/gridValue.json?x=110&y=50");
                myService.destroy();
                queryParam.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetGridCellInfosService_" + exception.name + ":" + exception.message);
                myService.destroy();
                queryParam.destroy();
                done();
            }
        }, 2000);
    });

    it('fail:processAsync', (done) => {
        var url = dataServiceURL + "/datasources/World/datasets";
        var myService = new GetGridCellInfosService(url, {
            eventListeners: {
                "processCompleted": queryCompleted,
                "processFailed": queryError
            },
            X: 110,
            Y: 50
        });
        myService.processAsync();
        setTimeout(() => {
            try {
                expect((myService.processAsync()) === undefined).toBeTruthy();
                myService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("GetGridCellInfosService_" + exception.name + ":" + exception.message);
                myService.destroy();
                done();
            }
        }, 2000)
    });

    it('getDatasetInfoCompleted', () => {
        var myService = new GetGridCellInfosService(dataServiceURL, {
            eventListeners: {
                "processCompleted": queryCompleted,
                "processFailed": queryError
            }
        });
        var result = {
            datasetInfo: {
                type: "GRID"
            }
        };
        myService.url = dataServiceURL + "/datasources/World/datasets/LandCover.json";
        myService.getDatasetInfoCompleted(result);
        expect(myService.datasetType).toBe("GRID");
    });

    it('getDatasetInfoFailed', () => {
        var myService = initGetGridCellInfosService(dataServiceURL);
        var result = {};
        myService.getDatasetInfoFailed(result);
        expect(result).not.toBeNull();
    });

    it('queryGridInfos', () => {
        var url = dataServiceURL + "/datasources/World/datasets/LandCover.json";
        var myService = initGetGridCellInfosService(url);
        myService.X = "110";
        myService.Y = "50";
        myService.queryGridInfos();
        expect(myService.url).toEqual(dataServiceURL + "/datasources/World/datasets/LandCover/imageValue.json?x=110&y=50");
    });
});


