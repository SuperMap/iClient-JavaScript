/**
 * Class: SuperMap.Geometry.Primitives
 * 将标号的基本图元构建成相应的几何对象。
 */
SuperMap.Geometry.Primitives = SuperMap.Class({

    /**
     * Property: nSegmentCount
     * {Integer} 圆算法的点个数。
     */
    nSegmentCount: 72,

    //初始化
    initialize: function(options){

    },

    /**
     * Method: polyline
     * 折线图元
     */
    polyline: function(controlPoints){
        if(controlPoints && controlPoints.length >1){
            return new SuperMap.Geometry.LineString(controlPoints);
        }
    },

    /**
     * Method: parallelline
     * 平行线图元
     */
    parallelline: function(controlPoints){
        controlPoints = SuperMap.Plot.PlottingUtil.clearSamePts(controlPoints);
        if(controlPoints && controlPoints.length >= 3){
            var dOffset = SuperMap.Plot.PlottingUtil.distance(controlPoints[0], controlPoints[1]);
            if(SuperMap.Plot.PlottingUtil.isRight(controlPoints[0], controlPoints[1], controlPoints[2])){
                dOffset = -dOffset;
            }

            var lineControlPoints = [];
            for(var i = 1; i < controlPoints.length; i++){
                lineControlPoints.push(controlPoints[i].clone());
            }
            var pntResult = SuperMap.Plot.PlottingUtil.parallel(lineControlPoints, dOffset);
            controlPoints[0].x = pntResult[0].x;
            controlPoints[0].y = pntResult[0].y;

            var components = [];
            components.push(new SuperMap.Geometry.LineString(lineControlPoints));
            components.push(new SuperMap.Geometry.LineString(pntResult));
            return components;
        }
        else{
            return [];
        }
    },

    /**
     * Method: kidney
     * 猪肾图元
     *
     * 目前贝塞尔曲线客户端的根据控制点解析算法没有写，所以目前先用服务器提供的所有点进行绘制
     * 后期考虑效率问题再翻译 C++ 解析算法
     */
    kidney: function(controlPoints){
        if(controlPoints){
            //SuperMap.Plot.PlottingUtil.clearSamePts(controlPoints);
            //var linearRing = new SuperMap.Geometry.LinearRing(controlPoints);
            var shapePts = this.getKendyShapePts(controlPoints);
            //return new SuperMap.Geometry.Polygon([linearRing]);
            return this.polygon(shapePts);
        }
    },

    /**
     * Method: bezier
     * 贝塞尔图元
     */
    bezier: function(controlPoints, isCalculate){
        if(controlPoints){
            var spatialData = [];
            if(isCalculate){
                spatialData = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(controlPoints);
            } else {
                spatialData = controlPoints;
            }
            SuperMap.Plot.PlottingUtil.clearSamePts(spatialData);
            return new SuperMap.Geometry.LineString(spatialData);
        }
    },

    /**
     * Method: loopbezier
     * 闭合贝塞尔图元
     */
    loopbezier: function(controlPoints, isCalculate){
        if(controlPoints){
            if(controlPoints[0].x !== controlPoints[controlPoints.length-1].x || controlPoints[0].y !== controlPoints[controlPoints.length-1].y){
                controlPoints.push(controlPoints[0]);
            }

            var spatialData = [];
            if(isCalculate){
                spatialData = SuperMap.Plot.PlottingUtil.GenerateBeizerPointsNoCtrlPt(controlPoints);
            } else {
                spatialData = controlPoints;
            }
            SuperMap.Plot.PlottingUtil.clearSamePts(spatialData);
            var linearRing = new SuperMap.Geometry.LinearRing(spatialData);
            return new SuperMap.Geometry.Polygon([linearRing]);
        }
    },

    /**
     * Method: parallelogram
     * 平行四边形图元
     */
    parallelogram: function(controlPoints){
        //return this.polygon(controlPoints);
        if(controlPoints && controlPoints.length === 3){
            var pt4x = controlPoints[0].x + (controlPoints[2].x - controlPoints[1].x);
            var pt4y = controlPoints[0].y + (controlPoints[2].y - controlPoints[1].y);
            var pt4 = new SuperMap.Geometry.Point(pt4x, pt4y);
            var points = [];
            points.push.apply(points, controlPoints);
            points.push(pt4);
            var linearRing = new SuperMap.Geometry.LinearRing(points);
            return new SuperMap.Geometry.Polygon([linearRing]);
        }
    },

    /**
     * Method: polygon
     * 多边形图元
     */
    polygon: function(controlPoints){
        if(controlPoints && controlPoints.length>2){
            var linearRing = new SuperMap.Geometry.LinearRing(controlPoints);
            return new SuperMap.Geometry.Polygon([linearRing]);
        }
    },

    /**
     * Method: circle
     * 圆形图元
     */
    circle: function(controlPoints){
        if(controlPoints && controlPoints.length === 2){
            //取第一个作为中心点
            var centerPoint = controlPoints[0];
            //取最后一个作为半径控制点
            var radiusPoint = controlPoints[1];
            var points = [];
            //计算圆的半径
            var radius = Math.sqrt((radiusPoint.x - centerPoint.x) * (radiusPoint.x - centerPoint.x) +
            (radiusPoint.y - centerPoint.y) * (radiusPoint.y - centerPoint.y));
            //计算圆的边缘所有点
            var nSegment = 360 / this.nSegmentCount;
            for(var i = 0; i < this.nSegmentCount; i++)
            {
                var radians = (i*nSegment + 1) * Math.PI / 180;
                var circlePoint = new SuperMap.Geometry.Point(Math.cos(radians) * radius + centerPoint.x, Math.sin(radians) * radius + centerPoint.y);
                points[i] = circlePoint;
            }
            var linearRing = new SuperMap.Geometry.LinearRing(points);
            return new SuperMap.Geometry.Polygon([linearRing]);
        }
    },

    /**
     * Method: rectangle
     * 矩形图元
     *
     * 已知的是左上和右下点，目前算法中没考虑带旋转角的矩形
     */
    rectangle: function(controlPoints, dAngle, width, height){
        //if((!width || width === null) && (controlPoints && controlPoints.length === 2)) {
        //    width = Math.abs(controlPoints[0].x - controlPoints[1].y);
        //}
        //if((!height || height === null) && (controlPoints && controlPoints.length === 2)) {
        //    height = Math.abs(controlPoints[0].y - controlPoints[1].y);
        //}
        //if(!dAngle || dAngle === null){
        //    dAngle = 0;
        //}
        //
        //if(controlPoints && controlPoints.length > 0){
        //    //var points = this.getEllipseSpatialData(controlPoints[0], majorAxis, minorAxis, dAngle);
        //    var points = [];
        //
        //    //var pntCenter = new SuperMap.Geometry.Point((controlPoints[0].x+controlPoints[1].x)/2.0, (controlPoints[0].y+controlPoints[1].y)/2.0);
        //    var pntCenter = controlPoints[2];
        //    points.push(new SuperMap.Geometry.Point((pntCenter.x-width/2.0), (pntCenter.y+height/2.0)));
        //    points.push(new SuperMap.Geometry.Point((pntCenter.x-width/2.0), (pntCenter.y-height/2.0)));
        //    points.push(new SuperMap.Geometry.Point((pntCenter.x+width/2.0), (pntCenter.y-height/2.0)));
        //    points.push(new SuperMap.Geometry.Point((pntCenter.x+width/2.0), (pntCenter.y+height/2.0)));
        //    points.push(new SuperMap.Geometry.Point((pntCenter.x-width/2.0), (pntCenter.y+height/2.0)));
        //
        //    for(var i = 0; i < points.length; i++){
        //        points[i].rotate(dAngle, pntCenter);
        //    }
        //
        //    var linearRing = new SuperMap.Geometry.LinearRing(points);
        //    return new SuperMap.Geometry.Polygon([linearRing]);
        //}

        if(controlPoints && controlPoints.length === 2){
            //取第一个
            var startPoint = controlPoints[0];
            //取最后一个
            var endPoint = controlPoints[1];
            var point1 = startPoint.clone();
            var point2 = new SuperMap.Geometry.Point(endPoint.x,startPoint.y);
            var point3 = endPoint.clone();
            var point4 = new SuperMap.Geometry.Point(startPoint.x,endPoint.y);
            var linearRing = new SuperMap.Geometry.LinearRing([point1, point2, point3, point4]);
            return new SuperMap.Geometry.Polygon([linearRing]);
        }
    },

    /**
     * Method: geotext
     * 文本图元
     */
    geotext: function(controlPoints,text){
        if(controlPoints && text && text.length > 0){
            return new SuperMap.Geometry.GeoText(controlPoints[0].x, controlPoints[0].y, text);
        }
    },

    /**
     * Method: sector
     * 扇形图元
     *
     * 圆弧起始点A 圆弧终点B 圆弧上一点C
     */
    sector: function(controlPoints){
        if(controlPoints && controlPoints.length >= 3){
            var arcInfo = SuperMap.Geometry.Primitives.getArcInfo(controlPoints[0], controlPoints[1], controlPoints[2]);
            arcInfo.dStartAngle *= Math.PI / 180;
            arcInfo.dEndAngle *= Math.PI / 180;
            var dAngleGrain = (arcInfo.dEndAngle - arcInfo.dStartAngle)/this.nSegmentCount;
            var allPoints = this.getArcSpatialData(arcInfo.pntCenter, arcInfo.dRadius, arcInfo.dRadius, 0, arcInfo.dStartAngle, arcInfo.dEndAngle, dAngleGrain);
            allPoints.push(arcInfo.pntCenter);
            if(allPoints.length !== 0 ){
                var linearRing = new SuperMap.Geometry.LinearRing(allPoints);
                return new SuperMap.Geometry.Polygon([linearRing]);
            }
        }
    },

    /**
     * Method: lune
     * 弓形图元
     *
     * 圆弧起始点A 圆弧终点B 圆弧上一点C
     */
    lune: function(controlPoints){
        if(controlPoints && controlPoints.length >= 3){
            var arcInfo = SuperMap.Geometry.Primitives.getArcInfo(controlPoints[0], controlPoints[1], controlPoints[2]);
            arcInfo.dStartAngle *= Math.PI / 180;
            arcInfo.dEndAngle *= Math.PI / 180;
            var dAngleGrain = (arcInfo.dEndAngle - arcInfo.dStartAngle)/this.nSegmentCount;
            var allPoints = this.getArcSpatialData(arcInfo.pntCenter, arcInfo.dRadius, arcInfo.dRadius, 0, arcInfo.dStartAngle, arcInfo.dEndAngle, dAngleGrain);

            if(allPoints.length !== 0 ){
                var linearRing = new SuperMap.Geometry.LinearRing(allPoints);
                return new SuperMap.Geometry.Polygon([linearRing]);
            }
        }
    },

    /**
     * Method: arc
     * 圆弧图元
     *
     * 圆弧起始点A 圆弧终点B 圆弧上一点C
     */
    arc: function(controlPoints){
        if(controlPoints && controlPoints.length >= 3){
            var arcInfo = SuperMap.Geometry.Primitives.getArcInfo(controlPoints[0], controlPoints[1], controlPoints[2]);
            arcInfo.dStartAngle *= Math.PI / 180;
            arcInfo.dEndAngle *= Math.PI / 180;
            var dAngleGrain = (arcInfo.dEndAngle - arcInfo.dStartAngle)/this.nSegmentCount;
            var allPoints = this.getArcSpatialData(arcInfo.pntCenter, arcInfo.dRadius, arcInfo.dRadius, 0, arcInfo.dStartAngle, arcInfo.dEndAngle, dAngleGrain);

            if(allPoints.length !== 0 ){
                return new SuperMap.Geometry.LineString(allPoints);
            }
        }
    },

    /**
     * Method: ellipse
     * 椭圆图元   圆心点、旋转角、长半轴及短半轴
     */
    ellipse: function(controlPoints, dAngle, isCalculate, majorAxis, minorAxis){
        if(isCalculate === true){
            if((!majorAxis || majorAxis === null) && (controlPoints && controlPoints.length >= 3)) {
                majorAxis = SuperMap.Plot.PlottingUtil.distance(controlPoints[0], controlPoints[1]);

            }
            if((!minorAxis || minorAxis === null) && (controlPoints && controlPoints.length >= 3)) {
                var pntProject = SuperMap.Plot.PlottingUtil.projectPoint(controlPoints[2], controlPoints[0], controlPoints[1]);
                minorAxis = SuperMap.Plot.PlottingUtil.distance(pntProject, controlPoints[2]);
            }

        } else {
            minorAxis = SuperMap.Plot.PlottingUtil.distance(controlPoints[0], controlPoints[2]);
            majorAxis = SuperMap.Plot.PlottingUtil.distance(controlPoints[0], controlPoints[1]);
        }

        if(!dAngle || dAngle === null ){
            dAngle = SuperMap.Plot.PlottingUtil.radian(controlPoints[0], controlPoints[1]);
        }else{
            dAngle *= Math.PI / 180;
        }

        //var dSin = Math.sin(dAngle);
        //var dCos = Math.cos(dAngle);
        //controlPoints[2].x = controlPoints[0].x - minorAxis*dSin;
        //controlPoints[2].y = controlPoints[0].y - minorAxis*dCos;

        if(controlPoints && controlPoints.length > 0){
            var dRadianBegin = 0.0;
            var dRadianEnd = Math.PI * 2;
            var dStep = dRadianEnd / this.nSegmentCount;

            var points = this.getArcSpatialData(controlPoints[0], majorAxis, minorAxis, dAngle, dRadianBegin, dRadianEnd, dStep);
            if(isCalculate === true){
                var dSin = Math.sin(dAngle);
                var dCos = Math.cos(dAngle);
                if(controlPoints[2].x > controlPoints[1].x){
                    controlPoints[2].x = controlPoints[0].x - minorAxis*dSin;
                    controlPoints[2].y = controlPoints[0].y + minorAxis*dCos;
                } else {
                    controlPoints[2].x = controlPoints[0].x + minorAxis*dSin;
                    controlPoints[2].y = controlPoints[0].y - minorAxis*dCos;
                }
            }

            return new SuperMap.Geometry.LinearRing(points);
        }
    },

    /**
     * Method: getEllipseSpatialData
     * 获取弧线拟合点
     */
    getArcSpatialData: function(ptCenter, majorAxis, minorAxis, dRotation, dRadianBegin, dRadianEnd, dStep){
        var points = [];

        if(Math.abs(dStep) < 0.000000001){
            return points;
        }

        while(dRadianEnd < dRadianBegin){
            dRadianEnd += Math.PI * 2;
        }

        while(dRadianEnd > (dRadianBegin + Math.PI * 2)){
            dRadianBegin += Math.PI * 2;
        }

        var dCosPri = Math.cos(dRotation) * majorAxis;
        var dSinPri = Math.sin(dRotation) * majorAxis;
        var dCosSec = Math.cos(dRotation) * minorAxis;
        var dSinSec = Math.sin(dRotation) * minorAxis;

        var dRadianBeginT = this.calcEllipseRadian(dRadianBegin, majorAxis, minorAxis);
        var dRadianEndT = this.calcEllipseRadian(dRadianEnd, majorAxis, minorAxis);

        if((dRadianEndT - dRadianBeginT) < 0.00001){
            dRadianEndT += 2 * Math.PI;
        }

        var lPointCount = Math.round(Math.abs((dRadianEndT-dRadianBeginT)/dStep) + 1);
        if(lPointCount < 2)
            return points;

        for(var i = 0; i < lPointCount-1; dRadianBeginT += dStep, i++){
            var ptX = ptCenter.x + dCosPri * Math.cos(dRadianBeginT) - dSinSec * Math.sin(dRadianBeginT);
            var ptY = ptCenter.y + dSinPri * Math.cos(dRadianBeginT) + dCosSec * Math.sin(dRadianBeginT);
            points.push(new SuperMap.Geometry.Point(ptX, ptY));
        }

        if(0 > points.length){
            points[points.length-1].x = ptCenter.x + dCosPri * Math.cos(dRadianEndT) - dSinSec * Math.sin(dRadianEndT);
            points[points.length-1].y = ptCenter.y + dSinPri * Math.cos(dRadianEndT) + dCosSec * Math.sin(dRadianEndT);
        }

        return points;
    },

    /**
     * Method: calcEllipseRadian
     * 计算椭圆弧度
     */
    calcEllipseRadian: function(pntRadian, majorAxis, minorAxis){
        var tempPntRadian = pntRadian;
        var dSinB = majorAxis * Math.sin(pntRadian);
        var dCosB = minorAxis * Math.cos(pntRadian);
        var dRadianT = Math.atan2(dSinB, dCosB);

        if(pntRadian > Math.PI){
            while( tempPntRadian > Math.PI){
                tempPntRadian -= 2 * Math.PI;
                dRadianT += 2 * Math.PI;
            }
        } else if(pntRadian < -Math.PI){
            while(tempPntRadian < -Math.PI){
                tempPntRadian += 2 * Math.PI;
                dRadianT -= 2 * Math.PI;
            }
        }

        return dRadianT;
    },

    /**
     * Method: calcEllipseRadian
     * 获取猪腰子拟合点
     *
     *
     */
    getKendyShapePts: function(pts){
        var allPoints = [];
        pts = SuperMap.Plot.PlottingUtil.clearSamePts(pts);
        if(2 > pts.length){
            return allPoints;
        }

        var shapePts = this.calcShapePoints(pts);

        //判断猪腰子是否成功构造
        if(12 != shapePts.length){
            return allPoints;
        }

        //将点进行调整
        shapePts.push(shapePts[0]);
        shapePts.push(shapePts[1]);
        shapePts.splice(0,1);

        for(var i = 0; i < shapePts.length-3; i += 3){
            var tempPts = [];
            tempPts = this.getBezierPtsWithScalePts(shapePts[i], shapePts[i+1], shapePts[i+2], shapePts[i+3]);
            allPoints = allPoints.concat(tempPts);
        }

        return allPoints;
    },

    //根据位置点计算形状点
    calcShapePoints: function(ctrlPoints){
        var Bzpt = [];

        var shapePoints = [];
        var nCtrlPnts = ctrlPoints.length;
        //当没有控制点时，返回空数组
        if (nCtrlPnts === 0)
        {
            return;
        }

        /*当只有一个点时，返回该点*/
        if(nCtrlPnts === 1)
        {
            Bzpt.push(ctrlPoints[0]);
            return ;
        }

        /*当只有两个点时，需要计算出第三个点*/
        if(nCtrlPnts == 2)
        {
            var protrudeC3 = this.calcProtudeC3(ctrlPoints[0],ctrlPoints[1]);
            shapePoints.push(ctrlPoints[0]);
            shapePoints.push(ctrlPoints[1]);
            shapePoints.push(protrudeC3);
        }
        else
        {
            /*如果是三个点，那么把这三个点全赋给shapePoints数组*/
            shapePoints.push(ctrlPoints[0]);
            shapePoints.push(ctrlPoints[1]);
            shapePoints.push(ctrlPoints[2]);

            if(SuperMap.Plot.PlottingUtil.isSamePt(ctrlPoints[0],ctrlPoints[2]) ||
                SuperMap.Plot.PlottingUtil.isSamePt(ctrlPoints[1],ctrlPoints[2]))
            {//当有两个点重合时返回直线
                Bzpt.push(ctrlPoints[0]);
                Bzpt.push(ctrlPoints[1]);
            }
            if(SuperMap.Plot.PlottingUtil.isSamePt(ctrlPoints[0], ctrlPoints[1]))
            {
                Bzpt.push(ctrlPoints[0]);
                Bzpt.push(ctrlPoints[2]);
                return;
            }
        }
        shapePoints = this.reNormalizeKidneyCtrlPoints(shapePoints);


        /************************************************************************/
        /*上面求出了基本点 ， 下面的这段代码是根据基本点求出能够模拟猪腰子的点列*/
        /************************************************************************/
        /*以此为左右控制点 ， 长线中点 ， 凹点*/
        var pMid = new SuperMap.Geometry.Point(0,0);
        var op   = new SuperMap.Geometry.Point(0,0);;
        /*求长线中点*/
        pMid.x = (shapePoints[0].x + shapePoints[1].x)*0.5;
        pMid.y = (shapePoints[0].y + shapePoints[1].y)*0.5;
        /*求凹点*/
        op.x= pMid.x - (shapePoints[2].x - pMid.x)*0.1;
        op.y= pMid.y - (shapePoints[2].y - pMid.y)*0.1;

        //以三个点为一组
        var result1 = this.GetPtsByTriangle(3.0 , 0 ,shapePoints[1] , shapePoints[0] , op);
        Bzpt.push(result1.pr);
        Bzpt.push(op);
        Bzpt.push(result1.pl);

        var result2 = this.GetPtsByTriangle(4.0 , 2 ,shapePoints[2] , shapePoints[0] , shapePoints[1]);
        Bzpt.push(result2.pr);
        Bzpt.push(shapePoints[1]);
        Bzpt.push(result2.pl);

        var result3 = this.GetPtsByTriangle(2.0 , 0 ,shapePoints[0] , shapePoints[1] , shapePoints[2]);
        Bzpt.push(result3.pr);
        Bzpt.push(shapePoints[2]);
        Bzpt.push(result3.pl);

        var result4 = this.GetPtsByTriangle(4.0 , 1 ,shapePoints[1] , shapePoints[2] , shapePoints[0]);
        Bzpt.push(result4.pr);
        Bzpt.push(shapePoints[0]);
        Bzpt.push(result4.pl);

        return Bzpt;
    },

    //根据猪腰子两个底边控制点计算顶点
    calcProtudeC3: function(b1,b2)
    {
        var temp1 = new SuperMap.Geometry.Point(0.0,0.0);
        var rate = 0.0;//存储临时数据

        temp1.x = (b1.x + b2.x)*0.5;
        temp1.y = (b1.y + b2.y)*0.5;
        /*根据原来的算法就出比例值*/

        rate = SuperMap.Plot.PlottingUtil.distance(b2,b1) / 2.7;

        /*如果时两个点，那么就由2个控制点，和一个计算出来的点组成*/
        var result = this.GetPointsOfNormal(rate , b1, temp1);
        return result.pt3;
    },

    GetPointsOfNormal: function(l, p1, p2)
    {
        var p3 = new SuperMap.Geometry.Point(0,0);
        var p4 = new SuperMap.Geometry.Point(0,0);

        /*计算过程中间点*/
        var p = new SuperMap.Geometry.Point(0,0);

        var distP1P2 = 0.0;
        distP1P2 = SuperMap.Plot.PlottingUtil.distance(p1,p2);

        /*防止同点错误*/
        if(distP1P2 == 0)
        {
            p.y = 0;
            p.x = l;
        }
        else
        {
            p.x = ( l*(p1.x - p2.x)/distP1P2 );
            p.y = ( l*(p1.y - p2.y)/distP1P2 );
        }

        /*逆时针旋转90°*/
        p3.x = -p.y + p2.x;
        p3.y = p.x + p2.y;
        /*顺时针旋转90°*/
        p4.x = p.y + p2.x;
        p4.y = -p.x + p2.y;

        return {pt3:p3,pt4:p4};
    },

    reNormalizeKidneyCtrlPoints: function(ctrlPnts)
    {
        var normalCtrlPnts = [];
        normalCtrlPnts.push(new SuperMap.Geometry.Point(0,0));
        normalCtrlPnts.push(new SuperMap.Geometry.Point(0,0));
        normalCtrlPnts.push(new SuperMap.Geometry.Point(0,0));

        var ctrlPntCount = ctrlPnts.length;
        if (ctrlPntCount<2) //不足2个控制点，直接返回
        {

        }
        else if (ctrlPntCount==2) //刚好2个控制点，生成第3个控制点
        {
            normalCtrlPnts[0] = ctrlPnts[0];
            normalCtrlPnts[1] = ctrlPnts[1];
            normalCtrlPnts[2] = this.calcProtudeC3(ctrlPnts[0],ctrlPnts[1]);
        }
        else
        {
            var p0 = ctrlPnts[0];
            var p1 = ctrlPnts[1];
            var p2 = ctrlPnts[2];

            //三个距离
            var f1 = 0.0;
            var f2 = 0.0;
            var f3 = 0.0;

            f1 = SuperMap.Plot.PlottingUtil.distance(p1,p0);
            f2 = SuperMap.Plot.PlottingUtil.distance(p2,p1);
            f3 = SuperMap.Plot.PlottingUtil.distance(p0,p2);

            if((f2 >= f1) && (f2 >= f3))
            {  //p1-p2为长边
                var tempPt = p0.clone();
                p0 = p2.clone();
                p2 = tempPt.clone();
            }
            else if (f3 >= f1 && f3 >= f2)
            {   //p2-p0.x,y为长边
                var tempPt = p2.clone();
                p2 = p1.clone();
                p1 = tempPt.clone();
            }

            if( !SuperMap.Plot.PlottingUtil.isRight(p2,p0,p1)  /*::PointIsRightToLine(p0 ,p1 ,p2 )*/ )
            {
                //当shapePoints[2]在左边时 ， 交换shapePoints[0] , shapePoints[1]的数据
                var tempPt = p0.clone();
                p0 = p1.clone();
                p1 = tempPt.clone();
            }

            normalCtrlPnts[0] = p0;
            normalCtrlPnts[1] = p1;
            normalCtrlPnts[2] = p2;
        }

        return normalCtrlPnts;
    },

    //计算三角形上的特殊点??
    GetPtsByTriangle: function(rate , con, p3, p1, p2)
    {
        var vp1 = new SuperMap.Geometry.Point(0,0);
        var vp2 = new SuperMap.Geometry.Point(0,0);
        var dist1 = 0.0;
        var dist2 = 0.0;

        /*确定了两个臂长 ， L1 ， L2 ， 臂长由两点距离和con共同决定*/
        dist1 = SuperMap.Plot.PlottingUtil.distance(p2 , p3);
        dist2 = SuperMap.Plot.PlottingUtil.distance(p1 , p2);

        if(con == 1)
        {
            dist1*=2;
        }
        if(con == 2)
        {
            dist2*=2;
        }
        /*计算虚拟点 ， 确定角分线*/
        vp1.x = ((dist1*p1.x + dist2*p3.x)/(dist1 + dist2));
        vp1.y = ((dist1*p1.y + dist2*p3.y)/(dist1 + dist2));

        var pl = this.GetWhichPtOfNormal(rate , p3 , vp1 , p2);
        var pr = this.GetWhichPtOfNormal(rate , p1 , vp1 , p2);

        return {pl:pl, pr:pr};
    },

    //求垂足??
    GetWhichPtOfNormal: function(rate, cp, p1, p2)
    {
        var p;
        /*计算过程中虚拟点*/
        var vp1 = new SuperMap.Geometry.Point(0, 0);
        var vp2 = new SuperMap.Geometry.Point(0, 0);

        var dist1 = 0.0;
        var dist2 = 0.0;
        dist2 = SuperMap.Plot.PlottingUtil.distance(p2 , cp)/rate;
        var result = this.GetPointsOfNormal(dist2 , p1 , p2);

        dist1 = SuperMap.Plot.PlottingUtil.distance(cp , result.pt4);
        dist2 = SuperMap.Plot.PlottingUtil.distance(cp , result.pt3);

        /*计算了两个距离 ， 找出距离P3较近的点*/

         p = (dist1 >= dist2)?result.pt3: result.pt4;

        return p;
    },

    getBezierPtsWithScalePts: function(pt1, pt2, pt3, pt4){
        var pts =[];

        var x1 = pt1.x;
        var y1 = pt1.y;
        var x2 = pt2.x;
        var y2 = pt2.y;
        var x3 = pt3.x;
        var y3 = pt3.y;
        var x4 = pt4.x;
        var y4 = pt4.y;

        if(SuperMap.Plot.PlottingUtil.equalFuzzy(x1,x2, 1E-10) &&
            SuperMap.Plot.PlottingUtil.equalFuzzy(y1,y2, 1E-10) &&
            SuperMap.Plot.PlottingUtil.equalFuzzy(x3,x4, 1E-10) &&
            SuperMap.Plot.PlottingUtil.equalFuzzy(y3,y4, 1E-10))
        {
            pts.push(new SuperMap.Geometry.Point(x1,y1));
            pts.push(new SuperMap.Geometry.Point(x3,y3));
        }
        else
        {
            for(var t = 0.00000; t <= 1.0; t += 0.03125)
            {
                var a,b,c,d;
                var t2=t*t;
                var t3=t2*t;
                a=1-3*t+3*t2-t3;
                b=3*(t-2*t2+t3);
                c=3*(t2-t3);
                d=t3;

                var pt =new SuperMap.Geometry.Point(a*x1 + b*x2 + c*x3 + d*x4, a*y1 + b*y2 + c*y3 + d*y4);

                pts.push(pt);
            }
        }

        return  pts;
    },

    CLASS_NAME: "SuperMap.Geometry.Primitives"
});

