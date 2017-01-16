/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-3-16
 * Time: 下午12:29
 * To change this template use File | Settings | File Templates.
 */
module('ArgParser');
test("testArgParser_Default",function(){
     expect(4);
      var map= new SuperMap.Map("map");
      var argParser= new SuperMap.Control.ArgParser();
      map.addControl(argParser);
      equals(argParser.center,null,"Property:center");
      equals(argParser.layers,null,"Property:layers");
      equals(argParser.zoom,null,"Property:zoom");
      equals(argParser.displayProjection,null,"Property:displayProjection");
      map.destroy();
});
test("testArgParser_getParameters",function(){
    expect(2);
    var map = new SuperMap.Map("map");
    var argParser= new SuperMap.Control.ArgParser();
    var url =GlobeParameter.ChinaURL+"?lon=0&lat=0";
    var arg= argParser.getParameters(url);
    equals(arg.lon,"0","Function:getParameters");
    equals(arg.lat,"0","Function:getParameters");
    map.destroy();
});
test("testArgParser_destroy",function(){
    expect(4);
    var map = new SuperMap.Map("map");
    var argParser= new SuperMap.Control.ArgParser();
    map.addControl(argParser);
    argParser.destroy();
    equals(argParser.zoom,null,"Function:destroy");
    equals(argParser.center,null,"Function:destroy");
    equals(argParser.displayProjection,null,"Function:destroy");
    equals(argParser.layers,null,"Function:destroy");
});

