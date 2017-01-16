module('Primitives');

var pri = new SuperMap.Geometry.Primitives();
var cp = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(4, 3)];
var p1 = new SuperMap.Geometry.Point(10, 10);
var p2 = new SuperMap.Geometry.Point(100, 100);
var ec = new SuperMap.Geometry.Point(0,0);
var pts = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(50, 50), new SuperMap.Geometry.Point(80, 0)];
test("testPrimitives_Constructor", function () {
    var pri = new SuperMap.Geometry.Primitives();
    equal(pri.CLASS_NAME, "SuperMap.Geometry.Primitives", "function:CLASS_NAME")
});

test("testPrimitives_kidney", function () {
    var kidneyPts = pri.kidney(pts);
    var b = false;
    var cells = kidneyPts.components[0].components;
    for(var i = 0; i < cells.length; i++){
        if(SuperMap.Plot.PlottingUtil.equalFuzzy(pts[0].x, cells[i].x) &&
            SuperMap.Plot.PlottingUtil.equalFuzzy(pts[0].y, cells[i].y)){
            b = true;
            break;
        }
    }
    equal(b, true, "Functyion:kidney");

});

test("testPrimitives_circle", function () {
    var circle = pri.circle(cp);
    equal(Math.round(circle.components[0].components[1].x), 5, "Function:circle");
    equal(Math.round(circle.components[0].components[1].y), 1, "Function:circle");

});

test("testPrimitives_rectangle", function () {
    var circle = pri.rectangle(cp);
    equal(circle.components[0].components[1].x, 4, "Function:rectangle");
    equal(circle.components[0].components[1].y, 0, "Function:rectangle");
});

test("testPrimitives_geotext", function () {
    var txt = "SuperMap";
    var geotext = pri.geotext(pts, txt);
    equal(geotext.text, "SuperMap", "Function:geotext");
});

test("testPrimitives_ellipse", function () {
    var majorAxis = 9;
    var minorAxis = 3;
    var dRotation = 30;
    var isCalculate = true;
    var getArcPoints = pri.ellipse(pts, dRotation, isCalculate,majorAxis, minorAxis);
    equal(Math.round(getArcPoints.components[0].x), 8, "Function:ellipse");
    equal(Math.round(getArcPoints.components[0].y), 4, "Function:ellipse");

});

test("testPrimitives_getArcSpatialData", function () {
    var majorAxis = 9;
    var minorAxis = 3;
    var dRotation = 0;
    var dStep = Math.PI*2 / 72;
    var getArcPoints = pri.getArcSpatialData(ec, majorAxis, minorAxis, dRotation, 0, Math.PI*2, dStep);
    equal(getArcPoints[0].x, 9, "Function:getEllipseSpatialData");
    equal(getArcPoints[0].y, 0, "Function:getEllipseSpatialData");
});

test("testPrimitives_calcEllipseRadian", function () {
    var a = Math.PI / 4;
    var majorAxis = 9;
    var minorAxis = 3;
    var calcEllipseRadian = pri.calcEllipseRadian(a, majorAxis, minorAxis);
    equal(Math.round(calcEllipseRadian), 1, "Function:getEllipseSpatialData");
});

test("testPrimitives_getArcInfo", function () {
    var p1 = new SuperMap.Geometry.Point(-2, 0);
    var p2 = new SuperMap.Geometry.Point(2, 0);
    var p3 = new SuperMap.Geometry.Point(0, 2);
    var arcInfo = SuperMap.Geometry.Primitives.getArcInfo(p1, p3, p2);
    equal(arcInfo.dRadius, 2, "Function:getArcInfo.dRadius");
    equal(arcInfo.dStartAngle, 0, "Function:getArcInfo.startAngle");
    equal(arcInfo.dEndAngle, 180, "Function:getArcInfo.endAngle");
});

test("testPrimitives_getSpatialData", function () {
    var points1=[new SuperMap.Geometry.Point(86, 45),
        new SuperMap.Geometry.Point(103, 24),
        new SuperMap.Geometry.Point(121, 45)];

    var linearRing = new SuperMap.Geometry.LinearRing(points1);
    var components1 =  SuperMap.Geometry.Primitives.getSpatialData(linearRing);
    equal(linearRing.components[0].x,components1[0].x , "Function:getSpatialData ");
    equal(linearRing.components.length,components1.length,  "Function:getSpatialData ");

    var lineString=new SuperMap.Geometry.LineString(points1);
    var components2 =  SuperMap.Geometry.Primitives.getSpatialData(lineString);
    equal(lineString.components[0].x,components2[0].x , "Function:getSpatialData ");

    var polygon = new SuperMap.Geometry.Polygon([linearRing]);
    var components3 =  SuperMap.Geometry.Primitives.getSpatialData(polygon);
    equal(polygon.components[0].components[0].x,components3[0].x , "Function:getSpatialData ");
});

