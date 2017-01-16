module("EditSmlFileService");

var serviceFailedEventArgsSystem = null,
    editSmlFileEventArgsSystem = null;

function initEditSmlFileService() {
    return new SuperMap.REST.EditSmlFileService(GlobeParameter.plotUrl, {
        smlFileName: 'newPlot',
        eventListeners: {
            processCompleted: succeed,
            processFailed: failed
        }
    });

    function succeed(event) {
        editSmlFileEventArgsSystem = event;
    }

    function failed(event) {
        serviceFailedEventArgsSystem = event;
    }
}

asyncTest("EditSmlFileService_success_POST)", function () {
    var editSmlFileService = initEditSmlFileService();
    var editSmlFileParameters = new SuperMap.REST.EditSmlFileParameters({sitData: {
        "smlInfo": {
            "fieldRootName": "",
            "fieldRootDesc": "态势图",
            "fieldRootDepat": "",
            "fieldRootAuthor": "",
            "fieldRootTime": "",
            "fieldExtName": "",
            "fieldExtType": "",
            "fieldExtLength": 0,
            "FieldExtValue": 0
        }, "layerDatas": []
    }});
    editSmlFileService.processAsync(editSmlFileParameters);

    setTimeout(function () {
        try {
            var editSmlFileResult = editSmlFileService.lastResult;
            ok(editSmlFileResult !== null, "editSmlFileService.lastResult");
            ok(editSmlFileResult.resourceInfo !== null,"editSmlFileResult.resourceInfo");
            ok(editSmlFileResult.resourceInfo.succeed == true,"editSmlFileResult.resourceInfo.succeed");

            editSmlFileService.destroy();
            ok(editSmlFileService.events == null, "editSmlFileService.events");
            ok(editSmlFileService.lastResult == null, "editSmlFileService.lastResult");
            ok(editSmlFileService.eventListeners == null, "editSmlFileService.eventListeners");
            start();
        } catch (excepion) {
            ok(false, "exception occcurs,message is:" + excepion.message);
            start();
        }
    }, 6000)
});