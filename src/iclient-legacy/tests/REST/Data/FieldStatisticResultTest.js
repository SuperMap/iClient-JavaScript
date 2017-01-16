module("FieldStatisticResult");

test("FieldStatisticResult_Test",function(){

    var fieldStatisticResult = new SuperMap.REST.FieldStatisticResult({
        mode: SuperMap.REST.StatisticMode.MAX,
        result: 111
    }); 
    ok(fieldStatisticResult !== null, "not null" );
    equal(fieldStatisticResult.result, 111 ,"fieldStatisticResult.result");
    equal(fieldStatisticResult.mode,SuperMap.REST.StatisticMode.MAX, "fieldStatisticResult.mode");
    
    
    fieldStatisticResult.destroy();
    ok(fieldStatisticResult !== null, "not null" );
    ok(fieldStatisticResult.result === null,"fieldStatisticResult.result");
    ok(fieldStatisticResult.mode === null, "fieldStatisticResult.mode" );
    //测试fromJson 转化空对象
    ok(SuperMap.REST.FieldStatisticResult.fromJson(null) === undefined,"SuperMap.REST.FieldStatisticResult.fromJson");
});