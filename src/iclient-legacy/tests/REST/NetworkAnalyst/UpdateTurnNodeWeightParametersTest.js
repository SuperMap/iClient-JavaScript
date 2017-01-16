module("UpdateTurnNodeWeightParameters");

test("TestDefaultConstructor",function(){
    expect(5);
    var myUpdateTurnNodeWeightParameters;
    myUpdateTurnNodeWeightParameters=new SuperMap.REST.UpdateTurnNodeWeightParameters();
    equal(myUpdateTurnNodeWeightParameters.nodeId,"","nodeId");
    equal(myUpdateTurnNodeWeightParameters.fromEdgeId,"","fromEdgeId");
    equal(myUpdateTurnNodeWeightParameters.toEdgeId,"","toEdgeId");
    equal(myUpdateTurnNodeWeightParameters.weightField,"","weightField");
    equal(myUpdateTurnNodeWeightParameters.turnNodeWeight,"","turnNodeWeight");
    myUpdateTurnNodeWeightParameters.destroy();
});

test("TestConstructor",function(){
    expect(5);
    var nodeId="",fromEdgeId="",toEdgeId="",weightField="",turnNodeWeight="";
    updateMsg={
        nodeId:nodeId,
        fromEdgeId:fromEdgeId,
        toEdgeId:toEdgeId,
        weightField:weightField,
        turnNodeWeight:turnNodeWeight
    };
    var myUpdateTurnNodeWeightParameters;
    myUpdateTurnNodeWeightParameters=new SuperMap.REST.UpdateTurnNodeWeightParameters(updateMsg);
    equal(myUpdateTurnNodeWeightParameters.nodeId,nodeId,"nodeId");
    equal(myUpdateTurnNodeWeightParameters.fromEdgeId,fromEdgeId,"fromEdgeId");
    equal(myUpdateTurnNodeWeightParameters.toEdgeId,toEdgeId,"toEdgeId");
    equal(myUpdateTurnNodeWeightParameters.weightField,weightField,"weightField");
    equal(myUpdateTurnNodeWeightParameters.turnNodeWeight,turnNodeWeight,"turnNodeWeight");
    myUpdateTurnNodeWeightParameters.destroy();
});

test("TestDestructor",function(){
    expect(5);
    var myUpdateTurnNodeWeightParameters;
    myUpdateTurnNodeWeightParameters=new SuperMap.REST.UpdateTurnNodeWeightParameters();
    myUpdateTurnNodeWeightParameters.destroy();
    equal(myUpdateTurnNodeWeightParameters.nodeId,null,"nodeId");
    equal(myUpdateTurnNodeWeightParameters.fromEdgeId,null,"fromEdgeId");
    equal(myUpdateTurnNodeWeightParameters.toEdgeId,null,"toEdgeId");
    equal(myUpdateTurnNodeWeightParameters.weightField,null,"weightField");
    equal(myUpdateTurnNodeWeightParameters.turnNodeWeight,null,"turnNodeWeight");
});