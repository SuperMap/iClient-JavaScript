module("GetGridCellInfosParameter");

test("TestGetGridInfosParameter_Constructor", function() {
    expect(5);

    var param = new SuperMap.REST.GetGridCellInfosParameter({
        datasetName: "LandCover",
        dataSourceName: "World",
        X: "110",
        Y: "50"
    });
    
    equal(param.CLASS_NAME, "SuperMap.REST.GetGridCellInfosParameter", "TestGetGridInfosParameter_Constructor");
    equal(param.datasetName, "LandCover", "TestGetGridInfosParameter_Constructor");
    equal(param.dataSourceName, "World", "TestGetGridInfosParameter_Constructor");
    equal(param.X, "110", "TestGetGridInfosParameter_Constructor");
    equal(param.Y, "50", "TestGetGridInfosParameter_Constructor");
});

test("TestGetGridInfosParameter_Destroy", function() {
    expect(4);
    
    var param = new SuperMap.REST.GetGridCellInfosParameter({
        datasetName: "LandCover",
        dataSourceName: "World",
        X: "110",
        Y: "50"
    });

    param.destroy();

    equal(param.datasetName, null, "TestGetGridInfosParameter_Destroy");
    equal(param.dataSourceName, null, "TestGetGridInfosParameter_Destroy");
    equal(param.X, null, "TestGetGridInfosParameter_Destroy");
    equal(param.Y, null, "TestGetGridInfosParameter_Destroy");
});