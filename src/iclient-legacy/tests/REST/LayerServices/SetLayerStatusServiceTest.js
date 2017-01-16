module('SetLayerStatusService');
test("testSetLayerStatusService_Constructor",function(){
    var url="http://localhost:8090/iserver/services/map-world/rest/maps/World";
    var SetLayerStatusService=new SuperMap.REST.SetLayerStatusService(url,{eventListeners:{"processCompleted":this.setLayerComplted}});

    equals(SetLayerStatusService.mapUrl,url,"property:mapUrl");
    ok(SetLayerStatusService.events != null, "SetLayerStatusService.events");
    ok(SetLayerStatusService.eventListeners != null, "SetLayerStatusService.eventListeners");

    SetLayerStatusService.destroy();
    ok(SetLayerStatusService != null, "not null");
    ok(SetLayerStatusService.events == null, "SetLayerStatusService.events");
    ok(SetLayerStatusService.eventListeners == null, "SetLayerStatusService.eventListeners");
    ok(SetLayerStatusService.lastResult == null, "SetLayerStatusService.lastResult");
    ok(SetLayerStatusService.lastparams == null, "SetLayerStatusService.lastResult");
    ok(SetLayerStatusService.mapUrl == null, "SetLayerStatusService.lastResult");

});
test("testSetLayerStatusService_destroy",function(){
    expect(6);
    var url="http://localhost:8090/iserver/services/map-world/rest/maps/World";
    var SetLayerStatusService=new SuperMap.REST.SetLayerStatusService(url,{eventListeners:{"processCompleted":this.setLayerComplted}});
    SetLayerStatusService.destroy();
    ok(SetLayerStatusService != null, "not null");
    ok(SetLayerStatusService.events == null, "SetLayerStatusService.events");
    ok(SetLayerStatusService.eventListeners == null, "SetLayerStatusService.eventListeners");
    ok(SetLayerStatusService.lastResult == null, "SetLayerStatusService.lastResult");
    ok(SetLayerStatusService.lastparams == null, "SetLayerStatusService.lastResult");
    ok(SetLayerStatusService.mapUrl == null, "SetLayerStatusService.lastResult");
});
//processAsync没有参数的时候
test("testSetLayerStatusService_processAsync1",function(){
    expect(2);
    var url="http://localhost:8090/iserver/services/map-world/rest/maps/World";
    var setLayerStatusService=new SuperMap.REST.SetLayerStatusService(url);

    setLayerStatusService.processAsync();
    ok(setLayerStatusService.lastResult == null, "SetLayerStatusService.lastResult");
    ok(setLayerStatusService.lastparams == null, "SetLayerStatusService.lastResult");
    setLayerStatusService.destroy();

});
//processAsyn有参数的时候，没有resourceID属性、
asyncTest("testSetLayerStatusService_processAsync2",function(){
    expect(2);
    var url="http://localhost:8090/iserver/services/map-world/rest/maps/World";
    var setLayerStatusService=new SuperMap.REST.SetLayerStatusService(url);

    var params1=new SuperMap.REST.SetLayerStatusParameters();
    var layerStatus = new SuperMap.REST.LayerStatus();
    layerStatus.layerName = "super";
    layerStatus.isVisible = true;
    params1.layerStatusList.push(layerStatus);
    setLayerStatusService.events.on({"processCompleted":processCompleted});
    setLayerStatusService.processAsync(params1);

    function processCompleted(createTempLayerEventArgs){
        setLayerStatusService.events.un({"processCompleted":processCompleted});
        _resourceID=createTempLayerEventArgs.result.newResourceID;
        ok(setLayerStatusService.lastResult != null, "SetLayerStatusService.lastResult");
        ok(setLayerStatusService.lastparams != null, "SetLayerStatusService.lastparams");
        params1.destroy();
        setLayerStatusService.destroy();
        start();
    }

});

test("testSetLayerStatusService_getMapName",function(){
    expect(1);
    var url="http://localhost:8090/iserver/services/map-world/rest/maps/World";
    var SetLayerStatusService=new SuperMap.REST.SetLayerStatusService(url);
    var name=SetLayerStatusService.getMapName(url);
    equals(name,"World","function:getMapName");
    SetLayerStatusService.destroy();
});


