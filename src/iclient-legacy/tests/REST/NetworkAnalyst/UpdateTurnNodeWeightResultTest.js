module("UpdateTurnNodeWeightResult");

test("TestDefaultConstructor", function() {
    expect(1);
    var myUpdateTurnNodeWeightResult;
    myUpdateTurnNodeWeightResult = new SuperMap.REST.UpdateTurnNodeWeightResult();
    ok(myUpdateTurnNodeWeightResult.updateResult == null, "updateResult");
    myUpdateTurnNodeWeightResult.destroy();
});

test("TestConstructor", function() {
    expect(1);
    var myUpdateTurnNodeWeightResult;
    var updateResult = {};
    myUpdateTurnNodeWeightResult = new SuperMap.REST.UpdateTurnNodeWeightResult({
        "updateResult": updateResult
    });
    equal(myUpdateTurnNodeWeightResult.updateResult, updateResult, "updateResult");
    myUpdateTurnNodeWeightResult.destroy();
});

test("TestDestructor", function() {
    expect(1);
    var myUpdateTurnNodeWeightResult;
    myUpdateTurnNodeWeightResult = new SuperMap.REST.UpdateTurnNodeWeightResult({
        updateResult: {}
    });
    myUpdateTurnNodeWeightResult.destroy();
    ok(myUpdateTurnNodeWeightResult.updateResult == null, "updateResult");
});

test("TestDefaultConstructor_fromJson_null", function() {
    var myUpdateTurnNodeWeightResult;
    myUpdateTurnNodeWeightResult = SuperMap.REST.UpdateTurnNodeWeightResult.fromJson();
    equal(myUpdateTurnNodeWeightResult,undefined, "UpdateTurnNodeWeightResult");
});