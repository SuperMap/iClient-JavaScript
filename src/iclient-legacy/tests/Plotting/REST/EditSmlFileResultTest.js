module("EditSmlFileResult");

test("EditSmlFileResult_Test", function () {
    var resourceInfo =  {
        "smlInfo": {
            "SMLName": "",
            "SMLDesc": "",
            "SMLDepat": "",
            "SMLAuthor": "",
            "SMLTime": "",
            "SMLSeclevel": ""
        }, "layerDatas": []
    };
    var editSmlFileResult = new SuperMap.REST.EditSmlFileResult({resourceInfo:resourceInfo});
    ok(editSmlFileResult !== null, "not null");
    equal(editSmlFileResult.resourceInfo,resourceInfo,"editSmlFileResult.resourceInfo");

    editSmlFileResult.destroy();
    ok(editSmlFileResult !== null, "not null");
    ok(editSmlFileResult.resourceInfo === null,"editSmlFileResult.resourceInfo");

    ok(SuperMap.REST.EditSmlFileResult.fromJson(null) === undefined,"SuperMap.REST.EditSmlFileResult.fromJson");
    equal(SuperMap.REST.EditSmlFileResult.fromJson(resourceInfo).resourceInfo, resourceInfo, "SuperMap.REST.EditSmlFileResult.fromJson");
});




