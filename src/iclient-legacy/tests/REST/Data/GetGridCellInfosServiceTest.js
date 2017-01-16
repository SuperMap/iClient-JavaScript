module("GetGridCellInfosService");

var evtSS, evtFA,
    dataUrl = GlobeParameter.dataServiceURL;
function queryCompleted(evt) {
    evtSS = evt;
}

function queryError(evt) {
    evtFA = evt;
}

test("TestGetGridCellInfosService_Constructor", function() {
    expect(11);

    var url = dataUrl;
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {eventListeners: {
             "processCompleted": queryCompleted,
             "processFailed": queryError
         }
     });

    equal(myService.CLASS_NAME, "SuperMap.REST.GetGridCellInfosService", "TestGetGridCellInfosService_Constructor");
    equal(myService.EVENT_TYPES.length, 2, "TestGetGridCellInfosService_Constructor");
    equal(myService.EVENT_TYPES[0], "processCompleted", "TestGetGridCellInfosService_Constructor");
    equal(myService.EVENT_TYPES[1], "processFailed", "TestGetGridCellInfosService_Constructor");
    ok(myService.events != null, "TestGetGridCellInfosService_Constructor");
    ok(myService.eventListeners != null, "TestGetGridCellInfosService_Constructor");
    equal(myService.datasetName, null, "TestGetGridCellInfosService_Constructor");
    equal(myService.dataSourceName, null, "TestGetGridCellInfosService_Constructor");
    equal(myService.datasetType, null, "TestGetGridCellInfosService_Constructor");
    equal(myService.X, null, "TestGetGridCellInfosService_Constructor");
    equal(myService.Y, null, "TestGetGridCellInfosService_Constructor");
});

test("TestGetGridCellInfosService_Destroy", function() {
    expect(8);

    var url = dataUrl;
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });
    myService.destroy();

    equal(myService.EVENT_TYPES, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.events, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.eventListeners, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.datasetName, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.dataSourceName, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.datasetType, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.X, null, "TestGetGridCellInfosService_Destroy");
    equal(myService.Y, null, "TestGetGridCellInfosService_Destroy");
});

test("TestGetGridCellInfosService_ProcessAsync", function() {
    expect(1);

    var url = dataUrl;
    var queryParam = new SuperMap.REST.GetGridCellInfosParameter({
        datasetName: "LandCover",
        dataSourceName: "World",
        X: "110",
        Y: "50"
    });
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });
    myService.processAsync(queryParam);
    if (myService.isInTheSameDomain) {
        equal(myService.url, url + "/datasources/World/datasets/LandCover.json", "TestGetGridCellInfosService_ProcessAsync");
    } else {
        equal(myService.url, url + "/datasources/World/datasets/LandCover.jsonp", "TestGetGridCellInfosService_ProcessAsync");
    }
});

test("TestGetGridCellInfosService_queryRequest", function() {
    expect(0);

    var url = dataUrl;
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });

    var successFun = function() {},
        failedFun = function() {};

    myService.queryRequest(successFun, failedFun);
});

test("TestGetGridCellInfosService_getDatasetInfoCompleted", function() {
    expect(1);

    var url = dataUrl;
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });

    var result = {
        datasetInfo: {
            type: "GRID"
        }
    }
    myService.url = dataUrl + "/datasources/World/datasets/LandCover.jsonp";
    myService.getDatasetInfoCompleted(result);

    equal(myService.datasetType, "GRID", "TestGetGridCellInfosService_getDatasetInfoCompleted");
});

test("TestGetGridCellInfosService_queryGridInfos", function() {
    expect(1);

    var url = dataUrl + "/datasources/World/datasets/LandCover.jsonp";
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });

    myService.X = "110";
    myService.Y = "50";
    myService.queryGridInfos();

    equal(myService.url, dataUrl + "/datasources/World/datasets/LandCover/imageValue.jsonp?x=110&y=50",
     "TestGetGridCellInfosService_queryGridInfos");
});

test("TestGetGridCellInfosService_getDatasetInfoFailed", function() {
    expect(0);

    var url = dataUrl;
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted,
            "processFailed": queryError
        }
    });

    var result = {};
    myService.getDatasetInfoFailed(result);

    ok(result != null, "GetGridCellInfosService_getDatasetInfoFailed");
});

asyncTest("TestGetGridCellInfosService_getGridCellInfosCompleted", function() {

    var url = dataUrl + "/datasources/World/datasets/LandCover";
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processCompleted": queryCompleted
        },
        X: 110,
        Y: 50
    });
    myService.processAsync();

    setTimeout(function() {
        try{
            var result = evtSS;
            if(!!result) {
                ok(evtSS.originResult != null, "GetGridCellInfosService_getGridCellInfosCompleted");
                ok(evtSS.originResult.succeed, "GetGridCellInfosService_getGridCellInfosCompleted");
                if (evtSS.originResult.succeed) {
                    ok(evtSS.result != null, "GetGridCellInfosService_getGridCellInfosCompleted");
                    equal(evtSS.result.column, 4640, "GetGridCellInfosService_getGridCellInfosCompleted");
                    equal(evtSS.result.row, 640, "GetGridCellInfosService_getGridCellInfosCompleted");
                    equal(evtSS.result.value, 1, "GetGridCellInfosService_getGridCellInfosCompleted");
                }
            }
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },5000)
});

asyncTest("TestGetGridCellInfosService_getGridCellInfosFailed", function() {

    var url = dataUrl + "/datasources/World/datasets";
    var myService = new SuperMap.REST.GetGridCellInfosService(url, {
        eventListeners: {
            "processFailed": queryError
        },
        X: 110,
        Y: 50
    });
    myService.processAsync();

    setTimeout(function() {
        try{
            var result = evtFA;
            if(!!result) {
                ok(evtFA.originResult != null, "TestGetGridCellInfosService_getGridCellInfosFailed");
                ok(evtFA.originResult.succeed == false, "TestGetGridCellInfosService_getGridCellInfosFailed");
                ok(evtFA.originResult.error != null, "TestGetGridCellInfosService_getGridCellInfosFailed");
                equal(evtFA.originResult.error.code, 404, "TestGetGridCellInfosService_getGridCellInfosFailed");
            }
            start();
        }catch(exception){
            ok(false,"exception occcurs,message is:"+exception.message)
            start();
        }
    },5000)
});