/**
 * APIFunction: SuperMap.Geometry.Primitives.transformSymbolCellToGeometry
 * 根据标号图元解析生成相应的Geometry
 *
 * Parameters:
 * symbolCell - {Object} 图元对象的数据。
 * dAngle - {Float} 标号的旋转角度，目前椭圆需要使用。
 *
 * Returns:
 * {<SuperMap.Geometry>} 返回相应的Geometry。
 */
SuperMap.Geometry.Primitives.transformSymbolCellToGeometry = function(type, controlPoints, textContent, dAngle, isCalculate){
    if(isCalculate === undefined || isCalculate === null){
        isCalculate = true;
    }

    var primitives = new SuperMap.Geometry.Primitives();
    switch (type){
        case 24:
            return primitives.polyline(controlPoints);
        case 390:
            return primitives.kidney(controlPoints);
        case 590:
            return primitives.bezier(controlPoints, isCalculate);
        case 360:
            return primitives.loopbezier(controlPoints, isCalculate);
        case 28:
            return primitives.parallelogram(controlPoints);
        case 32:
            return primitives.polygon(controlPoints);
        case 29:
            return primitives.circle(controlPoints);
        case 26:
            return primitives.rectangle(controlPoints);
        case 34:
            return primitives.geotext(controlPoints, textContent);
        case 380:
            return primitives.sector(controlPoints);
        case 370:
            return primitives.lune(controlPoints);
        case 44:
            return primitives.arc(controlPoints);
        case 31:
            return primitives.ellipse(controlPoints, dAngle, isCalculate);
        case 48:
            return primitives.parallelline(controlPoints);
    }
};