test("testPrimitives_transformSymbolCellToGeometry",function(){
    var types=[24,390,590,360,28,32,29,26,34,380,370,44,31,48,0];
    var controlPoints= [new SuperMap.Geometry.Point(86, 45),
        new SuperMap.Geometry.Point(103, 24),
        new SuperMap.Geometry.Point(121, 45)];
    var textContent="图元注记";
    var dAngle=30;
    var isCalculate=true;
    for(var i=0;i<types.length;i++){
        var type=types[i];
        if(type===24){
            var polyline=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(polyline !== null, "polyline not null");
        }else if(type===390){
            var kidney=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(kidney !== null, "kidney not null");
        }else if(type===590){
            var bezier=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(bezier !== null, "bezier not null");
        }else if(type===360){
            var loopbezier=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(loopbezier !== null, "loopbezier not null");
        }else if(type===28){
            var parallelogram=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(parallelogram !== null, "parallelogram not null");
        }else if(type===32){
            var polygon=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(polygon !== null, "polygon not null");
        }else if(type===29){
            var circlecontrolPoints=[new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(4, 3)];
            var circle=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,circlecontrolPoints,textContent,dAngle,isCalculate);
            ok(circle !== null, "circle not null");
        }else if(type===26){
            var rectangle=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(rectangle !== null, "rectangle not null");
        }else if(type===34){
            var geotext=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(geotext !== null, "geotext not null");
            equal(geotext.text, textContent, "Function:transformSymbolCellToGeometry");
        }else if(type===380){
            var sector=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(sector !== null, "sector not null");
        }else if(type===370){
            var lune=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(lune !== null, "lune not null");
        }else if(type===44){
            var arc=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(arc !== null, "arc not null");
        }else if(type===31){
            if(controlPoints.length===4){
                controlPoints =[new SuperMap.Geometry.Point(86, 45), new SuperMap.Geometry.Point(103, 24), new SuperMap.Geometry.Point(121, 45)];
            }
            var ellipse=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(ellipse !== null, "ellipse not null");
        }else if(type===48){
            var parallelline=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(parallelline !== null, "parallelline not null");
        }else if(type===0){
            var test=SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(type,controlPoints,textContent,dAngle,isCalculate);
            ok(test === undefined, "test is undefined");
        }
    }
});

//test("testPrimitives_getArcPoints",2, function () {
//    var controlPoints = [
//        new SuperMap.Geometry.Point(0, 10),
//        new SuperMap.Geometry.Point(11, 20),
//        new SuperMap.Geometry.Point(21, 30),
//        new SuperMap.Geometry.Point(31, 40)
//    ];
//    var getArcPoints = pri.getArcPoints(controlPoints);
//    equal(getArcPoints.allpoints[0].x, 0, "Function:getArcPoints");
//    equal(getArcPoints.allpoints[0].y, 10, "Function:getArcPoints");
//    getArcPoints = null;
//});
//test("testPrimitives_calculateMidpoint", 2, function () {
//    var calculateMidpoint = pri.calculateMidpoint(p1, p2);
//    equal(calculateMidpoint.x, 55, "Function:calculateMidpoint");
//    equal(calculateMidpoint.y, 55, "Function:calculateMidpoint");
//    calculateMidpoint = null;
//});
//test("testPrimitives_calculateIntersection", 2, function () {
//    var v_1 = new SuperMap.Geometry.Point(-3, -4);
//    var v_2 = new SuperMap.Geometry.Point(-5, -6);
//    var point1 = new SuperMap.Geometry.Point(-1, 0);
//    var point2 = new SuperMap.Geometry.Point(0, -0.2);
//    var calculateIntersection = pri.calculateIntersection(v_1, v_2, point1, point2);
//    equal(calculateIntersection.x, -11.5, "Function:calculateIntersection");
//    equal(calculateIntersection.y, -14, "Function:calculateIntersection");
//    v_1 = v_2 = point1 = point2 = null;
////});
//test("testPrimitives_calculateDistance", 1, function () {
//    var ps = new SuperMap.Geometry.Point(1, 3);
//    var pe = new SuperMap.Geometry.Point(4, 7);
//    var calculateDistance = pri.calculateDistance(ps, pe);
//    equal(calculateDistance, 5, "Function:calculateDistance");
//    ps = null;
//    pe = null;
//});
//test("testPrimitives_calculateAngle", 1, function () {
//    var cp = new SuperMap.Geometry.Point(0, 0);
//    var cp1 = new SuperMap.Geometry.Point(1, 0);
//    var calculateAngle = pri.calculateAngle(cp1, cp);
//    equal(calculateAngle, 0, "Function:calculateAngle");
//    cp = null;
//    cp1 = null;
//    calculateAngle = null;
//});