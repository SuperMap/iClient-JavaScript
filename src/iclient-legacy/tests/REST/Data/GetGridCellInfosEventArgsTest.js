module("GetGridCellInfosEventArgs");

test("TestGetGridCellInfosEventArgs_Constructor", function() {
    expect(2);

    var result = new SuperMap.REST.GetGridCellInfosResult({
        column: 10,
        row: 5,
        value: 1222
    });

    var eventArgs = new SuperMap.REST.GetGridCellInfosEventArgs(result, result);

    equal(eventArgs.CLASS_NAME, "SuperMap.REST.GetGridCellInfosEventArgs", "TestGetGridCellInfosEventArgs_Constructor");
    equal(eventArgs.result.row, 5, "TestGetGridCellInfosEventArgs_Constructor");
});

test("TestGetGridCellInfosEventArgs_Destroy", function() {
    expect(1);

    var result = new SuperMap.REST.GetGridCellInfosResult({
        column: 10,
        row: 5,
        value: 1222
    });

    var eventArgs = new SuperMap.REST.GetGridCellInfosEventArgs(result, result);
    eventArgs.destroy();
    equal(eventArgs.result, null, "TestGetGridCellInfosEventArgs_Destroy");
});