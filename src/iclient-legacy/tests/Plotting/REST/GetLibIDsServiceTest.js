module("GetLibIDsService");

function initGetLibIDsService() {
    return new SuperMap.REST.GetLibIDsService(GlobeParameter.plotUrl, {
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

asyncTest("GetLibIDsService_success", function () {

    var getLibIDsService = initGetLibIDsService();
    ok(getLibIDsService !== null, 'not null');
    getLibIDsService.processAsync();

    setTimeout(function () {
        try {
            var lastResult = getLibIDsService.lastResult;
            ok(lastResult != null, "getLibIDsService.lastResult");
            ok(lastResult.resourceInfo != null, "lastResult.resourceInfo");

            getLibIDsService.destroy();
            ok(getLibIDsService != null, "getLibIDsService not null");
            ok(getLibIDsService.EVENT_TYPES == null, "getLibIDsService.EVENT_TYPES");
            ok(getLibIDsService.lastResult == null, "getLibIDsService.lastResult");
            ok(getLibIDsService.eventListeners == null, "getLibIDsService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
        }
    }, 6000);
});
