module("ComputeWeightMatrixEventArgs");
    
test("TestDefaultConstructor", function() {
    expect(2);
    var computeWeightMatrixEventArgs;
    computeWeightMatrixEventArgs = new SuperMap.REST.ComputeWeightMatrixEventArgs();
    ok(computeWeightMatrixEventArgs.result == null, "result");
    ok(computeWeightMatrixEventArgs.originResult == null, "originResult");
});

test("TestConstructor", function() {
    expect(2);
    var weightMatrix = [],
        computeWeightMatrixResult = new SuperMap.REST.ComputeWeightMatrixResult({weightMatrix: weightMatrix}),
        jsonObject = {},
        computeWeightMatrixEventArgs = new SuperMap.REST.ComputeWeightMatrixEventArgs(computeWeightMatrixResult, jsonObject);
    equal(computeWeightMatrixEventArgs.result, computeWeightMatrixResult, "result");
    equal(computeWeightMatrixEventArgs.originResult, jsonObject, "originResult");
});

test("TestDestructor", function() {
    expect(2);
    var weightMatrix = [],
        computeWeightMatrixResult = new SuperMap.REST.ComputeWeightMatrixResult({weightMatrix: weightMatrix}),
        jsonObject = {},
        computeWeightMatrixEventArgs = new SuperMap.REST.ComputeWeightMatrixEventArgs(computeWeightMatrixResult, jsonObject);
    computeWeightMatrixEventArgs.destroy();
    ok(computeWeightMatrixEventArgs.result == null, "result");
    ok(computeWeightMatrixEventArgs.originResult == null, "originResult");
});