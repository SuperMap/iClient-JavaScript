module("Recordset");

test("TestRecordset",function(){
    var feature=new SuperMap.Feature.Vector()
    var features=new Array(feature);
    var recordset = new SuperMap.REST.Recordset({
        datasetName:"datasetName",
        fieldCaptions:null,
        fields:null,
        fieldTypes:null,
        features:features
    });
    ok( recordset!=null, "null" );
    equal(recordset.datasetName,"datasetName","recordset.datasetName");
    ok(recordset.fieldCaptions==null, "recordset.fieldCaptions" );
    ok(recordset.fields==null, "recordset.fields" );
    ok(recordset.fieldTypes==null, "recordset.fieldTypes" );
    equal(recordset.features,features, "recordset.features" );
    
    recordset.destroy();
    ok( recordset!=null, "null" );
    equal(recordset.datasetName,null,"recordset.datasetName");
    ok(recordset.fieldCaptions==null, "recordset.fieldCaptions" );
    ok(recordset.fields==null, "recordset.fields" );
    ok(recordset.fieldTypes==null, "recordset.fieldTypes" );
    ok(recordset.features==null, "recordset.features" );
    
    //测试fromJson 转化空对象
    ok(SuperMap.REST.Recordset.fromJson(null)==null,"SuperMap.REST.Recordset.fromJson");
});