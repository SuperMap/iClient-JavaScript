module('PlottingUtil');

test("testPlottingUtil_clonePoints", function () {
    var pointObj = new SuperMap.Geometry.Point(1, 1);
    var resuleObj = SuperMap.Plot.PlottingUtil.clonePoints([pointObj]);
    equal(pointObj.x, resuleObj[0].x, "Function.clonePoints");
    equal(pointObj.y, resuleObj[0].y, "Function.clonePoints");
});

test("testPlottingUtil_toJSON", function () {
    var pointObj = new SuperMap.Geometry.Point(1, 1);
    var pointObjx = pointObj.x;
    var stringJson = SuperMap.Plot.PlottingUtil.toJSON(pointObj);
    var backPointObj = JSON.parse(stringJson);
    var backPointObjx = backPointObj.x;
    equal(pointObjx, backPointObjx, "Function.toJSON");
});

test("testPlottingUtil_isRight", function () {
    var pntTest1 = new SuperMap.Geometry.Point(1, 1);
    var pntStart1 = new SuperMap.Geometry.Point(2, 0);
    var pntEnd1 = new SuperMap.Geometry.Point(2, 4);
    var isRight1 =SuperMap.Plot.PlottingUtil.isRight(pntTest1, pntStart1, pntEnd1);

    var pntStart2 = new SuperMap.Geometry.Point(-2, 0);
    var pntEnd2 = new SuperMap.Geometry.Point(-2, 5);
    var isRight2 = SuperMap.Plot.PlottingUtil.isRight(pntTest1, pntStart2, pntEnd2);

    equal(isRight1, false, "Function.isRight");
    equal(isRight2, true, "Function.isRight");
});

test("testPlottingUtil_radian", function () {
    var pntFrom1 = new SuperMap.Geometry.Point(0, 0);
    var pntTo1 = new SuperMap.Geometry.Point(1, 0);
    var dAngle1 = SuperMap.Plot.PlottingUtil.radian(pntFrom1, pntTo1);

    var pntFrom2 = new SuperMap.Geometry.Point(1, 0);
    var pntTo2 = new SuperMap.Geometry.Point(0, 1);
    var dAngle2 = SuperMap.Plot.PlottingUtil.radian(pntFrom2, pntTo2);

    var pntFrom3 = new SuperMap.Geometry.Point(1, 0);
    var pntTo3 = new SuperMap.Geometry.Point(-1, 0);
    var dAngle3 = SuperMap.Plot.PlottingUtil.radian(pntFrom3, pntTo3);

    var PI = Math.PI.toFixed(10);
    equal(dAngle1.toFixed(10), 0, "Function.radian.0度");
    equal(dAngle2.toFixed(10), 2.3561944902, "Function.radian.135度");
    equal(dAngle3.toFixed(10), PI, "Function.radian.180度");
});

//test("testPlottingUtil_findBisectorPoint", function () {
//    expect(2);
//     var pnt1=new SuperMap.Geometry.Point(-1,1);
//     var pntJoint=new SuperMap.Geometry.Point(0,0);
//     var pnt2=new SuperMap.Geometry.Point(-1,-1);
//     var dDistance=1;
//     var point=SuperMap.PlottingUtil.findBisectorPoint(pnt1, pntJoint, pnt2, dDistance);
//     var pointx=point.x;
//     var pointy=point.y;
//
//    equal(pointx,null,"findBisectorPoint");
//    equal(pointy,null,"findBisectorPoint");
//});

test("testPlottingUtil_findPoint", function () {
    var pntStart = new SuperMap.Geometry.Point(0, 0);
    var pntEnd = new SuperMap.Geometry.Point(1, 0);
    var dDistance = 1;
    var dAngle = 90;
    var point = SuperMap.Plot.PlottingUtil.findPoint(pntStart, pntEnd, dDistance, dAngle);
    var pointx = point.x.toFixed(10);
    var pointy = point.y.toFixed(10);
    equal(pointx, 0, "Function.findPoint");
    equal(pointy, 1, "Function.findPoint");
});

