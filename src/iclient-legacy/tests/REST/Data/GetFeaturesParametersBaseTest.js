module("GetFeaturesParametersBase");

test("DefaultConstructor_Test",function(){
    var getFeaturesParameters;
    getFeaturesParameters = new SuperMap.REST.GetFeaturesParametersBase();
    ok(getFeaturesParameters !== null, "not null" );
    ok(getFeaturesParameters.datasetNames === null,"getFeaturesParameters.datasetNames is null");
    equal(getFeaturesParameters.returnContent,true,"getFeaturesParameters.returnContent");
    equal(getFeaturesParameters.fromIndex,0,"getFeaturesParameters.fromIndex");
    equal(getFeaturesParameters.toIndex,19,"getFeaturesParameters.toIndex");
});

test("Constructor_Test",function(){
    var getFeaturesParameters,
	    datasetNames = ["World:Countries"];
    getFeaturesParameters = new SuperMap.REST.GetFeaturesParametersBase({
        datasetNames:datasetNames,
        returnContent:false,
        fromIndex:1,
        toIndex:200
    });
    ok(getFeaturesParameters !== null, "not null" );
    equal(getFeaturesParameters.datasetNames, datasetNames,"getFeaturesParameters.datasetNames");
    equal(getFeaturesParameters.returnContent,false,"getFeaturesParameters.returnContent");
    equal(getFeaturesParameters.fromIndex,1,"getFeaturesParameters.fromIndex");
    equal(getFeaturesParameters.toIndex,200,"getFeaturesParameters.toIndex");
});

test("Deconstructor_Test",function(){
    var getFeaturesParameters,
	    datasetNames = ["World:Countries"];
    getFeaturesParameters = new SuperMap.REST.GetFeaturesParametersBase({
        datasetNames:datasetNames,
        returnContent:false,
        fromIndex:1,
        toIndex:200
    });
	getFeaturesParameters.destroy();
    ok(getFeaturesParameters !== null, "not null" );
    equal(getFeaturesParameters.datasetNames, null,"getFeaturesParameters.datasetNames");
    equal(getFeaturesParameters.returnContent,null,"getFeaturesParameters.returnContent");
    equal(getFeaturesParameters.fromIndex,null,"getFeaturesParameters.fromIndex");
    equal(getFeaturesParameters.toIndex,null,"getFeaturesParameters.toIndex");
});
