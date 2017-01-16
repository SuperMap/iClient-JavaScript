module("UpdateEdgeWeightParameters");

test("TestDefaultConstructor",function(){
    expect(5);
    var myUpdateEdgeWeightParameters;
    myUpdateEdgeWeightParameters=new SuperMap.REST.UpdateEdgeWeightParameters();
    equal(myUpdateEdgeWeightParameters.edgeId,"","edgeId");
    equal(myUpdateEdgeWeightParameters.fromNodeId,"","fromNodeId");
    equal(myUpdateEdgeWeightParameters.toNodeId,"","toNodeId");
    equal(myUpdateEdgeWeightParameters.weightField,"","weightField");
    equal(myUpdateEdgeWeightParameters.edgeWeight,"","edgeWeight");
    myUpdateEdgeWeightParameters.destroy();
});

test("TestConstructor",function(){
    expect(5);
    var edgeId="",fromNodeId="",toNodeId="",weightField="",edgeWeight="";
    updateMsg={
        edgeId:edgeId,
        fromNodeId:fromNodeId,
        toNodeId:toNodeId,
        weightField:weightField,
        edgeWeight:edgeWeight
    };
    var myUpdateEdgeWeightParameters;
    myUpdateEdgeWeightParameters=new SuperMap.REST.UpdateEdgeWeightParameters(updateMsg);
    equal(myUpdateEdgeWeightParameters.edgeId,edgeId,"edgeId");
    equal(myUpdateEdgeWeightParameters.fromNodeId,fromNodeId,"fromNodeId");
    equal(myUpdateEdgeWeightParameters.toNodeId,toNodeId,"toNodeId");
    equal(myUpdateEdgeWeightParameters.weightField,weightField,"weightField");
    equal(myUpdateEdgeWeightParameters.edgeWeight,edgeWeight,"edgeWeight");
    myUpdateEdgeWeightParameters.destroy();
});

test("TestDestructor",function(){
    expect(5);
    var myUpdateEdgeWeightParameters;
    myUpdateEdgeWeightParameters=new SuperMap.REST.UpdateEdgeWeightParameters();
    myUpdateEdgeWeightParameters.destroy();
    equal(myUpdateEdgeWeightParameters.edgeId,null,"edgeId");
    equal(myUpdateEdgeWeightParameters.fromNodeId,null,"fromNodeId");
    equal(myUpdateEdgeWeightParameters.toNodeId,null,"toNodeId");
    equal(myUpdateEdgeWeightParameters.weightField,null,"weightField");
    equal(myUpdateEdgeWeightParameters.edgeWeight,null,"edgeWeight");
});