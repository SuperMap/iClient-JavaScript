module("FieldStatisticEventArgs");

test("FieldStatisticEventArgs",function(){
    var fieldStatisticResult = new SuperMap.REST.FieldStatisticResult();
    var fieldStatisticEventArgs=new SuperMap.REST.FieldStatisticEventArgs(fieldStatisticResult, "jsonResult");
    ok( fieldStatisticEventArgs !== null, "not null" );
    equal(fieldStatisticEventArgs.result, fieldStatisticResult, "fieldStatisticEventArgs.result");
    equal(fieldStatisticEventArgs.originResult, "jsonResult", "fieldStatisticEventArgs.originResult");
    
    fieldStatisticEventArgs.destroy();
    ok(fieldStatisticEventArgs !== null, "not null" );
    ok(fieldStatisticEventArgs.result === null, "fieldStatisticEventArgs.result");
    ok(fieldStatisticEventArgs.originResult === null, "fieldStatisticEventArgs.originResult");
});