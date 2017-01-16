/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 15-4-10
 * Time: 上午9:17
 * To change this template use File | Settings | File Templates.
 */
 module('Geometry');
test("testGeometry_ConstructorDefault",function(){
    expect(3);
    var geometry= new SuperMap.Geometry();
    equals(geometry.SRID,null,"Property:SRID");
    equals(geometry.bounds,null,"Property:bounds");
    equals(geometry.parent,null,"Property:parent");
    geometry.destroy();
});
test("testGeometry_Constructor",function(){
    expect(3);
    var geometry= new SuperMap.Geometry();
    geometry. SRID=4326;
    geometry. bounds=new SuperMap.Bounds(-180,-90,180,90);
    equals(geometry.SRID,4326,"Property:SRID");
    equals(geometry.bounds.left,-180,"Property:bounds");
    equals(geometry.parent,null,"Property:parent");
    geometry.destroy();
});
test("testGeometry_Propertyparent",function(){
         expect(1);
       var geometry= new SuperMap.Geometry();
       geometry.SRID= 4326;
       var geometryChild=new SuperMap.Geometry();
      geometryChild.parent=geometry;
       equals(geometryChild.parent.SRID,4326,"Property:parent");
    geometry.destroy();
    geometryChild.destroy();
});
test("testGeometry_destroyDefault",function(){
    expect(2);
    var geometry=new SuperMap.Geometry();
    equals(geometry.CLASS_NAME,"SuperMap.Geometry","Function:destroy");
    geometry.destroy();
    equals(geometry.id,null,"Function:destroy");
});
test("testGeometry_destroy",function(){
    expect(6);
    var geometry=new SuperMap.Geometry();
    geometry.SRID=4326;
    geometry.bounds=new SuperMap.Bounds(-180,-90,180,90);
    equals(geometry.CLASS_NAME,"SuperMap.Geometry","Function:destroy");
    equals(geometry.SRID,4326,"Function:destroy");
    equals(geometry.bounds.right,180,"Function:destroy");
    geometry.destroy();
    equals(geometry.id,null,"Function:destroy");
    equals(geometry.SRID,null,"Function:destroy");
    equals(geometry.bounds,null,"Function:destroy");
});
test("testGeometry_clone",function(){
    expect(2);
    var geometry= new SuperMap.Geometry();
     geometry.SRID=4326;
    geometry.bounds=new SuperMap.Bounds(-180,-90,180,90);
    var geoClone= geometry.clone();
    equals(geoClone.SRID,null,"Function:clone");
    equals(geoClone.bounds,null,"Function:clone");
    geometry.destroy();
    geoClone.destroy();
});
test("testGeometry_setBounds",function(){
      expect(2);
      var geometry = new SuperMap.Geometry();
       geometry.setBounds(new SuperMap.Bounds(-180,-90,180,90));
      equals(geometry.bounds.left,-180,"Function:setBounds");
      equals(geometry.bounds.right,180,"Function:setBounds");
    geometry.destroy();
});
test("testGeometry_clearBoundsDefault",function(){
    expect(2);
    var geometry= new SuperMap.Geometry();
    geometry.bounds= new SuperMap.Bounds(-180,-90,180,90);
    equals(geometry.bounds.left,-180,"Function:clearBounds");
     geometry.clearBounds();
    equals(geometry.bounds,null,"Function:clearBounds");
    geometry.destroy();
});
test("testGeometry_clearBounds",function(){
    expect(2);
    var geometry= new SuperMap.Geometry();
    geometry.bounds= new SuperMap.Bounds(-180,-90,180,90);
    var geometryChild= new SuperMap.Geometry();
    geometryChild.parent=geometry;
    geometryChild.clearBounds();
    equals(geometryChild.bounds,null,"Function:clearBounds");
    equals(geometryChild.parent.bounds,null,"Function:clearBounds");
    geometry.destroy();
    geometryChild.destroy();
});
test("testGeometry_extendBoundsDeafault",function(){
    expect(1);
     var geometry = new SuperMap.Geometry();
    geometry.extendBounds(new SuperMap.Bounds(-180,-90,180,90));
    equals(geometry.bounds.left,-180,"Function:extendBounds");
    geometry.destroy();
});
test("testGeometry_extendBounds",function(){
    expect(2);
    var geometry = new SuperMap.Geometry();
    geometry.bounds=new SuperMap.Bounds(-50,-20,50,20);
    equals(geometry.bounds.left,-50,"Function:extendBounds")
    geometry.extendBounds(new SuperMap.Bounds(-180,-90,180,90));
    equals(geometry.bounds.left,-180,"Function:extendBounds");
    geometry.destroy();
});
test("testGeometry_atPoint",function(){
          expect(1);
          var geometry= new SuperMap.Geometry();
          geometry.bounds=new SuperMap.Bounds(-50,-20,50,20);
          var point=  geometry.atPoint(new SuperMap.LonLat(0,0),10,10);
         ok(point,"Function:atPoint");
          geometry.destroy();

});
test("testGeometry_atPointDefault",function(){
    expect(1);
    var geometry= new SuperMap.Geometry();
    var point=  geometry.atPoint(new SuperMap.LonLat(0,0),10,10);
    ok(!point,"Function:atPoint");
    geometry.destroy();
});
test("testGeometry_atPointSpecial",function(){
    expect(1);
    var geometry= new SuperMap.Geometry();
    geometry.bounds=new SuperMap.Bounds(-50,-20,50,20);
    var point=  geometry.atPoint(new SuperMap.LonLat(0,0),-200,-200);
    ok(!point,"Function:atPoint");
    geometry.destroy();
});
test("testGeometry_atPointDefaultParm",function(){
    expect(1);
    var geometry= new SuperMap.Geometry();
    geometry.bounds=new SuperMap.Bounds(-50,-20,50,20);
    var point=  geometry.atPoint(new SuperMap.LonLat(0,0));
    ok(point,"Function:atPoint");
    geometry.destroy();
});
test("testGeometry_getLength",function(){
      expect(1);
    var geometry= new SuperMap.Geometry();
    var len=geometry.getLength();
    equals(len,0.0,"Function:getLength");
    geometry.destroy();
});
test("testGeometry_getArea",function(){
    expect(1);
    var geometry= new SuperMap.Geometry();
    var area=geometry.getArea();
    equals(area,0.0,"Function:getArea");
    geometry.destroy();
});
test("testGeometry_getCentroid",function(){
    expect(1);
    var geometry= new SuperMap.Geometry();
    var center=geometry.getCentroid();
    equals(center,null,"Function:getCentroid");
    geometry.destroy();
});
test("testGeometry_fromWKT",function(){
    expect(2);
    var geometry= new SuperMap.Geometry.fromWKT("POINT(0 0)");
    equals(geometry.x,0,"Function:fromWKT");
    equals(geometry.y,0,"Function:fromWKT");
    geometry.destroy();
});
test("testGeometry_fromWKTIsArray",function(){
    expect(2);
   var geometry= new SuperMap.Geometry.fromWKT("LINESTRING(0 0,10 10)");
    equals(geometry.components[0].x,0,"Function:fromWKT");
    equals(geometry.components[0].y,0,"Function:fromWKT");
    geometry.destroy();
});
test("testGeometry_segmentsIntersect",function(){
    expect(1);
    var seg1={
        x1:0,
        y1:0,
        x2:10,
         y2:10
    } ,
    seg2={
        x1:0,
        y1:0,
        x2:-10,
        y2:-10
    };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,false);
   ok(geo,"Function:segmentsIntersect");

});
test("testGeometry_segmentsIntersectUnIntersect",function(){
    expect(1);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:1,
            y1:0,
            x2:10,
            y2:9
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,false);
    ok(!geo,"Function:segmentsIntersect");
});
test("testGeometry_segmentsIntersectIntersectSp",function(){
    expect(1);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:10,
            y2:9
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,true);
    ok(!geo,"Function:segmentsIntersect");

});
test("testGeometry_segmentsIntersectIntersectSp1",function(){
    expect(1);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:10,
            y2:11
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,true);
    ok(geo,"Function:segmentsIntersect");

});
test("testGeometry_segmentsIntersectIntersectSp2",function(){
    expect(2);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:10,
            y2:11
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,{point:true});
    equals(geo.x,10,"Function:segmentsIntersect");
    equals(geo.y,10,"Function:segmentsIntersect");
    geo.destroy();
});
test("testGeometry_segmentsIntersectIntersectSp3",function(){
    expect(2);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:10,
            y2:11
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,{point:true,tolerance:4});
    equals(geo.x,10,"Function:segmentsIntersect");
    equals(geo.y,10,"Function:segmentsIntersect");
    geo.destroy();
});
test("testGeometry_segmentsIntersectIntersectSp4",function(){
    expect(2);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:10,
            y2:9
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,{point:true,tolerance:4});
    equals(geo.x,10,"Function:segmentsIntersect");
    equals(geo.y,10,"Function:segmentsIntersect");
    geo.destroy();
});
test("testGeometry_segmentsIntersectIntersectSp4NoPoint",function(){
    expect(1);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:10,
            y2:9
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,{tolerance:4});
    ok(geo,"Function:segmentsIntersect");
});
test("testGeometry_segmentsIntersectIntersectSp4NoPoint",function(){
    expect(1);
    var seg1={
            x1:0,
            y1:0,
            x2:10,
            y2:10
        } ,
        seg2={
            x1:10,
            y1:1,
            x2:20,
            y2:9
        };
    var geo= SuperMap.Geometry.segmentsIntersect(seg1,seg2,{point:true,tolerance:4});
    ok(!geo,"Function:segmentsIntersect");
});
test("testGeometry_distanceToSegment",function(){
    expect(3);
    var point={
        x:0,
        y:0
    } ,
     seg1={
            x1:5,
            y1:1,
            x2:10,
            y2:10
        } ;
    var geo=SuperMap.Geometry.distanceToSegment(point,seg1);
    equals(geo.distance,5.0990195135927845,"Function:distanceToSegment");
    equals(geo.x,5,"Function:distanceToSegment");
    equals(geo.y,1,"Function:distanceToSegment");
});
test("testGeometry_distanceToSegment1",function(){
    expect(3);
    var point={
            x:3,
            y:5
        } ,
        seg1={
            x1:3,
            y1:4,
            x2:3,
            y2:6
        } ;
    var geo=SuperMap.Geometry.distanceToSegment(point,seg1);
    equals(geo.distance,0,"Function:distanceToSegment");
    equals(geo.x,3,"Function:distanceToSegment");
    equals(geo.y,5,"Function:distanceToSegment");
});
test("testGeometry_distanceToSegment2",function(){
    expect(3);
    var point={
            x:3,
            y:-3
        } ,
        seg1={
            x1:-4,
            y1:-4,
            x2:6,
            y2:6
        } ;
    var geo=SuperMap.Geometry.distanceToSegment(point,seg1);
    equals(geo.distance,4.242640687119285,"Function:distanceToSegment");
    equals(geo.x,0,"Function:distanceToSegment");
    equals(geo.y,0,"Function:distanceToSegment");
});
test("testGeometry_distanceToSegmentOut",function(){
    expect(3);
    var point={
            x:0,
            y:13
        } ,
        seg1={
            x1:6,
            y1:5,
            x2:6,
            y2:12
        } ;
    var geo=SuperMap.Geometry.distanceToSegment(point,seg1);
    equals(geo.distance,	6.082762530298219,"Function:distanceToSegment");
    equals(geo.x,6,"Function:distanceToSegment");
    equals(geo.y,12,"Function:distanceToSegment");
});