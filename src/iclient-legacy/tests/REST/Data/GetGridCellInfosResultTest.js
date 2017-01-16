module("GetGridCellInfosResult");

test("TestGetGridCellInfosResult_Constructor", function() {
    expect(4);

    var result = new SuperMap.REST.GetGridCellInfosResult({
        column: 10,
        row: 5,
        value: 1222
    });

    equal(result.CLASS_NAME, "SuperMap.REST.GetGridCellInfosResult", "GetGridCellInfosResult_Constructor");
    equal(result.column, 10, "GetGridCellInfosResult_Constructor");
    equal(result.row, 5, "GetGridCellInfosResult_Constructor");
    equal(result.value, 1222, "GetGridCellInfosResult_Constructor");
});

test("TestGetGridCellInfosResult_Destroy", function() {
    expect(3);

    var result = new SuperMap.REST.GetGridCellInfosResult({
        column: 10,
        row: 5,
        value: 1222
    });
    result.destroy();

    equal(result.column, null, "GetGridCellInfosResult_Constructor");
    equal(result.row, null, "GetGridCellInfosResult_Constructor");
    equal(result.value, null, "GetGridCellInfosResult_Constructor");
});

test("TestGetGridCellInfosResult_FromJson", function() {
    expect(4);

    var jsonObj = {
        column: 10,
        row: 5,
        value: 1222
    };
    var result = SuperMap.REST.GetGridCellInfosResult.fromJson(jsonObj);

    equal(result.CLASS_NAME, "SuperMap.REST.GetGridCellInfosResult", "GetGridCellInfosResult_FromJson");
    equal(result.column, 10, "GetGridCellInfosResult_Constructor");
    equal(result.row, 5, "GetGridCellInfosResult_Constructor");
    equal(result.value, 1222, "GetGridCellInfosResult_Constructor");
});