module("SymbolLibManagerTest");

var symbolLibManager;
function getSymbolLibManager(complete) {
    var map = new SuperMap.Map("map");
    var plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);
    symbolLibManager = plotting.getSymbolLibManager();
    symbolLibManager.events.on({"initializeCompleted": complete});
    symbolLibManager.initializeAsync();
}

asyncTest("testSymbolLibManager_Constructor", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            equal(symbolLibManager.CLASS_NAME, "SuperMap.Plot.SymbolLibManager", "Property:CLASS_NAME");
            start();
            symbolLibManager.events.un({"initializeCompleted": complete});
        }, 200);
    }
});

test("testSymbolLibManager_Destroy", function () {
    var symbolLibManager = new SuperMap.Plot.SymbolLibManager(GlobeParameter.plotUrl);
    equal(symbolLibManager.CLASS_NAME, "SuperMap.Plot.SymbolLibManager", "Property:CLASS_NAME");
    symbolLibManager.destroy();
    ok(symbolLibManager !== null, "not null");
    ok(symbolLibManager.url === null, "symbolLibManager.url");
    ok(symbolLibManager.libIDs.length === 0, "symbolLibManager.libIDs");
    ok(symbolLibManager.symbolLibs.length === 0, "symbolLibManager.symbolLibs");
    ok(symbolLibManager.symbolLibJsons.length === 0, "symbolLibManager.symbolLibJsons");
    ok(symbolLibManager.isInializeOK === false, "symbolLibManager.isInializeOK");
});

asyncTest("testSymbolLibManager_getSymbolLibNumber", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            getSymbolLibNumber = symbolLibManager.getSymbolLibNumber();
            equal(getSymbolLibNumber, 2, "Function:getSymbolLibNumber");
            start();
            symbolLibManager.events.un({"initializeCompleted": complete});
        }, 200);
    }
});

asyncTest("testSymbolLibManager_getSymbolLibID", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            getSymbolLibID = symbolLibManager.getSymbolLibID(0);
            equal(getSymbolLibID, 22, "Function:getSymbolLibID");
            start();
            symbolLibManager.events.un({"initializeCompleted": complete});
        }, 200);
    }
});

asyncTest("testSymbolLibManager_getSymbolLibByIndex", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            symbolLibs = symbolLibManager.getSymbolLibByIndex(0);
            equal(symbolLibs.libID, 22, "Function:getSymbolLibByIndex");
            start();
            symbolLibManager.events.un({"initializeCompleted": complete});
        }, 200);
    }
});

asyncTest("testSymbolLibManager_getSymbolLibByLibId", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            getSymbolLibByLibId = symbolLibManager.getSymbolLibByLibId(421);
            equal(getSymbolLibByLibId.libID, 421, "Function:getSymbolLibByLibId");
            start();
            symbolLibManager.events.un({"initializeCompleted": complete});
        }, 200);
    }
});

asyncTest("testSymbolLibManager_findSymbolByName", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            var result = symbolLibManager.findSymbolByName("常住人口");
            equal(result[0].symbolCode, 10100, "Function:findSymbolByName");
            start();
        }, 200);
    }
});

asyncTest("testSymbolLibManager_findSymbolByCode", function () {
    getSymbolLibManager(complete);
    function complete() {
        setTimeout(function () {
            var result = symbolLibManager.findSymbolByCode(10100);
            equal(result[0].symbolCode, 10100, "Function:findSymbolByCode");
            start();
        }, 200);
    }
});

