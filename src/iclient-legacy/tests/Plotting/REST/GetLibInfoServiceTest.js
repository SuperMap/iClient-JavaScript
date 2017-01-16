module("GetLibInfoService");

function initGetLibInfoService() {
    return new SuperMap.REST.GetLibInfoService(GlobeParameter.plotUrl, {
        libID: 421, eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });
    function succeed(event) {

    }

    function failed(event) {

    }
}

asyncTest("GetLibInfoService_success", function () {
    var getLibInfoService = initGetLibInfoService();
    ok(getLibInfoService != null, "not null");
    getLibInfoService.processAsync();

    setTimeout(function () {
        try {
            var lastResult = getLibInfoService.lastResult;
            ok(lastResult != null, "getLibInfosService.lastResult");
            ok(lastResult.resourceInfo != null, "lastResult.resourceInfo");
            getLibInfoService.destroy();
            ok(getLibInfoService.EVENT_TYPES == null, "getLibInfosService.EVENT_TYPES");
            ok(getLibInfoService.lastResult == null, "getLibInfosService.lastResult");
            ok(getLibInfoService.eventListeners == null, "getLibInfosService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
        }
    }, 6000);
});
