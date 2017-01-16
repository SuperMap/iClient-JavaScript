module("DemandResult");

test("TestDefaultConstructor",function(){
    expect(4);
    var demandResult = new SuperMap.REST.DemandResult();
    ok(demandResult.actualResourceValue == null, "actualResourceValue");
    ok(demandResult.demandID == null, "demandID");
    ok(demandResult.isEdge == null, "isEdge");    
    ok(demandResult.supplyCenter == null, "supplyCenter");      
});

test("TestConstructor",function(){
    expect(4);
    var demandResult = new SuperMap.REST.DemandResult({
        actualResourceValue: 10,
        demandID: 5,
        isEdge: true
    });
    ok(demandResult.actualResourceValue == 10, "actualResourceValue");
    equal(demandResult.demandID, 5, "demandID");
    equal(demandResult.isEdge, true, "isEdge");    
    ok(demandResult.supplyCenter == null, "supplyCenter");     
});

test("TestConstructor_fromJson",function(){
    var demandResult = SuperMap.REST.DemandResult.fromJson({"supplyCenter":{"nodeID":293,"maxWeight":1000,"resourceValue":1000,"type":"FIXEDCENTER"},"demandID":21,"isEdge":false,"fieldNames":["SMID","SMX","SMY","SMUSERID","SMLIBTILEID","SMNODEID"],"actualResourceValue":967.4290458857819,"ID":21,"fieldValues":["21","444216.30352247454","4417232.752091915","0","1","21"]});
    equal(demandResult.geometry, null, "geometry");   
});