/**
 * APIFunction: SuperMap.Geometry.Primitives.getSpatialData
 * 根据类型获取图元的拟合点。
 *
 * Parameters:
 * geometry - {Object} 图元对象。
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 返回相应的Geometry。
 */
SuperMap.Geometry.Primitives.getSpatialData = function(geometry){
    if(geometry.CLASS_NAME === "SuperMap.Geometry.LineString"){
        return geometry.components;
    } else if(geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing"){
        return geometry.components;
    } else if(geometry.CLASS_NAME === "SuperMap.Geometry.Polygon"){
        if(geometry.components.length <= 0){
            return [];
        }
        var component = geometry.components[0];
        return component.components;
    }
};

/**
 * Method: SuperMap.Geometry.Primitives.getArcInfo
 * 获取弧线的中心点和半径
 */
SuperMap.Geometry.Primitives.getArcInfo = function(pntStart, pntMiddle, pntEnd){
    var arcInfo = {};
    arcInfo.pntCenter = new SuperMap.Geometry.Point(0, 0);
    arcInfo.dRadius = 0.0;
    arcInfo.dStartAngle = 0.0;
    arcInfo.dEndAngle = 0.0;

    var X10 = pntMiddle.x - pntStart.x;
    var Y10 = pntMiddle.y - pntStart.y;
    if( Math.abs( X10 ) < 0.000000001 ) {
        var pnt01 = {}, pnt12 = {};
        pnt01.x = (pntMiddle.x + pntStart.x)/2.0;
        pnt01.y = (pntMiddle.y + pntStart.y)/2.0;
        pnt12.x = (pntMiddle.x + pntEnd.x)/2.0;
        pnt12.y = (pntMiddle.y + pntEnd.y)/2.0;
        var dK = 0;
        if(Math.abs(pntEnd.x - pntMiddle.x) >= 0.000000001) {
            dK = (pntEnd.y - pntMiddle.y)/( pntEnd.x - pntMiddle.x );
        }

        arcInfo.pntCenter.y = pnt01.y;
        if( Math.abs( dK ) < 0.000000001 ) {
            arcInfo.pntCenter.x = pnt12.x;
        }
        else {
            arcInfo.pntCenter.x = pnt12.x - dK * (pnt01.y - pnt12.y);
        }
    } else {
        var pnt01 = {}, pnt12 = {};
        pnt01.x = (pntMiddle.x + pntStart.x)/2.0;
        pnt01.y = (pntMiddle.y + pntStart.y)/2.0;
        pnt12.x = (pntMiddle.x + pntEnd.x)/2.0;
        pnt12.y = (pntMiddle.y + pntEnd.y)/2.0;
        var dK1 = Y10 / X10;
        var dK2 = 1.0;
        if( Math.abs( dK1 ) < 0.000000001 ) {
            arcInfo.pntCenter.x = pnt01.x;
            if( Math.abs( pntEnd.x - pntMiddle.x < 0.000000001 ) ) {
                arcInfo.pntCenter.y = pnt12.y;
            } else {
                arcInfo.pntCenter.y = - (pntEnd.x - pntMiddle.x) / (pntEnd.y - pntMiddle.y) * ( arcInfo.pntCenter.x - pnt12.x) + pnt12.y;
            }
        } else {
            if( Math.abs( pntEnd.x - pntMiddle.x ) < 0.000000001 ) {
                arcInfo.pntCenter.y = pnt12.y;
                arcInfo.pntCenter.x = -dK1 *( arcInfo.pntCenter.y - pnt01.y ) + pnt01.x;
            } else {//没有水平的，也没有垂直的
                dK2 = (pntEnd.y - pntMiddle.y)/( pntEnd.x - pntMiddle.x );
                arcInfo.pntCenter.x=(dK1*dK2*(pnt01.y-pnt12.y)+dK2*pnt01.x-dK1*pnt12.x)/(dK2-dK1);
                arcInfo.pntCenter.y=(pnt12.x-pnt01.x+dK2*pnt12.y-dK1*pnt01.y)/(dK2-dK1);
            }
        }
    }

    var dStartRadian = Math.atan2(pntStart.y - arcInfo.pntCenter.y, pntStart.x - arcInfo.pntCenter.x);
    var dEndRadian = Math.atan2(pntEnd.y - arcInfo.pntCenter.y, pntEnd.x - arcInfo.pntCenter.x);

    if (SuperMap.Plot.PlottingUtil.isCounterClockwise( pntStart, pntMiddle, pntEnd))
    {//逆时针
        //范围在0到ANGLE360之间
        while( dStartRadian >= Math.PI*2 ) {
            dStartRadian -= Math.PI*2;
        }
        while( dStartRadian < 0 ) {
            dStartRadian += Math.PI*2;
        }

        while(dEndRadian > 2*Math.PI) {
            dEndRadian -= 2*Math.PI;
        }

        while(dEndRadian < dStartRadian) {
            dEndRadian += 2*Math.PI;
        }
    } else {
        //范围在0到ANGLE360之间
        while( dEndRadian >= Math.PI*2 ) {
            dEndRadian -= Math.PI*2;
        }
        while( dEndRadian < 0 ) {
            dEndRadian += Math.PI*2;
        }

        while(dStartRadian > 2*Math.PI) {
            dStartRadian -= 2*Math.PI;
        }

        while(dEndRadian > dStartRadian) {
            dStartRadian += 2*Math.PI;
        }

        var dTemp = dStartRadian;
        dStartRadian = dEndRadian;
        dEndRadian = dTemp;
    }

    arcInfo.dRadius = Math.sqrt( (arcInfo.pntCenter.x - pntStart.x) * (arcInfo.pntCenter.x - pntStart.x) +
    ( arcInfo.pntCenter.y - pntStart.y) * (arcInfo.pntCenter.y - pntStart.y) );

    arcInfo.dEndAngle	= dEndRadian * 180 / Math.PI;
    arcInfo.dStartAngle = dStartRadian * 180 / Math.PI;

    return arcInfo;
};

