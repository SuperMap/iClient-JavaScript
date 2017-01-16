module('MultiPoint');
test("testMultiPoint_constructor",function(){
    var point1 = new SuperMap.Geometry.Point(5,6);
    var point2 = new SuperMap.Geometry.Point(7,8);
    var multiPoint = new SuperMap.Geometry.MultiPoint([point1,point2]);
    var isok = false;
    if (multiPoint.components[0].x == point1.x && multiPoint.components[0].y == point1.y
    && multiPoint.components[1].x == point2.x && multiPoint.components[1].y == point2.y){
        isok = true;
    }
    ok(isok,"property:MultiPoint");
    point1.destroy();
    point2.destroy();
    multiPoint.destroy();
});
test("testMultiPoint_addPoint",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(5,6);
    var point2 = new SuperMap.Geometry.Point(7,8);
    var multiPoint = new SuperMap.Geometry.MultiPoint([point1,point2]);
    var point = new SuperMap.Geometry.Point(9,10);
    multiPoint.addPoint(point,1);
    var isok = false;
    var cpns=multiPoint.components;
    for(var pi= 0,len=cpns.length;pi<len;pi++){
        var cpn=cpns[pi];
        if(cpn.id===point.id&&cpn.x===point.x&&cpn.y===point.y){
            isok=true;
            break;
        }
    }
    ok(isok,"Function:addPoint");
    point.destroy();
    point1.destroy();
    point2.destroy();
    multiPoint.destroy();
});
test("testMultiPoint_removeComponent",function(){
    expect(1);
    var point1 = new SuperMap.Geometry.Point(1,2);
    var point2 = new SuperMap.Geometry.Point(3,4);
    var multiPoint = new SuperMap.Geometry.MultiPoint([point1,point2]);
    multiPoint.removeComponent(point1);
    var isok = true;
    var cpns=multiPoint.components;
    for(var pi= 0,len=cpns.length;pi<len;pi++){
        var cpn=cpns[pi];
        if(cpn.id===point1.id&&cpn.x===point1.x&&cpn.y===point1.y){
            isok=false;
            break;
        }
    }
    ok(isok,"Function:removeComponent");
    point1.destroy();
    point2.destroy();
    multiPoint.destroy();
});