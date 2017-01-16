module("dataReturnOption");

//测试使用默认参数值的有效性
test("TestDefaultConstructor", function () {
    expect(9);

    var dataReturnOption;
    dataReturnOption = new SuperMap.REST.DataReturnOption();

    ok(dataReturnOption != null, "not null");
    equal(dataReturnOption.expectCount, 1000, "dataReturnOption.expectCount");
    equal(dataReturnOption.dataset, null, "dataReturnOption.dataset");
    equal(dataReturnOption.dataReturnMode, SuperMap.REST.DataReturnMode.RECORDSET_ONLY, "dataReturnOption.dataReturnMode");
    equal(dataReturnOption.deleteExistResultDataset, true, "dataReturnOption.deleteExistResultDataset");
    
    dataReturnOption.destroy();
    equal(dataReturnOption.expectCount, null, "dataReturnOption.expectCount");
    equal(dataReturnOption.dataset, null, "dataReturnOption.dataset");
    equal(dataReturnOption.dataReturnMode, null, "dataReturnOption.dataReturnMode");
    equal(dataReturnOption.deleteExistResultDataset, null, "dataReturnOption.deleteExistResultDataset");
});
test("TestConstructor", function () {
    expect();
    
    var dataReturnOption;
    dataReturnOption = new SuperMap.REST.DataReturnOption({
        expectCount: -1,
        dataset: "point@world",
        dataReturnMode: SuperMap.REST.DataReturnMode.DATASET_AND_RECORDSET,
        deleteExistResultDataset: false    
    });
    
    ok(dataReturnOption != null, "not null");
    equal(dataReturnOption.expectCount, -1, "dataReturnOption.expectCount");
    equal(dataReturnOption.dataset, "point@world", "dataReturnOption.dataset");
    equal(dataReturnOption.dataReturnMode, SuperMap.REST.DataReturnMode.DATASET_AND_RECORDSET, "dataReturnOption.dataReturnMode");
    equal(dataReturnOption.deleteExistResultDataset, false, "dataReturnOption.deleteExistResultDataset");
    
    dataReturnOption.destroy();
    equal(dataReturnOption.expectCount, null, "dataReturnOption.expectCount");
    equal(dataReturnOption.dataset, null, "dataReturnOption.dataset");
    equal(dataReturnOption.dataReturnMode, null, "dataReturnOption.dataReturnMode");
    equal(dataReturnOption.deleteExistResultDataset, null, "dataReturnOption.deleteExistResultDataset");
});