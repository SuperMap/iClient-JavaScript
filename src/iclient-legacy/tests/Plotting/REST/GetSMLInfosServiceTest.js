module("GetSMLInfosService");

function initGetSMLInfosService() {
    return new SuperMap.REST.GetSMLInfosService(GlobeParameter.plotUrl, {
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

asyncTest("GetSMLInfosService_success", function () {
    var getSMLInfosService = initGetSMLInfosService();
    var getSMLInfosParameters = new SuperMap.REST.GetSMLInfosParameters({start:1, count:1});
    getSMLInfosService.processAsync(getSMLInfosParameters);

    setTimeout(function () {
        try {
            var lastResult = getSMLInfosService.lastResult;
            ok(lastResult.length !== 0, "getSMLInfosService.lastResult");

            getSMLInfosService.destroy();
            ok(getSMLInfosService.events == null, "service.events");
            ok(getSMLInfosService.lastResult == null, "service.lastResult");
            ok(getSMLInfosService.eventListeners == null, "service.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message)
            start();
        }
    },6000);
});