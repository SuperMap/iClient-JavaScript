module("EditSmlFileParametersTest");

test("DefaultConstructor_Test", function () {
    var editSmlFileParameters = new SuperMap.REST.EditSmlFileParameters();
    ok(editSmlFileParameters != null, "editSmlFileParameters is not null");
    ok(editSmlFileParameters.method == "POST", "default editSmlFileParameters.method is POST");
    ok(editSmlFileParameters.sitData == null, "default editSmlFileParameters.sitData is null");
});

test("Constructor_for_sitData", function(){
    var editSmlFileParameters = new SuperMap.REST.EditSmlFileParameters({sitData : {
        "smlInfo": {
            "SMLName": "",
            "SMLDesc": "",
            "SMLDepat": "",
            "SMLAuthor": "",
            "SMLTime": "",
            "SMLSeclevel": ""
        }, "layerDatas": []
    }});

    ok(editSmlFileParameters !== null, "editSmlFileParameters is not null");
    ok(editSmlFileParameters.method == "POST", "editSmlFileParameters.method is POST");
    ok(editSmlFileParameters.sitData != null, "editSmlFileParameters.sitData is not null");

    var jsonParameters = SuperMap.REST.EditSmlFileParameters.toJsonParameters(editSmlFileParameters);
    equal("{\"smlInfo\":{\"SMLName\":\"\",\"SMLDesc\":\"\",\"SMLDepat\":\"\",\"SMLAuthor\":\"\",\"SMLTime\":\"\",\"SMLSeclevel\":\"\"},\"layerDatas\":[]}",jsonParameters,"editSmlFileParameters.jsonParameters while delete");

    editSmlFileParameters.destroy();
    ok(editSmlFileParameters != null, "editSmlFileParameters is not null");
    ok(editSmlFileParameters.method == "POST", "editSmlFileParameters.method is POST");
    ok(editSmlFileParameters.sitData == null, "editSmlFileParameters.sitData is null");
});