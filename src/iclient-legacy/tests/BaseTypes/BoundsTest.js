/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-2-4
 * Time: 上午10:14
 * To change this template use File | Settings | File Templates.
 */
module("Bounds");
test("testBounds_constructorDefault",function(){
    expect(4);
     var maxExtent= new  SuperMap.Bounds();
    equals(maxExtent.left,null,"Property:left");
    equals(maxExtent.right,null,"Property:right");
    equals(maxExtent.top,null,"Property:top");
    equals(maxExtent.bottom,null,"Property:bottom");
       maxExtent.destroy();
});
test("testBounds_constructor",function(){
      expect(4);
    var maxExtent= new SuperMap.Bounds(0,0,0,0);
    equals(maxExtent.left,0,"Property:left");
    equals(maxExtent.right,0,"Property:right");
    equals(maxExtent.top,0,"Property:top");
    equals(maxExtent.bottom,0,"Property:bottom");
    maxExtent.destroy();
});
test("testBounds_constrouctor",function(){
     expect(4);
    var maxExtent= new SuperMap.Bounds([20,30,40,50]);
    equals(maxExtent.left,20,"Property:left");
    equals(maxExtent.right,40,"Property:right");
    equals(maxExtent.top,50,"Property:top");
    equals(maxExtent.bottom,30,"Property:bottom");
    maxExtent.destroy();
});
test("testBounds_clone",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var myBounds2 = myBounds.clone();
    equals(myBounds2.left,-180,"Function:clone");
    equals(myBounds2.right,180,"Function:clone");
    equals(myBounds2.top,90,"Function:clone");
    equals(myBounds2.bottom,-90,"Function:clone");
    myBounds.destroy();
    myBounds.destroy();
});
test("testBounds_equalsDefault",function(){
    expect(1);
    var mybounds= new SuperMap.Bounds();
    var mybounds1= null;
    var isEquals= mybounds.equals(mybounds1);
    ok(!isEquals,"Function:equals");
    mybounds.destroy();
});
test("testBounds_equals",function(){
    expect(1);
    var mybounds= new SuperMap.Bounds(-180,-90,180,90);
    var mybounds1= new SuperMap.Bounds(-180,-90,180,90);
    var isEquals= mybounds.equals(mybounds1);
    ok(isEquals,"Function:equals");
    mybounds.destroy();
    mybounds1.destroy();
});
test("testBounds_toString",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var myString= myBounds.toString();
    equals(myString,"-180,-90,180,90","Function:toString") ;
    myBounds.destroy();
});
test("testBounds_toArrayDefault",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var arr= myBounds.toArray();
    same(arr,[-180, -90, 180, 90],"Function:toArray");
    myBounds.destroy();
});
test("testBounds_toArray",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-90,-180,90,180);
    var arr= myBounds.toArray(true);
    same(arr,	[-180, -90, 180, 90],"Function:toArray");
    myBounds.destroy();
});
test("testBounds_toBBOXDefault",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(10.3333333,21.3333333,15.333333333,1.3333333333);
    var  str= myBounds.toBBOX();
    equals(str,"10.333333,21.333333,15.333333,1.333333","Function:toBBOX");
    myBounds.destroy();
});
test("testBounds_toBBOX",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(10.3333333,21.3333333,15.333333333,1.3333333333);
    var  str= myBounds.toBBOX(1,true);
    equals(str,"21.3,10.3,1.3,15.3","Function:toBBOX");
    myBounds.destroy();
});
test("testBounds_toGeometry",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var geo = myBounds.toGeometry();
    ok(geo instanceof SuperMap.Geometry,"Function:toGeometry");
    myBounds.destroy();
});
test("testBounds_getWidth",function(){
    expect(1);
     var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var width = myBounds.getWidth();
    equals(width,360,"Function:getWidth");
    myBounds.destroy();
});
test("testBounds_getHeight",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var height=myBounds.getHeight();
    equals(height,180,"Function:getHeight");
    myBounds.destroy();
});
test("testBounds_getSize",function(){
    expect(2);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var size = myBounds.getSize();
    equals(size.w,360,"Function:getSize");
    equals(size.h,180,"Function:getSize");
    myBounds.destroy();
});
test("testBounds_getCenterPixel",function(){
    expect(2);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var center= myBounds.getCenterPixel();
    equals(center.x,0,"Function:getCenterPixel");
    equals(center.y,0,"Function:getCenterPixel");
    myBounds.destroy();
});
test("testBounds_getCenterLonLat",function(){
    expect(4);
    var bounds = new SuperMap.Bounds(-180,-90,180,90);
    var lonlat = bounds.getCenterLonLat();
    equals(lonlat.lon,0,"Function:getCenterLonLat");
    equals(lonlat.lat,0,"Function:getCenterLonLat");
    var lonlat1 = bounds.getCenterLonLat();
    equals(lonlat1.lon,0,"Function:getCenterLonLat");
    equals(lonlat1.lat,0,"Function:getCenterLonLat");
    bounds.destroy();
});
test("testBounds_scaleDefault",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var myScale= myBounds.scale();
   equals(myScale.left,-180,"Function:scale");
   equals(myScale.bottom,-90,"Function:scale");
   equals(myScale.right,180,"Function:scale");
   equals(myScale.top,90,"Function:scale");
    myBounds.destroy();
    myScale.destroy();
});
test("testBounds_scale",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var pixcel= new SuperMap.Pixel(3,4);
    var myScale = myBounds.scale(2,pixcel);
    equals(myScale.left,-363,"Function:scale");
    equals(myScale.bottom,-184,"Function:scale");
    equals(myScale.right,357,"Function:scale");
    equals(myScale.top,176,"Function:scale");
    myBounds.destroy();
    myScale.destroy();
});
test("testBounds_addDefault",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-180,-90,180,90);
    var myNewBounds = myBounds.add(80,80);
    equals(myNewBounds.left,-100,"Function:add");
    equals(myNewBounds.bottom,-10,"Function:add");
    equals(myNewBounds.right,260,"Function:add");
    equals(myNewBounds.top,170,"Function:add");
    myBounds.destroy();
    myNewBounds.destroy();
});
test("testBounds_add",function(){
    expect(1);
    var myBounds =new SuperMap.Bounds(-180,-90,180,90);
    var myNewBounds =null;
    try{
        var x=null;
        var y= null;
        myNewBounds= myBounds.add(x,y);
    }
    catch(e){
        equals(myNewBounds,null,"Function:add");
    } ;
    myBounds.destroy();
});
test("testBounds_addParameter",function(){
    expect(1);
    var myBounds =new SuperMap.Bounds(-180,-90,180,90);
    var myNewBounds =null;
    try{

        myNewBounds= myBounds.add(0);
    }
    catch(e){
        equals(myNewBounds,null,"Function:add");
    } ;
    myBounds.destroy();
});
test("testBounds_extendBounds",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var myNewBounds = new SuperMap.Bounds(-50,-50,50,50);
    myBounds.extend(myNewBounds);
    equals(myBounds.left,-50,"Function:extend");
    equals(myBounds.bottom,-50,"Function:extend");
    equals(myBounds.right,50,"Function:extend");
    equals(myBounds.top,50,"Function:extend");
    myNewBounds.destroy();
    myBounds.destroy();
});
test("testBounds_extendLonLat",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds();
    var myLonLat = new SuperMap.LonLat(50,60);
    myBounds.extend(myLonLat);
    equals(myBounds.left,50,"Function:extend");
    equals(myBounds.bottom,60,"Function:extend");
    equals(myBounds.right,50,"Function:extend");
    equals(myBounds.top,60,"Function:extend");
    myBounds.destroy();
});
test("testBounds_extendPoint",function(){
      expect(4);
    var myBounds = new SuperMap.Bounds();
    var point = new SuperMap.Geometry.Point(10,30);
    myBounds.extend(point);
    equals(myBounds.left,10,"Function:extend");
    equals(myBounds.bottom,30,"Function:extend");
    equals(myBounds.right,10,"Function:extend");
    equals(myBounds.top,30,"Function:extend");
    myBounds.destroy();
});
test("testBounds_containsLonLatDefault",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var lonlat = new SuperMap.LonLat(10,10);
    var iscontians= myBounds.containsLonLat(lonlat,true);
    ok(iscontians,"Function:containsLonLat");
    myBounds.destroy();
});
test("testBounds_containsLonLat",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var lonlat = new SuperMap.LonLat(370,10);
    var iscontians= myBounds.containsLonLat(lonlat,{
        inclusive:true,
        worldBounds: new SuperMap.Bounds(-180,-90,180,90)
    });
    ok(iscontians,"Function:containsLonLat");
    myBounds.destroy();

});
test("testBounds_containsPixel",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var pixcel= new SuperMap.Pixel(20,30);
    var isContains= myBounds.containsPixel(pixcel,true);
    ok(isContains,"Function:containPixel");
    myBounds.destroy();
});
test("testBounds_containsDefault",function(){
    expect(3);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var isContains=myBounds.contains();
    ok(!isContains,"Function:contains");
    var iscontains1= myBounds.contains(0) ;
    ok(!iscontains1,"Function:contains") ;
    var x = null;
    var y=0;
    var iscontains2= myBounds.contains(x,y,true) ;
    ok(!iscontains2,"Function:contains");
    myBounds.destroy();
});
test("testBounds_contains",function(){
           expect(2);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var isContains=myBounds.contains(10,10);
    ok(isContains,"Function:contains") ;
    var iscontains=myBounds.contains(-10,0,false);
    ok(iscontains,"Function:contains");
    myBounds.destroy();
});
test("testBounds_destroy",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    myBounds.destroy();
    equals(myBounds.left,null,"Function:destroy");
    equals(myBounds.right,null,"Function:destroy");
    equals(myBounds.top,null,"Function:destroy");
    equals(myBounds.bottom,null,"Function:destroy");
});
test("testBounds_intersectsBoundsDefault",function(){
        expect(1);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var myNewBounds =new SuperMap.Bounds(-40,-30,20,30);
    var isIntersects=myBounds.intersectsBounds(myNewBounds,true);
    ok(isIntersects,"Function:intersectsBounds");
    myBounds.destroy();
    myNewBounds.destroy();
});
test("testBounds_intersectsBounds",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-20,-30,40,30);
    var myNewBounds = new SuperMap.Bounds(-40,-30,20,30);
    var isIntersects= myBounds.intersectsBounds(myNewBounds,{
        inclusive:null
    });
    ok(isIntersects,"Function:intersectsBounds");
    myBounds.destroy();
    myNewBounds.destroy();
});
test("testBounds_intersectsBoundsWorldBounds",function(){
    expect(1);
    var myBounds= new SuperMap.Bounds(-10,30,20,50);
    var myNewBounds = new SuperMap.Bounds(20,50,-10,30);
    var isIntersects=myBounds.intersectsBounds(myNewBounds, {
        inclusive:false,
        worldBounds: new SuperMap.Bounds(-180,-90,180,90)}
    );
    ok(!isIntersects,"Function:intersectsBounds");
});
test("testBounds_intersectsBoundsmyBoundsCrosses",function(){
    expect(1);
   var  myBounds =new SuperMap.Bounds(-210,100,-180,10);
    var myNewBounds = new SuperMap.Bounds(20,50,-10,30);
    var isIntersects1=myBounds.intersectsBounds(myNewBounds, {
            inclusive:false,
            worldBounds: new SuperMap.Bounds(-180,-90,180,90)}
    );
    ok(!isIntersects1,"Function:intersectsBounds");
    myBounds.destroy();
    myNewBounds.destroy();
});
test("testBounds_intersectsBoundsBounds2Crosses",function(){
    expect(1);
    var myBounds= new SuperMap.Bounds(-10,30,20,50);
    var bounds2 = new SuperMap.Bounds(-210,100,-180,10);
    var isIntersects=myBounds.intersectsBounds(bounds2, {
            inclusive:true,
            worldBounds: new SuperMap.Bounds(-180,-90,180,90)}
    );
    ok(!isIntersects,"Function:intersectsBounds");
    myBounds.destroy();
    bounds2.destroy();
});
test("testBounds_containsBoundsDefault",function(){
    expect(1);
    var myBounds= new SuperMap.Bounds(-10,30,20,50);
    var bounds = new SuperMap.Bounds(-20,10,-10,10);
    var isContains= myBounds.containsBounds(bounds);
    ok(!isContains,"Function:containsBounds");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_containsBoundsParameter",function(){
    expect(1);
    var myBounds= new SuperMap.Bounds(-5,10,10,10);
    var bounds = new SuperMap.Bounds(-10,30,20,50);
    var isContains= myBounds.containsBounds(bounds,true,false);
    ok(!isContains,"Function:containsBounds");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_containsBoundsParameter",function(){
    expect(1);
    var myBounds= new SuperMap.Bounds(-20,-30,40,30);
    var bounds = new SuperMap.Bounds(-5,10,10,10);
    var isContains= myBounds.containsBounds(bounds);
    ok(isContains,"Function:containsBounds");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_determineQuadrantTR",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-50,-50,50,50);
    var lonlat = new SuperMap.LonLat(10,10);
    var quadrant=myBounds.determineQuadrant(lonlat);
    equals(quadrant,"tr","Function:determineQuadrant");
    myBounds.destroy();
});
test("testBounds_determineQuadrantTL",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-50,-50,50,50);
    var lonlat = new SuperMap.LonLat(-10,10);
    var quadrant=myBounds.determineQuadrant(lonlat);
    equals(quadrant,"tl","Function:determineQuadrant");
    myBounds.destroy();
});
test("testBounds_determineQuadrantBL",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-50,-50,50,50);
    var lonlat = new SuperMap.LonLat(-10,-10);
    var quadrant=myBounds.determineQuadrant(lonlat);
    equals(quadrant,"bl","Function:determineQuadrant");
    myBounds.destroy();
});
test("testBounds_determineQuadrantBR",function(){
    expect(1);
    var myBounds = new SuperMap.Bounds(-50,-50,50,50);
    var lonlat = new SuperMap.LonLat(10,-10);
    var quadrant=myBounds.determineQuadrant(lonlat);
    equals(quadrant,"br","Function:determineQuadrant");
    myBounds.destroy();
});
test("testBounds_transform",function(){
    expect(4);
    var myBounds = new SuperMap.Bounds(-180,-45,180,45);
    var bounds =myBounds.transform(
        new SuperMap.Projection("EPSG:4326"),
        new SuperMap.Projection("EPSG:3857")
    );
    equals(bounds.left,-20037508.34,"Function:transform");
    equals(bounds.bottom,-5621521.485409545,"Function:transform");
    equals(bounds.right,20037508.34,"Function:transform");
    equals(bounds.top,5621521.485409545,"Function:transform");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_wrapDateLineDefault",function(){
    expect(4);
    var myBounds= new SuperMap.Bounds(-180,-90,180,90);
    var bounds = myBounds.wrapDateLine();
    equals(bounds.left,-180,"Function:wrapDateLine");
    equals(bounds.bottom,-90,"Function:wrapDateLine");
    equals(bounds.right,180,"Function:wrapDateLine");
    equals(bounds.top,90,"Function:wrapDateLine");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_wrapDateLineRight",function(){
    expect(4);
    var myBounds= new SuperMap.Bounds(-50,-50,50,50);
    var maxExtent= new SuperMap.Bounds(60,20,70,40);
    var bounds = myBounds.wrapDateLine(maxExtent,{leftTolerance:3,rightTolerance:4});
    equals(bounds.left,-30,"Function:wrapDateLine");
    equals(bounds.bottom,-50,"Function:wrapDateLine");
    equals(bounds.right,70,"Function:wrapDateLine");
    equals(bounds.top,50,"Function:wrapDateLine");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_wrapDateLine",function(){
    expect(4);
    var myBounds= new SuperMap.Bounds(-50,-50,50,50);
    var maxExtent= new SuperMap.Bounds(-70,20,-60,40);
    var bounds = myBounds.wrapDateLine(maxExtent,{leftTolerance:3});
    equals(bounds.left,-80,"Function:wrapDateLine");
    equals(bounds.bottom,-50,"Function:wrapDateLine");
    equals(bounds.right,20,"Function:wrapDateLine");
    equals(bounds.top,50,"Function:wrapDateLine");
    myBounds.destroy();
    bounds.destroy();
});
test("testBounds_toServerJSONObject",function(){
    expect(7);
    var myBounds= new SuperMap.Bounds(-50,-50,50,50);
    var json=myBounds.toServerJSONObject();
    equals(json.left,-50,"Function:toServerJSONObject");
    equals(json.right,50,"Function:toServerJSONObject");
    equals(json.bottom,-50,"Function:toServerJSONObject");
    equals(json.top,50,"Function:toServerJSONObject");
    equals(json.rightTop.x,50,"Function:toServerJSONObject");
    equals(json.rightTop.y,50,"Function:toServerJSONObject");
    equals(json.leftBottom.x,-50,"Function:toServerJSONObject");
    myBounds.destroy();
});
test("testBounds_fromStringDefault",function(){
    expect(4);
    var str=  SuperMap.Bounds.fromString("-180,-90,180,90",false);
    equals(str.left,-180,"Function:fromString");
    equals(str.right,180,"Function:fromString");
    equals(str.bottom,-90,"Function:fromString");
    equals(str.top,90,"Function:fromString");
    str.destroy();
});
test("testBounds_fromString",function(){
    expect(4);
    var str=  SuperMap.Bounds.fromString("30,20,30,40");
    equals(str.left,30,"Function:fromString");
    equals(str.right,30,"Function:fromString");
    equals(str.bottom,20,"Function:fromString");
    equals(str.top,40,"Function:fromString");
    str.destroy();
});
test("testBounds_fromArrayDefault",function(){
    expect(4);
    var arr =  SuperMap.Bounds.fromArray([10,20,30,40]);
    equals(arr .left,10,"Function:fromArray");
    equals(arr .right,30,"Function:fromArray");
    equals(arr .bottom,20,"Function:fromArray");
    equals(arr .top,40,"Function:fromArray");
    arr .destroy();
});
test("testBounds_fromArray",function(){
    expect(4);
    var arr=  SuperMap.Bounds.fromArray([10,20,30,40],true);
    equals(arr.left,20,"Function:fromArray");
    equals(arr.right,40,"Function:fromArray");
    equals(arr.bottom,10,"Function:fromArray");
    equals(arr.top,30,"Function:fromArray");
    arr.destroy();
});
test("testBounds_fromSize",function(){
    expect(4);
    var size = new SuperMap.Size(31,46);
    var size1 =  SuperMap.Bounds.fromSize(size);
    equals(size1.left,0,"Function:fromSize");
    equals(size1.bottom,46,"Function:fromSize");
    equals(size1.right,31,"Function:fromSize");
    equals(size1.top,0,"Function:fromSize");
    size1.destroy();
});
test("testBounds_oppositeQuadrant",function(){
    expect(3);
    var myBounds = new SuperMap.Bounds(-50,-50,50,50);
    var lonlat = new SuperMap.LonLat(10,-10);
     var lonlat1= new SuperMap.LonLat(-10,10);
    var quadrant=myBounds.determineQuadrant(lonlat);
    var quadrant1=myBounds.determineQuadrant(lonlat1);
    equals(quadrant,"br","Function:oppositeQuadrant");
    var opposite= SuperMap.Bounds.oppositeQuadrant(quadrant);
    var opposite1= SuperMap.Bounds.oppositeQuadrant(quadrant1);
    equals(opposite,"tl","Function:oppositeQuadrant") ;
    equals(opposite1,"br","Function:oppositeQuadrant") ;
    myBounds.destroy();
});




