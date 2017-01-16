module("UpdateEdgeWeightResult");

test("TestDefaultConstructor", function() {
    expect(1);
    var myUpdateEdgeWeightResult;
    myUpdateEdgeWeightResult = new SuperMap.REST.UpdateEdgeWeightResult();
    ok(myUpdateEdgeWeightResult.updateResult == null, "updateResult");
});

test("TestConstructor", function() {
    expect(1);
    var myUpdateEdgeWeightResult;
    var updateResult = {};
    myUpdateEdgeWeightResult = new SuperMap.REST.UpdateEdgeWeightResult({
        "updateResult": updateResult
    });
    equal(myUpdateEdgeWeightResult.updateResult, updateResult, "updateResult");
    myUpdateEdgeWeightResult.destroy();
});

test("TestDestructor", function() {
    expect(1);
    var myUpdateEdgeWeightResult;
    myUpdateEdgeWeightResult = new SuperMap.REST.UpdateEdgeWeightResult({
        updateResult: {}
    });
    myUpdateEdgeWeightResult.destroy();
    ok(myUpdateEdgeWeightResult.updateResult == null, "updateResult");
});

test("TestDefaultConstructor_fromJson_null", function() {
    var myUpdateEdgeWeightResult;
    myUpdateEdgeWeightResult = SuperMap.REST.UpdateEdgeWeightResult.fromJson();
    equal(myUpdateEdgeWeightResult,undefined, "UpdateEdgeWeightResult");
});