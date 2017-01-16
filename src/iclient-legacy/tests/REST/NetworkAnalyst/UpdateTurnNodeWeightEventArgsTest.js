module("UpdateTurnNodeWeightEventArgs");

test("TestDefaultConstructor", function() {
    expect(2);
    var myUpdateTurnNodeWeightEventArgs;
    myUpdateTurnNodeWeightEventArgs = new SuperMap.REST.UpdateTurnNodeWeightEventArgs();
    ok(myUpdateTurnNodeWeightEventArgs.result == null, "result");
    ok(myUpdateTurnNodeWeightEventArgs.originResult == null, "originResult");
    myUpdateTurnNodeWeightEventArgs.destroy();
});

test("TestConstructor", function() {
    expect(2);
    var myUpdateTurnNodeWeightResult = new SuperMap.REST.UpdateTurnNodeWeightResult({
            updateResult:{}
        }),
        jsonObject = {},
        myUpdateTurnNodeWeightEventArgs = new SuperMap.REST.UpdateTurnNodeWeightEventArgs(myUpdateTurnNodeWeightResult, jsonObject);
    equal(myUpdateTurnNodeWeightEventArgs.result, myUpdateTurnNodeWeightResult, "result");
    equal(myUpdateTurnNodeWeightEventArgs.originResult, jsonObject, "originResult");
    myUpdateTurnNodeWeightEventArgs.destroy();
});

test("TestDestructor", function() {
    expect(2);
    var myUpdateTurnNodeWeightResult = new SuperMap.REST.UpdateTurnNodeWeightResult({
            updateResult:{}
        }),
        jsonObject = {},
        myUpdateTurnNodeWeightEventArgs = new SuperMap.REST.UpdateTurnNodeWeightEventArgs(myUpdateTurnNodeWeightResult, jsonObject);
    myUpdateTurnNodeWeightEventArgs.destroy();
    ok(myUpdateTurnNodeWeightEventArgs.result == null, "result");
    ok(myUpdateTurnNodeWeightEventArgs.originResult == null, "originResult");
});