/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-2-2
 * Time: 上午9:28
 * To change this template use File | Settings | File Templates.
 */
module("LonLat");
test("testLonLat_constructorDefault",function(){
expect(2);
      var lonLat = new SuperMap.LonLat();
     equals(lonLat.lon,0,"Property:lon");
     equals(lonLat.lat,0,"Property:lat");
    lonLat.destroy();
});
test("testLonLat_constructor",function(){
    expect(2);
    var lonLat1 = new SuperMap.LonLat(100,50);
    equals(lonLat1.lon,100,"Property:lon");
    equals(lonLat1.lat,50,"Property:lat");
    lonLat1.destroy();
});
test("testLonLat_constructorOneparameter",function(){
    expect(2);
    var lonlat= new SuperMap.LonLat(100);
    equals(lonlat.lon,100,"Property:lon");
    equals(lonlat.lat,0,"Peoperty:lat");
    lonlat.destroy();
})
test("testLonLat_constructorArrayParameter",function(){
    expect(2);
    var arr=[100,50];
    var lonlat1= new SuperMap.LonLat(arr);
    equals(lonlat1.lon,100,"Property:lon");
    equals(lonlat1.lat,50,"Peoperty:lat");
    lonlat1.destroy();
})
test("testLonLat_add",function(){
    expect(2);
    var lonLat = new SuperMap.LonLat(100,50);
    var lonLat1=lonLat.add(10,10);
    equals(lonLat1.lon,110,"Function:add");
    equals(lonLat1.lat,60,"Function:add");
    lonLat1.destroy();
    lonLat.destroy();
});
test("testLonLat_addDefault",function(){
    expect(1);
    var lonLat= new SuperMap.LonLat();
    var lonLat1= null;
    try
    {
        lonLat1= lonLat.add(100);
    }
    catch(e)
    {
        equals(lonLat1,null,"Function:add");
    }
    lonLat.destroy();
});

test("testLonLat_clone",function(){
       expect(2);
    var lonLat = new SuperMap.LonLat(100,50);
    var lonlat1= lonLat.clone();
    equals(lonlat1.lon,100,"Function:clone");
    equals(lonlat1.lat,50,"Function:clone");
    lonLat.destroy();
    lonlat1.destroy();
});
test("testLonLat_equalsDefault",function(){
    expect(1);
    var lonLat = new SuperMap.LonLat(100,50);
    var lonLat1 = new SuperMap.LonLat(100,50);
    var isEqual = lonLat.equals(lonLat1);
    ok(isEqual,"Function equals");
    lonLat.destroy();
    lonLat1.destroy();
});
test("testLonLat_fromArray",function(){
    var arr=[100,50];
    var lonLat = new SuperMap.LonLat.fromArray(arr);
    equals(lonLat.lon,100,"Function:fromArray");
    equals(lonLat.lat,50,"Function:fromArray");
    lonLat.destroy();
});
test("testLonLat_fromString",function(){
        expect(2);
    var str = "100,50";
    var lonLat= new SuperMap.LonLat.fromString(str);
    equals(lonLat.lon,100,"Function:fromString");
    equals(lonLat.lat,50,"Function:fromString");
    lonLat.destroy();
});
test("testLonLat_transform",function(){
    expect(2);
    var lonLat = new SuperMap.LonLat(0,45);
    var lonLat1=lonLat.transform(
        new SuperMap.Projection("EPSG:4326"),
        new SuperMap.Projection("EPSG:3857")
    );
    equals(lonLat1.lon,0,"Function:transform");
    equals(lonLat1.lat,5621521.485409545,'Function:transform');
    lonLat.destroy();
    lonLat.destroy();
});
test("testLonLat_toShortString",function(){
       expect(1);
    var lonLat = new SuperMap.LonLat(100,50) ;
    var str =lonLat.toShortString();
    equals(str,"100,50","Function:toShortString");
    lonLat.destroy();
});
test("testLonLat_toString",function(){
    expect(1);
     var lonLat= new SuperMap.LonLat(100,50);
       var str = lonLat.toString();
    equals(str,"lon=100,lat=50","Fuction:toString");
    lonLat.destroy();
});
test("testLonLat_wrapDateLineDefault",function(){
    expect(2);
     var lonLat= new SuperMap.LonLat(10,10);
    var lonLat1= lonLat.wrapDateLine(
        new  SuperMap.Bounds(12,100,60,100) );
    equals(lonLat1.lon,58,"Function:wrapDateLine");
    equals(lonLat1.lat,10,"Function:wrapDateLine");
    lonLat1.destroy();
    lonLat.destroy();
});
test("testLonLat_wrapDateLine",function(){
    expect(2);
    var lonLat= new SuperMap.LonLat(100,100);
    var lonLat1= lonLat.wrapDateLine(
        new  SuperMap.Bounds(50,100,80,100) );
    equals(lonLat1.lon,70,"Function:wrapDateLine");
    equals(lonLat1.lat,100,"Function:wrapDateLine");
    lonLat1.destroy();
    lonLat.destroy();
});
test("testLonLat_destroy",function(){
    expect(2);
    var lonLat= new SuperMap.LonLat(10,10);
    lonLat.destroy();
    equals(lonLat.lon,null,"Property:lon");
    equals(lonLat.lat,null,"Property:lat");

})


