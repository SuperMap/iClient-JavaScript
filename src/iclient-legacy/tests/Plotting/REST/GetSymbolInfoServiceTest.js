module("GetSymbolInfoService");

function initGetSymbolInfoService() {
    return new SuperMap.REST.GetSymbolInfoService(GlobeParameter.plotUrl, {
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
    function succeed(event) {

    }

    function failed(event) {

    }
}

asyncTest("GetSymbolInfoService_success", function () {
    var getSymbolInfoService = initGetSymbolInfoService();
    var getSymbolInfoParameters = new SuperMap.REST.GetSymbolInfoParameters({libID:421,code:10100});
    getSymbolInfoService.processAsync(getSymbolInfoParameters);

    setTimeout(function () {
        try {
            var lastResult = getSymbolInfoService.lastResult;
            ok(lastResult != null, "getSymbolInfoService.lastResult");
            ok(lastResult.resourceInfo.libID === 421, "lastResult.resourceInfo.libID");
            ok(lastResult.resourceInfo.code === 10100, "lastResult.resourceInfo.code");

            getSymbolInfoService.destroy();
            ok(getSymbolInfoService.events == null, "getSymbolInfoService.events is null");
            ok(getSymbolInfoService.lastResult == null, "getSymbolInfoService.lastResult is null");
            ok(getSymbolInfoService.eventListeners == null, "getSymbolInfoService.eventListeners is null");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
        }
    }, 6000);
});