/**
 * APIFunction: SuperMap.Geometry.Primitives.getArcPoint
 * 根据中心点，和半径算出三点弧。
 *
 * Parameters:
 * pntCenter - {new SuperMap.Geometry.point()} 中心点坐标。
 * dRadius - {Float} 半径。
 * dStartAngle - {Float} 起始角度。
 * dEndAngle - {Float} 结束角度。
 *
 * Returns:
 * {Array(Array<SuperMap.Geometry.Point>)} 返回相应的Geometry。
 */
SuperMap.Geometry.Primitives.getArcPoint = function(pntCenter,dRadius,dStartAngle,dEndAngle){
    if( !SuperMap.Plot.PlottingUtil.isNear(dRadius,0.000000001) )
    {
        var dStartRadian = dStartAngle * Math.PI / 180;
        var  dEndRadian = dEndAngle * Math.PI / 180;

        if (dStartRadian > dEndRadian)
        {
            dEndRadian += 2 * Math.PI;
        }

        var pntStart =[];
        var pntMiddle = [];
        var pntEnd = [];
        var components = [];

        pntStart.x = pntCenter.x + dRadius * Math.cos(dStartRadian);
        pntStart.y = pntCenter.y + dRadius * Math.sin(dStartRadian);

        pntMiddle.x = pntCenter.x + dRadius * Math.cos( (dStartRadian+dEndRadian)/2 );
        pntMiddle.y = pntCenter.y + dRadius * Math.sin( (dStartRadian+dEndRadian)/2 );

        pntEnd.x = pntCenter.x + dRadius * Math.cos(dEndRadian);
        pntEnd.y = pntCenter.y + dRadius * Math.sin(dEndRadian);

        components.push(new SuperMap.Geometry.Point(pntStart.x,pntStart.y));
        components.push(new SuperMap.Geometry.Point(pntMiddle.x,pntMiddle.y));
        components.push(new SuperMap.Geometry.Point(pntEnd.x,pntEnd.y));

        return components;
    }
};