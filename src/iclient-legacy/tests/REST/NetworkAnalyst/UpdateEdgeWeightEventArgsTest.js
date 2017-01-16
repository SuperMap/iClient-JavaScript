module("UpdateEdgeWeightEventArgs");

test("TestDefaultConstructor", function() {
    expect(2);
    var myUpdateEdgeWeightEventArgs;
    myUpdateEdgeWeightEventArgs = new SuperMap.REST.UpdateEdgeWeightEventArgs();
    ok(myUpdateEdgeWeightEventArgs.result == null, "result");
    ok(myUpdateEdgeWeightEventArgs.originResult == null, "originResult");
    myUpdateEdgeWeightEventArgs.destroy();
});

test("TestConstructor", function() {
    expect(2);
    var myUpdateEdgeWeightResult = new SuperMap.REST.UpdateEdgeWeightResult({
            updateResult:{}
        }),
        jsonObject = {},
        myUpdateEdgeWeightEventArgs = new SuperMap.REST.UpdateEdgeWeightEventArgs(myUpdateEdgeWeightResult, jsonObject);
    equal(myUpdateEdgeWeightEventArgs.result, myUpdateEdgeWeightResult, "result");
    equal(myUpdateEdgeWeightEventArgs.originResult, jsonObject, "originResult");
    myUpdateEdgeWeightResult.destroy();
    myUpdateEdgeWeightEventArgs.destroy();
});

test("TestDestructor", function() {
    expect(2);
    var myUpdateEdgeWeightResult = new SuperMap.REST.UpdateEdgeWeightResult({
            updateResult:{succeed:true}
        }),
        jsonObject = {},
        myUpdateEdgeWeightEventArgs = new SuperMap.REST.UpdateEdgeWeightEventArgs(myUpdateEdgeWeightResult, jsonObject);
    myUpdateEdgeWeightEventArgs.destroy();
    ok(myUpdateEdgeWeightEventArgs.result == null, "result");
    ok(myUpdateEdgeWeightEventArgs.originResult == null, "originResult");
    myUpdateEdgeWeightResult.destroy();
});