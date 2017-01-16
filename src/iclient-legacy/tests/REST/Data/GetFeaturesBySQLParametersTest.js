module("GetFeaturesBySQLParameters");

test("DefaultConstructor_Test",function(){
    var getFeaturesParameters;
    getFeaturesParameters = new SuperMap.REST.GetFeaturesBySQLParameters();
    ok(getFeaturesParameters !== null, "not null" );
    ok(getFeaturesParameters.datasetNames === null, "getFeaturesParameters.datasetNames is null");
    equal(getFeaturesParameters.returnContent, true, "getFeaturesParameters.returnContent");
    equal(getFeaturesParameters.fromIndex, 0, "getFeaturesParameters.fromIndex");
    equal(getFeaturesParameters.toIndex, 19, "getFeaturesParameters.toIndex");
    equal(getFeaturesParameters.getFeatureMode, "SQL", "getFeaturesParameters.getFeatureMode");
    ok(getFeaturesParameters.queryParameter === null, "getFeaturesParameters.queryParameter is null")
});

test("Constructor_Test",function(){
    var getFeaturesParameters,
        datasetNames = ["World:Countries"],
        queryParas = new SuperMap.REST.FilterParameter();
    getFeaturesParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:datasetNames,
        returnContent:true,
        fromIndex:2,
        toIndex:30,
        queryParameter:queryParas
    });
    ok(getFeaturesParameters !== null, "not null" );
    equal(getFeaturesParameters.returnContent,true,"getFeaturesParameters.returnContent");
    equal(getFeaturesParameters.fromIndex,2,"getFeaturesParameters.fromIndex");
    equal(getFeaturesParameters.toIndex,30,"getFeaturesParameters.toIndex");
    equal(getFeaturesParameters.datasetNames,datasetNames,"getFeaturesParameters.datasetNames");
    equal(getFeaturesParameters.queryParameter, queryParas,"getFeaturesParameters.queryParameter"); 
});

/**
    使用部分参数构建GetFeaturesBySQLParameters对象时,应该将其余参数置为默认值
*/
test("Constructor_TestPart",function(){
    var getFeaturesParameters,
        datasetNames = ["World:Countries"],
        queryParas = new SuperMap.REST.FilterParameter();
    getFeaturesParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:datasetNames,
        queryParameter:queryParas
    });
    ok(getFeaturesParameters !== null, "not null" );
    equal(getFeaturesParameters.returnContent,true,"getFeaturesParameters.returnContent");
    equal(getFeaturesParameters.fromIndex,0,"getFeaturesParameters.fromIndex");
    equal(getFeaturesParameters.toIndex,19,"getFeaturesParameters.toIndex");
    equal(getFeaturesParameters.datasetNames,datasetNames,"getFeaturesParameters.datasetNames");
    equal(getFeaturesParameters.queryParameter, queryParas,"getFeaturesParameters.queryParameter");
});

test("Deconstructor_Test",function(){
    var getFeaturesParameters,
        datasetNames = ["World:Countries"];
    getFeaturesParameters = new SuperMap.REST.GetFeaturesBySQLParameters({
        datasetNames:datasetNames,
        returnContent:true,
        fromIndex:2,
        toIndex:30,
        queryParameter: new SuperMap.REST.FilterParameter()
    });
    getFeaturesParameters.destroy();
    ok(getFeaturesParameters !== null, "not null" );
    ok(getFeaturesParameters.returnContent === null,"getFeaturesParameters.returnContent");
    ok(getFeaturesParameters.fromIndex === null,"getFeaturesParameters.fromIndex");
    ok(getFeaturesParameters.toIndex ===null ,"getFeaturesParameters.toIndex");
    ok(getFeaturesParameters.datasetNames === null,"getFeaturesParameters.datasetNames");
    ok(getFeaturesParameters.queryParameter === null,"getFeaturesParameters.queryParameter");
});
