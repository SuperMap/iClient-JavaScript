module("Area");

test("testArea_defaultConstructor",6,function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.util instanceof SuperMap.LevelRenderer.Tool.Util,"Property:util");
    ok(area.curve instanceof SuperMap.LevelRenderer.Tool.Curve,"Property:curve");
    ok(area._ctx===null,"Property:_ctx");
    equal(area.PI2,Math.PI*2,"Property:PI2");
    ok(SuperMap.Util.isArray(area.roots),"Property:roots");
    ok(SuperMap.Util.isArray(area.extrema),"Property:extrema");
});

test("testArea_normalizeRadian",1,function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    var angle=30*Math.PI/180;
    equal(area.normalizeRadian(angle),angle,"angle");
});

test("testArea_isInsideLine",1,function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideLine(0,0,1,1,5,0.5,0.5),"inside");
});

test("testArea_isInsideCubicStroke",1,function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideCubicStroke(0,0,1,1,2,2,3,3,5,1,1),"inside");
});

test("testArea_isInsideQuadraticStroke",1,function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideQuadraticStroke(0,0,1,1,2,2,5,1,1),"inside");
});

test("testArea_isInsideArcStroke",2,function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideQuadraticStroke(0,0,1,0,Math.PI,true,5,0,1),"inside_up");
    ok(area.isInsideQuadraticStroke(0,0,1,0,Math.PI,false,5,0,-1),"inside_down");
});

test("testArea_isInsideBrokenLine",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideBrokenLine([[0,0],[1,1]],5,0.5,0.5),"inside brokenline");
});

test("testArea_isInsideRing",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideRing(0,0,1,2,1.5,0),"inside ring")
});

test("testArea_isInsideRect",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideRect(0,0,5,5,1,1),"inside rect");
});

test("testArea_isInsideCircle",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideCircle(0,0,2,1,1),"inside circle");
});

test("testArea_isInsideSector",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsideSector(0,0,1,2,0,Math.PI,true,5,0,1),"inside sector up");
    ok(area.isInsideSector(0,0,1,2,0,Math.PI,false,5,0,-1),"inside sector down");
});

test("testArea_isInsidePolygon",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.isInsidePolygon([[0,0],[1,0],[1,1],[0,1]],0.5,0.5),"inside polygon");
});

test("testArea_swapExtrema",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    var e0=area.extrema[0],
        e1=area.extrema[1];
    area.swapExtrema();
    equal(area.extrema[0],e1,"extrema0");
    equal(area.extrema[1],e0,"extrema0");
});

test("testArea_getTextWidth",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.getTextWidth("a","25px Arial")>0,"textWidth");
});
test("testArea_getTextHeight",function(){
    var area=new SuperMap.LevelRenderer.Tool.Area();
    ok(area.getTextHeight("a","25px Arial")>25,"textHeight");
});

