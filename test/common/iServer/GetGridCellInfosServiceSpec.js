import { GetGridCellInfosService } from '../../../src/common/iServer/GetGridCellInfosService';
import { GetGridCellInfosParameters } from '../../../src/common/iServer/GetGridCellInfosParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var dataServiceURL = GlobeParameter.dataServiceURL;
var eventCompleted, eventFailed, requestType

var initGetGridCellInfosService = (url, succ, fail) => {
    return new GetGridCellInfosService(url, {
        eventListeners: {
            processCompleted: succ,
            processFailed: fail
        }
    });
};

describe('GetGridCellInfosService', () => {
    var originalTimeout;
    beforeEach(() => {
        requestType = null
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        requestType = null
    });

    it('headers', () => {
        let myHeaders = new Headers();
        var getGridCellInfosService = new GetGridCellInfosService(dataServiceURL, { headers: myHeaders });
        expect(getGridCellInfosService).not.toBeNull();
        expect(getGridCellInfosService.headers).not.toBeNull();
        getGridCellInfosService.destroy();
    });

    it('crossOrigin', () => {
        var getGridCellInfosService = new GetGridCellInfosService(dataServiceURL, { crossOrigin: false });
        expect(getGridCellInfosService).not.toBeNull();
        expect(getGridCellInfosService.crossOrigin).toBeFalsy();
        getGridCellInfosService.destroy();
    });

    it('constructor, destroy', () => {
        var queryCompleted = event => {
            eventCompleted = event;
        };
        var queryError = event => {
            eventFailed = event;
        };
        var getGridCellInfosService = initGetGridCellInfosService(dataServiceURL, queryCompleted, queryError);
        expect(getGridCellInfosService.CLASS_NAME).toEqual('SuperMap.GetGridCellInfosService');
        expect(getGridCellInfosService.EVENT_TYPES.length).toEqual(2);
        expect(getGridCellInfosService.EVENT_TYPES[0]).toEqual('processCompleted');
        expect(getGridCellInfosService.EVENT_TYPES[1]).toEqual('processFailed');
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

    it('getGridCellInfosWithNoBounds', done => {
        var GP = new GetGridCellInfosParameters({
            dataSourceName: "World",
            datasetName: "WorldEarth",
            X: 4,
            Y: 20
        });
        expect(GP).not.toBeNull()
        var queryCompleted = event => {
            eventCompleted = event;
            expect(myService.url).toEqual(dataServiceURL + '/datasources/World/datasets/WorldEarth/imageValue?x=4&y=20')
            done()
        };
        var queryError = event => {
            eventFailed = event;
            done()
        };

        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            // 首先判断是否为数据集的请求
            JudgeMethod(GP, method, testUrl, params, options)
            expect(params).toBeUndefined()
            if (testUrl.indexOf("imageValue") > 0) {
                requestType = "gridInfoRequest"
                return Promise.resolve(new Response(JSON.stringify(imageValueJson)))
            } else {
                requestType = "dataSetRequest"
                return Promise.resolve(new Response(JSON.stringify(getDatasetWordEarthJson)))
            }
        });

        var myService = initGetGridCellInfosService(dataServiceURL, queryCompleted, queryError)
        myService.processAsync(GP);
    })

    it('fail:processAsync', done => {
        var url = dataServiceURL + '/datasources/World/datasets';
        var queryCompleted = event => {
            eventCompleted = event;
        };
        var queryError = event => {
            eventFailed = event;
        };
        var myService = new GetGridCellInfosService(url, {
            eventListeners: {
                processCompleted: queryCompleted,
                processFailed: queryError
            },
            X: 110,
            Y: 50
        });
        myService.processAsync();
        setTimeout(() => {
            try {
                expect(myService.processAsync() === undefined).toBeTruthy();
                myService.destroy();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log('GetGridCellInfosService_' + exception.name + ':' + exception.message);
                myService.destroy();
                done();
            }
        }, 0);
    });

    it('getDatasetInfoCompleted', () => {
        var queryCompleted = event => {
            eventCompleted = event;
        };
        var queryError = event => {
            eventFailed = event;
        };
        var myService = new GetGridCellInfosService(dataServiceURL, {
            eventListeners: {
                processCompleted: queryCompleted,
                processFailed: queryError
            }
        });
        var result = {
            datasetInfo: {
                type: 'GRID'
            }
        };
        myService.url = dataServiceURL + '/datasources/World/datasets/LandCover';
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/LandCover/gridValue');
            expect(options).not.toBeNull();
            return Promise.resolve(new Response(`{"succeed":false,"error":{"code":400,"errorMsg":"请求体格式错误"}}`));
        });
        myService.getDatasetInfoCompleted(result);
        expect(myService.datasetType).toBe('GRID');
    });
    it('getDatasetInfoFailed', () => {
        var queryCompleted = event => {
            eventCompleted = event;
        };
        var queryError = event => {
            eventFailed = event;
        };
        var myService = initGetGridCellInfosService(dataServiceURL, queryCompleted, queryError);
        var result = {};
        myService.getDatasetInfoFailed(result);
        expect(result).not.toBeNull();
    });

    it('queryGridInfos', () => {
        var url = dataServiceURL + '/datasources/World/datasets/LandCover';
        var myService = initGetGridCellInfosService(url);
        myService.X = '110';
        myService.Y = '50';
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(method).toBe('GET');
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/LandCover/imageValue?x=110&y=50');
            expect(options).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"所查询的数据集的类型不正确！数据集类型应为影像数据集"}}`
                )
            );
        });
        myService.queryGridInfos();
        expect(myService.url).toEqual(
            dataServiceURL + '/datasources/World/datasets/LandCover/imageValue?x=110&y=50'
        );
    });
    it('queryGridInfos_customQueryParam', () => {
        var url = dataServiceURL + '/datasources/World/datasets/LandCover?key=123';
        var myService = initGetGridCellInfosService(url);
        myService.X = '110';
        myService.Y = '50';
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, options) => {
            expect(testUrl).toBe(dataServiceURL + '/datasources/World/datasets/LandCover/imageValue?key=123&x=110&y=50');
            return Promise.resolve(
                new Response(
                    `{"succeed":false,"error":{"code":400,"errorMsg":"所查询的数据集的类型不正确！数据集类型应为影像数据集"}}`
                )
            );
        });
        myService.queryGridInfos();
        expect(myService.url).toEqual(
            dataServiceURL + '/datasources/World/datasets/LandCover/imageValue?key=123&x=110&y=50'
        );
    });
});

function JudgeMethod(para, m, u, p, o) {
    if (para.bounds) {
        if (Array.isArray(para.bounds) && u.indexOf('imageValue') > -1) {
            expect(m).toBe("POST");
            expect(o).not.toBeNull()
        } else {
            expect(m).toBe("GET");
        }
    } else {
        expect(m).toBe("GET");
    }
}