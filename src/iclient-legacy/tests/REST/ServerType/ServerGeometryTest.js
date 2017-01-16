module("ServerGeometry");

test("TestFromGeometry_Point",function(){
    var point=new SuperMap.Geometry.Point(10,10);
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(point);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,1,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],1,"serverGeometry.parts[0]");
    equal(serverGeometry.points.length,1,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[0]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.POINT,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
    
    var geometryConvert=serverGeometry.toGeometry();
    geometryConvert.id=point.id;
    deepEqual(geometryConvert,point,"testServerGeometry.toGeometry()");
    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_MultiPoint",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var multiPoint=new SuperMap.Geometry.MultiPoint(new Array(point1,point2));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(multiPoint);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,2,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],1,"serverGeometry.parts[0]");
    equal(serverGeometry.parts[1],1,"serverGeometry.parts[1]");
    equal(serverGeometry.points.length,2,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.POINT,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,2,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,1,"geometryConvert.componentTypes.length");
    equal(geometryConvert.components[0].x,point1.x,"geometryConvert.components[0].x");
    equal(geometryConvert.components[0].y,point1.y,"geometryConvert.components[0].y");
    equal(geometryConvert.components[1].x,point2.x,"geometryConvert.components[1].x");
    equal(geometryConvert.components[1].y,point2.y,"geometryConvert.components[1].y");
    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.Point',"geometryConvert.componentTypes[0]");
    //equal(geometryConvert.componentTypes[1],'SuperMap.Geometry.Point',"geometryConvert.componentTypes[1]");//componentTypes无重复字段
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.MultiPoint',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});


test("TestFromGeometry_Curve",function(){

});


test("TestFromGeometry_LinearRing",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var linearRing=new SuperMap.Geometry.LinearRing(new Array(point1,point2,point1));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(linearRing);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,1,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],3,"serverGeometry.parts[0]");

    equal(serverGeometry.points.length,3,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[2].CLASS_NAME + "," + serverGeometry.points[2].x + "," + serverGeometry.points[2].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[2]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.LINE,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,3,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,1,"geometryConvert.componentTypes.length");
    equal(geometryConvert.components[0].x,point1.x,"geometryConvert.components[0].x");
    equal(geometryConvert.components[0].y,point1.y,"geometryConvert.components[0].y");
    equal(geometryConvert.components[1].x,point2.x,"geometryConvert.components[1].x");
    equal(geometryConvert.components[1].y,point2.y,"geometryConvert.components[1].y");
    equal(geometryConvert.components[2].x,point1.x,"geometryConvert.components[2].x");
    equal(geometryConvert.components[2].y,point1.y,"geometryConvert.components[2].y");
    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.Point',"geometryConvert.componentTypes[0]");
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.LinearRing',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_LineString",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var lineString=new SuperMap.Geometry.LineString(new Array(point1,point2));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(lineString);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,1,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],2,"serverGeometry.parts[0]");

    equal(serverGeometry.points.length,2,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");

    iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.LINE,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,2,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,2,"geometryConvert.componentTypes.length");
    equal(geometryConvert.components[0].x,point1.x,"geometryConvert.components[0].x");
    equal(geometryConvert.components[0].y,point1.y,"geometryConvert.components[0].y");
    equal(geometryConvert.components[1].x,point2.x,"geometryConvert.components[1].x");
    equal(geometryConvert.components[1].y,point2.y,"geometryConvert.components[1].y");
    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.Point',"geometryConvert.componentTypes[0]");
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.LineString',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_MultiLineString",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var point3=new SuperMap.Geometry.Point(20,20);
    var point4=new SuperMap.Geometry.Point(30,30);
    var multiLineString=new SuperMap.Geometry.MultiLineString(new Array(new SuperMap.Geometry.LineString(new Array(point1,point2)),new SuperMap.Geometry.LineString(new Array(point3,point4))));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(multiLineString);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,2,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],2,"serverGeometry.parts[0]");
    equal(serverGeometry.parts[1],2,"serverGeometry.parts[1]");

    equal(serverGeometry.points.length,4,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");

    iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");

    iString = "CLASS_NAME: " + serverGeometry.points[2].CLASS_NAME + "," + serverGeometry.points[2].x + "," + serverGeometry.points[2].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,20";
    deepEqual(iString,expectString,"serverGeometry.points[2]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[3].CLASS_NAME + "," + serverGeometry.points[3].x + "," + serverGeometry.points[3].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,30,30";
    deepEqual(iString,expectString,"serverGeometry.points[3]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.LINE,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,2,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,1,"geometryConvert.componentTypes.length");
    equal(geometryConvert.components[0].components[0].x,point1.x,"geometryConvert.components[0].components[0].x");
    equal(geometryConvert.components[0].components[0].y,point1.y,"geometryConvert.components[0].components[0].y");
    equal(geometryConvert.components[0].components[1].x,point2.x,"geometryConvert.components[0].components[1].x");
    equal(geometryConvert.components[0].components[1].y,point2.y,"geometryConvert.components[0].components[1].y");
    equal(geometryConvert.components[1].components[0].x,point3.x,"geometryConvert.components[1].components[0].x");
    equal(geometryConvert.components[1].components[0].y,point3.y,"geometryConvert.components[1].components[0].y");
    equal(geometryConvert.components[1].components[1].x,point4.x,"geometryConvert.components[1].components[1].x");
    equal(geometryConvert.components[1].components[1].y,point4.y,"geometryConvert.components[1].components[1].y");
    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.LineString',"geometryConvert.componentTypes[0]");
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.MultiLineString',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_Polygon1",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var point3=new SuperMap.Geometry.Point(10,0);
    var linearRing=new SuperMap.Geometry.LinearRing(new Array(point1,point2,point3));
    var polygon=new SuperMap.Geometry.Polygon(new Array(linearRing));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(polygon);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,1,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],4,"serverGeometry.parts[0]");

    equal(serverGeometry.points.length,4,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");

    iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");

    iString = "CLASS_NAME: " + serverGeometry.points[2].CLASS_NAME + "," + serverGeometry.points[2].x + "," + serverGeometry.points[2].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,0";
    deepEqual(iString,expectString,"serverGeometry.points[2]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[3].CLASS_NAME + "," + serverGeometry.points[3].x + "," + serverGeometry.points[3].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[3]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.REGION,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,1,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,1,"geometryConvert.componentTypes.length");
    //equal(geometryConvert.getVertices().length,3,"geometryConvert.getVertices().length");
    equal(geometryConvert.components[0].components[0].components.length,4,"geometryConvert.components[0].components.length");
    equal(geometryConvert.components[0].components[0].components[0].x,point1.x,"geometryConvert.components[0].components[0].x");
    equal(geometryConvert.components[0].components[0].components[0].y,point1.y,"geometryConvert.components[0].components[0].y");
    equal(geometryConvert.components[0].components[0].components[1].x,point2.x,"geometryConvert.components[0].components[1].x");
    equal(geometryConvert.components[0].components[0].components[1].y,point2.y,"geometryConvert.components[0].components[1].y");
    equal(geometryConvert.components[0].components[0].components[2].x,point3.x,"geometryConvert.components[0].components[2].x");
    equal(geometryConvert.components[0].components[0].components[2].y,point3.y,"geometryConvert.components[0].components[2].y");
    equal(geometryConvert.components[0].components[0].components[3].x,point1.x,"geometryConvert.components[0].components[2].x");
    equal(geometryConvert.components[0].components[0].components[3].y,point1.y,"geometryConvert.components[0].components[2].y");

    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.Polygon',"geometryConvert.componentTypes[0]");
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.MultiPolygon',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_Polygon2",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var point3=new SuperMap.Geometry.Point(10,0);
    var point4=new SuperMap.Geometry.Point(20,0);
    var point5=new SuperMap.Geometry.Point(20,20);
    var point6=new SuperMap.Geometry.Point(30,0);
    var linearRing1=new SuperMap.Geometry.LinearRing(new Array(point1,point2,point3));
    var linearRing2=new SuperMap.Geometry.LinearRing(new Array(point4,point5,point6));
    var polygon=new SuperMap.Geometry.Polygon(new Array(linearRing1,linearRing2));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(polygon);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,2,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],4,"serverGeometry.parts[0]");
    equal(serverGeometry.parts[1],4,"serverGeometry.parts[1]");

    equal(serverGeometry.points.length,8,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");

    iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");

    iString = "CLASS_NAME: " + serverGeometry.points[2].CLASS_NAME + "," + serverGeometry.points[2].x + "," + serverGeometry.points[2].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,0";
    deepEqual(iString,expectString,"serverGeometry.points[2]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[3].CLASS_NAME + "," + serverGeometry.points[3].x + "," + serverGeometry.points[3].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[3]");

    iString = "CLASS_NAME: " + serverGeometry.points[4].CLASS_NAME + "," + serverGeometry.points[4].x + "," + serverGeometry.points[4].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,0";
    deepEqual(iString,expectString,"serverGeometry.points[4]");

    iString = "CLASS_NAME: " + serverGeometry.points[5].CLASS_NAME + "," + serverGeometry.points[5].x + "," + serverGeometry.points[5].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,20";
    deepEqual(iString,expectString,"serverGeometry.points[5]");

    iString = "CLASS_NAME: " + serverGeometry.points[6].CLASS_NAME + "," + serverGeometry.points[6].x + "," + serverGeometry.points[6].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,30,0";
    deepEqual(iString,expectString,"serverGeometry.points[6]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[7].CLASS_NAME + "," + serverGeometry.points[7].x + "," + serverGeometry.points[7].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,0";
    deepEqual(iString,expectString,"serverGeometry.points[7]");
    
    equal(serverGeometry.type,SuperMap.REST.GeometryType.REGION,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,2,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,1,"geometryConvert.componentTypes.length");
    //equal(geometryConvert.getVertices().length,6,"geometryConvert.getVertices().length");
    equal(geometryConvert.components[0].components[0].components.length,4,"geometryConvert.components[0].components.length");
    equal(geometryConvert.components[1].components[0].components.length,4,"geometryConvert.components[1].components.length");
    equal(geometryConvert.components[0].components[0].components[0].x,point1.x,"geometryConvert.components[0].components[0].x");
    equal(geometryConvert.components[0].components[0].components[0].y,point1.y,"geometryConvert.components[0].components[0].y");
    equal(geometryConvert.components[0].components[0].components[1].x,point2.x,"geometryConvert.components[0].components[1].x");
    equal(geometryConvert.components[0].components[0].components[1].y,point2.y,"geometryConvert.components[0].components[1].y");
    equal(geometryConvert.components[0].components[0].components[2].x,point3.x,"geometryConvert.components[0].components[2].x");
    equal(geometryConvert.components[0].components[0].components[2].y,point3.y,"geometryConvert.components[0].components[2].y");
    equal(geometryConvert.components[0].components[0].components[3].x,point1.x,"geometryConvert.components[0].components[2].x");
    equal(geometryConvert.components[0].components[0].components[3].y,point1.y,"geometryConvert.components[0].components[2].y");
    
    equal(geometryConvert.components[1].components[0].components[0].x,point4.x,"geometryConvert.components[1].components[0].x");
    equal(geometryConvert.components[1].components[0].components[0].y,point4.y,"geometryConvert.components[1].components[0].y");
    equal(geometryConvert.components[1].components[0].components[1].x,point5.x,"geometryConvert.components[1].components[1].x");
    equal(geometryConvert.components[1].components[0].components[1].y,point5.y,"geometryConvert.components[1].components[1].y");
    equal(geometryConvert.components[1].components[0].components[2].x,point6.x,"geometryConvert.components[1].components[2].x");
    equal(geometryConvert.components[1].components[0].components[2].y,point6.y,"geometryConvert.components[1].components[2].y");
    equal(geometryConvert.components[1].components[0].components[3].x,point4.x,"geometryConvert.components[1].components[0].x");
    equal(geometryConvert.components[1].components[0].components[3].y,point4.y,"geometryConvert.components[1].components[0].y");

    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.Polygon',"geometryConvert.componentTypes[0]");
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.MultiPolygon',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_MultiPolygon",function(){
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var point3=new SuperMap.Geometry.Point(10,0);
    var point4=new SuperMap.Geometry.Point(20,0);
    var point5=new SuperMap.Geometry.Point(20,20);
    var point6=new SuperMap.Geometry.Point(30,0);
    var linearRing1=new SuperMap.Geometry.LinearRing(new Array(point1,point2,point3));
    var linearRing2=new SuperMap.Geometry.LinearRing(new Array(point4,point5,point6));
    var polygon1=new SuperMap.Geometry.Polygon(new Array(linearRing1));
    var polygon2=new SuperMap.Geometry.Polygon(new Array(linearRing2));
    var multiPolygon=new SuperMap.Geometry.MultiPolygon(new Array(polygon1,polygon2));
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry(multiPolygon);
    ok(serverGeometry!=null,"serverGeometry");
    equal(serverGeometry.parts.length,2,"serverGeometry.parts.length");
    equal(serverGeometry.parts[0],4,"serverGeometry.parts[0]");
    equal(serverGeometry.parts[1],4,"serverGeometry.parts[1]");

    equal(serverGeometry.points.length,8,"serverGeometry.points.length");
    
    var iString = "CLASS_NAME: " + serverGeometry.points[0].CLASS_NAME + "," + serverGeometry.points[0].x + "," + serverGeometry.points[0].y;
    var expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[0]");

    iString = "CLASS_NAME: " + serverGeometry.points[1].CLASS_NAME + "," + serverGeometry.points[1].x + "," + serverGeometry.points[1].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,10";
    deepEqual(iString,expectString,"serverGeometry.points[1]");

    iString = "CLASS_NAME: " + serverGeometry.points[2].CLASS_NAME + "," + serverGeometry.points[2].x + "," + serverGeometry.points[2].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,10,0";
    deepEqual(iString,expectString,"serverGeometry.points[2]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[3].CLASS_NAME + "," + serverGeometry.points[3].x + "," + serverGeometry.points[3].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,0,0";
    deepEqual(iString,expectString,"serverGeometry.points[3]");

    iString = "CLASS_NAME: " + serverGeometry.points[4].CLASS_NAME + "," + serverGeometry.points[4].x + "," + serverGeometry.points[4].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,0";
    deepEqual(iString,expectString,"serverGeometry.points[4]");

    iString = "CLASS_NAME: " + serverGeometry.points[5].CLASS_NAME + "," + serverGeometry.points[5].x + "," + serverGeometry.points[5].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,20";
    deepEqual(iString,expectString,"serverGeometry.points[5]");

    iString = "CLASS_NAME: " + serverGeometry.points[6].CLASS_NAME + "," + serverGeometry.points[6].x + "," + serverGeometry.points[6].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,30,0";
    deepEqual(iString,expectString,"serverGeometry.points[6]");
    
    iString = "CLASS_NAME: " + serverGeometry.points[7].CLASS_NAME + "," + serverGeometry.points[7].x + "," + serverGeometry.points[7].y;
    expectString = "CLASS_NAME: SuperMap.Geometry.Point,20,0";
    deepEqual(iString,expectString,"serverGeometry.points[7]");

    equal(serverGeometry.type,SuperMap.REST.GeometryType.REGION,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");

    var geometryConvert=serverGeometry.toGeometry();
    ok(geometryConvert!=null,"serverGeometry");
    equal(geometryConvert.components.length,2,"geometryConvert.components.length");
    equal(geometryConvert.componentTypes.length,1,"geometryConvert.componentTypes.length");
    //equal(geometryConvert.getVertices().length,6,"geometryConvert.getVertices().length");
    equal(geometryConvert.components[0].components[0].components.length,4,"geometryConvert.components[0].components.length");
    equal(geometryConvert.components[1].components[0].components.length,4,"geometryConvert.components[1].components.length");
    equal(geometryConvert.components[0].components[0].components[0].x,point1.x,"geometryConvert.components[0].components[0].x");
    equal(geometryConvert.components[0].components[0].components[0].y,point1.y,"geometryConvert.components[0].components[0].y");
    equal(geometryConvert.components[0].components[0].components[1].x,point2.x,"geometryConvert.components[0].components[1].x");
    equal(geometryConvert.components[0].components[0].components[1].y,point2.y,"geometryConvert.components[0].components[1].y");
    equal(geometryConvert.components[0].components[0].components[2].x,point3.x,"geometryConvert.components[0].components[2].x");
    equal(geometryConvert.components[0].components[0].components[2].y,point3.y,"geometryConvert.components[0].components[2].y");
    equal(geometryConvert.components[0].components[0].components[3].x,point1.x,"geometryConvert.components[0].components[2].x");
    equal(geometryConvert.components[0].components[0].components[3].y,point1.y,"geometryConvert.components[0].components[2].y");
    
    equal(geometryConvert.components[1].components[0].components[0].x,point4.x,"geometryConvert.components[1].components[0].x");
    equal(geometryConvert.components[1].components[0].components[0].y,point4.y,"geometryConvert.components[1].components[0].y");
    equal(geometryConvert.components[1].components[0].components[1].x,point5.x,"geometryConvert.components[1].components[1].x");
    equal(geometryConvert.components[1].components[0].components[1].y,point5.y,"geometryConvert.components[1].components[1].y");
    equal(geometryConvert.components[1].components[0].components[2].x,point6.x,"geometryConvert.components[1].components[2].x");
    equal(geometryConvert.components[1].components[0].components[2].y,point6.y,"geometryConvert.components[1].components[2].y");
    equal(geometryConvert.components[1].components[0].components[3].x,point4.x,"geometryConvert.components[1].components[0].x");
    equal(geometryConvert.components[1].components[0].components[3].y,point4.y,"geometryConvert.components[1].components[0].y");

    equal(geometryConvert.componentTypes[0],'SuperMap.Geometry.Polygon',"geometryConvert.componentTypes[0]");
    equal(geometryConvert.CLASS_NAME,'SuperMap.Geometry.MultiPolygon',"geometryConvert.CLASS_NAME");

    serverGeometry.destroy();
    ok(serverGeometry.id==null,"serverGeometry.id");
    ok(serverGeometry.parts==null,"serverGeometry.parts");
    ok(serverGeometry.points==null,"serverGeometry.points");
    ok(serverGeometry.type==null,"serverGeometry.type");
    ok(serverGeometry.style==null,"serverGeometry.style");
});

test("TestFromGeometry_GeometryNull",function(){
    var point=new SuperMap.Geometry.Point(10,10);
    var serverGeometry=SuperMap.REST.ServerGeometry.fromGeometry();
    equal(serverGeometry,undefined,"serverGeometry");
    
    var serverGeometry2=SuperMap.REST.ServerGeometry.fromGeometry(point);
    serverGeometry2.parts.length = 0;
    var geometryConvert=serverGeometry2.toGeometry();
    deepEqual(geometryConvert,null,"testServerGeometry.toGeometry()");
    
    
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var linearRing=new SuperMap.Geometry.LinearRing(new Array(point1,point2,point1));
    var serverGeometry2=SuperMap.REST.ServerGeometry.fromGeometry(linearRing);
    serverGeometry2.parts.length = 0;
    
    var geometryConvert2=serverGeometry2.toGeometry();
    deepEqual(geometryConvert2,null,"testServerGeometry.toGeometry()");
    
    var point1=new SuperMap.Geometry.Point(0,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var point3=new SuperMap.Geometry.Point(10,0);
    var linearRing2=new SuperMap.Geometry.LinearRing(new Array(point1,point2,point3));
    var polygon=new SuperMap.Geometry.Polygon(new Array(linearRing));
    var serverGeometry3=SuperMap.REST.ServerGeometry.fromGeometry(polygon);
    serverGeometry3.parts.length = 0;

    var geometryConvert3=serverGeometry3.toGeometry();
    deepEqual(geometryConvert3,null,"testServerGeometry.toGeometry()");

});

test("TestFromGeometry_fromJson_null",function(){
    var serverGeometry=SuperMap.REST.ServerGeometry.fromJson();
    equal(serverGeometry,undefined,"serverGeometry");
});