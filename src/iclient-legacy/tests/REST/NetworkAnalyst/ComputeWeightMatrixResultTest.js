module("ComputeWeightMatrixResult");
    
test("TestDefaultConstructor", function() {
    expect(1);
    var computeWeightMatrixResult;
    computeWeightMatrixResult = new SuperMap.REST.ComputeWeightMatrixResult();
    ok(computeWeightMatrixResult.weightMatrix == null, "weightMatrix");
});

test("TestConstructor", function() {
    expect(1);
    var weightMatrix = [];
    var computeWeightMatrixResult;
    computeWeightMatrixResult = new SuperMap.REST.ComputeWeightMatrixResult({weightMatrix: weightMatrix});
    equal(computeWeightMatrixResult.weightMatrix, weightMatrix, "weightMatrix");
});

test("TestDestructor", function() {
    expect(1);
    var weightMatrix = [];
    var computeWeightMatrixResult;
    computeWeightMatrixResult = new SuperMap.REST.ComputeWeightMatrixResult({weightMatrix: weightMatrix});
    computeWeightMatrixResult.destroy();
    ok(computeWeightMatrixResult.weightMatrix == null, "weightMatrix");
});

//测试jsonObject为null时的健壮性
test("TestFromJson",function(){
    var jsonObject;
    var computeWeightMatrixResult = SuperMap.REST.ComputeWeightMatrixResult.fromJson(jsonObject);
    ok(computeWeightMatrixResult == null, "computeWeightMatrixResult");
});