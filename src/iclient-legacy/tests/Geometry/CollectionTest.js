/**
 * Created by zhaoq on 2015/7/28.
 */
module('Collection');
test("testCollection_constructorDefault",function(){
    expect(1);
    var col = new SuperMap.Geometry.Collection();
    equal(col.components.length,0,"");
    col.destroy();
});
test("testCollection_constructor",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var isOk3 = false;
    if(col.components[0].id == point1.id && col.components[1].id == point2.id){
        isOk3 = true;
    }
    ok(isOk3, "property:constructor");
    point1.destroy();
    point2.destroy();
    col.destroy();
});
test("testCollection_destroy",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    col.destroy();
    equal(col.components,null,"Function:destroy");
    point1.destroy();
    point2.destroy();
});
test("testCollection_clone",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var colclone = col.clone();
    var isok1 = false;
    if(colclone.components[0].x == col.components[0].x && colclone.components[0].y == col.components[0].y
        && colclone.components[1].x == col.components[1].x && colclone.components[1].y == col.components[1].y){
        isok1 = true;
    }
    ok(isok1,"Function:clone");
    point1.destroy();
    point2.destroy();
    col.destroy();
    colclone.destroy();
});
test("testCollection_getComponentsString",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var colStr = col.getComponentsString();
    var isok = false;
    if(colStr == "10, 20,30, 40"){
        isok = true;
    }
    ok(isok,"Function:getComponentsString");
    point1.destroy();
    point2.destroy();
    col.destroy();
});
test("testCollection_calculateBounds",function(){
    expect(4);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    col.calculateBounds();
    equal(col.bounds.left,10,"Function:calculateBounds");
    equal(col.bounds.bottom,20,"Function:calculateBounds");
    equal(col.bounds.right,30,"Function:calculateBounds");
    equal(col.bounds.top,40,"Function:calculateBounds");
    point1.destroy();
    point2.destroy();
    col.destroy();
});
test("testCollection_addComponents",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var components = new SuperMap.Geometry.Point(10,10);
    col.addComponents(components);
    var isok = false;
    if(col.components[0].id == point1.id && col.components[1].id == point2.id
    && col.components[2].id == components.id){
        isok = true;
    }
    ok(isok,"Function:addComponents");
    point1.destroy();
    point2.destroy();
    col.destroy();
    components.destroy();
});
test("testCollection_addComponent",function(){
    expect(3);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var component = new SuperMap.Geometry.Point(50,60);
    var index = 2;
    var isaddComponent = col.addComponent(component,index);
    equal(isaddComponent,true,"Function:addComponent");
    var isaddComponent1 = col.addComponent();
    equal(isaddComponent1,false,"Function:addComponent");
    var component1 = new SuperMap.Geometry.Point(60,60);
    var isaddComponent2 = col.addComponent(component1);
    equal(isaddComponent2,true,"Function:addComponent");
    point1.destroy();
    point2.destroy();
    col.destroy();
    component.destroy();
    component1.destroy();
});
test("testCollection_removeComponents",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var components = new SuperMap.Geometry.Point(50,60);
    var isremoveComponents = col.removeComponents(components);
    equal(isremoveComponents,true,"Function:components");
    point1.destroy();
    point2.destroy();
    col.destroy();
    components.destroy();
});
test("testCollection_removeComponent",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var component = new SuperMap.Geometry.Point(50,60);
    var isremoveComponent = false;
    isremoveComponent = col.removeComponent(component);
    equal(isremoveComponent,true,"Function:removeComponent");
    point1.destroy();
    point2.destroy();
    col.destroy();
    component.destroy();
});
test("testCollection_getLength",function(){
    expect(1);
    var point1 = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20)],
        line1 = new SuperMap.Geometry.LineString(point1);
    var point2 = [new SuperMap.Geometry.Point(10,40),new SuperMap.Geometry.Point(30,40)],
        line2 = new SuperMap.Geometry.LineString(point2);
    var col = new SuperMap.Geometry.Collection([line1,line2]);
    var len = col.getLength();
    equal(len,40,"Function:getLength");
    line1.destroy();
    line2.destroy();
    col.destroy();
});
test("testCollection_getArea1:",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),
        new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var area = col.getArea();
    equal(area,200,"Function:getArea");
    region.destroy();
    col.destroy();
});
test("testCollection_getGeodesicArea",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),new SuperMap.Geometry.Point(10,40),
            new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var projection = new SuperMap.Projection("EPSG:4326");
    var GeodesicArea = col.getGeodesicArea(projection);
    var isok = false;
    if(GeodesicArea != 0){
        isok = true;
    }
    ok(isok,"Function:getGeodesicArea");
    region.destroy();
    col.destroy();
    projection.destroy();
});
test("testCollection_getGeodesicAreadefault",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),new SuperMap.Geometry.Point(10,40),
            new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var projection = new SuperMap.Projection();
    var GeodesicArea = col.getGeodesicArea(projection);
    var isok = false;
    if(GeodesicArea != 0){
        isok = true;
    }
    ok(isok,"Function:getGeodesicAreadefault");
    region.destroy();
    col.destroy();
    projection.destroy();
});
test("testCollection_getCentroid1",function(){
    expect(2);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var point3 = new SuperMap.Geometry.Point(30,40);
    var linearRings1 = new SuperMap.Geometry.LinearRing([point1,point2,point3]);
    var region1 = new SuperMap.Geometry.Polygon([linearRings1]);
    var point5 = new SuperMap.Geometry.Point(40,20);
    var point6 = new SuperMap.Geometry.Point(50,20);
    var point7 = new SuperMap.Geometry.Point(50,40);
    var linearRings2 = new SuperMap.Geometry.LinearRing([point5,point6,point7]);
    var region2 = new SuperMap.Geometry.Polygon([linearRings2]);
    var col = new SuperMap.Geometry.Collection([region1,region2]);
    var centroid = col.getCentroid(false);
    var num1 = centroid.x.toFixed(2);
    var num2 = centroid.y.toFixed(2);
    equal(num1,23.33,"Function:getCentroid1");
    equal(num2,26.67,"Function:getCentroid1");
    region1.destroy();
    region2.destroy();
    col.destroy();
});
test("testCollection_getCentroid2",function(){
    expect(2);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var point3 = new SuperMap.Geometry.Point(30,40);
    var linearRings1 = new SuperMap.Geometry.LinearRing([point1,point2,point3]);
    var region1 = new SuperMap.Geometry.Polygon([linearRings1]);
    var point5 = new SuperMap.Geometry.Point(40,20);
    var point6 = new SuperMap.Geometry.Point(50,20);
    var point7 = new SuperMap.Geometry.Point(50,40);
    var linearRings2 = new SuperMap.Geometry.LinearRing([point5,point6,point7]);
    var region2 = new SuperMap.Geometry.Polygon([linearRings2]);
    var col = new SuperMap.Geometry.Collection([region1,region2]);
    var centroid = col.getCentroid(true);
    var num1 = centroid.x.toFixed(2);
    var num2 = centroid.y.toFixed(2);
    equal(num1,31.11,"Function:getCentroid2");
    equal(num2,26.67,"Function:getCentroid2");
    region1.destroy();
    region2.destroy();
    col.destroy();
});
test("testCollection_getGeodesicLength",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),new SuperMap.Geometry.Point(10,40),
            new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var projection = new SuperMap.Projection("EPSG:4326");
    var GeodesicArea = col.getGeodesicLength(projection);
    var isok = false;
    if(GeodesicArea != 0){
        isok = true;
    }
    ok(isok,"Function:getGeodesicLength");
    region.destroy();
    col.destroy();
    projection.destroy();
});
test("testCollection_getGeodesicLengthdefault",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),new SuperMap.Geometry.Point(10,40),
            new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var projection = new SuperMap.Projection();
    var GeodesicArea = col.getGeodesicLength(projection);
    var isok = false;
    if(GeodesicArea != 0){
        isok = true;
    }
    ok(isok,"Function:getGeodesicLengthdefault");
    region.destroy();
    col.destroy();
    projection.destroy();
});
test("testCollection_move",function(){
    expect(3);
    var point = new SuperMap.Geometry.Point(10,20);
    var col = new SuperMap.Geometry.Collection([point]);
    var x = 10;
    var y = 10;
    col.move(x,y);
    equal(col.components[0].x,20,"Function:move");
    equal(col.components[0].y,30,"Function:move");
    equal(col.bounds,null,"Function:move");
    point.destroy();
    col.destroy();
});
test("testCollection_rotate",function(){
    expect(2);
    var point = new SuperMap.Geometry.Point(10,20);
    var col = new SuperMap.Geometry.Collection([point]);
    var center = new SuperMap.Geometry.Point(0,0);
    col.rotate(180,center);
    var yy = col.components[0].y;
    var num = yy.toFixed(0);
    equal(parseInt(col.components[0].x),-10,"Function:move");
    equal(num,-20,"Function:move");
    point.destroy();
    col.destroy();
});
test("testCollection_resize",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),
            new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var scale = 4;
    var origin = new SuperMap.Geometry.Point(0,0);
    var ratio = 2;
    var geo = col.resize(scale,origin,ratio);
    var isok = false;
    if(geo.area != 0 && geo.area != 200){
        isok = true;
    }
    ok(isok,"Function:resize");
    region.destroy();
    col.destroy();
});
test("testCollection_resizedefault",function(){
    expect(1);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),
            new SuperMap.Geometry.Point(30,40)],
        linearRings = new SuperMap.Geometry.LinearRing(points),
        region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var scale = 4;
    var origin = new SuperMap.Geometry.Point(0,0);
    var geo = col.resize(scale,origin);
    var isok = false;
    if(geo.area != 0 && geo.area != 200){
        isok = true;
    }
    ok(isok,"Function:resize");
    region.destroy();
    col.destroy();
});
test("testCollection_distanceTo",function(){
    expect(1);
    var point= new SuperMap.Geometry.Point(0,0);
    var point1= new SuperMap.Geometry.Point(10,0);
    var col = new SuperMap.Geometry.Collection([point]);
    var num=col.distanceTo(point1);
    equals(num,10,"Function:distanceTo");
    point.destroy();
    point1.destroy();
});
test("testCollection_distanceTo1",function(){
    expect(1);
    var point= new SuperMap.Geometry.Point(0,0);
    var point1= new SuperMap.Geometry.Point(10,0);
    var col = new SuperMap.Geometry.Collection([point]);
    var num=col.distanceTo(point1,{details:true,edge:false});
    equals(num,10,"Function:distanceTo");
    point.destroy();
    point1.destroy();
});
test("testCollection_distanceTo2",function(){
    expect(1);
    var point= new SuperMap.Geometry.Point(0,0);
    var point1= new SuperMap.Geometry.Point(10,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var line= new SuperMap.Geometry.LineString([point1,point2]);
    var col = new SuperMap.Geometry.Collection([point]);
    var num=col.distanceTo(line,{details:true,edge:false});
    equals(num,10,"Function:distanceTo");
});
test("testCollection_distanceTo3",function(){
    expect(5);
    var point= new SuperMap.Geometry.Point(0,0);
    var point1= new SuperMap.Geometry.Point(10,0);
    var point2=new SuperMap.Geometry.Point(10,10);
    var line= new SuperMap.Geometry.LineString([point1,point2]);
    var col = new SuperMap.Geometry.Collection([point]);
    var num=col.distanceTo(line,{details:true,edge:true});
    equals(num.x0,0,"Function:distanceTo");
    equals(num.y0,0,"Function:distanceTo");
    equals(num.x1,10,"Function:distanceTo");
    equals(num.y1,0,"Function:distanceTo");
    equals(num.distance,10,"Function:distanceTo");
});
test("testCollection_equals",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var point3 = new SuperMap.Geometry.Point(10,40);
    var point4 = new SuperMap.Geometry.Point(30,40);
    var linearRings =  new SuperMap.Geometry.LinearRing([point1,point2,point3,point4]);
    var region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),new SuperMap.Geometry.Point(30,40)],
        linearRings1 = new SuperMap.Geometry.LinearRing(points),
        geo = new SuperMap.Geometry.Polygon([linearRings1]);
    var isok = true;
    isok = col.equals(geo);
    ok(!isok,"Function:equals");
    region.destroy();
    geo.destroy();
    col.destroy();
});
test("testCollection_transform",function(){
    expect(4);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,40);
    var col = new SuperMap.Geometry.Collection([point1,point2]);
    var source = new SuperMap.Projection("EPSG:4326");
    var dest = new SuperMap.Projection("EPSG:900913");
    var transform = col.transform(source,dest);
    equal(transform.components[0].x,1113194.9077777778,"Function:transform");
    equal(transform.components[0].y,2273030.9266712805,"Function:transform");
    equal(transform.components[1].x,3339584.7233333336,"Function:transform");
    equal(transform.components[1].y,4865942.278825832,"Function:transform");
    point1.destroy();
    point2.destroy();
    col.destroy();
});
test("testCollection_intersectsPointToRegion",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var point3 = new SuperMap.Geometry.Point(10,40);
    var point4 = new SuperMap.Geometry.Point(30,40);
    var linearRings =  new SuperMap.Geometry.LinearRing([point1,point2,point3,point4]);
    var region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var geo =  new SuperMap.Geometry.Point(0,0);
    var isok = col.intersects(geo);
    ok(!isok,"Function:intersectsPointToRegion");
    region.destroy();
    col.destroy();
    geo.destroy();
})
test("testCollection_intersectsLineToRegion",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var point3 = new SuperMap.Geometry.Point(10,40);
    var point4 = new SuperMap.Geometry.Point(30,40);
    var linearRings =  new SuperMap.Geometry.LinearRing([point1,point2,point3,point4]);
    var region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);
    var points = [new SuperMap.Geometry.Point(20,20),new SuperMap.Geometry.Point(20,40)],
        geo = new SuperMap.Geometry.LineString(points);
    var isok = col.intersects(geo);
    ok(isok,"Function:intersectsPointToRegion");
    region.destroy();
    col.destroy();
    geo.destroy();
});
test("testCollection_intersectsRegionToRegion",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var point3 = new SuperMap.Geometry.Point(10,40);
    var point4 = new SuperMap.Geometry.Point(30,40);
    var linearRings =  new SuperMap.Geometry.LinearRing([point1,point2,point3,point4]);
    var region = new SuperMap.Geometry.Polygon([linearRings]);
    var col = new SuperMap.Geometry.Collection([region]);

    var points = [new SuperMap.Geometry.Point(10,20),new SuperMap.Geometry.Point(30,20),new SuperMap.Geometry.Point(30,40)],
        line = new SuperMap.Geometry.LinearRing(points),
        geo = new SuperMap.Geometry.Polygon(line);
    var isok = col.intersects(geo);
    ok(isok,"Function:intersectsPointToRegion");
    region.destroy();
    col.destroy();
    geo.destroy();
});
test("testCollection_getVertices1",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var line = new SuperMap.Geometry.LineString([point1,point2]);
    var col = new SuperMap.Geometry.Collection([line]);
    var vertices = col.getVertices(true);
    var isok = false;
    if(vertices[0] == point1 && vertices[1] == point2){
        isok = true;
    }
    ok(isok,"Function:getVertices1");
    col.destroy();
});
test("testCollection_getVertices2",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var line = new SuperMap.Geometry.LineString([point1,point2]);
    var col = new SuperMap.Geometry.Collection([line]);
    var vertices = col.getVertices(false);
    var isok = true;
    for (var i = 0,len = vertices.length; i < len; i++){
        if ( vertices[i] == null){
            isok = false;
        }
    }
    ok(isok,"Function:getVertices2");
    col.destroy();
});
test("testCollection_getVerticesdefault",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(10,20);
    var point2 = new SuperMap.Geometry.Point(30,20);
    var line = new SuperMap.Geometry.LineString([point1,point2]);
    var col = new SuperMap.Geometry.Collection([line]);
    var vertices = col.getVertices();
    var isok = true;
    for (var i = 0,len = vertices.length; i < len; i++){
        if ( vertices[i] == null){
            isok = false;
        }
    }
    ok(isok,"Function:getVertices2");
    col.destroy();
});