test("testPlottingUtil_isSameQuadrant", function () {
    var pntStart1 = new SuperMap.Geometry.Point(1, 0);
    var pntEnd1 = new SuperMap.Geometry.Point(1, 5);
    var pntStart2 = new SuperMap.Geometry.Point(4, 0);
    var pntEnd2 = new SuperMap.Geometry.Point(4, 5);
    var isSameQuadrant1 = SuperMap.Plot.PlottingUtil.isSameQuadrant(pntStart1, pntEnd1, pntStart2, pntEnd2);

    var pntStart3 = new SuperMap.Geometry.Point(3, 2);
    var pntEnd3 = new SuperMap.Geometry.Point(-2, 2);
    var isSameQuadrant2 = SuperMap.Plot.PlottingUtil.isSameQuadrant(pntStart1, pntEnd1, pntStart3, pntEnd3);

    equal(isSameQuadrant1, true, "Function.isSameQuadrant");
    equal(isSameQuadrant2, false, "Function.isSameQuadrant");

});

test("testPlottingUtil_isCross", function () {
    var pntStart1 = new SuperMap.Geometry.Point(0, 1);
    var pntEnd1 = new SuperMap.Geometry.Point(4, 1);
    var pntStart2 = new SuperMap.Geometry.Point(2, 0);
    var pntEnd2 = new SuperMap.Geometry.Point(2, 3);
    var isCross1 = SuperMap.Plot.PlottingUtil.isCross(pntStart1, pntEnd1, pntStart2, pntEnd2);

    var pntStart3 = new SuperMap.Geometry.Point(0, -1);
    var pntEnd3 = new SuperMap.Geometry.Point(4, -1);
    var isCross2 = SuperMap.Plot.PlottingUtil.isCross(pntStart1, pntEnd1, pntStart3, pntEnd3);


    var pntStart4 = new SuperMap.Geometry.Point(0, 0);
    var pntEnd4 = new SuperMap.Geometry.Point(1, 0);
    var pntStart5 = new SuperMap.Geometry.Point(0, 0);
    var pntEnd5 = new SuperMap.Geometry.Point(0, 1);
    var isCross3 = SuperMap.Plot.PlottingUtil.isCross(pntStart4, pntEnd4, pntStart5, pntEnd5);

    equal(isCross1, true, "Function.isCross");
    equal(isCross2, false, "Function.isCross");
    equal(isCross3, true, "Function.isCross");
});

test("testPlottingUtil_intersectLineSegs", function () {
    var pntResult = new SuperMap.Geometry.Point();
    var pntStart1 = new SuperMap.Geometry.Point(1, 0);
    var pntEnd1 = new SuperMap.Geometry.Point(1, 5);
    var pntStart2 = new SuperMap.Geometry.Point(-2, 2);
    var pntEnd2 = new SuperMap.Geometry.Point(3, 2);
    var intersectLineSegs1 = SuperMap.Plot.PlottingUtil.intersectLineSegs(pntStart1, pntEnd1, pntStart2, pntEnd2, pntResult);

    var pntStart3 = new SuperMap.Geometry.Point(4, 0);
    var pntEnd3 = new SuperMap.Geometry.Point(4, 5);
    var intersectLineSegs2 = SuperMap.Plot.PlottingUtil.intersectLineSegs(pntStart1, pntEnd1, pntStart3, pntEnd3, pntResult);

    var pntStart4 = new SuperMap.Geometry.Point(1, 0);
    var pntEnd4 = new SuperMap.Geometry.Point(1, 5);
    var intersectLineSegs3 = SuperMap.Plot.PlottingUtil.intersectLineSegs(pntStart1, pntEnd1, pntStart4, pntEnd4, pntResult);

    equal(intersectLineSegs1, true, "Function.intersectLineSegs.有交叉点");
    equal(intersectLineSegs2, false, "Function.intersectLineSegs.平行");
    equal(intersectLineSegs3, false, "Function.intersectLineSegs.重叠");

});


test("testPlottingUtil_parallel", function () {
    var pntSrcvar = [new SuperMap.Geometry.Point(0, 0), new SuperMap.Geometry.Point(1, 0)];
    var dDistance = 1;
    var pntResult = SuperMap.Plot.PlottingUtil.parallel(pntSrcvar, dDistance);
    var point1 = pntResult[0];
    var point1x = point1.x.toFixed(10);
    var point1y = point1.y.toFixed(10);

    var point2 = pntResult[1];
    var point2x = point2.x.toFixed(10);
    var point2y = point2.y.toFixed(10);

    equal(point1x, 0, "Function.parallel");
    equal(point1y, 1, "Function.parallel");

    equal(point2x, 1, "Function.parallel");
    equal(point2y, 1, "Function.parallel");
});

