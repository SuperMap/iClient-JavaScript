/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-2-3
 * Time: 下午4:34
 * To change this template use File | Settings | File Templates.
 */
module("Credential");
test("testCredential_constructorDefault",function(){
    expect(2);
    var credential = new SuperMap.Credential();
    equals(credential.value,"","Property:value");
    equals(credential.name,"token","Property:name");
    credential.destroy();
});
test("testCredential_constructor",function(){
    expect(2);
    var credential = new SuperMap.Credential("valueString");
    equals(credential.value,"valueString","Property:value");
    equals(credential.name,"token","Property:name");
    credential.destroy();
}) ;
test("testCredential_getUrlParameters",function(){
    expect(1);
     var credential = new SuperMap.Credential("valueString","token");
    var pixcel=credential.getUrlParameters();
    equals(pixcel,"token=valueString","Function:getUrlParameters");
    credential.destroy();
});
test("testCredential_getValue",function(){
    expect(1);
    var credential = new SuperMap.Credential("2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..","token");
    var str=credential.getValue();
    equals(str,"2OMwGmcNlrP2ixqv1Mk4BuQMybOGfLOrljruX6VcYMDQKc58Sl9nMHsqQaqeBx44jRvKSjkmpZKK1L596y7skQ..","Function:getValue");
     credential.destroy();
});
test("testCredential_destroy",function(){
    expect(2);
    var credential= new SuperMap.Credential("valueString","token");
    credential.destroy();
    equals(credential.value,null,"Function:destroy");
    equals(credential.name,null,"Function:destroy")
})