test("testPlottingUtil_projectPoint", function () {
    var pt = new SuperMap.Geometry.Point(2, 1);
    var ptStart = new SuperMap.Geometry.Point(0, 0);
    var ptEnd = new SuperMap.Geometry.Point(0, 2);
    var projectPoint = SuperMap.Plot.PlottingUtil.projectPoint(pt, ptStart, ptEnd);
    equal(projectPoint.x, 0, "Function:projectPoint");
    equal(projectPoint.y, 1, "Function:projectPoint");
    pt = ptStart = ptEnd = null;
    projectPoint = null;
});

test("testPlottingUtil_pointToLineDis", function () {
    var pt = new SuperMap.Geometry.Point(0, 0);
    var ptStart = new SuperMap.Geometry.Point(0, 0);
    var ptEnd = new SuperMap.Geometry.Point(2, 2);
    var pointToLineDis = SuperMap.Plot.PlottingUtil.pointToLineDis(pt, ptStart, ptEnd);
    equal(pointToLineDis, 0, "Function:pointToLineDis");

});

test("testPlottingUtil_pointToPloyLineDis", function () {
    var pt = new SuperMap.Geometry.Point(1, 1);
    var ptStart = new SuperMap.Geometry.Point(0, 0);
    var ptEnd = new SuperMap.Geometry.Point(2, 2);
    var pointToPloyLineDis = SuperMap.Plot.PlottingUtil.pointToPloyLineDis(pt, ptStart, ptEnd);
    equal(pointToPloyLineDis, 0, "Function:pointToPloyLineDis");
});

test("testPlottingUtil_isNear", function (){
    var num1=3.14159265357;
    var tolerance1=0.0000000001;
    var flag1=SuperMap.Plot.PlottingUtil.isNear(num1,tolerance1);
    equal(flag1, false, "Function:isNear false");
    var num2=1.0000000005;
    var tolerance2=2.0000000009;
    var flag2=SuperMap.Plot.PlottingUtil.isNear(num2,tolerance2);
    equal(flag2, true, "Function:isNear true");
});

test("testPlottingUtil_equalFuzzy", function (){
        var numA1=1.99111;
        var numB1=2.01111;
        var tolerance=0.1;
        var num1=SuperMap.Plot.PlottingUtil.equalFuzzy(numA1, numB1, tolerance);
        equal(num1, true, "Function:equalFuzzy ");
        var numA2=1.00001;
        var numB2=2.00001;
        var num2=SuperMap.Plot.PlottingUtil.equalFuzzy(numA2, numB2, tolerance);
        equal(num2, false, "Function:equalFuzzy ");
});

test("testPlottingUtil_intersectLines", function (){
    var pntStart1 = new SuperMap.Geometry.Point(1, 0);
    var pntEnd1 = new SuperMap.Geometry.Point(1, 5);
    var pntStart2 = new SuperMap.Geometry.Point(-2, 2);
    var pntEnd2 = new SuperMap.Geometry.Point(3, 2);
    var returnValue1=SuperMap.Plot.PlottingUtil.intersectLines(pntStart1, pntEnd1, pntStart2, pntEnd2);
    equal(returnValue1.intersectPoint.x, 1, "Function:intersectLines 交点x坐标");
    equal(returnValue1.intersectPoint.y, 2, "Function:intersectLines 交点y坐标");
    equal(returnValue1.isIntersectLines, true, "Function:intersectLines 两条线相交");
    var pntStart3 = new SuperMap.Geometry.Point(1, 0);
    var pntEnd3 = new SuperMap.Geometry.Point(1, 5);
    var returnValue2=SuperMap.Plot.PlottingUtil.intersectLines(pntStart1, pntEnd1, pntStart3, pntEnd3);
    equal(returnValue2.isIntersectLines, false, "Function:intersectLines 两条线重叠");
});





